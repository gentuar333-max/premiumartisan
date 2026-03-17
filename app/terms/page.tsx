// app/terms/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Conditions d'utilisation — PremiumArtisan",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]" style={{ fontFamily: "Georgia, serif" }}>
      <nav className="border-b border-[#e8e0d8] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-lg font-bold text-[#1a0a0e] no-underline">Premium<span className="text-[#be123c]">Artisan</span></Link>
          <Link href="/contact" className="text-sm text-[#be123c] no-underline">Contact</Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-bold text-[#1a0a0e]">Conditions générales d'utilisation</h1>
        <p className="mb-8 text-sm text-[#9b8b82]">Dernière mise à jour : mars 2026</p>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">1. Objet</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            PremiumArtisan est une plateforme de mise en relation entre des particuliers souhaitant réaliser des travaux et des artisans professionnels, principalement dans le secteur de la peinture et de la rénovation en Côte-d'Or.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">2. Accès au service</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            La publication d'un projet est gratuite et sans engagement pour les particuliers. Les artisans paient une commission pour accéder aux coordonnées des clients. Maximum 3 artisans peuvent accéder aux coordonnées d'un même projet.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">3. Responsabilités</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            PremiumArtisan agit en tant qu'intermédiaire et n'est pas responsable des relations contractuelles entre les particuliers et les artisans. La plateforme ne garantit pas la conclusion d'un contrat de travaux.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">4. Paiements</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            Les paiements sont traités de manière sécurisée par Stripe. Les tarifs varient selon le budget du projet (de 15€ à 699€). Les paiements ne sont pas remboursables une fois le contact débloqué.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">5. Interdictions</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            Il est interdit d'utiliser la plateforme à des fins de spam, de démarchage abusif, de publication de fausses informations ou de contournement du système de paiement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">6. Modification des CGU</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            PremiumArtisan se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par email en cas de modification substantielle.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">7. Droit applicable</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            Les présentes CGU sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents de Dijon.
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