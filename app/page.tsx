import { Container } from "@/components/Container";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CTA } from "@/components/CTA";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <Container>
          <div className="py-16 md:py-20">
            <div className="max-w-3xl">
              <Badge>Cybersecurity • Cloud • Consulting</Badge>

              <Badge>Cybersecurity • Cloud • IT Consulting</Badge>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Secure cloud deployments and practical cybersecurity that moves the business forward.
              </h1>
              <p className="mt-5 text-lg text-slate-600">
                {site.tagline} We help IT organizations design, deploy, and manage secure cloud
                environments — with measurable risk reduction.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact">Book a consult</Button>
                <Button href="/services" variant="secondary">
                  Explore services
                </Button>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Risk-based prioritization", v: "Focus effort where it matters most" },
                  { k: "Azure-first delivery", v: "Landing zones, AKS, IaC, monitoring" },
                  { k: "Operational excellence", v: "Runbooks, hardening, and automation" },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-sm font-semibold text-slate-900">{x.k}</div>
                    <div className="mt-1 text-sm text-slate-600">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Services built for modern IT organizations"
            subtitle="From advisory to delivery to ongoing management — pick what you need and scale as you grow."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <ServiceCard
              title="Cybersecurity"
              description="Programs, assessments, and execution that reduce real-world risk."
              bullets={[
                "vCISO / security governance",
                "Risk-based vulnerability management (RBVM)",
                "Cloud security posture & hardening",
                "Incident readiness & tabletop exercises",
              ]}
            />
            <ServiceCard
              title="Cloud Deployments & Management"
              description="Secure Azure builds and reliable day-2 operations."
              bullets={[
                "Azure landing zones & network design",
                "AKS / container security",
                "Infrastructure as Code (IaC) pipelines",
                "Monitoring, logging, and cost governance",
              ]}
            />
            <ServiceCard
              title="Consultation"
              description="Architecture reviews and decision support for leadership and delivery teams."
              bullets={[
                "Security architecture reviews",
                "Threat modeling & secure design",
                "Compliance alignment (NIST, CIS, HIPAA/SOC2-ready)",
                "Tooling selection & integration",
              ]}
            />
          </div>
        </Container>
      </section>

      <section className="py-14 border-y border-slate-200 bg-slate-50">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="A simple engagement model"
            subtitle="Clear phases, clear outputs, and no mystery work."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Assess",
                desc: "Understand goals, risks, and constraints. Identify gaps and quick wins.",
              },
              {
                step: "02",
                title: "Build",
                desc: "Deliver secure architectures and implementations. Automate where possible.",
              },
              {
                step: "03",
                title: "Operate",
                desc: "Harden, monitor, and manage. Establish runbooks and SLAs.",
              },
              {
                step: "04",
                title: "Improve",
                desc: "Measure outcomes, tune controls, and continuously reduce risk.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
              >
                <div className="text-xs font-semibold text-slate-500">STEP {s.step}</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">{s.title}</div>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
