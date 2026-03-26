// app/devis-peinture-longvic/page.tsx
import type { Metadata } from "next";
import DevisPeintureLongvic from "./DevisPeintureLongvic";

export const metadata: Metadata = {
  title: "Peintre Longvic — Prix 2026 & Devis Gratuit en 4h | PremiumArtisan",
  description: "Trouvez un peintre à Longvic (21600). Prix constatés : 27–41€/m². 108 projets réalisés. Spécialistes traitement humidité. Devis gratuits sous 4h, sans engagement.",
  alternates: { 
    canonical: "https://premiumartisan.fr/devis-peinture-longvic" 
  },
  openGraph: {
    title: "Peintre Longvic — Prix 2026 & Devis Gratuit en 4h",
    description: "Trouvez un peintre professionnel à Longvic. Prix réels 27–41€/m². Spécialistes humidité Saône. Devis 4–6h.",
    url: "https://premiumartisan.fr/devis-peinture-longvic",
    type: "website",
    locale: "fr_FR",
    siteName: "PremiumArtisan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peintre Longvic — Devis Gratuit 4h",
    description: "Prix 27–41€/m² constatés. 108 projets. Spécialistes humidité.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    "peintre Longvic", "devis peinture Longvic", "prix peinture Longvic 21600",
    "peintre pas cher Longvic", "trouver peintre Longvic", "peinture appartement Longvic",
    "traitement humidité Longvic", "peintre Dijon Métropole", "artisan peintre Côte-d'Or"
  ],
};

// Schema.org JSON-LD i plotë
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://premiumartisan.fr/devis-peinture-longvic#business",
      name: "PremiumArtisan — Peinture Longvic",
      url: "https://premiumartisan.fr/devis-peinture-longvic",
      logo: "https://premiumartisan.fr/logo.png",
      image: "https://premiumartisan.fr/images/peinture-longvic.jpg",
      description: "Service de mise en relation avec des peintres professionnels à Longvic. Spécialistes traitement humidité et rénovation intérieure.",
      telephone: "+33-3-XX-XX-XX-XX",
      email: "contact@premiumartisan.fr",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Longvic",
        addressLocality: "Longvic",
        addressRegion: "Bourgogne-Franche-Comté",
        postalCode: "21600",
        addressCountry: "FR"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 47.2892,
        longitude: 5.0636
      },
      areaServed: {
        "@type": "City",
        name: "Longvic",
        containedInPlace: {
          "@type": "State",
          name: "Côte-d'Or"
        }
      },
      serviceType: [
        "Peinture intérieure",
        "Peinture plafond",
        "Traitement anti-humidité",
        "Enduit assainissant",
        "Peinture façade",
        "Rénovation complète"
      ],
      priceRange: "€€",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "108",
        bestRating: "5"
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "19:00"
        }
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services de peinture Longvic",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Peinture murale intérieure",
              description: "Application peinture sur murs préparés, fourniture incluse"
            },
            price: "32",
            priceCurrency: "EUR",
            priceValidUntil: "2026-12-31"
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Peinture plafond",
              description: "Plafonds avec préparation complète et peinture anti-éclaboussures"
            },
            price: "37",
            priceCurrency: "EUR",
            priceValidUntil: "2026-12-31"
          }
        ]
      }
    },
    {
      "@type": "Service",
      "@id": "https://premiumartisan.fr/devis-peinture-longvic#service",
      name: "Devis Peinture Longvic",
      provider: {
        "@id": "https://premiumartisan.fr/devis-peinture-longvic#business"
      },
      areaServed: {
        "@type": "City",
        name: "Longvic"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://premiumartisan.fr/devis-peinture-longvic#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quel est le prix moyen d'un peintre à Longvic en 2026 ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Les tarifs constatés à Longvic se situent entre 27€ et 41€/m² pour une peinture intérieure standard. Le prix varie selon la préparation nécessaire (humidité, état des murs) et la qualité des peintures choisies."
          }
        },
        {
          "@type": "Question",
          name: "Pourquoi les prix sont-ils parfois plus élevés à Longvic qu'à Dijon ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La proximité avec la Saône expose Longvic à des problèmes d'humidité plus fréquents. 34% des chantiers nécessitent un traitement préalable (enduit assainissant, anti-salpêtre), ce qui augmente le coût de 15-25%."
          }
        },
        {
          "@type": "Question",
          name: "Quel délai pour obtenir un devis et démarrer les travaux ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sur PremiumArtisan, vous recevez vos devis en moyenne en 4-6h. Le délai de démarrage des travaux varie de 1 à 2 semaines selon la saison."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://premiumartisan.fr/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Peinture",
          item: "https://premiumartisan.fr/devis-peinture"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Longvic",
          item: "https://premiumartisan.fr/devis-peinture-longvic"
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <DevisPeintureLongvic />
    </>
  );
}