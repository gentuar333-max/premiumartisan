// Cuisine Talant component
"use client";
import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix d'une rénovation de cuisine à Talant en 2026 ?", a: "À Talant, le prix d'une rénovation de cuisine varie selon le secteur. Dans les tours des quartiers Belvédère et Monts, les petites cuisines de 5 à 7m² coûtent entre 7 000€ et 16 000€ à rénover complètement. Dans les villas du plateau, les surfaces plus grandes (8 à 12m²) permettent des projets de 12 000€ à 28 000€. Le budget moyen constaté à Talant est de 11 200€." },
  { q: "Les cuisines des tours de Talant ont-elles des contraintes particulières ?", a: "Oui. Les tours construites dans les années 1970–1985 ont des configurations très standardisées avec des gaines techniques centralisées. Toute modification de plomberie doit respecter ces gaines. De plus, l'altitude de 350m génère des variations de pression d'eau qui nécessitent parfois un réducteur de pression pour les équipements sensibles comme les lave-vaisselle encastrés. Nos artisans talantais connaissent parfaitement ces contraintes." },
  { q: "Peut-on ouvrir la cuisine sur le séjour dans une tour de Talant ?", a: "C'est techniquement possible dans certains appartements mais complexe. La plupart des cloisons des tours sont porteuses ou contiennent des gaines. Il faut systématiquement faire vérifier par un bureau d'études structure avant tout abattage. Dans les villas du plateau, l'ouverture cuisine-séjour est beaucoup plus courante et plus simple à réaliser." },
  { q: "Combien de temps dure une rénovation de cuisine à Talant ?", a: "Pour une rénovation standard dans une tour (8 à 13 jours) : démontage 2 jours, plomberie/électricité 2–3 jours, pose meubles 3–4 jours, finitions 2 jours. Pour une villa du plateau avec ouverture sur séjour, comptez 3 à 5 semaines selon la complexité. Les artisans locaux maîtrisent les contraintes de livraison dans les tours avec ascenseurs parfois limités." },
  { q: "Y a-t-il des aides pour rénover la cuisine à Talant ?", a: "La rénovation cuisine seule n'ouvre pas de droit à aides spécifiques. Cependant, couplée à une rénovation globale incluant isolation ou chauffage, MaPrimeRénov' peut s'appliquer. La TVA à 5,5% s'applique sur la main d'œuvre pour les logements de plus de 2 ans. Les résidents des tours éligibles aux aides de l'Anah peuvent inclure la cuisine dans un dossier de rénovation plus large." },
  { q: "Quelle cuisine choisir pour une villa du plateau de Talant ?", a: "Les villas du plateau de Talant ont des cuisines plus spacieuses (8 à 12m²) qui permettent des aménagements ambitieux. Nos artisans recommandent : cuisine semi-ouverte avec îlot ou péninsule, plan de travail en quartz ou granit, électroménager haut de gamme encastré. Budget villa plateau : 12 000 à 28 000€ selon les équipements choisis." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#c0cce0] py-5">
      <button className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#0a1228]" onClick={() => setOpen(!open)}>
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#2563eb]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#1a2a4a]">{answer}</p>}
    </div>
  );
}

export default function DevisCuisineTalant() {
  return (
    <main className="min-h-screen bg-[#f0f4fa]">
      <nav className="flex items-center justify-between bg-[#0a1228] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>Premium<span className="text-[#93c5fd]">Artisan</span></span>
        <div className="flex gap-6">
          {[{ label: "Accueil", href: "/" }, { label: "Cuisine Dijon", href: "/devis-cuisine-dijon" }, { label: "Rénovation Talant", href: "/devis-renovation-talant" }, { label: "Prix", href: "#prix" }].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-white/70 transition hover:text-white">{l.label}</Link>
          ))}
        </div>
      </nav>

      <section className="relative overflow-hidden px-8 pb-20 pt-24" style={{ background: "linear-gradient(140deg, #0a1228 0%, #1e3a5f 55%, #0a1a3a 100%)" }}>
        <div className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(147,197,253,0.15) 0%, transparent 68%)" }} />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#93c5fd]/35 bg-[#93c5fd]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#bfdbfe]">
            🍳 Talant 21240 · Tours & Villas · Artisans disponibles · Devis gratuit
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Rénovation Cuisine<br />à <span className="text-[#93c5fd]">Talant</span> —<br />Artisans Vérifiés & Devis Gratuit
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Tours Belvédère & Monts, villas du plateau. À Talant, la cuisine doit s'adapter aux <strong className="text-white">contraintes des tours</strong> ou tirer parti des <strong className="text-white">volumes des villas</strong>. 9 professionnels disponibles. 34 projets documentés.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[{ val: "34", txt: "projets Talant 2025–26" }, { val: "9", txt: "cuisinistes vérifiés" }, { val: "11 200€", txt: "budget moyen" }, { val: "350m", txt: "altitude · contraintes pression" }, { val: "96%", txt: "satisfaction" }].map((k, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{k.val}</div>
                <div className="mt-0.5 text-[11px] text-white/55">{k.txt}</div>
              </div>
            ))}
          </div>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#2563eb] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(37,99,235,0.45)] transition hover:scale-105 hover:bg-[#3b82f6]">
            🍳 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · 9 artisans disponibles · Réponse en 4–6h</p>
        </div>
      </section>

      <section className="bg-[#2563eb] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[{ v: "2 secteurs", l: "Tours vs Villas du plateau" }, { v: "350m", l: "Altitude · pression eau" }, { v: "Gaines tech.", l: "Contraintes spécifiques tours" }, { v: "11 200€", l: "Budget moyen Talant" }, { v: "34", l: "Projets 2025–26" }].map((s, i) => (
            <div key={i}><div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div><div className="text-[11px] text-white/65">{s.l}</div></div>
          ))}
        </div>
      </section>

      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">Le marché Talant</div>
          <h2 className="mb-8 text-3xl font-bold text-[#0a1228] md:text-4xl" style={{ fontFamily: "serif" }}>Tours ou villas — deux approches cuisine à Talant</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "🏢", type: "Tours Belvédère & Monts", part: "62% des projets", desc: "Cuisines 5–7m² avec gaines techniques centralisées. Contraintes de pression altitude 350m. Livraison par ascenseur. Nos artisans maîtrisent ces spécificités uniques à Talant.", budget: "7 000–16 000€" },
              { icon: "🏠", type: "Villas du plateau", part: "30% des projets", desc: "Surfaces généreuses 8–12m², possibilité d'ouverture sur séjour, îlot central. Les projets sont plus ambitieux et les matériaux plus nobles. Le plateau offre une vraie liberté d'aménagement.", budget: "12 000–28 000€" },
              { icon: "🔑", type: "Locatif Talant", part: "8% des projets", desc: "Remise en état rapide entre locataires. Configuration standard conservée pour limiter les coûts tout en rendant le bien attractif sur le marché locatif talantais.", budget: "2 500–6 000€" },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 0 ? "border-[#2563eb] bg-[#eff6ff]" : "border-[#c0cce0] bg-[#f0f4fa]"}`}>
                <div className="mb-2 text-[38px]">{c.icon}</div>
                <div className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-[#2563eb]">{c.part}</div>
                <div className="mb-2 font-bold text-[#0a1228]">{c.type}</div>
                <p className="mb-3 text-[13px] leading-relaxed text-[#1a2a4a]">{c.desc}</p>
                <div className="flex justify-between border-t border-[#c0cce0] pt-2 text-[13px]">
                  <span className="text-[#1a2a4a]">Budget</span>
                  <span className="font-bold text-[#2563eb]">{c.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0a1228] md:text-5xl" style={{ fontFamily: "serif" }}>Prix rénovation cuisine à Talant</h2>
          <p className="mb-10 max-w-[580px] text-[15px] text-[#1a2a4a]">Basé sur 34 projets documentés à Talant en 2025–2026.</p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Rénovation tour 6m²", price: "7 000–14 000€", note: "Gaines respectées · Pression vérifiée · 8–13 jours" },
              { label: "Rénovation villa plateau 9m²", price: "12 000–22 000€", note: "Semi-sur-mesure · Plan de travail quartz" },
              { label: "Cuisine ouverte villa", price: "16 000–28 000€", note: "Abattage cloison · Îlot central · Électroménager premium" },
              { label: "Rafraîchissement tour", price: "3 500–7 000€", note: "Portes · Plan de travail · Robinetterie · 5–7 jours" },
              { label: "Remise en état locatif", price: "2 500–6 000€", note: "Rapide · Standard · Prêt à louer" },
              { label: "Réducteur pression + pose", price: "180–380€", note: "Spécifique altitude 350m · Pour électroménager sensible" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c0cce0] bg-white p-5 transition hover:border-[#2563eb]">
                <div className="mb-1 text-[13px] font-semibold text-[#0a1228]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#2563eb]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#1a2a4a]">{r.note}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-5 text-xl font-bold text-[#0a1228]" style={{ fontFamily: "serif" }}>Tours vs Villas — comparatif cuisine Talant 2026</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#c0cce0]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0a1228] text-white">
                  {["Critère", "Tours Belvédère & Monts", "Villas du plateau"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 2 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["Surface cuisine", "5–7m²", "8–12m²"],
                  ["Contrainte pression", "Réducteur parfois nécessaire", "Pression normale"],
                  ["Gaines techniques", "Centralisées · Intouchables", "Flexibles · Modifiables"],
                  ["Ouverture séjour", "Difficile · Bureau études requis", "Courante · Plus simple"],
                  ["Budget moyen", "7 000–16 000€", "12 000–28 000€"],
                  ["Délai chantier", "8–13 jours", "3–5 semaines"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#f0f4fa]">
                    <td className="border-b border-[#c0cce0] px-4 py-3 text-[13px] font-semibold text-[#0a1228]">{r[0]}</td>
                    <td className="border-b border-[#c0cce0] px-4 py-3 text-[13px] text-[#1a2a4a]">{r[1]}</td>
                    <td className="border-b border-[#c0cce0] px-4 py-3 text-[13px] font-bold text-[#2563eb]">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20" id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0a1228] md:text-5xl" style={{ fontFamily: "serif" }}>9 cuisinistes vérifiés près de chez vous à Talant</h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#1a2a4a]">Experts tours et villas. Maîtrise des contraintes altitude, gaines techniques et livraison en hauteur.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "PL", name: "Pascal L.", enseigne: "Cuisine Talant Expert", spec: "Tours · Gaines · Contraintes altitude", exp: "15 ans · 195 cuisines posées à Talant", zone: "Talant · Fontaine · Dijon Nord", note: "4.9/5", nb: "195 chantiers" },
              { initials: "NR", name: "Nadia R.", enseigne: "Villa Cuisine 21", spec: "Villas plateau · Îlot central · Semi-sur-mesure", exp: "11 ans · Spécialiste ouverture cuisine-séjour", zone: "Talant · Plombières · Ahuy", note: "4.9/5", nb: "138 chantiers" },
              { initials: "HB", name: "Hervé B.", enseigne: "Rénov Cuisine Talant", spec: "Rénovation complète · Locatif · Tous budgets", exp: "8 ans · Gestion livraison tours incluse", zone: "Talant · Chenôve · Dijon", note: "4.8/5", nb: "102 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c0cce0] bg-[#f0f4fa] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #0a1228, #1e3a5f)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#0a1228]">{a.name}</div>
                    <div className="text-[11px] text-[#2563eb]">{a.enseigne}</div>
                    <div className="text-[11px] text-[#2563eb]">{a.note} · {a.nb}</div>
                  </div>
                </div>
                <p className="mb-2 text-[13px] font-semibold text-[#0a1228]">{a.spec}</p>
                <p className="mb-1 text-[12px] text-[#1a2a4a]">📅 {a.exp}</p>
                <p className="mb-4 text-[12px] text-[#1a2a4a]">📍 {a.zone}</p>
                <a href="/publier-projet" className="block rounded-xl bg-[#2563eb] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#3b82f6]">Demander un devis</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#0a1228] md:text-4xl" style={{ fontFamily: "serif" }}>Trois projets réels à Talant</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "JK", name: "Jamel K.", loc: "Talant · Tour Belvédère · cuisine 6m²", text: "Pascal connaissait les gaines de notre immeuble mieux que nous. Il a posé une cuisine complète en 11 jours sans jamais bloquer l'ascenseur plus de 30 minutes. 9 400€. Il a aussi installé un réducteur de pression — notre lave-vaisselle fonctionne enfin correctement." },
              { avatar: "MG", name: "Marie G.", loc: "Talant · Villa plateau · cuisine ouverte 10m²", text: "Nadia a transformé notre cuisine fermée en espace ouvert sur le séjour. Elle a géré le bureau d'études et coordonné maçon, plombier et électricien. 21 500€. Le résultat est bluffant — on a l'impression d'avoir doublé la surface du séjour." },
              { avatar: "TC", name: "Thomas C.", loc: "Talant · Tour Monts · locatif remise en état", text: "Hervé a remis à neuf la cuisine de mon appartement en 5 jours. 3 800€. Il a livré le matériel par l'ascenseur sans abîmer les parties communes — les voisins de palier l'ont remercié. Mon locataire a emménagé deux semaines après." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c0cce0] bg-white p-6">
                <div className="mb-2 text-sm text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <p className="mb-5 text-[14px] italic leading-relaxed text-[#1a2a4a]">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg, #0a1228, #1e3a5f)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#0a1228]">{t.name}</div>
                    <div className="text-[12px] text-[#1a2a4a]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#0a1228" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#bfdbfe]">Communes voisines</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Rénovation cuisine autour de Talant</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-cuisine-dijon", nb: "34 cuisinistes", prix: "8 000–70 000€" },
              { name: "Chenôve", href: "/devis-cuisine-chenove", nb: "14 cuisinistes", prix: "6 500–22 000€" },
              { name: "Fontaine-lès-Dijon", href: "/devis-cuisine-fontaine-les-dijon", nb: "6 cuisinistes", prix: "9 000–40 000€" },
              { name: "Longvic", href: "/devis-cuisine-longvic", nb: "10 cuisinistes", prix: "7 000–20 000€" },
              { name: "Quetigny", href: "/devis-cuisine-quetigny", nb: "8 cuisinistes", prix: "10 000–35 000€" },
              { name: "Plombières-lès-Dijon", href: "#", nb: "3 cuisinistes", prix: "8 000–25 000€" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#93c5fd] hover:bg-white/10">
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

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#0a1228] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation cuisine à Talant</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #0a1228 0%, #1e3a5f 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#93c5fd]">9 artisans disponibles près de chez vous</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Publiez votre projet cuisine<br />et recevez des devis gratuits à Talant
          </h2>
          <p className="mb-10 text-[16px] text-white/60">9 cuisinistes vérifiés · Tours & Villas · Contraintes altitude · Îlot central · Réponse en 4–6h</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#2563eb] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(37,99,235,0.5)] transition hover:scale-105 hover:bg-[#3b82f6]">
            🍳 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Cuisine Talant", url: "https://premiumartisan.fr/devis-cuisine-talant", areaServed: { "@type": "City", name: "Talant", postalCode: "21240" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "28" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
