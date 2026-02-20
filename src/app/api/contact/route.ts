import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const SUPPORT_EMAIL = "plsupport@planlifeusa.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5;">
        <div style="background: linear-gradient(135deg, rgba(40, 47, 87, 0.05) 0%, rgba(13, 169, 228, 0.05) 100%); padding: 50px 30px; text-align: center;">
          <img src="https://planlife.net/logo-full.png" alt="PlanLife USA" style="max-width: 280px; height: auto; margin: 0 auto 15px auto;" />
          <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: bold;">📧 New Contact Form Message</h1>
        </div>
        
        <div style="padding: 30px;">
          <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <h2 style="color: #282F57; font-size: 22px; margin-top: 0; margin-bottom: 15px; font-weight: 700;">Contact Information</h2>
            
            <div style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 3px solid #0da9e4; margin-bottom: 12px;">
              <p style="margin: 0; color: #282F57; font-size: 16px; font-weight: 600;">${firstName} ${lastName}</p>
            </div>
            
            <div style="padding: 15px; background-color: #f9fafb; border-radius: 8px; border-left: 3px solid #0da9e4; margin-bottom: 12px;">
              <p style="margin: 0 0 8px 0; color: #282F57; font-size: 15px;">📧 ${email}</p>
              <p style="margin: 0; color: #282F57; font-size: 15px;">📞 ${phone}</p>
            </div>
          </div>
          
          <div style="background-color: #ffffff; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <h3 style="color: #282F57; font-size: 18px; margin-top: 0; margin-bottom: 15px; font-weight: 600;">Message</h3>
            <div style="padding: 15px; background-color: #f9fafb; border-radius: 8px;">
              <p style="margin: 0; color: #282F57; font-size: 15px; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <p style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">© 2025 PlanLife USA</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "PlanLife USA <info@planlifeusa.com>",
      to: SUPPORT_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${firstName} ${lastName}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
