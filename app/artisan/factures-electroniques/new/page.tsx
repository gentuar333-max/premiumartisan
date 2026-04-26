"use client";

// app/artisan/factures-electroniques/new/page.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";

type Ligne = {
  id: string;
  description: string;
  quantite: string;
  prix_unitaire_ht: string;
  tva_pct: string;
};

function mkLigne(): Ligne {
  return { id: Math.random().toString(36).slice(2), description: "", quantite: "1", prix_unitaire_ht: "", tva_pct: "10" };
}

const TVA_OPTS = [
  { value: "0",   label: "0% — auto-liquidation" },
  { value: "5.5", label: "5,5% — travaux renovation" },
  { value: "10",  label: "10% — travaux amelioration" },
  { value: "20",  label: "20% — taux normal" },
];

// ── Petits composants ────────────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6, letterSpacing: "0.02em" }}>{children}</p>;
}

function TextInput({ value, onChange, placeholder, type = "text", required }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} required={required}
      style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#0f172a", background: "#fff", outline: "none", boxSizing: "border-box" }}
      onFocus={e => e.target.style.borderColor = "#6366f1"}
      onBlur={e  => e.target.style.borderColor = "#e2e8f0"}
    />
  );
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "22px 20px", marginBottom: 14, border: "1px solid #e2e8f0" }}>
      <div style={{ marginBottom: 18 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{title}</p>
        {sub && <p style={{ fontSize: 12, color: "#94a3b8" }}>{sub}</p>}
      </div>
      {children}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function NewFacturePage() {
  const router = useRouter();
  const [step,    setStep]    = useState<"form" | "success">("form");
  const [saving,  setSaving]  = useState(false);

  // Client
  const [clientNom,     setClientNom]     = useState("");
  const [clientSiret,   setClientSiret]   = useState("");
  const [clientEmail,   setClientEmail]   = useState("");
  const [clientAdresse, setClientAdresse] = useState("");

  // Date
  const [dateEmission, setDateEmission] = useState(new Date().toISOString().slice(0, 10));
  const [dateEcheance, setDateEcheance] = useState("");

  // Lignes
  const [lignes, setLignes] = useState<Ligne[]>([mkLigne()]);

  // Notes
  const [notes, setNotes] = useState("");

  // ── Calculs ─────────────────────────────────────────────────────────────
  const rows = lignes.map(l => {
    const ht  = (parseFloat(l.quantite) || 0) * (parseFloat(l.prix_unitaire_ht) || 0);
    const tva = ht * ((parseFloat(l.tva_pct) || 0) / 100);
    return { ht, tva };
  });
  const sousTotal = rows.reduce((s, r) => s + r.ht, 0);
  const tvaTot    = rows.reduce((s, r) => s + r.tva, 0);
  const totalTtc  = sousTotal + tvaTot;
  const fmt = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

  const updateLigne = (id: string, f: keyof Ligne, v: string) =>
    setLignes(ls => ls.map(l => l.id === id ? { ...l, [f]: v } : l));
  const addLigne    = () => setLignes(ls => [...ls, mkLigne()]);
  const delLigne    = (id: string) => setLignes(ls => ls.filter(l => l.id !== id));

  // ── Submit ───────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/artisan/factures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facture: {
            client_nom:     clientNom,
            client_email:   clientEmail,
            client_adresse: clientAdresse,
            client_siret:   clientSiret,
            date_emission:  dateEmission,
            date_echeance:  dateEcheance || null,
            lignes: lignes.map(l => ({
              description:      l.description,
              quantite:         parseFloat(l.quantite) || 1,
              unite:            "forfait",
              prix_unitaire_ht: parseFloat(l.prix_unitaire_ht) || 0,
              tva_pct:          parseFloat(l.tva_pct) || 10,
            })),
            notes,
            statut: "envoyée",
          },
          sendEmail: false,
        }),
      });
      const json = await res.json();
      if (json.ok) setStep("success");
    } finally {
      setSaving(false);
    }
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 340 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="28" height="28" fill="none" stroke="#16a34a" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>Facture envoyee</p>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 28 }}>
            Votre facture a ete transmise. Vous serez notifie quand votre client la recoit.
          </p>
          <button onClick={() => router.push("/artisan/factures-electroniques")}
            style={{ width: "100%", padding: "13px", borderRadius: 12, background: "#0f172a", color: "#fff", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            Voir mes factures
          </button>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => router.back()}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 8, color: "#94a3b8", display: "flex" }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Nouvelle facture</span>
          </div>
          <button type="submit" form="facture-form" disabled={saving}
            style={{ padding: "9px 20px", borderRadius: 10, background: saving ? "#94a3b8" : "#0f172a", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: saving ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            {saving ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </header>

      {/* Form */}
      <form id="facture-form" onSubmit={handleSubmit}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "20px 20px 40px" }}>

          {/* Client */}
          <Section title="Votre client" sub="L'entreprise qui va recevoir cette facture">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <FieldLabel>Nom de l'entreprise *</FieldLabel>
                <TextInput value={clientNom} onChange={setClientNom} placeholder="Batiment Martin SARL" required />
              </div>
              <div>
                <FieldLabel>Numero SIRET *</FieldLabel>
                <TextInput value={clientSiret} onChange={setClientSiret} placeholder="41234567800012" required />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <TextInput value={clientEmail} onChange={setClientEmail} placeholder="contact@client.fr" type="email" />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <FieldLabel>Adresse</FieldLabel>
                <TextInput value={clientAdresse} onChange={setClientAdresse} placeholder="12 rue de la Paix, 21000 Dijon" />
              </div>
            </div>
          </Section>

          {/* Dates */}
          <Section title="Dates">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <FieldLabel>Date de la facture</FieldLabel>
                <TextInput value={dateEmission} onChange={setDateEmission} type="date" required />
              </div>
              <div>
                <FieldLabel>A payer avant le</FieldLabel>
                <TextInput value={dateEcheance} onChange={setDateEcheance} type="date" />
              </div>
            </div>
          </Section>

          {/* Prestations */}
          <Section title="Ce que vous avez fait" sub="Detaillez vos prestations">
            {lignes.map((l, i) => (
              <div key={l.id} style={{ background: "#f8fafc", borderRadius: 12, padding: "14px", marginBottom: 10, border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>Prestation {i + 1}</span>
                  {lignes.length > 1 && (
                    <button type="button" onClick={() => delLigne(l.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                      Supprimer
                    </button>
                  )}
                </div>
                <div style={{ marginBottom: 10 }}>
                  <FieldLabel>Description *</FieldLabel>
                  <TextInput value={l.description} onChange={v => updateLigne(l.id, "description", v)} placeholder="Peinture salon 35m², 2 couches" required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 120px", gap: 10 }}>
                  <div>
                    <FieldLabel>Quantite</FieldLabel>
                    <TextInput value={l.quantite} onChange={v => updateLigne(l.id, "quantite", v)} type="number" placeholder="1" />
                  </div>
                  <div>
                    <FieldLabel>Prix unitaire HT (€)</FieldLabel>
                    <TextInput value={l.prix_unitaire_ht} onChange={v => updateLigne(l.id, "prix_unitaire_ht", v)} type="number" placeholder="0,00" required />
                  </div>
                  <div>
                    <FieldLabel>TVA</FieldLabel>
                    <select value={l.tva_pct} onChange={e => updateLigne(l.id, "tva_pct", e.target.value)}
                      style={{ width: "100%", padding: "11px 10px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#0f172a", background: "#fff", outline: "none" }}>
                      {TVA_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
                {/* Sous-total ligne */}
                {rows[i] && rows[i].ht > 0 && (
                  <div style={{ marginTop: 10, fontSize: 12, color: "#64748b", textAlign: "right" }}>
                    Sous-total : <strong style={{ color: "#0f172a" }}>{fmt(rows[i].ht + rows[i].tva)}</strong> TTC
                  </div>
                )}
              </div>
            ))}

            <button type="button" onClick={addLigne}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 10, border: "1.5px dashed #cbd5e1", background: "transparent", color: "#64748b", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", width: "100%", justifyContent: "center" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
              Ajouter une prestation
            </button>
          </Section>

          {/* Total */}
          <div style={{ background: "#0f172a", borderRadius: 16, padding: "20px 22px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>Total HT</span>
              <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>{fmt(sousTotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>TVA</span>
              <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>{fmt(tvaTot)}</span>
            </div>
            <div style={{ borderTop: "1px solid #1e293b", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 15, color: "#fff", fontWeight: 700 }}>Total a payer</span>
              <span style={{ fontSize: 24, color: "#fff", fontWeight: 800 }}>{fmt(totalTtc)}</span>
            </div>
          </div>

          {/* Notes */}
          <Section title="Notes" sub="Optionnel — conditions de paiement, remarques">
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Ex: Paiement par virement sous 30 jours..."
              rows={3}
              style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#0f172a", background: "#fff", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
          </Section>

          {/* Submit bottom */}
          <button type="submit" disabled={saving}
            style={{ width: "100%", padding: "15px", borderRadius: 14, background: saving ? "#94a3b8" : "#0f172a", color: "#fff", fontSize: 16, fontWeight: 800, border: "none", cursor: saving ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 14px rgba(15,23,42,0.15)" }}>
            {saving ? "Envoi en cours..." : "Envoyer la facture"}
          </button>

        </div>
      </form>
    </div>
  );
}