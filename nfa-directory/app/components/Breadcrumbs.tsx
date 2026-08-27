import Link from "next/link";

export type Crumb = { name: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-widest text-slate">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-signal">
                {item.name}
              </Link>
            ) : (
              <span className="text-ink">{item.name}</span>
            )}
            {i < items.length - 1 && <span className="text-rule">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
