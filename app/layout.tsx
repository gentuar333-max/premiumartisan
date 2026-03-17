import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PremiumArtisan — Trouvez un artisan fiable à Dijon & Côte-d'Or",
  description: "Publiez votre projet gratuitement et recevez jusqu'à 3 devis d'artisans qualifiés à Dijon et en Côte-d'Or. Peinture, rénovation, plomberie. Gratuit, sans engagement.",
  metadataBase: new URL("https://premiumartisan.fr"),
  verification: {
    google: "YrEFTOxJ1q7Z4V",
  },
  openGraph: {
    title: "PremiumArtisan — Artisans qualifiés à Dijon",
    description: "Trouvez un artisan fiable à Dijon. Gratuit, sans engagement.",
    url: "https://premiumartisan.fr",
    siteName: "PremiumArtisan",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}