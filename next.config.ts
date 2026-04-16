import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lfawgdcgvpwbpiyftcfk.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      // ── CUISINE statike → dynamic ──
      { source: "/devis-cuisine-chenove",             destination: "/devis-cuisine/chenove",            permanent: true },
      { source: "/devis-cuisine-dijon",               destination: "/devis-cuisine/dijon",              permanent: true },
      { source: "/devis-cuisine-fontaine-les-dijon",  destination: "/devis-cuisine/fontaine-les-dijon", permanent: true },
      { source: "/devis-cuisine-longvic",             destination: "/devis-cuisine/longvic",            permanent: true },
      { source: "/devis-cuisine-quetigny",            destination: "/devis-cuisine/quetigny",           permanent: true },
      { source: "/devis-cuisine-talant",              destination: "/devis-cuisine/talant",             permanent: true },

      // ── PEINTURE statike → dynamic ──
      { source: "/devis-peinture-chenove",            destination: "/devis-peintre/chenove",            permanent: true },
      { source: "/devis-peinture-dijon",              destination: "/devis-peintre/dijon",              permanent: true },
      { source: "/devis-peinture-longvic",            destination: "/devis-peintre/longvic",            permanent: true },
      { source: "/devis-peinture-quetigny",           destination: "/devis-peintre/quetigny",           permanent: true },
      { source: "/devis-peinture-talant",             destination: "/devis-peintre/talant",             permanent: true },
      { source: "/devis-peinture-fontaine-les-dijon", destination: "/devis-peintre/fontaine-les-dijon", permanent: true },
      { source: "/devis-peinture-marsannay",          destination: "/devis-peintre/marsannay-la-cote",  permanent: true },
      { source: "/devis-peinture-saint-apollinaire",  destination: "/devis-peintre/dijon",              permanent: true },
      { source: "/devis-peinture-chevigny",           destination: "/devis-peintre/dijon",              permanent: true },

      // ── RENOVATION → homepage provisoire ──
      { source: "/devis-renovation",                  destination: "/",                                 permanent: false },
      { source: "/devis-renovation-quetigny",         destination: "/devis-peintre/quetigny",           permanent: false },
      { source: "/devis-renovation-chevigny",         destination: "/devis-peintre/dijon",              permanent: false },
      { source: "/devis-renovation-saint-apollinaire",destination: "/devis-peintre/dijon",              permanent: false },
      { source: "/devis-renovation-fontaine-ouche",   destination: "/devis-peintre/fontaine-les-dijon", permanent: false },
      { source: "/devis-renovation-velars-sur-ouche", destination: "/devis-peintre/dijon",              permanent: false },
      { source: "/devis-renovation-sennecey-les-dij", destination: "/devis-peintre/dijon",              permanent: false },
      { source: "/aides-renovation",                  destination: "/",                                 permanent: false },

      // ── SALLE DE BAIN → homepage provisoire ──
      { source: "/devis-salle-de-bain",               destination: "/",                                 permanent: false },
      { source: "/devis-salle-de-bain-gevrey-chambertin", destination: "/devis-peintre/gevrey-chambertin", permanent: false },
      { source: "/devis-salle-de-bain-ahuy",          destination: "/devis-peintre/dijon",              permanent: false },
      { source: "/devis-salle-de-bain-plombieres-les-dijon", destination: "/devis-peintre/dijon",       permanent: false },
      { source: "/devis-salle-de-bain-daix",          destination: "/devis-peintre/dijon",              permanent: false },
      { source: "/devis-salle-de-bain-marsannay-la-cote", destination: "/devis-peintre/marsannay-la-cote", permanent: false },

      // ── FAQE TЁ TJERA 404 ──
      { source: "/devis-facture-gratuit-peintre-bourgogne", destination: "/",                           permanent: false },
      { source: "/logiciel-devis-peintre-cote-dor",   destination: "/logiciel-devis-artisan/dijon",     permanent: true },
      { source: "/creer-facture-artisan",             destination: "/artisan/dashboard",                permanent: true },
      { source: "/creer-devis-peintre",               destination: "/artisan/dashboard",                permanent: true },
      { source: "/prix-travaux-dijon-2026",           destination: "/devis-peintre/dijon",              permanent: true },
      { source: "/guide-choisir-artisan",             destination: "/",                                 permanent: false },
      { source: "/devis-isolation-dijon",             destination: "/devis-peintre/dijon",              permanent: true },
      { source: "/devis-facade-dijon",                destination: "/devis-peintre/dijon",              permanent: true },
      { source: "/application-devis-peintre",         destination: "/artisan/dashboard",                permanent: true },
    ];
  },
};

export default nextConfig;