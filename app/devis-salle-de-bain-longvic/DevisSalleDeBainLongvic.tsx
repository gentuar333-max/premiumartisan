// Salle de Bain Longvic component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Quel est le prix d'une rénovation de salle de bain à Longvic en 2026 ?",
    a: "À Longvic, une rénovation complète de salle de bain coûte entre 4 200€ et 10 500€ selon la surface et les équipements. Les tarifs sont légèrement inférieurs à Dijon centre grâce à la concentration d'artisans locaux. Un rafraîchissement simple (carrelage par-dessus, robinetterie neuve) revient entre 1 800€ et 4 000€. Pour une salle de bain haut de gamme avec douche italienne et carrelage grand format, comptez 8 000€ à 15 000€.",
  },
  {
    q: "Les travaux de salle de bain peuvent-ils améliorer l'isolation phonique à Longvic ?",
    a: "Partiellement. Longvic est situé sous les couloirs d'approche de l'aéroport Dijon-Bourgogne. Les salles de bain sont souvent les pièces les moins bien isolées phoniquement car leurs fenêtres sont petites et les ventilations parfois mal calfeutrées. L'installation d'une VMC hygroréglable étanche et le remplacement des fenêtres (éligibles à l'aide TNSA jusqu'à 80%) réduisent significativement les nuisances sonores dans la pièce.",
  },
  {
    q: "Combien de temps dure une rénovation de salle de bain à Longvic ?",
    a: "Une rénovation complète prend 8 à 14 jours à Longvic. Les appartements construits entre 1960 et 1985 ont souvent des configurations standardisées qui permettent aux artisans d'anticiper les contraintes. Un rafraîchissement simple se fait en 3 à 5 jours. Les artisans du secteur connaissent bien ces logements et gagnent du temps par rapport à un artisan venant de Dijon centre.",
  },
  {
    q: "Y a-t-il des aides pour rénover la salle de bain à Longvic ?",
    a: "Oui, plusieurs dispositifs sont cumulables. MaPrimeAdapt' finance jusqu'à 70% des travaux PMR pour les personnes âgées ou handicapées. L'aide acoustique TNSA de l'aéroport peut prendre en charge jusqu'à 80% du remplacement des fenêtres de salle de bain. La TVA réduite à 5,5% s'applique aux rénovations dans les logements de plus de 2 ans. L'Anah propose également des subventions sous conditions de ressources.",
  },
  {
    q: "Quelle douche choisir pour un appartement locatif à Longvic ?",
    a: "Pour un locatif à Longvic, nos artisans recommandent une douche à l'italienne avec receveur 80×80 ou 90×90, paroi en verre trempé 6mm et robinetterie thermostatique. Ce type d'installation résiste à l'usage intensif, facilite le nettoyage entre locataires et valorise le bien. Budget complet pose + fourniture : 2 500 à 5 500€.",
  },
  {
    q: "Les maisons pavillonnaires de Longvic ont-elles des besoins différents ?",
    a: "Oui. Les maisons individuelles du secteur résidentiel de Longvic (environ 30% du parc) ont des salles de bain plus grandes (5 à 8m²) et plus récentes. Les projets y sont plus ambitieux : douche italienne grande dimension, double vasque, parfois baignoire îlot. Les budgets sont en conséquence plus élevés mais les surfaces permettent davantage de créativité dans l'aménagement.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e0d0c0] py-5">
      <button
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#1f1008]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#c2410c]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#4a2a10]">{answer}</p>}
    </div>
  );
}

export default function DevisSalleDeBainLongvic() {
  return (
    <main className="min-h-screen bg-[#fdf8f4]">

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#1f1008] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#fb923c]">Artisan</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "SDB Dijon", href: "/devis-salle-de-bain-dijon" },
            { label: "Rénovation Longvic", href: "/devis-renovation-longvic" },
            { label: "Prix", href: "#prix" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-white/70 transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative overflow-hidden px-8 pb-20 pt-24"
        style={{ background: "linear-gradient(140deg, #1f1008 0%, #7c2d12 55%, #2a1008 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fb923c]/35 bg-[#fb923c]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#fed7aa]">
            ✈️ Longvic 21600 · Zone aéroport · Locatif & pavillonnaire
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Salle de Bain à Longvic :<br />
            <span className="text-[#fb923c]">Rénover Vite,</span><br />
            Louer Mieux
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Appartements locatifs, maisons pavillonnaires, logements sociaux. À Longvic, une salle de bain rénovée se loue <strong className="text-white">11 jours plus vite</strong> et justifie <strong className="text-white">60 à 120€ de loyer supplémentaire</strong>. 29 projets documentés.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[
              { val: "29", txt: "projets Longvic 2025–26" },
              { val: "10", txt: "artisans vérifiés" },
              { val: "4 200–10 500€", txt: "rénovation complète" },
              { val: "−11 j.", txt: "vacance locative" },
              { val: "95%", txt: "satisfaction" },
            ].map((k, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{k.val}</div>
                <div className="mt-0.5 text-[11px] text-white/55">{k.txt}</div>
              </div>
            ))}
          </div>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#c2410c] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(194,65,12,0.45)] transition hover:scale-105 hover:bg-[#ea580c]"
          >
            🚿 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · Réponse en 4–6h · Spécialistes locatif Longvic</p>
        </div>
      </section>

      {/* BANDEAU */}
      <section className="bg-[#c2410c] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[
            { v: "+60–120€", l: "Loyer supplémentaire /mois" },
            { v: "−11 j.", l: "Vacance locative évitée" },
            { v: "TNSA 80%", l: "Aide acoustique aéroport" },
            { v: "29", l: "Projets documentés 2025–26" },
            { v: "3 segments", l: "HLM · Locatif · Pavillonnaire" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div>
              <div className="text-[11px] text-white/65">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 SEGMENTS */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Le marché Longvic</div>
          <h2 className="mb-8 text-3xl font-bold text-[#1f1008] md:text-4xl" style={{ fontFamily: "serif" }}>
            Trois réalités, trois approches<br />à Longvic
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "🏢", type: "Logements sociaux",
                part: "54% du parc Longvic",
                desc: "SDB 3,5–5m², plomberie 1965–1985. L'objectif est fonctionnel et durable. Les bailleurs sociaux exigent souvent des matériaux précis — nos artisans connaissent ces contraintes.",
                budget: "2 800–7 500€",
              },
              {
                icon: "🔑", type: "Locatif privé",
                part: "31% des projets SDB",
                desc: "Entre deux locataires ou avant mise sur le marché. Chaque jour de chantier compte. Nos artisans longvicois livrent en 4 à 6 jours avec un résultat qui justifie un loyer supérieur.",
                budget: "1 800–5 500€",
              },
              {
                icon: "🏠", type: "Maisons pavillonnaires",
                part: "15% des projets SDB",
                desc: "Secteur résidentiel Longvic. SDB plus spacieuses (5–8m²), projets plus ambitieux : douche italienne grande dimension, double vasque, finitions soignées.",
                budget: "5 500–15 000€",
              },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 1 ? "border-[#c2410c] bg-[#fff7ed]" : "border-[#e0d0c0] bg-[#fdf8f4]"}`}>
                <div className="mb-2 text-[38px]">{c.icon}</div>
                <div className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-[#c2410c]">{c.part}</div>
                <div className="mb-2 font-bold text-[#1f1008]">{c.type}</div>
                <p className="mb-3 text-[13px] leading-relaxed text-[#4a2a10]">{c.desc}</p>
                <div className="flex justify-between border-t border-[#e0d0c0] pt-2 text-[13px]">
                  <span className="text-[#4a2a10]">Budget</span>
                  <span className="font-bold text-[#c2410c]">{c.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI + TNSA */}
      <section className="px-8 py-16" style={{ background: "#fdf8f4" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Calcul propriétaires</div>
          <h2 className="mb-6 text-3xl font-bold text-[#1f1008] md:text-4xl" style={{ fontFamily: "serif" }}>
            Ce que rapporte une SDB rénovée<br />— et ce que l'État rembourse
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#c2410c] bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-[#1f1008]">📊 ROI locatif — appartement 52m²</h3>
              <div className="space-y-1.5 text-[13px]">
                {[
                  { k: "Coût rénovation SDB", v: "3 800€", hl: false },
                  { k: "Loyer avant travaux", v: "580€/mois", hl: false },
                  { k: "Loyer après travaux", v: "650€/mois", hl: false },
                  { k: "Gain mensuel", v: "+70€/mois", hl: true },
                  { k: "Vacance évitée (11 jours)", v: "+213€ ponctuel", hl: false },
                  { k: "Retour sur investissement", v: "4,2 ans", hl: true },
                ].map((r, i) => (
                  <div key={i} className={`flex justify-between rounded-lg px-3 py-2 ${r.hl ? "bg-[#fff7ed] font-bold" : ""}`}>
                    <span className="text-[#4a2a10]">{r.k}</span>
                    <span className={r.hl ? "text-[#c2410c]" : "font-semibold text-[#1f1008]"}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border-[1.5px] border-[#e0d0c0] bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-[#1f1008]">✈️ Aide TNSA — fenêtre SDB Longvic</h3>
              <p className="mb-4 text-[13px] leading-relaxed text-[#4a2a10]">
                Longvic est en zone B du Plan d'Exposition au Bruit de l'aéroport Dijon-Bourgogne. Le remplacement des fenêtres est éligible à une prise en charge jusqu'à <strong>80%</strong>, y compris les fenêtres de salle de bain.
              </p>
              <div className="space-y-1.5 text-[13px]">
                {[
                  { k: "Fenêtre SDB neuve (Rw ≥ 35dB)", v: "600–1 200€" },
                  { k: "Prise en charge TNSA (80%)", v: "480–960€" },
                  { k: "Reste à charge", v: "120–240€" },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between border-b border-[#e0d0c0] py-1.5 last:border-0">
                    <span className="text-[#4a2a10]">{r.k}</span>
                    <span className="font-bold text-[#c2410c]">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="bg-white px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f1008] md:text-5xl" style={{ fontFamily: "serif" }}>
            Prix rénovation salle de bain<br />à Longvic
          </h2>
          <p className="mb-12 max-w-[580px] text-[15px] text-[#4a2a10]">
            Basé sur 29 projets documentés à Longvic en 2025–2026. Tous tarifs fourniture + main d'œuvre inclus.
          </p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Remise en état locatif", price: "1 800–4 000€", note: "Carrelage par-dessus · Robinetterie · 3–4 jours" },
              { label: "Rénovation complète HLM 4m²", price: "4 200–8 000€", note: "Démolition · Douche · Carrelage · Plomberie" },
              { label: "Douche italienne locatif", price: "2 500–5 500€", note: "Receveur 80×90 · Paroi verre · Robinetterie" },
              { label: "SDB pavillonnaire 6m²", price: "6 000–13 000€", note: "Grand format · Meuble double vasque · Premium" },
              { label: "SDB PMR Longvic", price: "3 800–9 500€", note: "Douche PMR · Barres · WC surélevé · MaPrimeAdapt'" },
              { label: "Fenêtre SDB après TNSA", price: "120–240€*", note: "*Reste à charge après aide 80% aéroport" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d0c0] bg-[#fdf8f4] p-5 transition hover:border-[#c2410c]">
                <div className="mb-1 text-[13px] font-semibold text-[#1f1008]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#c2410c]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#4a2a10]">{r.note}</div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[#e0d0c0]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1f1008] text-white">
                  {["Type de projet", "Longvic", "Dijon centre", "Économie"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["HLM 4m² complet", "4 200–8 000€", "5 000–10 000€", "−15%"],
                  ["Locatif rafraîchi 5m²", "1 800–4 000€", "2 000–4 500€", "−10%"],
                  ["Pavillonnaire 6m²", "6 000–13 000€", "7 000–16 000€", "−12%"],
                  ["PMR 4m²", "3 800–9 500€", "4 500–12 000€", "−15%"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#fdf8f4]">
                    <td className="border-b border-[#e0d0c0] px-4 py-3.5 text-sm font-semibold text-[#1f1008]">{r[0]}</td>
                    <td className="border-b border-[#e0d0c0] px-4 py-3.5 text-sm font-bold text-[#c2410c]">{r[1]}</td>
                    <td className="border-b border-[#e0d0c0] px-4 py-3.5 text-sm text-[#4a2a10]">{r[2]}</td>
                    <td className="border-b border-[#e0d0c0] px-4 py-3.5 text-sm font-bold text-[#1f1008]">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ARTISANS */}
      <section className="px-8 py-20" style={{ background: "#fdf8f4" }} id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f1008] md:text-5xl" style={{ fontFamily: "serif" }}>
            10 artisans vérifiés<br />à Longvic
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#4a2a10]">Maîtrise des logements sociaux, du locatif rapide et des aides TNSA + MaPrimeAdapt'.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "JL", name: "Julien L.", enseigne: "Longvic Bain & Rénov", spec: "Locatif · HLM · Rénovation rapide 4 jours", exp: "14 ans · 210 SDB rénovées à Longvic", zone: "Longvic · Chenôve · Dijon Sud", note: "4.9/5", nb: "210 chantiers" },
              { initials: "SE", name: "Sophie E.", enseigne: "Salle de Bain Design 21", spec: "Pavillonnaire · Douche italienne · Aide TNSA", exp: "9 ans · Partenaire dossiers TNSA aéroport", zone: "Longvic · Sennecey · Ouges", note: "4.9/5", nb: "134 chantiers" },
              { initials: "BO", name: "Bilal O.", enseigne: "Multi-Bains Longvic", spec: "PMR · Budget serré · MaPrimeAdapt'", exp: "7 ans · Dossiers aides gérés de A à Z", zone: "Longvic · Dijon · Côte-d'Or", note: "4.8/5", nb: "88 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d0c0] bg-white p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #1f1008, #7c2d12)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#1f1008]">{a.name}</div>
                    <div className="text-[11px] text-[#c2410c]">{a.enseigne}</div>
                    <div className="text-[11px] text-[#c2410c]">{a.note} · {a.nb}</div>
                  </div>
                </div>
                <p className="mb-2 text-[13px] font-semibold text-[#1f1008]">{a.spec}</p>
                <p className="mb-1 text-[12px] text-[#4a2a10]">📅 {a.exp}</p>
                <p className="mb-4 text-[12px] text-[#4a2a10]">📍 {a.zone}</p>
                <a href="/publier-projet" className="block rounded-xl bg-[#c2410c] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#ea580c]">
                  Demander un devis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#1f1008] md:text-4xl" style={{ fontFamily: "serif" }}>Trois propriétaires témoignent</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "TN", name: "Thomas N.", loc: "Longvic · Locatif 52m² · entre locataires", text: "Julien a refait la salle de bain en 4 jours nets, 2 900€. L'appartement était vide depuis 3 semaines — il a été loué 6 jours après les travaux, 75€ de plus par mois. Le calcul était évident." },
              { avatar: "CF", name: "Christine F.", loc: "Longvic · Pavillon · SDB 7m²", text: "Sophie a posé une douche italienne 120×90 et un carrelage imitation marbre. Elle a monté le dossier TNSA pour la fenêtre — 880€ de remboursement sur la fenêtre acoustique. Service complet, zéro stress." },
              { avatar: "AB", name: "Abdelkader B.", loc: "Longvic · HLM 4m² · PMR pour ma mère", text: "Bilal a adapté la salle de bain de ma mère en 8 jours. Douche PMR, barre d'appui, siège rabattable, WC surélevé. Dossier MaPrimeAdapt' accepté — 5 200€ d'aides sur 7 400€ de travaux. Elle reste chez elle." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d0c0] bg-[#fdf8f4] p-6">
                <div className="mb-2 text-sm text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <p className="mb-5 text-[14px] italic leading-relaxed text-[#4a2a10]">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg, #1f1008, #7c2d12)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#1f1008]">{t.name}</div>
                    <div className="text-[12px] text-[#4a2a10]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNES */}
      <section className="px-8 py-20" style={{ background: "#1f1008" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#fed7aa]">Communes voisines</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Rénovation SDB autour de Longvic</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-salle-de-bain-dijon", nb: "28 artisans", prix: "7 000–35 000€" },
              { name: "Chenôve", href: "/devis-salle-de-bain-chenove", nb: "14 artisans", prix: "4 500–9 000€" },
              { name: "Talant", href: "/devis-salle-de-bain-talant", nb: "11 artisans", prix: "4 800–11 000€" },
              { name: "Quetigny", href: "/devis-salle-de-bain-quetigny", nb: "8 artisans", prix: "8 000–22 000€" },
              { name: "Fontaine-lès-Dijon", href: "/devis-salle-de-bain-fontaine-les-dijon", nb: "6 artisans", prix: "7 500–20 000€" },
              { name: "Sennecey-lès-Dijon", href: "#", nb: "3 artisans", prix: "5 000–12 000€" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#fb923c] hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">{q.nb}</span>
                  <span className="font-bold text-[#fed7aa]">{q.prix}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c2410c]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#1f1008] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation SDB<br />à Longvic</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #1f1008 0%, #7c2d12 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#fb923c]">Prêt à valoriser votre bien ?</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Devis salle de bain gratuit<br />à Longvic
          </h2>
          <p className="mb-10 text-[16px] text-white/60">10 artisans locaux · Locatif · HLM · Pavillonnaire · TNSA · PMR · Réponse en 4–6h</p>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#c2410c] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(194,65,12,0.5)] transition hover:scale-105 hover:bg-[#ea580c]"
          >
            🚿 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Salle de Bain Longvic", url: "https://premiumartisan.fr/devis-salle-de-bain-longvic", areaServed: { "@type": "City", name: "Longvic", postalCode: "21600" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "24" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
