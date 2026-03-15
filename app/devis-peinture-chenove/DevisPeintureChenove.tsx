"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix de la peinture intérieure à Chenôve en 2026 ?", a: "Le prix moyen de la peinture intérieure à Chenôve varie entre 26€ et 40€/m². Pour un appartement de 60m², comptez entre 1 400€ et 2 600€ tout compris (main d'œuvre + fournitures + préparation)." },
  { q: "Combien d'artisans peintres sont disponibles à Chenôve ?", a: "Notre réseau compte 12 artisans peintres actifs à Chenôve et dans le secteur sud de Dijon. La plupart interviennent aussi sur Marsannay-la-Côte, Gevrey-Chambertin et Dijon centre." },
  { q: "Quel est le délai pour trouver un peintre à Chenôve ?", a: "Sur PremiumArtisan, vous recevez vos premiers devis en 3 à 6h après publication de votre projet. Le délai moyen pour démarrer un chantier à Chenôve est de 1 à 2 semaines." },
  { q: "Les artisans de Chenôve interviennent-ils dans toute la Côte-d'Or ?", a: "Oui, les artisans basés à Chenôve couvrent généralement un rayon de 30 km, incluant Dijon, Longvic, Marsannay-la-Côte, Gevrey-Chambertin et une partie de la plaine de Saône." },
  { q: "Est-ce gratuit de demander des devis à Chenôve ?", a: "Oui, 100% gratuit pour les particuliers. Vous publiez votre projet en 2 minutes et recevez jusqu'à 4 devis d'artisans locaux vérifiés, sans engagement." },
  { q: "Comment vérifier qu'un artisan peintre est sérieux à Chenôve ?", a: "Vérifiez le numéro SIRET sur Infogreffe.fr, demandez l'attestation RC Pro, consultez les avis clients et comparez minimum 3 devis. Sur PremiumArtisan, tous les artisans sont pré-vérifiés." },
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

export default function DevisPeintureChenove() {
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
      <section className="relative overflow-hidden px-8 pb-16 pt-20" style={{ background: "linear-gradient(135deg, #1a2a1a 0%, #1e4a2f 60%, #1a3a2a 100%)" }}>
        <div className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(40,140,80,0.15) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2a8c50]/40 bg-[#2a8c50]/20 px-3.5 py-1.5 text-[13px] font-semibold text-[#4ade80]">
            📍 Chenôve 21300 — Données 2026
          </div>

          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl" style={{ fontFamily: "serif" }}>
            Peinture Intérieure<br />à <em className="not-italic text-[#4ade80]">Chenôve</em> — Prix<br />& Devis Gratuit 2026
          </h1>

          <p className="mb-10 max-w-[600px] text-lg text-white/75">
            Comparez jusqu'à 4 artisans peintres vérifiés à Chenôve. Prix moyen constaté : <strong className="text-white">26–40€/m²</strong>. Réponse en 3 à 6h, sans engagement.
          </p>

          {/* TRUST BADGES */}
          <div className="mb-12 flex flex-wrap gap-4">
            {[
              { value: "⭐ 4.7/5", label: "Avis clients" },
              { value: "12", label: "Peintres à Chenôve" },
              { value: "3–6h", label: "Réponse moyenne" },
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
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#2a8c50] px-10 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(40,140,80,0.4)] transition hover:scale-105 hover:bg-[#34a85a]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Réponse en 3–6h</p>
        </div>
      </section>

      {/* POURQUOI NOTRE PLATEFORME */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2a8c50]">Pourquoi nous choisir</div>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-[#1a1714] md:text-4xl" style={{ fontFamily: "serif" }}>
            La référence peinture<br />à Chenôve
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { icon: "🔍", title: "Artisans vérifiés", desc: "SIRET + RC Pro contrôlés avant chaque mise en relation" },
              { icon: "💶", title: "Prix transparents", desc: "Devis détaillés main d'œuvre et fournitures séparés" },
              { icon: "⚡", title: "Réponse rapide", desc: "3 à 6h en moyenne pour recevoir vos premiers devis" },
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2a8c50]">Prix réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Combien coûte la peinture<br />intérieure à Chenôve ?
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#7a6f65]">
            Données collectées sur 124 projets publiés à Chenôve et dans le secteur sud de Dijon (21300). Prix observés entre janvier et mars 2026.
          </p>
          <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { label: "Peinture murale", price: "26–38€", details: ["Main d'œuvre: 14–18€/m²", "Fournitures: 8–12€/m²", "Préparation: 4–8€/m²"], featured: false },
              { label: "Peinture plafond ⭐", price: "28–45€", details: ["Main d'œuvre: 16–22€/m²", "Fournitures: 8–14€/m²", "Préparation: 4–9€/m²"], featured: true },
              { label: "Rénovation complète", price: "32–52€", details: ["Murs + plafonds + boiseries", "Enduit & rebouchage inclus", "Protection mobilier incluse"], featured: false },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-2 p-6 transition hover:-translate-y-1 ${c.featured ? "border-[#2a8c50]" : "border-[#e0d8ce] hover:border-[#2a8c50]"}`} style={c.featured ? { background: "linear-gradient(135deg, #f0fff4, white)" } : {}}>
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
                <tr className="bg-[#1a2a1a] text-white">
                  <th className="rounded-tl-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Surface logement</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Peinture simple</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Rénovation complète</th>
                  <th className="rounded-tr-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Délai chantier</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surf: "Studio 25m²", s: "780€ – 1 050€", r: "1 100€ – 1 650€", d: "2–3 jours" },
                  { surf: "Appartement 60m²", s: "1 400€ – 2 200€", r: "2 200€ – 3 600€", d: "4–6 jours" },
                  { surf: "Appartement 90m²", s: "2 200€ – 3 600€", r: "3 600€ – 5 800€", d: "6–8 jours" },
                  { surf: "Maison 120m²", s: "3 200€ – 5 000€", r: "5 000€ – 7 800€", d: "7–11 jours" },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-white">
                    <td className="border-b border-[#e0d8ce] px-4 py-3.5 text-sm">{r.surf}</td>
                    <td className="border-b border-[#e0d8ce] px-4 py-3.5 text-sm font-bold text-[#2a8c50]" style={{ fontFamily: "serif" }}>{r.s}</td>
                    <td className="border-b border-[#e0d8ce] px-4 py-3.5 text-sm font-bold text-[#2a8c50]" style={{ fontFamily: "serif" }}>{r.r}</td>
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2a8c50]">Délais moyens</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Trouver un peintre<br />à Chenôve rapidement
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#7a6f65]">
            Chenôve concentre une forte densité d'artisans dans le secteur sud de Dijon, ce qui permet des délais d'intervention parmi les plus courts de la Côte-d'Or.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", time: "3–6h", label: "Premiers devis reçus" },
              { icon: "📅", time: "1–2 sem.", label: "Délai démarrage chantier" },
              { icon: "🎨", time: "2–7 j.", label: "Durée chantier moyenne" },
              { icon: "✅", time: "4.7/5", label: "Satisfaction clients Chenôve" },
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2a8c50]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Artisans peintres vérifiés<br />à Chenôve
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#7a6f65]">
            Chaque artisan de notre réseau est contrôlé : SIRET actif, assurance RC Pro à jour, avis clients vérifiés.
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { initials: "ML", name: "Martin L.", spec: "Peinture intérieure & décorative", exp: "14 ans d'expérience", zone: "Chenôve · Dijon · Longvic", note: "4.9/5", chantiers: "87 chantiers" },
              { initials: "PD", name: "Philippe D.", spec: "Rénovation complète & enduit", exp: "9 ans d'expérience", zone: "Chenôve · Marsannay · Gevrey", note: "4.8/5", chantiers: "63 chantiers" },
              { initials: "SR", name: "Sébastien R.", spec: "Peinture écologique & naturelle", exp: "7 ans d'expérience", zone: "Chenôve · Dijon Sud · Longvic", note: "4.7/5", chantiers: "41 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d8ce] bg-white p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #1a2a1a, #2a5a3a)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#1a1714]">{a.name}</div>
                    <div className="text-xs text-[#2a8c50]">{a.note} · {a.chantiers}</div>
                  </div>
                </div>
                <div className="mb-2 text-[13px] font-semibold text-[#1a1714]">{a.spec}</div>
                <div className="mb-1 text-xs text-[#7a6f65]">📅 {a.exp}</div>
                <div className="text-xs text-[#7a6f65]">📍 {a.zone}</div>
                <a href="/publier-projet" className="mt-4 block rounded-xl bg-[#2a8c50] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#34a85a]">
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2a8c50]">Galerie</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Avant / Après — Chantiers<br />réalisés à Chenôve
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#7a6f65]">Projets réels réalisés par nos artisans à Chenôve et alentours en 2025–2026.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { title: "Appartement — Rue de Bourgogne", detail: "Peinture intégrale · 58m²", price: "Budget: 1 650€ · Délai: 4 jours" },
              { title: "Maison individuelle — Chenôve Sud", detail: "Rénovation murs + plafonds · 85m²", price: "Budget: 2 900€ · Délai: 7 jours" },
              { title: "Studio — Résidence les Charmes", detail: "Peinture + enduit · 28m²", price: "Budget: 890€ · Délai: 2 jours" },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border-[1.5px] border-[#e0d8ce]">
                <div className="grid h-[180px] grid-cols-2">
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#8a7a6a] to-[#6a5a4a] text-[40px]">
                    🏚️<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">AVANT</span>
                  </div>
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#d4eeda] to-[#f0fff4] text-[40px]">
                    🏠<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">APRÈS</span>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="mb-1 text-sm font-bold text-[#1a1714]">{item.title}</div>
                  <div className="text-xs text-[#7a6f65]">{item.detail}</div>
                  <div className="mt-1.5 text-[13px] font-bold text-[#2a8c50]">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="px-8 py-20" style={{ background: "#f8f5ef" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2a8c50]">Avis clients vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Ce que disent nos clients<br />à Chenôve
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Nathalie V.", loc: "Chenôve · Appartement 65m²", text: "Excellent service ! J'ai reçu 3 devis en moins de 4h. L'artisan choisi était ponctuel, propre et le résultat est superbe. Je recommande PremiumArtisan à tous mes voisins de Chenôve.", avatar: "NV" },
              { name: "Marc T.", loc: "Chenôve · Maison 90m²", text: "Très satisfait. J'ai économisé plus de 600€ en comparant les devis. Le peintre a terminé en 6 jours comme prévu. Qualité professionnelle au meilleur prix.", avatar: "MT" },
              { name: "Isabelle K.", loc: "Chenôve · Studio 30m²", text: "Parfait pour mon studio. Réponse rapide, artisan sérieux et prix honnête. La peinture écologique choisie est magnifique. 5 étoiles sans hésiter !", avatar: "IK" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d8ce] bg-white p-6">
                <div className="mb-3 text-base text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <div className="mb-4 text-sm italic leading-relaxed text-[#7a6f65]">"{t.text}"</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #1a2a1a, #2a5a3a)" }}>{t.avatar}</div>
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

      {/* SECTION HYPERLOCALE */}
      <section className="bg-[#1a2a1a] px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#4ade80]">Communes voisines</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Artisans peintres près<br />de Chenôve
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-white/60">Nos artisans interviennent dans tout le secteur sud de Dijon et la Côte-d'Or.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", code: "21000", artisans: "18", prix: "32–45€/m²", delai: "2–4h" },
              { name: "Longvic", code: "21600", artisans: "8", prix: "27–41€/m²", delai: "4–6h" },
              { name: "Marsannay-la-Côte", code: "21160", artisans: "5", prix: "26–40€/m²", delai: "4–7h" },
              { name: "Gevrey-Chambertin", code: "21220", artisans: "4", prix: "28–44€/m²", delai: "5–8h" },
              { name: "Talant", code: "21240", artisans: "9", prix: "28–42€/m²", delai: "3–5h" },
              { name: "Quetigny", code: "21800", artisans: "7", prix: "28–43€/m²", delai: "3–6h" },
            ].map((q, i) => (
              <div key={i} className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-[#4ade80] hover:bg-white/10">
                <div className="mb-1 text-lg font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="mb-3 text-xs text-white/40">{q.code}</div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Artisans actifs</span><span className="font-bold text-[#4ade80]">{q.artisans}</span></div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Prix moyen</span><span className="font-bold text-[#4ade80]">{q.prix}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-white/50">Délai réponse</span><span className="font-bold text-[#4ade80]">{q.delai}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES TRAVAUX */}
      <section className="px-8 py-20" style={{ background: "#f8f5ef" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2a8c50]">Types de travaux</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Tous types de peinture<br />à Chenôve
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { icon: "🖌️", title: "Peinture intérieure murale", desc: "Murs, plafonds, boiseries. Finition mate, satinée ou brillante selon vos préférences.", price: "26–38€/m²" },
              { icon: "🏠", title: "Ravalement de façade", desc: "Nettoyage, rebouchage et application d'enduit ou peinture extérieure résistante.", price: "48–75€/m²" },
              { icon: "🔧", title: "Enduit & préparation", desc: "Rebouchage fissures, lissage, ponçage. Indispensable pour une finition parfaite.", price: "14–24€/m²" },
              { icon: "✨", title: "Peinture décorative", desc: "Effets béton ciré, stuc, tadelakt. Techniques décoratives pour intérieurs uniques.", price: "42–85€/m²" },
              { icon: "🏢", title: "Peinture locaux commerciaux", desc: "Bureaux, commerces. Peintures techniques anti-salissures disponibles à Chenôve.", price: "28–48€/m²" },
              { icon: "🌿", title: "Peinture écologique", desc: "Peintures naturelles, sans COV, certifiées. Artisans spécialisés disponibles à Chenôve.", price: "32–52€/m²" },
            ].map((t, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border-[1.5px] border-[#e0d8ce] bg-white p-6 transition hover:border-[#2a8c50] hover:shadow-[0_8px_24px_rgba(40,140,80,0.1)]">
                <div className="shrink-0 text-[28px]">{t.icon}</div>
                <div>
                  <div className="mb-1 text-base font-bold text-[#1a1714]">{t.title}</div>
                  <div className="mb-2 text-[13px] text-[#7a6f65]">{t.desc}</div>
                  <div className="text-[13px] font-bold text-[#2a8c50]">{t.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE EXPERT */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2a8c50]">Guide expert</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>
            Tout savoir sur la peinture<br />intérieure à Chenôve
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="text-[15px] leading-relaxed text-[#7a6f65]">
              <h3 className="mb-3 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Le marché de la peinture à Chenôve en 2026</h3>
              <p className="mb-4">Chenôve, commune de 14 000 habitants située à 5 km au sud de Dijon, connaît une forte demande en travaux de peinture intérieure. Le parc immobilier, composé majoritairement de logements collectifs construits entre 1960 et 1985, génère un volume important de projets de rénovation chaque année.</p>
              <p className="mb-4">Sur notre plateforme, Chenôve représente 124 projets publiés en 2025–2026, soit une augmentation de 18% par rapport à l'année précédente. Cette croissance reflète le dynamisme du marché immobilier dans le secteur sud de Dijon, avec de nombreux achats suivis de rénovations.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Prix de la peinture à Chenôve vs Dijon centre</h3>
              <p className="mb-4">Les tarifs pratiqués à Chenôve sont en moyenne 8 à 12% inférieurs à ceux du centre de Dijon. Cette différence s'explique par une concurrence plus forte entre artisans locaux et des coûts de déplacement réduits pour les peintres basés dans la commune.</p>
              <ul className="mb-4 list-disc space-y-2 pl-5">
                <li>Peinture murale à Chenôve : <strong>26–38€/m²</strong> vs 32–45€/m² à Dijon centre</li>
                <li>Rénovation complète : <strong>32–52€/m²</strong> vs 35–55€/m² à Dijon centre</li>
                <li>Délai d'intervention : <strong>1–2 semaines</strong> vs 2–3 semaines en haute saison</li>
              </ul>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Spécificités du bâti à Chenôve</h3>
              <p className="mb-4">Le parc immobilier de Chenôve présente des caractéristiques spécifiques qui influencent le coût des travaux de peinture. Les grands ensembles construits dans les années 1970 (ZUP du Mail, quartier des Grésilles) nécessitent souvent un traitement préalable des surfaces : rebouchage de fissures, application d'un sous-couche anti-humidité, traitement des taches.</p>
              <p className="mb-4">Pour les maisons individuelles du secteur pavillonnaire (rue des Marcs d'Or, lotissements du sud), les travaux de façade et de peinture extérieure représentent une part importante des projets publiés sur notre plateforme.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Comment économiser sur votre chantier à Chenôve</h3>
              <ul className="mb-4 list-disc space-y-2 pl-5">
                <li>Planifiez vos travaux en <strong>basse saison</strong> (octobre–mars) : disponibilité accrue, tarifs préférentiels de 5 à 15%</li>
                <li>Comparez <strong>minimum 3 devis</strong> : économie moyenne constatée de 18% vs premier devis</li>
                <li>Fournissez la peinture vous-même : certains artisans acceptent et facturent uniquement la main d'œuvre</li>
                <li>Regroupez plusieurs pièces sur un même chantier : coût unitaire plus faible grâce aux économies d'échelle</li>
                <li>Vérifiez votre éligibilité aux <strong>aides MaPrimeRénov</strong> pour les travaux d'isolation thermique associés</li>
              </ul>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Données du marché — Chenôve 2026</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Projets publiés en 2025–2026 : <strong>124</strong></li>
                <li>Prix moyen constaté : <strong>33€/m²</strong></li>
                <li>Devis reçus par projet : <strong>3,1</strong></li>
                <li>Délai moyen 1er contact : <strong>3h45</strong></li>
                <li>Satisfaction clients : <strong>94%</strong></li>
                <li>Économie vs premier devis : <strong>16%</strong></li>
              </ul>
            </div>

            <div className="sticky top-6">
              <div className="mb-4 rounded-2xl border-[1.5px] border-[#e0d8ce] bg-[#f8f5ef] p-6">
                <h4 className="mb-3 text-base font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>📊 Données Chenôve 2026</h4>
                {[
                  { k: "Prix moyen mur", v: "30€/m²" },
                  { k: "Prix moyen plafond", v: "35€/m²" },
                  { k: "Projets publiés", v: "124" },
                  { k: "Artisans actifs", v: "12" },
                  { k: "Satisfaction", v: "4.7/5" },
                  { k: "Délai réponse", v: "3–6h" },
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
                  { label: "Peinture Longvic", href: "/devis-peinture-longvic" },
                  { label: "Peinture Talant", href: "/devis-peinture-talant" },
                  { label: "Peinture Marsannay", href: "/devis-peinture-marsannay" },
                ].map((l, i) => (
                  <div key={i} className="flex justify-between py-2 text-[13px]">
                    <Link href={l.href} className="text-[#2a8c50] no-underline">{l.label}</Link>
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2a8c50]">FAQ</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Questions fréquentes<br />— Chenôve</h2>
          <div className="max-w-[700px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#2a8c50]">Explorer</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Pages liées</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Peinture Dijon 21000", sub: "18 artisans · 32–45€/m²", href: "/devis-peinture-interieure-dijon" },
              { title: "Peinture Longvic 21600", sub: "8 artisans · 27–41€/m²", href: "/devis-peinture-longvic" },
              { title: "Peinture Talant 21240", sub: "9 artisans · 28–42€/m²", href: "/devis-peinture-talant" },
              { title: "Peinture Marsannay 21160", sub: "5 artisans · 26–40€/m²", href: "/devis-peinture-marsannay" },
              { title: "Prix façade Chenôve", sub: "48–75€/m² · Devis gratuit", href: "#" },
              { title: "Rénovation Chenôve", sub: "Tous corps de métier", href: "#" },
              { title: "Artisans Côte-d'Or", sub: "47 artisans vérifiés", href: "#" },
              { title: "Guide prix peinture 2026", sub: "847 projets analysés", href: "#" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="rounded-xl border-[1.5px] border-[#e0d8ce] bg-[#f8f5ef] p-4 no-underline transition hover:-translate-y-0.5 hover:border-[#2a8c50]">
                <div className="mb-1 text-[13px] font-bold text-[#1a1714]">{link.title}</div>
                <div className="text-xs text-[#7a6f65]">{link.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #1a2a1a, #1e4a2f)" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#4ade80]">Prêt à démarrer ?</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Recevez vos devis gratuits<br />en moins de 6h à Chenôve
          </h2>
          <p className="mb-10 text-base text-white/70">12 artisans peintres vérifiés à Chenôve et alentours. Sans engagement, sans spam.</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#2a8c50] px-12 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(40,140,80,0.4)] transition hover:scale-105 hover:bg-[#34a85a]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Max 4 artisans</p>
        </div>
      </section>

      {/* Schema JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            name: "PremiumArtisan Chenôve",
            description: "Plateforme de mise en relation artisans peintres et clients à Chenôve",
            url: "https://premiumartisan.fr/devis-peinture-chenove",
            areaServed: { "@type": "City", name: "Chenôve", postalCode: "21300" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "89" },
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
      })}} />
    </main>
  );
}
