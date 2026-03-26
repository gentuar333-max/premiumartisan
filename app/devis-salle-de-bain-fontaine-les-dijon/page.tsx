// app/devis-salle-de-bain-fontaine-les-dijon/page.tsx
import type { Metadata } from "next";
import DevisSalleDeBainFontaineLesDijon from "./DevisSalleDeBainFontaineLesDijon";

export const metadata: Metadata = {
  title: "Rénovation Salle de Bain Fontaine-lès-Dijon — Prix 2026 & Devis | PremiumArtisan",
  description: "Artisans spécialisés maisons de caractère à Fontaine-lès-Dijon (21121). Budget moyen 10 200€. Pierre naturelle, baignoire îlot, travertin. Devis gratuits sous 4-7h.",
  alternates: { 
    canonical: "https://premiumartisan.fr/devis-salle-de-bain-fontaine-les-dijon" 
  },
  openGraph: {
    title: "Rénovation Salle de Bain Fontaine-lès-Dijon — Spécialistes Pierre Naturelle",
    description: "28 projets documentés. Budget moyen 10 200€. Pierre de Bourgogne, travertin, baignoire îlot. Devis gratuit.",
    url: "https://premiumartisan.fr/devis-salle-de-bain-fontaine-les-dijon",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  return <DevisSalleDeBainFontaineLesDijon />;
}