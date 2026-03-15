import type { Metadata } from "next";
import DevisSalleDeBainDijon from "./DevisSalleDeBainDijon";

export const metadata: Metadata = {
  title: "Rénovation Salle de Bain à Dijon — Prix 2026 & Devis Gratuit | PremiumArtisan",
  description: "186 projets analysés. Budget moyen 11 400€. Douche italienne, PMR, haut de gamme. 28 artisans vérifiés à Dijon.",
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
