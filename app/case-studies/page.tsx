import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
};

export default function CaseStudiesPage() {
  const cases = [
    {
      title: "Vulnerability Program Modernization",
      outcome: "Improved prioritization and faster remediation for high-risk exposure.",
      bullets: [
        "Introduced RBVM scoring and exception workflow",
        "Established SLAs and reporting for leadership",
        "Reduced noise by grouping duplicates and focusing on exploitability",
      ],
    },
    {
      title: "Secure Azure Build for New Application",
      outcome: "Deployed a secure-by-default cloud foundation with repeatable automation.",
      bullets: [
        "Landing zone and network segmentation",
        "IaC pipeline with security gates",
        "Logging/monitoring aligned to incident response",
      ],
    },
    {
      title: "Audit Readiness & Control Alignment",
      outcome: "Clear evidence map and operational controls to support customer trust.",
      bullets: [
        "Control mapping and policy baseline creation",
        "Access reviews and logging enhancements",
        "Operational runbooks and incident readiness drills",
      ],
    },
  ];

  return (
    <>
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Case studies"
            title="Outcomes you can show leadership"
            subtitle="Replace placeholders with your real engagements as you go."
          />

          <div className="mt-10 grid gap-6">
            {cases.map((c) => (
              <div key={c.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <h3 className="text-xl font-bold text-slate-900">{c.title}</h3>
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    Example
                  </span>
                </div>
                <p className="mt-3 text-slate-600">{c.outcome}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
