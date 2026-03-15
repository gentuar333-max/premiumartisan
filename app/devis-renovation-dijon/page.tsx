// app/devis-renovation-dijon/page.tsx
import { Metadata } from "next";
import DevisRenovationDijon from "./DevisRenovationDijon";

export const metadata: Metadata = {
  title: "Rénovation Intérieure Dijon — Prix & Devis Gratuit 2026 | PremiumArtisan",
  description: "Trouvez une entreprise de rénovation vérifiée à Dijon. Prix moyen 850€/m². 312 projets analysés. Comparez 4 devis gratuits. Tous corps de métier. Réponse en 4h.",
  alternates: { canonical: "https://premiumartisan.fr/devis-renovation-dijon" },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "PremiumArtisan — Rénovation Intérieure Dijon",
      url: "https://premiumartisan.fr/devis-renovation-dijon",
      areaServed: { "@type": "City", name: "Dijon", postalCode: "21000" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "203" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Quel est le prix d'une rénovation complète à Dijon en 2026 ?", acceptedAnswer: { "@type": "Answer", text: "Le prix d'une rénovation complète à Dijon varie entre 800€ et 1 800€/m². Pour un appartement de 60m², comptez entre 48 000€ et 80 000€." } },
        { "@type": "Question", name: "Combien de temps dure une rénovation à Dijon ?", acceptedAnswer: { "@type": "Answer", text: "Une rénovation partielle dure 2 à 4 semaines. Une rénovation complète d'un appartement de 60m² prend 6 à 12 semaines." } },
        { "@type": "Question", name: "Y a-t-il des aides financières pour rénover à Dijon ?", acceptedAnswer: { "@type": "Answer", text: "Oui : MaPrimeRénov' (jusqu'à 90%), éco-PTZ jusqu'à 50 000€, aides Dijon Métropole et TVA réduite à 5.5%." } },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <DevisRenovationDijon />
    </>
  );
}