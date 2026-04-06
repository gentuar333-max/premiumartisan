// app/page.tsx — SERVER COMPONENT
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "PremiumArtisan — Trouvez un artisan fiable à Dijon & Côte-d'Or",
  description: "Publiez votre projet gratuitement et recevez jusqu'à 3 devis d'artisans qualifiés à Dijon et en Côte-d'Or. Peinture, rénovation, cuisine, salle de bain. Gratuit, sans engagement.",
  metadataBase: new URL("https://premiumartisan.fr"),
  openGraph: {
    title: "PremiumArtisan — Artisans qualifiés à Dijon",
    description: "Trouvez un artisan fiable à Dijon. Gratuit, sans engagement.",
    url: "https://premiumartisan.fr",
    siteName: "PremiumArtisan",
    locale: "fr_FR",
    type: "website",
  },
};

const faq = [
  { q: "Combien de devis vais-je recevoir ?", a: "Jusqu'à 3 réponses maximum, pour éviter la surcharge et rester efficace." },
  { q: "Mon numéro est-il partagé publiquement ?", a: "Non. Votre demande reste privée et transmise uniquement à des artisans pertinents." },
  { q: "Le service est-il payant ?", a: "Non. Publier une demande est gratuit et sans engagement." },
  { q: "Sous quel délai les artisans répondent-ils ?", a: "Généralement sous 24h selon la disponibilité des artisans dans votre zone." },
  { q: "Puis-je demander peinture intérieure et plafonds ?", a: "Oui, vous pouvez préciser le type de projet et les détails dans le formulaire." },
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

const reviews = [
  { initials: "KO", name: "Karima O.", location: "Chenôve · HLM 4m² · douche italienne", text: "Baignoire fonte des années 70 remplacée par une douche à l'italienne. David a géré tout ça en 9 jours. 6 200€ tout compris. Notre bailleur a validé les travaux sans aucun problème.", stars: 5 },
  { initials: "PG", name: "Patrick G.", location: "Chenôve · Locatif · remise en état", text: "Entre deux locataires, Nadia a refait la salle de bain en 4 jours. Carrelage par-dessus, nouvelle robinetterie, joints refaits. 2 400€. Le nouveau locataire a commenté spontanément la propreté lors de la visite.", stars: 5 },
  { initials: "ML", name: "Martine L.", location: "Chenôve · PMR · MaPrimeAdapt'", text: "Sofiane a transformé ma salle de bain en douche PMR à 72 ans. Il a géré le dossier MaPrimeAdapt' avec moi. Sur 7 800€ de travaux, j'ai obtenu 5 460€ d'aides.", stars: 5 },
];

const seoLinks: { label: string; desc?: string; links: { label: string; href: string }[] }[] = [
  {
    label: "Devis peinture par commune",
    desc: "Besoin d'un peintre en bâtiment ? Comparez les tarifs et disponibilités des professionnels près de chez vous.",
    links: [
      { label: "Peinture Dijon", href: "/devis-peinture-dijon" },
      { label: "Peinture Chenôve", href: "/devis-peinture-chenove" },
      { label: "Peinture Longvic", href: "/devis-peinture-longvic" },
      { label: "Peinture Talant", href: "/devis-peinture-talant" },
      { label: "Peinture Quetigny", href: "/devis-peinture-quetigny" },
      { label: "Peinture Fontaine-lès-Dijon", href: "/devis-peinture-fontaine-les-dijon" },
      { label: "Peinture intérieure Dijon", href: "/devis-peinture-interieure-dijon" },
    ],
  },
  {
    label: "Devis rénovation par commune",
    desc: "Rénovation complète ou partielle : obtenez plusieurs devis pour vos travaux en intérieur ou extérieur.",
    links: [
      { label: "Rénovation Dijon", href: "/devis-renovation-dijon" },
      { label: "Rénovation Chenôve", href: "/devis-renovation-chenove" },
      { label: "Rénovation Longvic", href: "/devis-renovation-longvic" },
      { label: "Rénovation Talant", href: "/devis-renovation-talant" },
      { label: "Rénovation Quetigny", href: "/devis-renovation-quetigny" },
      { label: "Rénovation Fontaine-lès-Dijon", href: "/devis-renovation-fontaine-les-dijon" },
    ],
  },
  {
    label: "Installation cuisine par commune",
    desc: "Pose de cuisine équipée, raccordement électrique et plomberie. Artisans vérifiés disponibles rapidement.",
    links: [
      { label: "Cuisine Dijon", href: "/devis-cuisine-dijon" },
      { label: "Cuisine Chenôve", href: "/devis-cuisine-chenove" },
      { label: "Cuisine Longvic", href: "/devis-cuisine-longvic" },
      { label: "Cuisine Talant", href: "/devis-cuisine-talant" },
      { label: "Cuisine Quetigny", href: "/devis-cuisine-quetigny" },
      { label: "Cuisine Fontaine-lès-Dijon", href: "/devis-cuisine-fontaine-les-dijon" },
    ],
  },
  {
    label: "Rénovation salle de bain par commune",
    desc: "Douche à l'italienne, remplacement baignoire, carrelage et robinetterie. Devis détaillés sous 24 heures.",
    links: [
      { label: "Salle de bain Dijon", href: "/devis-salle-de-bain-dijon" },
      { label: "Salle de bain Chenôve", href: "/devis-salle-de-bain-chenove" },
      { label: "Salle de bain Longvic", href: "/devis-salle-de-bain-longvic" },
      { label: "Salle de bain Talant", href: "/devis-salle-de-bain-talant" },
      { label: "Salle de bain Quetigny", href: "/devis-salle-de-bain-quetigny" },
      { label: "Salle de bain Fontaine-lès-Dijon", href: "/devis-salle-de-bain-fontaine-les-dijon" },
    ],
  },
  {
    label: "Pose papier peint par commune",
    desc: "Pose professionnelle de papier peint et toile de verre. Finition soignée pour murs neufs ou rénovés.",
    links: [
      { label: "Papier peint Dijon", href: "/devis-pose-papier-peint-dijon" },
      { label: "Papier peint Chenôve", href: "/devis-pose-papier-peint-chenove" },
      { label: "Papier peint Longvic", href: "/devis-pose-papier-peint-longvic" },
      { label: "Papier peint Talant", href: "/devis-pose-papier-peint-talant" },
      { label: "Papier peint Quetigny", href: "/devis-pose-papier-peint-quetigny" },
      { label: "Papier peint Fontaine-lès-Dijon", href: "/devis-pose-papier-peint-fontaine-les-dijon" },
    ],
  },
  {
    label: "Outils pour artisans peintres",
    desc: "Vous êtes artisan ? Accédez à des outils de gestion simples et recevez des demandes de clients qualifiés dans votre secteur.",
    links: [
      { label: "Trouver clients peintre Dijon", href: "/trouver-clients-peintre-dijon" },
      { label: "Logiciel devis peintre Côte-d'Or", href: "/logiciel-devis-peintre-cote-dor" },
      { label: "Créer devis peintre gratuit", href: "/creer-devis-peintre" },
      { label: "Créer facture artisan", href: "/creer-facture-artisan" },
      { label: "Devis facture peintre Bourgogne", href: "/devis-facture-gratuit-peintre-bourgogne" },
    ],
  },
];

export default function Page() {
  return (
    <main style={styles.page}>

      {/* ── HERO ── */}
      <section style={styles.heroSection}>
        <div style={styles.container}>
          {/* Nav — sans "Espace artisan" */}
          <div style={styles.topNav}>
            <span style={styles.logoText}>Premium<span style={{ color: "#fda4af" }}>Artisan</span></span>
            <div style={styles.topNavLinks}>
              <Link href="/comment-ca-marche" style={styles.topNavLink}>Comment ça marche</Link>
              <Link href="/about" style={styles.topNavLink}>À propos</Link>
              <Link href="/faq" style={styles.topNavLink}>FAQ</Link>
            </div>
          </div>

          <div style={styles.badge}>PremiumArtisan • Dijon & Côte-d&apos;Or</div>

          <h1 style={styles.h1}>
            Trouvez un artisan<br />
            <span style={styles.h1Accent}>fiable</span> près de chez <span style={styles.h1Keep}>vous.</span>
          </h1>

          <p style={styles.sub}>
            Gratuit, sans engagement. Nous transmettons votre demande à des artisans de votre zone. Vous recevez jusqu'à <b>3 réponses maximum</b>.
          </p>

          <HomeClient />

          <div style={styles.trustBar}>
            {["Réponse sous 24h", "Projet privé", "Sans spam", "3 artisans maximum"].map(t => (
              <div key={t} style={styles.trustItem}>{t}</div>
            ))}
          </div>

          <div style={styles.quickLinks}>
            <span style={styles.quickLinksLabel}>Devis locaux :</span>
            <Link style={styles.quickLink} href="/devis-peinture-dijon">Peinture Dijon</Link>
            <Link style={styles.quickLink} href="/devis-peinture-chenove">Peinture Chenôve</Link>
            <Link style={styles.quickLink} href="/devis-renovation-dijon">Rénovation Dijon</Link>
          </div>
        </div>
        <div style={styles.heroSpacer} />
      </section>

      {/* ── POURQUOI ── */}
      <section style={styles.whyWrap}>
        <div style={styles.sectionInner}>
          <h2 className="text-3xl sm:text-4xl font-black mb-5" style={{ color: "#111827" }}>Pourquoi choisir PremiumArtisan ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Sans spam", text: "Votre demande est envoyée uniquement à des artisans pertinents (zone, type de peinture, délais)." },
              { title: "3 artisans maximum", text: "Volume maîtrisé pour éviter les appels inutiles et garder des devis comparables." },
              { title: "Projet privé", text: "Les projets restent privés : votre numéro n'est pas diffusé publiquement." },
              { title: "Réponse sous 24h", text: "Réponse généralement sous 24h selon disponibilité des artisans." },
              { title: "Local Dijon & Côte-d'Or", text: "Service focalisé local pour de meilleurs délais et un meilleur matching." },
              { title: "Sérieux & sélection", text: "Profils adaptés à votre besoin : intérieur, extérieur, plafond, rénovation." },
            ].map(({ title, text }) => (
              <div key={title} style={styles.whyCard}>
                <div style={styles.whyTitle}>{title}</div>
                <div style={styles.whyText}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section style={styles.proofWrap}>
        <div style={styles.sectionInner}>
          <h3 className="text-2xl font-black mb-4" style={{ color: "#111827" }}>Ils nous font confiance à Dijon & Côte-d&apos;Or</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {reviews.map(({ initials, name, location, text, stars }) => (
              <div key={name} style={styles.reviewCard}>
                <div style={styles.reviewCardTop}>
                  <div style={styles.reviewAvatar}>{initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={styles.reviewName}>{name}</div>
                    <div style={styles.reviewLocation}>{location}</div>
                  </div>
                  <div style={styles.reviewStars}>{"★".repeat(stars)}</div>
                </div>
                <p style={styles.reviewText}>&ldquo;{text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section style={styles.whiteWrap}>
        <div style={styles.sectionInner}>
          <h2 className="text-3xl sm:text-4xl font-black mb-5" style={{ color: "#0B1020" }}>Comment ça marche</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "1) Vous publiez", text: "Décrivez votre projet en 1 minute." },
              { title: "2) On transmet", text: "Votre demande est envoyée à des artisans pertinents (zone + besoin)." },
              { title: "3) Vous choisissez", text: "Vous comparez et décidez — jusqu'à 3 réponses maximum." },
            ].map(({ title, text }) => (
              <div key={title} style={styles.stepCard}>
                <div style={styles.stepTitle}>{title}</div>
                <div style={styles.stepText}>{text}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link href="/comment-ca-marche" style={styles.linkBtn}>En savoir plus →</Link>
          </div>
          <div className="grid md:grid-cols-12 gap-6 mt-10">
            <div className="md:col-span-7">
              <div className="relative w-full h-[300px] sm:h-[420px] overflow-hidden rounded-2xl">
                <Image src="/landing/how-it-works-1.webp" alt="Artisan en intervention" fill sizes="(max-width: 768px) 100vw, 50vw" quality={90} className="object-cover" />
                <div className="absolute inset-0 bg-black/10" />
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">Photo illustrative</span>
              </div>
            </div>
            <div className="md:col-span-5 flex md:items-center">
              <div className="relative w-full h-[300px] sm:h-[420px] overflow-hidden rounded-2xl">
                <Image src="/landing/how-it-works-2.webp" alt="Finition intérieure soignée" fill sizes="(max-width: 768px) 100vw, 50vw" quality={95} className="object-contain rounded-2xl bg-gray-50" />
                <div className="absolute inset-0 bg-black/10" />
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">Photo illustrative</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={styles.faqWrap}>
        <div style={styles.sectionInner}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
          <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: "#0B1020" }}>Questions fréquentes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {faq.map((x) => (
              <details key={x.q} style={styles.faqItem}>
                <summary style={styles.faqQ}>{x.q}</summary>
                <div style={styles.faqA}>{x.a}</div>
              </details>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link href="/faq" style={styles.linkBtn}>Voir toutes les questions →</Link>
          </div>
        </div>
      </section>

      {/* ── SEO INTERNAL LINKS ── */}
      <section style={{ background: "#f8f9fa", padding: "52px 20px" }}>
        <div style={{ maxWidth: 1150, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginBottom: 12 }}>
            Trouver un artisan qualifié en Côte-d&apos;Or
          </h2>
          <p style={{ color: "#64748b", fontSize: 15, marginBottom: 36, maxWidth: 720, lineHeight: 1.6 }}>
            PremiumArtisan met en relation particuliers et artisans du bâtiment sur Dijon et toute la Côte-d'Or.
            Vous publiez votre projet gratuitement, nous le transmettons aux artisans disponibles dans votre secteur.
            Chaque artisan paie uniquement s&apos;il souhaite répondre à votre demande.
            Vous recevez jusqu'à 3 devis comparables, sans engagement.
          </p>
          {seoLinks.map(({ label, desc, links }) => (
            <div key={label} style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
                {label}
              </h3>
              {desc && (
                <p style={{ color: "#64748b", fontSize: 14, marginBottom: 12, maxWidth: 680, lineHeight: 1.5 }}>
                  {desc}
                </p>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {links.map(({ label: lbl, href }) => (
                  <Link key={href} href={href} style={{
                    display: "inline-block", padding: "8px 16px", borderRadius: 8,
                    border: "1px solid #e2e8f0", background: "#ffffff",
                    color: "#374151", fontSize: 13, fontWeight: 500, textDecoration: "none"
                  }}>
                    {lbl}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={styles.ctaSection}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
          <div style={styles.ctaBadge}>Gratuit · Sans engagement · Réponse sous 24h</div>
          <h2 style={styles.ctaH2}>
            Prêt à démarrer<br />
            <span style={styles.ctaAccent}>votre projet ?</span>
          </h2>
          <p style={{ color: "rgba(234,240,255,0.7)", marginBottom: 32, fontSize: 16, lineHeight: 1.6 }}>
            Publiez votre projet en 2 minutes et recevez jusqu'à 3 devis d'artisans qualifiés de votre secteur.
          </p>
          <Link href="/publier-projet/form" style={styles.ctaBtn}>
            Publier mon projet gratuitement →
          </Link>
          <div style={{ marginTop: 20, fontSize: 13, color: "rgba(234,240,255,0.45)" }}>
            Déjà artisan ?{" "}
            <Link href="/artisan/dashboard" style={{ color: "rgba(234,240,255,0.7)", textDecoration: "underline" }}>
              Accéder au tableau de bord
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div className="max-w-[1150px] mx-auto px-5 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-10">
          <div style={{ maxWidth: 260 }}>
            <div style={styles.footerLogo}>Premium<span style={{ color: "#be123c" }}>Artisan</span></div>
            <p style={styles.footerTagline}>La plateforme qui connecte particuliers et artisans peintres à Dijon & Côte-d'Or.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <p style={styles.footerColTitle}>Particuliers</p>
              <div style={styles.footerLinks}>
                <Link href="/publier-projet/form" style={styles.footerLink}>Publier un projet</Link>
                <Link href="/comment-ca-marche" style={styles.footerLink}>Comment ça marche</Link>
                <Link href="/faq" style={styles.footerLink}>FAQ</Link>
              </div>
            </div>
            <div>
              <p style={styles.footerColTitle}>Artisans</p>
              <div style={styles.footerLinks}>
                <Link href="/artisan/dashboard" style={styles.footerLink}>Espace artisan</Link>
                <Link href="/artisan/devis/new" style={styles.footerLink}>Créer un devis</Link>
                <Link href="/artisan/factures/new" style={styles.footerLink}>Créer une facture</Link>
              </div>
            </div>
            <div>
              <p style={styles.footerColTitle}>À propos</p>
              <div style={styles.footerLinks}>
                <Link href="/about" style={styles.footerLink}>Notre histoire</Link>
                <Link href="/contact" style={styles.footerLink}>Contact</Link>
              </div>
            </div>
            <div>
              <p style={styles.footerColTitle}>Légal</p>
              <div style={styles.footerLinks}>
                <Link href="/mentions-legales" style={styles.footerLink}>Mentions légales</Link>
                <Link href="/privacy" style={styles.footerLink}>Confidentialité</Link>
                <Link href="/terms" style={styles.footerLink}>CGU</Link>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>© 2026 PremiumArtisan</span>
          <span style={{ margin: "0 8px", opacity: 0.3 }}>·</span>
          <span>Dijon, Côte-d'Or (21)</span>
        </div>
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  topNav: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 },
  logoText: { fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.3px" },
  topNavLinks: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  topNavLink: { color: "rgba(234,240,255,0.75)", fontSize: 13, fontWeight: 600, textDecoration: "none", padding: "6px 12px", borderRadius: 8 },
  topNavLinkCta: { color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none", padding: "6px 14px", borderRadius: 8, background: "rgba(190,18,60,0.8)", border: "1px solid rgba(255,255,255,0.15)" },
  heroSection: { color: "#EAF0FF", background: "radial-gradient(1000px 700px at 18% 18%, rgba(45,110,255,0.28), rgba(11,16,32,0) 60%), radial-gradient(900px 600px at 78% 20%, rgba(34,211,238,0.18), rgba(11,16,32,0) 55%), linear-gradient(135deg, rgba(18,38,85,0.78), rgba(11,16,32,0) 58%), #0B1020" },
  container: { maxWidth: 1150, margin: "0 auto", padding: "48px 20px 26px", display: "grid", gridTemplateColumns: "1fr", gap: 18 },
  heroSpacer: { height: 80 },
  badge: { display: "inline-flex", alignItems: "center", padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", fontWeight: 900, fontSize: 13, width: "fit-content" },
  h1: { margin: "10px 0 10px", fontSize: "clamp(36px, 8vw, 66px)", lineHeight: 1.01, letterSpacing: "-0.02em", fontWeight: 950 },
  h1Accent: { background: "linear-gradient(90deg, rgba(89,140,255,1), rgba(34,211,238,1))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" },
  h1Keep: { color: "#EAF0FF" },
  sub: { margin: "0 0 10px", fontSize: 18, lineHeight: 1.55, color: "rgba(234,240,255,0.84)", maxWidth: 900 },
  trustBar: { marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", color: "rgba(234,240,255,0.85)", fontSize: 13, fontWeight: 800 },
  trustItem: { padding: "8px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.05)" },
  quickLinks: { marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", opacity: 0.9 },
  quickLinksLabel: { fontSize: 12.5, fontWeight: 800, opacity: 0.8 },
  quickLink: { fontSize: 12.5, fontWeight: 800, color: "rgba(234,240,255,0.90)", textDecoration: "underline" },
  whyWrap: { padding: "54px 0 60px", backgroundColor: "#D9DEE7", backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.16))" },
  sectionInner: { maxWidth: 1150, margin: "0 auto", padding: "0 20px" },
  whyCard: { borderRadius: 20, border: "1px solid rgba(17,24,39,0.10)", background: "rgba(255,255,255,0.68)", boxShadow: "0 18px 46px rgba(17,24,39,0.10)", padding: 18, backdropFilter: "blur(2px)" },
  whyTitle: { fontWeight: 950, marginBottom: 8, color: "#111827" },
  whyText: { color: "rgba(17,24,39,0.78)", lineHeight: 1.55 },
  proofWrap: { padding: "54px 0 60px", backgroundColor: "#D9DEE7", backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.16))" },
  reviewCard: { borderRadius: 20, border: "1px solid rgba(17,24,39,0.10)", background: "rgba(255,255,255,0.64)", padding: 18, backdropFilter: "blur(2px)" },
  reviewCardTop: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 },
  reviewAvatar: { width: 38, height: 38, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg, #be123c, #9f1239)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" },
  reviewName: { fontSize: 14, fontWeight: 700, color: "#111827" },
  reviewLocation: { fontSize: 12, color: "rgba(17,24,39,0.55)", marginTop: 2 },
  reviewStars: { marginLeft: "auto", fontSize: 13, color: "#d97706", letterSpacing: 1 },
  reviewText: { fontSize: 13, color: "rgba(17,24,39,0.78)", lineHeight: 1.7, fontStyle: "italic", margin: 0 },
  whiteWrap: { background: "#FFFFFF", padding: "52px 0 56px" },
  stepCard: { borderRadius: 20, border: "1px solid rgba(11,16,32,0.10)", background: "#FFFFFF", boxShadow: "0 18px 44px rgba(11,16,32,0.10)", padding: 18 },
  stepTitle: { fontWeight: 950, marginBottom: 6, color: "#0B1020" },
  stepText: { color: "rgba(11,16,32,0.72)", lineHeight: 1.5 },
  linkBtn: { display: "inline-block", padding: "10px 24px", borderRadius: 999, border: "1px solid #1a0a0e", color: "#1a0a0e", fontWeight: 700, fontSize: 14, textDecoration: "none" },
  faqWrap: { background: "#F7F8FB", padding: "52px 0 44px" },
  faqItem: { borderRadius: 18, border: "1px solid rgba(11,16,32,0.10)", background: "#FFFFFF", padding: "12px 14px" },
  faqQ: { cursor: "pointer", fontWeight: 950, color: "#0B1020" },
  faqA: { marginTop: 8, color: "rgba(11,16,32,0.72)", lineHeight: 1.55 },
  ctaSection: { color: "#EAF0FF", padding: "80px 20px", background: "radial-gradient(1000px 700px at 18% 18%, rgba(45,110,255,0.28), rgba(11,16,32,0) 60%), radial-gradient(900px 600px at 78% 20%, rgba(34,211,238,0.18), rgba(11,16,32,0) 55%), linear-gradient(135deg, rgba(18,38,85,0.78), rgba(11,16,32,0) 58%), #0B1020" },
  ctaBadge: { display: "inline-block", padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", fontSize: 12, fontWeight: 700, marginBottom: 20, color: "rgba(234,240,255,0.8)" },
  ctaH2: { fontSize: "clamp(32px, 6vw, 48px)", fontWeight: 950, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16, color: "#EAF0FF" },
  ctaAccent: { background: "linear-gradient(90deg, rgba(89,140,255,1), rgba(34,211,238,1))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" },
  ctaBtn: { display: "inline-block", padding: "16px 36px", borderRadius: 14, background: "linear-gradient(90deg, rgba(34,211,238,0.92), rgba(89,140,255,0.92))", color: "#fff", fontWeight: 950, fontSize: 16, textDecoration: "none", boxShadow: "0 18px 50px rgba(0,0,0,0.35)" },
  footer: { background: "#0f0a0c", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 20px 24px" },
  footerLogo: { fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 10 },
  footerTagline: { fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 },
  footerColTitle: { fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 },
  footerLinks: { display: "flex", flexDirection: "column", gap: 8 },
  footerLink: { fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", fontWeight: 500 },
  footerBottom: { maxWidth: 1150, margin: "32px auto 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center" },
};