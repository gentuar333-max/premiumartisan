// app/privacy/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité — PremiumArtisan",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]" style={{ fontFamily: "Georgia, serif" }}>
      <nav className="border-b border-[#e8e0d8] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-lg font-bold text-[#1a0a0e] no-underline">Premium<span className="text-[#be123c]">Artisan</span></Link>
          <Link href="/contact" className="text-sm text-[#be123c] no-underline">Contact</Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-bold text-[#1a0a0e]">Politique de confidentialité</h1>
        <p className="mb-8 text-sm text-[#9b8b82]">Dernière mise à jour : mars 2026</p>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">1. Données collectées</h2>
          <p className="text-[#6b5b52] leading-relaxed mb-3">Nous collectons les données suivantes :</p>
          <ul className="list-disc pl-6 text-[#6b5b52] leading-relaxed space-y-1">
            <li>Adresse email (pour la création de compte et les confirmations)</li>
            <li>Numéro de téléphone (pour la mise en relation artisan/client)</li>
            <li>Adresse postale approximative (pour le matching géographique)</li>
            <li>Données de navigation (adresse IP, cookies techniques)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">2. Utilisation des données</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            Vos données sont utilisées exclusivement pour : la mise en relation entre particuliers et artisans, l'envoi d'emails de confirmation, la gestion des paiements via Stripe, et l'amélioration du service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">3. Stockage et sécurité</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            Vos données sont stockées sur les serveurs de Supabase (hébergés en Europe) et protégées par chiffrement SSL. Les mots de passe sont hachés et jamais stockés en clair.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">4. Cookies</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            Nous utilisons uniquement des cookies techniques nécessaires au fonctionnement du site (session d'authentification). Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">5. Partage des données</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            Vos coordonnées ne sont partagées qu'avec les artisans qui paient pour accéder à votre projet. Nous ne vendons jamais vos données à des tiers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">6. Vos droits (RGPD)</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@premiumartisan.fr" className="text-[#be123c]">contact@premiumartisan.fr</a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#1a0a0e]">7. Contact DPO</h2>
          <p className="text-[#6b5b52] leading-relaxed">
            Responsable du traitement : Riart Mehanja — <a href="mailto:contact@premiumartisan.fr" className="text-[#be123c]">contact@premiumartisan.fr</a>
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