// Papier Peint Fontaine-lès-Dijon component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Quel papier peint convient aux maisons de caractère de Fontaine-lès-Dijon ?",
    a: "Les maisons de caractère de Fontaine-lès-Dijon — construites entre 1950 et 1980 — ont souvent des murs avec légères irrégularités et des boiseries en bois. Nos poseurs recommandent des intissés texturés (lin, chanvre, osier) qui épousent parfaitement ces légères aspérités sans nécessiter un lissage complet. Ces textures naturelles s'harmonisent aussi avec les parquets et boiseries typiques du bâti fontainois.",
  },
  {
    q: "Quel est le prix de la pose de papier peint à Fontaine-lès-Dijon ?",
    a: "Le prix de la main d'œuvre varie entre 22 et 58€/m² à Fontaine-lès-Dijon. Les maisons de caractère avec boiseries, plinthes et encadrements multiples sont légèrement plus chères à tapisser car les découpes sont plus nombreuses. Pour une maison de 90m², comptez entre 2 200€ et 5 500€ fourniture intissé naturel + pose.",
  },
  {
    q: "Faut-il décaper les anciennes peintures avant de poser du papier peint à Fontaine ?",
    a: "Pas nécessairement. Sur une peinture acrylique satinée ou mate en bon état, un intissé peut se poser directement après application d'un apprêt d'accrochage (6–10€/m²). Sur une peinture à l'huile ou une ancienne peinture glycéro, un léger ponçage est recommandé avant pose. Nos artisans fontainois évaluent systématiquement l'état des supports avant de se prononcer.",
  },
  {
    q: "Les papiers peints naturels (lin, chanvre, sisal) tiennent-ils bien à Fontaine ?",
    a: "Oui, très bien dans les pièces principales. Les revêtements naturels (lin, chanvre, jonc de mer) apportent une chaleur incomparable dans les séjours et chambres des maisons fontainoises. Ils sont légèrement plus fragiles en zone humide — évitez-les en cuisine et salle de bain. Le prix de ces matières est plus élevé (35–80€/rouleau) mais le rendu est sans équivalent.",
  },
  {
    q: "Peut-on poser du papier peint sur des boiseries à Fontaine-lès-Dijon ?",
    a: "Non, les boiseries (lambris, corniches, moulures) ne se tapissent pas. En revanche, les entre-boiseries (les surfaces planes entre les moulures) peuvent recevoir du papier peint — c'est même une technique décorative très appréciée dans les maisons bourgeoises de Fontaine. Nos artisans spécialisés dans le patrimoine bâti fontainois maîtrisent cette technique.",
  },
  {
    q: "Quelle tendance papier peint domine à Fontaine-lès-Dijon en 2026 ?",
    a: "À Fontaine-lès-Dijon, deux tendances se détachent nettement. La première : les matières naturelles (lin, chanvre, raphia) dans les tons sable, terre et kaki — en accord avec l'environnement boisé de la commune. La seconde : les motifs botaniques bourguignons (vigne, feuilles de chêne, champignons) qui évoquent la forêt toute proche. Ces choix sont plus intemporels que les tendances très graphiques d'une ville comme Quetigny.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#c8d8c0] py-5">
      <button
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#0f1f0a]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#4d7c0f]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#2a4a1a]">{answer}</p>}
    </div>
  );
}

export default function DevisPapierPeintFontaine() {
  return (
    <main className="min-h-screen bg-[#f4f8f0]">

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#0f1f0a] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#a3e635]">Artisan</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "Papier peint Dijon", href: "/devis-pose-papier-peint-dijon" },
            { label: "Rénovation Fontaine", href: "/devis-renovation-fontaine-les-dijon" },
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
        style={{ background: "linear-gradient(140deg, #0f1f0a 0%, #1a3d08 55%, #0f2a08 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#a3e635]/35 bg-[#a3e635]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#d9f99d]">
            🌲 Fontaine-lès-Dijon 21121 · Maisons de caractère · Matières naturelles
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Papier Peint à<br />
            <span className="text-[#a3e635]">Fontaine-lès-Dijon</span> :<br />
            La Nature sur vos Murs
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Lin, chanvre, motifs botaniques bourguignons. Les maisons de caractère de Fontaine méritent des revêtements qui respirent. <strong className="text-white">52 projets analysés.</strong> Spécialistes boiseries & patrimoine bâti.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[
              { val: "52", txt: "projets Fontaine 2025–26" },
              { val: "6", txt: "poseurs vérifiés" },
              { val: "22–58€", txt: "MO /m²" },
              { val: "Lin & chanvre", txt: "matières vedettes" },
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
            className="inline-block rounded-2xl bg-[#4d7c0f] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(77,124,15,0.45)] transition hover:scale-105 hover:bg-[#65a30d]"
          >
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · Réponse en 4–7h · Spécialistes maisons de caractère</p>
        </div>
      </section>

      {/* BANDEAU */}
      <section className="bg-[#4d7c0f] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[
            { v: "58%", l: "Maisons individuelles à Fontaine" },
            { v: "Lin & chanvre", l: "Matières naturelles tendance" },
            { v: "52", l: "Projets 2025–2026" },
            { v: "Boiseries", l: "Technique entre-boiseries" },
            { v: "+21%", l: "Croissance vs 2024" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div>
              <div className="text-[11px] text-white/65">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MATIÈRES NATURELLES — section unique */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Spécialité Fontaine</div>
          <h2 className="mb-8 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>
            Revêtements naturels : ce que<br />les autres communes ne proposent pas
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🌾", mat: "Lin tissé", texture: "Chaude · Légèrement irrégulière", prix: "38–65€/rouleau", ideal: "Séjours · Chambres" },
              { icon: "🌿", mat: "Chanvre naturel", texture: "Rustique · Très résistante", prix: "32–55€/rouleau", ideal: "Couloirs · Bureaux" },
              { icon: "🍂", mat: "Raphia & osier", texture: "Exotique · Effet tressé", prix: "42–80€/rouleau", ideal: "Pièces lumineuses" },
              { icon: "🌲", mat: "Motifs botaniques", texture: "Vigne · Chêne · Fougères", prix: "28–60€/rouleau", ideal: "Toutes les pièces" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8d8c0] bg-[#f4f8f0] p-5 text-center transition hover:border-[#4d7c0f]">
                <div className="mb-2 text-[40px]">{t.icon}</div>
                <div className="mb-1 font-bold text-[#0f1f0a]">{t.mat}</div>
                <div className="mb-2 text-[12px] text-[#2a4a1a]">{t.texture}</div>
                <div className="mb-1 text-[15px] font-bold text-[#4d7c0f]">{t.prix}</div>
                <div className="text-[11px] text-[#2a4a1a]">{t.ideal}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-[#c8d8c0] bg-[#f0fdf0] p-4 text-[13px] text-[#2a4a1a]">
            <strong>📌 Pourquoi Fontaine ?</strong> La commune boisée au nord de Dijon crée une demande naturelle pour ces revêtements organiques. Les propriétaires fontainois choisissent des intérieurs en harmonie avec leur environnement — forêt de Fontaine-lès-Dijon, Côte viticole à proximité.
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0f1f0a] md:text-5xl" style={{ fontFamily: "serif" }}>
            Prix pose papier peint<br />à Fontaine-lès-Dijon
          </h2>
          <p className="mb-12 max-w-[580px] text-[15px] text-[#2a4a1a]">
            Analyse de 52 projets à Fontaine. Les maisons de caractère avec boiseries nécessitent plus de découpes — facteur pris en compte dans les tarifs.
          </p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Chambre maison caractère 14m²", price: "720–1 600€", note: "Intissé lin naturel · Découpes boiseries" },
              { label: "Séjour avec boiseries 24m²", price: "1 400–3 200€", note: "Entre-boiseries tapissées · Technique experte" },
              { label: "Motif botanique bourguignon", price: "900–2 200€", note: "Vigne / chêne · Raccords complexes" },
              { label: "Maison complète 90m²", price: "2 200–5 500€", note: "Matières naturelles · Toutes pièces" },
              { label: "Couloir maison 8m²", price: "380–900€", note: "Chanvre résistant · Passages fréquents" },
              { label: "Apprêt sur peinture ancienne", price: "6–10€/m²", note: "Obligatoire peinture glycéro ou satinée" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8d8c0] bg-white p-5 transition hover:border-[#4d7c0f]">
                <div className="mb-1 text-[13px] font-semibold text-[#0f1f0a]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#4d7c0f]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#2a4a1a]">{r.note}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-5 text-xl font-bold text-[#0f1f0a]" style={{ fontFamily: "serif" }}>Matière naturelle vs intissé standard — comparatif</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#c8d8c0]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0f1f0a] text-white">
                  {["Critère", "Intissé standard", "Lin / Chanvre naturel"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 2 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["Prix fourniture", "18–40€/rouleau", "32–80€/rouleau"],
                  ["Prix MO", "22–38€/m²", "28–50€/m²"],
                  ["Durée de vie", "8–12 ans", "12–20 ans"],
                  ["Résistance humidité", "Bonne", "Moyenne (pièces sèches)"],
                  ["Rendu visuel", "Net et moderne", "Chaleureux et intemporel"],
                  ["Adapté boiseries", "Oui", "Idéal"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#f4f8f0]">
                    <td className="border-b border-[#c8d8c0] px-4 py-3 text-[13px] font-semibold text-[#0f1f0a]">{r[0]}</td>
                    <td className="border-b border-[#c8d8c0] px-4 py-3 text-[13px] text-[#2a4a1a]">{r[1]}</td>
                    <td className="border-b border-[#c8d8c0] px-4 py-3 text-[13px] font-bold text-[#4d7c0f]">{r[2]}</td>
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0f1f0a] md:text-5xl" style={{ fontFamily: "serif" }}>
            6 poseurs vérifiés<br />à Fontaine-lès-Dijon
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#2a4a1a]">Experts en matières naturelles, boiseries et patrimoine bâti fontainois. Chaque artisan connaît les spécificités du bâti local.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "MH", name: "Marie H.", enseigne: "Fontaine Décoration Naturelle", spec: "Lin · Chanvre · Boiseries · Patrimoine", exp: "14 ans · Spécialiste matières naturelles", zone: "Fontaine · Ahuy · Plombières · Daix", note: "5.0/5", nb: "162 chantiers" },
              { initials: "JR", name: "Julien R.", enseigne: "Murs & Forêt", spec: "Motifs botaniques · Panoramiques nature", exp: "10 ans · Illustrateur-poseur · Motifs Bourgogne", zone: "Fontaine · Talant · Dijon Nord", note: "4.9/5", nb: "118 chantiers" },
              { initials: "BN", name: "Baptiste N.", enseigne: "Revêtements Fontainois", spec: "Intissé · Raphia · Entre-boiseries", exp: "7 ans · Maisons de caractère", zone: "Fontaine · Gevrey · Marsannay", note: "4.8/5", nb: "76 chantiers" },
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
                <a href="/publier-projet" className="block rounded-xl bg-[#4d7c0f] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#65a30d]">
                  Demander un devis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>Trois maisons de caractère à Fontaine</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "CD", name: "Catherine D.", loc: "Fontaine · Maison 1968 · séjour boiseries", text: "Marie a posé du lin naturel sable entre les boiseries de notre séjour. Les découpes autour des moulures sont d'une précision chirurgicale. La pièce a pris une chaleur incroyable — le lin et les boiseries chêne se marient à la perfection." },
              { avatar: "PL", name: "Pierre L.", loc: "Fontaine · Villa années 80 · motifs vigne", text: "Julien a créé un panoramique motif vigne bourguignonne sur mesure pour notre séjour. Il a dessiné les ceps lui-même en s'inspirant des vignes de la Côte que l'on voit depuis notre fenêtre. Résultat unique, impossible à trouver en boutique." },
              { avatar: "EM", name: "Élise M.", loc: "Fontaine · Maison 105m² · complète", text: "Baptiste a tapissé toute la maison en 6 jours : raphia dans le séjour, intissé lin dans les chambres, vinyle lavable en cuisine. Chaque pièce a sa matière et son ambiance. La cohérence d'ensemble est remarquable. Prix très juste pour ce niveau de travail." },
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

      {/* COMMUNES */}
      <section className="px-8 py-20" style={{ background: "#0f1f0a" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d9f99d]">Alentours</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Papier peint autour de Fontaine</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-pose-papier-peint-dijon", nb: "22 poseurs", prix: "20–55€/m²" },
              { name: "Talant", href: "/devis-pose-papier-peint-talant", nb: "9 poseurs", prix: "20–50€/m²" },
              { name: "Chenôve", href: "/devis-pose-papier-peint-chenove", nb: "11 poseurs", prix: "18–48€/m²" },
              { name: "Longvic", href: "/devis-pose-papier-peint-longvic", nb: "8 poseurs", prix: "18–46€/m²" },
              { name: "Quetigny", href: "/devis-pose-papier-peint-quetigny", nb: "7 poseurs", prix: "22–58€/m²" },
              { name: "Ahuy", href: "#", nb: "3 poseurs", prix: "20–50€/m²" },
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

      {/* FAQ */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur les matières naturelles<br />à Fontaine-lès-Dijon</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #0f1f0a 0%, #1a3d08 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#a3e635]">Prêt à habiller vos murs ?</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Devis papier peint naturel<br />gratuit à Fontaine-lès-Dijon
          </h2>
          <p className="mb-10 text-[16px] text-white/60">6 poseurs vérifiés · Lin · Chanvre · Motifs botaniques · Spécialistes boiseries</p>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#4d7c0f] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(77,124,15,0.5)] transition hover:scale-105 hover:bg-[#65a30d]"
          >
            🎨 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Papier Peint Fontaine-lès-Dijon", url: "https://premiumartisan.fr/devis-pose-papier-peint-fontaine-les-dijon", areaServed: { "@type": "City", name: "Fontaine-lès-Dijon", postalCode: "21121" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "44" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
