import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devis Peintre Lyon — Artisans Vérifiés Rhône | PremiumArtisan",
  description: "Comparez jusqu'à 3 devis de peintres vérifiés à Lyon. Prix moyen 28–48€/m². Peinture intérieure, rénovation. Gratuit, sans engagement, réponse sous 24h.",
  alternates: { canonical: "https://premiumartisan.fr/devis-peintre/lyon" },
  openGraph: {
    title: "Devis Peintre Lyon — PremiumArtisan",
    description: "Jusqu'à 3 devis de peintres vérifiés à Lyon. Prix 28–48€/m². Gratuit, réponse sous 24h.",
    url: "https://premiumartisan.fr/devis-peintre/lyon",
    siteName: "PremiumArtisan",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devis Peintre Lyon | PremiumArtisan",
    description: "Jusqu'à 3 devis de peintres vérifiés à Lyon. Gratuit, sans engagement.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
