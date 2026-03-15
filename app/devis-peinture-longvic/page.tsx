import type { Metadata } from "next";
import DevisPeintureLongvic from "./DevisPeintureLongvic";

export const metadata: Metadata = {
  title: "Peinture Intérieure à Longvic — Prix 2026 & Devis Gratuit | PremiumArtisan",
  description: "Comparez 8 peintres à Longvic. Prix moyen 27–41€/m². Recevez 3 devis en 4h — Gratuit, sans engagement.",
  alternates: {
    canonical: "/devis-peinture-longvic",
  },
  openGraph: {
    title: "Peinture Intérieure à Longvic — Prix 2026 & Devis Gratuit",
    description: "8 peintres vérifiés à Longvic. Prix moyen: 27–41€/m². Réponse en 4h.",
    type: "website",
  },
};

export default function Page() {
  return <DevisPeintureLongvic />;
}
