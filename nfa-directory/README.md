# NFA Client Directory Platform

A multi-tenant directory site: one shared platform, one page per client
(profile + weekly blog feed), organized by industry. Built with Next.js
App Router so every page is server-rendered and indexable by default —
no JavaScript-rendering SEO issues.

Currently live with 2 clients under the **Painting Contractor** category:
Mathew's Painting (Manassas Park, VA) and Julian Ramos Painting
(Riverside, CA).

## 1. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## 2. Before you deploy — rename the platform + set the domain

Open `app/lib/schema.ts` and change these two lines:

```ts
const SITE_NAME = "TradeLine Local"; // <- your real platform name
const SITE_URL = "https://www.example.com"; // <- your real domain
```

`TradeLine Local` was a working placeholder name for this scaffold —
swap in the name/domain you already have picked before launch. Every
schema field, the sitemap, and all page metadata pull from these two
constants, so this is the only place you need to change it.

## 3. Deploy

This is a standard Next.js app — the fastest path is Vercel:

1. Push this folder to a GitHub repo.
2. Import the repo in Vercel.
3. Point your domain at the Vercel project (Vercel issues the SSL
   cert automatically).
4. Done — `sitemap.xml` and `robots.txt` are generated automatically
   at `/sitemap.xml` and `/robots.txt`.

## 4. Google Search Console — one-time setup

Because this is one platform on one domain (not per-client subdomains),
GSC setup is a single pass, not one per client:

1. Add the domain as a property in Search Console (domain property,
   not URL-prefix, so it covers `www` and non-`www` automatically).
2. Verify via DNS TXT record (or the HTML meta tag Vercel/your
   registrar supports).
3. Submit `https://yourdomain.com/sitemap.xml` under Sitemaps.
4. Every new client or post you add to the data layer appears in the
   sitemap automatically on the next deploy — no further GSC work per
   client.

## 5. Adding a new client

Everything lives in `app/lib/data.ts` for now (see note below on
swapping this for a real database). To add a client:

1. Add a category to the `categories` array if it's a new industry
   (e.g. `"roofing-contractor"`).
2. Add an entry to the `clients` array with their real business
   info — **do not fill in fields you don't have real data for**
   (street address, hours, license number). Leave them out of the
   object entirely; the schema builder only emits fields that exist,
   so the page won't validate with fake placeholder data. Ask the
   account owner for the missing fields and add them when you have them.
3. Add their weekly post(s) to the `posts` array.

The client's profile page, blog feed, sitemap entries, and JSON-LD
schema all update automatically — no template edits needed.

## 6. Swapping the data layer for a real database

`app/lib/data.ts` is intentionally the only file that touches data.
Every page (`app/page.tsx`, `app/[category]/page.tsx`, etc.) calls
functions like `getAllClients()` and `getPostsByClient()` — none of
them know or care whether that data comes from a plain array or a
database. To move to Supabase (or any DB):

1. Keep the same `Category`, `ClientProfile`, and `BlogPost` types.
2. Replace the body of each `get...()` function with a real query.
3. Nothing in `app/` needs to change.

## 7. Admin dashboard — current status

`app/admin` and `app/admin/dashboard` are **UI scaffolding only**.
The login form doesn't authenticate anyone yet, and the "new post"
form doesn't save anything. Both are marked `robots: { index: false }`
so they won't get indexed in the meantime. Before this goes live as a
real workflow tool, it needs:

- A real auth provider (Supabase Auth or NextAuth) with two roles:
  `nfa_admin` (sees everything) and `client` (scoped to their own
  profile only).
- A server action or API route on the dashboard's post form that
  writes to the real database instead of doing nothing.

## 8. Linking policy

Every link from a client's profile/posts back to their own website
uses `rel="sponsored"` (see `ClientProfilePage` and `PostPage`). This
is intentional — this content is paid promotion, and marking it as
such is what keeps Google from treating these links as a manipulative
link scheme against the client's own site. Don't remove `rel="sponsored"`
from these links.
