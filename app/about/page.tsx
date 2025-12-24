import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="About"
            title="Security and cloud expertise — delivered with clarity"
            subtitle="This is written as a strong starting point. Customize it to match your voice and offerings."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
              <h3 className="text-lg font-semibold text-slate-900">Our approach</h3>
              <p className="mt-3 text-slate-600">
                We help organizations deploy and operate secure cloud environments, strengthen cybersecurity
                fundamentals, and build repeatable delivery practices. The goal is simple: reduce risk
                without slowing the business down.
              </p>

              <h3 className="mt-8 text-lg font-semibold text-slate-900">What you can expect</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {[
                  "Clear scopes and measurable deliverables",
                  "Security decisions tied to business outcomes",
                  "Automation and documentation for day-2 operations",
                  "Direct collaboration with engineering and leadership",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-lg font-semibold text-slate-900">Focus areas</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {[
                  "RBVM & vulnerability reduction programs",
                  "Azure architecture & secure deployments",
                  "DevSecOps and secure SDLC enablement",
                  "Security governance and audit readiness",
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

      <CTA />
    </>
  );
}
