"use client";
import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix d'une rénovation de cuisine à Fontaine-lès-Dijon en 2026 ?", a: "À Fontaine-lès-Dijon, les projets cuisine sont généralement plus ambitieux que dans les communes avec un parc HLM important. Une rénovation standard coûte entre 7 500€ et 18 000€. Pour les maisons de caractère avec cuisine ouverte sur séjour et matériaux nobles (plan de travail pierre, façades chêne), comptez 16 000€ à 35 000€. Le budget moyen constaté à Fontaine est de 12 400€." },
  { q: "Quels matériaux choisir pour une cuisine dans une maison de caractère à Fontaine ?", a: "Les maisons de Fontaine-lès-Dijon ont souvent une identité architecturale forte — parquets anciens, volumes généreux, lumière naturelle abondante. Nos artisans recommandent des matériaux qui respectent cet esprit : façades en chêne massif ou chêne plaqué, plan de travail en granit ou pierre de Bourgogne, crédence en carrelage metro ou zellige. Ces choix créent une cohérence avec le reste de la maison et renforcent la valeur du bien." },
  { q: "Peut-on ouvrir la cuisine sur le séjour dans une maison de Fontaine ?", a: "Oui, et c'est la transformation la plus demandée à Fontaine en 2026. La majorité des maisons du secteur ont des cloisons qui peuvent être abattues après vérification structurelle. Nos artisans coordonnent le bureau d'études si nécessaire. L'ouverture cuisine-séjour crée un espace de vie généreux très apprécié dans ces maisons des années 1960–1990 et valorise fortement le bien." },
  { q: "Combien de temps dure une rénovation de cuisine à Fontaine-lès-Dijon ?", a: "Pour une rénovation standard (12 à 18 jours) : démolition 2 jours, plomberie/électricité 3 jours, pose meubles 4–5 jours, plan de travail 1 jour, crédence et finitions 3–4 jours. Pour une cuisine ouverte avec matériaux nobles, prévoyez 3 à 5 semaines. Les maisons de Fontaine ont des configurations individualisées — chaque chantier est unique et nos artisans s'adaptent." },
  { q: "Y a-t-il des aides pour rénover la cuisine à Fontaine-lès-Dijon ?", a: "La cuisine seule ne bénéficie pas d'aides directes. En revanche, si vous coupler la rénovation cuisine à des travaux d'isolation ou de chauffage, MaPrimeRénov' peut s'appliquer à l'ensemble. La TVA à 5,5% s'applique sur la main d'œuvre pour les logements de plus de 2 ans. Les propriétaires aux revenus intermédiaires peuvent aussi bénéficier des aides de l'Anah dans le cadre d'une rénovation globale." },
  { q: "Les artisans de Fontaine posent-ils aussi les cuisines achetées en magasin ?", a: "Oui. Nos artisans fontainois posent les cuisines achetées chez IKEA, Leroy Merlin, Schmidt ou Arthur Bonnet. Cette option permet de choisir le fabricant librement tout en bénéficiant d'une pose professionnelle locale. Le coût de la pose seule varie de 900 à 2 800€ selon la complexité. Plomberie et électricité sont incluses dans le devis de pose." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#c8d8c0] py-5">
      <button className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#0f1f0a]" onClick={() => setOpen(!open)}>
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#4d7c0f]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#2a4a1a]">{answer}</p>}
    </div>
  );
}

export default function DevisCuisineFontaine() {
  return (
    <main className="min-h-screen bg-[#f4f8f0]">

      <nav className="flex items-center justify-between bg-[#0f1f0a] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>Premium<span className="text-[#a3e635]">Artisan</span></span>
        <div className="flex gap-6">
          {[{ label: "Accueil", href: "/" }, { label: "Cuisine Dijon", href: "/devis-cuisine-dijon" }, { label: "Rénovation Fontaine", href: "/devis-renovation-fontaine-les-dijon" }, { label: "Prix", href: "#prix" }].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-white/70 transition hover:text-white">{l.label}</Link>
          ))}
        </div>
      </nav>

      <section className="relative overflow-hidden px-8 pb-20 pt-24" style={{ background: "linear-gradient(140deg, #0f1f0a 0%, #1a3d08 55%, #0f2a08 100%)" }}>
        <div className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 68%)" }} />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-4 flex items-center gap-2 text-[12px] text-white/40">
            <Link href="/" className="hover:text-white/70">Accueil</Link>
            <span>/</span>
            <Link href="/devis-cuisine-dijon" className="hover:text-white/70">Cuisine Dijon</Link>
            <span>/</span>
            <span className="text-white/70">Fontaine-lès-Dijon</span>
          </div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#a3e635]/35 bg-[#a3e635]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#d9f99d]">
            🌲 Fontaine-lès-Dijon 21121 · Maisons de caractère · Matériaux nobles
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Rénovation Cuisine<br />à <span className="text-[#a3e635]">Fontaine-lès-Dijon</span> —<br />Artisans Vérifiés & Devis Gratuit
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Maisons de caractère, volumes généreux, matériaux nobles. À Fontaine, une cuisine ouverte en chêne et pierre transforme le bien. <strong className="text-white">6 artisans spécialisés.</strong> Budget moyen <strong className="text-white">12 400€</strong>. 28 projets documentés.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[{ val: "28", txt: "projets Fontaine 2025–26" }, { val: "6", txt: "cuisinistes spécialisés" }, { val: "12 400€", txt: "budget moyen" }, { val: "Chêne & Pierre", txt: "matières signature" }, { val: "97%", txt: "satisfaction" }].map((k, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{k.val}</div>
                <div className="mt-0.5 text-[11px] text-white/55">{k.txt}</div>
              </div>
            ))}
          </div>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#4d7c0f] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(77,124,15,0.45)] transition hover:scale-105 hover:bg-[#65a30d]">
            🍳 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · 6 artisans disponibles · Réponse en 4–7h</p>
        </div>
      </section>

      <section className="bg-[#4d7c0f] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[{ v: "12 400€", l: "Budget moyen Fontaine" }, { v: "Chêne massif", l: "Matière la plus demandée" }, { v: "Pierre Bourgogne", l: "Plan de travail signature" }, { v: "Ouverture séjour", l: "Tendance #1 en 2026" }, { v: "28", l: "Projets 2025–26" }].map((s, i) => (
            <div key={i}><div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div><div className="text-[11px] text-white/65">{s.l}</div></div>
          ))}
        </div>
      </section>

      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Le marché Fontaine</div>
          <h2 className="mb-8 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>Trois approches cuisine à Fontaine-lès-Dijon</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "🌲", type: "Maison de caractère", part: "55% des projets", desc: "Cuisine rénovée avec matériaux en harmonie avec le bâti — chêne, pierre, zellige. Ouverture sur séjour fréquente. Chaque projet est unique et demande une approche personnalisée.", budget: "10 000–35 000€" },
              { icon: "🏠", type: "Maison années 80–90", part: "33% des projets", desc: "Rénovation complète ou semi-sur-mesure. Ouverture cuisine-séjour très demandée. Matériaux modernes — quartz, mélaminé mat, inox brossé. Bon rapport qualité-prix.", budget: "7 500–18 000€" },
              { icon: "🔄", type: "Rafraîchissement ciblé", part: "12% des projets", desc: "Remplacement façades, nouveau plan de travail, robinetterie design. La structure est conservée. Idéal avant mise en vente ou pour redonner du souffle à une cuisine fonctionnelle.", budget: "3 500–8 000€" },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 0 ? "border-[#4d7c0f] bg-[#f0fdf0]" : "border-[#c8d8c0] bg-[#f4f8f0]"}`}>
                <div className="mb-2 text-[38px]">{c.icon}</div>
                <div className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-[#4d7c0f]">{c.part}</div>
                <div className="mb-2 font-bold text-[#0f1f0a]">{c.type}</div>
                <p className="mb-3 text-[13px] leading-relaxed text-[#2a4a1a]">{c.desc}</p>
                <div className="flex justify-between border-t border-[#c8d8c0] pt-2 text-[13px]">
                  <span className="text-[#2a4a1a]">Budget</span>
                  <span className="font-bold text-[#4d7c0f]">{c.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0f1f0a] md:text-5xl" style={{ fontFamily: "serif" }}>Prix rénovation cuisine à Fontaine-lès-Dijon</h2>
          <p className="mb-10 max-w-[580px] text-[15px] text-[#2a4a1a]">Basé sur 28 projets documentés à Fontaine. Les prix reflètent la qualité des matériaux nobles utilisés.</p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Rénovation maison caractère 8m²", price: "10 000–22 000€", note: "Chêne · Pierre Bourgogne · Ouverture séjour" },
              { label: "Cuisine ouverte années 80–90", price: "7 500–16 000€", note: "Abattage cloison · Quartz · Électroménager" },
              { label: "Façades chêne massif", price: "3 500–7 500€", note: "Remplacement seul · Structure conservée" },
              { label: "Plan de travail pierre Bourgogne", price: "900–2 200€/ml", note: "Traitement hydrofuge inclus · Pose comprise" },
              { label: "Crédence zellige ou metro", price: "450–1 100€", note: "Pose artisanale · Joint coloré assorti" },
              { label: "Pose cuisine Schmidt/Arthur Bonnet", price: "900–2 800€", note: "Pose seule · Plomberie + électricité incluses" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8d8c0] bg-white p-5 transition hover:border-[#4d7c0f]">
                <div className="mb-1 text-[13px] font-semibold text-[#0f1f0a]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#4d7c0f]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#2a4a1a]">{r.note}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-5 text-xl font-bold text-[#0f1f0a]" style={{ fontFamily: "serif" }}>Matériaux cuisine — comparatif Fontaine 2026</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#c8d8c0]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0f1f0a] text-white">
                  {["Matière", "Prix /ml ou m²", "Durée de vie", "Valeur ajoutée"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["Stratifié standard", "40–80€/ml", "10–15 ans", "Neutre"],
                  ["Quartz (Silestone)", "150–280€/ml", "25–35 ans", "Bonne"],
                  ["Granit naturel", "180–320€/ml", "40+ ans", "Forte"],
                  ["Pierre de Bourgogne", "200–380€/ml", "Vie entière", "Très forte — signature"],
                  ["Chêne massif façades", "280–450€/m²", "30+ ans", "Excellente — caractère"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#f4f8f0]">
                    <td className="border-b border-[#c8d8c0] px-4 py-3 text-[13px] font-semibold text-[#0f1f0a]">{r[0]}</td>
                    <td className="border-b border-[#c8d8c0] px-4 py-3 text-[13px] text-[#2a4a1a]">{r[1]}</td>
                    <td className="border-b border-[#c8d8c0] px-4 py-3 text-[13px] text-[#2a4a1a]">{r[2]}</td>
                    <td className="border-b border-[#c8d8c0] px-4 py-3 text-[13px] font-bold text-[#4d7c0f]">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20" id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0f1f0a] md:text-5xl" style={{ fontFamily: "serif" }}>6 cuisinistes spécialisés près de chez vous à Fontaine-lès-Dijon</h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#2a4a1a]">Experts maisons de caractère, matériaux nobles et ouvertures cuisine-séjour. Chaque chantier est traité comme unique.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "JH", name: "Julien H.", enseigne: "Cuisine Fontaine Prestige", spec: "Maisons caractère · Chêne · Pierre · Ouverture", exp: "17 ans · 195 cuisines posées à Fontaine", zone: "Fontaine · Ahuy · Daix · Talant", note: "5.0/5", nb: "195 chantiers" },
              { initials: "LG", name: "Laure G.", enseigne: "Atelier Cuisine 21121", spec: "Semi-sur-mesure · Zellige · Matières naturelles", exp: "11 ans · Spécialiste cuisine ouverte maisons", zone: "Fontaine · Plombières · Dijon Nord", note: "4.9/5", nb: "142 chantiers" },
              { initials: "AP", name: "Adrien P.", enseigne: "Rénov Cuisine Fontaine", spec: "Rénovation complète · Tous budgets · Rapide", exp: "8 ans · Pose Schmidt, IKEA et sur mesure", zone: "Fontaine · Marsannay · Grand Dijon", note: "4.8/5", nb: "108 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8d8c0] bg-[#f4f8f0] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #0f1f0a, #365314)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#0f1f0a]">{a.name}</div>
                    <div className="text-[11px] text-[#4d7c0f]">{a.enseigne}</div>
                    <div className="text-[11px] text-[#4d7c0f]">{a.note} · {a.nb}</div>
                  </div>
                </div>
                <p className="mb-2 text-[13px] font-semibold text-[#0f1f0a]">{a.spec}</p>
                <p className="mb-1 text-[12px] text-[#2a4a1a]">📅 {a.exp}</p>
                <p className="mb-4 text-[12px] text-[#2a4a1a]">📍 {a.zone}</p>
                <a href="/publier-projet" className="block rounded-xl bg-[#4d7c0f] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#65a30d]">Demander un devis</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>Trois projets réels à Fontaine-lès-Dijon</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "PL", name: "Patricia L.", loc: "Fontaine · Maison 1968 · cuisine ouverte chêne", text: "Julien a abattu la cloison et installé une cuisine ouverte avec façades en chêne massif et plan de travail en granit noir. 19 500€. La pièce a changé de dimension. Trois agents immobiliers ont visité — ils estiment que ça a valorisé la maison de 25 000€." },
              { avatar: "FC", name: "François C.", loc: "Fontaine · Maison années 85 · semi-sur-mesure", text: "Laure a réalisé une cuisine semi-ouverte avec crédence en zellige vert et plan de travail pierre de Bourgogne. Elle a traité la pierre elle-même avec l'hydrofuge adapté. 14 800€. Mes invités demandent systématiquement le nom de l'artisan." },
              { avatar: "MB", name: "Martine B.", loc: "Fontaine · Maison · rafraîchissement avant vente", text: "Adrien a remplacé toutes les façades et posé un plan de travail quartz en 7 jours. 5 200€. L'agence immobilière a estimé +8 000€ sur le prix de vente. On a vendu en 12 jours après la mise en ligne." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8d8c0] bg-white p-6">
                <div className="mb-2 text-sm text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <p className="mb-5 text-[14px] italic leading-relaxed text-[#2a4a1a]">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg, #0f1f0a, #365314)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#0f1f0a]">{t.name}</div>
                    <div className="text-[12px] text-[#2a4a1a]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKING — AUTRES SERVICES FONTAINE */}
      <section className="bg-white px-8 py-14">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Autres services à Fontaine-lès-Dijon</div>
          <h2 className="mb-6 text-2xl font-bold text-[#0f1f0a]" style={{ fontFamily: "serif" }}>Tous nos artisans à Fontaine-lès-Dijon</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "🎨 Peinture Fontaine", href: "/devis-peinture-fontaine-les-dijon" },
              { label: "🔨 Rénovation Fontaine", href: "/devis-renovation-fontaine-les-dijon" },
              { label: "🚿 Salle de Bain Fontaine", href: "/devis-salle-de-bain-fontaine-les-dijon" },
              { label: "📋 Papier Peint Fontaine", href: "/devis-pose-papier-peint-fontaine-les-dijon" },
            ].map((l, i) => (
              <Link key={i} href={l.href} className="flex items-center gap-2 rounded-xl border border-[#c8d8c0] bg-[#f4f8f0] px-4 py-3 text-sm font-semibold text-[#0f1f0a] no-underline transition hover:border-[#4d7c0f] hover:bg-[#f0fdf0]">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKING — CUISINE AUTRES COMMUNES */}
      <section className="px-8 py-14" style={{ background: "#0f1f0a" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d9f99d]">Rénovation cuisine</div>
          <h2 className="mb-8 text-2xl font-bold text-white" style={{ fontFamily: "serif" }}>Cuisine dans les communes voisines</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Cuisine Dijon", href: "/devis-cuisine-dijon", nb: "34 cuisinistes", prix: "8 000–70 000€" },
              { name: "Cuisine Chenôve", href: "/devis-cuisine-chenove", nb: "14 cuisinistes", prix: "6 500–22 000€" },
              { name: "Cuisine Talant", href: "/devis-cuisine-talant", nb: "9 cuisinistes", prix: "7 000–28 000€" },
              { name: "Cuisine Longvic", href: "/devis-cuisine-longvic", nb: "10 cuisinistes", prix: "5 500–22 000€" },
              { name: "Cuisine Quetigny", href: "/devis-cuisine-quetigny", nb: "8 cuisinistes", prix: "4 000–60 000€" },
              { name: "Cuisine Ahuy", href: "#", nb: "3 cuisinistes", prix: "8 000–25 000€" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#a3e635] hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">{q.nb}</span>
                  <span className="font-bold text-[#d9f99d]">{q.prix}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation cuisine à Fontaine-lès-Dijon</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #0f1f0a 0%, #1a3d08 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#a3e635]">6 artisans spécialisés près de chez vous</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Publiez votre projet cuisine<br />et recevez des devis gratuits à Fontaine-lès-Dijon
          </h2>
          <p className="mb-10 text-[16px] text-white/60">6 cuisinistes spécialisés · Chêne & Pierre · Cuisine ouverte · Maisons de caractère · Réponse en 4–7h</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#4d7c0f] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(77,124,15,0.5)] transition hover:scale-105 hover:bg-[#65a30d]">
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
            { "@type": "ListItem", "position": 3, "name": "Cuisine Fontaine-lès-Dijon", "item": "https://premiumartisan.fr/devis-cuisine-fontaine-les-dijon" },
          ]},
          { "@type": "Service", "name": "Rénovation Cuisine Fontaine-lès-Dijon", "serviceType": "Rénovation Cuisine", "areaServed": { "@type": "City", "name": "Fontaine-lès-Dijon", "postalCode": "21121" }, "provider": { "@type": "LocalBusiness", "name": "PremiumArtisan" }, "priceRange": "3500-35000", "description": "Rénovation cuisine à Fontaine-lès-Dijon — maisons de caractère, chêne massif, pierre de Bourgogne. 6 artisans spécialisés, devis gratuit." },
          { "@type": "LocalBusiness", "name": "PremiumArtisan Cuisine Fontaine-lès-Dijon", "url": "https://premiumartisan.fr/devis-cuisine-fontaine-les-dijon", "areaServed": { "@type": "City", "name": "Fontaine-lès-Dijon", "postalCode": "21121" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "23" } },
          { "@type": "FAQPage", "mainEntity": FAQ_ITEMS.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
        ],
      })}} />
    </main>
  );
}
