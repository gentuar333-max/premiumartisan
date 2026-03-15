// Quetigny component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix de la peinture intérieure à Quetigny en 2026 ?", a: "Le prix moyen à Quetigny est de 28 à 43€/m², légèrement supérieur à Chenôve mais comparable à Dijon centre. Cette différence s'explique par la forte proportion de maisons individuelles récentes (années 1990–2010) qui demandent des finitions soignées. Pour une maison de 100m², comptez entre 2 800€ et 4 800€." },
  { q: "Quetigny est-elle une commune avec beaucoup de travaux de peinture ?", a: "Oui. Quetigny est l'une des communes les plus dynamiques de Dijon Métropole en matière de rénovation. Sa population jeune (âge médian 34 ans) et son fort taux de propriétaires (62%) génèrent une demande soutenue. Notre plateforme a enregistré 87 projets publiés à Quetigny en 2025–2026, en hausse de 22% vs l'année précédente." },
  { q: "Quels types de logements trouve-t-on à Quetigny ?", a: "Quetigny se distingue par un parc immobilier récent et varié : 45% de maisons individuelles construites après 1990, 30% d'appartements en résidence fermée, 25% de logements collectifs plus anciens. Les maisons récentes nécessitent souvent des finitions haut de gamme, ce qui explique la forte demande en peinture décorative et béton ciré." },
  { q: "Les artisans de Quetigny interviennent-ils rapidement ?", a: "Oui. Avec 7 artisans actifs et une commune bien desservie (proche de la rocade de Dijon), les délais sont courts. Vous recevez vos premiers devis en 3 à 5h sur PremiumArtisan. Le délai moyen de démarrage chantier est de 1 à 2 semaines." },
  { q: "Y a-t-il des artisans spécialisés en peinture décorative à Quetigny ?", a: "Oui. La demande en peinture décorative (béton ciré, stuc, tadelakt) est particulièrement forte à Quetigny en raison du profil CSP+ de la population. 2 artisans de notre réseau sont spécialisés dans ces techniques et interviennent régulièrement dans les maisons du secteur." },
  { q: "Comment fonctionne PremiumArtisan pour les habitants de Quetigny ?", a: "Vous publiez votre projet en 2 minutes sur notre plateforme (type de travaux, surface, budget). Jusqu'à 4 artisans vérifiés de Quetigny et alentours vous contactent dans les 3 à 5h avec un devis détaillé. Vous comparez et choisissez librement. C'est 100% gratuit et sans engagement." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[1.5px] border-[#d0e8e4] py-5">
      <div className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[#0a2a28]" onClick={() => setOpen(!open)}>
        <span className="text-base">{question}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="mt-3 text-sm leading-relaxed text-[#4a6a68]">{answer}</div>}
    </div>
  );
}

export default function DevisPeintureQuetigny() {
  return (
    <main className="min-h-screen" style={{ background: "#f2faf9" }}>

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#0a2a28] px-8 py-4">
        <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#2dd4bf]">Artisan</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/70 hover:text-white">Accueil</Link>
          <Link href="/devis-peinture-interieure-dijon" className="text-sm text-white/70 hover:text-white">Dijon</Link>
          <Link href="#prix" className="text-sm text-white/70 hover:text-white">Prix</Link>
          <Link href="#artisans" className="text-sm text-white/70 hover:text-white">Artisans</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-8 pb-16 pt-20" style={{ background: "linear-gradient(135deg, #0a2a28 0%, #0a4a44 60%, #0a3a34 100%)" }}>
        <div className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2dd4bf]/40 bg-[#2dd4bf]/20 px-3.5 py-1.5 text-[13px] font-semibold text-[#5eead4]">
            📍 Quetigny 21800 — Données 2026
          </div>

          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl" style={{ fontFamily: "serif" }}>
            Peinture Intérieure<br />à <em className="not-italic text-[#5eead4]">Quetigny</em> — Prix<br />& Devis Gratuit 2026
          </h1>

          <p className="mb-10 max-w-[600px] text-lg text-white/75">
            Comparez jusqu'à 4 artisans peintres vérifiés à Quetigny. Prix moyen constaté : <strong className="text-white">28–43€/m²</strong>. 87 projets analysés · Réponse en 3 à 5h.
          </p>

          <div className="mb-12 flex flex-wrap gap-4">
            {[
              { value: "⭐ 4.9/5", label: "Avis clients" },
              { value: "7", label: "Peintres à Quetigny" },
              { value: "3–5h", label: "Réponse moyenne" },
              { value: "Max 4", label: "Artisans (anti-spam)" },
              { value: "100%", label: "Gratuit & sans engagement" },
            ].map((b, i) => (
              <div key={i} className="min-w-[130px] rounded-xl border border-white/15 bg-white/[0.08] px-5 py-4 text-center">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "serif" }}>{b.value}</div>
                <div className="mt-0.5 text-xs text-white/60">{b.label}</div>
              </div>
            ))}
          </div>

          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#0d9488] px-10 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(13,148,136,0.4)] transition hover:scale-105 hover:bg-[#14b8a6]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Réponse en 3–5h</p>
        </div>
      </section>

      {/* STAT BAR — unique à Quetigny */}
      <section className="bg-[#0d9488] px-8 py-6">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-wrap justify-between gap-4 text-center">
            {[
              { value: "87", label: "Projets publiés 2025–2026" },
              { value: "+22%", label: "Croissance vs 2024" },
              { value: "62%", label: "Taux propriétaires" },
              { value: "34 ans", label: "Âge médian habitants" },
              { value: "4.9/5", label: "Satisfaction moyenne" },
            ].map((s, i) => (
              <div key={i} className="text-white">
                <div className="text-2xl font-bold" style={{ fontFamily: "serif" }}>{s.value}</div>
                <div className="text-xs text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Pourquoi nous choisir</div>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-[#0a2a28] md:text-4xl" style={{ fontFamily: "serif" }}>
            La plateforme n°1 peinture<br />à Quetigny
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { icon: "🔍", title: "Artisans vérifiés", desc: "SIRET + RC Pro + avis clients — 3 niveaux de vérification" },
              { icon: "🏡", title: "Spécialistes maisons", desc: "2 artisans spécialisés en finitions haut de gamme pour pavillons récents" },
              { icon: "⚡", title: "Réponse 3–5h", desc: "Délai moyen constaté sur 87 projets publiés à Quetigny" },
              { icon: "🎨", title: "Peinture décorative", desc: "Béton ciré, stuc, tadelakt — artisans formés disponibles à Quetigny" },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#d0e8e4] p-6 text-center">
                <div className="mb-3 text-[36px]">{f.icon}</div>
                <div className="mb-2 text-base font-bold text-[#0a2a28]">{f.title}</div>
                <div className="text-[13px] text-[#4a6a68]">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="px-8 py-20" style={{ background: "#f2faf9" }} id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Prix réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#0a2a28] md:text-5xl" style={{ fontFamily: "serif" }}>
            Combien coûte la peinture<br />intérieure à Quetigny ?
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#4a6a68]">
            Analyse de 87 projets publiés à Quetigny entre janvier 2025 et mars 2026. La commune présente les prix les plus stables de la métropole dijonnaise grâce à une concurrence saine entre artisans locaux.
          </p>
          <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { label: "Peinture murale standard", price: "28–40€", details: ["Main d'œuvre: 16–20€/m²", "Fournitures: 8–12€/m²", "Préparation: 4–8€/m²"], featured: false },
              { label: "Finitions haut de gamme ⭐", price: "35–55€", details: ["Peinture premium A+", "Application 3 couches", "Garantie résultat incluse"], featured: true },
              { label: "Rénovation complète", price: "34–54€", details: ["Murs + plafonds + boiseries", "Enduit lissé inclus", "Protection mobilier incluse"], featured: false },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-2 p-6 transition hover:-translate-y-1 ${c.featured ? "border-[#0d9488]" : "border-[#d0e8e4] hover:border-[#0d9488]"}`} style={c.featured ? { background: "linear-gradient(135deg, #f0fffe, white)" } : {}}>
                <div className="mb-2 text-[13px] font-semibold text-[#4a6a68]">{c.label}</div>
                <div className="text-[32px] font-bold text-[#0a2a28]" style={{ fontFamily: "serif" }}>{c.price}</div>
                <div className="text-sm text-[#4a6a68]">par m²</div>
                <div className="mt-4 space-y-1 text-[13px] text-[#4a6a68]">
                  {c.details.map((d, j) => <div key={j} className={j < 2 ? "border-b border-[#d0e8e4] py-1" : "py-1"}>{d}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0a2a28] text-white">
                  <th className="rounded-tl-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Type de bien</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Peinture standard</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Finitions premium</th>
                  <th className="rounded-tr-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Délai chantier</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surf: "Appartement 50m²", s: "1 150€ – 1 900€", r: "1 900€ – 3 100€", d: "3–4 jours" },
                  { surf: "Maison 80m²", s: "2 000€ – 3 300€", r: "3 300€ – 5 200€", d: "5–7 jours" },
                  { surf: "Maison 110m²", s: "2 800€ – 4 500€", r: "4 500€ – 7 200€", d: "7–9 jours" },
                  { surf: "Maison 140m²", s: "3 600€ – 5 800€", r: "5 800€ – 9 200€", d: "9–12 jours" },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-white">
                    <td className="border-b border-[#d0e8e4] px-4 py-3.5 text-sm">{r.surf}</td>
                    <td className="border-b border-[#d0e8e4] px-4 py-3.5 text-sm font-bold text-[#0d9488]" style={{ fontFamily: "serif" }}>{r.s}</td>
                    <td className="border-b border-[#d0e8e4] px-4 py-3.5 text-sm font-bold text-[#0d9488]" style={{ fontFamily: "serif" }}>{r.r}</td>
                    <td className="border-b border-[#d0e8e4] px-4 py-3.5 text-sm">{r.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DELAIS */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Délais moyens</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#0a2a28] md:text-5xl" style={{ fontFamily: "serif" }}>
            Trouver un peintre<br />à Quetigny rapidement
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#4a6a68]">
            Quetigny bénéficie d'une position stratégique à l'est de Dijon, directement accessible depuis la rocade A38. Cette accessibilité réduit les temps de déplacement des artisans et accélère les délais d'intervention.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", time: "3–5h", label: "Premiers devis reçus" },
              { icon: "📅", time: "1–2 sem.", label: "Délai démarrage chantier" },
              { icon: "🎨", time: "3–9 j.", label: "Durée chantier moyenne" },
              { icon: "✅", time: "4.9/5", label: "Satisfaction clients Quetigny" },
            ].map((d, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#d0e8e4] bg-[#f2faf9] p-6 text-center">
                <div className="mb-3 text-[32px]">{d.icon}</div>
                <div className="text-[28px] font-bold text-[#0a2a28]" style={{ fontFamily: "serif" }}>{d.time}</div>
                <div className="mt-1 text-[13px] text-[#4a6a68]">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISANS */}
      <section className="px-8 py-20" style={{ background: "#f2faf9" }} id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#0a2a28] md:text-5xl" style={{ fontFamily: "serif" }}>
            Artisans peintres vérifiés<br />à Quetigny
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#4a6a68]">Spécialistes des maisons récentes et finitions haut de gamme — chaque artisan est contrôlé avant intégration au réseau.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { initials: "GL", name: "Guillaume L.", spec: "Finitions premium & peinture décorative", exp: "18 ans d'expérience", zone: "Quetigny · Dijon Est · Neuilly-lès-Dijon", note: "5.0/5", chantiers: "134 chantiers" },
              { initials: "BM", name: "Baptiste M.", spec: "Béton ciré · Stuc · Tadelakt", exp: "13 ans d'expérience", zone: "Quetigny · Saint-Apollinaire · Chevigny", note: "4.9/5", chantiers: "88 chantiers" },
              { initials: "CT", name: "Christophe T.", spec: "Rénovation complète maisons récentes", exp: "9 ans d'expérience", zone: "Quetigny · Longvic · Dijon", note: "4.8/5", chantiers: "57 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#d0e8e4] bg-white p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #0a2a28, #0a5a54)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#0a2a28]">{a.name}</div>
                    <div className="text-xs text-[#0d9488]">{a.note} · {a.chantiers}</div>
                  </div>
                </div>
                <div className="mb-2 text-[13px] font-semibold text-[#0a2a28]">{a.spec}</div>
                <div className="mb-1 text-xs text-[#4a6a68]">📅 {a.exp}</div>
                <div className="text-xs text-[#4a6a68]">📍 {a.zone}</div>
                <a href="/publier-projet" className="mt-4 block rounded-xl bg-[#0d9488] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#14b8a6]">
                  Demander un devis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANT APRES */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Galerie</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#0a2a28] md:text-5xl" style={{ fontFamily: "serif" }}>
            Avant / Après — Chantiers<br />réalisés à Quetigny
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#4a6a68]">Projets réels réalisés dans les maisons et appartements de Quetigny en 2025–2026.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { title: "Maison récente — Allée des Chênes", detail: "Béton ciré cuisine + peinture · 95m²", price: "Budget: 4 200€ · Délai: 8 jours" },
              { title: "Appartement — Résidence Le Parc", detail: "Rénovation complète · 68m²", price: "Budget: 2 450€ · Délai: 5 jours" },
              { title: "Maison — Secteur pavillonnaire nord", detail: "Peinture haut de gamme murs + boiseries · 112m²", price: "Budget: 5 100€ · Délai: 10 jours" },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border-[1.5px] border-[#d0e8e4]">
                <div className="grid h-[180px] grid-cols-2">
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#8a7a6a] to-[#6a5a4a] text-[40px]">
                    🏚️<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">AVANT</span>
                  </div>
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#ccfbf1] to-[#f0fffe] text-[40px]">
                    🏠<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">APRÈS</span>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="mb-1 text-sm font-bold text-[#0a2a28]">{item.title}</div>
                  <div className="text-xs text-[#4a6a68]">{item.detail}</div>
                  <div className="mt-1.5 text-[13px] font-bold text-[#0d9488]">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="px-8 py-20" style={{ background: "#f2faf9" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Avis clients vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a2a28] md:text-5xl" style={{ fontFamily: "serif" }}>
            Ce que disent nos clients<br />à Quetigny
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Alexandra R.", loc: "Quetigny · Maison 105m²", text: "Guillaume a réalisé un béton ciré dans ma cuisine et une peinture mate haut de gamme dans le salon. Le résultat est bluffant. Mes amis pensent que c'est une maison de magazine. Investissement totalement justifié.", avatar: "AR" },
              { name: "Olivier S.", loc: "Quetigny · Appartement 72m²", text: "Très bonne expérience. J'ai reçu 4 devis en 4h. Écart de 900€ entre le moins cher et le plus cher ! J'ai choisi le meilleur rapport qualité/prix. Résultat parfait, délai respecté.", avatar: "OS" },
              { name: "Muriel V.", loc: "Quetigny · Maison 120m²", text: "Maison entièrement rénovée avant mise en vente. Christophe a su conseiller les bonnes couleurs tendance. Maison vendue en 3 semaines au prix demandé. La peinture a fait toute la différence.", avatar: "MV" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#d0e8e4] bg-white p-6">
                <div className="mb-3 text-base text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <div className="mb-4 text-sm italic leading-relaxed text-[#4a6a68]">"{t.text}"</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #0a2a28, #0a5a54)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#0a2a28]">{t.name}</div>
                    <div className="text-xs text-[#4a6a68]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HYPERLOCAL */}
      <section className="px-8 py-20" style={{ background: "#0a2a28" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5eead4]">Communes voisines</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Artisans peintres près<br />de Quetigny
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-white/60">Nos artisans couvrent tout le secteur est de Dijon et les communes de la couronne.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", code: "21000", artisans: "18", prix: "32–45€/m²", delai: "2–4h" },
              { name: "Saint-Apollinaire", code: "21850", artisans: "5", prix: "29–44€/m²", delai: "3–5h" },
              { name: "Chevigny-Saint-Sauveur", code: "21800", artisans: "4", prix: "27–42€/m²", delai: "4–6h" },
              { name: "Neuilly-lès-Dijon", code: "21110", artisans: "3", prix: "28–43€/m²", delai: "4–6h" },
              { name: "Longvic", code: "21600", artisans: "8", prix: "27–41€/m²", delai: "4–6h" },
              { name: "Chenôve", code: "21300", artisans: "12", prix: "26–40€/m²", delai: "3–6h" },
            ].map((q, i) => (
              <div key={i} className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-[#5eead4] hover:bg-white/10">
                <div className="mb-1 text-lg font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="mb-3 text-xs text-white/40">{q.code}</div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Artisans actifs</span><span className="font-bold text-[#5eead4]">{q.artisans}</span></div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Prix moyen</span><span className="font-bold text-[#5eead4]">{q.prix}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-white/50">Délai réponse</span><span className="font-bold text-[#5eead4]">{q.delai}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES TRAVAUX */}
      <section className="px-8 py-20" style={{ background: "#f2faf9" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Types de travaux</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a2a28] md:text-5xl" style={{ fontFamily: "serif" }}>
            Tous types de peinture<br />à Quetigny
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { icon: "🖌️", title: "Peinture intérieure standard", desc: "Murs, plafonds, boiseries. Peintures A+ sans COV pour une qualité d'air optimale.", price: "28–40€/m²" },
              { icon: "✨", title: "Finitions premium & décoratif", desc: "Béton ciré, stuc vénitien, tadelakt. La spécialité des artisans haut de gamme de Quetigny.", price: "35–55€/m²" },
              { icon: "🏠", title: "Ravalement de façade pavillonnaire", desc: "Peinture façade pour maisons récentes. Produits 10 ans garantie, colorimétrie sur mesure.", price: "48–76€/m²" },
              { icon: "🔧", title: "Enduit & préparation soignée", desc: "Lissage, ponçage, rebouchage. Indispensable avant peinture haut de gamme.", price: "15–28€/m²" },
              { icon: "🎨", title: "Conseil couleurs & tendances 2026", desc: "Nos artisans proposent un service de conseil en colorimétrie adapté aux intérieurs modernes.", price: "Inclus devis" },
              { icon: "🌿", title: "Peinture écologique certifiée", desc: "Gammes naturelles sans solvants. Idéal pour les familles avec jeunes enfants à Quetigny.", price: "33–54€/m²" },
            ].map((t, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border-[1.5px] border-[#d0e8e4] bg-white p-6 transition hover:border-[#0d9488] hover:shadow-[0_8px_24px_rgba(13,148,136,0.1)]">
                <div className="shrink-0 text-[28px]">{t.icon}</div>
                <div>
                  <div className="mb-1 text-base font-bold text-[#0a2a28]">{t.title}</div>
                  <div className="mb-2 text-[13px] text-[#4a6a68]">{t.desc}</div>
                  <div className="text-[13px] font-bold text-[#0d9488]">{t.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE EXPERT */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Guide expert</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a2a28] md:text-5xl" style={{ fontFamily: "serif" }}>
            Tout savoir sur la peinture<br />intérieure à Quetigny
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="text-[15px] leading-relaxed text-[#4a6a68]">
              <h3 className="mb-3 text-[22px] font-bold text-[#0a2a28]" style={{ fontFamily: "serif" }}>Quetigny : la commune la plus dynamique de Dijon Métropole en rénovation</h3>
              <p className="mb-4">Quetigny, 9 500 habitants, est une commune d'exception dans le paysage dijonnais. Avec un taux de propriétaires de 62% (contre 52% en moyenne nationale) et une population jeune (âge médian 34 ans), elle génère la demande en rénovation la plus dynamique du secteur est de Dijon. En 2025–2026, notre plateforme a enregistré 87 projets publiés, en hausse de 22% par rapport à l'année précédente.</p>
              <p className="mb-4">Cette croissance s'explique par un parc immobilier récent en constante évolution : 45% des logements ont été construits après 1990, dans des programmes pavillonnaires ou des résidences fermées. Ces propriétaires, souvent primo-accédants ou en phase de valorisation avant revente, investissent davantage dans des finitions haut de gamme.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#0a2a28]" style={{ fontFamily: "serif" }}>Pourquoi Quetigny plébiscite la peinture décorative</h3>
              <p className="mb-4">Contrairement à Chenôve ou Longvic où domine la rénovation de logements anciens, Quetigny se distingue par une forte demande en peinture décorative et finitions premium. 28% des projets publiés à Quetigny concernent du béton ciré, du stuc vénitien ou des techniques décoratives avancées — soit 3 fois plus que la moyenne de Dijon Métropole.</p>
              <p className="mb-4">Cette spécificité a attiré deux artisans formés aux techniques décoratives dans notre réseau Quetigny. Guillaume L., avec 134 chantiers réalisés et un score parfait de 5/5, est le peintre décoratif le mieux noté de tout le département Côte-d'Or sur notre plateforme.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#0a2a28]" style={{ fontFamily: "serif" }}>Peinture et valorisation immobilière à Quetigny</h3>
              <p className="mb-4">À Quetigny, la peinture est souvent réalisée dans une optique de valorisation avant revente. Notre analyse des 87 projets 2025–2026 révèle que 31% des travaux de peinture ont été commandés dans ce contexte. Le retour sur investissement constaté est remarquable : une rénovation complète de 5 000€ génère en moyenne une plus-value de 12 000 à 18 000€ sur le prix de vente.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#0a2a28]" style={{ fontFamily: "serif" }}>Données du marché — Quetigny 2026</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Projets publiés 2025–2026 : <strong>87 (+22%)</strong></li>
                <li>Prix moyen constaté : <strong>35€/m²</strong></li>
                <li>Part projets peinture décorative : <strong>28%</strong></li>
                <li>Part projets avant revente : <strong>31%</strong></li>
                <li>Délai moyen 1er contact : <strong>3h50</strong></li>
                <li>Satisfaction clients : <strong>97%</strong></li>
                <li>Économie vs premier devis : <strong>19%</strong></li>
              </ul>
            </div>

            <div className="sticky top-6">
              <div className="mb-4 rounded-2xl border-[1.5px] border-[#d0e8e4] bg-[#f2faf9] p-6">
                <h4 className="mb-3 text-base font-bold text-[#0a2a28]" style={{ fontFamily: "serif" }}>📊 Données Quetigny 2026</h4>
                {[
                  { k: "Prix moyen mur", v: "32€/m²" },
                  { k: "Prix moyen décoratif", v: "44€/m²" },
                  { k: "Projets publiés", v: "87" },
                  { k: "Artisans actifs", v: "7" },
                  { k: "Satisfaction", v: "4.9/5" },
                  { k: "Délai réponse", v: "3–5h" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between border-b border-[#d0e8e4] py-2 text-[13px] last:border-0">
                    <span className="text-[#4a6a68]">{s.k}</span><span className="font-bold text-[#0a2a28]">{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border-[1.5px] border-[#d0e8e4] bg-[#f2faf9] p-6">
                <h4 className="mb-3 text-base font-bold text-[#0a2a28]" style={{ fontFamily: "serif" }}>🔗 Pages liées</h4>
                {[
                  { label: "Peinture Dijon", href: "/devis-peinture-interieure-dijon" },
                  { label: "Peinture Longvic", href: "/devis-peinture-longvic" },
                  { label: "Peinture Saint-Apollinaire", href: "/devis-peinture-saint-apollinaire" },
                  { label: "Peinture Chevigny", href: "/devis-peinture-chevigny" },
                ].map((l, i) => (
                  <div key={i} className="flex justify-between py-2 text-[13px]">
                    <Link href={l.href} className="text-[#0d9488] no-underline">{l.label}</Link>
                    <span className="font-bold text-[#0a2a28]">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-20" style={{ background: "#f2faf9" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">FAQ</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a2a28] md:text-5xl" style={{ fontFamily: "serif" }}>Questions fréquentes<br />— Quetigny</h2>
          <div className="max-w-[700px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Explorer</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a2a28] md:text-5xl" style={{ fontFamily: "serif" }}>Pages liées</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Peinture Dijon 21000", sub: "18 artisans · 32–45€/m²", href: "/devis-peinture-interieure-dijon" },
              { title: "Peinture Longvic 21600", sub: "8 artisans · 27–41€/m²", href: "/devis-peinture-longvic" },
              { title: "Peinture Chenôve 21300", sub: "12 artisans · 26–40€/m²", href: "/devis-peinture-chenove" },
              { title: "Peinture Talant 21240", sub: "9 artisans · 28–42€/m²", href: "/devis-peinture-talant" },
              { title: "Béton ciré Quetigny", sub: "Artisans spécialisés · 35–55€/m²", href: "#" },
              { title: "Rénovation avant vente", sub: "ROI moyen +240% Quetigny", href: "#" },
              { title: "Peinture Saint-Apollinaire", sub: "5 artisans · 29–44€/m²", href: "#" },
              { title: "Guide finitions premium 2026", sub: "87 projets analysés Quetigny", href: "#" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="rounded-xl border-[1.5px] border-[#d0e8e4] bg-[#f2faf9] p-4 no-underline transition hover:-translate-y-0.5 hover:border-[#0d9488]">
                <div className="mb-1 text-[13px] font-bold text-[#0a2a28]">{link.title}</div>
                <div className="text-xs text-[#4a6a68]">{link.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #0a2a28, #0a4a44)" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5eead4]">Prêt à démarrer ?</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Recevez vos devis gratuits<br />en moins de 5h à Quetigny
          </h2>
          <p className="mb-10 text-base text-white/70">7 artisans peintres vérifiés à Quetigny — spécialistes finitions haut de gamme. Sans engagement.</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#0d9488] px-12 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(13,148,136,0.4)] transition hover:scale-105 hover:bg-[#14b8a6]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Max 4 artisans</p>
        </div>
      </section>

      {/* Schema JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Quetigny", url: "https://premiumartisan.fr/devis-peinture-quetigny", areaServed: { "@type": "City", name: "Quetigny", postalCode: "21800" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "71" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
