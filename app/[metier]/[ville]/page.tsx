// app/devis-peinture/[ville]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

// Vetëm këto qytete do gjenerohen statikisht (SEO clean)
const CITY_MAP: Record<string, { name: string; postal: string }> = {
  dijon: { name: "Dijon", postal: "21000" },
  beaune: { name: "Beaune", postal: "21200" },
  lyon: { name: "Lyon", postal: "69000" },
  besancon: { name: "Besançon", postal: "25000" },
};

// Mos lejo parametra të tjerë jashtë listës (shumë e mirë për SEO)
export const dynamicParams = false;

// URL absolute për canonical/OG (vendose në .env: NEXT_PUBLIC_SITE_URL=https://domain.tld)
const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

// Normalizim slug (SEO clean URL)
function normalizeVille(v: string) {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // heq thekset (ç, é, à)
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Static generation për SEO
export async function generateStaticParams() {
  return Object.keys(CITY_MAP).map((ville) => ({ ville }));
}

// Metadata dinamike SEO (Title + Description + OG)
// Next (versionet e reja) mund t’i trajtojë params si Promise → e bëjmë safe.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>;
}): Promise<Metadata> {
  const { ville } = await params;

  const villeSlug = normalizeVille(ville);
  const city = CITY_MAP[villeSlug];
  const cityName = city?.name ?? ville;

  const title = `Devis peinture ${cityName} gratuit en 16 secondes | 4 artisans maximum`;
  const description = `Recevez jusqu’à 4 devis peinture gratuits à ${cityName}. Sans engagement. Réponse rapide par des artisans proches de chez vous.`;

  const canonical = `${SITE_URL}/devis-peinture/${villeSlug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}export default async function Page({
  params,
}: {
  params: Promise<{ ville: string }>;
}) {
  const { ville } = await params;

  const villeSlug = normalizeVille(ville);
  const city = CITY_MAP[villeSlug];

  const cityName = city?.name ?? ville;
  const postal = city?.postal ?? "";

  // Prefill automatik i formës (strategjik për konvertim)
  const formUrl = postal
  ? `/publier-projet/form?cp=${encodeURIComponent(postal)}&city=${encodeURIComponent(cityName)}`
  : `/publier-projet/form?city=${encodeURIComponent(cityName)}`;

  // FAQ Schema (SEO Rich Results Google)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Comment obtenir un devis peinture à ${cityName} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Décrivez votre projet en quelques étapes, indiquez la surface et votre budget estimé. Vous recevez ensuite jusqu’à 4 réponses d’artisans proches de chez vous.",
        },
      },
      {
        "@type": "Question",
        name: "Est-ce gratuit et sans engagement ?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Oui. La demande de devis est gratuite et sans engagement. Vous comparez librement les propositions.",
        },
      },
      {
        "@type": "Question",
        name: "Combien d’artisans reçoivent ma demande ?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Votre demande est diffusée à 4 artisans maximum afin de garantir des réponses rapides et de qualité.",
        },
      },
    ],
  };

  return (
    <main
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: "32px 20px",
      }}
    >
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* H1 SEO (keyword + city) */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          marginBottom: 12,
        }}
      >
        Devis peinture à {cityName}
      </h1>

      <p
        style={{
          fontSize: 18,
          lineHeight: 1.6,
          maxWidth: 680,
        }}
      >
        Recevez jusqu’à 4 devis peinture gratuits à {cityName}, sans engagement.
        Décrivez votre projet en quelques secondes et soyez contacté par des
        artisans qualifiés proches de chez vous.
      </p>

      {/* Bloc conversion (CTA kryesor) */}
      <div
        style={{
          marginTop: 24,
          padding: 24,
          borderRadius: 16,
          border: "1px solid #e5e7eb",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          Pourquoi utiliser notre service à {cityName} ?
        </div>

        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            lineHeight: 1.8,
            fontSize: 16,
          }}
        >
          <li>Réponse rapide en moins de 24h</li>
          <li>Artisans vérifiés dans votre zone</li>
          <li>Comparaison simple des devis</li>
          <li>Diffusion limitée à 4 artisans maximum</li>
        </ul>

        <div style={{ marginTop: 20 }}>
          <Link
            href={formUrl}
            style={{
              display: "inline-block",
              padding: "14px 20px",
              borderRadius: 12,
              border: "1px solid #111",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            Publier mon projet gratuitement
          </Link>
        </div>
      </div>{/* SEO Content (shumë i rëndësishëm për ranking) */}
      <section style={{ marginTop: 40, maxWidth: 720 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>
          Trouver un artisan peintre à {cityName}
        </h2>
        <p style={{ lineHeight: 1.8 }}>
          Que ce soit pour la peinture intérieure, la rénovation d’appartement
          ou un chantier complet, notre plateforme vous permet de recevoir des
          devis adaptés à votre projet à {cityName}. Indiquez simplement la
          surface, votre budget estimé et la localisation pour obtenir des
          réponses pertinentes.
        </p>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 28 }}>
          Service gratuit et sans engagement
        </h2>
        <p style={{ lineHeight: 1.8 }}>
          La demande de devis est 100% gratuite et sans engagement. Vous restez
          libre de choisir l’artisan qui correspond le mieux à votre budget et à
          votre planning. Votre projet est partagé avec un maximum de 4 artisans
          pour garantir la qualité des réponses.
        </p>
      </section>

      {/* FAQ visible + SEO */}
      <section style={{ marginTop: 40, maxWidth: 720 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>
          Questions fréquentes
        </h2>

        <h3 style={{ marginTop: 16 }}>
          Est-ce que le devis peinture est vraiment gratuit ?
        </h3>
        <p>Oui, la demande de devis est gratuite et sans engagement.</p>

        <h3>Combien d’artisans reçoivent ma demande ?</h3>
        <p>Votre demande est envoyée à 4 artisans maximum.</p>

        <h3>Combien de temps pour recevoir une réponse ?</h3>
        <p>
          La majorité des clients reçoivent des réponses d’artisans en moins de
          24 heures selon la zone et la complexité du projet.
        </p>
      </section>
    </main>
  );
}