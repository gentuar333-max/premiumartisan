import type { Metadata } from "next";
import DevisPapierPeintChenove from "./DevisPapierPeintChenove";

export const metadata: Metadata = {
  title: "Pose Papier Peint à Chenôve — Solution Murs Béton 2026 | PremiumArtisan",
  description: "96 projets analysés. Papier peint intissé 180g+ pour murs béton HLM. 8% moins cher que Dijon. 11 poseurs locaux.",
  alternates: {
    canonical: "/devis-pose-papier-peint-chenove",
  },
  openGraph: {
    title: "Pose Papier Peint à Chenôve — Solution Murs Béton 2026",
    description: "11 poseurs vérifiés à Chenôve. 8% moins cher que Dijon.",
    type: "website",
  },
};

export default function Page() {
  return <DevisPapierPeintChenove />;
}
