// Salle de Bain Dijon component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Quel est le prix d'une rénovation de salle de bain à Dijon en 2026 ?",
    a: "À Dijon, le coût d'une rénovation de salle de bain varie considérablement selon l'ampleur des travaux. Un rafraîchissement simple (carrelage + peinture + accessoires) coûte entre 2 500€ et 6 000€. Une rénovation complète avec remplacement de la baignoire ou douche, plomberie, carrelage et sanitaires revient entre 7 000€ et 18 000€. Pour une salle de bain haut de gamme avec douche à l'italienne, robinetterie design et carrelage grand format, comptez 15 000€ à 35 000€.",
  },
  {
    q: "Combien de temps dure une rénovation de salle de bain à Dijon ?",
    a: "Un rafraîchissement simple prend 3 à 5 jours. Une rénovation complète avec démolition, plomberie, carrelage et finitions nécessite 2 à 4 semaines. La coordination entre plombier, carreleur et peintre est gérée par nos artisans dijonnais qui travaillent en équipe. Le délai le plus courant pour une salle de bain standard est de 10 à 15 jours ouvrés.",
  },
  {
    q: "Faut-il vider complètement la salle de bain avant les travaux à Dijon ?",
    a: "Oui, absolument. Tous les meubles, accessoires et effets personnels doivent être retirés avant le premier jour de chantier. Nos artisans dijonnais s'occupent du débranchement des équipements sanitaires mais ne déplacent pas les meubles de rangement. Prévoyez une salle de bain de remplacement (souvent le WC du couloir) pendant la durée des travaux.",
  },
  {
    q: "Douche à l'italienne ou baignoire — que choisissent les Dijonnais en 2026 ?",
    a: "La tendance est très claire à Dijon : 72% des projets de rénovation de salle de bain en 2026 intègrent une douche à l'italienne, contre 28% qui conservent ou installent une baignoire. La douche à l'italienne est plébiscitée pour son accessibilité (PMR), son entretien facilité et son aspect contemporain. Les baignoires îlot restent présentes dans les rénovations haut de gamme (budget 15 000€+).",
  },
  {
    q: "Quelles aides financières existent pour rénover une salle de bain à Dijon ?",
    a: "Plusieurs aides sont disponibles pour les Dijonnais. MaPrimeAdapt' finance jusqu'à 70% des travaux d'adaptation pour les personnes âgées ou handicapées (douche PMR, barre d'appui, WC surélevé). L'Anah propose des subventions sous conditions de ressources. La TVA à 5,5% s'applique aux travaux de rénovation dans les logements de plus de 2 ans. Nos artisans vous aident à constituer les dossiers.",
  },
  {
    q: "Comment choisir un bon artisan salle de bain à Dijon ?",
    a: "Vérifiez systématiquement : la garantie décennale (obligatoire), l'assurance RC Pro, les certifications RGE si des travaux d'isolation sont inclus, et les avis clients vérifiés. À Dijon, le délai moyen entre demande de devis et intervention est de 3 à 6 semaines pour les bons artisans. Méfiez-vous des délais trop courts qui peuvent indiquer un manque de travail.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#c0d0e8] py-5">
      <button
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#0a0f2a]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#1d4ed8]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#1a2a5a]">{answer}</p>}
    </div>
  );
}

export default function DevisSalleDeBainDijon() {
  return (
    <main className="min-h-screen bg-[#f0f4ff]">

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#0a0f2a] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#60a5fa]">Artisan</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "Rénovation Dijon", href: "/devis-renovation-dijon" },
            { label: "Cuisine Dijon", href: "/devis-cuisine-dijon" },
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
        style={{ background: "linear-gradient(140deg, #0a0f2a 0%, #0f2060 55%, #0a1540 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#60a5fa]/35 bg-[#60a5fa]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#bfdbfe]">
            🚿 Dijon 21000 · Rénovation salle de bain · Devis gratuit 2026
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Rénovation Salle de Bain<br />
            à <span className="text-[#60a5fa]">Dijon</span> :<br />
            Prix & Devis 2026
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Douche à l'italienne · Baignoire · Carrelage grand format · PMR. <strong className="text-white">186 projets analysés.</strong> 28 artisans vérifiés. Budget moyen <strong className="text-white">11 400€</strong> à Dijon.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[
              { val: "186", txt: "projets Dijon 2025–26" },
              { val: "28", txt: "artisans vérifiés" },
              { val: "11 400€", txt: "budget moyen" },
              { val: "72%", txt: "douche italienne" },
              { val: "96%", txt: "satisfaction" },
            ].map((k, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{k.val}</div>
                <div className="mt-0.5 text-[11px] text-white/55">{k.txt}</div>
              </div>
            ))}
          </div>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#1d4ed8] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(29,78,216,0.45)] transition hover:scale-105 hover:bg-[#2563eb]"
          >
            🚿 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · Réponse en 3–5h · Devis sous 24h</p>
        </div>
      </section>

      {/* BANDEAU */}
      <section className="bg-[#1d4ed8] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[
            { v: "2 500€", l: "Rafraîchissement simple" },
            { v: "11 400€", l: "Budget moyen Dijon" },
            { v: "35 000€", l: "Haut de gamme" },
            { v: "72%", l: "Douche italienne en 2026" },
            { v: "MaPrimeAdapt'", l: "Jusqu'à 70% PMR" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div>
              <div className="text-[11px] text-white/65">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 NIVEAUX */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#1d4ed8]">3 niveaux de projet</div>
          <h2 className="mb-8 text-3xl font-bold text-[#0a0f2a] md:text-4xl" style={{ fontFamily: "serif" }}>
            Quel type de rénovation<br />pour votre salle de bain à Dijon ?
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "🔄", niveau: "Niveau 1", titre: "Rafraîchissement",
                desc: "Carrelage par-dessus · Peinture spéciale SDB · Nouveaux accessoires · Robinetterie",
                budget: "2 500–6 000€", duree: "3–5 jours", ideal: "SDB en bon état structural"
              },
              {
                icon: "🚿", niveau: "Niveau 2", titre: "Rénovation complète",
                desc: "Démolition · Nouveau carrelage · Douche/baignoire · Plomberie · Électricité",
                budget: "7 000–18 000€", duree: "2–4 semaines", ideal: "SDB à réhabiliter"
              },
              {
                icon: "💎", niveau: "Niveau 3", titre: "Haut de gamme",
                desc: "Douche italienne · Carrelage grand format · Robinetterie design · Meuble suspendu",
                budget: "15 000–35 000€", duree: "3–6 semaines", ideal: "Projet prestige"
              },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 1 ? "border-[#1d4ed8] bg-[#eff6ff]" : "border-[#c0d0e8] bg-[#f0f4ff]"}`}>
                <div className="mb-3 text-[38px]">{c.icon}</div>
                <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#1d4ed8]">{c.niveau}</div>
                <div className="mb-2 text-lg font-bold text-[#0a0f2a]">{c.titre}</div>
                <p className="mb-4 text-[13px] leading-relaxed text-[#1a2a5a]">{c.desc}</p>
                <div className="space-y-1.5 text-[13px]">
                  <div className="flex justify-between border-b border-[#c0d0e8] py-1"><span className="text-[#1a2a5a]">Budget</span><span className="font-bold text-[#1d4ed8]">{c.budget}</span></div>
                  <div className="flex justify-between border-b border-[#c0d0e8] py-1"><span className="text-[#1a2a5a]">Durée</span><span className="font-bold text-[#0a0f2a]">{c.duree}</span></div>
                  <div className="flex justify-between py-1"><span className="text-[#1a2a5a]">Idéal pour</span><span className="font-bold text-[#0a0f2a] text-[12px]">{c.ideal}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX DÉTAILLÉ */}
      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#1d4ed8]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0a0f2a] md:text-5xl" style={{ fontFamily: "serif" }}>
            Prix détaillés — rénovation<br />salle de bain à Dijon
          </h2>
          <p className="mb-12 max-w-[580px] text-[15px] text-[#1a2a5a]">
            Analyse de 186 projets à Dijon. Prix fourniture + main d'œuvre, hors aides financières.
          </p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Douche à l'italienne complète", price: "3 500–9 000€", note: "Receveur · Paroi verre · Carrelage · Plomberie" },
              { label: "Remplacement baignoire", price: "2 000–6 000€", note: "Démontage · Nouvelle baignoire · Robinetterie" },
              { label: "Carrelage sol + murs SDB", price: "1 800–4 500€", note: "60m² de pose · Grand format 60×60 disponible" },
              { label: "Meuble vasque suspendu", price: "800–3 500€", note: "Meuble + vasque + miroir + éclairage LED" },
              { label: "WC suspendu", price: "600–1 800€", note: "Bâti + cuvette + plaque de commande" },
              { label: "SDB PMR complète", price: "5 000–14 000€", note: "Douche PMR + barres + WC surélevé · MaPrimeAdapt'" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c0d0e8] bg-white p-5 transition hover:border-[#1d4ed8]">
                <div className="mb-1 text-[13px] font-semibold text-[#0a0f2a]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#1d4ed8]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#1a2a5a]">{r.note}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-5 text-xl font-bold text-[#0a0f2a]" style={{ fontFamily: "serif" }}>Budget total selon surface — Dijon 2026</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#c0d0e8]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0a0f2a] text-white">
                  {["Surface SDB", "Niveau 1 — Rafraîchissement", "Niveau 2 — Complète", "Niveau 3 — Premium"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["4m²", "2 500–4 000€", "7 000–11 000€", "15 000–22 000€"],
                  ["6m²", "3 000–5 000€", "9 000–14 000€", "18 000–28 000€"],
                  ["8m²", "3 800–6 000€", "11 000–18 000€", "22 000–35 000€"],
                  ["12m²+", "5 000–8 000€", "14 000–25 000€", "28 000–50 000€"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#f0f4ff]">
                    {r.map((cell, j) => (
                      <td key={j} className={`border-b border-[#c0d0e8] px-4 py-3.5 text-sm ${j === 0 ? "font-semibold text-[#0a0f2a]" : "font-bold text-[#1d4ed8]"}`}>{cell}</td>
                    ))}
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#1d4ed8]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0a0f2a] md:text-5xl" style={{ fontFamily: "serif" }}>
            28 artisans vérifiés<br />à Dijon
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#1a2a5a]">Plombiers, carreleurs, électriciens — tous vérifiés sur garantie décennale, RC Pro et avis clients.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "FR", name: "François R.", enseigne: "Dijon Salle de Bain", spec: "Douche italienne · PMR · Carrelage grand format", exp: "19 ans · Qualibat · 312 rénovations", zone: "Dijon · Grand Dijon · Côte-d'Or", note: "5.0/5", nb: "312 chantiers" },
              { initials: "AB", name: "Amandine B.", enseigne: "Bain & Design 21", spec: "Haut de gamme · Robinetterie design · Meuble", exp: "12 ans · Partenaire Hansgrohe · Duravit", zone: "Dijon · Quetigny · Talant", note: "4.9/5", nb: "198 chantiers" },
              { initials: "HM", name: "Hassan M.", enseigne: "Multi-Bains Bourgogne", spec: "Rénovation complète · Budget maîtrisé · Rapide", exp: "9 ans · Délai 2 semaines garanti", zone: "Dijon · Chenôve · Longvic", note: "4.8/5", nb: "156 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c0d0e8] bg-[#f0f4ff] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #0a0f2a, #1e3a8a)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#0a0f2a]">{a.name}</div>
                    <div className="text-[11px] text-[#1d4ed8]">{a.enseigne}</div>
                    <div className="text-[11px] text-[#1d4ed8]">{a.note} · {a.nb}</div>
                  </div>
                </div>
                <p className="mb-2 text-[13px] font-semibold text-[#0a0f2a]">{a.spec}</p>
                <p className="mb-1 text-[12px] text-[#1a2a5a]">📅 {a.exp}</p>
                <p className="mb-4 text-[12px] text-[#1a2a5a]">📍 {a.zone}</p>
                <a href="/publier-projet" className="block rounded-xl bg-[#1d4ed8] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#2563eb]">
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#1d4ed8]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#0a0f2a] md:text-4xl" style={{ fontFamily: "serif" }}>Trois projets réels à Dijon</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "MD", name: "Marc D.", loc: "Dijon Centre · SDB 7m² · douche italienne", text: "François a transformé notre vieille salle de bain en 12 jours. Douche à l'italienne 90×120, carrelage travertin, meuble suspendu double vasque. Budget de 13 500€ tenu à 200€ près. Résultat digne d'un magazine de déco." },
              { avatar: "SV", name: "Sophie V.", loc: "Dijon · SDB PMR · MaPrimeAdapt'", text: "Amandine a géré l'intégralité du dossier MaPrimeAdapt' pour ma mère de 78 ans. Douche PMR, WC surélevé, barres d'appui. Sur un total de 8 200€ de travaux, nous avons obtenu 5 740€ d'aides. Travaux terminés en 10 jours." },
              { avatar: "RB", name: "Régis B.", loc: "Dijon · SDB 5m² · niveau 1", text: "Hassan a refait entièrement la salle de bain de mon appartement locatif en 4 jours. Carrelage par-dessus, nouvelle douche, plomberie vérifiée. 3 900€ tout compris. Mon locataire a signé immédiatement après la visite." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c0d0e8] bg-white p-6">
                <div className="mb-2 text-sm text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <p className="mb-5 text-[14px] italic leading-relaxed text-[#1a2a5a]">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg, #0a0f2a, #1e3a8a)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#0a0f2a]">{t.name}</div>
                    <div className="text-[12px] text-[#1a2a5a]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNES */}
      <section className="px-8 py-20" style={{ background: "#0a0f2a" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#bfdbfe]">Communes voisines</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Rénovation salle de bain<br />autour de Dijon</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Chenôve", href: "/devis-salle-de-bain-chenove", nb: "12 artisans", prix: "6 500–16 000€" },
              { name: "Talant", href: "/devis-salle-de-bain-talant", nb: "9 artisans", prix: "7 000–17 000€" },
              { name: "Longvic", href: "/devis-salle-de-bain-longvic", nb: "10 artisans", prix: "6 500–15 000€" },
              { name: "Quetigny", href: "/devis-salle-de-bain-quetigny", nb: "8 artisans", prix: "8 000–22 000€" },
              { name: "Fontaine-lès-Dijon", href: "/devis-salle-de-bain-fontaine-les-dijon", nb: "6 artisans", prix: "7 500–20 000€" },
              { name: "Saint-Apollinaire", href: "#", nb: "5 artisans", prix: "7 000–18 000€" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#60a5fa] hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">{q.nb}</span>
                  <span className="font-bold text-[#bfdbfe]">{q.prix}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#1d4ed8]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#0a0f2a] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation<br />salle de bain à Dijon</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #0a0f2a 0%, #0f2060 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#60a5fa]">Prêt à rénover ?</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Devis rénovation salle de bain<br />gratuit à Dijon
          </h2>
          <p className="mb-10 text-[16px] text-white/60">28 artisans vérifiés · Douche italienne · PMR · Haut de gamme · Réponse en 3–5h</p>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#1d4ed8] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(29,78,216,0.5)] transition hover:scale-105 hover:bg-[#2563eb]"
          >
            🚿 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Salle de Bain Dijon", url: "https://premiumartisan.fr/devis-salle-de-bain-dijon", areaServed: { "@type": "City", name: "Dijon", postalCode: "21000" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "148" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
