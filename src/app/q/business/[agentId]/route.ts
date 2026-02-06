import { NextResponse } from "next/server";
import crypto from "crypto";
import { getAgentById } from "@/lib/agents/getAgents";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const QR_SECRET = process.env.QR_SIGNING_SECRET;

function signPayload(payload: object) {
  if (!QR_SECRET) throw new Error("QR_SIGNING_SECRET is not set");
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json).toString("base64url");
  const sig = crypto.createHmac("sha256", QR_SECRET).update(b64).digest("base64url");
  return `${b64}.${sig}`;
}

export function GET(_: Request, { params }: { params: { agentId: string } }) {
  const agent = getAgentById(params.agentId);

  // If agent does not exist or is inactive, fall back to generic business page
  if (!agent || agent.status === "inactive") {
    const fallback = new URL("/business", APP_URL);
    return NextResponse.redirect(fallback);
  }

  const token = signPayload({
    formType: "business",
    agentId: agent.id,
    iat: Date.now(),
  });

  const redirectUrl = new URL("/business", APP_URL);
  redirectUrl.searchParams.set("qr", token);

  return NextResponse.redirect(redirectUrl);
}
