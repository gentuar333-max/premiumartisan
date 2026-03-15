import type { Metadata } from "next";
import DevisPapierPeintTalant from "./DevisPapierPeintTalant";

export const metadata: Metadata = {
  title: "Pose Papier Peint à Talant — Intissé Anti-Humidité 350m | PremiumArtisan",
  description: "84 projets analysés. Intissé 180–250g pour tours Belvédère & Monts. Panoramiques villas plateau. 9 poseurs vérifiés.",
  alternates: {
    canonical: "/devis-pose-papier-peint-talant",
  },
  openGraph: {
    title: "Pose Papier Peint à Talant — Intissé Anti-Humidité 350m",
    description: "9 poseurs vérifiés à Talant. Spécialistes intissé anti-humidité.",
    type: "website",
  },
};

export default function Page() {
  return <DevisPapierPeintTalant />;
}
