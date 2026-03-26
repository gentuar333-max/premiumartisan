 
// app/contact/ContactPage.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

// SCHEMA.ORG JSON-LD
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://premiumartisan.fr/contact#webpage",
      "url": "https://premiumartisan.fr/contact",
      "name": "Contact PremiumArtisan",
      "description": "Page de contact PremiumArtisan - Email, formulaire et informations de contact.",
      "isPartOf": {
        "@id": "https://premiumartisan.fr/#website"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://premiumartisan.fr/#organization",
      "name": "PremiumArtisan",
      "url": "https://premiumartisan.fr",
      "logo": "https://premiumartisan.fr/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+33-3-XX-XX-XX-XX",
        "contactType": "customer service",
        "availableLanguage": ["French"],
        "areaServed": "FR",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "21300 Chenôve",
        "addressLocality": "Chenôve",
        "addressRegion": "Bourgogne-Franche-Comté",
        "postalCode": "21300",
        "addressCountry": "FR"
      },
      "email": "contact@premiumartisan.fr",
      "sameAs": [
        "https://www.linkedin.com/company/premiumartisan",
        "https://www.facebook.com/premiumartisan"
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
          "name": "Contact",
          "item": "https://premiumartisan.fr/contact"
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
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    color: "#fff",
    padding: "80px 24px 60px",
    textAlign: "center",
  },
  h1: {
    fontSize: "clamp(36px, 5vw, 56px)",
    fontWeight: 900,
    marginBottom: 16,
    letterSpacing: "-0.02em",
  },
  heroSubtitle: {
    fontSize: 20,
    color: "rgba(255,255,255,0.8)",
    maxWidth: 600,
    margin: "0 auto",
    lineHeight: 1.6,
  },

  // CONTENT
  content: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "64px 24px",
  },

  // CONTACT GRID
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
    marginBottom: 64,
  },
  contactCard: {
    background: "#fff",
    borderRadius: 20,
    padding: 32,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  contactIcon: {
    width: 64,
    height: 64,
    background: "#f0f9ff",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
    margin: "0 auto 20px",
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 12,
  },
  contactText: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 1.6,
    marginBottom: 16,
  },
  contactLink: {
    color: "#0ea5e9",
    fontWeight: 700,
    textDecoration: "none",
    fontSize: 16,
  },

  // FORM SECTION
  formSection: {
    background: "#f8fafc",
    padding: "64px 24px",
    margin: "0 -24px 64px",
    borderTop: "1px solid #e2e8f0",
    borderBottom: "1px solid #e2e8f0",
  },
  formContainer: {
    maxWidth: 600,
    margin: "0 auto",
  },
  formTitle: {
    fontSize: 32,
    fontWeight: 900,
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 16,
  },
  formSubtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 32,
  },
  form: {
    background: "#fff",
    padding: 40,
    borderRadius: 20,
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 16,
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 16,
    fontFamily: "inherit",
    minHeight: 120,
    resize: "vertical" as const,
    boxSizing: "border-box" as const,
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 16,
    fontFamily: "inherit",
    background: "#fff",
    boxSizing: "border-box" as const,
  },
  submitButton: {
    width: "100%",
    padding: "16px 24px",
    borderRadius: 12,
    background: "#0ea5e9",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(14,165,233,0.3)",
  },

  // INFO SECTION
  infoSection: {
    marginBottom: 64,
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 40,
  },
  infoBlock: {},
  infoTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 1.8,
    marginBottom: 16,
  },
  hoursList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  hoursItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #e2e8f0",
    fontSize: 15,
  },
  hoursDay: {
    fontWeight: 600,
    color: "#374151",
  },
  hoursTime: {
    color: "#0ea5e9",
    fontWeight: 600,
  },

  // FAQ
  faqSection: {
    marginBottom: 64,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 900,
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 40,
  },
  faqGrid: {
    display: "grid",
    gap: 16,
  },
  faqItem: {
    background: "#fff",
    padding: 24,
    borderRadius: 16,
    border: "1px solid #e2e8f0",
  },
  faqQuestion: {
    fontSize: 17,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 12,
  },
  faqAnswer: {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 1.7,
  },

  // MAP
  mapSection: {
    marginBottom: 64,
  },
  mapContainer: {
    background: "#f1f5f9",
    borderRadius: 20,
    height: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    color: "#64748b",
  },

  // CTA
  ctaSection: {
    background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    padding: "64px 24px",
    borderRadius: 24,
    textAlign: "center",
    color: "#fff",
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 900,
    marginBottom: 16,
  },
  ctaText: {
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 24,
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "16px 32px",
    borderRadius: 12,
    background: "#fff",
    color: "#0284c7",
    fontWeight: 700,
    fontSize: 16,
    textDecoration: "none",
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
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
          <li style={{ color: "#334155", fontWeight: 600 }}>Contact</li>
        </ol>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.h1}>Contactez-nous</h1>
        <p style={styles.heroSubtitle}>
          Une question, un problème ou une suggestion ? Notre équipe basée à Dijon 
          vous répond sous 24h ouvrées.
        </p>
      </section>

      {/* CONTENT */}
      <main style={styles.content}>
        
        {/* CONTACT METHODS */}
        <section style={styles.contactGrid}>
          <div style={styles.contactCard}>
            <div style={styles.contactIcon}>✉️</div>
            <h3 style={styles.contactTitle}>Email</h3>
            <p style={styles.contactText}>
              Pour toute demande générale, support ou partenariat. 
              Réponse garantie sous 24h.
            </p>
            <a href="mailto:contact@premiumartisan.fr" style={styles.contactLink}>
              contact@premiumartisan.fr
            </a>
          </div>

          <div style={styles.contactCard}>
            <div style={styles.contactIcon}>📱</div>
            <h3 style={styles.contactTitle}>Téléphone</h3>
            <p style={styles.contactText}>
              Du lundi au vendredi, 9h-18h. Pour les urgences uniquement.
            </p>
            <a href="tel:+33300000000" style={styles.contactLink}>
              03 XX XX XX XX
            </a>
          </div>

          <div style={styles.contactCard}>
            <div style={styles.contactIcon}>💬</div>
            <h3 style={styles.contactTitle}>Formulaire</h3>
            <p style={styles.contactText}>
              Remplissez le formulaire ci-dessous. Détaillez votre demande 
              pour une réponse plus rapide.
            </p>
            <span style={{...styles.contactLink, cursor: "pointer"}}>
              Voir le formulaire ↓
            </span>
          </div>
        </section>

        {/* FORM */}
        <section style={styles.formSection}>
          <div style={styles.formContainer}>
            <h2 style={styles.formTitle}>Envoyez-nous un message</h2>
            <p style={styles.formSubtitle}>
              Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.
            </p>
            
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Votre nom *</label>
                <input 
                  type="text" 
                  style={styles.input}
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Votre email *</label>
                <input 
                  type="email" 
                  style={styles.input}
                  placeholder="jean.dupont@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Sujet *</label>
                <select 
                  style={styles.select}
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="particulier">Je cherche un artisan (particulier)</option>
                  <option value="artisan">Je veux devenir artisan partenaire</option>
                  <option value="devis">Question sur mon devis</option>
                  <option value="probleme">Problème avec un chantier</option>
                  <option value="partenariat">Proposition de partenariat</option>
                  <option value="autre">Autre demande</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Votre message *</label>
                <textarea 
                  style={styles.textarea}
                  placeholder="Décrivez votre demande en détail..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>

              <button type="submit" style={styles.submitButton}>
                Envoyer mon message →
              </button>
            </form>
          </div>
        </section>

        {/* INFO & HOURS */}
        <section style={styles.infoSection}>
          <div style={styles.infoGrid}>
            <div style={styles.infoBlock}>
              <h3 style={styles.infoTitle}>Notre adresse</h3>
              <p style={styles.infoText}>
                <strong>PremiumArtisan</strong><br />
                21300 Chenôve<br />
                Bourgogne-Franche-Comté, France<br /><br />
                <em>Siège social - Pas de visites sans rendez-vous</em>
              </p>
              <p style={styles.infoText}>
                Notre équipe est basée à Chenôve, à 10 minutes de Dijon, 
                au cœur de la région Bourgogne-Franche-Comté.
              </p>
            </div>

            <div style={styles.infoBlock}>
              <h3 style={styles.infoTitle}>Horaires d'ouverture</h3>
              <ul style={styles.hoursList}>
                <li style={styles.hoursItem}>
                  <span style={styles.hoursDay}>Lundi</span>
                  <span style={styles.hoursTime}>9h00 - 18h00</span>
                </li>
                <li style={styles.hoursItem}>
                  <span style={styles.hoursDay}>Mardi</span>
                  <span style={styles.hoursTime}>9h00 - 18h00</span>
                </li>
                <li style={styles.hoursItem}>
                  <span style={styles.hoursDay}>Mercredi</span>
                  <span style={styles.hoursTime}>9h00 - 18h00</span>
                </li>
                <li style={styles.hoursItem}>
                  <span style={styles.hoursDay}>Jeudi</span>
                  <span style={styles.hoursTime}>9h00 - 18h00</span>
                </li>
                <li style={styles.hoursItem}>
                  <span style={styles.hoursDay}>Vendredi</span>
                  <span style={styles.hoursTime}>9h00 - 18h00</span>
                </li>
                <li style={styles.hoursItem}>
                  <span style={styles.hoursDay}>Samedi</span>
                  <span style={{color: "#9ca3af"}}>Fermé</span>
                </li>
                <li style={styles.hoursItem}>
                  <span style={styles.hoursDay}>Dimanche</span>
                  <span style={{color: "#9ca3af"}}>Fermé</span>
                </li>
              </ul>
              <p style={{...styles.infoText, marginTop: 16, fontSize: 14}}>
                <em>* Horaires équipe administrative. Les artisans partenaires 
                peuvent avoir des horaires différents.</em>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={styles.faqSection}>
          <h2 style={styles.sectionTitle}>Questions fréquentes</h2>
          
          <div style={styles.faqGrid}>
            <div style={styles.faqItem}>
              <h4 style={styles.faqQuestion}>Quel délai pour recevoir une réponse ?</h4>
              <p style={styles.faqAnswer}>
                Nous nous engageons à répondre à toutes les demandes sous 24h ouvrées. 
                En pratique, la plupart des emails reçoivent une réponse dans les 4 heures 
                pendant les heures de bureau (9h-18h).
              </p>
            </div>

            <div style={styles.faqItem}>
              <h4 style={styles.faqQuestion}>Comment signaler un problème avec un artisan ?</h4>
              <p style={styles.faqAnswer}>
                Contactez-nous immédiatement par email avec votre numéro de projet. 
                Notre équipe de médiation intervient dans les 48h pour trouver 
                une solution amiable. En cas de litige majeur, nous pouvons 
                mobiliser un autre artisan de notre réseau.
              </p>
            </div>

            <div style={styles.faqItem}>
              <h4 style={styles.faqQuestion}>Je suis artisan, comment devenir partenaire ?</h4>
              <p style={styles.faqAnswer}>
                Sélectionnez "Je veux devenir artisan partenaire" dans le formulaire. 
                Nous étudions chaque candidature (SIRET, assurances, réalisations, avis). 
                Le processus prend 5-7 jours. Moins de 10% des candidats sont retenus 
                pour garantir la qualité.
              </p>
            </div>

            <div style={styles.faqItem}>
              <h4 style={styles.faqQuestion}>Puis-je visiter vos locaux ?</h4>
              <p style={styles.faqAnswer}>
                Notre siège à Chenôve n'est pas ouvert au public. Nous privilégions 
                les échanges par email et téléphone pour être plus réactifs. 
                Pour les partenariats B2B, des rendez-vous peuvent être pris sur demande.
              </p>
            </div>

            <div style={styles.faqItem}>
              <h4 style={styles.faqQuestion}>Comment modifier ou annuler mon projet ?</h4>
              <p style={styles.faqAnswer}>
                Connectez-vous à votre espace client ou contactez-nous par email 
                avec votre numéro de projet. Vous pouvez modifier les détails 
                avant validation des devis. Après signature, les conditions 
                d'annulation dépendent du contrat avec l'artisan.
              </p>
            </div>

            <div style={styles.faqItem}>
              <h4 style={styles.faqQuestion}>Proposez-vous des services hors Bourgogne ?</h4>
              <p style={styles.faqAnswer}>
                Actuellement, nous couvrons uniquement la Bourgogne-Franche-Comté 
                (Côte-d'Or, Saône-et-Loire, Yonne, Nièvre, Doubs, Jura, Haute-Saône, 
                Territoire de Belfort). L'expansion nationale est prévue pour 2026.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={styles.ctaSection}>
          <h3 style={styles.ctaTitle}>Vous avez un projet de rénovation ?</h3>
          <p style={styles.ctaText}>
            Publiez gratuitement votre projet et recevez jusqu'à 4 devis 
            d'artisans vérifiés sous 24h.
          </p>
          <Link href="/publier-projet/form" style={styles.ctaButton}>
            Publier mon projet →
          </Link>
        </section>

      </main>
    </>
  );
}