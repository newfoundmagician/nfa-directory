// ---------------------------------------------------------------------------
// DATA LAYER
// Categories, clients, and posts now live in app/data/*.json instead of
// hardcoded here. This file just types and re-exports them. This is what
// lets the weekly automation script (scripts/generate-weekly-posts.mjs)
// add new posts by editing JSON, with zero TypeScript changes required.
// ---------------------------------------------------------------------------

import categoriesJson from "../data/categories.json";
import clientsJson from "../data/clients.json";
import postsJson from "../data/posts.json";

export type Category = {
  slug: string;
  name: string; // plural, human-facing e.g. "Painting Contractors"
  singular: string; // e.g. "Painting Contractor"
  description: string;
};

export type ClientProfile = {
  slug: string;
  categorySlug: string;
  businessName: string;
  city: string;
  region: string; // state
  phone: string;
  externalWebsite: string; // client's own site — sponsored link target
  description: string;
  services: string[];
  yearsExperience?: number;
  customersServed?: string;
  social: { platform: string; url: string }[];
  currentPromo?: string;
  // Optional — only set when the client's own site actually states these.
  // Never fill with placeholder text; leave the field out entirely instead.
  streetAddress?: string;
  postalCode?: string;
  licenseNumber?: string;
};

export type BlogPost = {
  slug: string;
  clientSlug: string;
  title: string;
  dateISO: string; // YYYY-MM-DD
  logNumber: string; // display ticket number, e.g. "LOG NO. 014"
  excerpt: string;
  body: string[]; // paragraphs
};

export const categories: Category[] = categoriesJson as Category[];
export const clients: ClientProfile[] = clientsJson as ClientProfile[];
export const posts: BlogPost[] = postsJson as BlogPost[];

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getClientsByCategory(categorySlug: string): ClientProfile[] {
  return clients.filter((c) => c.categorySlug === categorySlug);
}

export function getClient(
  categorySlug: string,
  clientSlug: string
): ClientProfile | undefined {
  return clients.find(
    (c) => c.categorySlug === categorySlug && c.slug === clientSlug
  );
}

export function getAllClients(): ClientProfile[] {
  return clients;
}

export function getPostsByClient(clientSlug: string): BlogPost[] {
  return posts
    .filter((p) => p.clientSlug === clientSlug)
    .sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
}

export function getPost(
  clientSlug: string,
  postSlug: string
): BlogPost | undefined {
  return posts.find((p) => p.clientSlug === clientSlug && p.slug === postSlug);
}

export function getAllPosts(): BlogPost[] {
  return posts;
}
