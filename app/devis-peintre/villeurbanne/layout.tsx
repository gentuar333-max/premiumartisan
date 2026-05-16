import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devis Peintre Villeurbanne — Artisans Vérifiés Rhône | PremiumArtisan",
  description: "Comparez jusqu'à 3 devis de peintres vérifiés à Villeurbanne. Prix moyen 27–46€/m². Peinture intérieure, rénovation appartement. Gratuit, sans engagement.",
  alternates: { canonical: "https://premiumartisan.fr/devis-peintre/villeurbanne" },
  openGraph: {
    title: "Devis Peintre Villeurbanne — PremiumArtisan",
    description: "Jusqu'à 3 devis de peintres vérifiés à Villeurbanne. Prix 27–46€/m². Gratuit, réponse sous 24h.",
    url: "https://premiumartisan.fr/devis-peintre/villeurbanne",
    siteName: "PremiumArtisan",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devis Peintre Villeurbanne | PremiumArtisan",
    description: "Jusqu'à 3 devis de peintres vérifiés à Villeurbanne. Gratuit, sans engagement.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
