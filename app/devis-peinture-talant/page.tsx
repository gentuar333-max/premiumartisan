import type { Metadata } from "next";
import DevisPeintureTalant from "./DevisPeintureTalant";

export const metadata: Metadata = {
  title: "Peinture Intérieure à Talant (21240) — Prix 2026 & Devis Gratuit | PremiumArtisan",
  description: "Comparez les prix de 9 peintres à Talant. Prix moyen constaté: 28–42€/m². Recevez 3 devis en 3h — Gratuit, sans engagement. Artisans vérifiés Côte-d'Or.",
  alternates: {
    canonical: "/devis-peinture-talant",
  },
  openGraph: {
    title: "Peinture Intérieure à Talant (21240) — Prix 2026 & Devis Gratuit",
    description: "9 peintres vérifiés à Talant. Prix moyen: 28–42€/m². Réponse en 3h.",
    type: "website",
  },
};

export default function Page() {
  return <DevisPeintureTalant />;
}
