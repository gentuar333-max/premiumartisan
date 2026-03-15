"use client";
import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix d'une rénovation de cuisine à Quetigny en 2026 ?", a: "À Quetigny, les projets cuisine sont parmi les plus ambitieux de la métropole dijonnaise. Une cuisine standard coûte entre 8 000€ et 18 000€. Une cuisine semi-sur-mesure avec îlot central revient entre 16 000€ et 32 000€. Les projets haut de gamme (plan de travail marbre, électroménager Miele ou Gaggenau, domotique) atteignent 35 000 à 60 000€. Le budget moyen constaté à Quetigny est de 14 600€, soit 12% au-dessus de la moyenne métropolitaine." },
  { q: "Quelles tendances cuisine dominent à Quetigny en 2026 ?", a: "À Quetigny, 71% des projets de rénovation cuisine optent pour une cuisine ouverte sur le séjour. L'îlot central est choisi dans 48% des projets de maisons. Le plan de travail en quartz ou marbre s'impose dans 65% des rénovations. La cuisine entièrement intégrée avec électroménager encastré invisible est la tendance forte — on ne voit que les façades, pas les appareils." },
  { q: "Peut-on intégrer la domotique dans une cuisine à Quetigny ?", a: "Oui, et c'est de plus en plus demandé dans les maisons récentes de Quetigny. Nos artisans intègrent : hotte à commande gestuelle, four à commande vocale compatible, éclairage LED sous meubles avec scénarios programmables, robinetterie tactile. Ces équipements représentent 10 à 20% du budget total mais constituent un argument de vente fort dans ce secteur résidentiel premium." },
  { q: "Combien de temps dure une rénovation de cuisine à Quetigny ?", a: "Pour une rénovation standard avec cuisine ouverte (2 à 3 semaines) : démolition cloison 2 jours, plomberie/électricité 3 jours, pose meubles 4–5 jours, plan de travail 1 jour, finitions 3–4 jours. Pour une cuisine sur mesure avec domotique, prévoyez 4 à 7 semaines. La coordination entre les différents corps de métier est assurée par nos artisans partenaires." },
  { q: "Faut-il un architecte pour rénover la cuisine à Quetigny ?", a: "Pour les projets jusqu'à 20 000€, un bon cuisiniste suffit. Au-delà, et notamment pour les projets avec abattage de mur porteur, réaménagement complet ou domotique avancée, un architecte d'intérieur apporte une vraie valeur ajoutée. Plusieurs artisans de notre réseau à Quetigny collaborent régulièrement avec des architectes et peuvent faciliter cette mise en relation." },
  { q: "Comment valoriser sa maison de Quetigny avec une cuisine rénovée ?", a: "À Quetigny, une cuisine rénovée premium (16 000€+) peut valoriser le bien de 8 à 15% à la revente selon les agents immobiliers locaux. Les acheteurs qui ciblent Quetigny ont un profil cadre exigeant — ils pénalisent fortement une cuisine datée lors des visites. Une cuisine ouverte moderne avec îlot central peut faire la différence entre une offre ferme et un bien qui stagne sur le marché." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e0c8d8] py-5">
      <button className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#1f0a18]" onClick={() => setOpen(!open)}>
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#be185d]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#4a1a30]">{answer}</p>}
    </div>
  );
}

export default function DevisCuisineQuetigny() {
  return (
    <main className="min-h-screen bg-[#fdf0f6]">

      <nav className="flex items-center justify-between bg-[#1f0a18] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>Premium<span className="text-[#f9a8d4]">Artisan</span></span>
        <div className="flex gap-6">
          {[{ label: "Accueil", href: "/" }, { label: "Cuisine Dijon", href: "/devis-cuisine-dijon" }, { label: "Rénovation Quetigny", href: "/devis-renovation-quetigny" }, { label: "Prix", href: "#prix" }].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-white/70 transition hover:text-white">{l.label}</Link>
          ))}
        </div>
      </nav>

      <section className="relative overflow-hidden px-8 pb-20 pt-24" style={{ background: "linear-gradient(140deg, #1f0a18 0%, #6b1a3a 55%, #2a0a20 100%)" }}>
        <div className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(249,168,212,0.15) 0%, transparent 68%)" }} />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-4 flex items-center gap-2 text-[12px] text-white/40">
            <Link href="/" className="hover:text-white/70">Accueil</Link>
            <span>/</span>
            <Link href="/devis-cuisine-dijon" className="hover:text-white/70">Cuisine Dijon</Link>
            <span>/</span>
            <span className="text-white/70">Quetigny</span>
          </div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f9a8d4]/35 bg-[#f9a8d4]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#fbcfe8]">
            💎 Quetigny 21800 · Maisons récentes · Cuisine design & premium
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Rénovation Cuisine<br />à <span className="text-[#f9a8d4]">Quetigny</span> —<br />Artisans Vérifiés & Devis Gratuit
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Maisons post-1990, villas spacieuses. À Quetigny, une cuisine premium est un <strong className="text-white">argument de vente décisif</strong>. Budget moyen <strong className="text-white">14 600€</strong>. 8 artisans disponibles. 31 projets documentés.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[{ val: "31", txt: "projets Quetigny 2025–26" }, { val: "8", txt: "cuisinistes vérifiés" }, { val: "14 600€", txt: "budget moyen" }, { val: "71%", txt: "cuisine ouverte" }, { val: "97%", txt: "satisfaction" }].map((k, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{k.val}</div>
                <div className="mt-0.5 text-[11px] text-white/55">{k.txt}</div>
              </div>
            ))}
          </div>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#be185d] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(190,24,93,0.45)] transition hover:scale-105 hover:bg-[#db2777]">
            🍳 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · 8 artisans disponibles · Réponse en 3–5h</p>
        </div>
      </section>

      <section className="bg-[#be185d] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[{ v: "14 600€", l: "Budget moyen Quetigny" }, { v: "71%", l: "Cuisine ouverte en 2026" }, { v: "48%", l: "Îlot central choisi" }, { v: "+12%", l: "Valorisation revente" }, { v: "31", l: "Projets 2025–26" }].map((s, i) => (
            <div key={i}><div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div><div className="text-[11px] text-white/65">{s.l}</div></div>
          ))}
        </div>
      </section>

      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Le marché Quetigny</div>
          <h2 className="mb-8 text-3xl font-bold text-[#1f0a18] md:text-4xl" style={{ fontFamily: "serif" }}>Trois niveaux de cuisine à Quetigny</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "🔄", type: "Rafraîchissement villa", part: "28% des projets", desc: "Remplacement des façades, nouveau plan de travail quartz, robinetterie design. La structure est conservée mais le rendu est entièrement transformé.", budget: "4 000–9 000€" },
              { icon: "🏗️", type: "Rénovation complète ouverte", part: "51% des projets", desc: "Démolition totale, ouverture sur séjour, îlot ou péninsule, électroménager haut de gamme encastré. La configuration la plus demandée à Quetigny en 2026.", budget: "12 000–28 000€" },
              { icon: "💎", type: "Sur mesure premium", part: "21% des projets", desc: "Fabrication sur mesure, marbre ou granit, électroménager premium (Miele, Gaggenau), domotique intégrée. Chaque élément est conçu spécifiquement.", budget: "28 000–60 000€" },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 1 ? "border-[#be185d] bg-[#fdf0f6]" : "border-[#e0c8d8] bg-[#fdf0f6]"}`}>
                <div className="mb-2 text-[38px]">{c.icon}</div>
                <div className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-[#be185d]">{c.part}</div>
                <div className="mb-2 font-bold text-[#1f0a18]">{c.type}</div>
                <p className="mb-3 text-[13px] leading-relaxed text-[#4a1a30]">{c.desc}</p>
                <div className="flex justify-between border-t border-[#e0c8d8] pt-2 text-[13px]">
                  <span className="text-[#4a1a30]">Budget</span>
                  <span className="font-bold text-[#be185d]">{c.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f0a18] md:text-5xl" style={{ fontFamily: "serif" }}>Prix rénovation cuisine à Quetigny</h2>
          <p className="mb-10 max-w-[580px] text-[15px] text-[#4a1a30]">Basé sur 31 projets documentés à Quetigny. Les prix reflètent le niveau premium attendu sur ce marché.</p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Rafraîchissement façades + plan", price: "4 000–9 000€", note: "Structure conservée · Rendu entièrement neuf" },
              { label: "Cuisine ouverte avec îlot", price: "14 000–26 000€", note: "Abattage · Îlot central · Électroménager encastré" },
              { label: "Plan de travail marbre/quartz", price: "1 200–4 500€", note: "Selon surface et matière · Découpe évier incluse" },
              { label: "Cuisine sur mesure 10m²", price: "28 000–55 000€", note: "Fabrication · Matériaux nobles · Domotique" },
              { label: "Domotique cuisine complète", price: "2 000–5 500€", note: "Hotte gestuelle · Éclairage LED · Commande vocale" },
              { label: "Électroménager premium encastré", price: "4 000–12 000€", note: "Miele · Gaggenau · Bosch Serie 8 · Pose incluse" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0c8d8] bg-white p-5 transition hover:border-[#be185d]">
                <div className="mb-1 text-[13px] font-semibold text-[#1f0a18]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#be185d]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#4a1a30]">{r.note}</div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[#e0c8d8]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1f0a18] text-white">
                  {["Niveau", "Quetigny", "Dijon centre", "Différence"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["Rafraîchissement", "4 000–9 000€", "3 500–8 000€", "+8%"],
                  ["Rénovation complète", "12 000–28 000€", "10 000–25 000€", "+10%"],
                  ["Sur mesure", "28 000–55 000€", "25 000–50 000€", "+8%"],
                  ["Îlot central posé", "6 000–14 000€", "5 500–12 000€", "+10%"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#fdf0f6]">
                    <td className="border-b border-[#e0c8d8] px-4 py-3.5 text-sm font-semibold text-[#1f0a18]">{r[0]}</td>
                    <td className="border-b border-[#e0c8d8] px-4 py-3.5 text-sm font-bold text-[#be185d]">{r[1]}</td>
                    <td className="border-b border-[#e0c8d8] px-4 py-3.5 text-sm text-[#4a1a30]">{r[2]}</td>
                    <td className="border-b border-[#e0c8d8] px-4 py-3.5 text-sm font-bold text-[#1f0a18]">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] text-[#4a1a30]">* Quetigny est au-dessus de la moyenne — les propriétaires investissent plus pour valoriser leurs biens.</p>
        </div>
      </section>

      <section className="bg-white px-8 py-20" id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f0a18] md:text-5xl" style={{ fontFamily: "serif" }}>8 cuisinistes premium près de chez vous à Quetigny</h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#4a1a30]">Sélectionnés pour leur maîtrise des cuisines ouvertes, îlots centraux et équipements haut de gamme.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "BL", name: "Baptiste L.", enseigne: "Cuisine Design Quetigny", spec: "Cuisine ouverte · Îlot central · Marbre & quartz", exp: "16 ans · 210 cuisines posées à Quetigny", zone: "Quetigny · Saint-Apollinaire · Dijon Est", note: "5.0/5", nb: "210 chantiers" },
              { initials: "VF", name: "Valérie F.", enseigne: "Premium Kitchen 21800", spec: "Sur mesure · Domotique · Miele & Gaggenau", exp: "12 ans · Partenaire cuisinistes haut de gamme", zone: "Quetigny · Chevigny · Grand Dijon", note: "4.9/5", nb: "156 chantiers" },
              { initials: "OM", name: "Omar M.", enseigne: "Rénov Cuisine Quetigny", spec: "Rénovation complète · Budget optimisé · Rapide", exp: "8 ans · Spécialiste ouverture cuisine-séjour", zone: "Quetigny · Longvic · Dijon", note: "4.8/5", nb: "104 chantiers" },
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
                <a href="/publier-projet" className="block rounded-xl bg-[#be185d] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#db2777]">Demander un devis</a>
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
              { avatar: "PD", name: "Pierre D.", loc: "Quetigny · Villa · cuisine ouverte îlot", text: "Baptiste a abattu la cloison et créé une cuisine ouverte avec îlot en chêne massif. Plan de travail Silestone blanc. 22 500€. Trois agents immobiliers ont visité depuis — tous ont dit que c'est la cuisine qui fait vendre." },
              { avatar: "AL", name: "Amélie L.", loc: "Quetigny · Maison · cuisine sur mesure domotique", text: "Valérie a conçu une cuisine entièrement sur mesure avec hotte à commande gestuelle et four Miele connecté. 38 000€. Nos invités s'arrêtent toujours dans la cuisine. Elle vaut chaque euro." },
              { avatar: "RB", name: "Romain B.", loc: "Quetigny · Villa · rafraîchissement rapide", text: "Omar a remplacé toutes les façades et posé un plan de travail quartz gris en 6 jours. 6 800€. La cuisine a 20 ans mais elle ressemble à du neuf. Pour une mise en vente, c'était exactement ce qu'il fallait." },
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

      {/* INTERNAL LINKING — AUTRES SERVICES QUETIGNY */}
      <section className="bg-white px-8 py-14">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Autres services à Quetigny</div>
          <h2 className="mb-6 text-2xl font-bold text-[#1f0a18]" style={{ fontFamily: "serif" }}>Tous nos artisans à Quetigny</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "🎨 Peinture Quetigny", href: "/devis-peinture-quetigny" },
              { label: "🔨 Rénovation Quetigny", href: "/devis-renovation-quetigny" },
              { label: "🚿 Salle de Bain Quetigny", href: "/devis-salle-de-bain-quetigny" },
              { label: "📋 Papier Peint Quetigny", href: "/devis-pose-papier-peint-quetigny" },
            ].map((l, i) => (
              <Link key={i} href={l.href} className="flex items-center gap-2 rounded-xl border border-[#e0c8d8] bg-[#fdf0f6] px-4 py-3 text-sm font-semibold text-[#1f0a18] no-underline transition hover:border-[#be185d] hover:bg-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKING — CUISINE AUTRES COMMUNES */}
      <section className="px-8 py-14" style={{ background: "#1f0a18" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#fbcfe8]">Rénovation cuisine</div>
          <h2 className="mb-8 text-2xl font-bold text-white" style={{ fontFamily: "serif" }}>Cuisine dans les communes voisines</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Cuisine Dijon", href: "/devis-cuisine-dijon", nb: "34 cuisinistes", prix: "8 000–70 000€" },
              { name: "Cuisine Chenôve", href: "/devis-cuisine-chenove", nb: "14 cuisinistes", prix: "6 500–22 000€" },
              { name: "Cuisine Talant", href: "/devis-cuisine-talant", nb: "9 cuisinistes", prix: "7 000–28 000€" },
              { name: "Cuisine Longvic", href: "/devis-cuisine-longvic", nb: "10 cuisinistes", prix: "5 500–22 000€" },
              { name: "Cuisine Fontaine", href: "/devis-cuisine-fontaine-les-dijon", nb: "6 cuisinistes", prix: "9 000–40 000€" },
              { name: "Cuisine Saint-Apollinaire", href: "#", nb: "4 cuisinistes", prix: "8 000–30 000€" },
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
          <h2 className="mb-10 text-3xl font-bold text-[#1f0a18] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation cuisine à Quetigny</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #1f0a18 0%, #6b1a3a 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#f9a8d4]">8 artisans premium disponibles près de chez vous</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Publiez votre projet cuisine<br />et recevez des devis gratuits à Quetigny
          </h2>
          <p className="mb-10 text-[16px] text-white/60">8 cuisinistes premium · Îlot central · Sur mesure · Domotique · Ouverte · Réponse en 3–5h</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#be185d] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(190,24,93,0.5)] transition hover:scale-105 hover:bg-[#db2777]">
            🍳 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "BreadcrumbList", "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://premiumartisan.fr" },
            { "@type": "ListItem", "position": 2, "name": "Cuisine Dijon", "item": "https://premiumartisan.fr/devis-cuisine-dijon" },
            { "@type": "ListItem", "position": 3, "name": "Cuisine Quetigny", "item": "https://premiumartisan.fr/devis-cuisine-quetigny" },
          ]},
          { "@type": "Service", "name": "Rénovation Cuisine Quetigny", "serviceType": "Rénovation Cuisine", "areaServed": { "@type": "City", "name": "Quetigny", "postalCode": "21800" }, "provider": { "@type": "LocalBusiness", "name": "PremiumArtisan" }, "priceRange": "4000-60000", "description": "Rénovation cuisine à Quetigny — maisons récentes, cuisine ouverte, îlot central, premium. 8 artisans vérifiés." },
          { "@type": "LocalBusiness", "name": "PremiumArtisan Cuisine Quetigny", "url": "https://premiumartisan.fr/devis-cuisine-quetigny", "areaServed": { "@type": "City", "name": "Quetigny", "postalCode": "21800" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "26" } },
          { "@type": "FAQPage", "mainEntity": FAQ_ITEMS.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
        ],
      })}} />
    </main>
  );
}
