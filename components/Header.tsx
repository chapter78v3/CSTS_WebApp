import Link from "next/link";
import { Container } from "./Container";
import { NavLink } from "./NavLink";
import { site } from "@/lib/site";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-b from-sky-900/80 to-slate-900/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-900 font-bold">
              {site.shortName}
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">
                {site.name}
              </div>
              <div className="text-xs text-slate-300">
                Cybersecurity &amp; Cloud
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="/services" className="text-slate-200 hover:text-white">
              Services
            </NavLink>
            <NavLink href="/industries" className="text-slate-200 hover:text-white">
              Industries
            </NavLink>
            <NavLink href="/case-studies" className="text-slate-200 hover:text-white">
              Case Studies
            </NavLink>
            <NavLink href="/about" className="text-slate-200 hover:text-white">
              About
            </NavLink>
            <NavLink href="/contact" className="text-slate-200 hover:text-white">
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href="/contact"
              variant="secondary"
              className="hidden sm:inline-flex border-white/30 text-white hover:bg-white/10"
            >
              Request a quote
            </Button>
            <Button
              href="/contact"
              className="bg-white text-slate-900 hover:bg-slate-10
