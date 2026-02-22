// app/robots.ts
import type { MetadataRoute } from "next";

const SITE_URL = "https://YOUR-DOMAIN.TLD"; // <- vendos domain real

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",        // mbron endpointet
          "/admin/",      // nëse krijon dashboard më vonë
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}