import Link from "next/link";
import { ClientProfile } from "../lib/data";

export default function ClientCard({ client }: { client: ClientProfile }) {
  return (
    <Link
      href={`/${client.categorySlug}/${client.slug}`}
      className="group block border-2 border-ink bg-white p-6 transition-transform hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-signal">
            {client.city}, {client.region}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-ink group-hover:text-signal">
            {client.businessName}
          </h3>
        </div>
        {client.yearsExperience && (
          <span className="ticket-stamp flex h-14 w-14 flex-none flex-col items-center justify-center text-center font-mono text-ink">
            <span className="text-base font-bold leading-none">
              {client.yearsExperience}
            </span>
            <span className="text-[8px] leading-none">YRS</span>
          </span>
        )}
      </div>
      <p className="mt-3 text-sm text-charcoal/80">{client.description}</p>
      <div className="rule-dashed my-4" />
      <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
        {client.services.slice(0, 3).join(" · ")}
        {client.services.length > 3 ? " · …" : ""}
      </p>
    </Link>
  );
}
