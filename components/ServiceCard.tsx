import Link from "next/link";

export function ServiceCard({
  title,
  description,
  bullets,
  href = "/contact",
}: {
  title: string;
  description: string;
  bullets: string[];
  href?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-slate-900/5 grid place-items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-900" />
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <Link
          href={href}
          className="text-sm font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-700"
        >
          Talk to an expert →
        </Link>
      </div>
    </div>
  );
}
