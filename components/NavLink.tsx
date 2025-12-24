import Link from "next/link";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function NavLink({ href, children, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={[
        "text-sm font-semibold text-white transition-colors hover:text-slate-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Link>
  );
}
