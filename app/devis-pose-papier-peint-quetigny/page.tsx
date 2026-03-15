import type { Metadata } from "next";
import DevisPapierPeintQuetigny from "./DevisPapierPeintQuetigny";

export const metadata: Metadata = {
  title: "Pose Papier Peint à Quetigny — Collections Premium & Panoramiques 2026 | PremiumArtisan",
  description: "67 projets analysés. Collections Élitis, Graham & Brown. Panoramiques sur mesure 5m. 7 poseurs premium vérifiés à Quetigny.",
  alternates: {
    canonical: "/devis-pose-papier-peint-quetigny",
  },
  openGraph: {
    title: "Pose Papier Peint à Quetigny — Collections Premium & Panoramiques 2026",
    description: "7 poseurs premium vérifiés à Quetigny. Collections Élitis, Graham & Brown.",
    type: "website",
  },
};

export default function Page() {
  return <DevisPapierPeintQuetigny />;
}
