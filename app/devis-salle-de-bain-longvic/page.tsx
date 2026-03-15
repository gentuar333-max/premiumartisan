import type { Metadata } from "next";
import DevisSalleDeBainLongvic from "./DevisSalleDeBainLongvic";

export const metadata: Metadata = {
  title: "Rénovation Salle de Bain à Longvic — Locatif & TNSA 2026 | PremiumArtisan",
  description: "29 projets documentés. ROI locatif +70€/mois. Aide TNSA aéroport 80%. 10 artisans vérifiés à Longvic.",
  alternates: {
    canonical: "/devis-salle-de-bain-longvic",
  },
  openGraph: {
    title: "Rénovation Salle de Bain à Longvic — Locatif & TNSA 2026",
    description: "10 artisans vérifiés à Longvic. ROI locatif +70€/mois. Aide TNSA 80%.",
    type: "website",
  },
};

export default function Page() {
  return <DevisSalleDeBainLongvic />;
}
