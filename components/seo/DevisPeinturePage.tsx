"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const FAQ_ITEMS = [
  { q: "Quel est le prix de la peinture intérieure à Dijon en 2026 ?", a: "Le prix moyen de la peinture intérieure à Dijon varie entre 25€ et 45€/m² selon la finition choisie. Pour un appartement de 60m², comptez entre 1 500€ et 3 000€ tout compris." },
  { q: "Combien de temps faut-il pour trouver un artisan peintre à Dijon ?", a: "Sur PremiumArtisan, vous recevez vos premiers devis en 2 à 4h. Le délai moyen pour démarrer un chantier est de 1 à 3 semaines selon la saison." },
  { q: "Les artisans à Dijon sont-ils disponibles rapidement ?", a: "Oui, notre réseau compte 18 artisans peintres actifs à Dijon et en Côte-d'Or. En basse saison, la disponibilité est excellente. En été, prévoyez 2 à 4 semaines de délai." },
  { q: "Comment choisir un bon peintre à Dijon ?", a: "Vérifiez le numéro SIRET, demandez des photos de chantiers précédents, comparez minimum 3 devis et lisez les avis clients. Sur PremiumArtisan, tous nos artisans sont pré-vérifiés." },
  { q: "Est-ce gratuit de publier un projet sur PremiumArtisan ?", a: "Oui, la publication d'un projet est 100% gratuite pour les particuliers. Vous recevez jusqu'à 3 devis sans engagement." },
  { q: "Quelle différence entre peinture mate et satinée ?", a: "La peinture mate cache mieux les imperfections. La peinture satinée est plus résistante et lessivable. Le prix est similaire, la différence est surtout dans la durabilité." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[1.5px] border-[#e0d8ce] py-5">
      <div className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[#1a1714]" onClick={() => setOpen(!open)}>
        <span className="text-base">{question}</span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="mt-3 text-sm leading-relaxed text-[#7a6f65]">{answer}</div>}
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
    <div
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-4 border-b-2 border-[#c8531a] px-6 py-2.5 transition-transform duration-300"
      style={{ background: "#1a1714", boxShadow: "0 4px 24px rgba(0,0,0,0.4)", transform: visible ? "translateY(0)" : "translateY(-100%)" }}
    >
      <div className="flex items-center gap-4">
        <span className="text-[15px] font-bold text-white" style={{ fontFamily: "serif" }}>Peinture Intérieure — Dijon</span>
        <div className="hidden items-center md:flex">
          {["18 artisans vérifiés", "25–45€/m²", "Réponse en 2–4h", "4.8/5 · 127 avis"].map((t, i) => (
            <span key={i} className={`text-[12px] font-semibold text-white/58 ${i > 0 ? "border-l border-white/13 pl-3 ml-3" : ""}`}>{t}</span>
          ))}
        </div>
      </div>
      <a href="/publier-projet/form" className="shrink-0 rounded-[10px] px-5 py-2 text-[13px] font-bold text-white transition hover:-translate-y-px"
        style={{ background: "linear-gradient(135deg, #c8531a, #e8832a)", boxShadow: "0 4px 14px rgba(200,83,26,0.38)" }}>
        Devis gratuit →
      </a>
    </div>
  );
}

function HeroMiniForm() {
  const [phone, setPhone] = useState("");
  const handleSubmit = () => {
    if (!phone.trim()) return;
    const params = new URLSearchParams({ tel: phone, type: "peinture-interieure", cp: "21000" });
    window.location.href = `/publier-projet/form?${params.toString()}`;
  };
  return (
    <div className="mb-6 max-w-[620px] rounded-[20px] p-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
      <div className="mb-3 text-[11px] font-bold uppercase tracking-[1.5px] text-white/50">Recevez vos devis en 2–4h — Gratuit</div>
      <div className="flex flex-wrap gap-2.5">
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Votre numéro de téléphone" autoComplete="tel"
          className="h-12 min-w-[200px] flex-1 rounded-xl px-4 text-[15px] font-semibold text-white placeholder-white/38 outline-none"
          style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.2)" }} />
        <button onClick={handleSubmit} className="h-12 rounded-xl px-6 text-[15px] font-bold text-white transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #c8531a, #e8832a)", boxShadow: "0 8px 24px rgba(200,83,26,0.38)" }}>
          Recevoir mes devis →
        </button>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-3.5">
        {["Sans engagement", "Max 3 artisans", "Données protégées", "312 projets analysés"].map((t, i) => (
          <span key={i} className="text-[12px] font-semibold text-white/42"><span className="text-green-400">✓ </span>{t}</span>
        ))}
      </div>
    </div>
  );
}

function MidPageCTA() {
  return (
    <div className="mt-9 flex flex-wrap items-center justify-between gap-6 rounded-[20px] p-8"
      style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0a2240 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div>
        <h3 className="mb-1.5 text-[22px] font-bold text-white" style={{ fontFamily: "serif" }}>Ces prix correspondent à votre projet ?</h3>
        <p className="text-[14px] text-white/58">Obtenez une estimation précise de 3 artisans vérifiés à Dijon.</p>
        <div className="mt-2.5 flex flex-wrap gap-4">
          {[["312", "projets analysés"], ["4.8/5", "satisfaction"], ["sous 4h", "réponse"], ["3 max", "artisans"]].map(([v, l], i) => (
            <span key={i} className="text-[13px] font-semibold text-white/52"><strong className="text-white/88">{v}</strong> {l}</span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <a href="/publier-projet/form" className="rounded-[13px] px-6 py-3 text-[15px] font-bold text-white transition hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #c8531a, #e8832a)", boxShadow: "0 8px 24px rgba(200,83,26,0.38)" }}>
          Obtenir mes devis gratuits →
        </a>
        <span className="text-[12px] text-white/30">Sans engagement · 100% gratuit</span>
      </div>
    </div>
  );
}

function SidebarCTA() {
  return (
    <div className="mb-4 rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #1e3a5f, #0a2240)", border: "1px solid transparent" }}>
      <h4 className="mb-2.5 text-base font-bold text-white" style={{ fontFamily: "serif" }}>Prêt à démarrer ?</h4>
      <p className="mb-4 text-[13px] leading-relaxed text-white/58">Recevez 3 devis de peintres vérifiés à Dijon sous 4h. Gratuit, sans engagement.</p>
      <a href="/publier-projet/form" className="block rounded-xl py-3 text-center text-[14px] font-bold text-white transition hover:-translate-y-0.5"
        style={{ background: "linear-gradient(135deg, #c8531a, #e8832a)" }}>
        Obtenir mes devis →
      </a>
      <p className="mt-2 text-center text-[11px] text-white/28">312 projets · 4.8/5 · Sans spam</p>
    </div>
  );
}

export default function DevisPeinturePage() {
  return (
    <main className="min-h-screen" style={{ background: "#f8f5ef" }}>
      <StickyBar />

      {/* NAV */}
      <nav className="flex items-center justify-between bg-[#1a1714] px-8 py-4">
        <div className="text-xl font-bold text-white" style={{ fontFamily: "serif" }}>Premium<span className="text-[#e8832a]">Artisan</span></div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/70 hover:text-white">Accueil</Link>
          <Link href="#prix" className="text-sm text-white/70 hover:text-white">Prix</Link>
          <Link href="#artisans" className="text-sm text-white/70 hover:text-white">Artisans</Link>
          <Link href="/publier-projet/form" className="text-sm text-white/70 hover:text-white">Devis gratuit</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-8 pb-16 pt-20" style={{ background: "linear-gradient(135deg, #1a1714 0%, #1e3a5f 60%, #1a3a5f 100%)" }}>
        <div className="pointer-events-none absolute -right-[20%] -top-[50%] h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(200,83,26,0.15) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c8531a]/40 bg-[#c8531a]/20 px-3.5 py-1.5 text-[13px] font-semibold text-[#e8832a]">
            📍 Dijon & Côte-d'Or — Données 2026
          </div>
          <h1 className="mb-5 text-4xl font-black leading-tight text-white md:text-6xl" style={{ fontFamily: "serif" }}>
            Peinture Intérieure<br />à <em className="not-italic text-[#e8832a]">Dijon</em> — Prix<br />& Devis Gratuit 2026
          </h1>
          <p className="mb-8 max-w-[600px] text-lg text-white/75">
            Comparez jusqu'à 3 artisans peintres vérifiés à Dijon. Prix moyen constaté : <strong className="text-white">25–45€/m²</strong>. Réponse en 2 à 4h, sans engagement.
          </p>
          <div className="mb-8 flex flex-wrap gap-4">
            {[
              { value: "⭐ 4.8/5", label: "Avis clients" },
              { value: "18", label: "Peintres à Dijon" },
              { value: "2–4h", label: "Réponse moyenne" },
              { value: "Max 3", label: "Artisans (anti-spam)" },
              { value: "100%", label: "Gratuit & sans engagement" },
            ].map((b, i) => (
              <div key={i} className="min-w-[130px] rounded-xl border border-white/15 bg-white/[0.08] px-5 py-4 text-center">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: "serif" }}>{b.value}</div>
                <div className="mt-0.5 text-xs text-white/60">{b.label}</div>
              </div>
            ))}
          </div>
          <HeroMiniForm />
          <a href="/publier-projet/form" className="inline-block rounded-2xl bg-[#c8531a] px-10 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(200,83,26,0.4)] transition hover:scale-105 hover:bg-[#e8832a]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Max 3 artisans · Réponse en 2–4h</p>
        </div>
      </section>

      {/* PRIX */}
      <section className="bg-white px-8 py-20" id="prix">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c8531a]">Prix réels 2026</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Combien coûte la peinture<br />intérieure à Dijon ?</h2>
          <p className="mb-12 max-w-[600px] text-base text-[#7a6f65]">Données collectées sur 312 projets publiés sur notre plateforme à Dijon. Prix observés entre janvier et mars 2026.</p>
          <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { label: "Peinture murale", price: "25–40€", details: ["Main d'œuvre: 15–20€/m²", "Fournitures: 8–12€/m²", "Préparation: 4–8€/m²"], featured: false },
              { label: "Peinture plafond ⭐", price: "30–50€", details: ["Main d'œuvre: 18–25€/m²", "Fournitures: 8–14€/m²", "Préparation: 4–11€/m²"], featured: true },
              { label: "Rénovation complète", price: "35–55€", details: ["Murs + plafonds + boiseries", "Enduit & rebouchage inclus", "Protection mobilier incluse"], featured: false },
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl border-2 p-6 transition hover:-translate-y-1 ${c.featured ? "border-[#c8531a]" : "border-[#e0d8ce] hover:border-[#c8531a]"}`} style={c.featured ? { background: "linear-gradient(135deg, #fff5f0, white)" } : {}}>
                <div className="mb-2 text-[13px] font-semibold text-[#7a6f65]">{c.label}</div>
                <div className="text-[32px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>{c.price}</div>
                <div className="text-sm text-[#7a6f65]">par m²</div>
                <div className="mt-4 space-y-1 text-[13px] text-[#7a6f65]">
                  {c.details.map((d, j) => <div key={j} className={j < 2 ? "border-b border-[#e0d8ce] py-1" : "py-1"}>{d}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1a1714] text-white">
                  <th className="rounded-tl-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Surface logement</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Peinture simple</th>
                  <th className="px-4 py-3.5 text-left text-[13px] font-semibold">Rénovation complète</th>
                  <th className="rounded-tr-[10px] px-4 py-3.5 text-left text-[13px] font-semibold">Délai chantier</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { surf: "Studio 25m²", s: "875€ – 1 125€", r: "1 200€ – 1 800€", d: "2–3 jours" },
                  { surf: "Appartement 60m²", s: "1 500€ – 2 500€", r: "2 500€ – 4 000€", d: "4–6 jours" },
                  { surf: "Appartement 90m²", s: "2 500€ – 4 000€", r: "4 000€ – 6 500€", d: "6–8 jours" },
                  { surf: "Maison 120m²", s: "3 600€ – 5 400€", r: "5 500€ – 8 500€", d: "8–12 jours" },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-[#f8f5ef]">
                    <td className="border-b border-[#e0d8ce] px-4 py-3.5 text-sm">{r.surf}</td>
                    <td className="border-b border-[#e0d8ce] px-4 py-3.5 text-sm font-bold text-[#c8531a]" style={{ fontFamily: "serif" }}>{r.s}</td>
                    <td className="border-b border-[#e0d8ce] px-4 py-3.5 text-sm font-bold text-[#c8531a]" style={{ fontFamily: "serif" }}>{r.r}</td>
                    <td className="border-b border-[#e0d8ce] px-4 py-3.5 text-sm">{r.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <MidPageCTA />
        </div>
      </section>

      {/* DELAIS */}
      <section className="px-8 py-20" style={{ background: "#f8f5ef" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c8531a]">Délais moyens</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Combien de temps pour<br />trouver un peintre à Dijon ?</h2>
          <p className="mb-12 max-w-[600px] text-base text-[#7a6f65]">À Dijon, la demande en peinture intérieure augmente, surtout dans les appartements anciens du centre-ville et les maisons autour de Talant, Chenôve et Fontaine-lès-Dijon.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", time: "2–4h", label: "Premiers devis reçus" },
              { icon: "📅", time: "1–3 sem.", label: "Délai démarrage chantier" },
              { icon: "🎨", time: "3–8 j.", label: "Durée chantier moyenne" },
              { icon: "✅", time: "4.8/5", label: "Satisfaction clients Dijon" },
            ].map((d, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d8ce] bg-white p-6 text-center">
                <div className="mb-3 text-[32px]">{d.icon}</div>
                <div className="text-[28px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>{d.time}</div>
                <div className="mt-1 text-[13px] text-[#7a6f65]">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANT APRES */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c8531a]">Galerie</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Avant / Après — Chantiers<br />réalisés à Dijon</h2>
          <p className="mb-12 max-w-[600px] text-base text-[#7a6f65]">Projets réels réalisés par nos artisans en Côte-d'Or en 2025–2026.</p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { title: "Salon & Séjour — Chenôve", detail: "Peinture murale + plafond · 45m²", price: "Budget: 1 800€ · Délai: 3 jours" },
              { title: "Appartement complet — Talant", detail: "Rénovation intégrale · 70m²", price: "Budget: 3 200€ · Délai: 6 jours" },
              { title: "Maison — Longvic", detail: "Peinture murs + boiseries · 95m²", price: "Budget: 4 100€ · Délai: 8 jours" },
            ].map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border-[1.5px] border-[#e0d8ce]">
                <div className="grid h-[180px] grid-cols-2">
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#8a7a6a] to-[#6a5a4a] text-[40px]">🏚️<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">AVANT</span></div>
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-[#e8d8c8] to-[#f5ede0] text-[40px]">🏠<span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">APRÈS</span></div>
                </div>
                <div className="bg-white p-4">
                  <div className="mb-1 text-sm font-bold text-[#1a1714]">{item.title}</div>
                  <div className="text-xs text-[#7a6f65]">{item.detail}</div>
                  <div className="mt-1.5 text-[13px] font-bold text-[#c8531a]">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="px-8 py-20" style={{ background: "#f8f5ef" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c8531a]">Avis clients vérifiés</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Ce que disent nos clients<br />à Dijon</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: "Sophie M.", loc: "Chenôve · Peinture 65m²", text: "Devis reçu en 2h, artisan disponible la semaine suivante. Travail impeccable. Je recommande vivement !", avatar: "SM" },
              { name: "Jean-Pierre L.", loc: "Talant · Rénovation 90m²", text: "3 devis comparés en une journée. J'ai économisé 800€ par rapport au premier artisan contacté directement.", avatar: "JL" },
              { name: "Claire B.", loc: "Longvic · Maison 110m²", text: "Le peintre a respecté le devis à l'euro près. Finitions soignées, délai tenu. 5/5 sans hésitation.", avatar: "CB" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl border-[1.5px] border-[#e0d8ce] bg-white p-6">
                <div className="mb-3 text-base text-[#f59e0b]">⭐⭐⭐⭐⭐</div>
                <div className="mb-4 text-sm italic leading-relaxed text-[#7a6f65]">"{t.text}"</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #1e3a5f, #2d5a8e)" }}>{t.avatar}</div>
                  <div><div className="text-sm font-bold text-[#1a1714]">{t.name}</div><div className="text-xs text-[#7a6f65]">{t.loc}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUARTIERS */}
      <section className="bg-[#1a1714] px-8 py-20" id="artisans">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#e8832a]">Couverture hyperlocale</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>Artisans peintres par<br />quartier & commune</h2>
          <p className="mb-12 max-w-[600px] text-base text-white/60">Nous couvrons l'ensemble du département Côte-d'Or avec des artisans locaux.</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Dijon Centre", code: "21000", artisans: "18", prix: "32–45€/m²", delai: "2–4h" },
              { name: "Chenôve", code: "21300", artisans: "12", prix: "26–40€/m²", delai: "3–6h" },
              { name: "Talant", code: "21240", artisans: "9", prix: "28–42€/m²", delai: "3–5h" },
              { name: "Longvic", code: "21600", artisans: "8", prix: "27–41€/m²", delai: "4–6h" },
              { name: "Quetigny", code: "21800", artisans: "7", prix: "28–43€/m²", delai: "3–6h" },
              { name: "Fontaine-lès-Dijon", code: "21121", artisans: "6", prix: "29–44€/m²", delai: "4–7h" },
            ].map((q, i) => (
              <div key={i} className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-[#e8832a] hover:bg-white/10">
                <div className="mb-1 text-lg font-bold text-white" style={{ fontFamily: "serif" }}>{q.name}</div>
                <div className="mb-3 text-xs text-white/40">{q.code}</div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Artisans actifs</span><span className="font-bold text-[#e8832a]">{q.artisans}</span></div>
                <div className="mb-1.5 flex justify-between text-[13px]"><span className="text-white/50">Prix moyen</span><span className="font-bold text-[#e8832a]">{q.prix}</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-white/50">Délai réponse</span><span className="font-bold text-[#e8832a]">{q.delai}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPES TRAVAUX */}
      <section className="px-8 py-20" style={{ background: "#f8f5ef" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c8531a]">Types de travaux</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Tous types de peinture<br />à Dijon</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { icon: "🖌️", title: "Peinture intérieure murale", desc: "Murs, plafonds, boiseries. Finition mate, satinée ou brillante.", price: "25–40€/m²" },
              { icon: "🏠", title: "Ravalement de façade", desc: "Nettoyage, rebouchage et application d'enduit ou peinture extérieure résistante.", price: "50–80€/m²" },
              { icon: "🔧", title: "Enduit & préparation", desc: "Rebouchage fissures, lissage, ponçage. Indispensable pour une finition parfaite.", price: "15–25€/m²" },
              { icon: "✨", title: "Peinture décorative", desc: "Effets béton ciré, stuc, tadelakt. Techniques décoratives pour intérieurs uniques.", price: "45–90€/m²" },
              { icon: "🏢", title: "Peinture locaux commerciaux", desc: "Bureaux, commerces, restaurants. Peintures techniques anti-salissures disponibles.", price: "30–50€/m²" },
              { icon: "🌿", title: "Peinture écologique", desc: "Peintures naturelles, sans COV, certifiées. Idéal pour chambres d'enfants.", price: "35–55€/m²" },
            ].map((t, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border-[1.5px] border-[#e0d8ce] bg-white p-6 transition hover:border-[#c8531a] hover:shadow-[0_8px_24px_rgba(200,83,26,0.1)]">
                <div className="shrink-0 text-[28px]">{t.icon}</div>
                <div>
                  <div className="mb-1 text-base font-bold text-[#1a1714]">{t.title}</div>
                  <div className="mb-2 text-[13px] text-[#7a6f65]">{t.desc}</div>
                  <div className="text-[13px] font-bold text-[#c8531a]">{t.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE EXPERT */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c8531a]">Guide expert</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Tout savoir sur la peinture<br />intérieure à Dijon</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr]">
            <div className="text-[15px] leading-relaxed text-[#7a6f65]">
              <h3 className="mb-3 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Le marché de la peinture à Dijon en 2026</h3>
              <p className="mb-3">À Dijon, la demande en peinture intérieure augmente de 12% par an. Les appartements anciens du centre-ville (années 1960–1980) représentent 60% des projets publiés sur notre plateforme.</p>
              <p className="mb-3">Les artisans peintres dijonnais travaillent principalement dans un rayon de 30 km : Chenôve, Talant, Longvic, Quetigny, Fontaine-lès-Dijon et les communes de la grande couronne.</p>
              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Comment sont calculés les prix ?</h3>
              <ul className="mb-4 list-disc space-y-2 pl-5">
                <li><strong>La surface à peindre</strong> : murs uniquement ou murs + plafonds + boiseries</li>
                <li><strong>L'état des surfaces</strong> : un mur fissuré nécessite un enduit préalable (+5–10€/m²)</li>
                <li><strong>La finition choisie</strong> : mat, satiné ou brillant</li>
                <li><strong>L'accessibilité</strong> : plafonds hauts, escaliers ou zones difficiles</li>
                <li><strong>La qualité de la peinture</strong> : gamme entrée de gamme vs premium</li>
              </ul>
              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Haute saison vs basse saison</h3>
              <p className="mb-3">En haute saison (mai–août), comptez 2–4 semaines pour démarrer un chantier. En basse saison (novembre–février), la disponibilité est meilleure et certains artisans proposent des tarifs préférentiels.</p>
              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Comment choisir son peintre à Dijon ?</h3>
              <ul className="mb-4 list-disc space-y-2 pl-5">
                <li>Vérifiez le numéro SIRET sur Infogreffe.fr</li>
                <li>Demandez des photos de chantiers précédents</li>
                <li>Comparez minimum 3 devis détaillés</li>
                <li>Vérifiez l'assurance RC Pro</li>
                <li>Méfiez-vous des prix anormalement bas</li>
              </ul>
              <h3 className="mb-3 mt-6 text-[22px] font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>Données uniques du marché dijonnais</h3>
              <ul className="list-disc space-y-2 pl-5">
                <li>Prix moyen constaté : <strong>35€/m²</strong></li>
                <li>Artisans vérifiés actifs : <strong>18</strong></li>
                <li>Délai 1er contact : <strong>3h</strong></li>
                <li>Satisfaction clients : <strong>94%</strong></li>
                <li>Économie vs premier devis : <strong>18%</strong></li>
              </ul>
            </div>
            <div className="sticky top-6">
              <SidebarCTA />
              <div className="mb-4 rounded-2xl border-[1.5px] border-[#e0d8ce] bg-[#f8f5ef] p-6">
                <h4 className="mb-3 text-base font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>📊 Données marché Dijon 2026</h4>
                {[
                  { k: "Prix moyen mur", v: "32€/m²" },
                  { k: "Prix moyen plafond", v: "38€/m²" },
                  { k: "Projets publiés", v: "312" },
                  { k: "Artisans actifs", v: "18" },
                  { k: "Satisfaction", v: "4.8/5" },
                  { k: "Délai réponse", v: "2–4h" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between border-b border-[#e0d8ce] py-2 text-[13px] last:border-0">
                    <span className="text-[#7a6f65]">{s.k}</span><span className="font-bold text-[#1a1714]">{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border-[1.5px] border-[#e0d8ce] bg-[#f8f5ef] p-6">
                <h4 className="mb-3 text-base font-bold text-[#1a1714]" style={{ fontFamily: "serif" }}>🔗 Pages liées</h4>
                {[
                  { l: "Peinture Chenôve", href: "/devis-peinture-chenove" },
                  { l: "Peinture Talant", href: "/devis-peinture-talant" },
                  { l: "Rénovation Dijon", href: "/devis-renovation-dijon" },
                  { l: "Peinture Fontaine", href: "/devis-peinture-fontaine-les-dijon" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-2 text-[13px]">
                    <Link href={item.href} className="text-[#c8531a] no-underline">{item.l}</Link>
                    <span className="font-bold text-[#1a1714]">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c8531a]">FAQ</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Questions fréquentes</h2>
          <div className="max-w-[700px]">
            {FAQ_ITEMS.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="px-8 py-20" style={{ background: "#f8f5ef" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#c8531a]">Explorer</div>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-[#1a1714] md:text-5xl" style={{ fontFamily: "serif" }}>Pages liées</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Peinture Chenôve 21300", sub: "12 artisans · 26–40€/m²", href: "/devis-peinture-chenove" },
              { title: "Peinture Talant 21240", sub: "9 artisans · 28–42€/m²", href: "/devis-peinture-talant" },
              { title: "Peinture Fontaine-lès-Dijon", sub: "6 artisans · 29–44€/m²", href: "/devis-peinture-fontaine-les-dijon" },
              { title: "Rénovation salle de bain", sub: "3 000€ – 8 000€ · Côte-d'Or", href: "/devis-salle-de-bain-dijon" },
              { title: "Peinture Longvic 21600", sub: "8 artisans · Toutes rénovations", href: "/devis-peinture-longvic" },
              { title: "Guide choisir artisan", sub: "7 critères essentiels", href: "/guide-choisir-artisan" },
              { title: "Peinture Quetigny 21800", sub: "7 artisans · 28–43€/m²", href: "/devis-peinture-quetigny" },
              { title: "Baromètre prix 2026", sub: "312 projets analysés Dijon", href: "/prix-travaux-dijon-2026" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="rounded-xl border-[1.5px] border-[#e0d8ce] bg-white p-4 no-underline transition hover:-translate-y-0.5 hover:border-[#c8531a]">
                <div className="mb-1 text-[13px] font-bold text-[#1a1714]">{link.title}</div>
                <div className="text-xs text-[#7a6f65]">{link.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-8 py-20 text-center" style={{ background: "linear-gradient(135deg, #1a1714, #1e3a5f)" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-[#e8832a]">Prêt à démarrer ?</div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "serif" }}>Recevez vos 3 devis gratuits<br />à Dijon</h2>
          <p className="mb-3 text-base text-white/70">18 artisans peintres vérifiés à Dijon et en Côte-d'Or. Sans engagement, sans spam.</p>
          <div className="mb-8 flex justify-center gap-5 text-[13px] text-white/45">
            <span>312 projets analysés</span><span>·</span><span>4.8/5 · 127 avis</span><span>·</span><span>Réponse sous 4h</span>
          </div>
          <a href="/publier-projet/form" className="inline-block rounded-2xl bg-[#c8531a] px-12 py-5 text-center text-xl font-bold text-white shadow-[0_12px_32px_rgba(200,83,26,0.4)] transition hover:scale-105 hover:bg-[#e8832a]">
            🎨 Publiez votre projet gratuitement
          </a>
          <p className="mt-3 text-sm text-white/50">Sans engagement · Gratuit · Max 3 artisans</p>
        </div>
      </section>

      {/* Schema JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "LocalBusiness", name: "PremiumArtisan Dijon", url: "https://premiumartisan.fr", areaServed: { "@type": "City", name: "Dijon", postalCode: "21000" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "127" } },
          { "@type": "FAQPage", mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
        ],
      })}} />
    </main>
  );
}