// app/logiciel-devis-artisan/[ville]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const VILLES_DATA: Record<string, {
  nom: string;
  dept: string;
  region: string;
  slug: string;
  voisines: string[];
  population?: string;
  context?: string;
  marche?: string;
  conseil?: string;
  prix?: { label: string; fourchette: string }[];
  faq?: { q: string; a: string }[];
}> = {
  'dijon': {
    nom: 'Dijon', dept: "Côte-d'Or", region: 'Bourgogne', slug: 'dijon',
    voisines: ['beaune','chenove','longvic','talant'],
    population: '160 000 habitants',
    context: "Dijon, préfecture de la Côte-d'Or et capitale de la Bourgogne, concentre une forte demande en rénovation de logements anciens — haussmanniens, immeubles de centre-ville et pavillons des années 1970. Le marché artisanal y est dense, avec une concurrence élevée entre peintres et rénovateurs.",
    marche: "À Dijon, un artisan peintre reçoit en moyenne 3 à 5 demandes de devis par semaine. La digitalisation des devis est devenue indispensable : les particuliers attendent un devis par email dans les 24 à 48h. Les artisans qui envoient un devis professionnel le jour même décrochent 40% de chantiers supplémentaires.",
    conseil: "Pour un artisan à Dijon, l'outil de devis PremiumArtisan permet de gérer les demandes des quartiers Centre, Montchapet, Fontaine-d'Ouche et des communes périphériques depuis un seul tableau de bord.",
    prix: [
      { label: "Peinture intérieure — appartement T3", fourchette: "2 200 – 4 500€" },
      { label: "Rénovation complète — maison 100m²", fourchette: "12 000 – 28 000€" },
      { label: "Ravalement de façade", fourchette: "4 500 – 14 000€" },
      { label: "Pose papier peint", fourchette: "800 – 2 200€" },
    ],
    faq: [
      { q: "Quel logiciel de devis est gratuit pour un artisan à Dijon ?", a: "PremiumArtisan propose un outil de devis et facture 100% gratuit, sans abonnement, accessible en ligne depuis Dijon ou n'importe quelle commune de Côte-d'Or." },
      { q: "Comment facturer la TVA sur les travaux à Dijon ?", a: "Pour les logements de plus de 2 ans à Dijon, la TVA est de 10% sur la main d'œuvre et les fournitures posées. Pour les constructions neuves, elle passe à 20%. PremiumArtisan applique automatiquement le bon taux." },
      { q: "Peut-on trouver des clients particuliers à Dijon via PremiumArtisan ?", a: "Oui. PremiumArtisan diffuse les projets de particuliers de Dijon et de la Côte-d'Or aux artisans vérifiés. Vous accédez aux demandes gratuitement et payez uniquement pour les contacts qui correspondent à votre zone." },
    ],
  },
  'saint-etienne': {
    nom: 'Saint-Étienne', dept: 'Loire', region: 'Auvergne-Rhône-Alpes', slug: 'saint-etienne',
    voisines: ['lyon','clermont-ferrand','roanne'],
    population: '172 000 habitants',
    context: "Saint-Étienne, ancienne capitale industrielle de la Loire, connaît depuis 10 ans une transformation profonde de son tissu urbain. Les quartiers Manufacture, Centre-Ville et Montreynaud font l'objet de nombreux programmes de rénovation. Le parc immobilier ancien — fortement représenté par des immeubles ouvriers des années 1900–1950 — génère une demande constante en peinture intérieure, ravalement et réhabilitation de logements.",
    marche: "Le marché de la rénovation à Saint-Étienne est caractérisé par des budgets plus serrés qu'à Lyon, mais un volume de chantiers élevé. Les artisans peintres stéphanois travaillent souvent pour des bailleurs sociaux (Loire Habitat, Territoire Loire Habitat) et pour des propriétaires privés engagés dans des projets de mise en location. Un devis professionnel et rapide est décisif pour remporter un chantier face à la concurrence locale.",
    conseil: "Pour un artisan basé à Saint-Étienne, PremiumArtisan permet de couvrir à la fois les quartiers centraux (Jacquard, Crêt-de-Roc) et les communes voisines comme Firminy, Rive-de-Gier ou Saint-Chamond, depuis un outil unique accessible sur smartphone.",
    prix: [
      { label: "Peinture intérieure — appartement T3 Saint-Étienne", fourchette: "1 800 – 3 800€" },
      { label: "Ravalement de façade — immeuble années 50", fourchette: "6 000 – 18 000€" },
      { label: "Rénovation complète — logement social", fourchette: "8 000 – 20 000€" },
      { label: "Pose papier peint + peinture", fourchette: "700 – 1 900€" },
    ],
    faq: [
      { q: "Un logiciel de devis gratuit existe-t-il pour les artisans de Saint-Étienne ?", a: "Oui. PremiumArtisan est entièrement gratuit pour les artisans de Saint-Étienne : création de devis, envoi email, suivi client et facturation, sans abonnement ni engagement." },
      { q: "Quelle TVA appliquer sur les travaux de rénovation à Saint-Étienne ?", a: "Pour les logements de plus de 2 ans à Saint-Étienne, la TVA est de 10% sur main d'œuvre et fournitures posées. Les travaux éligibles à MaPrimeRénov' peuvent bénéficier d'un taux de 5,5% pour les gros travaux d'isolation." },
      { q: "Comment trouver des chantiers de peinture à Saint-Étienne ?", a: "PremiumArtisan publie les projets de particuliers de Saint-Étienne et de la Loire. Les artisans consultent les demandes gratuitement et débloquent le contact du client uniquement si le projet correspond à leur activité." },
      { q: "Un artisan stéphanois peut-il intervenir dans l'agglomération de Lyon ?", a: "Oui. Nombreux artisans de Saint-Étienne couvrent aussi Firminy, Rive-de-Gier et l'agglomération sud de Lyon. PremiumArtisan permet de filtrer les projets par zone géographique." },
    ],
  },
  'beaune': {
    nom: 'Beaune', dept: "Côte-d'Or", region: 'Bourgogne', slug: 'beaune',
    voisines: ['dijon','nuits-saint-georges','chalon-sur-saone'],
    context: "Beaune, capitale des vins de Bourgogne, accueille un parc immobilier diversifié : maisons de maître, propriétés viticoles et résidences récentes. La demande en rénovation haut de gamme y est forte.",
    marche: "Les artisans de Beaune interviennent souvent sur des chantiers de prestige pour des propriétaires de domaines viticoles. Un devis professionnel, structuré et envoyé rapidement, est indispensable pour décrocher ces marchés.",
    conseil: "PremiumArtisan permet aux artisans de Beaune de gérer leurs devis depuis leur téléphone entre deux chantiers, avec un rendu professionnel adapté à une clientèle exigeante.",
    prix: [
      { label: "Peinture intérieure — maison de maître", fourchette: "3 500 – 8 000€" },
      { label: "Ravalement enduit — propriété viticole", fourchette: "8 000 – 22 000€" },
      { label: "Rénovation appartement centre-ville", fourchette: "4 000 – 10 000€" },
    ],
    faq: [
      { q: "Existe-t-il un logiciel de devis gratuit pour artisans à Beaune ?", a: "Oui. PremiumArtisan est gratuit et sans abonnement. Il permet de créer des devis professionnels depuis Beaune ou n'importe quelle commune de Côte-d'Or." },
      { q: "Comment trouver des chantiers à Beaune et en Côte-d'Or ?", a: "PremiumArtisan diffuse les projets de particuliers de Beaune et de la Côte-d'Or. Vous accédez aux demandes gratuitement." },
    ],
  },
  'chenove': {
    nom: 'Chenôve', dept: "Côte-d'Or", region: 'Bourgogne', slug: 'chenove',
    voisines: ['dijon','longvic','marsannay-la-cote'],
    context: "Chenôve, commune résidentielle au sud de Dijon, est fortement représentée par des logements HLM et des résidences des années 1970. La demande en rénovation de cuisines, salles de bain et peinture intérieure y est constante.",
    marche: "Les artisans de Chenôve travaillent régulièrement pour des bailleurs sociaux et des propriétaires privés souhaitant remettre à neuf leurs logements locatifs entre deux locataires.",
    conseil: "Avec PremiumArtisan, les artisans de Chenôve peuvent gérer leurs devis et trouver des chantiers dans toute la Côte-d'Or depuis un outil unique.",
    prix: [
      { label: "Peinture intérieure HLM", fourchette: "1 200 – 3 000€" },
      { label: "Remise en état locatif complet", fourchette: "2 500 – 6 000€" },
      { label: "Rénovation salle de bain", fourchette: "3 500 – 9 000€" },
    ],
    faq: [
      { q: "Logiciel devis artisan gratuit à Chenôve — existe-t-il ?", a: "Oui. PremiumArtisan est 100% gratuit pour les artisans de Chenôve, sans abonnement." },
    ],
  },
  'lyon': {
    nom: 'Lyon', dept: 'Rhône', region: 'Auvergne-Rhône-Alpes', slug: 'lyon',
    voisines: ['villeurbanne','saint-etienne','grenoble'],
    population: '520 000 habitants',
    context: "Lyon, deuxième métropole économique française, concentre une demande massive en rénovation de logements anciens — immeubles Haussmanniens de la Presqu'île, traboules du Vieux-Lyon et résidences des arrondissements périphériques. Le marché artisanal y est très compétitif.",
    marche: "À Lyon, un artisan peintre reçoit jusqu'à 10 demandes de devis par semaine pendant les périodes de forte activité (printemps, rentrée). La réactivité est clé : les particuliers lyonnais comparent plusieurs devis en 48h.",
    conseil: "PremiumArtisan permet aux artisans lyonnais de couvrir les 9 arrondissements et les communes de la métropole (Villeurbanne, Caluire, Bron) depuis un tableau de bord unique.",
    prix: [
      { label: "Peinture intérieure — T3 Lyon 6e", fourchette: "2 800 – 5 500€" },
      { label: "Rénovation complète — appartement 80m²", fourchette: "15 000 – 35 000€" },
      { label: "Ravalement de façade — immeuble Presqu'île", fourchette: "12 000 – 40 000€" },
      { label: "Pose papier peint — salon", fourchette: "900 – 2 500€" },
    ],
    faq: [
      { q: "Quel logiciel de devis gratuit pour artisan à Lyon ?", a: "PremiumArtisan est gratuit, sans abonnement. Il permet de créer des devis professionnels depuis Lyon et de gérer les clients de toute la métropole." },
      { q: "Comment trouver des chantiers de peinture à Lyon ?", a: "PremiumArtisan publie les projets de particuliers lyonnais. Vous consultez les demandes gratuitement et payez uniquement pour accéder aux coordonnées du client." },
    ],
  },
  'paris': {
    nom: 'Paris', dept: 'Paris', region: 'Île-de-France', slug: 'paris',
    voisines: ['boulogne-billancourt','saint-denis','versailles'],
    population: '2 100 000 habitants',
    context: "Paris concentre la demande en rénovation la plus élevée de France. Haussmannien, art déco, immeubles des années 1960 — le parc immobilier parisien génère un volume de chantiers considérable pour les artisans peintres et rénovateurs.",
    marche: "Le marché parisien est ultra-compétitif. Les particuliers comparent 3 à 5 devis avant de choisir. Un devis professionnel, bien structuré et envoyé rapidement, est décisif.",
    conseil: "PremiumArtisan permet aux artisans parisiens de gérer leurs devis par arrondissement et de suivre leurs chantiers depuis un seul outil.",
    prix: [
      { label: "Peinture intérieure — T3 Paris", fourchette: "3 500 – 7 000€" },
      { label: "Rénovation complète — appartement 60m²", fourchette: "18 000 – 45 000€" },
      { label: "Ravalement de façade haussmannienne", fourchette: "20 000 – 80 000€" },
    ],
    faq: [
      { q: "Logiciel devis artisan gratuit à Paris — lequel choisir ?", a: "PremiumArtisan est 100% gratuit, sans abonnement. Créez vos devis depuis Paris en moins de 3 minutes." },
    ],
  },
  'marseille': {
    nom: 'Marseille', dept: 'Bouches-du-Rhône', region: 'PACA', slug: 'marseille',
    voisines: ['aix-en-provence','toulon','nice'],
    population: '870 000 habitants',
    context: "Marseille, deuxième ville de France, connaît un renouveau urbain important avec de nombreux projets de réhabilitation de logements anciens dans les quartiers Nord et dans le centre-ville.",
    marche: "Le marché marseillais est dynamique, porté par les programmes de rénovation Anah et les projets de mise aux normes de copropriétés anciennes.",
    conseil: "PremiumArtisan permet aux artisans marseillais de gérer leurs devis et de trouver des chantiers dans toutes les Bouches-du-Rhône.",
    prix: [
      { label: "Peinture intérieure — appartement T4", fourchette: "2 200 – 4 800€" },
      { label: "Ravalement de façade", fourchette: "8 000 – 25 000€" },
      { label: "Rénovation logement ancien", fourchette: "10 000 – 30 000€" },
    ],
    faq: [
      { q: "Quel logiciel de devis pour artisan à Marseille ?", a: "PremiumArtisan est gratuit et sans abonnement pour les artisans de Marseille et des Bouches-du-Rhône." },
    ],
  },
};

// Données par défaut pour les villes sans données spécifiques
function getDefaultData(ville: string, nom: string, dept: string, region: string) {
  return {
    context: `${nom}, ville de ${region}, présente un marché de la rénovation actif. Les artisans peintres et rénovateurs y interviennent régulièrement pour des particuliers et des professionnels.`,
    marche: `À ${nom}, la demande en devis peinture et rénovation est constante tout au long de l'année. Les artisans qui envoient des devis professionnels rapidement décrochent plus de chantiers.`,
    conseil: `PremiumArtisan permet aux artisans de ${nom} de créer leurs devis et factures gratuitement, et d'accéder aux projets de particuliers du ${dept}.`,
    prix: [
      { label: `Peinture intérieure — appartement T3 ${nom}`, fourchette: "1 800 – 4 200€" },
      { label: "Rénovation complète", fourchette: "8 000 – 22 000€" },
      { label: "Ravalement de façade", fourchette: "5 000 – 16 000€" },
      { label: "Pose papier peint", fourchette: "600 – 1 800€" },
    ],
    faq: [
      { q: `Existe-t-il un logiciel de devis gratuit pour artisans à ${nom} ?`, a: `Oui. PremiumArtisan est 100% gratuit et sans abonnement pour les artisans de ${nom} et du ${dept}.` },
      { q: `Comment trouver des chantiers de peinture à ${nom} ?`, a: `PremiumArtisan publie les projets de particuliers de ${nom} et du ${dept}. Consultez les demandes gratuitement.` },
      { q: `Quelle TVA appliquer sur les travaux à ${nom} ?`, a: `Pour les logements de plus de 2 ans à ${nom}, la TVA est de 10% sur la main d'œuvre. PremiumArtisan l'applique automatiquement.` },
    ],
  };
}

export async function generateStaticParams() {
  return Object.keys(VILLES_DATA).map((ville) => ({ ville }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ ville: string }> }
): Promise<Metadata> {
  const { ville } = await params;
  const data = VILLES_DATA[ville];
  if (!data) return { title: 'Page introuvable' };
  const { nom, dept } = data;
  return {
    title: `Logiciel Devis Artisan ${nom} – Devis & Facture Gratuit | PremiumArtisan`,
    description: `Créez vos devis et factures gratuitement à ${nom} (${dept}). Outil professionnel pour artisans peintres : envoi email, réponse client, facture en 1 clic. Sans abonnement.`,
    alternates: { canonical: `https://premiumartisan.fr/logiciel-devis-artisan/${ville}` },
    keywords: `logiciel devis artisan ${nom.toLowerCase()}, devis artisan gratuit ${nom.toLowerCase()}, facture artisan ${nom.toLowerCase()}, outil devis peintre ${dept.toLowerCase()}`,
    openGraph: {
      title: `Logiciel Devis & Facture Gratuit – Artisans ${nom}`,
      description: `Devis et factures professionnels gratuits pour artisans à ${nom}. Sans abonnement.`,
      url: `https://premiumartisan.fr/logiciel-devis-artisan/${ville}`,
      type: 'website',
      locale: 'fr_FR',
      siteName: 'PremiumArtisan',
    },
  };
}

export default async function LogicielDevisArtisanVille(
  { params }: { params: Promise<{ ville: string }> }
) {
  const { ville } = await params;
  const data = VILLES_DATA[ville];

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page introuvable</h1>
          <Link href="/artisan/dashboard" className="text-[#be123c] underline">Retour au dashboard</Link>
        </div>
      </main>
    );
  }

  const { nom, dept, region, voisines } = data;
  const extra = {
    context: data.context,
    marche: data.marche,
    conseil: data.conseil,
    prix: data.prix,
    faq: data.faq,
    population: data.population,
    ...(!data.context ? getDefaultData(ville, nom, dept, region) : {}),
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Logiciel devis artisan ${nom}`,
        "description": `Outil gratuit de création de devis et factures pour artisans peintres à ${nom}, ${dept}.`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
        "provider": { "@type": "Organization", "name": "PremiumArtisan", "url": "https://premiumartisan.fr" },
        "areaServed": { "@type": "City", "name": nom },
      },
      {
        "@type": "FAQPage",
        "mainEntity": (extra.faq || []).map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen bg-white">

        {/* ── BREADCRUMB ── */}
        <nav className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#be123c]">Accueil</Link>
            <span>›</span>
            <Link href="/artisan/dashboard" className="hover:text-[#be123c]">Artisans</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Logiciel devis {nom}</span>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="bg-[#2a0a14] text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#fda4af] text-sm font-medium mb-3 uppercase tracking-wide">
              {dept} · {region}{extra.population ? ` · ${extra.population}` : ''}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Logiciel devis artisan<br />à <span className="text-[#fda4af]">{nom}</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Créez vos devis et factures professionnels gratuitement à {nom}.
              Envoi email, réponse client, facture en 1 clic. Sans abonnement, sans limite.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/artisan/dashboard"
                className="inline-flex items-center justify-center rounded-xl bg-[#be123c] px-7 py-4 text-base font-semibold text-white shadow-xl hover:bg-[#9f1239] transition">
                Créer un devis gratuit →
              </Link>
              <Link href="/artisan/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-base font-semibold text-white hover:bg-white/20 transition">
                Voir les projets clients
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/40">Gratuit · Illimité · Aucune carte bancaire</p>
          </div>
        </section>

        {/* ── TRUST ── */}
        <section className="bg-[#fdf2f5] border-b border-[#fda4af]/20 py-5 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-[#6a3a4a] font-medium">
            {["Devis illimités", "Factures illimitées", "Envoi email client", `Projets clients ${dept}`, "Sans abonnement"].map(t => (
              <span key={t}>✓ {t}</span>
            ))}
          </div>
        </section>

        {/* ── CONTEXTE LOCAL ── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Le marché de la rénovation à {nom}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5 text-base">
              {extra.context}
            </p>
            <p className="text-gray-600 leading-relaxed mb-5 text-base">
              {extra.marche}
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              {extra.conseil}
            </p>
          </div>
        </section>

        {/* ── PRIX LOCAUX ── */}
        {extra.prix && extra.prix.length > 0 && (
          <section className="bg-gray-50 py-14 px-4 border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Prix indicatifs des travaux à {nom} en 2026
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {extra.prix.map((p, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{p.label}</span>
                    <span className="text-base font-bold text-[#be123c] ml-4 shrink-0">{p.fourchette}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Fourchettes indicatives basées sur les projets publiés sur PremiumArtisan.</p>
            </div>
          </section>
        )}

        {/* ── FONCTIONNEMENT ── */}
        <section className="py-16 px-4 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Créer un devis peinture à {nom} en 3 minutes
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
              Outil en ligne, accessible depuis votre téléphone ou ordinateur, directement depuis {nom}.
            </p>
            <div className="space-y-4">
              {[
                { n: '1', t: 'Saisissez les informations client', d: `Nom, adresse, email. Les données sont enregistrées pour vos prochains devis à ${nom} et dans le ${dept}.` },
                { n: '2', t: 'Ajoutez les lignes de travaux', d: "Préparation des supports, fournitures, main d'œuvre au m². TVA 10% (rénovation) ou 20% selon le type de chantier." },
                { n: '3', t: 'Envoyez par email au client', d: 'Votre client reçoit le devis et peut accepter ou refuser en un clic. Vous êtes notifié en temps réel.' },
                { n: '4', t: 'Générez la facture', d: 'Devis accepté ? Transformez-le en facture automatiquement. Numérotation séquentielle, mentions légales incluses.' },
              ].map(s => (
                <div key={s.n} className="flex gap-5 items-start p-5 rounded-2xl border border-gray-100 bg-gray-50">
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a0a14] text-white font-black">{s.n}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{s.t}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEVIS ET FACTURE ── */}
        <section className="bg-gray-50 py-16 px-4 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Devis et factures gratuits à {nom}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border-2 border-[#be123c] bg-white p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Devis professionnel</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {['Lignes de travaux détaillées','TVA 10% ou 20% au choix','Acompte configurable','Date de validité','Envoi email direct','Réponse client intégrée','Illimité — 0€'].map(f => (
                    <li key={f} className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> {f}</li>
                  ))}
                </ul>
                <Link href="/artisan/dashboard" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#be123c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#9f1239] transition">
                  Créer un devis →
                </Link>
              </div>
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Facture conforme</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {['Générée depuis le devis accepté','Numérotation automatique','Mentions légales incluses','SIRET, assurance décennale','Conditions de règlement','Pénalités de retard','Illimité — 0€'].map(f => (
                    <li key={f} className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> {f}</li>
                  ))}
                </ul>
                <Link href="/artisan/dashboard" className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                  Accéder au dashboard →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── MENTIONS OBLIGATOIRES ── */}
        <section className="py-16 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Mentions obligatoires d&apos;un devis artisan à {nom}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Tout devis établi par un artisan peintre ou rénovateur à {nom} doit obligatoirement mentionner : 
              le numéro SIRET de l'artisan, ses coordonnées complètes (adresse, téléphone, email), 
              les coordonnées du client, la date d'émission et la date de validité du devis, 
              une description détaillée des travaux prévus, la quantité et le prix unitaire HT de chaque prestation, 
              le taux de TVA applicable et le montant TTC final.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pour les travaux de rénovation sur des logements de plus de 2 ans à {nom}, 
              la TVA est de 10% sur la main d'œuvre et les fournitures directement liées aux travaux. 
              Pour les constructions neuves ou les locaux professionnels, le taux normal de 20% s'applique.
            </p>
            <p className="text-gray-600 leading-relaxed">
              PremiumArtisan intègre automatiquement toutes ces mentions dans chaque devis généré, 
              garantissant la conformité légale pour les artisans exerçant à {nom} et dans le {dept}.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        {extra.faq && extra.faq.length > 0 && (
          <section className="bg-gray-50 py-16 px-4 border-t border-gray-200">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Questions fréquentes — Devis artisan à {nom}
              </h2>
              <div className="space-y-4">
                {extra.faq.map((f, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── VILLES VOISINES ── */}
        {voisines.length > 0 && (
          <section className="bg-white py-12 px-4 border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Disponible aussi dans les communes proches de {nom}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {voisines.map(v => {
                  const vData = VILLES_DATA[v];
                  if (!vData) return null;
                  return (
                    <Link key={v} href={`/logiciel-devis-artisan/${v}`}
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 text-center hover:border-[#be123c] hover:text-[#be123c] transition">
                      {vData.nom}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── LIENS SEO ── */}
        <section className="bg-gray-50 py-12 px-4 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Autres services PremiumArtisan</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: `Devis peinture ${nom}`, href: `/devis-peintre/${ville}` },
                { label: "Trouver clients peintre Dijon", href: "/trouver-clients-peintre-dijon" },
                { label: "Créer devis peintre gratuit", href: "/creer-devis-peintre" },
                { label: "Créer facture artisan", href: "/creer-facture-artisan" },
                { label: "Logiciel devis Dijon", href: "/logiciel-devis-artisan/dijon" },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="inline-block px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700 font-medium hover:border-[#be123c] hover:text-[#be123c] transition">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-[#2a0a14] py-16 px-4 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Commencez gratuitement à {nom}</h2>
            <p className="text-white/70 mb-8">
              Devis et factures illimités. Projets clients en {dept}.
              Aucun abonnement, aucune carte bancaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/artisan/dashboard"
                className="inline-flex items-center justify-center rounded-xl bg-[#be123c] px-6 py-3.5 font-semibold text-white hover:bg-[#9f1239] transition">
                Créer un devis gratuit →
              </Link>
              <Link href="/artisan/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white hover:bg-white/20 transition">
                Voir les projets clients
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}