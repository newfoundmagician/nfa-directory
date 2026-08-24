import Link from "next/link";
import { SITE_NAME } from "../lib/schema";

export default function Header() {
  return (
    <header className="border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="ticket-stamp flex h-10 w-10 items-center justify-center font-display text-sm font-bold text-ink">
            TL
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            {SITE_NAME}
          </span>
        </Link>
        <nav className="font-mono text-xs uppercase tracking-widest text-slate">
          <Link href="/painting-contractor" className="hover:text-signal">
            Painting Contractors
          </Link>
        </nav>
      </div>
    </header>
  );
}
