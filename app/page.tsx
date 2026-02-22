// app/page.tsx
"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

type ProjectType = "peinture-interieure" | "peinture-exterieure" | "plafond" | "renovation";

export default function Page() {
  const router = useRouter();
  const [typeProjet, setTypeProjet] = React.useState<ProjectType>("peinture-interieure");
  const [codePostal, setCodePostal] = React.useState<string>("");

  const onSubmitMiniForm = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("type", typeProjet);
    if (codePostal.trim()) params.set("cp", codePostal.trim());

    // IMPORTANT: backticks (`)
    router.push(`/publier-projet/form?${params.toString()}`);
  };

  const faq = [
    {
      q: "Combien de devis vais-je recevoir ?",
      a: "Jusqu’à 4 réponses maximum, pour éviter la surcharge et rester efficace.",
    },
    {
      q: "Mon numéro est-il partagé publiquement ?",
      a: "Non. Votre demande reste privée et transmise uniquement à des artisans pertinents.",
    },
    {
      q: "Le service est-il payant ?",
      a: "Non. Publier une demande est gratuit et sans engagement.",
    },
    {
      q: "Sous quel délai les artisans répondent-ils ?",
      a: "Généralement sous 24h selon la disponibilité des artisans dans votre zone.",
    },
    {
      q: "Puis-je demander peinture intérieure et plafonds ?",
      a: "Oui, vous pouvez préciser le type de projet et les détails dans le formulaire.",
    },
  ];

  // JSON-LD FAQ (Rich Results)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };

  return (
    <main style={styles.page}>
      {/* HERO (BLUE) */}
      <section style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.badge}>PremiumArtisan • Dijon & Côte-d&apos;Or</div>

          <h1 style={styles.h1}>
            Trouvez un artisan
            <br />
            <span style={styles.h1Accent}>fiable</span> près de chez <span style={styles.h1Keep}>vous.</span>
          </h1>

          <p style={styles.sub}>
            Gratuit, sans engagement. Nous transmettons votre demande à des artisans de votre zone. Vous recevez jusqu’à{" "}
            <b>4 réponses maximum</b>.
          </p>

          {/* MINI FORM (Option A) */}
          <form onSubmit={onSubmitMiniForm} style={styles.miniForm} aria-label="Mini formulaire">
            <select
              value={typeProjet}
              onChange={(e) => setTypeProjet(e.target.value as ProjectType)}
              style={styles.input}
              aria-label="Type de projet"
            >
              <option value="peinture-interieure">Peinture intérieure</option>
              <option value="peinture-exterieure">Peinture extérieure</option>
              <option value="plafond">Murs & plafonds</option>
              <option value="renovation">Rénovation</option>
            </select>

            <input
              value={codePostal}
              onChange={(e) => setCodePostal(e.target.value)}
              style={styles.input}
              inputMode="numeric"
              placeholder="Code postal (ex: 21000)"
              aria-label="Code postal"
            />

            <button type="submit" style={styles.heroPrimaryBtn}>
              Recevoir 4 devis gratuits
            </button>
          </form>

          {/* TRUST PILLS */}
          <div style={styles.trustBar}>
            <div style={styles.trustItem}>Réponse sous 24h</div>
            <div style={styles.trustItem}>Projet privé</div>
            <div style={styles.trustItem}>Sans spam</div>
            <div style={styles.trustItem}>4 artisans maximum</div>
          </div>

          {/* SEO INTERNAL LINKS (light, no clutter) */}
          <div style={styles.quickLinks}>
            <span style={styles.quickLinksLabel}>Devis locaux :</span>
            <Link style={styles.quickLink} href="/travaux/devis-peinture-dijon">
              Peinture Dijon
            </Link>
            <Link style={styles.quickLink} href="/travaux/devis-peinture-beaune">
              Peinture Beaune
            </Link>
            <Link style={styles.quickLink} href="/travaux/devis-peinture-chenove">
              Peinture Chenôve
            </Link>
          </div>
        </div>

        {/* ONLY vertical space (+~25%) without adding content */}
        <div style={styles.heroSpacer} />
      </section>

      {/* WHY + REVIEWS (GRAY DARKER ~25%) */}
      <section style={styles.whyWrap}>
        <div style={styles.sectionInner}>
          <h2 style={styles.h2Dark}>Pourquoi choisir PremiumArtisan ?</h2>

          <div style={styles.whyGrid}>
            <div style={styles.whyCard}>
              <div style={styles.whyTitle}>Sans spam</div>
              <div style={styles.whyText}>
                Votre demande est envoyée uniquement à des artisans pertinents (zone, type de peinture, délais).
              </div>
            </div>

            <div style={styles.whyCard}>
              <div style={styles.whyTitle}>4 artisans maximum</div>
              <div style={styles.whyText}>Volume maîtrisé pour éviter les appels inutiles et garder des devis comparables.</div>
            </div>

            <div style={styles.whyCard}>
              <div style={styles.whyTitle}>Projet privé</div>
              <div style={styles.whyText}>Les projets restent privés : votre numéro n’est pas diffusé publiquement.</div>
            </div>

            <div style={styles.whyCard}>
              <div style={styles.whyTitle}>Réponse sous 24h</div>
              <div style={styles.whyText}>Réponse généralement sous 24h selon disponibilité des artisans.</div>
            </div>

            <div style={styles.whyCard}>
              <div style={styles.whyTitle}>Local Dijon & Côte-d&apos;Or</div>
              <div style={styles.whyText}>Service focalisé local pour de meilleurs délais et un meilleur matching.</div>
            </div>

            <div style={styles.whyCard}>
              <div style={styles.whyTitle}>Sérieux & sélection</div>
              <div style={styles.whyText}>Profils adaptés à votre besoin : intérieur, extérieur, plafond, rénovation.</div>
            </div>
          </div>

          {/* Option B: reviews (soft-critical, more real) */}
          <h3 style={styles.h3Dark}>Ils nous font confiance à Dijon & Côte-d&apos;Or</h3>

          <div style={styles.reviewsGrid}>
            <div style={styles.reviewCard}>
              <div style={styles.reviewText}>
                “Service rapide, j’ai reçu 3 devis peinture en moins de 24h à Dijon. Un artisan était un peu en retard,
                mais la mise en relation était claire.”
              </div>
              <div style={styles.reviewMeta}>— Marc, Dijon (21000)</div>
            </div>

            <div style={styles.reviewCard}>
              <div style={styles.reviewText}>
                “Devis détaillé et bon contact. J’aurais aimé plus de créneaux au début, mais j’ai trouvé un peintre
                sérieux pour la rénovation.”
              </div>
              <div style={styles.reviewMeta}>— Sophie, Côte-d&apos;Or</div>
            </div>

            <div style={styles.reviewCard}>
              <div style={styles.reviewText}>
                “Plateforme simple et efficace, sans appels inutiles. Tout n’était pas parfait au premier échange,
                mais on avance vite avec 2–3 pros.”
              </div>
              <div style={styles.reviewMeta}>— Julien, Chenôve</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHITE SECTION (Examples + How) */}
      <section style={styles.whiteWrap}>
        <div style={styles.sectionInner}>
          <section style={styles.examplesSection}>
            <h2 style={styles.h2White}>Exemples de chantiers peinture</h2>

            <div style={styles.examplesGrid}>
              <div style={styles.exampleCard}>
                <img
                  src="/images/peinture-rouleau.webp"
                  alt="Peintre appliquant la peinture au rouleau"
                  style={styles.exampleImg}
                />
                <div style={styles.exampleBody}>
                  <div style={styles.exampleTitle}>Peinture intérieure</div>
                  <div style={styles.exampleText}>Finition nette, protection des sols, rendu premium.</div>
                </div>
              </div>

              <div style={styles.exampleCard}>
                <img
                  src="/images/peinture-echelle.webp"
                  alt="Peintre sur échelle peignant un mur"
                  style={styles.exampleImg}
                />
                <div style={styles.exampleBody}>
                  <div style={styles.exampleTitle}>Murs & plafonds</div>
                  <div style={styles.exampleText}>Préparation, sous-couche, 2 couches — résultat durable.</div>
                </div>
              </div>
            </div>
          </section>

          <section id="comment" style={styles.howSection}>
            <h2 style={styles.h2White}>Comment ça marche</h2>

            <div style={styles.stepsGrid}>
              <div style={styles.stepCard}>
                <div style={styles.stepTitle}>1) Vous publiez</div>
                <div style={styles.stepText}>Décrivez votre projet en 1 minute.</div>
              </div>

              <div style={styles.stepCard}>
                <div style={styles.stepTitle}>2) On transmet</div>
                <div style={styles.stepText}>Votre demande est envoyée à des artisans pertinents (zone + besoin).</div>
              </div>

              <div style={styles.stepCard}>
                <div style={styles.stepTitle}>3) Vous choisissez</div>
                <div style={styles.stepText}>Vous comparez et décidez — jusqu’à 4 réponses maximum.</div>
              </div>
            </div>
          </section>

          <section style={styles.artisanSection}>
            <div style={styles.artisanCard}>
              <div style={styles.artisanTitle}>Êtes-vous artisan peintre à Dijon / Côte-d&apos;Or ?</div>
              <div style={styles.artisanText}>
                Rejoignez PremiumArtisan pour recevoir des demandes qualifiées, sans spam et avec un volume maîtrisé.
              </div>
              <Link href="/login" style={styles.artisanBtn}>
                Accès artisan
              </Link>
            </div>
          </section>
        </div>
      </section>

      {/* LIGHT FAQ (GRAY LIGHT) */}
      <section style={styles.faqWrap}>
        <div style={styles.sectionInner}>
          {/* JSON-LD */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

          <h2 style={styles.h2Faq}>Questions fréquentes</h2>

          <div style={styles.faqGrid}>
            {faq.map((x) => (
              <details key={x.q} style={styles.faqItem}>
                <summary style={styles.faqQ}>{x.q}</summary>
                <div style={styles.faqA}>{x.a}</div>
              </details>
            ))}
          </div>

          <footer style={styles.footer}>
            <div style={styles.footerLine} />
            <div style={styles.footerText}>
              Service local <b>Peinture</b> — <b>Dijon & Côte-d&apos;Or</b>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },

  /* HERO BLUE */
  heroSection: {
    color: "#EAF0FF",
    background:
      "radial-gradient(1000px 700px at 18% 18%, rgba(45,110,255,0.28), rgba(11,16,32,0) 60%), radial-gradient(900px 600px at 78% 20%, rgba(34,211,238,0.18), rgba(11,16,32,0) 55%), linear-gradient(135deg, rgba(18,38,85,0.78), rgba(11,16,32,0) 58%), #0B1020",
  },

  container: {
    maxWidth: 1150,
    margin: "0 auto",
    padding: "68px 20px 26px",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 18,
    alignItems: "start",
  },

  heroSpacer: {
    height: 120, // adds vertical space (~25% more feel) without adding content
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    fontWeight: 900,
    fontSize: 13,
    width: "fit-content",
  },

  h1: { margin: "10px 0 10px", fontSize: 66, lineHeight: 1.01, letterSpacing: "-0.02em", fontWeight: 950 },

  h1Accent: {
    background: "linear-gradient(90deg, rgba(89,140,255,1), rgba(34,211,238,1))",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },

  h1Keep: { color: "#EAF0FF" },

  sub: { margin: "0 0 10px", fontSize: 18, lineHeight: 1.55, color: "rgba(234,240,255,0.84)", maxWidth: 900 },

  miniForm: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: 4 },

  input: {
    height: 46,
    padding: "0 14px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.08)",
    color: "#EAF0FF",
    fontWeight: 800,
    outline: "none",
    minWidth: 240,
  },

  heroPrimaryBtn: {
    height: 46,
    padding: "0 16px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "linear-gradient(90deg, rgba(34,211,238,0.92), rgba(89,140,255,0.92))",
    color: "#FFFFFF",
    fontWeight: 950,
    cursor: "pointer",
    boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
    whiteSpace: "nowrap",
  },

  trustBar: {
    marginTop: 10,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    color: "rgba(234,240,255,0.85)",
    fontSize: 13,
    fontWeight: 800,
  },

  trustItem: {
    padding: "8px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.05)",
  },

  quickLinks: { marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", opacity: 0.9 },
  quickLinksLabel: { fontSize: 12.5, fontWeight: 800, opacity: 0.8 },
  quickLink: { fontSize: 12.5, fontWeight: 800, color: "rgba(234,240,255,0.90)", textDecoration: "underline" },

  /* GRAY DARKER SECTION */
  whyWrap: {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.00), rgba(255,255,255,0.00)), #E9ECF2",
    padding: "48px 0 56px",
  },

  sectionInner: { maxWidth: 1150, margin: "0 auto", padding: "0 20px" },

  h2Dark: { fontSize: 44, fontWeight: 950, margin: "0 0 18px", color: "#111827" },
  h3Dark: { fontSize: 26, fontWeight: 950, margin: "26px 0 12px", color: "#111827" },

  whyGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginTop: 8 },

  whyCard: {
    borderRadius: 20,
    border: "1px solid rgba(17,24,39,0.10)",
    background: "rgba(255,255,255,0.78)", // brighter than background, but overall section darker feel
    boxShadow: "0 18px 46px rgba(17,24,39,0.10)",
    padding: 18,
  },

  whyTitle: { fontWeight: 950, marginBottom: 8, color: "#111827" },
  whyText: { color: "rgba(17,24,39,0.78)", lineHeight: 1.55 },

  reviewsGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginTop: 12 },

  reviewCard: {
    borderRadius: 20,
    border: "1px solid rgba(17,24,39,0.10)",
    background: "rgba(255,255,255,0.72)",
    padding: 18,
  },
  reviewText: { color: "rgba(17,24,39,0.78)", lineHeight: 1.6, fontStyle: "italic" },
  reviewMeta: { marginTop: 10, fontWeight: 900, color: "#111827", opacity: 0.85 },

  /* WHITE CONTENT SECTION */
  whiteWrap: { background: "#FFFFFF", padding: "52px 0 56px" },

  examplesSection: { padding: "0 0 22px" },
  h2White: { fontSize: 42, fontWeight: 950, margin: "0 0 18px", color: "#0B1020" },

  examplesGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, marginTop: 10 },

  exampleCard: {
    borderRadius: 22,
    border: "1px solid rgba(11,16,32,0.10)",
    background: "#FFFFFF",
    overflow: "hidden",
    boxShadow: "0 22px 60px rgba(11,16,32,0.10)",
  },

  exampleImg: { width: "100%", height: 260, objectFit: "cover", display: "block" },
  exampleBody: { padding: 16, display: "grid", gap: 6 },
  exampleTitle: { fontWeight: 950, fontSize: 16, color: "#0B1020" },
  exampleText: { color: "rgba(11,16,32,0.72)", lineHeight: 1.5 },

  howSection: { padding: "26px 0 6px" },
  stepsGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 },

  stepCard: {
    borderRadius: 20,
    border: "1px solid rgba(11,16,32,0.10)",
    background: "#FFFFFF",
    boxShadow: "0 18px 44px rgba(11,16,32,0.10)",
    padding: 18,
  },
  stepTitle: { fontWeight: 950, marginBottom: 6, color: "#0B1020" },
  stepText: { color: "rgba(11,16,32,0.72)", lineHeight: 1.5 },

  artisanSection: { padding: "20px 0 0" },
  artisanCard: {
    borderRadius: 24,
    border: "1px solid rgba(11,16,32,0.10)",
    background: "#FFFFFF",
    boxShadow: "0 30px 80px rgba(11,16,32,0.10)",
    padding: 22,
    display: "grid",
    gap: 10,
  },
  artisanTitle: { fontWeight: 950, fontSize: 20, color: "#0B1020" },
  artisanText: { color: "rgba(11,16,32,0.72)", lineHeight: 1.55, maxWidth: 900 },
  artisanBtn: {
    width: "fit-content",
    padding: "12px 16px",
    borderRadius: 14,
    border: "1px solid rgba(11,16,32,0.14)",
    background: "rgba(11,16,32,0.04)",
    color: "#0B1020",
    fontWeight: 950,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },

  /* FAQ LIGHT GRAY */
  faqWrap: { background: "#F7F8FB", padding: "52px 0 44px" },
  h2Faq: { fontSize: 40, fontWeight: 950, margin: "0 0 16px", color: "#0B1020" },

  faqGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14, marginTop: 10 },

  faqItem: {
    borderRadius: 18,
    border: "1px solid rgba(11,16,32,0.10)",
    background: "#FFFFFF",
    padding: "12px 14px",
  },
  faqQ: { cursor: "pointer", fontWeight: 950, color: "#0B1020" },
  faqA: { marginTop: 8, color: "rgba(11,16,32,0.72)", lineHeight: 1.55 },

  footer: { marginTop: 22, padding: "0 0 8px" },
  footerLine: { borderTop: "1px solid rgba(11,16,32,0.10)", marginTop: 10, paddingTop: 14 },
  footerText: { color: "rgba(11,16,32,0.60)", fontSize: 12.5 },
};// lib/seo.ts
export type City = {
  name: string;
  slug: string;
  postalHint: string;
};

export type Service = {
  name: string;
  slug: string; // used in URL
};

export const cities: City[] = [
  { name: "Dijon", slug: "dijon", postalHint: "21000" },
  { name: "Beaune", slug: "beaune", postalHint: "21200" },
  { name: "Chenôve", slug: "chenove", postalHint: "21300" },
  { name: "Talant", slug: "talant", postalHint: "21240" },
  { name: "Quetigny", slug: "quetigny", postalHint: "21800" },
  { name: "Longvic", slug: "longvic", postalHint: "21600" },
];

export const services: Service[] = [
  { name: "Peinture", slug: "peinture" },
  { name: "Peinture intérieure", slug: "peinture-interieure" },
  { name: "Peinture extérieure", slug: "peinture-exterieure" },
  { name: "Murs & plafonds", slug: "plafond" },
  { name: "Rénovation", slug: "renovation" },
];

export function titleCaseCity(slug: string) {
  if (slug === "chenove") return "Chenôve";
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function serviceLabel(serviceSlug: string) {
  const found = services.find((s) => s.slug === serviceSlug);
  return found?.name ?? "Travaux";
}