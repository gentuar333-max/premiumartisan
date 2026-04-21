// app/page.tsx — SERVER COMPONENT
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import HomeClient from "@/components/HomeClient";
import PALogo from "@/components/PALogo";

// Count-up hook
function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger]);
  return count;
}

function StatCard({ value, suffix, label, trigger }: { value: number; suffix: string; label: string; trigger: boolean }) {
  const count = useCountUp(value, 1.5, trigger);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 42, fontWeight: 900, background: "linear-gradient(90deg, #3B82F6, #22D3EE)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 14, color: "#475569", marginTop: 4 }}>{label}</div>
    </div>
  );
}

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Combien de devis vais-je recevoir ?", acceptedAnswer: { "@type": "Answer", text: "Jusqu'à 3 réponses maximum." } },
    { "@type": "Question", name: "Mon numéro est-il partagé publiquement ?", acceptedAnswer: { "@type": "Answer", text: "Non. Votre demande reste privée." } },
    { "@type": "Question", name: "Le service est-il payant ?", acceptedAnswer: { "@type": "Answer", text: "Non. Publier une demande est gratuit et sans engagement." } },
    { "@type": "Question", name: "Sous quel délai les artisans répondent-ils ?", acceptedAnswer: { "@type": "Answer", text: "Généralement sous 24h selon la disponibilité des artisans dans votre zone." } },
  ],
});

const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 2,
  left: Math.random() * 100,
  delay: Math.random() * 20,
  duration: 15 + Math.random() * 10,
  opacity: 0.2 + Math.random() * 0.2,
}));

export default function Page() {
  const [animated, setAnimated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsTrigger, setStatsTrigger] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsTrigger(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", background: "#0B1120", overflowX: "hidden" }}>
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: rotate(15deg) translateY(0px); }
          50% { transform: rotate(15deg) translateY(-20px); }
        }
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-30px) scale(1.05); }
          66% { transform: translate(-20px,20px) scale(0.95); }
        }
        .gradient-text { background: linear-gradient(90deg,#3B82F6,#22D3EE); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .hero-gradient { background: linear-gradient(135deg,#0B1120 0%,#0F172A 40%,#1E3A5F 70%,#0B1120 100%); }
        .card-gradient { background: linear-gradient(180deg,rgba(30,41,59,0.8) 0%,rgba(15,23,42,0.95) 100%); }
        details summary::-webkit-details-marker { display:none; }
        details summary { list-style:none; }
        .nav-link:hover { color: #fff !important; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(11,17,32,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(51,65,85,0.3)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          {/* Logo petit */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, background: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, transform: "rotate(45deg)", flexShrink: 0 }}>
              <span style={{ transform: "rotate(-45deg)", display: "block", fontSize: 14 }}>⚒</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: 1, lineHeight: 1 }}>PREMIUM ARTISAN</span>
              <span style={{ fontSize: 8, letterSpacing: "0.15em", color: "#94A3B8", textTransform: "uppercase" }}>MARKETPLACE</span>
            </div>
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, flex: 1, justifyContent: "center" }} className="hidden-mobile">
            {[
              { label: "Comment ça marche", href: "/comment-ca-marche" },
              { label: "Pourquoi nous ?", href: "#why" },
              { label: "Témoignages", href: "#testimonials" },
              { label: "IA Réceptionniste", href: "/artisan/receptionist" },
              { label: "FAQ", href: "/faq" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="nav-link" style={{ color: "rgba(234,240,255,0.75)", fontSize: 14, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.2s" }}>
                {label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <Link href="/publier-projet/form" style={{ background: "linear-gradient(90deg,#3B82F6,#22D3EE)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 999, textDecoration: "none", whiteSpace: "nowrap" }} className="hidden-mobile">
              Publier mon projet
            </Link>
            {/* Burger 3 lignes */}
            <button onClick={() => setMenuOpen(o => !o)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 8 }} aria-label="Menu">
              <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2 }} />
              <span style={{ display: "block", width: 16, height: 2, background: "#fff", borderRadius: 2 }} />
              <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2 }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#0F172A", borderTop: "1px solid #334155", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Comment ça marche", href: "/comment-ca-marche" },
              { label: "Pourquoi nous ?", href: "#why" },
              { label: "Témoignages", href: "#testimonials" },
              { label: "IA Réceptionniste", href: "/artisan/receptionist" },
              { label: "FAQ", href: "/faq" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ color: "#94A3B8", fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
                {label}
              </Link>
            ))}
            <Link href="/publier-projet/form" style={{ background: "linear-gradient(90deg,#3B82F6,#22D3EE)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 999, textDecoration: "none", textAlign: "center", marginTop: 8 }}>
              Publier mon projet
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="hero-gradient" style={{ position: "relative", minHeight: "100dvh", overflow: "hidden", color: "#EAF0FF" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.05) 0%,transparent 70%)", top: "-10%", left: "-10%", animation: "gradient-shift 20s ease infinite" }} />
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(34,211,238,0.05) 0%,transparent 70%)", bottom: "10%", right: "-5%", animation: "gradient-shift 25s ease infinite reverse" }} />
        </div>
        {floatingParticles.map(p => (
          <div key={p.id} style={{ position: "absolute", width: p.size, height: p.size, borderRadius: "50%", background: "#22D3EE", left: `${p.left}%`, bottom: -10, opacity: p.opacity, animation: `float-up ${p.duration}s linear ${p.delay}s infinite`, pointerEvents: "none" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03, backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "140px 24px 80px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48 }}>
          <div style={{ flex: "1 1 480px", maxWidth: 640 }}>
            <div style={{ display: "inline-flex", alignItems: "center", padding: "8px 16px", borderRadius: 999, border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "#22D3EE", marginBottom: 32, textTransform: "uppercase", opacity: animated ? 1 : 0, transform: animated ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s" }}>
              PremiumArtisan • Dijon & Côte-d&apos;Or
            </div>
            <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24, color: "#fff" }}>
              {["Trouvez","un","artisan"].map((w, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: "0.25em", opacity: animated ? 1 : 0, transform: animated ? "translateY(0)" : "translateY(60px)", transition: `all 0.7s ${0.1 + i * 0.08}s` }}>{w}</span>
              ))}
              <span className="gradient-text" style={{ display: "inline-block", marginRight: "0.25em", opacity: animated ? 1 : 0, transform: animated ? "translateY(0)" : "translateY(60px)", transition: "all 0.7s 0.34s", textShadow: "0 0 40px rgba(34,211,238,0.3)" }}>fiable</span>
              <span style={{ display: "inline-block", opacity: animated ? 1 : 0, transform: animated ? "translateY(0)" : "translateY(60px)", transition: "all 0.7s 0.42s" }}>près de chez vous.</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: "#94A3B8", marginBottom: 32, maxWidth: 520, opacity: animated ? 1 : 0, transform: animated ? "translateY(0)" : "translateY(40px)", transition: "all 0.7s 0.6s" }}>
              Gratuit, sans engagement. Nous transmettons votre demande à des artisans de votre zone. Vous recevez jusqu&apos;à <strong style={{ color: "#fff" }}>3 réponses maximum</strong>.
            </p>
            <div style={{ opacity: animated ? 1 : 0, transition: "all 0.7s 0.9s" }}>
              <HomeClient />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24, opacity: animated ? 1 : 0, transition: "all 0.7s 1.1s" }}>
              {["Réponse sous 24h","Projet privé","Sans spam","3 artisans maximum"].map(t => (
                <div key={t} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", fontSize: 12, fontWeight: 700, color: "rgba(234,240,255,0.85)" }}>{t}</div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 16, opacity: animated ? 1 : 0, transition: "all 0.7s 1.3s" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#94A3B8" }}>Devis locaux :</span>
              <Link href="/devis-peintre/dijon" style={{ fontSize: 12, fontWeight: 700, color: "#60A5FA", textDecoration: "underline" }}>Peinture Dijon</Link>
              <Link href="/devis-peintre/chenove" style={{ fontSize: 12, fontWeight: 700, color: "#60A5FA", textDecoration: "underline" }}>Peinture Chenôve</Link>
              <Link href="/devis-renovation-dijon" style={{ fontSize: 12, fontWeight: 700, color: "#60A5FA", textDecoration: "underline" }}>Rénovation Dijon</Link>
            </div>
          </div>

          {/* Right geometric */}
          <div style={{ flex: "0 0 360px", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle at center,rgba(59,130,246,0.15) 0%,transparent 60%)" }} />
            <div style={{ position: "relative", width: 350, height: 350, borderRadius: 40, background: "linear-gradient(135deg,rgba(59,130,246,0.08) 0%,rgba(34,211,238,0.08) 100%)", border: "1px solid rgba(59,130,246,0.15)", animation: "float 6s ease-in-out infinite" }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 180, height: 180, borderRadius: "50%", background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.12)" }} />
              <div style={{ position: "absolute", top: 24, right: 24, width: 12, height: 12, borderRadius: "50%", background: "#22D3EE", opacity: 0.4 }} />
              <div style={{ position: "absolute", bottom: 32, left: 32, width: 8, height: 8, borderRadius: "50%", background: "#3B82F6", opacity: 0.3 }} />
              <div style={{ position: "absolute", top: "33%", left: 16, width: 8, height: 8, borderRadius: "50%", background: "#60A5FA", opacity: 0.2 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{ background: "#F8FAFC", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 32 }}>
          <StatCard value={500} suffix="+" label="Projets réussis" trigger={statsTrigger} />
          <StatCard value={3} suffix="" label="Artisans maximum par demande" trigger={statsTrigger} />
          <StatCard value={24} suffix="h" label="Délai de réponse moyen" trigger={statsTrigger} />
          <StatCard value={100} suffix="%" label="Gratuit pour les particuliers" trigger={statsTrigger} />
        </div>
      </section>

      {/* ── POURQUOI ── */}
      <section id="why" style={{ background: "linear-gradient(180deg,#F8FAFC 0%,#0F172A 30%)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#60A5FA", textTransform: "uppercase" }}>NOS AVANTAGES</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff", marginTop: 12 }}>Pourquoi choisir <span className="gradient-text">PremiumArtisan</span> ?</h2>
            <p style={{ fontSize: 18, color: "#94A3B8", marginTop: 12 }}>Une approche simple, locale et efficace pour trouver le bon artisan.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {[
              { title: "Sans spam", text: "Votre demande est envoyée uniquement à des artisans pertinents selon votre zone, le type de peinture et vos délais." },
              { title: "3 artisans maximum", text: "Volume maîtrisé pour éviter les appels inutiles et garder des devis comparables. Qualité avant quantité." },
              { title: "Projet privé", text: "Les projets restent privés : votre numéro n'est pas diffusé publiquement. Votre tranquillité d'abord." },
              { title: "Réponse sous 24h", text: "Nos artisans répondent généralement sous 24 heures selon leur disponibilité." },
              { title: "Local Dijon & Côte-d'Or", text: "Service focalisé sur le local pour de meilleurs délais, un meilleur matching et des artisans qui connaissent votre secteur." },
              { title: "Sérieux & sélection", text: "Des profils adaptés à votre besoin précis : peinture intérieure, extérieure, plafonds, rénovation complète." },
            ].map(({ title, text }) => (
              <div key={title} className="card-gradient" style={{ border: "1px solid rgba(51,65,85,0.4)", borderRadius: 20, padding: 32 }}>
                <h4 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{title}</h4>
                <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IA RECEPTIONNISTE ── */}
      <section style={{ background: "#0B1120", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", gap: 8, alignItems: "center", padding: "8px 16px", borderRadius: 999, border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.1)", fontSize: 12, fontWeight: 700, color: "#22D3EE", marginBottom: 24, textTransform: "uppercase" }}>
              NOUVEAU • <span style={{ color: "#94A3B8" }}>POUR LES ARTISANS</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.1 }}>
              <span className="gradient-text">IA Réceptionniste</span> : votre assistant vocal qui répond à votre place
            </h2>
            <p style={{ fontSize: 17, color: "#94A3B8", lineHeight: 1.6, marginBottom: 32 }}>
              Un service d&apos;accueil téléphonique par intelligence artificielle, conçu spécialement pour les artisans en France. Ne perdez plus aucun appel, même en pleins travaux.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {[
                { title: "Réponse vocale 24h/7j", text: "L'IA répond à vos appels en temps réel avec une voix naturelle." },
                { title: "Qualification automatique", text: "Elle identifie les prospects sérieux et vous transmet un résumé structuré." },
                { title: "+60% de conversions", text: "Ne ratez plus aucun appel. Captez 100% des opportunités." },
              ].map(({ title, text }) => (
                <div key={title} style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22D3EE", flexShrink: 0, marginTop: 8 }} />
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{title}</div>
                    <div style={{ fontSize: 14, color: "#94A3B8", marginTop: 4, lineHeight: 1.5 }}>{text}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/artisan/receptionist" style={{ display: "inline-block", background: "linear-gradient(90deg,#3B82F6,#22D3EE)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 999, textDecoration: "none" }}>
              Découvrir IA Réceptionniste →
            </Link>
          </div>
          <div style={{ position: "relative", height: 380, borderRadius: 24, overflow: "hidden", border: "1px solid rgba(51,65,85,0.3)" }}>
            <Image src="/landing-static/ai-receptionist.jpg" alt="IA Réceptionniste" fill sizes="50vw" quality={90} style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ background: "#0F172A", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#22D3EE", textTransform: "uppercase" }}>TÉMOIGNAGES</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff", marginTop: 12 }}>
              Ils nous font confiance à <span className="gradient-text">Dijon & Côte-d&apos;Or</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {[
              { avatar: "/landing-static/avatar-karima.jpg", name: "Karima O.", location: "Chenôve · douche italienne", text: "Baignoire fonte des années 70 remplacée par une douche à l'italienne. David a géré tout ça en 9 jours. 6 200€ tout compris. Notre bailleur a validé les travaux sans aucun problème.", stars: 5 },
              { avatar: "/landing-static/avatar-patrick.jpg", name: "Patrick G.", location: "Chenôve · remise en état locative", text: "Entre deux locataires, Nadia a refait la salle de bain en 4 jours. Carrelage par-dessus, nouvelle robinetterie, joints refaits. 2 400€. Le nouveau locataire a commenté la propreté spontanément.", stars: 5 },
              { avatar: "/landing-static/avatar-martine.jpg", name: "Martine L.", location: "Chenôve · PMR · MaPrimeAdapt'", text: "Sofiane a transformé ma salle de bain en douche PMR à 72 ans. Il a géré le dossier MaPrimeAdapt' avec moi. Sur 7 800€ de travaux, j'ai obtenu 5 460€ d'aides.", stars: 5 },
            ].map(({ avatar, name, location, text, stars }) => (
              <div key={name} style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 20, padding: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #22D3EE", position: "relative" }}>
                    <Image src={avatar} alt={name} fill sizes="56px" style={{ objectFit: "cover" }} />
                  </div>
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
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#2563EB", textTransform: "uppercase" }}>COMMENT ÇA MARCHE</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#0F172A", marginTop: 12 }}>3 étapes pour trouver votre artisan</h2>
            <p style={{ fontSize: 18, color: "#475569", marginTop: 12 }}>Simple, rapide et sans engagement.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginBottom: 48 }}>
            {[
              { num: "1", title: "Vous publiez", text: "Décrivez votre projet en 1 minute. Type de travaux, surface, délais. Gratuit et sans engagement.", img: "/landing-static/step-publish.jpg" },
              { num: "2", title: "On transmet", text: "Votre demande est envoyée à des artisans pertinents dans votre zone selon votre type de besoin.", img: "/landing-static/step-connect.jpg" },
              { num: "3", title: "Vous choisissez", text: "Vous comparez les réponses et décidez en toute liberté. Jusqu'à 3 devis comparables.", img: "/landing-static/step-choose.jpg" },
            ].map(({ num, title, text, img }) => (
              <div key={num} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 20, overflow: "hidden" }}>
                <div style={{ position: "relative", height: 200 }}>
                  <Image src={img} alt={title} fill sizes="33vw" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: 24, textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(90deg,#3B82F6,#22D3EE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 auto 16px" }}>{num}</div>
                  <h4 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{title}</h4>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/comment-ca-marche" style={{ fontSize: 14, fontWeight: 700, color: "#2563EB", textDecoration: "underline" }}>En savoir plus →</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#F7F8FB", padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#2563EB", textTransform: "uppercase" }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#0F172A", marginTop: 12 }}>Questions fréquentes</h2>
            <p style={{ fontSize: 18, color: "#475569", marginTop: 12 }}>Tout ce que vous devez savoir avant de publier votre projet.</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden" }}>
            {[
              { q: "Combien de devis vais-je recevoir ?", a: "Jusqu'à 3 réponses maximum, pour éviter la surcharge et rester efficace." },
              { q: "Mon numéro est-il partagé publiquement ?", a: "Non. Votre demande reste privée et transmise uniquement à des artisans pertinents." },
              { q: "Le service est-il payant ?", a: "Non. Publier une demande est gratuit et sans engagement pour les particuliers." },
              { q: "Sous quel délai les artisans répondent-ils ?", a: "Généralement sous 24h selon la disponibilité des artisans dans votre zone." },
              { q: "Puis-je demander peinture intérieure et plafonds ?", a: "Oui, vous pouvez préciser le type de projet et les détails dans le formulaire." },
            ].map((x, i, arr) => (
              <details key={x.q} style={{ borderBottom: i < arr.length - 1 ? "1px solid #E2E8F0" : "none" }}>
                <summary style={{ padding: "20px 24px", cursor: "pointer", fontWeight: 700, color: "#0F172A", fontSize: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {x.q}
                  <span style={{ color: "#2563EB", fontSize: 20, fontWeight: 400, flexShrink: 0, marginLeft: 12 }}>+</span>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32 }}>
            {[
              { label: "Devis peinture", links: [{ label: "Peinture Dijon", href: "/devis-peintre/dijon" }, { label: "Peinture Chenôve", href: "/devis-peintre/chenove" }, { label: "Peinture Longvic", href: "/devis-peintre/longvic" }, { label: "Peinture Talant", href: "/devis-peintre/talant" }, { label: "Peinture Quetigny", href: "/devis-peintre/quetigny" }, { label: "Peinture Fontaine-lès-Dijon", href: "/devis-peintre/fontaine-les-dijon" }] },
              { label: "Devis rénovation", links: [{ label: "Rénovation Dijon", href: "/devis-renovation-dijon" }, { label: "Rénovation Chenôve", href: "/devis-renovation-chenove" }, { label: "Rénovation Longvic", href: "/devis-renovation-longvic" }, { label: "Rénovation Talant", href: "/devis-renovation-talant" }, { label: "Rénovation Quetigny", href: "/devis-renovation-quetigny" }, { label: "Rénovation Fontaine-lès-Dijon", href: "/devis-renovation-fontaine-les-dijon" }] },
              { label: "Cuisine & Salle de bain", links: [{ label: "Cuisine Dijon", href: "/devis-cuisine/dijon" }, { label: "Cuisine Chenôve", href: "/devis-cuisine/chenove" }, { label: "Salle de bain Dijon", href: "/devis-salle-de-bain-dijon" }, { label: "Salle de bain Chenôve", href: "/devis-salle-de-bain-chenove" }] },
              { label: "Outils artisans", links: [{ label: "Trouver clients Dijon", href: "/trouver-clients-peintre-dijon" }, { label: "Logiciel devis artisan", href: "/logiciel-devis-artisan/dijon" }, { label: "Devis gratuit peintre", href: "/devis-gratuit-peintre-dijon" }] },
            ].map(({ label, links }) => (
              <div key={label}>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: "#0F172A", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {links.map(({ label: lbl, href }) => (
                    <Link key={href} href={href} style={{ fontSize: 14, color: "#2563EB", textDecoration: "none", lineHeight: 1.8 }}>{lbl}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(90deg,#3B82F6 0%,#22D3EE 100%)", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16, color: "#fff" }}>
            Prêt à démarrer votre projet ?
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.9)", marginBottom: 32, lineHeight: 1.6 }}>
            Publiez votre projet en 2 minutes et recevez jusqu&apos;à 3 devis d&apos;artisans qualifiés de votre secteur.
          </p>
          <Link href="/publier-projet/form" style={{ display: "inline-block", padding: "16px 40px", borderRadius: 999, background: "#fff", color: "#2563EB", fontWeight: 900, fontSize: 17, textDecoration: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}>
            Publier mon projet gratuitement →
          </Link>
          <div style={{ marginTop: 20, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
            Déjà artisan ?{" "}
            <Link href="/artisan/dashboard" style={{ color: "#fff", textDecoration: "underline", fontWeight: 700 }}>
              Accéder au tableau de bord
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0F0A0C", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, background: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, transform: "rotate(45deg)" }}>
                <span style={{ transform: "rotate(-45deg)", display: "block", fontSize: 14 }}>⚒</span>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>PREMIUM ARTISAN</div>
                <div style={{ fontSize: 8, letterSpacing: "0.15em", color: "#94A3B8", textTransform: "uppercase" }}>MARKETPLACE</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, maxWidth: 240 }}>
              La plateforme qui connecte particuliers et artisans peintres à Dijon & Côte-d&apos;Or.
            </p>
          </div>
          {[
            { title: "Particuliers", links: [{ label: "Publier un projet", href: "/publier-projet/form" }, { label: "Comment ça marche", href: "/comment-ca-marche" }, { label: "FAQ", href: "/faq" }] },
            { title: "Artisans", links: [{ label: "Espace artisan", href: "/artisan/dashboard" }, { label: "Créer un devis", href: "/artisan/devis/new" }, { label: "Créer une facture", href: "/artisan/factures/new" }, { label: "IA Réceptionniste", href: "/artisan/receptionist" }] },
            { title: "À propos", links: [{ label: "Notre histoire", href: "/about" }, { label: "Contact", href: "/contact" }] },
            { title: "Légal", links: [{ label: "Mentions légales", href: "/mentions-legales" }, { label: "Confidentialité", href: "/privacy" }, { label: "CGU", href: "/terms" }] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>{title}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {links.map(({ label, href }) => (
                  <Link key={href} href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", fontWeight: 500 }}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1100, margin: "32px auto 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
          © 2026 PremiumArtisan · Dijon, Côte-d&apos;Or (21)
        </div>
      </footer>

    </main>
  );
}