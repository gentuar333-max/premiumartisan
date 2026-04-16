// app/devis-cuisine/[ville]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

// ── VILLES DATA ────────────────────────────────────────────────────────────
const VILLES_DATA: Record<string, {
  nom: string; dept: string; cp: string; region: string; slug: string; voisines: string[];
  population?: string; context?: string; marche?: string;
  prix?: { label: string; fourchette: string }[];
  faq?: { q: string; a: string }[];
}> = {
  'dijon': {
    nom: 'Dijon', dept: "Côte-d'Or", cp: '21000', region: 'Bourgogne', slug: 'dijon',
    voisines: ['chenove', 'longvic', 'talant', 'quetigny', 'beaune'],
    population: '160 000 hab.',
    context: "Dijon, capitale de la Bourgogne, concentre une forte demande en rénovation de cuisines — dans les appartements haussmanniens du centre-ville, les pavillons des années 1970 en périphérie et les logements locatifs remis à neuf. Les cuisinistes dijonnais interviennent aussi bien sur des rénovations complètes que sur la pose de cuisines IKEA ou sur mesure.",
    marche: "Le marché dijonnais est dense : plusieurs cuisinistes locaux se partagent les chantiers. Les particuliers comparent 2 à 4 devis avant de choisir. PremiumArtisan sélectionne les artisans les plus réactifs pour chaque projet.",
    prix: [
      { label: "Pose cuisine IKEA (fournie)", fourchette: "800–2 000€" },
      { label: "Rénovation cuisine T3", fourchette: "4 500–12 000€" },
      { label: "Cuisine sur mesure 15m²", fourchette: "8 000–25 000€" },
      { label: "Remplacement plan de travail", fourchette: "600–2 500€" },
    ],
    faq: [
      { q: "Quel est le prix d'une rénovation cuisine à Dijon ?", a: "À Dijon, une rénovation cuisine complète coûte entre 4 500€ et 12 000€ pour un T3. Le tarif dépend des matériaux, de la surface et du type de cuisine choisie (IKEA, semi-sur mesure ou sur mesure)." },
      { q: "Comment trouver un cuisiniste qualifié à Dijon ?", a: "PremiumArtisan sélectionne des cuisinistes vérifiés à Dijon et en Côte-d'Or. Publiez votre projet pour recevoir jusqu'à 3 devis sous 24h, gratuitement et sans engagement." },
      { q: "Faut-il un permis pour rénover une cuisine à Dijon ?", a: "Non, la rénovation d'une cuisine ne nécessite pas de permis de construire si vous ne modifiez pas la structure du bâtiment. En copropriété, il peut être nécessaire d'informer le syndic selon le règlement intérieur." },
    ],
  },
  'chenove': {
    nom: 'Chenôve', dept: "Côte-d'Or", cp: '21300', region: 'Bourgogne', slug: 'chenove',
    voisines: ['dijon', 'longvic', 'marsannay-la-cote'],
    context: "Chenôve, commune résidentielle au sud de Dijon, est fortement représentée par des logements HLM et des résidences des années 1970. La rénovation de cuisine y est fréquente pour les remises à neuf avant relocation ou pour moderniser des équipements vieillissants.",
    marche: "Les cuisinistes intervenant à Chenôve travaillent souvent pour des propriétaires bailleurs et des particuliers souhaitant moderniser leur logement à moindre coût.",
    prix: [
      { label: "Pose cuisine IKEA", fourchette: "700–1 800€" },
      { label: "Rénovation cuisine HLM", fourchette: "3 500–8 000€" },
      { label: "Remplacement électroménager + plan de travail", fourchette: "1 200–3 500€" },
    ],
    faq: [
      { q: "Quel cuisiniste pour un logement HLM à Chenôve ?", a: "PremiumArtisan met en relation les propriétaires de Chenôve avec des artisans spécialisés en rénovation de cuisines dans les logements sociaux et locatifs. Devis gratuit sous 24h." },
      { q: "Combien coûte une cuisine à Chenôve ?", a: "La rénovation d'une cuisine à Chenôve coûte entre 3 500€ et 8 000€ selon l'état du logement et les matériaux choisis. La pose seule (cuisine fournie) est entre 700€ et 1 800€." },
    ],
  },
  'longvic': {
    nom: 'Longvic', dept: "Côte-d'Or", cp: '21600', region: 'Bourgogne', slug: 'longvic',
    voisines: ['dijon', 'chenove', 'quetigny'],
    prix: [
      { label: "Pose cuisine IKEA", fourchette: "750–1 900€" },
      { label: "Rénovation cuisine appartement", fourchette: "4 000–10 000€" },
    ],
    faq: [
      { q: "Cuisiniste à Longvic — comment avoir un devis ?", a: "Publiez votre projet sur PremiumArtisan. Des cuisinistes de Longvic et du Grand Dijon vous répondent sous 24h, gratuitement." },
    ],
  },
  'talant': {
    nom: 'Talant', dept: "Côte-d'Or", cp: '21240', region: 'Bourgogne', slug: 'talant',
    voisines: ['dijon', 'fontaine-les-dijon', 'chenove'],
    prix: [
      { label: "Rénovation cuisine appartement", fourchette: "4 200–10 500€" },
      { label: "Cuisine sur mesure", fourchette: "9 000–22 000€" },
    ],
    faq: [
      { q: "Devis cuisine à Talant — comment faire ?", a: "PremiumArtisan met en relation les particuliers de Talant avec des cuisinistes qualifiés de la Côte-d'Or. Réponse sous 24h, sans engagement." },
    ],
  },
  'quetigny': {
    nom: 'Quetigny', dept: "Côte-d'Or", cp: '21800', region: 'Bourgogne', slug: 'quetigny',
    voisines: ['dijon', 'longvic', 'marsannay-la-cote'],
    prix: [
      { label: "Pose cuisine", fourchette: "800–2 000€" },
      { label: "Rénovation complète", fourchette: "5 000–13 000€" },
    ],
    faq: [
      { q: "Cuisiniste disponible à Quetigny ?", a: "Oui. PremiumArtisan référence des cuisinistes à Quetigny et dans toute la Côte-d'Or. Devis gratuit sous 24h." },
    ],
  },
  'fontaine-les-dijon': {
    nom: 'Fontaine-lès-Dijon', dept: "Côte-d'Or", cp: '21121', region: 'Bourgogne', slug: 'fontaine-les-dijon',
    voisines: ['dijon', 'talant'],
    prix: [
      { label: "Rénovation cuisine", fourchette: "4 500–11 000€" },
      { label: "Cuisine sur mesure", fourchette: "10 000–24 000€" },
    ],
    faq: [
      { q: "Devis cuisine à Fontaine-lès-Dijon ?", a: "PremiumArtisan met en relation les particuliers de Fontaine-lès-Dijon avec des cuisinistes vérifiés de Côte-d'Or." },
    ],
  },
  'marsannay-la-cote': {
    nom: 'Marsannay-la-Côte', dept: "Côte-d'Or", cp: '21160', region: 'Bourgogne', slug: 'marsannay-la-cote',
    voisines: ['dijon', 'chenove'],
    prix: [{ label: "Rénovation cuisine", fourchette: "4 000–10 000€" }],
    faq: [{ q: "Cuisiniste à Marsannay-la-Côte ?", a: "Publiez votre projet sur PremiumArtisan pour recevoir des devis de cuisinistes locaux." }],
  },
  'beaune': {
    nom: 'Beaune', dept: "Côte-d'Or", cp: '21200', region: 'Bourgogne', slug: 'beaune',
    voisines: ['dijon', 'nuits-saint-georges'],
    context: "Beaune, capitale des vins de Bourgogne, accueille un parc immobilier varié : maisons de maître, propriétés viticoles et résidences récentes. La demande en rénovation de cuisine haut de gamme y est forte.",
    prix: [
      { label: "Rénovation cuisine maison", fourchette: "6 000–18 000€" },
      { label: "Cuisine sur mesure prestige", fourchette: "15 000–40 000€" },
    ],
    faq: [
      { q: "Comment trouver un cuisiniste qualifié à Beaune ?", a: "PremiumArtisan sélectionne des cuisinistes vérifiés à Beaune et en Côte-d'Or. Publiez votre projet pour recevoir 3 devis sous 24h." },
    ],
  },
  'lyon': {
    nom: 'Lyon', dept: 'Rhône', cp: '69000', region: 'Auvergne-Rhône-Alpes', slug: 'lyon',
    voisines: ['villeurbanne', 'saint-etienne', 'grenoble'],
    population: '520 000 hab.',
    context: "Lyon, deuxième métropole française, concentre une demande massive en rénovation de cuisines — dans les appartements Haussmanniens, les traboules du Vieux-Lyon et les résidences des arrondissements périphériques.",
    marche: "À Lyon, les particuliers comparent plusieurs devis en 48h. Les cuisinistes lyonnais interviennent sur tous types de chantiers : du studio étudiant à la cuisine de chef sur mesure.",
    prix: [
      { label: "Pose cuisine IKEA Lyon", fourchette: "900–2 200€" },
      { label: "Rénovation cuisine T3 Lyon", fourchette: "5 500–15 000€" },
      { label: "Cuisine sur mesure 20m²", fourchette: "15 000–45 000€" },
    ],
    faq: [
      { q: "Prix d'une rénovation cuisine à Lyon ?", a: "À Lyon, une rénovation cuisine complète coûte entre 5 500€ et 15 000€ pour un T3. La pose seule d'une cuisine fournie est entre 900€ et 2 200€." },
      { q: "Devis cuisiniste gratuit à Lyon ?", a: "PremiumArtisan publie votre projet et vous met en relation avec 3 cuisinistes lyonnais sous 24h." },
    ],
  },
  'paris': {
    nom: 'Paris', dept: 'Paris', cp: '75000', region: 'Île-de-France', slug: 'paris',
    voisines: ['boulogne-billancourt', 'saint-denis', 'versailles'],
    population: '2 100 000 hab.',
    context: "Paris concentre la demande en rénovation de cuisines la plus élevée de France. Haussmannien, art déco, studios — le parc immobilier parisien génère un volume de chantiers considérable pour les cuisinistes.",
    marche: "Le marché parisien est ultra-compétitif. Les particuliers comparent 3 à 5 devis avant de choisir. Réactivité et professionnalisme sont décisifs.",
    prix: [
      { label: "Pose cuisine IKEA Paris", fourchette: "1 200–2 800€" },
      { label: "Rénovation cuisine appartement 10m²", fourchette: "6 000–18 000€" },
      { label: "Cuisine sur mesure Paris", fourchette: "20 000–80 000€" },
    ],
    faq: [
      { q: "Quel est le prix d'une cuisine à Paris ?", a: "À Paris, la rénovation d'une cuisine coûte 20–30% plus cher qu'en province. Comptez entre 6 000€ et 18 000€ pour une rénovation complète d'une cuisine de 10m²." },
      { q: "Comment obtenir des devis cuisine à Paris ?", a: "PremiumArtisan sélectionne des cuisinistes parisiens vérifiés. Publiez votre projet pour recevoir 3 devis sous 24h." },
    ],
  },
  'marseille': {
    nom: 'Marseille', dept: 'Bouches-du-Rhône', cp: '13000', region: 'PACA', slug: 'marseille',
    voisines: ['aix-en-provence', 'toulon'],
    population: '870 000 hab.',
    prix: [
      { label: "Rénovation cuisine T3", fourchette: "4 500–12 000€" },
      { label: "Cuisine sur mesure", fourchette: "12 000–35 000€" },
    ],
    faq: [
      { q: "Cuisiniste à Marseille ?", a: "PremiumArtisan référence des cuisinistes à Marseille et dans les Bouches-du-Rhône. Devis gratuit sous 24h." },
    ],
  },
  'toulouse': {
    nom: 'Toulouse', dept: 'Haute-Garonne', cp: '31000', region: 'Occitanie', slug: 'toulouse',
    voisines: ['montpellier', 'bordeaux'],
    prix: [
      { label: "Rénovation cuisine T3", fourchette: "4 800–13 000€" },
      { label: "Cuisine sur mesure", fourchette: "13 000–38 000€" },
    ],
    faq: [
      { q: "Cuisiniste à Toulouse ?", a: "PremiumArtisan publie votre projet et vous met en relation avec 3 cuisinistes toulousains sous 24h." },
    ],
  },
  'bordeaux': {
    nom: 'Bordeaux', dept: 'Gironde', cp: '33000', region: 'Nouvelle-Aquitaine', slug: 'bordeaux',
    voisines: ['merignac', 'pessac'],
    prix: [
      { label: "Rénovation cuisine T3", fourchette: "5 000–14 000€" },
      { label: "Cuisine sur mesure", fourchette: "14 000–40 000€" },
    ],
    faq: [
      { q: "Cuisiniste à Bordeaux ?", a: "PremiumArtisan référence des cuisinistes à Bordeaux et en Gironde. Devis gratuit." },
    ],
  },
  'lille': {
    nom: 'Lille', dept: 'Nord', cp: '59000', region: 'Hauts-de-France', slug: 'lille',
    voisines: ['roubaix', 'tourcoing'],
    prix: [
      { label: "Rénovation cuisine T3", fourchette: "4 500–12 000€" },
      { label: "Cuisine sur mesure", fourchette: "12 000–35 000€" },
    ],
    faq: [
      { q: "Cuisiniste à Lille ?", a: "PremiumArtisan publie votre projet et vous met en relation avec des cuisinistes lillois sous 24h." },
    ],
  },
  'nantes': {
    nom: 'Nantes', dept: 'Loire-Atlantique', cp: '44000', region: 'Pays de la Loire', slug: 'nantes',
    voisines: ['rennes', 'angers', 'saint-nazaire'],
    prix: [
      { label: "Rénovation cuisine T3", fourchette: "4 800–13 000€" },
      { label: "Cuisine sur mesure", fourchette: "13 000–38 000€" },
    ],
    faq: [
      { q: "Cuisiniste à Nantes ?", a: "PremiumArtisan référence des cuisinistes à Nantes et en Loire-Atlantique." },
    ],
  },
  'strasbourg': {
    nom: 'Strasbourg', dept: 'Bas-Rhin', cp: '67000', region: 'Grand Est', slug: 'strasbourg',
    voisines: ['mulhouse', 'colmar', 'nancy'],
    prix: [
      { label: "Rénovation cuisine T3", fourchette: "4 600–12 500€" },
    ],
    faq: [
      { q: "Cuisiniste à Strasbourg ?", a: "PremiumArtisan met en relation les particuliers de Strasbourg avec des cuisinistes qualifiés du Bas-Rhin." },
    ],
  },
  'rennes': {
    nom: 'Rennes', dept: 'Ille-et-Vilaine', cp: '35000', region: 'Bretagne', slug: 'rennes',
    voisines: ['nantes', 'caen', 'brest'],
    prix: [
      { label: "Rénovation cuisine T3", fourchette: "4 500–12 000€" },
    ],
    faq: [
      { q: "Cuisiniste à Rennes ?", a: "PremiumArtisan référence des cuisinistes à Rennes et en Ille-et-Vilaine." },
    ],
  },
};

// ── STATIC PARAMS ──────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return Object.keys(VILLES_DATA).map((ville) => ({ ville }));
}

// ── METADATA ───────────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ ville: string }> }
): Promise<Metadata> {
  const { ville } = await params;
  const data = VILLES_DATA[ville];
  if (!data) return { title: 'Page introuvable' };
  const { nom, dept } = data;
  return {
    title: `Rénovation Cuisine ${nom} — Cuisinistes Vérifiés & Devis Gratuit 2026 | PremiumArtisan`,
    description: `Obtenez jusqu'à 3 devis de cuisinistes qualifiés à ${nom}. Artisans ${dept} vérifiés, réponse sous 24h, sans engagement. Pose IKEA, cuisine sur mesure, rénovation.`,
    alternates: { canonical: `https://www.premiumartisan.fr/devis-cuisine/${ville}` },
    keywords: `cuisiniste ${nom.toLowerCase()}, rénovation cuisine ${nom.toLowerCase()}, devis cuisine ${nom.toLowerCase()}, pose cuisine ${dept.toLowerCase()}`,
    openGraph: {
      title: `Cuisiniste ${nom} – 3 Artisans Qualifiés`,
      description: `Comparez jusqu'à 3 devis de cuisinistes à ${nom}. Réponse sous 24h.`,
      url: `https://www.premiumartisan.fr/devis-cuisine/${ville}`,
      type: 'website', locale: 'fr_FR', siteName: 'PremiumArtisan',
    },
  };
}

// ── PAGE ───────────────────────────────────────────────────────────────────
export default async function DevisCuisineVille(
  { params }: { params: Promise<{ ville: string }> }
) {
  const { ville } = await params;
  const data = VILLES_DATA[ville];

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page introuvable</h1>
          <Link href="/" className="text-[#be123c] underline">Retour à l'accueil</Link>
        </div>
      </main>
    );
  }

  const { nom, dept, cp, region, voisines } = data;

  // ── SCHEMA JSON-LD (LocalBusiness + Service + FAQPage) ─────────────────
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": `PremiumArtisan — Cuisiniste à ${nom}`,
        "image": "https://www.premiumartisan.fr/og-image.jpg",
        "url": `https://www.premiumartisan.fr/devis-cuisine/${ville}`,
        "telephone": "+33XXXXXXXXX",
        "priceRange": "€€",
        "description": `Mise en relation avec des cuisinistes qualifiés à ${nom}, ${dept}. Devis gratuit sous 24h.`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": nom,
          "postalCode": cp,
          "addressRegion": dept,
          "addressCountry": "FR",
        },
        "areaServed": {
          "@type": "City",
          "name": nom,
        },
        "sameAs": ["https://www.premiumartisan.fr"],
      },
      {
        "@type": "Service",
        "name": `Devis cuisiniste à ${nom}`,
        "description": `Mise en relation avec des cuisinistes qualifiés à ${nom}, ${dept}.`,
        "provider": { "@type": "Organization", "name": "PremiumArtisan", "url": "https://www.premiumartisan.fr" },
        "areaServed": { "@type": "City", "name": nom },
        "serviceType": "Rénovation et pose de cuisine",
      },
      ...(data.faq ? [{
        "@type": "FAQPage",
        "mainEntity": data.faq.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      }] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen bg-white">

        {/* BREADCRUMB */}
        <nav className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#be123c]">Accueil</Link>
            <span>›</span>
            <Link href="/devis-cuisine/dijon" className="hover:text-[#be123c]">Rénovation cuisine</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{nom}</span>
          </div>
        </nav>

        {/* HERO */}
        <section className="bg-[#1a0a2e] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#c4b5fd] text-sm font-medium mb-3 uppercase tracking-wide">
              {dept} · {region}{data.population ? ` · ${data.population}` : ''}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Cuisiniste à <span className="text-[#c4b5fd]">{nom}</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Rénovation cuisine, pose IKEA, cuisine sur mesure. Recevez 3 devis de cuisinistes locaux à {nom}. Gratuit, sans engagement.
            </p>
            <Link href="/publier-projet/form"
              className="inline-flex items-center justify-center rounded-xl bg-[#7c3aed] px-8 py-4 text-lg font-semibold text-white shadow-xl hover:bg-[#6d28d9] transition">
              Demander mes devis gratuits →
            </Link>
            <p className="mt-4 text-sm text-white/40">Sans engagement · 3 artisans max · Réponse sous 24h</p>
          </div>
        </section>

        {/* TRUST */}
        <section className="bg-[#f5f3ff] border-b border-[#c4b5fd]/20 py-5 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-[#4c1d95] font-medium">
            {[`Cuisinistes vérifiés ${dept}`, "Max 3 artisans par projet", "Réponse sous 24h", "Coordonnées protégées", "Sans engagement"].map(t => (
              <span key={t}>✓ {t}</span>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-14 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Services cuisine à {nom}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "🔧", title: "Pose cuisine IKEA", desc: "Montage et installation de votre cuisine IKEA par un professionnel." },
                { icon: "✨", title: "Rénovation complète", desc: "Dépose de l'ancienne cuisine, plomberie, électricité, carrelage, pose." },
                { icon: "📐", title: "Cuisine sur mesure", desc: "Conception et fabrication de cuisines sur mesure adaptées à votre espace." },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl border border-gray-200 p-6 text-center">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTEXTE LOCAL */}
        {(data.context || data.marche) && (
          <section className="py-14 px-4 bg-gray-50 border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Cuisinistes à {nom} — le marché local
              </h2>
              {data.context && <p className="text-gray-600 leading-relaxed mb-5 text-base">{data.context}</p>}
              {data.marche && <p className="text-gray-600 leading-relaxed text-base">{data.marche}</p>}
            </div>
          </section>
        )}

        {/* PRIX */}
        {data.prix && data.prix.length > 0 && (
          <section className="bg-white py-14 px-4 border-t border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Prix indicatifs — cuisine à {nom} en 2026
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.prix.map((p, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{p.label}</span>
                    <span className="text-base font-bold text-[#7c3aed] ml-4 shrink-0">{p.fourchette}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Fourchettes indicatives basées sur les projets publiés sur PremiumArtisan.</p>
            </div>
          </section>
        )}

        {/* COMMENT CA MARCHE */}
        <section className="py-14 px-4 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Trouver un cuisiniste à {nom} : comment ça marche ?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PremiumArtisan met en relation les particuliers de {nom} avec des cuisinistes professionnels du {dept}. Contrairement aux plateformes nationales qui revendent vos coordonnées à des dizaines d'artisans, PremiumArtisan limite chaque projet à 3 cuisinistes maximum. Résultat : des interlocuteurs plus qualifiés et un meilleur suivi de votre projet.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pour obtenir vos devis, décrivez votre projet en 2 minutes : type de travaux (pose, rénovation, sur mesure), surface de la cuisine, état actuel et votre code postal à {nom} ({cp}). Votre demande est transmise aux cuisinistes disponibles dans votre secteur.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Rénovation cuisine à {nom} — ce qu'il faut savoir</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Une rénovation complète de cuisine à {nom} comprend généralement : la dépose de l'ancienne cuisine, les travaux de plomberie et d'électricité si nécessaires, la pose du nouveau mobilier, le plan de travail, l'installation de l'électroménager et la finition (crédence, carrelage). Les délais varient de 3 jours à 3 semaines selon l'ampleur du chantier.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Pose cuisine IKEA à {nom}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              La pose d'une cuisine IKEA par un professionnel à {nom} coûte entre 700€ et 2 200€ selon la taille de la cuisine et les travaux annexes. Un cuisiniste expérimenté garantit une installation conforme aux normes électriques et de plomberie.
            </p>
          </div>
        </section>

        {/* FAQ */}
        {data.faq && data.faq.length > 0 && (
          <section className="bg-white py-14 px-4 border-t border-gray-200">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Questions fréquentes — Cuisine à {nom}
              </h2>
              <div className="space-y-4">
                {data.faq.map((f, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA FORM */}
        <section className="py-14 px-4 bg-gray-50 border-t border-gray-100">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Publiez votre projet cuisine à {nom}
            </h2>
            <p className="text-gray-500 mb-8">
              Formulaire en 2 minutes. 3 cuisinistes maximum vous contactent. Gratuit, sans engagement.
            </p>
            <Link href="/publier-projet/form"
              className="inline-flex items-center justify-center rounded-xl bg-[#7c3aed] px-8 py-4 text-lg font-semibold text-white shadow-xl hover:bg-[#6d28d9] transition">
              Demander mes devis gratuits →
            </Link>
          </div>
        </section>

        {/* VILLES VOISINES */}
        {voisines.length > 0 && (
          <section className="bg-white py-12 px-4 border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Cuisinistes dans les communes proches de {nom}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {voisines.filter(v => VILLES_DATA[v]).map(v => (
                  <Link key={v} href={`/devis-cuisine/${v}`}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 text-center hover:border-[#7c3aed] hover:text-[#7c3aed] transition">
                    {VILLES_DATA[v]?.nom}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ARTISAN CTA */}
        <section className="bg-[#f5f3ff] py-10 px-4 border-t border-[#c4b5fd]/20">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-semibold text-gray-900">Vous êtes cuisiniste à {nom} ?</p>
              <p className="text-sm text-gray-500 mt-1">Accédez aux projets de particuliers et créez vos devis gratuitement.</p>
            </div>
            <Link href="/artisan/dashboard"
              className="shrink-0 inline-flex items-center justify-center rounded-xl border border-[#7c3aed] text-[#7c3aed] px-5 py-2.5 text-sm font-semibold hover:bg-[#7c3aed] hover:text-white transition">
              Accès artisan →
            </Link>
          </div>
        </section>

        {/* LIENS INTERNES */}
        <section className="bg-white py-10 px-4 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Autres services</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Peintre à " + nom, href: `/devis-peintre/${ville}` },
                { label: "Logiciel devis artisan", href: `/logiciel-devis-artisan/${ville}` },
                { label: "Devis peinture Dijon", href: "/devis-peinture-dijon" },
                { label: "Rénovation cuisine Dijon", href: "/devis-cuisine/dijon" },
                { label: "Créer devis gratuit", href: "/creer-devis-peintre" },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="inline-block px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700 font-medium hover:border-[#7c3aed] hover:text-[#7c3aed] transition">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-[#1a0a2e] py-14 px-4 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Obtenez vos devis cuisine à {nom}</h2>
            <p className="text-white/70 mb-8">Gratuit, sans engagement. Jusqu'à 3 cuisinistes qualifiés en {dept}.</p>
            <Link href="/publier-projet/form"
              className="inline-flex items-center justify-center rounded-xl bg-[#7c3aed] px-8 py-4 text-lg font-semibold text-white hover:bg-[#6d28d9] transition">
              Demander mes devis →
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}