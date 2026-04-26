"use client";

// app/artisan/factures-electroniques/new/page.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Ligne = {
  id: string;
  description: string;
  quantite: string;
  unite: string;
  prix_unitaire_ht: string;
  tva_pct: string;
};

function newLigne(): Ligne {
  return { id: Math.random().toString(36).slice(2), description: "", quantite: "1", unite: "forfait", prix_unitaire_ht: "", tva_pct: "20" };
}

const TVA_OPTIONS = ["0", "5.5", "10", "20"];
const UNITE_OPTIONS = ["forfait", "heure", "jour", "m²", "ml", "u"];

// ── Label ────────────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"#78716c", marginBottom:6 }}>
      {children}
    </label>
  );
}

// ── Input ────────────────────────────────────────────────────────────────────
function Input({ value, onChange, placeholder, type = "text", required }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      style={{ width:"100%", padding:"9px 12px", border:"1px solid #e7e5e4", borderRadius:7, fontSize:13, fontFamily:"'DM Sans',sans-serif", color:"#1c1917", background:"#fff", outline:"none", transition:"border-color 0.15s" }}
      onFocus={e => e.target.style.borderColor = "#a8a29e"}
      onBlur={e  => e.target.style.borderColor = "#e7e5e4"}
    />
  );
}

// ── Select ───────────────────────────────────────────────────────────────────
function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width:"100%", padding:"9px 12px", border:"1px solid #e7e5e4", borderRadius:7, fontSize:13, fontFamily:"'DM Sans',sans-serif", color:"#1c1917", background:"#fff", outline:"none", cursor:"pointer" }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ── Section card ─────────────────────────────────────────────────────────────
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background:"#fff", border:"1px solid #e7e5e4", borderRadius:10, padding:"22px 24px", marginBottom:16 }}>
      <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, color:"#1c1917", marginBottom:18 }}>{title}</p>
      {children}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function NewEFacturePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [sent,   setSent]   = useState(false);

  // Client
  const [clientNom,     setClientNom]     = useState("");
  const [clientSiret,   setClientSiret]   = useState("");
  const [clientEmail,   setClientEmail]   = useState("");
  const [clientAdresse, setClientAdresse] = useState("");

  // Facture meta
  const [dateEmission,  setDateEmission]  = useState(new Date().toISOString().slice(0,10));
  const [dateEcheance,  setDateEcheance]  = useState("");
  const [notes,         setNotes]         = useState("");

  // Lignes
  const [lignes, setLignes] = useState<Ligne[]>([newLigne()]);

  // ── Calculs ─────────────────────────────────────────────────────────────
  const totaux = lignes.map(l => {
    const ht  = (parseFloat(l.quantite) || 0) * (parseFloat(l.prix_unitaire_ht) || 0);
    const tva = ht * ((parseFloat(l.tva_pct) || 0) / 100);
    return { ht, tva, ttc: ht + tva };
  });
  const sousTotal = totaux.reduce((s, t) => s + t.ht, 0);
  const tvaTotale = totaux.reduce((s, t) => s + t.tva, 0);
  const totalTtc  = sousTotal + tvaTotale;
  const fmt = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits:2, maximumFractionDigits:2 }) + "\u00a0€";

  // ── Lignes helpers ───────────────────────────────────────────────────────
  const updateLigne = (id: string, field: keyof Ligne, val: string) =>
    setLignes(ls => ls.map(l => l.id === id ? { ...l, [field]: val } : l));
  const addLigne    = () => setLignes(ls => [...ls, newLigne()]);
  const removeLigne = (id: string) => setLignes(ls => ls.filter(l => l.id !== id));

  // ── Submit ───────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        facture: {
          client_nom:     clientNom,
          client_email:   clientEmail,
          client_adresse: clientAdresse,
          client_siret:   clientSiret,
          date_emission:  dateEmission,
          date_echeance:  dateEcheance || null,
          lignes:         lignes.map(l => ({
            description:      l.description,
            quantite:         parseFloat(l.quantite) || 0,
            unite:            l.unite,
            prix_unitaire_ht: parseFloat(l.prix_unitaire_ht) || 0,
            tva_pct:          parseFloat(l.tva_pct) || 0,
          })),
          notes,
          statut: "envoyée",
        },
        sendEmail: false, // sera remplace par Pennylane
      };
      const res  = await fetch("/api/artisan/factures", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (json.ok) { setSent(true); setTimeout(() => router.push("/artisan/factures-electroniques"), 1800); }
    } finally {
      setSaving(false);
    }
  }

  // ── Success state ────────────────────────────────────────────────────────
  if (sent) {
    return (
      <div style={{ display:"flex", height:"100vh", alignItems:"center", justifyContent:"center", background:"#fafaf9", fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:"#d1fae5", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
            <svg width="24" height="24" fill="none" stroke="#059669" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <p style={{ fontFamily:"'DM Serif Display',serif", fontSize:20, color:"#1c1917" }}>Facture envoyee</p>
          <p style={{ fontSize:13, color:"#78716c", marginTop:6 }}>Transmission via Pennylane en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:"#fafaf9", fontFamily:"'DM Sans',sans-serif", fontSize:14 }}>

      {/* ── SIDEBAR desktop ── */}
      <aside className="hidden lg:flex" style={{ width:240, flexShrink:0, background:"#0c0a09", flexDirection:"column", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:-80, left:-60, width:220, height:220, background:"radial-gradient(circle,rgba(217,119,6,0.12) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ padding:"24px 24px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:15, color:"#fff" }}>PremiumArtisan</div>
          <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#f59e0b", marginTop:3 }}>Espace artisan</div>
        </div>
        <div style={{ padding:"20px 12px 8px" }}>
          <div style={{ fontSize:9, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:"#57534e", padding:"0 12px", marginBottom:6 }}>Gestion</div>
          {[
            { href:"/artisan/dashboard",              label:"Vue d'ensemble" },
            { href:"/artisan/devis/new",              label:"Devis"          },
            { href:"/artisan/factures/new",           label:"Creer une facture" },
            { href:"/artisan/factures-electroniques", label:"Factures electroniques", active:true },
          ].map(n => (
            <Link key={n.href} href={n.href}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:6, fontSize:13, textDecoration:"none", marginBottom:1,
                color: n.active ? "#fbbf24" : "#a8a29e",
                background: n.active ? "rgba(217,119,6,0.14)" : "transparent",
                fontWeight: n.active ? 500 : 400 }}
              className={!n.active ? "hover:bg-white/5 hover:!text-[#e7e5e4]" : ""}>
              {n.label}
            </Link>
          ))}
        </div>
        <div style={{ marginTop:"auto", padding:"16px 12px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ padding:"8px 12px", fontSize:12, color:"#57534e" }}>Espace artisan</div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* Header */}
        <header style={{ height:64, background:"#fff", borderBottom:"1px solid #e7e5e4", display:"flex", alignItems:"center", padding:"0 24px", gap:16, flexShrink:0 }}>
          <button onClick={() => router.back()} className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <Link href="/artisan/factures-electroniques"
            style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#78716c", textDecoration:"none" }}
            className="hover:text-[#1c1917]">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            Factures electroniques
          </Link>
          <div style={{ width:1, height:16, background:"#e7e5e4" }} />
          <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, color:"#1c1917", fontWeight:400 }}>Nouvelle e-facture</span>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
            <button type="button" onClick={() => router.back()}
              style={{ padding:"8px 14px", borderRadius:6, fontSize:13, fontWeight:500, cursor:"pointer", background:"transparent", color:"#57534e", border:"1px solid #e7e5e4", fontFamily:"'DM Sans',sans-serif" }}
              className="hover:bg-[#f5f5f4]">
              Annuler
            </button>
            <button type="submit" form="efacture-form" disabled={saving}
              style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"8px 18px", borderRadius:6, fontSize:13, fontWeight:600, background: saving ? "#44403c" : "#1c1917", color:"#fff", border:"none", cursor: saving ? "not-allowed" : "pointer", fontFamily:"'DM Sans',sans-serif" }}>
              {saving ? "Envoi..." : "Envoyer via Pennylane"}
            </button>
          </div>
        </header>

        {/* Form */}
        <main style={{ flex:1, overflowY:"auto", padding:"28px 24px" }}>
          <form id="efacture-form" onSubmit={handleSubmit}>
            <div className="max-w-3xl mx-auto">

              {/* Info */}
              <div style={{ background:"#fffbeb", border:"1px solid #fef3c7", borderRadius:8, padding:"11px 16px", fontSize:12, color:"#d97706", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ flexShrink:0 }}><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>Facture <strong>B2B uniquement</strong> — votre client doit avoir un SIRET. La facture transitera automatiquement via Pennylane (PA agreee DGFiP).</span>
              </div>

              {/* Client */}
              <Card title="Client (entreprise)">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Nom de l'entreprise *</Label>
                    <Input value={clientNom} onChange={setClientNom} placeholder="Batiment Girard SAS" required />
                  </div>
                  <div>
                    <Label>SIRET *</Label>
                    <Input value={clientSiret} onChange={setClientSiret} placeholder="41234567800012" required />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={clientEmail} onChange={setClientEmail} placeholder="contact@entreprise.fr" type="email" />
                  </div>
                  <div>
                    <Label>Adresse</Label>
                    <Input value={clientAdresse} onChange={setClientAdresse} placeholder="12 rue de la Paix, 21000 Dijon" />
                  </div>
                </div>
              </Card>

              {/* Dates */}
              <Card title="Dates">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Date d'emission *</Label>
                    <Input value={dateEmission} onChange={setDateEmission} type="date" required />
                  </div>
                  <div>
                    <Label>Date d'echeance</Label>
                    <Input value={dateEcheance} onChange={setDateEcheance} type="date" />
                  </div>
                </div>
              </Card>

              {/* Lignes */}
              <Card title="Prestations">
                <div style={{ overflowX:"auto" }}>
                  {/* Header lignes */}
                  <div className="hidden sm:grid" style={{ gridTemplateColumns:"1fr 80px 100px 110px 80px 32px", gap:8, marginBottom:8 }}>
                    {["Description","Qte","Unite","Prix HT","TVA",""].map(h => (
                      <div key={h} style={{ fontSize:10, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"#a8a29e" }}>{h}</div>
                    ))}
                  </div>

                  {lignes.map((l, i) => (
                    <div key={l.id}>
                      {/* Mobile: stacked */}
                      <div className="sm:hidden" style={{ background:"#fafaf9", border:"1px solid #e7e5e4", borderRadius:8, padding:"12px", marginBottom:8 }}>
                        <div style={{ marginBottom:8 }}>
                          <Label>Description</Label>
                          <Input value={l.description} onChange={v => updateLigne(l.id,"description",v)} placeholder="Peinture facade 180m²" />
                        </div>
                        <div className="grid grid-cols-2 gap-3" style={{ marginBottom:8 }}>
                          <div><Label>Quantite</Label><Input value={l.quantite} onChange={v => updateLigne(l.id,"quantite",v)} type="number" /></div>
                          <div><Label>Unite</Label><Select value={l.unite} onChange={v => updateLigne(l.id,"unite",v)} options={UNITE_OPTIONS} /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><Label>Prix unitaire HT</Label><Input value={l.prix_unitaire_ht} onChange={v => updateLigne(l.id,"prix_unitaire_ht",v)} type="number" placeholder="0.00" /></div>
                          <div><Label>TVA %</Label><Select value={l.tva_pct} onChange={v => updateLigne(l.id,"tva_pct",v)} options={TVA_OPTIONS} /></div>
                        </div>
                        {lignes.length > 1 && (
                          <button type="button" onClick={() => removeLigne(l.id)} style={{ marginTop:10, fontSize:12, color:"#dc2626", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                            Supprimer
                          </button>
                        )}
                      </div>

                      {/* Desktop: grid */}
                      <div className="hidden sm:grid" style={{ gridTemplateColumns:"1fr 80px 100px 110px 80px 32px", gap:8, marginBottom:8, alignItems:"center" }}>
                        <Input value={l.description} onChange={v => updateLigne(l.id,"description",v)} placeholder={`Prestation ${i+1}`} />
                        <Input value={l.quantite} onChange={v => updateLigne(l.id,"quantite",v)} type="number" />
                        <Select value={l.unite} onChange={v => updateLigne(l.id,"unite",v)} options={UNITE_OPTIONS} />
                        <Input value={l.prix_unitaire_ht} onChange={v => updateLigne(l.id,"prix_unitaire_ht",v)} type="number" placeholder="0.00" />
                        <Select value={l.tva_pct} onChange={v => updateLigne(l.id,"tva_pct",v)} options={TVA_OPTIONS} />
                        <button type="button" onClick={() => removeLigne(l.id)} disabled={lignes.length === 1}
                          style={{ width:28, height:28, borderRadius:6, border:"1px solid #e7e5e4", background:"transparent", cursor: lignes.length === 1 ? "not-allowed" : "pointer", color:"#a8a29e", display:"flex", alignItems:"center", justifyContent:"center" }}
                          className="hover:bg-[#fee2e2] hover:!border-red-200 hover:!text-red-500">
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" onClick={addLigne}
                  style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:6, fontSize:12, fontWeight:500, color:"#57534e", background:"transparent", border:"1px solid #e7e5e4", cursor:"pointer", marginTop:8, fontFamily:"'DM Sans',sans-serif" }}
                  className="hover:bg-[#f5f5f4]">
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                  Ajouter une ligne
                </button>
              </Card>

              {/* Totaux */}
              <div style={{ background:"#fff", border:"1px solid #e7e5e4", borderRadius:10, padding:"20px 24px", marginBottom:16 }}>
                <div style={{ display:"flex", flexDirection:"column", gap:8, maxWidth:320, marginLeft:"auto" }}>
                  {[
                    { label:"Sous-total HT", value:fmt(sousTotal), muted:true  },
                    { label:"TVA",            value:fmt(tvaTotale), muted:true  },
                    { label:"Total TTC",      value:fmt(totalTtc),  muted:false },
                  ].map(r => (
                    <div key={r.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop: r.muted ? 0 : 10, borderTop: r.muted ? "none" : "1px solid #e7e5e4" }}>
                      <span style={{ fontSize: r.muted ? 12 : 14, color: r.muted ? "#78716c" : "#1c1917", fontWeight: r.muted ? 400 : 600 }}>{r.label}</span>
                      <span style={{ fontSize: r.muted ? 13 : 18, color:"#1c1917", fontWeight: r.muted ? 500 : 700, fontFamily: r.muted ? "'DM Sans',sans-serif" : "'DM Serif Display',serif" }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <Card title="Notes (optionnel)">
                <textarea value={notes} onChange={e => setNotes(e.target.value)}
                  placeholder="Conditions de paiement, mentions legales..."
                  rows={3}
                  style={{ width:"100%", padding:"9px 12px", border:"1px solid #e7e5e4", borderRadius:7, fontSize:13, fontFamily:"'DM Sans',sans-serif", color:"#1c1917", background:"#fff", outline:"none", resize:"vertical" }} />
              </Card>

              {/* Submit mobile */}
              <button type="submit" disabled={saving}
                style={{ width:"100%", padding:"13px", borderRadius:10, fontSize:14, fontWeight:700, background: saving ? "#44403c" : "#1c1917", color:"#fff", border:"none", cursor: saving ? "not-allowed" : "pointer", fontFamily:"'DM Sans',sans-serif", marginTop:4 }}>
                {saving ? "Envoi en cours..." : "Envoyer via Pennylane"}
              </button>

            </div>
          </form>
        </main>
      </div>
    </div>
  );
}