import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devis Peintre Saint-Étienne — Artisans Vérifiés Loire | PremiumArtisan",
  description: "Comparez jusqu'à 3 devis de peintres vérifiés à Saint-Étienne. Prix moyen 22–38€/m². Gratuit, sans engagement, réponse sous 24h. Artisans Loire qualifiés.",
  alternates: { canonical: "https://premiumartisan.fr/devis-peintre/saint-etienne" },
  openGraph: {
    title: "Devis Peintre Saint-Étienne — PremiumArtisan",
    description: "Jusqu'à 3 devis de peintres vérifiés à Saint-Étienne. Prix 22–38€/m². Gratuit, réponse sous 24h.",
    url: "https://premiumartisan.fr/devis-peintre/saint-etienne",
    siteName: "PremiumArtisan",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devis Peintre Saint-Étienne | PremiumArtisan",
    description: "Jusqu'à 3 devis de peintres vérifiés à Saint-Étienne. Gratuit, sans engagement.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
