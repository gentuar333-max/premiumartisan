import type { Metadata } from "next";
import DevisCuisineDijon from "./DevisCuisineDijon";

export const metadata: Metadata = {
  title: "Trouvez un Cuisiniste à Dijon — Devis Gratuit 2026 | PremiumArtisan",
  description: "34 cuisinistes vérifiés à Dijon. Budget moyen 14 200€. Cuisine ouverte, sur mesure, îlot central. Publiez votre projet, recevez des devis sous 24h.",
  alternates: {
    canonical: "/devis-cuisine-dijon",
  },
  openGraph: {
    title: "Trouvez un Cuisiniste à Dijon — Devis Gratuit 2026",
    description: "34 cuisinistes vérifiés à Dijon. Budget moyen 14 200€.",
    type: "website",
  },
};

export default function Page() {
  return <DevisCuisineDijon />;
}
