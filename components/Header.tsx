import Link from "next/link";
import { Container } from "./Container";
import { NavLink } from "./NavLink";
import { site } from "@/lib/site";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-b from-sky-900 to-slate-900 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white font-bold text-slate-900">
              {site.shortName}
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">{site.name}</div>
              <div className="text-xs text-slate-300">Cybersecurity &amp; Cloud</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 md:flex text-sm font-semibold text-white">
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/industries">Industries</NavLink>
            <NavLink href="/case-studies">Case Studies</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>  

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <Button
              href="/contact"
              variant="secondary"
              className="hidden sm:inline-flex border border-sky-400 bg-sky-700/30 text-sky-100 hover:bg-sky-700/50"
            >
              Request a quote
            </Button>
            <Button href="/contact" className="bg-sky-500 font-semibold text-white hover:bg-sky-600">
              Book a consult
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
