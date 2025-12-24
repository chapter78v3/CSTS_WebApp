import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    let body: any = {};

    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      body = {};
    }

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const topic = String(body?.topic ?? "General").trim();
    const message = String(body?.message ?? "").trim();
    const website = String(body?.website ?? "").trim(); // honeypot

    // Honeypot
    if (website) {
      return NextResponse.json({ ok: true });
    }

    // TEMP: if validation fails, return what server saw
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          ok: false,
          error: "Name, email, and message are required",
          debug: { received: { name, email, topic, messageLen: message.length } },
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address", debug: { email } },
        { status: 400 }
      );
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "contact@csts.it.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        { ok: false, error: "Email service not configured (missing env vars)." },
        { status: 500 }
      );
    }

    sgMail.setApiKey(apiKey);

    await sgMail.send({
      to: toEmail,
      from: { email: fromEmail, name: "CSTS Website" },
      replyTo: email,
      subject: `[CSTS Contact Form] ${topic} — ${name}`,
      text: `New contact submission

Name: ${name}
Email: ${email}
Topic: ${topic}

Message:
${message}
`,
    });

    return NextResponse.json({ ok: true });
  } } catch (err: any) {
  const sg = err?.response?.body || err?.response?.text || err?.message || err;
  console.error("Contact API error:", sg);

  return NextResponse.json(
    {
      ok: false,
      error: "Send failed",
      details: err?.response?.body?.errors ?? sg,
    },
    { status: 500 }
  );
}

  }
}
