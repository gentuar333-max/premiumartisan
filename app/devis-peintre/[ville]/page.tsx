// app/devis-peintre/[ville]/page.tsx
// Keyword group: "devis peintre [ville]", "devis gratuit peintre [ville]", "trouver peintre [ville]"

import type { Metadata } from 'next';
import Link from 'next/link';
import { VILLES_DATA } from '@/app/logiciel-devis-artisan/[ville]/page';
import PublierProjetForm from '@/app/publier-projet/form/PublierProjetForm';

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
    title: `Devis Peintre ${nom} – Comparez 3 Artisans Qualifiés | PremiumArtisan`,
    description: `Obtenez jusqu'à 3 devis de peintres qualifiés à ${nom}. Artisans ${dept} vérifiés, réponse sous 24h, sans engagement. Peinture intérieure, rénovation.`,
    alternates: { canonical: `https://premiumartisan.fr/devis-peintre/${ville}` },
    keywords: `devis peintre ${nom.toLowerCase()}, peintre ${nom.toLowerCase()}, devis peinture ${nom.toLowerCase()}, artisan peintre ${dept.toLowerCase()}, rénovation ${nom.toLowerCase()}`,
    openGraph: {
      title: `Devis Peintre ${nom} – 3 Artisans Qualifiés`,
      description: `Comparez jusqu'à 3 devis de peintres à ${nom}. Réponse sous 24h.`,
      url: `https://premiumartisan.fr/devis-peintre/${ville}`,
      type: 'website',
      locale: 'fr_FR',
      siteName: 'PremiumArtisan',
    },
  };
}

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Devis peintre à ${nom}`,
    "description": `Mise en relation avec des artisans peintres qualifiés à ${nom}, ${dept}.`,
    "provider": { "@type": "Organization", "name": "PremiumArtisan", "url": "https://premiumartisan.fr" },
    "areaServed": { "@type": "City", "name": nom },
    "serviceType": "Mise en relation artisan peintre",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-h-screen bg-white">

        {/* ── HERO ── */}
        <section className="bg-[#2a0a14] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#fda4af] text-sm font-medium mb-3 uppercase tracking-wide">
              {dept} · {region}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Devis Peintre à <span className="text-[#fda4af]">{nom}</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Décrivez votre projet une seule fois. Recevez des devis de 3 peintres locaux 
              à {nom} et dans le {dept}. Gratuit, sans engagement.
            </p>
            <Link href="#formulaire"
              className="inline-flex items-center justify-center rounded-xl bg-[#be123c] px-8 py-4 text-lg font-semibold text-white shadow-xl hover:bg-[#9f1239] transition">
              Demander mes devis gratuits →
            </Link>
            <p className="mt-4 text-sm text-white/40">
              Sans engagement · 3 artisans max · Réponse sous 24h
            </p>
          </div>
        </section>

        {/* ── TRUST ── */}
        <section className="bg-[#fdf2f5] border-b border-[#fda4af]/20 py-5 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-[#6a3a4a] font-medium">
            <span>Artisans vérifiés {dept}</span>
            <span>Max 3 peintres par projet</span>
            <span>Réponse sous 24h</span>
            <span>Coordonnées protégées</span>
            <span>Sans engagement</span>
          </div>
        </section>

        {/* ── FORMULAIRE ── */}
        <section id="formulaire" className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Décrivez votre projet de peinture à {nom}
            </h2>
            <p className="text-center text-gray-500 mb-8">Formulaire en 2 minutes · Réponse sous 24h</p>
            <PublierProjetForm />
          </div>
        </section>

        {/* ── TEXTE SEO ── */}
        <section className="bg-gray-50 py-16 px-4 border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Trouver un peintre à {nom} : comment ça marche ?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              PremiumArtisan met en relation les particuliers de {nom} avec des artisans peintres 
              professionnels du {dept}. Contrairement aux plateformes nationales qui revendent 
              vos coordonnées à des dizaines d'artisans, PremiumArtisan limite chaque projet 
              à 3 peintres maximum. Vous recevez moins de contacts, mais des contacts plus qualifiés.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
              Prix d'un peintre à {nom}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Les tarifs d'un peintre à {nom} varient selon la surface, le type de travaux 
              et l'état du support. En moyenne : 25–45€/m² pour la peinture intérieure, 
              35–60€/m² pour le ravalement de façade. 
              Obtenez jusqu'à 3 devis comparatifs pour connaître le prix exact pour votre chantier.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
              Peinture intérieure et rénovation à {nom}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Les projets de peinture les plus fréquents à {nom} concernent la rénovation 
              d'appartements, la peinture de maisons individuelles, la pose de papier peint, 
              et les travaux de ravalement. Les artisans de {dept} sur PremiumArtisan 
              interviennent sur tous ces types de chantiers.
            </p>
          </div>
        </section>

        {/* ── VILLES VOISINES ── */}
        {voisines.length > 0 && (
          <section className="py-12 px-4 border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Devis peintre dans les communes proches de {nom}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {voisines.map(v => {
                  const vData = VILLES_DATA[v];
                  if (!vData) return null;
                  return (
                    <Link key={v} href={`/devis-peintre/${v}`}
                      className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 text-center hover:border-[#be123c] hover:text-[#be123c] transition">
                      {vData.nom}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ARTISAN ── */}
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

        {/* ── CTA FINAL ── */}
        <section className="bg-[#2a0a14] py-14 px-4 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Obtenez vos devis peinture à {nom}
            </h2>
            <p className="text-white/70 mb-8">
              Gratuit, sans engagement. Jusqu'à 3 artisans peintres qualifiés en {dept}.
            </p>
            <Link href="#formulaire"
              className="inline-flex items-center justify-center rounded-xl bg-[#be123c] px-8 py-4 text-lg font-semibold text-white hover:bg-[#9f1239] transition">
              Demander mes devis →
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}