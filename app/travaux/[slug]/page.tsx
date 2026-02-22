// app/travaux/[slug]/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import type React from "react";

// ✅ Import i saktë për strukturën që ke: app/lib/seo.ts
import {
  SITE,
  cities,
  services,
  parseTravauxSlug,
  buildTravauxSlug,
  makeMetadata,
  buildFaqSchema,
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
  jsonLdScriptTag,
} from "@/app/lib/seo";

// (Opsionale, por e dobishme për SEO + build të pastër në Vercel)
// export const dynamicParams = false;

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const c of cities) {
    for (const s of services) {
      params.push({ slug: buildTravauxSlug(s, c) }); // p.sh. devis-peinture-dijon
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const parsed = parseTravauxSlug(params.slug);
  const service = parsed.service;
  const city = parsed.city;

  if (!service || !city) {
    return makeMetadata({
      title: "Devis travaux | PremiumArtisan",
      description: "Recevez jusqu’à 4 devis d’artisans locaux. Gratuit, sans engagement.",
      path: `/travaux/${params.slug}`,
    });
  }

  const serviceName = service.labelShort;
  const cityName = city.name;

  const title = `Devis ${serviceName} à ${cityName} | 4 artisans max | PremiumArtisan`;
  const description = `Recevez jusqu’à 4 devis pour ${serviceName.toLowerCase()} à ${cityName} (Côte-d'Or). Gratuit, sans spam, projet privé.`;

  return makeMetadata({
    title,
    description,
    path: `/travaux/${params.slug}`,
  });
}

export default function CityServicePage({ params }: { params: { slug: string } }) {
  const parsed = parseTravauxSlug(params.slug);
  const service = parsed.service;
  const city = parsed.city;

  if (!service || !city) {
    return (
      <main style={styles.wrap}>
        <div style={styles.inner}>
          <h1 style={styles.h1}>Page introuvable</h1>
          <Link href="/" style={styles.link}>
            Retour à l’accueil
          </Link>
        </div>
      </main>
    );
  }

  const serviceName = service.labelShort;
  const cityName = city.name;
  const postalHint = city.postalExamples?.[0] ?? "";

  // ✅ FAQ (nuk e fshij)
  const faq = [
    {
      q: `Quel est le prix moyen pour ${serviceName.toLowerCase()} à ${cityName} ?`,
      a: `Le prix dépend de la surface, de l’état des murs/plafonds et des finitions. Le plus fiable est de comparer 2–4 devis d’artisans locaux à ${cityName}.`,
    },
    {
      q: "Combien de devis vais-je recevoir ?",
      a: "Jusqu’à 4 réponses maximum, pour rester clair et éviter le spam.",
    },
    {
      q: "Est-ce gratuit ?",
      a: "Oui, publier une demande est gratuit et sans engagement.",
    },
    {
      q: "Mon numéro est-il public ?",
      a: "Non. Le projet reste privé et est transmis uniquement aux artisans pertinents.",
    },
  ];

  const pagePath = `/travaux/${params.slug}`;
  const base = SITE.baseUrl.replace(/\/$/, "");
  const pageUrl = `${base}${pagePath}`;

  const faqJsonLdCustom = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };

  const faqJsonLdFromEngine = buildFaqSchema(service, city);

  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: "Accueil", path: "/" },
    { name: "Travaux", path: "/travaux" },
    { name: `Devis ${serviceName} ${cityName}`, path: pagePath },
  ]);

  const localBusinessJsonLd = buildLocalBusinessSchema(service, city, pageUrl);
  const serviceJsonLd = buildServiceSchema(service, city, pageUrl);

  const related = cities
    .filter((c) => c.id !== city.id)
    .slice(0, 5)
    .map((c) => ({
      label: `${serviceName} ${c.name}`,
      href: `/travaux/${buildTravauxSlug(service, c)}`,
    }));

  const formLink = `/publier-projet/form?type=${encodeURIComponent(service.metierSlug)}${
    postalHint ? `&cp=${encodeURIComponent(postalHint)}` : ""
  }`;

  return (
    <main style={styles.wrap}>
      {/* ✅ JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScriptTag(faqJsonLdCustom) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScriptTag(faqJsonLdFromEngine) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScriptTag(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScriptTag(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScriptTag(serviceJsonLd) }} />

      <div style={styles.inner}>
        <nav style={styles.breadcrumbs} aria-label="Fil d’ariane">
          <Link href="/" style={styles.crumbLink}>
            Accueil
          </Link>
          <span style={styles.crumbSep}>/</span>
          <span style={styles.crumbCurrent}>Travaux</span>
          <span style={styles.crumbSep}>/</span>
          <span style={styles.crumbCurrent}>
            Devis {serviceName} {cityName}
          </span>
        </nav>

        <h1 style={styles.h1}>
          Devis {serviceName} à {cityName}
        </h1>

        <p style={styles.lead}>
          Gratuit, sans engagement. Jusqu’à <b>4 réponses maximum</b>, projet privé, sans sollicitations inutiles.
        </p>

        <div style={styles.ctaRow}>
          <Link href={formLink} style={styles.ctaPrimary}>
            Recevoir 4 devis
          </Link>
          <Link href="/" style={styles.ctaSecondary}>
            Voir la page principale
          </Link>
        </div>

        <section style={styles.card}>
          <h2 style={styles.h2}>Ce que vous obtenez</h2>
          <ul style={styles.ul}>
            <li>Artisans locaux près de {cityName}</li>
            <li>Comparaison simple (2 à 4 devis)</li>
            <li>Volume maîtrisé : pas de spam</li>
            <li>Projet privé : pas de diffusion publique</li>
          </ul>
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>Questions fréquentes</h2>
          <div style={styles.faqGrid}>
            {faq.map((x) => (
              <details key={x.q} style={styles.faqItem}>
                <summary style={styles.faqQ}>{x.q}</summary>
                <div style={styles.faqA}>{x.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>Autres villes en Côte-d&apos;Or</h2>
          <div style={styles.related}>
            {related.map((r) => (
              <Link key={r.href} href={r.href} style={styles.relatedLink}>
                {r.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: "100vh",
    background: "#F7F8FB",
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto",
  },
  inner: { maxWidth: 960, margin: "0 auto", padding: "34px 18px 44px" },

  breadcrumbs: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", fontSize: 12.5, opacity: 0.9 },
  crumbLink: { color: "#0B1020", textDecoration: "underline", fontWeight: 800 },
  crumbSep: { opacity: 0.6 },
  crumbCurrent: { color: "rgba(11,16,32,0.75)", fontWeight: 800 },

  h1: { fontSize: 44, fontWeight: 950, margin: "10px 0 8px", color: "#0B1020" },
  lead: { fontSize: 16.5, color: "rgba(11,16,32,0.72)", lineHeight: 1.6, margin: "0 0 14px" },

  ctaRow: { display: "flex", gap: 12, flexWrap: "wrap", margin: "10px 0 18px" },
  ctaPrimary: {
    padding: "12px 16px",
    borderRadius: 14,
    background: "#0B1020",
    color: "#fff",
    fontWeight: 950,
    textDecoration: "none",
  },
  ctaSecondary: {
    padding: "12px 16px",
    borderRadius: 14,
    background: "rgba(11,16,32,0.06)",
    border: "1px solid rgba(11,16,32,0.12)",
    color: "#0B1020",
    fontWeight: 950,
    textDecoration: "none",
  },

  card: {
    background: "#fff",
    borderRadius: 18,
    border: "1px solid rgba(11,16,32,0.10)",
    padding: 16,
    marginTop: 14,
  },
  h2: { fontSize: 18, fontWeight: 950, margin: "0 0 10px", color: "#0B1020" },
  ul: { margin: 0, paddingLeft: 18, color: "rgba(11,16,32,0.75)", lineHeight: 1.7 },

  faqGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10 },
  faqItem: { borderRadius: 14, border: "1px solid rgba(11,16,32,0.10)", padding: "10px 12px" },
  faqQ: { cursor: "pointer", fontWeight: 950, color: "#0B1020" },
  faqA: { marginTop: 8, color: "rgba(11,16,32,0.72)", lineHeight: 1.55 },

  related: { display: "flex", gap: 10, flexWrap: "wrap" },
  relatedLink: {
    padding: "10px 12px",
    borderRadius: 999,
    border: "1px solid rgba(11,16,32,0.12)",
    background: "rgba(11,16,32,0.04)",
    color: "#0B1020",
    fontWeight: 900,
    textDecoration: "none",
  },

  link: { color: "#0B1020", fontWeight: 900, textDecoration: "underline" },
};