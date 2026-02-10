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
  const origin = new URL(req.url).origin;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? origin;

  const agent = getAgentById(agentId);

  if (!agent || agent.status === "inactive") {
    const fallback = new URL("/personal", appUrl);
    return NextResponse.redirect(fallback);
  }

  const token = signPayload({
    formType: "personal",
    agentId: agent.id,
    iat: Date.now(),
  });

  const redirectUrl = new URL("/personal", appUrl);
  redirectUrl.searchParams.set("qr", token);

  const res = NextResponse.redirect(redirectUrl);

  res.cookies.set({
    name: "pl_qr",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
