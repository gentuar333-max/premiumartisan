// lib/seo.ts
import type { Metadata } from "next";

/**
 * Minimal but solid programmatic SEO engine.
 * You can expand services/cities any time without touching pages logic.
 */

export type ServiceId = "peinture" | "renovation";
export type CityId =
  | "dijon"
  | "chenove"
  | "talant"
  | "beaune"
  | "quetigny"
  | "fontaine-les-dijon";

export type Service = {
  id: ServiceId;
  label: string;
  labelShort: string;
  intentKeyword: string; // used for /travaux slug
  metierSlug: string; // used for /[metier]/[ville]
  bullets: string[];
  faqs: { q: string; a: (cityName: string) => string }[];
};

export type City = {
  id: CityId;
  name: string;
  deptLabel: string; // Côte-d'Or
  deptCode: string; // 21
  postalExamples: string[];
  nearby: string[];
};

export const SITE = {
  name: "PremiumArtisan",
  domain: "premiumartisan.fr", // change when you have domain
  baseUrl: "http://localhost:3000", // change to https://premiumartisan.fr in prod
  areaLabel: "Dijon & Côte-d'Or",
};

export const services: Service[] = [
  {
    id: "peinture",
    label: "Peinture (intérieure, plafonds, rénovation)",
    labelShort: "Peinture",
    intentKeyword: "devis-peinture",
    metierSlug: "peinture",
    bullets: [
      "Jusqu’à 4 devis maximum (volume maîtrisé)",
      "Artisans locaux, sélectionnés selon votre zone",
      "Demande privée (numéro non diffusé publiquement)",
      "Réponse sous 24h selon disponibilité",
    ],
    faqs: [
      {
        q: "Quel est le prix d’un peintre au m² ?",
        a: (city) =>
          `Les tarifs varient selon l’état des murs, la préparation et la finition. À ${city}, un artisan pourra vous confirmer un prix après visite ou photos du chantier.`,
      },
      {
        q: "Faut-il une sous-couche ?",
        a: (city) =>
          `Souvent oui (murs tachés, changement de couleur, support poreux). À ${city}, la sous-couche améliore l’adhérence et la tenue dans le temps.`,
      },
      {
        q: "Combien de temps durent les travaux ?",
        a: (city) =>
          `Cela dépend de la surface et du séchage. À ${city}, un chantier “standard” se planifie généralement sur quelques jours, avec protection des sols et finitions.`,
      },
      {
        q: "Comment éviter les mauvaises surprises ?",
        a: (city) =>
          `Demandez un devis détaillé (préparation, nombre de couches, peintures, protection). À ${city}, comparez 2–4 devis maximum pour décider sereinement.`,
      },
    ],
  },
  {
    id: "renovation",
    label: "Rénovation (peinture + remise en état)",
    labelShort: "Rénovation",
    intentKeyword: "devis-renovation",
    metierSlug: "renovation",
    bullets: [
      "Jusqu’à 4 réponses maximum",
      "Matching local (zone + besoin)",
      "Projet privé",
      "Délais réalistes, artisans sérieux",
    ],
    faqs: [
      {
        q: "Rénovation partielle ou complète ?",
        a: (city) =>
          `Tout dépend de votre budget et de l’état du logement. À ${city}, un artisan peut proposer une rénovation ciblée (pièces clés) avant une rénovation complète.`,
      },
      {
        q: "Quel budget prévoir ?",
        a: (city) =>
          `Le budget dépend des postes (préparation, peinture, petites réparations). À ${city}, les devis permettent de cadrer précisément le coût avant de démarrer.`,
      },
      {
        q: "Délai moyen de démarrage ?",
        a: (city) =>
          `Selon la saison et la disponibilité. À ${city}, viser 24–72h pour une première réponse, puis planifier l’intervention après validation du devis.`,
      },
      {
        q: "Comment comparer les devis ?",
        a: (city) =>
          `Vérifiez le détail des postes, les produits, la préparation et les finitions. À ${city}, limitez à 4 devis max pour éviter le spam et garder un choix clair.`,
      },
    ],
  },
];

export const cities: City[] = [
  {
    id: "dijon",
    name: "Dijon",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21000", "21100"],
    nearby: ["Chenôve", "Talant", "Quetigny", "Fontaine-lès-Dijon"],
  },
  {
    id: "chenove",
    name: "Chenôve",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21300"],
    nearby: ["Dijon", "Talant"],
  },
  {
    id: "talant",
    name: "Talant",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21240"],
    nearby: ["Dijon", "Chenôve"],
  },
  {
    id: "beaune",
    name: "Beaune",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21200"],
    nearby: ["Chagny", "Nuits-Saint-Georges"],
  },
  {
    id: "quetigny",
    name: "Quetigny",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21800"],
    nearby: ["Dijon", "Chevigny-Saint-Sauveur"],
  },
  {
    id: "fontaine-les-dijon",
    name: "Fontaine-lès-Dijon",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21121"],
    nearby: ["Dijon", "Talant"],
  },
];

export function getServiceByMetierSlug(metier: string): Service | undefined {
  return services.find((s) => s.metierSlug === metier);
}

export function getCityBySlug(ville: string): City | undefined {
  return cities.find((c) => c.id === ville);
}

export function buildTravauxSlug(service: Service, city: City) {
  // /travaux/devis-peinture-dijon
  return `${service.intentKeyword}-${slugifyCity(city.name)}`;
}

export function parseTravauxSlug(slug: string): { service?: Service; city?: City } {
  // slug example: devis-peinture-dijon
  // or devis-renovation-chenove
  const parts = slug.split("-");
  if (parts.length < 3) return {};

  const intent = `${parts[0]}-${parts[1]}`; // devis-peinture / devis-renovation
  const citySlug = parts.slice(2).join("-");

  const service = services.find((s) => s.intentKeyword === intent);
  const city = cities.find((c) => slugifyCity(c.name) === citySlug);

  return { service, city };
}

export function slugifyCity(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function absUrl(path: string) {
  const base = SITE.baseUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function makeMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}

export function buildFaqSchema(service: Service, city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a(city.name),
      },
    })),
  };
}

export function buildLocalBusinessSchema(service: Service, city: City, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE.name} – ${service.labelShort} à ${city.name}`,
    url: pageUrl,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${city.deptLabel} (${city.deptCode})`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.deptLabel,
      postalCode: city.postalExamples[0],
      addressCountry: "FR",
    },
  };
}

export function buildServiceSchema(service: Service, city: City, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.labelShort} – ${city.name}`,
    areaServed: city.name,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: absUrl("/"),
    },
    url: pageUrl,
    serviceType: service.labelShort,
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

export function jsonLdScriptTag(obj: unknown) {
  return JSON.stringify(obj, null, 0);
}// lib/seo.ts
import type { Metadata } from "next";

/**
 * Minimal but solid programmatic SEO engine.
 * You can expand services/cities any time without touching pages logic.
 */

export type ServiceId = "peinture" | "renovation";
export type CityId =
  | "dijon"
  | "chenove"
  | "talant"
  | "beaune"
  | "quetigny"
  | "fontaine-les-dijon";

export type Service = {
  id: ServiceId;
  label: string;
  labelShort: string;
  intentKeyword: string; // used for /travaux slug
  metierSlug: string; // used for /[metier]/[ville]
  bullets: string[];
  faqs: { q: string; a: (cityName: string) => string }[];
};

export type City = {
  id: CityId;
  name: string;
  deptLabel: string; // Côte-d'Or
  deptCode: string; // 21
  postalExamples: string[];
  nearby: string[];
};

export const SITE = {
  name: "PremiumArtisan",
  domain: "premiumartisan.fr", // change when you have domain
  baseUrl: "http://localhost:3000", // change to https://premiumartisan.fr in prod
  areaLabel: "Dijon & Côte-d'Or",
};

export const services: Service[] = [
  {
    id: "peinture",
    label: "Peinture (intérieure, plafonds, rénovation)",
    labelShort: "Peinture",
    intentKeyword: "devis-peinture",
    metierSlug: "peinture",
    bullets: [
      "Jusqu’à 4 devis maximum (volume maîtrisé)",
      "Artisans locaux, sélectionnés selon votre zone",
      "Demande privée (numéro non diffusé publiquement)",
      "Réponse sous 24h selon disponibilité",
    ],
    faqs: [
      {
        q: "Quel est le prix d’un peintre au m² ?",
        a: (city) =>
          `Les tarifs varient selon l’état des murs, la préparation et la finition. À ${city}, un artisan pourra vous confirmer un prix après visite ou photos du chantier.`,
      },
      {
        q: "Faut-il une sous-couche ?",
        a: (city) =>
          `Souvent oui (murs tachés, changement de couleur, support poreux). À ${city}, la sous-couche améliore l’adhérence et la tenue dans le temps.`,
      },
      {
        q: "Combien de temps durent les travaux ?",
        a: (city) =>
          `Cela dépend de la surface et du séchage. À ${city}, un chantier “standard” se planifie généralement sur quelques jours, avec protection des sols et finitions.`,
      },
      {
        q: "Comment éviter les mauvaises surprises ?",
        a: (city) =>
          `Demandez un devis détaillé (préparation, nombre de couches, peintures, protection). À ${city}, comparez 2–4 devis maximum pour décider sereinement.`,
      },
    ],
  },
  {
    id: "renovation",
    label: "Rénovation (peinture + remise en état)",
    labelShort: "Rénovation",
    intentKeyword: "devis-renovation",
    metierSlug: "renovation",
    bullets: [
      "Jusqu’à 4 réponses maximum",
      "Matching local (zone + besoin)",
      "Projet privé",
      "Délais réalistes, artisans sérieux",
    ],
    faqs: [
      {
        q: "Rénovation partielle ou complète ?",
        a: (city) =>
          `Tout dépend de votre budget et de l’état du logement. À ${city}, un artisan peut proposer une rénovation ciblée (pièces clés) avant une rénovation complète.`,
      },
      {
        q: "Quel budget prévoir ?",
        a: (city) =>
          `Le budget dépend des postes (préparation, peinture, petites réparations). À ${city}, les devis permettent de cadrer précisément le coût avant de démarrer.`,
      },
      {
        q: "Délai moyen de démarrage ?",
        a: (city) =>
          `Selon la saison et la disponibilité. À ${city}, viser 24–72h pour une première réponse, puis planifier l’intervention après validation du devis.`,
      },
      {
        q: "Comment comparer les devis ?",
        a: (city) =>
          `Vérifiez le détail des postes, les produits, la préparation et les finitions. À ${city}, limitez à 4 devis max pour éviter le spam et garder un choix clair.`,
      },
    ],
  },
];

export const cities: City[] = [
  {
    id: "dijon",
    name: "Dijon",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21000", "21100"],
    nearby: ["Chenôve", "Talant", "Quetigny", "Fontaine-lès-Dijon"],
  },
  {
    id: "chenove",
    name: "Chenôve",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21300"],
    nearby: ["Dijon", "Talant"],
  },
  {
    id: "talant",
    name: "Talant",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21240"],
    nearby: ["Dijon", "Chenôve"],
  },
  {
    id: "beaune",
    name: "Beaune",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21200"],
    nearby: ["Chagny", "Nuits-Saint-Georges"],
  },
  {
    id: "quetigny",
    name: "Quetigny",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21800"],
    nearby: ["Dijon", "Chevigny-Saint-Sauveur"],
  },
  {
    id: "fontaine-les-dijon",
    name: "Fontaine-lès-Dijon",
    deptLabel: "Côte-d'Or",
    deptCode: "21",
    postalExamples: ["21121"],
    nearby: ["Dijon", "Talant"],
  },
];

export function getServiceByMetierSlug(metier: string): Service | undefined {
  return services.find((s) => s.metierSlug === metier);
}

export function getCityBySlug(ville: string): City | undefined {
  return cities.find((c) => c.id === ville);
}

export function buildTravauxSlug(service: Service, city: City) {
  // /travaux/devis-peinture-dijon
  return `${service.intentKeyword}-${slugifyCity(city.name)}`;
}

export function parseTravauxSlug(slug: string): { service?: Service; city?: City } {
  // slug example: devis-peinture-dijon
  // or devis-renovation-chenove
  const parts = slug.split("-");
  if (parts.length < 3) return {};

  const intent = `${parts[0]}-${parts[1]}`; // devis-peinture / devis-renovation
  const citySlug = parts.slice(2).join("-");

  const service = services.find((s) => s.intentKeyword === intent);
  const city = cities.find((c) => slugifyCity(c.name) === citySlug);

  return { service, city };
}

export function slugifyCity(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function absUrl(path: string) {
  const base = SITE.baseUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function makeMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}

export function buildFaqSchema(service: Service, city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a(city.name),
      },
    })),
  };
}

export function buildLocalBusinessSchema(service: Service, city: City, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE.name} – ${service.labelShort} à ${city.name}`,
    url: pageUrl,
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${city.deptLabel} (${city.deptCode})`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.deptLabel,
      postalCode: city.postalExamples[0],
      addressCountry: "FR",
    },
  };
}

export function buildServiceSchema(service: Service, city: City, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.labelShort} – ${city.name}`,
    areaServed: city.name,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: absUrl("/"),
    },
    url: pageUrl,
    serviceType: service.labelShort,
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

export function jsonLdScriptTag(obj: unknown) {
  return JSON.stringify(obj, null, 0);
}// 🔧 Helpers for pages (SAFE – nuk prish SEO engine)
export function serviceLabel(slug: string): string {
  const service = services.find(
    (s) =>
      s.metierSlug === slug ||
      s.intentKeyword === slug ||
      slug.includes(s.metierSlug)
  );
  return service ? service.labelShort : slug;
}

export function titleCaseCity(citySlug: string): string {
  const city = cities.find((c) => c.id === citySlug);
  if (city) return city.name;

  // fallback: dijon -> Dijon, fontaine-les-dijon -> Fontaine Les Dijon
  return citySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}