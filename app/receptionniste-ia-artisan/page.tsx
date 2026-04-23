import type { Metadata } from "next"
import Link from "next/link"
import {
  Phone, CalendarCheck, Target, XCircle, Check, Clock,
  Wrench, Zap, Hammer, Key, Paintbrush
} from "lucide-react"

export const metadata: Metadata = {
  title: "Réceptionniste IA pour Artisans — PremiumArtisan",
  description: "Votre IA répond aux appels que vous ne pouvez pas prendre. 24h/24, 7j/7. Plombier, électricien, peintre — ne manquez plus jamais un client.",
  keywords: "réceptionniste IA artisan, secrétaire virtuelle artisan, répondre appels artisan France",
}

const plans = [
  {
    name: "Trial",
    price: "€0",
    minutes: "15 minutes",
    period: "14 jours de test",
    features: ["Réponse IA aux appels", "Qualification du client", "Résumé des appels", "Tableau de bord"],
    cta: "Commencer gratuitement",
    featured: false,
    badge: { text: "GRATUIT", gold: false },
  },
  {
    name: "Starter",
    price: "€99",
    minutes: "150 min / mois",
    period: "",
    features: ["Réponse IA 24h/7j", "SMS après chaque appel", "Tableau de bord", "Contacts famille / employés", "Transcription", "Support email"],
    cta: "Choisir Starter",
    featured: false,
  },
  {
    name: "Pro",
    price: "€199",
    minutes: "400 min / mois",
    period: "",
    features: ["Réponse IA 24h/7j", "SMS après chaque appel", "Tableau de bord", "Contacts famille / employés", "Transcription", "Support email"],
    cta: "Choisir Pro",
    featured: true,
    badge: { text: "POPULAIRE", gold: true },
  },
  {
    name: "Business",
    price: "€349",
    minutes: "800 min / mois",
    period: "",
    features: ["Réponse IA 24h/7j", "SMS après chaque appel", "Tableau de bord", "Contacts famille / employés", "Transcription", "Support email"],
    cta: "Choisir Business",
    featured: false,
  },
]

const testimonials = [
  {
    quote: "Avant, je perdais au moins 3 appels par jour en plein chantier. Maintenant mon IA réceptionniste les prend tous. J'ai gagné 30% de chiffre d'affaires en 3 mois.",
    author: "Marc D.",
    role: "Plombier — Lyon",
  },
  {
    quote: "Je ne savais même pas combien de clients je manquais. Le premier mois, l'IA a répondu à 47 appels que j'aurais ratés. 12 sont devenus des RDV.",
    author: "Karim B.",
    role: "Électricien — Marseille",
  },
  {
    quote: "Simple à installer. En 10 minutes, c'était opérationnel. Mes clients ne remarquent même pas que c'est une IA.",
    author: "Sophie L.",
    role: "Menuisière — Bordeaux",
  },
]

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#09090B", color: "#F0EDE6", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .container-p { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        @media (min-width: 768px) { .container-p { padding: 0 48px; } }
        @media (min-width: 1024px) { .container-p { padding: 0 64px; } }
        .gold-btn {
          background: linear-gradient(135deg, #D4A853, #E8C878, #B87333);
          color: #09090B; font-weight: 700; border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .gold-btn:hover { transform: scale(1.02); box-shadow: 0 0 24px rgba(212,168,83,0.3); }
        .outline-btn {
          background: transparent; border: 1px solid #27273A; color: #F0EDE6;
          cursor: pointer; transition: border-color 0.2s, color 0.2s;
        }
        .outline-btn:hover { border-color: #8B7340; color: #D4A853; }
        .card-hover { transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s; }
        .card-hover:hover { transform: translateY(-4px); border-color: rgba(212,168,83,0.2) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,83,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(212,168,83,0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(212,168,83,0.2); }
          50% { box-shadow: 0 0 24px rgba(212,168,83,0.4); }
        }
        .divider { height: 1px; background: linear-gradient(90deg, transparent, #27273A, transparent); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(9,9,11,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid #27273A" }}>
        <div className="container-p" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/" className="font-display" style={{ color: "#F0EDE6", textDecoration: "none", fontWeight: 700, fontSize: 18 }}>
            PremiumArtisan
          </Link>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/artisan/login" style={{ color: "#9C9AAF", textDecoration: "none", fontSize: 14, padding: "8px 16px" }}>
              Connexion
            </Link>
            <Link href="/artisan/receptionist/pricing" className="gold-btn font-display" style={{ padding: "8px 20px", borderRadius: 8, fontSize: 14, textDecoration: "none", display: "inline-block" }}>
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 120, paddingBottom: 80, background: "radial-gradient(ellipse at 50% 0%, rgba(212,168,83,0.05) 0%, transparent 60%)" }}>
        <div className="container-p" style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 20px", borderRadius: 999, border: "1px solid #8B7340", background: "rgba(212,168,83,0.08)", marginBottom: 32 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D4A853", animation: "pulseDot 2s infinite", display: "inline-block" }} />
            <span className="font-display" style={{ fontSize: 12, letterSpacing: "0.12em", color: "#D4A853", textTransform: "uppercase" }}>
              IA Réceptionniste pour Artisans
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display" style={{ fontSize: "clamp(36px, 7vw, 72px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#F0EDE6", marginBottom: 24 }}>
            Ne manquez plus<br />
            <span style={{ color: "#D4A853" }}>jamais</span> un appel.
          </h1>

          {/* Sub */}
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7, color: "#9C9AAF", maxWidth: 640, margin: "0 auto 40px" }}>
            Votre IA réceptionniste répond aux appels que vous ne pouvez pas prendre.
            Prise de rendez-vous, qualification de leads, disponible 24h/24.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 80 }}>
            <Link href="/artisan/receptionist/pricing" className="gold-btn font-display" style={{ padding: "16px 40px", borderRadius: 8, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Démarrer mon essai gratuit
            </Link>
            <Link href="#tarifs" className="outline-btn font-display" style={{ padding: "16px 32px", borderRadius: 8, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
              Voir les tarifs
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 0 }}>
            {[
              { number: "15 000+", label: "Appels traités" },
              { number: "98%", label: "Taux de satisfaction" },
              { number: "24/7", label: "Disponibilité" },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: "0 32px", borderRight: i < 2 ? "1px solid #27273A" : "none", textAlign: "center" }}>
                <div className="font-display" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#D4A853", fontFamily: "monospace" }}>{s.number}</div>
                <div style={{ fontSize: 12, letterSpacing: "0.06em", color: "#5A5A6E", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PAIN POINTS */}
      <section style={{ padding: "96px 0", background: "#09090B" }}>
        <div className="container-p">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
            <div>
              <div className="font-display" style={{ fontSize: 14, letterSpacing: "0.08em", color: "#D4A853", textTransform: "uppercase", marginBottom: 16 }}>
                Le Problème
              </div>
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, lineHeight: 1.2, color: "#F0EDE6", marginBottom: 24 }}>
                Chaque appel manqué est un client perdu
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "#9C9AAF", marginBottom: 32 }}>
                Les artisans perdent en moyenne 35% de leurs appels entrants. En plein chantier, en conduisant, ou simplement occupé — impossible de répondre à chaque fois.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "35% des appels entrants ne sont jamais décrochés",
                  "Un client sans réponse appelle 2.3 autres artisans en moyenne",
                  "Le temps perdu à rappeler coûte 4h/semaine en moyenne",
                ].map(p => (
                  <div key={p} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <XCircle size={18} style={{ color: "#5A5A6E", marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: "#9C9AAF", lineHeight: 1.6 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#12121A", border: "1px solid #27273A", borderRadius: 16, padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: "clamp(64px, 10vw, 96px)", fontWeight: 700, color: "#D4A853", fontFamily: "monospace", lineHeight: 1 }}>35%</div>
              <p style={{ fontSize: 16, color: "#9C9AAF", marginTop: 12 }}>des appels manqués chaque jour</p>
              <div style={{ marginTop: 32, padding: "20px", background: "#1A1A28", borderRadius: 12, border: "1px solid #27273A" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#D4A853", fontFamily: "monospace" }}>2.3x</div>
                <p style={{ fontSize: 13, color: "#5A5A6E", marginTop: 4 }}>artisans contactés après vous</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SOLUTION */}
      <section style={{ padding: "96px 0", background: "#12121A" }}>
        <div className="container-p">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="font-display" style={{ fontSize: 14, letterSpacing: "0.08em", color: "#D4A853", textTransform: "uppercase", marginBottom: 16 }}>
              La Solution
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, color: "#F0EDE6", marginBottom: 16 }}>
              Votre IA réceptionniste travaille 24h/24
            </h2>
            <p style={{ fontSize: 18, color: "#9C9AAF", maxWidth: 580, margin: "0 auto" }}>
              Elle répond, prend les rendez-vous, qualifie les leads. Vous récupérez chaque opportunité.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { icon: Phone, title: "Répond aux appels", body: "Votre IA décroche en moins de 3 secondes, 24h/24 et 7j/7. Plus jamais de tonalité d'occupée ni de boîte vocale." },
              { icon: CalendarCheck, title: "Qualifie les clients", body: "Elle pose les bonnes questions pour identifier les urgences, le type de travaux. Vous recevez un résumé structuré par SMS." },
              { icon: Target, title: "Vous notifie par SMS", body: "Après chaque appel, vous recevez un SMS avec le nom du client, son problème et sa disponibilité. Rien ne vous échappe." },
            ].map(f => (
              <div key={f.title} className="card-hover" style={{ background: "#12121A", border: "1px solid #27273A", borderRadius: 16, padding: 32 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(212,168,83,0.08)", border: "1px solid #8B7340", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, animation: "pulseGlow 3s ease-in-out infinite" }}>
                  <f.icon size={24} style={{ color: "#D4A853" }} />
                </div>
                <h3 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: "#F0EDE6", marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#9C9AAF" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* TESTIMONIALS */}
      <section style={{ padding: "96px 0", background: "#09090B" }}>
        <div className="container-p">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="font-display" style={{ fontSize: 14, letterSpacing: "0.08em", color: "#D4A853", textTransform: "uppercase", marginBottom: 16 }}>
              Témoignages
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, color: "#F0EDE6" }}>
              Des artisans qui ne ratent plus rien
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 48 }}>
            {testimonials.map(t => (
              <div key={t.author} className="card-hover" style={{ background: "#12121A", border: "1px solid #27273A", borderRadius: 16, padding: 32 }}>
                <span className="font-display" style={{ fontSize: 48, lineHeight: 1, color: "#8B7340", display: "block", marginBottom: 16 }}>&ldquo;</span>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#9C9AAF", marginBottom: 24 }}>{t.quote}</p>
                <div style={{ borderTop: "1px solid #27273A", paddingTop: 16 }}>
                  <p className="font-display" style={{ fontSize: 14, fontWeight: 600, color: "#F0EDE6" }}>{t.author}</p>
                  <p style={{ fontSize: 13, color: "#5A5A6E" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Trust badges */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32 }}>
            {[
              { icon: Wrench, label: "Plombier" },
              { icon: Zap, label: "Électricien" },
              { icon: Hammer, label: "Menuisier" },
              { icon: Key, label: "Serrurier" },
              { icon: Paintbrush, label: "Peintre" },
            ].map(b => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 8, color: "#5A5A6E" }}>
                <b.icon size={16} />
                <span className="font-display" style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PRICING */}
      <section id="tarifs" style={{ padding: "96px 0", background: "#12121A" }}>
        <div className="container-p">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="font-display" style={{ fontSize: 14, letterSpacing: "0.08em", color: "#D4A853", textTransform: "uppercase", marginBottom: 16 }}>
              Tarifs
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, color: "#F0EDE6", marginBottom: 16 }}>
              Un prix clair, sans surprise
            </h2>
            <p style={{ fontSize: 18, color: "#9C9AAF" }}>
              Commencez gratuitement. Évoluez selon votre volume d&apos;appels.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {plans.map(plan => (
              <div key={plan.name} className={plan.featured ? "" : "card-hover"} style={{
                position: "relative", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column",
                background: plan.featured ? "#1A1A28" : "#12121A",
                border: plan.featured ? "1px solid #8B7340" : "1px solid #27273A",
                boxShadow: plan.featured ? "0 0 40px rgba(212,168,83,0.08)" : "none",
                transform: plan.featured ? "translateY(-4px)" : "none",
              }}>
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: -12, right: 16,
                    padding: "4px 12px", borderRadius: 999, fontSize: 10,
                    fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    background: plan.badge.gold ? "#D4A853" : "rgba(251,191,36,0.15)",
                    color: plan.badge.gold ? "#09090B" : "#FBBF24",
                  }}>
                    {plan.badge.text}
                  </div>
                )}
                <h3 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: "#F0EDE6", marginBottom: 8 }}>{plan.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: "clamp(32px, 5vw, 40px)", fontWeight: 700, color: "#D4A853", fontFamily: "monospace" }}>{plan.price}</span>
                  {plan.name !== "Trial" && <span style={{ fontSize: 14, color: "#5A5A6E" }}>/mois</span>}
                </div>
                <p style={{ fontSize: 15, color: "#9C9AAF", marginBottom: 4 }}>{plan.minutes}</p>
                {plan.period && <p style={{ fontSize: 13, color: "#5A5A6E", marginBottom: 16 }}>{plan.period}</p>}
                <div style={{ height: 1, background: "#27273A", margin: "16px 0" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Check size={15} style={{ color: "#34D399", marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: "#9C9AAF" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/artisan/receptionist/pricing"
                  className={plan.featured ? "gold-btn font-display" : "outline-btn font-display"}
                  style={{
                    display: "block", textAlign: "center", padding: plan.featured ? "14px" : "12px",
                    borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none",
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 32, fontSize: 14, color: "#5A5A6E" }}>
            Besoin de plus de minutes ?{" "}
            <Link href="/artisan/receptionist/pricing" style={{ color: "#D4A853", textDecoration: "none" }}>
              Option Pay as you go disponible →
            </Link>
          </p>
        </div>
      </section>


      <div className="divider" />

      {/* FAQ */}
      <section style={{ padding: "96px 0", background: "#09090B" }}>
        <div className="container-p" style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="font-display" style={{ fontSize: 14, letterSpacing: "0.08em", color: "#D4A853", textTransform: "uppercase", marginBottom: 16 }}>
              FAQ
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, color: "#F0EDE6" }}>
              Questions fréquentes
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              {
                q: "Comment ça marche exactement ?",
                a: "Vous activez le renvoi d'appel sur votre téléphone vers notre numéro. Quand vous ne pouvez pas répondre, Marie décroche en moins de 7 secondes, collecte les informations du client et vous envoie un SMS résumé immédiatement."
              },
              {
                q: "Est-ce que mes clients sauront que c'est une IA ?",
                a: "Marie parle de façon naturelle et professionnelle. La grande majorité des clients ne font pas la différence. Elle se présente comme votre assistante — ce qu'elle est réellement."
              },
              {
                q: "Combien de temps pour l'installer ?",
                a: "5 minutes. Vous remplissez votre profil (nom, entreprise, métier), et Marie est opérationnelle. Il suffit ensuite d'activer le renvoi d'appel sur votre téléphone."
              },
              {
                q: "Puis-je annuler à tout moment ?",
                a: "Oui, sans engagement. Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. Aucun frais de résiliation."
              },
              {
                q: "Que se passe-t-il quand mes minutes sont épuisées ?",
                a: "Vous recevez une notification avant d'atteindre la limite. Vous pouvez recharger des minutes à la carte (Pay as you go à 0.65€/min) ou passer à un plan supérieur."
              },
              {
                q: "Est-ce que ça marche avec mon opérateur ?",
                a: "Oui — Orange, SFR, Bouygues, Free et tous les opérateurs français. Le renvoi d'appel est une fonctionnalité standard de votre ligne téléphonique."
              },
              {
                q: "Mes données sont-elles sécurisées ?",
                a: "Oui. Toutes les données sont hébergées en Europe, chiffrées, et ne sont jamais partagées avec des tiers. Nous respectons le RGPD."
              },
            ].map((item, i) => (
              <details key={i} style={{ background: "#12121A", border: "1px solid #27273A", borderRadius: 12, overflow: "hidden" }}>
                <summary style={{ padding: "20px 24px", cursor: "pointer", fontSize: 16, fontWeight: 600, color: "#F0EDE6", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {item.q}
                  <span style={{ color: "#D4A853", fontSize: 20, flexShrink: 0, marginLeft: 16 }}>+</span>
                </summary>
                <div style={{ padding: "0 24px 20px", fontSize: 15, lineHeight: 1.7, color: "#9C9AAF", borderTop: "1px solid #27273A" }}>
                  <p style={{ marginTop: 16 }}>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />
      {/* FINAL CTA */}
      <section style={{ padding: "128px 0", background: "#09090B", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(212,168,83,0.03) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div className="container-p" style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, color: "#F0EDE6", marginBottom: 16 }}>
            Prêt à ne plus manquer un appel ?
          </h2>
          <p style={{ fontSize: 18, color: "#9C9AAF", marginBottom: 40, lineHeight: 1.7 }}>
            Commencez gratuitement pendant 14 jours. Aucune carte bancaire requise.
          </p>
          <Link href="/artisan/receptionist/pricing" className="gold-btn font-display" style={{ padding: "16px 48px", borderRadius: 8, fontSize: 16, textDecoration: "none", display: "inline-block" }}>
            Démarrer mon essai gratuit
          </Link>
          <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 24, fontSize: 12, color: "#5A5A6E", letterSpacing: "0.06em" }}>
            <Clock size={12} style={{ color: "#5A5A6E" }} />
            Mise en place en 5 minutes
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #27273A", padding: "32px 0", background: "#09090B" }}>
        <div className="container-p" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <span className="font-display" style={{ color: "#5A5A6E", fontSize: 14 }}>
            © 2025 PremiumArtisan.fr — Tous droits réservés
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            <Link href="/mentions-legales" style={{ color: "#5A5A6E", fontSize: 13, textDecoration: "none" }}>Mentions légales</Link>
            <Link href="/privacy" style={{ color: "#5A5A6E", fontSize: 13, textDecoration: "none" }}>Confidentialité</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}