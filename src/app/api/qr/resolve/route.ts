

import { NextResponse } from "next/server";
import crypto from "crypto";
import { getAgentById, getAgentFullName } from "@/lib/agents/getAgents";

const QR_SECRET = process.env.QR_SIGNING_SECRET;

function verifyToken(token: string) {
  if (!QR_SECRET) throw new Error("QR_SIGNING_SECRET is not set");

  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return null;

  const expectedSig = crypto
    .createHmac("sha256", QR_SECRET)
    .update(b64)
    .digest("base64url");

  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    const json = Buffer.from(b64, "base64url").toString("utf8");
    return JSON.parse(json) as {
      agentId: string;
      formType: "business" | "personal";
      iat?: number;
    };
  } catch {
    return null;
  }
}

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const qr = searchParams.get("qr");

  if (!qr) {
    return NextResponse.json({ locked: false });
  }

  const payload = verifyToken(qr);
  if (!payload?.agentId) {
    return NextResponse.json({ locked: false });
  }

  const agent = getAgentById(payload.agentId);

  if (!agent || agent.status === "inactive") {
    return NextResponse.json({ locked: false });
  }

  return NextResponse.json({
    locked: true,
    agentId: agent.id,
    agentName: getAgentFullName(agent),
    formType: payload.formType,
    status: agent.status,
  });
}