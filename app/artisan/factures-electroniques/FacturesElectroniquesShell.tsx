"use client";

// app/artisan/factures-electroniques/Shell.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Facture = {
  id: string;
  numero: string;
  statut: "brouillon" | "envoyée" | "payée" | "annulée";
  client_nom: string;
  total_ttc: number;
  date_emission: string;
};

const STATUT: Record<string, { label: string; bg: string; color: string }> = {
  "envoyée": { label: "Envoyee",  bg: "#fffbeb", color: "#d97706" },
  "payée":   { label: "Payee",    bg: "#f0fdf4", color: "#16a34a" },
  "brouillon":{ label: "Brouillon",bg:"#f8fafc", color: "#64748b" },
  "annulée": { label: "Annulee",  bg: "#fff1f2", color: "#e11d48" },
};

export default function Shell({ userEmail }: { userEmail?: string }) {
  const router = useRouter();
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch("/api/artisan/factures")
      .then(r => r.json())
      .then(j => { if (j.ok) setFactures(j.factures); })
      .finally(() => setLoading(false));
  }, []);

  const fmt  = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2 }) + " €";
  const fmtD = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });

  const total    = factures.reduce((s, f) => s + f.total_ttc, 0);
  const payees   = factures.filter(f => f.statut === "payée");
  const encours  = factures.filter(f => f.statut === "envoyée");
  const caPayees = payees.reduce((s, f) => s + f.total_ttc, 0);

  const initials = userEmail ? userEmail.slice(0, 2).toUpperCase() : "ME";

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HEADER ── */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => router.push("/artisan/dashboard")}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 8, color: "#94a3b8", display: "flex" }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }}>
              Mes factures
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>
              {initials}
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 20px" }}>

        {/* ── STATS 3 cartes ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Total factures", value: factures.length, sub: "ce mois",         accent: "#6366f1" },
            { label: "En attente",     value: encours.length,  sub: fmt(encours.reduce((s,f) => s+f.total_ttc,0)), accent: "#f59e0b" },
            { label: "Encaisse",       value: fmt(caPayees),   sub: `${payees.length} facture${payees.length > 1 ? "s" : ""}`, accent: "#10b981" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "16px 14px", border: "1px solid #e2e8f0", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.accent, borderRadius: "14px 14px 0 0" }} />
              <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ── BOUTON PRINCIPAL ── */}
        <Link href="/artisan/factures-electroniques/new"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "14px", borderRadius: 14, background: "#0f172a", color: "#fff", fontSize: 15, fontWeight: 700, textDecoration: "none", marginBottom: 28, letterSpacing: "-0.01em", boxShadow: "0 4px 14px rgba(15,23,42,0.15)" }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Creer une facture
        </Link>

        {/* ── LISTE ── */}
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>
            {factures.length === 0 ? "Aucune facture" : `${factures.length} facture${factures.length > 1 ? "s" : ""}`}
          </span>
        </div>

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, height: 76, border: "1px solid #e2e8f0", animation: "pulse 1.5s infinite" }} />
            ))}
          </div>
        ) : factures.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 20, padding: "48px 24px", textAlign: "center", border: "1px solid #e2e8f0" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="24" height="24" fill="none" stroke="#94a3b8" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", marginBottom: 6 }}>Pas encore de factures</p>
            <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>Creez votre premiere facture en quelques secondes</p>
            <Link href="/artisan/factures-electroniques/new"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 22px", background: "#0f172a", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Commencer
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {factures.map(f => {
              const s = STATUT[f.statut] ?? STATUT["brouillon"];
              return (
                <div key={f.id}
                  onClick={() => router.push(`/artisan/factures/${f.id}`)}
                  style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", border: "1px solid #e2e8f0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, transition: "box-shadow 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>

                  {/* Left */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="18" height="18" fill="none" stroke="#64748b" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {f.client_nom || "Client"}
                      </div>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>
                        {f.numero} · {fmtD(f.date_emission)}
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>{fmt(f.total_ttc)}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: s.bg, color: s.color }}>
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Total bottom */}
        {factures.length > 0 && (
          <div style={{ marginTop: 20, padding: "16px 20px", background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>Total toutes factures</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>{fmt(total)}</span>
          </div>
        )}

      </div>
    </div>
  );
}