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

export const categories: Category[] = [
  {
    slug: "painting-contractor",
    name: "Painting Contractors",
    singular: "Painting Contractor",
    description:
      "Interior, exterior, residential, and commercial painting crews — profiled and updated weekly.",
  },
  {
    slug: "handyman-services",
    name: "Handyman Services",
    singular: "Handyman",
    description:
      "General home repair, installation, and maintenance crews for jobs too small or too varied for a single-trade contractor.",
  },
  {
    slug: "general-contractor",
    name: "General Contractors",
    singular: "General Contractor",
    description:
      "Remodeling and full-project construction contractors handling everything from single rooms to multi-trade builds.",
  },
  {
    slug: "masonry-chimney",
    name: "Masonry & Chimney Contractors",
    singular: "Masonry & Chimney Contractor",
    description:
      "Chimney restoration and masonry repair specialists — brick, stone, and chimney structural work.",
  },
  {
    slug: "moving-storage",
    name: "Moving & Storage Companies",
    singular: "Moving & Storage Company",
    description:
      "Residential and commercial movers offering local moving and storage services.",
  },
  {
    slug: "landscaping",
    name: "Landscaping Contractors",
    singular: "Landscaping Contractor",
    description:
      "Landscape design, lawn care, and property maintenance crews serving residential and commercial properties.",
  },
  {
    slug: "hvac-contractor",
    name: "HVAC Contractors",
    singular: "HVAC Contractor",
    description:
      "Heating and air conditioning installation, repair, and maintenance specialists.",
  },
  {
    slug: "home-remodeling",
    name: "Home Remodeling Contractors",
    singular: "Home Remodeling Contractor",
    description:
      "Specialty home remodeling and exterior improvement contractors.",
  },
  {
    slug: "tree-services",
    name: "Tree Services",
    singular: "Tree Service",
    description:
      "Tree removal, trimming, and stump grinding companies for residential and commercial properties.",
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
  {
    slug: "all-around-property-solutions",
    categorySlug: "handyman-services",
    businessName: "All Around Property Solutions",
    city: "Foley",
    region: "AL",
    phone: "(251) 384-4944",
    externalWebsite: "https://www.allaroundpropertysolutions.com/",
    description:
      "Family-owned, licensed and insured handyman company serving Foley, AL and the surrounding Baldwin, Clarke, Conecuh, and Monroe counties, covering home repairs, installations, carpentry, drywall, painting, flooring, landscape work, and debris removal.",
    services: ["Handyman Services", "Landscape Services", "Debris Removal"],
    social: [
      {
        platform: "Facebook",
        url: "https://facebook.com/profile.php?id=61591861850930",
      },
      {
        platform: "Yelp",
        url: "https://yelp.com/biz/all-around-property-solutions-foley",
      },
    ],
    streetAddress: "7184 Helton Dr",
    postalCode: "36535",
  },
  {
    slug: "alabama-ccc",
    categorySlug: "general-contractor",
    businessName: "Alabama CCC LLC",
    city: "Anniston",
    region: "AL",
    phone: "(256) 406-0236",
    externalWebsite: "https://www.alabamacccllc.com/",
    description:
      "Veteran owned, locally owned and operated general contractor established in 2023, serving Anniston, AL and surrounding Calhoun County communities with remodeling, tile, flooring, custom decks, and kitchen and bathroom remodeling.",
    services: [
      "Tile Services",
      "Flooring Services",
      "Remodeling Services",
      "Custom Decks",
      "Kitchen Remodeling",
      "Bathroom Remodeling",
    ],
    social: [
      {
        platform: "Facebook",
        url: "https://facebook.com/profile.php?id=61589239918190",
      },
      {
        platform: "Yelp",
        url: "https://yelp.com/biz/alabama-construction-consultanting-and-contracting-anniston",
      },
    ],
    streetAddress: "575 Kingsway Drive",
    postalCode: "36207",
  },
  {
    slug: "fino-masonry-chimney",
    categorySlug: "masonry-chimney",
    businessName: "Fino Masonry & Chimney Restoration",
    city: "Rochester",
    region: "NY",
    phone: "(585) 401-4655",
    externalWebsite: "https://finomasonryandchimney.com/",
    description:
      "Family-owned, third-generation chimney and masonry restoration company with more than 40 years of experience, CSIA certified, serving Rochester, NY and a 50-mile radius across 10 counties.",
    services: ["Chimney Repair & Restoration", "Masonry Restoration"],
    yearsExperience: 40,
    social: [],
  },
  {
    slug: "statewide-moving-co",
    categorySlug: "moving-storage",
    businessName: "State-Wide Moving Co, Inc.",
    city: "Hightstown",
    region: "NJ",
    phone: "(609) 362-5444",
    externalWebsite: "https://www.statewidemovingco.net/",
    description:
      "Family-owned moving and storage company serving Hightstown, NJ and 17 towns across central New Jersey.",
    services: ["Moving Services", "Storage Services"],
    social: [],
  },
  {
    slug: "tsl-landscaping",
    categorySlug: "landscaping",
    businessName: "TSL Landscaping & Property Maintenance",
    city: "Murfreesboro",
    region: "TN",
    phone: "(615) 622-6787",
    externalWebsite: "https://www.tsllandscaping.com/",
    description:
      "Licensed and insured landscaping and property maintenance company serving Murfreesboro, TN since 2008, covering Brentwood, Columbia, Franklin, Nashville, Springfield, and Rutherford County.",
    services: [
      "Landscape Design",
      "Flower Bed Planting",
      "Vegetation Management",
      "Pressure Washing",
      "Remedial Tree Work",
    ],
    social: [
      {
        platform: "Facebook",
        url: "https://facebook.com/profile.php?id=61591344970178",
      },
      {
        platform: "Yelp",
        url: "https://yelp.com/biz/tsl-property-maintenance-murfreesboro",
      },
    ],
    licenseNumber: "6045",
  },
  {
    slug: "affordable-heating-air",
    categorySlug: "hvac-contractor",
    businessName: "Affordable Heating and Air Conditioning",
    city: "Santa Rosa",
    region: "CA",
    phone: "(707) 466-8337",
    externalWebsite: "https://www.affordableheatingnairconditioning.com/",
    description:
      "Veteran-owned HVAC contractor with more than 36 years of experience serving Santa Rosa, CA and the surrounding area.",
    services: ["Heating Services", "Air Conditioning Services"],
    yearsExperience: 36,
    social: [],
  },
  {
    slug: "glazed-cellar-doors",
    categorySlug: "home-remodeling",
    businessName: "Glazed Cellar Doors",
    city: "Washington",
    region: "NJ",
    phone: "(908) 883-3877",
    externalWebsite: "https://www.glazedcellardoors.com/",
    description:
      "Cellar and Bilco door specialist by Confident Home Remodelers, a Steelway dealer installing glazed (non-painted) cellar doors set in hydraulic anchor cement instead of standard mortar, serving Warren County and Clifton, NJ, plus the Lehigh Valley, PA area.",
    services: ["Cellar Door Installation", "Cellar Door Glazing", "Cement Work"],
    social: [],
    streetAddress: "3 Singley Lane",
    postalCode: "07882",
  },
  {
    slug: "two-men-and-a-tree",
    categorySlug: "tree-services",
    businessName: "Two Men and a Tree LLC",
    city: "Dade City",
    region: "FL",
    phone: "(352) 410-8711",
    externalWebsite: "https://www.twomenandatree.net/",
    description:
      "Veteran-owned, family-owned and operated tree service backed by 60 years of combined experience, licensed and insured, serving Dade City, FL and Clermont, Hernando County, Spring Hill, Wesley Chapel, and Zephyrhills.",
    services: ["Tree Removal", "Stump Grinding", "Tree Trimming"],
    social: [
      {
        platform: "Facebook",
        url: "https://facebook.com/profile.php?id=61590709770789",
      },
    ],
    streetAddress: "3410 Jodi W Dr",
    postalCode: "33523",
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
  {
    slug: "when-a-handyman-vs-specialist-foley",
    clientSlug: "all-around-property-solutions",
    title: "Handyman or Specialist? A Foley Homeowner's Guide to Getting the Right Call",
    dateISO: "2026-08-18",
    logNumber: "LOG NO. 001",
    excerpt:
      "Not every home repair needs a specialty contractor. Here's how Baldwin County homeowners can tell which jobs a handyman should handle and which need a licensed trade specialist.",
    body: [
      "One of the most common questions homeowners in Foley and the surrounding Baldwin County area ask is whether a job needs a handyman or a specialist. The honest answer: most everyday repairs, installations, and small improvement projects — patching drywall, fixing a leaky faucet, assembling furniture, minor carpentry, small painting jobs — are exactly what a handyman is built for.",
      "Where it makes sense to bring in a specialist instead is anything touching gas lines, main electrical panels, or structural framing — those need a licensed trade contractor by code, regardless of how small the job looks.",
      "All Around Property Solutions has built its business around the in-between: a family-owned, licensed and insured team that handles the full range of repair, installation, and maintenance work across Baldwin, Clarke, Conecuh, and Monroe counties, so homeowners aren't stuck coordinating three separate contractors for one weekend's worth of fixes.",
      "If your list of small repairs has been growing for a few months, a single handyman visit is usually the faster and cheaper way to clear it — a free estimate is the easiest way to find out what fits in one appointment.",
    ],
  },
  {
    slug: "planning-a-remodel-anniston-permits",
    clientSlug: "alabama-ccc",
    title: "What Anniston Homeowners Should Know About Permits Before Starting a Remodel",
    dateISO: "2026-08-18",
    logNumber: "LOG NO. 001",
    excerpt:
      "Skipping a permit on a kitchen or bathroom remodel in Calhoun County can cost more than the fine — it can complicate a home sale later. Here's what actually needs one.",
    body: [
      "In Anniston and the rest of Calhoun County, most kitchen and bathroom remodels that involve moving plumbing or electrical lines, structural changes, or new construction like a deck require a permit — cosmetic-only work (new cabinets, paint, flooring in place) generally does not.",
      "The real cost of skipping a required permit usually shows up later, not immediately: unpermitted work can complicate a home sale, cause issues with insurance claims, and in some cases require the work to be redone to code before it can be sold or refinanced.",
      "Alabama CCC LLC, a veteran-owned general contractor established in 2023, builds permitting into its process from the start for Anniston-area clients — managing the paperwork and inspections alongside the tile, flooring, remodeling, deck, kitchen, and bathroom work itself, rather than leaving it for the homeowner to sort out separately.",
      "If you're weighing a remodel and aren't sure whether it needs a permit, that's a fast question to get answered before any work starts — a quick project consultation usually settles it.",
    ],
  },
  {
    slug: "signs-your-chimney-needs-restoration-rochester",
    clientSlug: "fino-masonry-chimney",
    title: "5 Signs Your Rochester Chimney Needs Restoration Before Winter",
    dateISO: "2026-08-18",
    logNumber: "LOG NO. 001",
    excerpt:
      "Upstate New York's freeze-thaw cycles are hard on chimney masonry. Here's what to look for before the first cold snap.",
    body: [
      "Rochester's winters put a specific kind of stress on chimney masonry: water gets into small cracks during a thaw, then freezes and expands, widening the crack a little more each cycle. Left unaddressed over a few winters, that process — freeze-thaw spalling — is how a small crack becomes a structural repair.",
      "A few signs worth checking before the weather turns: white, chalky staining on the brick (efflorescence, a sign moisture is moving through the masonry), visible mortar crumbling or missing between bricks, a chimney that looks like it's leaning, and rust or damage around the metal chimney cap or flashing.",
      "Fino Masonry & Chimney Restoration is a family-owned, third-generation company with more than 40 years of experience and CSIA certification, serving Rochester and a 50-mile radius across 10 counties — which means they've seen most versions of freeze-thaw damage before it becomes an emergency.",
      "If any of these signs sound familiar, getting a chimney looked at before winter is generally far less disruptive than dealing with it mid-season.",
    ],
  },
  {
    slug: "moving-checklist-central-nj",
    clientSlug: "statewide-moving-co",
    title: "The 8-Week Moving Checklist for Central New Jersey Families",
    dateISO: "2026-08-18",
    logNumber: "LOG NO. 001",
    excerpt:
      "Whether you're moving across Hightstown or across central Jersey, the same timeline mistakes trip people up. Here's a realistic 8-week plan.",
    body: [
      "The biggest moving-day stress usually traces back to decisions made too late, not too early. An 8-week runway gives enough time to get quotes, book a mover, and avoid the last-minute scramble that makes moving day feel chaotic.",
      "Weeks 8–6: get moving quotes and book your date — the sooner a date is locked in, the more flexibility you have on timing. Weeks 5–3: start sorting and decluttering room by room, and line up any storage you'll need in the gap between move-out and move-in. Weeks 2–1: confirm details with your mover, pack a essentials box separately, and handle address changes (mail forwarding, utilities, subscriptions).",
      "State-Wide Moving Co, Inc. is a family-owned moving and storage company serving Hightstown, NJ and 17 towns across central New Jersey, which means local knowledge of the area's apartment buildings, HOA rules, and town-specific parking permit requirements that often trip up movers coming from outside the area.",
      "If a move is on the calendar in the next couple of months, getting a quote now — rather than a few weeks out — is what keeps the whole 8-week plan realistic.",
    ],
  },
  {
    slug: "fall-cleanup-checklist-murfreesboro",
    clientSlug: "tsl-landscaping",
    title: "Fall Cleanup Checklist for Murfreesboro Yards",
    dateISO: "2026-08-18",
    logNumber: "LOG NO. 001",
    excerpt:
      "Middle Tennessee's mild falls make it tempting to put off yard cleanup — but a few tasks done now save real problems in spring.",
    body: [
      "Murfreesboro's fall weather is mild enough that yard cleanup often gets pushed off, but a handful of tasks are genuinely easier and more effective done in fall than waited on until spring: clearing leaf buildup before it mats down and smothers grass, a final mow at a slightly lower height to reduce fungal issues over winter, and cutting back perennials before the first hard frost.",
      "Fall is also the right window for any remedial tree work — pruning is easier to judge once leaves have thinned, and damaged limbs are safer to address before winter storms add weight and wind stress.",
      "TSL Landscaping & Property Maintenance has served Murfreesboro since 2008 (licensed and insured, License #6045), with services covering landscape design, flower bed planting, vegetation management, pressure washing, and remedial tree work across Brentwood, Columbia, Franklin, Nashville, Springfield, and Rutherford County.",
      "A single fall cleanup visit typically covers most of this in one appointment — worth scheduling before the first frost rather than after.",
    ],
  },
  {
    slug: "hvac-tune-up-before-fall-santa-rosa",
    clientSlug: "affordable-heating-air",
    title: "Why Santa Rosa Homeowners Should Schedule an HVAC Tune-Up Before Fall",
    dateISO: "2026-08-18",
    logNumber: "LOG NO. 001",
    excerpt:
      "A heating system that's sat unused since spring can develop small issues that only show up the first cold night. A fall tune-up catches them early.",
    body: [
      "In Santa Rosa, heating systems typically sit idle for six months or more between spring and the first genuinely cold nights of fall. That downtime is exactly when small issues — a worn belt, a clogged filter, a pilot light that's drifted out of calibration — tend to develop unnoticed, only surfacing the first time the system actually has to run.",
      "A pre-season tune-up catches most of these before they turn into a no-heat call on the coldest night of the month, and it's generally far cheaper than an emergency repair.",
      "Affordable Heating and Air Conditioning is a veteran-owned HVAC contractor with more than 36 years of experience serving Santa Rosa, covering both heating and air conditioning service and repair.",
      "If your system hasn't been looked at since last winter, scheduling a check now — before the first cold snap — is the simplest way to avoid finding out about a problem the hard way.",
    ],
  },
  {
    slug: "why-glazing-beats-painting-cellar-doors",
    clientSlug: "glazed-cellar-doors",
    title: "Why Glazing Outlasts Painting on a Steel Cellar Door",
    dateISO: "2026-08-18",
    logNumber: "LOG NO. 001",
    excerpt:
      "A painted cellar door and a glazed one look similar on install day. A few New Jersey winters later, they don't.",
    body: [
      "A steel cellar or Bilco door is, functionally, the same kind of object as a bathtub — steel that's exposed to water constantly. Paint sits on top of steel as a thin film that water eventually works underneath, which is exactly how rust starts on a painted door within a few seasons.",
      "Glazing works differently: it's a non-porous industrial coating that bonds to the steel as a true barrier rather than a surface layer, which is why it stops rust from starting in the first place rather than just covering it up temporarily.",
      "Glazed Cellar Doors, operating as Confident Home Remodelers and a Steelway dealer, glazes every unit prior to delivery and sets installations in hydraulic anchor cement — rated at roughly 9,000 psi versus about 1,800 psi for standard Type-S mortar — specifically because water intrusion at the cement joint is the other common failure point for cellar doors, not just the steel surface itself.",
      "The company serves Warren County and Clifton, NJ, along with the nearby Lehigh Valley, PA area. For a cellar door that's already rusting or was installed over deteriorating mortar, a walkthrough is the fastest way to see what replacement or repair options fit.",
    ],
  },
  {
    slug: "when-a-tree-needs-removal-vs-trimming",
    clientSlug: "two-men-and-a-tree",
    title: "Remove It or Trim It? How Dade City Homeowners Can Tell",
    dateISO: "2026-08-24",
    logNumber: "LOG NO. 001",
    excerpt:
      "A leaning or cracked tree isn't always a removal job. Here's how to think through the difference before calling anyone out.",
    body: [
      "Not every tree that looks concerning actually needs to come down. The general dividing line: trimming addresses branches — dead limbs, overgrowth near a roofline, storm-damaged sections — while removal is for the tree itself when the trunk shows structural problems like deep cracks, significant lean that's worsened over time, or decay at the base.",
      "A tree that's simply overgrown and blocking light or crowding a structure is usually a trimming job, not a removal. A tree that's leaning noticeably more than it used to, has large dead sections, or shows fungal growth at the base is worth a professional assessment before the next storm.",
      "Two Men and a Tree LLC is a veteran-owned, family-owned business backed by 60 years of combined experience, serving Dade City, Clermont, Hernando County, Spring Hill, Wesley Chapel, and Zephyrhills with tree removal, trimming, and stump grinding.",
      "Florida's storm season adds urgency to this decision — a tree with structural issues is far more likely to fail in high wind than one that's simply overgrown. If there's any doubt, a free estimate settles which category a tree actually falls into.",
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
