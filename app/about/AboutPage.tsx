 
// app/about/AboutPage.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// SCHEMA.ORG JSON-LD
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://premiumartisan.fr/#organization",
      "name": "PremiumArtisan",
      "url": "https://premiumartisan.fr",
      "logo": "https://premiumartisan.fr/logo.png",
      "description": "Plateforme de mise en relation entre particuliers et artisans qualifiés à Dijon et en Bourgogne-Franche-Comté.",
      "founder": {
        "@type": "Person",
        "name": "Riart Mehanja",
        "jobTitle": "Fondateur & CEO"
      },
      "foundingDate": "2023",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dijon",
        "addressRegion": "Bourgogne-Franche-Comté",
        "addressCountry": "FR"
      },
      "areaServed": {
        "@type": "State",
        "name": "Bourgogne-Franche-Comté"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "523",
        "bestRating": "5"
      },
      "sameAs": [
        "https://www.linkedin.com/company/premiumartisan",
        "https://www.facebook.com/premiumartisan"
      ]
    },
    {
      "@type": "AboutPage",
      "@id": "https://premiumartisan.fr/about",
      "url": "https://premiumartisan.fr/about",
      "name": "À Propos de PremiumArtisan",
      "description": "Découvrez l'histoire de PremiumArtisan, notre mission pour connecter artisans et particuliers, et notre processus de vérification rigoureux."
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://premiumartisan.fr/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "À Propos",
          "item": "https://premiumartisan.fr/about"
        }
      ]
    }
  ]
};

const styles: Record<string, React.CSSProperties> = {
  // BREADCRUMB
  breadcrumb: {
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
    padding: "16px 24px",
  },
  breadcrumbList: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: 12,
    listStyle: "none",
    fontSize: 14,
    color: "#64748b",
  },
  breadcrumbLink: {
    color: "#0ea5e9",
    textDecoration: "none",
    fontWeight: 500,
  },

  // HERO
  hero: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    color: "#fff",
    padding: "100px 24px 80px",
    position: "relative",
    overflow: "hidden",
  },
  heroPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
  heroContainer: {
    maxWidth: 900,
    margin: "0 auto",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },
  h1: {
    fontSize: "clamp(40px, 6vw, 72px)",
    fontWeight: 900,
    lineHeight: 1.05,
    marginBottom: 24,
    letterSpacing: "-0.03em",
  },
  heroSubtitle: {
    fontSize: 22,
    color: "rgba(255,255,255,0.8)",
    maxWidth: 700,
    margin: "0 auto 40px",
    lineHeight: 1.6,
    fontWeight: 400,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    padding: "10px 24px",
    borderRadius: 50,
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 32,
    border: "1px solid rgba(255,255,255,0.2)",
  },

  // CONTENT
  content: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "80px 24px",
  },
  section: {
    marginBottom: 80,
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: 56,
  },
  h2: {
    fontSize: 42,
    fontWeight: 900,
    color: "#0f172a",
    marginBottom: 16,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  sectionSubtitle: {
    fontSize: 18,
    color: "#64748b",
    maxWidth: 600,
    margin: "0 auto",
    lineHeight: 1.6,
  },
  h3: {
    fontSize: 28,
    fontWeight: 800,
    color: "#1e293b",
    marginTop: 48,
    marginBottom: 20,
    lineHeight: 1.2,
  },
  paragraph: {
    fontSize: 17,
    color: "#475569",
    lineHeight: 1.8,
    marginBottom: 20,
  },
  highlight: {
    background: "linear-gradient(120deg, #bae6fd 0%, #bae6fd 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 40%",
    backgroundPosition: "0 88%",
    padding: "0 4px",
    fontWeight: 700,
    color: "#0369a1",
  },

  // FOUNDER SECTION
  founderSection: {
    background: "#f8fafc",
    padding: "80px 24px",
    margin: "0 -24px",
  },
  founderContainer: {
    maxWidth: 1000,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 64,
    alignItems: "center",
  },
  founderImage: {
    width: "100%",
    maxWidth: 400,
    aspectRatio: "1",
    background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 120,
    color: "#fff",
    fontWeight: 900,
    boxShadow: "0 25px 60px rgba(14,165,233,0.3)",
    margin: "0 auto",
  },
  founderContent: {},
  founderName: {
    fontSize: 36,
    fontWeight: 900,
    color: "#0f172a",
    marginBottom: 8,
  },
  founderRole: {
    fontSize: 18,
    color: "#0ea5e9",
    fontWeight: 600,
    marginBottom: 24,
  },
  founderQuote: {
    fontSize: 20,
    color: "#475569",
    lineHeight: 1.7,
    fontStyle: "italic",
    borderLeft: "4px solid #0ea5e9",
    paddingLeft: 24,
    marginBottom: 24,
  },

  // STATS
  statsSection: {
    background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    padding: "80px 24px",
    margin: "0 -24px 80px",
  },
  statsContainer: {
    maxWidth: 1000,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 32,
    textAlign: "center",
  },
  statItem: {},
  statNumber: {
    fontSize: 56,
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  // CARDS
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
    margin: "48px 0",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 32,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
  cardIcon: {
    width: 72,
    height: 72,
    background: "#f0f9ff",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
    margin: "0 auto 20px",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 1.6,
  },

  // PROCESS
  processGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 32,
    margin: "48px 0",
  },
  processStep: {
    background: "#fff",
    borderRadius: 20,
    padding: 32,
    border: "1px solid #e2e8f0",
    position: "relative",
    textAlign: "center",
  },
  processNumber: {
    width: 48,
    height: 48,
    background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 24,
    fontWeight: 900,
    margin: "0 auto 20px",
  },
  processTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 12,
  },

  // VALUES
  valuesList: {
    display: "grid",
    gap: 24,
    margin: "40px 0",
  },
  valueItem: {
    display: "flex",
    gap: 24,
    background: "#fff",
    padding: 28,
    borderRadius: 16,
    border: "1px solid #e2e8f0",
  },
  valueIcon: {
    width: 56,
    height: 56,
    background: "#f0f9ff",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    flexShrink: 0,
  },
  valueContent: {},
  valueTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 8,
  },
  valueText: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 1.6,
  },

  // CTA BOX
  ctaBox: {
    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    border: "2px solid #f59e0b",
    borderRadius: 24,
    padding: "56px 40px",
    margin: "64px 0",
    textAlign: "center",
  },
  ctaBoxTitle: {
    fontSize: 32,
    fontWeight: 900,
    color: "#92400e",
    marginBottom: 16,
  },
  ctaBoxText: {
    fontSize: 18,
    color: "#a16207",
    marginBottom: 32,
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "20px 48px",
    borderRadius: 16,
    background: "#f59e0b",
    color: "#fff",
    fontWeight: 800,
    fontSize: 18,
    textDecoration: "none",
    boxShadow: "0 10px 30px rgba(245,158,11,0.3)",
  },

  // FINAL CTA
  finalCta: {
    background: "#0f172a",
    padding: "100px 24px",
    textAlign: "center",
    margin: "0 -24px -80px",
  },
  finalCtaContainer: {
    maxWidth: 800,
    margin: "0 auto",
  },
  finalCtaH2: {
    fontSize: 48,
    fontWeight: 900,
    color: "#fff",
    marginBottom: 20,
    lineHeight: 1.1,
  },
  finalCtaText: {
    fontSize: 20,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 40,
    lineHeight: 1.6,
  },
  finalCtaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "24px 56px",
    borderRadius: 16,
    background: "#0ea5e9",
    color: "#fff",
    fontWeight: 800,
    fontSize: 19,
    textDecoration: "none",
    boxShadow: "0 20px 50px rgba(14,165,233,0.4)",
  },
};

export default function AboutPage() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* SCHEMA JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* BREADCRUMBS */}
      <nav style={styles.breadcrumb} aria-label="breadcrumb">
        <ol style={styles.breadcrumbList}>
          <li>
            <Link href="/" style={styles.breadcrumbLink}>
              Accueil
            </Link>
          </li>
          <li>›</li>
          <li style={{ color: "#334155", fontWeight: 600 }}>À Propos</li>
        </ol>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroPattern} />
        <div style={styles.heroContainer}>
          <div style={styles.badge}>
            <span>Depuis 2023</span>
            <span>•</span>
            <span>Dijon, Bourgogne</span>
          </div>
          
          <h1 style={styles.h1}>
            Trouver un bon artisan
            <br />
            ne devrait pas être un défi
          </h1>
          
          <p style={styles.heroSubtitle}>
            PremiumArtisan est né d&apos;un constat simple : trop de particuliers 
            perdent du temps à chercher un artisan sérieux, et trop d&apos;artisans 
            qualifiés manquent de visibilité. Nous avons décidé de changer cela.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>523+</div>
            <div style={styles.statLabel}>Projets réalisés</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>127</div>
            <div style={styles.statLabel}>Artisans vérifiés</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>4.8/5</div>
            <div style={styles.statLabel}>Note moyenne</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>24h</div>
            <div style={styles.statLabel}>Délai moyen devis</div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main style={styles.content}>
        
        {/* NOTRE HISTOIRE */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Notre histoire</h2>
            <p style={styles.sectionSubtitle}>
              De l&apos;idée à la plateforme de référence en Bourgogne
            </p>
          </div>

          <p style={styles.paragraph}>
            L&apos;histoire de <strong>PremiumArtisan</strong> commence en 2023, 
            à Dijon. Riart Mehanja, alors consultant en digital, fait face à un 
            problème connu de millions de Français : trouver un artisan fiable 
            pour rénover son appartement. Entre les démarchages téléphoniques 
            insistants, les devis jamais reçus, et les artisans qui disparaissent 
            en cours de chantier, l&apos;expérience s&apos;avère frustrante.
          </p>

          <p style={styles.paragraph}>
            En parallèle, Riart découvre un paradoxe : de nombreux artisans 
            extrêmement compétents, formés aux meilleures techniques du bâtiment, 
            peinent à trouver des clients qualifiés. Ils dépendent du bouche-à-oreille 
            ou de plateformes généralistes où ils se noient parmi des profils non vérifiés.
          </p>

          <p style={styles.paragraph}>
            C&apos;est de ce constat double que naît <span style={styles.highlight}>PremiumArtisan</span> : 
            une plateforme qui met en relation <strong>particuliers exigeants</strong> et 
            <strong> artisans rigoureusement sélectionnés</strong>, sur le modèle 
            du &quot;matchmaking&quot; de qualité.
          </p>

          <h3 style={styles.h3}>Les premiers pas à Dijon</h3>

          <p style={styles.paragraph}>
            Les débuts sont modestes. Riart rencontre un par un les artisans 
            du secteur, vérifie leurs références, leurs assurances, leurs 
            réalisations. Il sélectionne ses premiers 12 partenaires avec une 
            exigence draconienne : <span style={styles.highlight}>moins de 10% des artisans rencontrés</span> 
            obtiennent le label PremiumArtisan.
          </p>

          <p style={styles.paragraph}>
            En parallèle, il développe une technologie simple : un formulaire 
            intelligent qui comprend les besoins du client, un algorithme de 
            matching qui sélectionne les 3 à 4 artisans les plus pertinents, 
            et un système de suivi qui garantit la qualité du service jusqu&apos;au 
            bout.
          </p>

          <h3 style={styles.h3}>L&apos;expansion en Bourgogne-Franche-Comté</h3>

          <p style={styles.paragraph}>
            Le succès est rapide. Les clients apprécient la <strong>transparence</strong> 
            (devis détaillés, avis vérifiés), la <strong>rapidité</strong> (réponse 
            sous 24h), et surtout la <strong>qualité</strong> des artisans proposés. 
            Le bouche-à-oreille fait le reste.
          </p>

          <p style={styles.paragraph}>
            En 2024, PremiumArtisan étend son réseau à tout le département de 
            la Côte-d&apos;Or, puis à la région Bourgogne-Franche-Comté. Aujourd&apos;hui, 
            la plateforme compte <span style={styles.highlight}>plus de 127 artisans vérifiés</span> 
            et a accompagné plus de 523 projets de rénovation.
          </p>
        </section>

        {/* FOUNDER */}
        <section style={styles.founderSection}>
          <div style={styles.founderContainer}>
            <div style={styles.founderImage}>RM</div>
            <div style={styles.founderContent}>
              <div style={styles.founderName}>Riart Mehanja</div>
              <div style={styles.founderRole}>Fondateur & CEO</div>
              <p style={styles.founderQuote}>
                &quot;Je crois profondément que la technologie doit servir les métiers 
                traditionnels, pas les remplacer. Notre mission est de créer 
                un écosystème où l&apos;excellence artisanale est reconnue, rémunérée 
                à sa juste valeur, et facilement accessible aux particuliers.&quot;
              </p>
              <p style={styles.paragraph}>
                Passionné par les métiers du bâtiment et la technologie, Riart 
                a créé PremiumArtisan pour donner aux artisans locaux les outils 
                qu&apos;ils méritent — et aux particuliers une façon simple et fiable 
                de trouver le bon professionnel.
              </p>
              <p style={styles.paragraph}>
                Avant PremiumArtisan, Riart a travaillé 8 ans dans le conseil 
                en transformation digitale, accompagnant grandes entreprises et 
                PME dans leur modernisation. Cette double culture — tech et terrain — 
                lui permet aujourd&apos;hui de construire une plateforme à la fois 
                innovante et ancrée dans la réalité des artisans.
              </p>
            </div>
          </div>
        </section>

        {/* NOTRE MISSION */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Notre mission</h2>
            <p style={styles.sectionSubtitle}>
              Deux objectifs : simplifier la vie des particuliers, 
              valoriser l&apos;excellence artisanale
            </p>
          </div>

          <div style={styles.cardsGrid}>
            <div style={styles.card}>
              <div style={styles.cardIcon}>🏠</div>
              <h4 style={styles.cardTitle}>Pour les particuliers</h4>
              <p style={styles.cardText}>
                Trouver rapidement un artisan qualifié, obtenir des devis 
                transparents, et réaliser ses projets de rénovation en toute 
                confiance. Fini le stress des recherches interminables.
              </p>
            </div>

            <div style={styles.card}>
              <div style={styles.cardIcon}>🛠️</div>
              <h4 style={styles.cardTitle}>Pour les artisans</h4>
              <p style={styles.cardText}>
                Accéder à des clients qualifiés, sans démarchage. Se concentrer 
                sur son métier pendant que nous gérons la prospection et 
                l&apos;administratif.
              </p>
            </div>

            <div style={styles.card}>
              <div style={styles.cardIcon}>🤝</div>
              <h4 style={styles.cardTitle}>Pour le territoire</h4>
              <p style={styles.cardText}>
                Préserver et transmettre les savoir-faire artisanaux locaux. 
                Favoriser l&apos;économie circulaire en Bourgogne-Franche-Comté.
              </p>
            </div>
          </div>
        </section>

        {/* NOS VALEURS */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Nos valeurs</h2>
            <p style={styles.sectionSubtitle}>
              Ce qui guide chacune de nos décisions
            </p>
          </div>

          <div style={styles.valuesList}>
            <div style={styles.valueItem}>
              <div style={styles.valueIcon}>✓</div>
              <div style={styles.valueContent}>
                <h4 style={styles.valueTitle}>Excellence</h4>
                <p style={styles.valueText}>
                  Nous ne travaillons qu&apos;avec des artisans sélectionnés selon 
                  des critères stricts : qualifications, assurances, avis clients, 
                  respect des délais. Moins de 10% des candidats obtiennent 
                  le label PremiumArtisan.
                </p>
              </div>
            </div>

            <div style={styles.valueItem}>
              <div style={styles.valueIcon}>🔍</div>
              <div style={styles.valueContent}>
                <h4 style={styles.valueTitle}>Transparence</h4>
                <p style={styles.valueText}>
                  Devis détaillés, prix clairs, pas de frais cachés. Les avis 
                  clients sont 100% vérifiés et non modérés. Ce qui compte, 
                  c&apos; votre confiance.
                </p>
              </div>
            </div>

            <div style={styles.valueItem}>
              <div style={styles.valueIcon}>⚡</div>
              <div style={styles.valueContent}>
                <h4 style={styles.valueTitle}>Efficacité</h4>
                <p style={styles.valueText}>
                  Réponse sous 24h, matching intelligent, suivi de projet. 
                  Nous respectons votre temps et celui des artisans.
                </p>
              </div>
            </div>

            <div style={styles.valueItem}>
              <div style={styles.valueIcon}>🤲</div>
              <div style={styles.valueContent}>
                <h4 style={styles.valueTitle}>Proximité</h4>
                <p style={styles.valueText}>
                  Nous connaissons personnellement chaque artisan partenaire. 
                  Nous sommes basés à Dijon, disponibles par téléphone, 
                  et ancrés dans le territoire bourguignon.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Comment ça marche ?</h2>
            <p style={styles.sectionSubtitle}>
              Un processus simple en 4 étapes
            </p>
          </div>

          <div style={styles.processGrid}>
            <div style={styles.processStep}>
              <div style={styles.processNumber}>1</div>
              <h4 style={styles.processTitle}>Vous décrivez votre projet</h4>
              <p style={styles.cardText}>
                Formulaire en ligne simple : type de travaux, surface, 
                localisation, budget, délais. 2 minutes chrono.
              </p>
            </div>

            <div style={styles.processStep}>
              <div style={styles.processNumber}>2</div>
              <h4 style={styles.processTitle}>Nous sélectionnons les artisans</h4>
              <p style={styles.cardText}>
                Notre algorithme + équipe humaine sélectionnent 3 à 4 artisans 
                pertinents, disponibles, et proches de chez vous.
              </p>
            </div>

            <div style={styles.processStep}>
              <div style={styles.processNumber}>3</div>
              <h4 style={styles.processTitle}>Vous recevez les devis</h4>
              <p style={styles.cardText}>
                Chaque artisan vous contacte sous 24h avec un devis détaillé. 
                Vous comparez en toute transparence.
              </p>
            </div>

            <div style={styles.processStep}>
              <div style={styles.processNumber}>4</div>
              <h4 style={styles.processTitle}>Vous choisissez et on suit</h4>
              <p style={styles.cardText}>
                Vous sélectionnez votre artisan. Nous restons disponibles 
                pendant le chantier en cas de besoin.
              </p>
            </div>
          </div>
        </section>

        {/* CTA INTERMÉDIAIRE */}
        <div style={styles.ctaBox}>
          <h3 style={styles.ctaBoxTitle}>Prêt à démarrer votre projet ?</h3>
          <p style={styles.ctaBoxText}>
            Rejoignez les 523+ propriétaires qui ont trouvé leur artisan 
            via PremiumArtisan. Gratuit, sans engagement, réponse sous 24h.
          </p>
          <Link href="/publier-projet/form" style={styles.ctaButton}>
            Publier mon projet gratuitement →
          </Link>
        </div>

        {/* FAQ */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Questions fréquentes</h2>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {[
              {
                q: "PremiumArtisan est-il vraiment gratuit pour les particuliers ?",
                a: "Oui, 100% gratuit. Notre modèle économique repose sur une commission prélevée aux artisans uniquement en cas de chantier signé. Vous ne payez rien pour publier votre projet ni pour recevoir les devis."
              },
              {
                q: "Comment vérifiez-vous la qualité des artisans ?",
                a: "Processus en 4 étapes : 1) Vérification SIRET et assurances (RC Pro, décennale), 2) Analyse des réalisations passées et avis clients, 3) Entretien physique avec notre équipe, 4) Période d'essai de 3 chantiers surveillés. Moins de 10% des candidats sont retenus."
              },
              {
                q: "Dans quelles villes intervenez-vous ?",
                a: "Nous couvrons toute la Bourgogne-Franche-Comté : Dijon, Chenôve, Quetigny, Longvic, Talant, Fontaine-lès-Dijon, et l'ensemble de la Côte-d'Or, Saône-et-Loire, Yonne, Nièvre, et Doubs."
              },
              {
                q: "Que se passe-t-il si je ne suis pas satisfait ?",
                a: "Notre équipe reste disponible pendant tout le chantier. En cas de problème, nous médions entre vous et l'artisan. Si nécessaire, nous pouvons mobiliser un autre professionnel de notre réseau. Votre satisfaction est notre priorité."
              },
              {
                q: "Puis-je devenir artisan partenaire PremiumArtisan ?",
                a: "Oui, si vous êtes artisan qualifié en Bourgogne-Franche-Comté. Contactez-nous via le formulaire recrutement. Nous étudions chaque candidature avec soin."
              }
            ].map((faq, index) => (
              <div key={index} style={{ 
                background: "#fff", 
                padding: 24, 
                borderRadius: 16,
                border: "1px solid #e2e8f0"
              }}>
                <h4 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
                  {faq.q}
                </h4>
                <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Nous contacter</h2>
            <p style={styles.sectionSubtitle}>
              Une question ? Une suggestion ? Nous sommes là.
            </p>
          </div>

          <div style={{ 
            background: "#f8fafc", 
            padding: 32, 
            borderRadius: 20,
            textAlign: "center"
          }}>
            <p style={{ fontSize: 17, color: "#475569", marginBottom: 16 }}>
              <strong>PremiumArtisan</strong>
              <br />
              21000 Dijon, Bourgogne-Franche-Comté
              <br />
              Email : contact@premiumartisan.fr
            </p>
            <p style={{ fontSize: 15, color: "#64748b" }}>
              Disponible du lundi au vendredi, 9h-18h
            </p>
          </div>
        </section>

      </main>

      {/* FINAL CTA */}
      <section style={styles.finalCta}>
        <div style={styles.finalCtaContainer}>
          <h2 style={styles.finalCtaH2}>
            Rejoignez l&apos;aventure PremiumArtisan
          </h2>
          <p style={styles.finalCtaText}>
            Que vous soyez particulier ou artisan, construisons ensemble 
            l&apos;avenir des métiers du bâtiment en Bourgogne.
          </p>
          <Link href="/publier-projet/form" style={styles.finalCtaButton}>
            Publier mon projet maintenant →
          </Link>
        </div>
      </section>
    </>
  );
}