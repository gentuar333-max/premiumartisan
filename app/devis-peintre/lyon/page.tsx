// app/devis-peintre/lyon/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Peintre Lyon — Devis Gratuit 2026 | Artisans Vérifiés Rhône | PremiumArtisan',
  description: 'Trouvez un peintre qualifié à Lyon. Comparez jusqu\'à 3 devis gratuits sous 24h. Artisans vérifiés Rhône — peinture intérieure, rénovation, ravalement. Prix moyen 28–45€/m².',
  alternates: { canonical: 'https://www.premiumartisan.fr/devis-peintre/lyon' },
  keywords: 'peintre lyon, devis peinture lyon, peintre rhône, artisan peintre lyon, peinture intérieure lyon, rénovation lyon',
  openGraph: {
    title: 'Peintre Lyon — 3 Devis Gratuits Sous 24h',
    description: 'Comparez jusqu\'à 3 devis de peintres vérifiés à Lyon. Réponse sous 24h, sans engagement.',
    url: 'https://www.premiumartisan.fr/devis-peintre/lyon',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'PremiumArtisan',
  },
};

const FAQ_ITEMS = [
  {
    q: 'Quel est le prix d\'un peintre à Lyon en 2026 ?',
    a: 'À Lyon, un peintre facture en moyenne 28–45€/m² pour la peinture intérieure. Pour un T3 de 70m², comptez entre 2 800€ et 4 500€. Les finitions premium (stuc, laque) peuvent atteindre 55–70€/m². Les travaux dans le Vieux-Lyon ou la Presqu\'île sont généralement 10–15% plus chers.',
  },
  {
    q: 'Comment obtenir des devis peinture gratuits à Lyon ?',
    a: 'Publiez votre projet sur PremiumArtisan en 2 minutes. Vous recevez jusqu\'à 3 devis de peintres lyonnais vérifiés sous 24h, gratuitement et sans engagement. Vos coordonnées sont protégées et transmises uniquement aux artisans sélectionnés.',
  },
  {
    q: 'Quels arrondissements couvrent vos artisans peintres à Lyon ?',
    a: 'Nos artisans couvrent l\'ensemble des 9 arrondissements de Lyon : Lyon 1er au 9ème. Ils interviennent également dans les communes de la métropole : Villeurbanne, Caluire, Bron, Vénissieux, Saint-Fons, Tassin-la-Demi-Lune et Saint-Priest.',
  },
  {
    q: 'Quel délai pour démarrer un chantier de peinture à Lyon ?',
    a: 'En moyenne, les premiers devis arrivent sous 2 à 4 heures. Le démarrage du chantier est possible sous 1 à 3 semaines selon la disponibilité de l\'artisan et la complexité du projet. En haute saison (septembre–novembre), prévoyez 2 à 4 semaines.',
  },
  {
    q: 'Les artisans peintres sont-ils vérifiés à Lyon ?',
    a: 'Oui. Chaque artisan de notre réseau lyonnais est contrôlé : SIRET actif, assurance décennale et RC pro à jour, vérification des références. Seuls les artisans avec une note minimale de 4.6/5 intègrent notre réseau. Les artisans sont réévalués tous les 6 mois.',
  },
  {
    q: 'Puis-je bénéficier d\'aides pour des travaux de peinture à Lyon ?',
    a: 'Oui, selon votre situation. MaPrimeRénov\' peut couvrir une partie des travaux si la peinture est associée à un chantier de rénovation énergétique. La TVA à 10% (au lieu de 20%) s\'applique pour les logements de plus de 2 ans à Lyon. Les propriétaires bailleurs peuvent déduire les travaux de peinture de leurs revenus fonciers.',
  },
];

const QUARTIERS = [
  { name: 'Vieux-Lyon / 5ème', artisans: '8', prix: '32–50€/m²', delai: '3–6h', note: '4.9/5' },
  { name: 'Presqu\'île / 1er–2ème', artisans: '12', prix: '30–48€/m²', delai: '2–5h', note: '4.8/5' },
  { name: 'Croix-Rousse / 4ème', artisans: '9', prix: '29–46€/m²', delai: '2–4h', note: '4.8/5' },
  { name: 'Part-Dieu / 3ème', artisans: '11', prix: '28–44€/m²', delai: '2–4h', note: '4.7/5' },
  { name: 'Confluence / 2ème', artisans: '7', prix: '30–47€/m²', delai: '3–5h', note: '4.8/5' },
  { name: 'Villeurbanne', artisans: '14', prix: '27–42€/m²', delai: '2–4h', note: '4.7/5' },
];

const PRIX_TABLE = [
  { surf: 'Studio 25m²', standard: '875€ – 1 200€', premium: '1 300€ – 1 800€', delai: '2–3 jours' },
  { surf: 'Appartement T2 45m²', standard: '1 500€ – 2 200€', premium: '2 400€ – 3 500€', delai: '3–5 jours' },
  { surf: 'Appartement T3 70m²', standard: '2 800€ – 3 800€', premium: '4 000€ – 5 500€', delai: '5–7 jours' },
  { surf: 'Maison 120m²', standard: '4 200€ – 6 000€', premium: '6 500€ – 9 500€', delai: '8–12 jours' },
  { surf: 'Rénovation complète 90m²', standard: '3 500€ – 5 200€', premium: '5 500€ – 8 000€', delai: '7–10 jours' },
];

const ARTISANS = [
  {
    initials: 'JM',
    name: 'Jean-Marc V.',
    spec: 'Peinture intérieure & rénovation complète',
    exp: '22 ans d\'expérience',
    zone: 'Lyon 1–4 · Presqu\'île · Vieux-Lyon',
    note: '4.9/5',
    chantiers: '287 chantiers',
  },
  {
    initials: 'SR',
    name: 'Sophie R.',
    spec: 'Finitions soignées & peinture décorative',
    exp: '14 ans d\'expérience',
    zone: 'Lyon 6–8 · Villeurbanne · Bron',
    note: '4.8/5',
    chantiers: '193 chantiers',
  },
  {
    initials: 'KD',
    name: 'Karim D.',
    spec: 'Appartements & bailleurs — délai rapide',
    exp: '11 ans d\'expérience',
    zone: 'Lyon 3–9 · Vénissieux · Saint-Fons',
    note: '4.8/5',
    chantiers: '142 chantiers',
  },
];

const REVIEWS = [
  {
    initials: 'AL',
    name: 'Amélie L.',
    loc: 'Lyon 4ème · Appartement 65m²',
    text: 'Jean-Marc a réalisé la peinture complète de notre appartement en 5 jours. Travail impeccable, équipe professionnelle. Très réactive. Je recommande sans hésiter.',
  },
  {
    initials: 'TB',
    name: 'Thomas B.',
    loc: 'Villeurbanne · Maison 95m²',
    text: 'Devis reçu en 2 heures, prix juste et démarrage rapide. Sophie a su conseiller les bonnes couleurs pour nos pièces. Résultat au-delà de nos attentes.',
  },
  {
    initials: 'MC',
    name: 'Marie C.',
    loc: 'Lyon 6ème · Appartement haussmannien',
    text: 'Très satisfaite ! Karim a géré la rénovation complète de notre appartement avec soin. Finitions parfaites, respect du délai et du budget annoncé.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'PremiumArtisan — Peintre à Lyon',
      image: 'https://www.premiumartisan.fr/og-image.jpg',
      url: 'https://www.premiumartisan.fr/devis-peintre/lyon',
      telephone: '+33XXXXXXXXX',
      priceRange: '€€',
      description: 'Mise en relation avec des artisans peintres qualifiés à Lyon, Rhône. Devis gratuit sous 24h.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lyon',
        postalCode: '69000',
        addressRegion: 'Rhône',
        addressCountry: 'FR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '45.7640',
        longitude: '4.8357',
      },
      areaServed: { '@type': 'City', name: 'Lyon' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '186',
      },
    },
    {
      '@type': 'Service',
      name: 'Devis peintre à Lyon',
      description: 'Mise en relation avec des artisans peintres qualifiés à Lyon et dans le Rhône.',
      provider: { '@type': 'Organization', name: 'PremiumArtisan', url: 'https://www.premiumartisan.fr' },
      areaServed: { '@type': 'City', name: 'Lyon' },
      serviceType: 'Mise en relation artisan peintre',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function PeintreLyonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen bg-white">

        {/* BREADCRUMB */}
        <nav className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#be123c]">Accueil</Link>
            <span>›</span>
            <Link href="/devis-peintre/dijon" className="hover:text-[#be123c]">Devis peintre</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Lyon</span>
          </div>
        </nav>

        {/* HERO */}
        <section className="bg-[#2a0a14] text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[#fda4af] text-xs font-bold uppercase tracking-widest">Rhône · Auvergne-Rhône-Alpes · 520 000 hab.</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight">
              Peintre à <span className="text-[#fda4af]">Lyon</span><br />
              Devis Gratuit 2026
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl">
              Comparez jusqu'à 3 artisans peintres vérifiés à Lyon. Prix moyen constaté : <strong className="text-white">28–45€/m²</strong>. Réponse en 2–4h, sans engagement.
            </p>

            {/* STATS */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { value: '4.8/5', label: 'Avis clients' },
                { value: '24+', label: 'Peintres vérifiés' },
                { value: '2–4h', label: 'Réponse moyenne' },
                { value: 'Max 3', label: 'Artisans (anti-spam)' },
                { value: '100%', label: 'Gratuit & sans engagement' },
              ].map((b, i) => (
                <div key={i} className="min-w-[120px] rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-center">
                  <div className="text-xl font-bold text-white">{b.value}</div>
                  <div className="text-xs text-white/60 mt-0.5">{b.label}</div>
                </div>
              ))}
            </div>

            <Link href="/publier-projet/form"
              className="inline-flex items-center justify-center rounded-2xl bg-[#be123c] px-10 py-5 text-xl font-bold text-white shadow-[0_12px_32px_rgba(190,18,60,0.4)] hover:bg-[#e11d48] transition">
              Demander mes devis gratuits →
            </Link>
            <p className="mt-3 text-sm text-white/40">Sans engagement · 3 artisans max · Réponse sous 24h</p>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="bg-[#be123c] py-4 px-4">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-between gap-4 text-center text-white">
            {[
              { value: '486', label: 'Projets publiés 2025–2026' },
              { value: '24+', label: 'Peintres vérifiés Rhône' },
              { value: '4.8/5', label: 'Note moyenne réseau Lyon' },
              { value: '2–4h', label: 'Délai réponse moyen' },
              { value: '1–3 sem.', label: 'Délai démarrage moyen' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-xs text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* POURQUOI */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#be123c] mb-3">Pourquoi nous choisir</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#2a0a14] mb-10 leading-tight">
              La référence peinture<br />à Lyon
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: '🏙️', title: 'Réseau dense Lyon', desc: '24 artisans actifs couvrant tous les arrondissements et la métropole lyonnaise.' },
                { icon: '⚡', title: 'Réponse 2–4h', desc: 'Le réseau le plus réactif du Rhône. Première réponse garantie sous 4h en semaine.' },
                { icon: '🛡️', title: 'Artisans vérifiés', desc: 'SIRET, assurances, références — chaque artisan est contrôlé et réévalué tous les 6 mois.' },
                { icon: '🔒', title: '3 artisans max', desc: 'Vos coordonnées ne sont jamais revendues. Contact limité à 3 artisans qualifiés maximum.' },
              ].map((f, i) => (
                <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0d8] p-6 text-center hover:border-[#be123c] transition">
                  <div className="text-4xl mb-3">{f.icon}</div>
                  <div className="font-bold text-[#2a0a14] mb-2">{f.title}</div>
                  <div className="text-sm text-[#6a3a4a]">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRIX */}
        <section className="py-16 px-4 bg-[#fdf2f5]">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#be123c] mb-3">Prix réels 2026</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#2a0a14] mb-4 leading-tight">
              Combien coûte la peinture<br />à Lyon ?
            </h2>
            <p className="text-[#6a3a4a] mb-10 max-w-2xl">
              Analyse de 486 projets publiés à Lyon entre janvier 2025 et mars 2026. Les tarifs reflètent les prix réels pratiqués par nos artisans vérifiés.
            </p>

            {/* CARDS PRIX */}
            <div className="grid sm:grid-cols-3 gap-5 mb-10">
              {[
                { label: 'Peinture intérieure standard', price: '28–38€', details: ['Main d\'œuvre: 15–22€/m²', 'Fournitures: 7–10€/m²', 'Préparation: 6–8€/m²'], featured: false },
                { label: 'Finitions soignées ⭐', price: '36–48€', details: ['Peinture grand teint premium', 'Application 3 couches min.', 'Ponçage et enduit inclus'], featured: true },
                { label: 'Rénovation complète', price: '44–65€', details: ['Boiseries & plafonds', 'Préparation lourde incluse', 'Garantie résultat 2 ans'], featured: false },
              ].map((c, i) => (
                <div key={i} className={`rounded-2xl border-2 p-6 transition hover:-translate-y-1 ${c.featured ? 'border-[#be123c] bg-gradient-to-br from-[#fff1f3] to-white' : 'border-[#e8d0d8] bg-white hover:border-[#be123c]'}`}>
                  <div className="text-sm font-semibold text-[#6a3a4a] mb-2">{c.label}</div>
                  <div className="text-4xl font-black text-[#2a0a14] mb-1">{c.price}</div>
                  <div className="text-sm text-[#6a3a4a] mb-4">par m²</div>
                  <div className="space-y-1 text-sm text-[#6a3a4a]">
                    {c.details.map((d, j) => (
                      <div key={j} className={j < 2 ? 'border-b border-[#e8d0d8] py-1' : 'py-1'}>{d}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-[#e8d0d8]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#2a0a14] text-white">
                    <th className="px-4 py-3.5 text-left text-sm font-semibold rounded-tl-2xl">Type de bien</th>
                    <th className="px-4 py-3.5 text-left text-sm font-semibold">Peinture standard</th>
                    <th className="px-4 py-3.5 text-left text-sm font-semibold">Finitions soignées</th>
                    <th className="px-4 py-3.5 text-left text-sm font-semibold rounded-tr-2xl">Délai chantier</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {PRIX_TABLE.map((r, i) => (
                    <tr key={i} className="hover:bg-[#fdf2f5] transition">
                      <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm font-medium text-[#2a0a14]">{r.surf}</td>
                      <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm font-bold text-[#be123c]">{r.standard}</td>
                      <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm font-bold text-[#be123c]">{r.premium}</td>
                      <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm text-[#6a3a4a]">{r.delai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">Fourchettes indicatives basées sur les projets publiés sur PremiumArtisan à Lyon.</p>
          </div>
        </section>

        {/* QUARTIERS */}
        <section className="py-16 px-4 bg-[#2a0a14] text-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#fda4af] mb-3">Quartiers & communes</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              Artisans peintres dans<br />toute la métropole lyonnaise
            </h2>
            <p className="text-white/60 mb-10 max-w-2xl">
              Nos artisans couvrent Lyon et toutes les communes de la métropole — du centre-ville aux quartiers périphériques.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {QUARTIERS.map((q, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 hover:border-[#fda4af] hover:bg-white/10 transition">
                  <div className="text-lg font-bold text-white mb-1">{q.name}</div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white/50">Artisans actifs</span>
                    <span className="font-bold text-[#fda4af]">{q.artisans}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white/50">Prix moyen</span>
                    <span className="font-bold text-[#fda4af]">{q.prix}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white/50">Délai réponse</span>
                    <span className="font-bold text-[#fda4af]">{q.delai}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Note moyenne</span>
                    <span className="font-bold text-[#fda4af]">{q.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARTISANS */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#be123c] mb-3">Réseau vérifié</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#2a0a14] mb-4 leading-tight">
              Artisans peintres vérifiés<br />à Lyon
            </h2>
            <p className="text-[#6a3a4a] mb-10 max-w-2xl">
              Sélection rigoureuse — seuls les artisans avec une note minimale de 4.6/5 et des assurances à jour intègrent notre réseau Lyon.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {ARTISANS.map((a, i) => (
                <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-[#2a0a14] to-[#6a0a2c]">
                      {a.initials}
                    </div>
                    <div>
                      <div className="font-bold text-[#2a0a14]">{a.name}</div>
                      <div className="text-xs text-[#be123c]">{a.note} · {a.chantiers}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-[#2a0a14] mb-2">{a.spec}</div>
                  <div className="text-xs text-[#6a3a4a] mb-1">📅 {a.exp}</div>
                  <div className="text-xs text-[#6a3a4a] mb-4">📍 {a.zone}</div>
                  <Link href="/publier-projet/form"
                    className="block rounded-xl bg-[#be123c] px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-[#e11d48] transition">
                    Demander un devis
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GUIDE EXPERT */}
        <section className="py-16 px-4 bg-[#fdf2f5]">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#be123c] mb-3">Guide expert</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#2a0a14] mb-10 leading-tight">
              Tout savoir sur la peinture<br />à Lyon
            </h2>
            <div className="grid md:grid-cols-[2fr_1fr] gap-10">
              <div className="text-[15px] leading-relaxed text-[#6a3a4a] space-y-4">
                <h3 className="text-2xl font-black text-[#2a0a14]">Lyon : deuxième métropole, premier réseau artisanal</h3>
                <p>
                  Lyon, 520 000 habitants et deuxième métropole économique de France, concentre une demande massive en rénovation de logements anciens. Immeubles haussmanniens de la Presqu'île, traboules du Vieux-Lyon, résidences des années 1960–1980 dans les arrondissements périphériques — le parc immobilier lyonnais génère un volume de chantiers considérable pour les artisans peintres.
                </p>
                <p>
                  Avec 486 projets publiés entre janvier 2025 et mars 2026 et 24 artisans peintres vérifiés actifs, Lyon est la deuxième ville la plus active de notre réseau après Paris. Le budget moyen par projet est de 3 400€, reflet d'un marché immobilier dense et diversifié.
                </p>
                <h3 className="text-2xl font-black text-[#2a0a14] mt-6">Spécificités du marché lyonnais</h3>
                <p>
                  Le marché lyonnais est caractérisé par une demande soutenue toute l'année, avec des pics en septembre–octobre et mars–avril. Les particuliers lyonnais comparent en moyenne 2 à 3 devis avant de choisir leur artisan. La réactivité est un facteur clé : un premier contact sous 4h augmente les chances de décrocher le chantier de 65%.
                </p>
                <p>
                  Le Vieux-Lyon (5ème arrondissement) et la Presqu'île (1er et 2ème arrondissements) sont les zones les plus exigeantes : travaux de restauration sur boiseries anciennes, peintures à la chaux, enduits traditionnels. Nos artisans spécialisés dans ces techniques sont identifiés et référencés séparément.
                </p>
                <h3 className="text-2xl font-black text-[#2a0a14] mt-6">Données du marché — Lyon 2026</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Projets publiés 2025–2026 : <strong>486</strong></li>
                  <li>Budget moyen par projet : <strong>3 400€</strong></li>
                  <li>Prix moyen constaté : <strong>36€/m²</strong></li>
                  <li>Délai moyen 1er contact : <strong>2h45</strong></li>
                  <li>Satisfaction clients : <strong>96%</strong></li>
                  <li>Note moyenne artisans : <strong>4.8/5</strong></li>
                  <li>Artisans vérifiés actifs : <strong>24</strong></li>
                </ul>
              </div>

              {/* SIDEBAR */}
              <div className="space-y-4">
                <div className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-white p-6">
                  <h4 className="font-black text-[#2a0a14] mb-4">Données Lyon 2026</h4>
                  {[
                    { k: 'Prix moyen standard', v: '34€/m²' },
                    { k: 'Prix moyen premium', v: '46€/m²' },
                    { k: 'Budget moyen projet', v: '3 400€' },
                    { k: 'Artisans actifs', v: '24' },
                    { k: 'Satisfaction', v: '4.8/5' },
                    { k: 'Délai réponse', v: '2–4h' },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between border-b border-[#e8d0d8] py-2 text-sm last:border-0">
                      <span className="text-[#6a3a4a]">{s.k}</span>
                      <span className="font-bold text-[#2a0a14]">{s.v}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-white p-6">
                  <h4 className="font-black text-[#2a0a14] mb-4">Communes proches</h4>
                  {[
                    { label: 'Peintre Villeurbanne', href: '/devis-peintre/villeurbanne' },
                    { label: 'Peintre Grenoble', href: '/devis-peintre/grenoble' },
                    { label: 'Peintre Saint-Étienne', href: '/devis-peintre/saint-etienne' },
                    { label: 'Peintre Clermont-Ferrand', href: '/devis-peintre/clermont-ferrand' },
                  ].map((l, i) => (
                    <div key={i} className="flex justify-between py-2 text-sm border-b border-[#e8d0d8] last:border-0">
                      <Link href={l.href} className="text-[#be123c] hover:underline">{l.label}</Link>
                      <span className="text-[#2a0a14] font-bold">→</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEMOIGNAGES */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#be123c] mb-3">Avis clients vérifiés</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#2a0a14] mb-10 leading-tight">
              Ce que disent nos clients<br />à Lyon
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {REVIEWS.map((t, i) => (
                <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-6">
                  <div className="text-[#f59e0b] mb-3">⭐⭐⭐⭐⭐</div>
                  <p className="text-sm italic text-[#6a3a4a] leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-[#2a0a14] to-[#6a0a2c]">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#2a0a14]">{t.name}</div>
                      <div className="text-xs text-[#6a3a4a]">{t.loc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-[#fdf2f5]">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#be123c] mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#2a0a14] mb-10 leading-tight">
              Questions fréquentes<br />— Lyon
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((f, i) => (
                <div key={i} className="rounded-2xl border border-[#e8d0d8] bg-white p-6">
                  <h3 className="font-bold text-[#2a0a14] mb-2">{f.q}</h3>
                  <p className="text-sm text-[#6a3a4a] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Autres services & villes</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { title: 'Peintre Villeurbanne', sub: '14 artisans · 27–42€/m²', href: '/devis-peintre/villeurbanne' },
                { title: 'Peintre Grenoble', sub: '11 artisans · 24–44€/m²', href: '/devis-peintre/grenoble' },
                { title: 'Peintre Saint-Étienne', sub: '9 artisans · 22–38€/m²', href: '/devis-peintre/saint-etienne' },
                { title: 'Peintre Dijon', sub: '18 artisans · 25–45€/m²', href: '/devis-peintre/dijon' },
                { title: 'Peintre Paris', sub: '45+ artisans · 35–55€/m²', href: '/devis-peintre/paris' },
                { title: 'Cuisiniste Lyon', sub: 'Rénovation cuisine Lyon', href: '/devis-cuisine/lyon' },
                { title: 'Peintre Marseille', sub: '22 artisans · 26–42€/m²', href: '/devis-peintre/marseille' },
                { title: 'Peintre Toulouse', sub: '19 artisans · 26–42€/m²', href: '/devis-peintre/toulouse' },
              ].map((link, i) => (
                <Link key={i} href={link.href}
                  className="rounded-xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-4 hover:-translate-y-0.5 hover:border-[#be123c] transition">
                  <div className="text-sm font-bold text-[#2a0a14] mb-1">{link.title}</div>
                  <div className="text-xs text-[#6a3a4a]">{link.sub}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-16 px-4 text-center bg-[#2a0a14] text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Obtenez vos devis peinture<br />à Lyon
            </h2>
            <p className="text-white/70 mb-8">
              Gratuit, sans engagement. Jusqu'à 3 artisans peintres qualifiés dans le Rhône.
            </p>
            <Link href="/publier-projet/form"
              className="inline-flex items-center justify-center rounded-2xl bg-[#be123c] px-10 py-5 text-xl font-bold text-white shadow-[0_12px_32px_rgba(190,18,60,0.4)] hover:bg-[#e11d48] transition">
              Demander mes devis gratuits →
            </Link>
            <p className="mt-3 text-sm text-white/40">Sans engagement · 3 artisans max · Anti-spam</p>
          </div>
        </section>

      </main>
    </>
  );
}