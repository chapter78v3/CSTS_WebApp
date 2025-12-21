import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CTA } from "@/components/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries",
};

export default function IndustriesPage() {
  const industries = [
    {
      title: "SMB & Mid-Market",
      desc: "Practical security improvements without enterprise overhead.",
      points: ["Security assessments", "MFA/identity hardening", "Cloud baseline buildout"],
    },
    {
      title: "Healthcare SaaS",
      desc: "Controls and evidence that support HIPAA and audit readiness.",
      points: ["PHI data flow guidance", "Logging and incident readiness", "Policy and governance"],
    },
    {
      title: "Retail & Technology",
      desc: "Scale-ready patterns for cloud delivery and vulnerability reduction.",
      points: ["RBVM programs", "CI/CD security gates", "Azure network security patterns"],
    },
  ];

  return (
    <>
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Industries"
            title="Experience across regulated and fast-moving environments"
            subtitle="We adapt security to the business model — without slowing delivery teams down."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {industries.map((i) => (
              <div key={i.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-slate-900">{i.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{i.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {i.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <span>{p}</span>
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
