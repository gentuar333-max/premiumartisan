"use client";

// Deploy: app/artisan/devis/page.tsx
// Shfaq të gjitha deviset dhe faturat e artizanit

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Tab = "devis" | "factures";

type DevisRow = {
  id: string;
  numero: string;
  client_nom: string | null;
  client_email: string | null;
  statut: string;
  total_ttc: number;
  date_emission: string | null;
  date_validite: string | null;
  created_at: string;
};

type FactureRow = {
  id: string;
  numero: string;
  client_nom: string | null;
  client_email: string | null;
  statut: string;
  total_ttc: number;
  date_emission: string | null;
  date_echeance: string | null;
  created_at: string;
};

const DEVIS_STATUTS: Record<string, { label: string; color: string; bg: string }> = {
  brouillon: { label: "Brouillon", color: "#6a3a4a", bg: "#fdf2f5" },
  envoye:    { label: "Envoyé",    color: "#6b7280", bg: "#f3f4f6" },
  accepte:   { label: "Accepté",  color: "#166534", bg: "#dcfce7" },
  refuse:    { label: "Refusé",   color: "#be123c", bg: "#fff1f2" },
  expire:    { label: "Expiré",   color: "#92400e", bg: "#fffbeb" },
};

const FACTURE_STATUTS: Record<string, { label: string; color: string; bg: string }> = {
  brouillon: { label: "Brouillon", color: "#6a3a4a", bg: "#fdf2f5" },
  envoyee:   { label: "Envoyée",  color: "#6b7280", bg: "#f3f4f6" },
  payee:     { label: "Payée",    color: "#166534", bg: "#dcfce7" },
  annulee:   { label: "Annulée",  color: "#be123c", bg: "#fff1f2" },
};

const fmt = (n: number) =>
  n?.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? "—";

function fmtDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function StatutBadge({ statut, map }: { statut: string; map: Record<string, { label: string; color: string; bg: string }> }) {
  const s = map[statut] ?? { label: statut, color: "#64748b", bg: "#f3f4f6" };
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ color: s.color, background: s.bg }}>
      {s.label}
    </span>
  );
}

export default function DevisListPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("devis");
  const [devis, setDevis] = useState<DevisRow[]>([]);
  const [factures, setFactures] = useState<FactureRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [rd, rf] = await Promise.all([
          fetch("/api/artisan/devis"),
          fetch("/api/artisan/factures"),
        ]);
        const jd = await rd.json().catch(() => null);
        const jf = await rf.json().catch(() => null);
        if (!rd.ok || !jd?.ok) { setError(jd?.error || "Erreur chargement devis."); }
        else setDevis(jd.devis ?? []);
        if (jf?.ok) setFactures(jf.factures ?? []);
      } catch { setError("Erreur serveur."); }
      finally { setLoading(false); }
    };
    void load();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#d5d8dc] bg-[#eaecef] shadow-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => router.push("/artisan/dashboard")}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              Dashboard
            </button>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-black text-white"
                style={{ background: "linear-gradient(145deg,#2a0a14,#3d0f1e)" }}>PA</div>
              <span className="hidden text-sm font-bold text-slate-900 sm:block">Devis & Factures</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/artisan/devis/new"
              className="flex items-center gap-1.5 rounded-xl border border-slate-900 bg-slate-900 px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
              + Devis
            </Link>
            <Link href="/artisan/factures/new"
              className="flex items-center gap-1.5 rounded-xl border border-[#be123c] bg-[#be123c] px-3 py-2 text-sm font-bold text-white transition hover:bg-[#9f1239]">
              + Facture
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl border border-slate-200 bg-white p-1 w-fit">
          {(["devis", "factures"] as Tab[]).map(t => (
            <button key={t} type="button" onClick={() => setTab(t)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold capitalize transition ${
                tab === t
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}>
              {t === "devis" ? `Devis (${devis.length})` : `Factures (${factures.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <svg className="h-6 w-6 animate-spin text-[#be123c]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </div>
        ) : tab === "devis" ? (
          devis.length === 0 ? (
            <Empty label="Aucun devis pour le moment" href="/artisan/devis/new" cta="+ Créer un devis" />
          ) : (
            <Table
              headers={["Numéro", "Client", "Statut", "Total TTC", "Émis le", "Validité"]}
              rows={devis.map(d => ({
                id: d.id,
                cells: [
                  <span key="num" className="font-mono text-sm font-semibold text-slate-900">{d.numero}</span>,
                  <span key="cl" className="text-sm text-slate-700">{d.client_nom || "—"}</span>,
                  <StatutBadge key="st" statut={d.statut} map={DEVIS_STATUTS} />,
                  <span key="ttc" className="text-sm font-bold text-slate-900">{fmt(d.total_ttc)} €</span>,
                  <span key="em" className="text-sm text-slate-500">{fmtDate(d.date_emission)}</span>,
                  <span key="va" className="text-sm text-slate-500">{fmtDate(d.date_validite)}</span>,
                ],
              }))}
            />
          )
        ) : (
          factures.length === 0 ? (
            <Empty label="Aucune facture pour le moment" href="/artisan/factures/new" cta="+ Créer une facture" />
          ) : (
            <Table
              headers={["Numéro", "Client", "Statut", "Total TTC", "Émise le", "Échéance"]}
              rows={factures.map(f => ({
                id: f.id,
                cells: [
                  <span key="num" className="font-mono text-sm font-semibold text-slate-900">{f.numero}</span>,
                  <span key="cl" className="text-sm text-slate-700">{f.client_nom || "—"}</span>,
                  <StatutBadge key="st" statut={f.statut} map={FACTURE_STATUTS} />,
                  <span key="ttc" className="text-sm font-bold text-slate-900">{fmt(f.total_ttc)} €</span>,
                  <span key="em" className="text-sm text-slate-500">{fmtDate(f.date_emission)}</span>,
                  <span key="ec" className="text-sm text-slate-500">{fmtDate(f.date_echeance)}</span>,
                ],
              }))}
            />
          )
        )}
      </div>
    </div>
  );
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function Empty({ label, href, cta }: { label: string; href: string; cta: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <p className="mb-1 font-semibold text-slate-900">{label}</p>
      <p className="mb-5 text-sm text-slate-500">Commencez par en créer un</p>
      <Link href={href}
        className="rounded-xl bg-[#be123c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#9f1239]">
        {cta}
      </Link>
    </div>
  );
}

function Table({
  headers, rows,
}: {
  headers: string[];
  rows: { id: string; cells: React.ReactNode[] }[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {headers.map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id}
                className={`border-b border-slate-50 transition hover:bg-slate-50 ${i % 2 === 0 ? "" : "bg-[#fafafa]"}`}>
                {row.cells.map((cell, j) => (
                  <td key={j} className="px-4 py-3">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}