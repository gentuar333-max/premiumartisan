// app/contact/page.tsx
import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact PremiumArtisan — Email, Téléphone & Formulaire | Dijon",
  description: "Contactez PremiumArtisan à Dijon. Email : contact@premiumartisan.fr. Réponse sous 24h. Formulaire de contact, FAQ, et adresse complète.",
  alternates: { 
    canonical: "https://premiumartisan.fr/contact" 
  },
  openGraph: {
    title: "Contact PremiumArtisan — Nous Contacter à Dijon",
    description: "Une question ? Un projet ? Contactez-nous par email, formulaire ou téléphone. Réponse garantie sous 24h.",
    url: "https://premiumartisan.fr/contact",
    type: "website",
    locale: "fr_FR",
  },
};

export default function Page() {
  return <ContactPage />;
}