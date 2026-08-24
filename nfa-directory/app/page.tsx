import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientCard from "./components/ClientCard";
import { getCategories, getAllClients } from "./lib/data";

export default function HomePage() {
  const categories = getCategories();
  const clients = getAllClients();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Local Trade Directory
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Real local businesses, filed and updated every week.
        </h1>
        <p className="mt-4 max-w-xl text-charcoal/80">
          Every listing here is a working trade business — profiled by
          industry and city, with a running log of updates instead of a
          static brochure page.
        </p>

        <div className="rule-dashed my-12" />

        <h2 className="font-mono text-xs uppercase tracking-widest text-slate">
          Browse by Industry
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="border-2 border-ink bg-white p-6 transition-transform hover:-translate-y-0.5"
            >
              <h3 className="font-display text-2xl font-bold text-ink">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm text-charcoal/80">{cat.description}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-signal">
                {clients.filter((c) => c.categorySlug === cat.slug).length}{" "}
                listed →
              </p>
            </Link>
          ))}
        </div>

        <div className="rule-dashed my-12" />

        <h2 className="font-mono text-xs uppercase tracking-widest text-slate">
          Recently Filed
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {clients.map((client) => (
            <ClientCard key={client.slug} client={client} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
