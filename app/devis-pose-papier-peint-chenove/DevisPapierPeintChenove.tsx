// Papier Peint Chenôve component
"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  { q: "Pourquoi poser du papier peint à Chenôve plutôt que de peindre ?", a: "À Chenôve, beaucoup d'appartements des années 1970–1985 ont des murs en béton avec des irrégularités que la peinture seule ne masque pas. Le papier peint intissé épais, notamment les références 180g/m² et plus, cache parfaitement ces défauts sans travaux de rebouchage lourds. C'est souvent 30 à 40% moins cher qu'un enduit de lissage + peinture pour un résultat visuellement équivalent." },
  { q: "Quel est le prix de la pose de papier peint à Chenôve ?", a: "À Chenôve, le prix de la main d'œuvre varie entre 18 et 48€/m². Légèrement inférieur à Dijon centre grâce à la concurrence locale. Pour un appartement de 55m², la pose complète (fourniture intissé standard + main d'œuvre) revient entre 1 600€ et 3 200€ selon le type de revêtement choisi." },
  { q: "Les artisans de Chenôve peuvent-ils poser du papier peint dans les HLM ?", a: "Oui, et c'est même leur spécialité. Les logements sociaux de Chenôve, notamment dans les quartiers du Mail et de la Combe-aux-Fées, présentent des murs en béton banché typiques des années 70. Nos poseurs locaux maîtrisent parfaitement la préparation de ces supports et la pose sur béton." },
  { q: "Faut-il enlever l'ancien papier peint avant la pose ?", a: "Oui, dans 90% des cas. Le décollement de l'ancien revêtement est facile avec un papier intissé (retrait à sec) mais plus laborieux avec un papier vinyle ou traditionnel (nécessite eau et spatule). Nos artisans de Chenôve incluent systématiquement le décollement dans leur devis. Compter 8 à 15€/m² pour cette étape." },
  { q: "Quelle colle utiliser pour poser du papier peint à Chenôve ?", a: "Pour les murs en béton courants à Chenôve, nos artisans recommandent une colle à tapisser renforcée type Metylan Spécial Intissé ou Quelyd Spécial Intissé. Pour les supports poreux ou anciens, un apprêt d'accrochage est appliqué au préalable. La colle est toujours fournie dans le devis de nos artisans." },
  { q: "Peut-on poser du papier peint dans un appartement en location à Chenôve ?", a: "Oui, avec l'accord du propriétaire. Pour les locataires de Chenôve, le papier peint intissé est idéal car retirable à sec sans endommager les murs — ce qui facilite l'état des lieux de sortie. Certains propriétaires apprécient même cette option car elle valorise le bien sans travaux lourds." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[1.5px] border-[#e8d4c8] py-5">
      <div className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[#1f0f0a]" onClick={() => setOpen(!open)}>
        <span className="text-base">{question}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="mt-3 text-sm leading-relaxed text-[#5a3020]">{answer}</div>}
    </div>
  );
}

export default function DevisPapierPeintChenove() {
  return (
    <main className="min-h-screen" style={{ background: "#fdf6f2" }}>

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#1f0f0a] px-8 py-4">
        <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>
          Premium<span className="text-[#fb923c]">Artisan</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/70 hover:text-white">Accueil</Link>
          <Link href="/devis-pose-papier-peint-dijon" className="text-sm text-white/70 hover:text-white">Papier peint Dijon</Link>
          <Link href="/devis-peinture-chenove" className="text-sm text-white/70 hover:text-white">Peinture Chenôve</Link>
          <Link href="#prix" className="text-sm text-white/70 hover:text-white">Prix</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-8 pb-16 pt-20" style={{ background: "linear-gradient(135deg, #1f0f0a 0%, #3d1a08 60%, #2a1005 100%)" }}>
        <div className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[900px]">

          {/* ANGLE UNIQUE — masquer les défauts béton */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fb923c]/40 bg-[#fb923c]/20 px-3.5 py-1.5 text-[13px] font-semibold text-[#fed7aa]">
            🧱 Chenôve 21300 — Solution murs béton années 70
          </div>

          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl" style={{ fontFamily: "serif" }}>
            Pose Papier Peint<br />à <em className="not-italic text-[#fed7aa]">Chenôve</em> :<br />La Solution Béton
          </h1>

          <p className="mb-8 max-w-[620px] text-lg text-white/75">
            Murs en béton irréguliers ? Le papier peint épais <strong className="text-white">180g/m²+</strong> masque les défauts sans enduit lourd. <strong className="text-white">30 à 40% moins cher</strong> qu'un lissage complet. 96 projets analysés à Chenôve.
          </p>

          <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[
              { value: "96", label: "Projets Chenôve" },
              { value: "11", label: "Poseurs locaux" },
              { value: "18–48€", label: "MO /m²" },
              { value: "-8%", label: "vs Dijon centre" },
              { value: "95%", label: "Satisfaction" },
            ].map((b, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{b.value}</div>
                <div className="mt-0.5 text-[11px] text-white/60">{b.label}</div>
              </div>
            ))}
          </div>

          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#c2410c] px-10 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(194,65,12,0.4)] transition hover:scale-105 hover:bg-[#ea580c]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Spécialistes béton</p>
        </div>
      </section>

      {/* AVANTAGE BÉTON — section unique */}
      <section className="bg-[#c2410c] px-8 py-5">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-wrap items-center justify-between gap-4 text-center text-white">
            {[
              { value: "180g/m²+", label: "Épaisseur recommandée béton" },
              { value: "-30 à -40%", label: "Économie vs enduit + peinture" },
              { value: "96", label: "Projets Chenôve 2025–2026" },
              { value: "HLM", label: "Spécialistes logements sociaux" },
              { value: "8–15€", label: "Décollement ancien revêtement /m²" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-bold" style={{ fontFamily: "serif" }}>{s.value}</div>
                <div className="text-xs text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEME / SOLUTION — unique à Chenôve */}
      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Le problème Chenôve</div>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-[#1f0f0a] md:text-4xl" style={{ fontFamily: "serif" }}>
            Murs en béton brut :<br />papier peint vs enduit
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#e8d4c8] bg-[#fdf6f2] p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">🧱</span>
                <span className="text-base font-bold text-[#1f0f0a]">Option A — Enduit + Peinture</span>
              </div>
              <ul className="space-y-2 text-[13px] text-[#5a3020]">
                <li>⏱️ Séchage enduit : 48–72h minimum</li>
                <li>💰 Coût : <strong>35–65€/m²</strong></li>
                <li>🔨 Travaux lourds, poussière</li>
                <li>📅 Délai chantier : 5–8 jours / pièce</li>
                <li>✅ Idéal si murs très dégradés</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-[#c2410c] p-6" style={{ background: "linear-gradient(135deg, #fff7ed, white)" }}>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span className="text-base font-bold text-[#1f0f0a]">Option B — Papier peint 180g/m²+</span>
              </div>
              <ul className="space-y-2 text-[13px] text-[#5a3020]">
                <li>⚡ Pose : 1–2 jours / pièce</li>
                <li>💰 Coût : <strong>22–48€/m²</strong> (fourniture + pose)</li>
                <li>🧹 Propre, sans poussière</li>
                <li>🔄 Retirable à sec si changement</li>
                <li>✅ Idéal murs béton légèrement irréguliers</li>
              </ul>
              <div className="mt-4 rounded-lg bg-[#c2410c]/10 px-3 py-2 text-[13px] font-bold text-[#c2410c]">
                💡 Économie moyenne : 30 à 40% vs enduit + peinture
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIX */}
      <section className="px-8 py-20" style={{ background: "#fdf6f2" }} id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Prix réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1f0f0a] md:text-5xl" style={{ fontFamily: "serif" }}>
            Prix pose papier peint<br />à Chenôve
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#5a3020]">
            Analyse de 96 projets publiés à Chenôve. Prix 8% inférieurs à Dijon centre grâce aux poseurs locaux qui n'ont pas de frais de déplacement.
          </p>

          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { room: "🛏️ Chambre 12m²", price: "580–1 200€", detail: "Intissé 180g · Prépa béton + pose + fourniture" },
              { room: "🛋️ Séjour HLM 18m²", price: "800–1 800€", detail: "Intissé épais · Idéal murs béton Chenôve" },
              { room: "🚪 Couloir HLM 6m²", price: "300–700€", detail: "Vinyle résistant · Passage quotidien" },
              { room: "🍳 Cuisine 10m²", price: "420–950€", detail: "Vinyle lavable · Anti-projections graisses" },
              { room: "📦 Décollement ancien PP", price: "8–15€/m²", detail: "Retrait à sec (intissé) ou humide (vinyle/trad.)" },
              { room: "🏢 Appartement HLM 55m²", price: "1 600–3 400€", detail: "Toutes pièces · Intissé standard + pose" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d4c8] bg-white p-5 transition hover:border-[#c2410c]">
                <div className="mb-2 text-base font-bold text-[#1f0f0a]">{r.room}</div>
                <div className="text-[22px] font-bold text-[#c2410c]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[12px] text-[#5a3020]">{r.detail}</div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1f0f0a] text-white">
                  <th className="rounded-tl-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Surface</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Intissé Chenôve</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Vinyle Chenôve</th>
                  <th className="rounded-tr-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Vs Dijon</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surf: "35m²", i: "1 000–2 100€", v: "1 300–2 800€", d: "-8% en moy." },
                  { surf: "55m²", i: "1 600–3 300€", v: "2 100–4 400€", d: "-8% en moy." },
                  { surf: "75m²", i: "2 100–4 500€", v: "2 800–6 000€", d: "-8% en moy." },
                  { surf: "100m²", i: "2 800–6 000€", v: "3 700–8 000€", d: "-8% en moy." },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-white">
                    <td className="border-b border-[#e8d4c8] px-4 py-3.5 text-sm font-semibold">{r.surf}</td>
                    <td className="border-b border-[#e8d4c8] px-4 py-3.5 text-sm font-bold text-[#c2410c]" style={{ fontFamily: "serif" }}>{r.i}</td>
                    <td className="border-b border-[#e8d4c8] px-4 py-3.5 text-sm font-bold text-[#c2410c]" style={{ fontFamily: "serif" }}>{r.v}</td>
                    <td className="border-b border-[#e8d4c8] px-4 py-3.5 text-sm font-bold text-[#1f0f0a]">{r.d}</td>
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
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1f0f0a] md:text-5xl" style={{ fontFamily: "serif" }}>
            Poseurs vérifiés<br />à Chenôve
          </h2>
          <p className="mb-12 max-w-[600px] text-base text-[#5a3020]">Spécialistes des murs en béton et des logements collectifs des années 1970–1985.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { initials: "JB", name: "Julien B. — Chenôve Déco Mural", spec: "Intissé épais · Béton · HLM Chenôve", exp: "14 ans · Spécialiste murs béton", zone: "Chenôve · Dijon Sud · Longvic", note: "4.9/5", chantiers: "198 chantiers" },
              { initials: "AL", name: "Amélie L. — Papiers & Couleurs", spec: "Intissé · Panoramique · Décollement", exp: "9 ans · Finitions soignées", zone: "Chenôve · Marsannay · Gevrey", note: "4.9/5", chantiers: "134 chantiers" },
              { initials: "RD", name: "Rémi D. — Revêtements 21", spec: "Vinyle technique · SDB · Cuisine HLM", exp: "7 ans · Pièces humides", zone: "Chenôve · Dijon · Côte-d'Or", note: "4.8/5", chantiers: "87 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d4c8] bg-[#fdf6f2] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #1f0f0a, #5a2005)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#1f0f0a]">{a.name}</div>
                    <div className="text-xs text-[#c2410c]">{a.note} · {a.chantiers}</div>
                  </div>
                </div>
                <div className="mb-2 text-[13px] font-semibold text-[#1f0f0a]">{a.spec}</div>
                <div className="mb-1 text-xs text-[#5a3020]">📅 {a.exp}</div>
                <div className="text-xs text-[#5a3020]">📍 {a.zone}</div>
                <a href="/publier-projet" className="mt-4 block rounded-xl bg-[#c2410c] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#ea580c]">
                  Demander un devis
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="px-8 py-20" style={{ background: "#fdf6f2" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c2410c]">Avis clients</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1f0f0a] md:text-5xl" style={{ fontFamily: "serif" }}>
            Ce qu'ils disent —<br />Chenôve
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Fatima O.", loc: "Chenôve · HLM Quartier du Mail · 58m²", text: "Mes murs en béton étaient horribles. On m'avait dit que l'enduit coûterait 3 200€. Julien a posé du papier intissé 200g pour 1 850€ — résultat identique. J'aurais dû le faire 5 ans plus tôt.", avatar: "FO" },
              { name: "Christophe V.", loc: "Chenôve · Appart 65m² · avant location", text: "Appartement entièrement retapissé avant mise en location. Amélie a terminé en 4 jours. Le locataire a signé immédiatement. Loyer supérieur de 80€/mois à l'estimation initiale. Excellent investissement.", avatar: "CV" },
              { name: "Nadia R.", loc: "Chenôve · Studio 28m² · cuisine + SDB", text: "Vinyle dans la cuisine et la salle de bain de mon studio. Rémi a fait des découpes parfaites autour de la hotte et de la douche. En 2 jours tout était fini. Propre, efficace, prix honnête.", avatar: "NR" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d4c8] bg-white p-6">
                <div className="mb-3 text-base text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <div className="mb-4 text-sm italic leading-relaxed text-[#5a3020]">"{t.text}"</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #1f0f0a, #5a2005)" }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-bold text-[#1f0f0a]">{t.name}</div>
                    <div className="text-xs text-[#5a3020]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNES */}
      <section className="px-8 py-20" style={{ background: "#1f0f0a" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#fed7aa]">Pages liées</div>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-white md:text-4xl" style={{ fontFamily: "serif" }}>
            Papier peint autour<br />de Chenôve
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", href: "/devis-pose-papier-peint-dijon", poseurs: "22", prix: "20–55€/m²" },
              { name: "Longvic", href: "/devis-pose-papier-peint-longvic", poseurs: "5", prix: "18–46€/m²" },
              { name: "Talant", href: "/devis-pose-papier-peint-talant", poseurs: "6", prix: "20–50€/m²" },
              { name: "Marsannay-la-Côte", href: "#", poseurs: "3", prix: "18–44€/m²" },
              { name: "Quetigny", href: "/devis-pose-papier-peint-quetigny", poseurs: "5", prix: "22–55€/m²" },
              { name: "Fontaine-lès-Dijon", href: "/devis-pose-papier-peint-fontaine-les-dijon", poseurs: "4", prix: "22–58€/m²" },
            ].map((q, i) => (
              <Link key={i} href={q.href} className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.06] p-5 no-underline transition hover:border-[#fed7aa] hover:bg-white/10">
                <div className="mb-3 text-lg font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Poseurs</span><span className="font-bold text-[#fed7aa]">{q.poseurs}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-white/50">Prix MO</span><span className="font-bold text-[#fed7aa]">{q.prix}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c2410c]">FAQ</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1f0f0a] md:text-5xl" style={{ fontFamily: "serif" }}>Questions fréquentes<br />— Papier peint Chenôve</h2>
          <div className="max-w-[700px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #1f0f0a, #3d1a08)" }}>
        <div className="mx-auto max-w-[1000px]">
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>
            Devis pose papier peint<br />gratuit à Chenôve
          </h2>
          <p className="mb-10 text-base text-white/70">11 poseurs locaux · Spécialistes béton & HLM · 8% moins cher que Dijon centre.</p>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#c2410c] px-12 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(194,65,12,0.4)] transition hover:scale-105 hover:bg-[#ea580c]">
            🎨 Publiez votre projet gratuitement
          </a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Papier Peint Chenôve", url: "https://premiumartisan.fr/devis-pose-papier-peint-chenove", areaServed: { "@type": "City", name: "Chenôve", postalCode: "21300" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "82" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}
