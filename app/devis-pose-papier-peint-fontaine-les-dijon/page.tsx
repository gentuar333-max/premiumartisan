import type { Metadata } from "next";
import DevisPapierPeintFontaine from "./DevisPapierPeintFontaine";

export const metadata: Metadata = {
  title: "Pose Papier Peint à Fontaine-lès-Dijon — Lin, Chanvre & Botaniques 2026 | PremiumArtisan",
  description: "52 projets analysés. Lin, chanvre, motifs botaniques bourguignons. Spécialistes boiseries & maisons de caractère. 6 poseurs vérifiés.",
  alternates: {
    canonical: "/devis-pose-papier-peint-fontaine-les-dijon",
  },
  openGraph: {
    title: "Pose Papier Peint à Fontaine-lès-Dijon — Lin, Chanvre & Botaniques 2026",
    description: "6 poseurs vérifiés à Fontaine-lès-Dijon. Spécialistes maisons de caractère.",
    type: "website",
  },
};

export default function Page() {
  return <DevisPapierPeintFontaine />;
}
