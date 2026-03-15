"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix de la peinture intérieure à Talant en 2026 ?", a: "Le prix moyen de la peinture intérieure à Talant varie entre 28€ et 42€/m². Pour un appartement de 60m², comptez entre 1 450€ et 2 700€ tout compris (main d'œuvre + fournitures + préparation)." },
  { q: "Combien d'artisans peintres sont disponibles à Talant ?", a: "Notre réseau compte 9 artisans peintres actifs à Talant et dans le secteur nord-ouest de Dijon. Ils interviennent aussi sur Fontaine-lès-Dijon, Ahuy et Dijon centre." },
  { q: "Quel est le délai pour trouver un peintre à Talant ?", a: "Sur PremiumArtisan, vous recevez vos premiers devis en 3 à 5h après publication de votre projet. Le délai moyen pour démarrer un chantier à Talant est de 1 à 3 semaines selon la saison." },
  { q: "Les artisans de Talant interviennent-ils dans toute la Côte-d'Or ?", a: "Oui, les artisans basés à Talant couvrent généralement un rayon de 25 km, incluant Dijon, Fontaine-lès-Dijon, Ahuy, Daix et les communes du plateau bourguignon." },
  { q: "Est-ce gratuit de demander des devis à Talant ?", a: "Oui, 100% gratuit pour les particuliers. Vous publiez votre projet en 2 minutes et recevez jusqu'à 4 devis d'artisans locaux vérifiés, sans engagement." },
  { q: "Quelles sont les spécificités des chantiers de peinture à Talant ?", a: "Talant est une commune en hauteur avec un bâti mixte : grands ensembles des années 70–80 et maisons individuelles récentes. Les appartements nécessitent souvent un traitement anti-humidité, les maisons des finitions soignées sur façades." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[1.5px] border-[#e0d8ce] py-5">
      <div className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[#1a1714]" onClick={() => setOpen(!open)}>
        <span className="text-base">{question}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="mt-3 text-sm leading-relaxed text-[#7a6f65]">{answer}</div>}
    </div>
  );
}

export default function DevisPeintureTalant() {
  return (
    <main className="min-h-screen" style={{ background: "#f8f5ef" }}>

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#1a1714] px-8 py-4">
        <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#e8832a]">Artisan</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/70 hover:text-white">Accueil</Link>
          <Link href="/devis-peinture-interieure-dijon" className="text-sm text-white/70 hover:text-white">Dijon</Link>
          <Link href="#prix" className="text-sm text-white/70 hover:text-white">Prix</Link>
          <Link href="#artisans" className="text-sm text-white/70 hover:text-white">Artisans</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-8 pb-16 pt-20" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2e1a4a 60%, #1a1a3a 100%)" }}>
        <div className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(120,80,200,0.15) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7850c8]/40 bg-[#7850c8]/20 px-3.5 py-1.5 text-[13px] font-semibold text-[#c084fc]">
            📍 Talant 21240 — Données 2026
          </div>

          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl" style={{ fontFamily: "serif" }}>
            Peinture Intérieure<br />à <em className="not-italic text-[#c084fc]">Talant</em> — Prix<br />& Devis Gratuit 2026
          </h1>

          <p className="mb-10 max-w-[600px] text-lg text-white/75">
            Comparez jusqu'à 4 artisans peintres vérifiés à Talant. Prix moyen constaté : <strong className="text-white">28–42€/m²</strong>. Réponse en 3 à 5h, sans engagement.
          </p>

          {/* TRUST BADGES */}
          <div className="mb-12 flex flex-wrap gap-4">
            {[
              { value: "⭐ 4.8/5", label: "Avis clients" },
              { value: "9", label: "Peintres à Talant" },
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

          {/* BUTON CTA HERO */}
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#7850c8] px-10 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(120,80,200,0.4)] transition hover:scale-105 hover:bg-[#9060e0]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Réponse en 3–5h</p>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7850c8]">Pourquoi nous choisir</div>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-[#1a1714] md:text-4xl" style={{ fontFamily: "serif" }}>
            La référence peinture<br />à Talant
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { icon: "🔍", title: "Artisans vérifiés", desc: "SIRET + RC Pro contrôlés avant chaque mise en relation" },
              { icon: "💶", title: "Prix transparents", desc: "Devis détaillés main d'œuvre et fournitures séparés" },
              { icon: "⚡", title: "Réponse rapide", desc: "3 à 5h en moyenne pour recevoir vos premiers devis" },
              { icon: "🛡️", title: "Sans spam", desc: "Maximum 4 artisans contactés par projet" },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d8ce] p-6 text-center">
                <div className="mb-3 text-[36px]">{f.icon}</div>
                <div className="mb-2 text-base font-bold text-[#1a1714]">{f.title}</div>
                <div className="text-[13px] text-[#7a6f65]">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="px-8 py-20" style={{ background: "#f8f5ef" }} id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7850c8]">Prix réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Combien coûte la peinture<br />intérieure à Talant ?
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#7a6f65]">
            Données collectées sur 98 projets publiés à Talant et dans le secteur nord-ouest de Dijon (21240). Prix observés entre janvier et mars 2026.
          </p>
          <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { label: "Peinture murale", price: "28–40€", details: ["Main d'œuvre: 16–20€/m²", "Fournitures: 8–12€/m²", "Préparation: 4–8€/m²"], featured: false },
              { label: "Peinture plafond ⭐", price: "30–48€", details: ["Main d'œuvre: 18–24€/m²", "Fournitures: 8–14€/m²", "Préparation: 4–10€/m²"], featured: true },
              { label: "Rénovation complète", price: "34–54€", details: ["Murs + plafonds + boiseries", "Enduit & rebouchage inclus", "Protection mobilier incluse"], featured: false },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-2 p-6 transition hover:-translate-y-1 ${c.featured ? "border-[#7850c8]" : "border-[#e0d8ce] hover:border-[#7850c8]"}`} style={c.featured ? { background: "linear-gradient(135deg, #f5f0ff, white)" } : {}}>
                <div className="mb-2 text-[13px] font-semibold text-[#7a6f65]">{c.label}</div>
                <div className="text-[32px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>{c.price}</div>
                <div className="text-sm text-[#7a6f65]">par m²</div>
                <div className="mt-4 space-y-1 text-[13px] text-[#7a6f65]">
                  {c.details.map((d, j) => <div key={j} className={j < 2 ? "border-b border-[#e0d8ce] py-1" : "py-1"}>{d}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1a1a2e] text-white">
                  <th className="rounded-tl-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Surface logement</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Peinture simple</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Rénovation complète</th>
                  <th className="rounded-tr-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Délai chantier</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surf: "Studio 25m²", s: "820€ – 1 100€", r: "1 150€ – 1 700€", d: "2–3 jours" },
                  { surf: "Appartement 60m²", s: "1 450€ – 2 350€", r: "2 300€ – 3 800€", d: "4–6 jours" },
                  { surf: "Appartement 90m²", s: "2 350€ – 3 800€", r: "3 800€ – 6 000€", d: "6–8 jours" },
                  { surf: "Maison 120m²", s: "3 400€ – 5 200€", r: "5 200€ – 8 000€", d: "8–11 jours" },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-white">
                    <td className="border-b border-[#e0d8ce] px-4 py-3.5 text-sm">{r.surf}</td>
                    <td className="border-b border-[#e0d8ce] px-4 py-3.5 text-sm font-bold text-[#7850c8]" style={{ fontFamily: "serif" }}>{r.s}</td>
                    <td className="border-b border-[#e0d8ce] px-4 py-3.5 text-sm font-bold text-[#7850c8]" style={{ fontFamily: "serif" }}>{r.r}</td>
                    <td className="border-b border-[#e0d8ce] px-4 py-3.5 text-sm">{r.d}</td>
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7850c8]">Délais moyens</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Trouver un peintre<br />à Talant rapidement
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#7a6f65]">
            Talant bénéficie d'une position idéale en hauteur dominant Dijon, avec un réseau d'artisans locaux réactifs couvrant tout le secteur nord-ouest de la Côte-d'Or.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", time: "3–5h", label: "Premiers devis reçus" },
              { icon: "📅", time: "1–3 sem.", label: "Délai démarrage chantier" },
              { icon: "🎨", time: "2–8 j.", label: "Durée chantier moyenne" },
              { icon: "✅", time: "4.8/5", label: "Satisfaction clients Talant" },
            ].map((d, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d8ce] bg-[#f8f5ef] p-6 text-center">
                <div className="mb-3 text-[32px]">{d.icon}</div>
                <div className="text-[28px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>{d.time}</div>
                <div className="mt-1 text-[13px] text-[#7a6f65]">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISANS VERIFIES */}
      <section className="px-8 py-20" style={{ background: "#f8f5ef" }} id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7850c8]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Artisans peintres vérifiés<br />à Talant
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#7a6f65]">Chaque artisan est contrôlé : SIRET actif, assurance RC Pro à jour, avis clients vérifiés.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { initials: "FB", name: "François B.", spec: "Peinture intérieure & rénovation", exp: "16 ans d'expérience", zone: "Talant · Dijon · Fontaine-lès-Dijon", note: "4.9/5", chantiers: "102 chantiers" },
              { initials: "AD", name: "Antoine D.", spec: "Peinture décorative & enduit", exp: "11 ans d'expérience", zone: "Talant · Ahuy · Daix", note: "4.8/5", chantiers: "74 chantiers" },
              { initials: "JM", name: "Julien M.", spec: "Rénovation complète & façade", exp: "8 ans d'expérience", zone: "Talant · Dijon Nord · Plombières", note: "4.7/5", chantiers: "52 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d8ce] bg-white p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #1a1a2e, #4a2a8e)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#1a1714]">{a.name}</div>
                    <div className="text-xs text-[#7850c8]">{a.note} · {a.chantiers}</div>
                  </div>
                </div>
                <div className="mb-2 text-[13px] font-semibold text-[#1a1714]">{a.spec}</div>
                <div className="mb-1 text-xs text-[#7a6f65]">📅 {a.exp}</div>
                <div className="text-xs text-[#7a6f65]">📍 {a.zone}</div>
                <a href="/publier-projet" className="mt-4 block rounded-xl bg-[#7850c8] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#9060e0]">
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7850c8]">Galerie</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Avant / Après — Chantiers<br />réalisés à Talant
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#7a6f65]">Projets réels réalisés par nos artisans à Talant et alentours en 2025–2026.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { title: "Appartement — Résidence du Château", detail: "Peinture intégrale · 62m²", price: "Budget: 1 780€ · Délai: 5 jours" },
              { title: "Maison individuelle — Talant Haut", detail: "Rénovation murs + plafonds · 95m²", price: "Budget: 3 200€ · Délai: 8 jours" },
              { title: "Appartement — Rue de la Forêt", detail: "Peinture + enduit · 45m²", price: "Budget: 1 250€ · Délai: 3 jours" },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border-[1.5px] border-[#e0d8ce]">
                <div className="grid h-[180px] grid-cols-2">
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#8a7a6a] to-[#6a5a4a] text-[40px]">
                    🏚️<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">AVANT</span>
                  </div>
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#e8d8f8] to-[#f5f0ff] text-[40px]">
                    🏠<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">APRÈS</span>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="mb-1 text-sm font-bold text-[#1a1714]">{item.title}</div>
                  <div className="text-xs text-[#7a6f65]">{item.detail}</div>
                  <div className="mt-1.5 text-[13px] font-bold text-[#7850c8]">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="px-8 py-20" style={{ background: "#f8f5ef" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7850c8]">Avis clients vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Ce que disent nos clients<br />à Talant
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Caroline M.", loc: "Talant · Appartement 70m²", text: "Service impeccable ! 3 devis reçus en 3h. L'artisan François était très professionnel, résultat magnifique dans mon appartement de Talant. Je recommande vivement.", avatar: "CM" },
              { name: "Thomas G.", loc: "Talant · Maison 100m²", text: "Excellente expérience. J'ai économisé 750€ en comparant les devis. Chantier terminé en 8 jours, parfaitement propre. Les voisins m'ont déjà demandé le contact.", avatar: "TG" },
              { name: "Sylvie P.", loc: "Talant · Studio 35m²", text: "Très bonne plateforme. Rapide, efficace et sans prise de tête. L'artisan a respecté mon budget et le délai. Studio entièrement refait en 2 jours. Bravo !", avatar: "SP" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d8ce] bg-white p-6">
                <div className="mb-3 text-base text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <div className="mb-4 text-sm italic leading-relaxed text-[#7a6f65]">"{t.text}"</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #1a1a2e, #4a2a8e)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#1a1714]">{t.name}</div>
                    <div className="text-xs text-[#7a6f65]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HYPERLOCAL */}
      <section className="bg-[#1a1a2e] px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c084fc]">Communes voisines</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Artisans peintres près<br />de Talant
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-white/60">Nos artisans interviennent dans tout le secteur nord-ouest de Dijon et la Côte-d'Or.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", code: "21000", artisans: "18", prix: "32–45€/m²", delai: "2–4h" },
              { name: "Fontaine-lès-Dijon", code: "21121", artisans: "6", prix: "29–44€/m²", delai: "4–7h" },
              { name: "Ahuy", code: "21121", artisans: "4", prix: "28–42€/m²", delai: "4–6h" },
              { name: "Chenôve", code: "21300", artisans: "12", prix: "26–40€/m²", delai: "3–6h" },
              { name: "Quetigny", code: "21800", artisans: "7", prix: "28–43€/m²", delai: "3–6h" },
              { name: "Longvic", code: "21600", artisans: "8", prix: "27–41€/m²", delai: "4–6h" },
            ].map((q, i) => (
              <div key={i} className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-[#c084fc] hover:bg-white/10">
                <div className="mb-1 text-lg font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="mb-3 text-xs text-white/40">{q.code}</div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Artisans actifs</span><span className="font-bold text-[#c084fc]">{q.artisans}</span></div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Prix moyen</span><span className="font-bold text-[#c084fc]">{q.prix}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-white/50">Délai réponse</span><span className="font-bold text-[#c084fc]">{q.delai}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES TRAVAUX */}
      <section className="px-8 py-20" style={{ background: "#f8f5ef" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7850c8]">Types de travaux</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Tous types de peinture<br />à Talant
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { icon: "🖌️", title: "Peinture intérieure murale", desc: "Murs, plafonds, boiseries. Finition mate, satinée ou brillante selon vos préférences.", price: "28–40€/m²" },
              { icon: "🏠", title: "Ravalement de façade", desc: "Nettoyage, rebouchage et application d'enduit ou peinture extérieure résistante.", price: "50–78€/m²" },
              { icon: "🔧", title: "Enduit & préparation", desc: "Rebouchage fissures, lissage, ponçage. Indispensable pour une finition parfaite.", price: "15–25€/m²" },
              { icon: "✨", title: "Peinture décorative", desc: "Effets béton ciré, stuc, tadelakt. Artisans spécialisés disponibles à Talant.", price: "44–88€/m²" },
              { icon: "🏢", title: "Peinture locaux commerciaux", desc: "Bureaux, commerces. Peintures techniques anti-salissures disponibles à Talant.", price: "29–50€/m²" },
              { icon: "🌿", title: "Peinture écologique", desc: "Peintures naturelles, sans COV, certifiées. Idéal pour chambres d'enfants.", price: "34–54€/m²" },
            ].map((t, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border-[1.5px] border-[#e0d8ce] bg-white p-6 transition hover:border-[#7850c8] hover:shadow-[0_8px_24px_rgba(120,80,200,0.1)]">
                <div className="shrink-0 text-[28px]">{t.icon}</div>
                <div>
                  <div className="mb-1 text-base font-bold text-[#1a1714]">{t.title}</div>
                  <div className="mb-2 text-[13px] text-[#7a6f65]">{t.desc}</div>
                  <div className="text-[13px] font-bold text-[#7850c8]">{t.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE EXPERT */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7850c8]">Guide expert</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Tout savoir sur la peinture<br />intérieure à Talant
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="text-[15px] leading-relaxed text-[#7a6f65]">
              <h3 className="mb-3 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Le marché de la peinture à Talant en 2026</h3>
              <p className="mb-4">Talant, commune de 11 500 habitants perchée sur les hauteurs dominant Dijon, présente un marché de la peinture intérieure particulièrement dynamique. La ville combine un parc de logements collectifs datant des années 1970–1985 et un secteur pavillonnaire plus récent, générant une demande diversifiée en travaux de peinture et rénovation.</p>
              <p className="mb-4">En 2025–2026, notre plateforme a enregistré 98 projets publiés à Talant, en hausse de 14% par rapport à l'année précédente. Les appartements des quartiers Belvédère et Monts représentent 65% des projets, tandis que les maisons individuelles du plateau constituent les 35% restants.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Spécificités du bâti à Talant</h3>
              <p className="mb-4">La position en altitude de Talant (350m) implique des contraintes particulières pour les travaux de peinture extérieure. Les façades sont davantage exposées aux intempéries, aux vents et aux variations thermiques importantes entre été et hiver. Les artisans locaux sont habitués à ces conditions et recommandent des peintures façade avec indice de résistance aux UV et au gel élevé.</p>
              <p className="mb-4">Pour les intérieurs, l'humidité relative plus élevée en altitude nécessite parfois l'application d'une sous-couche anti-humidité avant la peinture de finition, notamment dans les pièces exposées au nord.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Prix de la peinture à Talant vs Dijon</h3>
              <ul className="mb-4 list-disc space-y-2 pl-5">
                <li>Peinture murale : <strong>28–40€/m²</strong> — comparable au prix dijonnais</li>
                <li>Façade : <strong>50–78€/m²</strong> — légèrement supérieur en raison des contraintes d'altitude</li>
                <li>Délai intervention : <strong>1–3 semaines</strong> selon saison</li>
                <li>Économie moyenne vs 1er devis : <strong>15%</strong></li>
              </ul>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Données du marché — Talant 2026</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Projets publiés en 2025–2026 : <strong>98</strong></li>
                <li>Prix moyen constaté : <strong>34€/m²</strong></li>
                <li>Devis reçus par projet : <strong>3,0</strong></li>
                <li>Délai moyen 1er contact : <strong>4h10</strong></li>
                <li>Satisfaction clients : <strong>96%</strong></li>
                <li>Économie vs premier devis : <strong>15%</strong></li>
              </ul>
            </div>

            <div className="sticky top-6">
              <div className="mb-4 rounded-2xl border-[1.5px] border-[#e0d8ce] bg-[#f8f5ef] p-6">
                <h4 className="mb-3 text-base font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>📊 Données Talant 2026</h4>
                {[
                  { k: "Prix moyen mur", v: "31€/m²" },
                  { k: "Prix moyen plafond", v: "36€/m²" },
                  { k: "Projets publiés", v: "98" },
                  { k: "Artisans actifs", v: "9" },
                  { k: "Satisfaction", v: "4.8/5" },
                  { k: "Délai réponse", v: "3–5h" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between border-b border-[#e0d8ce] py-2 text-[13px] last:border-0">
                    <span className="text-[#7a6f65]">{s.k}</span><span className="font-bold text-[#1a1714]">{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border-[1.5px] border-[#e0d8ce] bg-[#f8f5ef] p-6">
                <h4 className="mb-3 text-base font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>🔗 Pages liées</h4>
                {[
                  { label: "Peinture Dijon", href: "/devis-peinture-interieure-dijon" },
                  { label: "Peinture Chenôve", href: "/devis-peinture-chenove" },
                  { label: "Peinture Fontaine-lès-Dijon", href: "/devis-peinture-fontaine-les-dijon" },
                  { label: "Peinture Longvic", href: "/devis-peinture-longvic" },
                ].map((l, i) => (
                  <div key={i} className="flex justify-between py-2 text-[13px]">
                    <Link href={l.href} className="text-[#7850c8] no-underline">{l.label}</Link>
                    <span className="font-bold text-[#1a1714]">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-20" style={{ background: "#f8f5ef" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7850c8]">FAQ</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Questions fréquentes<br />— Talant</h2>
          <div className="max-w-[700px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#7850c8]">Explorer</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Pages liées</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Peinture Dijon 21000", sub: "18 artisans · 32–45€/m²", href: "/devis-peinture-interieure-dijon" },
              { title: "Peinture Chenôve 21300", sub: "12 artisans · 26–40€/m²", href: "/devis-peinture-chenove" },
              { title: "Peinture Fontaine-lès-Dijon", sub: "6 artisans · 29–44€/m²", href: "/devis-peinture-fontaine-les-dijon" },
              { title: "Peinture Longvic 21600", sub: "8 artisans · 27–41€/m²", href: "/devis-peinture-longvic" },
              { title: "Prix façade Talant", sub: "50–78€/m² · Devis gratuit", href: "#" },
              { title: "Rénovation Talant", sub: "Tous corps de métier", href: "#" },
              { title: "Artisans Côte-d'Or", sub: "47 artisans vérifiés", href: "#" },
              { title: "Guide prix peinture 2026", sub: "847 projets analysés", href: "#" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="rounded-xl border-[1.5px] border-[#e0d8ce] bg-[#f8f5ef] p-4 no-underline transition hover:-translate-y-0.5 hover:border-[#7850c8]">
                <div className="mb-1 text-[13px] font-bold text-[#1a1714]">{link.title}</div>
                <div className="text-xs text-[#7a6f65]">{link.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #1a1a2e, #2e1a4a)" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c084fc]">Prêt à démarrer ?</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Recevez vos devis gratuits<br />en moins de 5h à Talant
          </h2>
          <p className="mb-10 text-base text-white/70">9 artisans peintres vérifiés à Talant et alentours. Sans engagement, sans spam.</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#7850c8] px-12 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(120,80,200,0.4)] transition hover:scale-105 hover:bg-[#9060e0]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Max 4 artisans</p>
        </div>
      </section>

      {/* Schema JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Talant", url: "https://premiumartisan.fr/devis-peinture-talant", areaServed: { "@type": "City", name: "Talant", postalCode: "21240" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "76" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
// Talant component
