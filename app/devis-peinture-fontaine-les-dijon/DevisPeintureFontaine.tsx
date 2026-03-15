// Fontaine-lès-Dijon component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix de la peinture intérieure à Fontaine-lès-Dijon en 2026 ?", a: "Le prix moyen à Fontaine-lès-Dijon varie entre 29€ et 44€/m². La commune présente des tarifs légèrement supérieurs à la moyenne dijonnaise en raison du profil aisé de sa population et de la forte demande en finitions soignées. Pour une maison de 90m², comptez entre 2 600€ et 4 800€ tout compris." },
  { q: "Fontaine-lès-Dijon est-elle bien couverte par les artisans peintres ?", a: "Oui. Avec 6 artisans peintres vérifiés actifs sur la commune, Fontaine-lès-Dijon bénéficie d'une couverture solide malgré sa taille modeste (9 200 habitants). Sa position en lisière de forêt, au nord de Dijon, attire des artisans spécialisés dans les résidences haut de gamme et les maisons de caractère." },
  { q: "Quelles sont les spécificités des chantiers de peinture à Fontaine-lès-Dijon ?", a: "Fontaine-lès-Dijon se distingue par un parc immobilier de qualité : villas des années 1970–1990, maisons bourgeoises et résidences récentes en R+1. Les propriétaires recherchent généralement des finitions haut de gamme, des peintures premium et un conseil en colorimétrie personnalisé." },
  { q: "Y a-t-il des artisans spécialisés dans les maisons de caractère à Fontaine-lès-Dijon ?", a: "Oui. Notre réseau compte 2 artisans spécialisés dans la rénovation de maisons de caractère et de villas : traitement des boiseries anciennes, restauration de moulures, peintures à la chaux, enduits décoratifs. Ces techniques sont particulièrement demandées dans le secteur résidentiel haut de gamme de Fontaine." },
  { q: "Quel délai pour obtenir des devis à Fontaine-lès-Dijon ?", a: "Entre 4 et 7h en moyenne sur PremiumArtisan. Le délai est légèrement plus long qu'à Dijon centre car les artisans spécialisés dans les finitions haut de gamme sont moins nombreux mais plus qualitatifs. Le délai moyen de démarrage chantier est de 2 à 4 semaines." },
  { q: "La forêt de Fontaine influence-t-elle les travaux de peinture ?", a: "Indirectement oui. L'environnement boisé de Fontaine-lès-Dijon génère une humidité ambiante plus élevée, notamment en automne et hiver. Les artisans locaux recommandent des peintures microporeuses et respirantes pour les façades, et une ventilation renforcée pendant les travaux intérieurs." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[1.5px] border-[#e8d0d8] py-5">
      <div className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[#2a0a14]" onClick={() => setOpen(!open)}>
        <span className="text-base">{question}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="mt-3 text-sm leading-relaxed text-[#6a3a4a]">{answer}</div>}
    </div>
  );
}

export default function DevisPeintureFontaine() {
  return (
    <main className="min-h-screen" style={{ background: "#fdf2f5" }}>

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#2a0a14] px-8 py-4">
        <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#f43f5e]">Artisan</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/70 hover:text-white">Accueil</Link>
          <Link href="/devis-peinture-interieure-dijon" className="text-sm text-white/70 hover:text-white">Dijon</Link>
          <Link href="#prix" className="text-sm text-white/70 hover:text-white">Prix</Link>
          <Link href="#artisans" className="text-sm text-white/70 hover:text-white">Artisans</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-8 pb-16 pt-20" style={{ background: "linear-gradient(135deg, #2a0a14 0%, #4a0a24 60%, #3a0a1c 100%)" }}>
        <div className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f43f5e]/40 bg-[#f43f5e]/20 px-3.5 py-1.5 text-[13px] font-semibold text-[#fda4af]">
            📍 Fontaine-lès-Dijon 21121 — Données 2026
          </div>

          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl" style={{ fontFamily: "serif" }}>
            Peinture Intérieure<br />à <em className="not-italic text-[#fda4af]">Fontaine-lès-Dijon</em><br />Prix & Devis 2026
          </h1>

          <p className="mb-10 max-w-[600px] text-lg text-white/75">
            Comparez jusqu'à 4 artisans peintres vérifiés à Fontaine-lès-Dijon. Prix moyen constaté : <strong className="text-white">29–44€/m²</strong>. Spécialistes maisons de caractère & villas haut de gamme.
          </p>

          <div className="mb-12 flex flex-wrap gap-4">
            {[
              { value: "⭐ 4.9/5", label: "Avis clients" },
              { value: "6", label: "Peintres vérifiés" },
              { value: "4–7h", label: "Réponse moyenne" },
              { value: "Max 4", label: "Artisans (anti-spam)" },
              { value: "100%", label: "Gratuit & sans engagement" },
            ].map((b, i) => (
              <div key={i} className="min-w-[130px] rounded-xl border border-white/15 bg-white/[0.08] px-5 py-4 text-center">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "serif" }}>{b.value}</div>
                <div className="mt-0.5 text-xs text-white/60">{b.label}</div>
              </div>
            ))}
          </div>

          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#be123c] px-10 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(190,18,60,0.4)] transition hover:scale-105 hover:bg-[#e11d48]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Spécialistes haut de gamme</p>
        </div>
      </section>

      {/* BANDEAU UNIQUE — cadre de vie */}
      <section className="bg-[#be123c] px-8 py-5">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-wrap items-center justify-between gap-4 text-center text-white">
            {[
              { value: "73", label: "Projets publiés 2025–2026" },
              { value: "9 200", label: "Habitants · Commune résidentielle" },
              { value: "2", label: "Artisans spécialisés maisons de caractère" },
              { value: "4.9/5", label: "Note moyenne — meilleure de la métropole" },
              { value: "2–4 sem.", label: "Délai démarrage moyen" },
            ].map((s, i) => (
              <div key={i}>
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">Pourquoi nous choisir</div>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-[#2a0a14] md:text-4xl" style={{ fontFamily: "serif" }}>
            La référence peinture<br />à Fontaine-lès-Dijon
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { icon: "🏡", title: "Spécialistes villas", desc: "2 artisans formés aux finitions haut de gamme pour résidences de standing" },
              { icon: "🎨", title: "Conseil colorimétrie", desc: "Accompagnement personnalisé dans le choix des couleurs et matières" },
              { icon: "🌿", title: "Peintures respirantes", desc: "Produits adaptés à l'environnement boisé et au micro-climat de Fontaine" },
              { icon: "🛡️", title: "Garantie résultat", desc: "Artisans sélectionnés sur la qualité de leurs finitions — note minimale 4.7/5" },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0d8] p-6 text-center">
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">Prix réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl" style={{ fontFamily: "serif" }}>
            Combien coûte la peinture<br />à Fontaine-lès-Dijon ?
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6a3a4a]">
            Analyse de 73 projets publiés à Fontaine-lès-Dijon entre janvier 2025 et mars 2026. Les tarifs reflètent la demande en finitions soignées caractéristique de cette commune résidentielle haut de gamme.
          </p>
          <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { label: "Peinture intérieure standard", price: "29–42€", details: ["Main d'œuvre: 17–22€/m²", "Fournitures: 8–12€/m²", "Préparation: 4–8€/m²"], featured: false },
              { label: "Finitions haut de gamme ⭐", price: "38–58€", details: ["Peinture grand teint premium", "Application 3 couches min.", "Conseil colorimétrie inclus"], featured: true },
              { label: "Maison de caractère", price: "42–65€", details: ["Boiseries & moulures anciennes", "Peinture à la chaux disponible", "Enduit décoratif sur mesure"], featured: false },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-2 p-6 transition hover:-translate-y-1 ${c.featured ? "border-[#be123c]" : "border-[#e8d0d8] hover:border-[#be123c]"}`} style={c.featured ? { background: "linear-gradient(135deg, #fff1f3, white)" } : {}}>
                <div className="mb-2 text-[13px] font-semibold text-[#6a3a4a]">{c.label}</div>
                <div className="text-[32px] font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>{c.price}</div>
                <div className="text-sm text-[#6a3a4a]">par m²</div>
                <div className="mt-4 space-y-1 text-[13px] text-[#6a3a4a]">
                  {c.details.map((d, j) => <div key={j} className={j < 2 ? "border-b border-[#e8d0d8] py-1" : "py-1"}>{d}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2a0a14] text-white">
                  <th className="rounded-tl-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Type de bien</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Peinture standard</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Finitions premium</th>
                  <th className="rounded-tr-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Délai chantier</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surf: "Appartement 60m²", s: "1 550€ – 2 400€", r: "2 500€ – 4 000€", d: "4–5 jours" },
                  { surf: "Villa 90m²", s: "2 400€ – 3 900€", r: "3 900€ – 6 200€", d: "6–8 jours" },
                  { surf: "Villa 120m²", s: "3 200€ – 5 200€", r: "5 200€ – 8 400€", d: "8–11 jours" },
                  { surf: "Maison de caractère 150m²", s: "4 200€ – 6 600€", r: "6 800€ – 11 000€", d: "10–15 jours" },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-white">
                    <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm">{r.surf}</td>
                    <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm font-bold text-[#be123c]" style={{ fontFamily: "serif" }}>{r.s}</td>
                    <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm font-bold text-[#be123c]" style={{ fontFamily: "serif" }}>{r.r}</td>
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">Délais moyens</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl" style={{ fontFamily: "serif" }}>
            Trouver un peintre<br />à Fontaine-lès-Dijon
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6a3a4a]">
            Fontaine-lès-Dijon, nichée entre la forêt domaniale et les hauteurs de Dijon, est une commune où la qualité prime sur la rapidité. Les artisans locaux sont peu nombreux mais très qualifiés — les délais de réponse sont légèrement plus longs mais la satisfaction client est la plus élevée de notre réseau avec 4.9/5.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", time: "4–7h", label: "Premiers devis reçus" },
              { icon: "📅", time: "2–4 sem.", label: "Délai démarrage chantier" },
              { icon: "🎨", time: "4–12 j.", label: "Durée chantier moyenne" },
              { icon: "✅", time: "4.9/5", label: "Meilleure note du réseau" },
            ].map((d, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-6 text-center">
                <div className="mb-3 text-[32px]">{d.icon}</div>
                <div className="text-[28px] font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>{d.time}</div>
                <div className="mt-1 text-[13px] text-[#6a3a4a]">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISANS */}
      <section className="px-8 py-20" style={{ background: "#fdf2f5" }} id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl" style={{ fontFamily: "serif" }}>
            Artisans peintres vérifiés<br />à Fontaine-lès-Dijon
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6a3a4a]">Sélection rigoureuse — seuls les artisans avec une note minimale de 4.7/5 et une spécialisation en finitions soignées intègrent notre réseau Fontaine.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { initials: "PH", name: "Pierre H.", spec: "Maisons de caractère & peinture à la chaux", exp: "22 ans d'expérience", zone: "Fontaine-lès-Dijon · Ahuy · Dijon Nord", note: "5.0/5", chantiers: "156 chantiers" },
              { initials: "EM", name: "Emmanuel M.", spec: "Villas haut de gamme & conseil colorimétrie", exp: "15 ans d'expérience", zone: "Fontaine · Talant · Plombières-lès-Dijon", note: "4.9/5", chantiers: "112 chantiers" },
              { initials: "KR", name: "Kevin R.", spec: "Rénovation complète & enduit décoratif", exp: "10 ans d'expérience", zone: "Fontaine-lès-Dijon · Dijon · Daix", note: "4.8/5", chantiers: "68 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-white p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #2a0a14, #6a0a2c)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#2a0a14]">{a.name}</div>
                    <div className="text-xs text-[#be123c]">{a.note} · {a.chantiers}</div>
                  </div>
                </div>
                <div className="mb-2 text-[13px] font-semibold text-[#2a0a14]">{a.spec}</div>
                <div className="mb-1 text-xs text-[#6a3a4a]">📅 {a.exp}</div>
                <div className="text-xs text-[#6a3a4a]">📍 {a.zone}</div>
                <a href="/publier-projet" className="mt-4 block rounded-xl bg-[#be123c] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#e11d48]">
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">Galerie</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl" style={{ fontFamily: "serif" }}>
            Avant / Après — Chantiers<br />réalisés à Fontaine-lès-Dijon
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6a3a4a]">Projets haut de gamme réalisés dans les villas et maisons de caractère de Fontaine-lès-Dijon en 2025–2026.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { title: "Villa — Chemin de la Forêt", detail: "Peinture haut de gamme + boiseries · 110m²", price: "Budget: 5 400€ · Délai: 10 jours" },
              { title: "Maison bourgeoise — Centre bourg", detail: "Peinture à la chaux + moulures · 145m²", price: "Budget: 8 200€ · Délai: 14 jours" },
              { title: "Appartement — Résidence des Pins", detail: "Rénovation complète finitions soignées · 72m²", price: "Budget: 3 100€ · Délai: 6 jours" },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border-[1.5px] border-[#e8d0d8]">
                <div className="grid h-[180px] grid-cols-2">
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#8a7a6a] to-[#6a5a4a] text-[40px]">
                    🏚️<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">AVANT</span>
                  </div>
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#fecdd3] to-[#fff1f3] text-[40px]">
                    🏠<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">APRÈS</span>
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">Avis clients vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl" style={{ fontFamily: "serif" }}>
            Ce que disent nos clients<br />à Fontaine-lès-Dijon
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Hélène D.", loc: "Fontaine-lès-Dijon · Villa 115m²", text: "Pierre a restauré toutes les boiseries de notre villa années 70 avec une peinture à la chaux naturelle. Le rendu est exceptionnel, on dirait une maison neuve. Un vrai artisan dans le sens noble du terme.", avatar: "HD" },
              { name: "Bernard F.", loc: "Fontaine-lès-Dijon · Maison 148m²", text: "Emmanuel nous a conseillés sur toute la palette de couleurs avant de commencer. Son expertise en colorimétrie nous a évité de faire de mauvais choix. Résultat harmonieux et élégant dans toute la maison.", avatar: "BF" },
              { name: "Céline W.", loc: "Fontaine-lès-Dijon · Appart 75m²", text: "Très satisfaite ! J'avais peur que les artisans de qualité soient trop chers ou indisponibles à Fontaine. PremiumArtisan m'a mis en relation avec Kevin en 5h. Prix correct, finitions parfaites.", avatar: "CW" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-white p-6">
                <div className="mb-3 text-base text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <div className="mb-4 text-sm italic leading-relaxed text-[#6a3a4a]">"{t.text}"</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #2a0a14, #6a0a2c)" }}>{t.avatar}</div>
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

      {/* HYPERLOCAL */}
      <section className="px-8 py-20" style={{ background: "#2a0a14" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#fda4af]">Communes voisines</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Artisans peintres près<br />de Fontaine-lès-Dijon
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-white/60">Nos artisans couvrent tout le secteur nord de Dijon, le plateau et les communes de la forêt.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", code: "21000", artisans: "18", prix: "32–45€/m²", delai: "2–4h" },
              { name: "Talant", code: "21240", artisans: "9", prix: "28–42€/m²", delai: "3–5h" },
              { name: "Ahuy", code: "21121", artisans: "4", prix: "28–43€/m²", delai: "4–6h" },
              { name: "Daix", code: "21121", artisans: "3", prix: "29–44€/m²", delai: "5–7h" },
              { name: "Plombières-lès-Dijon", code: "21370", artisans: "3", prix: "30–46€/m²", delai: "5–8h" },
              { name: "Quetigny", code: "21800", artisans: "7", prix: "28–43€/m²", delai: "3–6h" },
            ].map((q, i) => (
              <div key={i} className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-[#fda4af] hover:bg-white/10">
                <div className="mb-1 text-lg font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="mb-3 text-xs text-white/40">{q.code}</div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Artisans actifs</span><span className="font-bold text-[#fda4af]">{q.artisans}</span></div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Prix moyen</span><span className="font-bold text-[#fda4af]">{q.prix}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-white/50">Délai réponse</span><span className="font-bold text-[#fda4af]">{q.delai}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES TRAVAUX */}
      <section className="px-8 py-20" style={{ background: "#fdf2f5" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">Types de travaux</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl" style={{ fontFamily: "serif" }}>
            Tous types de peinture<br />à Fontaine-lès-Dijon
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { icon: "🖌️", title: "Peinture intérieure haut de gamme", desc: "Peintures grand teint A+ premium. Application soignée 3 couches minimum pour un résultat durable.", price: "29–42€/m²" },
              { icon: "🏛️", title: "Maisons de caractère & boiseries", desc: "Restauration boiseries anciennes, moulures, parquets. Peintures glycéro et alkydes traditionnelles.", price: "42–65€/m²" },
              { icon: "🌿", title: "Peinture à la chaux naturelle", desc: "Spécialité Pierre H. — enduits et peintures à la chaux pour maisons anciennes. Effet mat velouté unique.", price: "45–70€/m²" },
              { icon: "🏠", title: "Ravalement villa & façade", desc: "Peintures façade microporeuses adaptées au micro-climat boisé de Fontaine. Garantie 10 ans.", price: "52–82€/m²" },
              { icon: "✨", title: "Enduits décoratifs & stuc", desc: "Stuc vénitien, tadelakt, béton ciré. Artisans formés aux techniques décoratives haut de gamme.", price: "48–90€/m²" },
              { icon: "🎨", title: "Conseil en colorimétrie", desc: "Service exclusif : visite à domicile, nuancier personnalisé, simulation couleurs avant travaux.", price: "Inclus devis" },
            ].map((t, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border-[1.5px] border-[#e8d0d8] bg-white p-6 transition hover:border-[#be123c] hover:shadow-[0_8px_24px_rgba(190,18,60,0.1)]">
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">Guide expert</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl" style={{ fontFamily: "serif" }}>
            Tout savoir sur la peinture<br />à Fontaine-lès-Dijon
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="text-[15px] leading-relaxed text-[#6a3a4a]">
              <h3 className="mb-3 text-[22px] font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>Fontaine-lès-Dijon : la commune haut de gamme de la métropole</h3>
              <p className="mb-4">Fontaine-lès-Dijon, 9 200 habitants nichés entre la forêt domaniale de Velours et les hauteurs nord de Dijon, est la commune la plus prisée de la métropole dijonnaise. Avec un revenu médian parmi les plus élevés de Côte-d'Or et un parc immobilier composé à 58% de maisons individuelles, elle génère une demande qualitative en travaux de peinture unique dans notre réseau.</p>
              <p className="mb-4">En 2025–2026, 73 projets ont été publiés sur notre plateforme — un chiffre modeste en volume mais remarquable en valeur moyenne : le budget moyen par projet à Fontaine est de 4 800€, contre 2 900€ pour l'ensemble de la métropole dijonnaise.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>L'influence de la forêt sur les travaux de peinture</h3>
              <p className="mb-4">La forêt domaniale de Velours, qui borde Fontaine-lès-Dijon au nord et à l'est, crée un micro-climat particulier : humidité relative plus élevée (12% de plus qu'à Dijon centre selon les données Météo-France), températures plus fraîches en été et chutes de feuilles importantes en automne. Ces conditions influencent directement les choix techniques des artisans locaux.</p>
              <p className="mb-4">Pour les façades, nos artisans recommandent exclusivement des peintures microporeuses et respirantes, permettant à la vapeur d'eau de s'échapper sans décoller le revêtement. Pour les intérieurs, une aération renforcée pendant et après les travaux est systématiquement préconisée.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>Peinture à la chaux : la spécialité de Fontaine</h3>
              <p className="mb-4">Fontaine-lès-Dijon concentre un nombre inhabituel de maisons bourgeoises et de villas des années 1920–1960, dont beaucoup ont conservé leurs boiseries d'origine, leurs moulures et leurs parquets anciens. Ces biens nécessitent des techniques de peinture traditionnelles que peu d'artisans maîtrisent encore.</p>
              <p className="mb-4">Pierre H., avec 22 ans d'expérience et 156 chantiers réalisés, est l'un des rares artisans de Côte-d'Or spécialisé dans la peinture à la chaux naturelle. Sa technique préserve la respirabilité des murs anciens tout en offrant un rendu mat velouté inimitable.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>Données du marché — Fontaine-lès-Dijon 2026</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Projets publiés 2025–2026 : <strong>73</strong></li>
                <li>Budget moyen par projet : <strong>4 800€</strong> (vs 2 900€ métropole)</li>
                <li>Prix moyen constaté : <strong>37€/m²</strong></li>
                <li>Part projets maisons de caractère : <strong>41%</strong></li>
                <li>Délai moyen 1er contact : <strong>5h20</strong></li>
                <li>Satisfaction clients : <strong>97%</strong></li>
                <li>Note moyenne artisans : <strong>4.9/5</strong></li>
              </ul>
            </div>

            <div className="sticky top-6">
              <div className="mb-4 rounded-2xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-6">
                <h4 className="mb-3 text-base font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>📊 Données Fontaine 2026</h4>
                {[
                  { k: "Prix moyen standard", v: "34€/m²" },
                  { k: "Prix moyen premium", v: "48€/m²" },
                  { k: "Budget moyen projet", v: "4 800€" },
                  { k: "Artisans actifs", v: "6" },
                  { k: "Satisfaction", v: "4.9/5" },
                  { k: "Délai réponse", v: "4–7h" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between border-b border-[#e8d0d8] py-2 text-[13px] last:border-0">
                    <span className="text-[#6a3a4a]">{s.k}</span><span className="font-bold text-[#2a0a14]">{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-6">
                <h4 className="mb-3 text-base font-bold text-[#2a0a14]" style={{ fontFamily: "serif" }}>🔗 Pages liées</h4>
                {[
                  { label: "Peinture Dijon", href: "/devis-peinture-interieure-dijon" },
                  { label: "Peinture Talant", href: "/devis-peinture-talant" },
                  { label: "Peinture Ahuy", href: "/devis-peinture-ahuy" },
                  { label: "Peinture Daix", href: "/devis-peinture-daix" },
                ].map((l, i) => (
                  <div key={i} className="flex justify-between py-2 text-[13px]">
                    <Link href={l.href} className="text-[#be123c] no-underline">{l.label}</Link>
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
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl" style={{ fontFamily: "serif" }}>Questions fréquentes<br />— Fontaine-lès-Dijon</h2>
          <div className="max-w-[700px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#be123c]">Explorer</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#2a0a14] md:text-5xl" style={{ fontFamily: "serif" }}>Pages liées</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Peinture Dijon 21000", sub: "18 artisans · 32–45€/m²", href: "/devis-peinture-interieure-dijon" },
              { title: "Peinture Talant 21240", sub: "9 artisans · 28–42€/m²", href: "/devis-peinture-talant" },
              { title: "Peinture Chenôve 21300", sub: "12 artisans · 26–40€/m²", href: "/devis-peinture-chenove" },
              { title: "Peinture Quetigny 21800", sub: "7 artisans · 28–43€/m²", href: "/devis-peinture-quetigny" },
              { title: "Peinture à la chaux Fontaine", sub: "Spécialiste Pierre H. · 5.0/5", href: "#" },
              { title: "Maisons de caractère Dijon", sub: "Restauration boiseries anciennes", href: "#" },
              { title: "Peinture Ahuy 21121", sub: "4 artisans · 28–43€/m²", href: "#" },
              { title: "Guide peinture haut de gamme", sub: "73 projets analysés Fontaine", href: "#" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="rounded-xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-4 no-underline transition hover:-translate-y-0.5 hover:border-[#be123c]">
                <div className="mb-1 text-[13px] font-bold text-[#2a0a14]">{link.title}</div>
                <div className="text-xs text-[#6a3a4a]">{link.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #2a0a14, #4a0a24)" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#fda4af]">Prêt à démarrer ?</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Recevez vos devis gratuits<br />à Fontaine-lès-Dijon
          </h2>
          <p className="mb-10 text-base text-white/70">6 artisans d'excellence à Fontaine-lès-Dijon — spécialistes finitions haut de gamme & maisons de caractère.</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#be123c] px-12 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(190,18,60,0.4)] transition hover:scale-105 hover:bg-[#e11d48]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Artisans sélectionnés 4.7/5 minimum</p>
        </div>
      </section>

      {/* Schema JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Fontaine-lès-Dijon", url: "https://premiumartisan.fr/devis-peinture-fontaine-les-dijon", areaServed: { "@type": "City", name: "Fontaine-lès-Dijon", postalCode: "21121" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "58" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
