"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export const FAQ_ITEMS = [
  { q: "Quel est le prix d'une rénovation complète à Dijon en 2026 ?", a: "Le prix d'une rénovation complète à Dijon varie entre 800€ et 1 800€/m² selon l'ampleur des travaux. Pour un appartement de 60m² entièrement rénové (sol, murs, cuisine, salle de bain), comptez entre 48 000€ et 80 000€. Une rénovation partielle (peinture + sols) coûte entre 200€ et 400€/m²." },
  { q: "Quels corps de métier interviennent dans une rénovation à Dijon ?", a: "Une rénovation complète à Dijon mobilise généralement : maçon, plaquiste, électricien, plombier, carreleur, peintre et parqueteur. Sur PremiumArtisan, vous pouvez publier un projet global ou par corps de métier. Notre réseau compte 47 artisans tous corps confondus actifs à Dijon." },
  { q: "Combien de temps dure une rénovation à Dijon ?", a: "Une rénovation partielle (2–3 pièces) dure 2 à 4 semaines. Une rénovation complète d'un appartement de 60m² prend 6 à 12 semaines selon la complexité. Les chantiers à Dijon centre, dans les immeubles haussmanniens, sont souvent plus longs en raison des contraintes de copropriété." },
  { q: "Y a-t-il des aides financières pour rénover à Dijon ?", a: "Oui. Les habitants de Dijon peuvent bénéficier de MaPrimeRénov' (jusqu'à 90% des travaux d'isolation), de l'éco-PTZ (prêt sans intérêt jusqu'à 50 000€), des aides de Dijon Métropole pour la rénovation énergétique, et de la TVA réduite à 5.5% sur les travaux d'amélioration énergétique." },
  { q: "Comment choisir un bon entrepreneur de rénovation à Dijon ?", a: "Vérifiez le numéro SIRET, demandez une garantie décennale pour les gros œuvres, comparez minimum 3 devis détaillés, vérifiez les assurances RC Pro et demandez des références de chantiers similaires. Sur PremiumArtisan, tous nos artisans sont pré-vérifiés avec leurs certifications à jour." },
  { q: "Peut-on rénover un appartement en restant locataire à Dijon ?", a: "Pour des travaux importants, il vaut mieux se loger ailleurs pendant le chantier. Cependant, pour des rénovations légères (peinture, sols), il est souvent possible de maintenir une occupation partielle. Nos artisans dijonnais proposent des plannings adaptés pour minimiser les nuisances." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[1.5px] border-[#d0d4e8] py-5">
      <div className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[#0a0e2a]" onClick={() => setOpen(!open)}>
        <span className="text-base">{question}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="mt-3 text-sm leading-relaxed text-[#3a3e6a]">{answer}</div>}
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
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-4 border-b-2 border-[#4f46e5] px-6 py-2.5 transition-transform duration-300"
      style={{ background: "#0a0e2a", boxShadow: "0 4px 24px rgba(0,0,0,0.4)", transform: visible ? "translateY(0)" : "translateY(-100%)" }}>
      <div className="flex items-center gap-4">
        <span className="text-[15px] font-bold text-white" style={{ fontFamily: "serif" }}>Rénovation Intérieure — Dijon</span>
        <div className="hidden items-center md:flex">
          {["47 entreprises vérifiées", "850€/m² moy.", "Réponse en 4h", "4.8/5 · 203 avis"].map((t, i) => (
            <span key={i} className={`text-[12px] font-semibold text-white/60 ${i > 0 ? "border-l border-white/15 pl-3 ml-3" : ""}`}>{t}</span>
          ))}
        </div>
      </div>
      <a href="/publier-projet" className="shrink-0 rounded-[10px] px-5 py-2 text-[13px] font-bold text-white transition hover:-translate-y-px"
        style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1)", boxShadow: "0 4px 14px rgba(79,70,229,0.38)" }}>
        Devis gratuit →
      </a>
    </div>
  );
}

function HeroMiniForm() {
  const [phone, setPhone] = useState("");
  const handleSubmit = () => {
    if (!phone.trim()) return;
    window.location.href = `/publier-projet/form?tel=${phone}&type=renovation-interieure&cp=21000`;
  };
  return (
    <div className="mb-6 max-w-[620px] rounded-[20px] p-6"
      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
      <div className="mb-3 text-[11px] font-bold uppercase tracking-[1.5px] text-white/50">Recevez vos devis en 4h — Gratuit</div>
      <div className="flex flex-wrap gap-2.5">
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Votre numéro de téléphone" autoComplete="tel"
          className="h-12 min-w-[200px] flex-1 rounded-xl px-4 text-[15px] font-semibold text-white placeholder-white/38 outline-none"
          style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.2)" }} />
        <button onClick={handleSubmit} className="h-12 rounded-xl px-6 text-[15px] font-bold text-white transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1)", boxShadow: "0 8px 24px rgba(79,70,229,0.38)" }}>
          Recevoir mes devis →
        </button>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-3.5">
        {["Sans engagement", "Max 4 entreprises", "Données protégées", "312 projets analysés"].map((t, i) => (
          <span key={i} className="text-[12px] font-semibold text-white/42"><span className="text-green-400">✓ </span>{t}</span>
        ))}
      </div>
    </div>
  );
}

function MidPageCTA() {
  return (
    <div className="mt-9 flex flex-wrap items-center justify-between gap-6 rounded-[20px] p-8"
      style={{ background: "linear-gradient(135deg, #1a1e5a 0%, #0a0e2a 100%)", border: "1px solid rgba(165,180,252,0.15)" }}>
      <div>
        <h3 className="mb-1.5 text-[22px] font-bold text-white" style={{ fontFamily: "serif" }}>Ces prix correspondent à votre projet ?</h3>
        <p className="text-[14px] text-white/58">Obtenez une estimation précise de 3 entreprises vérifiées à Dijon.</p>
        <div className="mt-2.5 flex flex-wrap gap-4">
          {[["312", "projets analysés"], ["4.8/5", "satisfaction"], ["sous 4h", "réponse"], ["4 max", "entreprises"]].map(([v, l], i) => (
            <span key={i} className="text-[13px] font-semibold text-white/52"><strong className="text-white/88">{v}</strong> {l}</span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <a href="/publier-projet" className="rounded-[13px] px-6 py-3 text-[15px] font-bold text-white transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1)", boxShadow: "0 8px 24px rgba(79,70,229,0.38)" }}>
          Obtenir mes devis gratuits →
        </a>
        <span className="text-[12px] text-white/30">Sans engagement · 100% gratuit</span>
      </div>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="mb-4 rounded-2xl p-6"
      style={{ background: "linear-gradient(135deg, #1a1e5a, #0a0e2a)", border: "1px solid rgba(165,180,252,0.15)" }}>
      <h4 className="mb-2.5 text-base font-bold text-white" style={{ fontFamily: "serif" }}>Prêt à rénover ?</h4>
      <p className="mb-4 text-[13px] leading-relaxed text-white/58">Recevez 3 devis d'entreprises vérifiées à Dijon sous 4h. Gratuit, sans engagement.</p>
      <a href="/publier-projet" className="block rounded-xl py-3 text-center text-[14px] font-bold text-white transition hover:-translate-y-0.5"
        style={{ background: "linear-gradient(135deg, #4f46e5, #6366f1)" }}>
        Obtenir mes devis →
      </a>
      <p className="mt-2 text-center text-[11px] text-white/28">312 projets · 4.8/5 · Sans spam</p>
    </div>
  );
}

const CLUSTER_LINKS = [
  { name: "Rénovation Chenôve", href: "/devis-renovation-chenove", sub: "14 entreprises · 550–950€/m²" },
  { name: "Rénovation Talant", href: "/devis-renovation-talant", sub: "11 entreprises · 560–980€/m²" },
  { name: "Rénovation Longvic", href: "/devis-renovation-longvic", sub: "10 entreprises · 500–900€/m²" },
  { name: "Rénovation Quetigny", href: "/devis-renovation-quetigny", sub: "9 entreprises · 700–1 400€/m²" },
  { name: "Rénovation Fontaine-lès-Dijon", href: "/devis-renovation-fontaine-les-dijon", sub: "8 entreprises · 750–1 500€/m²" },
];

export default function DevisRenovationDijon() {
  return (
    <main className="min-h-screen" style={{ background: "#f4f5fd" }}>
      <StickyBar />

      <nav className="flex items-center justify-between bg-[#0a0e2a] px-8 py-4">
        <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>Premium<span className="text-[#818cf8]">Artisan</span></div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/70 hover:text-white">Accueil</Link>
          <Link href="/devis-peinture-interieure-dijon" className="text-sm text-white/70 hover:text-white">Peinture Dijon</Link>
          <Link href="#prix" className="text-sm text-white/70 hover:text-white">Prix</Link>
          <Link href="#artisans" className="text-sm text-white/70 hover:text-white">Artisans</Link>
        </div>
      </nav>

      <section className="relative overflow-hidden px-8 pb-16 pt-20" style={{ background: "linear-gradient(135deg, #0a0e2a 0%, #1a1e5a 60%, #0e1240 100%)" }}>
        <div className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#818cf8]/40 bg-[#818cf8]/20 px-3.5 py-1.5 text-[13px] font-semibold text-[#a5b4fc]">
            🏗️ Dijon 21000 — Rénovation intérieure 2026
          </div>
          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl" style={{ fontFamily: "serif" }}>
            Rénovation Intérieure<br />à <em className="not-italic text-[#a5b4fc]">Dijon</em> — Prix<br />& Devis Gratuit 2026
          </h1>
          <p className="mb-8 max-w-[600px] text-lg text-white/75">
            Comparez jusqu'à 4 entreprises de rénovation vérifiées à Dijon. <strong className="text-white">312 projets analysés.</strong> Prix réels constatés · Tous corps de métier · Réponse en 4h.
          </p>
          <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[
              { value: "312", label: "Projets analysés" },
              { value: "47", label: "Artisans vérifiés" },
              { value: "850€", label: "Prix moy./m²" },
              { value: "4h", label: "Délai réponse" },
              { value: "93%", label: "Satisfaction" },
            ].map((b, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{b.value}</div>
                <div className="mt-0.5 text-[11px] text-white/60">{b.label}</div>
              </div>
            ))}
          </div>
          <HeroMiniForm />
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#4f46e5] px-10 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(79,70,229,0.4)] transition hover:scale-105 hover:bg-[#6366f1]">
            🏗️ Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · 100% gratuit · Tous corps de métier</p>
        </div>
      </section>

      <section className="bg-white px-8 py-16">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#4f46e5]">Types de projets</div>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-[#0a0e2a] md:text-4xl" style={{ fontFamily: "serif" }}>Quel type de rénovation<br />à Dijon ?</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: "🖌️", title: "Rénovation légère", desc: "Peinture + sols + luminaires. Le plus courant à Dijon.", budget: "200–400€/m²", duree: "2–4 semaines", part: "48% des projets" },
              { icon: "🔨", title: "Rénovation intermédiaire", desc: "Cuisine, salle de bain, cloisons, électricité.", budget: "400–900€/m²", duree: "4–8 semaines", part: "35% des projets" },
              { icon: "🏗️", title: "Rénovation complète", desc: "Tout corps de métier, structure comprise.", budget: "800–1 800€/m²", duree: "8–20 semaines", part: "17% des projets" },
            ].map((t, i) => (
              <div key={i} className={`rounded-2xl border-2 p-6 ${i === 1 ? "border-[#4f46e5]" : "border-[#d0d4e8]"}`} style={i === 1 ? { background: "linear-gradient(135deg, #eef2ff, white)" } : {}}>
                <div className="mb-3 text-[36px]">{t.icon}</div>
                <div className="mb-1 text-base font-bold text-[#0a0e2a]">{t.title}</div>
                <div className="mb-3 text-[13px] text-[#3a3e6a]">{t.desc}</div>
                <div className="space-y-1 text-[13px]">
                  <div className="flex justify-between border-b border-[#d0d4e8] py-1"><span className="text-[#3a3e6a]">Budget</span><span className="font-bold text-[#4f46e5]">{t.budget}</span></div>
                  <div className="flex justify-between border-b border-[#d0d4e8] py-1"><span className="text-[#3a3e6a]">Durée</span><span className="font-bold text-[#0a0e2a]">{t.duree}</span></div>
                  <div className="flex justify-between py-1"><span className="text-[#3a3e6a]">Part Dijon</span><span className="font-bold text-[#0a0e2a]">{t.part}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#f4f5fd" }} id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#4f46e5]">Prix réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#0a0e2a] md:text-5xl" style={{ fontFamily: "serif" }}>Combien coûte une rénovation<br />intérieure à Dijon ?</h2>
          <p className="mb-12 max-w-[600px] text-base text-[#3a3e6a]">Analyse de 312 projets de rénovation publiés à Dijon entre janvier 2025 et mars 2026.</p>
          <h3 className="mb-6 text-xl font-bold text-[#0a0e2a]" style={{ fontFamily: "serif" }}>Prix par pièce — Dijon 2026</h3>
          <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { room: "🛁 Salle de bain", price: "4 500–12 000€", detail: "8–15m² · Plomberie + carrelage + sanitaires" },
              { room: "🍳 Cuisine", price: "8 000–25 000€", detail: "10–20m² · Meuble + électroménager + pose" },
              { room: "🛏️ Chambre", price: "2 500–6 000€", detail: "12–16m² · Sol + peinture + électricité" },
              { room: "🛋️ Salon/Séjour", price: "4 000–10 000€", detail: "20–35m² · Sol + peinture + luminaires" },
              { room: "🚽 WC", price: "1 200–3 500€", detail: "2–4m² · Plomberie + carrelage + sanitaires" },
              { room: "🏠 Entrée/Couloir", price: "1 500–4 000€", detail: "5–12m² · Sol + peinture + rangements" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#d0d4e8] bg-white p-5 transition hover:border-[#4f46e5]">
                <div className="mb-2 text-base font-bold text-[#0a0e2a]">{r.room}</div>
                <div className="text-[22px] font-bold text-[#4f46e5]" style={{ fontFamily: "serif" }}>{r.price}</div>
                <div className="mt-1 text-[12px] text-[#3a3e6a]">{r.detail}</div>
              </div>
            ))}
          </div>
          <h3 className="mb-6 text-xl font-bold text-[#0a0e2a]" style={{ fontFamily: "serif" }}>Prix par surface — Rénovation complète</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0a0e2a] text-white">
                  <th className="rounded-tl-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Bien</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Rénovation légère</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Rénovation complète</th>
                  <th className="rounded-tr-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Durée</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surf: "Studio 25m²", l: "5 000€ – 10 000€", c: "20 000€ – 45 000€", d: "2–8 semaines" },
                  { surf: "Appartement 50m²", l: "10 000€ – 20 000€", c: "40 000€ – 90 000€", d: "4–12 semaines" },
                  { surf: "Appartement 80m²", l: "16 000€ – 32 000€", c: "64 000€ – 144 000€", d: "6–16 semaines" },
                  { surf: "Maison 120m²", l: "24 000€ – 48 000€", c: "96 000€ – 216 000€", d: "10–24 semaines" },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-white">
                    <td className="border-b border-[#d0d4e8] px-4 py-3.5 text-sm font-semibold">{r.surf}</td>
                    <td className="border-b border-[#d0d4e8] px-4 py-3.5 text-sm font-bold text-[#4f46e5]" style={{ fontFamily: "serif" }}>{r.l}</td>
                    <td className="border-b border-[#d0d4e8] px-4 py-3.5 text-sm font-bold text-[#4f46e5]" style={{ fontFamily: "serif" }}>{r.c}</td>
                    <td className="border-b border-[#d0d4e8] px-4 py-3.5 text-sm">{r.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <MidPageCTA />
        </div>
      </section>

      <section className="bg-white px-8 py-20" id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#4f46e5]">Réseau vérifié</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#0a0e2a] md:text-5xl" style={{ fontFamily: "serif" }}>47 entreprises de rénovation<br />vérifiées à Dijon</h2>
          <p className="mb-12 max-w-[560px] text-base text-[#3a3e6a]">Chaque professionnel est contrôlé sur ses certifications, assurances et avis clients.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { initials: "DM", name: "David M.", enseigne: "Rénov & Lumière Dijon", spec: "Rénovation complète · Haussmannien · Lofts", exp: "18 ans · 420 projets à Dijon", zone: "Dijon centre · Grand Dijon", note: "5.0/5", nb: "420 chantiers" },
              { initials: "FC", name: "François C.", enseigne: "Bâtisseur 21 Dijon", spec: "Rénovation énergétique · RGE · MaPrimeRénov'", exp: "14 ans · Spécialiste DPE E/F/G", zone: "Dijon · Chenôve · Longvic", note: "4.9/5", nb: "287 chantiers" },
              { initials: "AP", name: "Antoine P.", enseigne: "Artisan Prestige Dijon", spec: "Rénovation intermédiaire · Cuisine · SDB", exp: "11 ans · Tous corps de métier", zone: "Dijon · Talant · Quetigny", note: "4.8/5", nb: "198 chantiers" },
            ].map((a, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#d0d4e8] bg-[#f4f5fd] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #0a0e2a, #2a2e8a)" }}>{a.initials}</div>
                  <div>
                    <div className="font-bold text-[#0a0e2a]">{a.name}</div>
                    <div className="text-[11px] text-[#4f46e5]">{a.enseigne}</div>
                    <div className="text-[11px] text-[#4f46e5]">{a.note} · {a.nb}</div>
                  </div>
                </div>
                <p className="mb-2 text-[13px] font-semibold text-[#0a0e2a]">{a.spec}</p>
                <p className="mb-1 text-[12px] text-[#3a3e6a]">📅 {a.exp}</p>
                <p className="mb-4 text-[12px] text-[#3a3e6a]">📍 {a.zone}</p>
                <a href="/publier-projet" className="block rounded-xl bg-[#4f46e5] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#6366f1]">Demander un devis</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#4f46e5]">Avis clients vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a0e2a] md:text-5xl" style={{ fontFamily: "serif" }}>Ils ont rénové leur logement<br />à Dijon</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Laurent P.", loc: "Dijon Centre · Appart haussmannien 80m²", text: "Rénovation complète d'un appartement haussmannien rue Bossuet. David et son équipe ont géré tous les corps de métier. 10 semaines de chantier, résultat parfait. L'appartement vaut aujourd'hui 40% de plus.", avatar: "LP" },
              { name: "Sandrine R.", loc: "Montchapet · Maison 115m²", text: "Rénovation énergétique complète avec MaPrimeRénov'. L'équipe a géré toutes les démarches administratives. Économie de 65% sur ma facture de chauffage la première année. Investissement rentabilisé en 7 ans.", avatar: "SR" },
              { name: "Julien K.", loc: "Maladière · Loft 90m²", text: "Transformation d'un ancien atelier en loft moderne. Rénov & Lumière a su respecter le caractère industriel du lieu tout en le modernisant. Résultat bluffant, exactement ce que j'imaginais.", avatar: "JK" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#d0d4e8] p-6">
                <div className="mb-3 text-base text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <div className="mb-4 text-sm italic leading-relaxed text-[#3a3e6a]">"{t.text}"</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #0a0e2a, #2a2e8a)" }}>{t.avatar}</div>
                  <div><div className="text-sm font-bold text-[#0a0e2a]">{t.name}</div><div className="text-xs text-[#3a3e6a]">{t.loc}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#0a0e2a" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#a5b4fc]">Communes voisines</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Rénovation autour de Dijon</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CLUSTER_LINKS.map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-[#a5b4fc] hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="text-[13px] text-white/50">{q.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#4f46e5]">Guide expert</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a0e2a] md:text-5xl" style={{ fontFamily: "serif" }}>Tout savoir sur la rénovation<br />intérieure à Dijon</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="text-[15px] leading-relaxed text-[#3a3e6a]">
              <h3 className="mb-3 text-[22px] font-bold text-[#0a0e2a]" style={{ fontFamily: "serif" }}>Le marché de la rénovation à Dijon en 2026</h3>
              <p className="mb-4">Dijon, préfecture de la Côte-d'Or et capitale des Ducs de Bourgogne, compte 156 000 habitants et un parc immobilier d'exception. Avec 28 000 logements construits avant 1975 et 8 500 appartements dans des immeubles haussmanniens ou bourgeois du centre historique, la ville génère l'un des marchés de rénovation les plus dynamiques de Bourgogne-Franche-Comté.</p>
              <p className="mb-4">En 2025–2026, notre plateforme a enregistré 312 projets de rénovation publiés à Dijon — en hausse de 28% vs 2024. Cette croissance est portée par trois facteurs : l'arrivée du TGV (Paris–Dijon en 1h25), la hausse des prix immobiliers (+12% en 3 ans) et les nouvelles obligations de rénovation énergétique.</p>
              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#0a0e2a]" style={{ fontFamily: "serif" }}>Rénovation et DPE : l'urgence dijonnaise</h3>
              <p className="mb-4">À Dijon, 34% des logements sont classés DPE E, F ou G. Avec l'interdiction de louer les DPE G dès 2025 et les DPE F dès 2028, des milliers de propriétaires dijonnais doivent rénover en urgence.</p>
              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#0a0e2a]" style={{ fontFamily: "serif" }}>Données du marché — Dijon rénovation 2026</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Projets publiés 2025–2026 : <strong>312 (+28%)</strong></li>
                <li>Budget moyen par projet : <strong>38 500€</strong></li>
                <li>Part projets rénovation énergétique : <strong>41%</strong></li>
                <li>Logements DPE E/F/G à Dijon : <strong>34%</strong></li>
                <li>Satisfaction clients : <strong>93%</strong></li>
              </ul>
            </div>
            <div className="sticky top-6">
              <SidebarCTA />
              <div className="mb-4 rounded-2xl border-[1.5px] border-[#d0d4e8] bg-[#f4f5fd] p-6">
                <h4 className="mb-3 text-base font-bold text-[#0a0e2a]" style={{ fontFamily: "serif" }}>📊 Données rénovation Dijon</h4>
                {[{ k: "Budget moyen", v: "38 500€" }, { k: "Prix moyen/m²", v: "850€" }, { k: "Projets publiés", v: "312" }, { k: "Entreprises actives", v: "47" }, { k: "Satisfaction", v: "93%" }, { k: "Délai réponse", v: "4–8h" }].map((s, i) => (
                  <div key={i} className="flex justify-between border-b border-[#d0d4e8] py-2 text-[13px] last:border-0">
                    <span className="text-[#3a3e6a]">{s.k}</span><span className="font-bold text-[#0a0e2a]">{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border-[1.5px] border-[#d0d4e8] bg-[#f4f5fd] p-6">
                <h4 className="mb-3 text-base font-bold text-[#0a0e2a]" style={{ fontFamily: "serif" }}>🔗 Cluster Rénovation</h4>
                {CLUSTER_LINKS.map((l, i) => (
                  <div key={i} className="flex justify-between py-2 text-[13px]">
                    <Link href={l.href} className="text-[#4f46e5] no-underline hover:underline">{l.name}</Link>
                    <span className="font-bold text-[#0a0e2a]">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#f4f5fd" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#4f46e5]">FAQ</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a0e2a] md:text-5xl" style={{ fontFamily: "serif" }}>Questions fréquentes<br />— Rénovation Dijon</h2>
          <div className="max-w-[700px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#4f46e5]">Explorer</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#0a0e2a] md:text-5xl" style={{ fontFamily: "serif" }}>Pages liées</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Peinture Dijon 21000", sub: "47 artisans · 25–45€/m²", href: "/devis-peinture-interieure-dijon" },
              { title: "Rénovation Chenôve", sub: "14 entreprises · 550–950€/m²", href: "/devis-renovation-chenove" },
              { title: "Rénovation Talant", sub: "11 entreprises · 560–980€/m²", href: "/devis-renovation-talant" },
              { title: "Rénovation Longvic", sub: "10 entreprises · 500–900€/m²", href: "/devis-renovation-longvic" },
              { title: "Rénovation Quetigny", sub: "9 entreprises · 700–1 400€/m²", href: "/devis-renovation-quetigny" },
              { title: "Rénovation Fontaine", sub: "8 entreprises · 750–1 500€/m²", href: "/devis-renovation-fontaine-les-dijon" },
              { title: "Salle de bain Dijon", sub: "4 500–12 000€ · Devis gratuit", href: "/devis-salle-de-bain-dijon" },
              { title: "Cuisine Dijon", sub: "34 cuisinistes · 8 000–55 000€", href: "/devis-cuisine-dijon" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="rounded-xl border-[1.5px] border-[#d0d4e8] bg-[#f4f5fd] p-4 no-underline transition hover:-translate-y-0.5 hover:border-[#4f46e5]">
                <div className="mb-1 text-[13px] font-bold text-[#0a0e2a]">{link.title}</div>
                <div className="text-xs text-[#3a3e6a]">{link.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #0a0e2a, #1a1e5a)" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#a5b4fc]">Prêt à rénover ?</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>Recevez vos devis rénovation<br />en moins de 4h à Dijon</h2>
          <p className="mb-3 text-base text-white/70">47 entreprises de rénovation vérifiées à Dijon — tous corps de métier. Sans engagement.</p>
          <div className="mb-8 flex justify-center gap-5 text-[13px] text-white/45">
            <span>312 projets analysés</span><span>·</span><span>4.8/5 · 203 avis</span><span>·</span><span>Réponse sous 4h</span>
          </div>
          <a href="/publier-projet" className="inline-block rounded-2xl bg-[#4f46e5] px-12 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(79,70,229,0.4)] transition hover:scale-105 hover:bg-[#6366f1]">
            🏗️ Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Tous corps de métier</p>
        </div>
      </section>
    </main>
  );
}