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
    a: 'À Lyon, un peintre facture en moyenne 28–45€/m² pour la peinture intérieure. Pour un T3 de 70m², comptez entre 2 800€ et 4 500€. Les finitions premium peuvent atteindre 55–70€/m². Les travaux dans le Vieux-Lyon ou la Presqu\'île sont généralement 10–15% plus chers en raison de l\'accessibilité et des contraintes architecturales.',
  },
  {
    q: 'Comment obtenir des devis peinture gratuits à Lyon ?',
    a: 'Publiez votre projet sur PremiumArtisan en 2 minutes. Vous recevez jusqu\'à 3 devis de peintres lyonnais vérifiés sous 24h, gratuitement et sans engagement. Vos coordonnées sont transmises uniquement aux artisans sélectionnés.',
  },
  {
    q: 'Quels arrondissements couvrent vos artisans peintres à Lyon ?',
    a: 'Nos artisans couvrent l\'ensemble des 9 arrondissements de Lyon. Ils interviennent également dans les communes de la métropole : Villeurbanne, Caluire-et-Cuire, Bron, Vénissieux, Saint-Fons, Tassin-la-Demi-Lune et Saint-Priest.',
  },
  {
    q: 'Quel délai pour démarrer un chantier de peinture à Lyon ?',
    a: 'En moyenne, les premiers devis arrivent sous 24h. Le démarrage du chantier est possible sous 1 à 3 semaines selon la disponibilité de l\'artisan et la complexité du projet. En haute saison (septembre–novembre), prévoyez 2 à 4 semaines.',
  },
  {
    q: 'Les artisans peintres sont-ils vérifiés à Lyon ?',
    a: 'Oui. Chaque artisan de notre réseau lyonnais est contrôlé : SIRET actif, assurance décennale et RC pro à jour, vérification des références. Seuls les artisans avec une note minimale de 4.6/5 intègrent notre réseau. Les artisans sont réévalués régulièrement.',
  },
  {
    q: 'Puis-je bénéficier d\'aides pour des travaux de peinture à Lyon ?',
    a: 'Oui, selon votre situation. MaPrimeRénov\' peut couvrir une partie des travaux si la peinture est associée à un chantier de rénovation énergétique. La TVA à 10% (au lieu de 20%) s\'applique pour les logements de plus de 2 ans. Les propriétaires bailleurs peuvent déduire les travaux de peinture de leurs revenus fonciers.',
  },
];

const QUARTIERS = [
  { name: 'Vieux-Lyon / 5ème', prix: '32–50€/m²', delai: '3–6h' },
  { name: 'Presqu\'île / 1er–2ème', prix: '30–48€/m²', delai: '2–5h' },
  { name: 'Croix-Rousse / 4ème', prix: '29–46€/m²', delai: '2–4h' },
  { name: 'Part-Dieu / 3ème', prix: '28–44€/m²', delai: '2–4h' },
  { name: 'Confluence / 2ème', prix: '30–47€/m²', delai: '3–5h' },
  { name: 'Villeurbanne', prix: '27–42€/m²', delai: '2–4h' },
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
    initials: 'J.V.',
    spec: 'Peinture intérieure et rénovation complète',
    exp: '22 ans d\'expérience',
    zone: 'Lyon 1–4 · Presqu\'île · Vieux-Lyon',
    note: '4.9/5',
  },
  {
    initials: 'S.R.',
    spec: 'Finitions soignées et peinture décorative',
    exp: '14 ans d\'expérience',
    zone: 'Lyon 6–8 · Villeurbanne · Bron',
    note: '4.8/5',
  },
  {
    initials: 'K.D.',
    spec: 'Appartements et bailleurs — délai rapide',
    exp: '11 ans d\'expérience',
    zone: 'Lyon 3–9 · Vénissieux · Saint-Fons',
    note: '4.8/5',
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
            <p className="text-[#fda4af] text-xs font-bold uppercase tracking-widest mb-4">
              Rhône · Auvergne-Rhône-Alpes · 520 000 hab.
            </p>
            <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight">
              Peintre à <span className="text-[#fda4af]">Lyon</span><br />
              Devis Gratuit 2026
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl">
              Comparez jusqu'à 3 artisans peintres vérifiés à Lyon. Prix moyen constaté : <strong className="text-white">28–45€/m²</strong>. Réponse sous 24h, sans engagement.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { value: 'Max 3', label: 'Artisans par projet' },
                { value: '24h', label: 'Délai réponse' },
                { value: '100%', label: 'Gratuit & sans engagement' },
                { value: 'Vérifiés', label: 'Artisans contrôlés' },
              ].map((b, i) => (
                <div key={i} className="rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-center min-w-[110px]">
                  <div className="text-xl font-bold text-white">{b.value}</div>
                  <div className="text-xs text-white/60 mt-0.5">{b.label}</div>
                </div>
              ))}
            </div>
            <Link href="/publier-projet/form"
              className="inline-flex items-center justify-center rounded-2xl bg-[#be123c] px-10 py-5 text-xl font-bold text-white shadow-[0_12px_32px_rgba(190,18,60,0.4)] hover:bg-[#e11d48] transition">
              Demander mes devis gratuits →
            </Link>
            <p className="mt-3 text-sm text-white/40">Sans engagement · 3 artisans max · Coordonnées protégées</p>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="bg-[#be123c] py-4 px-4">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-white font-medium">
            {['Artisans vérifiés Rhône', 'Max 3 peintres par projet', 'Réponse sous 24h', 'Coordonnées protégées', 'Sans engagement'].map(t => (
              <span key={t}>✓ {t}</span>
            ))}
          </div>
        </section>

        {/* POURQUOI */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#be123c] mb-3">Pourquoi nous choisir</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#2a0a14] mb-10 leading-tight">
              Trouver un peintre fiable à Lyon
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: 'Réseau dense Lyon', desc: 'Des artisans actifs couvrant tous les arrondissements et la métropole lyonnaise.' },
                { title: 'Réponse sous 24h', desc: 'Première réponse garantie sous 24h en semaine. Démarrage sous 1 à 3 semaines.' },
                { title: 'Artisans vérifiés', desc: 'SIRET, assurances, références — chaque artisan est contrôlé avant intégration au réseau.' },
                { title: '3 artisans max', desc: 'Vos coordonnées ne sont jamais revendues. Contact limité à 3 artisans qualifiés.' },
              ].map((f, i) => (
                <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0d8] p-6 hover:border-[#be123c] transition">
                  <div className="font-bold text-[#2a0a14] mb-2 text-base">{f.title}</div>
                  <div className="text-sm text-[#6a3a4a] leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRIX */}
        <section className="py-16 px-4 bg-[#fdf2f5]">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#be123c] mb-3">Prix indicatifs 2026</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#2a0a14] mb-4 leading-tight">
              Combien coûte la peinture<br />à Lyon ?
            </h2>
            <p className="text-[#6a3a4a] mb-10 max-w-2xl text-base leading-relaxed">
              Les fourchettes ci-dessous sont indicatives. Les tarifs varient selon l'état du support, l'accessibilité et le type de finition choisi.
            </p>

            <div className="grid sm:grid-cols-3 gap-5 mb-10">
              {[
                { label: 'Peinture intérieure standard', price: '28–38€', details: ['Main d\'œuvre : 15–22€/m²', 'Fournitures : 7–10€/m²', 'Préparation : 6–8€/m²'], featured: false },
                { label: 'Finitions soignées', price: '36–48€', details: ['Peinture grand teint premium', 'Application 3 couches minimum', 'Ponçage et enduit inclus'], featured: true },
                { label: 'Rénovation complète', price: '44–65€', details: ['Boiseries et plafonds', 'Préparation lourde incluse', 'Garantie résultat'], featured: false },
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
            <p className="text-xs text-gray-400 mt-3">Fourchettes indicatives. Les prix réels dépendent de l'état du support et des finitions choisies.</p>
          </div>
        </section>

        {/* QUARTIERS */}
        <section className="py-16 px-4 bg-[#2a0a14] text-white">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#fda4af] mb-3">Quartiers et communes</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              Artisans peintres dans<br />toute la métropole lyonnaise
            </h2>
            <p className="text-white/60 mb-10 max-w-2xl text-base">
              Nos artisans couvrent Lyon et les communes de la métropole — du centre-ville aux quartiers périphériques.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {QUARTIERS.map((q, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 hover:border-[#fda4af] hover:bg-white/10 transition">
                  <div className="text-lg font-bold text-white mb-3">{q.name}</div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white/50">Prix indicatif</span>
                    <span className="font-bold text-[#fda4af]">{q.prix}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Délai réponse</span>
                    <span className="font-bold text-[#fda4af]">{q.delai}</span>
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
              Exemples d'artisans peintres<br />disponibles à Lyon
            </h2>
            <p className="text-[#6a3a4a] mb-10 max-w-2xl text-base leading-relaxed">
              PremiumArtisan sélectionne des artisans avec SIRET actif, assurances à jour et note minimale de 4.6/5. Les profils ci-dessous illustrent le type d'artisans disponibles sur notre réseau lyonnais.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {ARTISANS.map((a, i) => (
                <div key={i} className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-[#fdf2f5] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-[#2a0a14] to-[#6a0a2c] shrink-0">
                      {a.initials}
                    </div>
                    <div className="text-xs text-[#be123c] font-bold">{a.note} · Artisan vérifié</div>
                  </div>
                  <div className="text-sm font-semibold text-[#2a0a14] mb-2">{a.spec}</div>
                  <div className="text-xs text-[#6a3a4a] mb-1">{a.exp}</div>
                  <div className="text-xs text-[#6a3a4a] mb-4">{a.zone}</div>
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
            <p className="text-xs font-bold uppercase tracking-widest text-[#be123c] mb-3">Guide</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#2a0a14] mb-10 leading-tight">
              Tout savoir sur la peinture<br />à Lyon
            </h2>
            <div className="grid md:grid-cols-[2fr_1fr] gap-10">
              <div className="text-[15px] leading-relaxed text-[#6a3a4a] space-y-5">
                <h3 className="text-2xl font-black text-[#2a0a14]">Lyon : deuxième métropole, marché artisanal dense</h3>
                <p>
                  Lyon, deuxième métropole économique de France avec 520 000 habitants, concentre une demande soutenue en rénovation de logements anciens. Immeubles haussmanniens de la Presqu'île, traboules du Vieux-Lyon classé au patrimoine mondial de l'UNESCO, résidences des années 1960–1980 dans les arrondissements périphériques — le parc immobilier lyonnais est varié et génère un volume de chantiers important pour les artisans peintres.
                </p>
                <p>
                  Le marché lyonnais est caractérisé par une demande soutenue toute l'année, avec des pics en septembre–octobre et mars–avril. Les particuliers lyonnais comparent en moyenne 2 à 3 devis avant de choisir leur artisan. La réactivité est un facteur clé pour les artisans souhaitant décrocher des chantiers.
                </p>
                <h3 className="text-2xl font-black text-[#2a0a14]">Spécificités du marché lyonnais</h3>
                <p>
                  Le Vieux-Lyon (5ème arrondissement) et la Presqu'île (1er et 2ème arrondissements) présentent des contraintes spécifiques : bâtiments classés, travaux de restauration sur boiseries anciennes, peintures à la chaux sur murs en pierre, enduits traditionnels. Ces chantiers requièrent des artisans formés aux techniques du bâtiment ancien.
                </p>
                <p>
                  La Croix-Rousse (4ème arrondissement), quartier historique des canuts, concentre de nombreux appartements anciens avec des hauteurs sous plafond importantes. Ces logements nécessitent souvent des échafaudages intérieurs et une expérience en travaux en hauteur.
                </p>
                <h3 className="text-2xl font-black text-[#2a0a14]">Comment préparer son projet de peinture à Lyon ?</h3>
                <p>
                  Avant de publier votre projet, mesurez précisément la surface à peindre (longueur × hauteur des murs, moins les ouvertures), notez l'état actuel des supports (fissures, humidité, ancienne peinture) et définissez vos attentes en termes de finition (mate, satinée, brillante). Ces informations permettent aux artisans de proposer des devis précis et comparables.
                </p>
                <p>
                  Un devis sans visite est possible pour les projets simples. Une visite préalable reste recommandée pour les rénovations complexes ou les biens anciens, en particulier dans le Vieux-Lyon et la Presqu'île.
                </p>
                <h3 className="text-2xl font-black text-[#2a0a14]">TVA et aides financières à Lyon</h3>
                <p>
                  Pour les logements de plus de 2 ans, la TVA applicable aux travaux de peinture est de 10% (au lieu de 20% pour les constructions neuves). Si les travaux de peinture sont associés à un chantier de rénovation énergétique éligible à MaPrimeRénov', une partie des dépenses peut être subventionnée. Les propriétaires bailleurs peuvent déduire les travaux d'entretien et de réparation de leurs revenus fonciers.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-white p-6">
                  <h4 className="font-black text-[#2a0a14] mb-4 text-base">Prix indicatifs Lyon 2026</h4>
                  {[
                    { k: 'Peinture standard', v: '28–38€/m²' },
                    { k: 'Finitions premium', v: '36–48€/m²' },
                    { k: 'Rénovation complète', v: '44–65€/m²' },
                    { k: 'T3 standard (70m²)', v: '2 800–3 800€' },
                    { k: 'Délai réponse', v: 'sous 24h' },
                    { k: 'Artisans max', v: '3 par projet' },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between border-b border-[#e8d0d8] py-2 text-sm last:border-0">
                      <span className="text-[#6a3a4a]">{s.k}</span>
                      <span className="font-bold text-[#2a0a14]">{s.v}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border-[1.5px] border-[#e8d0d8] bg-white p-6">
                  <h4 className="font-black text-[#2a0a14] mb-4 text-base">Communes proches</h4>
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

        {/* FAQ */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#be123c] mb-3">Questions fréquentes</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#2a0a14] mb-10 leading-tight">
              FAQ — Peintre à Lyon
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((f, i) => (
                <div key={i} className="rounded-2xl border border-[#e8d0d8] bg-[#fdf2f5] p-6">
                  <h3 className="font-bold text-[#2a0a14] mb-2 text-base">{f.q}</h3>
                  <p className="text-sm text-[#6a3a4a] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section className="py-16 px-4 bg-[#fdf2f5]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Autres villes et services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { title: 'Peintre Villeurbanne', sub: 'Commune limitrophe de Lyon', href: '/devis-peintre/villeurbanne' },
                { title: 'Peintre Grenoble', sub: 'Isère · Auvergne-Rhône-Alpes', href: '/devis-peintre/grenoble' },
                { title: 'Peintre Saint-Étienne', sub: 'Loire · 172 000 hab.', href: '/devis-peintre/saint-etienne' },
                { title: 'Peintre Dijon', sub: "Côte-d'Or · Bourgogne", href: '/devis-peintre/dijon' },
                { title: 'Peintre Paris', sub: 'Île-de-France · 2,1M hab.', href: '/devis-peintre/paris' },
                { title: 'Cuisiniste Lyon', sub: 'Rénovation cuisine Lyon', href: '/devis-cuisine/lyon' },
                { title: 'Peintre Marseille', sub: 'Bouches-du-Rhône · PACA', href: '/devis-peintre/marseille' },
                { title: 'Peintre Toulouse', sub: 'Haute-Garonne · Occitanie', href: '/devis-peintre/toulouse' },
              ].map((link, i) => (
                <Link key={i} href={link.href}
                  className="rounded-xl border-[1.5px] border-[#e8d0d8] bg-white p-4 hover:-translate-y-0.5 hover:border-[#be123c] transition">
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
            <p className="text-white/70 mb-8 text-base">
              Gratuit, sans engagement. Jusqu'à 3 artisans peintres vérifiés dans le Rhône.
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