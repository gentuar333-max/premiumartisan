// app/devis-salle-de-bain-fontaine-les-dijon/DevisSalleDeBainFontaineLesDijon.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

// SCHEMA.ORG JSON-LD
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://premiumartisan.fr/devis-salle-de-bain-fontaine-les-dijon#business",
      "name": "PremiumArtisan — Rénovation Salle de Bain Fontaine-lès-Dijon",
      "url": "https://premiumartisan.fr/devis-salle-de-bain-fontaine-les-dijon",
      "description": "Artisans spécialisés en rénovation de salles de bain à Fontaine-lès-Dijon. Expertise pierre naturelle, travertin, baignoire îlot et maisons de caractère.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Fontaine-lès-Dijon",
        "addressLocality": "Fontaine-lès-Dijon",
        "addressRegion": "Bourgogne-Franche-Comté",
        "postalCode": "21121",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 47.3436,
        "longitude": 5.0194
      },
      "areaServed": {
        "@type": "City",
        "name": "Fontaine-lès-Dijon"
      },
      "serviceType": [
        "Rénovation salle de bain",
        "Installation baignoire îlot",
        "Pose pierre naturelle",
        "Douche à l'italienne",
        "Suite parentale",
        "Aménagement PMR"
      ],
      "priceRange": "€€€",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "28",
        "bestRating": "5"
      }
    },
    {
      "@type": "Service",
      "name": "Devis Rénovation Salle de Bain Fontaine-lès-Dijon",
      "provider": {
        "@id": "https://premiumartisan.fr/devis-salle-de-bain-fontaine-les-dijon#business"
      },
      "areaServed": {
        "@type": "City",
        "name": "Fontaine-lès-Dijon"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services rénovation SDB Fontaine",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Rénovation complète 7m²",
              "description": "Carrelage pierre, douche italienne, plomberie complète"
            },
            "price": "10200",
            "priceCurrency": "EUR",
            "priceValidUntil": "2026-12-31"
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Pourquoi les salles de bain à Fontaine-lès-Dijon coûtent-elles plus cher ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les maisons de Fontaine sont plus grandes (7-10m² vs 4-5m² standard) et utilisent des matériaux nobles comme la pierre de Bourgogne (85-140€/m²) et le travertin. Le budget moyen est de 10 200€ contre 6 500-8 000€ dans les communes voisines."
          }
        },
        {
          "@type": "Question",
          "name": "Quel délai pour rénover une salle de bain à Fontaine ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Un projet standard prend 2 à 3 semaines. Les projets avec pierre naturelle nécessitent 3 à 4 semaines (séchage des enduits, traitement hydrofuge). Les délais devis sont de 4-7h sur PremiumArtisan."
          }
        }
      ]
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
          "name": "Salle de Bain",
          "item": "https://premiumartisan.fr/devis-salle-de-bain"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Fontaine-lès-Dijon",
          "item": "https://premiumartisan.fr/devis-salle-de-bain-fontaine-les-dijon"
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
    color: "#059669",
    textDecoration: "none",
    fontWeight: 500,
  },

  // HERO
  hero: {
    background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
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
    maxWidth: 1000,
    margin: "0 auto",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },
  locationBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    padding: "10px 20px",
    borderRadius: 50,
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 24,
    border: "1px solid rgba(255,255,255,0.2)",
  },
  h1: {
    fontSize: "clamp(36px, 6vw, 64px)",
    fontWeight: 900,
    lineHeight: 1.05,
    marginBottom: 24,
    letterSpacing: "-0.02em",
  },
  heroSubtitle: {
    fontSize: 20,
    color: "rgba(255,255,255,0.85)",
    maxWidth: 700,
    margin: "0 auto 40px",
    lineHeight: 1.6,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "20px 48px",
    borderRadius: 16,
    background: "#fff",
    color: "#065f46",
    fontWeight: 800,
    fontSize: 18,
    textDecoration: "none",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
  },
  statsBar: {
    display: "flex",
    justifyContent: "center",
    gap: 48,
    marginTop: 56,
    flexWrap: "wrap",
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: 40,
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginTop: 8,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  // CONTENT
  content: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "80px 24px",
  },
  section: {
    marginBottom: 72,
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: 48,
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
  h4: {
    fontSize: 22,
    fontWeight: 700,
    color: "#334155",
    marginTop: 32,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 17,
    color: "#475569",
    lineHeight: 1.8,
    marginBottom: 20,
  },
  highlight: {
    background: "linear-gradient(120deg, #a7f3d0 0%, #a7f3d0 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 40%",
    backgroundPosition: "0 88%",
    padding: "0 4px",
    fontWeight: 700,
    color: "#065f46",
  },
  highlightNumber: {
    background: "linear-gradient(120deg, #fde68a 0%, #fde68a 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 40%",
    backgroundPosition: "0 88%",
    padding: "0 6px",
    fontWeight: 800,
    color: "#92400e",
  },

  // CARDS
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
    margin: "40px 0",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: 32,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  },
  cardFeatured: {
    background: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
    color: "#fff",
    border: "none",
  },
  cardIcon: {
    width: 60,
    height: 60,
    background: "#ecfdf5",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    marginBottom: 20,
  },
  cardIconFeatured: {
    background: "rgba(255,255,255,0.2)",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 12,
  },
  cardTitleFeatured: {
    color: "#fff",
  },
  cardText: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 1.6,
    marginBottom: 16,
  },
  cardTextFeatured: {
    color: "rgba(255,255,255,0.9)",
  },
  cardPrice: {
    fontSize: 36,
    fontWeight: 900,
    color: "#059669",
  },
  cardPriceFeatured: {
    color: "#fff",
  },
  cardPriceUnit: {
    fontSize: 14,
    fontWeight: 500,
    color: "#64748b",
  },

  // TABLE
  tableContainer: {
    background: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    margin: "40px 0",
    border: "1px solid #e2e8f0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    background: "#f0fdf4",
    padding: "20px 24px",
    textAlign: "left",
    fontWeight: 700,
    fontSize: 13,
    color: "#065f46",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "2px solid #bbf7d0",
  },
  td: {
    padding: "20px 24px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: 15,
    color: "#334155",
  },
  tdStrong: {
    fontWeight: 700,
    color: "#0f172a",
  },

  // CTA BOX
  ctaBox: {
    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    border: "2px solid #f59e0b",
    borderRadius: 24,
    padding: "48px 40px",
    margin: "56px 0",
    textAlign: "center",
  },
  ctaBoxTitle: {
    fontSize: 28,
    fontWeight: 900,
    color: "#92400e",
    marginBottom: 12,
  },
  ctaBoxText: {
    fontSize: 17,
    color: "#a16207",
    marginBottom: 28,
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
  },
  ctaBoxButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "18px 40px",
    borderRadius: 14,
    background: "#f59e0b",
    color: "#fff",
    fontWeight: 800,
    fontSize: 17,
    textDecoration: "none",
    boxShadow: "0 10px 30px rgba(245,158,11,0.3)",
  },

  // ARTISANS
  artisansGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: 24,
    margin: "40px 0",
  },
  artisanCard: {
    background: "#fff",
    borderRadius: 20,
    padding: 28,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
    transition: "all 0.3s ease",
  },
  artisanAvatar: {
    width: 72,
    height: 72,
    borderRadius: 50,
    background: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 28,
    fontWeight: 800,
    flexShrink: 0,
  },
  artisanContent: {
    flex: 1,
  },
  artisanName: {
    fontSize: 20,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 4,
  },
  artisanCompany: {
    fontSize: 14,
    color: "#059669",
    fontWeight: 600,
    marginBottom: 8,
  },
  artisanRating: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  stars: {
    color: "#fbbf24",
    fontSize: 16,
  },
  artisanMeta: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 4,
  },
  artisanSpecialty: {
    fontSize: 14,
    color: "#475569",
    fontStyle: "italic",
    lineHeight: 1.5,
  },

  // TESTIMONIALS
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
    margin: "40px 0",
  },
  testimonialCard: {
    background: "#fff",
    borderRadius: 20,
    padding: 32,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
  },
  testimonialStars: {
    color: "#fbbf24",
    fontSize: 20,
    marginBottom: 16,
  },
  testimonialText: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 1.7,
    fontStyle: "italic",
    marginBottom: 20,
  },
  testimonialAuthor: {
    fontWeight: 800,
    color: "#0f172a",
    fontSize: 16,
  },
  testimonialDetails: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
  },

  // FAQ
  faqContainer: {
    marginTop: 40,
  },
  faqItem: {
    background: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  },
  faqQuestion: {
    padding: "24px 28px",
    fontSize: 17,
    fontWeight: 700,
    color: "#0f172a",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f8fafc",
    borderBottom: "1px solid #f1f5f9",
  },
  faqAnswer: {
    padding: "24px 28px",
    fontSize: 16,
    color: "#475569",
    lineHeight: 1.8,
    background: "#fff",
  },

  // NEIGHBORHOODS
  neighborhoods: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 24,
  },
  neighborhood: {
    background: "#f0fdf4",
    padding: "12px 24px",
    borderRadius: 50,
    fontSize: 14,
    color: "#065f46",
    fontWeight: 600,
    border: "1px solid #bbf7d0",
    textDecoration: "none",
    transition: "all 0.2s",
  },

  // FINAL CTA
  finalCta: {
    background: "#0f172a",
    padding: "100px 24px",
    textAlign: "center",
    position: "relative",
  },
  finalCtaContainer: {
    maxWidth: 800,
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
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
    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    color: "#fff",
    fontWeight: 800,
    fontSize: 19,
    textDecoration: "none",
    boxShadow: "0 20px 50px rgba(5,150,105,0.4)",
  },
  trustIndicators: {
    display: "flex",
    justifyContent: "center",
    gap: 40,
    marginTop: 48,
    flexWrap: "wrap",
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
};

export default function DevisSalleDeBainFontaineLesDijon() {
  const [hovered, setHovered] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
          <li>
            <Link href="/devis-salle-de-bain" style={styles.breadcrumbLink}>
              Salle de Bain
            </Link>
          </li>
          <li>›</li>
          <li style={{ color: "#334155", fontWeight: 600 }}>
            Fontaine-lès-Dijon
          </li>
        </ol>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroPattern} />
        <div style={styles.heroContainer}>
          <div style={styles.locationBadge}>
            <span>🌲</span>
            <span>Fontaine-lès-Dijon 21121 • Maisons de caractère</span>
          </div>
          
          <h1 style={styles.h1}>
            Rénovation Salle de Bain
            <br />
            <span style={{ fontSize: "0.5em", opacity: 0.9 }}>
              Fontaine-lès-Dijon
            </span>
          </h1>
          
          <p style={styles.heroSubtitle}>
            Artisans spécialisés maisons de caractère. 
            <span style={styles.highlightNumber}> Budget moyen 10 200€</span>. 
            Pierre de Bourgogne, travertin, baignoire îlot. 
            28 projets documentés. Devis sous 4-7h.
          </p>

          <Link
            href="/publier-projet/form"
            style={{
              ...styles.ctaButton,
              transform: hovered ? "translateY(-4px)" : "translateY(0)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Obtenir mes devis gratuits
            <span style={{ fontSize: 20 }}>→</span>
          </Link>

          <div style={styles.statsBar}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>10 200€</div>
              <div style={styles.statLabel}>Budget moyen</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>28</div>
              <div style={styles.statLabel}>Projets 2025-26</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>6</div>
              <div style={styles.statLabel}>Artisans spécialisés</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>4.9/5</div>
              <div style={styles.statLabel}>Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main style={styles.content}>
        
        {/* INTRODUCTION */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Pourquoi Fontaine-lès-Dijon est unique</h2>
            <p style={styles.sectionSubtitle}>
              Une commune où la rénovation de salle de bain devient 
              restauration du patrimoine
            </p>
          </div>

          <p style={styles.paragraph}>
            <strong>Fontaine-lès-Dijon</strong> n&apos;est pas une commune comme les autres. 
            Nichée au pied de la côte de Nuits, cette ville de 
            <span style={styles.highlight}> 9 000 habitants</span> conserve une identité 
            architecturale forte héritée des XIXe et XXe siècles. Contrairement aux 
            zones pavillonnaires standardisées des années 70 ou aux grands ensembles 
            HLM, Fontaine offre un <strong>patrimoine bâti de qualité</strong> : maisons 
            bourgeoises, villas Art Déco, et demeures de vigneronnes aux volumes généreux.
          </p>

          <p style={styles.paragraph}>
            Cette spécificité change tout pour la rénovation de salles de bain. 
            Ici, on ne &quot;rafraîchit&quot; pas une SDB — on la <strong>restaure et on la sublime</strong>. 
            Les propriétaires fontainois investissent en moyenne 
            <span style={styles.highlightNumber}> 10 200€</span> contre 6 500-8 000€ 
            dans les communes voisines. Pourquoi ? Parce que la qualité de l&apos;existant 
            justifie l&apos;excellence de la rénovation.
          </p>

          <div style={styles.cardsGrid}>
            <div style={styles.card}>
              <div style={styles.cardIcon}>🏡</div>
              <h4 style={styles.cardTitle}>Surfaces généreuses</h4>
              <p style={styles.cardText}>
                7 à 10m² en moyenne (vs 4-5m² standard). Espace suffisant pour 
                baignoire îlot, double vasque, et dressing intégré.
              </p>
            </div>

            <div style={{...styles.card, ...styles.cardFeatured}}>
              <div style={{...styles.cardIcon, ...styles.cardIconFeatured}}>🪨</div>
              <h4 style={{...styles.cardTitle, ...styles.cardTitleFeatured}}>
                Matières nobles
              </h4>
              <p style={{...styles.cardText, ...styles.cardTextFeatured}}>
                Pierre de Bourgogne, travertin, tomettes terre cuite. 
                Des matériaux locaux qui donnent une âme unique.
              </p>
            </div>

            <div style={styles.card}>
              <div style={styles.cardIcon}>🌲</div>
              <h4 style={styles.cardTitle}>Harmonie bâtie</h4>
              <p style={styles.cardText}>
                Identité architecturale cohérente. Les SDB modernes s&apos;intègrent 
                parfaitement et rehaussent la valeur du bien.
              </p>
            </div>
          </div>
        </section>

        {/* PRIX */}
        <section style={styles.section}>
          <h2 style={styles.h2}>Tarifs rénovation SDB Fontaine 2026</h2>
          
          <p style={styles.paragraph}>
            Basé sur <strong>28 projets documentés</strong> à Fontaine-lès-Dijon 
            entre janvier 2025 et mars 2026. Ces prix reflètent la qualité des 
            matériaux nobles et l&apos;expertise requise pour les maisons de caractère.
          </p>

          <div style={styles.cardsGrid}>
            <div style={styles.card}>
              <div style={styles.cardIcon}>🚿</div>
              <h4 style={styles.cardTitle}>Rénovation complète 7m²</h4>
              <p style={styles.cardText}>
                Carrelage pierre, douche italienne, plomberie complète, 
                meuble vasque. Garantie décennale.
              </p>
              <div style={styles.cardPrice}>
                6 500–14 000€
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardIcon}>🛁</div>
              <h4 style={styles.cardTitle}>Baignoire îlot posée</h4>
              <p style={styles.cardText}>
                Alimentation repositionnée, carrelage autour, robinetterie premium. 
                Le luxe accessible.
              </p>
              <div style={styles.cardPrice}>
                4 000–12 000€
              </div>
            </div>

            <div style={{...styles.card, ...styles.cardFeatured}}>
              <div style={{...styles.cardIcon, ...styles.cardIconFeatured}}>👑</div>
              <h4 style={{...styles.cardTitle, ...styles.cardTitleFeatured}}>
                Suite parentale 10m²
              </h4>
              <p style={{...styles.cardText, ...styles.cardTextFeatured}}>
                Pierre, bois, double vasque, baignoire îlot, douche à l&apos;italienne. 
                L&apos;excellence Fontaine.
              </p>
              <div style={{...styles.cardPrice, ...styles.cardPriceFeatured}}>
                12 000–30 000€
              </div>
            </div>
          </div>

          <h3 style={styles.h3}>Comparatif matériaux : Pierre vs Standard</h3>

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Critère</th>
                  <th style={styles.th}>Carrelage standard</th>
                  <th style={styles.th}>Pierre naturelle / Tomette</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}><strong>Prix /m² posé</strong></td>
                  <td style={styles.td}>35–65€</td>
                  <td style={{...styles.td, color: "#059669", fontWeight: 700}}>85–140€</td>
                </tr>
                <tr style={{ background: "#fafafa" }}>
                  <td style={styles.td}><strong>Entretien</strong></td>
                  <td style={styles.td}>Simple, aucun traitement</td>
                  <td style={styles.td}>Hydrofuge tous les 2-3 ans</td>
                </tr>
                <tr>
                  <td style={styles.td}><strong>Durée de vie</strong></td>
                  <td style={styles.td}>15-25 ans</td>
                  <td style={{...styles.td, color: "#059669", fontWeight: 700}}>50 ans et +</td>
                </tr>
                <tr style={{ background: "#fafafa" }}>
                  <td style={styles.td}><strong>Valeur ajoutée</strong></td>
                  <td style={styles.td}>Standard</td>
                  <td style={{...styles.td, color: "#059669", fontWeight: 700}}>Forte — argument vente</td>
                </tr>
                <tr>
                  <td style={styles.td}><strong>Harmonie maison</strong></td>
                  <td style={styles.td}>Neutre</td>
                  <td style={{...styles.td, color: "#059669", fontWeight: 700}}>Excellente avec bâti ancien</td>
                </tr>
                <tr style={{ background: "#fafafa" }}>
                  <td style={styles.td}><strong>Patine</strong></td>
                  <td style={styles.td}>Usure visible</td>
                  <td style={{...styles.td, color: "#059669", fontWeight: 700}}>S&apos;améliore avec le temps</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={styles.paragraph}>
            <em>
              La pierre naturelle représente un investissement initial supérieur 
              mais se rentabilise sur la durée de vie et la valeur de revente. 
              À Fontaine, c&apos;est un choix qui s&apos;impose naturellement par 
              l&apos;harmonie avec l&apos;architecture locale.
            </em>
          </p>
        </section>

        {/* CTA INTERMÉDIAIRE */}
        <div style={styles.ctaBox}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
          <h3 style={styles.ctaBoxTitle}>Votre projet mérite un expert Fontaine</h3>
          <p style={styles.ctaBoxText}>
            Décrivez votre salle de bain. Recevez jusqu&apos;à 4 devis d&apos;artisans 
            spécialisés en maisons de caractère et pierre naturelle. 
            Réponse sous 4-7h.
          </p>
          <Link href="/publier-projet/form" style={styles.ctaBoxButton}>
            Publier mon projet maintenant →
          </Link>
        </div>

        {/* SPÉCIFICITÉS FONTAINE */}
        <section style={styles.section}>
          <h2 style={styles.h2}>L&apos;expertise Fontaine : ce qui change tout</h2>

          <h3 style={styles.h3}>La pierre de Bourgogne en salle de bain</h3>
          
          <p style={styles.paragraph}>
            La <strong>pierre de Bourgogne</strong> n&apos;est pas qu&apos;un matériau — 
            c&apos;est un héritage géologique. Extraite des carrières locales 
            (Comblanchien, Solutré, Volvic), cette pierre calcaire offre des 
            tonalités chaudes qui évoluent magnifiquement avec l&apos;humidité ambiante. 
            Contrairement aux carrelages industriels, elle 
            <span style={styles.highlight}> respire et régule l&apos;hygrométrie</span>.
          </p>

          <p style={styles.paragraph}>
            Son utilisation en salle de bain nécessite cependant une expertise pointue :
          </p>

          <ul style={{ ...styles.paragraph, paddingLeft: 24, listStyle: "none" }}>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ color: "#059669", fontSize: 20 }}>✓</span>
              <div>
                <strong>Choix du traitement hydrofuge</strong> : Impératif pour 
                éviter les infiltrations. Nos artisans utilisent des produits 
                spécifiques compatibles avec la respiration de la pierre.
              </div>
            </li>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ color: "#059669", fontSize: 20 }}>✓</span>
              <div>
                <strong>Jointoiement adapté</strong> : Joints souples permettant 
                les micro-mouvements naturels de la pierre. Technique différente 
                du carrelage standard.
              </div>
            </li>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ color: "#059669", fontSize: 20 }}>✓</span>
              <div>
                <strong>Pente et évacuation</strong> : La pierre demande des 
                pentes légèrement plus prononcées (2% minimum) pour éviter 
                les stagnations d&apos;eau.
              </div>
            </li>
          </ul>

          <h3 style={styles.h3}>Le travertin : l&apos;élégance romaine</h3>
          
          <p style={styles.paragraph}>
            Importé d&apos;Italie mais parfaitement adapté au climat bourguignon, 
            le <strong>travertin</strong> connaît un succès croissant à Fontaine. 
            Ses tons crème et beige chauds s&apos;accordent sublimement avec les 
            boiseries anciennes des maisons fontainoises. Utilisé pour les 
            douches à l&apos;italienne, il crée des espaces <em>spa-like</em> 
            d&apos;une rare élégance.
          </p>

          <h3 style={styles.h3}>La baignoire îlot : cœur de la salle de bain</h3>
          
          <p style={styles.paragraph}>
            Impossible dans une SDB de 4m², la <strong>baignoire îlot</strong> 
            devient réalisable à Fontaine grâce aux surfaces généreuses. 
            Positionnée au centre de la pièce comme une sculpture, elle 
            transforme la salle de bain en <span style={styles.highlight}>espace de vie</span> 
            à part entière. Budget : 4 000€ à 12 000€ selon le modèle 
            (acrylique, fonte, ou pierre solide).
          </p>

          <h3 style={styles.h3}>Les suites parentales : tendance forte 2026</h3>
          
          <p style={styles.paragraph}>
            Avec 10m² et plus, de plus en plus de propriétaires fontainois 
            créent de véritables <strong>suites parentales</strong> : salle de 
            bain ouverte sur dressing, double vasque en marbre, baignoire îlot, 
            douche à l&apos;italienne en travertin, et parfois même sauna ou 
            hammam privatif. Investissement : 12 000€ à 30 000€, mais 
            <span style={styles.highlight}> valeur immobilière décuplée</span>.
          </p>
        </section>

        {/* ARTISANS */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Nos artisans spécialisés à Fontaine</h2>
            <p style={styles.sectionSubtitle}>
              Experts reconnus en maisons de caractère et matériaux nobles
            </p>
          </div>

          <div style={styles.artisansGrid}>
            <div style={styles.artisanCard}>
              <div style={styles.artisanAvatar}>VH</div>
              <div style={styles.artisanContent}>
                <div style={styles.artisanName}>Vincent H.</div>
                <div style={styles.artisanCompany}>Fontaine Bain Prestige</div>
                <div style={styles.artisanRating}>
                  <span style={styles.stars}>★★★★★</span>
                  <span style={{ fontSize: 14, color: "#64748b" }}>5.0/5 · 176 chantiers</span>
                </div>
                <div style={styles.artisanMeta}>📍 Fontaine · Ahuy · Daix · Plombières</div>
                <div style={styles.artisanSpecialty}>
                  Spécialité : Pierre naturelle, baignoire îlot, maisons de caractère. 
                  18 ans d&apos;expérience, expert pierre de Bourgogne.
                </div>
              </div>
            </div>

            <div style={styles.artisanCard}>
              <div style={styles.artisanAvatar}>CG</div>
              <div style={styles.artisanContent}>
                <div style={styles.artisanName}>Claire G.</div>
                <div style={styles.artisanCompany}>Atelier SDB Fontaine</div>
                <div style={styles.artisanRating}>
                  <span style={styles.stars}>★★★★★</span>
                  <span style={{ fontSize: 14, color: "#64748b" }}>4.9/5 · 128 chantiers</span>
                </div>
                <div style={styles.artisanMeta}>📍 Fontaine · Talant · Dijon Nord</div>
                <div style={styles.artisanSpecialty}>
                  Designer-artisan, matières nobles, suites parentales, projets sur mesure. 
                  12 ans d&apos;expérience.
                </div>
              </div>
            </div>

            <div style={styles.artisanCard}>
              <div style={styles.artisanAvatar}>TP</div>
              <div style={styles.artisanContent}>
                <div style={styles.artisanName}>Thomas P.</div>
                <div style={styles.artisanCompany}>Réno Caractère 21</div>
                <div style={styles.artisanRating}>
                  <span style={styles.stars}>★★★★★</span>
                  <span style={{ fontSize: 14, color: "#64748b" }}>4.8/5 · 94 chantiers</span>
                </div>
                <div style={styles.artisanMeta}>📍 Fontaine · Marsannay · Gevrey</div>
                <div style={styles.artisanSpecialty}>
                  Rénovation complète, PMR, budget maîtrisé, bâti ancien, 
                  dossiers MaPrimeAdapt&apos;.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AVIS CLIENTS */}
        <section style={styles.section}>
          <h2 style={styles.h2}>Témoignages de propriétaires à Fontaine</h2>
          
          <div style={styles.testimonialsGrid}>
            <div style={styles.testimonialCard}>
              <div style={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
              <p style={styles.testimonialText}>
                &quot;Vincent a posé de la pierre de Bourgogne dans toute la salle de bain. 
                Il a traité lui-même les dalles avec l&apos;hydrofuge adapté. Deux ans après, 
                la pierre a pris une patine magnifique. Ma femme dit que c&apos;est la 
                plus belle pièce de la maison.&quot;
              </p>
              <div style={styles.testimonialAuthor}>Bernard F.</div>
              <div style={styles.testimonialDetails}>Fontaine · Maison 1972 · SDB 9m² complète</div>
            </div>

            <div style={styles.testimonialCard}>
              <div style={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
              <p style={styles.testimonialText}>
                &quot;Claire a conçu et réalisé notre suite parentale de 11m². Baignoire 
                îlot Kaldewei au centre, douche à l&apos;italienne en travertin, double 
                vasque en marbre. 22 000€ de travaux. Quand des agents immobiliers 
                visitent pour estimation, ils citent toujours la salle de bain.&quot;
              </p>
              <div style={styles.testimonialAuthor}>Sophie C.</div>
              <div style={styles.testimonialDetails}>Fontaine · Villa · Suite parentale baignoire îlot</div>
            </div>

            <div style={styles.testimonialCard}>
              <div style={styles.testimonialStars}>⭐⭐⭐⭐⭐</div>
              <p style={styles.testimonialText}>
                &quot;Thomas a su adapter la salle de bain de mes parents (78 et 81 ans) 
                sans trahir le caractère de leur maison. Douche PMR avec carrelage 
                travertin, barres d&apos;appui en inox brossé assortis aux robinets. 
                Le dossier MaPrimeAdapt&apos; : 7 200€ accordés sur 10 400€.&quot;
              </p>
              <div style={styles.testimonialAuthor}>Jean-Marc R.</div>
              <div style={styles.testimonialDetails}>Fontaine · Maison · SDB PMR parents</div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Questions fréquentes</h2>
          </div>

          <div style={styles.faqContainer}>
            {[
              {
                q: "Pourquoi les salles de bain à Fontaine coûtent-elles plus cher ?",
                a: "Les maisons de Fontaine sont plus grandes (7-10m² vs 4-5m² standard) et utilisent des matériaux nobles comme la pierre de Bourgogne (85-140€/m²) et le travertin. Le budget moyen est de 10 200€ contre 6 500-8 000€ dans les communes voisines. C'est un investissement qui se rentabilise sur la valeur immobilière."
              },
              {
                q: "Quel délai pour rénover une salle de bain à Fontaine ?",
                a: "Un projet standard prend 2 à 3 semaines. Les projets avec pierre naturelle nécessitent 3 à 4 semaines (séchage des enduits, traitement hydrofuge, pose minutieuse). Les délais devis sont de 4-7h sur PremiumArtisan."
              },
              {
                q: "La pierre naturelle est-elle difficile d'entretien ?",
                a: "Non, avec le bon traitement initial. Un hydrofuge professionnel est appliqué après la pose, puis un entretien simple avec produits neutres suffit. Un ré-hydrofuge tous les 2-3 ans protège la pierre. Contrairement aux idées reçues, elle vieillit magnifiquement."
              },
              {
                q: "Puis-je installer une baignoire îlot dans ma SDB Fontaine ?",
                a: "Avec les surfaces généreuses des maisons fontainoises (7-10m²), c'est souvent possible. Il faut cependant vérifier la capacité de la structure porteuse (une baignoire pleine pèse 300-500kg) et repositionner les alimentations. Budget : 4 000€ à 12 000€."
              },
              {
                q: "Quelles aides pour une rénovation SDB à Fontaine ?",
                a: "MaPrimeRénov' pour les travaux énergétiques, MaPrimeAdapt' pour l'accessibilité PMR (jusqu'à 7 200€), éco-PTZ, et TVA réduite à 5.5%. Nos artisans vous accompagnent dans les démarches."
              },
              {
                q: "Comment choisir entre pierre et carrelage standard ?",
                a: "Choisissez la pierre si : vous restez longtemps (>10 ans), vous visez une valeur de revente premium, vous aimez l'authenticité. Choisissez le carrelage standard si : budget serré, location, ou rénovation rapide avant vente."
              }
            ].map((faq, index) => (
              <div key={index} style={styles.faqItem}>
                <div 
                  style={styles.faqQuestion}
                  onClick={() => toggleFaq(index)}
                >
                  {faq.q}
                  <span style={{ 
                    transform: openFaq === index ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.3s",
                    fontSize: 20 
                  }}>
                    ▼
                  </span>
                </div>
                {openFaq === index && (
                  <div style={styles.faqAnswer}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* COMMUNES VOISINES */}
        <section style={styles.section}>
          <h2 style={styles.h2}>Rénovation SDB aux alentours de Fontaine</h2>
          
          <p style={styles.paragraph}>
            Nos artisans couvrent tout le secteur nord de Dijon et la côte de Nuits :
          </p>

          <div style={styles.neighborhoods}>
            <Link href="/devis-salle-de-bain-dijon" style={styles.neighborhood}>
              Dijon Centre
            </Link>
            <Link href="/devis-salle-de-bain-ahuy" style={styles.neighborhood}>
              Ahuy
            </Link>
            <Link href="/devis-salle-de-bain-daix" style={styles.neighborhood}>
              Daix
            </Link>
            <Link href="/devis-salle-de-bain-talant" style={styles.neighborhood}>
              Talant
            </Link>
            <Link href="/devis-salle-de-bain-plombieres-les-dijon" style={styles.neighborhood}>
              Plombières-lès-Dijon
            </Link>
            <Link href="/devis-salle-de-bain-marsannay-la-cote" style={styles.neighborhood}>
              Marsannay-la-Côte
            </Link>
            <Link href="/devis-salle-de-bain-gevrey-chambertin" style={styles.neighborhood}>
              Gevrey-Chambertin
            </Link>
          </div>
        </section>

      </main>

      {/* CTA FINAL */}
      <section style={styles.finalCta}>
        <div style={styles.finalCtaContainer}>
          <h2 style={styles.finalCtaH2}>
            Votre salle de bain Fontaine
            <br />
            mérite l&apos;excellence
          </h2>
          
          <p style={styles.finalCtaText}>
            Rejoignez les 28 propriétaires qui ont fait confiance à nos artisans 
            spécialisés. Devis gratuits, pierre naturelle, baignoire îlot, 
            expertise maisons de caractère.
          </p>

          <Link href="/publier-projet/form" style={styles.finalCtaButton}>
            Obtenir mes devis maintenant
            <span style={{ fontSize: 24 }}>→</span>
          </Link>

          <div style={styles.trustIndicators}>
            <div style={styles.trustItem}>
              <span>✓</span>
              <span>6 artisans spécialisés</span>
            </div>
            <div style={styles.trustItem}>
              <span>✓</span>
              <span>Pierre naturelle & travertin</span>
            </div>
            <div style={styles.trustItem}>
              <span>✓</span>
              <span>Réponse 4-7h</span>
            </div>
            <div style={styles.trustItem}>
              <span>✓</span>
              <span>28 projets documentés</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}