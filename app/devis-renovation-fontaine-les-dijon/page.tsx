// app/devis-renovation-fontaine-les-dijon/page.tsx
import { Metadata } from "next";
import DevisRenovationFontaine from "./DevisRenovationFontaine";

export const metadata: Metadata = {
  title: "Rénovation Intérieure Fontaine-lès-Dijon — Prix & Devis Gratuit 2026 | PremiumArtisan",
  description: "Trouvez une entreprise de rénovation vérifiée à Fontaine-lès-Dijon. Comparez 4 devis gratuits. Tous corps de métier. Réponse rapide.",
  alternates: { canonical: "https://premiumartisan.fr/devis-renovation-fontaine-les-dijon" },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "PremiumArtisan — Rénovation Fontaine-lès-Dijon",
      url: "https://premiumartisan.fr/devis-renovation-fontaine-les-dijon",
      areaServed: { "@type": "City", name: "Fontaine-lès-Dijon", postalCode: "21121" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "52" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Quel est le prix d'une rénovation à Fontaine-lès-Dijon en 2026 ?", acceptedAnswer: { "@type": "Answer", text: "Le prix moyen d'une rénovation à Fontaine-lès-Dijon varie selon le type de projet. Consultez nos tarifs détaillés et comparez jusqu'à 4 devis gratuits." } },
        { "@type": "Question", name: "Y a-t-il des aides pour rénover à Fontaine-lès-Dijon ?", acceptedAnswer: { "@type": "Answer", text: "Oui : MaPrimeRénov', éco-PTZ, aides Dijon Métropole et TVA réduite à 5.5%. Nos artisans RGE accompagnent vos démarches." } },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <DevisRenovationFontaine />
    </>
  );
}