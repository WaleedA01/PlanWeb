import { NextResponse } from "next/server";
import crypto from "crypto";
import { getAgentById } from "@/lib/agents/getAgents";

const QR_SECRET = process.env.QR_SIGNING_SECRET;

function signPayload(payload: object) {
  if (!QR_SECRET) throw new Error("QR_SIGNING_SECRET is not set");
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json).toString("base64url");
  const sig = crypto.createHmac("sha256", QR_SECRET).update(b64).digest("base64url");
  return `${b64}.${sig}`;
}

export async function GET(req: Request, { params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;

  // Prefer explicit app URL, otherwise fall back to the request origin (works in dev)
  const origin = new URL(req.url).origin;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? origin;

  const agent = getAgentById(agentId);

  // If agent does not exist or is inactive, fall back to generic business page
  if (!agent || agent.status === "inactive") {
    const fallback = new URL("/business", appUrl);
    return NextResponse.redirect(fallback);
  }

  const token = signPayload({
    formType: "business",
    agentId: agent.id,
    iat: Date.now(),
  });

  const redirectUrl = new URL("/business", appUrl);
  redirectUrl.searchParams.set("qr", token);

  const res = NextResponse.redirect(redirectUrl);

  // Persist QR context across navigation (e.g., /business -> /business/form)
  res.cookies.set({
    name: "pl_qr",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
