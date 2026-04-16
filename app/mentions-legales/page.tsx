// app/mentions-legales/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Mentions légales — PremiumArtisan",
  description: "Mentions légales de PremiumArtisan — plateforme de mise en relation artisans et particuliers à Dijon et en Côte-d'Or.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]" style={{ fontFamily: "Georgia, serif" }}>
      <nav className="border-b border-[#e8e0d8] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-lg font-bold text-[#1a0a0e] no-underline">Premium<span className="text-[#be123c]">Artisan</span></Link>
          <Link href="/contact" className="text-sm text-[#be123c] no-underline">Contact</Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-bold text-[#1a0a0e]">Mentions légales</h1>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">Éditeur du site</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            <strong>Riart Mehanja</strong><br />
            Micro-entreprise<br />
            21300 Chenôve, France<br />
            Email : <a href="mailto:contact@premiumartisan.fr" className="text-[#be123c]">contact@premiumartisan.fr</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">Directeur de la publication</h2>
          <p className="text-[#6b5b52] leading-relaxed">Riart Mehanja</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">Hébergement</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            <strong>Vercel Inc.</strong><br />
            340 Pine Street, Suite 900<br />
            San Francisco, CA 94104, États-Unis<br />
            <a href="https://vercel.com" className="text-[#be123c]" target="_blank" rel="noreferrer">vercel.com</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">Nom de domaine</h2>
          <p className="text-[#6b5b52] leading-relaxed">premiumartisan.fr</p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">Propriété intellectuelle</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            L'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de PremiumArtisan. Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">Contact</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            Pour toute question : <a href="mailto:contact@premiumartisan.fr" className="text-[#be123c]">contact@premiumartisan.fr</a>
          </p>
        </section>
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