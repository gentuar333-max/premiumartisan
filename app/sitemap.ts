import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

const VILLES = ["dijon", "beaune", "lyon", "besancon"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const corePages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/publier-projet`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
  ];

  const seoCityPages: MetadataRoute.Sitemap = VILLES.map((ville) => ({
    url: `${SITE_URL}/devis-peinture/${ville}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...corePages, ...seoCityPages];
}