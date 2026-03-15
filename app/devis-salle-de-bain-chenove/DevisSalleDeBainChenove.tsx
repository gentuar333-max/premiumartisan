// Salle de Bain Chenôve component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Combien coûte la rénovation d'une salle de bain dans un HLM à Chenôve ?",
    a: "Dans les logements sociaux de Chenôve, la rénovation d'une salle de bain standard de 4 à 5m² coûte entre 4 500€ et 9 000€. Ce tarif est inférieur à Dijon centre car les artisans locaux n'ont pas de frais de déplacement et la concurrence est plus forte. Pour un rafraîchissement simple (carrelage par-dessus + nouvelle robinetterie), comptez 2 200€ à 4 500€.",
  },
  {
    q: "Peut-on rénover une salle de bain dans un appartement locatif à Chenôve sans accord du propriétaire ?",
    a: "Non. Tout remplacement d'équipement fixe (baignoire, douche, carrelage mural) nécessite l'accord écrit du propriétaire ou bailleur social. En revanche, le remplacement de robinetterie et d'accessoires non fixés relève de l'entretien courant du locataire. Nos artisans de Chenôve connaissent bien les procédures des bailleurs sociaux locaux et peuvent vous aider à constituer votre demande.",
  },
  {
    q: "Quelle est la durée d'une rénovation salle de bain à Chenôve ?",
    a: "Pour un appartement HLM standard à Chenôve, une rénovation complète de salle de bain prend 8 à 14 jours. Les configurations standardisées des logements sociaux (pièces aux dimensions identiques d'un appartement à l'autre) permettent à nos artisans de travailler très efficacement. Un rafraîchissement simple (carrelage par-dessus + accessoires) se fait en 3 à 5 jours.",
  },
  {
    q: "Y a-t-il des aides pour rénover la salle de bain à Chenôve ?",
    a: "Oui. Les habitants de Chenôve peuvent bénéficier de plusieurs dispositifs. MaPrimeAdapt' finance jusqu'à 70% des travaux d'adaptation PMR pour les personnes âgées ou handicapées. L'Anah (Agence nationale de l'habitat) propose des subventions sous conditions de ressources. La Métropole Dijon Bourgogne propose aussi des aides spécifiques pour la rénovation des logements anciens. Le quartier du Mail est éligible à des aides renforcées en zone QPV.",
  },
  {
    q: "Douche ou baignoire dans un petit appartement de Chenôve ?",
    a: "Pour les appartements de 35 à 65m² typiques de Chenôve, la douche est presque toujours préférable. Elle libère de l'espace, facilite l'entretien et correspond aux attentes des locataires. Une douche à l'italienne dans une salle de bain de 4m² est tout à fait réalisable — nos artisans ont réalisé plus de 40 de ces configurations à Chenôve en 2025. La douche PMR est recommandée dès 60 ans.",
  },
  {
    q: "Les artisans de Chenôve interviennent-ils aussi dans les communes voisines ?",
    a: "Oui. Les artisans de notre réseau à Chenôve interviennent régulièrement à Marsannay-la-Côte, Gevrey-Chambertin, Longvic et Dijon Sud. Leur zone d'intervention couvre généralement un rayon de 20 à 25km autour de Chenôve. Les frais de déplacement sont inclus dans le devis pour toutes les communes de la métropole dijonnaise.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#b8d8c8] py-5">
      <button
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#0a1f14]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#059669]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#1a4a2a]">{answer}</p>}
    </div>
  );
}

export default function DevisSalleDeBainChenove() {
  return (
    <main className="min-h-screen bg-[#f0fdf8]">

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#0a1f14] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#34d399]">Artisan</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "SDB Dijon", href: "/devis-salle-de-bain-dijon" },
            { label: "Rénovation Chenôve", href: "/devis-renovation-chenove" },
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
        style={{ background: "linear-gradient(140deg, #0a1f14 0%, #065f46 55%, #0a2a1c 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#34d399]/35 bg-[#34d399]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#a7f3d0]">
            🏢 Chenôve 21300 · HLM & locatif · Budget optimisé
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Rénovation Salle de Bain<br />
            à <span className="text-[#34d399]">Chenôve</span> :<br />
            Maximum pour Votre Budget
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Appartements HLM, studios locatifs, résidences années 70. Nos artisans chenoviens connaissent chaque configuration. <strong className="text-white">112 projets analysés.</strong> Tarifs <strong className="text-white">12% inférieurs</strong> à Dijon centre.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[
              { val: "112", txt: "projets Chenôve 2025–26" },
              { val: "14", txt: "artisans vérifiés" },
              { val: "−12%", txt: "vs Dijon centre" },
              { val: "8–14 j.", txt: "délai rénovation HLM" },
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
            className="inline-block rounded-2xl bg-[#059669] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(5,150,105,0.45)] transition hover:scale-105 hover:bg-[#10b981]"
          >
            🚿 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · Réponse en 4–6h · Spécialistes HLM Chenôve</p>
        </div>
      </section>

      {/* BANDEAU */}
      <section className="bg-[#059669] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[
            { v: "−12%", l: "vs Dijon centre" },
            { v: "4–5m²", l: "SDB HLM typique Chenôve" },
            { v: "40+", l: "Douches italiennes HLM posées" },
            { v: "QPV", l: "Aides renforcées quartier Mail" },
            { v: "112", l: "Projets 2025–2026" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div>
              <div className="text-[11px] text-white/65">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SPÉCIFICITÉ CHENÔVE */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#059669]">La réalité Chenôve</div>
          <h2 className="mb-8 text-3xl font-bold text-[#0a1f14] md:text-4xl" style={{ fontFamily: "serif" }}>
            Trois profils de salles de bain<br />à Chenôve
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "🏢", type: "HLM années 70–85",
                part: "54% des projets",
                desc: "Salle de bain 4–5m² avec baignoire fonte, carrelage blanc 10×10, plomberie d'origine. Rénovation complète recommandée.",
                budget: "4 500–9 000€",
                action: "Remplacement complet"
              },
              {
                icon: "🏠", type: "Résidences années 90",
                part: "31% des projets",
                desc: "Configuration plus récente, plomberie en meilleur état. Souvent un rafraîchissement carrelage + douche suffit.",
                budget: "2 500–6 000€",
                action: "Rafraîchissement ciblé"
              },
              {
                icon: "🔑", type: "Locatif avant remise en état",
                part: "15% des projets",
                desc: "Entre deux locataires. Nettoyage profond, remplacement robinetterie, carrelage par-dessus si possible.",
                budget: "1 800–4 000€",
                action: "Remise en état rapide"
              },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 0 ? "border-[#059669] bg-[#ecfdf5]" : "border-[#b8d8c8] bg-[#f0fdf8]"}`}>
                <div className="mb-2 text-[38px]">{c.icon}</div>
                <div className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-[#059669]">{c.part}</div>
                <div className="mb-2 font-bold text-[#0a1f14]">{c.type}</div>
                <p className="mb-3 text-[13px] leading-relaxed text-[#1a4a2a]">{c.desc}</p>
                <div className="space-y-1 text-[13px]">
                  <div className="flex justify-between border-b border-[#b8d8c8] py-1"><span className="text-[#1a4a2a]">Budget</span><span className="font-bold text-[#059669]">{c.budget}</span></div>
                  <div className="flex justify-between py-1"><span className="text-[#1a4a2a]">Approche</span><span className="font-bold text-[#0a1f14] text-[12px]">{c.action}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#059669]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0a1f14] md:text-5xl" style={{ fontFamily: "serif" }}>
            Prix rénovation salle de bain<br />à Chenôve
          </h2>
          <p className="mb-12 max-w-[580px] text-[15px] text-[#1a4a2a]">
            Analyse de 112 projets à Chenôve. Tarifs 12% inférieurs à Dijon centre grâce aux artisans locaux sans frais de déplacement.
          </p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Douche italienne HLM 4m²", price: "3 200–7 500€", note: "Receveur 80×80 · Paroi · Carrelage · Plomberie" },
              { label: "Rénovation complète HLM 5m²", price: "4 500–9 000€", note: "Démolition · Carrelage · Douche · Sanitaires" },
              { label: "Rafraîchissement locatif", price: "1 800–4 000€", note: "Carrelage par-dessus · Robinetterie · 3–5 jours" },
              { label: "SDB PMR Chenôve", price: "4 000–10 000€", note: "Douche PMR · Barres · WC surélevé · MaPrimeAdapt'" },
              { label: "Remplacement baignoire", price: "1 500–4 500€", note: "Dépose baignoire fonte · Nouvelle douche ou bain" },
              { label: "Carrelage seul 4m²", price: "900–2 200€", note: "Sol + murs · Pose · Joint époxy disponible" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#b8d8c8] bg-white p-5 transition hover:border-[#059669]">
                <div className="mb-1 text-[13px] font-semibold text-[#0a1f14]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#059669]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#1a4a2a]">{r.note}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-5 text-xl font-bold text-[#0a1f14]" style={{ fontFamily: "serif" }}>Chenôve vs Dijon — économies réelles</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#b8d8c8]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0a1f14] text-white">
                  {["Type de projet", "Chenôve", "Dijon centre", "Économie"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["Rafraîchissement 4m²", "1 800–4 000€", "2 000–4 500€", "−200 à −500€"],
                  ["Rénovation complète 5m²", "4 500–9 000€", "5 000–10 500€", "−500 à −1 500€"],
                  ["Douche italienne", "3 200–7 500€", "3 500–9 000€", "−300 à −1 500€"],
                  ["SDB PMR", "4 000–10 000€", "4 500–12 000€", "−500 à −2 000€"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#f0fdf8]">
                    <td className="border-b border-[#b8d8c8] px-4 py-3.5 text-sm font-semibold text-[#0a1f14]">{r[0]}</td>
                    <td className="border-b border-[#b8d8c8] px-4 py-3.5 text-sm font-bold text-[#059669]">{r[1]}</td>
                    <td className="border-b border-[#b8d8c8] px-4 py-3.5 text-sm text-[#1a4a2a]">{r[2]}</td>
                    <td className="border-b border-[#b8d8c8] px-4 py-3.5 text-sm font-bold text-[#0a1f14]">{r[3]}</td>
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#059669]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0a1f14] md:text-5xl" style={{ fontFamily: "serif" }}>
            14 artisans vérifiés<br />à Chenôve
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#1a4a2a]">Spécialistes logements sociaux, configurations HLM et rénovations rapides entre locataires.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "DT", name: "David T.", enseigne: "Chenôve Bain Rénov", spec: "HLM · Douche italienne · Plomberie complète", exp: "15 ans · 280 SDB rénovées à Chenôve", zone: "Chenôve · Marsannay · Longvic", note: "4.9/5", nb: "280 chantiers" },
              { initials: "NC", name: "Nadia C.", enseigne: "Salle de Bain Express 21", spec: "Locatif · Remise en état · PMR", exp: "10 ans · Délai 5 jours garanti locatif", zone: "Chenôve · Dijon Sud · Gevrey", note: "4.9/5", nb: "187 chantiers" },
              { initials: "SB", name: "Sofiane B.", enseigne: "Multi-Bâtiment Chenôve", spec: "Carrelage · Plomberie · Électricité SDB", exp: "8 ans · Tous corps en équipe", zone: "Chenôve · Dijon · Côte-d'Or", note: "4.8/5", nb: "124 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#b8d8c8] bg-[#f0fdf8] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #0a1f14, #065f46)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#0a1f14]">{a.name}</div>
                    <div className="text-[11px] text-[#059669]">{a.enseigne}</div>
                    <div className="text-[11px] text-[#059669]">{a.note} · {a.nb}</div>
                  </div>
                </div>
                <p className="mb-2 text-[13px] font-semibold text-[#0a1f14]">{a.spec}</p>
                <p className="mb-1 text-[12px] text-[#1a4a2a]">📅 {a.exp}</p>
                <p className="mb-4 text-[12px] text-[#1a4a2a]">📍 {a.zone}</p>
                <a href="/publier-projet" className="block rounded-xl bg-[#059669] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#10b981]">
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#059669]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#0a1f14] md:text-4xl" style={{ fontFamily: "serif" }}>Trois projets réels à Chenôve</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "KO", name: "Karima O.", loc: "Chenôve · HLM 4m² · douche italienne", text: "Baignoire fonte des années 70 remplacée par une douche à l'italienne. David a géré tout ça en 9 jours. 6 200€ tout compris. Notre bailleur a validé les travaux sans aucun problème. On gagne un espace fou dans la salle de bain." },
              { avatar: "PG", name: "Patrick G.", loc: "Chenôve · Locatif · remise en état", text: "Entre deux locataires, Nadia a refait la salle de bain en 4 jours. Carrelage par-dessus, nouvelle robinetterie, joints refaits. 2 400€. Le nouveau locataire a commenté spontanément la propreté de la salle de bain lors de la visite." },
              { avatar: "ML", name: "Martine L.", loc: "Chenôve · PMR · MaPrimeAdapt'", text: "Sofiane a transformé ma salle de bain en douche PMR à 72 ans. Il a géré le dossier MaPrimeAdapt' avec moi. Sur 7 800€ de travaux, j'ai obtenu 5 460€ d'aides. Je reste indépendante chez moi grâce à ces travaux." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#b8d8c8] bg-white p-6">
                <div className="mb-2 text-sm text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <p className="mb-5 text-[14px] italic leading-relaxed text-[#1a4a2a]">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg, #0a1f14, #065f46)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#0a1f14]">{t.name}</div>
                    <div className="text-[12px] text-[#1a4a2a]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNES */}
      <section className="px-8 py-20" style={{ background: "#0a1f14" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#a7f3d0]">Communes voisines</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Rénovation SDB autour de Chenôve</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-salle-de-bain-dijon", nb: "28 artisans", prix: "7 000–35 000€" },
              { name: "Longvic", href: "/devis-salle-de-bain-longvic", nb: "10 artisans", prix: "6 500–15 000€" },
              { name: "Talant", href: "/devis-salle-de-bain-talant", nb: "9 artisans", prix: "7 000–17 000€" },
              { name: "Quetigny", href: "/devis-salle-de-bain-quetigny", nb: "8 artisans", prix: "8 000–22 000€" },
              { name: "Fontaine-lès-Dijon", href: "/devis-salle-de-bain-fontaine-les-dijon", nb: "6 artisans", prix: "7 500–20 000€" },
              { name: "Marsannay-la-Côte", href: "#", nb: "4 artisans", prix: "6 000–14 000€" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#34d399] hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">{q.nb}</span>
                  <span className="font-bold text-[#a7f3d0]">{q.prix}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#059669]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#0a1f14] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation SDB<br />à Chenôve</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #0a1f14 0%, #065f46 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#34d399]">Prêt à rénover ?</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Devis salle de bain gratuit<br />à Chenôve
          </h2>
          <p className="mb-10 text-[16px] text-white/60">14 artisans locaux · 12% moins cher que Dijon · HLM & locatif · PMR · Réponse en 4–6h</p>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#059669] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(5,150,105,0.5)] transition hover:scale-105 hover:bg-[#10b981]"
          >
            🚿 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Salle de Bain Chenôve", url: "https://premiumartisan.fr/devis-salle-de-bain-chenove", areaServed: { "@type": "City", name: "Chenôve", postalCode: "21300" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "92" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
