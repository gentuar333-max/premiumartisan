import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réceptionniste IA Marie — Répondez à tous vos appels | PremiumArtisan",
  description: "Marie répond à vos appels 24h/24, voix naturelle et professionnelle. Collecte les informations client et rapport quotidien. Ne manquez plus jamais un appel.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}