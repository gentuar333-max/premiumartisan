import type { Metadata } from "next";
import DevisSalleDeBainDijon from "./DevisSalleDeBainDijon";

export const metadata: Metadata = {
  title: "Rénovation Salle de Bain à Dijon — Prix 2026 & Devis Gratuit | PremiumArtisan",
  description: "186 projets analysés à Dijon. Budget moyen 11 400€. 28 artisans vérifiés pour douche italienne, PMR, rénovation haut de gamme. Devis gratuit sous 24h.",
  alternates: {
    canonical: "/devis-salle-de-bain-dijon",
  },
  openGraph: {
    title: "Rénovation Salle de Bain à Dijon — Prix 2026 & Devis Gratuit",
    description: "28 artisans vérifiés à Dijon. Budget moyen 11 400€. Douche italienne, PMR.",
    type: "website",
  },
};

export default function Page() {
  return <DevisSalleDeBainDijon />;
}
