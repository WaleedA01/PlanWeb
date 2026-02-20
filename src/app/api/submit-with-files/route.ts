import { NextRequest, NextResponse } from "next/server";
import { sendEmailReceipts } from "@/lib/submit/emailReceipt";
import crypto from "crypto";
import { getAgentById } from "@/lib/agents/getAgents";

const QR_SECRET = process.env.QR_SIGNING_SECRET;

function verifyToken(token: string) {
  if (!QR_SECRET) return null;
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
    return JSON.parse(json) as { agentId: string };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phoneNumber") as string;
    const address = formData.get("streetAddress") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const postalCode = formData.get("postalCode") as string;
    const leadSource = formData.get("leadSource") as string;
    const formType = leadSource?.includes("Auto") ? "Auto" : leadSource?.includes("Home") ? "Home" : "Other";
    
    const qrCookie = req.cookies.get("pl_qr")?.value;
    let agentId: string | undefined;

    if (qrCookie) {
      const payload = verifyToken(qrCookie);
      if (payload?.agentId) {
        const agent = getAgentById(payload.agentId);
        if (agent && agent.status !== "inactive") {
          agentId = payload.agentId;
        }
      }
    }

    const files: Array<{ filename: string; content: Buffer }> = [];
    let totalSize = 0;
    
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        totalSize += buffer.length;
        
        if (totalSize > 10 * 1024 * 1024) {
          console.warn(`Skipping file ${value.name} - total size exceeds 10MB`);
          break;
        }
        
        files.push({ filename: value.name, content: buffer });
      }
    }

    // Build answers object from formData
    const answers: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      if (!(value instanceof File)) {
        answers[key] = value;
      }
    }

    // Send via the unified email receipt system
    await sendEmailReceipts({
      formType,
      answers,
      agentId,
      submittedAt: new Date().toLocaleString('en-US', { 
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'short'
      }),
      files,
    });

    return NextResponse.json({ 
      ok: true, 
      emailSent: true,
      attachmentCount: files.length,
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2)
    });

  } catch (err: any) {
    console.error("Submit error:", err);
    return NextResponse.json({ 
      ok: false, 
      error: err.message,
      note: "Email failed but form data was saved to AgencyZoom" 
    }, { status: 200 });
  }
}
