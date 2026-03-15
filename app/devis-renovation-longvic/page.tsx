// app/devis-renovation-longvic/page.tsx
import { Metadata } from "next";
import DevisRenovationLongvic from "./DevisRenovationLongvic";

export const metadata: Metadata = {
  title: "Rénovation Intérieure Longvic — Prix & Devis Gratuit 2026 | PremiumArtisan",
  description: "Trouvez une entreprise de rénovation vérifiée à Longvic. Comparez 4 devis gratuits. Tous corps de métier. Réponse rapide.",
  alternates: { canonical: "https://premiumartisan.fr/devis-renovation-longvic" },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "PremiumArtisan — Rénovation Longvic",
      url: "https://premiumartisan.fr/devis-renovation-longvic",
      areaServed: { "@type": "City", name: "Longvic", postalCode: "21600" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "87" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Quel est le prix d'une rénovation à Longvic en 2026 ?", acceptedAnswer: { "@type": "Answer", text: "Le prix moyen d'une rénovation à Longvic varie selon le type de projet. Consultez nos tarifs détaillés et comparez jusqu'à 4 devis gratuits." } },
        { "@type": "Question", name: "Y a-t-il des aides pour rénover à Longvic ?", acceptedAnswer: { "@type": "Answer", text: "Oui : MaPrimeRénov', éco-PTZ, aides Dijon Métropole et TVA réduite à 5.5%. Nos artisans RGE accompagnent vos démarches." } },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <DevisRenovationLongvic />
    </>
  );
}