module.exports = async function (context, req) {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      context.res = { status: 400, body: { ok: false, error: "Missing fields" } };
      return;
    }

    // Basic email sanity check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      context.res = { status: 400, body: { ok: false, error: "Invalid email" } };
      return;
    }

    // TODO: Send email (Mailgun/SendGrid) or store to a DB.
    // For now: log it (you'll see this in Function logs)
    context.log("New contact request:", { name, email, message });

    context.res = { status: 200, body: { ok: true } };
  } catch (e) {
    context.log.error(e);
    context.res = { status: 500, body: { ok: false, error: "Server error" } };
  }
};
