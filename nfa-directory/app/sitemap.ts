import { MetadataRoute } from "next";
import { getCategories, getAllClients, getAllPosts } from "./lib/data";
import { SITE_URL } from "./lib/schema";

// This runs automatically at build/deploy time. Every new client or post
// added to the data layer (or, later, the database) shows up here with
// zero manual sitemap work — this is what keeps GSC setup to one property
// and one submission for the whole platform.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
  ];

  const categoryEntries: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const clientEntries: MetadataRoute.Sitemap = getAllClients().map((c) => ({
    url: `${SITE_URL}/${c.categorySlug}/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((p) => {
    const client = getAllClients().find((c) => c.slug === p.clientSlug)!;
    return {
      url: `${SITE_URL}/${client.categorySlug}/${client.slug}/${p.slug}`,
      lastModified: p.dateISO,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticEntries, ...categoryEntries, ...clientEntries, ...postEntries];
}
