// Papier Peint Quetigny component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Quels papiers peints haut de gamme sont disponibles à Quetigny ?",
    a: "Les propriétaires de Quetigny optent de plus en plus pour des collections premium : Graham & Brown, Élitis, Cole & Son, Arte International. Nos poseurs partenaires peuvent commander ces références pour vous. Les prix de fourniture vont de 45 à 180€/rouleau pour ces collections. La pose de ces papiers exige une main d'œuvre expérimentée car les raccords sont plus complexes et les matériaux moins indulgents.",
  },
  {
    q: "Quel est le prix de la pose de papier peint à Quetigny en 2026 ?",
    a: "À Quetigny, le marché est orienté haut de gamme. La main d'œuvre varie entre 22 et 58€/m² selon la complexité du papier peint. Pour les collections premium avec raccords complexes, comptez 35 à 58€/m². Pour un salon de 28m² tapissé avec une collection designer + paroi panoramique, le budget total (fourniture + pose) se situe entre 2 800€ et 6 500€.",
  },
  {
    q: "Le papier peint panoramique est-il adapté aux maisons de Quetigny ?",
    a: "Oui, c'est la tendance forte à Quetigny en 2026. Les séjours des maisons récentes (post-1990) avec leurs grandes parois lisses se prêtent parfaitement aux formats panoramiques sur mesure. Nos poseurs travaillent avec des formats jusqu'à 5 mètres de large. Les motifs les plus demandés à Quetigny : marbre abstrait, végétal tropical, architectural géométrique.",
  },
  {
    q: "Comment choisir entre papier peint et peinture à effet dans une maison de Quetigny ?",
    a: "Pour les maisons récentes de Quetigny aux murs lisses, la peinture à effet (béton ciré, stuc) et le papier peint premium offrent un résultat visuel comparable. Le papier peint est souvent plus rapide à poser (1–2 jours vs 3–4 pour un stuc) et propose une variété de motifs infinie. La peinture à effet dure plus longtemps sans entretien. Nos artisans vous conseillent selon votre projet spécifique.",
  },
  {
    q: "Peut-on combiner papier peint et peinture dans une même pièce à Quetigny ?",
    a: "Oui, c'est même très tendance. La technique du mur d'accent consiste à tapisser une seule paroi (la principale, souvent derrière la tête de lit ou le canapé) et peindre les trois autres en couleur assortie. Cette technique permet de créer un effet spectaculaire sans le coût d'une tapisserie complète. Nos artisans de Quetigny maîtrisent parfaitement cette association.",
  },
  {
    q: "Combien de temps pour tapisser une villa à Quetigny ?",
    a: "Pour une villa de 110m² à Quetigny avec des papiers haut de gamme à raccords complexes, comptez 5 à 8 jours. La préparation des supports (bouchage, lissage des murs récents) prend en général 1 journée. La pose proprement dite, avec soin des raccords et finitions, prend 4 à 7 jours selon le nombre de pièces et la complexité des motifs choisis.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8d0dc] py-5">
      <button
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#1f0a14]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#be185d]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#5a1a3a]">{answer}</p>}
    </div>
  );
}

export default function DevisPapierPeintQuetigny() {
  return (
    <main className="min-h-screen bg-[#fdf4f8]">

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#1f0a14] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#f472b6]">Artisan</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "Papier peint Dijon", href: "/devis-pose-papier-peint-dijon" },
            { label: "Rénovation Quetigny", href: "/devis-renovation-quetigny" },
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
        style={{ background: "linear-gradient(140deg, #1f0a14 0%, #4a0a28 55%, #2a0a1c 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(244,114,182,0.15) 0%, transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f472b6]/35 bg-[#f472b6]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#fbcfe8]">
            💎 Quetigny 21800 · Collections premium · Panoramiques sur mesure
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Papier Peint à Quetigny :<br />
            <span className="text-[#f472b6]">Du Sol au Plafond,</span><br />
            Sans Compromis
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Collections Graham & Brown, Élitis, panoramiques sur mesure jusqu'à 5m. Les poseurs de Quetigny maîtrisent les raccords complexes et les matériaux haut de gamme. <strong className="text-white">67 projets analysés.</strong>
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[
              { val: "67", txt: "projets Quetigny 2025–26" },
              { val: "7", txt: "poseurs spécialisés" },
              { val: "22–58€", txt: "MO /m²" },
              { val: "5m", txt: "panoramiques sur mesure" },
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
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · Réponse en 3–5h · Spécialistes collections premium</p>
        </div>
      </section>

      {/* BANDEAU */}
      <section className="bg-[#be185d] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[
            { v: "Graham & Brown", l: "Collection disponible" },
            { v: "Élitis · Cole & Son", l: "Collections luxe" },
            { v: "45–180€", l: "Fourniture premium /rouleau" },
            { v: "5m×", l: "Panoramiques sur mesure" },
            { v: "28%", l: "Part panoramiques à Quetigny" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div>
              <div className="text-[11px] text-white/65">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TENDANCES 2026 — unique à Quetigny */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Tendances Quetigny 2026</div>
          <h2 className="mb-8 text-3xl font-bold text-[#1f0a14] md:text-4xl" style={{ fontFamily: "serif" }}>
            Ce que tapissent les maisons<br />de Quetigny cette année
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🌿", label: "Végétal tropical", part: "34%", detail: "Motifs botaniques grand format · Séjours et chambres" },
              { icon: "🏛️", label: "Marbre & minéral", part: "26%", detail: "Effets pierre et marbre · Salles de bain & entrées" },
              { icon: "📐", label: "Géométrique luxe", part: "22%", detail: "Motifs graphiques gold & noir · Bureaux & couloirs" },
              { icon: "🖼️", label: "Panoramique mural", part: "18%", detail: "Format sur mesure · Une paroi entière · Effet galerie" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0dc] bg-[#fdf4f8] p-5 text-center">
                <div className="mb-2 text-[40px]">{t.icon}</div>
                <div className="mb-1 text-[22px] font-bold text-[#be185d]" style={{ fontFamily: "serif" }}>{t.part}</div>
                <div className="mb-2 font-bold text-[#1f0a14]">{t.label}</div>
                <p className="text-[12px] text-[#5a1a3a]">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNIQUE MUR D'ACCENT */}
      <section className="px-8 py-16" style={{ background: "#fdf4f8" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Technique tendance</div>
          <h2 className="mb-6 text-3xl font-bold text-[#1f0a14] md:text-4xl" style={{ fontFamily: "serif" }}>
            Le mur d'accent : 1 paroi tapissée,<br />3 peintes — l'équation gagnante
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#be185d] bg-white p-6">
              <div className="mb-4 text-[32px]">🖼️</div>
              <h3 className="mb-3 text-lg font-bold text-[#1f0a14]">Comment ça marche</h3>
              <p className="text-[14px] leading-relaxed text-[#5a1a3a]">Une seule paroi est tapissée avec un papier premium (panoramique, motif fort, texture luxe). Les trois autres parois sont peintes dans une teinte issue de la palette du papier. Résultat : l'œil est attiré par le mur tapissé, la pièce paraît plus grande et le budget reste maîtrisé.</p>
            </div>
            <div className="rounded-2xl border-[1.5px] border-[#e8d0dc] bg-white p-6">
              <div className="mb-4 text-[32px]">💰</div>
              <h3 className="mb-3 text-lg font-bold text-[#1f0a14]">Budget mur d'accent à Quetigny</h3>
              <div className="space-y-2 text-[13px]">
                {[
                  { k: "1 paroi panoramique 12m²", v: "580–1 400€" },
                  { k: "3 parois peintes (même pièce)", v: "380–680€" },
                  { k: "Total séjour 28m²", v: "960–2 080€" },
                  { k: "vs tapisserie complète", v: "2 200–5 000€" },
                  { k: "Économie réalisée", v: "−55% en moyenne" },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between border-b border-[#e8d0dc] py-1.5 last:border-0">
                    <span className="text-[#5a1a3a]">{r.k}</span>
                    <span className="font-bold text-[#be185d]">{r.v}</span>
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f0a14] md:text-5xl" style={{ fontFamily: "serif" }}>
            Prix pose papier peint<br />à Quetigny
          </h2>
          <p className="mb-12 max-w-[580px] text-[15px] text-[#5a1a3a]">
            Analyse de 67 projets à Quetigny. Le marché est orienté premium — les prix de main d'œuvre reflètent la complexité des matériaux utilisés.
          </p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Intissé standard — chambre 14m²", price: "700–1 500€", note: "Motif simple · Fourniture + pose" },
              { label: "Collection premium — séjour 28m²", price: "1 800–4 500€", note: "Graham & Brown / Élitis · Raccords complexes" },
              { label: "Panoramique sur mesure", price: "580–1 800€", note: "Jusqu'à 5m de large · Pose technique" },
              { label: "Mur d'accent complet", price: "960–2 100€", note: "1 paroi tapissée + 3 peintes · Même pièce" },
              { label: "Suite parentale 20m²", price: "1 200–3 200€", note: "Tête de lit tapissée + murs assortis" },
              { label: "Villa complète 110m²", price: "4 500–12 000€", note: "Collections variées · Toutes pièces" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0dc] bg-[#fdf4f8] p-5 transition hover:border-[#be185d]">
                <div className="mb-1 text-[13px] font-semibold text-[#1f0a14]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#be185d]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#5a1a3a]">{r.note}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-5 text-xl font-bold text-[#1f0a14]" style={{ fontFamily: "serif" }}>MO selon complexité du papier</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e8d0dc]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1f0a14] text-white">
                  {["Type de papier", "MO /m²", "Difficulté", "Délai 100m²"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["Intissé uni / texture simple", "22–32€/m²", "⭐", "3–4 j."],
                  ["Intissé motif raccord simple", "28–38€/m²", "⭐⭐", "4–5 j."],
                  ["Collection premium raccord complexe", "35–50€/m²", "⭐⭐⭐", "5–7 j."],
                  ["Panoramique sur mesure", "40–58€/m²", "⭐⭐⭐⭐", "1–2 j./paroi"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#fdf4f8]">
                    {r.map((cell, j) => (
                      <td key={j} className={`border-b border-[#e8d0dc] px-4 py-3.5 text-sm ${j === 1 ? "font-bold text-[#be185d]" : "text-[#1f0a14]"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ARTISANS */}
      <section className="px-8 py-20" style={{ background: "#fdf4f8" }} id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f0a14] md:text-5xl" style={{ fontFamily: "serif" }}>
            7 poseurs premium<br />à Quetigny
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#5a1a3a]">Sélectionnés pour leur maîtrise des collections luxe, raccords complexes et panoramiques sur mesure.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "CB", name: "Clothilde B.", enseigne: "Quetigny Décoration Premium", spec: "Collections luxe · Panoramiques · Raccords", exp: "17 ans · Certifiée Graham & Brown", zone: "Quetigny · Dijon Est · Saint-Apollinaire", note: "5.0/5", nb: "198 chantiers" },
              { initials: "NG", name: "Nicolas G.", enseigne: "Art Mural Bourgogne", spec: "Panoramiques sur mesure · Mur d'accent", exp: "12 ans · Spécialiste grands formats", zone: "Quetigny · Chevigny · Grand Dijon", note: "4.9/5", nb: "143 chantiers" },
              { initials: "SF", name: "Sandra F.", enseigne: "Pose & Style 21", spec: "Intissé premium · SDB · Cuisine design", exp: "8 ans · Finitions millimétriques", zone: "Quetigny · Longvic · Dijon", note: "4.9/5", nb: "94 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0dc] bg-white p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #1f0a14, #831843)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#1f0a14]">{a.name}</div>
                    <div className="text-[11px] text-[#be185d]">{a.enseigne}</div>
                    <div className="text-[11px] text-[#be185d]">{a.note} · {a.nb}</div>
                  </div>
                </div>
                <p className="mb-2 text-[13px] font-semibold text-[#1f0a14]">{a.spec}</p>
                <p className="mb-1 text-[12px] text-[#5a1a3a]">📅 {a.exp}</p>
                <p className="mb-4 text-[12px] text-[#5a1a3a]">📍 {a.zone}</p>
                <a href="/publier-projet" className="block rounded-xl bg-[#be185d] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#db2777]">
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#1f0a14] md:text-4xl" style={{ fontFamily: "serif" }}>Trois projets premium à Quetigny</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "IR", name: "Isabelle R.", loc: "Quetigny · Villa 118m² · collection Élitis", text: "Clothilde a posé une collection Élitis dans tout le séjour et un panoramique végétal dans la chambre principale. Elle a géré les raccords complexes avec une précision que je n'avais jamais vue. Ma villa ressemble maintenant à une photo de magazine." },
              { avatar: "TD", name: "Thomas D.", loc: "Quetigny · Mur d'accent séjour 32m²", text: "Nicolas a posé un panoramique architectural gris anthracite sur la paroi derrière le canapé. Les trois autres murs ont été peints en gris clair assorti. Résultat spectaculaire pour 1 350€. Tous mes invités pensent que j'ai fait refaire entièrement le séjour." },
              { avatar: "AG", name: "Aurélie G.", loc: "Quetigny · Suite parentale · tête de lit", text: "Sandra a tapissé la paroi derrière la tête de lit avec un intissé botanique Cole & Son. Travail d'une précision absolue — les raccords du motif complexe sont invisibles. J'ai commandé la même chose pour la chambre d'amis immédiatement après." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0dc] bg-[#fdf4f8] p-6">
                <div className="mb-2 text-sm text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <p className="mb-5 text-[14px] italic leading-relaxed text-[#5a1a3a]">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg, #1f0a14, #831843)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#1f0a14]">{t.name}</div>
                    <div className="text-[12px] text-[#5a1a3a]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNES */}
      <section className="px-8 py-20" style={{ background: "#1f0a14" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#fbcfe8]">Alentours</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Papier peint autour de Quetigny</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-pose-papier-peint-dijon", nb: "22 poseurs", prix: "20–55€/m²" },
              { name: "Chenôve", href: "/devis-pose-papier-peint-chenove", nb: "11 poseurs", prix: "18–48€/m²" },
              { name: "Talant", href: "/devis-pose-papier-peint-talant", nb: "9 poseurs", prix: "20–50€/m²" },
              { name: "Longvic", href: "/devis-pose-papier-peint-longvic", nb: "8 poseurs", prix: "18–46€/m²" },
              { name: "Fontaine-lès-Dijon", href: "/devis-pose-papier-peint-fontaine-les-dijon", nb: "4 poseurs", prix: "22–58€/m²" },
              { name: "Saint-Apollinaire", href: "#", nb: "3 poseurs", prix: "22–54€/m²" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#f472b6] hover:bg-white/10">
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

      {/* FAQ */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#be185d]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#1f0a14] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur le papier peint<br />premium à Quetigny</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #1f0a14 0%, #4a0a28 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#f472b6]">Prêt à sublimer votre intérieur ?</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Devis papier peint premium<br />gratuit à Quetigny
          </h2>
          <p className="mb-10 text-[16px] text-white/60">7 poseurs spécialisés · Collections Élitis, Graham & Brown · Panoramiques sur mesure · Sans engagement</p>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#be185d] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(190,24,93,0.5)] transition hover:scale-105 hover:bg-[#db2777]"
          >
            🎨 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Papier Peint Quetigny", url: "https://premiumartisan.fr/devis-pose-papier-peint-quetigny", areaServed: { "@type": "City", name: "Quetigny", postalCode: "21800" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "54" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
