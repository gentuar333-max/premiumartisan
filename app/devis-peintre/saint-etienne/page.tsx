// app/devis-peintre/saint-etienne/page.tsx
"use client";

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { MapPin, CheckCircle2, ArrowRight, ChevronDown, Shield, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const BASE_URL = 'https://www.premiumartisan.fr';
const PAGE_URL = `${BASE_URL}/devis-peintre/saint-etienne`;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  );
}

const schemaLocal = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'PremiumArtisan — Peintre à Saint-Étienne',
  image: `${BASE_URL}/og-image.jpg`,
  url: PAGE_URL,
  telephone: '+33XXXXXXXXX',
  priceRange: '€€',
  description: 'Mise en relation avec des artisans peintres qualifiés à Saint-Étienne, Loire. Devis gratuit sous 24h.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Saint-Étienne',
    postalCode: '42000',
    addressRegion: 'Loire',
    addressCountry: 'FR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '45.4397', longitude: '4.3872' },
  areaServed: { '@type': 'City', name: 'Saint-Étienne' },
};
const schemaService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Devis peintre à Saint-Étienne',
  description: 'Mise en relation avec des artisans peintres qualifiés à Saint-Étienne et dans la Loire.',
  provider: { '@type': 'Organization', name: 'PremiumArtisan', url: BASE_URL },
  areaServed: { '@type': 'City', name: 'Saint-Étienne' },
  serviceType: 'Mise en relation artisan peintre',
};
const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Quel est le prix d\'un peintre à Saint-Étienne en 2026 ?', acceptedAnswer: { '@type': 'Answer', text: 'À Saint-Étienne, un peintre facture en moyenne 22–38€/m² pour la peinture intérieure. Les tarifs sont 15 à 20% inférieurs à ceux de Lyon, ce qui en fait l\'un des marchés les plus accessibles de la région.' } },
    { '@type': 'Question', name: 'Comment obtenir des devis peinture gratuits à Saint-Étienne ?', acceptedAnswer: { '@type': 'Answer', text: 'Publiez votre projet sur PremiumArtisan en 2 minutes. Vous recevez jusqu\'à 3 devis de peintres vérifiés à Saint-Étienne sous 24h, gratuitement et sans engagement.' } },
    { '@type': 'Question', name: 'Les artisans couvrent-ils toute la Loire ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui. Nos artisans couvrent Saint-Étienne et les communes de l\'agglomération : Firminy, La Ricamarie, Saint-Chamond, Rive-de-Gier et Roche-la-Molière.' } },
    { '@type': 'Question', name: 'Quel budget pour rénover un appartement à Saint-Étienne ?', acceptedAnswer: { '@type': 'Answer', text: 'La rénovation complète d\'un appartement de 70m² à Saint-Étienne coûte en moyenne entre 2 200€ et 3 500€ pour une peinture standard, contre 2 800€ à 3 800€ à Lyon.' } },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Devis peintre', item: `${BASE_URL}/devis-peintre/dijon` },
    { '@type': 'ListItem', position: 3, name: 'Saint-Étienne', item: PAGE_URL },
  ],
};

const FAQ_ITEMS = [
  { q: 'Quel est le prix d\'un peintre à Saint-Étienne en 2026 ?', a: 'À Saint-Étienne, un peintre facture en moyenne 22–38€/m² pour la peinture intérieure. Les tarifs sont 15 à 20% inférieurs à ceux de Lyon, ce qui en fait l\'un des marchés les plus accessibles de la région Auvergne-Rhône-Alpes. Pour un T3 de 70m², comptez entre 2 200€ et 3 500€.' },
  { q: 'Comment obtenir des devis peinture gratuits à Saint-Étienne ?', a: 'Publiez votre projet sur PremiumArtisan en 2 minutes. Vous recevez jusqu\'à 3 devis de peintres vérifiés à Saint-Étienne sous 24h, gratuitement et sans engagement. Vos coordonnées sont transmises uniquement aux artisans sélectionnés.' },
  { q: 'Les artisans couvrent-ils toute l\'agglomération stéphanoise ?', a: 'Oui. Nos artisans couvrent Saint-Étienne et les communes de l\'agglomération : Firminy, La Ricamarie, Saint-Chamond, Rive-de-Gier, Roche-la-Molière et Le Chambon-Feugerolles.' },
  { q: 'Quel budget pour rénover un appartement à Saint-Étienne ?', a: 'La rénovation complète d\'un appartement de 70m² à Saint-Étienne coûte en moyenne entre 2 200€ et 3 500€ pour une peinture standard. Les logements des années 1950–1970, nombreux à Saint-Étienne, peuvent nécessiter une préparation plus importante des supports.' },
  { q: 'Les artisans peintres sont-ils vérifiés à Saint-Étienne ?', a: 'Oui. Chaque artisan de notre réseau stéphanois est contrôlé : SIRET actif, assurance décennale et RC pro à jour, vérification des références. Note minimale de 4.6/5 requise.' },
  { q: 'Quelle TVA pour les travaux de peinture à Saint-Étienne ?', a: 'Pour les logements de plus de 2 ans à Saint-Étienne, la TVA est de 10% sur la main d\'œuvre et les fournitures. MaPrimeRénov\' peut couvrir une partie des travaux si la peinture est associée à une rénovation énergétique.' },
];

const FEATURES = [
  { icon: Users, title: 'Max 3 artisans par projet', description: 'Vos coordonnées ne sont jamais revendues. PremiumArtisan limite chaque projet à 3 peintres maximum — des interlocuteurs qualifiés, pas du spam.', color: 'from-rose-400 to-pink-500' },
  { icon: Shield, title: 'Artisans vérifiés Loire', description: 'SIRET actif, assurance décennale et RC pro à jour. Chaque artisan est contrôlé avant intégration et réévalué régulièrement sur notre réseau stéphanois.', color: 'from-violet-400 to-purple-500' },
  { icon: Clock, title: 'Réponse sous 24h', description: 'Première réponse sous 24h en semaine. Saint-Étienne bénéficie d\'un réseau d\'artisans couvrant l\'ensemble de l\'agglomération et disponibles rapidement.', color: 'from-amber-400 to-orange-500' },
  { icon: Star, title: 'Note minimale 4.6/5', description: 'Seuls les artisans avec une note minimale de 4.6/5 intègrent notre réseau. Qualité garantie, résultat professionnel à un tarif compétitif.', color: 'from-emerald-400 to-teal-500' },
];

const PRIX_TABLE = [
  { surf: 'Studio 25m²', standard: '700€ – 1 000€', premium: '1 100€ – 1 500€', delai: '2–3 jours' },
  { surf: 'Appartement T2 45m²', standard: '1 200€ – 1 800€', premium: '1 900€ – 2 800€', delai: '3–5 jours' },
  { surf: 'Appartement T3 70m²', standard: '2 200€ – 3 200€', premium: '3 300€ – 4 500€', delai: '5–7 jours' },
  { surf: 'Maison 120m²', standard: '3 500€ – 5 000€', premium: '5 000€ – 7 500€', delai: '8–12 jours' },
  { surf: 'Rénovation complète 90m²', standard: '2 800€ – 4 200€', premium: '4 300€ – 6 500€', delai: '7–10 jours' },
];

const QUARTIERS = [
  { name: 'Centre-ville / Hôtel de Ville', prix: '24–38€/m²', delai: '2–4h' },
  { name: 'Manufacture / Jacquard', prix: '23–36€/m²', delai: '2–4h' },
  { name: 'Bergson / Fauriel', prix: '22–35€/m²', delai: '2–5h' },
  { name: 'Beaubrun / Tarentaize', prix: '22–34€/m²', delai: '3–5h' },
  { name: 'Firminy', prix: '20–32€/m²', delai: '3–6h' },
  { name: 'Saint-Chamond', prix: '21–33€/m²', delai: '3–6h' },
];

const ARTISANS = [
  { initials: 'P.M.', spec: 'Peinture intérieure et rénovation logement social', exp: '18 ans d\'expérience', zone: 'Saint-Étienne centre · Firminy · Roche-la-Molière', note: '4.9/5' },
  { initials: 'C.B.', spec: 'Finitions soignées et ravalement façade', exp: '14 ans d\'expérience', zone: 'Saint-Étienne · Saint-Chamond · Rive-de-Gier', note: '4.8/5' },
  { initials: 'N.V.', spec: 'Remise en état locatif — délai rapide', exp: '10 ans d\'expérience', zone: 'Saint-Étienne · Le Chambon-Feugerolles · La Ricamarie', note: '4.7/5' },
];

function Navigation() {
  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-black text-[#2a0a14]">Premium<span className="text-[#be123c]">Artisan</span></Link>
          <div className="hidden md:flex items-center gap-8">
            {[['Prix', '#prix'], ['Artisans', '#artisans'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-slate-600 hover:text-[#be123c] transition-colors relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#be123c] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <Button className="bg-[#be123c] hover:bg-[#9f1239] text-white shadow-lg shadow-rose-600/25 text-sm" asChild>
            <Link href="/publier-projet/form">Devis gratuit</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0408] via-[#2a0a14] to-[#1a0408]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#be123c]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#be123c]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center lg:text-left">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-4 py-2 bg-white/10 text-white border-white/20 border text-sm font-medium">
                <MapPin className="w-4 h-4 mr-2 inline" />
                Loire · Auvergne-Rhône-Alpes · 172 000 hab.
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
              Peintre à <span className="text-[#fda4af]">Saint-Étienne</span><br />
              <span className="text-white">Devis Gratuit 2026</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/70 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Comparez jusqu'à <strong className="text-white">3 artisans peintres vérifiés</strong> à Saint-Étienne. Prix moyen constaté : <strong className="text-white">22–38€/m²</strong>. Réponse sous 24h, sans engagement.
            </motion.p>
            <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { value: 'Max 3', label: 'Artisans par projet' },
                { value: '24h', label: 'Délai réponse' },
                { value: '100%', label: 'Gratuit' },
                { value: 'Vérifiés', label: 'SIRET + assurances' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60 mt-0.5 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-[#be123c] hover:bg-[#9f1239] text-white shadow-xl shadow-rose-900/40 text-base px-8 h-14" asChild>
                <Link href="/publier-projet/form">Demander mes devis gratuits <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-base px-8 h-14 bg-transparent" asChild>
                <a href="#prix">Voir les prix</a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-white/60">
              {['Sans engagement', 'Coordonnées protégées', 'Anti-spam garanti'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative hidden lg:block">
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/40 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#be123c] to-[#9f1239] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Projet peinture — Saint-Étienne</p>
                    <p className="text-sm text-slate-500">Loire · 42000</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-0">Actif</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#fdf2f5] rounded-2xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Surface estimée</p>
                  <p className="text-2xl font-bold text-slate-900">80 m²</p>
                  <p className="text-xs text-[#be123c] mt-1">Maison années 70</p>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Devis reçus</p>
                  <p className="text-2xl font-bold text-slate-900">3 / 3</p>
                  <p className="text-xs text-emerald-600 mt-1">Sous 24h</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { artisan: 'P.M. — Peinture centre-ville Saint-Étienne', montant: '2 800€', note: '4.9/5' },
                  { artisan: 'C.B. — Finitions soignées Manufacture', montant: '3 200€', note: '4.8/5' },
                  { artisan: 'N.V. — Remise en état Firminy', montant: '2 500€', note: '4.7/5' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.1 }} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{item.artisan}</p>
                      <p className="text-xs text-slate-500">{item.note} · Artisan vérifié</p>
                    </div>
                    <p className="font-bold text-[#be123c] text-sm">{item.montant}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">3 devis reçus</p>
                  <p className="text-xs text-slate-500">Sous 24h · Gratuit</p>
                </div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#be123c]" />
                <span className="text-sm font-bold text-slate-900">SIRET vérifié</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-rose-100 text-[#be123c] border-0">Pourquoi nous choisir</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
            Trouver un peintre fiable à <span className="text-[#be123c]">Saint-Étienne</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            PremiumArtisan sélectionne et vérifie les artisans peintres de Saint-Étienne et de l'agglomération stéphanoise.
          </p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div key={index} variants={scaleIn}>
              <Card className="group h-full bg-white/80 border-slate-100 hover:border-[#fda4af] hover:shadow-xl hover:shadow-rose-600/10 transition-all duration-500">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Prix() {
  return (
    <section id="prix" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#fdf2f5]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-rose-100 text-[#be123c] border-0">Prix indicatifs 2026</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
            Combien coûte la peinture <span className="text-[#be123c]">à Saint-Étienne ?</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Saint-Étienne est l'une des villes les plus accessibles de la région pour les travaux de peinture — tarifs 15 à 20% inférieurs à Lyon.
          </p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Peinture intérieure standard', price: '22–32€', details: ['Main d\'œuvre : 13–19€/m²', 'Fournitures : 6–9€/m²', 'Préparation : 5–7€/m²'], featured: false },
            { label: 'Finitions soignées', price: '30–42€', details: ['Peinture grand teint premium', 'Application 3 couches minimum', 'Ponçage et enduit inclus'], featured: true },
            { label: 'Rénovation complète', price: '38–55€', details: ['Boiseries et plafonds', 'Préparation lourde incluse', 'Garantie résultat'], featured: false },
          ].map((c, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className={`h-full relative transition-all duration-300 hover:-translate-y-1 ${c.featured ? 'border-2 border-[#be123c] shadow-xl shadow-rose-600/20' : 'border-slate-200 hover:border-[#be123c]'}`}>
                {c.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#be123c] text-white border-0 px-4 py-1">Le plus demandé</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-sm font-semibold text-slate-500 mb-2">{c.label}</div>
                  <div className="text-4xl font-black text-slate-900 mb-1">{c.price}</div>
                  <div className="text-sm text-slate-400 mb-5">par m²</div>
                  <div className="space-y-2">
                    {c.details.map((d, j) => (
                      <div key={j} className={`flex items-center gap-2 text-sm text-slate-600 ${j < 2 ? 'border-b border-slate-100 pb-2' : ''}`}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <AnimatedSection>
          <div className="overflow-x-auto rounded-2xl border border-[#e8d0d8] bg-white shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2a0a14] text-white">
                  <th className="px-4 py-4 text-left text-sm font-semibold rounded-tl-2xl">Type de bien</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Peinture standard</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Finitions soignées</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold rounded-tr-2xl">Délai chantier</th>
                </tr>
              </thead>
              <tbody>
                {PRIX_TABLE.map((r, i) => (
                  <tr key={i} className="hover:bg-[#fdf2f5] transition-colors">
                    <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm font-medium text-slate-900">{r.surf}</td>
                    <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm font-bold text-[#be123c]">{r.standard}</td>
                    <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm font-bold text-[#be123c]">{r.premium}</td>
                    <td className="border-b border-[#e8d0d8] px-4 py-3.5 text-sm text-slate-500">{r.delai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">Fourchettes indicatives. Les prix réels dépendent de l'état du support et des finitions choisies.</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Quartiers() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0408] via-[#2a0a14] to-[#1a0408]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#be123c]/20 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border">Quartiers et communes</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Artisans peintres dans toute<br />l'agglomération stéphanoise
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Nos artisans couvrent Saint-Étienne et les communes de l'agglomération — centre-ville, quartiers industriels rénovés et périphérie.
          </p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUARTIERS.map((q, i) => (
            <motion.div key={i} variants={fadeInUp} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 hover:border-[#fda4af] hover:bg-white/10 transition-all duration-300">
              <div className="text-lg font-bold text-white mb-4">{q.name}</div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/50">Prix indicatif</span>
                <span className="font-bold text-[#fda4af]">{q.prix}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Délai réponse</span>
                <span className="font-bold text-[#fda4af]">{q.delai}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Artisans() {
  return (
    <section id="artisans" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-rose-100 text-[#be123c] border-0">Réseau vérifié</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
            Exemples d'artisans disponibles <span className="text-[#be123c]">à Saint-Étienne</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Les profils ci-dessous illustrent le type d'artisans disponibles sur notre réseau stéphanois. SIRET actif, assurances à jour, note minimale de 4.6/5.
          </p>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-3 gap-6">
          {ARTISANS.map((a, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className="h-full border-[#e8d0d8] bg-[#fdf2f5] hover:border-[#be123c] hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-[#2a0a14] to-[#6a0a2c] shrink-0">
                      {a.initials}
                    </div>
                    <div className="text-xs text-[#be123c] font-bold">{a.note} · Artisan vérifié</div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{a.spec}</h3>
                  <p className="text-xs text-slate-500 mb-1">{a.exp}</p>
                  <p className="text-xs text-slate-500 mb-5">{a.zone}</p>
                  <Button className="w-full bg-[#be123c] hover:bg-[#9f1239] text-white text-sm" asChild>
                    <Link href="/publier-projet/form">Demander un devis</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Guide() {
  return (
    <section className="py-24 bg-[#fdf2f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12">
          <Badge className="mb-4 px-4 py-2 bg-rose-100 text-[#be123c] border-0">Guide</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Tout savoir sur la peinture à Saint-Étienne</h2>
        </AnimatedSection>
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
          <div className="space-y-6 text-[15px] leading-relaxed text-slate-600">
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Saint-Étienne : ville en transformation, marché accessible</h3>
              <p>Saint-Étienne, 172 000 habitants, connaît depuis une dizaine d'années une transformation urbaine profonde. Les quartiers Manufacture et Jacquard, anciens hauts lieux de l'industrie textile et de l'armement, sont devenus des zones résidentielles et créatives attractives. Cette reconversion génère une demande soutenue en rénovation de logements anciens — appartements d'ouvriers des années 1920–1950, maisons de maître et immeubles du centre-ville.</p>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Un marché compétitif et accessible</h3>
              <p>Les tarifs des artisans peintres à Saint-Étienne sont parmi les plus compétitifs de la région Auvergne-Rhône-Alpes. Avec une moyenne de 22–38€/m², soit 15 à 20% de moins qu'à Lyon, Saint-Étienne offre un excellent rapport qualité-prix. Les artisans locaux travaillent régulièrement pour des bailleurs sociaux, des propriétaires locatifs et des particuliers souhaitant remettre à neuf leur logement à coût maîtrisé.</p>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Spécificités des logements stéphanois</h3>
              <p>Le parc immobilier stéphanois présente des caractéristiques particulières : nombreux immeubles en briques et pierre, murs anciens nécessitant une préparation soignée avant peinture, plafonds hauts dans les appartements bourgeois du centre-ville. Les artisans de notre réseau sont formés à ces contraintes et proposent des solutions adaptées — enduit de lissage, rebouchage, primaire d'accrochage avant application de la peinture finale.</p>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Aides financières disponibles à Saint-Étienne</h3>
              <p>Les propriétaires à Saint-Étienne peuvent bénéficier de plusieurs dispositifs d'aide : TVA à 10% pour les logements de plus de 2 ans, MaPrimeRénov' pour les travaux associés à une rénovation énergétique, et déduction fiscale des travaux d'entretien pour les propriétaires bailleurs. La Ville de Saint-Étienne propose également des aides locales dans le cadre des programmes de rénovation urbaine — renseignez-vous auprès de la mairie.</p>
            </div>
          </div>
          <div className="space-y-4">
            <Card className="border-[#e8d0d8]">
              <CardContent className="p-6">
                <h4 className="font-black text-slate-900 mb-4">Prix indicatifs Saint-Étienne 2026</h4>
                {[
                  { k: 'Peinture standard', v: '22–32€/m²' },
                  { k: 'Finitions premium', v: '30–42€/m²' },
                  { k: 'Rénovation complète', v: '38–55€/m²' },
                  { k: 'T3 standard (70m²)', v: '2 200–3 200€' },
                  { k: 'Délai réponse', v: 'sous 24h' },
                  { k: 'Artisans max', v: '3 par projet' },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between border-b border-slate-100 py-2 text-sm last:border-0">
                    <span className="text-slate-500">{s.k}</span>
                    <span className="font-bold text-slate-900">{s.v}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-[#e8d0d8]">
              <CardContent className="p-6">
                <h4 className="font-black text-slate-900 mb-4">Villes proches</h4>
                {[
                  { label: 'Peintre Lyon', href: '/devis-peintre/lyon' },
                  { label: 'Peintre Villeurbanne', href: '/devis-peintre/villeurbanne' },
                  { label: 'Peintre Clermont-Ferrand', href: '/devis-peintre/clermont-ferrand' },
                  { label: 'Peintre Grenoble', href: '/devis-peintre/grenoble' },
                ].map((l, i) => (
                  <div key={i} className="flex justify-between py-2 text-sm border-b border-slate-100 last:border-0">
                    <Link href={l.href} className="text-[#be123c] hover:underline">{l.label}</Link>
                    <span className="text-slate-400">→</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 border-0">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">
            Questions <span className="text-[#be123c]">fréquentes</span> — Saint-Étienne
          </h2>
        </AnimatedSection>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
          {FAQ_ITEMS.map((faq, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="border-slate-200 overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-900 pr-4 text-sm">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <motion.div initial={false} animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed">{faq.a}</div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0408] via-[#2a0a14] to-[#1a0408]" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">Obtenez vos devis peinture à Saint-Étienne</h2>
          <p className="text-lg text-white/70 mb-4 max-w-2xl mx-auto">Gratuit, sans engagement. Jusqu'à 3 artisans peintres vérifiés dans la Loire.</p>
          <p className="text-white/50 text-sm mb-10">Une question ? <a href="mailto:contact@premiumartisan.fr" className="text-white font-semibold underline underline-offset-2">contact@premiumartisan.fr</a></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#be123c] hover:bg-[#9f1239] text-white shadow-xl text-lg px-8 h-14" asChild>
              <Link href="/publier-projet/form">Demander mes devis gratuits <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 text-lg px-8 h-14 bg-transparent" asChild>
              <a href="#prix">Voir les prix</a>
            </Button>
          </div>
          <p className="mt-6 text-white/40 text-sm">Sans engagement · 3 artisans max · Anti-spam · Coordonnées protégées</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InternalLinks() {
  const links = [
    { label: 'Peintre Lyon', href: '/devis-peintre/lyon' },
    { label: 'Peintre Villeurbanne', href: '/devis-peintre/villeurbanne' },
    { label: 'Peintre Grenoble', href: '/devis-peintre/grenoble' },
    { label: 'Peintre Clermont-Ferrand', href: '/devis-peintre/clermont-ferrand' },
    { label: 'Peintre Dijon', href: '/devis-peintre/dijon' },
    { label: 'Cuisiniste Lyon', href: '/devis-cuisine/lyon' },
    { label: 'Peintre Marseille', href: '/devis-peintre/marseille' },
    { label: 'Peintre Toulouse', href: '/devis-peintre/toulouse' },
  ];
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Autres villes et services</p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm text-[#be123c] font-medium hover:border-[#be123c] hover:shadow-sm transition-all">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PeintreSaintEtiennePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocal) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Navigation />
        <Hero />
        <Features />
        <Prix />
        <Quartiers />
        <Artisans />
        <Guide />
        <FAQ />
        <CTA />
        <InternalLinks />
      </div>
    </>
  );
}