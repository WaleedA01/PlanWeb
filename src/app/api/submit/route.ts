import { NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/submit/turnstile";
import type { LeadCategory, SubmitRequest } from "@/lib/submit/types";
import { isOriginAllowed } from "@/lib/submit/origin";
import { resolveZapierWebhook } from "@/lib/submit/webhook";
import { str } from "@/lib/submit/utils/strings";
import { routeAndMap } from "@/lib/submit/router";
import { getAgentById, getAgentFullName } from "@/lib/agents/getAgents";
import { getPostHogClient } from "@/lib/posthog-server";
import { sendEmailReceipts } from "@/lib/submit/emailReceipt";

type ParsedBody = Partial<SubmitRequest> & Record<string, unknown>;

function resolveFormType(body: ParsedBody): LeadCategory {
  const ft = str((body as any).formType).toLowerCase();
  if (ft === "business") return "business";
  return "personal";
}

export async function POST(req: Request) {
  // 1) Cross-site submit protection
  if (!isOriginAllowed(req)) {
    return NextResponse.json({ error: "Bad origin" }, { status: 403 });
  }

  // 2) Parse JSON
  const body = (await req.json().catch(() => null)) as ParsedBody | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 3) Extract Turnstile token
  const token = (body as any).turnstileToken;
  if (typeof token !== "string" || token.length < 10 || token.length > 2048) {
    return NextResponse.json({ error: "Missing verification token" }, { status: 400 });
  }

  // 4) Verify Turnstile server-side BEFORE doing anything else
  const ts = await verifyTurnstile(req, token);
  if (!ts.ok) {
    return NextResponse.json(
      { error: ts.error, codes: ts.codes ?? [] },
      { status: ts.status }
    );
  }

  // 5) Determine form type + answers
  const formType = resolveFormType(body);
  const rawFormType = str((body as any).formType).toLowerCase();
  const answers = (body.answers && typeof body.answers === "object" ? body.answers : (body as any)) as Record<
    string,
    unknown
  >;

  // 5a) Build tags based on form type and QR presence
  const tags: string[] = ['Online Lead'];
  
  // Add form-specific tag
  if (rawFormType === 'business') {
    tags.push('Business');
  } else if (rawFormType === 'auto') {
    tags.push('Auto');
  } else if (rawFormType === 'home') {
    tags.push('Home');
  }
  
  // Add QR tag if QR token present
  const qrToken = str((body as any).qr);
  if (qrToken) {
    tags.push('QR Code');
  }
  
  // Set tags in answers
  (answers as any).tags = tags.join('; ');

  // 5b) Resolve agent server-side (avoid client spoofing)
  const agentIdRaw = str((answers as any).agentId || (answers as any).selectedAgentId);
  const agentId = agentIdRaw.trim();

  if (agentId) {
    const agent = getAgentById(agentId);
    if (agent) {
      // Always set the human-readable agent name from our source of truth
      (answers as any).agent = getAgentFullName(agent);

      // Optionally expose these for downstream Zapier steps (safe-ish contact fields)
      (answers as any).agentEmail = agent.email;
      (answers as any).agentPhone = agent.phone;
    } else {
      // If an unknown agentId is provided, keep the id for debugging but don't trust any agent name
      (answers as any).agent = "(unknown)";
    }
  }

  // 6) Map answers to the payload that Zapier expects (router + category-specific mappers)
  const routed = routeAndMap(formType, answers);
  if (!routed.ok) {
    return NextResponse.json({ error: routed.error, formType }, { status: 400 });
  }

  const payload = routed.payload;

  // 7) Resolve the correct Zapier webhook for this formType
  const resolved = resolveZapierWebhook(formType);
  const webhookKey = resolved.key;
  const webhook = resolved.url ?? process.env.ZAPIER_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { error: `Server misconfigured: missing ${webhookKey} (or ZAPIER_WEBHOOK_URL fallback)`, formType },
      { status: 500 }
    );
  }

  // 8) Forward to Zapier
  const zapRes = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await zapRes.text().catch(() => "");

  // Generate a distinct ID for server-side tracking (use email if available, otherwise anonymous)
  const email = str((answers as any).email);
  const distinctId = email || `anonymous_${Date.now()}`;

  if (!zapRes.ok) {
    // Track server-side submission error
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId,
      event: 'lead_submission_error',
      properties: {
        form_type: rawFormType,
        error: 'Zapier forward failed',
        status_code: zapRes.status,
        has_agent: !!agentId,
      },
    });

    return NextResponse.json(
      {
        error: "Zapier forward failed",
        formType,
        webhookKey,
        status: zapRes.status,
        zapierResponse: text,
      },
      { status: 502 }
    );
  }

  // Track successful server-side lead submission
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId,
    event: 'lead_submitted',
    properties: {
      form_type: rawFormType,
      city: str((answers as any).city),
      state: str((answers as any).state),
      has_agent: !!agentId,
      has_qr_code: !!qrToken,
      tags: tags.join('; '),
    },
  });

  // Send email receipts (don't block response)
  sendEmailReceipts({
    formType: rawFormType,
    answers,
    agentId,
    submittedAt: new Date().toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'short'
    }),
    files: [], // Files will be sent via separate endpoint
  }).catch(err => console.error('Email receipt error:', err));

  return NextResponse.json(
    {
      ok: true,
      formType,
      webhookKey,
      status: zapRes.status,
      zapierResponse: text,
    },
    { status: 200 }
  );
}