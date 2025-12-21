import { Container } from "./Container";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container>
        <div className="py-10 grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-900">{site.name}</div>
            <p className="text-sm text-slate-600">{site.tagline}</p>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-900">Services</div>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>Cybersecurity (RBVM, vCISO, assessments)</li>
              <li>Cloud Deployments & Management (Azure)</li>
              <li>Consultation (architecture, strategy)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-slate-900">Contact</div>
            <p className="text-sm text-slate-600">
              Email: <a className="underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </p>
            <p className="text-xs text-slate-500">© {year} {site.name}. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
