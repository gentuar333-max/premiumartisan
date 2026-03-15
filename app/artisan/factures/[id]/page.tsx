// app/artisan/factures/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FactureSummary = {
  id: string;
  numero: string;
  statut: "brouillon" | "envoyée" | "payée" | "annulée";
  client_nom: string;
  client_email: string;
  total_ttc: number;
  date_emission: string;
  date_echeance: string;
  devis_id: string | null;
};

const STATUT_STYLE: Record<string, string> = {
  brouillon: "bg-gray-100 text-gray-600",
  envoyée:   "bg-blue-100 text-blue-700",
  payée:     "bg-green-100 text-green-700",
  annulée:   "bg-red-100 text-red-600",
};

export default function FacturesPage() {
  const router = useRouter();
  const [factures, setFactures] = useState<FactureSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const url = filter === "all" ? "/api/artisan/factures" : `/api/artisan/factures?statut=${filter}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.ok) setFactures(json.factures);
      setLoading(false);
    })();
  }, [filter]);

  const formatEuro = (n: number) =>
    n.toLocaleString("fr-FR", { minimumFractionDigits: 2 }) + " €";

  const stats = {
    total:     factures.length,
    brouillon: factures.filter(f => f.statut === "brouillon").length,
    envoyée:   factures.filter(f => f.statut === "envoyée").length,
    payée:     factures.filter(f => f.statut === "payée").length,
    caTotal:   factures.filter(f => f.statut === "payée").reduce((s, f) => s + f.total_ttc, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Factures</h1>
            <p className="text-sm text-gray-500 mt-0.5">{stats.total} facture{stats.total > 1 ? "s" : ""} au total</p>
          </div>
          <Link href="/artisan/factures/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8B1A2B] text-white text-sm font-semibold rounded-xl hover:bg-[#6d1422] transition shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle facture
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Stats rapides */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Brouillons",    value: stats.brouillon, color: "text-gray-600" },
            { label: "Envoyées",      value: stats.envoyée,   color: "text-blue-600" },
            { label: "Payées",        value: stats.payée,     color: "text-green-600" },
            { label: "CA encaissé",   value: formatEuro(stats.caTotal), color: "text-[#8B1A2B]" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="flex gap-2 flex-wrap">
          {["all", "brouillon", "envoyée", "payée", "annulée"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition border
                ${filter === f ? "bg-[#8B1A2B] text-white border-[#8B1A2B]" : "bg-white text-gray-500 border-gray-200 hover:border-[#8B1A2B]"}`}>
              {f === "all" ? "Toutes" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Liste */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Chargement…</div>
        ) : factures.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">Aucune facture pour le moment</p>
            <Link href="/artisan/factures/new"
              className="inline-block mt-4 px-5 py-2 bg-[#8B1A2B] text-white text-sm font-semibold rounded-xl hover:bg-[#6d1422] transition">
              Créer ma première facture
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {factures.map(f => (
              <div key={f.id}
                onClick={() => router.push(`/artisan/factures/${f.id}`)}
                className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between hover:border-[#8B1A2B] hover:shadow-sm transition cursor-pointer group">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#fdf0f2] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#8B1A2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 text-sm">{f.numero}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUT_STYLE[f.statut]}`}>
                        {f.statut.charAt(0).toUpperCase() + f.statut.slice(1)}
                      </span>
                      {f.devis_id && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-purple-50 text-purple-600 font-medium">
                          Depuis devis
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5 truncate">{f.client_nom || "Client non renseigné"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0 ml-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-400">Émis</p>
                    <p className="text-sm text-gray-600">{new Date(f.date_emission).toLocaleDateString("fr-FR")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Total TTC</p>
                    <p className="font-bold text-[#8B1A2B]">{formatEuro(f.total_ttc)}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#8B1A2B] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}