"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;

    // Bulletproof field extraction (avoids FormData edge cases)
    const name = (form.elements.namedItem("name") as HTMLInputElement | null)?.value ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement | null)?.value ?? "";
    const topic =
      (form.elements.namedItem("topic") as HTMLSelectElement | null)?.value ?? "Cybersecurity";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement | null)?.value ?? "";
    const website = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    const payload = {
      name: name.trim(),
      email: email.trim(),
      topic,
      message: message.trim(),
      website: website.trim(), // honeypot
    };

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
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-900" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          placeholder="Your name"
          disabled={status === "loading"}
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
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          placeholder="you@company.com"
          disabled={status === "loading"}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-900" htmlFor="topic">
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          defaultValue="Cybersecurity"
          disabled={status === "loading"}
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
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          placeholder="Tell us what you’re trying to accomplish, timeline, and any constraints."
          disabled={status === "loading"}
        />
      </div>

      {/* Honeypot field (bots will fill this) */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2 disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>

      {status === "success" && (
        <p className="text-sm font-medium text-emerald-700">
          Thanks — your message was sent successfully.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm font-medium text-rose-700">
          {error || "Something went wrong. Please try again."}
        </p>
      )}

      <p className="text-xs text-slate-500">
        Tip: This submits to <code className="rounded bg-slate-100 px-1">/api/contact</code>.
      </p>
    </form>
  );
}
