// app/about/page.tsx
import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "À Propos de PremiumArtisan — Notre Histoire & Mission | Dijon",
  description: "PremiumArtisan connecte particuliers et artisans qualifiés à Dijon et en Bourgogne. Découvrez notre histoire, notre mission et comment nous vérifions chaque artisan.",
  alternates: { 
    canonical: "https://premiumartisan.fr/about" 
  },
  openGraph: {
    title: "À Propos de PremiumArtisan — Notre Histoire & Mission",
    description: "La plateforme de référence pour trouver des artisans vérifiés à Dijon. +500 projets réalisés, 4.8/5 satisfaction.",
    url: "https://premiumartisan.fr/about",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  return <AboutPage />;
}