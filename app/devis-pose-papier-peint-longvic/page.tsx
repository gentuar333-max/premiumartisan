import type { Metadata } from "next";
import DevisPapierPeintLongvic from "./DevisPapierPeintLongvic";

export const metadata: Metadata = {
  title: "Pose Papier Peint à Longvic — Locatif & Avant-Vente 2026 | PremiumArtisan",
  description: "78 projets analysés. Prix dès 18€/m². ROI 5–8x avant vente. 8 poseurs vérifiés à Longvic. Intissé vinyle lavable.",
  alternates: {
    canonical: "/devis-pose-papier-peint-longvic",
  },
  openGraph: {
    title: "Pose Papier Peint à Longvic — Locatif & Avant-Vente 2026",
    description: "8 poseurs vérifiés à Longvic. Prix dès 18€/m². ROI 5–8x avant vente.",
    type: "website",
  },
};

export default function Page() {
  return <DevisPapierPeintLongvic />;
}
