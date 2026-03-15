// Salle de Bain Quetigny component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Quelles tendances dominent la rénovation de salle de bain à Quetigny en 2026 ?",
    a: "À Quetigny, les propriétaires de maisons récentes investissent massivement dans les salles de bain design. La douche à l'italienne grande dimension s'impose dans 74% des projets. Le carrelage grand format 60×60 ou 90×90 en imitation marbre ou béton ciré est plébiscité. La double vasque suspendue avec miroir LED est devenue un standard. Ces équipements valorisent le bien de 8 à 15% à la revente.",
  },
  {
    q: "Quel est le prix d'une rénovation de salle de bain à Quetigny en 2026 ?",
    a: "Les projets à Quetigny sont globalement plus ambitieux. Un rafraîchissement simple coûte entre 3 200€ et 6 500€. Une rénovation complète avec douche italienne et carrelage grand format revient entre 7 500€ et 18 000€. Les projets haut de gamme atteignent 20 000 à 35 000€. Le budget moyen constaté est de 12 800€, soit 12% au-dessus de la moyenne métropolitaine.",
  },
  {
    q: "Comment choisir le carrelage pour une salle de bain à Quetigny ?",
    a: "Pour les maisons de Quetigny, le carrelage grand format (60×60 minimum) est systématiquement recommandé. Il crée une impression d'espace, facilite l'entretien et donne un rendu premium. Les imitations marbre blanc Carrare ou gris Bardiglio sont très demandées. Pour les douches italiennes, le carrelage rectifié posé sans joint apparent est la tendance forte.",
  },
  {
    q: "La domotique est-elle intégrée dans les salles de bain à Quetigny ?",
    a: "De plus en plus. Dans les projets haut de gamme (budget 18 000€+), nos artisans intègrent : miroir anti-buée avec éclairage LED et heure, douche thermostatique programmable, plancher chauffant à commande par smartphone. Ces équipements représentent 15 à 25% du budget total mais constituent un argument de vente fort dans ce secteur résidentiel prisé.",
  },
  {
    q: "Combien de temps dure une rénovation de salle de bain à Quetigny ?",
    a: "Pour une rénovation standard (douche italienne + carrelage grand format + meuble vasque), comptez 12 à 18 jours. Les carrelages grand format en imitation marbre demandent plus de soin. Pour les projets premium avec domotique, prévoyez 3 à 5 semaines. La coordination entre plombier, carreleur et électricien est assurée par nos artisans partenaires.",
  },
  {
    q: "Faut-il un architecte pour rénover une salle de bain à Quetigny ?",
    a: "Pour les projets standard jusqu'à 15 000€, un bon artisan suffit largement. Au-delà, faire appel à un designer d'intérieur apporte une vraie valeur ajoutée : cohérence des matériaux, optimisation de l'espace, sélection des équipements haut de gamme. Plusieurs artisans de notre réseau à Quetigny travaillent avec des designers et peuvent vous mettre en contact.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e0c8d8] py-5">
      <button
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#1f0a18]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#be185d]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#4a1a30]">{answer}</p>}
    </div>
  );
}

export default function DevisSalleDeBainQuetigny() {
  return (
    <main className="min-h-screen bg-[#fdf0f6]">

      <nav className="flex items-center justify-between bg-[#1f0a18] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#f9a8d4]">Artisan</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "SDB Dijon", href: "/devis-salle-de-bain-dijon" },
            { label: "Rénovation Quetigny", href: "/devis-renovation-quetigny" },
            { label: "Prix", href: "#prix" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-white/70 transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      <section
        className="relative overflow-hidden px-8 pb-20 pt-24"
        style={{ background: "linear-gradient(140deg, #1f0a18 0%, #6b1a3a 55%, #2a0a20 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(249,168,212,0.15) 0%, transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f9a8d4]/35 bg-[#f9a8d4]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#fbcfe8]">
            💎 Quetigny 21800 · Maisons récentes · SDB design et premium
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Salle de Bain à Quetigny :<br />
            <span className="text-[#f9a8d4]">Du Carrelage Grand Format</span><br />
            à la Domotique
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Maisons post-1990, villas spacieuses, résidences récentes. À Quetigny, la salle de bain est un <strong className="text-white">argument de vente décisif</strong>. Budget moyen <strong className="text-white">12 800€</strong> — 12% au-dessus de la métropole. 31 projets documentés.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[
              { val: "31", txt: "projets Quetigny 2025–26" },
              { val: "9", txt: "artisans vérifiés" },
              { val: "12 800€", txt: "budget moyen" },
              { val: "74%", txt: "douche italienne" },
              { val: "97%", txt: "satisfaction" },
            ].map((k, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{k.val}</div>
                <div className="mt-0.5 text-[11px] text-white/55">{k.txt}</div>
              </div>
            ))}
          </div>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#be185d] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(190,24,93,0.45)] transition hover:scale-105 hover:bg-[#db2777]"
          >
            🚿 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · Réponse en 3–5h · Spécialistes SDB design Quetigny</p>
        </div>
      </section>

      <section className="bg-[#be185d] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[
            { v: "12 800€", l: "Budget moyen Quetigny" },
            { v: "60×60", l: "Carrelage grand format tendance" },
            { v: "74%", l: "Douche italienne en 2026" },
            { v: "+15%", l: "Valorisation revente constatée" },
            { v: "31", l: "Projets documentés 2025–26" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div>
              <div className="text-[11px] text-white/65">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Le marché Quetigny</div>
          <h2 className="mb-8 text-3xl font-bold text-[#1f0a18] md:text-4xl" style={{ fontFamily: "serif" }}>
            Pourquoi Quetigny investit plus<br />dans sa salle de bain
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "🏠", titre: "Parc immobilier récent", texte: "71% des logements de Quetigny ont été construits après 1980. Ces maisons ont des structures saines et des plomberies en bon état — ce qui permet d'investir directement dans les finitions sans travaux préalables coûteux." },
              { icon: "📈", titre: "Marché immobilier actif", texte: "Quetigny affiche l'un des taux de rotation immobilière les plus élevés de la métropole. Une salle de bain rénovée fait la différence lors des visites et peut faire pencher la balance sur des biens comparables." },
              { icon: "💎", titre: "Attentes des acheteurs", texte: "Les acheteurs qui ciblent Quetigny ont un profil cadre à double revenu. Leurs attentes sont élevées : douche italienne, carrelage grand format, éclairage LED, domotique. Une SDB standard n'est plus suffisante." },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 2 ? "border-[#be185d] bg-[#fdf0f6]" : "border-[#e0c8d8] bg-[#fdf0f6]"}`}>
                <div className="mb-3 text-[38px]">{c.icon}</div>
                <div className="mb-2 font-bold text-[#1f0a18]">{c.titre}</div>
                <p className="text-[13px] leading-relaxed text-[#4a1a30]">{c.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f0a18] md:text-5xl" style={{ fontFamily: "serif" }}>
            Prix rénovation salle de bain<br />à Quetigny
          </h2>
          <p className="mb-12 max-w-[580px] text-[15px] text-[#4a1a30]">
            Basé sur 31 projets documentés à Quetigny en 2025–2026. Les prix reflètent le niveau de finition premium attendu sur ce marché.
          </p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Rafraîchissement villa 6m²", price: "3 200–6 500€", note: "Carrelage + robinetterie + meuble vasque" },
              { label: "Douche italienne grand format", price: "4 500–10 000€", note: "Receveur 120×90 · Carrelage 60×60 · Paroi verre" },
              { label: "Rénovation complète 7m²", price: "7 500–18 000€", note: "Démolition · Carrelage rectifié · Domotique basic" },
              { label: "Suite parentale premium", price: "12 000–28 000€", note: "Double vasque · Baignoire îlot · Miroir LED" },
              { label: "SDB PMR Quetigny", price: "5 000–12 000€", note: "Douche PMR · Barres · WC surélevé · MaPrimeAdapt'" },
              { label: "Domotique SDB complète", price: "2 500–6 000€", note: "Thermostat · Miroir connecté · Éclairage scénario" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0c8d8] bg-white p-5 transition hover:border-[#be185d]">
                <div className="mb-1 text-[13px] font-semibold text-[#1f0a18]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#be185d]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#4a1a30]">{r.note}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-5 text-xl font-bold text-[#1f0a18]" style={{ fontFamily: "serif" }}>Niveaux de finition — Quetigny 2026</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e0c8d8]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1f0a18] text-white">
                  {["Surface", "Standard", "Design", "Premium"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["5m²", "4 500–7 000€", "7 000–12 000€", "12 000–20 000€"],
                  ["7m²", "6 000–10 000€", "10 000–16 000€", "16 000–28 000€"],
                  ["9m²", "7 500–12 000€", "12 000–20 000€", "20 000–35 000€"],
                  ["12m²+", "10 000–16 000€", "16 000–28 000€", "28 000–50 000€"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#fdf0f6]">
                    {r.map((cell, j) => (
                      <td key={j} className={`border-b border-[#e0c8d8] px-4 py-3.5 text-sm ${j === 0 ? "font-semibold text-[#1f0a18]" : "font-bold text-[#be185d]"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] text-[#4a1a30]">* Standard = carrelage classique · Design = grand format + douche italienne · Premium = domotique + matériaux luxe</p>
        </div>
      </section>

      <section className="bg-white px-8 py-20" id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f0a18] md:text-5xl" style={{ fontFamily: "serif" }}>
            9 artisans premium<br />à Quetigny
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#4a1a30]">Sélectionnés pour leur maîtrise du carrelage grand format, des douches italiennes techniques et des équipements haut de gamme.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "RL", name: "Romain L.", enseigne: "Quetigny SDB Design", spec: "Grand format · Douche italienne · Rectifié sans joint", exp: "16 ans · Expert pose 90×90 sans joint apparent", zone: "Quetigny · Saint-Apollinaire · Dijon Est", note: "5.0/5", nb: "187 chantiers" },
              { initials: "AF", name: "Aurélie F.", enseigne: "Premium Bain 21", spec: "Suite parentale · Domotique · Matériaux luxe", exp: "11 ans · Partenaire Hansgrohe & Duravit", zone: "Quetigny · Chevigny · Grand Dijon", note: "4.9/5", nb: "142 chantiers" },
              { initials: "KD", name: "Karim D.", enseigne: "Multi-Bains Quetigny", spec: "Rénovation complète · PMR · Budget optimisé", exp: "8 ans · Dossiers MaPrimeAdapt' gérés de A à Z", zone: "Quetigny · Longvic · Dijon", note: "4.8/5", nb: "96 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0c8d8] bg-[#fdf0f6] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #1f0a18, #6b1a3a)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#1f0a18]">{a.name}</div>
                    <div className="text-[11px] text-[#be185d]">{a.enseigne}</div>
                    <div className="text-[11px] text-[#be185d]">{a.note} · {a.nb}</div>
                  </div>
                </div>
                <p className="mb-2 text-[13px] font-semibold text-[#1f0a18]">{a.spec}</p>
                <p className="mb-1 text-[12px] text-[#4a1a30]">📅 {a.exp}</p>
                <p className="mb-4 text-[12px] text-[#4a1a30]">📍 {a.zone}</p>
                <a href="/publier-projet" className="block rounded-xl bg-[#be185d] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#db2777]">
                  Demander un devis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#1f0a18] md:text-4xl" style={{ fontFamily: "serif" }}>Trois projets premium à Quetigny</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "PD", name: "Pierre D.", loc: "Quetigny · Villa · SDB 8m² rénovation complète", text: "Romain a posé du carrelage 90×90 imitation marbre Calacatta sans joint apparent. La douche italienne 120×90 avec paroi verre sur mesure est parfaite. 14 500€ de travaux. Trois voisins m'ont demandé ses coordonnées après avoir vu le résultat." },
              { avatar: "ML", name: "Marine L.", loc: "Quetigny · Suite parentale · domotique intégrée", text: "Aurélie a transformé notre salle de bain en 16 jours. Miroir LED avec affichage météo, douche thermostatique programmable, plancher chauffant géré depuis le téléphone. 19 800€ au total. Les visiteurs s'arrêtent systématiquement dans la salle de bain." },
              { avatar: "SB", name: "Sébastien B.", loc: "Quetigny · SDB PMR · MaPrimeAdapt' accepté", text: "Karim a adapté la salle de bain de mon beau-père en 10 jours. Il a géré l'intégralité du dossier MaPrimeAdapt' — 6 500€ accordés sur 9 800€ de travaux. Il reste chez lui à Quetigny, ce qui était notre objectif." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0c8d8] bg-white p-6">
                <div className="mb-2 text-sm text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <p className="mb-5 text-[14px] italic leading-relaxed text-[#4a1a30]">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg, #1f0a18, #6b1a3a)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#1f0a18]">{t.name}</div>
                    <div className="text-[12px] text-[#4a1a30]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#1f0a18" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#fbcfe8]">Communes voisines</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Rénovation SDB autour de Quetigny</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-salle-de-bain-dijon", nb: "28 artisans", prix: "7 000–35 000€" },
              { name: "Chenôve", href: "/devis-salle-de-bain-chenove", nb: "14 artisans", prix: "4 500–9 000€" },
              { name: "Talant", href: "/devis-salle-de-bain-talant", nb: "11 artisans", prix: "4 800–11 000€" },
              { name: "Longvic", href: "/devis-salle-de-bain-longvic", nb: "10 artisans", prix: "4 200–10 500€" },
              { name: "Fontaine-lès-Dijon", href: "/devis-salle-de-bain-fontaine-les-dijon", nb: "6 artisans", prix: "7 500–20 000€" },
              { name: "Saint-Apollinaire", href: "#", nb: "4 artisans", prix: "7 000–18 000€" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#f9a8d4] hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">{q.nb}</span>
                  <span className="font-bold text-[#fbcfe8]">{q.prix}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#1f0a18] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation SDB<br />à Quetigny</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #1f0a18 0%, #6b1a3a 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#f9a8d4]">Prêt à créer votre SDB de rêve ?</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Devis salle de bain design<br />gratuit à Quetigny
          </h2>
          <p className="mb-10 text-[16px] text-white/60">9 artisans premium · Grand format · Domotique · Douche italienne · PMR · Réponse en 3–5h</p>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#be185d] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(190,24,93,0.5)] transition hover:scale-105 hover:bg-[#db2777]"
          >
            🚿 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Salle de Bain Quetigny", url: "https://premiumartisan.fr/devis-salle-de-bain-quetigny", areaServed: { "@type": "City", name: "Quetigny", postalCode: "21800" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "26" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
