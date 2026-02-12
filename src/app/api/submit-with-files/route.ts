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
    // Parse multipart form data
    const formData = await req.formData();
    
    // Extract form fields
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phoneNumber") as string;
    const address = formData.get("streetAddress") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const postalCode = formData.get("postalCode") as string;
    
    // Determine recipient email from cookie
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

    // Collect file attachments
    const attachments: Array<{ filename: string; content: Buffer }> = [];
    
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        attachments.push({
          filename: value.name,
          content: buffer,
        });
      }
    }

    // Build email HTML
    const emailHtml = `
      <h2>New Auto Quote Request</h2>
      <p><strong>Customer:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}, ${city}, ${state} ${postalCode}</p>
      <hr />
      <p><strong>Assigned Agent:</strong> ${agentName}</p>
      ${attachments.length > 0 ? `<p><strong>Attachments:</strong> ${attachments.length} file(s)</p>` : ""}
    `;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "PlanLife USA <onboarding@resend.dev>",
      to: recipientEmail,
      subject: `New Auto Quote - ${firstName} ${lastName}`,
      html: emailHtml,
      attachments: attachments.map(att => ({
        filename: att.filename,
        content: att.content,
      })),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ 
      ok: true, 
      emailSent: true,
      recipientEmail,
      emailId: data?.id 
    });

  } catch (err: any) {
    console.error("Submit error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
