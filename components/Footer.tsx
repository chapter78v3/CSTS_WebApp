import { Container } from "./Container";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-sky-900 to-slate-900">
      <Container>
        <div className="grid gap-6 py-10 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-white">{site.name}</div>
            <p className="text-sm text-slate-200">{site.tagline}</p>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-white">Services</div>
            <ul className="space-y-1 text-sm text-slate-200">
              <li>Cybersecurity (RBVM, vCISO, Assessments)</li>
              <li>Cloud Deployments &amp; Management (Azure)</li>
              <li>Consultation (architecture, strategy)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-white">Contact</div>
            <p className="text-sm text-slate-200">
              Email:{" "}
              <a
                className="underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                href={`mailto:${site.contactEmail}`}
              >
                {site.contactEmail}
              </a>
            </p>
            <p className="text-xs text-slate-400">
              © {year} {site.name}. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
