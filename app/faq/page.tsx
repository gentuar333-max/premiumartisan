// Deploy: app/faq/page.tsx
import Link from "next/link";

export const metadata = {
  title: "FAQ — PremiumArtisan",
  description: "Questions fréquentes sur PremiumArtisan — comment publier un projet, combien ça coûte, comment contacter un artisan à Dijon.",
};

const FAQ_CLIENTS = [
  {
    q: "Est-ce gratuit pour les particuliers ?",
    a: "Oui, totalement gratuit. Publier un projet, recevoir des contacts d'artisans, tout est gratuit pour les particuliers. C'est l'artisan qui paie pour accéder à votre numéro.",
  },
  {
    q: "Combien d'artisans vont me contacter ?",
    a: "Maximum 3 artisans par projet. C'est un choix délibéré : on préfère 2-3 artisans sérieux plutôt que 10 appels non sollicités. Vous gardez le contrôle.",
  },
  {
    q: "Est-ce que je suis obligé de choisir un artisan ?",
    a: "Non, aucune obligation. Vous êtes libre d'accepter ou refuser n'importe quelle offre. PremiumArtisan ne prend aucune commission sur vos travaux.",
  },
  {
    q: "Mes coordonnées sont-elles visibles par tout le monde ?",
    a: "Non. Votre numéro de téléphone est masqué par défaut. Seul un artisan qui paie pour débloquer votre contact peut le voir. Cela filtre les non-sérieux.",
  },
  {
    q: "Dans quelles zones êtes-vous disponibles ?",
    a: "Nous démarrons sur Dijon et la Côte-d'Or (département 21). Nous étendrons progressivement à d'autres départements selon la demande.",
  },
  {
    q: "Combien de temps faut-il pour publier un projet ?",
    a: "Moins de 2 minutes. Remplissez le formulaire, confirmez votre email, et votre projet est en ligne immédiatement.",
  },
];

const FAQ_ARTISANS = [
  {
    q: "Comment accéder aux projets ?",
    a: "Créez un compte artisan, connectez-vous au tableau de bord, et parcourez les projets de votre secteur. Filtrez par budget, zone, et type de travaux.",
  },
  {
    q: "Combien coûte le déblocage d'un contact ?",
    a: "Le prix dépend du budget du projet, de 15€ (projet < 500€) à 699€ (projet > 100 000€). Vous ne payez que pour les contacts qui vous intéressent.",
  },
  {
    q: "Qu'est-ce que l'option exclusive ?",
    a: "En choisissant l'exclusivité (×3 du prix normal), vous êtes le seul artisan à recevoir ce contact. Aucun concurrent ne pourra débloquer le même projet.",
  },
  {
    q: "Que se passe-t-il si le client ne répond pas ?",
    a: "Le paiement vous donne accès au numéro, pas une garantie de contrat. Nous vous conseillons de contacter rapidement après déblocage pour maximiser vos chances.",
  },
  {
    q: "Puis-je annuler un paiement ?",
    a: "Les paiements ne sont pas remboursables une fois le contact débloqué, car l'information a été transmise. En cas de problème technique, contactez-nous à contact@premiumartisan.fr.",
  },
  {
    q: "Comment créer des devis et factures ?",
    a: "Une fois connecté, accédez à '+ Créer un devis' ou '+ Créer une facture' depuis le tableau de bord. L'outil est intégré et gratuit pour tous les artisans inscrits.",
  },
];

function FaqSection({ title, items, accent }: { title: string; items: typeof FAQ_CLIENTS; accent: string }) {
  return (
    <div className="mb-16">
      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>{title}</p>
      <div className="space-y-4">
        {items.map(({ q, a }) => (
          <details key={q} className="group rounded-2xl border border-[#e8e0d8] bg-white overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-semibold text-[#1a0a0e] list-none hover:bg-[#fdf8f6] transition-colors">
              {q}
              <svg className="ml-4 h-4 w-4 shrink-0 text-[#9b8b82] transition-transform group-open:rotate-180"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="border-t border-[#e8e0d8] px-6 py-5 text-sm leading-relaxed text-[#6b5b52]">
              {a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default function FaqPage() {
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
            <Link href="/comment-ca-marche" className="hover:text-[#be123c] transition-colors no-underline">Comment ça marche</Link>
            <Link href="/publier-projet/form"
              className="rounded-full bg-[#be123c] px-4 py-1.5 text-sm font-semibold text-white no-underline hover:bg-[#9f1239] transition-colors">
              Publier un projet
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#be123c]">Aide & réponses</p>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-[#1a0a0e] sm:text-5xl">
          Questions fréquentes
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#6b5b52]">
          Tout ce que vous devez savoir avant de commencer — que vous soyez particulier ou artisan.
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <FaqSection title="Pour les particuliers" items={FAQ_CLIENTS} accent="#166534" />
        <FaqSection title="Pour les artisans" items={FAQ_ARTISANS} accent="#be123c" />

        {/* Contact CTA */}
        <div className="rounded-2xl border border-[#e8e0d8] bg-white p-8 text-center">
          <p className="mb-2 text-sm font-semibold text-[#1a0a0e]">Vous n'avez pas trouvé votre réponse ?</p>
          <p className="mb-5 text-sm text-[#6b5b52]">Notre équipe répond sous 24h.</p>
          <Link href="/contact"
            className="inline-block rounded-full border border-[#1a0a0e] px-6 py-2.5 text-sm font-semibold text-[#1a0a0e] no-underline hover:bg-[#1a0a0e] hover:text-white transition-colors">
            Nous contacter
          </Link>
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