// app/trouver-clients-peintre-dijon/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: 'Trouver Clients Peintre Dijon – Projets Particuliers Côte-d\'Or | PremiumArtisan',
  description: 'Trouvez des clients pour vos travaux de peinture à Dijon. Accédez aux projets particuliers en Côte-d\'Or et développez votre activité. Devis & factures gratuits inclus.',
  alternates: { canonical: 'https://premiumartisan.fr/trouver-clients-peintre-dijon' },
  keywords: 'trouver clients peintre dijon, chantier peinture dijon, missions peintre côte-d\'or, projet peinture particulier dijon, artisan peintre cherche chantier bourgogne',
  openGraph: {
    title: 'Trouver des Clients Peintre à Dijon – Projets Particuliers Côte-d\'Or',
    description: 'Accédez aux projets de peinture et rénovation de particuliers en Côte-d\'Or. Payez uniquement les contacts qui vous intéressent.',
    url: 'https://premiumartisan.fr/trouver-clients-peintre-dijon',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'PremiumArtisan',
  },
};

const schemaService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Trouver des clients peintre à Dijon",
  "description": "Plateforme de mise en relation entre artisans peintres et particuliers en Côte-d'Or et Bourgogne.",
  "provider": { "@type": "Organization", "name": "PremiumArtisan", "url": "https://premiumartisan.fr" },
  "areaServed": [
    { "@type": "City", "name": "Dijon" },
    { "@type": "AdministrativeArea", "name": "Côte-d'Or" },
    { "@type": "AdministrativeArea", "name": "Bourgogne" },
  ],
  "serviceType": "Mise en relation artisan peintre",
};

const AVANTAGES = [
  {
    title: 'Projets qualifiés et détaillés',
    desc: 'Chaque demande contient : type de pièce, surface en m², budget estimé, délai souhaité. Vous décidez en connaissance de cause avant de payer.',
  },
  {
    title: 'Maximum 3 artisans par projet',
    desc: 'Un particulier ne reçoit jamais plus de 3 peintres. Vous n\'êtes pas en concurrence avec 15 artisans comme sur d\'autres plateformes.',
  },
  {
    title: 'Accès exclusif disponible',
    desc: 'Payez pour être le seul artisan peintre à contacter ce client. Zéro concurrence sur ce chantier.',
  },
  {
    title: 'Devis & factures 100% gratuits',
    desc: 'Créez vos devis professionnels et factures illimitées depuis le même outil. Envoi par email, réponse client intégrée. Sans abonnement.',
  },
  {
    title: 'Contact WhatsApp direct',
    desc: 'Après déblocage du contact, appelez ou contactez le client directement sur WhatsApp. Pas d\'intermédiaire.',
  },
  {
    title: 'Filtrage par commune Côte-d\'Or',
    desc: 'Travaillez uniquement dans votre zone d\'intervention. Filtrez les projets par commune dans tout le département 21.',
  },
];

const TYPES_PROJETS = [
  { label: 'Peinture intérieure', badge: 'Fréquent' },
  { label: 'Rénovation appartement', badge: 'Fréquent' },
  { label: 'Papier peint & revêtements', badge: null },
  { label: 'Peinture façade & ravalement', badge: null },
  { label: 'Rénovation maison complète', badge: 'Budget élevé' },
  { label: 'Peinture salle de bain', badge: null },
  { label: 'Peinture plafond', badge: null },
  { label: 'Rénovation complète', badge: 'Budget élevé' },
];

const VILLES = [
  'Dijon', 'Beaune', 'Chenôve', 'Longvic', 'Talant', 'Quetigny',
  'Fontaine-lès-Dijon', 'Marsannay-la-Côte', 'Nuits-Saint-Georges',
  'Gevrey-Chambertin', 'Auxonne', 'Montbard',
];

const FAQ = [
  {
    q: 'Comment trouver des clients peintre à Dijon ?',
    a: 'Via PremiumArtisan, des particuliers publient leurs projets de peinture en Côte-d\'Or chaque semaine. Accédez au dashboard gratuitement, consultez les projets et débloquez uniquement les contacts qui vous intéressent.',
  },
  {
    q: 'Combien coûte l\'accès aux projets de peinture ?',
    a: 'La consultation des projets est gratuite. Vous payez uniquement quand vous souhaitez obtenir le numéro de téléphone ou WhatsApp d\'un client. Le tarif varie selon le budget du chantier.',
  },
  {
    q: 'Puis-je être le seul peintre à contacter un client ?',
    a: 'Oui. L\'option accès exclusif vous permet d\'être le seul artisan peintre à contacter ce particulier. Aucun autre artisan ne peut débloquer ce contact après vous.',
  },
  {
    q: 'Comment créer un devis peinture depuis la plateforme ?',
    a: 'Depuis le dashboard artisan, cliquez sur "Créer un devis". Saisissez les lignes de travaux, la TVA applicable (10% pour rénovation), l\'acompte. Envoyez directement par email à votre client.',
  },
  {
    q: 'La plateforme couvre-t-elle toute la Côte-d\'Or ?',
    a: 'Oui, PremiumArtisan couvre l\'ensemble du département 21 : Dijon, Beaune, Chenôve, Longvic, Talant, Auxonne, Montbard et toutes les communes de Côte-d\'Or.',
  },
];

export default function TrouverClientsPeintreDijon() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
      />
      <main className="min-h-screen bg-white">

        {/* ── HERO ── */}
        <section className="bg-[#2a0a14] text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Trouver des clients peintre<br />
              à <span className="text-[#fda4af]">Dijon &amp; Côte-d'Or</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Des particuliers publient leurs projets de peinture et rénovation chaque semaine en Côte-d'Or.
              Accédez aux contacts qui vous correspondent. Devis et factures gratuits inclus.
            </p>
            <Link href="/artisan/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-[#be123c] px-8 py-4 text-lg font-semibold text-white shadow-xl hover:bg-[#9f1239] transition">
              Voir les projets disponibles →
            </Link>
            <p className="mt-4 text-sm text-white/40">
              Accès gratuit · Payez uniquement les contacts qui vous intéressent
            </p>
          </div>
        </section>

        {/* ── TRUST ── */}
        <section className="bg-[#fdf2f5] border-b border-[#fda4af]/20 py-5 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-[#6a3a4a] font-medium">
            <span>Projets qualifiés Côte-d'Or</span>
            <span>Max 3 artisans par projet</span>
            <span>Contact WhatsApp direct</span>
            <span>Devis &amp; factures gratuits</span>
            <span>Accès exclusif disponible</span>
          </div>
        </section>

        {/* ── COMMENT TROUVER DES CHANTIERS ── */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Comment trouver des chantiers de peinture à Dijon ?
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              PremiumArtisan connecte les artisans peintres professionnels avec des particuliers
              qui cherchent activement à faire réaliser leurs travaux en Côte-d'Or.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n: '1', t: 'Consultez les projets', d: 'Le dashboard affiche les projets de particuliers : type de travaux, surface, budget estimé, commune. Accès gratuit et immédiat.' },
                { n: '2', t: 'Débloquez le contact', d: 'Un projet vous intéresse ? Payez pour obtenir le numéro du client. Choisissez l\'accès normal ou exclusif — seul artisan à contacter ce particulier.' },
                { n: '3', t: 'Décrochez le chantier', d: 'Contactez le client sur WhatsApp, créez votre devis depuis l\'outil intégré, et décrochez le chantier de peinture.' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white font-black text-xl ${i === 2 ? 'bg-[#be123c]' : 'bg-[#2a0a14]'}`}>{s.n}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{s.t}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── POURQUOI REJOINDRE ── */}
        <section className="bg-gray-50 py-16 px-4 border-t border-gray-200">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Pourquoi rejoindre PremiumArtisan ?
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Contrairement aux annuaires classiques ou aux plateformes qui revendent vos contacts,
              PremiumArtisan vous donne le contrôle total sur les projets que vous choisissez.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {AVANTAGES.map(a => (
                <div key={a.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{a.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJETS DISPONIBLES ── */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Projets disponibles pour peintres à Dijon
            </h2>
            <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
              Les particuliers en Côte-d'Or publient régulièrement des projets de peinture intérieure,
              rénovation d'appartement et travaux de façade.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {TYPES_PROJETS.map(t => (
                <div key={t.label} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700">
                  <span>{t.label}</span>
                  {t.badge && (
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${t.badge === 'Budget élevé' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {t.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/artisan/dashboard"
                className="inline-flex items-center justify-center rounded-xl bg-[#be123c] px-8 py-4 text-base font-semibold text-white hover:bg-[#9f1239] transition">
                Voir les projets disponibles →
              </Link>
            </div>
          </div>
        </section>

        {/* ── ZONE GEOGRAPHIQUE ── */}
        <section className="bg-[#fdf2f5] py-16 px-4 border-t border-[#fda4af]/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Zone d'intervention : Dijon et toute la Côte-d'Or
            </h2>
            <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
              Les projets de peinture couvrent l'ensemble du département 21.
              Travaillez dans votre zone d'intervention habituelle.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
              {VILLES.map(v => (
                <div key={v}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-800 text-center hover:border-[#be123c] hover:text-[#be123c] transition cursor-default">
                  {v}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEXTE SEO ── */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Trouver des clients peintre à Dijon : ce qu'il faut savoir
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Les peintres professionnels à Dijon font face à un marché local compétitif.
              Entre les plateformes nationales qui revendent les mêmes leads à des dizaines d'artisans
              et les annuaires qui ne génèrent aucune demande qualifiée, trouver des chantiers de peinture
              en Côte-d'Or peut sembler difficile. PremiumArtisan propose une approche différente :
              accès limité à 3 artisans maximum par projet, contact direct par WhatsApp,
              et option d'accès exclusif pour les peintres qui veulent éliminer toute concurrence.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
              Le marché de la peinture à Dijon en 2026
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              La demande de travaux de peinture intérieure à Dijon reste soutenue.
              Les projets les plus fréquents concernent la rénovation d'appartements dans les quartiers
              du centre-ville, Montchapet et les Grésilles, ainsi que les maisons individuelles
              dans les communes périphériques comme Chenôve, Longvic, Talant et Quetigny.
              Les budgets varient de 800€ pour un studio jusqu'à 25 000€ pour une rénovation complète.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
              Peinture intérieure, façade, rénovation : tous types de chantiers
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              PremiumArtisan reçoit des demandes pour tous les types de travaux de peinture
              en Côte-d'Or : peinture intérieure, pose de papier peint, ravalement de façade,
              peinture de salle de bain et cuisine, rénovations complètes d'appartements et de maisons.
              Les particuliers de Dijon, Beaune, Nuits-Saint-Georges et toutes les communes du département 21
              utilisent la plateforme pour trouver des artisans locaux qualifiés.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-gray-50 py-16 px-4 border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Questions fréquentes
            </h2>
            <div className="space-y-5">
              {FAQ.map((item) => (
                <div key={item.q} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERNAL LINKS ── */}
        <section className="py-12 px-4 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Outils utiles pour les peintres artisans
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { href: '/creer-devis-peintre', label: 'Créer un devis peinture', sub: 'Devis professionnel gratuit' },
                { href: '/creer-facture-artisan', label: 'Créer une facture artisan', sub: 'Facture conforme gratuite' },
                { href: '/devis-renovation-dijon', label: 'Projets rénovation Dijon', sub: 'Voir les demandes clients' },
                { href: '/application-devis-peintre', label: 'Application devis peintre', sub: 'Outil mobile & ordinateur' },
                { href: '/logiciel-devis-peintre-cote-dor', label: 'Logiciel devis Côte-d\'Or', sub: 'Sans abonnement' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="rounded-xl border border-gray-200 bg-white p-4 hover:border-[#be123c] transition group">
                  <div className="font-semibold text-gray-900 text-sm group-hover:text-[#be123c]">{l.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{l.sub}</div>
                </Link>
              ))}
              <Link href="/artisan/dashboard"
                className="rounded-xl border border-[#be123c] bg-[#fdf2f5] p-4 hover:bg-[#be123c] transition group">
                <div className="font-semibold text-[#be123c] text-sm group-hover:text-white">Voir les projets clients</div>
                <div className="text-xs text-[#be123c]/70 mt-1 group-hover:text-white/70">Dashboard artisan gratuit</div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-[#2a0a14] py-16 px-4 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Développez votre activité peinture à Dijon
            </h2>
            <p className="text-white/70 mb-8">
              Accédez aux projets de particuliers en Côte-d'Or. Devis et factures gratuits inclus.
              Payez uniquement les contacts qui correspondent à votre activité.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/artisan/dashboard"
                className="inline-flex items-center justify-center rounded-xl bg-[#be123c] px-6 py-3.5 font-semibold text-white hover:bg-[#9f1239] transition">
                Voir les projets clients →
              </Link>
              <Link href="/artisan/devis/new"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white hover:bg-white/20 transition">
                Créer un devis gratuit
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}