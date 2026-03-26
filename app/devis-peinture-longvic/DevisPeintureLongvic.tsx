// app/devis-peinture-longvic/DevisPeintureLongvic.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

const styles: Record<string, React.CSSProperties> = {
  // HERO ME GRADIENT TË RI
  hero: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    opacity: 0.4,
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
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    padding: "10px 20px",
    borderRadius: 50,
    marginBottom: 24,
    border: "1px solid rgba(255,255,255,0.2)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
  h1: {
    fontSize: "clamp(36px, 6vw, 64px)",
    fontWeight: 900,
    lineHeight: 1.05,
    marginBottom: 24,
    letterSpacing: "-0.03em",
    textShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
  heroSubtitle: {
    fontSize: 21,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 40,
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
    fontWeight: 400,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "20px 48px",
    borderRadius: 16,
    background: "#fff",
    color: "#667eea",
    fontWeight: 800,
    fontSize: 18,
    textDecoration: "none",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
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
    fontSize: 36,
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginTop: 6,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  
  // BREADCRUMBS
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
    color: "#667eea",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.2s",
  },
  
  // CONTENT
  content: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "80px 24px",
  },
  section: {
    marginBottom: 64,
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: 48,
  },
  h2: {
    fontSize: 40,
    fontWeight: 900,
    color: "#0f172a",
    marginBottom: 16,
    lineHeight: 1.2,
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
    fontSize: 26,
    fontWeight: 800,
    color: "#1e293b",
    marginTop: 40,
    marginBottom: 20,
    lineHeight: 1.3,
  },
  paragraph: {
    fontSize: 17,
    color: "#475569",
    lineHeight: 1.8,
    marginBottom: 20,
  },
  highlight: {
    background: "linear-gradient(120deg, #c7d2fe 0%, #c7d2fe 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 40%",
    backgroundPosition: "0 88%",
    padding: "0 4px",
    fontWeight: 700,
    color: "#3730a3",
  },
  
  // CARDS GRID
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
    position: "relative",
    overflow: "hidden",
  },
  cardFeatured: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
  },
  cardIcon: {
    width: 56,
    height: 56,
    background: "#eef2ff",
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
  },
  cardTextFeatured: {
    color: "rgba(255,255,255,0.9)",
  },
  cardPrice: {
    fontSize: 32,
    fontWeight: 900,
    color: "#059669",
    marginTop: 16,
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
    background: "#f1f5f9",
    padding: "20px 24px",
    textAlign: "left",
    fontWeight: 700,
    fontSize: 13,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "2px solid #e2e8f0",
  },
  td: {
    padding: "20px 24px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: 15,
    color: "#334155",
  },
  priceCell: {
    fontWeight: 800,
    color: "#059669",
    fontSize: 16,
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#dcfce7",
    color: "#166534",
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 20,
  },
  
  // CTA BOX
  ctaBox: {
    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    border: "2px solid #f59e0b",
    borderRadius: 24,
    padding: "48px 40px",
    margin: "56px 0",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  ctaBoxIcon: {
    fontSize: 48,
    marginBottom: 16,
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
    transition: "all 0.2s",
  },
  
  // ARTISANS
  artisansGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
  },
  artisanAvatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 24,
    fontWeight: 800,
    flexShrink: 0,
  },
  artisanContent: {
    flex: 1,
  },
  artisanName: {
    fontSize: 18,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 4,
  },
  artisanRating: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  stars: {
    color: "#fbbf24",
    fontSize: 14,
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
    background: "#fafafa",
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
    background: "#eef2ff",
    padding: "10px 20px",
    borderRadius: 50,
    fontSize: 14,
    color: "#4338ca",
    fontWeight: 600,
    border: "1px solid #c7d2fe",
    transition: "all 0.2s",
  },
  
  // FINAL CTA
  finalCta: {
    background: "#0f172a",
    padding: "100px 24px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  finalCtaPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%234338ca' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    fontWeight: 800,
    fontSize: 19,
    textDecoration: "none",
    boxShadow: "0 20px 50px rgba(102,126,234,0.4)",
  },
  trustIndicators: {
    display: "flex",
    justifyContent: "center",
    gap: 40,
    marginTop: 48,
    flexWrap: "wrap",
  },
  trustItemFinal: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
};

export default function DevisPeintureLongvic() {
  const [hovered, setHovered] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div>
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
            <Link href="/devis-peinture" style={styles.breadcrumbLink}>
              Peinture
            </Link>
          </li>
          <li>›</li>
          <li style={{ color: "#334155", fontWeight: 600 }}>Longvic</li>
        </ol>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroPattern} />
        <div style={styles.heroContainer}>
          <div style={styles.locationBadge}>
            <span>📍</span>
            <span>Longvic 21600 • Côte-d&apos;Or</span>
          </div>
          
          <h1 style={styles.h1}>
            Peintre à Longvic
            <br />
            <span style={{ fontSize: "0.6em", opacity: 0.9 }}>
              Devis Gratuit sous 4h
            </span>
          </h1>
          
          <p style={styles.heroSubtitle}>
            Trouvez un peintre professionnel à Longvic. Prix constatés : <strong>27–41€/m²</strong>. 
            108 projets réalisés. Artisans vérifiés, devis détaillés, 
            sans engagement.
          </p>

          <Link
            href="/publier-projet/form"
            style={{
              ...styles.ctaButton,
              transform: hovered ? "translateY(-4px)" : "translateY(0)",
              boxShadow: hovered 
                ? "0 30px 60px rgba(0,0,0,0.4)" 
                : "0 20px 50px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Obtenir mes devis gratuits
            <span style={{ fontSize: 20 }}>→</span>
          </Link>

          <div style={styles.statsBar}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>27–41€</div>
              <div style={styles.statLabel}>Prix/m² constaté</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>4–6h</div>
              <div style={styles.statLabel}>Délai devis</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>108</div>
              <div style={styles.statLabel}>Projets 2025–2026</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>4.8/5</div>
              <div style={styles.statLabel}>Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main style={styles.content}>
        
        {/* PRIX */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Tarifs peinture Longvic 2026</h2>
            <p style={styles.sectionSubtitle}>
              Données réelles issues de 108 projets de peinture réalisés 
              à Longvic entre janvier 2025 et mars 2026
            </p>
          </div>

          <div style={styles.cardsGrid}>
            <div style={styles.card}>
              <div style={styles.cardIcon}>🎨</div>
              <h4 style={styles.cardTitle}>Peinture murale</h4>
              <p style={styles.cardText}>
                Application peinture sur murs préparés. Fourniture peinture 
                standard incluse. Garantie 2 ans.
              </p>
              <div style={styles.cardPrice}>
                27–38€
                <span style={styles.cardPriceUnit}> /m²</span>
              </div>
            </div>

            <div style={{...styles.card, ...styles.cardFeatured}}>
              <div style={{...styles.cardIcon, ...styles.cardIconFeatured}}>⭐</div>
              <h4 style={{...styles.cardTitle, ...styles.cardTitleFeatured}}>
                Peinture plafond
              </h4>
              <p style={{...styles.cardText, ...styles.cardTextFeatured}}>
                Plafonds avec préparation complète. Peinture anti-éclaboussures. 
                Finition mate ou satinée.
              </p>
              <div style={{...styles.cardPrice, ...styles.cardPriceFeatured}}>
                29–46€
                <span style={{...styles.cardPriceUnit, color: "rgba(255,255,255,0.7)"}}> /m²</span>
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardIcon}>🏠</div>
              <h4 style={styles.cardTitle}>Rénovation complète</h4>
              <p style={styles.cardText}>
                Murs + plafonds + boiseries. Traitement anti-humidité. 
                Protection mobilier incluse.
              </p>
              <div style={styles.cardPrice}>
                33–53€
                <span style={styles.cardPriceUnit}> /m²</span>
              </div>
            </div>
          </div>

          <h3 style={styles.h3}>Budget total selon surface</h3>
          
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Type de logement</th>
                  <th style={styles.th}>Peinture simple</th>
                  <th style={styles.th}>Rénovation complète</th>
                  <th style={styles.th}>Délai chantier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>
                    <strong>Studio 25m²</strong>
                    <br />
                    <span style={{ fontSize: 13, color: "#64748b" }}>Étudiants, investisseurs</span>
                  </td>
                  <td style={{...styles.td, ...styles.priceCell}}>750€ – 1 020€</td>
                  <td style={{...styles.td, ...styles.priceCell}}>1 050€ – 1 620€</td>
                  <td style={styles.td}><span style={styles.badge}>2–3 jours</span></td>
                </tr>
                <tr style={{ background: "#fafafa" }}>
                  <td style={styles.td}>
                    <strong>Appartement 60m²</strong>
                    <br />
                    <span style={{ fontSize: 13, color: "#64748b" }}>T3 standard Longvic</span>
                  </td>
                  <td style={{...styles.td, ...styles.priceCell}}>1 350€ – 2 150€</td>
                  <td style={{...styles.td, ...styles.priceCell}}>2 150€ – 3 500€</td>
                  <td style={styles.td}><span style={styles.badge}>3–5 jours</span></td>
                </tr>
                <tr>
                  <td style={styles.td}>
                    <strong>Appartement 90m²</strong>
                    <br />
                    <span style={{ fontSize: 13, color: "#64748b" }}>Familles, T4</span>
                  </td>
                  <td style={{...styles.td, ...styles.priceCell}}>2 150€ – 3 500€</td>
                  <td style={{...styles.td, ...styles.priceCell}}>3 500€ – 5 600€</td>
                  <td style={styles.td}><span style={styles.badge}>5–8 jours</span></td>
                </tr>
                <tr style={{ background: "#fafafa" }}>
                  <td style={styles.td}>
                    <strong>Maison 120m²</strong>
                    <br />
                    <span style={{ fontSize: 13, color: "#64748b" }}>Pavillon Longvic</span>
                  </td>
                  <td style={{...styles.td, ...styles.priceCell}}>3 100€ – 4 900€</td>
                  <td style={{...styles.td, ...styles.priceCell}}>4 800€ – 7 600€</td>
                  <td style={styles.td}><span style={styles.badge}>7–10 jours</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={styles.paragraph}>
            <em>
              Ces tarifs incluent la main d&apos;œuvre, les fournitures (peinture standard), 
              la préparation des surfaces et la protection des biens. Pour les peintures 
              premium ou techniques (anti-humidité, etc.), surdemandez un devis personnalisé.
            </em>
          </p>
        </section>

        {/* CTA INTERMÉDIAIRE */}
        <div style={styles.ctaBox}>
          <div style={styles.ctaBoxIcon}>🚀</div>
          <h3 style={styles.ctaBoxTitle}>Besoin d&apos;un devis précis ?</h3>
          <p style={styles.ctaBoxText}>
            Décrivez votre projet en 2 minutes. Recevez jusqu&apos;à 4 devis détaillés 
            de peintres vérifiés à Longvic. Comparaison gratuite et sans engagement.
          </p>
          <Link href="/publier-projet/form" style={styles.ctaBoxButton}>
            Publier mon projet maintenant →
          </Link>
        </div>

        {/* SPÉCIFICITÉS LONGVIC */}
        <section style={styles.section}>
          <h2 style={styles.h2}>Pourquoi Longvic est spécifique ?</h2>
          
          <p style={styles.paragraph}>
            <strong>Longvic</strong> (21600) n&apos;est pas une commune comme les autres. 
            Située à la confluence de l&apos;Ouche et de la Saône, cette ville de 
            <span style={styles.highlight}> 8 000 habitants</span> présente des caractéristiques 
            uniques qui impactent directement les travaux de peinture.
          </p>

          <h3 style={styles.h3}>Le défi de l&apos;humidité</h3>
          
          <p style={styles.paragraph}>
            La position géographique de Longvic, en bordure de la plaine de Saône, 
            expose les logements à une <strong>humidité relative élevée</strong> (75-85% 
            en moyenne annuelle contre 65-70% sur les hauteurs de Dijon). Cette 
            particularité explique pourquoi <span style={styles.highlight}>34% des projets 
            de peinture à Longvic</span> nécessitent un traitement préalable contre 
            l&apos;humidité ou les remontées capillaires.
          </p>

          <p style={styles.paragraph}>
            Les symptômes les plus fréquents observés par nos artisans :
          </p>

          <ul style={{ ...styles.paragraph, paddingLeft: 24, listStyle: "none" }}>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "#ef4444" }}>⚠️</span>
              <strong>Salpêtre</strong> sur les murs de plain-pied (rez-de-chaussée)
            </li>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "#ef4444" }}>⚠️</span>
              <strong>Moisissures</strong> noires (aspergillus) dans les pièces peu aérées
            </li>
            <li style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "#ef4444" }}>⚠️</span>
              <strong>Décollement</strong> de la peinture existante dues aux remontées d&apos;eau
            </li>
          </ul>

          <p style={styles.paragraph}>
            <strong>Solution recommandée :</strong> Un diagnostic humidité systématique 
            avant tout chantier de peinture. Le traitement préventif (enduit assainissant 
            + peinture microporeuse) représente un surcoût de 15-25% mais évite de 
            refaire les travaux dans les 2 ans.
          </p>

          <h3 style={styles.h3}>Le parc immobilier longvicien</h3>
          
          <p style={styles.paragraph}>
            Longvic présente un profil résidentiel très particulier :
          </p>

          <div style={styles.cardsGrid}>
            <div style={styles.card}>
              <div style={styles.cardIcon}>🏢</div>
              <h4 style={styles.cardTitle}>Logements sociaux (60%)</h4>
              <p style={styles.cardText}>
                Constructions 1960-1985 gérées par Dijon Métropole Habitat. 
                Rénovations régulières lors des changements de locataires.
              </p>
            </div>

            <div style={styles.card}>
              <div style={styles.cardIcon}>🏠</div>
              <h4 style={styles.cardTitle}>Pavillons (25%)</h4>
              <p style={styles.cardText}>
                Zones pavillonnaires développées dans les années 70-90. 
                Projets de rénovation complète fréquents.
              </p>
            </div>

            <div style={styles.card}>
              <div style={styles.cardIcon}>✈️</div>
              <h4 style={styles.cardTitle}>Proche aéroport (15%)</h4>
              <p style={styles.cardText}>
                Personnel navigant et aéroportuaire. Logements rénovés 
                fréquemment pour location courte durée.
              </p>
            </div>
          </div>

          <h3 style={styles.h3}>Zones d&apos;activité économique</h3>
          
          <p style={styles.paragraph}>
            La présence de l&apos;<strong>aéroport Dijon-Bourgogne</strong>, de la 
            <strong> base aérienne 102</strong> et de la <strong>zone d&apos;activités 
            de Longvic</strong> génère une demande importante en peinture professionnelle :
            bureaux, locaux commerciaux, entrepôts. Nos artisans disposent des 
            certifications nécessaires pour les peintures techniques (anti-salissures, 
            ignifugation, etc.).
          </p>
        </section>

        {/* ARTISANS */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.h2}>Nos peintres à Longvic</h2>
            <p style={styles.sectionSubtitle}>
              Artisans sélectionnés, vérifiés et notés par nos clients
            </p>
          </div>

          <div style={styles.artisansGrid}>
            <div style={styles.artisanCard}>
              <div style={styles.artisanAvatar}>RC</div>
              <div style={styles.artisanContent}>
                <div style={styles.artisanName}>Romain C.</div>
                <div style={styles.artisanRating}>
                  <span style={styles.stars}>★★★★★</span>
                  <span style={{ fontSize: 14, color: "#64748b" }}>4.9/5 · 91 chantiers</span>
                </div>
                <div style={styles.artisanMeta}>📍 Longvic · Chenôve · Dijon Sud</div>
                <div style={styles.artisanSpecialty}>
                  Spécialité : Traitement humidité & rénovation lourde
                </div>
              </div>
            </div>

            <div style={styles.artisanCard}>
              <div style={styles.artisanAvatar}>NB</div>
              <div style={styles.artisanContent}>
                <div style={styles.artisanName}>Nicolas B.</div>
                <div style={styles.artisanRating}>
                  <span style={styles.stars}>★★★★★</span>
                  <span style={{ fontSize: 14, color: "#64748b" }}>4.8/5 · 67 chantiers</span>
                </div>
                <div style={styles.artisanMeta}>📍 Longvic · Sennecey · Perrigny</div>
                <div style={styles.artisanSpecialty}>
                  Spécialité : Peinture technique & enduits décoratifs
                </div>
              </div>
            </div>

            <div style={styles.artisanCard}>
              <div style={styles.artisanAvatar}>VL</div>
              <div style={styles.artisanContent}>
                <div style={styles.artisanName}>Vincent L.</div>
                <div style={styles.artisanRating}>
                  <span style={styles.stars}>★★★★★</span>
                  <span style={{ fontSize: 14, color: "#64748b" }}>4.7/5 · 38 chantiers</span>
                </div>
                <div style={styles.artisanMeta}>📍 Longvic · Dijon · Ouges</div>
                <div style={styles.artisanSpecialty}>
                  Spécialité : Pavillons & façades extérieures
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AVIS CLIENTS */}
        <section style={styles.section}>
          <h2 style={styles.h2}>Ce que disent nos clients à Longvic</h2>
          
          <div style={styles.cardsGrid}>
            <div style={styles.card}>
              <div style={{ fontSize: 24, marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
              <p style={{ ...styles.cardText, fontStyle: "italic", marginBottom: 20 }}>
                &quot;Problème d&apos;humidité chronique dans mon appartement. Romain a fait 
                un traitement complet avant de peindre. Résultat irréprochable, 
                plus aucune trace. Je recommande à 100%.&quot;
              </p>
              <div style={{ fontWeight: 700, color: "#0f172a" }}>Éric F.</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>Longvic · Appartement 58m²</div>
            </div>

            <div style={styles.card}>
              <div style={{ fontSize: 24, marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
              <p style={{ ...styles.cardText, fontStyle: "italic", marginBottom: 20 }}>
                &quot;3 devis comparés en une journée. J&apos;ai choisi le milieu de gamme, 
                très bien ! Maison entièrement repeinte en 7 jours. Artisan ponctuel, 
                propre et professionnel.&quot;
              </p>
              <div style={{ fontWeight: 700, color: "#0f172a" }}>Laure M.</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>Longvic · Pavillon 92m²</div>
            </div>

            <div style={styles.card}>
              <div style={{ fontSize: 24, marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
              <p style={{ ...styles.cardText, fontStyle: "italic", marginBottom: 20 }}>
                &quot;Rapide et efficace. Devis reçu en 2h, chantier 3 jours plus tard. 
                Prix honnête, travail soigné. Mon studio est méconnaissable.&quot;
              </p>
              <div style={{ fontWeight: 700, color: "#0f172a" }}>David K.</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>Longvic · Studio 32m²</div>
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
                q: "Quel est le prix moyen d'un peintre à Longvic en 2026 ?",
                a: "Les tarifs constatés à Longvic se situent entre 27€ et 41€/m² pour une peinture intérieure standard. Le prix varie selon la préparation nécessaire (humidité, état des murs) et la qualité des peintures choisies. Pour un studio de 25m², comptez 750€ à 1 020€ tout compris."
              },
              {
                q: "Pourquoi les prix sont-ils parfois plus élevés à Longvic qu'à Dijon ?",
                a: "La proximité avec la Saône expose Longvic à des problèmes d'humidité plus fréquents. 34% des chantiers nécessitent un traitement préalable (enduit assainissant, anti-salpêtre), ce qui augmente le coût de 15-25%. Cependant, ce surcoût évite de refaire les travaux 2 ans plus tard."
              },
              {
                q: "Quel délai pour obtenir un devis et démarrer les travaux ?",
                a: "Sur PremiumArtisan, vous recevez vos devis en moyenne en 4-6h. Le délai de démarrage des travaux varie de 1 à 2 semaines selon la saison et la disponibilité des artisans. En période estivale (juin-août), prévoyez 3-4 semaines d'attente."
              },
              {
                q: "Les artisans de Longvic interviennent-ils sur Dijon ?",
                a: "Oui, nos artisans couvrent tout le secteur sud et sud-est de Dijon : Chenôve, Sennecey-lès-Dijon, Perrigny-lès-Dijon, Ouges, et bien sûr Longvic. Ils connaissent parfaitement les spécificités de chaque quartier."
              },
              {
                q: "Comment éviter les problèmes d'humidité après la peinture ?",
                a: "Trois règles d'or : 1) Traiter la cause (drainage, ventilation) avant la peinture, 2) Utiliser des peintures microporeuses qui laissent respirer les murs, 3) Assurer une aération régulière du logement. Nos artisans réalisent un diagnostic gratuit de l'humidité avant chaque devis."
              },
              {
                q: "Y a-t-il des aides pour la rénovation à Longvic ?",
                a: "Oui, vous pouvez bénéficier de MaPrimeRénov', éco-PTZ, TVA réduite à 5,5% pour les travaux énergétiques, et aides de Dijon Métropole. Nos artisans RGE vous accompagnent dans les démarches administratives."
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
          <h2 style={styles.h2}>Peintres dans les communes voisines</h2>
          
          <p style={styles.paragraph}>
            Nos artisans couvrent tout le secteur sud de Dijon Métropole :
          </p>

          <div style={styles.neighborhoods}>
            <Link href="/devis-peinture-dijon" style={styles.neighborhood}>
              Dijon Centre
            </Link>
            <Link href="/devis-peinture-chenove" style={styles.neighborhood}>
              Chenôve
            </Link>
            <Link href="/devis-peinture-sennecey-les-dijon" style={styles.neighborhood}>
              Sennecey-lès-Dijon
            </Link>
            <Link href="/devis-peinture-perrigny-les-dijon" style={styles.neighborhood}>
              Perrigny-lès-Dijon
            </Link>
            <Link href="/devis-peinture-ouges" style={styles.neighborhood}>
              Ouges
            </Link>
            <Link href="/devis-peinture-quetigny" style={styles.neighborhood}>
              Quetigny
            </Link>
            <Link href="/devis-peinture-velars-sur-ouche" style={styles.neighborhood}>
              Velars-sur-Ouche
            </Link>
          </div>
        </section>

      </main>

      {/* CTA FINAL */}
      <section style={styles.finalCta}>
        <div style={styles.finalCtaPattern} />
        <div style={styles.finalCtaContainer}>
          <h2 style={styles.finalCtaH2}>
            Prêt à repeindre 
            <br />
            votre logement à Longvic ?
          </h2>
          
          <p style={styles.finalCtaText}>
            Rejoignez les 108 propriétaires qui ont fait confiance à nos artisans 
            en 2025-2026. Devis gratuits, artisans vérifiés, garantie satisfaction.
          </p>

          <Link href="/publier-projet/form" style={styles.finalCtaButton}>
            Obtenir mes devis maintenant
            <span style={{ fontSize: 24 }}>→</span>
          </Link>

          <div style={styles.trustIndicators}>
            <div style={styles.trustItemFinal}>
              <span>✓</span>
              <span>100% Gratuit</span>
            </div>
            <div style={styles.trustItemFinal}>
              <span>✓</span>
              <span>Sans engagement</span>
            </div>
            <div style={styles.trustItemFinal}>
              <span>✓</span>
              <span>Réponse en 4-6h</span>
            </div>
            <div style={styles.trustItemFinal}>
              <span>✓</span>
              <span>Max 4 artisans</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}