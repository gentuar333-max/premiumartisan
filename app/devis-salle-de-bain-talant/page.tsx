import type { Metadata } from "next";
import DevisSalleDeBainTalant from "./DevisSalleDeBainTalant";

export const metadata: Metadata = {
  title: "Rénovation Salle de Bain à Talant — Anti-Humidité & VMC 2026 | PremiumArtisan",
  description: "94 projets analysés à Talant. 11 artisans vérifiés, spécialistes anti-humidité altitude 350m. Diagnostic VMC inclus. Devis gratuit sous 24h.",
  alternates: {
    canonical: "/devis-salle-de-bain-talant",
  },
  openGraph: {
    title: "Rénovation Salle de Bain à Talant — Anti-Humidité & VMC 2026",
    description: "11 artisans vérifiés à Talant. Spécialistes anti-humidité altitude 350m.",
    type: "website",
  },
};

export default function Page() {
  return <DevisSalleDeBainTalant />;
}
