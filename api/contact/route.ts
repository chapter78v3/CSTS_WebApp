import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export const runtime = "nodejs"; // ensure Node runtime (not Edge)

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { name, email, topic, message, company, website } = (await req.json()) ?? {};

    // Basic required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(String(email))) {
      return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
    }

    // Basic anti-bot honeypot: if filled, silently accept
    if (website) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "contact@csts.it.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || "CSTS Contact Form";

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        { ok: false, error: "Email service not configured (missing env vars)." },
        { status: 500 }
      );
    }

    sgMail.setApiKey(apiKey);

    const safeTopic = topic ? String(topic) : "General";

    await sgMail.send({
      to: toEmail,
      from: fromEmail, // must be verified in SendGrid
      replyTo: String(email), // so you can hit Reply and respond to the sender
      subject: `[${subjectPrefix}] ${safeTopic} — ${name}`,
      text: `New contact submission

Name: ${name}
Email: ${email}
Company: ${company || ""}
Topic: ${safeTopic}

Message:
${message}
`,
      html: `
        <h2>New contact submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(String(name))}</p>
        <p><strong>Email:</strong> ${escapeHtml(String(email))}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(String(company))}</p>` : ""}
        <p><strong>Topic:</strong> ${escapeHtml(safeTopic)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, monospace;">${escapeHtml(
          String(message)
        )}</pre>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}

// tiny HTML escape to avoid injecting user content into HTML email
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
