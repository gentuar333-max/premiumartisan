// app/devis-renovation-quetigny/DevisRenovationQuetigny.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

// Stilet CSS-in-JS
const styles: Record<string, React.CSSProperties> = {
  hero: {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    color: "#fff",
    padding: "80px 24px",
    position: "relative",
    overflow: "hidden",
  },
  heroContainer: {
    maxWidth: 900,
    margin: "0 auto",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },
  badge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.1)",
    color: "#38bdf8",
    fontSize: 12,
    fontWeight: 600,
    padding: "8px 16px",
    borderRadius: 50,
    marginBottom: 20,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    border: "1px solid rgba(56,189,248,0.3)",
  },
  h1: {
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 24,
    letterSpacing: "-0.02em",
  },
  heroSubtitle: {
    fontSize: 20,
    color: "rgba(255,255,255,0.75)",
    marginBottom: 40,
    maxWidth: 640,
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "18px 40px",
    borderRadius: 16,
    background: "#0ea5e9",
    color: "#fff",
    fontWeight: 700,
    fontSize: 17,
    textDecoration: "none",
    boxShadow: "0 20px 40px rgba(14,165,233,0.3)",
    transition: "all 0.2s ease",
  },
  ctaButtonHover: {
    background: "#0284c7",
    transform: "translateY(-2px)",
    boxShadow: "0 25px 50px rgba(14,165,233,0.4)",
  },
  trustBadges: {
    display: "flex",
    justifyContent: "center",
    gap: 32,
    marginTop: 40,
    flexWrap: "wrap",
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
  },
  trustIcon: {
    width: 20,
    height: 20,
    color: "#38bdf8",
  },
  breadcrumb: {
    background: "#f8fafc",
    padding: "16px 24px",
    borderBottom: "1px solid #e2e8f0",
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
  breadcrumbCurrent: {
    color: "#334155",
    fontWeight: 600,
  },
  content: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "64px 24px",
  },
  section: {
    marginBottom: 48,
  },
  h2: {
    fontSize: 32,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 20,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1e293b",
    marginTop: 32,
    marginBottom: 16,
    lineHeight: 1.3,
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
    fontWeight: 600,
    color: "#0c4a6e",
  },
  tableContainer: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
    overflow: "hidden",
    margin: "32px 0",
    border: "1px solid #e2e8f0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    background: "#f1f5f9",
    padding: "16px 20px",
    textAlign: "left",
    fontWeight: 600,
    fontSize: 14,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "2px solid #e2e8f0",
  },
  td: {
    padding: "16px 20px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: 15,
    color: "#334155",
  },
  trHover: {
    background: "#f8fafc",
  },
  price: {
    fontWeight: 700,
    color: "#059669",
  },
  ctaBox: {
    background: "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)",
    border: "2px solid #0ea5e9",
    borderRadius: 20,
    padding: "40px 32px",
    margin: "48px 0",
    textAlign: "center",
  },
  ctaBoxTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 12,
  },
  ctaBoxText: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 24,
    lineHeight: 1.6,
  },
  ctaBoxButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "16px 36px",
    borderRadius: 14,
    background: "#0ea5e9",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    textDecoration: "none",
    boxShadow: "0 10px 30px rgba(14,165,233,0.3)",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
    margin: "40px 0",
  },
  featureCard: {
    background: "#fff",
    borderRadius: 16,
    padding: 28,
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  featureIcon: {
    width: 48,
    height: 48,
    background: "#eff6ff",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 1.6,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: "20px 0",
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "12px 0",
    fontSize: 16,
    color: "#475569",
    borderBottom: "1px solid #f1f5f9",
  },
  checkIcon: {
    width: 24,
    height: 24,
    background: "#dcfce7",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#16a34a",
    fontSize: 14,
    flexShrink: 0,
  },
  link: {
    color: "#0ea5e9",
    fontWeight: 600,
    textDecoration: "none",
    borderBottom: "2px solid #bae6fd",
    transition: "all 0.2s",
  },
  finalCta: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    padding: "80px 24px",
    textAlign: "center",
  },
  finalCtaContainer: {
    maxWidth: 700,
    margin: "0 auto",
  },
  finalCtaH2: {
    fontSize: 36,
    fontWeight: 800,
    color: "#fff",
    marginBottom: 20,
  },
  finalCtaText: {
    fontSize: 18,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 32,
    lineHeight: 1.6,
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: 48,
    marginBottom: 40,
    flexWrap: "wrap",
  },
  stat: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: 40,
    fontWeight: 800,
    color: "#38bdf8",
  },
  statLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
  },
  faq: {
    marginTop: 48,
  },
  faqItem: {
    borderBottom: "1px solid #e2e8f0",
    padding: "24px 0",
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 12,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqAnswer: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 1.7,
    paddingTop: 8,
  },
  neighborhoods: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 20,
  },
  neighborhood: {
    background: "#f1f5f9",
    padding: "8px 16px",
    borderRadius: 50,
    fontSize: 14,
    color: "#475569",
    fontWeight: 500,
  },
};

// Komponenti kryesor
export default function DevisRenovationQuetigny() {
  const [hovered, setHovered] = useState(false);

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
            <Link href="/devis-renovation" style={styles.breadcrumbLink}>
              Rénovation
            </Link>
          </li>
          <li>›</li>
          <li style={styles.breadcrumbCurrent}>Quetigny</li>
        </ol>
      </nav>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <span style={styles.badge}>Côte-d&apos;Or • Bourgogne-Franche-Comté</span>
          
          <h1 style={styles.h1}>
            Entreprise de Rénovation à Quetigny
          </h1>
          
          <p style={styles.heroSubtitle}>
            Trouvez une entreprise de rénovation vérifiée à Quetigny. 
            Comparez jusqu&apos;à 4 devis gratuits en 48 heures. 
            Tous corps de métier : peinture, plomberie, électricité, menuiserie.
          </p>

          <Link
            href="/publier-projet/form"
            style={{
              ...styles.ctaButton,
              ...(hovered ? styles.ctaButtonHover : {}),
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Obtenir mes devis gratuits
            <span>→</span>
          </Link>

          <div style={styles.trustBadges}>
            <div style={styles.trustItem}>
              <span>✓</span>
              <span>Artisans vérifiés</span>
            </div>
            <div style={styles.trustItem}>
              <span>✓</span>
              <span>Devis 100% gratuit</span>
            </div>
            <div style={styles.trustItem}>
              <span>✓</span>
              <span>Réponse sous 24h</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU SEO PRINCIPAL */}
      <main style={styles.content}>
        
        {/* INTRODUCTION */}
        <section style={styles.section}>
          <h2 style={styles.h2}>
            Prix d&apos;une rénovation à Quetigny en 2026
          </h2>
          
          <p style={styles.paragraph}>
            Vous envisagez de rénover votre logement à <strong>Quetigny</strong> ? 
            Cette commune dynamique de la métropole dijonnaise connaît un essor 
            important des projets de rénovation résidentielle. Située à seulement 
            10 minutes du centre de Dijon, Quetigny attire de plus en plus de 
            propriétaires souhaitant moderniser leur habitat tout en bénéficiant 
            d&apos;un cadre de vie agréable.
          </p>

          <p style={styles.paragraph}>
            Le coût d&apos;une rénovation à Quetigny varie considérablement selon 
            la nature des travaux, la surface à rénover et les finitions choisies. 
            Notre plateforme vous permet d&apos;obtenir des <span style={styles.highlight}>devis précis et personnalisés</span> 
            auprès d&apos;entreprises locales rigoureusement sélectionnées.
          </p>
        </section>

        {/* TABLEAU DES PRIX */}
        <section style={styles.section}>
          <h3 style={styles.h3}>
            Tarifs indicatifs par type de travaux
          </h3>
          
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Type de rénovation</th>
                  <th style={styles.th}>Prix au m²</th>
                  <th style={styles.th}>Budget total estimé</th>
                  <th style={styles.th}>Délai moyen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>Peinture intérieure (fournie)</td>
                  <td style={{...styles.td, ...styles.price}}>25€ – 45€</td>
                  <td style={styles.td}>2 500€ – 4 500€ (100m²)</td>
                  <td style={styles.td}>3 à 5 jours</td>
                </tr>
                <tr style={styles.trHover}>
                  <td style={styles.td}>Rénovation de salle de bain complète</td>
                  <td style={{...styles.td, ...styles.price}}>Sur devis</td>
                  <td style={styles.td}>8 000€ – 18 000€</td>
                  <td style={styles.td}>2 à 3 semaines</td>
                </tr>
                <tr>
                  <td style={styles.td}>Rénovation de cuisine (hors électroménager)</td>
                  <td style={{...styles.td, ...styles.price}}>Sur devis</td>
                  <td style={styles.td}>12 000€ – 30 000€</td>
                  <td style={styles.td}>3 à 5 semaines</td>
                </tr>
                <tr style={styles.trHover}>
                  <td style={styles.td}>Rénovation complète appartement T3</td>
                  <td style={{...styles.td, ...styles.price}}>800€ – 1 500€/m²</td>
                  <td style={styles.td}>40 000€ – 90 000€</td>
                  <td style={styles.td}>2 à 4 mois</td>
                </tr>
                <tr>
                  <td style={styles.td}>Isolation thermique (ITE)</td>
                  <td style={{...styles.td, ...styles.price}}>120€ – 200€/m²</td>
                  <td style={styles.td}>15 000€ – 40 000€</td>
                  <td style={styles.td}>1 à 3 semaines</td>
                </tr>
                <tr style={styles.trHover}>
                  <td style={styles.td}>Remplacement menuiseries PVC</td>
                  <td style={{...styles.td, ...styles.price}}>600€ – 1 200€/ouvrant</td>
                  <td style={styles.td}>6 000€ – 15 000€</td>
                  <td style={styles.td}>2 à 5 jours</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={styles.paragraph}>
            <em>
              Ces tarifs sont fournis à titre indicatif. Pour un budget précis adapté 
              à votre projet, demandez vos devis personnalisés via notre formulaire.
            </em>
          </p>
        </section>

        {/* CTA INTERMÉDIAIRE */}
        <div style={styles.ctaBox}>
          <h3 style={styles.ctaBoxTitle}>
            Besoin d&apos;un devis précis pour votre projet ?
          </h3>
          <p style={styles.ctaBoxText}>
            Décrivez votre projet en 2 minutes. Recevez jusqu&apos;à 4 devis détaillés 
            d&apos;entreprises de rénovation vérifiées à Quetigny. Service gratuit et sans engagement.
          </p>
          <Link href="/publier-projet/form" style={styles.ctaBoxButton}>
            Publier mon projet de rénovation →
          </Link>
        </div>

        {/* POURQUOI CHOISIR PREMIUMARTISAN */}
        <section style={styles.section}>
          <h2 style={styles.h2}>
            Pourquoi faire appel à un professionnel à Quetigny ?
          </h2>

          <div style={styles.features}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🏠</div>
              <h4 style={styles.featureTitle}>Connaissance locale</h4>
              <p style={styles.featureText}>
                Nos artisans connaissent parfaitement les spécificités des logements 
                de Quetigny : constructions des années 70-80, normes thermiques locales, 
                et contraintes urbanistiques de la métropole dijonnaise.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>⚡</div>
              <h4 style={styles.featureTitle}>Intervention rapide</h4>
              <p style={styles.featureText}>
                Proximité géographique = délais d&apos;intervention réduits. 
                Visite de chantier possible sous 48h pour l&apos;établissement 
                de votre devis détaillé.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>💰</div>
              <h4 style={styles.featureTitle}>Aides financières</h4>
              <p style={styles.featureText}>
                Bénéficiez de MaPrimeRénov&apos;, éco-PTZ, TVA réduite à 5,5% et aides 
                de Dijon Métropole. Nos artisans RGE vous accompagnent dans vos démarches.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🛡️</div>
              <h4 style={styles.featureTitle}>Garanties décennales</h4>
              <p style={styles.featureText}>
                Toutes nos entreprises partenaires sont assurées et vous offrent 
                la garantie décennale obligatoire pour tous les travaux structurels.
              </p>
            </div>
          </div>
        </section>

        {/* TYPES DE RÉNOVATION */}
        <section style={styles.section}>
          <h2 style={styles.h2}>
            Quels travaux de rénovation réaliser à Quetigny ?
          </h2>

          <h3 style={styles.h3}>Rénovation énergétique et isolation</h3>
          <p style={styles.paragraph}>
            Avec les objectifs de réduction des émissions de CO₂, la rénovation 
            énergétique est devenue prioritaire. À Quetigny, de nombreux logements 
            des années 70 nécessitent une <strong>isolation thermique par l&apos;extérieur (ITE)</strong> 
            ou par l&apos;intérieur (ITI). Ces travaux permettent de réduire jusqu&apos;à 
            30% votre facture énergétique tout en améliorant votre confort thermique.
          </p>

          <h3 style={styles.h3}>Rénovation de salles de bain et cuisines</h3>
          <p style={styles.paragraph}>
            Les pièces d&apos;eau sont souvent les premières à être rénovées. 
            Moderniser une salle de bain à Quetigny représente un investissement 
            moyen de 10 000€ à 15 000€ pour une refonte complète incluant 
            la plomberie, l&apos;électricité, le carrelage et le mobilier. Pour les cuisines, 
            budget entre 15 000€ et 25 000€ selon l&apos;équipement choisi.
          </p>

          <h3 style={styles.h3}>Aménagement des combles et extensions</h3>
          <p style={styles.paragraph}>
            Quetigny compte de nombreux pavillons avec potentiel d&apos;aménagement 
            des combles. Créer une chambre ou un bureau sous les toits représente 
            un excellent rapport qualité-prix pour agrandir votre surface habitable 
            sans déménager. Comptez 1 200€ à 2 000€/m² aménagé.
          </p>
        </section>

        {/* AIDES FINANCIÈRES */}
        <section style={styles.section}>
          <h2 style={styles.h2}>
            Aides et financements disponibles à Quetigny
          </h2>

          <p style={styles.paragraph}>
            Rénover votre logement à Quetigny peut être largement subventionné. 
            Voici les principales aides auxquelles vous pouvez prétendre en 2026 :
          </p>

          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={styles.checkIcon}>✓</span>
              <div>
                <strong>MaPrimeRénov&apos;</strong> : Prime versée par l&apos;Anah, cumulable 
                avec d&apos;autres aides. Montant variable selon vos revenus et les travaux réalisés.
              </div>
            </li>
            <li style={styles.listItem}>
              <span style={styles.checkIcon}>✓</span>
              <div>
                <strong>Éco-PTZ</strong> : Prêt à taux zéro jusqu&apos;à 50 000€ pour les 
                travaux d&apos;isolation, de chauffage ou d&apos;installation de panneaux solaires.
              </div>
            </li>
            <li style={styles.listItem}>
              <span style={styles.checkIcon}>✓</span>
              <div>
                <strong>TVA réduite à 5,5%</strong> : Applicable sur les travaux d&apos;amélioration 
                énergétique dans les logements de plus de 2 ans.
              </div>
            </li>
            <li style={styles.listItem}>
              <span style={styles.checkIcon}>✓</span>
              <div>
                <strong>Aides locales Dijon Métropole</strong> : Complément possible 
                pour certains projets éligibles sur le territoire métropolitain.
              </div>
            </li>
          </ul>

          <p style={styles.paragraph}>
            <Link href="/aides-renovation" style={styles.link}>
              En savoir plus sur les aides à la rénovation →
            </Link>
          </p>
        </section>

        {/* FAQ */}
        <section style={styles.section}>
          <h2 style={styles.h2}>
            Questions fréquentes sur la rénovation à Quetigny
          </h2>

          <div style={styles.faq}>
            <div style={styles.faqItem}>
              <h4 style={styles.faqQuestion}>
                Quel est le délai moyen pour obtenir un devis de rénovation à Quetigny ?
              </h4>
              <p style={styles.faqAnswer}>
                Sur PremiumArtisan, vous recevez vos premiers devis sous 24 à 48 heures 
                après publication de votre projet. Les entreprises locales de Quetigny 
                et alentours peuvent généralement visiter le chantier dans la semaine 
                pour affiner leur proposition.
              </p>
            </div>

            <div style={styles.faqItem}>
              <h4 style={styles.faqQuestion}>
                Faut-il des autorisations pour rénover à Quetigny ?
              </h4>
              <p style={styles.faqAnswer}>
                Pour les travaux intérieurs sans modification de structure, aucune 
                autorisation n&apos;est requise. Pour les travaux d&apos;extension, 
                modification de façade ou changement de destination, un 
                <strong> permis de construire ou une déclaration préalable</strong> 
                peut être nécessaire auprès de la mairie de Quetigny. Nos artisans 
                peuvent vous guider dans ces démarches administratives.
              </p>
            </div>

            <div style={styles.faqItem}>
              <h4 style={styles.faqQuestion}>
                Comment choisir le bon artisan pour ma rénovation ?
              </h4>
              <p style={styles.faqAnswer}>
                Comparez toujours au minimum 3 devis détaillés. Vérifiez les assurances 
                (décennale et responsabilité civile), les avis clients, et les certifications 
                (Qualibat, RGE pour les aides). Notre plateforme sélectionne pour vous 
                des professionnels répondant à tous ces critères de qualité.
              </p>
            </div>

            <div style={styles.faqItem}>
              <h4 style={styles.faqQuestion}>
                Quels quartiers de Quetigny sont les plus demandés pour la rénovation ?
              </h4>
              <div style={styles.faqAnswer}>
                <p>
                  Les demandes de rénovation concernent principalement :
                </p>
                <div style={styles.neighborhoods}>
                  <span style={styles.neighborhood}>Centre-ville</span>
                  <span style={styles.neighborhood}>Le Parc</span>
                  <span style={styles.neighborhood}>Les Brielles</span>
                  <span style={styles.neighborhood}>La Bussière</span>
                  <span style={styles.neighborhood}>Les Grésilles</span>
                </div>
                <p style={{ marginTop: 12 }}>
                  Nous couvrons l&apos;ensemble de la commune et les secteurs 
                  limitrophes de Dijon Métropole.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ZONES VOISINES */}
        <section style={styles.section}>
          <h2 style={styles.h2}>
            Entreprises de rénovation aux alentours de Quetigny
          </h2>
          
          <p style={styles.paragraph}>
            Nos artisans interviennent également dans les communes voisines :
          </p>

          <p style={styles.paragraph}>
            <Link href="/devis-renovation-chenove" style={styles.link}>Chenôve</Link> • 
            <Link href="/devis-renovation-saint-apollinaire" style={styles.link}> Saint-Apollinaire</Link> • 
            <Link href="/devis-renovation-dijon" style={styles.link}> Dijon</Link> • 
            <Link href="/devis-renovation-velars-sur-ouche" style={styles.link}> Velars-sur-Ouche</Link> • 
            <Link href="/devis-renovation-fontaine-ouche" style={styles.link}> Fontaine-d&apos;Ouche</Link> • 
            <Link href="/devis-renovation-sennecey-les-dijon" style={styles.link}> Sennecey-lès-Dijon</Link> • 
            <Link href="/devis-renovation-chevigny" style={styles.link}> Chevigny-Saint-Sauveur</Link>
          </p>
        </section>

      </main>

      {/* CTA FINAL */}
      <section style={styles.finalCta}>
        <div style={styles.finalCtaContainer}>
          <h2 style={styles.finalCtaH2}>
            Lancez votre projet de rénovation à Quetigny
          </h2>
          
          <div style={styles.stats}>
            <div style={styles.stat}>
              <div style={styles.statNumber}>4.9/5</div>
              <div style={styles.statLabel}>Note moyenne artisans</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>48h</div>
              <div style={styles.statLabel}>Délai moyen devis</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>100%</div>
              <div style={styles.statLabel}>Gratuit & sans engagement</div>
            </div>
          </div>

          <p style={styles.finalCtaText}>
            Rejoignez les 1 200+ propriétaires de Quetigny et environs qui ont 
            trouvé leur artisan via PremiumArtisan. Devis détaillés, artisans vérifiés, 
            accompagnement personnalisé.
          </p>

          <Link href="/publier-projet/form" style={styles.ctaButton}>
            Obtenir mes devis maintenant →
          </Link>
        </div>
      </section>
    </div>
  );
}