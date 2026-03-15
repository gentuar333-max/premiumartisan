import type { Metadata } from "next";
import DevisSalleDeBainChenove from "./DevisSalleDeBainChenove";

export const metadata: Metadata = {
  title: "Rénovation Salle de Bain à Chenôve — HLM & Locatif 2026 | PremiumArtisan",
  description: "112 projets analysés. 12% moins cher que Dijon. Spécialistes HLM, douche italienne, PMR. 14 artisans vérifiés à Chenôve.",
  alternates: {
    canonical: "/devis-salle-de-bain-chenove",
  },
  openGraph: {
    title: "Rénovation Salle de Bain à Chenôve — HLM & Locatif 2026",
    description: "14 artisans vérifiés à Chenôve. 12% moins cher que Dijon.",
    type: "website",
  },
};

export default function Page() {
  return <DevisSalleDeBainChenove />;
}
