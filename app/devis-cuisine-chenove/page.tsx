// Cuisine Chenôve page
import DevisCuisineChenove from "./DevisCuisineChenove";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rénovation Cuisine à Chenôve — Artisans Vérifiés & Devis Gratuit 2026 | PremiumArtisan",
  description: "14 cuisinistes vérifiés à Chenôve. 10–15% moins cher que Dijon. HLM, locatif, pose IKEA. Devis gratuit sous 24h.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "PremiumArtisan — Cuisiniste à Chenôve",
  "image": "https://www.premiumartisan.fr/og-image.jpg",
  "url": "https://www.premiumartisan.fr/devis-cuisine-chenove",
  "telephone": "+33XXXXXXXXX",
  "priceRange": "€€",
  "description": "14 cuisinistes vérifiés à Chenôve. Devis gratuit sous 24h.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chenôve",
    "addressLocality": "Chenôve",
    "postalCode": "21300",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "47.2833",
    "longitude": "5.0167"
  },
  "openingHours": "Mo-Fr 08:00-18:00",
  "areaServed": ["Chenôve", "Dijon", "Côte-d'Or"]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DevisCuisineChenove />
    </>
  );
}