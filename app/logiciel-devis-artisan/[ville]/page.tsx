// app/logiciel-devis-artisan/[ville]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

// ── DONNÉES VILLES ──────────────────────────────────────────────────────────
export const VILLES_DATA: Record<string, {
  nom: string;
  dept: string;
  region: string;
  slug: string;
  voisines: string[];
}> = {
  // Côte-d'Or
  'dijon':                  { nom: 'Dijon',                 dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'dijon',                  voisines: ['beaune','chenove','longvic','talant'] },
  'beaune':                 { nom: 'Beaune',                dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'beaune',                 voisines: ['dijon','nuits-saint-georges','chalon-sur-saone'] },
  'chenove':                { nom: 'Chenôve',               dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'chenove',                voisines: ['dijon','longvic','marsannay-la-cote'] },
  'longvic':                { nom: 'Longvic',               dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'longvic',                voisines: ['dijon','chenove','quetigny'] },
  'talant':                 { nom: 'Talant',                dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'talant',                 voisines: ['dijon','fontaine-les-dijon','chenove'] },
  'quetigny':               { nom: 'Quetigny',              dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'quetigny',               voisines: ['dijon','longvic','marsannay-la-cote'] },
  'fontaine-les-dijon':     { nom: 'Fontaine-lès-Dijon',   dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'fontaine-les-dijon',     voisines: ['dijon','talant','plombieres-les-dijon'] },
  'marsannay-la-cote':      { nom: 'Marsannay-la-Côte',    dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'marsannay-la-cote',      voisines: ['dijon','chenove','perrigny-les-dijon'] },
  'nuits-saint-georges':    { nom: 'Nuits-Saint-Georges',  dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'nuits-saint-georges',    voisines: ['beaune','dijon','gevrey-chambertin'] },
  'gevrey-chambertin':      { nom: 'Gevrey-Chambertin',    dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'gevrey-chambertin',      voisines: ['dijon','nuits-saint-georges','marsannay-la-cote'] },
  'auxonne':                { nom: 'Auxonne',               dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'auxonne',                voisines: ['dijon','dole','pontailler-sur-saone'] },
  'montbard':               { nom: 'Montbard',              dept: 'Côte-d\'Or',     region: 'Bourgogne', slug: 'montbard',               voisines: ['dijon','semur-en-auxois','chatillon-sur-seine'] },
  // Saône-et-Loire
  'chalon-sur-saone':       { nom: 'Chalon-sur-Saône',     dept: 'Saône-et-Loire', region: 'Bourgogne', slug: 'chalon-sur-saone',       voisines: ['beaune','macon','autun'] },
  'macon':                  { nom: 'Mâcon',                 dept: 'Saône-et-Loire', region: 'Bourgogne', slug: 'macon',                  voisines: ['chalon-sur-saone','bourg-en-bresse','villefranche-sur-saone'] },
  'autun':                  { nom: 'Autun',                 dept: 'Saône-et-Loire', region: 'Bourgogne', slug: 'autun',                  voisines: ['chalon-sur-saone','dijon','nevers'] },
  'le-creusot':             { nom: 'Le Creusot',            dept: 'Saône-et-Loire', region: 'Bourgogne', slug: 'le-creusot',             voisines: ['autun','chalon-sur-saone','montceau-les-mines'] },
  'montceau-les-mines':     { nom: 'Montceau-les-Mines',   dept: 'Saône-et-Loire', region: 'Bourgogne', slug: 'montceau-les-mines',     voisines: ['le-creusot','autun','chalon-sur-saone'] },
  // Yonne
  'auxerre':                { nom: 'Auxerre',               dept: 'Yonne',          region: 'Bourgogne', slug: 'auxerre',                voisines: ['sens','avallon','dijon'] },
  'sens':                   { nom: 'Sens',                  dept: 'Yonne',          region: 'Bourgogne', slug: 'sens',                   voisines: ['auxerre','troyes','fontainebleau'] },
  'avallon':                { nom: 'Avallon',               dept: 'Yonne',          region: 'Bourgogne', slug: 'avallon',                voisines: ['auxerre','dijon','semur-en-auxois'] },
  // Nièvre
  'nevers':                 { nom: 'Nevers',                dept: 'Nièvre',         region: 'Bourgogne', slug: 'nevers',                 voisines: ['moulins','bourges','chalon-sur-saone'] },
  'cosne-cours-sur-loire':  { nom: 'Cosne-Cours-sur-Loire', dept: 'Nièvre',        region: 'Bourgogne', slug: 'cosne-cours-sur-loire',  voisines: ['nevers','auxerre','gien'] },
  // Île-de-France
  'paris':                  { nom: 'Paris',                 dept: 'Paris',          region: 'Île-de-France', slug: 'paris',              voisines: ['boulogne-billancourt','saint-denis','vincennes'] },
  'boulogne-billancourt':   { nom: 'Boulogne-Billancourt', dept: 'Hauts-de-Seine', region: 'Île-de-France', slug: 'boulogne-billancourt', voisines: ['paris','issy-les-moulineaux','versailles'] },
  'saint-denis':            { nom: 'Saint-Denis',           dept: 'Seine-Saint-Denis', region: 'Île-de-France', slug: 'saint-denis',    voisines: ['paris','aubervilliers','argenteuil'] },
  'versailles':             { nom: 'Versailles',            dept: 'Yvelines',       region: 'Île-de-France', slug: 'versailles',         voisines: ['paris','saint-germain-en-laye','boulogne-billancourt'] },
  // Rhône-Alpes
  'lyon':                   { nom: 'Lyon',                  dept: 'Rhône',          region: 'Auvergne-Rhône-Alpes', slug: 'lyon',        voisines: ['villeurbanne','saint-etienne','grenoble'] },
  'villeurbanne':           { nom: 'Villeurbanne',          dept: 'Rhône',          region: 'Auvergne-Rhône-Alpes', slug: 'villeurbanne', voisines: ['lyon','bron','decines-charpieu'] },
  'grenoble':               { nom: 'Grenoble',              dept: 'Isère',          region: 'Auvergne-Rhône-Alpes', slug: 'grenoble',     voisines: ['lyon','chambery','valence'] },
  'saint-etienne':          { nom: 'Saint-Étienne',         dept: 'Loire',          region: 'Auvergne-Rhône-Alpes', slug: 'saint-etienne', voisines: ['lyon','clermont-ferrand','roanne'] },
  // PACA
  'marseille':              { nom: 'Marseille',             dept: 'Bouches-du-Rhône', region: 'PACA',   slug: 'marseille',              voisines: ['aix-en-provence','toulon','nice'] },
  'nice':                   { nom: 'Nice',                  dept: 'Alpes-Maritimes', region: 'PACA',    slug: 'nice',                   voisines: ['antibes','cannes','monaco'] },
  'toulon':                 { nom: 'Toulon',                dept: 'Var',             region: 'PACA',    slug: 'toulon',                 voisines: ['marseille','nice','hyeres'] },
  'aix-en-provence':        { nom: 'Aix-en-Provence',      dept: 'Bouches-du-Rhône', region: 'PACA',   slug: 'aix-en-provence',        voisines: ['marseille','toulon','avignon'] },
  // Occitanie
  'toulouse':               { nom: 'Toulouse',              dept: 'Haute-Garonne',  region: 'Occitanie', slug: 'toulouse',              voisines: ['montpellier','bordeaux','nimes'] },
  'montpellier':            { nom: 'Montpellier',           dept: 'Hérault',        region: 'Occitanie', slug: 'montpellier',           voisines: ['toulouse','nimes','beziers'] },
  'nimes':                  { nom: 'Nîmes',                 dept: 'Gard',           region: 'Occitanie', slug: 'nimes',                 voisines: ['montpellier','avignon','ales'] },
  // Nouvelle-Aquitaine
  'bordeaux':               { nom: 'Bordeaux',              dept: 'Gironde',        region: 'Nouvelle-Aquitaine', slug: 'bordeaux',      voisines: ['merignac','pessac','libourne'] },
  'limoges':                { nom: 'Limoges',               dept: 'Haute-Vienne',   region: 'Nouvelle-Aquitaine', slug: 'limoges',       voisines: ['bordeaux','perigueux','clermont-ferrand'] },
  // Grand Est
  'strasbourg':             { nom: 'Strasbourg',            dept: 'Bas-Rhin',       region: 'Grand Est', slug: 'strasbourg',            voisines: ['mulhouse','colmar','nancy'] },
  'nancy':                  { nom: 'Nancy',                 dept: 'Meurthe-et-Moselle', region: 'Grand Est', slug: 'nancy',             voisines: ['metz','strasbourg','epinal'] },
  'metz':                   { nom: 'Metz',                  dept: 'Moselle',        region: 'Grand Est', slug: 'metz',                  voisines: ['nancy','thionville','luxembourg'] },
  'reims':                  { nom: 'Reims',                 dept: 'Marne',          region: 'Grand Est', slug: 'reims',                 voisines: ['troyes','chalons-en-champagne','soissons'] },
  // Hauts-de-France
  'lille':                  { nom: 'Lille',                 dept: 'Nord',           region: 'Hauts-de-France', slug: 'lille',            voisines: ['roubaix','tourcoing','valenciennes'] },
  'amiens':                 { nom: 'Amiens',                dept: 'Somme',          region: 'Hauts-de-France', slug: 'amiens',           voisines: ['lille','rouen','compiegne'] },
  // Normandie
  'rouen':                  { nom: 'Rouen',                 dept: 'Seine-Maritime', region: 'Normandie', slug: 'rouen',                 voisines: ['caen','amiens','le-havre'] },
  'caen':                   { nom: 'Caen',                  dept: 'Calvados',       region: 'Normandie', slug: 'caen',                  voisines: ['rouen','le-mans','rennes'] },
  // Bretagne
  'rennes':                 { nom: 'Rennes',                dept: 'Ille-et-Vilaine', region: 'Bretagne', slug: 'rennes',               voisines: ['nantes','caen','brest'] },
  'brest':                  { nom: 'Brest',                 dept: 'Finistère',      region: 'Bretagne',  slug: 'brest',                 voisines: ['quimper','rennes','lorient'] },
  // Pays de la Loire
  'nantes':                 { nom: 'Nantes',                dept: 'Loire-Atlantique', region: 'Pays de la Loire', slug: 'nantes',       voisines: ['rennes','angers','saint-nazaire'] },
  'angers':                 { nom: 'Angers',                dept: 'Maine-et-Loire', region: 'Pays de la Loire', slug: 'angers',          voisines: ['nantes','tours','le-mans'] },
  // Centre-Val de Loire
  'tours':                  { nom: 'Tours',                 dept: 'Indre-et-Loire', region: 'Centre-Val de Loire', slug: 'tours',        voisines: ['angers','orleans','blois'] },
  'orleans':                { nom: 'Orléans',               dept: 'Loiret',         region: 'Centre-Val de Loire', slug: 'orleans',       voisines: ['tours','paris','bourges'] },
  // Auvergne
  'clermont-ferrand':       { nom: 'Clermont-Ferrand',      dept: 'Puy-de-Dôme',   region: 'Auvergne-Rhône-Alpes', slug: 'clermont-ferrand', voisines: ['lyon','saint-etienne','limoges'] },
};

// ── generateStaticParams ────────────────────────────────────────────────────
export async function generateStaticParams() {
  return Object.keys(VILLES_DATA).map((ville) => ({ ville }));
}

// ── generateMetadata ────────────────────────────────────────────────────────
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
    keywords: `logiciel devis artisan ${nom.toLowerCase()}, devis artisan gratuit ${nom.toLowerCase()}, facture artisan ${nom.toLowerCase()}, outil devis peintre ${dept.toLowerCase()}, application devis artisan`,
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

// ── PAGE ────────────────────────────────────────────────────────────────────
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
          <Link href="/artisan/dashboard" className="text-[#be123c] underline">
            Retour au dashboard
          </Link>
        </div>
      </main>
    );
  }

  const { nom, dept, region, voisines } = data;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Logiciel devis artisan ${nom}`,
    "description": `Outil gratuit de création de devis et factures pour artisans peintres à ${nom}, ${dept}.`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "provider": { "@type": "Organization", "name": "PremiumArtisan", "url": "https://premiumartisan.fr" },
    "areaServed": { "@type": "City", "name": nom },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-h-screen bg-white">

        {/* ── HERO ── */}
        <section className="bg-[#2a0a14] text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#fda4af] text-sm font-medium mb-3 uppercase tracking-wide">
              {dept} · {region}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Logiciel devis artisan<br />
              à <span className="text-[#fda4af]">{nom}</span>
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
            <span>Devis illimités</span>
            <span>Factures illimitées</span>
            <span>Envoi email client</span>
            <span>Projets clients {dept}</span>
            <span>Sans abonnement</span>
          </div>
        </section>

        {/* ── FONCTIONNEMENT ── */}
        <section className="py-16 px-4">
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
                { n: '2', t: 'Ajoutez les lignes de travaux', d: 'Préparation des supports, fournitures, main d\'œuvre au m². TVA 10% (rénovation) ou 20% selon le type de chantier.' },
                { n: '3', t: 'Envoyez par email au client', d: 'Votre client reçoit le devis et peut accepter ou refuser en un clic. Vous êtes notifié en temps réel.' },
                { n: '4', t: 'Générez la facture', d: 'Devis accepté ? Transformez-le en facture automatiquement. Numérotation séquentielle, mentions légales incluses.' },
              ].map(s => (
                <div key={s.n} className="flex gap-5 items-start p-5 rounded-2xl border border-gray-100 bg-gray-50">
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a0a14] text-white font-black">
                    {s.n}
                  </div>
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
                  {[
                    'Lignes de travaux détaillées',
                    'TVA 10% ou 20% au choix',
                    'Acompte configurable',
                    'Date de validité',
                    'Envoi email direct',
                    'Réponse client intégrée',
                    'Illimité — 0€',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/artisan/dashboard"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#be123c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#9f1239] transition">
                  Créer un devis →
                </Link>
              </div>
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Facture conforme</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {[
                    'Générée depuis le devis accepté',
                    'Numérotation automatique',
                    'Mentions légales incluses',
                    'SIRET, assurance décennale',
                    'Conditions de règlement',
                    'Pénalités de retard',
                    'Illimité — 0€',
                  ].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/artisan/dashboard"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                  Accéder au dashboard →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── TEXTE SEO LOCAL ── */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Logiciel de devis artisan à {nom} : ce qu'il faut savoir
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Les artisans peintres et rénovateurs à {nom} utilisent souvent des logiciels de devis 
              payants comme Obat ou Batiprix. PremiumArtisan propose une alternative 100% gratuite, 
              sans abonnement, adaptée aux artisans du {dept} qui veulent gérer leurs devis 
              et factures sans coût fixe mensuel.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
              Devis peinture à {nom} : les mentions obligatoires
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Un devis d'artisan peintre à {nom} doit contenir : le numéro SIRET, 
              les coordonnées complètes des deux parties, la description détaillée des travaux, 
              le prix unitaire HT, le taux de TVA applicable (10% pour rénovation sur logement 
              de plus de 2 ans), le montant TTC, et la date de validité. 
              PremiumArtisan inclut automatiquement toutes ces mentions.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
              Trouver des clients peinture à {nom}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              En plus de l'outil de devis, PremiumArtisan permet aux artisans peintres de {nom} 
              d'accéder aux projets de particuliers du {dept}. 
              Vous consultez les demandes gratuitement et payez uniquement 
              pour les contacts qui correspondent à votre zone d'intervention et votre activité.
            </p>
          </div>
        </section>

        {/* ── VILLES VOISINES ── */}
        {voisines.length > 0 && (
          <section className="bg-gray-50 py-12 px-4 border-t border-gray-200">
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

        {/* ── CTA FINAL ── */}
        <section className="bg-[#2a0a14] py-16 px-4 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Commencez gratuitement à {nom}
            </h2>
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