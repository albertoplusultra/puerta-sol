import {
  SITE_URL,
  SITE_NAME,
  GEO,
  PARTNERS,
} from "../config/site.mjs";

const abs = (path: string) => new URL(path, SITE_URL).href;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: abs("/favicon.svg"),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["es", "en", "fr", "de", "it", "pt"],
  };
}

/** El monumento como entidad principal del sitio. */
export function landmarkSchema() {
  return {
    "@type": "LandmarksOrHistoricalBuildings",
    "@id": `${SITE_URL}/#landmark`,
    name: "Puerta del Sol",
    alternateName: ["Puerta del Sol de Madrid", "Sol"],
    description:
      "Plaza histórica en el centro de Madrid, punto kilométrico cero de las carreteras radiales de España y uno de los lugares más emblemáticos de la ciudad.",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Puerta del Sol",
      addressLocality: "Madrid",
      postalCode: "28013",
      addressRegion: "Comunidad de Madrid",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    isAccessibleForFree: true,
    publicAccess: true,
    sameAs: [
      "https://es.wikipedia.org/wiki/Puerta_del_Sol",
      "https://www.wikidata.org/wiki/Q1132001",
    ],
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  updated: Date;
  locale: string;
  image?: string;
  sources?: { title: string; url: string }[];
}) {
  return {
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    inLanguage: opts.locale,
    dateModified: opts.updated.toISOString(),
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(opts.url) },
    ...(opts.image ? { image: abs(opts.image) } : {}),
    ...(opts.sources?.length
      ? {
          citation: opts.sources.map((s) => ({
            "@type": "CreativeWork",
            name: s.title,
            url: s.url,
          })),
        }
      : {}),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: { "@id": `${SITE_URL}/#landmark` },
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  if (!faq.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Negocios hermanos a los que derivamos tráfico (sameAs). */
export function partnerSchema(kind: "lodging" | "restaurant") {
  const p = PARTNERS[kind];
  const base = {
    "@type": p.type,
    name: p.name,
    url: p.url,
    sameAs: [p.url],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    nearbyAttractions: { "@id": `${SITE_URL}/#landmark` },
  };
  if (kind === "restaurant") {
    return { ...base, servesCuisine: "Cocina madrileña", priceRange: "€€" };
  }
  return base;
}

/** Envuelve nodos en un @graph con contexto único. */
export function graph(nodes: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
