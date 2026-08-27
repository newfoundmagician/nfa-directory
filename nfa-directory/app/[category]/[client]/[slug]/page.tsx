import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import JsonLd from "../../../components/JsonLd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { getCategory, getClient, getPost, getAllPosts } from "../../../lib/data";
import { blogPostingSchema, breadcrumbSchema, postMetaTitle } from "../../../lib/schema";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string; client: string; slug: string };
}): Metadata {
  const category = getCategory(params.category);
  const client = getClient(params.category, params.client);
  const post = getPost(params.client, params.slug);
  if (!post || !client || !category) return {};
  return {
    title: postMetaTitle(post, client, category),
    description: post.excerpt,
  };
}

export default function PostPage({
  params,
}: {
  params: { category: string; client: string; slug: string };
}) {
  const category = getCategory(params.category);
  const client = getClient(params.category, params.client);
  const post = getPost(params.client, params.slug);
  if (!category || !client || !post) notFound();

  return (
    <>
      <JsonLd data={blogPostingSchema(post, client, category)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: category.name, url: `/${category.slug}` },
          {
            name: client.businessName,
            url: `/${category.slug}/${client.slug}`,
          },
          {
            name: post.title,
            url: `/${category.slug}/${client.slug}/${post.slug}`,
          },
        ])}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: category.name, href: `/${category.slug}` },
            {
              name: client.businessName,
              href: `/${category.slug}/${client.slug}`,
            },
            { name: post.title },
          ]}
        />
        <Link
          href={`/${category.slug}/${client.slug}`}
          className="font-mono text-[11px] uppercase tracking-widest text-slate hover:text-signal"
        >
          ← {client.businessName}
        </Link>

        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-signal">
          {post.logNumber} — {post.dateISO}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 inline-block bg-paperDark px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-slate">
          Promoted content — published on behalf of {client.businessName}
        </div>

        <div className="rule-dashed my-8" />

        <article className="space-y-5 text-charcoal/90">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        <div className="mt-12 border-2 border-ink bg-white p-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate">
            About {client.businessName}
          </p>
          <p className="mt-2 text-sm text-charcoal/80">{client.description}</p>
          <a
            href={client.externalWebsite}
            rel="sponsored noopener noreferrer"
            target="_blank"
            className="mt-3 inline-block text-sm font-semibold text-signal underline"
          >
            Visit {client.businessName} →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
