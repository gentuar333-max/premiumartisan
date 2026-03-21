// app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Core pages (publике) ────────────────────────────────────────────────
  const corePages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,               lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/publier-projet`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/about`,          lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/faq`,            lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`,        lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/comment-ca-marche`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // ── SEO artisans ────────────────────────────────────────────────────────
  const seoArtisan: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/trouver-clients-peintre-dijon`,           lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${SITE_URL}/devis-gratuit-peintre-dijon`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/logiciel-devis-peintre-cote-dor`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/creer-devis-peintre`,                     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/creer-facture-artisan`,                   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/devis-facture-gratuit-peintre-bourgogne`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/application-devis-peintre`,               lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // ── 30 faqe manuale SEO clients ────────────────────────────────────────
  // Format ZGJEDHUR: /devis-peinture-dijon (pa slash)
  const seoClients: MetadataRoute.Sitemap = [
    // Peinture
    { url: `${SITE_URL}/devis-peinture-dijon`,               lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/devis-peinture-chenove`,             lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/devis-peinture-longvic`,             lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/devis-peinture-talant`,              lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/devis-peinture-quetigny`,            lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/devis-peinture-fontaine-les-dijon`,  lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/devis-peinture-interieure-dijon`,    lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    // Rénovation
    { url: `${SITE_URL}/devis-renovation-dijon`,             lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/devis-renovation-chenove`,           lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/devis-renovation-longvic`,           lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/devis-renovation-talant`,            lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/devis-renovation-quetigny`,          lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/devis-renovation-fontaine-les-dijon`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    // Cuisine
    { url: `${SITE_URL}/devis-cuisine-dijon`,                lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/devis-cuisine-chenove`,              lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/devis-cuisine-longvic`,              lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/devis-cuisine-talant`,               lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/devis-cuisine-quetigny`,             lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/devis-cuisine-fontaine-les-dijon`,   lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    // Salle de bain
    { url: `${SITE_URL}/devis-salle-de-bain-dijon`,          lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/devis-salle-de-bain-chenove`,        lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/devis-salle-de-bain-longvic`,        lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/devis-salle-de-bain-talant`,         lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/devis-salle-de-bain-quetigny`,       lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/devis-salle-de-bain-fontaine-les-dijon`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    // Papier peint
    { url: `${SITE_URL}/devis-pose-papier-peint-dijon`,               lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/devis-pose-papier-peint-chenove`,             lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/devis-pose-papier-peint-longvic`,             lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/devis-pose-papier-peint-talant`,              lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/devis-pose-papier-peint-quetigny`,            lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/devis-pose-papier-peint-fontaine-les-dijon`,  lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  // ── Programatike — vetëm format /devis-peintre/[ville] ─────────────────
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

  const devisPeintreVille: MetadataRoute.Sitemap = VILLES.map((v) => ({
    url: `${SITE_URL}/devis-peintre/${v}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: TOP.includes(v) ? 0.8 : 0.65,
  }));

  const logicielDevisVille: MetadataRoute.Sitemap = VILLES.map((v) => ({
    url: `${SITE_URL}/logiciel-devis-artisan/${v}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: TOP.includes(v) ? 0.8 : 0.6,
  }));

  return [
    ...corePages,
    ...seoArtisan,
    ...seoClients,
    ...devisPeintreVille,
    ...logicielDevisVille,
  ];
}