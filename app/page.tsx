// app/page.tsx — SERVER COMPONENT
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HomeClient from "@/components/HomeClient";
import PALogo from "@/components/PALogo";

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
  { initials: "KO", name: "Karima O.", location: "Chenôve · douche italienne", text: "Baignoire fonte des années 70 remplacée par une douche à l'italienne. David a géré tout ça en 9 jours. 6 200€ tout compris. Notre bailleur a validé les travaux sans aucun problème.", stars: 5 },
  { initials: "PG", name: "Patrick G.", location: "Chenôve · remise en état locative", text: "Entre deux locataires, Nadia a refait la salle de bain en 4 jours. Carrelage par-dessus, nouvelle robinetterie, joints refaits. 2 400€. Le nouveau locataire a commenté spontanément la propreté.", stars: 5 },
  { initials: "ML", name: "Martine L.", location: "Chenôve · PMR · MaPrimeAdapt'", text: "Sofiane a transformé ma salle de bain en douche PMR à 72 ans. Il a géré le dossier MaPrimeAdapt' avec moi. Sur 7 800€ de travaux, j'ai obtenu 5 460€ d'aides.", stars: 5 },
];

const seoLinks = [
  {
    label: "Devis peinture",
    links: [
      { label: "Peinture Dijon", href: "/devis-peintre/dijon" },
      { label: "Peinture Chenôve", href: "/devis-peintre/chenove" },
      { label: "Peinture Longvic", href: "/devis-peintre/longvic" },
      { label: "Peinture Talant", href: "/devis-peintre/talant" },
      { label: "Peinture Quetigny", href: "/devis-peintre/quetigny" },
      { label: "Peinture Fontaine-lès-Dijon", href: "/devis-peintre/fontaine-les-dijon" },
    ],
  },
  {
    label: "Devis rénovation",
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
    label: "Cuisine & Salle de bain",
    links: [
      { label: "Cuisine Dijon", href: "/devis-cuisine/dijon" },
      { label: "Cuisine Chenôve", href: "/devis-cuisine/chenove" },
      { label: "Salle de bain Dijon", href: "/devis-salle-de-bain-dijon" },
      { label: "Salle de bain Chenôve", href: "/devis-salle-de-bain-chenove" },
    ],
  },
  {
    label: "Outils artisans",
    links: [
      { label: "Trouver clients Dijon", href: "/trouver-clients-peintre-dijon" },
      { label: "Logiciel devis artisan", href: "/logiciel-devis-artisan/dijon" },
      { label: "Devis gratuit peintre", href: "/devis-gratuit-peintre-dijon" },
    ],
  },
];

export default function Page() {
  return (
    <main className="min-h-screen" style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#0B1120" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(11,17,32,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(51,65,85,0.3)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <PALogo />
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden md:flex">
            {[
              { label: "Comment ça marche", href: "/comment-ca-marche" },
              { label: "À propos", href: "/about" },
              { label: "FAQ", href: "/faq" },
              { label: "IA Réceptionniste", href: "/artisan/receptionist" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} style={{ color: "rgba(234,240,255,0.75)", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </div>
          <Link href="/publier-projet/form" style={{ background: "linear-gradient(90deg, rgba(34,211,238,0.92), rgba(89,140,255,0.92))", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 999, textDecoration: "none" }}>
            Publier mon projet
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: "radial-gradient(1000px 700px at 18% 18%, rgba(45,110,255,0.28), rgba(11,16,32,0) 60%), radial-gradient(900px 600px at 78% 20%, rgba(34,211,238,0.18), rgba(11,16,32,0) 55%), #0B1120", padding: "100px 24px 80px", color: "#EAF0FF" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", padding: "8px 16px", borderRadius: 999, border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#22D3EE", marginBottom: 32, textTransform: "uppercase" as const }}>
            PremiumArtisan • Dijon & Côte-d&apos;Or
          </div>
          <h1 style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24 }}>
            Trouvez un artisan<br />
            <span style={{ background: "linear-gradient(90deg, #3B82F6, #22D3EE)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>fiable</span>{" "}
            près de chez vous.
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: "rgba(234,240,255,0.84)", marginBottom: 32, maxWidth: 600 }}>
            Gratuit, sans engagement. Nous transmettons votre demande à des artisans de votre zone. Vous recevez jusqu&apos;à <b>3 réponses maximum</b>.
          </p>

          <HomeClient />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            {["Réponse sous 24h", "Projet privé", "Sans spam", "3 artisans maximum"].map(t => (
              <div key={t} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", fontSize: 13, fontWeight: 700, color: "rgba(234,240,255,0.85)" }}>
                {t}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(234,240,255,0.6)" }}>Devis locaux :</span>
            <Link href="/devis-peintre/dijon" style={{ fontSize: 12, fontWeight: 700, color: "#60A5FA", textDecoration: "underline" }}>Peinture Dijon</Link>
            <Link href="/devis-peintre/chenove" style={{ fontSize: 12, fontWeight: 700, color: "#60A5FA", textDecoration: "underline" }}>Peinture Chenôve</Link>
            <Link href="/devis-renovation-dijon" style={{ fontSize: 12, fontWeight: 700, color: "#60A5FA", textDecoration: "underline" }}>Rénovation Dijon</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "#F8FAFC", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, textAlign: "center" }}>
          {[
            { value: "500+", label: "Projets réussis" },
            { value: "3", label: "Artisans maximum par demande" },
            { value: "24h", label: "Délai de réponse moyen" },
            { value: "100%", label: "Gratuit pour les particuliers" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontSize: 40, fontWeight: 900, background: "linear-gradient(90deg, #3B82F6, #22D3EE)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{value}</div>
              <div style={{ fontSize: 14, color: "#475569", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── POURQUOI ── */}
      <section style={{ background: "#0F172A", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#60A5FA", textTransform: "uppercase" as const }}>NOS AVANTAGES</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#fff", marginTop: 12 }}>
              Pourquoi choisir <span style={{ color: "#22D3EE" }}>PremiumArtisan</span> ?
            </h2>
            <p style={{ fontSize: 18, color: "#94A3B8", marginTop: 12 }}>Une approche simple, locale et efficace pour trouver le bon artisan.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {[
              { title: "Sans spam", text: "Votre demande est envoyée uniquement à des artisans pertinents selon votre zone, le type de peinture et vos délais." },
              { title: "3 artisans maximum", text: "Volume maîtrisé pour éviter les appels inutiles et garder des devis comparables. Qualité avant quantité." },
              { title: "Projet privé", text: "Les projets restent privés : votre numéro n'est pas diffusé publiquement. Votre tranquillité d'abord." },
              { title: "Réponse sous 24h", text: "Nos artisans répondent généralement sous 24 heures selon leur disponibilité." },
              { title: "Local Dijon & Côte-d'Or", text: "Service focalisé sur le local pour de meilleurs délais et un meilleur matching." },
              { title: "Sérieux & sélection", text: "Profils adaptés à votre besoin précis : peinture intérieure, extérieure, plafonds, rénovation." },
            ].map(({ title, text }) => (
              <div key={title} style={{ background: "linear-gradient(180deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.95) 100%)", border: "1px solid rgba(51,65,85,0.4)", borderRadius: 20, padding: 32 }}>
                <h4 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{title}</h4>
                <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMOIGNAGES ── */}
      <section style={{ background: "#0B1120", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#22D3EE", textTransform: "uppercase" as const }}>TÉMOIGNAGES</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#fff", marginTop: 12 }}>
              Ils nous font confiance à <span style={{ color: "#22D3EE" }}>Dijon & Côte-d&apos;Or</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {reviews.map(({ initials, name, location, text, stars }) => (
              <div key={name} style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 20, padding: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #22D3EE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: 16 }}>{name}</div>
                    <div style={{ fontSize: 12, color: "#60A5FA" }}>{location}</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#22D3EE", fontSize: 14 }}>{"★".repeat(stars)}</div>
                </div>
                <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.7, fontStyle: "italic" }}>&ldquo;{text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section style={{ background: "#F8FAFC", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#2563EB", textTransform: "uppercase" as const }}>COMMENT ÇA MARCHE</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#0F172A", marginTop: 12 }}>3 étapes pour trouver votre artisan</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 48 }}>
            {[
              { num: "1", title: "Vous publiez", text: "Décrivez votre projet en 1 minute. Type de travaux, surface, délais. Gratuit et sans engagement." },
              { num: "2", title: "On transmet", text: "Votre demande est envoyée à des artisans pertinents dans votre zone selon votre besoin." },
              { num: "3", title: "Vous choisissez", text: "Vous comparez les réponses et décidez en toute liberté. Jusqu'à 3 devis comparables." },
            ].map(({ num, title, text }) => (
              <div key={num} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 20, padding: 32, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(90deg, #3B82F6, #22D3EE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 auto 20px" }}>{num}</div>
                <h4 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>{title}</h4>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 24 }} className="md:grid">
            <div style={{ position: "relative", height: 320, borderRadius: 16, overflow: "hidden" }}>
              <Image src="/landing-static/how-it-works-1.webp" alt="Artisan en intervention" fill sizes="50vw" quality={90} style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "relative", height: 320, borderRadius: 16, overflow: "hidden" }}>
              <Image src="/landing-static/how-it-works-2.webp" alt="Finition intérieure" fill sizes="50vw" quality={90} style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── IA RECEPTIONNISTE ── */}
      <section style={{ background: "#0F172A", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="md:grid">
          <div>
            <div style={{ display: "inline-flex", gap: 8, alignItems: "center", padding: "8px 16px", borderRadius: 999, border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", fontSize: 12, fontWeight: 700, color: "#22D3EE", marginBottom: 24, textTransform: "uppercase" as const }}>
              <span>NOUVEAU</span><span style={{ opacity: 0.5 }}>•</span><span style={{ color: "#94A3B8" }}>POUR LES ARTISANS</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
              <span style={{ color: "#22D3EE" }}>IA Réceptionniste</span> : votre assistant vocal qui répond à votre place
            </h2>
            <p style={{ fontSize: 17, color: "#94A3B8", lineHeight: 1.6, marginBottom: 32 }}>
              Un service d&apos;accueil téléphonique par intelligence artificielle, conçu spécialement pour les artisans en France. Ne perdez plus aucun appel, même en pleins travaux.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {[
                { title: "Réponse vocale 24h/7j", text: "L'IA répond à vos appels en temps réel avec une voix naturelle." },
                { title: "Qualification automatique", text: "Elle identifie les prospects sérieux et vous transmet un résumé structuré." },
                { title: "Plus de conversions", text: "Captez 100% des opportunités sans rater aucun appel entrant." },
              ].map(({ title, text }) => (
                <div key={title} style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22D3EE", flexShrink: 0, marginTop: 6 }} />
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{title}</div>
                    <div style={{ fontSize: 14, color: "#94A3B8", marginTop: 2 }}>{text}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/artisan/receptionist" style={{ display: "inline-block", background: "linear-gradient(90deg, rgba(34,211,238,0.92), rgba(89,140,255,0.92))", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 999, textDecoration: "none" }}>
              Découvrir IA Réceptionniste →
            </Link>
          </div>
          <div style={{ position: "relative", height: 380, borderRadius: 24, overflow: "hidden", border: "1px solid rgba(51,65,85,0.3)" }}>
            <Image src="/ai-receptionist.jpg" alt="IA Réceptionniste" fill sizes="50vw" quality={90} style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#F8FAFC", padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#2563EB", textTransform: "uppercase" as const }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#0F172A", marginTop: 12 }}>Questions fréquentes</h2>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden" }}>
            {faq.map((x, i) => (
              <details key={x.q} style={{ borderBottom: i < faq.length - 1 ? "1px solid #E2E8F0" : "none", padding: "0" }}>
                <summary style={{ padding: "20px 24px", cursor: "pointer", fontWeight: 700, color: "#0F172A", fontSize: 16, listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {x.q}
                  <span style={{ color: "#2563EB", fontSize: 20, fontWeight: 400 }}>+</span>
                </summary>
                <div style={{ padding: "0 24px 20px", fontSize: 15, color: "#475569", lineHeight: 1.7 }}>{x.a}</div>
              </details>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/faq" style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", textDecoration: "underline" }}>Voir toutes les questions →</Link>
          </div>
        </div>
      </section>

      {/* ── SEO LINKS ── */}
      <section style={{ background: "#F1F5F9", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#0F172A", marginBottom: 8 }}>Trouver un artisan qualifié en Côte-d&apos;Or</h2>
          <p style={{ fontSize: 15, color: "#64748B", marginBottom: 40, maxWidth: 700, lineHeight: 1.6 }}>
            PremiumArtisan met en relation particuliers et artisans du bâtiment sur Dijon et toute la Côte-d&apos;Or. Gratuit, sans engagement.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {seoLinks.map(({ label, links }) => (
              <div key={label}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 12, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{label}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {links.map(({ label: lbl, href }) => (
                    <Link key={href} href={href} style={{ fontSize: 14, color: "#2563EB", textDecoration: "none", lineHeight: 2 }}>
                      {lbl}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "radial-gradient(1000px 700px at 18% 18%, rgba(45,110,255,0.28), rgba(11,16,32,0) 60%), radial-gradient(900px 600px at 78% 20%, rgba(34,211,238,0.18), rgba(11,16,32,0) 55%), #0B1120", padding: "80px 24px", textAlign: "center", color: "#EAF0FF" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "inline-block", padding: "6px 20px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", fontSize: 12, fontWeight: 700, marginBottom: 24, color: "rgba(234,240,255,0.8)" }}>
            Gratuit · Sans engagement · Réponse sous 24h
          </div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Prêt à démarrer<br />
            <span style={{ background: "linear-gradient(90deg, #3B82F6, #22D3EE)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>votre projet ?</span>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(234,240,255,0.7)", marginBottom: 32, lineHeight: 1.6 }}>
            Publiez votre projet en 2 minutes et recevez jusqu&apos;à 3 devis d&apos;artisans qualifiés de votre secteur.
          </p>
          <Link href="/publier-projet/form" style={{ display: "inline-block", padding: "16px 40px", borderRadius: 14, background: "linear-gradient(90deg, rgba(34,211,238,0.92), rgba(89,140,255,0.92))", color: "#fff", fontWeight: 900, fontSize: 17, textDecoration: "none", boxShadow: "0 18px 50px rgba(0,0,0,0.35)" }}>
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
      <footer style={{ background: "#0F0A0C", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 40 }} className="md:grid">
          <div>
            <PALogo />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginTop: 12, maxWidth: 260 }}>
              La plateforme qui connecte particuliers et artisans peintres à Dijon & Côte-d&apos;Or.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[
              { title: "Particuliers", links: [{ label: "Publier un projet", href: "/publier-projet/form" }, { label: "Comment ça marche", href: "/comment-ca-marche" }, { label: "FAQ", href: "/faq" }] },
              { title: "Artisans", links: [{ label: "Espace artisan", href: "/artisan/dashboard" }, { label: "Créer un devis", href: "/artisan/devis/new" }, { label: "Créer une facture", href: "/artisan/factures/new" }, { label: "IA Réceptionniste", href: "/artisan/receptionist" }] },
              { title: "À propos", links: [{ label: "Notre histoire", href: "/about" }, { label: "Contact", href: "/contact" }] },
              { title: "Légal", links: [{ label: "Mentions légales", href: "/mentions-legales" }, { label: "Confidentialité", href: "/privacy" }, { label: "CGU", href: "/terms" }] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: 12 }}>{title}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {links.map(({ label, href }) => (
                    <Link key={href} href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", fontWeight: 500 }}>{label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "32px auto 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
          © 2026 PremiumArtisan · Dijon, Côte-d&apos;Or (21)
        </div>
      </footer>

    </main>
  );
}