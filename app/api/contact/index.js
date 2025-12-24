const sgMail = require("@sendgrid/mail");

module.exports = async function (context, req) {
  try {
    // SWA Functions can provide body as string OR object OR empty
    let body = req.body;

    if (!body && req.rawBody) {
      body = req.rawBody;
    }

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    body = body || {};

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const topic = String(body.topic || "General").trim();
    const message = String(body.message || "").trim();
    const website = String(body.website || "").trim(); // honeypot

    // Honeypot: if filled, accept silently
    if (website) {
      context.res = { status: 200, body: { ok: true } };
      return;
    }

    if (!name || !email || !message) {
      context.res = {
        status: 400,
        body: { ok: false, error: "Name, email, and message are required" },
      };
      return;
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "contact@csts.it.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      context.res = { status: 500, body: { ok: false, error: "Email not configured" } };
      return;
    }

    sgMail.setApiKey(apiKey);

    await sgMail.send({
      to: toEmail,
      from: { email: fromEmail, name: "CSTS Website" }, // must be verified sender
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

    context.res = { status: 200, body: { ok: true } };
  } catch (err) {
    context.log("SendGrid error:", err?.response?.body || err);
    context.res = { status: 500, body: { ok: false, error: "Server error" } };
  }
};
