import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "./ContactForm";
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
          subtitle="Send a short note and we’ll follow up."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <ContactForm />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-sky-50 p-8">
            <h3 className="text-lg font-semibold text-slate-900">Prefer email?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Email us at{" "}
              <a className="underline underline-offset-4" href={`mailto:${site.contactEmail}`}>
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
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
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
