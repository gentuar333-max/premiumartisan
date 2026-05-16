import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Réceptionniste IA pour Artisans | Marie répond 24h/24 – PremiumArtisan",
  description: "Marie répond à vos appels 24h/24, voix naturelle et professionnelle. Collecte les infos client, rapport quotidien. Ne manquez plus jamais un appel.",
  keywords: ["réceptionniste IA artisan", "répondre appels artisan", "secrétaire virtuelle artisan", "IA téléphonique artisan", "ne plus manquer appel client", "rapport SMS artisan"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.premiumartisan.fr/receptionniste-ia-artisan",
    title: "Réceptionniste IA pour Artisans | Marie répond 24h/24 – PremiumArtisan",
    description: "Marie répond à vos appels 24h/24. Ne manquez plus jamais un appel. Essai gratuit 15 min.",
    images: [{ url: "https://www.premiumartisan.fr/og-image.jpg", width: 1200, height: 630 }],
    locale: "fr_FR",
    siteName: "PremiumArtisan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Réceptionniste IA pour Artisans | PremiumArtisan",
    description: "Marie répond à vos appels 24h/24. Ne manquez plus jamais un appel. Essai gratuit 15 min.",
    images: ["https://www.premiumartisan.fr/og-image.jpg"],
  },
}

const FEATURES = [
  "Répond à vos appels 24h/24, 7j/7",
  "Rapport SMS chaque jour",
  "Historique complet de vos appels",
  "Reconnaît famille et employés",
  "Transcription de chaque conversation",
]

const schemaOrg = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PremiumArtisan",
  "url": "https://www.premiumartisan.fr",
  "description": "Réceptionniste IA pour artisans. Marie répond à vos appels 24h/24 et envoie un rapport SMS quotidien.",
  "contactPoint": { "@type": "ContactPoint", "contactType": "customer support", "availableLanguage": "French" },
})

const schemaSoftware = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Marie – Réceptionniste IA PremiumArtisan",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Marie est une réceptionniste IA disponible 24h/24 qui répond aux appels des artisans, collecte les informations clients et envoie un rapport SMS quotidien.",
  "offers": [
    { "@type": "Offer", "name": "Trial", "price": "0", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Starter", "price": "49", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Pro", "price": "79", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Business", "price": "139", "priceCurrency": "EUR" },
  ],
})

const schemaFAQ = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Comment fonctionne la réceptionniste IA Marie ?", "acceptedAnswer": { "@type": "Answer", "text": "Marie répond automatiquement à vos appels 24h/24. Elle collecte le nom, le motif et les coordonnées de chaque appelant, puis vous envoie un rapport SMS quotidien récapitulatif." } },
    { "@type": "Question", "name": "Y a-t-il un essai gratuit ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui. PremiumArtisan propose un essai gratuit de 14 jours avec 15 minutes d'appels, sans carte bancaire requise." } },
    { "@type": "Question", "name": "Mes clients sauront-ils que c'est une IA ?", "acceptedAnswer": { "@type": "Answer", "text": "Non. Marie sonne de manière naturelle et professionnelle." } },
    { "@type": "Question", "name": "Quels artisans peuvent utiliser ce service ?", "acceptedAnswer": { "@type": "Answer", "text": "Plombiers, électriciens, menuisiers, serruriers, peintres, maçons — tout artisan qui reçoit des appels téléphoniques peut bénéficier de Marie." } },
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
@keyframes bgPulse{0%,100%{opacity:.02}50%{opacity:.04}}
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
.hero-overlay{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 0%,#09090B 80%)}
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
.pain-grid{display:grid;grid-template-columns:1fr;gap:48px;align-items:center}
@media(min-width:1024px){.pain-grid{grid-template-columns:60% 40%;gap:64px}}
.pain-list{list-style:none;display:flex;flex-direction:column;gap:16px;margin-top:32px}
.pain-item{display:flex;align-items:flex-start;gap:12px}
.pain-item svg{flex-shrink:0;margin-top:2px;color:var(--text-muted)}
.pain-item span{font-family:var(--font-body);font-size:15px;color:var(--text-secondary);line-height:1.6}
.pain-ph{width:100%;min-height:280px;border-radius:16px;background:linear-gradient(135deg,var(--bg-secondary),var(--bg-tertiary));border:1px solid var(--border-subtle);display:flex;align-items:center;justify-content:center}
.float-card{position:absolute;bottom:-24px;right:16px;background:var(--bg-secondary);border:1px solid var(--gold-dim);border-radius:12px;padding:20px 24px;box-shadow:0 8px 32px rgba(0,0,0,.5)}
.float-n{font-family:var(--font-mono);font-weight:700;font-size:32px;color:var(--gold)}
.float-l{font-family:var(--font-body);font-size:12px;color:var(--text-secondary)}
.cards3{display:grid;grid-template-columns:1fr;gap:24px}
@media(min-width:768px){.cards3{grid-template-columns:repeat(3,1fr)}}
.card{background:var(--bg-secondary);border:1px solid var(--border-subtle);border-radius:12px;padding:32px;transition:border-color .25s,transform .25s,box-shadow .25s}
.sec-alt .card{background:var(--bg-primary)}
.card:hover{border-color:rgba(212,168,83,.2);transform:translateY(-4px);box-shadow:0 8px 32px rgba(0,0,0,.3)}
.card-icon{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(212,168,83,.08);border:1px solid var(--gold-dim);margin-bottom:24px;animation:pulseGlow 3s ease-in-out infinite}
.card-icon svg{color:var(--gold)}
.card-h3{font-family:var(--font-display);font-weight:600;font-size:clamp(20px,2.5vw,28px);line-height:1.3;color:var(--text-primary);margin-bottom:12px}
.card-p{font-family:var(--font-body);font-size:clamp(14px,1.5vw,16px);line-height:1.7;color:var(--text-secondary)}
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
.cta-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(212,168,83,.03) 0%,transparent 60%);animation:bgPulse 4s ease-in-out infinite}
.cta-h2{font-family:var(--font-display);font-weight:600;font-size:clamp(28px,4vw,40px);line-height:1.2;letter-spacing:-.01em;color:var(--text-primary);margin-bottom:16px}
.cta-sub{font-family:var(--font-body);font-size:clamp(17px,2vw,20px);line-height:1.7;color:var(--text-secondary);max-width:540px;margin:0 auto 40px}
.cta-note{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:24px;font-family:var(--font-display);font-weight:500;font-size:12px;letter-spacing:.06em;color:var(--text-muted)}
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
.foot-soc{display:flex;gap:24px}
.foot-soc a{font-family:var(--font-display);font-size:12px;color:var(--text-muted);transition:color .2s}
.foot-soc a:hover{color:var(--text-secondary)}
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

function XIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  )
}

export default function ReceptionnisteIAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaOrg }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaSoftware }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaFAQ }} />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav id="nav" role="navigation" aria-label="Navigation principale">
        <div className="container nav-inner">
          <a href="/" className="nav-logo" aria-label="PremiumArtisan — Accueil">PREMIUMARTISAN</a>
          <ul className="nav-links" role="list">
            <li><a href="/receptionniste-ia-artisan#solution">Fonctionnalités</a></li>
            <li><a href="/receptionniste-ia-artisan#tarifs">Tarifs</a></li>
            <li><a href="/artisan/login">Démarrer</a></li>
          </ul>
          <a href="/artisan/login" className="nav-btn">Démarrer</a>
          <button className="ham" id="ham" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mob">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div id="mob" role="dialog" aria-label="Menu" aria-modal="true">
        <a href="/receptionniste-ia-artisan#solution">Fonctionnalités</a>
        <a href="/receptionniste-ia-artisan#tarifs">Tarifs</a>
        <a href="/artisan/login" className="btn-gold" style={{marginTop:"16px"}}>Démarrer</a>
      </div>

      <main id="main">

        {/* HERO */}
        <section id="hero" aria-labelledby="h1">
          <div className="hero-overlay" aria-hidden="true"></div>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              <span className="badge-txt">IA Réceptionniste pour Artisans</span>
            </div>
            <h1 id="h1">Ne manquez plus<br /><span>jamais</span> un appel.</h1>
            <p className="hero-sub">Marie, votre réceptionniste IA, répond aux appels que vous ne pouvez pas prendre. Elle collecte les informations et vous envoie un rapport SMS quotidien. Disponible 24h/24.</p>
            <div className="hero-ctas">
              <a href="/artisan/login" className="btn-gold">Démarrer mon essai gratuit</a>
              <a href="/receptionniste-ia-artisan#tarifs" className="btn-outline">Voir les tarifs</a>
            </div>
            <div className="stats" aria-label="Chiffres clés PremiumArtisan">
              <div className="stat">
                <span className="stat-n">24/7</span>
                <span className="stat-l">Disponibilité</span>
              </div>
              <div className="stat">
                <span className="stat-n">98%</span>
                <span className="stat-l">Taux de satisfaction</span>
              </div>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* PROBLEM */}
        <section className="sec" aria-labelledby="pain-h2">
          <div className="container">
            <div className="pain-grid">
              <div>
                <span className="section-tag reveal">Le Problème</span>
                <h2 id="pain-h2" className="reveal d1">Chaque appel manqué est un client perdu</h2>
                <p className="sec-sub reveal d2">Les artisans perdent en moyenne 35% de leurs appels entrants. En plein chantier, en conduisant, ou simplement occupé — impossible de répondre à chaque fois. Chaque appel sans réponse, c&apos;est un client potentiel qui appelle le concurrent suivant.</p>
                <ul className="pain-list">
                  <li className="pain-item reveal d2"><XIcon /><span>35% des appels entrants ne sont jamais décrochés</span></li>
                  <li className="pain-item reveal d3"><XIcon /><span>Un client sans réponse appelle 2,3 autres artisans en moyenne</span></li>
                  <li className="pain-item reveal d4"><XIcon /><span>Le temps perdu à rappeler coûte 4h/semaine en moyenne</span></li>
                </ul>
              </div>
              <div className="pain-visual reveal d2" style={{position:"relative"}}>
                <div className="pain-ph" aria-hidden="true">
                  <svg width="80" height="80" fill="none" stroke="var(--gold-dim)" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <div className="float-card">
                  <div className="float-n">35%</div>
                  <div className="float-l">d&apos;appels manqués</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* SOLUTION */}
        <section className="sec-alt" id="solution" aria-labelledby="sol-h2">
          <div className="container">
            <div className="sec-hdr">
              <span className="section-tag reveal">La Solution</span>
              <h2 id="sol-h2" className="reveal d1">Votre IA réceptionniste travaille 24h/24</h2>
              <p className="sec-sub reveal d2">Elle répond, collecte les informations, envoie un rapport SMS chaque jour. Vous récupérez chaque opportunité.</p>
            </div>
            <div className="cards3">
              <article className="card reveal d1">
                <div className="card-icon" aria-hidden="true">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <h3 className="card-h3">Répond aux appels</h3>
                <p className="card-p">Votre IA décroche en moins de 3 secondes, 24h/24 et 7j/7. Plus jamais de tonalité d&apos;occupée ni de boîte vocale.</p>
              </article>
              <article className="card reveal d2">
                <div className="card-icon" aria-hidden="true">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <h3 className="card-h3">Collecte les informations</h3>
                <p className="card-p">Elle pose les bonnes questions : nom, numéro, type de travaux, urgence. Vous recevez un résumé structuré de chaque appel.</p>
              </article>
              <article className="card reveal d3">
                <div className="card-icon" aria-hidden="true">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                  </svg>
                </div>
                <h3 className="card-h3">Rapport SMS chaque jour</h3>
                <p className="card-p">Chaque soir, recevez un SMS récapitulatif : qui a appelé, pourquoi, et quoi faire ensuite. Zéro oubli.</p>
              </article>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* PRICING */}
        <section className="sec-alt" id="tarifs" aria-labelledby="price-h2">
          <div className="container">
            <div className="sec-hdr">
              <span className="section-tag reveal">Tarifs</span>
              <h2 id="price-h2" className="reveal d1">Un prix clair, sans surprise</h2>
              <p className="sec-sub reveal d2">Commencez gratuitement. Évoluez selon votre volume d&apos;appels.</p>
            </div>
            <div className="plans">
              <div className="plan reveal d1">
                <span className="plan-badge trial">14 jours</span>
                <div className="pname">Trial</div>
                <div className="pprice"><span className="pamount">€0</span></div>
                <div className="pmins">15 min / 14 jours</div>
                <div className="pperiod">Essai sans carte bancaire</div>
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
            <p style={{textAlign:"center",marginTop:"32px",fontFamily:"var(--font-body)",fontSize:"14px",color:"var(--text-muted)"}}>
              Besoin d&apos;un volume supérieur ? <a href="mailto:contact@premiumartisan.fr" style={{color:"var(--gold)"}}>Contactez-nous</a> pour un plan sur mesure.
            </p>
          </div>
        </section>

        <div className="divider"></div>

        {/* FINAL CTA */}
        <section id="cta" aria-labelledby="cta-h2">
          <div className="cta-glow" aria-hidden="true"></div>
          <div className="container" style={{position:"relative",zIndex:1}}>
            <h2 className="cta-h2 reveal" id="cta-h2">Prêt à ne plus manquer un appel ?</h2>
            <p className="cta-sub reveal d1">Commencez gratuitement pendant 14 jours. Aucune carte bancaire requise.</p>
            <a href="/artisan/login" className="btn-gold reveal d2">Démarrer mon essai gratuit</a>
            <div className="cta-note reveal d3">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Mise en place en 5 minutes
            </div>
          </div>
        </section>

      </main>

      <footer role="contentinfo">
        <div className="container">
          <div className="foot-grid">
            <div>
              <a href="/" className="foot-logo">PREMIUMARTISAN</a>
              <p className="foot-desc">Réceptionniste IA pour artisans. Marie répond à vos appels 24h/24, collecte les informations et envoie un rapport SMS quotidien. Ne manquez plus jamais un client.</p>
            </div>
            <nav aria-label="Navigation produit">
              <div className="foot-ttl">Produit</div>
              <ul className="foot-list">
                <li><a href="/receptionniste-ia-artisan#solution">Fonctionnalités</a></li>
                <li><a href="/receptionniste-ia-artisan#tarifs">Tarifs</a></li>
                <li><a href="/artisan/login">Démarrer</a></li>
              </ul>
            </nav>
            <nav aria-label="Liens légaux">
              <div className="foot-ttl">Légaux</div>
              <ul className="foot-list">
                <li><a href="/mentions-legales">Mentions légales</a></li>
                <li><a href="/politique-confidentialite">Confidentialité</a></li>
                <li><a href="/cgu">CGU</a></li>
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
            <div className="foot-soc">
              <a href="https://www.linkedin.com/company/premiumartisan" rel="noopener noreferrer" target="_blank">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: js }} />
    </>
  )
}