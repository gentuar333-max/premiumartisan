"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix d'une rénovation à Quetigny en 2026 ?", a: "Le prix moyen d'une rénovation à Quetigny varie entre 700–1400€/m². Commune résidentielle haut de gamme à l'est de Dijon, forte demande en rénovation de maisons individuelles et appartements de standing." },
  { q: "Combien de temps dure une rénovation à Quetigny ?", a: "Une rénovation légère : 2 à 4 semaines. Rénovation salle de bain ou cuisine : 3 à 6 semaines. Rénovation complète : 6 à 14 semaines selon la surface et la complexité." },
  { q: "Y a-t-il des aides pour rénover à Quetigny ?", a: "Oui. MaPrimeRénov', éco-PTZ, aides de Dijon Métropole et TVA réduite à 5.5% sur les travaux d'amélioration énergétique. Nos artisans RGE certifiés accompagnent vos démarches." },
  { q: "Comment choisir une entreprise de rénovation à Quetigny ?", a: "Vérifiez le SIRET, la garantie décennale pour les gros œuvres, l'assurance RC Pro, et comparez au minimum 3 devis. Sur PremiumArtisan, toutes nos entreprises sont pré-vérifiées sur 5 critères." },
  { q: "Est-ce gratuit de publier un projet sur PremiumArtisan ?", a: "Oui, 100% gratuit pour les particuliers. Vous recevez jusqu'à 4 devis sans engagement, sans spam." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[1.5px] py-5" style={{ borderColor: "#f472b640" }}>
      <div className="flex cursor-pointer items-center justify-between gap-4 font-bold" style={{ color: "#1f0a14" }} onClick={() => setOpen(!open)}>
        <span className="text-base">{question}</span>
        <span className="text-xl" style={{ color: "#db2777" }}>{open ? "−" : "+"}</span>
      </div>
      {open && <div className="mt-3 text-sm leading-relaxed" style={{ color: "#db2777cc" }}>{answer}</div>}
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
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-4 px-6 py-2.5 transition-transform duration-300"
      style={{ background: "#1f0a14", borderBottom: "2px solid #db2777", boxShadow: "0 4px 24px rgba(0,0,0,0.4)", transform: visible ? "translateY(0)" : "translateY(-100%)" }}>
      <div className="flex items-center gap-4">
        <span className="text-[15px] font-bold text-white" style={{ fontFamily: "serif" }}>Rénovation — Quetigny</span>
        <div className="hidden items-center md:flex">
          {["9 entreprises", "700–1400€/m²", "4.8/5 vérifiés", "3–6h"].map((t, i) => (
            <span key={i} className={`text-[12px] font-semibold text-white/60 ${i > 0 ? "border-l border-white/15 pl-3 ml-3" : ""}`}>{t}</span>
          ))}
        </div>
      </div>
      <a href="/publier-projet" className="shrink-0 rounded-[10px] px-5 py-2 text-[13px] font-bold text-white transition hover:-translate-y-px"
        style={{ background: "linear-gradient(135deg, #db2777, #f472b6)", boxShadow: "0 4px 14px rgba(244,114,182,0.3)" }}>
        Devis gratuit →
      </a>
    </div>
  );
}

function HeroMiniForm() {
  const [phone, setPhone] = useState("");
  const handleSubmit = () => {
    if (!phone.trim()) return;
    window.location.href = `/publier-projet/form?tel=${phone}&type=renovation-interieure&cp=21800`;
  };
  return (
    <div className="mb-6 max-w-[620px] rounded-[20px] p-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
      <div className="mb-3 text-[11px] font-bold uppercase tracking-[1.5px] text-white/50">Recevez vos devis en 3–6h — Gratuit</div>
      <div className="flex flex-wrap gap-2.5">
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Votre numéro de téléphone" autoComplete="tel"
          className="h-12 min-w-[200px] flex-1 rounded-xl px-4 text-[15px] font-semibold text-white placeholder-white/38 outline-none"
          style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.2)" }} />
        <button onClick={handleSubmit} className="h-12 rounded-xl px-6 text-[15px] font-bold text-white transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #db2777, #f472b6)", boxShadow: "0 8px 24px rgba(244,114,182,0.3)" }}>
          Recevoir mes devis →
        </button>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-3.5">
        {["Sans engagement", "Max 4 entreprises", "Données protégées", "96 projets analysés"].map((t, i) => (
          <span key={i} className="text-[12px] font-semibold text-white/42"><span className="text-green-400">✓ </span>{t}</span>
        ))}
      </div>
    </div>
  );
}

function MidPageCTA() {
  return (
    <div className="mt-9 flex flex-wrap items-center justify-between gap-6 rounded-[20px] p-8"
      style={{ background: "linear-gradient(135deg, #1f0a14ee 0%, #1f0a14 100%)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div>
        <h3 className="mb-1.5 text-[22px] font-bold text-white" style={{ fontFamily: "serif" }}>Ces prix correspondent à votre projet ?</h3>
        <p className="text-[14px] text-white/58">Obtenez une estimation précise de 3 entreprises vérifiées à Quetigny.</p>
        <div className="mt-2.5 flex flex-wrap gap-4">
          {[["96", "projets analysés"], ["4.8/5", "satisfaction"], ["3–6h", "réponse"], ["4 max", "entreprises"]].map(([v, l], i) => (
            <span key={i} className="text-[13px] font-semibold text-white/52"><strong className="text-white/88">{v}</strong> {l}</span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <a href="/publier-projet" className="rounded-[13px] px-6 py-3 text-[15px] font-bold text-white transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #db2777, #f472b6)", boxShadow: "0 8px 24px rgba(244,114,182,0.3)" }}>
          Obtenir mes devis gratuits →
        </a>
        <span className="text-[12px] text-white/30">Sans engagement · 100% gratuit</span>
      </div>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="mb-4 rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #1f0a14dd, #1f0a14)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <h4 className="mb-2.5 text-base font-bold text-white" style={{ fontFamily: "serif" }}>Prêt à rénover à Quetigny ?</h4>
      <p className="mb-4 text-[13px] leading-relaxed text-white/58">3 devis d'entreprises vérifiées sous 3–6h. MaPrimeRénov' accompagnée. Gratuit, sans engagement.</p>
      <a href="/publier-projet" className="block rounded-xl py-3 text-center text-[14px] font-bold text-white transition hover:-translate-y-0.5"
        style={{ background: "linear-gradient(135deg, #db2777, #f472b6)" }}>
        Obtenir mes devis →
      </a>
      <p className="mt-2 text-center text-[11px] text-white/28">96 projets · 4.8/5 · Sans spam</p>
    </div>
  );
}

const CLUSTER_LINKS = [
  { name: "Rénovation Dijon", href: "/devis-renovation-dijon", sub: "47 entreprises · 850€/m² moy." },
  { name: "Rénovation Chenôve", href: "/devis-renovation-chenove", sub: "14 entreprises · 680€/m² moy." },
  { name: "Rénovation Talant", href: "/devis-renovation-talant", sub: "11 entreprises · 720€/m² moy." },
  { name: "Rénovation Longvic", href: "/devis-renovation-longvic", sub: "10 entreprises · 660€/m² moy." },
  { name: "Rénovation Quetigny", href: "/devis-renovation-quetigny", sub: "9 entreprises · 950€/m² moy." },
  { name: "Rénovation Fontaine-lès-Dijon", href: "/devis-renovation-fontaine-les-dijon", sub: "8 entreprises · 1 050€/m² moy." },
];

export default function DevisRenovationQuetigny() {
  return (
    <main className="min-h-screen" style={{ background: "#fdf4f7" }}>
      <StickyBar />
      <nav className="flex items-center justify-between px-8 py-4" style={{ background: "#1f0a14" }}>
        <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>Premium<span style={{ color: "#f472b6" }}>Artisan</span></div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/70 hover:text-white">Accueil</Link>
          <Link href="/devis-renovation-dijon" className="text-sm text-white/70 hover:text-white">Rénovation Dijon</Link>
          <Link href="/devis-peinture-quetigny" className="text-sm text-white/70 hover:text-white">Peinture Quetigny</Link>
          <Link href="#prix" className="text-sm text-white/70 hover:text-white">Prix</Link>
        </div>
      </nav>

      <section className="relative overflow-hidden px-8 pb-16 pt-20" style={{ background: "linear-gradient(135deg, #1f0a14 0%, #1f0a14cc 60%, #1f0a14ee 100%)" }}>
        <div className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold" style={{ border: "1px solid #db277740", background: "#db277720", color: "#f472b6" }}>
            🏗️ Quetigny 21800 — Rénovation intérieure 2026
          </div>
          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl" style={{ fontFamily: "serif" }}>
            Rénovation Intérieure<br />à <em className="not-italic" style={{ color: "#f472b6" }}>Quetigny</em> — Prix<br />&amp; Devis Gratuit 2026
          </h1>
          <p className="mb-8 max-w-[600px] text-lg text-white/75">
            Comparez jusqu'à 4 entreprises vérifiées à Quetigny. <strong className="text-white">96 projets analysés.</strong> Commune résidentielle haut de gamme à l'est de Dijon, forte demande en rénovation de maisons individuelles et appartements de standing.
          </p>
          <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[{ value: "96", label: "Projets analysés" }, { value: "9", label: "Entreprises vérifiées" }, { value: "950€", label: "Prix moy./m²" }, { value: "3–6h", label: "Délai réponse" }, { value: "96%", label: "Satisfaction" }].map((b, i) => (
              <div key={i} className="rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-center">
                <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>{b.value}</div>
                <div className="mt-0.5 text-[11px] text-white/60">{b.label}</div>
              </div>
            ))}
          </div>
          <HeroMiniForm />
          <a href="/publier-projet" className="inline-block rounded-2xl px-10 py-5 text-center text-xl font-bold text-white transition hover:scale-105"
            style={{ background: "#db2777", boxShadow: "0 12px 32px rgba(244,114,182,0.3)" }}>
            🏗️ Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · 100% gratuit · Tous corps de métier</p>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#fdf4f7" }} id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#db2777" }}>Prix réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "serif", color: "#1f0a14" }}>Combien coûte une rénovation<br />à Quetigny ?</h2>
          <p className="mb-12 max-w-[600px] text-base" style={{ color: "#db2777aa" }}>Analyse de 96 projets publiés à Quetigny entre janvier 2025 et mars 2026.</p>
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { room: "🛁 Salle de bain", price: "3 500–10 000€", detail: "Plomberie + carrelage + sanitaires" },
              { room: "🍳 Cuisine", price: "7 000–22 000€", detail: "Meubles + électroménager + pose" },
              { room: "🛏️ Chambre", price: "2 000–5 500€", detail: "Sol + peinture + électricité" },
              { room: "🛋️ Salon/Séjour", price: "3 500–9 000€", detail: "Sol + peinture + luminaires" },
              { room: "🚽 WC", price: "900–3 000€", detail: "Plomberie + carrelage + sanitaires" },
              { room: "🏠 Entrée/Couloir", price: "1 200–3 500€", detail: "Sol + peinture + rangements" },
            ].map((r, i) => (
              <div key={i} className="rounded-2xl bg-white p-5 transition" style={{ border: "1.5px solid #f472b640" }}>
                <div className="mb-2 text-base font-bold" style={{ color: "#1f0a14" }}>{r.room}</div>
                <div className="text-[22px] font-bold" style={{ fontFamily: "serif", color: "#db2777" }}>{r.price}</div>
                <div className="mt-1 text-[12px]" style={{ color: "#db277799" }}>{r.detail}</div>
              </div>
            ))}
          </div>
          <MidPageCTA />
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#1f0a14" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#f472b6" }}>Cluster Rénovation</div>
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "serif" }}>Rénovation autour de Quetigny</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CLUSTER_LINKS.filter(l => !l.href.includes("quetigny")).map((q, i) => (
              <Link key={i} href={q.href} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 no-underline transition hover:border-white/40 hover:bg-white/10">
                <div className="mb-2 text-[17px] font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="text-[13px] text-white/50">{q.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#db2777" }}>Guide expert</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "serif", color: "#1f0a14" }}>Tout savoir sur la rénovation<br />à Quetigny</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="text-[15px] leading-relaxed" style={{ color: "#db2777cc" }}>
              <h3 className="mb-3 text-[22px] font-bold" style={{ fontFamily: "serif", color: "#1f0a14" }}>Le marché de la rénovation à Quetigny en 2026</h3>
              <p className="mb-4">Commune résidentielle haut de gamme à l'est de Dijon, forte demande en rénovation de maisons individuelles et appartements de standing. En 2025–2026, 96 projets ont été publiés sur notre plateforme, avec un budget moyen de 950€ par mètre carré.</p>
              <h3 className="mb-3 mt-6 text-[22px] font-bold" style={{ fontFamily: "serif", color: "#1f0a14" }}>Données du marché — Quetigny 2026</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Projets publiés 2025–2026 : <strong>96</strong></li>
                <li>Prix moyen/m² : <strong>950€</strong></li>
                <li>Entreprises actives : <strong>9</strong></li>
                <li>Délai réponse : <strong>3–6h</strong></li>
                <li>Satisfaction clients : <strong>96%</strong></li>
              </ul>
            </div>
            <div className="sticky top-6">
              <SidebarCTA />
              <div className="rounded-2xl bg-white p-6" style={{ border: "1.5px solid #f472b640" }}>
                <h4 className="mb-3 text-base font-bold" style={{ fontFamily: "serif", color: "#1f0a14" }}>🔗 Cluster Rénovation</h4>
                {CLUSTER_LINKS.filter(l => !l.href.includes("quetigny")).map((l, i) => (
                  <div key={i} className="flex justify-between py-2 text-[13px]">
                    <Link href={l.href} className="no-underline hover:underline" style={{ color: "#db2777" }}>{l.name}</Link>
                    <span className="font-bold" style={{ color: "#1f0a14" }}>→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20" style={{ background: "#fdf4f7" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#db2777" }}>FAQ</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "serif", color: "#1f0a14" }}>Questions fréquentes<br />— Rénovation Quetigny</h2>
          <div className="max-w-[700px]">{FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}</div>
        </div>
      </section>

      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#db2777" }}>Explorer</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "serif", color: "#1f0a14" }}>Pages liées</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Rénovation Dijon 21000", sub: "312 projets · 850€/m²", href: "/devis-renovation-dijon" },
              { title: "Rénovation Chenôve", sub: "189 projets · 680€/m²", href: "/devis-renovation-chenove" },
              { title: "Rénovation Talant", sub: "143 projets · 720€/m²", href: "/devis-renovation-talant" },
              { title: "Rénovation Longvic", sub: "118 projets · 660€/m²", href: "/devis-renovation-longvic" },
              { title: "Rénovation Quetigny", sub: "96 projets · 950€/m²", href: "/devis-renovation-quetigny" },
              { title: "Rénovation Fontaine", sub: "74 projets · 1 050€/m²", href: "/devis-renovation-fontaine-les-dijon" },
              { title: "Peinture Quetigny", sub: "Devis gratuit · 25–45€/m²", href: "/devis-peinture-quetigny" },
              { title: "MaPrimeRénov' 2026", sub: "Jusqu'à 70 000€ d'aides", href: "#" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="rounded-xl bg-white p-4 no-underline transition hover:-translate-y-0.5"
                style={{ border: "1.5px solid #f472b640" }}>
                <div className="mb-1 text-[13px] font-bold" style={{ color: "#1f0a14" }}>{link.title}</div>
                <div className="text-xs" style={{ color: "#db277799" }}>{link.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #1f0a14, #1f0a14cc)" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "#f472b6" }}>Prêt à rénover ?</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>Recevez vos devis rénovation<br />à Quetigny</h2>
          <p className="mb-3 text-base text-white/70">9 entreprises vérifiées à Quetigny. Sans engagement, sans spam.</p>
          <div className="mb-8 flex justify-center gap-5 text-[13px] text-white/45">
            <span>96 projets analysés</span><span>·</span><span>4.8/5</span><span>·</span><span>Réponse 3–6h</span>
          </div>
          <a href="/publier-projet" className="inline-block rounded-2xl px-12 py-5 text-center text-xl font-bold text-white transition hover:scale-105"
            style={{ background: "#db2777", boxShadow: "0 12px 32px rgba(244,114,182,0.3)" }}>
            🏗️ Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Tous corps de métier</p>
        </div>
      </section>
    </main>
  );
}