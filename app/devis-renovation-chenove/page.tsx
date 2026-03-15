// app/devis-renovation-chenove/page.tsx
import { Metadata } from "next";
import DevisRenovationChenove from "./DevisRenovationChenove";

export const metadata: Metadata = {
  title: "Rénovation Intérieure Chenôve — Prix & Devis Gratuit 2026 | PremiumArtisan",
  description: "Trouvez une entreprise de rénovation vérifiée à Chenôve. Comparez 4 devis gratuits. Tous corps de métier. Réponse rapide.",
  alternates: { canonical: "https://premiumartisan.fr/devis-renovation-chenove" },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "PremiumArtisan — Rénovation Chenôve",
      url: "https://premiumartisan.fr/devis-renovation-chenove",
      areaServed: { "@type": "City", name: "Chenôve", postalCode: "21300" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "142" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Quel est le prix d'une rénovation à Chenôve en 2026 ?", acceptedAnswer: { "@type": "Answer", text: "Le prix moyen d'une rénovation à Chenôve varie selon le type de projet. Consultez nos tarifs détaillés et comparez jusqu'à 4 devis gratuits." } },
        { "@type": "Question", name: "Y a-t-il des aides pour rénover à Chenôve ?", acceptedAnswer: { "@type": "Answer", text: "Oui : MaPrimeRénov', éco-PTZ, aides Dijon Métropole et TVA réduite à 5.5%. Nos artisans RGE accompagnent vos démarches." } },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <DevisRenovationChenove />
    </>
  );
}