// app/devis-peinture-dijon/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import type { Metadata } from "next";

const FAQ_ITEMS = [
  {
    q: "Quel est le prix de la peinture intérieure à Dijon en 2026 ?",
    a: "Le prix moyen à Dijon varie entre 25€ et 45€/m² selon la préparation, le type de finition et l'accessibilité des surfaces. Pour un appartement de 70m², comptez entre 2 100€ et 3 150€ tout compris. Les finitions premium ou les travaux sur boiseries anciennes peuvent atteindre 55–65€/m².",
  },
  {
    q: "Combien d'artisans vont me contacter après ma demande ?",
    a: "Maximum 3 artisans locaux vérifiés auront accès à votre projet. Ce plafond anti-spam garantit des contacts de qualité : chaque artisan sait qu'il est en compétition avec 2 autres maximum, ce qui l'incite à proposer son meilleur prix et à répondre rapidement.",
  },
  {
    q: "Quel délai pour obtenir des devis à Dijon ?",
    a: "En moyenne 2 à 4 heures pour recevoir les premières réponses. Dijon centre bénéficie du réseau d'artisans le plus dense de notre plateforme — 18 peintres vérifiés actifs — ce qui garantit des réponses rapides toute l'année, même en haute saison (septembre–novembre).",
  },
  {
    q: "Les artisans peintres sont-ils vérifiés à Dijon ?",
    a: "Oui. Chaque artisan de notre réseau dijonnais est contrôlé : SIRET actif, assurance décennale et RC pro à jour, vérification des références et des avis clients. Seuls les artisans avec une note minimale de 4.6/5 intègrent notre réseau. Les artisans sont réévalués tous les 6 mois.",
  },
  {
    q: "Quelle est la meilleure saison pour faire peindre à Dijon ?",
    a: "Le printemps (mars–mai) et l'automne (septembre–octobre) sont les meilleures périodes à Dijon. L'été peut être problématique pour les façades en raison des fortes chaleurs qui accélèrent le séchage. L'hiver est déconseillé pour les travaux extérieurs (gel, humidité) mais convient parfaitement aux intérieurs.",
  },
  {
    q: "Puis-je bénéficier d'aides financières pour la peinture à Dijon ?",
    a: "Oui, selon votre situation. MaPrimeRénov' peut couvrir une partie des travaux si la peinture est associée à un chantier d'isolation ou de rénovation énergétique. Les propriétaires bailleurs peuvent déduire les travaux de peinture de leurs revenus fonciers. La TVA à 10% (au lieu de 20%) s'applique pour les logements de plus de 2 ans.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[1.5px] border-[#e8d0d8] py-5">
      <div
        className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[#2a0a14]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-base">{question}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>
      {open && (
        <div className="mt-3 text-sm leading-relaxed text-[#6a3a4a]">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function DevisPeintureDijon() {
  return (
    <main className="min-h-screen" style={{ background: "#fdf2f5" }}>

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#2a0a14] px-8 py-4">
        <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#f43f5e]">Artisan</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/70 hover:text-white">Accueil</Link>
          <Link href="#prix" className="text-sm text-white/70 hover:text-white">Prix</Link>
          <Link href="#artisans" className="text-sm text-white/70 hover:text-white">Artisans</Link>
          <Link href="/publier-projet/form" className="text-sm text-white/70 hover:text-white">Devis gratuit</Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative overflow-hidden px-8 pb-16 pt-20"
        style={{ background: "linear-gradient(135deg, #2a0a14 0%, #4a0a24 60%, #3a0a1c 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[900px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f43f5e]/40 bg-[#f43f5e]/20 px-3.5 py-1.5 text-[13px] font-semibold text-[#fda4af]">
            📍 Dijon 21000 — Données 2026
          </div>

          <h1
            className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl"
            style={{ fontFamily: "serif" }}
          >
            Peinture Intérieure<br />
            à <em className="not-italic text-[#fda4af]">Dijon</em><br />
            Prix & Devis 2026
          </h1>

          <p className="mb-10 max-w-[600px] text-lg text-white/75">
            Comparez jusqu'à 3 artisans peintres vérifiés à Dijon. Prix moyen constaté :{" "}
            <strong className="text-white">25–45€/m²</strong>. Réponse en 2–4h, sans engagement.
          </p>

          <div className="mb-12 flex flex-wrap gap-4">
            {[
              { value: "⭐ 4.8/5", label: "Avis clients" },
              { value: "18", label: "Peintres vérifiés" },
              { value: "2–4h", label: "Réponse moyenne" },
              { value: "Max 3", label: "Artisans (anti-spam)" },
              { value: "100%", label: "Gratuit & sans engagement" },
            ].map((b, i) => (
              <div
                key={i}
                className="min-w-[130px] rounded-xl border border-white/15 bg-white/[0.08] px-5 py-4 text-center"
              >
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "serif" }}>
                  {b.value}
                </div>
                <div className="mt-0.5 text-xs text-white/60">{b.label}</div>
              </div>
            ))}
          </div>

          <Link
            href="/publier-projet/form"
            className="inline-block rounded-2xl bg-[#be123c] px-10 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(190,18,60,0.4)] transition hover:scale-105 hover:bg-[#e11d48]"
          >
            🎨 Publiez votre projet gratuitement
          </Link>
          <p className="mt-3 text-sm text-white/50">
            Sans engagement · Gratuit · 3 artisans max
          </p>
        </div>
      </section>

      {/* BANDEAU STATS */}
      <section className="bg-[#be123c] px-8 py-5">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-wrap items-center justify-between gap-4 text-center text-white">
            {[
              { value: "312", label: "Projets publiés 2025–2026" },
              { value: "21000", label: "Code postal · Capitale de Bourgogne" },
              { value: "18", label: "Artisans peintres vérifiés" },
              { value: "4.8/5", label: "Note moyenne réseau Dijon" },
              { value: "1–3 sem.", label: "Délai démarrage moyen" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-bold" style={{ fontFamily: "serif" }}>
                  {s.value}
                </div>
                <div className="text-xs text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">
            Pourquoi nous choisir
          </div>
          <h2
            className="mb-10 text-3xl font-bold leading-tight text-[#2a0a14] md:text-4xl"
            style={{ fontFamily: "serif" }}
          >
            La référence peinture<br />à Dijon
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { icon: "🏙️", title: "Réseau dense Dijon", desc: "18 artisans actifs couvrant tous les quartiers : centre, Fontaine, Talant, Chenôve, Longvic, Quetigny" },
              { icon: "⚡", title: "Réponse 2–4h", desc: "Le réseau le plus réactif de Côte-d'Or. Première réponse garantie sous 4h en semaine" },
              { icon: "🛡️", title: "Artisans vérifiés", desc: "SIRET, assurances, références — chaque artisan est contrôlé et réévalué tous les 6 mois" },
              { icon: "🔒", title: "3 artisans max", desc: "Vos coordonnées ne sont jamais revendues. Contact limité à 3 artisans qualifiés maximum" },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border-[1.5px] border-[#e8d0d8] p-6 text-center"
              >
                <div className="mb-3 text-[36px]">{f.icon}</div>
                <div className="mb-2 text-base font-bold text-[#2a0a14]">{f.title}</div>
                <div className="text-[13px] text-[#6a3a4a]">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="px-8 py-20" style={{ background: "#fdf2f5" }} id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">
            Prix réels 2026
          </div>
          <h2
            className="mb-4 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl"
            style={{ fontFamily: "serif" }}
          >
            Combien coûte la peinture<br />à Dijon ?
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6a3a4a]">
            Analyse de 312 projets publiés à Dijon entre janvier 2025 et mars 2026. Les tarifs
            reflètent les prix réels pratiqués par nos artisans vérifiés sur l'ensemble de la métropole dijonnaise.
          </p>
          <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                label: "Peinture intérieure standard",
                price: "25–38€",
                details: ["Main d'œuvre: 14–20€/m²", "Fournitures: 7–11€/m²", "Préparation: 4–7€/m²"],
                featured: false,
              },
              {
                label: "Finitions soignées ⭐",
                price: "35–48€",
                details: ["Peinture grand teint premium", "Application 3 couches min.", "Ponçage et enduit inclus"],
                featured: true,
              },
              {
                label: "Rénovation complète",
                price: "42–65€",
                details: ["Boiseries & plafonds", "Préparation lourde incluse", "Garantie résultat 2 ans"],
                featured: false,
              },
            ].map((c, i) => (
              <div
                key={i}
                className={`rounded-2xl border-2 p-6 transition hover:-translate-y-1 ${
                  c.featured
                    ? "border-[#be123c]"
                    : "border-[#e8d0d8] hover:border-[#be123c]"
                }`}
                style={c.featured ? { background: "linear-gradient(135deg, #fff1f3, white)" } : {}}
              >
                <div className="mb-2 text-[13px] font-semibold text-[#6a3a4a]">{c.label}</div>
                <div className="text-[32px] font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>
                  {c.price}
                </div>
                <div className="text-sm text-[#6a3a4a]">par m²</div>
                <div className="mt-4 space-y-1 text-[13px] text-[#6a3a4a]">
                  {c.details.map((d, j) => (
                    <div key={j} className={j < 2 ? "border-b border-[#e8d0d8] py-1" : "py-1"}>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2a0a14] text-white">
                  <th className="rounded-tl-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">
                    Type de bien
                  </th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Peinture standard</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Finitions soignées</th>
                  <th className="rounded-tr-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">
                    Délai chantier
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surf: "Studio 25m²", s: "875€ – 1 125€", r: "1 200€ – 1 600€", d: "2–3 jours" },
                  { surf: "Appartement 70m²", s: "2 100€ – 3 150€", r: "3 200€ – 4 800€", d: "5–7 jours" },
                  { surf: "Maison 120m²", s: "3 600€ – 5 400€", r: "5 500€ – 8 000€", d: "8–12 jours" },
                  { surf: "Rénovation complète 90m²", s: "3 200€ – 4 900€", r: "4 800€ – 7 200€", d: "7–10 jours" },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-white">
                    <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm">{r.surf}</td>
                    <td
                      className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm font-bold text-[#be123c]"
                      style={{ fontFamily: "serif" }}
                    >
                      {r.s}
                    </td>
                    <td
                      className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm font-bold text-[#be123c]"
                      style={{ fontFamily: "serif" }}
                    >
                      {r.r}
                    </td>
                    <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm">{r.d}</td>
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">
            Délais moyens
          </div>
          <h2
            className="mb-4 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl"
            style={{ fontFamily: "serif" }}
          >
            Trouver un peintre<br />à Dijon
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6a3a4a]">
            Dijon, capitale de la Bourgogne et ville universitaire de 160 000 habitants, dispose du
            réseau d'artisans peintres le plus dense et réactif de Côte-d'Or. Avec 18 artisans vérifiés
            actifs, les délais de réponse sont les plus courts de notre plateforme.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", time: "2–4h", label: "Premiers devis reçus" },
              { icon: "📅", time: "1–3 sem.", label: "Délai démarrage chantier" },
              { icon: "🎨", time: "3–12 j.", label: "Durée chantier moyenne" },
              { icon: "✅", time: "4.8/5", label: "Note moyenne artisans" },
            ].map((d, i) => (
              <div
                key={i}
                className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-6 text-center"
              >
                <div className="mb-3 text-[32px]">{d.icon}</div>
                <div className="text-[28px] font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>
                  {d.time}
                </div>
                <div className="mt-1 text-[13px] text-[#6a3a4a]">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISANS */}
      <section className="px-8 py-20" style={{ background: "#fdf2f5" }} id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">
            Réseau vérifié
          </div>
          <h2
            className="mb-4 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl"
            style={{ fontFamily: "serif" }}
          >
            Artisans peintres vérifiés<br />à Dijon
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6a3a4a]">
            Sélection rigoureuse — seuls les artisans avec une note minimale de 4.6/5 et des
            assurances à jour intègrent notre réseau Dijon.
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                initials: "TM",
                name: "Thomas M.",
                spec: "Peinture intérieure & rénovation complète",
                exp: "18 ans d'expérience",
                zone: "Dijon centre · Fontaine · Talant",
                note: "4.9/5",
                chantiers: "214 chantiers",
              },
              {
                initials: "SL",
                name: "Sébastien L.",
                spec: "Finitions soignées & peinture décorative",
                exp: "12 ans d'expérience",
                zone: "Dijon · Chenôve · Longvic",
                note: "4.8/5",
                chantiers: "156 chantiers",
              },
              {
                initials: "AR",
                name: "Arnaud R.",
                spec: "Appartements & bailleurs — délai rapide",
                exp: "9 ans d'expérience",
                zone: "Dijon · Quetigny · Saint-Apollinaire",
                note: "4.7/5",
                chantiers: "98 chantiers",
              },
            ].map((a, i) => (
              <div
                key={i}
                className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-white p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #2a0a14, #6a0a2c)" }}
                  >
                    {a.initials}
                  </div>
                  <div>
                    <div className="font-bold text-[#2a0a14]">{a.name}</div>
                    <div className="text-xs text-[#be123c]">
                      {a.note} · {a.chantiers}
                    </div>
                  </div>
                </div>
                <div className="mb-2 text-[13px] font-semibold text-[#2a0a14]">{a.spec}</div>
                <div className="mb-1 text-xs text-[#6a3a4a]">📅 {a.exp}</div>
                <div className="text-xs text-[#6a3a4a]">📍 {a.zone}</div>
                <Link
                  href="/publier-projet/form"
                  className="mt-4 block rounded-xl bg-[#be123c] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#e11d48]"
                >
                  Demander un devis
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANT / APRES */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">Galerie</div>
          <h2
            className="mb-4 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl"
            style={{ fontFamily: "serif" }}
          >
            Avant / Après — Chantiers<br />réalisés à Dijon
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6a3a4a]">
            Projets réalisés dans les appartements, maisons et bureaux dijonnais en 2025–2026.
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: "Salon — Dijon centre",
                detail: "Peinture murs + plafond + boiseries · 45m²",
                price: "Budget: 1 850€ · Délai: 4 jours",
              },
              {
                title: "Appartement — Talant",
                detail: "Rénovation complète 3 pièces · 68m²",
                price: "Budget: 2 900€ · Délai: 6 jours",
              },
              {
                title: "Maison — Chenôve",
                detail: "Intérieur complet finitions soignées · 105m²",
                price: "Budget: 4 200€ · Délai: 9 jours",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border-[1.5px] border-[#e8d0d8]"
              >
                <div className="grid h-[180px] grid-cols-2">
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#8a7a6a] to-[#6a5a4a] text-[40px]">
                    🏚️
                    <span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      AVANT
                    </span>
                  </div>
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#fecdd3] to-[#fff1f3] text-[40px]">
                    🏠
                    <span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      APRÈS
                    </span>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="mb-1 text-sm font-bold text-[#2a0a14]">{item.title}</div>
                  <div className="text-xs text-[#6a3a4a]">{item.detail}</div>
                  <div className="mt-1.5 text-[13px] font-bold text-[#be123c]">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="px-8 py-20" style={{ background: "#fdf2f5" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">
            Avis clients vérifiés
          </div>
          <h2
            className="mb-12 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl"
            style={{ fontFamily: "serif" }}
          >
            Ce que disent nos clients<br />à Dijon
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                name: "Marie L.",
                loc: "Dijon centre · Appartement 72m²",
                text: "Thomas a réalisé la peinture complète de notre appartement en 5 jours. Travail impeccable, équipe professionnelle et très réactive. Je recommande sans hésiter.",
                avatar: "ML",
              },
              {
                name: "Karim B.",
                loc: "Chenôve · Maison 95m²",
                text: "Devis reçu en 3 heures, prix juste et démarrage rapide. Sébastien a su conseiller les bonnes couleurs pour nos pièces. Résultat au-delà de nos attentes.",
                avatar: "KB",
              },
              {
                name: "Sophie D.",
                loc: "Talant · Maison 110m²",
                text: "Très satisfaite ! La plateforme m'a mis en relation avec 3 artisans en quelques heures. J'ai choisi Arnaud — finitions parfaites, respect du délai et du budget.",
                avatar: "SD",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-white p-6"
              >
                <div className="mb-3 text-base text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <div className="mb-4 text-sm italic leading-relaxed text-[#6a3a4a]">"{t.text}"</div>
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #2a0a14, #6a0a2c)" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#2a0a14]">{t.name}</div>
                    <div className="text-xs text-[#6a3a4a]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HYPERLOCAL — Quartiers & communes voisines */}
      <section className="px-8 py-20" style={{ background: "#2a0a14" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#fda4af]">
            Quartiers & communes
          </div>
          <h2
            className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl"
            style={{ fontFamily: "serif" }}
          >
            Artisans peintres dans<br />toute la métropole dijonnaise
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-white/60">
            Nos artisans couvrent Dijon et toutes les communes de la métropole — du centre-ville
            aux quartiers périphériques.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", code: "21000", artisans: "18", prix: "25–45€/m²", delai: "2–4h" },
              { name: "Fontaine-lès-Dijon", code: "21121", artisans: "6", prix: "29–44€/m²", delai: "4–7h" },
              { name: "Talant", code: "21240", artisans: "9", prix: "28–42€/m²", delai: "3–5h" },
              { name: "Chenôve", code: "21300", artisans: "12", prix: "26–40€/m²", delai: "3–6h" },
              { name: "Quetigny", code: "21800", artisans: "7", prix: "28–43€/m²", delai: "3–6h" },
              { name: "Saint-Apollinaire", code: "21850", artisans: "5", prix: "27–42€/m²", delai: "4–7h" },
            ].map((q, i) => (
              <div
                key={i}
                className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-[#fda4af] hover:bg-white/10"
              >
                <div className="mb-1 text-lg font-bold text-white" style={{ fontFamily: "serif" }}>
                  {q.name}
                </div>
                <div className="mb-3 text-xs text-white/40">{q.code}</div>
                <div className="mb-1.5 flex justify-between text-[13px]">
                  <span className="text-white/50">Artisans actifs</span>
                  <span className="font-bold text-[#fda4af]">{q.artisans}</span>
                </div>
                <div className="mb-1.5 flex justify-between text-[13px]">
                  <span className="text-white/50">Prix moyen</span>
                  <span className="font-bold text-[#fda4af]">{q.prix}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">Délai réponse</span>
                  <span className="font-bold text-[#fda4af]">{q.delai}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES DE TRAVAUX */}
      <section className="px-8 py-20" style={{ background: "#fdf2f5" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">
            Types de travaux
          </div>
          <h2
            className="mb-12 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl"
            style={{ fontFamily: "serif" }}
          >
            Tous types de peinture<br />à Dijon
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                icon: "🖌️",
                title: "Peinture murs & plafonds",
                desc: "Peintures acryliques A+ grand teint. Résultats durables, sans odeur, séchage rapide. Idéal appartements et maisons.",
                price: "25–38€/m²",
              },
              {
                icon: "🏛️",
                title: "Boiseries & menuiseries",
                desc: "Peinture glycéro ou laque pour portes, fenêtres, plinthes et escaliers. Finition brillante, satinée ou mate au choix.",
                price: "35–55€/m²",
              },
              {
                icon: "✨",
                title: "Peinture décorative (effets & patines)",
                desc: "Effets béton, stuc vénitien, tadelakt, patine ancienne. Artisans formés aux techniques décoratives haut de gamme.",
                price: "45–75€/m²",
              },
              {
                icon: "🏠",
                title: "Rénovation complète appartement",
                desc: "Peinture intégrale : préparation supports, enduit, impression, 2 couches finition. Clé en main.",
                price: "38–55€/m²",
              },
              {
                icon: "🔧",
                title: "Préparation supports (enduits, ponçage)",
                desc: "Rebouchage, enduit de lissage, ponçage, primaire d'accrochage. Étape indispensable pour un résultat parfait.",
                price: "12–22€/m²",
              },
              {
                icon: "🎨",
                title: "Conseil colorimétrie",
                desc: "Service disponible chez certains artisans : visite domicile, nuancier, simulation couleurs avant travaux.",
                price: "Inclus ou devis",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-2xl border-[1.5px] border-[#e8d0d8] bg-white p-6 transition hover:border-[#be123c] hover:shadow-[0_8px_24px_rgba(190,18,60,0.1)]"
              >
                <div className="shrink-0 text-[28px]">{t.icon}</div>
                <div>
                  <div className="mb-1 text-base font-bold text-[#2a0a14]">{t.title}</div>
                  <div className="mb-2 text-[13px] text-[#6a3a4a]">{t.desc}</div>
                  <div className="text-[13px] font-bold text-[#be123c]">{t.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE EXPERT */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">
            Guide expert
          </div>
          <h2
            className="mb-12 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl"
            style={{ fontFamily: "serif" }}
          >
            Tout savoir sur la peinture<br />à Dijon
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="text-[15px] leading-relaxed text-[#6a3a4a]">
              <h3
                className="mb-3 text-[22px] font-bold text-[#2a0a14]"
                style={{ fontFamily: "serif" }}
              >
                Dijon : capitale de la Bourgogne, capitale des artisans
              </h3>
              <p className="mb-4">
                Dijon, 160 000 habitants, est la ville la plus active de notre réseau en Côte-d'Or. Avec
                312 projets publiés entre janvier 2025 et mars 2026 et 18 artisans peintres vérifiés actifs,
                la métropole dijonnaise offre la couverture la plus dense et la plus réactive de notre
                plateforme. Le budget moyen par projet est de 2 900€, reflet d'un marché immobilier
                diversifié : studios étudiants, appartements familiaux, maisons de banlieue, villas et
                immeubles haussmanniens.
              </p>
              <p className="mb-4">
                Le centre historique de Dijon, avec ses hôtels particuliers et ses immeubles du XIXe siècle,
                génère une demande spécifique en travaux de peinture : restauration de boiseries anciennes,
                peintures à la chaux pour les murs en pierre, enduits de lissage sur plâtre ancien. Nos
                artisans sont formés à ces techniques traditionnelles.
              </p>

              <h3
                className="mb-3 mt-6 text-[22px] font-bold text-[#2a0a14]"
                style={{ fontFamily: "serif" }}
              >
                Comment bien préparer son projet de peinture à Dijon ?
              </h3>
              <p className="mb-4">
                Une bonne préparation fait la différence entre un chantier réussi et une déception. Avant
                de publier votre projet sur notre plateforme, nous vous recommandons de mesurer précisément
                la surface à peindre (longueur × hauteur des murs, moins les ouvertures), de noter l'état
                actuel des supports (fissures, humidité, ancienne peinture) et de définir vos attentes en
                termes de finition (mate, satinée, brillante).
              </p>
              <p className="mb-4">
                Ces informations permettent aux artisans dijonnais de vous proposer des devis précis et
                comparables. Un devis sans visite est possible pour les projets simples (appartement
                standard, surfaces saines) ; une visite préalable reste recommandée pour les rénovations
                complexes ou les biens anciens.
              </p>

              <h3
                className="mb-3 mt-6 text-[22px] font-bold text-[#2a0a14]"
                style={{ fontFamily: "serif" }}
              >
                Données du marché — Dijon 2026
              </h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Projets publiés 2025–2026 : <strong>312</strong></li>
                <li>Budget moyen par projet : <strong>2 900€</strong></li>
                <li>Prix moyen constaté : <strong>34€/m²</strong></li>
                <li>Délai moyen 1er contact : <strong>3h10</strong></li>
                <li>Satisfaction clients : <strong>94%</strong></li>
                <li>Note moyenne artisans : <strong>4.8/5</strong></li>
                <li>Artisans vérifiés actifs : <strong>18</strong></li>
              </ul>
            </div>

            <div className="sticky top-6">
              <div className="mb-4 rounded-2xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-6">
                <h4 className="mb-3 text-base font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>
                  📊 Données Dijon 2026
                </h4>
                {[
                  { k: "Prix moyen standard", v: "32€/m²" },
                  { k: "Prix moyen premium", v: "44€/m²" },
                  { k: "Budget moyen projet", v: "2 900€" },
                  { k: "Artisans actifs", v: "18" },
                  { k: "Satisfaction", v: "4.8/5" },
                  { k: "Délai réponse", v: "2–4h" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b border-[#e8d0d8] py-2 text-[13px] last:border-0"
                  >
                    <span className="text-[#6a3a4a]">{s.k}</span>
                    <span className="font-bold text-[#2a0a14]">{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-6">
                <h4 className="mb-3 text-base font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>
                  🔗 Pages liées
                </h4>
                {[
                  { label: "Peinture Fontaine-lès-Dijon", href: "/devis-peinture-fontaine-les-dijon" },
                  { label: "Peinture Talant", href: "/devis-peinture-talant" },
                  { label: "Peinture Chenôve", href: "/devis-peinture-chenove" },
                  { label: "Peinture Quetigny", href: "/devis-peinture-quetigny" },
                ].map((l, i) => (
                  <div key={i} className="flex justify-between py-2 text-[13px]">
                    <Link href={l.href} className="text-[#be123c] no-underline">
                      {l.label}
                    </Link>
                    <span className="font-bold text-[#2a0a14]">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-20" style={{ background: "#fdf2f5" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">FAQ</div>
          <h2
            className="mb-12 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl"
            style={{ fontFamily: "serif" }}
          >
            Questions fréquentes<br />— Dijon
          </h2>
          <div className="max-w-[700px]">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">Explorer</div>
          <h2
            className="mb-12 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl"
            style={{ fontFamily: "serif" }}
          >
            Pages liées
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Peinture Fontaine-lès-Dijon", sub: "6 artisans · 29–44€/m²", href: "/devis-peinture-fontaine-les-dijon" },
              { title: "Peinture Talant 21240", sub: "9 artisans · 28–42€/m²", href: "/devis-peinture-talant" },
              { title: "Peinture Chenôve 21300", sub: "12 artisans · 26–40€/m²", href: "/devis-peinture-chenove" },
              { title: "Peinture Quetigny 21800", sub: "7 artisans · 28–43€/m²", href: "/devis-peinture-quetigny" },
              { title: "Peinture Longvic 21600", sub: "6 artisans · 27–41€/m²", href: "/devis-peinture-longvic" },
              { title: "Peinture Saint-Apollinaire", sub: "5 artisans · 27–42€/m²", href: "/devis-peinture-saint-apollinaire" },
              { title: "Guide peinture intérieure 2026", sub: "Prix réels · 312 projets analysés", href: "#" },
              { title: "Peinture décorative Dijon", sub: "Effets, patines, stuc vénitien", href: "#" },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="rounded-xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-4 no-underline transition hover:-translate-y-0.5 hover:border-[#be123c]"
              >
                <div className="mb-1 text-[13px] font-bold text-[#2a0a14]">{link.title}</div>
                <div className="text-xs text-[#6a3a4a]">{link.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="px-8 py-20 text-center"
        style={{ background: "linear-gradient(135deg, #2a0a14, #4a0a24)" }}
      >
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#fda4af]">
            Prêt à démarrer ?
          </div>
          <h2
            className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl"
            style={{ fontFamily: "serif" }}
          >
            Recevez vos 3 devis gratuits<br />à Dijon
          </h2>
          <p className="mb-10 text-base text-white/70">
            18 artisans vérifiés à Dijon — réponse en 2 à 4h, sans engagement, sans spam.
          </p>
          <Link
            href="/publier-projet/form"
            className="inline-block rounded-2xl bg-[#be123c] px-12 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(190,18,60,0.4)] transition hover:scale-105 hover:bg-[#e11d48]"
          >
            🎨 Publiez votre projet gratuitement
          </Link>
          <p className="mt-3 text-sm text-white/50">
            Sans engagement · Gratuit · 3 artisans max · Anti-spam
          </p>
        </div>
      </section>

      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                name: "PremiumArtisan Dijon",
                url: "https://premiumartisan.fr/devis-peinture-dijon",
                areaServed: { "@type": "City", name: "Dijon", postalCode: "21000" },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.8",
                  reviewCount: "124",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQ_ITEMS.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        }}
      />
    </main>
  );
}