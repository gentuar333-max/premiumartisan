// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };

  React.useEffect(() => {
    router.prefetch("/publier-projet/form");
  }, [router]);

  return (
    <main style={styles.page}>
      {/* HERO (BLUE) — keep title long, no hero image */}
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

          {/* MINI FORM */}
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
              onChange={(e) => setCodePostal(e.target.value.replace(/\D/g, "").slice(0, 5))}
              style={styles.input}
              inputMode="numeric"
              pattern="[0-9]{5}"
              maxLength={5}
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

          {/* SEO INTERNAL LINKS */}
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

        <div style={styles.heroSpacer} />
      </section>

      {/* WHY + REVIEWS (GRAY darker ~40% from why to reviews) */}
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

      {/* COMMENT ÇA MARCHE */}
      <section style={styles.whiteWrap}>
        <div style={styles.sectionInner}>
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

          {/* 2 PHOTOS (after Comment ça marche) */}
          <section style={styles.photosSection}>
            <div className="grid md:grid-cols-12 gap-6 mt-6">
              {/* Large left */}
              <div className="md:col-span-7">
                <div className="relative w-full h-[420px] overflow-hidden rounded-2xl">
                  <Image
                    src="/landing/how-it-works-1.webp"
                    alt="Artisan en intervention sur un chantier de rénovation"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    Photo illustrative
                  </span>
                </div>
              </div>

              {/* Smaller right */}
              <div className="md:col-span-5 flex md:items-center">
                <div className="relative w-full h-[420px] overflow-hidden rounded-2xl">
                  <Image
                    src="/landing/how-it-works-2.webp"
                    alt="Finition intérieure soignée après travaux de peinture"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={95}
                    className="object-contain rounded-2xl bg-gray-50"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    Photo illustrative
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* FAQ (after photos) */}
      <section style={styles.faqWrap}>
        <div style={styles.sectionInner}>
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

  heroSpacer: { height: 120 },

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

  /* WHY WRAP — darker gray (~40% darker feel) + wave SVG */
  whyWrap: {
    padding: "54px 0 60px",
    backgroundColor: "#D9DEE7",
    backgroundImage:
      "linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.16)), radial-gradient(900px 520px at 50% 52%, rgba(0,0,0,0.14), rgba(0,0,0,0) 62%), url('/images/bg-wave-gray.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  sectionInner: { maxWidth: 1150, margin: "0 auto", padding: "0 20px" },

  h2Dark: { fontSize: 44, fontWeight: 950, margin: "0 0 18px", color: "#111827" },
  h3Dark: { fontSize: 26, fontWeight: 950, margin: "26px 0 12px", color: "#111827" },

  whyGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginTop: 8 },

  whyCard: {
    borderRadius: 20,
    border: "1px solid rgba(17,24,39,0.10)",
    background: "rgba(255,255,255,0.68)",
    boxShadow: "0 18px 46px rgba(17,24,39,0.10)",
    padding: 18,
    backdropFilter: "blur(2px)",
  },

  whyTitle: { fontWeight: 950, marginBottom: 8, color: "#111827" },
  whyText: { color: "rgba(17,24,39,0.78)", lineHeight: 1.55 },

  reviewsGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginTop: 12 },

  reviewCard: {
    borderRadius: 20,
    border: "1px solid rgba(17,24,39,0.10)",
    background: "rgba(255,255,255,0.64)",
    padding: 18,
    backdropFilter: "blur(2px)",
  },
  reviewText: { color: "rgba(17,24,39,0.78)", lineHeight: 1.6, fontStyle: "italic" },
  reviewMeta: { marginTop: 10, fontWeight: 900, color: "#111827", opacity: 0.85 },

  /* WHITE SECTION */
  whiteWrap: { background: "#FFFFFF", padding: "52px 0 56px" },

  h2White: { fontSize: 42, fontWeight: 950, margin: "0 0 18px", color: "#0B1020" },

  howSection: { padding: "0 0 18px" },

  stepsGrid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginTop: 10 },

  stepCard: {
    borderRadius: 20,
    border: "1px solid rgba(11,16,32,0.10)",
    background: "#FFFFFF",
    boxShadow: "0 18px 44px rgba(11,16,32,0.10)",
    padding: 18,
  },
  stepTitle: { fontWeight: 950, marginBottom: 6, color: "#0B1020" },
  stepText: { color: "rgba(11,16,32,0.72)", lineHeight: 1.5 },

  photosSection: { padding: "14px 0 0" },

  exampleCardHero: {
    position: "relative",
    borderRadius: 16,
    border: "1px solid rgba(11,16,32,0.10)",
    background: "#FFFFFF",
    overflow: "hidden",
    boxShadow: "0 22px 60px rgba(11,16,32,0.10)",
  },

  exampleCardCompact: {
    position: "relative",
    width: "100%",
    borderRadius: 16,
    border: "1px solid rgba(11,16,32,0.10)",
    background: "#FFFFFF",
    overflow: "hidden",
    boxShadow: "0 18px 44px rgba(11,16,32,0.10)",
  },

  exampleImgHero: { width: "100%", height: 360, objectFit: "cover", display: "block" },
  exampleImgCompact: { width: "100%", height: 260, objectFit: "cover", display: "block" },
  photoBadge: {
    position: "absolute",
    right: 10,
    bottom: 10,
    fontSize: 12,
    color: "#fff",
    background: "rgba(11,16,32,0.65)",
    padding: "4px 8px",
    borderRadius: 8,
  },

  /* FAQ */
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
};