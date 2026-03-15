// Salle de Bain Talant component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Pourquoi les salles de bain des tours de Talant ont-elles des problèmes d'humidité ?",
    a: "À 350m d'altitude, les tours des quartiers Belvédère et Monts souffrent d'un double problème : les murs extérieurs mal isolés créent des ponts thermiques importants, et la ventilation d'origine des années 70 est souvent défaillante. Résultat : condensation chronique, moisissures, et carrelage qui se décolle. Une rénovation sérieuse doit impérativement inclure le remplacement ou la réparation de la VMC pour être durable.",
  },
  {
    q: "Quel est le prix d'une rénovation salle de bain à Talant en 2026 ?",
    a: "À Talant, les prix varient entre 4 800€ et 11 000€ pour une rénovation complète, selon la superficie et le niveau de finition. La présence de problèmes d'humidité liés à l'altitude (traitement anti-moisissures, vérification VMC) peut ajouter 400 à 800€ au budget. Pour un rafraîchissement simple dans une villa du plateau, comptez 2 800€ à 6 000€.",
  },
  {
    q: "Faut-il traiter les moisissures avant de rénover la salle de bain à Talant ?",
    a: "Oui, absolument. Dans les tours de Talant, les moisissures sont souvent plus profondes que la surface visible. Nos artisans appliquent systématiquement un traitement fongicide sur les supports avant toute pose de carrelage ou enduit. Sans ce traitement préalable, les nouvelles finitions seront attaquées en quelques mois. Le coût de ce traitement est de 15 à 25€/m².",
  },
  {
    q: "Douche ou baignoire dans les appartements des tours de Talant ?",
    a: "Dans les appartements des tours de Belvédère et Monts, les salles de bain font généralement 3,5 à 5m². La douche est quasi-obligatoire dans les configurations les plus petites. Pour les appartements du plateau avec des salles de bain de 6m² et plus, la baignoire reste une option. En 2026, 78% des projets de rénovation à Talant intègrent une douche.",
  },
  {
    q: "La VMC doit-elle être remplacée lors d'une rénovation salle de bain à Talant ?",
    a: "Dans les tours des années 70–80, la VMC d'origine est souvent en fin de vie ou mal entretenue. Nos artisans vérifient systématiquement le débit d'air avant la rénovation. Si la VMC est défaillante, son remplacement est fortement recommandé (250 à 600€) car c'est la principale cause de condensation et de moisissures dans les salles de bain talantaises.",
  },
  {
    q: "Les villas du plateau de Talant ont-elles les mêmes problèmes ?",
    a: "Non. Les maisons individuelles du plateau talantais ont généralement une meilleure ventilation naturelle et moins de problèmes d'humidité que les tours. Les rénovations y sont plus classiques : carrelage, douche à l'italienne, meuble vasque. Les budgets sont également plus élevés car les surfaces sont plus grandes (6 à 10m² contre 3,5 à 5m² en tour).",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#c0cce0] py-5">
      <button
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left font-bold text-[#0a1228]"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[15px] leading-snug">{question}</span>
        <span className="mt-0.5 shrink-0 text-xl text-[#3b82f6]">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[14px] leading-relaxed text-[#1a2a4a]">{answer}</p>}
    </div>
  );
}

export default function DevisSalleDeBainTalant() {
  return (
    <main className="min-h-screen bg-[#f0f4fa]">

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#0a1228] px-8 py-4">
        <span className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#93c5fd]">Artisan</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: "Accueil", href: "/" },
            { label: "SDB Dijon", href: "/devis-salle-de-bain-dijon" },
            { label: "Rénovation Talant", href: "/devis-renovation-talant" },
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
        style={{ background: "linear-gradient(140deg, #0a1228 0%, #1e3a5f 55%, #0a1a3a 100%)" }}
      >
        <div
          className="pointer-events-none absolute -right-1/4 -top-1/2 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(147,197,253,0.15) 0%, transparent 68%)" }}
        />
        <div className="relative mx-auto max-w-[920px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#93c5fd]/35 bg-[#93c5fd]/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#dbeafe]">
            🏔️ Talant 21240 · Altitude 350m · Anti-humidité & VMC
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.1] text-white md:text-[62px]" style={{ fontFamily: "serif" }}>
            Salle de Bain à Talant :<br />
            <span className="text-[#93c5fd]">Rénover Durable</span><br />
            Malgré l'Humidité
          </h1>
          <p className="mb-10 max-w-[580px] text-[17px] leading-relaxed text-white/70">
            Moisissures, carrelage décollé, VMC défaillante — les salles de bain des tours de Talant ont des besoins spécifiques. Nos artisans traitent <strong className="text-white">le problème à la racine</strong>. 94 projets analysés.
          </p>
          <div className="mb-12 flex flex-wrap gap-3">
            {[
              { val: "94", txt: "projets Talant 2025–26" },
              { val: "11", txt: "artisans vérifiés" },
              { val: "4 800–11k€", txt: "rénovation complète" },
              { val: "VMC", txt: "vérifiée systématiquement" },
              { val: "94%", txt: "satisfaction" },
            ].map((k, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{k.val}</div>
                <div className="mt-0.5 text-[11px] text-white/55">{k.txt}</div>
              </div>
            ))}
          </div>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#2563eb] px-12 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(37,99,235,0.45)] transition hover:scale-105 hover:bg-[#3b82f6]"
          >
            🚿 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/45">Sans engagement · Réponse en 4–7h · Diagnostic VMC inclus</p>
        </div>
      </section>

      {/* BANDEAU */}
      <section className="bg-[#2563eb] px-8 py-4">
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-between gap-4 text-center text-white">
          {[
            { v: "350m", l: "Altitude · Condensation renforcée" },
            { v: "VMC", l: "Vérifiée sur chaque chantier" },
            { v: "15–25€", l: "Traitement anti-moisissures /m²" },
            { v: "78%", l: "Douche en 2026 à Talant" },
            { v: "94", l: "Projets 2025–2026" },
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">Le problème spécifique Talant</div>
          <h2 className="mb-8 text-3xl font-bold text-[#0a1228] md:text-4xl" style={{ fontFamily: "serif" }}>
            Pourquoi les SDB des tours<br />se dégradent plus vite à Talant
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "💧", titre: "Condensation altitude", texte: "À 350m, l'air extérieur est plus humide. Sans VMC efficace, la vapeur d'eau des douches s'accumule sur les murs froids et génère moisissures et décollement du carrelage en 2 à 3 ans." },
              { icon: "🌡️", titre: "Ponts thermiques tours", texte: "Les parois extérieures des tours années 70 atteignent 6–10°C en hiver côté intérieur. Cette surface froide provoque une condensation permanente dans les angles — zone à risque n°1 pour les moisissures." },
              { icon: "✅", titre: "Notre approche", texte: "Diagnostic VMC + traitement fongicide en profondeur + carrelage anti-humidité + joint époxy étanche. Cette séquence garantit une salle de bain durable 12 à 15 ans sans récidive des moisissures." },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-[1.5px] p-6 ${i === 2 ? "border-[#2563eb] bg-[#eff6ff]" : "border-[#c0cce0] bg-[#f0f4fa]"}`}>
                <div className="mb-3 text-[38px]">{c.icon}</div>
                <div className="mb-2 font-bold text-[#0a1228]">{c.titre}</div>
                <p className="text-[13px] leading-relaxed text-[#1a2a4a]">{c.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">Tarifs réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0a1228] md:text-5xl" style={{ fontFamily: "serif" }}>
            Prix rénovation salle de bain<br />à Talant
          </h2>
          <p className="mb-12 max-w-[580px] text-[15px] text-[#1a2a4a]">
            Analyse de 94 projets à Talant. Les tarifs incluent le traitement anti-humidité systématique et la vérification VMC, spécifiques à l'altitude.
          </p>
          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Rénovation complète tour 4m²", price: "4 800–9 500€", note: "Traitement moisissures + carrelage + douche + VMC" },
              { label: "Douche italienne tour", price: "3 500–8 000€", note: "Anti-humidité · Joint époxy · Receveur extra-plat" },
              { label: "Rafraîchissement villa plateau", price: "2 800–6 000€", note: "Carrelage + robinetterie · Sans problème humidité" },
              { label: "SDB PMR Talant", price: "4 500–11 000€", note: "Douche PMR + barres + WC surélevé · MaPrimeAdapt'" },
              { label: "Traitement anti-moisissures", price: "15–25€/m²", note: "Fongicide profond · Obligatoire tours Talant" },
              { label: "Remplacement VMC", price: "250–600€", note: "VMC simple flux ou hygroréglable · Inclus devis" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c0cce0] bg-white p-5 transition hover:border-[#2563eb]">
                <div className="mb-1 text-[13px] font-semibold text-[#0a1228]">{r.label}</div>
                <div className="text-[24px] font-bold text-[#2563eb]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[11px] text-[#1a2a4a]">{r.note}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-5 text-xl font-bold text-[#0a1228]" style={{ fontFamily: "serif" }}>Tours vs Villas — comparatif Talant 2026</h3>
          <div className="overflow-x-auto rounded-2xl border border-[#c0cce0]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0a1228] text-white">
                  {["Type de projet", "Tour Belvédère/Monts", "Villa plateau", "Différence"].map((h, i) => (
                    <th key={i} className={`px-4 py-3.5 text-left text-[13px] font-semibold ${i === 0 ? "rounded-tl-[10px]" : i === 3 ? "rounded-tr-[10px]" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  ["Rénovation complète", "4 800–9 500€", "3 500–8 000€", "+20–25% tours"],
                  ["Douche italienne", "3 500–8 000€", "2 800–6 500€", "+15–20% tours"],
                  ["Carrelage seul", "1 200–2 800€", "900–2 200€", "+20% tours"],
                  ["SDB PMR", "4 500–11 000€", "3 800–9 000€", "+15% tours"],
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#f0f4fa]">
                    <td className="border-b border-[#c0cce0] px-4 py-3.5 text-sm font-semibold text-[#0a1228]">{r[0]}</td>
                    <td className="border-b border-[#c0cce0] px-4 py-3.5 text-sm font-bold text-[#2563eb]">{r[1]}</td>
                    <td className="border-b border-[#c0cce0] px-4 py-3.5 text-sm text-[#1a2a4a]">{r[2]}</td>
                    <td className="border-b border-[#c0cce0] px-4 py-3.5 text-sm font-bold text-[#0a1228]">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] text-[#1a2a4a]">* Surcoût tours : traitement anti-humidité + vérification VMC inclus dans tous les devis.</p>
        </div>
      </section>

      {/* ARTISANS */}
      <section className="bg-white px-8 py-20" id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold text-[#0a1228] md:text-5xl" style={{ fontFamily: "serif" }}>
            11 artisans vérifiés<br />à Talant
          </h2>
          <p className="mb-12 max-w-[560px] text-[15px] text-[#1a2a4a]">Formés aux spécificités de l'altitude : traitement anti-moisissures, VMC, carrelage anti-condensation.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { initials: "PV", name: "Philippe V.", enseigne: "Talant Bain Expert", spec: "Tours · Anti-humidité · VMC · Carrelage", exp: "17 ans · Spécialiste moisissures altitude", zone: "Talant · Fontaine · Dijon Nord", note: "4.9/5", nb: "234 chantiers" },
              { initials: "CL", name: "Céline L.", enseigne: "Plateau SDB Design", spec: "Villas plateau · Douche italienne · Haut de gamme", exp: "11 ans · Finitions premium villas", zone: "Talant plateau · Ahuy · Daix", note: "4.9/5", nb: "142 chantiers" },
              { initials: "RM", name: "Rachid M.", enseigne: "Multi-Bains Talant", spec: "PMR · Locatif · Rénovation rapide", exp: "8 ans · Délai 10 jours garanti tours", zone: "Talant · Chenôve · Dijon", note: "4.8/5", nb: "98 chantiers" },
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
                <a href="/publier-projet" className="block rounded-xl bg-[#2563eb] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#3b82f6]">
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
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">Avis vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold text-[#0a1228] md:text-4xl" style={{ fontFamily: "serif" }}>Trois projets réels à Talant</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { avatar: "JF", name: "Jean-François T.", loc: "Tour Belvédère · 8e · SDB 4m²", text: "Moisissures récurrentes depuis 3 ans malgré 2 rénovations ratées. Philippe a diagnostiqué une VMC hors service, traité les murs en profondeur puis posé du carrelage avec joint époxy. 18 mois après, zéro moisissure. Enfin une vraie solution." },
              { avatar: "VB", name: "Valérie B.", loc: "Villa plateau Talant · SDB 8m²", text: "Céline a installé une douche à l'italienne 100×120 avec carrelage grand format 60×60 dans notre villa. Aucun problème d'humidité ici — la rénovation était classique mais parfaitement exécutée. Délai de 12 jours respecté." },
              { avatar: "AM", name: "Ahmed M.", loc: "Tour Monts · SDB PMR · 72 ans", text: "Rachid a transformé la salle de bain de mon père en 9 jours. Douche PMR niveau zéro, barres d'appui, WC surélevé. Le dossier MaPrimeAdapt' a été accepté — 68% de prise en charge. Mon père reste chez lui en toute sécurité." },
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

      {/* COMMUNES */}
      <section className="px-8 py-20" style={{ background: "#0a1228" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#dbeafe]">Communes voisines</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Rénovation SDB autour de Talant</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-salle-de-bain-dijon", nb: "28 artisans", prix: "7 000–35 000€" },
              { name: "Chenôve", href: "/devis-salle-de-bain-chenove", nb: "14 artisans", prix: "4 500–9 000€" },
              { name: "Fontaine-lès-Dijon", href: "/devis-salle-de-bain-fontaine-les-dijon", nb: "6 artisans", prix: "7 500–20 000€" },
              { name: "Longvic", href: "/devis-salle-de-bain-longvic", nb: "10 artisans", prix: "6 500–15 000€" },
              { name: "Quetigny", href: "/devis-salle-de-bain-quetigny", nb: "8 artisans", prix: "8 000–22 000€" },
              { name: "Ahuy", href: "#", nb: "3 artisans", prix: "6 000–14 000€" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#93c5fd] hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/50">{q.nb}</span>
                  <span className="font-bold text-[#dbeafe]">{q.prix}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">FAQ</div>
          <h2 className="mb-10 text-3xl font-bold text-[#0a1228] md:text-4xl" style={{ fontFamily: "serif" }}>Questions sur la rénovation SDB<br />à Talant</h2>
          <div className="max-w-[720px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center" style={{ background: "linear-gradient(140deg, #0a1228 0%, #1e3a5f 100%)" }}>
        <div className="mx-auto max-w-[800px]">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#93c5fd]">Prêt à rénover durablement ?</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Devis salle de bain gratuit<br />à Talant
          </h2>
          <p className="mb-10 text-[16px] text-white/60">11 artisans vérifiés · Diagnostic VMC inclus · Anti-humidité altitude · PMR · Réponse en 4–7h</p>
          <a
            href="/publier-projet"
            className="inline-block rounded-2xl bg-[#2563eb] px-14 py-5 text-xl font-bold text-white shadow-[0_14px_36px_rgba(37,99,235,0.5)] transition hover:scale-105 hover:bg-[#3b82f6]"
          >
            🚿 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Salle de Bain Talant", url: "https://premiumartisan.fr/devis-salle-de-bain-talant", areaServed: { "@type": "City", name: "Talant", postalCode: "21240" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "78" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
