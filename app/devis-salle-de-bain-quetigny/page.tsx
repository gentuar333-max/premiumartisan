import type { Metadata } from "next";
import DevisSalleDeBainQuetigny from "./DevisSalleDeBainQuetigny";

export const metadata: Metadata = {
  title: "Rénovation Salle de Bain à Quetigny — Design & Premium 2026 | PremiumArtisan",
  description: "31 projets documentés. Budget moyen 12 800€. Carrelage grand format, domotique, douche italienne. 9 artisans premium vérifiés à Quetigny.",
  alternates: {
    canonical: "/devis-salle-de-bain-quetigny",
  },
  openGraph: {
    title: "Rénovation Salle de Bain à Quetigny — Design & Premium 2026",
    description: "9 artisans premium vérifiés à Quetigny. Budget moyen 12 800€.",
    type: "website",
  },
};

export default function Page() {
  return <DevisSalleDeBainQuetigny />;
}
