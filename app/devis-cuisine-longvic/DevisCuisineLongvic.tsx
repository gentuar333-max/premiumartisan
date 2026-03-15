"use client";
import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix d'une rénovation de cuisine à Longvic en 2026 ?", a: "À Longvic, le prix d'une rénovation de cuisine est légèrement inférieur à Dijon centre. Une cuisine standard pour un appartement locatif coûte entre 5 500€ et 12 000€. Pour les maisons pavillonnaires du secteur résidentiel, une rénovation complète revient entre 9 000€ et 22 000€. Le budget moyen constaté à Longvic est de 9 800€, soit environ 10% en dessous de la moyenne dijonnaise." },
  { q: "Peut-on ouvrir la cuisine sur le séjour dans un logement social de Longvic ?", a: "Dans les logements sociaux de Longvic, tout abattage de cloison nécessite l'accord préalable écrit du bailleur. Certaines cloisons sont porteuses ou contiennent des réseaux. En revanche, dans les maisons pavillonnaires privées, l'ouverture cuisine-séjour est très courante et bien maîtrisée par nos artisans longvicois. C'est la configuration la plus demandée en 2026 dans le secteur résidentiel." },
  { q: "Les artisans de Longvic maîtrisent-ils les contraintes liées à l'aéroport ?", a: "Oui. Certains travaux de rénovation cuisine incluent le remplacement de la fenêtre de cuisine, éligible à l'aide acoustique TNSA si vous êtes en zone B du Plan d'Exposition au Bruit de l'aéroport Dijon-Bourgogne. Nos artisans connaissent ce dispositif et peuvent intégrer le remplacement de fenêtre dans leur devis cuisine global avec prise en charge jusqu'à 80%." },
  { q: "Combien de temps dure une rénovation de cuisine à Longvic ?", a: "Pour un appartement standard à Longvic, une rénovation complète prend 8 à 12 jours. Pour une maison pavillonnaire avec ouverture sur séjour, comptez 2 à 4 semaines. Les artisans locaux connaissent bien les configurations des logements longvicois et anticipent les contraintes sans délai supplémentaire." },
  { q: "Quelle cuisine choisir pour valoriser un bien locatif à Longvic ?", a: "Pour un locatif à Longvic, nos artisans recommandent : façades mélaminé mat gris ou blanc, plan de travail quartz résistant, robinetterie chrome brossé, électroménager encastré milieu de gamme. Cette configuration moderne se loue plus facilement et justifie un loyer supérieur de 50 à 80€/mois. ROI estimé : 3 à 4 ans." },
  { q: "Y a-t-il des aides pour rénover la cuisine à Longvic ?", a: "La cuisine seule ne bénéficie pas d'aides directes. En revanche, le remplacement de la fenêtre de cuisine peut être financé à 80% par l'aide TNSA si vous êtes en zone B aéroport. La TVA à 5,5% s'applique sur la main d'œuvre pour les logements de plus de 2 ans. Pour les propriétaires aux revenus modestes, l'Anah peut financer une rénovation globale incluant la cuisine." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e0d0c0] py-5">
      <button className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#1f1008]" onClick={() => setOpen(!open)}>
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#c2410c]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#4a2a10]">{answer}</p>}
    </div>
  );
}

export default function DevisCuisineLongvic() {
  return (
    <main className="min-h-screen bg-[#fdf8f4]">

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#1f1008] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>Premium<span className="text-[#fb923c]">Artisan</span></span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "Cuisine Dijon", href: "/devis-cuisine-dijon" },
            { label: "Rénovation Longvic", href: "/devis-renovation-longvic" },
            { label: "Prix", href: "#prix" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-white/70 transition hover:text-white">{l.label}</Link>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-8 pb-20 pt-24" style={{ background: "linear-gradient(140deg, #1f1008 0%, #7c2d12 55%, #2a1008 100%)" }}>
        <div className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 68%)" }} />
        <div className="relative mx-auto max-w-[920px]">
          {/* BREADCRUMB */}
          <div className="mb-4 flex items-center gap-2 text-[12px] text-white/40">
            <Link href="/" className="hover:text-white/70">Accueil</Link>
            <span>/</span>
            <Link href="/devis-cuisine-dijon" className="hover:text-white/70">Cuisine Dijon</Link>
            <span>/</span>
            <span className="text-white/70">Longvic</span>
          </div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fb923c]/35 bg-[#fb923c]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#fed7aa]">
            ✈️ Longvic 21600 · Zone aéroport · Locatif & pavillonnaire
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Rénovation Cuisine<br />à <span className="text-[#fb923c]">Longvic</span> —<br />Artisans Vérifiés & Devis Gratuit
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Logements sociaux, maisons pavillonnaires, locatifs. À Longvic, une cuisine rénovée loue <strong className="text-white">50–80€ de plus par mois</strong>. Aide TNSA fenêtre jusqu'à <strong className="text-white">80%</strong>. 10 artisans disponibles. 33 projets documentés.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[{ val: "33", txt: "projets Longvic 2025–26" }, { val: "10", txt: "cuisinistes vérifiés" }, { val: "9 800€", txt: "budget moyen" }, { val: "TNSA 80%", txt: "aide fenêtre aéroport" }, { val: "95%", txt: "satisfaction" }].map((k, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{k.val}</div>
                <div className="mt-0.5 text-[11px] text-white/55">{k.txt}</div>
              </div>
            ))}
          </div>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#c2410c] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(194,65,12,0.45)] transition hover:scale-105 hover:bg-[#ea580c]">
            🍳 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · 10 artisans disponibles · Réponse en 4–6h</p>
        </div>
      </section>

      {/* BANDEAU */}
      <section className="bg-[#c2410c] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[{ v: "9 800€", l: "Budget moyen Longvic" }, { v: "−10%", l: "vs Dijon centre" }, { v: "TNSA 80%", l: "Fenêtre cuisine aéroport" }, { v: "+50–80€", l: "Loyer supplémentaire /mois" }, { v: "33", l: "Projets 2025–26" }].map((s, i) => (
            <div key={i}><div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div><div className="text-[11px] text-white/65">{s.l}</div></div>
          ))}
        </div>
      </section>

      {/* 3 PROFILS */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Le marché Longvic</div>
          <h2 className="mb-8 text-3xl font-bold text-[#1f1008] md:text-4xl" style={{ fontFamily: "serif" }}>Trois profils de cuisine à Longvic</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "🏢", type: "Logements sociaux", part: "52% des projets", desc: "Cuisines 5–6m² fermées. Optimisation de l'espace, nouveaux meubles hauts, électroménager encastré. Accord bailleur requis pour cloisons.", budget: "3 500–10 000€" },
              { icon: "🔑", type: "Locatif privé", part: "32% des projets", desc: "Remise en état entre locataires ou mise en valeur avant location. Une cuisine moderne justifie +50–80€/mois de loyer à Longvic. ROI 3–4 ans.", budget: "2 000–7 000€" },
              { icon: "🏠", type: "Maisons pavillonnaires", part: "16% des projets", desc: "Cuisines plus spacieuses 7–10m². Ouverture sur séjour courante, îlot central possible, équipements haut de gamme. Projets les plus ambitieux.", budget: "9 000–22 000€" },
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

      {/* PRIX */}
      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f1008] md:text-5xl" style={{ fontFamily: "serif" }}>Prix rénovation cuisine à Longvic</h2>
          <p className="mb-10 max-w-[580px] text-[15px] text-[#4a2a10]">Basé sur 33 projets documentés à Longvic. Tarifs ~10% inférieurs à Dijon centre.</p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Rénovation logement social 5m²", price: "3 500–8 500€", note: "Meubles · Électroménager · Carrelage crédence" },
              { label: "Cuisine locative remise à neuf", price: "2 000–5 500€", note: "Rapide · 4–6 jours · Prêt à louer" },
              { label: "Cuisine pavillonnaire 8m²", price: "9 000–18 000€", note: "Semi-sur-mesure · Plan travail quartz" },
              { label: "Cuisine ouverte sur séjour", price: "13 000–22 000€", note: "Abattage · Îlot péninsule · Électroménager premium" },
              { label: "Fenêtre cuisine après TNSA", price: "120–250€*", note: "*Reste à charge après aide 80% aéroport" },
              { label: "Pose cuisine IKEA/GSB", price: "800–2 200€", note: "Pose seule · Plomberie + électricité incluses" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d0c0] bg-white p-5 transition hover:border-[#c2410c]">
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
                  ["Logement social 5m²", "3 500–8 500€", "4 000–10 000€", "−12%"],
                  ["Locatif remise à neuf", "2 000–5 500€", "2 500–6 500€", "−10%"],
                  ["Pavillonnaire 8m²", "9 000–18 000€", "10 000–20 000€", "−10%"],
                  ["Cuisine ouverte", "13 000–22 000€", "15 000–26 000€", "−12%"],
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
      <section className="bg-white px-8 py-20" id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f1008] md:text-5xl" style={{ fontFamily: "serif" }}>10 cuisinistes vérifiés près de chez vous à Longvic</h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#4a2a10]">Spécialistes locatif, logements sociaux et pavillonnaire. Maîtrise de l'aide TNSA aéroport.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "GL", name: "Guillaume L.", enseigne: "Cuisine Longvic Pro", spec: "Locatif · Social · Pavillonnaire · TNSA", exp: "14 ans · 230 cuisines posées à Longvic", zone: "Longvic · Chenôve · Dijon Sud", note: "4.9/5", nb: "230 chantiers" },
              { initials: "SR", name: "Sandrine R.", enseigne: "Aménagement Cuisine 21600", spec: "Cuisine ouverte · Îlot central · Semi-sur-mesure", exp: "10 ans · Spécialiste ouvertures pavillonnaires", zone: "Longvic · Sennecey · Ouges", note: "4.9/5", nb: "152 chantiers" },
              { initials: "YB", name: "Youssef B.", enseigne: "Multi-Cuisine Longvic", spec: "Rénovation complète · Budget maîtrisé · Rapide", exp: "7 ans · Dossiers TNSA fenêtres gérés", zone: "Longvic · Dijon · Côte-d'Or", note: "4.8/5", nb: "98 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d0c0] bg-[#fdf8f4] p-6">
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
                <a href="/publier-projet" className="block rounded-xl bg-[#c2410c] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#ea580c]">Demander un devis</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#1f1008] md:text-4xl" style={{ fontFamily: "serif" }}>Trois projets réels à Longvic</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "KM", name: "Karim M.", loc: "Longvic · Logement social 5m²", text: "Guillaume a posé une cuisine complète en 10 jours dans notre HLM. Meubles jusqu'au plafond, hotte aspirante intégrée, carrelage crédence gris. 7 200€. On a enfin une vraie cuisine fonctionnelle après 15 ans avec l'ancienne." },
              { avatar: "EV", name: "Elodie V.", loc: "Longvic · Locatif · remise à neuf", text: "Sandrine a refait la cuisine de mon appartement locatif en 5 jours entre deux locataires. 3 100€. Facades grises mat, plan de travail blanc. Mon nouveau locataire a accepté 65€ de loyer en plus sans discuter." },
              { avatar: "MF", name: "Michel F.", loc: "Longvic · Pavillon · cuisine ouverte", text: "Youssef a abattu la cloison et créé une cuisine ouverte avec péninsule. Il a aussi géré le dossier TNSA pour la fenêtre — 210€ de reste à charge sur une fenêtre à 1 050€. 16 800€ au total. Le séjour a doublé visuellement." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d0c0] bg-white p-6">
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

      {/* INTERNAL LINKING — AUTRES SERVICES LONGVIC */}
      <section className="bg-white px-8 py-14">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Autres services à Longvic</div>
          <h2 className="mb-6 text-2xl font-bold text-[#1f1008]" style={{ fontFamily: "serif" }}>Tous nos artisans à Longvic</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "🎨 Peinture Longvic", href: "/devis-peinture-longvic" },
              { label: "🔨 Rénovation Longvic", href: "/devis-renovation-longvic" },
              { label: "🚿 Salle de Bain Longvic", href: "/devis-salle-de-bain-longvic" },
              { label: "📋 Papier Peint Longvic", href: "/devis-pose-papier-peint-longvic" },
            ].map((l, i) => (
              <Link key={i} href={l.href} className="flex items-center gap-2 rounded-xl border border-[#e0d0c0] bg-[#fdf8f4] px-4 py-3 text-sm font-semibold text-[#1f1008] no-underline transition hover:border-[#c2410c] hover:bg-[#fff7ed]">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKING — CUISINE AUTRES COMMUNES */}
      <section className="px-8 py-14" style={{ background: "#1f1008" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#fed7aa]">Rénovation cuisine</div>
          <h2 className="mb-8 text-2xl font-bold text-white" style={{ fontFamily: "serif" }}>Cuisine dans les communes voisines</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Cuisine Dijon", href: "/devis-cuisine-dijon", nb: "34 cuisinistes", prix: "8 000–70 000€" },
              { name: "Cuisine Chenôve", href: "/devis-cuisine-chenove", nb: "14 cuisinistes", prix: "6 500–22 000€" },
              { name: "Cuisine Talant", href: "/devis-cuisine-talant", nb: "9 cuisinistes", prix: "7 000–28 000€" },
              { name: "Cuisine Quetigny", href: "/devis-cuisine-quetigny", nb: "8 cuisinistes", prix: "10 000–35 000€" },
              { name: "Cuisine Fontaine", href: "/devis-cuisine-fontaine-les-dijon", nb: "6 cuisinistes", prix: "9 000–40 000€" },
              { name: "Cuisine Sennecey", href: "#", nb: "3 cuisinistes", prix: "6 000–15 000€" },
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
          <h2 className="mb-10 text-3xl font-bold text-[#1f1008] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation cuisine à Longvic</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #1f1008 0%, #7c2d12 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#fb923c]">10 artisans disponibles près de chez vous</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Publiez votre projet cuisine<br />et recevez des devis gratuits à Longvic
          </h2>
          <p className="mb-10 text-[16px] text-white/60">10 cuisinistes vérifiés · Social · Locatif · Pavillonnaire · TNSA · Réponse en 4–6h</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#c2410c] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(194,65,12,0.5)] transition hover:scale-105 hover:bg-[#ea580c]">
            🍳 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      {/* SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://premiumartisan.fr" },
              { "@type": "ListItem", "position": 2, "name": "Cuisine Dijon", "item": "https://premiumartisan.fr/devis-cuisine-dijon" },
              { "@type": "ListItem", "position": 3, "name": "Cuisine Longvic", "item": "https://premiumartisan.fr/devis-cuisine-longvic" },
            ]
          },
          {
            "@type": "Service",
            "name": "Rénovation Cuisine Longvic",
            "serviceType": "Rénovation Cuisine",
            "areaServed": { "@type": "City", "name": "Longvic", "postalCode": "21600" },
            "provider": { "@type": "LocalBusiness", "name": "PremiumArtisan" },
            "priceRange": "2000-22000",
            "description": "Rénovation de cuisine à Longvic — logements sociaux, locatifs et maisons pavillonnaires. 10 artisans vérifiés, devis gratuit."
          },
          {
            "@type": "LocalBusiness",
            "name": "PremiumArtisan Cuisine Longvic",
            "url": "https://premiumartisan.fr/devis-cuisine-longvic",
            "areaServed": { "@type": "City", "name": "Longvic", "postalCode": "21600" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "27" }
          },
          {
            "@type": "FAQPage",
            "mainEntity": FAQ_ITEMS.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
          },
        ],
      })}} />
    </main>
  );
}
