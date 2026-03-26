// app/faq/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ PremiumArtisan — Questions Fréquentes Artisans & Particuliers Dijon",
  description: "Toutes les réponses sur PremiumArtisan : coût du service, nombre d'artisans, zones couvertes, devis gratuit à Dijon et Côte-d'Or. Particuliers et artisans peintres.",
  alternates: { canonical: "https://premiumartisan.fr/faq" },
  openGraph: {
    title: "FAQ PremiumArtisan — Questions Fréquentes",
    description: "Comment ça marche, combien ça coûte, quelles zones sont couvertes. Réponses pour particuliers et artisans à Dijon.",
    url: "https://premiumartisan.fr/faq",
    type: "website",
    locale: "fr_FR",
    siteName: "PremiumArtisan",
  },
};

const FAQ_CLIENTS = [
  {
    q: "Est-ce gratuit pour les particuliers ?",
    a: "Oui, totalement gratuit. Publier un projet, recevoir des contacts d'artisans, tout est gratuit pour les particuliers à Dijon et en Côte-d'Or. C'est l'artisan qui paie pour accéder à votre numéro.",
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
    a: "Nous couvrons Dijon et la Côte-d'Or (département 21) — Chenôve, Longvic, Talant, Quetigny, Fontaine-lès-Dijon, Beaune et toutes les communes du département. Nous étendons progressivement à d'autres régions.",
  },
  {
    q: "Combien de temps faut-il pour publier un projet ?",
    a: "Moins de 2 minutes. Remplissez le formulaire, confirmez votre email, et votre projet est en ligne immédiatement.",
  },
  {
    q: "Quels types de travaux puis-je demander ?",
    a: "Peinture intérieure, peinture extérieure, ravalement de façade, pose de papier peint, rénovation de cuisine, salle de bain, et travaux de rénovation générale.",
  },
  {
    q: "Comment sont sélectionnés les artisans ?",
    a: "Les artisans s'inscrivent sur PremiumArtisan et accèdent aux projets de leur zone. Le système de paiement à l'usage filtre naturellement les artisans sérieux.",
  },
];

const FAQ_ARTISANS = [
  {
    q: "Comment accéder aux projets ?",
    a: "Créez un compte artisan, connectez-vous au tableau de bord, et parcourez les projets de votre secteur. Filtrez par budget, zone, et type de travaux.",
  },
  {
    q: "Combien coûte le déblocage d'un contact ?",
    a: "Le prix dépend du budget du projet : 15€ pour un projet inférieur à 500€, 30€ entre 500 et 1 500€, 39€ entre 1 500 et 3 000€, jusqu'à 699€ pour les projets supérieurs à 100 000€. Vous ne payez que pour les contacts qui vous intéressent.",
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
  {
    q: "L'outil de devis est-il vraiment gratuit ?",
    a: "Oui, entièrement gratuit et sans abonnement. Créez des devis et factures illimités depuis votre tableau de bord, envoyez-les par email à vos clients, sans frais cachés.",
  },
  {
    q: "Comment recevoir des projets dans ma zone ?",
    a: "Connectez-vous au tableau de bord et filtrez par code postal ou département. Les projets de votre secteur apparaissent en temps réel.",
  },
];

const allFaq = [...FAQ_CLIENTS, ...FAQ_ARTISANS];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
            Tout ce que vous devez savoir avant de commencer — que vous soyez particulier ou artisan à Dijon et en Côte-d'Or.
          </p>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 pb-20">
          <FaqSection title="Pour les particuliers" items={FAQ_CLIENTS} accent="#166534" />
          <FaqSection title="Pour les artisans" items={FAQ_ARTISANS} accent="#be123c" />

          {/* CTA particuliers */}
          <div className="mb-8 rounded-2xl border border-[#fda4af] bg-[#fff1f2] p-8 text-center">
            <p className="mb-2 text-base font-bold text-[#1a0a0e]">Prêt à publier votre projet ?</p>
            <p className="mb-5 text-sm text-[#6b5b52]">Gratuit, sans engagement. Recevez jusqu'à 3 devis d'artisans qualifiés à Dijon.</p>
            <Link href="/publier-projet/form"
              className="inline-block rounded-full bg-[#be123c] px-8 py-3 text-sm font-bold text-white no-underline hover:bg-[#9f1239] transition-colors">
              Publier mon projet gratuitement →
            </Link>
          </div>

          {/* Contact CTA */}
          <div className="rounded-2xl border border-[#e8e0d8] bg-white p-8 text-center">
            <p className="mb-2 text-sm font-semibold text-[#1a0a0e]">Vous n'avez pas trouvé votre réponse ?</p>
            <p className="mb-5 text-sm text-[#6b5b52]">Notre équipe répond sous 24h.</p>
            <Link href="/contact"
              className="inline-block rounded-full border border-[#1a0a0e] px-6 py-2.5 text-sm font-semibold text-[#1a0a0e] no-underline hover:bg-[#1a0a0e] hover:text-white transition-colors">
              Nous contacter
            </Link>
          </div>

          {/* Internal links SEO */}
          <div className="mt-12 border-t border-[#e8e0d8] pt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9b8b82]">Pages utiles</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Devis peinture Dijon", href: "/devis-peinture-dijon" },
                { label: "Devis rénovation Dijon", href: "/devis-renovation-dijon" },
                { label: "Comment ça marche", href: "/comment-ca-marche" },
                { label: "Logiciel devis artisan Dijon", href: "/logiciel-devis-artisan/dijon" },
                { label: "Trouver clients peintre", href: "/trouver-clients-peintre-dijon" },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="inline-block rounded-full border border-[#e8e0d8] bg-white px-4 py-2 text-xs font-medium text-[#6b5b52] no-underline hover:border-[#be123c] hover:text-[#be123c] transition-colors">
                  {label}
                </Link>
              ))}
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
    </>
  );
}