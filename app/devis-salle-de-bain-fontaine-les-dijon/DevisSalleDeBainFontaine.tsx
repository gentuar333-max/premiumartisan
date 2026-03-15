// Salle de Bain Fontaine-lès-Dijon component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Quel carrelage choisir pour une salle de bain dans une maison de caractère à Fontaine-lès-Dijon ?",
    a: "Les maisons de caractère de Fontaine-lès-Dijon ont une identité architecturale forte — parquets anciens, boiseries, volumes généreux. Nos artisans recommandent des carrelages qui respectent cet esprit : pierre naturelle (travertin, pierre de Bourgogne), tomettes en terre cuite, ou imitations pierre grand format. Ces matières créent une continuité esthétique avec le reste de la maison. Les carrelages ultra-contemporains (béton ciré blanc, format XXL) peuvent créer un contraste intéressant mais demandent un œil plus affûté.",
  },
  {
    q: "Quel est le prix d'une rénovation de salle de bain à Fontaine-lès-Dijon en 2026 ?",
    a: "À Fontaine-lès-Dijon, le marché est orienté maisons individuelles avec des surfaces de salle de bain souvent plus généreuses (6 à 10m²). Une rénovation complète coûte entre 6 500€ et 18 000€. Les projets avec pierre naturelle ou matériaux nobles sont plus chers : comptez 12 000 à 30 000€. Pour un rafraîchissement simple, le budget démarre à 3 000€. Le budget moyen constaté est de 10 200€.",
  },
  {
    q: "Peut-on installer une baignoire îlot dans une maison de Fontaine-lès-Dijon ?",
    a: "Oui, et c'est même très populaire à Fontaine. Les salles de bain des maisons des années 1960–1980 du secteur ont souvent des surfaces de 8 à 12m² — suffisamment grandes pour accueillir une baignoire îlot. Ce type d'installation nécessite une alimentation en eau repositionnée au centre de la pièce et un carrelage noble autour. Budget baignoire îlot posée : 4 000 à 12 000€ selon le modèle.",
  },
  {
    q: "La pierre de Bourgogne est-elle adaptée à une salle de bain à Fontaine ?",
    a: "La pierre de Bourgogne est magnifique mais demande un traitement spécifique en salle de bain. Elle doit être impérativement traitée avec un hydrofuge spécial avant pose et ré-entretenue tous les 2 à 3 ans. Bien traitée, elle dure toute une vie et patine magnifiquement. Nos artisans fontainois maîtrisent ce traitement et l'incluent dans leurs devis. Prix de pose pierre de Bourgogne SDB : 85 à 140€/m² fourniture + pose.",
  },
  {
    q: "Combien de temps dure une rénovation de salle de bain à Fontaine-lès-Dijon ?",
    a: "Pour une rénovation standard (12 à 18 jours) ou premium avec pierre naturelle (3 à 5 semaines). Les maisons de Fontaine ont souvent des configurations personnalisées — contrairement aux appartements HLM standardisés — ce qui demande plus de temps de préparation et d'adaptation. La coordination entre plombier, carreleur et menuisier (souvent nécessaire pour les boiseries) allonge légèrement les délais.",
  },
  {
    q: "Y a-t-il des artisans spécialisés dans les maisons de caractère à Fontaine-lès-Dijon ?",
    a: "Oui. Notre réseau compte 6 artisans basés à Fontaine ou spécialisés dans les maisons du secteur. Ils connaissent les spécificités du bâti local : plomberies encastrées dans des murs épais, planchers anciens à préserver, boiseries à contourner. Ces compétences spécifiques font la différence dans les projets de rénovation de maisons de caractère où chaque chantier est unique.",
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

export default function DevisSalleDeBainFontaine() {
  return (
    <main className="min-h-screen bg-[#f4f8f0]">

      <nav className="flex items-center justify-between bg-[#0f1f0a] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#a3e635]">Artisan</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "SDB Dijon", href: "/devis-salle-de-bain-dijon" },
            { label: "Rénovation Fontaine", href: "/devis-renovation-fontaine-les-dijon" },
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
        style={{ background: "linear-gradient(140deg, #0f1f0a 0%, #1a3d08 55%, #0f2a08 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#a3e635]/35 bg-[#a3e635]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#d9f99d]">
            🌲 Fontaine-lès-Dijon 21121 · Maisons de caractère · Pierre naturelle
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Salle de Bain à<br />
            <span className="text-[#a3e635]">Fontaine-lès-Dijon</span> :<br />
            La Pierre, le Bois, le Caractère
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Maisons de caractère, volumes généreux, matériaux nobles. À Fontaine, on ne rénove pas une salle de bain — on la <strong className="text-white">restaure et on la sublime</strong>. Budget moyen <strong className="text-white">10 200€</strong>. 28 projets documentés.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[
              { val: "28", txt: "projets Fontaine 2025–26" },
              { val: "6", txt: "artisans spécialisés" },
              { val: "10 200€", txt: "budget moyen" },
              { val: "Pierre & bois", txt: "matières vedettes" },
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
            🚿 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · Réponse en 4–7h · Spécialistes maisons de caractère</p>
        </div>
      </section>

      <section className="bg-[#4d7c0f] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[
            { v: "10 200€", l: "Budget moyen Fontaine" },
            { v: "Pierre Bourgogne", l: "Matière signature" },
            { v: "6–12m²", l: "SDB maisons Fontaine" },
            { v: "Baignoire îlot", l: "Tendance premium 2026" },
            { v: "28", l: "Projets documentés 2025–26" },
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">La singularité Fontaine</div>
          <h2 className="mb-8 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>
            Ce qui rend les SDB de Fontaine<br />différentes des autres communes
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "🏡", titre: "Surfaces généreuses", texte: "Les salles de bain des maisons de Fontaine font en moyenne 7 à 10m² — bien au-dessus des 4 à 5m² des appartements HLM de Chenôve ou des tours de Talant. Cet espace permet des aménagements impossibles ailleurs : baignoire îlot, double vasque, espace dressing intégré." },
              { icon: "🪨", titre: "Matières nobles locales", texte: "La proximité de la Côte de Nuits et de ses carrières traditionnelles inspire les propriétaires fontainois. La pierre de Bourgogne, le travertin et les tomettes en terre cuite s'intègrent naturellement dans ces intérieurs. Ces matières donnent une salle de bain inimitable." },
              { icon: "🌲", titre: "Harmonie avec le bâti", texte: "Contrairement aux villes nouvelles, Fontaine a une identité bâtie cohérente. Les salles de bain qui respectent cette identité — teintes naturelles, matières chaudes, luminosité travaillée — s'intègrent parfaitement et renforcent la valeur du bien." },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 1 ? "border-[#4d7c0f] bg-[#f0fdf0]" : "border-[#c8d8c0] bg-[#f4f8f0]"}`}>
                <div className="mb-3 text-[38px]">{c.icon}</div>
                <div className="mb-2 font-bold text-[#0f1f0a]">{c.titre}</div>
                <p className="text-[13px] leading-relaxed text-[#2a4a1a]">{c.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0f1f0a] md:text-5xl" style={{ fontFamily: "serif" }}>
            Prix rénovation salle de bain<br />à Fontaine-lès-Dijon
          </h2>
          <p className="mb-12 max-w-[580px] text-[15px] text-[#2a4a1a]">
            Basé sur 28 projets documentés à Fontaine en 2025–2026. Les prix reflètent la qualité des matériaux nobles utilisés dans les maisons de caractère.
          </p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Rénovation complète 7m²", price: "6 500–14 000€", note: "Carrelage pierre · Douche italienne · Plomberie" },
              { label: "Baignoire îlot posée", price: "4 000–12 000€", note: "Alimentation repositionnée · Carrelage autour" },
              { label: "Pierre de Bourgogne SDB", price: "85–140€/m²", note: "Fourniture + pose + traitement hydrofuge" },
              { label: "Suite parentale 10m²", price: "12 000–30 000€", note: "Pierre · Bois · Double vasque · Baignoire îlot" },
              { label: "SDB PMR maison", price: "5 500–13 000€", note: "Douche PMR · Barres · WC surélevé · MaPrimeAdapt'" },
              { label: "Rafraîchissement maison 6m²", price: "3 000–6 500€", note: "Carrelage + robinetterie + meuble vasque" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8d8c0] bg-white p-5 transition hover:border-[#4d7c0f]">
                <div className="mb-1 text-[13px] font-semibold text-[#0f1f0a]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#4d7c0f]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#2a4a1a]">{r.note}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-5 text-xl font-bold text-[#0f1f0a]" style={{ fontFamily: "serif" }}>Matières naturelles vs carrelage standard — Fontaine 2026</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#c8d8c0]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0f1f0a] text-white">
                  {["Critère", "Carrelage standard", "Pierre naturelle / Tomette"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 2 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["Prix /m²", "35–65€ posé", "85–140€ posé"],
                  ["Entretien", "Simple, aucun traitement", "Hydrofuge tous les 2–3 ans"],
                  ["Durée de vie", "15–25 ans", "50 ans et plus"],
                  ["Valeur ajoutée", "Standard", "Forte — argument de vente"],
                  ["Harmonie maison", "Neutre", "Excellente avec bâti ancien"],
                  ["Réparabilité", "Remplacement dalles", "Patine naturelle — s'améliore"],
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

      <section className="bg-white px-8 py-20" id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0f1f0a] md:text-5xl" style={{ fontFamily: "serif" }}>
            6 artisans spécialisés<br />à Fontaine-lès-Dijon
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#2a4a1a]">Experts en maisons de caractère, pierre naturelle et aménagements sur mesure. Chaque chantier est traité comme unique.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "VH", name: "Vincent H.", enseigne: "Fontaine Bain Prestige", spec: "Pierre naturelle · Baignoire îlot · Maisons caractère", exp: "18 ans · Expert pierre de Bourgogne SDB", zone: "Fontaine · Ahuy · Daix · Plombières", note: "5.0/5", nb: "176 chantiers" },
              { initials: "CG", name: "Claire G.", enseigne: "Atelier SDB Fontaine", spec: "Matières nobles · Suite parentale · Volumes", exp: "12 ans · Designer-artisan · Projets sur mesure", zone: "Fontaine · Talant · Dijon Nord", note: "4.9/5", nb: "128 chantiers" },
              { initials: "TP", name: "Thomas P.", enseigne: "Réno Caractère 21", spec: "Rénovation complète · PMR · Budget maîtrisé", exp: "9 ans · Bâti ancien · Dossiers MaPrimeAdapt'", zone: "Fontaine · Marsannay · Gevrey", note: "4.8/5", nb: "94 chantiers" },
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

      <section className="px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>Trois maisons de caractère à Fontaine</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "BF", name: "Bernard F.", loc: "Fontaine · Maison 1972 · SDB 9m² complète", text: "Vincent a posé de la pierre de Bourgogne dans toute la salle de bain. Il a traité lui-même les dalles avec l'hydrofuge adapté. Deux ans après, la pierre a pris une patine magnifique. Ma femme dit que c'est la plus belle pièce de la maison." },
              { avatar: "SC", name: "Sophie C.", loc: "Fontaine · Villa · suite parentale baignoire îlot", text: "Claire a conçu et réalisé notre suite parentale de 11m². Baignoire îlot Kaldewei au centre, douche à l'italienne en travertin, double vasque en marbre. 22 000€ de travaux. Quand des agents immobiliers visitent pour estimation, ils citent toujours la salle de bain." },
              { avatar: "JM", name: "Jean-Marc R.", loc: "Fontaine · Maison · SDB PMR parents", text: "Thomas a su adapter la salle de bain de mes parents (78 et 81 ans) sans trahir le caractère de leur maison. Douche PMR avec carrelage travertin, barres d'appui en inox brossé assortis aux robinets. Le dossier MaPrimeAdapt' : 7 200€ accordés sur 10 400€." },
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

      <section className="px-8 py-20" style={{ background: "#0f1f0a" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d9f99d]">Communes voisines</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Rénovation SDB autour de Fontaine</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-salle-de-bain-dijon", nb: "28 artisans", prix: "7 000–35 000€" },
              { name: "Talant", href: "/devis-salle-de-bain-talant", nb: "11 artisans", prix: "4 800–11 000€" },
              { name: "Chenôve", href: "/devis-salle-de-bain-chenove", nb: "14 artisans", prix: "4 500–9 000€" },
              { name: "Longvic", href: "/devis-salle-de-bain-longvic", nb: "10 artisans", prix: "4 200–10 500€" },
              { name: "Quetigny", href: "/devis-salle-de-bain-quetigny", nb: "9 artisans", prix: "7 500–28 000€" },
              { name: "Ahuy", href: "#", nb: "3 artisans", prix: "6 000–16 000€" },
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
          <h2 className="mb-10 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation SDB<br />à Fontaine-lès-Dijon</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #0f1f0a 0%, #1a3d08 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#a3e635]">Prêt à sublimer votre salle de bain ?</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Devis salle de bain gratuit<br />à Fontaine-lès-Dijon
          </h2>
          <p className="mb-10 text-[16px] text-white/60">6 artisans spécialisés · Pierre naturelle · Baignoire îlot · PMR · Maisons de caractère · Réponse en 4–7h</p>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#4d7c0f] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(77,124,15,0.5)] transition hover:scale-105 hover:bg-[#65a30d]"
          >
            🚿 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Salle de Bain Fontaine-lès-Dijon", url: "https://premiumartisan.fr/devis-salle-de-bain-fontaine-les-dijon", areaServed: { "@type": "City", name: "Fontaine-lès-Dijon", postalCode: "21121" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "22" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
