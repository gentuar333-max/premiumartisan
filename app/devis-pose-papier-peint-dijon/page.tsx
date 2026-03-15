import type { Metadata } from "next";
import DevisPapierPeintDijon from "./DevisPapierPeintDijon";

export const metadata: Metadata = {
  title: "Pose Papier Peint à Dijon — Prix 2026 & Devis Gratuit | PremiumArtisan",
  description: "148 projets analysés. Pose papier peint Dijon : 20–55€/m². 22 poseurs vérifiés. Intissé, vinyle, panoramique.",
  alternates: {
    canonical: "/devis-pose-papier-peint-dijon",
  },
  openGraph: {
    title: "Pose Papier Peint à Dijon — Prix 2026 & Devis Gratuit",
    description: "22 poseurs vérifiés à Dijon. Prix moyen: 20–55€/m². Réponse en 3h.",
    type: "website",
  },
};

export default function Page() {
  return <DevisPapierPeintDijon />;
}