// app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

// ── Të gjitha qytetet ───────────────────────────────────────────────────────
const VILLES_SLUGS = [
  // Côte-d'Or
  "dijon","beaune","chenove","longvic","talant","quetigny",
  "fontaine-les-dijon","marsannay-la-cote","nuits-saint-georges",
  "gevrey-chambertin","auxonne","montbard",
  // Bourgogne
  "chalon-sur-saone","macon","autun","le-creusot","montceau-les-mines",
  "auxerre","sens","avallon","nevers","cosne-cours-sur-loire",
  // France
  "paris","lyon","marseille","toulouse","nice","nantes","strasbourg",
  "bordeaux","lille","rennes","reims","grenoble","toulon","brest",
  "angers","tours","orleans","caen","rouen","nancy","metz","limoges",
  "saint-etienne","clermont-ferrand","aix-en-provence","amiens",
  "villeurbanne","versailles","saint-denis","boulogne-billancourt",
  // Ancien sitemap
  "besancon",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Pages principales
  const corePages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,               lastModified: now, changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE_URL}/publier-projet`, lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${SITE_URL}/artisan/dashboard`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  // Pages SEO statiques artisans
  const seoStaticArtisan: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/devis-gratuit-peintre-dijon`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/logiciel-devis-peintre-cote-dor`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/devis-facture-gratuit-peintre-bourgogne`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/trouver-clients-peintre-dijon`,           lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/application-devis-peintre`,               lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/creer-devis-peintre`,                     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/creer-facture-artisan`,                   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Pages SEO statiques clients
  const seoStaticClient: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/devis-peinture-dijon`,    lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/devis-renovation-dijon`,  lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  // /devis-peinture/[ville] — ancien sitemap (clients)
  const devisPeintureVille: MetadataRoute.Sitemap = VILLES_SLUGS.map((ville) => ({
    url: `${SITE_URL}/devis-peinture/${ville}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: ["dijon","paris","lyon","marseille","toulouse"].includes(ville) ? 0.85 : 0.7,
  }));

  // /logiciel-devis-artisan/[ville] — nouveau (artisans)
  const logicielDevisVille: MetadataRoute.Sitemap = VILLES_SLUGS.map((ville) => ({
    url: `${SITE_URL}/logiciel-devis-artisan/${ville}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: ["dijon","paris","lyon","marseille","toulouse"].includes(ville) ? 0.8 : 0.6,
  }));

  // /devis-peintre/[ville] — nouveau (clients, keyword variant)
  const devisPeintreVille: MetadataRoute.Sitemap = VILLES_SLUGS.map((ville) => ({
    url: `${SITE_URL}/devis-peintre/${ville}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: ["dijon","paris","lyon","marseille","toulouse"].includes(ville) ? 0.8 : 0.65,
  }));

  return [
    ...corePages,
    ...seoStaticArtisan,
    ...seoStaticClient,
    ...devisPeintureVille,
    ...logicielDevisVille,
    ...devisPeintreVille,
  ];
}