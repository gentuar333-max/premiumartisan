import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Réceptionniste IA pour Plombiers | Ne ratez plus vos urgences 24h/24 – PremiumArtisan",
  description: "Marie répond à vos appels d'urgence plomberie 24h/24 : fuites, canalisations, chauffe-eau. Collecte adresse et nature du problème. Rapport SMS quotidien.",
  keywords: ["réceptionniste IA plombier", "ne pas rater appel urgence plomberie", "secrétaire virtuelle plombier", "IA téléphonique plombier", "permanence téléphonique plombier", "fuite eau appel manqué"],
  robots: { index: true, follow: true },
  alternates: { canonical: "https://premiumartisan.fr/receptionniste-ia-plombier" },
  openGraph: {
    type: "website",
    url: "https://premiumartisan.fr/receptionniste-ia-plombier",
    title: "Réceptionniste IA pour Plombiers | Ne ratez plus vos urgences – PremiumArtisan",
    description: "Marie répond à vos appels d'urgence plomberie 24h/24 : fuites, canalisations, chauffe-eau. Rapport SMS quotidien.",
    locale: "fr_FR",
    siteName: "PremiumArtisan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Réceptionniste IA pour Plombiers | PremiumArtisan",
    description: "Marie répond à vos appels d'urgence plomberie 24h/24. Ne ratez plus jamais un client.",
  },
}

const FEATURES = [
  "Répond aux appels 24h/24, 7j/7",
  "Collecte adresse, nature et urgence",
  "Rapport SMS chaque soir",
  "Reconnaît famille et clients réguliers",
  "Transcription de chaque appel",
]

const schemaFAQ = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment Marie gère-t-elle les urgences plomberie ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Marie décroche en moins de 3 secondes, collecte l'adresse, la nature du problème (fuite, canalisation bouchée, chauffe-eau en panne) et le niveau d'urgence. Vous recevez un SMS immédiat pour les urgences critiques.",
      },
    },
    {
      "@type": "Question",
      "name": "Un client saura-t-il que c'est une IA ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Marie répond de manière naturelle et professionnelle, indiscernable d'une vraie réceptionniste.",
      },
    },
    {
      "@type": "Question",
      "name": "Combien coûte le service pour un plombier ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'essai est gratuit pendant 14 jours (15 minutes d'appels). Les forfaits commencent à 49€/mois pour 190 minutes. Une urgence récupérée rembourse souvent le mois entier.",
      },
    },
    {
      "@type": "Question",
      "name": "Quels types d'appels Marie gère-t-elle pour un plombier ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fuites d'eau, canalisations bouchées, chauffe-eau en panne, problèmes de chauffage, demandes de devis — Marie collecte toutes les informations et vous les transmet structurées.",
      },
    },
  ],
})

const schemaSoftware = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Marie – Réceptionniste IA PremiumArtisan",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Réceptionniste IA spécialisée pour plombiers. Répond aux urgences 24h/24, collecte les informations et envoie un rapport SMS quotidien.",
  "offers": [
    { "@type": "Offer", "name": "Trial", "price": "0", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Starter", "price": "49", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Pro", "price": "79", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Business", "price": "139", "priceCurrency": "EUR" },
  ],
})

const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg-primary:#09090B;--bg-secondary:#12121A;--bg-tertiary:#1A1A24;--border-subtle:#27273A;--text-primary:#F0EDE6;--text-secondary:#9C9AAF;--text-muted:#5A5A6E;--gold:#D4A853;--gold-light:#E8C878;--gold-dim:#8B7340;--copper:#B87333;--success:#34D399;--warning:#FBBF24;--font-display:'Space Grotesk',sans-serif;--font-body:'Inter',sans-serif;--font-mono:'JetBrains Mono',monospace;--ease-expo:cubic-bezier(0.16,1,0.3,1);--radius:10px}
html{scroll-behavior:smooth}
body{font-family:var(--font-body);background:var(--bg-primary);color:var(--text-primary);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
.container{max-width:1280px;margin:0 auto;padding:0 24px}
@media(min-width:768px){.container{padding:0 48px}}
@media(min-width:1024px){.container{padding:0 64px}}
@keyframes pulseDot{0%,100%{box-shadow:0 0 0 0 rgba(212,168,83,.4)}50%{box-shadow:0 0 0 8px rgba(212,168,83,0)}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 12px rgba(212,168,83,.2)}50%{box-shadow:0 0 24px rgba(212,168,83,.4)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
.reveal{opacity:0;transform:translateY(40px);transition:opacity .8s var(--ease-expo),transform .8s var(--ease-expo)}
.reveal.in{opacity:1;transform:translateY(0)}
.reveal.d1.in{transition-delay:.1s}.reveal.d2.in{transition-delay:.2s}.reveal.d3.in{transition-delay:.3s}.reveal.d4.in{transition-delay:.4s}
.divider{height:1px;background:linear-gradient(90deg,transparent,#27273A,transparent)}
.btn-gold{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display);font-weight:600;font-size:16px;padding:16px 40px;border-radius:var(--radius);background:linear-gradient(135deg,var(--gold),var(--gold-light),var(--copper));color:var(--bg-primary);border:none;cursor:pointer;transition:transform .2s,box-shadow .2s;white-space:nowrap}
.btn-gold:hover{transform:scale(1.02);box-shadow:0 0 24px rgba(212,168,83,.3)}
.btn-outline{display:inline-flex;align-items:center;font-family:var(--font-display);font-weight:600;font-size:16px;padding:16px 32px;border-radius:var(--radius);border:1px solid var(--border-subtle);color:var(--text-primary);background:transparent;transition:border-color .2s,color .2s,background .2s;cursor:pointer}
.btn-outline:hover{border-color:var(--gold-dim);color:var(--gold);background:rgba(212,168,83,.05)}
#nav{position:fixed;top:0;left:0;right:0;z-index:50;height:72px;display:flex;align-items:center;background:rgba(9,9,11,.85);backdrop-filter:blur(16px);border-bottom:1px solid transparent;transition:background .3s,border-color .3s}
#nav.scrolled{background:rgba(9,9,11,.95);border-bottom-color:var(--border-subtle)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;width:100%}
.nav-logo{font-family:var(--font-display);font-weight:700;font-size:16px;letter-spacing:.12em;color:var(--text-primary);transition:color .2s}
.nav-logo:hover{color:var(--gold)}
.nav-links{display:none;list-style:none;align-items:center;gap:32px}
@media(min-width:1024px){.nav-links{display:flex}}
.nav-links a{font-family:var(--font-body);font-weight:500;font-size:14px;color:var(--text-secondary);transition:color .2s}
.nav-links a:hover{color:var(--gold)}
.nav-btn{display:none;font-family:var(--font-display);font-weight:600;font-size:14px;padding:10px 24px;border-radius:var(--radius);background:linear-gradient(135deg,var(--gold),var(--gold-light),var(--copper));color:var(--bg-primary);transition:transform .2s,box-shadow .2s}
@media(min-width:1024px){.nav-btn{display:inline-flex}}
.ham{display:flex;flex-direction:column;gap:5px;background:none;border:none;padding:8px;cursor:pointer}
@media(min-width:1024px){.ham{display:none}}
.ham span{display:block;width:22px;height:2px;background:var(--text-primary);border-radius:2px;transition:transform .3s,opacity .3s}
.ham.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.ham.open span:nth-child(2){opacity:0}
.ham.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
#mob{display:none;position:fixed;inset:0;z-index:40;background:rgba(9,9,11,.95);backdrop-filter:blur(20px);flex-direction:column;align-items:center;justify-content:center;gap:32px}
#mob.open{display:flex}
#mob a{font-family:var(--font-display);font-weight:600;font-size:22px;color:var(--text-secondary);transition:color .2s}
#mob a:hover{color:var(--gold)}
#hero{position:relative;min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
.hero-content{position:relative;z-index:10;max-width:900px;margin:0 auto;text-align:center;padding:160px 24px 80px}
.hero-badge{display:inline-flex;align-items:center;gap:10px;padding:8px 20px;border-radius:999px;border:1px solid var(--gold-dim);background:rgba(212,168,83,.08);margin-bottom:32px;animation:fadeUp .8s .5s var(--ease-expo) both}
.badge-dot{width:8px;height:8px;border-radius:50%;background:var(--gold);animation:pulseDot 2s infinite}
.badge-txt{font-family:var(--font-display);font-weight:500;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
h1{font-family:var(--font-display);font-weight:700;font-size:clamp(40px,7vw,72px);line-height:1.05;letter-spacing:-.03em;color:var(--text-primary);margin-bottom:24px;animation:fadeUp .8s .2s var(--ease-expo) both}
h1 span{color:var(--gold)}
.hero-sub{font-family:var(--font-body);font-size:clamp(17px,2.5vw,20px);line-height:1.7;color:var(--text-secondary);max-width:640px;margin:0 auto 40px;animation:fadeUp .8s .6s var(--ease-expo) both}
.hero-ctas{display:flex;flex-direction:column;align-items:center;gap:16px;margin-bottom:80px;animation:fadeUp .8s .8s var(--ease-expo) both}
@media(min-width:640px){.hero-ctas{flex-direction:row;justify-content:center}}
.stats{display:flex;flex-direction:column;align-items:center;gap:28px;animation:fadeUp .8s 1s var(--ease-expo) both}
@media(min-width:640px){.stats{flex-direction:row;justify-content:center}}
.stat{display:flex;flex-direction:column;align-items:center;padding:0 32px}
@media(min-width:640px){.stat:not(:last-child){border-right:1px solid var(--border-subtle)}}
.stat-n{font-family:var(--font-mono);font-weight:700;font-size:clamp(28px,4vw,36px);color:var(--gold)}
.stat-l{font-family:var(--font-display);font-weight:500;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted)}
.sec{padding:128px 0;background:var(--bg-primary)}
.sec-alt{padding:96px 0;background:var(--bg-secondary)}
.section-tag{display:block;font-family:var(--font-display);font-weight:500;font-size:18px;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin-bottom:16px}
h2{font-family:var(--font-display);font-weight:600;font-size:clamp(28px,4vw,40px);line-height:1.2;letter-spacing:-.01em;color:var(--text-primary);margin-bottom:16px}
.sec-sub{font-family:var(--font-body);font-size:clamp(16px,2vw,20px);line-height:1.7;color:var(--text-secondary)}
.sec-hdr{text-align:center;margin-bottom:64px}
.sec-hdr .sec-sub{max-width:640px;margin:0 auto}
.cards3{display:grid;grid-template-columns:1fr;gap:24px}
@media(min-width:768px){.cards3{grid-template-columns:repeat(3,1fr)}}
.card{background:var(--bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:32px;transition:border-color .25s,transform .25s,box-shadow .25s}
.sec-alt .card{background:var(--bg-primary)}
.card:hover{border-color:rgba(212,168,83,.2);transform:translateY(-4px);box-shadow:0 8px 32px rgba(0,0,0,.3)}
.card-icon{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(212,168,83,.08);border:1px solid var(--gold-dim);margin-bottom:24px;animation:pulseGlow 3s ease-in-out infinite}
.card-icon svg{color:var(--gold)}
.card-h3{font-family:var(--font-display);font-weight:600;font-size:clamp(20px,2.5vw,28px);line-height:1.3;color:var(--text-primary);margin-bottom:12px}
.card-p{font-family:var(--font-body);font-size:clamp(14px,1.5vw,16px);line-height:1.7;color:var(--text-secondary)}
.metiers{display:grid;grid-template-columns:1fr;gap:16px}
@media(min-width:640px){.metiers{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.metiers{grid-template-columns:repeat(3,1fr)}}
.metier-card{display:flex;align-items:center;gap:16px;padding:20px 24px;border-radius:12px;border:1px solid var(--border-subtle);background:var(--bg-secondary);transition:border-color .2s,transform .2s}
.metier-card:hover{border-color:var(--gold-dim);transform:translateY(-2px)}
.metier-card.active{border-color:var(--gold-dim);background:var(--bg-tertiary)}
.metier-icon{font-size:28px;flex-shrink:0}
.metier-label{font-family:var(--font-display);font-weight:600;font-size:16px;color:var(--text-primary)}
.metier-sub{font-family:var(--font-body);font-size:13px;color:var(--text-muted);margin-top:2px}
.plans{display:grid;grid-template-columns:1fr;gap:20px}
@media(min-width:640px){.plans{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1280px){.plans{grid-template-columns:repeat(4,1fr)}}
.plan{position:relative;background:var(--bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:24px;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s,border-color .25s}
.plan:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.35)}
.plan.hot{background:var(--bg-tertiary);border-color:var(--gold-dim);box-shadow:0 0 40px rgba(212,168,83,.08)}
.plan-badge{position:absolute;top:-12px;right:16px;font-family:var(--font-display);font-weight:600;font-size:10px;letter-spacing:.08em;text-transform:uppercase;padding:4px 12px;border-radius:999px}
.plan-badge.gold{background:var(--gold);color:var(--bg-primary)}
.plan-badge.trial{background:rgba(251,191,36,.15);color:var(--warning)}
.pname{font-family:var(--font-display);font-weight:600;font-size:24px;color:var(--text-primary);margin-bottom:8px}
.pprice{display:flex;align-items:baseline;gap:4px;margin-bottom:4px}
.pamount{font-family:var(--font-mono);font-weight:700;font-size:40px;color:var(--gold)}
.pper{font-family:var(--font-body);font-size:14px;color:var(--text-muted)}
.pmins{font-family:var(--font-body);font-size:15px;color:var(--text-secondary);margin-bottom:4px}
.pperiod{font-family:var(--font-body);font-size:13px;color:var(--text-muted);min-height:20px}
.pdiv{height:1px;background:var(--border-subtle);margin:16px 0}
.pfeatures{list-style:none;display:flex;flex-direction:column;gap:12px;flex:1;margin-bottom:24px}
.pfeat{display:flex;align-items:flex-start;gap:10px;font-family:var(--font-body);font-size:14px;color:var(--text-secondary)}
.chk{color:var(--success);flex-shrink:0;margin-top:1px}
.pbtn-gold{width:100%;font-family:var(--font-display);font-weight:600;font-size:14px;padding:13px;border-radius:10px;background:linear-gradient(135deg,var(--gold),var(--gold-light),var(--copper));color:var(--bg-primary);border:none;cursor:pointer;transition:transform .2s,box-shadow .2s;display:block;text-align:center}
.pbtn-gold:hover{transform:scale(1.02);box-shadow:0 0 24px rgba(212,168,83,.3)}
.pbtn-out{width:100%;font-family:var(--font-display);font-weight:600;font-size:14px;padding:13px;border-radius:10px;border:1px solid var(--border-subtle);color:var(--text-primary);background:transparent;cursor:pointer;transition:border-color .2s,color .2s,background .2s;display:block;text-align:center}
.pbtn-out:hover{border-color:var(--gold-dim);color:var(--gold);background:rgba(212,168,83,.05)}
#cta{position:relative;padding:128px 0;background:var(--bg-primary);text-align:center;overflow:hidden}
.cta-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(212,168,83,.03) 0%,transparent 60%)}
.cta-h2{font-family:var(--font-display);font-weight:600;font-size:clamp(28px,4vw,40px);line-height:1.2;letter-spacing:-.01em;color:var(--text-primary);margin-bottom:16px}
.cta-sub{font-family:var(--font-body);font-size:clamp(17px,2vw,20px);line-height:1.7;color:var(--text-secondary);max-width:540px;margin:0 auto 40px}
footer{background:var(--bg-secondary);border-top:1px solid var(--border-subtle)}
.foot-grid{display:grid;grid-template-columns:1fr;gap:48px;padding-top:64px;padding-bottom:32px}
@media(min-width:768px){.foot-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.foot-grid{grid-template-columns:2fr 1fr 1fr 1fr;gap:32px}}
.foot-logo{font-family:var(--font-display);font-weight:700;font-size:16px;letter-spacing:.12em;color:var(--text-primary);transition:color .2s}
.foot-logo:hover{color:var(--gold)}
.foot-desc{margin-top:16px;font-family:var(--font-body);font-size:14px;line-height:1.7;color:var(--text-muted)}
.foot-ttl{font-family:var(--font-display);font-weight:500;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:16px}
.foot-list{list-style:none;display:flex;flex-direction:column;gap:12px}
.foot-list a{font-family:var(--font-body);font-size:14px;color:var(--text-muted);transition:color .2s}
.foot-list a:hover{color:var(--text-secondary)}
.foot-bot{border-top:1px solid var(--border-subtle);padding:32px 0;display:flex;flex-direction:column;align-items:center;gap:16px}
@media(min-width:768px){.foot-bot{flex-direction:row;justify-content:space-between}}
.foot-copy{font-family:var(--font-display);font-size:12px;letter-spacing:.06em;color:var(--text-muted)}
`

const js = `
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>80),{passive:true});
const ham=document.getElementById('ham');
const mob=document.getElementById('mob');
if(ham&&mob){
  ham.addEventListener('click',()=>{
    const o=mob.classList.toggle('open');
    ham.classList.toggle('open',o);
    ham.setAttribute('aria-expanded',String(o));
    document.body.style.overflow=o?'hidden':'';
  });
  mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    mob.classList.remove('open');ham.classList.remove('open');
    ham.setAttribute('aria-expanded','false');document.body.style.overflow='';
  }));
}
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
`

function Chk() {
  return (
    <svg className="chk" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
  )
}

export default function ReceptionnisteIAPlombierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaSoftware }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaFAQ }} />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav id="nav" role="navigation" aria-label="Navigation principale">
        <div className="container nav-inner">
          <a href="/" className="nav-logo" aria-label="PremiumArtisan — Accueil">PREMIUMARTISAN</a>
          <ul className="nav-links" role="list">
            <li><a href="/receptionniste-ia-plombier#solution">Fonctionnalités</a></li>
            <li><a href="/receptionniste-ia-plombier#tarifs">Tarifs</a></li>
            <li><a href="/artisan/login">Démarrer</a></li>
          </ul>
          <a href="/artisan/login" className="nav-btn">Démarrer</a>
          <button className="ham" id="ham" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mob">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div id="mob" role="dialog" aria-label="Menu" aria-modal="true">
        <a href="/receptionniste-ia-plombier#solution">Fonctionnalités</a>
        <a href="/receptionniste-ia-plombier#tarifs">Tarifs</a>
        <a href="/artisan/login" className="btn-gold" style={{marginTop:"16px"}}>Démarrer</a>
      </div>

      <main id="main">

        {/* HERO */}
        <section id="hero" aria-labelledby="h1">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              <span className="badge-txt">Réceptionniste IA — Plombiers</span>
            </div>
            <h1 id="h1">Ne ratez plus<br /><span>aucune urgence</span> plomberie.</h1>
            <p className="hero-sub">En plein chantier, impossible de décrocher. Marie répond à votre place, collecte l&apos;adresse et la nature du problème, et vous envoie un SMS. Le client est rassuré. Vous ne perdez plus rien.</p>
            <div className="hero-ctas">
              <a href="/artisan/login" className="btn-gold">Démarrer mon essai gratuit</a>
              <a href="/receptionniste-ia-plombier#tarifs" className="btn-outline">Voir les tarifs</a>
            </div>
            <div className="stats" aria-label="Chiffres clés">
              <div className="stat">
                <span className="stat-n">24/7</span>
                <span className="stat-l">Disponibilité</span>
              </div>
              <div className="stat">
                <span className="stat-n">3 sec</span>
                <span className="stat-l">Temps de décrochage</span>
              </div>
              <div className="stat">
                <span className="stat-n">150€</span>
                <span className="stat-l">Urgence récupérée moyenne</span>
              </div>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* SOLUTION */}
        <section className="sec-alt" id="solution" aria-labelledby="sol-h2">
          <div className="container">
            <div className="sec-hdr">
              <span className="section-tag reveal">Comment ça marche</span>
              <h2 id="sol-h2" className="reveal d1">Marie gère vos urgences pendant que vous intervenez</h2>
              <p className="sec-sub reveal d2">Fuite, canalisation bouchée, chauffe-eau en panne — Marie collecte tout et vous transmet l&apos;essentiel.</p>
            </div>
            <div className="cards3">
              <article className="card reveal d1">
                <div className="card-icon" aria-hidden="true">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <h3 className="card-h3">Décroche en 3 secondes</h3>
                <p className="card-p">Le client ne tombe jamais sur un répondeur. Marie décroche immédiatement, rassure et engage la conversation.</p>
              </article>
              <article className="card reveal d2">
                <div className="card-icon" aria-hidden="true">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <h3 className="card-h3">Collecte adresse et urgence</h3>
                <p className="card-p">Nature du problème, adresse, numéro de rappel, niveau d&apos;urgence — tout est structuré et prêt pour votre décision.</p>
              </article>
              <article className="card reveal d3">
                <div className="card-icon" aria-hidden="true">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                  </svg>
                </div>
                <h3 className="card-h3">SMS immédiat pour les urgences</h3>
                <p className="card-p">Fuite importante ? Marie vous envoie un SMS en temps réel. Vous décidez si vous intervenez ou rappellez entre deux chantiers.</p>
              </article>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* PAR METIER */}
        <section className="sec" aria-labelledby="metiers-h2">
          <div className="container">
            <div className="sec-hdr">
              <span className="section-tag reveal">Par métier</span>
              <h2 id="metiers-h2" className="reveal d1">Marie s&apos;adapte à chaque artisan</h2>
              <p className="sec-sub reveal d2">Une réceptionniste IA pensée pour les spécificités de chaque métier.</p>
            </div>
            <div className="metiers">
              <div className="metier-card active reveal d1">
                <span className="metier-icon">🔧</span>
                <div>
                  <div className="metier-label">Plombier</div>
                  <div className="metier-sub">Urgences, fuites, chauffe-eau</div>
                </div>
              </div>
              <a href="/receptionniste-ia-artisan" className="metier-card reveal d2">
                <span className="metier-icon">🎨</span>
                <div>
                  <div className="metier-label">Peintre</div>
                  <div className="metier-sub">Devis, disponibilités, projets</div>
                </div>
              </a>
              <a href="/receptionniste-ia-artisan" className="metier-card reveal d3">
                <span className="metier-icon">🧱</span>
                <div>
                  <div className="metier-label">Maçon</div>
                  <div className="metier-sub">Chantiers, devis, planning</div>
                </div>
              </a>
            </div>
            <p style={{textAlign:"center",marginTop:"32px",fontFamily:"var(--font-body)",fontSize:"14px",color:"var(--text-muted)"}}>
              Voir tous les métiers sur <a href="/receptionniste-ia-artisan" style={{color:"var(--gold)"}}>la page principale Marie</a>
            </p>
          </div>
        </section>

        <div className="divider"></div>

        {/* PRICING */}
        <section className="sec-alt" id="tarifs" aria-labelledby="price-h2">
          <div className="container">
            <div className="sec-hdr">
              <span className="section-tag reveal">Tarifs</span>
              <h2 id="price-h2" className="reveal d1">Une urgence récupérée rembourse le mois</h2>
              <p className="sec-sub reveal d2">Commencez gratuitement. Une intervention urgente facturée 150–400€ couvre largement l&apos;abonnement.</p>
            </div>
            <div className="plans">
              <div className="plan reveal d1">
                <span className="plan-badge trial">14 jours</span>
                <div className="pname">Trial</div>
                <div className="pprice"><span className="pamount">€0</span></div>
                <div className="pmins">15 min / 14 jours</div>
                <div className="pperiod">Sans carte bancaire</div>
                <div className="pdiv"></div>
                <ul className="pfeatures">{FEATURES.map(f => <li key={f} className="pfeat"><Chk />{f}</li>)}</ul>
                <a href="/artisan/login" className="pbtn-out">Essai gratuit</a>
              </div>
              <div className="plan reveal d2">
                <div className="pname">Starter</div>
                <div className="pprice"><span className="pamount">€49</span><span className="pper">/mois</span></div>
                <div className="pmins">190 min / mois</div>
                <div className="pperiod">&nbsp;</div>
                <div className="pdiv"></div>
                <ul className="pfeatures">{FEATURES.map(f => <li key={f} className="pfeat"><Chk />{f}</li>)}</ul>
                <a href="/artisan/login" className="pbtn-gold">Choisir</a>
              </div>
              <div className="plan hot reveal d3">
                <span className="plan-badge gold">Le plus populaire</span>
                <div className="pname">Pro</div>
                <div className="pprice"><span className="pamount">€79</span><span className="pper">/mois</span></div>
                <div className="pmins">310 min / mois</div>
                <div className="pperiod">&nbsp;</div>
                <div className="pdiv"></div>
                <ul className="pfeatures">{FEATURES.map(f => <li key={f} className="pfeat"><Chk />{f}</li>)}</ul>
                <a href="/artisan/login" className="pbtn-gold">Choisir</a>
              </div>
              <div className="plan reveal d4">
                <div className="pname">Business</div>
                <div className="pprice"><span className="pamount">€139</span><span className="pper">/mois</span></div>
                <div className="pmins">560 min / mois</div>
                <div className="pperiod">&nbsp;</div>
                <div className="pdiv"></div>
                <ul className="pfeatures">{FEATURES.map(f => <li key={f} className="pfeat"><Chk />{f}</li>)}</ul>
                <a href="/artisan/login" className="pbtn-out">Choisir</a>
              </div>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* FAQ */}
        <section className="sec" aria-labelledby="faq-h2">
          <div className="container" style={{maxWidth:"720px"}}>
            <div className="sec-hdr">
              <span className="section-tag reveal">FAQ</span>
              <h2 id="faq-h2" className="reveal d1">Questions fréquentes</h2>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"24px"}}>
              {[
                { q: "Comment Marie gère-t-elle les urgences plomberie ?", a: "Marie décroche en moins de 3 secondes, collecte l'adresse, la nature du problème et le niveau d'urgence. Vous recevez un SMS immédiat pour les urgences critiques." },
                { q: "Un client saura-t-il que c'est une IA ?", a: "Non. Marie répond de manière naturelle et professionnelle, indiscernable d'une vraie réceptionniste." },
                { q: "Combien coûte le service pour un plombier ?", a: "L'essai est gratuit 14 jours. Les forfaits commencent à 49€/mois. Une urgence récupérée (150–400€) rembourse souvent le mois entier." },
                { q: "Quels types d'appels Marie gère-t-elle ?", a: "Fuites d'eau, canalisations bouchées, chauffe-eau en panne, problèmes de chauffage, demandes de devis — tout est collecté et transmis structuré." },
              ].map(({ q, a }) => (
                <div key={q} className="card reveal">
                  <h3 className="card-h3" style={{fontSize:"18px",marginBottom:"8px"}}>{q}</h3>
                  <p className="card-p">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* CTA */}
        <section id="cta" aria-labelledby="cta-h2">
          <div className="cta-glow" aria-hidden="true"></div>
          <div className="container" style={{position:"relative",zIndex:1}}>
            <h2 className="cta-h2 reveal" id="cta-h2">Prêt à ne plus rater une urgence ?</h2>
            <p className="cta-sub reveal d1">14 jours gratuits. Aucune carte bancaire requise. Mise en place en 5 minutes.</p>
            <a href="/artisan/login" className="btn-gold reveal d2">Démarrer mon essai gratuit</a>
          </div>
        </section>

      </main>

      <footer role="contentinfo">
        <div className="container">
          <div className="foot-grid">
            <div>
              <a href="/" className="foot-logo">PREMIUMARTISAN</a>
              <p className="foot-desc">Réceptionniste IA pour plombiers. Marie répond à vos urgences 24h/24, collecte les informations et vous envoie un SMS immédiat. Ne perdez plus jamais un client.</p>
            </div>
            <nav aria-label="Navigation produit">
              <div className="foot-ttl">Produit</div>
              <ul className="foot-list">
                <li><a href="/receptionniste-ia-artisan">Tous les métiers</a></li>
                <li><a href="/receptionniste-ia-plombier#tarifs">Tarifs</a></li>
                <li><a href="/artisan/login">Démarrer</a></li>
              </ul>
            </nav>
            <nav aria-label="Liens légaux">
              <div className="foot-ttl">Légaux</div>
              <ul className="foot-list">
                <li><a href="/mentions-legales">Mentions légales</a></li>
                <li><a href="/privacy">Confidentialité</a></li>
                <li><a href="/terms">CGU</a></li>
              </ul>
            </nav>
            <div>
              <div className="foot-ttl">Contact</div>
              <ul className="foot-list">
                <li><a href="mailto:contact@premiumartisan.fr">contact@premiumartisan.fr</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bot">
            <span className="foot-copy">&copy; 2026 PremiumArtisan.fr — Tous droits réservés</span>
          </div>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: js }} />
    </>
  )
}