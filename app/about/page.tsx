// Deploy: app/about/page.tsx
import Link from "next/link";

export const metadata = {
  title: "À propos — PremiumArtisan",
  description: "PremiumArtisan connecte les particuliers avec les meilleurs peintres et artisans de Dijon et de la Côte-d'Or.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* Nav */}
      <nav className="border-b border-[#e8e0d8] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="text-lg font-bold text-[#1a0a0e] no-underline">
            Premium<span className="text-[#be123c]">Artisan</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-[#6b5b52]">
            <Link href="/comment-ca-marche" className="hover:text-[#be123c] transition-colors no-underline">Comment ça marche</Link>
            <Link href="/faq" className="hover:text-[#be123c] transition-colors no-underline">FAQ</Link>
            <Link href="/publier-projet/form"
              className="rounded-full bg-[#be123c] px-4 py-1.5 text-sm font-semibold text-white no-underline hover:bg-[#9f1239] transition-colors">
              Publier un projet
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#be123c]">Notre histoire</p>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-[#1a0a0e] sm:text-5xl">
          Trouver un bon artisan<br />ne devrait pas être un défi
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#6b5b52]">
          PremiumArtisan est né d'un constat simple : trop de particuliers perdent du temps à chercher un peintre sérieux, et trop d'artisans qualifiés manquent de visibilité.
        </p>
      </section>

      {/* Divider ornamental */}
      <div className="flex items-center justify-center gap-4 pb-12">
        <div className="h-px w-24 bg-[#e8e0d8]" />
        <div className="h-2 w-2 rotate-45 bg-[#be123c]" />
        <div className="h-px w-24 bg-[#e8e0d8]" />
      </div>

      {/* Problème / Solution */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-12 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#e8e0d8] bg-white p-8">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1f2]">
              <span className="text-lg">😤</span>
            </div>
            <h2 className="mb-3 text-xl font-bold text-[#1a0a0e]">Le problème</h2>
            <ul className="space-y-3 text-[#6b5b52]">
              {[
                "Des devis qui n'arrivent jamais",
                "Des artisans qui ne rappellent pas",
                "Des plateformes généralistes peu fiables",
                "Impossible de savoir qui est vraiment qualifié",
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                  <span className="mt-0.5 shrink-0 text-[#be123c]">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#d1e8d4] bg-[#f0faf1] p-8">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7]">
              <span className="text-lg">✨</span>
            </div>
            <h2 className="mb-3 text-xl font-bold text-[#1a0a0e]">Notre réponse</h2>
            <ul className="space-y-3 text-[#4a6b52]">
              {[
                "Seuls les artisans qui paient voient vos coordonnées — signe de sérieux",
                "Maximum 3 artisans par projet pour éviter le démarchage intensif",
                "Focalisés sur Dijon et la Côte-d'Or — proximité garantie",
                "Un projet publié en moins de 2 minutes",
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                  <span className="mt-0.5 shrink-0 text-[#166534]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="border-y border-[#e8e0d8] bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { value: "Dijon", label: "Zone de lancement" },
              { value: "3 max", label: "Artisans par projet" },
              { value: "100%", label: "Gratuit pour les clients" },
              { value: "2 min", label: "Pour publier un projet" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-bold text-[#be123c]">{value}</div>
                <div className="mt-1 text-xs text-[#9b8b82] uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fondateur */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#be123c]">Le fondateur</p>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a0a0e] text-xl font-bold text-white">
          RM
        </div>
        <h2 className="mb-4 text-2xl font-bold text-[#1a0a0e]">Riart Mehanja</h2>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-[#6b5b52]">
          Passionné par les métiers du bâtiment et la technologie, j'ai créé PremiumArtisan pour donner aux artisans locaux les outils qu'ils méritent — et aux particuliers une façon simple et fiable de trouver le bon professionnel.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-[#1a0a0e] py-16 text-center">
        <h2 className="mb-3 text-2xl font-bold text-white">Prêt à démarrer votre projet ?</h2>
        <p className="mb-8 text-[#e8a0b0] text-sm">Gratuit pour les particuliers · Réponse sous 24h</p>
        <Link href="/publier-projet/form"
          className="inline-block rounded-full bg-[#be123c] px-8 py-3 text-sm font-bold text-white no-underline hover:bg-[#9f1239] transition-colors">
          Publier mon projet gratuitement
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e0d8] bg-white px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 text-xs text-[#9b8b82]">
          <span>© 2026 PremiumArtisan — Riart Mehanja</span>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-[#be123c] no-underline">Mentions légales</Link>
            <Link href="/privacy" className="hover:text-[#be123c] no-underline">Confidentialité</Link>
            <Link href="/terms" className="hover:text-[#be123c] no-underline">CGU</Link>
            <Link href="/contact" className="hover:text-[#be123c] no-underline">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}