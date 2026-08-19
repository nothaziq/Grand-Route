import { company, leadership } from "../data/company";

// TODO: update alongside the matching SITE_URL constant in
// hooks/useSeo.ts once a custom domain is purchased and DNS is
// pointed at this site.
const SITE_URL = "https://grand-route.vercel.app";

/**
 * schema.org LocalBusiness structured data, built only from facts
 * already verified in data/company.ts (see docs/CONTENT.md). Do not
 * add openingHours, aggregateRating, or other fields here unless the
 * business has confirmed them — unverified structured data risks a
 * Google Search Console manual action, not just an inaccurate page.
 */
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.tradeName,
    legalName: company.legalName,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.location,
      addressRegion: company.region,
      addressCountry: "AE",
    },
    foundingDate: company.establishedDate,
    employee: leadership.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.title,
    })),
  };
}
