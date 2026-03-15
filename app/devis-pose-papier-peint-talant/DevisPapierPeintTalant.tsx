// Papier Peint Talant component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Quel papier peint tient vraiment dans les appartements de Talant ?",
    a: "Les tours des quartiers Belvédère et Monts sont réputées pour leurs murs froids en hiver. Quand l'air chaud intérieur rencontre ces parois froides, la condensation fragilise les revêtements légers. Nos poseurs recommandent exclusivement des intissés de 180 à 250g/m² ou des vinyles épais. Ces références absorbent les légères variations d'humidité sans se décoller. Les papiers traditionnels de 95g/m² ne conviennent pas à Talant.",
  },
  {
    q: "Combien coûte la pose dans une tour à Talant par rapport à une maison ?",
    a: "Dans les tours des Monts et Belvédère, la pose revient 12 à 18% plus cher qu'en maison individuelle. La raison : les poseurs perdent du temps à gérer le monte-charge, à négocier les couloirs étroits avec les rouleaux, et à manœuvrer dans des pièces parfois moins spacieuses. Pour un appartement de 65m² en tour, comptez 1 900€ à 4 100€ fourniture + pose.",
  },
  {
    q: "Peut-on coller directement sur l'ancien papier peint à Talant ?",
    a: "C'est possible uniquement si le papier existant est parfaitement plat, sans décollements ni bulles, et ne dépasse pas une seule couche. Dans la réalité des tours talantaises, on trouve souvent 2 à 4 couches superposées depuis les années 70. Dans ce cas, le décollement complet est obligatoire avant toute repose. Nos artisans font systématiquement un test d'adhérence avant de se prononcer.",
  },
  {
    q: "Les villas du plateau ont-elles des contraintes particulières pour la pose ?",
    a: "Les maisons individuelles du plateau talantais ont rarement des problèmes d'humidité. En revanche, leurs séjours ouverts avec parfois 4 à 5 mètres de hauteur sous plafond nécessitent un échafaudage pour la pose en hauteur. Nos poseurs spécialisés plateau disposent de tout le matériel nécessaire et incluent ce surcoût dans leur devis.",
  },
  {
    q: "Quels motifs de papier peint sont tendance à Talant en 2026 ?",
    a: "Dans les tours, les habitants optent pour des intissés unis texturés ou à petits motifs géométriques discrets. Dans les villas du plateau, les panoramiques nature (forêt de Bourgogne, champs, abstrait organique) explosent. Ces formats sur mesure habillent une paroi entière du séjour et créent un effet spectaculaire très apprécié.",
  },
  {
    q: "Combien de temps à l'avance faut-il contacter un poseur à Talant ?",
    a: "Les 9 poseurs de notre réseau à Talant ont un délai moyen de 2 à 3 semaines en période calme et de 4 à 6 semaines au printemps. Pour une pose urgente (déménagement, vente), précisez-le dans votre projet — certains artisans acceptent des créneaux express avec un léger supplément de 15 à 20%.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#ddd0e8] py-5">
      <button
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#1a0f2a]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#7c3aed]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#4a2a6a]">{answer}</p>}
    </div>
  );
}

export default function DevisPapierPeintTalant() {
  return (
    <main className="min-h-screen bg-[#f8f4fd]">

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#1a0f2a] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#c084fc]">Artisan</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "Papier peint Dijon", href: "/devis-pose-papier-peint-dijon" },
            { label: "Peinture Talant", href: "/devis-peinture-talant" },
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
        style={{ background: "linear-gradient(140deg, #1a0f2a 0%, #3b0f8a 55%, #1a0a40 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(192,132,252,0.18) 0%, transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c084fc]/35 bg-[#c084fc]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#e9d5ff]">
            🏔️ Talant 21240 · 350 m d'altitude · Spécialistes tours & villas
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Papier Peint à Talant :<br />
            <span className="text-[#c084fc]">La Bonne Épaisseur</span><br />
            Fait Toute la Différence
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            À 350 m d'altitude, les murs froids des tours Belvédère et Monts décollent les papiers légers en quelques mois. Nos poseurs sélectionnent uniquement des <strong className="text-white">intissés 180–250g/m²</strong> adaptés à votre logement. 84 projets analysés à Talant.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[
              { val: "84", txt: "projets Talant 2025–26" },
              { val: "9", txt: "poseurs vérifiés" },
              { val: "20–50€", txt: "MO /m²" },
              { val: "94%", txt: "satisfaction" },
              { val: "+12–18%", txt: "surcoût tours vs maisons" },
            ].map((k, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{k.val}</div>
                <div className="mt-0.5 text-[11px] text-white/55">{k.txt}</div>
              </div>
            ))}
          </div>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#7c3aed] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(124,58,237,0.45)] transition hover:scale-105 hover:bg-[#8b5cf6]"
          >
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · Réponse en 4–7h · Spécialistes altitude</p>
        </div>
      </section>

      {/* BANDEAU */}
      <section className="bg-[#7c3aed] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[
            { v: "62%", l: "Tours Belvédère & Monts" },
            { v: "38%", l: "Maisons plateau" },
            { v: "180–250g", l: "Épaisseur min. recommandée" },
            { v: "8–15€", l: "Décollement /m²" },
            { v: "3 sem.", l: "Délai moyen disponibilité" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div>
              <div className="text-[11px] text-white/65">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLÈME ALTITUDE */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#7c3aed]">Ce que personne ne vous dit</div>
          <h2 className="mb-8 text-3xl font-bold text-[#1a0f2a] md:text-4xl" style={{ fontFamily: "serif" }}>
            Pourquoi le papier peint se décolle<br />dans les tours de Talant
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "🌡️", titre: "Ponts thermiques", texte: "Les murs extérieurs des tours années 70 sont mal isolés. En hiver, la paroi atteint 8–12°C côté intérieur. La condensation fragilise la colle des papiers légers en quelques semaines." },
              { icon: "💧", titre: "Humidité altitude", texte: "À 350m, l'air est plus humide qu'en plaine. Les appartements peu ventilés des tours accumulent cette humidité sur les murs froids — un ennemi direct des papiers de moins de 150g/m²." },
              { icon: "✅", titre: "La solution", texte: "Un intissé de 180 à 250g/m² absorbe les légères variations d'humidité sans se décoller. Associé à un apprêt d'accrochage sur béton, il tient 8 à 12 ans sans intervention." },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 2 ? "border-[#7c3aed] bg-[#faf5ff]" : "border-[#ddd0e8] bg-[#f8f4fd]"}`}>
                <div className="mb-3 text-[38px]">{c.icon}</div>
                <div className="mb-2 font-bold text-[#1a0f2a]">{c.titre}</div>
                <p className="text-[13px] leading-relaxed text-[#4a2a6a]">{c.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#7c3aed]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1a0f2a] md:text-5xl" style={{ fontFamily: "serif" }}>
            Ce que ça coûte vraiment<br />à Talant
          </h2>
          <p className="mb-12 max-w-[580px] text-[15px] text-[#4a2a6a]">
            Tarifs constatés sur 84 projets à Talant. La colonne <strong>Tours</strong> inclut le surcoût logistique monte-charge.
          </p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Chambre 12m² — tour", price: "640–1 350€", note: "Intissé 200g anti-humidité · Murs béton" },
              { label: "Séjour 22m² — tour", price: "1 000–2 200€", note: "Intissé épais · Logistique incluse" },
              { label: "Paroi panoramique — villa", price: "520–1 500€", note: "Format 2,5×4m · Motif nature Bourgogne" },
              { label: "Couloir 7m² — tour", price: "330–780€", note: "Vinyle résistant · Passage quotidien" },
              { label: "Décollement couches", price: "8–15€/m²", note: "Humide (trad.) ou à sec (intissé)" },
              { label: "Apprêt béton", price: "6–10€/m²", note: "Obligatoire murs béton brut Talant" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#ddd0e8] bg-white p-5 transition hover:border-[#7c3aed]">
                <div className="mb-1 text-[13px] font-semibold text-[#1a0f2a]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#7c3aed]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#4a2a6a]">{r.note}</div>
              </div>
            ))}
          </div>
          <h3 className="mb-5 text-xl font-bold text-[#1a0f2a]" style={{ fontFamily: "serif" }}>Tours vs Maisons — comparatif Talant 2026</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#ddd0e8]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1a0f2a] text-white">
                  {["Surface", "Tour (intissé 200g)", "Villa (intissé premium)", "Durée"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["45m²", "1 300–2 700€", "1 100–2 400€", "2–3 j."],
                  ["65m²", "1 900–4 100€", "1 700–3 700€", "3–5 j."],
                  ["85m²", "2 500–5 300€", "2 200–4 800€", "4–6 j."],
                  ["110m²", "3 200–6 900€", "2 800–6 200€", "5–8 j."],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#f8f4fd]">
                    {r.map((cell, j) => (
                      <td key={j} className={`border-b border-[#ddd0e8] px-4 py-3.5 text-sm ${j === 1 || j === 2 ? "font-bold text-[#7c3aed]" : "font-semibold text-[#1a0f2a]"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] text-[#4a2a6a]">* Tours : surcoût +12–18% logistique monte-charge inclus.</p>
        </div>
      </section>

      {/* ARTISANS */}
      <section className="bg-white px-8 py-20" id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#7c3aed]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1a0f2a] md:text-5xl" style={{ fontFamily: "serif" }}>
            9 poseurs vérifiés<br />à Talant
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#4a2a6a]">Évalués sur 5 critères : qualité des raccords, propreté de chantier, délais, gestion béton, avis clients.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "OC", name: "Olivier C.", enseigne: "Talant Décoration Murale", spec: "Intissé anti-humidité · Béton · Tours", exp: "16 ans · Expert ponts thermiques", zone: "Talant · Fontaine · Dijon Nord", note: "4.9/5", nb: "172 chantiers" },
              { initials: "LM", name: "Laura M.", enseigne: "Plateau Papiers & Panoramiques", spec: "Villas plateau · Formats panoramiques", exp: "10 ans · Spécialiste pose en hauteur", zone: "Talant plateau · Ahuy · Daix", note: "4.9/5", nb: "118 chantiers" },
              { initials: "YB", name: "Yassine B.", enseigne: "Multi Revêtements 21", spec: "Vinyle · Toile de verre · Décollement", exp: "8 ans · Rénovation complète support", zone: "Talant · Dijon · Chenôve", note: "4.8/5", nb: "76 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#ddd0e8] bg-[#f8f4fd] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #1a0f2a, #5b21b6)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#1a0f2a]">{a.name}</div>
                    <div className="text-[11px] text-[#7c3aed]">{a.enseigne}</div>
                    <div className="text-[11px] text-[#7c3aed]">{a.note} · {a.nb}</div>
                  </div>
                </div>
                <p className="mb-2 text-[13px] font-semibold text-[#1a0f2a]">{a.spec}</p>
                <p className="mb-1 text-[12px] text-[#4a2a6a]">📅 {a.exp}</p>
                <p className="mb-4 text-[12px] text-[#4a2a6a]">📍 {a.zone}</p>
                <a href="/publier-projet" className="block rounded-xl bg-[#7c3aed] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#8b5cf6]">
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#7c3aed]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#1a0f2a] md:text-4xl" style={{ fontFamily: "serif" }}>Trois projets réels à Talant</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "ST", name: "Sylvie T.", loc: "Tour Belvédère · 14e étage · 64m²", text: "Après deux tentatives ratées avec des papiers bas de gamme qui se décollaient sur les murs froids, Olivier m'a conseillé un intissé 220g avec apprêt béton. Ça fait maintenant 18 mois — impeccable. Jamais eu ça avant." },
              { avatar: "PD", name: "Pascal D.", loc: "Villa plateau · séjour 32m²", text: "Laura a posé un panoramique forêt de Bourgogne sur toute la longueur de notre séjour. 6 mètres de large, 2,60m de hauteur. Le résultat est spectaculaire. Les amis pensent que c'est une photo collée sur le mur. Aucun raccord visible." },
              { avatar: "ZM", name: "Zohra M.", loc: "Quartier des Monts · 4 couches à décaper", text: "Yassine a décollé 4 couches de papier depuis les années 70 en deux jours. Résultat net, sans dégât aux murs. La repose en intissé était parfaite. J'avais peur du chantier — il a tout géré avec une propreté irréprochable." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#ddd0e8] bg-white p-6">
                <div className="mb-2 text-sm text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <p className="mb-5 text-[14px] italic leading-relaxed text-[#4a2a6a]">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg, #1a0f2a, #5b21b6)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#1a0f2a]">{t.name}</div>
                    <div className="text-[12px] text-[#4a2a6a]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNES */}
      <section className="px-8 py-20" style={{ background: "#1a0f2a" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#e9d5ff]">Alentours</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Papier peint autour de Talant</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-pose-papier-peint-dijon", nb: "22 poseurs", prix: "20–55€/m²" },
              { name: "Chenôve", href: "/devis-pose-papier-peint-chenove", nb: "11 poseurs", prix: "18–48€/m²" },
              { name: "Fontaine-lès-Dijon", href: "/devis-pose-papier-peint-fontaine-les-dijon", nb: "4 poseurs", prix: "22–58€/m²" },
              { name: "Longvic", href: "/devis-pose-papier-peint-longvic", nb: "5 poseurs", prix: "18–46€/m²" },
              { name: "Quetigny", href: "/devis-pose-papier-peint-quetigny", nb: "5 poseurs", prix: "22–55€/m²" },
              { name: "Ahuy", href: "#", nb: "3 poseurs", prix: "20–50€/m²" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#c084fc] hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">{q.nb}</span>
                  <span className="font-bold text-[#e9d5ff]">{q.prix}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#7c3aed]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#1a0f2a] md:text-4xl" style={{ fontFamily: "serif" }}>Les vraies questions<br />sur le papier peint à Talant</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #1a0f2a 0%, #3b0f8a 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c084fc]">Prêt à démarrer ?</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Recevez vos devis papier peint<br />en moins de 7h à Talant
          </h2>
          <p className="mb-10 text-[16px] text-white/60">9 poseurs vérifiés · Intissé 180–250g recommandé altitude · Tours & villas · Sans engagement</p>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#7c3aed] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(124,58,237,0.5)] transition hover:scale-105 hover:bg-[#8b5cf6]"
          >
            🎨 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Papier Peint Talant", url: "https://premiumartisan.fr/devis-pose-papier-peint-talant", areaServed: { "@type": "City", name: "Talant", postalCode: "21240" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "71" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
