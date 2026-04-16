// app/devis-peintre/[ville]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

// ── VILLES DATA ────────────────────────────────────────────────────────────
const VILLES_DATA: Record<string, {
  nom: string; dept: string; region: string; slug: string; voisines: string[];
  population?: string; context?: string; marche?: string;
  prix?: { label: string; fourchette: string }[];
  faq?: { q: string; a: string }[];
}> = {
  'dijon':               { nom: 'Dijon',               dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'dijon',               voisines: ['beaune','chenove','longvic','talant'], population: '160 000 hab.', context: "Dijon, capitale de la Bourgogne, concentre une forte demande en rénovation de logements anciens — haussmanniens, immeubles de centre-ville et pavillons des années 1970. Le marché artisanal y est dense avec une concurrence élevée entre peintres.", marche: "Un artisan peintre à Dijon reçoit en moyenne 3 à 5 demandes de devis par semaine. Les particuliers dijonnais attendent un devis par email dans les 24 à 48h. PremiumArtisan sélectionne les artisans les plus réactifs pour chaque projet.", prix: [{label:"Peinture intérieure T3",fourchette:"2 200–4 500€"},{label:"Rénovation complète 100m²",fourchette:"12 000–28 000€"},{label:"Ravalement façade",fourchette:"4 500–14 000€"},{label:"Papier peint salon",fourchette:"800–2 200€"}], faq: [{q:"Quel est le prix d'un peintre à Dijon ?",a:"À Dijon, un peintre facture en moyenne 25–40€/m² pour la peinture intérieure. Le tarif dépend de l'état du support, du nombre de couches et du type de peinture."},{q:"Comment obtenir un devis peinture gratuit à Dijon ?",a:"Publiez votre projet sur PremiumArtisan en 2 minutes. Vous recevez jusqu'à 3 devis de peintres dijonnais sous 24h, gratuitement et sans engagement."}] },
  'beaune':              { nom: 'Beaune',               dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'beaune',              voisines: ['dijon','nuits-saint-georges','chalon-sur-saone'], context: "Beaune, capitale des vins de Bourgogne, accueille un parc immobilier varié : maisons de maître, propriétés viticoles et résidences récentes. La demande en rénovation haut de gamme y est forte.", marche: "Les artisans de Beaune interviennent souvent sur des chantiers de prestige. Un devis professionnel envoyé rapidement est décisif pour décrocher ces marchés.", prix: [{label:"Peinture intérieure maison",fourchette:"3 500–8 000€"},{label:"Ravalement façade",fourchette:"8 000–22 000€"}], faq: [{q:"Comment trouver un peintre qualifié à Beaune ?",a:"PremiumArtisan sélectionne des artisans peintres vérifiés à Beaune et en Côte-d'Or. Publiez votre projet pour recevoir 3 devis sous 24h."}] },
  'chenove':             { nom: 'Chenôve',              dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'chenove',             voisines: ['dijon','longvic','marsannay-la-cote'], context: "Chenôve, commune résidentielle au sud de Dijon, est fortement représentée par des logements HLM et des résidences des années 1970. La demande en peinture intérieure et rénovation y est constante.", marche: "Les artisans de Chenôve travaillent régulièrement pour des bailleurs sociaux et des propriétaires privés souhaitant remettre à neuf leurs logements locatifs.", prix: [{label:"Peinture intérieure HLM",fourchette:"1 200–3 000€"},{label:"Remise en état locatif",fourchette:"2 500–6 000€"}], faq: [{q:"Quel peintre pour un logement HLM à Chenôve ?",a:"PremiumArtisan met en relation les propriétaires de Chenôve avec des artisans spécialisés en rénovation de logements sociaux et locatifs."}] },
  'longvic':             { nom: 'Longvic',              dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'longvic',             voisines: ['dijon','chenove','quetigny'], prix: [{label:"Peinture intérieure appartement",fourchette:"1 800–3 800€"},{label:"Rénovation maison",fourchette:"9 000–20 000€"}], faq: [{q:"Comment avoir un devis peintre à Longvic ?",a:"Publiez votre projet sur PremiumArtisan. Des peintres de Longvic et du Grand Dijon vous répondent sous 24h."}] },
  'talant':              { nom: 'Talant',               dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'talant',              voisines: ['dijon','fontaine-les-dijon','chenove'], prix: [{label:"Peinture intérieure appartement",fourchette:"1 900–4 000€"},{label:"Ravalement façade",fourchette:"5 000–13 000€"}], faq: [{q:"Devis peintre à Talant — comment faire ?",a:"PremiumArtisan met en relation les particuliers de Talant avec des artisans peintres qualifiés de la Côte-d'Or. Réponse sous 24h."}] },
  'quetigny':            { nom: 'Quetigny',             dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'quetigny',            voisines: ['dijon','longvic','marsannay-la-cote'], prix: [{label:"Peinture intérieure",fourchette:"2 000–4 200€"},{label:"Rénovation complète",fourchette:"10 000–24 000€"}], faq: [{q:"Peintre disponible à Quetigny ?",a:"Oui. PremiumArtisan référence des peintres à Quetigny et dans toute la Côte-d'Or. Devis gratuit sous 24h."}] },
  'fontaine-les-dijon':  { nom: 'Fontaine-lès-Dijon',  dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'fontaine-les-dijon',  voisines: ['dijon','talant'], prix: [{label:"Peinture intérieure",fourchette:"2 100–4 400€"},{label:"Ravalement",fourchette:"5 500–15 000€"}], faq: [{q:"Devis peinture à Fontaine-lès-Dijon ?",a:"PremiumArtisan met en relation les particuliers de Fontaine-lès-Dijon avec des artisans peintres vérifiés."}] },
  'marsannay-la-cote':   { nom: 'Marsannay-la-Côte',   dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'marsannay-la-cote',   voisines: ['dijon','chenove'], prix: [{label:"Peinture intérieure",fourchette:"2 000–4 000€"}], faq: [{q:"Peintre à Marsannay-la-Côte ?",a:"Publiez votre projet sur PremiumArtisan pour recevoir des devis de peintres locaux."}] },
  'nuits-saint-georges': { nom: 'Nuits-Saint-Georges',  dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'nuits-saint-georges', voisines: ['beaune','dijon','gevrey-chambertin'], prix: [{label:"Peinture intérieure",fourchette:"2 200–4 600€"}], faq: [{q:"Comment trouver un peintre à Nuits-Saint-Georges ?",a:"PremiumArtisan référence des artisans peintres en Côte-d'Or. Devis gratuit."}] },
  'gevrey-chambertin':   { nom: 'Gevrey-Chambertin',    dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'gevrey-chambertin',   voisines: ['dijon','nuits-saint-georges'], prix: [{label:"Peinture intérieure",fourchette:"2 300–4 800€"}], faq: [{q:"Peintre à Gevrey-Chambertin ?",a:"Publiez votre projet gratuitement sur PremiumArtisan."}] },
  'auxonne':             { nom: 'Auxonne',              dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'auxonne',             voisines: ['dijon'], prix: [{label:"Peinture intérieure",fourchette:"1 900–3 900€"}], faq: [{q:"Devis peinture à Auxonne ?",a:"PremiumArtisan met en relation les particuliers d'Auxonne avec des peintres locaux."}] },
  'montbard':            { nom: 'Montbard',             dept: "Côte-d'Or",          region: 'Bourgogne',              slug: 'montbard',            voisines: ['dijon'], prix: [{label:"Peinture intérieure",fourchette:"1 800–3 700€"}], faq: [{q:"Peintre à Montbard ?",a:"Recevez des devis de peintres locaux via PremiumArtisan."}] },
  'chalon-sur-saone':    { nom: 'Chalon-sur-Saône',     dept: 'Saône-et-Loire',     region: 'Bourgogne',              slug: 'chalon-sur-saone',    voisines: ['beaune','macon','autun'], prix: [{label:"Peinture intérieure T3",fourchette:"2 000–4 200€"},{label:"Rénovation maison",fourchette:"10 000–25 000€"}], faq: [{q:"Devis peintre à Chalon-sur-Saône ?",a:"PremiumArtisan référence des peintres en Saône-et-Loire. Devis gratuit sous 24h."}] },
  'macon':               { nom: 'Mâcon',                dept: 'Saône-et-Loire',     region: 'Bourgogne',              slug: 'macon',               voisines: ['chalon-sur-saone'], prix: [{label:"Peinture intérieure",fourchette:"2 000–4 200€"}], faq: [{q:"Peintre à Mâcon ?",a:"Publiez votre projet et recevez des devis de peintres mâconnais."}] },
  'autun':               { nom: 'Autun',                dept: 'Saône-et-Loire',     region: 'Bourgogne',              slug: 'autun',               voisines: ['chalon-sur-saone','dijon'], prix: [{label:"Peinture intérieure",fourchette:"1 900–4 000€"}], faq: [{q:"Peintre à Autun ?",a:"PremiumArtisan met en relation les particuliers d'Autun avec des peintres locaux."}] },
  'le-creusot':          { nom: 'Le Creusot',           dept: 'Saône-et-Loire',     region: 'Bourgogne',              slug: 'le-creusot',          voisines: ['autun','chalon-sur-saone'], prix: [{label:"Peinture intérieure",fourchette:"1 800–3 800€"}], faq: [{q:"Devis peinture au Creusot ?",a:"Recevez des devis de peintres locaux via PremiumArtisan."}] },
  'montceau-les-mines':  { nom: 'Montceau-les-Mines',  dept: 'Saône-et-Loire',     region: 'Bourgogne',              slug: 'montceau-les-mines',  voisines: ['le-creusot','chalon-sur-saone'], prix: [{label:"Peinture intérieure",fourchette:"1 800–3 700€"}], faq: [{q:"Peintre à Montceau-les-Mines ?",a:"PremiumArtisan référence des artisans peintres en Saône-et-Loire."}] },
  'auxerre':             { nom: 'Auxerre',              dept: 'Yonne',              region: 'Bourgogne',              slug: 'auxerre',             voisines: ['sens','avallon'], prix: [{label:"Peinture intérieure",fourchette:"2 000–4 000€"}], faq: [{q:"Devis peintre à Auxerre ?",a:"PremiumArtisan met en relation les particuliers d'Auxerre avec des peintres de l'Yonne."}] },
  'sens':                { nom: 'Sens',                 dept: 'Yonne',              region: 'Bourgogne',              slug: 'sens',                voisines: ['auxerre'], prix: [{label:"Peinture intérieure",fourchette:"1 900–3 900€"}], faq: [{q:"Peintre à Sens ?",a:"Recevez des devis de peintres locaux via PremiumArtisan."}] },
  'avallon':             { nom: 'Avallon',              dept: 'Yonne',              region: 'Bourgogne',              slug: 'avallon',             voisines: ['auxerre'], prix: [{label:"Peinture intérieure",fourchette:"1 800–3 700€"}], faq: [{q:"Peintre à Avallon ?",a:"PremiumArtisan met en relation les particuliers d'Avallon avec des peintres locaux."}] },
  'nevers':              { nom: 'Nevers',               dept: 'Nièvre',             region: 'Bourgogne',              slug: 'nevers',              voisines: ['moulins','chalon-sur-saone'], prix: [{label:"Peinture intérieure",fourchette:"1 900–3 900€"}], faq: [{q:"Devis peintre à Nevers ?",a:"PremiumArtisan référence des artisans peintres dans la Nièvre."}] },
  'cosne-cours-sur-loire':{ nom: 'Cosne-Cours-sur-Loire', dept: 'Nièvre',          region: 'Bourgogne',              slug: 'cosne-cours-sur-loire', voisines: ['nevers','auxerre'], prix: [{label:"Peinture intérieure",fourchette:"1 800–3 600€"}], faq: [{q:"Peintre à Cosne-sur-Loire ?",a:"Recevez des devis de peintres locaux via PremiumArtisan."}] },
  'paris':               { nom: 'Paris',                dept: 'Paris',              region: 'Île-de-France',          slug: 'paris',               voisines: ['boulogne-billancourt','saint-denis','versailles'], population: '2 100 000 hab.', context: "Paris concentre la demande en rénovation la plus élevée de France. Haussmannien, art déco, immeubles des années 1960 — le parc immobilier parisien génère un volume de chantiers considérable pour les artisans peintres.", marche: "Le marché parisien est ultra-compétitif. Les particuliers comparent 3 à 5 devis avant de choisir. Un devis professionnel et rapide est décisif.", prix: [{label:"Peinture intérieure T3 Paris",fourchette:"3 500–7 000€"},{label:"Rénovation appartement 60m²",fourchette:"18 000–45 000€"},{label:"Ravalement façade haussmannienne",fourchette:"20 000–80 000€"}], faq: [{q:"Quel est le prix d'un peintre à Paris ?",a:"À Paris, un peintre facture en moyenne 35–55€/m² pour la peinture intérieure. Les tarifs sont 20–30% supérieurs à la province."},{q:"Comment obtenir des devis peinture à Paris ?",a:"PremiumArtisan sélectionne des peintres parisiens vérifiés. Publiez votre projet pour recevoir 3 devis sous 24h."}] },
  'boulogne-billancourt':{ nom: 'Boulogne-Billancourt', dept: 'Hauts-de-Seine',     region: 'Île-de-France',          slug: 'boulogne-billancourt', voisines: ['paris','versailles'], prix: [{label:"Peinture intérieure",fourchette:"3 200–6 500€"}], faq: [{q:"Peintre à Boulogne-Billancourt ?",a:"PremiumArtisan référence des peintres en Hauts-de-Seine. Devis gratuit."}] },
  'saint-denis':         { nom: 'Saint-Denis',          dept: 'Seine-Saint-Denis',  region: 'Île-de-France',          slug: 'saint-denis',         voisines: ['paris','aubervilliers'], prix: [{label:"Peinture intérieure",fourchette:"2 800–5 500€"}], faq: [{q:"Peintre à Saint-Denis ?",a:"Recevez des devis de peintres locaux via PremiumArtisan."}] },
  'versailles':          { nom: 'Versailles',           dept: 'Yvelines',           region: 'Île-de-France',          slug: 'versailles',          voisines: ['paris','boulogne-billancourt'], prix: [{label:"Peinture intérieure",fourchette:"3 000–6 000€"}], faq: [{q:"Peintre à Versailles ?",a:"PremiumArtisan met en relation les particuliers de Versailles avec des peintres qualifiés."}] },
  'lyon':                { nom: 'Lyon',                 dept: 'Rhône',              region: 'Auvergne-Rhône-Alpes',  slug: 'lyon',                voisines: ['villeurbanne','saint-etienne','grenoble'], population: '520 000 hab.', context: "Lyon, deuxième métropole économique française, concentre une demande massive en rénovation de logements anciens.", marche: "À Lyon, les particuliers comparent plusieurs devis en 48h. La réactivité est clé.", prix: [{label:"Peinture intérieure T3 Lyon",fourchette:"2 800–5 500€"},{label:"Rénovation appartement 80m²",fourchette:"15 000–35 000€"},{label:"Ravalement Presqu'île",fourchette:"12 000–40 000€"}], faq: [{q:"Prix d'un peintre à Lyon ?",a:"À Lyon, un peintre facture en moyenne 28–45€/m² pour la peinture intérieure."},{q:"Devis peinture gratuit à Lyon ?",a:"PremiumArtisan publie votre projet et vous met en relation avec 3 peintres lyonnais sous 24h."}] },
  'villeurbanne':        { nom: 'Villeurbanne',         dept: 'Rhône',              region: 'Auvergne-Rhône-Alpes',  slug: 'villeurbanne',        voisines: ['lyon','bron'], prix: [{label:"Peinture intérieure",fourchette:"2 600–5 200€"}], faq: [{q:"Peintre à Villeurbanne ?",a:"PremiumArtisan référence des peintres à Villeurbanne et dans le Rhône."}] },
  'grenoble':            { nom: 'Grenoble',             dept: 'Isère',              region: 'Auvergne-Rhône-Alpes',  slug: 'grenoble',            voisines: ['lyon','chambery'], prix: [{label:"Peinture intérieure",fourchette:"2 400–4 800€"}], faq: [{q:"Devis peintre à Grenoble ?",a:"Recevez des devis de peintres grenoblois via PremiumArtisan."}] },
  'saint-etienne':       { nom: 'Saint-Étienne',        dept: 'Loire',              region: 'Auvergne-Rhône-Alpes',  slug: 'saint-etienne',       voisines: ['lyon','clermont-ferrand','roanne'], population: '172 000 hab.', context: "Saint-Étienne connaît depuis 10 ans une transformation profonde. Les quartiers Manufacture et Centre-Ville font l'objet de nombreux programmes de rénovation.", marche: "Le marché stéphanois est caractérisé par des budgets plus serrés qu'à Lyon mais un volume de chantiers élevé.", prix: [{label:"Peinture intérieure T3",fourchette:"1 800–3 800€"},{label:"Ravalement façade années 50",fourchette:"6 000–18 000€"},{label:"Rénovation logement social",fourchette:"8 000–20 000€"}], faq: [{q:"Prix d'un peintre à Saint-Étienne ?",a:"À Saint-Étienne, un peintre facture en moyenne 22–38€/m² pour la peinture intérieure."},{q:"Comment trouver un peintre à Saint-Étienne ?",a:"PremiumArtisan référence des artisans peintres stéphanois. Publiez votre projet pour recevoir 3 devis sous 24h."},{q:"Quel budget pour rénover un appartement à Saint-Étienne ?",a:"La rénovation complète d'un appartement de 70m² coûte en moyenne entre 12 000€ et 25 000€."}] },
  'marseille':           { nom: 'Marseille',            dept: 'Bouches-du-Rhône',   region: 'PACA',                  slug: 'marseille',           voisines: ['aix-en-provence','toulon','nice'], population: '870 000 hab.', context: "Marseille connaît un renouveau urbain important avec de nombreux projets de réhabilitation dans les quartiers Nord et le centre-ville.", marche: "Le marché marseillais est dynamique, porté par les programmes Anah et les copropriétés anciennes.", prix: [{label:"Peinture intérieure T4",fourchette:"2 200–4 800€"},{label:"Ravalement façade",fourchette:"8 000–25 000€"},{label:"Rénovation logement ancien",fourchette:"10 000–30 000€"}], faq: [{q:"Prix d'un peintre à Marseille ?",a:"À Marseille, un peintre facture en moyenne 26–42€/m² pour la peinture intérieure."},{q:"Devis peinture gratuit à Marseille ?",a:"Publiez votre projet sur PremiumArtisan et recevez 3 devis de peintres marseillais sous 24h."}] },
  'nice':                { nom: 'Nice',                 dept: 'Alpes-Maritimes',    region: 'PACA',                  slug: 'nice',                voisines: ['antibes','cannes','toulon'], prix: [{label:"Peinture intérieure",fourchette:"2 800–5 500€"}], faq: [{q:"Peintre à Nice ?",a:"PremiumArtisan référence des peintres à Nice et dans les Alpes-Maritimes."}] },
  'toulon':              { nom: 'Toulon',               dept: 'Var',                region: 'PACA',                  slug: 'toulon',              voisines: ['marseille','nice'], prix: [{label:"Peinture intérieure",fourchette:"2 400–4 800€"}], faq: [{q:"Devis peintre à Toulon ?",a:"Recevez des devis de peintres toulonnais via PremiumArtisan."}] },
  'aix-en-provence':     { nom: 'Aix-en-Provence',     dept: 'Bouches-du-Rhône',   region: 'PACA',                  slug: 'aix-en-provence',     voisines: ['marseille','toulon'], prix: [{label:"Peinture intérieure",fourchette:"2 600–5 200€"}], faq: [{q:"Peintre à Aix-en-Provence ?",a:"PremiumArtisan met en relation les particuliers d'Aix avec des peintres qualifiés."}] },
  'toulouse':            { nom: 'Toulouse',             dept: 'Haute-Garonne',      region: 'Occitanie',             slug: 'toulouse',            voisines: ['montpellier','bordeaux'], prix: [{label:"Peinture intérieure T3",fourchette:"2 400–5 000€"},{label:"Rénovation appartement",fourchette:"12 000–28 000€"}], faq: [{q:"Prix d'un peintre à Toulouse ?",a:"À Toulouse, un peintre facture en moyenne 26–42€/m² pour la peinture intérieure."},{q:"Devis peinture gratuit à Toulouse ?",a:"PremiumArtisan publie votre projet et vous met en relation avec 3 peintres toulousains sous 24h."}] },
  'bordeaux':            { nom: 'Bordeaux',             dept: 'Gironde',            region: 'Nouvelle-Aquitaine',    slug: 'bordeaux',            voisines: ['merignac','pessac'], prix: [{label:"Peinture intérieure T3",fourchette:"2 500–5 200€"},{label:"Ravalement façade",fourchette:"7 000–20 000€"}], faq: [{q:"Prix d'un peintre à Bordeaux ?",a:"À Bordeaux, un peintre facture en moyenne 27–44€/m² pour la peinture intérieure."},{q:"Devis peinture gratuit à Bordeaux ?",a:"Publiez votre projet sur PremiumArtisan pour recevoir 3 devis de peintres bordelais."}] },
  'limoges':             { nom: 'Limoges',              dept: 'Haute-Vienne',       region: 'Nouvelle-Aquitaine',    slug: 'limoges',             voisines: ['bordeaux','clermont-ferrand'], prix: [{label:"Peinture intérieure",fourchette:"1 900–3 900€"}], faq: [{q:"Peintre à Limoges ?",a:"PremiumArtisan référence des peintres à Limoges et en Haute-Vienne."}] },
  'strasbourg':          { nom: 'Strasbourg',           dept: 'Bas-Rhin',           region: 'Grand Est',             slug: 'strasbourg',          voisines: ['mulhouse','colmar','nancy'], prix: [{label:"Peinture intérieure T3",fourchette:"2 300–4 600€"}], faq: [{q:"Devis peintre à Strasbourg ?",a:"PremiumArtisan met en relation les particuliers de Strasbourg avec des peintres qualifiés du Bas-Rhin."}] },
  'nancy':               { nom: 'Nancy',                dept: 'Meurthe-et-Moselle', region: 'Grand Est',             slug: 'nancy',               voisines: ['metz','strasbourg'], prix: [{label:"Peinture intérieure",fourchette:"2 100–4 300€"}], faq: [{q:"Peintre à Nancy ?",a:"Recevez des devis de peintres nancéiens via PremiumArtisan."}] },
  'metz':                { nom: 'Metz',                 dept: 'Moselle',            region: 'Grand Est',             slug: 'metz',                voisines: ['nancy','thionville'], prix: [{label:"Peinture intérieure",fourchette:"2 100–4 200€"}], faq: [{q:"Peintre à Metz ?",a:"PremiumArtisan référence des peintres à Metz et en Moselle."}] },
  'reims':               { nom: 'Reims',                dept: 'Marne',              region: 'Grand Est',             slug: 'reims',               voisines: ['troyes','chalons-en-champagne'], prix: [{label:"Peinture intérieure",fourchette:"2 200–4 500€"}], faq: [{q:"Devis peinture à Reims ?",a:"Publiez votre projet sur PremiumArtisan pour recevoir des devis de peintres rémois."}] },
  'lille':               { nom: 'Lille',                dept: 'Nord',               region: 'Hauts-de-France',       slug: 'lille',               voisines: ['roubaix','tourcoing','valenciennes'], population: '235 000 hab.', context: "Lille présente un parc immobilier varié : maisons de ville du 19e siècle, immeubles modernes et résidences périphériques. La demande en rénovation y est soutenue.", marche: "Les artisans lillois couvrent l'ensemble de la métropole : Roubaix, Tourcoing, Villeneuve-d'Ascq.", prix: [{label:"Peinture intérieure T3",fourchette:"2 300–4 700€"},{label:"Ravalement façade maison",fourchette:"6 000–16 000€"}], faq: [{q:"Prix d'un peintre à Lille ?",a:"À Lille, un peintre facture en moyenne 26–42€/m² pour la peinture intérieure."},{q:"Devis peinture à Lille ?",a:"PremiumArtisan publie votre projet et vous met en relation avec 3 peintres lillois sous 24h."}] },
  'amiens':              { nom: 'Amiens',               dept: 'Somme',              region: 'Hauts-de-France',       slug: 'amiens',              voisines: ['lille','rouen'], prix: [{label:"Peinture intérieure",fourchette:"2 000–4 100€"}], faq: [{q:"Peintre à Amiens ?",a:"PremiumArtisan référence des peintres à Amiens et en Somme."}] },
  'rouen':               { nom: 'Rouen',                dept: 'Seine-Maritime',     region: 'Normandie',             slug: 'rouen',               voisines: ['caen','amiens'], prix: [{label:"Peinture intérieure",fourchette:"2 200–4 400€"}], faq: [{q:"Devis peintre à Rouen ?",a:"Recevez des devis de peintres rouennais via PremiumArtisan."}] },
  'caen':                { nom: 'Caen',                 dept: 'Calvados',           region: 'Normandie',             slug: 'caen',                voisines: ['rouen','rennes'], prix: [{label:"Peinture intérieure",fourchette:"2 100–4 200€"}], faq: [{q:"Peintre à Caen ?",a:"PremiumArtisan met en relation les particuliers de Caen avec des peintres du Calvados."}] },
  'rennes':              { nom: 'Rennes',               dept: 'Ille-et-Vilaine',    region: 'Bretagne',              slug: 'rennes',              voisines: ['nantes','caen','brest'], prix: [{label:"Peinture intérieure T3",fourchette:"2 200–4 500€"}], faq: [{q:"Prix d'un peintre à Rennes ?",a:"À Rennes, un peintre facture en moyenne 25–40€/m² pour la peinture intérieure."},{q:"Devis peinture à Rennes ?",a:"PremiumArtisan publie votre projet et vous met en relation avec des peintres rennais."}] },
  'brest':               { nom: 'Brest',                dept: 'Finistère',          region: 'Bretagne',              slug: 'brest',               voisines: ['quimper','rennes'], prix: [{label:"Peinture intérieure",fourchette:"2 100–4 200€"}], faq: [{q:"Peintre à Brest ?",a:"PremiumArtisan référence des peintres à Brest et dans le Finistère."}] },
  'nantes':              { nom: 'Nantes',               dept: 'Loire-Atlantique',   region: 'Pays de la Loire',      slug: 'nantes',              voisines: ['rennes','angers','saint-nazaire'], population: '320 000 hab.', context: "Nantes, métropole dynamique de l'Ouest, connaît une forte croissance immobilière. La demande en peinture et rénovation y est soutenue.", prix: [{label:"Peinture intérieure T3",fourchette:"2 300–4 700€"},{label:"Rénovation appartement",fourchette:"12 000–28 000€"}], faq: [{q:"Prix d'un peintre à Nantes ?",a:"À Nantes, un peintre facture en moyenne 26–42€/m² pour la peinture intérieure."},{q:"Devis peinture à Nantes ?",a:"PremiumArtisan publie votre projet et vous met en relation avec 3 peintres nantais."}] },
  'angers':              { nom: 'Angers',               dept: 'Maine-et-Loire',     region: 'Pays de la Loire',      slug: 'angers',              voisines: ['nantes','tours'], prix: [{label:"Peinture intérieure",fourchette:"2 100–4 300€"}], faq: [{q:"Peintre à Angers ?",a:"PremiumArtisan met en relation les particuliers d'Angers avec des peintres qualifiés."}] },
  'tours':               { nom: 'Tours',                dept: 'Indre-et-Loire',     region: 'Centre-Val de Loire',   slug: 'tours',               voisines: ['angers','orleans'], prix: [{label:"Peinture intérieure",fourchette:"2 100–4 200€"}], faq: [{q:"Peintre à Tours ?",a:"PremiumArtisan référence des peintres à Tours et en Indre-et-Loire."}] },
  'orleans':             { nom: 'Orléans',              dept: 'Loiret',             region: 'Centre-Val de Loire',   slug: 'orleans',             voisines: ['tours','paris','bourges'], population: '114 000 hab.', context: "Orléans dispose d'un parc immobilier diversifié : hôtels particuliers du centre historique, pavillons de la périphérie et résidences des années 1960–1980.", marche: "Le marché orléanais est caractérisé par une demande régulière en peinture intérieure et ravalement.", prix: [{label:"Peinture intérieure T3",fourchette:"2 000–4 200€"},{label:"Rénovation maison 100m²",fourchette:"11 000–26 000€"},{label:"Ravalement façade pavillon",fourchette:"5 000–14 000€"},{label:"Papier peint + peinture salon",fourchette:"700–2 000€"}], faq: [{q:"Quel est le prix d'un peintre à Orléans ?",a:"À Orléans, un peintre facture en moyenne 24–38€/m² pour la peinture intérieure."},{q:"Comment obtenir des devis peinture gratuits à Orléans ?",a:"Publiez votre projet sur PremiumArtisan en 2 minutes. Vous recevez jusqu'à 3 devis sous 24h, sans engagement."},{q:"Quelle TVA pour les travaux de peinture à Orléans ?",a:"Pour les logements de plus de 2 ans, la TVA est de 10% sur la main d'œuvre et les fournitures."}] },
  'clermont-ferrand':    { nom: 'Clermont-Ferrand',     dept: 'Puy-de-Dôme',       region: 'Auvergne-Rhône-Alpes',  slug: 'clermont-ferrand',    voisines: ['lyon','saint-etienne','limoges'], prix: [{label:"Peinture intérieure T3",fourchette:"2 000–4 100€"}], faq: [{q:"Peintre à Clermont-Ferrand ?",a:"PremiumArtisan référence des peintres à Clermont-Ferrand et dans le Puy-de-Dôme."},{q:"Devis peinture à Clermont-Ferrand ?",a:"Publiez votre projet et recevez des devis de peintres clermontois sous 24h."}] },
  'besancon':            { nom: 'Besançon',             dept: 'Doubs',              region: 'Bourgogne-Franche-Comté', slug: 'besancon',           voisines: ['dijon','belfort'], prix: [{label:"Peinture intérieure",fourchette:"2 100–4 300€"}], faq: [{q:"Peintre à Besançon ?",a:"PremiumArtisan met en relation les particuliers de Besançon avec des peintres du Doubs."}] },
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
    title: `Devis Peintre ${nom} – Comparez 3 Artisans Qualifiés | PremiumArtisan`,
    description: `Obtenez jusqu'à 3 devis de peintres qualifiés à ${nom}. Artisans ${dept} vérifiés, réponse sous 24h, sans engagement. Peinture intérieure, rénovation.`,
    alternates: { canonical: `https://www.premiumartisan.fr/devis-peintre/${ville}` },
    keywords: `devis peintre ${nom.toLowerCase()}, peintre ${nom.toLowerCase()}, devis peinture ${nom.toLowerCase()}, artisan peintre ${dept.toLowerCase()}`,
    openGraph: {
      title: `Devis Peintre ${nom} – 3 Artisans Qualifiés`,
      description: `Comparez jusqu'à 3 devis de peintres à ${nom}. Réponse sous 24h.`,
      url: `https://www.premiumartisan.fr/devis-peintre/${ville}`,
      type: 'website', locale: 'fr_FR', siteName: 'PremiumArtisan',
    },
  };
}

// ── PAGE ───────────────────────────────────────────────────────────────────
export default async function DevisPeintreVille(
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

  const { nom, dept, region, voisines } = data;

  // ── SCHEMA JSON-LD (LocalBusiness + Service + FAQPage) ─────────────────
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": `PremiumArtisan — Peintre à ${nom}`,
        "image": "https://www.premiumartisan.fr/og-image.jpg",
        "url": `https://www.premiumartisan.fr/devis-peintre/${ville}`,
        "telephone": "+33XXXXXXXXX",
        "priceRange": "€€",
        "description": `Mise en relation avec des artisans peintres qualifiés à ${nom}, ${dept}. Devis gratuit sous 24h.`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": nom,
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
        "name": `Devis peintre à ${nom}`,
        "description": `Mise en relation avec des artisans peintres qualifiés à ${nom}, ${dept}.`,
        "provider": { "@type": "Organization", "name": "PremiumArtisan", "url": "https://www.premiumartisan.fr" },
        "areaServed": { "@type": "City", "name": nom },
        "serviceType": "Mise en relation artisan peintre",
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
            <span className="text-gray-900 font-medium">Devis peintre {nom}</span>
          </div>
        </nav>

        {/* HERO */}
        <section className="bg-[#2a0a14] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#fda4af] text-sm font-medium mb-3 uppercase tracking-wide">
              {dept} · {region}{data.population ? ` · ${data.population}` : ''}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Devis Peintre à <span className="text-[#fda4af]">{nom}</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Décrivez votre projet une seule fois. Recevez des devis de 3 peintres locaux à {nom}. Gratuit, sans engagement.
            </p>
            <Link href="/publier-projet/form"
              className="inline-flex items-center justify-center rounded-xl bg-[#be123c] px-8 py-4 text-lg font-semibold text-white shadow-xl hover:bg-[#9f1239] transition">
              Demander mes devis gratuits →
            </Link>
            <p className="mt-4 text-sm text-white/40">Sans engagement · 3 artisans max · Réponse sous 24h</p>
          </div>
        </section>

        {/* TRUST */}
        <section className="bg-[#fdf2f5] border-b border-[#fda4af]/20 py-5 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-[#6a3a4a] font-medium">
            {[`Artisans vérifiés ${dept}`, "Max 3 peintres par projet", "Réponse sous 24h", "Coordonnées protégées", "Sans engagement"].map(t => (
              <span key={t}>✓ {t}</span>
            ))}
          </div>
        </section>

        {/* CONTEXTE LOCAL */}
        {(data.context || data.marche) && (
          <section className="py-14 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Peintres et rénovateurs à {nom}
              </h2>
              {data.context && <p className="text-gray-600 leading-relaxed mb-5 text-base">{data.context}</p>}
              {data.marche && <p className="text-gray-600 leading-relaxed text-base">{data.marche}</p>}
            </div>
          </section>
        )}

        {/* PRIX */}
        {data.prix && data.prix.length > 0 && (
          <section className="bg-gray-50 py-14 px-4 border-t border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Prix indicatifs d'un peintre à {nom} en 2026
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.prix.map((p, i) => (
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

        {/* COMMENT CA MARCHE */}
        <section className="py-14 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Trouver un peintre à {nom} : comment ça marche ?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PremiumArtisan met en relation les particuliers de {nom} avec des artisans peintres professionnels du {dept}. Contrairement aux plateformes nationales qui revendent vos coordonnées à des dizaines d'artisans, PremiumArtisan limite chaque projet à 3 peintres maximum. Résultat : moins de sollicitations, des interlocuteurs plus qualifiés, et un meilleur suivi de votre projet.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pour obtenir vos devis, il vous suffit de décrire votre projet en 2 minutes : type de travaux (peinture intérieure, ravalement, papier peint, rénovation), surface approximative, et votre code postal à {nom}. Votre demande est transmise aux artisans disponibles dans votre secteur.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Peinture intérieure à {nom} — ce qu'il faut savoir</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              La peinture intérieure est le type de travaux le plus demandé à {nom}. Elle concerne la remise en état de logements, la rénovation avant mise en location, ou simplement le rafraîchissement d'une pièce. Les peintres locaux interviennent sur tous types de supports : plâtre, béton, boiseries, plafonds.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">Ravalement de façade à {nom}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Le ravalement de façade est obligatoire tous les 10 ans dans les communes de plus de 5 000 habitants. À {nom}, les artisans spécialisés en ravalement proposent des devis selon la surface, le type d'enduit et l'accessibilité du bâtiment.
            </p>
          </div>
        </section>

        {/* FAQ */}
        {data.faq && data.faq.length > 0 && (
          <section className="bg-gray-50 py-14 px-4 border-t border-gray-200">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Questions fréquentes — Peintre à {nom}
              </h2>
              <div className="space-y-4">
                {data.faq.map((f, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA FORM */}
        <section className="py-14 px-4 bg-white border-t border-gray-100">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Publiez votre projet de peinture à {nom}
            </h2>
            <p className="text-gray-500 mb-8">
              Formulaire en 2 minutes. 3 peintres maximum vous contactent. Gratuit, sans engagement.
            </p>
            <Link href="/publier-projet/form"
              className="inline-flex items-center justify-center rounded-xl bg-[#be123c] px-8 py-4 text-lg font-semibold text-white shadow-xl hover:bg-[#9f1239] transition">
              Demander mes devis gratuits →
            </Link>
          </div>
        </section>

        {/* VILLES VOISINES */}
        {voisines.length > 0 && (
          <section className="bg-gray-50 py-12 px-4 border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Devis peintre dans les communes proches de {nom}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {voisines.filter(v => VILLES_DATA[v]).map(v => (
                  <Link key={v} href={`/devis-peintre/${v}`}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 text-center hover:border-[#be123c] hover:text-[#be123c] transition">
                    {VILLES_DATA[v]?.nom}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ARTISAN CTA */}
        <section className="bg-[#fdf2f5] py-10 px-4 border-t border-[#fda4af]/20">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-semibold text-gray-900">Vous êtes peintre à {nom} ?</p>
              <p className="text-sm text-gray-500 mt-1">Accédez aux projets de particuliers et créez vos devis gratuitement.</p>
            </div>
            <Link href="/artisan/dashboard"
              className="shrink-0 inline-flex items-center justify-center rounded-xl border border-[#be123c] text-[#be123c] px-5 py-2.5 text-sm font-semibold hover:bg-[#be123c] hover:text-white transition">
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
                { label: "Logiciel devis artisan", href: `/logiciel-devis-artisan/${ville}` },
                { label: "Devis peinture Dijon", href: "/devis-peinture-dijon" },
                { label: "Devis rénovation Dijon", href: "/devis-renovation-dijon" },
                { label: "Trouver clients peintre", href: "/trouver-clients-peintre-dijon" },
                { label: "Créer devis gratuit", href: "/creer-devis-peintre" },
                { label: "Rénovation cuisine Dijon", href: "/devis-cuisine/dijon" },
              ].map(({ label, href }) => (
                <Link key={href} href={href}
                  className="inline-block px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700 font-medium hover:border-[#be123c] hover:text-[#be123c] transition">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-[#2a0a14] py-14 px-4 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Obtenez vos devis peinture à {nom}</h2>
            <p className="text-white/70 mb-8">Gratuit, sans engagement. Jusqu'à 3 artisans peintres qualifiés en {dept}.</p>
            <Link href="/publier-projet/form"
              className="inline-flex items-center justify-center rounded-xl bg-[#be123c] px-8 py-4 text-lg font-semibold text-white hover:bg-[#9f1239] transition">
              Demander mes devis →
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}