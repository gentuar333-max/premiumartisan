// Deploy: app/comment-ca-marche/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Comment ça marche — PremiumArtisan",
  description: "Découvrez comment PremiumArtisan connecte particuliers et peintres à Dijon en 3 étapes simples.",
};

export default function CommentCaMarchePage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* Nav */}
      <nav className="border-b border-[#e8e0d8] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="text-lg font-bold text-[#1a0a0e] no-underline">
            Premium<span className="text-[#be123c]">Artisan</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-[#6b5b52]">
            <Link href="/about" className="hover:text-[#be123c] transition-colors no-underline">À propos</Link>
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
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#be123c]">Simple & rapide</p>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-[#1a0a0e] sm:text-5xl">
          Comment ça marche ?
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#6b5b52]">
          En moins de 2 minutes, votre projet est en ligne et visible par les meilleurs peintres de votre secteur.
        </p>
      </section>

      {/* Étapes clients */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#9b8b82]">Pour les particuliers</p>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              num: "01",
              icon: "📋",
              title: "Décrivez votre projet",
              desc: "Remplissez le formulaire en 2 minutes : type de travaux, surface, budget estimé, votre zone. C'est gratuit.",
            },
            {
              num: "02",
              icon: "🔔",
              title: "Les artisans vous contactent",
              desc: "Jusqu'à 3 peintres qualifiés de votre secteur reçoivent votre demande et vous contactent directement par téléphone ou WhatsApp.",
            },
            {
              num: "03",
              icon: "🤝",
              title: "Choisissez en toute liberté",
              desc: "Comparez les propositions, discutez avec les artisans, et choisissez celui qui vous convient. Aucune obligation.",
            },
          ].map(({ num, icon, title, desc }) => (
            <div key={num} className="relative rounded-2xl border border-[#e8e0d8] bg-white p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl font-black text-[#f0e8e4]">{num}</span>
                <span className="text-2xl">{icon}</span>
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#1a0a0e]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#6b5b52]">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/publier-projet/form"
            className="inline-block rounded-full bg-[#be123c] px-8 py-3 text-sm font-bold text-white no-underline hover:bg-[#9f1239] transition-colors">
            Publier mon projet gratuitement
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 pb-16">
        <div className="h-px w-24 bg-[#e8e0d8]" />
        <div className="h-2 w-2 rotate-45 bg-[#be123c]" />
        <div className="h-px w-24 bg-[#e8e0d8]" />
      </div>

      {/* Étapes artisans */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#9b8b82]">Pour les artisans</p>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              num: "01",
              icon: "🔍",
              title: "Consultez les projets",
              desc: "Accédez au tableau de bord et parcourez les projets dans votre département. Filtrez par budget, type de travaux, zone.",
            },
            {
              num: "02",
              icon: "🔓",
              title: "Débloquez le contact",
              desc: "Un projet vous intéresse ? Payez une petite commission pour accéder au numéro du client. Normal ou en exclusivité.",
            },
            {
              num: "03",
              icon: "📞",
              title: "Contactez directement",
              desc: "Appelez ou envoyez un message WhatsApp au client directement. Pas d'intermédiaire, pas de commission supplémentaire.",
            },
          ].map(({ num, icon, title, desc }) => (
            <div key={num} className="relative rounded-2xl border border-[#e8e0d8] bg-[#fdf8f6] p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl font-black text-[#f0e8e4]">{num}</span>
                <span className="text-2xl">{icon}</span>
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#1a0a0e]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#6b5b52]">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/artisan/dashboard"
            className="inline-block rounded-full border border-[#1a0a0e] bg-[#1a0a0e] px-8 py-3 text-sm font-bold text-white no-underline hover:bg-[#2d1020] transition-colors">
            Accéder au tableau de bord artisan
          </Link>
        </div>
      </section>

      {/* Pricing rapide */}
      <section className="border-y border-[#e8e0d8] bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#be123c]">Tarification</p>
          <h2 className="mb-8 text-2xl font-bold text-[#1a0a0e]">Transparent et sans surprise</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#d1e8d4] bg-[#f0faf1] p-6 text-left">
              <div className="mb-3 text-2xl">👤</div>
              <h3 className="mb-2 font-bold text-[#166534]">Particuliers</h3>
              <p className="text-3xl font-black text-[#166534] mb-3">Gratuit</p>
              <p className="text-sm text-[#4a6b52]">Publier un projet, recevoir des contacts d'artisans — toujours gratuit.</p>
            </div>
            <div className="rounded-2xl border border-[#fda4af] bg-[#fff1f2] p-6 text-left">
              <div className="mb-3 text-2xl">🔨</div>
              <h3 className="mb-2 font-bold text-[#9f1239]">Artisans</h3>
              <p className="text-3xl font-black text-[#be123c] mb-3">15€ – 699€</p>
              <p className="text-sm text-[#6b2035]">Selon le budget du projet. Payez uniquement pour les contacts qui vous intéressent.</p>
            </div>
          </div>
        </div>
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