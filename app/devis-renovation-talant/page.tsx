// app/devis-renovation-talant/page.tsx
import { Metadata } from "next";
import DevisRenovationTalant from "./DevisRenovationTalant";

export const metadata: Metadata = {
  title: "Rénovation Intérieure Talant — Prix & Devis Gratuit 2026 | PremiumArtisan",
  description: "Trouvez une entreprise de rénovation vérifiée à Talant. Comparez 4 devis gratuits. Tous corps de métier. Réponse rapide.",
  alternates: { canonical: "https://premiumartisan.fr/devis-renovation-talant" },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "PremiumArtisan — Rénovation Talant",
      url: "https://premiumartisan.fr/devis-renovation-talant",
      areaServed: { "@type": "City", name: "Talant", postalCode: "21240" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "98" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Quel est le prix d'une rénovation à Talant en 2026 ?", acceptedAnswer: { "@type": "Answer", text: "Le prix moyen d'une rénovation à Talant varie selon le type de projet. Consultez nos tarifs détaillés et comparez jusqu'à 4 devis gratuits." } },
        { "@type": "Question", name: "Y a-t-il des aides pour rénover à Talant ?", acceptedAnswer: { "@type": "Answer", text: "Oui : MaPrimeRénov', éco-PTZ, aides Dijon Métropole et TVA réduite à 5.5%. Nos artisans RGE accompagnent vos démarches." } },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <DevisRenovationTalant />
    </>
  );
}