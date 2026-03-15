// app/devis-renovation-quetigny/page.tsx
import { Metadata } from "next";
import DevisRenovationQuetigny from "./DevisRenovationQuetigny";

export const metadata: Metadata = {
  title: "Rénovation Intérieure Quetigny — Prix & Devis Gratuit 2026 | PremiumArtisan",
  description: "Trouvez une entreprise de rénovation vérifiée à Quetigny. Comparez 4 devis gratuits. Tous corps de métier. Réponse rapide.",
  alternates: { canonical: "https://premiumartisan.fr/devis-renovation-quetigny" },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "PremiumArtisan — Rénovation Quetigny",
      url: "https://premiumartisan.fr/devis-renovation-quetigny",
      areaServed: { "@type": "City", name: "Quetigny", postalCode: "21800" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "64" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Quel est le prix d'une rénovation à Quetigny en 2026 ?", acceptedAnswer: { "@type": "Answer", text: "Le prix moyen d'une rénovation à Quetigny varie selon le type de projet. Consultez nos tarifs détaillés et comparez jusqu'à 4 devis gratuits." } },
        { "@type": "Question", name: "Y a-t-il des aides pour rénover à Quetigny ?", acceptedAnswer: { "@type": "Answer", text: "Oui : MaPrimeRénov', éco-PTZ, aides Dijon Métropole et TVA réduite à 5.5%. Nos artisans RGE accompagnent vos démarches." } },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <DevisRenovationQuetigny />
    </>
  );
}