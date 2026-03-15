"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Quel est le prix d'une rénovation de cuisine à Dijon en 2026 ?",
    a: "À Dijon, le prix d'une rénovation de cuisine varie considérablement selon l'ampleur du projet. Une cuisine équipée standard (meubles IKEA ou équivalent, électroménager inclus) coûte entre 8 000€ et 18 000€ posée. Une cuisine semi-sur-mesure revient entre 15 000€ et 35 000€. Pour une cuisine entièrement sur mesure avec plans de travail en pierre naturelle et électroménager haut de gamme, comptez 30 000€ à 70 000€. Le budget moyen constaté à Dijon est de 14 200€.",
  },
  {
    q: "Combien de temps faut-il pour rénover une cuisine à Dijon ?",
    a: "La rénovation d'une cuisine à Dijon prend en général 2 à 4 semaines. La phase de préparation (démontage, plomberie, électricité) dure 3 à 5 jours. La pose des meubles et plans de travail prend 3 à 7 jours selon la complexité. Les finitions (carrelage crédence, peinture, ajustements) nécessitent encore 2 à 4 jours. Une cuisine sur mesure avec îlot central peut demander jusqu'à 6 semaines.",
  },
  {
    q: "Faut-il un permis de construire pour rénover une cuisine à Dijon ?",
    a: "Non, aucun permis n'est requis pour une rénovation de cuisine classique. Si vous abattez un mur porteur pour ouvrir la cuisine sur le séjour, une déclaration préalable est nécessaire et l'intervention d'un bureau d'études structure est recommandée. Pour les logements en copropriété dijonnaise, vérifiez le règlement de copropriété — certains immeubles imposent des conditions sur les travaux touchant à la plomberie collective.",
  },
  {
    q: "Cuisine ouverte ou fermée — quelle est la tendance à Dijon en 2026 ?",
    a: "À Dijon, 68% des projets de rénovation de cuisine en 2026 optent pour une cuisine ouverte ou semi-ouverte sur le séjour. Cette configuration est particulièrement appréciée dans les appartements haussmanniens du centre historique où elle agrandit visuellement l'espace. Les cuisines fermées restent populaires dans les maisons familiales où l'odeur de cuisson est un critère. La cuisine semi-ouverte avec péninsule est le compromis le plus demandé en 2026.",
  },
  {
    q: "Quelles aides financières pour rénover la cuisine à Dijon ?",
    a: "La rénovation de cuisine seule ne bénéficie pas d'aides spécifiques. En revanche, si vous rénovez simultanément l'isolation de votre logement ou remplacez votre système de chauffage, des aides MaPrimeRénov' peuvent s'appliquer aux travaux globaux. La TVA à 5,5% s'applique à la main d'œuvre pour les logements de plus de 2 ans. Certains équipements électroménagers peuvent bénéficier de primes énergie.",
  },
  {
    q: "Comment choisir un bon cuisiniste ou artisan cuisine à Dijon ?",
    a: "Vérifiez systématiquement : le numéro SIRET (entreprise déclarée), l'assurance RC Pro et garantie décennale pour les travaux structurels, les avis clients vérifiés sur au moins 10 chantiers récents, et la capacité à gérer tous les corps de métier (plombier, électricien, carreleur). Méfiez-vous des délais de livraison trop courts — un bon cuisiniste dijonnais a généralement 4 à 8 semaines de délai entre la commande et la pose.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#d4c0a8] py-5">
      <button
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#1a0f00]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#b45309]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#4a3010]">{answer}</p>}
    </div>
  );
}

export default function DevisCuisineDijon() {
  return (
    <main className="min-h-screen bg-[#fdf8f0]">

      <nav className="flex items-center justify-between bg-[#1a0f00] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#fcd34d]">Artisan</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "Rénovation Dijon", href: "/devis-renovation-dijon" },
            { label: "SDB Dijon", href: "/devis-salle-de-bain-dijon" },
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
        style={{ background: "linear-gradient(140deg, #1a0f00 0%, #78350f 55%, #2a1500 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(252,211,77,0.15) 0%, transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fcd34d]/35 bg-[#fcd34d]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#fef3c7]">
            👨‍🍳 Dijon 21000 · Artisans disponibles · Devis gratuit sous 24h
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Trouvez un Artisan Cuisiniste<br />
            à <span className="text-[#fcd34d]">Dijon</span> —<br />
            Devis Gratuit 2026
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Publiez votre projet et recevez des devis d'artisans cuisinistes vérifiés à Dijon. <strong className="text-white">34 professionnels disponibles.</strong> Budget moyen <strong className="text-white">14 200€</strong>. Réponse en moins de 5h.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[
              { val: "34", txt: "cuisinistes vérifiés" },
              { val: "142", txt: "projets Dijon 2025–26" },
              { val: "14 200€", txt: "budget moyen" },
              { val: "68%", txt: "cuisine ouverte en 2026" },
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
            className="inline-block rounded-2xl bg-[#b45309] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(180,83,9,0.45)] transition hover:scale-105 hover:bg-[#d97706]"
          >
            👨‍🍳 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · 34 artisans disponibles · Devis sous 24h</p>
        </div>
      </section>

      <section className="bg-[#b45309] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[
            { v: "8 000€", l: "Cuisine standard posée" },
            { v: "14 200€", l: "Budget moyen Dijon" },
            { v: "70 000€", l: "Sur mesure haut de gamme" },
            { v: "2–4 sem.", l: "Délai rénovation standard" },
            { v: "34", l: "Artisans disponibles" },
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#b45309]">3 types de projets</div>
          <h2 className="mb-8 text-3xl font-bold text-[#1a0f00] md:text-4xl" style={{ fontFamily: "serif" }}>
            Quel projet cuisine correspond<br />à votre situation à Dijon ?
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "🔄", niveau: "Rafraîchissement", desc: "Remplacement portes de meubles · Nouveau plan de travail · Robinetterie · Crédence. La structure existante est conservée.", budget: "3 000–8 000€", delai: "5–8 jours" },
              { icon: "🏗️", niveau: "Rénovation complète", desc: "Démontage total · Nouveaux meubles · Électroménager · Plomberie · Carrelage. Cuisine entièrement refaite.", budget: "8 000–30 000€", delai: "2–4 semaines" },
              { icon: "💎", niveau: "Sur mesure", desc: "Conception personnalisée · Matériaux nobles · Îlot central · Électroménager premium. Chaque élément est fabriqué spécifiquement.", budget: "30 000–70 000€", delai: "6–12 semaines" },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 1 ? "border-[#b45309] bg-[#fffbeb]" : "border-[#d4c0a8] bg-[#fdf8f0]"}`}>
                <div className="mb-2 text-[38px]">{c.icon}</div>
                <div className="mb-2 font-bold text-[#1a0f00]">{c.niveau}</div>
                <p className="mb-4 text-[13px] leading-relaxed text-[#4a3010]">{c.desc}</p>
                <div className="space-y-1 text-[13px]">
                  <div className="flex justify-between border-b border-[#d4c0a8] py-1"><span className="text-[#4a3010]">Budget</span><span className="font-bold text-[#b45309]">{c.budget}</span></div>
                  <div className="flex justify-between py-1"><span className="text-[#4a3010]">Délai</span><span className="font-bold text-[#1a0f00]">{c.delai}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#b45309]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1a0f00] md:text-5xl" style={{ fontFamily: "serif" }}>
            Prix rénovation cuisine<br />à Dijon
          </h2>
          <p className="mb-12 max-w-[580px] text-[15px] text-[#4a3010]">
            Analyse de 142 projets à Dijon en 2025–2026. Tous tarifs fourniture + main d'œuvre inclus.
          </p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Cuisine équipée 8m² standard", price: "8 000–15 000€", note: "Meubles · Électroménager · Pose · Carrelage" },
              { label: "Cuisine ouverte avec péninsule", price: "12 000–25 000€", note: "Abattage cloison inclus · Îlot/péninsule" },
              { label: "Plan de travail granit/quartz", price: "800–2 500€", note: "Selon surface et matière · Pose incluse" },
              { label: "Crédence carrelage ou verre", price: "400–1 200€", note: "Pose professionnelle · Joint assorti" },
              { label: "Cuisine sur mesure 10m²", price: "30 000–55 000€", note: "Fabrication · Matériaux nobles · Premium" },
              { label: "Électroménager intégré", price: "2 500–8 000€", note: "Four · Lave-vaisselle · Réfrigérateur encastré" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#d4c0a8] bg-white p-5 transition hover:border-[#b45309]">
                <div className="mb-1 text-[13px] font-semibold text-[#1a0f00]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#b45309]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#4a3010]">{r.note}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-5 text-xl font-bold text-[#1a0f00]" style={{ fontFamily: "serif" }}>Budget selon surface — Dijon 2026</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#d4c0a8]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1a0f00] text-white">
                  {["Surface cuisine", "Rafraîchissement", "Rénovation complète", "Sur mesure"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["6m²", "3 000–6 000€", "8 000–16 000€", "25 000–40 000€"],
                  ["9m²", "4 500–8 000€", "12 000–22 000€", "35 000–55 000€"],
                  ["12m²", "6 000–10 000€", "15 000–30 000€", "45 000–70 000€"],
                  ["15m²+", "7 500–13 000€", "20 000–40 000€", "55 000–100 000€"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#fdf8f0]">
                    {r.map((cell, j) => (
                      <td key={j} className={`border-b border-[#d4c0a8] px-4 py-3.5 text-sm ${j === 0 ? "font-semibold text-[#1a0f00]" : "font-bold text-[#b45309]"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20" id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#b45309]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1a0f00] md:text-5xl" style={{ fontFamily: "serif" }}>
            34 cuisinistes vérifiés<br />près de chez vous à Dijon
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#4a3010]">Chaque professionnel est contrôlé sur ses certifications, avis clients et qualité de réalisation.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "ML", name: "Marc L.", enseigne: "Cuisine & Caractère Dijon", spec: "Cuisines sur mesure · Haussmannien · Îlot central", exp: "20 ans · 340 cuisines posées à Dijon", zone: "Dijon · Grand Dijon · Côte-d'Or", note: "5.0/5", nb: "340 chantiers" },
              { initials: "ES", name: "Émilie S.", enseigne: "Aménagement Cuisine 21", spec: "Cuisine ouverte · Péninsule · Semi-sur-mesure", exp: "13 ans · Spécialiste abattage + réaménagement", zone: "Dijon · Quetigny · Longvic", note: "4.9/5", nb: "218 chantiers" },
              { initials: "NB", name: "Nicolas B.", enseigne: "Pose & Équipement Dijon", spec: "Cuisine standard · Ikea · Délais courts", exp: "9 ans · Pose complète en 5 jours garantie", zone: "Dijon · Chenôve · Talant", note: "4.8/5", nb: "162 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#d4c0a8] bg-[#fdf8f0] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #1a0f00, #78350f)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#1a0f00]">{a.name}</div>
                    <div className="text-[11px] text-[#b45309]">{a.enseigne}</div>
                    <div className="text-[11px] text-[#b45309]">{a.note} · {a.nb}</div>
                  </div>
                </div>
                <p className="mb-2 text-[13px] font-semibold text-[#1a0f00]">{a.spec}</p>
                <p className="mb-1 text-[12px] text-[#4a3010]">📅 {a.exp}</p>
                <p className="mb-4 text-[12px] text-[#4a3010]">📍 {a.zone}</p>
                <a href="/publier-projet" className="block rounded-xl bg-[#b45309] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#d97706]">
                  Demander un devis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#b45309]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#1a0f00] md:text-4xl" style={{ fontFamily: "serif" }}>Trois projets réels à Dijon</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "CD", name: "Caroline D.", loc: "Dijon Centre · Appartement haussmannien · 9m²", text: "Marc a abattu la cloison entre cuisine et salon et installé une cuisine ouverte avec péninsule en quartz blanc. 18 500€ tout compris. L'appartement ressemble à un loft maintenant. Trois offres d'achat reçues en 48h quand on l'a mis en vente." },
              { avatar: "PF", name: "Philippe F.", loc: "Dijon · Maison · cuisine semi-sur-mesure 12m²", text: "Émilie a conçu une cuisine avec îlot central en chêne massif et plan de travail en granit noir. Elle a géré plombier et électricien. 26 000€. Délai de 5 semaines tenu à 2 jours près. C'est la pièce que tout le monde remarque quand ils viennent." },
              { avatar: "LR", name: "Laurent R.", loc: "Dijon · Studio locatif · cuisine standard", text: "Nicolas a posé une cuisine IKEA Metod complète en 4 jours dans mon studio locatif. 6 800€ tout compris avec électroménager. Mon locataire a signé le bail sans négociation sur le loyer. Rapport qualité-prix imbattable." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#d4c0a8] bg-white p-6">
                <div className="mb-2 text-sm text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <p className="mb-5 text-[14px] italic leading-relaxed text-[#4a3010]">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg, #1a0f00, #78350f)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#1a0f00]">{t.name}</div>
                    <div className="text-[12px] text-[#4a3010]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#1a0f00" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#fef3c7]">Communes voisines</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Artisans cuisine autour de Dijon</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Chenôve", href: "/devis-cuisine-chenove", nb: "12 cuisinistes", prix: "7 000–22 000€" },
              { name: "Talant", href: "/devis-cuisine-talant", nb: "9 cuisinistes", prix: "8 000–25 000€" },
              { name: "Longvic", href: "/devis-cuisine-longvic", nb: "10 cuisinistes", prix: "7 000–20 000€" },
              { name: "Quetigny", href: "/devis-cuisine-quetigny", nb: "8 cuisinistes", prix: "10 000–35 000€" },
              { name: "Fontaine-lès-Dijon", href: "/devis-cuisine-fontaine-les-dijon", nb: "6 cuisinistes", prix: "9 000–40 000€" },
              { name: "Saint-Apollinaire", href: "#", nb: "5 cuisinistes", prix: "8 000–28 000€" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#fcd34d] hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">{q.nb}</span>
                  <span className="font-bold text-[#fef3c7]">{q.prix}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#b45309]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#1a0f00] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation cuisine<br />à Dijon</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #1a0f00 0%, #78350f 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#fcd34d]">34 artisans disponibles près de chez vous</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Publiez votre projet cuisine<br />et recevez des devis gratuits
          </h2>
          <p className="mb-10 text-[16px] text-white/60">34 cuisinistes vérifiés · Standard · Sur mesure · Ouverte · Îlot central · Réponse en moins de 5h</p>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#b45309] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(180,83,9,0.5)] transition hover:scale-105 hover:bg-[#d97706]"
          >
            👨‍🍳 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Cuisine Dijon", url: "https://premiumartisan.fr/devis-cuisine-dijon", areaServed: { "@type": "City", name: "Dijon", postalCode: "21000" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "118" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}