// Papier Peint Longvic component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Quel papier peint choisir pour un appartement locatif à Longvic ?",
    a: "Pour un bien locatif à Longvic, nos artisans recommandent systématiquement un intissé vinyle lavable entre 150 et 180g/m². Ce type de revêtement supporte le nettoyage répété, résiste aux chocs légers et se retire facilement à sec entre deux locataires. Évitez les papiers fins ou les motifs trop tendance qui limitent l'attrait du bien. Un coloris neutre (blanc cassé, gris clair) avec légère texture maximise les chances de location rapide.",
  },
  {
    q: "Quel est le prix de la pose de papier peint à Longvic en 2026 ?",
    a: "À Longvic, le prix de la main d'œuvre varie entre 18 et 46€/m² — parmi les plus bas de la métropole dijonnaise. La forte densité d'artisans liée à la zone d'activités génère une concurrence qui maintient les tarifs compétitifs. Pour un appartement locatif de 55m², la pose complète avec intissé vinyle lavable revient entre 1 500€ et 3 000€.",
  },
  {
    q: "Le papier peint aide-t-il à réduire le bruit de l'aéroport à Longvic ?",
    a: "Oui, partiellement. Un papier peint épais (250g/m²+) ou une toile de verre à peindre améliore très légèrement l'isolation acoustique — environ 1 à 2 dB sur les hautes fréquences. Ce n'est pas une solution suffisante seule face aux nuisances de l'aéroport, mais combiné aux fenêtres acoustiques éligibles à l'aide TNSA, le papier peint épais compète utilement. Pour une réelle atténuation sonore, priorisez le remplacement des menuiseries.",
  },
  {
    q: "Combien de temps dure la pose dans les logements sociaux de Longvic ?",
    a: "Les appartements des barres HLM de Longvic (secteur Combe et zone sud) ont des configurations similaires à Chenôve : murs béton, pièces standardisées. La pose va vite dans ce cas — un appartement de 55m² en configuration classique prend 2 à 3 jours. Si des couches anciennes sont à décaper, comptez 1 jour supplémentaire.",
  },
  {
    q: "Peut-on poser du papier peint dans un local commercial de la zone d'activités ?",
    a: "Oui, certains commerces et bureaux de la zone d'activités de Longvic utilisent le papier peint ou la toile de verre pour leurs espaces d'accueil et salles de réunion. La toile de verre à peindre est particulièrement adaptée aux locaux professionnels : ultra-résistante, lessivable, et qui se repeint facilement entre deux locataires. Nos artisans longvicois interviennent aussi bien en résidentiel qu'en tertiaire.",
  },
  {
    q: "Y a-t-il un intérêt à tapisser avant une mise en vente à Longvic ?",
    a: "Oui, clairement. Un appartement rafraîchi avec un intissé neutre se vend en moyenne 8 à 14% plus cher qu'un bien avec des murs tachés ou du vieux papier peint. Pour un investissement de 1 200 à 2 000€ de pose + fourniture, la plus-value constatée à Longvic est de 6 000 à 15 000€ selon la surface. Le ROI est généralement de 5 à 8x le coût des travaux.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8dcc0] py-5">
      <button
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#1f1400]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#d97706]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#5a4010]">{answer}</p>}
    </div>
  );
}

export default function DevisPapierPeintLongvic() {
  return (
    <main className="min-h-screen bg-[#fdfaf0]">

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#1f1400] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#fbbf24]">Artisan</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "Papier peint Dijon", href: "/devis-pose-papier-peint-dijon" },
            { label: "Rénovation Longvic", href: "/devis-renovation-longvic" },
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
        style={{ background: "linear-gradient(140deg, #1f1400 0%, #3d2800 55%, #2a1a00 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fbbf24]/35 bg-[#fbbf24]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#fde68a]">
            🏘️ Longvic 21600 · Locatif & avant-vente · Tarifs les plus bas
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Papier Peint à Longvic :<br />
            <span className="text-[#fbbf24]">Rafraîchir Vite,</span><br />
            Valoriser Bien
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Propriétaire bailleur ou vendeur à Longvic ? Un intissé neutre posé en <strong className="text-white">2 à 3 jours</strong> génère une plus-value de <strong className="text-white">5 à 8x le coût</strong> des travaux. 78 projets analysés. Prix dès <strong className="text-white">18€/m²</strong> MO.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[
              { val: "78", txt: "projets Longvic 2025–26" },
              { val: "8", txt: "poseurs vérifiés" },
              { val: "18–46€", txt: "MO /m² (le + bas)" },
              { val: "5–8×", txt: "ROI locatif/vente" },
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
            className="inline-block rounded-2xl bg-[#d97706] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(217,119,6,0.45)] transition hover:scale-105 hover:bg-[#f59e0b]"
          >
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · Réponse en 4–6h · Tarifs locatif disponibles</p>
        </div>
      </section>

      {/* BANDEAU */}
      <section className="bg-[#d97706] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[
            { v: "18€/m²", l: "MO minimum à Longvic" },
            { v: "2–3 j.", l: "Pose appart. 55m² standard" },
            { v: "5–8×", l: "ROI avant vente constaté" },
            { v: "78", l: "Projets 2025–2026" },
            { v: "+14%", l: "Plus-value moyenne avant vente" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-xl font-bold" style={{ fontFamily: "serif" }}>{s.v}</div>
              <div className="text-[11px] text-white/65">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ANGLE LOCATIF — unique à Longvic */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d97706]">Stratégie propriétaires</div>
          <h2 className="mb-8 text-3xl font-bold text-[#1f1400] md:text-4xl" style={{ fontFamily: "serif" }}>
            Pourquoi le papier peint est<br />l'investissement N°1 à Longvic
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "🏠", titre: "Mise en location", texte: "Un bien tapissé en intissé vinyle neutre se loue en moyenne 12 jours plus vite qu'un logement avec murs tachés. À Longvic, où la demande locative est forte (proximité Dijon, aéroport, zone d'activités), chaque jour de vacance coûte cher.", gain: "−12 jours de vacance locative" },
              { icon: "💰", titre: "Avant vente", texte: "Pour un investissement de 1 200 à 2 000€ de tapisserie, la plus-value constatée à Longvic est de 6 000 à 15 000€. Le coût représente 8 à 13% de la plus-value générée — un ratio exceptionnel.", gain: "+6 000 à 15 000€ plus-value" },
              { icon: "🔄", titre: "Entre locataires", texte: "L'intissé vinyle lavable supporte 3 à 5 locataires successifs sans retapissage. Un seul investissement initial tient 8 à 12 ans. Entre deux baux, un simple nettoyage humide suffit pour redonner l'éclat d'origine.", gain: "8–12 ans sans retapissage" },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 1 ? "border-[#d97706] bg-[#fffbeb]" : "border-[#e8dcc0] bg-[#fdfaf0]"}`}>
                <div className="mb-3 text-[38px]">{c.icon}</div>
                <div className="mb-1 font-bold text-[#1f1400]">{c.titre}</div>
                <p className="mb-3 text-[13px] leading-relaxed text-[#5a4010]">{c.texte}</p>
                <div className="rounded-lg bg-[#d97706]/10 px-3 py-1.5 text-[12px] font-bold text-[#d97706]">{c.gain}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d97706]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f1400] md:text-5xl" style={{ fontFamily: "serif" }}>
            Prix pose papier peint<br />à Longvic
          </h2>
          <p className="mb-12 max-w-[580px] text-[15px] text-[#5a4010]">
            Analyse de 78 projets à Longvic. Les tarifs sont les plus compétitifs de la métropole grâce à la forte densité d'artisans dans le secteur.
          </p>

          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Studio locatif 30m²", price: "740–1 500€", note: "Intissé vinyle neutre · Pose rapide 1,5 j." },
              { label: "Appart. locatif 55m²", price: "1 500–3 000€", note: "Intissé lavable · 2–3 jours · Toutes pièces" },
              { label: "Maison avant vente 85m²", price: "2 100–4 200€", note: "Intissé premium + toile de verre" },
              { label: "Local tertiaire 60m²", price: "1 200–2 800€", note: "Toile de verre à peindre · Lessivable" },
              { label: "Décollement couches", price: "8–14€/m²", note: "Retrait à sec (intissé) ou humide (trad.)" },
              { label: "Paroi panoramique", price: "480–1 300€", note: "Motif neutre ou nature · Format 2,5×3,5m" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8dcc0] bg-white p-5 transition hover:border-[#d97706]">
                <div className="mb-1 text-[13px] font-semibold text-[#1f1400]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#d97706]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#5a4010]">{r.note}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-5 text-xl font-bold text-[#1f1400]" style={{ fontFamily: "serif" }}>Comparatif Longvic vs métropole</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e8dcc0]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1f1400] text-white">
                  {["Surface", "Longvic (intissé)", "Dijon centre", "Économie"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["35m²", "900–1 900€", "1 000–2 100€", "−100 à −200€"],
                  ["55m²", "1 500–3 000€", "1 600–3 300€", "−100 à −300€"],
                  ["75m²", "2 000–4 100€", "2 200–4 500€", "−200 à −400€"],
                  ["100m²", "2 700–5 500€", "2 900–6 000€", "−200 à −500€"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#fdfaf0]">
                    {r.map((cell, j) => (
                      <td key={j} className={`border-b border-[#e8dcc0] px-4 py-3.5 text-sm ${j === 1 ? "font-bold text-[#d97706]" : j === 3 ? "font-bold text-[#1f1400]" : "font-semibold"}`}>{cell}</td>
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d97706]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#1f1400] md:text-5xl" style={{ fontFamily: "serif" }}>
            8 poseurs vérifiés<br />à Longvic
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#5a4010]">Spécialisés logements locatifs, avant-vente et locaux professionnels. Intervention rapide garantie.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "EP", name: "Éric P.", enseigne: "Longvic Express Déco", spec: "Locatif · Pose rapide · Intissé vinyle", exp: "13 ans · Spécialiste biens locatifs", zone: "Longvic · Chenôve · Dijon Sud", note: "4.9/5", nb: "214 chantiers" },
              { initials: "MW", name: "Mélanie W.", enseigne: "Revêtements & Valorisation 21", spec: "Avant-vente · Toile de verre · Tertiaire", exp: "9 ans · Home staging partenaire", zone: "Longvic · Grand Dijon · Sennecey", note: "4.9/5", nb: "156 chantiers" },
              { initials: "KA", name: "Kamel A.", enseigne: "Multi-Pose Côte-d'Or", spec: "Décollement · HLM · Logements sociaux", exp: "7 ans · Rapidité et propreté", zone: "Longvic · Chenôve · Ouges", note: "4.8/5", nb: "98 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8dcc0] bg-[#fdfaf0] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #1f1400, #78350f)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#1f1400]">{a.name}</div>
                    <div className="text-[11px] text-[#d97706]">{a.enseigne}</div>
                    <div className="text-[11px] text-[#d97706]">{a.note} · {a.nb}</div>
                  </div>
                </div>
                <p className="mb-2 text-[13px] font-semibold text-[#1f1400]">{a.spec}</p>
                <p className="mb-1 text-[12px] text-[#5a4010]">📅 {a.exp}</p>
                <p className="mb-4 text-[12px] text-[#5a4010]">📍 {a.zone}</p>
                <a href="/publier-projet" className="block rounded-xl bg-[#d97706] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#f59e0b]">
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d97706]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#1f1400] md:text-4xl" style={{ fontFamily: "serif" }}>Trois propriétaires témoignent</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "BL", name: "Bruno L.", loc: "Longvic · Appart. locatif 58m²", text: "Éric a retapissé mon appartement entre deux locataires en 2,5 jours. Intissé beige clair lavable partout. Le nouveau locataire a signé le bail sans visiter d'autres biens. Je le rappelle à chaque rotation, c'est systématique maintenant." },
              { avatar: "VC", name: "Valérie C.", loc: "Longvic · Avant vente · 72m²", text: "Mélanie m'a conseillé un intissé gris perle dans le séjour et blanc cassé dans les chambres. L'appartement était estimé à 148 000€. Vendu 162 000€ après 6 jours sur le marché. Les 1 800€ de travaux ont généré 14 000€ de plus-value nette." },
              { avatar: "MA", name: "Mohamed A.", loc: "Longvic · HLM 48m² · décollement", text: "4 couches de vieux papier peint depuis les années 80. Kamel a tout décapé en une journée puis retapissé en intissé le lendemain. Propre, rapide, sans dégât aux murs. Mon bailleur social a validé les travaux sans aucune remarque." },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8dcc0] bg-white p-6">
                <div className="mb-2 text-sm text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <p className="mb-5 text-[14px] italic leading-relaxed text-[#5a4010]">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: "linear-gradient(135deg, #1f1400, #78350f)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#1f1400]">{t.name}</div>
                    <div className="text-[12px] text-[#5a4010]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNES */}
      <section className="px-8 py-20" style={{ background: "#1f1400" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#fde68a]">Alentours</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Papier peint autour de Longvic</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-pose-papier-peint-dijon", nb: "22 poseurs", prix: "20–55€/m²" },
              { name: "Chenôve", href: "/devis-pose-papier-peint-chenove", nb: "11 poseurs", prix: "18–48€/m²" },
              { name: "Talant", href: "/devis-pose-papier-peint-talant", nb: "9 poseurs", prix: "20–50€/m²" },
              { name: "Quetigny", href: "/devis-pose-papier-peint-quetigny", nb: "5 poseurs", prix: "22–55€/m²" },
              { name: "Fontaine-lès-Dijon", href: "/devis-pose-papier-peint-fontaine-les-dijon", nb: "4 poseurs", prix: "22–58€/m²" },
              { name: "Sennecey-lès-Dijon", href: "#", nb: "2 poseurs", prix: "18–44€/m²" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#fbbf24] hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">{q.nb}</span>
                  <span className="font-bold text-[#fde68a]">{q.prix}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d97706]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#1f1400] md:text-4xl" style={{ fontFamily: "serif" }}>Questions des propriétaires<br />de Longvic</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #1f1400 0%, #3d2800 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#fbbf24]">Prêt à valoriser votre bien ?</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Devis pose papier peint<br />gratuit à Longvic
          </h2>
          <p className="mb-10 text-[16px] text-white/60">8 poseurs vérifiés · Dès 18€/m² · Locatif & avant-vente · Pose en 2–3 jours</p>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#d97706] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(217,119,6,0.5)] transition hover:scale-105 hover:bg-[#f59e0b]"
          >
            🎨 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Papier Peint Longvic", url: "https://premiumartisan.fr/devis-pose-papier-peint-longvic", areaServed: { "@type": "City", name: "Longvic", postalCode: "21600" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "64" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
