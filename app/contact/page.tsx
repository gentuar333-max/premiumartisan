// app/contact/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Contact — PremiumArtisan",
  description: "Contactez l'équipe PremiumArtisan pour toute question.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]" style={{ fontFamily: "Georgia, serif" }}>
      <nav className="border-b border-[#e8e0d8] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-lg font-bold text-[#1a0a0e] no-underline">Premium<span className="text-[#be123c]">Artisan</span></Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-4 text-3xl font-bold text-[#1a0a0e]">Contact</h1>
        <p className="mb-12 text-[#6b5b52] leading-relaxed">
          Une question, un problème ou une suggestion ? Nous répondons sous 24h.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#e8e0d8] bg-white p-8">
            <div className="mb-4 text-3xl">✉️</div>
            <h2 className="mb-2 text-lg font-bold text-[#1a0a0e]">Email</h2>
            <p className="mb-4 text-sm text-[#6b5b52]">Pour toute demande générale ou support.</p>
            <a href="mailto:contact@premiumartisan.fr"
              className="inline-block rounded-full bg-[#be123c] px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-[#9f1239] transition-colors">
              contact@premiumartisan.fr
            </a>
          </div>

          <div className="rounded-2xl border border-[#e8e0d8] bg-white p-8">
            <div className="mb-4 text-3xl">🔨</div>
            <h2 className="mb-2 text-lg font-bold text-[#1a0a0e]">Artisans</h2>
            <p className="mb-4 text-sm text-[#6b5b52]">Question sur votre compte ou un paiement ?</p>
            <a href="mailto:contact@premiumartisan.fr?subject=Question artisan"
              className="inline-block rounded-full border border-[#1a0a0e] px-5 py-2.5 text-sm font-semibold text-[#1a0a0e] no-underline hover:bg-[#1a0a0e] hover:text-white transition-colors">
              Écrire à l'équipe
            </a>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-[#e8e0d8] bg-white p-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">Adresse</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            PremiumArtisan — Riart Mehanja<br />
            21300 Chenôve, France<br />
            <a href="mailto:contact@premiumartisan.fr" className="text-[#be123c]">contact@premiumartisan.fr</a>
          </p>
        </div>
      </div>

      <footer className="border-t border-[#e8e0d8] bg-white px-6 py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-4 text-xs text-[#9b8b82]">
          <Link href="/mentions-legales" className="hover:text-[#be123c] no-underline">Mentions légales</Link>
          <Link href="/privacy" className="hover:text-[#be123c] no-underline">Confidentialité</Link>
          <Link href="/terms" className="hover:text-[#be123c] no-underline">CGU</Link>
          <Link href="/contact" className="hover:text-[#be123c] no-underline">Contact</Link>
        </div>
      </footer>
    </main>
  );
}