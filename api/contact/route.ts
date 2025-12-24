import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, topic, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
    }

    // TODO: Send email or store it somewhere (SendGrid/Mailgun/Azure)
    // For now, just log (shows in Azure logs):
    console.log("New contact submission:", { name, email, topic, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
