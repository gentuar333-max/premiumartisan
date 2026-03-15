"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix d'une rénovation à Chenôve en 2026 ?", a: "Le prix moyen d'une rénovation à Chenôve varie entre 550 et 950€/m² — soit 8 à 15% moins cher qu'à Dijon centre. Pour un appartement de 65m², comptez entre 36 000€ et 62 000€ pour une rénovation complète." },
  { q: "Quels travaux sont les plus demandés à Chenôve ?", a: "À Chenôve, 68% des projets concernent la rénovation de logements sociaux ou HLM : remplacement des fenêtres, isolation des murs, rénovation salle de bain et cuisine. 22% sont des rénovations complètes avant mise en vente." },
  { q: "Y a-t-il des aides spécifiques pour rénover à Chenôve ?", a: "Oui. MaPrimeRénov', aides Dijon Métropole, le programme ANRU pour le quartier du Mail (QPV), et l'ANAH pour les propriétaires modestes. Certains artisans RGE accompagnent ces démarches." },
  { q: "Combien de temps dure une rénovation à Chenôve ?", a: "Rénovation légère : 2 à 3 semaines. Rénovation salle de bain ou cuisine : 3 à 6 semaines. Rénovation complète : 6 à 14 semaines." },
  { q: "La ZUP de Chenôve bénéficie-t-elle d'aides renforcées ?", a: "Oui. Le quartier du Mail est classé QPV, ce qui ouvre droit à des aides ANRU renforcées. Les propriétaires peuvent obtenir jusqu'à 50% de subvention sur certains travaux de rénovation énergétique." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[1.5px] border-[#c8e6d8] py-5">
      <div className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[#0a1f14]" onClick={() => setOpen(!open)}>
        <span className="text-base">{question}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="mt-3 text-sm leading-relaxed text-[#2a5a3a]">{answer}</div>}
    </div>
  );
}

function StickyBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-4 border-b-2 border-[#059669] px-6 py-2.5 transition-transform duration-300"
      style={{ background: "#0a1f14", boxShadow: "0 4px 24px rgba(0,0,0,0.4)", transform: visible ? "translateY(0)" : "translateY(-100%)" }}>
      <div className="flex items-center gap-4">
        <span className="text-[15px] font-bold text-white" style={{ fontFamily: "serif" }}>Rénovation — Chenôve</span>
        <div className="hidden items-center md:flex">
          {["14 entreprises vérifiées", "680€/m² moy.", "-12% vs Dijon", "4.8/5 · 142 avis"].map((t, i) => (
            <span key={i} className={`text-[12px] font-semibold text-white/60 ${i > 0 ? "border-l border-white/15 pl-3 ml-3" : ""}`}>{t}</span>
          ))}
        </div>
      </div>
      <a href="/publier-projet" className="shrink-0 rounded-[10px] px-5 py-2 text-[13px] font-bold text-white transition hover:-translate-y-px"
        style={{ background: "linear-gradient(135deg, #059669, #10b981)", boxShadow: "0 4px 14px rgba(5,150,105,0.38)" }}>
        Devis gratuit →
      </a>
    </div>
  );
}

function HeroMiniForm() {
  const [phone, setPhone] = useState("");
  const handleSubmit = () => {
    if (!phone.trim()) return;
    window.location.href = `/publier-projet/form?tel=${phone}&type=renovation-interieure&cp=21300`;
  };
  return (
    <div className="mb-6 max-w-[620px] rounded-[20px] p-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
      <div className="mb-3 text-[11px] font-bold uppercase tracking-[1.5px] text-white/50">Recevez vos devis en 6h — Gratuit</div>
      <div className="flex flex-wrap gap-2.5">
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Votre numéro de téléphone" autoComplete="tel"
          className="h-12 min-w-[200px] flex-1 rounded-xl px-4 text-[15px] font-semibold text-white placeholder-white/38 outline-none"
          style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.2)" }} />
        <button onClick={handleSubmit} className="h-12 rounded-xl px-6 text-[15px] font-bold text-white transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #059669, #10b981)", boxShadow: "0 8px 24px rgba(5,150,105,0.38)" }}>
          Recevoir mes devis →
        </button>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-3.5">
        {["Sans engagement", "Max 4 entreprises", "Aides ANRU incluses", "189 projets analysés"].map((t, i) => (
          <span key={i} className="text-[12px] font-semibold text-white/42"><span className="text-green-400">✓ </span>{t}</span>
        ))}
      </div>
    </div>
  );
}

function MidPageCTA() {
  return (
    <div className="mt-9 flex flex-wrap items-center justify-between gap-6 rounded-[20px] p-8"
      style={{ background: "linear-gradient(135deg, #0a3a20 0%, #0a1f14 100%)", border: "1px solid rgba(110,231,183,0.15)" }}>
      <div>
        <h3 className="mb-1.5 text-[22px] font-bold text-white" style={{ fontFamily: "serif" }}>Ces prix correspondent à votre projet ?</h3>
        <p className="text-[14px] text-white/58">Obtenez une estimation précise — 8 à 15% moins cher qu'à Dijon centre.</p>
        <div className="mt-2.5 flex flex-wrap gap-4">
          {[["189", "projets analysés"], ["-12%", "vs Dijon"], ["sous 6h", "réponse"], ["4 max", "entreprises"]].map(([v, l], i) => (
            <span key={i} className="text-[13px] font-semibold text-white/52"><strong className="text-white/88">{v}</strong> {l}</span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <a href="/publier-projet" className="rounded-[13px] px-6 py-3 text-[15px] font-bold text-white transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #059669, #10b981)", boxShadow: "0 8px 24px rgba(5,150,105,0.38)" }}>
          Obtenir mes devis gratuits →
        </a>
        <span className="text-[12px] text-white/30">Sans engagement · 100% gratuit</span>
      </div>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="mb-4 rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #0a3a20, #0a1f14)", border: "1px solid rgba(110,231,183,0.15)" }}>
      <h4 className="mb-2.5 text-base font-bold text-white" style={{ fontFamily: "serif" }}>Prêt à rénover à Chenôve ?</h4>
      <p className="mb-4 text-[13px] leading-relaxed text-white/58">3 devis d'entreprises vérifiées sous 6h. Aides ANRU et MaPrimeRénov' accompagnées. Gratuit.</p>
      <a href="/publier-projet" className="block rounded-xl py-3 text-center text-[14px] font-bold text-white transition hover:-translate-y-0.5"
        style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}>
        Obtenir mes devis →
      </a>
      <p className="mt-2 text-center text-[11px] text-white/28">189 projets · 4.8/5 · Sans spam</p>
    </div>
  );
}

const CLUSTER_LINKS = [
  { name: "Rénovation Dijon", href: "/devis-renovation-dijon", sub: "47 entreprises · 850€/m² moy." },
  { name: "Rénovation Talant", href: "/devis-renovation-talant", sub: "11 entreprises · 560–980€/m²" },
  { name: "Rénovation Longvic", href: "/devis-renovation-longvic", sub: "10 entreprises · 500–900€/m²" },
  { name: "Rénovation Quetigny", href: "/devis-renovation-quetigny", sub: "9 entreprises · 700–1 400€/m²" },
  { name: "Rénovation Fontaine-lès-Dijon", href: "/devis-renovation-fontaine-les-dijon", sub: "8 entreprises · 750–1 500€/m²" },
];

export default function DevisRenovationChenove() {
  return (
    <main className="min-h-screen" style={{ background: "#f0faf4" }}>
      <StickyBar />
      <nav className="flex items-center justify-between bg-[#0a1f14] px-8 py-4">
        <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>Premium<span className="text-[#34d399]">Artisan</span></div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/70 hover:text-white">Accueil</Link>
          <Link href="/devis-renovation-dijon" className="text-sm text-white/70 hover:text-white">Rénovation Dijon</Link>
          <Link href="/devis-peinture-chenove" className="text-sm text-white/70 hover:text-white">Peinture Chenôve</Link>
          <Link href="#prix" className="text-sm text-white/70 hover:text-white">Prix</Link>
        </div>
      </nav>

      <section className="relative overflow-hidden px-8 pb-16 pt-20" style={{ background: "linear-gradient(135deg, #0a1f14 0%, #0a3a20 60%, #0a2a18 100%)" }}>
        <div className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#34d399]/40 bg-[#34d399]/20 px-3.5 py-1.5 text-[13px] font-semibold text-[#6ee7b7]">
            🏗️ Chenôve 21300 — Rénovation intérieure 2026
          </div>
          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl" style={{ fontFamily: "serif" }}>
            Rénovation Intérieure<br />à <em className="not-italic text-[#6ee7b7]">Chenôve</em> — Prix<br />& Devis Gratuit 2026
          </h1>
          <p className="mb-8 max-w-[600px] text-lg text-white/75">
            Comparez jusqu'à 4 entreprises de rénovation vérifiées à Chenôve. <strong className="text-white">189 projets analysés.</strong> Tarifs 8–15% moins chers qu'à Dijon centre.
          </p>
          <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[{ value: "189", label: "Projets analysés" }, { value: "14", label: "Entreprises vérifiées" }, { value: "680€", label: "Prix moy./m²" }, { value: "4–6h", label: "Délai réponse" }, { value: "95%", label: "Satisfaction" }].map((b, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{b.value}</div>
                <div className="mt-0.5 text-[11px] text-white/60">{b.label}</div>
              </div>
            ))}
          </div>
          <HeroMiniForm />
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#059669] px-10 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(5,150,105,0.4)] transition hover:scale-105 hover:bg-[#10b981]">
            🏗️ Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · 100% gratuit · Tous corps de métier</p>
        </div>
      </section>

      <section className="bg-[#059669] px-8 py-5">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex flex-wrap items-center justify-between gap-4 text-center text-white">
            {[{ value: "-12%", label: "vs prix Dijon centre" }, { value: "189", label: "Projets publiés 2025–2026" }, { value: "68%", label: "Logements sociaux rénovés" }, { value: "QPV", label: "Aides renforcées quartier Mail" }, { value: "14", label: "Entreprises tous corps de métier" }].map((s, i) => (
              <div key={i}><div className="text-2xl font-bold" style={{ fontFamily: "serif" }}>{s.value}</div><div className="text-xs text-white/70">{s.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#059669]">Types de projets à Chenôve</div>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-[#0a1f14] md:text-4xl" style={{ fontFamily: "serif" }}>Quels travaux de rénovation<br />à Chenôve en 2026 ?</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: "🏢", title: "Rénovation logement social", desc: "Isolation, fenêtres, salle de bain. Le cœur du marché chenôvien.", budget: "400–750€/m²", part: "68% des projets", aide: "Jusqu'à 50% ANRU" },
              { icon: "🔨", title: "Rénovation avant vente", desc: "Rafraîchissement complet pour valoriser avant mise en vente.", budget: "550–900€/m²", part: "22% des projets", aide: "TVA 5.5%" },
              { icon: "🏠", title: "Extension & combles", desc: "Aménagement combles, véranda, extension pavillonnaire.", budget: "800–1 400€/m²", part: "10% des projets", aide: "Éco-PTZ possible" },
            ].map((t, i) => (
              <div key={i} className={`rounded-2xl border-2 p-6 ${i === 0 ? "border-[#059669]" : "border-[#c8e6d8]"}`} style={i === 0 ? { background: "linear-gradient(135deg, #ecfdf5, white)" } : {}}>
                <div className="mb-3 text-[36px]">{t.icon}</div>
                <div className="mb-1 text-base font-bold text-[#0a1f14]">{t.title}</div>
                <div className="mb-3 text-[13px] text-[#2a5a3a]">{t.desc}</div>
                <div className="space-y-1 text-[13px]">
                  <div className="flex justify-between border-b border-[#c8e6d8] py-1"><span className="text-[#2a5a3a]">Budget</span><span className="font-bold text-[#059669]">{t.budget}</span></div>
                  <div className="flex justify-between border-b border-[#c8e6d8] py-1"><span className="text-[#2a5a3a]">Part Chenôve</span><span className="font-bold text-[#0a1f14]">{t.part}</span></div>
                  <div className="flex justify-between py-1"><span className="text-[#2a5a3a]">Aides dispo.</span><span className="font-bold text-[#059669]">{t.aide}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#f0faf4" }} id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#059669]">Prix réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#0a1f14] md:text-5xl" style={{ fontFamily: "serif" }}>Combien coûte une rénovation<br />à Chenôve ?</h2>
          <p className="mb-12 max-w-[600px] text-base text-[#2a5a3a]">Analyse de 189 projets publiés à Chenôve entre janvier 2025 et mars 2026. Prix inférieurs à Dijon centre grâce à la forte densité d'artisans locaux.</p>
          <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { room: "🛁 Salle de bain", price: "3 800–9 500€", detail: "8–15m² · Plomberie + carrelage + sanitaires" },
              { room: "🍳 Cuisine équipée", price: "6 500–18 000€", detail: "10–18m² · Meuble + électroménager + pose" },
              { room: "🛏️ Chambre", price: "2 000–5 000€", detail: "12–16m² · Sol + peinture + électricité" },
              { room: "🛋️ Séjour", price: "3 200–8 000€", detail: "18–30m² · Sol + peinture + luminaires" },
              { room: "🚽 WC", price: "950–2 800€", detail: "2–4m² · Plomberie + carrelage + sanitaires" },
              { room: "🪟 Fenêtres double vitrage", price: "600–1 200€", detail: "Par fenêtre · PVC ou alu · Pose incluse" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8e6d8] bg-white p-5 transition hover:border-[#059669]">
                <div className="mb-2 text-base font-bold text-[#0a1f14]">{r.room}</div>
                <div className="text-[22px] font-bold text-[#059669]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[12px] text-[#2a5a3a]">{r.detail}</div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0a1f14] text-white">
                  <th className="rounded-tl-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Surface</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Rénov. légère Chenôve</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Rénov. complète Chenôve</th>
                  <th className="rounded-tr-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Économie vs Dijon</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surf: "Studio 28m²", l: "4 200€ – 8 400€", c: "16 000€ – 35 000€", eco: "-1 200€ en moy." },
                  { surf: "Appartement 55m²", l: "8 000€ – 16 000€", c: "30 000€ – 65 000€", eco: "-2 800€ en moy." },
                  { surf: "Appartement 75m²", l: "11 000€ – 22 000€", c: "41 000€ – 88 000€", eco: "-4 100€ en moy." },
                  { surf: "Maison 100m²", l: "15 000€ – 30 000€", c: "55 000€ – 120 000€", eco: "-6 500€ en moy." },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-white">
                    <td className="border-b border-[#c8e6d8] px-4 py-3.5 text-sm font-semibold">{r.surf}</td>
                    <td className="border-b border-[#c8e6d8] px-4 py-3.5 text-sm font-bold text-[#059669]" style={{ fontFamily: "serif" }}>{r.l}</td>
                    <td className="border-b border-[#c8e6d8] px-4 py-3.5 text-sm font-bold text-[#059669]" style={{ fontFamily: "serif" }}>{r.c}</td>
                    <td className="border-b border-[#c8e6d8] px-4 py-3.5 text-sm font-bold text-[#0a1f14]">{r.eco}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <MidPageCTA />
        </div>
      </section>

      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#059669]">Aides financières 2026</div>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-[#0a1f14] md:text-4xl" style={{ fontFamily: "serif" }}>Financez votre rénovation<br />à Chenôve</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { icon: "🏛️", title: "MaPrimeRénov' 2026", desc: "Accessible à tous les propriétaires. Particulièrement adaptée aux logements des années 70 mal isolés.", montant: "Jusqu'à 70 000€" },
              { icon: "🏘️", title: "Aides ANRU — Quartier du Mail", desc: "Le quartier du Mail est classé QPV. Les propriétaires bénéficient d'aides renforcées jusqu'à 50% sur les travaux d'isolation.", montant: "Jusqu'à 50% subvention" },
              { icon: "🏦", title: "Éco-PTZ Dijon Métropole", desc: "Prêt à taux zéro cumulable avec MaPrimeRénov'. Artisans RGE de notre réseau accompagnent vos démarches.", montant: "Jusqu'à 50 000€" },
              { icon: "💰", title: "TVA réduite 5.5%", desc: "Applicable sur tous les travaux d'amélioration énergétique. Nos artisans certifiés vous font bénéficier automatiquement.", montant: "Économie 14.5%" },
            ].map((a, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border-[1.5px] border-[#c8e6d8] p-6 transition hover:border-[#059669]">
                <div className="shrink-0 text-[32px]">{a.icon}</div>
                <div>
                  <div className="mb-1 text-base font-bold text-[#0a1f14]">{a.title}</div>
                  <div className="mb-2 text-[13px] text-[#2a5a3a]">{a.desc}</div>
                  <div className="inline-block rounded-lg bg-[#ecfdf5] px-3 py-1 text-[13px] font-bold text-[#059669]">{a.montant}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#f0faf4" }} id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#059669]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#0a1f14] md:text-5xl" style={{ fontFamily: "serif" }}>Entreprises rénovation vérifiées<br />à Chenôve</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { initials: "TC", name: "Thierry C. — TC Rénovation", spec: "Rénovation complète logements sociaux", exp: "19 ans · Qualibat · RGE", zone: "Chenôve · Dijon Sud · Longvic", note: "4.9/5", ch: "178 chantiers" },
              { initials: "AB", name: "Atelier du Bâtiment 21", spec: "Cuisine · Salle de bain · Électricité", exp: "12 ans · RC Pro · Déc. 10 ans", zone: "Chenôve · Marsannay · Gevrey", note: "4.8/5", ch: "124 chantiers" },
              { initials: "RV", name: "Rénov Verte Chenôve", spec: "Isolation thermique & rénovation éco", exp: "8 ans · RGE certifié · ANRU agréé", zone: "Chenôve · Dijon · Côte-d'Or", note: "4.8/5", ch: "89 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8e6d8] bg-white p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #0a1f14, #0a4a28)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#0a1f14]">{a.name}</div>
                    <div className="text-xs text-[#059669]">{a.note} · {a.ch}</div>
                  </div>
                </div>
                <div className="mb-2 text-[13px] font-semibold text-[#0a1f14]">{a.spec}</div>
                <div className="mb-1 text-xs text-[#2a5a3a]">📅 {a.exp}</div>
                <div className="mb-4 text-xs text-[#2a5a3a]">📍 {a.zone}</div>
                <a href="/publier-projet" className="block rounded-xl bg-[#059669] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#10b981]">Demander un devis</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#059669]">Avis clients vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a1f14] md:text-5xl" style={{ fontFamily: "serif" }}>Ils ont rénové à Chenôve<br />avec PremiumArtisan</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Patrick V.", loc: "Chenôve · HLM 62m² · Quartier du Mail", text: "Grâce aux aides ANRU et MaPrimeRénov', ma rénovation complète n'a coûté que 8 000€ sur les 28 000€ de travaux. TC Rénovation a géré toutes les démarches. Je recommande vivement.", avatar: "PV" },
              { name: "Martine L.", loc: "Chenôve · Appartement 68m² avant vente", text: "Mon appartement stagnait depuis 6 mois. Après rénovation complète, vendu en 12 jours à 18 000€ de plus. L'investissement de 34 000€ était totalement justifié.", avatar: "ML" },
              { name: "Ahmed K.", loc: "Chenôve · Pavillon 88m²", text: "Extension de 22m² + rénovation complète. Atelier du Bâtiment 21 a coordonné tous les corps de métier en 11 semaines. Résultat impeccable, budget respecté à 3% près.", avatar: "AK" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#c8e6d8] bg-[#f0faf4] p-6">
                <div className="mb-3 text-base text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <div className="mb-4 text-sm italic leading-relaxed text-[#2a5a3a]">"{t.text}"</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #0a1f14, #0a4a28)" }}>{t.avatar}</div>
                  <div><div className="text-sm font-bold text-[#0a1f14]">{t.name}</div><div className="text-xs text-[#2a5a3a]">{t.loc}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#0a1f14" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#6ee7b7]">Cluster Rénovation</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Rénovation autour de Chenôve</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CLUSTER_LINKS.map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#6ee7b7] hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="text-[13px] text-white/50">{q.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#059669]">Guide expert</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a1f14] md:text-5xl" style={{ fontFamily: "serif" }}>Tout savoir sur la rénovation<br />à Chenôve</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="text-[15px] leading-relaxed text-[#2a5a3a]">
              <h3 className="mb-3 text-[22px] font-bold text-[#0a1f14]" style={{ fontFamily: "serif" }}>Le marché de la rénovation à Chenôve</h3>
              <p className="mb-4">Chenôve, commune de 14 000 habitants au sud de Dijon, présente l'un des marchés de rénovation les plus actifs de la métropole. Son parc immobilier, composé à 61% de logements collectifs dont beaucoup datent des années 1960–1980, génère une demande structurelle en travaux de réhabilitation et de mise aux normes.</p>
              <p className="mb-4">En 2025–2026, 189 projets ont été publiés — hausse de 31% vs 2024. Cette croissance s'explique par les obligations DPE, le programme ANRU du quartier du Mail, et l'activité immobilière du secteur sud.</p>
              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#0a1f14]" style={{ fontFamily: "serif" }}>Le programme ANRU au quartier du Mail</h3>
              <p className="mb-4">Le quartier du Mail, classé QPV, bénéficie depuis 2023 d'un programme ANRU de rénovation urbaine de 45 millions d'euros. Ce programme finance la réhabilitation thermique des tours et barres de logements collectifs.</p>
              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#0a1f14]" style={{ fontFamily: "serif" }}>Données du marché — Chenôve 2026</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Projets publiés 2025–2026 : <strong>189 (+31%)</strong></li>
                <li>Budget moyen par projet : <strong>29 500€</strong></li>
                <li>Prix moyen/m² : <strong>680€</strong> (vs 850€ Dijon centre)</li>
                <li>Part rénovation énergétique : <strong>44%</strong></li>
                <li>Satisfaction clients : <strong>95%</strong></li>
                <li>Économie vs Dijon centre : <strong>-12% en moyenne</strong></li>
              </ul>
            </div>
            <div className="sticky top-6">
              <SidebarCTA />
              <div className="mb-4 rounded-2xl border-[1.5px] border-[#c8e6d8] bg-[#f0faf4] p-6">
                <h4 className="mb-3 text-base font-bold text-[#0a1f14]" style={{ fontFamily: "serif" }}>📊 Données Chenôve 2026</h4>
                {[{ k: "Budget moyen", v: "29 500€" }, { k: "Prix moyen/m²", v: "680€" }, { k: "Projets publiés", v: "189" }, { k: "Entreprises actives", v: "14" }, { k: "Satisfaction", v: "95%" }, { k: "Économie vs Dijon", v: "-12%" }].map((s, i) => (
                  <div key={i} className="flex justify-between border-b border-[#c8e6d8] py-2 text-[13px] last:border-0">
                    <span className="text-[#2a5a3a]">{s.k}</span><span className="font-bold text-[#0a1f14]">{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border-[1.5px] border-[#c8e6d8] bg-[#f0faf4] p-6">
                <h4 className="mb-3 text-base font-bold text-[#0a1f14]" style={{ fontFamily: "serif" }}>🔗 Cluster Rénovation</h4>
                {CLUSTER_LINKS.map((l, i) => (
                  <div key={i} className="flex justify-between py-2 text-[13px]">
                    <Link href={l.href} className="text-[#059669] no-underline hover:underline">{l.name}</Link>
                    <span className="font-bold text-[#0a1f14]">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#f0faf4" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#059669]">FAQ</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a1f14] md:text-5xl" style={{ fontFamily: "serif" }}>Questions fréquentes<br />— Rénovation Chenôve</h2>
          <div className="max-w-[700px]">{FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}</div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#059669]">Explorer</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a1f14] md:text-5xl" style={{ fontFamily: "serif" }}>Pages liées</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Rénovation Dijon 21000", sub: "312 projets · 850€/m² moy.", href: "/devis-renovation-dijon" },
              { title: "Peinture Chenôve 21300", sub: "12 artisans · 26–40€/m²", href: "/devis-peinture-chenove" },
              { title: "Rénovation Longvic", sub: "10 entreprises · 500–900€/m²", href: "/devis-renovation-longvic" },
              { title: "Rénovation Talant", sub: "11 entreprises · 560–980€/m²", href: "/devis-renovation-talant" },
              { title: "Rénovation Quetigny", sub: "9 entreprises · 700–1 400€/m²", href: "/devis-renovation-quetigny" },
              { title: "Rénovation Fontaine", sub: "8 entreprises · 750–1 500€/m²", href: "/devis-renovation-fontaine-les-dijon" },
              { title: "Aides ANRU quartier Mail", sub: "QPV · Jusqu'à 50% subvention", href: "#" },
              { title: "MaPrimeRénov' Chenôve 2026", sub: "Jusqu'à 70 000€ d'aides", href: "#" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="rounded-xl border-[1.5px] border-[#c8e6d8] bg-[#f0faf4] p-4 no-underline transition hover:-translate-y-0.5 hover:border-[#059669]">
                <div className="mb-1 text-[13px] font-bold text-[#0a1f14]">{link.title}</div>
                <div className="text-xs text-[#2a5a3a]">{link.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #0a1f14, #0a3a20)" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#6ee7b7]">Prêt à rénover ?</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>Recevez vos devis rénovation<br />en moins de 6h à Chenôve</h2>
          <p className="mb-3 text-base text-white/70">14 entreprises vérifiées à Chenôve — 8 à 15% moins cher qu'à Dijon centre. Sans engagement.</p>
          <div className="mb-8 flex justify-center gap-5 text-[13px] text-white/45">
            <span>189 projets analysés</span><span>·</span><span>4.8/5 · 142 avis</span><span>·</span><span>Aides ANRU incluses</span>
          </div>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#059669] px-12 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(5,150,105,0.4)] transition hover:scale-105 hover:bg-[#10b981]">
            🏗️ Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Aides ANRU & MaPrimeRénov' incluses</p>
        </div>
      </section>
    </main>
  );
}