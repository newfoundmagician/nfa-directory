import { notFound } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClientCard from "../components/ClientCard";
import JsonLd from "../components/JsonLd";
import Breadcrumbs from "../components/Breadcrumbs";
import { getCategory, getClientsByCategory, getCategories } from "../lib/data";
import { breadcrumbSchema, categoryMetaTitle } from "../lib/schema";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const category = getCategory(params.category);
  if (!category) return {};
  return {
    title: categoryMetaTitle(category),
    description: category.description,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const clients = getClientsByCategory(category.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: category.name, url: `/${category.slug}` },
        ])}
      />
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: category.name },
          ]}
        />
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Industry
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink">
          {category.name}
        </h1>
        <p className="mt-3 max-w-xl text-charcoal/80">{category.description}</p>

        <div className="rule-dashed my-10" />

        <div className="grid gap-4 sm:grid-cols-2">
          {clients.map((client) => (
            <ClientCard key={client.slug} client={client} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
