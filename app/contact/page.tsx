"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      topic: String(formData.get("topic") ?? ""),
      message: String(formData.get("message") ?? ""),
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
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let’s talk about your goals"
          subtitle="Send a short note and we’ll follow up."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
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
                Prefer email?{" "}
                <a className="underline" href={`mailto:${site.contactEmail}`}>
                  {site.contactEmail}
                </a>
              </p>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-lg font-semibold text-slate-900">What to include</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {[
                "Your current environment (Azure/AWS/on-prem)",
                "Key risks or pain points",
                "Target timeline",
                "Stakeholders and decision process",
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
