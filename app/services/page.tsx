import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CTA } from "@/components/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Cybersecurity, cloud delivery, and hands-on consulting"
            subtitle="Choose a focused engagement or bundle services for end-to-end outcomes."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ServiceCard
              title="Cybersecurity"
              description="Build and run a security program that holds up to real attacks and audits."
              bullets={[
                "Security program development (policies, standards, governance)",
                "RBVM: prioritization, SLAs, exception workflows",
                "Cloud security hardening and baselines",
                "Security tooling: SIEM, SOAR, EDR, CSPM guidance",
              ]}
            />
            <ServiceCard
              title="Cloud Deployments & Management"
              description="Secure-by-default Azure deployments with reliable operations."
              bullets={[
                "Azure network architecture (hub/spoke, firewall, VPN/ER)",
                "AKS and ingress/WAF patterns",
                "CI/CD and secure SDLC pipelines",
                "Monitoring/logging, backup/DR, and cost controls",
              ]}
            />
            <ServiceCard
              title="Consultation"
              description="Get expert guidance on architecture, strategy, and execution."
              bullets={[
                "Architecture reviews and threat modeling",
                "Compliance readiness (NIST CSF, CIS, HIPAA/SOC 2 alignment)",
                "Security assessments and remediation roadmaps",
                "Executive and engineering stakeholder workshops",
              ]}
            />
          </div>

          <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-xl font-bold text-slate-900">Typical deliverables</h3>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
              {[
                "Architecture diagrams and reference designs",
                "Implementation runbooks and SOPs",
                "Risk register and remediation plan",
                "Security control mapping and evidence guidance",
                "Operational dashboards and reporting templates",
                "Training and enablement sessions",
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
