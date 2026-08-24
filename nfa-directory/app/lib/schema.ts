import { ClientProfile, BlogPost, Category } from "./data";

const SITE_NAME = "TradeLine Local"; // rename anytime — update this one line
const SITE_URL = "https://nfa-directory.vercel.app"; // update if you later move to a custom domain

// LocalBusiness schema — only includes fields we actually have real data for.
// streetAddress, postalCode, openingHours, and license number are
// intentionally omitted (not placeholdered) until the client supplies them.
export function localBusinessSchema(
  client: ClientProfile,
  category: Category
) {
  const address: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: client.city,
    addressRegion: client.region,
    addressCountry: "US",
  };
  // Only added when the client's own site actually states it — never placeholdered.
  if (client.streetAddress) address.streetAddress = client.streetAddress;
  if (client.postalCode) address.postalCode = client.postalCode;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: client.businessName,
    description: client.description,
    telephone: client.phone,
    url: `${SITE_URL}/${category.slug}/${client.slug}`,
    sameAs: [client.externalWebsite, ...client.social.map((s) => s.url)],
    address,
    areaServed: `${client.city}, ${client.region}`,
    makesOffer: client.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
      },
    })),
  };

  if (client.licenseNumber) {
    schema.identifier = {
      "@type": "PropertyValue",
      name: "License Number",
      value: client.licenseNumber,
    };
  }

  return schema;
}

export function blogPostingSchema(
  post: BlogPost,
  client: ClientProfile,
  category: Category
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    about: {
      "@type": "HomeAndConstructionBusiness",
      name: client.businessName,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${category.slug}/${client.slug}/${post.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export { SITE_NAME, SITE_URL };
