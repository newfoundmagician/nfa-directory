import { SITE_NAME } from "../lib/schema";

export default function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-5xl px-6 py-10 font-mono text-xs uppercase tracking-widest text-paper/70">
        <p>{SITE_NAME} — Local Trade Directory</p>
        <p className="mt-2 normal-case tracking-normal text-paper/50">
          Profiles on this site include sponsored content published on
          behalf of the listed business. Outbound links to a listed
          business&apos;s own website are marked rel=&quot;sponsored&quot;.
        </p>
      </div>
    </footer>
  );
}
