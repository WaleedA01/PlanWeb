import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const HIRING_EMAIL = "gus@planlifeusa.com";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const jobTitle = formData.get("jobTitle") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const whyGreatFit = formData.get("whyGreatFit") as string;

    const attachments: Array<{ filename: string; content: Buffer }> = [];
    const resume = formData.get("resume") as File | null;
    const coverLetter = formData.get("coverLetter") as File | null;

    if (resume) {
      attachments.push({
        filename: `Resume - ${resume.name}`,
        content: Buffer.from(await resume.arrayBuffer()),
      });
    }

    if (coverLetter) {
      attachments.push({
        filename: `Cover Letter - ${coverLetter.name}`,
        content: Buffer.from(await coverLetter.arrayBuffer()),
      });
    }

    const emailHtml = `
      <h2>New Applicant: ${jobTitle} - ${name}</h2>
      <hr />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <hr />
      <h3>Why are they a great fit for PlanLife?</h3>
      <p>${whyGreatFit.replace(/\n/g, '<br>')}</p>
      <hr />
      <p><strong>Attachments:</strong> ${attachments.length} file(s)</p>
    `;

    const { data, error } = await resend.emails.send({
      from: "PlanLife USA <info@planlifeusa.com>",
      to: HIRING_EMAIL,
      subject: `New Applicant: ${jobTitle} - ${name}`,
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

    return NextResponse.json({ ok: true, emailId: data?.id });

  } catch (err: any) {
    console.error("Application submission error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
