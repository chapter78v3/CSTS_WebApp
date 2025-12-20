import Link from "next/link";
import { Container } from "./Container";
import { NavLink } from "./NavLink";
import { site } from "@/lib/site";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white font-bold">
              {site.shortName}
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">{site.name}</div>
              <div className="text-xs text-slate-500">Cybersecurity & Cloud</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/industries">Industries</NavLink>
            <NavLink href="/case-studies">Case Studies</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <Button href="/contact" variant="secondary" className="hidden sm:inline-flex">
              Request a quote
            </Button>
            <Button href="/contact">Book a consult</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
