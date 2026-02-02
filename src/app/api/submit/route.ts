import { NextResponse } from "next/server";

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return null;
}

function isOriginAllowed(req: Request) {
  const origin = req.headers.get("origin");
  const allowed = new Set([
    process.env.APP_ORIGIN, // e.g. http://localhost:3000 or https://planlife.com
  ].filter(Boolean) as string[]);
  return origin ? allowed.has(origin) : false;
}

function pickAllowedFields(body: any) {
  // Only allow what you expect (drop unknown keys)
  const allowed = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "state",
    "leadSource",
    "notes",
    "tags",
    "agent",
  ] as const;

  const out: Record<string, any> = {};
  for (const k of allowed) out[k] = body?.[k];
  return out;
}

function validateBasic(payload: Record<string, any>) {
  // Minimal strict checks (expand later with zod)
  const str = (v: any) => (typeof v === "string" ? v.trim() : "");

  payload.firstName = str(payload.firstName).slice(0, 60);
  payload.lastName = str(payload.lastName).slice(0, 60);
  payload.email = str(payload.email).slice(0, 120);
  payload.phone = str(payload.phone).slice(0, 30);
  payload.state = str(payload.state).slice(0, 2);
  payload.leadSource = str(payload.leadSource).slice(0, 80);
  payload.notes = str(payload.notes).slice(0, 500);
  payload.tags = str(payload.tags).slice(0, 40);
  payload.agent = str(payload.agent).slice(0, 80);

  if (!payload.email.includes("@")) return "Invalid email";
  if (!payload.firstName) return "Missing firstName";
  if (!payload.lastName) return "Missing lastName";
  return null;
}

export async function POST(req: Request) {
  // 1) Basic cross-site submit protection
  if (!isOriginAllowed(req)) {
    return NextResponse.json({ error: "Bad origin" }, { status: 403 });
  }

  // 2) Parse JSON
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 3) Extract Turnstile token
  const token = body.turnstileToken;
  if (typeof token !== "string" || token.length < 10 || token.length > 2048) {
    return NextResponse.json({ error: "Missing verification token" }, { status: 400 });
  }

  // 4) Verify Turnstile server-side
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Server misconfigured: missing TURNSTILE_SECRET_KEY" }, { status: 500 });
  }

  const ip = getClientIp(req);

  const fd = new FormData();
  fd.append("secret", secret);
  fd.append("response", token);
  if (ip) fd.append("remoteip", ip);

  const verifyResp = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: fd }
  );
  const verify = await verifyResp.json().catch(() => null);

  if (!verify?.success) {
    return NextResponse.json(
      { error: "Verification failed", codes: verify?.["error-codes"] ?? [] },
      { status: 403 }
    );
  }

  // 5) Shape + validate payload (do NOT trust client)
  const payload = pickAllowedFields(body);

  // (Later) enforce QR attribution rules here (tags/agent lock)
  // payload.tags = "online"; payload.agent = "..."; based on server-side cookie logic

  const validationError = validateBasic(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // 6) Forward to Zapier
  const webhook = process.env.ZAPIER_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "Server misconfigured: missing ZAPIER_WEBHOOK_URL" }, { status: 500 });
  }

  const zapRes = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await zapRes.text().catch(() => "");

  if (!zapRes.ok) {
    return NextResponse.json(
      { error: "Zapier forward failed", status: zapRes.status, zapierResponse: text },
      { status: 502 }
    );
  }

  return NextResponse.json(
    { ok: true, status: zapRes.status, zapierResponse: text },
    { status: 200 }
  );
}