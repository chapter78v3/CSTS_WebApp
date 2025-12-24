import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export const runtime = "nodejs"; // ensure Node runtime (not Edge)

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clamp(s: string, max: number) {
  return s.length > max ? s.slice(0, max) : s;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()).catch?.(() => ({})) ?? {};
    const rawName = String(body?.name ?? "");
    const rawEmail = String(body?.email ?? "");
    const rawTopic = String(body?.topic ?? "General");
    const rawMessage = String(body?.message ?? "");
    const rawCompany = String(body?.company ?? "");
    const rawWebsite = String(body?.website ?? ""); // honeypot

    // Honeypot: if filled, silently accept
    if (rawWebsite.trim()) {
      return NextResponse.json({ ok: true });
    }

    const name = clamp(rawName.trim(), 120);
    const email = clamp(rawEmail.trim(), 254);
    const topic = clamp(rawTopic.trim() || "General", 120);
    const message = clamp(rawMessage.trim(), 5000);
    const company = clamp(rawCompany.trim(), 200);

    // Required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
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

    await sgMail.send({
      to: toEmail,
      from: { email: fromEmail, name: "CSTS Website" }, // verified sender email in SendGrid
      replyTo: email,
      subject: `[${subjectPrefix}] ${topic} — ${name}`,
      text: `New contact submission

Name: ${name}
Email: ${email}
Company: ${company}
Topic: ${topic}

Message:
${message}
`,
      html: `
        <h2>New contact submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, monospace;">${escapeHtml(
          message
        )}</pre>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // SendGrid errors often include response.body.errors
    console.error("Contact API error:", err?.response?.body ?? err);
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
