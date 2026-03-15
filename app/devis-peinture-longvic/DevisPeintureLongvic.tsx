// Longvic component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix de la peinture intérieure à Longvic en 2026 ?", a: "Le prix moyen à Longvic varie entre 27€ et 41€/m². Pour un appartement de 60m², comptez entre 1 350€ et 2 500€ tout compris. Longvic bénéficie de tarifs légèrement inférieurs à Dijon centre grâce à la proximité des artisans locaux." },
  { q: "Longvic est-elle bien couverte par les artisans peintres ?", a: "Oui. Longvic bénéficie d'une excellente couverture grâce à sa proximité avec l'aéroport Dijon-Bourgogne et la zone industrielle. 8 artisans peintres vérifiés sont actifs sur la commune et interviennent aussi sur Chenôve, Dijon sud et Sennecey-lès-Dijon." },
  { q: "Quel délai pour obtenir un devis peinture à Longvic ?", a: "En moyenne 4 à 6h sur PremiumArtisan. Les artisans de Longvic sont réactifs car la commune est bien desservie et les déplacements sont rapides depuis la zone sud de Dijon." },
  { q: "Y a-t-il des spécificités pour les chantiers peinture à Longvic ?", a: "Oui. Le parc immobilier de Longvic comprend de nombreux logements sociaux (OPAC) et maisons de ville construits entre 1960 et 1990. Ces biens nécessitent souvent un traitement préalable : rebouchage, sous-couche anti-humidité, parfois traitement anti-moisissures dans les pièces humides." },
  { q: "Les artisans de Longvic interviennent-ils sur Dijon et alentours ?", a: "Oui, les artisans basés à Longvic couvrent Dijon, Chenôve, Sennecey-lès-Dijon, Perrigny-lès-Dijon et les communes de la plaine de Saône jusqu'à 30 km." },
  { q: "Comment obtenir le meilleur prix pour des travaux de peinture à Longvic ?", a: "Publiez votre projet sur PremiumArtisan pour recevoir jusqu'à 4 devis comparatifs. Les projets publiés à Longvic économisent en moyenne 14% par rapport au premier devis obtenu. Planifier hors saison (octobre–mars) permet d'obtenir des tarifs encore plus avantageux." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[1.5px] border-[#e8ddd0] py-5">
      <div className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[#1a1714]" onClick={() => setOpen(!open)}>
        <span className="text-base">{question}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="mt-3 text-sm leading-relaxed text-[#6b5a4a]">{answer}</div>}
    </div>
  );
}

export default function DevisPeintureLongvic() {
  return (
    <main className="min-h-screen" style={{ background: "#fdf8f2" }}>

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#2a1a0a] px-8 py-4">
        <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#f59e0b]">Artisan</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/70 hover:text-white">Accueil</Link>
          <Link href="/devis-peinture-interieure-dijon" className="text-sm text-white/70 hover:text-white">Dijon</Link>
          <Link href="#prix" className="text-sm text-white/70 hover:text-white">Prix</Link>
          <Link href="#artisans" className="text-sm text-white/70 hover:text-white">Artisans</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-8 pb-16 pt-20" style={{ background: "linear-gradient(135deg, #2a1a0a 0%, #4a2e0a 60%, #3a2010 100%)" }}>
        <div className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/20 px-3.5 py-1.5 text-[13px] font-semibold text-[#fcd34d]">
            📍 Longvic 21600 — Données 2026
          </div>

          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl" style={{ fontFamily: "serif" }}>
            Peinture Intérieure<br />à <em className="not-italic text-[#fcd34d]">Longvic</em> — Prix<br />& Devis Gratuit 2026
          </h1>

          <p className="mb-10 max-w-[600px] text-lg text-white/75">
            Comparez jusqu'à 4 artisans peintres vérifiés à Longvic. Prix moyen constaté : <strong className="text-white">27–41€/m²</strong>. Réponse en 4 à 6h, sans engagement.
          </p>

          <div className="mb-12 flex flex-wrap gap-4">
            {[
              { value: "⭐ 4.8/5", label: "Avis clients" },
              { value: "8", label: "Peintres à Longvic" },
              { value: "4–6h", label: "Réponse moyenne" },
              { value: "Max 4", label: "Artisans (anti-spam)" },
              { value: "100%", label: "Gratuit & sans engagement" },
            ].map((b, i) => (
              <div key={i} className="min-w-[130px] rounded-xl border border-white/15 bg-white/[0.08] px-5 py-4 text-center">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "serif" }}>{b.value}</div>
                <div className="mt-0.5 text-xs text-white/60">{b.label}</div>
              </div>
            ))}
          </div>

          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#d97706] px-10 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(217,119,6,0.4)] transition hover:scale-105 hover:bg-[#f59e0b]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Réponse en 4–6h</p>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d97706]">Pourquoi nous choisir</div>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-[#1a1714] md:text-4xl" style={{ fontFamily: "serif" }}>
            La référence peinture<br />à Longvic
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { icon: "🔍", title: "Artisans vérifiés", desc: "SIRET actif + RC Pro contrôlés avant chaque mise en relation" },
              { icon: "💶", title: "Devis détaillés", desc: "Main d'œuvre et fournitures toujours séparés dans les devis" },
              { icon: "⚡", title: "Réponse 4–6h", desc: "Délai moyen constaté sur 108 projets publiés à Longvic" },
              { icon: "🛡️", title: "Anti-spam", desc: "Maximum 4 artisans contactés — zéro démarchage abusif" },
            ].map((f, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8ddd0] p-6 text-center">
                <div className="mb-3 text-[36px]">{f.icon}</div>
                <div className="mb-2 text-base font-bold text-[#1a1714]">{f.title}</div>
                <div className="text-[13px] text-[#6b5a4a]">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="px-8 py-20" style={{ background: "#fdf8f2" }} id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d97706]">Prix réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Combien coûte la peinture<br />intérieure à Longvic ?
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6b5a4a]">
            Données issues de 108 projets publiés à Longvic et dans le secteur sud-est de Dijon (21600) entre janvier et mars 2026.
          </p>
          <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { label: "Peinture murale", price: "27–38€", details: ["Main d'œuvre: 15–19€/m²", "Fournitures: 8–11€/m²", "Préparation: 4–8€/m²"], featured: false },
              { label: "Peinture plafond ⭐", price: "29–46€", details: ["Main d'œuvre: 17–23€/m²", "Fournitures: 8–14€/m²", "Préparation: 4–9€/m²"], featured: true },
              { label: "Rénovation complète", price: "33–53€", details: ["Murs + plafonds + boiseries", "Traitement anti-humidité inclus", "Protection mobilier incluse"], featured: false },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-2 p-6 transition hover:-translate-y-1 ${c.featured ? "border-[#d97706]" : "border-[#e8ddd0] hover:border-[#d97706]"}`} style={c.featured ? { background: "linear-gradient(135deg, #fffbeb, white)" } : {}}>
                <div className="mb-2 text-[13px] font-semibold text-[#6b5a4a]">{c.label}</div>
                <div className="text-[32px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>{c.price}</div>
                <div className="text-sm text-[#6b5a4a]">par m²</div>
                <div className="mt-4 space-y-1 text-[13px] text-[#6b5a4a]">
                  {c.details.map((d, j) => <div key={j} className={j < 2 ? "border-b border-[#e8ddd0] py-1" : "py-1"}>{d}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2a1a0a] text-white">
                  <th className="rounded-tl-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Surface logement</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Peinture simple</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Rénovation complète</th>
                  <th className="rounded-tr-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Délai chantier</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surf: "Studio 25m²", s: "750€ – 1 020€", r: "1 050€ – 1 620€", d: "2–3 jours" },
                  { surf: "Appartement 60m²", s: "1 350€ – 2 150€", r: "2 150€ – 3 500€", d: "3–5 jours" },
                  { surf: "Appartement 90m²", s: "2 150€ – 3 500€", r: "3 500€ – 5 600€", d: "5–8 jours" },
                  { surf: "Maison 120m²", s: "3 100€ – 4 900€", r: "4 800€ – 7 600€", d: "7–10 jours" },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-white">
                    <td className="border-b border-[#e8ddd0] px-4 py-3.5 text-sm">{r.surf}</td>
                    <td className="border-b border-[#e8ddd0] px-4 py-3.5 text-sm font-bold text-[#d97706]" style={{ fontFamily: "serif" }}>{r.s}</td>
                    <td className="border-b border-[#e8ddd0] px-4 py-3.5 text-sm font-bold text-[#d97706]" style={{ fontFamily: "serif" }}>{r.r}</td>
                    <td className="border-b border-[#e8ddd0] px-4 py-3.5 text-sm">{r.d}</td>
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d97706]">Délais moyens</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Trouver un peintre<br />à Longvic rapidement
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6b5a4a]">
            Longvic, commune dynamique de 8 000 habitants jouxtant l'aéroport Dijon-Bourgogne, bénéficie d'un réseau d'artisans locaux bien établi, habitués aux chantiers dans les logements collectifs et les pavillons du secteur.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", time: "4–6h", label: "Premiers devis reçus" },
              { icon: "📅", time: "1–2 sem.", label: "Délai démarrage chantier" },
              { icon: "🎨", time: "2–7 j.", label: "Durée chantier moyenne" },
              { icon: "✅", time: "4.8/5", label: "Satisfaction clients Longvic" },
            ].map((d, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8ddd0] bg-[#fdf8f2] p-6 text-center">
                <div className="mb-3 text-[32px]">{d.icon}</div>
                <div className="text-[28px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>{d.time}</div>
                <div className="mt-1 text-[13px] text-[#6b5a4a]">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISANS */}
      <section className="px-8 py-20" style={{ background: "#fdf8f2" }} id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d97706]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Artisans peintres vérifiés<br />à Longvic
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6b5a4a]">SIRET actif, assurance RC Pro à jour, avis clients vérifiés — chaque artisan est contrôlé avant d'intégrer notre réseau.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { initials: "RC", name: "Romain C.", spec: "Peinture intérieure & rénovation lourde", exp: "12 ans d'expérience", zone: "Longvic · Chenôve · Dijon Sud", note: "4.9/5", chantiers: "91 chantiers" },
              { initials: "NB", name: "Nicolas B.", spec: "Traitement humidité & peinture technique", exp: "10 ans d'expérience", zone: "Longvic · Sennecey · Perrigny", note: "4.8/5", chantiers: "67 chantiers" },
              { initials: "VL", name: "Vincent L.", spec: "Peinture maison & façade pavillonnaire", exp: "6 ans d'expérience", zone: "Longvic · Dijon · Ouges", note: "4.7/5", chantiers: "38 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8ddd0] bg-white p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #2a1a0a, #6b3a0a)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#1a1714]">{a.name}</div>
                    <div className="text-xs text-[#d97706]">{a.note} · {a.chantiers}</div>
                  </div>
                </div>
                <div className="mb-2 text-[13px] font-semibold text-[#1a1714]">{a.spec}</div>
                <div className="mb-1 text-xs text-[#6b5a4a]">📅 {a.exp}</div>
                <div className="text-xs text-[#6b5a4a]">📍 {a.zone}</div>
                <a href="/publier-projet" className="mt-4 block rounded-xl bg-[#d97706] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#f59e0b]">
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d97706]">Galerie</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Avant / Après — Chantiers<br />réalisés à Longvic
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#6b5a4a]">Projets réels réalisés par nos artisans à Longvic et alentours en 2025–2026.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { title: "Logement social — Rue des Bruyères", detail: "Traitement humidité + peinture · 55m²", price: "Budget: 1 580€ · Délai: 4 jours" },
              { title: "Pavillon — Secteur aéroport", detail: "Rénovation complète intérieure · 88m²", price: "Budget: 2 950€ · Délai: 7 jours" },
              { title: "Appartement — Résidence du Moulin", detail: "Peinture murs + plafonds · 42m²", price: "Budget: 1 100€ · Délai: 3 jours" },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border-[1.5px] border-[#e8ddd0]">
                <div className="grid h-[180px] grid-cols-2">
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#8a7a6a] to-[#6a5a4a] text-[40px]">
                    🏚️<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">AVANT</span>
                  </div>
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#fef3c7] to-[#fffbeb] text-[40px]">
                    🏠<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">APRÈS</span>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="mb-1 text-sm font-bold text-[#1a1714]">{item.title}</div>
                  <div className="text-xs text-[#6b5a4a]">{item.detail}</div>
                  <div className="mt-1.5 text-[13px] font-bold text-[#d97706]">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="px-8 py-20" style={{ background: "#fdf8f2" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d97706]">Avis clients vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Ce que disent nos clients<br />à Longvic
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Éric F.", loc: "Longvic · Appartement 58m²", text: "Problème d'humidité chronique dans mon appartement. Romain a fait un traitement complet avant de peindre. Résultat irréprochable, plus aucune trace. Je recommande à 100%.", avatar: "EF" },
              { name: "Laure M.", loc: "Longvic · Pavillon 92m²", text: "3 devis comparés en une journée. J'ai choisi le milieu de gamme, très bien ! Maison entièrement repeinte en 7 jours. Artisan ponctuel, propre et professionnel.", avatar: "LM" },
              { name: "David K.", loc: "Longvic · Studio 32m²", text: "Rapide et efficace. Devis reçu en 2h, chantier 3 jours plus tard. Prix honnête, travail soigné. Mon studio est méconnaissable. Merci PremiumArtisan !", avatar: "DK" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8ddd0] bg-white p-6">
                <div className="mb-3 text-base text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <div className="mb-4 text-sm italic leading-relaxed text-[#6b5a4a]">"{t.text}"</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #2a1a0a, #6b3a0a)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#1a1714]">{t.name}</div>
                    <div className="text-xs text-[#6b5a4a]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HYPERLOCAL */}
      <section className="px-8 py-20" style={{ background: "#2a1a0a" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#fcd34d]">Communes voisines</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Artisans peintres près<br />de Longvic
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-white/60">Nos artisans couvrent tout le secteur sud et sud-est de Dijon jusqu'à la plaine de Saône.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", code: "21000", artisans: "18", prix: "32–45€/m²", delai: "2–4h" },
              { name: "Chenôve", code: "21300", artisans: "12", prix: "26–40€/m²", delai: "3–6h" },
              { name: "Sennecey-lès-Dijon", code: "21800", artisans: "4", prix: "26–39€/m²", delai: "5–8h" },
              { name: "Perrigny-lès-Dijon", code: "21160", artisans: "3", prix: "27–41€/m²", delai: "5–7h" },
              { name: "Ouges", code: "21600", artisans: "3", prix: "26–40€/m²", delai: "4–7h" },
              { name: "Quetigny", code: "21800", artisans: "7", prix: "28–43€/m²", delai: "3–6h" },
            ].map((q, i) => (
              <div key={i} className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-[#fcd34d] hover:bg-white/10">
                <div className="mb-1 text-lg font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="mb-3 text-xs text-white/40">{q.code}</div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Artisans actifs</span><span className="font-bold text-[#fcd34d]">{q.artisans}</span></div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Prix moyen</span><span className="font-bold text-[#fcd34d]">{q.prix}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-white/50">Délai réponse</span><span className="font-bold text-[#fcd34d]">{q.delai}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES TRAVAUX */}
      <section className="px-8 py-20" style={{ background: "#fdf8f2" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d97706]">Types de travaux</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Tous types de peinture<br />à Longvic
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { icon: "🖌️", title: "Peinture intérieure murale", desc: "Murs, plafonds, boiseries. Spécialité traitement anti-humidité pour logements OPAC.", price: "27–38€/m²" },
              { icon: "🏠", title: "Ravalement de façade", desc: "Nettoyage haute pression, rebouchage et peinture extérieure grand froid disponible.", price: "46–72€/m²" },
              { icon: "🔧", title: "Traitement humidité & enduit", desc: "Diagnostic, traitement salpêtre, enduit assainissant. Spécialité des artisans longviciens.", price: "18–30€/m²" },
              { icon: "✨", title: "Peinture décorative", desc: "Effets béton ciré, stuc vénitien, patines. Artisans formés aux techniques décoratives.", price: "40–80€/m²" },
              { icon: "🏢", title: "Locaux commerciaux & bureaux", desc: "Zone d'activité de Longvic — peintures techniques et anti-salissures pour professionnels.", price: "28–46€/m²" },
              { icon: "🌿", title: "Peinture écologique", desc: "Peintures naturelles sans COV. Certifiées NF Environnement. Idéal pour jeunes enfants.", price: "32–52€/m²" },
            ].map((t, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border-[1.5px] border-[#e8ddd0] bg-white p-6 transition hover:border-[#d97706] hover:shadow-[0_8px_24px_rgba(217,119,6,0.1)]">
                <div className="shrink-0 text-[28px]">{t.icon}</div>
                <div>
                  <div className="mb-1 text-base font-bold text-[#1a1714]">{t.title}</div>
                  <div className="mb-2 text-[13px] text-[#6b5a4a]">{t.desc}</div>
                  <div className="text-[13px] font-bold text-[#d97706]">{t.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE EXPERT */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d97706]">Guide expert</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Tout savoir sur la peinture<br />intérieure à Longvic
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="text-[15px] leading-relaxed text-[#6b5a4a]">
              <h3 className="mb-3 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Longvic : une commune aux besoins spécifiques en peinture</h3>
              <p className="mb-4">Longvic, commune de 8 000 habitants située au sud-est immédiat de Dijon, présente un profil immobilier unique en Côte-d'Or. La présence de l'aéroport Dijon-Bourgogne, de la base aérienne 102 et d'une importante zone d'activités économiques crée une demande particulière en travaux de peinture, tant résidentielle que professionnelle.</p>
              <p className="mb-4">Le parc résidentiel est dominé par des logements sociaux construits entre 1960 et 1985, gérés principalement par Dijon Métropole Habitat (ex-OPAC). Ces logements, souvent bien entretenus en parties communes, nécessitent régulièrement des travaux de peinture intérieure lors de changements de locataires ou de rénovations.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Le problème de l'humidité à Longvic</h3>
              <p className="mb-4">La position géographique de Longvic, en bordure de la plaine de Saône, expose les logements à une humidité relative plus élevée que sur les hauteurs de Dijon. 34% des projets publiés à Longvic sur notre plateforme mentionnent un problème d'humidité ou de moisissures à traiter avant peinture.</p>
              <p className="mb-4">Les artisans locaux recommandent systématiquement un diagnostic humidité avant tout chantier de peinture dans les logements de plain-pied ou les rez-de-chaussée. Le traitement préventif (enduit assainissant, peinture microporeuse) représente un surcoût de 15 à 25% mais évite de recommencer les travaux 2 ans plus tard.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Données du marché — Longvic 2026</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Projets publiés en 2025–2026 : <strong>108</strong></li>
                <li>Prix moyen constaté : <strong>32€/m²</strong></li>
                <li>Part projets avec traitement humidité : <strong>34%</strong></li>
                <li>Délai moyen 1er contact : <strong>4h30</strong></li>
                <li>Satisfaction clients : <strong>95%</strong></li>
                <li>Économie vs premier devis : <strong>14%</strong></li>
              </ul>
            </div>

            <div className="sticky top-6">
              <div className="mb-4 rounded-2xl border-[1.5px] border-[#e8ddd0] bg-[#fdf8f2] p-6">
                <h4 className="mb-3 text-base font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>📊 Données Longvic 2026</h4>
                {[
                  { k: "Prix moyen mur", v: "29€/m²" },
                  { k: "Prix moyen plafond", v: "34€/m²" },
                  { k: "Projets publiés", v: "108" },
                  { k: "Artisans actifs", v: "8" },
                  { k: "Satisfaction", v: "4.8/5" },
                  { k: "Délai réponse", v: "4–6h" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between border-b border-[#e8ddd0] py-2 text-[13px] last:border-0">
                    <span className="text-[#6b5a4a]">{s.k}</span><span className="font-bold text-[#1a1714]">{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border-[1.5px] border-[#e8ddd0] bg-[#fdf8f2] p-6">
                <h4 className="mb-3 text-base font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>🔗 Pages liées</h4>
                {[
                  { label: "Peinture Dijon", href: "/devis-peinture-interieure-dijon" },
                  { label: "Peinture Chenôve", href: "/devis-peinture-chenove" },
                  { label: "Peinture Quetigny", href: "/devis-peinture-quetigny" },
                  { label: "Peinture Sennecey", href: "/devis-peinture-sennecey" },
                ].map((l, i) => (
                  <div key={i} className="flex justify-between py-2 text-[13px]">
                    <Link href={l.href} className="text-[#d97706] no-underline">{l.label}</Link>
                    <span className="font-bold text-[#1a1714]">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-20" style={{ background: "#fdf8f2" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d97706]">FAQ</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Questions fréquentes<br />— Longvic</h2>
          <div className="max-w-[700px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#d97706]">Explorer</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Pages liées</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Peinture Dijon 21000", sub: "18 artisans · 32–45€/m²", href: "/devis-peinture-interieure-dijon" },
              { title: "Peinture Chenôve 21300", sub: "12 artisans · 26–40€/m²", href: "/devis-peinture-chenove" },
              { title: "Peinture Talant 21240", sub: "9 artisans · 28–42€/m²", href: "/devis-peinture-talant" },
              { title: "Peinture Quetigny 21800", sub: "7 artisans · 28–43€/m²", href: "/devis-peinture-quetigny" },
              { title: "Traitement humidité Longvic", sub: "Spécialité artisans locaux", href: "#" },
              { title: "Rénovation Longvic", sub: "Tous corps de métier", href: "#" },
              { title: "Peinture locaux commerciaux", sub: "Zone activités Longvic", href: "#" },
              { title: "Guide prix peinture 2026", sub: "847 projets analysés Côte-d'Or", href: "#" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="rounded-xl border-[1.5px] border-[#e8ddd0] bg-[#fdf8f2] p-4 no-underline transition hover:-translate-y-0.5 hover:border-[#d97706]">
                <div className="mb-1 text-[13px] font-bold text-[#1a1714]">{link.title}</div>
                <div className="text-xs text-[#6b5a4a]">{link.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #2a1a0a, #4a2e0a)" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#fcd34d]">Prêt à démarrer ?</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Recevez vos devis gratuits<br />en moins de 6h à Longvic
          </h2>
          <p className="mb-10 text-base text-white/70">8 artisans peintres vérifiés à Longvic et alentours. Sans engagement, sans spam.</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#d97706] px-12 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(217,119,6,0.4)] transition hover:scale-105 hover:bg-[#f59e0b]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Max 4 artisans</p>
        </div>
      </section>

      {/* Schema JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Longvic", url: "https://premiumartisan.fr/devis-peinture-longvic", areaServed: { "@type": "City", name: "Longvic", postalCode: "21600" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "82" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
