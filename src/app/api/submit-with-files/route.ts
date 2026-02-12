import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import { getAgentById } from "@/lib/agents/getAgents";

const resend = new Resend(process.env.RESEND_API_KEY);
const QR_SECRET = process.env.QR_SIGNING_SECRET;
const PRINCIPAL_EMAIL = "gus@planlifeusa.com";

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
    
    const qrCookie = req.cookies.get("pl_qr")?.value;
    let recipientEmail = PRINCIPAL_EMAIL;
    let agentName = "Gus Aref";

    if (qrCookie) {
      const payload = verifyToken(qrCookie);
      if (payload?.agentId) {
        const agent = getAgentById(payload.agentId);
        if (agent && agent.status !== "inactive") {
          recipientEmail = agent.email;
          agentName = `${agent.firstName} ${agent.lastName}`;
        }
      }
    }

    const attachments: Array<{ filename: string; content: Buffer }> = [];
    let totalSize = 0;
    
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        totalSize += buffer.length;
        
        // Skip if total attachments exceed 10MB
        if (totalSize > 10 * 1024 * 1024) {
          console.warn(`Skipping file ${value.name} - total size exceeds 10MB`);
          break;
        }
        
        attachments.push({ filename: value.name, content: buffer });
      }
    }

    const emailHtml = `
      <h2>New Auto Quote Request</h2>
      <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}, ${city}, ${state} ${postalCode}</p>
      <hr />
      <p><strong>Assigned Agent:</strong> ${agentName}</p>
      ${attachments.length > 0 ? `<p><strong>Attachments:</strong> ${attachments.length} file(s) (${(totalSize / 1024 / 1024).toFixed(2)} MB)</p>` : ""}
    `;

    // Add 15 second timeout
    const emailPromise = resend.emails.send({
      from: "PlanLife USA <info@planlifeusa.com>",
      to: recipientEmail,
      subject: `New Auto Quote - ${firstName} ${lastName}`,
      html: emailHtml,
      attachments: attachments.map(att => ({
        filename: att.filename,
        content: att.content,
      })),
    });

    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email timeout')), 15000)
    );

    const { data, error } = await Promise.race([emailPromise, timeoutPromise]) as any;

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email", details: error }, { status: 500 });
    }

    return NextResponse.json({ 
      ok: true, 
      emailSent: true,
      recipientEmail,
      emailId: data?.id,
      attachmentCount: attachments.length,
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2)
    });

  } catch (err: any) {
    console.error("Submit error:", err);
    // Don't fail the request - just log it since Zapier already succeeded
    return NextResponse.json({ 
      ok: false, 
      error: err.message,
      note: "Email failed but form data was saved to AgencyZoom" 
    }, { status: 200 });
  }
}
