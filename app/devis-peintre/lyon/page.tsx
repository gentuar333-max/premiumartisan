// app/devis-peintre/lyon/page.tsx
"use client";

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion';
import { MapPin, CheckCircle2, ArrowRight, ChevronDown, Shield, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const BASE_URL = 'https://www.premiumartisan.fr';
const PAGE_URL = `${BASE_URL}/devis-peintre/lyon`;

// ── ANIMATIONS ─────────────────────────────────────────────────────────────
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

// ── SCHEMA JSON-LD ──────────────────────────────────────────────────────────
const schemaLocal = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'PremiumArtisan — Peintre à Lyon',
  image: `${BASE_URL}/og-image.jpg`,
  url: PAGE_URL,
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
  geo: { '@type': 'GeoCoordinates', latitude: '45.7640', longitude: '4.8357' },
  areaServed: { '@type': 'City', name: 'Lyon' },
};
const schemaService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Devis peintre à Lyon',
  description: 'Mise en relation avec des artisans peintres qualifiés à Lyon et dans le Rhône.',
  provider: { '@type': 'Organization', name: 'PremiumArtisan', url: BASE_URL },
  areaServed: { '@type': 'City', name: 'Lyon' },
  serviceType: 'Mise en relation artisan peintre',
};
const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Quel est le prix d\'un peintre à Lyon en 2026 ?', acceptedAnswer: { '@type': 'Answer', text: 'À Lyon, un peintre facture en moyenne 28–45€/m² pour la peinture intérieure. Pour un T3 de 70m², comptez entre 2 800€ et 4 500€. Les finitions premium peuvent atteindre 55–70€/m².' } },
    { '@type': 'Question', name: 'Comment obtenir des devis peinture gratuits à Lyon ?', acceptedAnswer: { '@type': 'Answer', text: 'Publiez votre projet sur PremiumArtisan en 2 minutes. Vous recevez jusqu\'à 3 devis de peintres lyonnais vérifiés sous 24h, gratuitement et sans engagement.' } },
    { '@type': 'Question', name: 'Quels arrondissements couvrent vos artisans peintres à Lyon ?', acceptedAnswer: { '@type': 'Answer', text: 'Nos artisans couvrent l\'ensemble des 9 arrondissements de Lyon ainsi que les communes de la métropole : Villeurbanne, Caluire-et-Cuire, Bron, Vénissieux, Saint-Fons et Saint-Priest.' } },
    { '@type': 'Question', name: 'Les artisans peintres sont-ils vérifiés à Lyon ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui. Chaque artisan est contrôlé : SIRET actif, assurance décennale et RC pro à jour, vérification des références. Note minimale de 4.6/5 requise.' } },
    { '@type': 'Question', name: 'Puis-je bénéficier d\'aides pour des travaux de peinture à Lyon ?', acceptedAnswer: { '@type': 'Answer', text: 'La TVA à 10% s\'applique pour les logements de plus de 2 ans. MaPrimeRénov\' peut couvrir une partie des travaux si la peinture est associée à une rénovation énergétique.' } },
  ],
};
const schemaBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Devis peintre', item: `${BASE_URL}/devis-peintre/dijon` },
    { '@type': 'ListItem', position: 3, name: 'Lyon', item: PAGE_URL },
  ],
};

// ── DATA ────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: 'Quel est le prix d\'un peintre à Lyon en 2026 ?', a: 'À Lyon, un peintre facture en moyenne 28–45€/m² pour la peinture intérieure. Pour un T3 de 70m², comptez entre 2 800€ et 4 500€. Les finitions premium (stuc, laque) peuvent atteindre 55–70€/m². Les travaux dans le Vieux-Lyon ou la Presqu\'île sont généralement 10–15% plus chers en raison des contraintes architecturales.' },
  { q: 'Comment obtenir des devis peinture gratuits à Lyon ?', a: 'Publiez votre projet sur PremiumArtisan en 2 minutes. Vous recevez jusqu\'à 3 devis de peintres lyonnais vérifiés sous 24h, gratuitement et sans engagement. Vos coordonnées sont transmises uniquement aux artisans sélectionnés.' },
  { q: 'Quels arrondissements couvrent vos artisans peintres à Lyon ?', a: 'Nos artisans couvrent l\'ensemble des 9 arrondissements de Lyon. Ils interviennent également dans les communes de la métropole : Villeurbanne, Caluire-et-Cuire, Bron, Vénissieux, Saint-Fons, Tassin-la-Demi-Lune et Saint-Priest.' },
  { q: 'Quel délai pour démarrer un chantier de peinture à Lyon ?', a: 'En moyenne, les premiers devis arrivent sous 24h. Le démarrage du chantier est possible sous 1 à 3 semaines selon la disponibilité de l\'artisan et la complexité du projet. En haute saison (septembre–novembre), prévoyez 2 à 4 semaines.' },
  { q: 'Les artisans peintres sont-ils vérifiés à Lyon ?', a: 'Oui. Chaque artisan de notre réseau lyonnais est contrôlé : SIRET actif, assurance décennale et RC pro à jour, vérification des références. Seuls les artisans avec une note minimale de 4.6/5 intègrent notre réseau.' },
  { q: 'Puis-je bénéficier d\'aides pour des travaux de peinture à Lyon ?', a: 'La TVA à 10% s\'applique pour les logements de plus de 2 ans. MaPrimeRénov\' peut couvrir une partie des travaux si la peinture est associée à un chantier de rénovation énergétique éligible. Les propriétaires bailleurs peuvent déduire les travaux de leurs revenus fonciers.' },
];

const FEATURES = [
  { icon: Users, title: 'Max 3 artisans par projet', description: 'Vos coordonnées ne sont jamais revendues à des dizaines d\'artisans. PremiumArtisan limite chaque projet à 3 peintres maximum — des interlocuteurs qualifiés, pas du spam.', color: 'from-rose-400 to-pink-500' },
  { icon: Shield, title: 'Artisans vérifiés Rhône', description: 'SIRET actif, assurance décennale et RC pro à jour, vérification des références. Chaque artisan est contrôlé avant intégration et réévalué régulièrement.', color: 'from-violet-400 to-purple-500' },
  { icon: Clock, title: 'Réponse sous 24h', description: 'Première réponse garantie sous 24h en semaine. Démarrage possible sous 1 à 3 semaines selon disponibilité. Réactivité maximale pour les urgences.', color: 'from-amber-400 to-orange-500' },
  { icon: Star, title: 'Note minimale 4.6/5', description: 'Seuls les artisans avec une note minimale de 4.6/5 intègrent notre réseau lyonnais. Qualité garantie, résultat professionnel.', color: 'from-emerald-400 to-teal-500' },
];

const PRIX_TABLE = [
  { surf: 'Studio 25m²', standard: '875€ – 1 200€', premium: '1 300€ – 1 800€', delai: '2–3 jours' },
  { surf: 'Appartement T2 45m²', standard: '1 500€ – 2 200€', premium: '2 400€ – 3 500€', delai: '3–5 jours' },
  { surf: 'Appartement T3 70m²', standard: '2 800€ – 3 800€', premium: '4 000€ – 5 500€', delai: '5–7 jours' },
  { surf: 'Maison 120m²', standard: '4 200€ – 6 000€', premium: '6 500€ – 9 500€', delai: '8–12 jours' },
  { surf: 'Rénovation complète 90m²', standard: '3 500€ – 5 200€', premium: '5 500€ – 8 000€', delai: '7–10 jours' },
];

const QUARTIERS = [
  { name: 'Vieux-Lyon / 5ème', prix: '32–50€/m²', delai: '3–6h' },
  { name: 'Presqu\'île / 1er–2ème', prix: '30–48€/m²', delai: '2–5h' },
  { name: 'Croix-Rousse / 4ème', prix: '29–46€/m²', delai: '2–4h' },
  { name: 'Part-Dieu / 3ème', prix: '28–44€/m²', delai: '2–4h' },
  { name: 'Confluence / 2ème', prix: '30–47€/m²', delai: '3–5h' },
  { name: 'Villeurbanne', prix: '27–42€/m²', delai: '2–4h' },
];

const ARTISANS = [
  { initials: 'J.V.', spec: 'Peinture intérieure et rénovation complète', exp: '22 ans d\'expérience', zone: 'Lyon 1–4 · Presqu\'île · Vieux-Lyon', note: '4.9/5' },
  { initials: 'S.R.', spec: 'Finitions soignées et peinture décorative', exp: '14 ans d\'expérience', zone: 'Lyon 6–8 · Villeurbanne · Bron', note: '4.8/5' },
  { initials: 'K.D.', spec: 'Appartements et bailleurs — délai rapide', exp: '11 ans d\'expérience', zone: 'Lyon 3–9 · Vénissieux · Saint-Fons', note: '4.8/5' },
];

// ── NAVIGATION ──────────────────────────────────────────────────────────────
function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-black text-[#2a0a14]">
            Premium<span className="text-[#be123c]">Artisan</span>
          </Link>
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

// ── HERO ────────────────────────────────────────────────────────────────────
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
                Rhône · Auvergne-Rhône-Alpes · 520 000 hab.
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
              Peintre à{' '}
              <span className="text-[#fda4af]">Lyon</span>
              <br />
              <span className="text-white">Devis Gratuit 2026</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-white/70 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Comparez jusqu'à <strong className="text-white">3 artisans peintres vérifiés</strong> à Lyon. Prix moyen constaté : <strong className="text-white">28–45€/m²</strong>. Réponse sous 24h, sans engagement.
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

          {/* CARD HERO */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/40 p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#be123c] to-[#9f1239] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Projet peinture — Lyon</p>
                    <p className="text-sm text-slate-500">Rhône · 69000</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-0">Actif</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#fdf2f5] rounded-2xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Surface estimée</p>
                  <p className="text-2xl font-bold text-slate-900">70 m²</p>
                  <p className="text-xs text-[#be123c] mt-1">Appartement T3</p>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Devis reçus</p>
                  <p className="text-2xl font-bold text-slate-900">3 / 3</p>
                  <p className="text-xs text-emerald-600 mt-1">Sous 24h</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { artisan: 'J.V. — Peinture intérieure Presqu\'île', montant: '3 200€', note: '4.9/5' },
                  { artisan: 'S.R. — Finitions soignées Lyon 6–8', montant: '3 650€', note: '4.8/5' },
                  { artisan: 'K.D. — Rénovation rapide Lyon 3–9', montant: '2 950€', note: '4.8/5' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{item.artisan}</p>
                      <p className="text-xs text-slate-500">{item.note} · Artisan vérifié</p>
                    </div>
                    <p className="font-bold text-[#be123c] text-sm">{item.montant}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
            >
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

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
            >
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

// ── FEATURES ────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-rose-100 text-[#be123c] border-0">Pourquoi nous choisir</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
            Trouver un peintre fiable à <span className="text-[#be123c]">Lyon</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            PremiumArtisan sélectionne et vérifie les artisans peintres de Lyon et de la métropole lyonnaise.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
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

// ── PRIX ────────────────────────────────────────────────────────────────────
function Prix() {
  return (
    <section id="prix" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#fdf2f5]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-rose-100 text-[#be123c] border-0">Prix indicatifs 2026</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
            Combien coûte la peinture <span className="text-[#be123c]">à Lyon ?</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Les fourchettes ci-dessous sont indicatives. Les tarifs varient selon l'état du support, l'accessibilité et le type de finition.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid sm:grid-cols-3 gap-6 mb-12"
        >
          {[
            { label: 'Peinture intérieure standard', price: '28–38€', details: ['Main d\'œuvre : 15–22€/m²', 'Fournitures : 7–10€/m²', 'Préparation : 6–8€/m²'], featured: false },
            { label: 'Finitions soignées', price: '36–48€', details: ['Peinture grand teint premium', 'Application 3 couches minimum', 'Ponçage et enduit inclus'], featured: true },
            { label: 'Rénovation complète', price: '44–65€', details: ['Boiseries et plafonds', 'Préparation lourde incluse', 'Garantie résultat'], featured: false },
          ].map((c, i) => (
            <motion.div key={i} variants={scaleIn}>
              <Card className={`h-full transition-all duration-300 hover:-translate-y-1 ${c.featured ? 'border-2 border-[#be123c] shadow-xl shadow-rose-600/20' : 'border-slate-200 hover:border-[#be123c]'}`}>
                {c.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#be123c] text-white border-0 px-4 py-1">Le plus demandé</Badge>
                  </div>
                )}
                <CardContent className="p-6 relative">
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

// ── QUARTIERS ───────────────────────────────────────────────────────────────
function Quartiers() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0408] via-[#2a0a14] to-[#1a0408]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#be123c]/20 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20 border">Quartiers et communes</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Artisans peintres dans toute<br />la métropole lyonnaise
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Nos artisans couvrent Lyon et les communes de la métropole — du centre-ville aux quartiers périphériques.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
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

// ── ARTISANS ────────────────────────────────────────────────────────────────
function Artisans() {
  return (
    <section id="artisans" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-rose-100 text-[#be123c] border-0">Réseau vérifié</Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
            Exemples d'artisans disponibles <span className="text-[#be123c]">à Lyon</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            PremiumArtisan sélectionne des artisans avec SIRET actif, assurances à jour et note minimale de 4.6/5. Les profils ci-dessous illustrent le type d'artisans disponibles sur notre réseau lyonnais.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid sm:grid-cols-3 gap-6"
        >
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

// ── GUIDE ───────────────────────────────────────────────────────────────────
function Guide() {
  return (
    <section className="py-24 bg-[#fdf2f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12">
          <Badge className="mb-4 px-4 py-2 bg-rose-100 text-[#be123c] border-0">Guide</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Tout savoir sur la peinture à Lyon</h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
          <div className="space-y-6 text-[15px] leading-relaxed text-slate-600">
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Lyon : deuxième métropole, marché artisanal dense</h3>
              <p>Lyon, deuxième métropole économique de France avec 520 000 habitants, concentre une demande soutenue en rénovation de logements anciens. Immeubles haussmanniens de la Presqu'île, traboules du Vieux-Lyon classé au patrimoine mondial de l'UNESCO, résidences des années 1960–1980 dans les arrondissements périphériques — le parc immobilier lyonnais est varié et génère un volume de chantiers important pour les artisans peintres.</p>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Spécificités du marché lyonnais</h3>
              <p>Le Vieux-Lyon (5ème arrondissement) et la Presqu'île (1er et 2ème arrondissements) présentent des contraintes spécifiques : bâtiments classés, travaux de restauration sur boiseries anciennes, peintures à la chaux sur murs en pierre, enduits traditionnels. La Croix-Rousse (4ème arrondissement), quartier historique des canuts, concentre des appartements anciens avec des hauteurs sous plafond importantes nécessitant des échafaudages intérieurs.</p>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Comment préparer son projet de peinture à Lyon ?</h3>
              <p>Avant de publier votre projet, mesurez précisément la surface à peindre (longueur × hauteur des murs, moins les ouvertures), notez l'état actuel des supports (fissures, humidité, ancienne peinture) et définissez vos attentes en termes de finition (mate, satinée, brillante). Ces informations permettent aux artisans de proposer des devis précis et comparables. Un devis sans visite est possible pour les projets simples. Une visite préalable reste recommandée pour les rénovations complexes.</p>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-3">TVA et aides financières à Lyon</h3>
              <p>Pour les logements de plus de 2 ans, la TVA applicable aux travaux de peinture est de 10% (au lieu de 20% pour les constructions neuves). Si les travaux de peinture sont associés à un chantier de rénovation énergétique éligible à MaPrimeRénov', une partie des dépenses peut être subventionnée. Les propriétaires bailleurs peuvent déduire les travaux d'entretien et de réparation de leurs revenus fonciers.</p>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-[#e8d0d8]">
              <CardContent className="p-6">
                <h4 className="font-black text-slate-900 mb-4">Prix indicatifs Lyon 2026</h4>
                {[
                  { k: 'Peinture standard', v: '28–38€/m²' },
                  { k: 'Finitions premium', v: '36–48€/m²' },
                  { k: 'Rénovation complète', v: '44–65€/m²' },
                  { k: 'T3 standard (70m²)', v: '2 800–3 800€' },
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
                <h4 className="font-black text-slate-900 mb-4">Communes proches</h4>
                {[
                  { label: 'Peintre Villeurbanne', href: '/devis-peintre/villeurbanne' },
                  { label: 'Peintre Grenoble', href: '/devis-peintre/grenoble' },
                  { label: 'Peintre Saint-Étienne', href: '/devis-peintre/saint-etienne' },
                  { label: 'Peintre Clermont-Ferrand', href: '/devis-peintre/clermont-ferrand' },
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

// ── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-slate-100 text-slate-700 border-0">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">
            Questions <span className="text-[#be123c]">fréquentes</span> — Lyon
          </h2>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {FAQ_ITEMS.map((faq, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4 text-sm">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
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

// ── CTA ─────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0408] via-[#2a0a14] to-[#1a0408]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Obtenez vos devis peinture à Lyon
          </h2>
          <p className="text-lg text-white/70 mb-4 max-w-2xl mx-auto">
            Gratuit, sans engagement. Jusqu'à 3 artisans peintres vérifiés dans le Rhône.
          </p>
          <p className="text-white/50 text-sm mb-10">
            Une question ? <a href="mailto:contact@premiumartisan.fr" className="text-white font-semibold underline underline-offset-2">contact@premiumartisan.fr</a>
          </p>
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

// ── INTERNAL LINKS ──────────────────────────────────────────────────────────
function InternalLinks() {
  const links = [
    { label: 'Peintre Villeurbanne', href: '/devis-peintre/villeurbanne' },
    { label: 'Peintre Grenoble', href: '/devis-peintre/grenoble' },
    { label: 'Peintre Saint-Étienne', href: '/devis-peintre/saint-etienne' },
    { label: 'Peintre Dijon', href: '/devis-peintre/dijon' },
    { label: 'Peintre Paris', href: '/devis-peintre/paris' },
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

// ── PAGE ────────────────────────────────────────────────────────────────────
export default function PeintreLyonPage() {
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