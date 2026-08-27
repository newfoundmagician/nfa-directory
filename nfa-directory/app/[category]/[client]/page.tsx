import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostCard from "../../components/PostCard";
import JsonLd from "../../components/JsonLd";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  getCategory,
  getClient,
  getAllClients,
  getClientsByCategory,
  getPostsByClient,
} from "../../lib/data";
import {
  localBusinessSchema,
  breadcrumbSchema,
  clientMetaTitle,
  clientMetaDescription,
} from "../../lib/schema";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllClients().map((c) => ({
    category: c.categorySlug,
    client: c.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string; client: string };
}): Metadata {
  const category = getCategory(params.category);
  const client = getClient(params.category, params.client);
  if (!client || !category) return {};
  return {
    title: clientMetaTitle(client, category),
    description: clientMetaDescription(client, category),
  };
}

export default function ClientProfilePage({
  params,
}: {
  params: { category: string; client: string };
}) {
  const category = getCategory(params.category);
  const client = getClient(params.category, params.client);
  if (!category || !client) notFound();

  const clientPosts = getPostsByClient(client.slug);
  const relatedClients = getClientsByCategory(category.slug)
    .filter((c) => c.slug !== client.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={localBusinessSchema(client, category)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: category.name, url: `/${category.slug}` },
          {
            name: client.businessName,
            url: `/${category.slug}/${client.slug}`,
          },
        ])}
      />
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: category.name, href: `/${category.slug}` },
            { name: client.businessName },
          ]}
        />
        <div className="border-2 border-ink bg-white p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-signal">
                {category.singular} · {client.city}, {client.region}
              </p>
              <h1 className="mt-2 font-display text-4xl font-bold text-ink">
                {client.businessName}
              </h1>
              <p className="mt-4 max-w-xl text-charcoal/80">
                {client.description}
              </p>
            </div>
            {client.yearsExperience && (
              <span className="ticket-stamp flex h-20 w-20 flex-none flex-col items-center justify-center text-center font-mono text-ink">
                <span className="text-xl font-bold leading-none">
                  {client.yearsExperience}
                </span>
                <span className="text-[9px] leading-none">YEARS</span>
              </span>
            )}
          </div>

          <div className="rule-dashed my-6" />

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-slate">
                Services
              </h2>
              <ul className="mt-2 space-y-1 text-sm text-charcoal/90">
                {client.services.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-slate">
                Contact
              </h2>
              <p className="mt-2 text-sm text-charcoal/90">{client.phone}</p>
              <a
                href={client.externalWebsite}
                rel="sponsored noopener noreferrer"
                target="_blank"
                className="mt-1 inline-block text-sm font-semibold text-signal underline"
              >
                Visit official website →
              </a>
              {client.currentPromo && (
                <p className="mt-4 border-l-2 border-signal pl-3 text-sm text-charcoal/90">
                  {client.currentPromo}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-paperDark px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-slate">
          Promoted content — published on behalf of {client.businessName}
        </div>

        <h2 className="mt-16 font-display text-2xl font-bold text-ink">
          Field Log
        </h2>
        <p className="mt-1 text-sm text-charcoal/70">
          Weekly updates from {client.businessName}.
        </p>

        <div className="mt-8 space-y-2">
          {clientPosts.length === 0 && (
            <p className="text-sm text-charcoal/60">
              No entries filed yet — check back soon.
            </p>
          )}
          {clientPosts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              href={`/${category.slug}/${client.slug}/${post.slug}`}
            />
          ))}
        </div>

        {relatedClients.length > 0 && (
          <>
            <h2 className="mt-16 font-display text-2xl font-bold text-ink">
              Other {category.name} Nearby
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedClients.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/${category.slug}/${rc.slug}`}
                  className="border-2 border-ink bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-ink hover:text-paper"
                >
                  {rc.businessName} — {rc.city}, {rc.region}
                </Link>
              ))}
            </div>
          </>
        )}

        <p className="mt-6">
          <Link
            href={`/${category.slug}`}
            className="font-mono text-[11px] uppercase tracking-widest text-slate hover:text-signal"
          >
            ← All {category.name}
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
