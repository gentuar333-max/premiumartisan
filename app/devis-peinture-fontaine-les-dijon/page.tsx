import type { Metadata } from "next";
import DevisPeintureFontaine from "./DevisPeintureFontaine";

export const metadata: Metadata = {
  title: "Peinture à Fontaine-lès-Dijon — Prix 2026 & Devis Gratuit | PremiumArtisan",
  description: "6 peintres spécialisés à Fontaine-lès-Dijon. Maisons de caractère, finitions haut de gamme. Prix 29–44€/m².",
  alternates: {
    canonical: "/devis-peinture-fontaine-les-dijon",
  },
  openGraph: {
    title: "Peinture à Fontaine-lès-Dijon — Prix 2026 & Devis Gratuit",
    description: "6 peintres vérifiés à Fontaine-lès-Dijon. Prix moyen: 29–44€/m².",
    type: "website",
  },
};

export default function Page() {
  return <DevisPeintureFontaine />;
}
