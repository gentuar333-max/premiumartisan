// app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Core pages ──────────────────────────────────────────────────────────
  const corePages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,                  lastModified: now, changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE_URL}/publier-projet`,    lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${SITE_URL}/about`,             lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/faq`,               lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`,           lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/comment-ca-marche`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // ── SEO artisans (vetëm URL që ekzistojnë) ─────────────────────────────
  const seoArtisan: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/trouver-clients-peintre-dijon`, lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${SITE_URL}/devis-gratuit-peintre-dijon`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // ❌ HEQUR: /logiciel-devis-peintre-cote-dor (404)
    // ❌ HEQUR: /creer-devis-peintre (404)
    // ❌ HEQUR: /creer-facture-artisan (404)
    // ❌ HEQUR: /devis-facture-gratuit-peintre-bourgogne (404)
    // ❌ HEQUR: /application-devis-peintre (404)
  ];

  const VILLES = [
    "dijon","beaune","chenove","longvic","talant","quetigny",
    "fontaine-les-dijon","marsannay-la-cote","nuits-saint-georges",
    "gevrey-chambertin","auxonne","montbard",
    "chalon-sur-saone","macon","autun","le-creusot","montceau-les-mines",
    "auxerre","sens","avallon","nevers","cosne-cours-sur-loire",
    "paris","lyon","marseille","toulouse","nice","nantes","strasbourg",
    "bordeaux","lille","rennes","reims","grenoble","toulon","brest",
    "angers","tours","orleans","caen","rouen","nancy","metz","limoges",
    "saint-etienne","clermont-ferrand","aix-en-provence","amiens",
    "villeurbanne","versailles","saint-denis","boulogne-billancourt","besancon",
  ];
  const TOP = ["dijon","paris","lyon","marseille","toulouse"];

  // ── /devis-peintre/[ville] ──────────────────────────────────────────────
  const devisPeintreVille: MetadataRoute.Sitemap = VILLES.map((v) => ({
    url: `${SITE_URL}/devis-peintre/${v}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: TOP.includes(v) ? 0.9 : 0.7,
  }));

  // ── /devis-cuisine/[ville] (NEW) ────────────────────────────────────────
  const VILLES_CUISINE = [
    "dijon","chenove","longvic","talant","quetigny","fontaine-les-dijon",
    "marsannay-la-cote","beaune","lyon","paris","marseille","toulouse",
    "bordeaux","lille","nantes","strasbourg","rennes",
  ];
  const devisCuisineVille: MetadataRoute.Sitemap = VILLES_CUISINE.map((v) => ({
    url: `${SITE_URL}/devis-cuisine/${v}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: TOP.includes(v) ? 0.85 : 0.7,
  }));

  // ── /logiciel-devis-artisan/[ville] ────────────────────────────────────
  const logicielDevisVille: MetadataRoute.Sitemap = VILLES.map((v) => ({
    url: `${SITE_URL}/logiciel-devis-artisan/${v}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: TOP.includes(v) ? 0.8 : 0.6,
  }));

  return [
    ...corePages,
    ...seoArtisan,
    ...devisPeintreVille,
    ...devisCuisineVille,
    ...logicielDevisVille,
  ];
}