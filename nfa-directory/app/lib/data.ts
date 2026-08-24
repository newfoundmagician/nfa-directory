// ---------------------------------------------------------------------------
// DATA LAYER
// This file is the platform's entire "database" for now — plain typed
// objects. It is written so that swapping this out for a real database
// (Supabase, Postgres, etc.) later only means replacing the functions
// below (getCategories, getClient, getPosts, ...) with real queries —
// nothing in the app/ route files needs to change.
// ---------------------------------------------------------------------------

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
  // Fields intentionally left out until the client supplies them:
  // streetAddress, postalCode, hours, licenseNumber.
  // Do not fill these with placeholder text — omit from schema until real.
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

export const categories: Category[] = [
  {
    slug: "painting-contractor",
    name: "Painting Contractors",
    singular: "Painting Contractor",
    description:
      "Interior, exterior, residential, and commercial painting crews — profiled and updated weekly.",
  },
];

export const clients: ClientProfile[] = [
  {
    slug: "mathews-painting",
    categorySlug: "painting-contractor",
    businessName: "Mathew's Painting",
    city: "Manassas Park",
    region: "VA",
    phone: "(703) 740-3396",
    externalWebsite: "https://www.mathews-painting.com/",
    description:
      "Licensed and insured painting contractor serving Manassas Park, VA and the surrounding area for more than 30 years, covering interior and exterior painting, drywall repair, pressure washing, and related surface work for homes and businesses.",
    services: [
      "Interior Painting",
      "Exterior Painting",
      "Commercial Painting",
      "Residential Painting",
      "Pressure Washing",
      "Drywall Repair",
      "Drywall Spackle",
      "Fence Painting",
      "Deck Painting",
      "Basement Finishing",
    ],
    yearsExperience: 30,
    customersServed: "10,000+",
    social: [
      { platform: "Facebook", url: "https://facebook.com/mathewspaintingllc" },
      {
        platform: "Yelp",
        url: "https://yelp.com/biz/mathews-painting-manassas-park",
      },
    ],
    currentPromo: "Paint 4 rooms and the 5th room is free.",
  },
  {
    slug: "julian-ramos-painting",
    categorySlug: "painting-contractor",
    businessName: "Julian Ramos Painting",
    city: "Riverside",
    region: "CA",
    phone: "(951) 221-4544",
    externalWebsite: "https://www.julianramospainting.net/",
    description:
      "Painting contractor bringing 19 years of experience to residential and commercial projects in Riverside, CA and the surrounding area, including stucco repair and texture matching alongside standard interior and exterior work.",
    services: [
      "Interior Painting",
      "Exterior Painting",
      "Commercial Painting",
      "Residential Painting",
      "Drywall Repair",
      "Stucco Repair",
      "Texture Matching",
    ],
    yearsExperience: 19,
    customersServed: "10,000+",
    social: [
      {
        platform: "Facebook",
        url: "https://facebook.com/Julian-Ramos-Painting-104360165157598",
      },
      { platform: "Yelp", url: "https://yelp.com/biz/R9Ni-BHjRtEIXfnjZPRA9g" },
    ],
    currentPromo: "5% off all services — holiday special.",
  },
];

export const posts: BlogPost[] = [
  {
    slug: "when-to-repaint-exterior-manassas-park",
    clientSlug: "mathews-painting",
    title: "How Often Should You Repaint Your Home's Exterior in Manassas Park?",
    dateISO: "2026-08-18",
    logNumber: "LOG NO. 001",
    excerpt:
      "Northern Virginia's humid summers and freeze-thaw winters wear exterior paint down faster than most homeowners expect. Here's a realistic repaint timeline by surface type.",
    body: [
      "Most exterior paint jobs in the Manassas Park area hold up for 5 to 8 years on wood siding, and closer to 8 to 10 years on brick or fiber cement, before the surface needs another coat. That range is narrower than in drier climates — Northern Virginia's humid summers and freeze-thaw winter cycles both accelerate cracking, peeling, and UV fade.",
      "The clearest early warning signs are chalking (a powdery residue that rubs off on your hand when you touch the siding), hairline cracking around window and door trim, and caulking that has pulled away from joints. Any of these left unaddressed lets moisture behind the paint film, which is what eventually turns a repaint into a repaint-plus-repair job.",
      "Mathew's Painting has been repainting and maintaining homes in Manassas Park for more than 30 years, and the team's general rule of thumb is to inspect south- and west-facing walls first — they take the most direct sun and tend to show wear years before the shaded sides of a house do.",
      "Right now, Mathew's Painting is offering a paint 4 rooms, 5th room free promotion for interior work, alongside their full lineup of exterior, drywall, and pressure washing services. If your home's exterior is showing any of the signs above, a free estimate is the fastest way to find out whether you're looking at a simple repaint or something more.",
    ],
  },
  {
    slug: "stucco-vs-drywall-repair-riverside",
    clientSlug: "julian-ramos-painting",
    title: "Stucco Cracks vs. Drywall Damage: What Riverside Homeowners Are Actually Looking At",
    dateISO: "2026-08-18",
    logNumber: "LOG NO. 001",
    excerpt:
      "Not every crack in a Riverside home is the same repair. Here's how to tell stucco settling apart from drywall damage before you call anyone out.",
    body: [
      "Riverside's clay-heavy soil and dry heat put two very different kinds of stress on a home: stucco exteriors develop hairline settling cracks as the ground shifts seasonally, while interior drywall more often cracks from humidity swings, minor structural settling, or old texture that's simply degrading with age.",
      "Hairline stucco cracks under about 1/16 inch are usually cosmetic and can be sealed and re-textured. Wider cracks, or ones that run diagonally from window and door corners, are worth a closer look — they can be a sign of deeper settling that a simple patch won't fix long-term.",
      "Julian Ramos Painting brings 19 years of experience in the Riverside area to exactly this kind of diagnosis, offering stucco repair and texture matching alongside standard drywall repair — the texture matching step is what keeps a patch from being visible once it's painted over, which is where a lot of DIY repairs fall short.",
      "The team is currently running a 5% off holiday special across all services. If your home has cracking you're unsure about, a walkthrough is the fastest way to find out whether you're looking at a stucco issue, a drywall issue, or both.",
    ],
  },
];

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
