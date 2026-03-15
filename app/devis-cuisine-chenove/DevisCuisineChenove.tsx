// Cuisine Chenôve component
"use client";
import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix d'une rénovation de cuisine à Chenôve en 2026 ?", a: "À Chenôve, le prix est 10 à 15% inférieur à Dijon centre. Une cuisine standard coûte entre 6 500€ et 14 000€ posée. Pour les petites cuisines HLM de 5 à 6m², un rafraîchissement se fait entre 2 500€ et 5 500€. Une rénovation complète revient entre 9 000€ et 22 000€." },
  { q: "Peut-on agrandir une cuisine dans un HLM à Chenôve ?", a: "Tout abattage de cloison nécessite l'accord écrit du bailleur. En revanche, l'optimisation de l'espace existant — meubles jusqu'au plafond, tiroirs à fond de course, rangements sous l'évier — permet de gagner beaucoup sans toucher aux murs." },
  { q: "Combien de temps dure une rénovation de cuisine à Chenôve ?", a: "Pour un appartement HLM standard, une rénovation complète prend 8 à 12 jours. Démontage et plomberie : 2–3 jours. Pose des meubles : 2–4 jours. Finitions carrelage et peinture : 2–3 jours." },
  { q: "Quelle cuisine choisir pour un locatif à Chenôve ?", a: "Nos artisans recommandent : mélaminé blanc ou gris clair, plan de travail stratifié résistant, robinetterie simple, électroménager milieu de gamme encastré. Budget pour un locatif 5m² : 4 500 à 8 000€." },
  { q: "Y a-t-il des aides pour rénover la cuisine à Chenôve ?", a: "La rénovation de cuisine seule ne bénéficie pas d'aides directes. Cependant l'Anah peut financer jusqu'à 50% dans le cadre d'une rénovation globale pour propriétaires occupants modestes. Le quartier du Mail est éligible aux aides renforcées QPV. TVA à 5,5% sur la main d'œuvre." },
  { q: "Les artisans de Chenôve posent-ils les cuisines achetées en grande surface ?", a: "Oui. La majorité pose les cuisines IKEA, Leroy Merlin, Conforama ou Brico Dépôt. Le coût de la pose seule est de 800 à 2 500€ selon la complexité. Plomberie et électricité incluses dans le devis." },
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

export default function DevisCuisineChenove() {
  return (
    <main className="min-h-screen bg-[#f4f8f0]">
      <nav className="flex items-center justify-between bg-[#0f1f0a] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>Premium<span className="text-[#a3e635]">Artisan</span></span>
        <div className="flex gap-6">
          {[{ label: "Accueil", href: "/" }, { label: "Cuisine Dijon", href: "/devis-cuisine-dijon" }, { label: "Rénovation Chenôve", href: "/devis-renovation-chenove" }, { label: "Prix", href: "#prix" }].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-white/70 transition hover:text-white">{l.label}</Link>
          ))}
        </div>
      </nav>

      <section className="relative overflow-hidden px-8 pb-20 pt-24" style={{ background: "linear-gradient(140deg, #0f1f0a 0%, #1a3d08 55%, #0f2a08 100%)" }}>
        <div className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 68%)" }} />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#a3e635]/35 bg-[#a3e635]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#d9f99d]">
            🍳 Chenôve 21300 · Artisans disponibles · Devis gratuit sous 24h
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Rénovation Cuisine<br />à <span className="text-[#a3e635]">Chenôve</span> —<br />Artisans Vérifiés & Devis Gratuit
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            HLM, locatif, résidences années 70. Nos cuisinistes chenôviens livrent vite et <strong className="text-white">10–15% moins cher</strong> que Dijon centre. <strong className="text-white">14 professionnels disponibles.</strong> 38 projets documentés.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[{ val: "38", txt: "projets Chenôve 2025–26" }, { val: "14", txt: "cuisinistes vérifiés" }, { val: "−12%", txt: "vs Dijon centre" }, { val: "8–12 j.", txt: "délai rénovation HLM" }, { val: "95%", txt: "satisfaction" }].map((k, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{k.val}</div>
                <div className="mt-0.5 text-[11px] text-white/55">{k.txt}</div>
              </div>
            ))}
          </div>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#4d7c0f] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(77,124,15,0.45)] transition hover:scale-105 hover:bg-[#65a30d]">
            🍳 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · 14 artisans disponibles · Réponse en 4–6h</p>
        </div>
      </section>

      <section className="bg-[#4d7c0f] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[{ v: "−12%", l: "vs Dijon centre" }, { v: "5–6m²", l: "Cuisine HLM typique" }, { v: "Pose IKEA", l: "Acceptée par nos artisans" }, { v: "QPV Mail", l: "Aides Anah renforcées" }, { v: "38", l: "Projets 2025–26" }].map((s, i) => (
            <div key={i}><div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div><div className="text-[11px] text-white/65">{s.l}</div></div>
          ))}
        </div>
      </section>

      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4d7c0f]">Le marché Chenôve</div>
          <h2 className="mb-8 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>Trois profils de cuisine à Chenôve</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "🏢", type: "HLM · 5–6m²", part: "58% des projets", desc: "Cuisine fermée d'origine souvent vieillissante. Objectif : optimiser chaque centimètre — meubles hauts jusqu'au plafond, tiroirs à fond de course, hotte intégrée.", budget: "2 500–9 000€" },
              { icon: "🔑", type: "Locatif · entre locataires", part: "28% des projets", desc: "Remise en état rapide avant relocation. Remplacement des portes, nouveau plan de travail, robinetterie neuve. Le locataire suivant signe sans négocier.", budget: "1 800–5 500€" },
              { icon: "🏠", type: "Résidences années 90", part: "14% des projets", desc: "Configurations plus récentes avec de meilleures surfaces. Projets légèrement plus ambitieux avec semi-sur-mesure possible et ouverture partielle sur séjour.", budget: "8 000–18 000€" },
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
          <h2 className="mb-4 text-3xl font-bold text-[#0f1f0a] md:text-5xl" style={{ fontFamily: "serif" }}>Prix rénovation cuisine à Chenôve</h2>
          <p className="mb-10 max-w-[580px] text-[15px] text-[#2a4a1a]">Basé sur 38 projets documentés. Tarifs 10–15% inférieurs à Dijon centre.</p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Rafraîchissement HLM 5m²", price: "2 500–5 500€", note: "Portes · Plan de travail · Robinetterie" },
              { label: "Rénovation complète HLM 6m²", price: "6 500–13 000€", note: "Démontage · Nouveaux meubles · Électroménager" },
              { label: "Remise en état locatif", price: "1 800–4 500€", note: "Rapide · 3–5 jours · Prêt à louer" },
              { label: "Cuisine semi-sur-mesure", price: "10 000–20 000€", note: "Résidences années 90 · Plus de volume" },
              { label: "Pose cuisine IKEA/GSB", price: "800–2 500€", note: "Pose seule · Plomberie + électricité incluses" },
              { label: "Crédence + carrelage", price: "350–900€", note: "Pose professionnelle · Joint époxy disponible" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8d8c0] bg-white p-5 transition hover:border-[#4d7c0f]">
                <div className="mb-1 text-[13px] font-semibold text-[#0f1f0a]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#4d7c0f]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#2a4a1a]">{r.note}</div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[#c8d8c0]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0f1f0a] text-white">
                  {["Type de projet", "Chenôve", "Dijon centre", "Économie"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["Rafraîchissement 5m²", "2 500–5 500€", "3 000–6 500€", "−15%"],
                  ["Rénovation complète 6m²", "6 500–13 000€", "8 000–15 000€", "−12%"],
                  ["Pose IKEA seule", "800–2 200€", "1 000–2 800€", "−15%"],
                  ["Semi-sur-mesure", "10 000–20 000€", "12 000–24 000€", "−12%"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#f4f8f0]">
                    <td className="border-b border-[#c8d8c0] px-4 py-3.5 text-sm font-semibold text-[#0f1f0a]">{r[0]}</td>
                    <td className="border-b border-[#c8d8c0] px-4 py-3.5 text-sm font-bold text-[#4d7c0f]">{r[1]}</td>
                    <td className="border-b border-[#c8d8c0] px-4 py-3.5 text-sm text-[#2a4a1a]">{r[2]}</td>
                    <td className="border-b border-[#c8d8c0] px-4 py-3.5 text-sm font-bold text-[#0f1f0a]">{r[3]}</td>
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
          <h2 className="mb-4 text-3xl font-bold text-[#0f1f0a] md:text-5xl" style={{ fontFamily: "serif" }}>14 cuisinistes vérifiés près de chez vous à Chenôve</h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#2a4a1a]">Spécialistes HLM, locatif rapide et optimisation d'espace.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "AL", name: "Antoine L.", enseigne: "Cuisine Chenôve Express", spec: "HLM · Locatif · Pose IKEA · Rapide", exp: "13 ans · 220 cuisines posées à Chenôve", zone: "Chenôve · Marsannay · Longvic", note: "4.9/5", nb: "220 chantiers" },
              { initials: "MK", name: "Malika K.", enseigne: "Aménagement Cuisine 21", spec: "Semi-sur-mesure · Optimisation petits espaces", exp: "9 ans · Spécialiste petits volumes HLM", zone: "Chenôve · Dijon Sud · Gevrey", note: "4.9/5", nb: "148 chantiers" },
              { initials: "FD", name: "Franck D.", enseigne: "Multi-Cuisine Chenôve", spec: "Rénovation complète · Plomberie · Électricité", exp: "7 ans · Tous corps de métier en équipe", zone: "Chenôve · Dijon · Côte-d'Or", note: "4.8/5", nb: "96 chantiers" },
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
          <h2 className="mb-12 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>Trois projets réels à Chenôve</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "RB", name: "Rachida B.", loc: "Chenôve · HLM 5m² · rénovation complète", text: "Antoine a transformé notre vieille cuisine en 9 jours. Meubles jusqu'au plafond, tiroirs Blum à fermeture douce, hotte intégrée. 7 800€. On a enfin un espace fonctionnel et moderne." },
              { avatar: "OT", name: "Olivier T.", loc: "Chenôve · Locatif · remise en état", text: "Malika a remis à neuf la cuisine de mon studio en 4 jours entre deux locataires. 2 400€. Portes grises mat, plan de travail quartz blanc. Mon nouveau locataire a payé le premier mois sans négocier." },
              { avatar: "SD", name: "Stéphane D.", loc: "Chenôve · Résidence années 90 · semi-sur-mesure", text: "Franck a géré tout : abattage partiel de cloison, cuisine semi-ouverte sur le séjour, nouveau carrelage sol. 14 200€. Il a coordiné plombier et électricien sans que j'intervienne." },
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
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Rénovation cuisine autour de Chenôve</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-cuisine-dijon", nb: "34 cuisinistes", prix: "8 000–70 000€" },
              { name: "Longvic", href: "/devis-cuisine-longvic", nb: "10 cuisinistes", prix: "7 000–20 000€" },
              { name: "Talant", href: "/devis-cuisine-talant", nb: "9 cuisinistes", prix: "8 000–25 000€" },
              { name: "Quetigny", href: "/devis-cuisine-quetigny", nb: "8 cuisinistes", prix: "10 000–35 000€" },
              { name: "Fontaine-lès-Dijon", href: "/devis-cuisine-fontaine-les-dijon", nb: "6 cuisinistes", prix: "9 000–40 000€" },
              { name: "Marsannay-la-Côte", href: "#", nb: "4 cuisinistes", prix: "6 000–18 000€" },
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
          <h2 className="mb-10 text-3xl font-bold text-[#0f1f0a] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation cuisine à Chenôve</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #0f1f0a 0%, #1a3d08 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#a3e635]">14 artisans disponibles près de chez vous</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Publiez votre projet cuisine<br />et recevez des devis gratuits à Chenôve
          </h2>
          <p className="mb-10 text-[16px] text-white/60">14 cuisinistes vérifiés · HLM · Locatif · Semi-sur-mesure · Pose IKEA · Réponse en 4–6h</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#4d7c0f] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(77,124,15,0.5)] transition hover:scale-105 hover:bg-[#65a30d]">
            🍳 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Cuisine Chenôve", url: "https://premiumartisan.fr/devis-cuisine-chenove", areaServed: { "@type": "City", name: "Chenôve", postalCode: "21300" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "32" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
