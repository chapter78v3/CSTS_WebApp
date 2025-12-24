"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Controlled fields (bulletproof)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Cybersecurity");
  const [message, setMessage] = useState("");

  // Honeypot (bots fill this)
  const [website, setWebsite] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const payload = {
      name: name.trim(),
      email: email.trim(),
      topic,
      message: message.trim(),
      website: website.trim(),
    };

    // TEMP debug: confirm browser is actually sending values
    console.log("Contact payload:", payload);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setError(data?.error || "Failed to send message. Please try again.");
        return;
      }

      setStatus("success");

      // reset fields
      setName("");
      setEmail("");
      setTopic("Cybersecurity");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  const disabled = status === "loading";

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-900" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          placeholder="Your name"
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-900" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          placeholder="you@company.com"
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-900" htmlFor="topic">
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          disabled={disabled}
        >
          <option>Cybersecurity</option>
          <option>Cloud Deployments &amp; Management</option>
          <option>Consultation</option>
          <option>Other</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-900" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          placeholder="Tell us what you’re trying to accomplish, timeline, and any constraints."
          disabled={disabled}
        />
      </div>

      {/* Honeypot field (hide from users, bots may fill it) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <button
        type="submit"
        disabled={disabled}
        className="mt-2 inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2 disabled:opacity-60"
      >
        {disabled ? "Sending..." : "Send message"}
      </button>

      {status === "success" && (
        <p className="text-sm font-medium text-emerald-700">
          Thanks — your message was sent successfully.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm font-medium text-rose-700">{error}</p>
      )}

      <p className="text-xs text-slate-500">
        Tip: This submits to <code className="rounded bg-slate-100 px-1">/api/contact</code>.
      </p>
    </form>
  );
}
