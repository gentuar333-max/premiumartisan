"use client";

// app/artisan/factures-electroniques/FacturesElectroniquesShell.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Facture = {
  id: string;
  numero: string;
  statut: "brouillon" | "envoyée" | "payée" | "annulée";
  statut_efacture?: "emise" | "transmise" | "recue" | "acceptee" | "refusee" | "payee" | null;
  client_nom: string;
  client_email: string;
  total_ttc: number;
  sous_total_ht?: number;
  tva_montant?: number;
  date_emission: string;
  date_echeance: string;
  devis_id: string | null;
};

const EFACTURE_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  emise:     { label: "Emise",     bg: "bg-[#e7e5e4]",  text: "text-[#57534e]"  },
  transmise: { label: "Transmise", bg: "bg-[#fef3c7]",  text: "text-[#d97706]"  },
  recue:     { label: "Recue",     bg: "bg-[#dbeafe]",  text: "text-[#1d4ed8]"  },
  acceptee:  { label: "Acceptee",  bg: "bg-[#dbeafe]",  text: "text-[#2563eb]"  },
  refusee:   { label: "Refusee",   bg: "bg-[#fee2e2]",  text: "text-[#dc2626]"  },
  payee:     { label: "Payee",     bg: "bg-[#d1fae5]",  text: "text-[#059669]"  },
};

function EfactureBadge({ statut }: { statut?: string | null }) {
  const c = statut ? EFACTURE_CONFIG[statut] : null;
  if (!c) return (
    <span className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-[#f5f5f4] text-[#a8a29e]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#d6d3d1]" />—
    </span>
  );
  return (
    <span className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${c.bg} ${c.text}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {c.label}
    </span>
  );
}

const JOURNEY_STEPS = [
  { key: "emise",     label: "Creation",     sub: "Factur-X genere"    },
  { key: "transmise", label: "Pennylane PA", sub: "Plateforme agreee"  },
  { key: "recue",     label: "PA client",    sub: "Accuse reception"   },
  { key: "acceptee",  label: "Acceptee",     sub: "Validation client"  },
  { key: "payee",     label: "Payee",        sub: "Encaissement"       },
  { key: "dgfip",     label: "DGFiP",        sub: "TVA transmise"      },
];
const JOURNEY_ORDER = ["emise","transmise","recue","acceptee","payee","dgfip"];

function JourneyPanel({ statut, numero }: { statut?: string | null; numero: string }) {
  const idx = statut ? JOURNEY_ORDER.indexOf(statut) : -1;
  return (
    <div style={{ background:"#fff", border:"1px solid #e7e5e4", borderRadius:10, padding:"24px 28px", marginTop:20 }}>
      <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:"#1c1917", marginBottom:24 }}>
        Parcours de la facture electronique — {numero}
      </p>
      {/* Mobile vertical */}
      <div className="flex flex-col gap-0 sm:hidden">
        {JOURNEY_STEPS.map((step, i) => {
          const done = i < idx; const cur = i === idx; const last = i === JOURNEY_STEPS.length - 1;
          return (
            <div key={step.key} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${done ? "bg-[#f59e0b] border-[#f59e0b]" : cur ? "bg-white border-[#f59e0b] shadow-[0_0_0_3px_#fef3c7]" : "bg-white border-[#e7e5e4]"}`}>
                  {done ? <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    : cur ? <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                    : <span className="w-2 h-2 rounded-full bg-[#e7e5e4]" />}
                </div>
                {!last && <div className={`w-px flex-1 min-h-[20px] my-0.5 ${done ? "bg-[#fbbf24]" : "bg-[#e7e5e4]"}`} />}
              </div>
              <div className="pb-4">
                <p className={`text-[12px] font-semibold ${cur ? "text-[#d97706]" : done ? "text-[#44403c]" : "text-[#a8a29e]"}`}>{step.label}</p>
                <p className="text-[10px] text-[#a8a29e] mt-0.5">{step.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Desktop horizontal */}
      <div className="hidden sm:flex items-start">
        {JOURNEY_STEPS.map((step, i) => {
          const done = i < idx; const cur = i === idx; const last = i === JOURNEY_STEPS.length - 1;
          return (
            <div key={step.key} className="flex-1 flex flex-col items-center relative">
              {!last && <div className={`absolute top-3.5 h-px z-0 ${done ? "bg-[#fbbf24]" : "bg-[#e7e5e4]"}`} style={{ left:"calc(50% + 14px)", right:"calc(-50% + 14px)" }} />}
              <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 mb-2 flex-shrink-0
                ${done ? "bg-[#f59e0b] border-[#f59e0b]" : cur ? "bg-white border-[#f59e0b] shadow-[0_0_0_3px_#fef3c7]" : "bg-white border-[#e7e5e4]"}`}>
                {done ? <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  : cur ? <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  : <span className="w-2 h-2 rounded-full bg-[#e7e5e4]" />}
              </div>
              <p className={`text-[11px] font-semibold text-center ${cur ? "text-[#d97706]" : done ? "text-[#44403c]" : "text-[#a8a29e]"}`}>{step.label}</p>
              <p className="text-[9px] text-[#a8a29e] text-center mt-0.5 max-w-[72px]">{step.sub}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Sidebar nav items ────────────────────────────────────────────────────────
function NavItem({ href, label, icon, active }: { href: string; label: string; icon: React.ReactNode; active?: boolean }) {
  return (
    <Link href={href}
      style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:6,
        color: active ? "#fbbf24" : "#a8a29e", fontSize:13, textDecoration:"none", marginBottom:1,
        background: active ? "rgba(217,119,6,0.14)" : "transparent", fontWeight: active ? 500 : 400 }}
      className={!active ? "hover:bg-white/5 hover:!text-[#e7e5e4]" : ""}>
      <svg style={{ width:16, height:16, opacity: active ? 1 : 0.7, flexShrink:0 }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        {icon}
      </svg>
      {label}
    </Link>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function FacturesElectroniquesShell({ userEmail }: { userEmail?: string }) {
  const router = useRouter();
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState<Facture | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // Pour l'instant on réutilise la même API — à adapter avec statut_efacture plus tard
      const url = filter === "all" ? "/api/artisan/factures" : `/api/artisan/factures?statut=${filter}`;
      const res  = await fetch(url);
      const json = await res.json();
      if (json.ok) setFactures(json.factures);
      setLoading(false);
    })();
  }, [filter]);

  const fmt  = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits:2 }) + "\u00a0€";
  const fmtD = (d: string) => d ? new Date(d).toLocaleDateString("fr-FR", { day:"2-digit", month:"short", year:"numeric" }) : "—";

  const filtered = factures.filter(f => {
    if (!search) return true;
    const q = search.toLowerCase();
    return f.numero.toLowerCase().includes(q) || f.client_nom.toLowerCase().includes(q);
  });

  const stats = {
    total:    factures.length,
    en_cours: factures.filter(f => f.statut === "envoyée").length,
    payees:   factures.filter(f => f.statut === "payée").length,
    ca:       factures.filter(f => f.statut === "payée").reduce((s, f) => s + f.total_ttc, 0),
  };

  const initials = userEmail ? userEmail.slice(0,2).toUpperCase() : "PA";

  const TABS = [
    { key:"all",       label:"Toutes"      },
    { key:"envoyée",   label:"En cours"    },
    { key:"payée",     label:"Payees"      },
    { key:"brouillon", label:"Brouillons"  },
    { key:"annulée",   label:"Annulees"    },
  ];

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:"#fafaf9", fontFamily:"'DM Sans',sans-serif", fontSize:14 }}>

      {/* ── SIDEBAR desktop ── */}
      <aside className="hidden lg:flex" style={{ width:240, flexShrink:0, background:"#0c0a09", flexDirection:"column", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:-80, left:-60, width:220, height:220, background:"radial-gradient(circle,rgba(217,119,6,0.12) 0%,transparent 70%)", pointerEvents:"none" }} />

        {/* Brand */}
        <div style={{ padding:"24px 24px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:15, color:"#fff" }}>PremiumArtisan</div>
          <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#f59e0b", marginTop:3 }}>Espace artisan</div>
        </div>

        {/* Nav */}
        <div style={{ padding:"20px 12px 8px" }}>
          <div style={{ fontSize:9, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"#57534e", padding:"0 12px", marginBottom:6 }}>Gestion</div>
          <NavItem href="/artisan/dashboard" label="Vue d'ensemble" icon={<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>} />
          <NavItem href="/artisan/devis/new" label="Devis" icon={<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>} />
          <NavItem href="/artisan/factures/new" label="Creer une facture" icon={<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>} />
          <NavItem href="/artisan/factures-electroniques" label="Factures electroniques" active icon={<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>} />
          <NavItem href="#" label="Paiements" icon={<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>} />
          <NavItem href="#" label="Clients" icon={<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>} />

          <div style={{ fontSize:9, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"#57534e", padding:"16px 12px 6px" }}>Conformite</div>
          <NavItem href="#" label="e-Reporting TVA" icon={<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>} />
          <NavItem href="#" label="Statut Pennylane" icon={<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>} />
        </div>

        {/* User */}
        <div style={{ marginTop:"auto", padding:"16px 12px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:6 }} className="hover:bg-white/5 cursor-pointer">
            <div style={{ width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg,#d97706,#fbbf24)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff", flexShrink:0 }}>{initials}</div>
            <div>
              <div style={{ fontSize:12, fontWeight:500, color:"#d6d3d1", lineHeight:1.2 }}>{userEmail ?? "Artisan"}</div>
              <div style={{ fontSize:10, color:"#57534e" }}>Espace artisan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* Header */}
        <header style={{ height:64, background:"#fff", borderBottom:"1px solid #e7e5e4", display:"flex", alignItems:"center", padding:"0 24px", gap:16, flexShrink:0 }}>
          <button onClick={() => router.back()} className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:"#1c1917", fontWeight:400 }}>Factures electroniques</span>
            <span style={{ fontSize:13, color:"#78716c", marginLeft:6 }}>— reforme 2026</span>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:10 }}>
            <button style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"8px 14px", borderRadius:6, fontSize:13, fontWeight:500, cursor:"pointer", background:"transparent", color:"#57534e", border:"1px solid #e7e5e4", fontFamily:"'DM Sans',sans-serif" }}
              className="hover:bg-[#f5f5f4]">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span className="hidden sm:inline">Exporter</span>
            </button>
            <div style={{ width:1, height:20, background:"#e7e5e4" }} />
            <Link href="/artisan/factures-electroniques/new"
              style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"8px 16px", borderRadius:6, fontSize:13, fontWeight:600, background:"#1c1917", color:"#fff", textDecoration:"none" }}
              className="hover:bg-[#292524]">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
              <span className="hidden sm:inline">Nouvelle e-facture</span>
              <span className="sm:hidden">Nouvelle</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, overflowY:"auto", padding:"28px 24px" }}>

          {/* Info bar */}
          <div style={{ background:"#fffbeb", border:"1px solid #fef3c7", borderRadius:8, padding:"11px 16px", fontSize:12, color:"#d97706", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ flexShrink:0 }}><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>Compte connecte a <strong>Pennylane (PA agreee DGFiP)</strong>. Toutes vos factures transitent automatiquement.</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
            {[
              { label:"Ce mois",       value:stats.total,       top:"#f59e0b", sub:`${stats.en_cours} en cours`       },
              { label:"Montant TTC",   value:fmt(stats.ca),     top:"#059669", sub:"encaisse"                         },
              { label:"En attente",    value:stats.en_cours,    top:"#2563eb", sub:"factures en cours"                },
              { label:"Payees",        value:stats.payees,      top:"#a8a29e", sub:"ce mois"                          },
            ].map(s => (
              <div key={s.label} style={{ background:"#fff", border:"1px solid #e7e5e4", borderRadius:10, padding:"18px 20px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:s.top }} />
                <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"#78716c", marginBottom:8 }}>{s.label}</div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:26, color:"#1c1917", lineHeight:1, marginBottom:6 }}>{s.value}</div>
                <div style={{ fontSize:11, color:"#a8a29e" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Section header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:17, fontWeight:400, color:"#1c1917" }}>Historique des factures</div>
            <div style={{ fontSize:12, color:"#78716c" }}>{factures.length} facture{factures.length !== 1 ? "s" : ""}</div>
          </div>

          {/* Tabs */}
          <div style={{ display:"flex", gap:2, background:"#f5f5f4", padding:3, borderRadius:7, marginBottom:16, width:"fit-content", overflowX:"auto" }}>
            {TABS.map(t => (
              <button key={t.key} onClick={() => setFilter(t.key)}
                style={{ padding:"6px 14px", borderRadius:5, fontSize:12, fontWeight:500, cursor:"pointer", border:"none", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap",
                  background: filter === t.key ? "#fff" : "transparent",
                  color: filter === t.key ? "#1c1917" : "#78716c",
                  boxShadow: filter === t.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div style={{ background:"#fff", border:"1px solid #e7e5e4", borderRadius:10, overflow:"hidden" }}>
            {/* Toolbar */}
            <div style={{ padding:"12px 18px", borderBottom:"1px solid #f5f5f4", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ position:"relative", flex:1, maxWidth:280 }}>
                <svg style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", width:13, height:13, color:"#a8a29e" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher une facture, un client..."
                  style={{ width:"100%", padding:"7px 12px 7px 32px", border:"1px solid #e7e5e4", borderRadius:6, fontSize:13, fontFamily:"'DM Sans',sans-serif", color:"#292524", background:"#fafaf9", outline:"none" }} />
              </div>
            </div>

            {loading ? (
              <div style={{ padding:"40px 20px", textAlign:"center", color:"#a8a29e", fontSize:13 }}>Chargement...</div>
            ) : filtered.length === 0 ? (
              <div style={{ padding:"60px 20px", textAlign:"center" }}>
                <p style={{ color:"#a8a29e", fontSize:13 }}>Aucune facture electronique</p>
                <Link href="/artisan/factures-electroniques/new"
                  style={{ display:"inline-block", marginTop:12, padding:"8px 20px", background:"#1c1917", color:"#fff", borderRadius:8, fontSize:13, fontWeight:600, textDecoration:"none" }}>
                  Creer ma premiere e-facture
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table style={{ width:"100%", borderCollapse:"collapse" }}>
                    <thead>
                      <tr style={{ background:"#fafaf9", borderBottom:"1px solid #e7e5e4" }}>
                        {["N° Facture","Client","Montant HT","TVA","TTC","Date","Statut e-facture",""].map(h => (
                          <th key={h} style={{ padding:"10px 18px", textAlign:"left", fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"#78716c", whiteSpace:"nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(f => (
                        <tr key={f.id} onClick={() => setSelected(selected?.id === f.id ? null : f)}
                          style={{ borderBottom:"1px solid #f5f5f4", cursor:"pointer" }} className="hover:bg-[#fafaf9]">
                          <td style={{ padding:"13px 18px" }}>
                            <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:14, color:"#1c1917" }}>{f.numero}</span>
                          </td>
                          <td style={{ padding:"13px 18px", fontWeight:500, color:"#1c1917", fontSize:13 }}>{f.client_nom || "—"}</td>
                          <td style={{ padding:"13px 18px", fontSize:12, color:"#78716c" }}>{f.sous_total_ht ? fmt(f.sous_total_ht) : "—"}</td>
                          <td style={{ padding:"13px 18px", fontSize:13, color:"#44403c" }}>{f.tva_montant ? fmt(f.tva_montant) : "—"}</td>
                          <td style={{ padding:"13px 18px", fontWeight:600, color:"#1c1917", fontSize:13 }}>{fmt(f.total_ttc)}</td>
                          <td style={{ padding:"13px 18px", fontSize:12, color:"#78716c", whiteSpace:"nowrap" }}>{fmtD(f.date_emission)}</td>
                          <td style={{ padding:"13px 18px" }}><EfactureBadge statut={f.statut_efacture} /></td>
                          <td style={{ padding:"13px 18px" }}>
                            <button onClick={e => { e.stopPropagation(); router.push(`/artisan/factures/${f.id}`); }}
                              style={{ padding:"4px 10px", borderRadius:5, fontSize:11, fontWeight:500, color:"#57534e", background:"transparent", border:"1px solid #e7e5e4", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}
                              className="hover:bg-[#f5f5f4]">
                              Voir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="sm:hidden divide-y divide-[#f5f5f4]">
                  {filtered.map(f => (
                    <div key={f.id} onClick={() => setSelected(selected?.id === f.id ? null : f)}
                      style={{ padding:"14px 16px", cursor:"pointer" }} className="hover:bg-[#fafaf9]">
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                        <div style={{ minWidth:0 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                            <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:14, color:"#1c1917" }}>{f.numero}</span>
                            <EfactureBadge statut={f.statut_efacture} />
                          </div>
                          <p style={{ fontSize:12, color:"#78716c", marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.client_nom || "—"} · {fmtD(f.date_emission)}</p>
                        </div>
                        <div style={{ textAlign:"right", flexShrink:0 }}>
                          <p style={{ fontWeight:700, fontSize:14, color:"#1c1917" }}>{fmt(f.total_ttc)}</p>
                          <p style={{ fontSize:10, color:"#a8a29e" }}>TTC</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Journey panel */}
          {selected && <JourneyPanel statut={selected.statut_efacture} numero={selected.numero} />}
          {selected && (
            <div style={{ display:"flex", gap:8, marginTop:8 }}>
              <button onClick={() => router.push(`/artisan/factures/${selected.id}`)}
                style={{ flex:1, padding:"10px", borderRadius:10, border:"1px solid #e7e5e4", background:"#fff", fontSize:13, fontWeight:600, color:"#44403c", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}
                className="hover:bg-[#f5f5f4]">
                Voir le detail
              </button>
              <button style={{ flex:1, padding:"10px", borderRadius:10, border:"1px solid #e7e5e4", background:"#fff", fontSize:13, fontWeight:600, color:"#44403c", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}
                className="hover:bg-[#f5f5f4]">
                Telecharger PDF
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}