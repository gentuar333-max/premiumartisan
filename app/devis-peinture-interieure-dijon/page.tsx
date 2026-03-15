// app/devis-peinture-interieure-dijon/page.tsx
// SERVER COMPONENT — Schema JSON-LD jashtë <main>

import { Metadata } from "next";
import DevisPeinturePage from "./DevisPeinturePage";

export const metadata: Metadata = {
  title: "Peinture Intérieure Dijon — Prix & Devis Gratuit 2026 | PremiumArtisan",
  description: "Trouvez un artisan peintre vérifié à Dijon. Prix moyen 25–45€/m². Comparez jusqu'à 4 devis gratuits. 47 peintres actifs en Côte-d'Or. Réponse en 3h.",
  alternates: {
    canonical: "https://premiumartisan.fr/devis-peinture-interieure-dijon",
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "PremiumArtisan — Peinture Intérieure Dijon",
      url: "https://premiumartisan.fr/devis-peinture-interieure-dijon",
      areaServed: {
        "@type": "City",
        name: "Dijon",
        postalCode: "21000",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "127",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quel est le prix de la peinture intérieure à Dijon en 2026 ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Le prix moyen de la peinture intérieure à Dijon varie entre 25€ et 45€/m² selon la finition choisie. Pour un appartement de 60m², comptez entre 1 500€ et 3 000€ tout compris.",
          },
        },
        {
          "@type": "Question",
          name: "Combien de temps faut-il pour trouver un artisan peintre à Dijon ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sur PremiumArtisan, vous recevez vos premiers devis en 3 à 6h. Le délai moyen pour démarrer un chantier est de 1 à 3 semaines selon la saison.",
          },
        },
        {
          "@type": "Question",
          name: "Les artisans à Dijon sont-ils disponibles rapidement ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, notre réseau compte 47 artisans peintres actifs à Dijon et en Côte-d'Or. En basse saison, la disponibilité est excellente. En été, prévoyez 2 à 4 semaines de délai.",
          },
        },
        {
          "@type": "Question",
          name: "Comment choisir un bon peintre à Dijon ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Vérifiez le numéro SIRET, demandez des photos de chantiers précédents, comparez minimum 3 devis et lisez les avis clients. Sur PremiumArtisan, tous nos artisans sont pré-vérifiés.",
          },
        },
        {
          "@type": "Question",
          name: "Est-ce gratuit de publier un projet sur PremiumArtisan ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, la publication d'un projet est 100% gratuite pour les particuliers. Vous recevez jusqu'à 4 devis sans engagement.",
          },
        },
        {
          "@type": "Question",
          name: "Quelle différence entre peinture mate et satinée ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La peinture mate cache mieux les imperfections. La peinture satinée est plus résistante et lessivable. Le prix est similaire, la différence est surtout dans la durabilité.",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      {/* ✅ Schema JSON-LD — jashtë <main>, në <head> nga Next.js automatikisht */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* UI Component — "use client" */}
      <DevisPeinturePage />
    </>
  );
}