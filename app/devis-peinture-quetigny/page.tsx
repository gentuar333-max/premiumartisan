import type { Metadata } from "next";
import DevisPeintureQuetigny from "./DevisPeintureQuetigny";

export const metadata: Metadata = {
  title: "Peinture Intérieure à Quetigny — Prix 2026 & Devis Gratuit | PremiumArtisan",
  description: "Comparez 7 peintres à Quetigny. Spécialistes finitions haut de gamme. Prix 28–43€/m². Devis en 3h — Gratuit.",
  alternates: {
    canonical: "/devis-peinture-quetigny",
  },
  openGraph: {
    title: "Peinture Intérieure à Quetigny — Prix 2026 & Devis Gratuit",
    description: "7 peintres vérifiés à Quetigny. Prix moyen: 28–43€/m². Réponse en 3h.",
    type: "website",
  },
};

export default function Page() {
  return <DevisPeintureQuetigny />;
}
