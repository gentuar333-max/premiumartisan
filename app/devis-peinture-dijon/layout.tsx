import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peinture Intérieure Dijon — Prix & Devis Gratuit 2026 | PremiumArtisan",
  description: "Obtenez jusqu'à 3 devis de peintres qualifiés à Dijon. Prix moyen 25–45€/m². Artisans vérifiés Côte-d'Or, réponse sous 2–4h, sans engagement.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}