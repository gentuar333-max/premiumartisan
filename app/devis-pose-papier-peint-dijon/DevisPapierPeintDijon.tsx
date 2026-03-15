// Papier Peint Dijon component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix de la pose de papier peint à Dijon en 2026 ?", a: "Le prix moyen de la pose de papier peint à Dijon varie entre 20 et 55€/m² main d'œuvre seule. En incluant la fourniture du papier peint, comptez 45 à 120€/m² selon la qualité. Pour une pièce de 20m², la pose complète revient entre 900€ et 2 400€." },
  { q: "Intissé, vinyle ou papier traditionnel — lequel choisir à Dijon ?", a: "L'intissé est le plus populaire à Dijon : facile à poser, résistant, retirable à sec (18–45€/rouleau). Le vinyle convient aux pièces humides comme les cuisines et salles de bain (22–60€/rouleau). Le papier traditionnel, moins cher (12–25€/rouleau), est réservé aux pièces sèches et plus délicat à poser." },
  { q: "Faut-il préparer les murs avant la pose à Dijon ?", a: "Oui, surtout dans les appartements anciens dijonnais. Les murs irréguliers nécessitent un enduit de lissage avant pose (15–30€/m²). Cette préparation représente 30 à 50% du coût total mais garantit un résultat parfait et durable. Nos artisans l'incluent dans leur devis." },
  { q: "Combien de rouleaux pour une pièce standard ?", a: "Pour une pièce de 12m² avec murs de 2,50m, comptez 6 à 8 rouleaux selon le raccord du motif. Prévoyez toujours 1 rouleau de réserve. Nos artisans dijonnais calculent précisément les besoins avant commande." },
  { q: "Peut-on poser du papier peint en salle de bain à Dijon ?", a: "Oui, avec un papier vinyle ou intissé traité anti-humidité. Le prix de pose en salle de bain est légèrement supérieur (25–60€/m²) en raison des découpes autour des équipements sanitaires." },
  { q: "Combien de temps dure la pose à Dijon ?", a: "Une pièce de 15m² : 1 à 2 jours. Un appartement de 60m² : 3 à 5 jours. Les raccords complexes ou plafonds tapissés allongent le délai. Intervention possible en semaine et sur demande le week-end." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[1.5px] border-[#c8e8e8] py-5">
      <div className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[#0a1f1f]" onClick={() => setOpen(!open)}>
        <span className="text-base">{question}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="mt-3 text-sm leading-relaxed text-[#1a4a4a]">{answer}</div>}
    </div>
  );
}

export default function DevisPapierPeintDijon() {
  return (
    <main className="min-h-screen" style={{ background: "#f0fafa" }}>

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#0a1f1f] px-8 py-4">
        <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#2dd4bf]">Artisan</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/70 hover:text-white">Accueil</Link>
          <Link href="/devis-peinture-interieure-dijon" className="text-sm text-white/70 hover:text-white">Peinture Dijon</Link>
          <Link href="#prix" className="text-sm text-white/70 hover:text-white">Prix</Link>
          <Link href="#artisans" className="text-sm text-white/70 hover:text-white">Artisans</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-8 pb-16 pt-20" style={{ background: "linear-gradient(135deg, #0a1f1f 0%, #0a3a3a 60%, #0a2a2a 100%)" }}>
        <div className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2dd4bf]/40 bg-[#2dd4bf]/20 px-3.5 py-1.5 text-[13px] font-semibold text-[#99f6e4]">
            🎨 Dijon 21000 — Pose papier peint 2026
          </div>
          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl" style={{ fontFamily: "serif" }}>
            Pose Papier Peint<br />à <em className="not-italic text-[#99f6e4]">Dijon</em> — Prix<br />& Devis Gratuit 2026
          </h1>
          <p className="mb-8 max-w-[600px] text-lg text-white/75">
            Comparez jusqu'à 4 poseurs vérifiés à Dijon. <strong className="text-white">148 projets analysés.</strong> Intissé · Vinyle · Panoramique · Pose à la colle ou auto-collant.
          </p>
          <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[
              { value: "148", label: "Projets analysés" },
              { value: "22", label: "Poseurs vérifiés" },
              { value: "35€", label: "Prix moy./m²" },
              { value: "3–5h", label: "Délai réponse" },
              { value: "96%", label: "Satisfaction" },
            ].map((b, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{b.value}</div>
                <div className="mt-0.5 text-[11px] text-white/60">{b.label}</div>
              </div>
            ))}
          </div>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#0d9488] px-10 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(13,148,136,0.4)] transition hover:scale-105 hover:bg-[#14b8a6]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · 100% gratuit · Tous types de revêtements</p>
        </div>
      </section>

      {/* BANDEAU */}
      <section className="bg-[#0d9488] px-8 py-5">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-wrap items-center justify-between gap-4 text-center text-white">
            {[
              { value: "148", label: "Projets publiés 2025–2026" },
              { value: "22", label: "Poseurs spécialisés" },
              { value: "20–55€", label: "Main d'œuvre /m²" },
              { value: "3", label: "Types de papier peint" },
              { value: "+18%", label: "Croissance vs 2024" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-bold" style={{ fontFamily: "serif" }}>{s.value}</div>
                <div className="text-xs text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES PAPIER PEINT */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Types de revêtements</div>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-[#0a1f1f] md:text-4xl" style={{ fontFamily: "serif" }}>
            Quel papier peint choisir<br />à Dijon ?
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: "🏆", title: "Intissé — Le plus populaire", desc: "Standard à Dijon. Pose facile, retirable à sec, résistant. Idéal pour toutes les pièces.", fourniture: "18–45€/rouleau", pose: "20–40€/m²", best: "Salon · Chambre · Couloir" },
              { icon: "💧", title: "Vinyle — Pièces humides", desc: "Résistant à l'humidité et aux projections. Parfait cuisines et salles de bain dijonnaises.", fourniture: "22–60€/rouleau", pose: "25–55€/m²", best: "Cuisine · SDB · WC" },
              { icon: "🖼️", title: "Panoramique — Effet unique", desc: "Grand motif sur toute une paroi. Tendance forte à Dijon en 2026. Pose technique.", fourniture: "120–400€/panneau", pose: "35–65€/m²", best: "Séjour · Chambre · Bureau" },
            ].map((t, i) => (
              <div key={i} className={`rounded-2xl border-2 p-6 ${i === 0 ? "border-[#0d9488]" : "border-[#c8e8e8]"}`} style={i === 0 ? { background: "linear-gradient(135deg, #f0fdfa, white)" } : {}}>
                <div className="mb-3 text-[36px]">{t.icon}</div>
                <div className="mb-1 text-base font-bold text-[#0a1f1f]">{t.title}</div>
                <div className="mb-3 text-[13px] text-[#1a4a4a]">{t.desc}</div>
                <div className="space-y-1 text-[13px]">
                  <div className="flex justify-between border-b border-[#c8e8e8] py-1"><span className="text-[#1a4a4a]">Fourniture</span><span className="font-bold text-[#0d9488]">{t.fourniture}</span></div>
                  <div className="flex justify-between border-b border-[#c8e8e8] py-1"><span className="text-[#1a4a4a]">Pose MO</span><span className="font-bold text-[#0d9488]">{t.pose}</span></div>
                  <div className="flex justify-between py-1"><span className="text-[#1a4a4a]">Idéal pour</span><span className="font-bold text-[#0a1f1f] text-[12px]">{t.best}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="px-8 py-20" style={{ background: "#f0fafa" }} id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Prix réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#0a1f1f] md:text-5xl" style={{ fontFamily: "serif" }}>
            Combien coûte la pose<br />de papier peint à Dijon ?
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#1a4a4a]">
            Analyse de 148 projets publiés à Dijon entre janvier 2025 et mars 2026. Prix main d'œuvre + fourniture selon le type de papier peint choisi.
          </p>

          <h3 className="mb-6 text-xl font-bold text-[#0a1f1f]" style={{ fontFamily: "serif" }}>Prix par pièce — Dijon 2026</h3>
          <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { room: "🛏️ Chambre 12m²", price: "650–1 400€", detail: "Intissé · Prépa murs + pose + fourniture" },
              { room: "🛋️ Salon 25m²", price: "1 100–2 800€", detail: "Intissé ou panoramique · Toutes parois" },
              { room: "🚪 Couloir 8m²", price: "400–900€", detail: "Vinyle résistant · Découpes portes incluses" },
              { room: "🍳 Cuisine 10m²", price: "500–1 100€", detail: "Vinyle anti-humidité · Crédence possible" },
              { room: "🛁 Salle de bain 6m²", price: "380–850€", detail: "Vinyle traité · Découpes sanitaires" },
              { room: "🖼️ 1 paroi panoramique", price: "480–1 200€", detail: "Motif personnalisé · Pose technique" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8e8e8] bg-white p-5 transition hover:border-[#0d9488]">
                <div className="mb-2 text-base font-bold text-[#0a1f1f]">{r.room}</div>
                <div className="text-[22px] font-bold text-[#0d9488]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[12px] text-[#1a4a4a]">{r.detail}</div>
              </div>
            ))}
          </div>

          <h3 className="mb-6 text-xl font-bold text-[#0a1f1f]" style={{ fontFamily: "serif" }}>Prix par surface — Appartements Dijon</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0a1f1f] text-white">
                  <th className="rounded-tl-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Surface</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Intissé standard</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Vinyle premium</th>
                  <th className="rounded-tr-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Durée pose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surf: "Appartement 40m²", s: "1 800€ – 3 200€", v: "2 400€ – 4 800€", d: "2–3 jours" },
                  { surf: "Appartement 65m²", s: "2 900€ – 5 200€", v: "3 900€ – 7 800€", d: "3–5 jours" },
                  { surf: "Appartement 90m²", s: "4 000€ – 7 200€", v: "5 400€ – 10 800€", d: "4–7 jours" },
                  { surf: "Maison 120m²", s: "5 400€ – 9 600€", v: "7 200€ – 14 400€", d: "6–9 jours" },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-white">
                    <td className="border-b border-[#c8e8e8] px-4 py-3.5 text-sm font-semibold">{r.surf}</td>
                    <td className="border-b border-[#c8e8e8] px-4 py-3.5 text-sm font-bold text-[#0d9488]" style={{ fontFamily: "serif" }}>{r.s}</td>
                    <td className="border-b border-[#c8e8e8] px-4 py-3.5 text-sm font-bold text-[#0d9488]" style={{ fontFamily: "serif" }}>{r.v}</td>
                    <td className="border-b border-[#c8e8e8] px-4 py-3.5 text-sm">{r.d}</td>
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#0a1f1f] md:text-5xl" style={{ fontFamily: "serif" }}>
            Poseurs papier peint vérifiés<br />à Dijon
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#1a4a4a]">Spécialistes intissé, vinyle et panoramique. Vérifiés sur leurs finitions et leur soin du détail.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { initials: "MB", name: "Marc B. — Décor Mural 21", spec: "Papier peint panoramique & intissé haut de gamme", exp: "18 ans · Spécialiste raccords complexes", zone: "Dijon · Grand Dijon · Beaune", note: "5.0/5", chantiers: "243 chantiers" },
              { initials: "SL", name: "Sophie L. — Pose & Déco", spec: "Intissé · Vinyle · Toile de verre", exp: "11 ans · Finitions impeccables", zone: "Dijon · Chenôve · Longvic", note: "4.9/5", chantiers: "167 chantiers" },
              { initials: "TM", name: "Thomas M. — Revêtements Muraux", spec: "Vinyle technique · SDB · Cuisine", exp: "8 ans · Spécialiste pièces humides", zone: "Dijon · Quetigny · Talant", note: "4.8/5", chantiers: "112 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8e8e8] bg-[#f0fafa] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #0a1f1f, #0a3a3a)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#0a1f1f]">{a.name}</div>
                    <div className="text-xs text-[#0d9488]">{a.note} · {a.chantiers}</div>
                  </div>
                </div>
                <div className="mb-2 text-[13px] font-semibold text-[#0a1f1f]">{a.spec}</div>
                <div className="mb-1 text-xs text-[#1a4a4a]">📅 {a.exp}</div>
                <div className="text-xs text-[#1a4a4a]">📍 {a.zone}</div>
                <a href="/publier-projet" className="mt-4 block rounded-xl bg-[#0d9488] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#14b8a6]">
                  Demander un devis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="px-8 py-20" style={{ background: "#f0fafa" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Avis clients vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a1f1f] md:text-5xl" style={{ fontFamily: "serif" }}>
            Ils ont tapissé leur logement<br />à Dijon
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Claire D.", loc: "Dijon Centre · Appart 72m²", text: "Marc a posé un papier peint panoramique forêt dans notre salon. Résultat époustouflant — tous nos invités le remarquent en premier. La pose était parfaite, aucun raccord visible. Vraiment un artiste.", avatar: "CD" },
              { name: "Renaud P.", loc: "Dijon · Maison 105m²", text: "Sophie a tapissé toute la maison en 5 jours. Intissé dans les chambres, vinyle dans la cuisine et la salle de bain. Finitions parfaites dans les angles et autour des fenêtres. Prix très correct.", avatar: "RP" },
              { name: "Amira S.", loc: "Dijon · Appartement 58m²", text: "Vinyle anti-humidité dans la salle de bain — Thomas a géré les découpes autour de la baignoire avec une précision remarquable. Plus aucune condensation visible sur les murs. Excellent travail.", avatar: "AS" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8e8e8] bg-white p-6">
                <div className="mb-3 text-base text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <div className="mb-4 text-sm italic leading-relaxed text-[#1a4a4a]">"{t.text}"</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #0a1f1f, #0a3a3a)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#0a1f1f]">{t.name}</div>
                    <div className="text-xs text-[#1a4a4a]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNES */}
      <section className="px-8 py-20" style={{ background: "#0a1f1f" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#99f6e4]">Communes voisines</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Pose papier peint<br />autour de Dijon
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Chenôve", href: "/devis-pose-papier-peint-chenove", poseurs: "8", prix: "18–48€/m²" },
              { name: "Talant", href: "/devis-pose-papier-peint-talant", poseurs: "6", prix: "20–50€/m²" },
              { name: "Longvic", href: "/devis-pose-papier-peint-longvic", poseurs: "5", prix: "18–46€/m²" },
              { name: "Quetigny", href: "/devis-pose-papier-peint-quetigny", poseurs: "5", prix: "22–55€/m²" },
              { name: "Fontaine-lès-Dijon", href: "/devis-pose-papier-peint-fontaine-les-dijon", poseurs: "4", prix: "22–58€/m²" },
              { name: "Saint-Apollinaire", href: "#", poseurs: "3", prix: "20–52€/m²" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.06] p-5 no-underline transition hover:border-[#99f6e4] hover:bg-white/10">
                <div className="mb-3 text-lg font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Poseurs</span><span className="font-bold text-[#99f6e4]">{q.poseurs}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-white/50">Prix MO</span><span className="font-bold text-[#99f6e4]">{q.prix}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">Guide expert</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a1f1f] md:text-5xl" style={{ fontFamily: "serif" }}>
            Tout savoir sur la pose<br />de papier peint à Dijon
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="text-[15px] leading-relaxed text-[#1a4a4a]">
              <h3 className="mb-3 text-[22px] font-bold text-[#0a1f1f]" style={{ fontFamily: "serif" }}>Le marché du papier peint à Dijon en 2026</h3>
              <p className="mb-4">Dijon connaît depuis 2023 un véritable renouveau du papier peint. Longtemps délaissé au profit de la peinture unie, le revêtement mural retrouve ses lettres de noblesse grâce aux nouvelles générations de papiers peints intissés faciles à poser et à retirer, et à l'explosion des formats panoramiques sur les réseaux sociaux.</p>
              <p className="mb-4">En 2025–2026, 148 projets de pose de papier peint ont été publiés sur notre plateforme à Dijon — hausse de 18% vs 2024. Les appartements haussmanniens du centre historique et les maisons récentes des communes périphériques représentent l'essentiel de la demande.</p>

              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#0a1f1f]" style={{ fontFamily: "serif" }}>Données du marché — Dijon papier peint 2026</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Projets publiés 2025–2026 : <strong>148 (+18%)</strong></li>
                <li>Prix MO moyen constaté : <strong>35€/m²</strong></li>
                <li>Type le plus demandé : <strong>Intissé (64%)</strong></li>
                <li>Part panoramique : <strong>22%</strong></li>
                <li>Budget moyen par projet : <strong>2 400€</strong></li>
                <li>Satisfaction clients : <strong>96%</strong></li>
              </ul>
            </div>
            <div className="sticky top-6">
              <div className="rounded-2xl border-[1.5px] border-[#c8e8e8] bg-[#f0fafa] p-6">
                <h4 className="mb-3 text-base font-bold text-[#0a1f1f]" style={{ fontFamily: "serif" }}>📊 Prix Dijon 2026</h4>
                {[
                  { k: "MO intissé", v: "20–40€/m²" },
                  { k: "MO vinyle", v: "25–55€/m²" },
                  { k: "MO panoramique", v: "35–65€/m²" },
                  { k: "Budget moyen", v: "2 400€" },
                  { k: "Satisfaction", v: "96%" },
                  { k: "Poseurs actifs", v: "22" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between border-b border-[#c8e8e8] py-2 text-[13px] last:border-0">
                    <span className="text-[#1a4a4a]">{s.k}</span><span className="font-bold text-[#0a1f1f]">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-20" style={{ background: "#f0fafa" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d9488]">FAQ</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a1f1f] md:text-5xl" style={{ fontFamily: "serif" }}>Questions fréquentes<br />— Papier peint Dijon</h2>
          <div className="max-w-[700px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #0a1f1f, #0a3a3a)" }}>
        <div className="mx-auto max-w-[1000px]">
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Devis pose papier peint<br />gratuit à Dijon
          </h2>
          <p className="mb-10 text-base text-white/70">22 poseurs vérifiés · Intissé · Vinyle · Panoramique · Réponse en 3–5h.</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#0d9488] px-12 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(13,148,136,0.4)] transition hover:scale-105 hover:bg-[#14b8a6]">
            🎨 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Papier Peint Dijon", url: "https://premiumartisan.fr/devis-pose-papier-peint-dijon", areaServed: { "@type": "City", name: "Dijon", postalCode: "21000" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "118" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
