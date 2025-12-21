import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let’s talk about your goals"
          subtitle="Send a short note and we’ll follow up. (Starter uses mailto — easy to swap for an API later.)"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <form
              className="grid gap-4"
              action={`mailto:${site.contactEmail}`}
              method="post"
              encType="text/plain"
            >
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
                >
                  <option>Cybersecurity</option>
                  <option>Cloud Deployments & Management</option>
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
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                Send message
              </button>

              <p className="text-xs text-slate-500">
                Tip: For a production contact form, swap this mailto for an API route or Azure Function.
              </p>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-lg font-semibold text-slate-900">Prefer email?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Email us at{" "}
              <a className="underline" href={`mailto:${site.contactEmail}`}>
                {site.contactEmail}
              </a>
            </p>

            <h3 className="mt-8 text-lg font-semibold text-slate-900">What to include</h3>
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
