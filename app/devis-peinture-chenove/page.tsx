import type { Metadata } from "next";
import DevisPeintureChenove from "./DevisPeintureChenove";

export const metadata: Metadata = {
  title: "Peinture Intérieure à Chenôve (21300) — Prix 2026 & Devis Gratuit | PremiumArtisan",
  description: "Comparez les prix de 12 peintres à Chenôve. Prix moyen constaté: 24–42€/m². Recevez 3 devis en 3h — Gratuit, sans engagement. Artisans vérifiés Côte-d'Or.",
  alternates: {
    canonical: "/devis-peinture-chenove",
  },
  openGraph: {
    title: "Peinture Intérieure à Chenôve (21300) — Prix 2026 & Devis Gratuit",
    description: "12 peintres vérifiés à Chenôve. Prix moyen: 24–42€/m². Réponse en 3h.",
    type: "website",
  },
};

export default function Page() {
  return <DevisPeintureChenove />;
}
