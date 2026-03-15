"use client";

// Deploy: components/facture/FactureForm.tsx

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type StatutFacture = "brouillon" | "envoyee" | "payee" | "annulee";

interface LigneFacture {
  id: string;
  description: string;
  quantite: number;
  unite: string;
  prixUnitaire: number;
}

interface FactureData {
  artisanNom: string;
  artisanSiret: string;
  artisanAdresse: string;
  artisanTel: string;
  artisanEmail: string;
  artisanAssurance: string;
  artisanPolice: string;
  clientNom: string;
  clientAdresse: string;
  clientTel: string;
  clientEmail: string;
  statut: StatutFacture;
  numero: string;
  dateEmission: string;
  dateEcheance: string;
  lignes: LigneFacture[];
  tvaRate: number;
  notes: string;
  conditions: string;
}

const TVA_OPTIONS = [0, 5.5, 10, 20];
const UNITES = ["m²", "m", "unité", "forfait", "heure", "jour"];

const STATUTS: { value: StatutFacture; label: string; color: string; bg: string }[] = [
  { value: "brouillon", label: "Brouillon", color: "#6a3a4a", bg: "#fdf2f5" },
  { value: "envoyee",   label: "Envoyée",   color: "#6b7280", bg: "#f3f4f6" },
  { value: "payee",     label: "Payée",     color: "#166534", bg: "#dcfce7" },
  { value: "annulee",   label: "Annulée",   color: "#be123c", bg: "#fff1f2" },
];

const newLigne = (): LigneFacture => ({
  id: Math.random().toString(36).slice(2),
  description: "",
  quantite: 1,
  unite: "m²",
  prixUnitaire: 0,
});

const today = () => new Date().toISOString().slice(0, 10);
const in30days = () => {
  const d = new Date(); d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
};

const defaultData: FactureData = {
  artisanNom: "",
  artisanSiret: "",
  artisanAdresse: "",
  artisanTel: "",
  artisanEmail: "",
  artisanAssurance: "",
  artisanPolice: "",
  clientNom: "",
  clientAdresse: "",
  clientTel: "",
  clientEmail: "",
  statut: "brouillon",
  numero: "",
  dateEmission: "",
  dateEcheance: "",
  lignes: [newLigne()],
  tvaRate: 10,
  notes: "",
  conditions: "Paiement à 30 jours à réception de la facture.",
};

const fmt = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ── SIGNATURE PAD ─────────────────────────────────────────────────────────────
function SignaturePad({ onSign }: { onSign: (dataUrl: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [signed, setSigned] = useState(false);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    if ("touches" in e) return { x: (e.touches[0].clientX - rect.left) * sx, y: (e.touches[0].clientY - rect.top) * sy };
    return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
  };

  const start = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e, canvas);
    drawing.current = true;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#2a0a14";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
    setSigned(true);
  };

  const stop = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = canvasRef.current!;
    onSign(canvas.toDataURL());
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setSigned(false);
    onSign("");
  };

  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
        <canvas ref={canvasRef} width={600} height={120} className="w-full cursor-crosshair touch-none"
          onMouseDown={start} onMouseMove={draw} onMouseUp={stop} onMouseLeave={stop}
          onTouchStart={start} onTouchMove={draw} onTouchEnd={stop} />
        {!signed && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-slate-400">Signez ici</p>
          </div>
        )}
      </div>
      {signed && (
        <button type="button" onClick={clear}
          className="text-xs text-slate-500 underline underline-offset-2 hover:text-slate-800">
          Effacer la signature
        </button>
      )}
    </div>
  );
}

// ── FACTURE FORM ──────────────────────────────────────────────────────────────
export default function FactureForm() {
  const router = useRouter();
  const [data, setData] = useState<FactureData>({
    ...defaultData,
    numero: `FAC-${Date.now()}`,
    dateEmission: today(),
    dateEcheance: in30days(),
  });
  const [signatureData, setSignatureData] = useState("");
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Calculs
  const totalHT = data.lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0);
  const totalTVA = totalHT * (data.tvaRate / 100);
  const totalTTC = totalHT + totalTVA;

  const set = <K extends keyof FactureData>(key: K, val: FactureData[K]) =>
    setData(prev => ({ ...prev, [key]: val }));

  const setLigne = (index: number, key: keyof LigneFacture, val: string | number) =>
    setData(prev => ({
      ...prev,
      lignes: prev.lignes.map((l, i) => i === index ? { ...l, [key]: val } : l),
    }));

  const addLigne = () => setData(prev => ({ ...prev, lignes: [...prev.lignes, newLigne()] }));

  const removeLigne = (index: number) =>
    setData(prev => ({ ...prev, lignes: prev.lignes.filter((_, i) => i !== index) }));

  const buildPayload = () => ({
    statut: data.statut,
    artisan_nom: data.artisanNom,
    artisan_siret: data.artisanSiret,
    artisan_adresse: data.artisanAdresse,
    artisan_tel: data.artisanTel,
    artisan_email: data.artisanEmail,
    artisan_assurance: data.artisanAssurance,
    artisan_police: data.artisanPolice,
    client_nom: data.clientNom,
    client_tel: data.clientTel,
    client_adresse: data.clientAdresse,
    client_email: data.clientEmail,
    numero: data.numero,
    date_emission: data.dateEmission || null,
    date_echeance: data.dateEcheance || null,
    lignes: data.lignes.map(l => ({
      description: l.description,
      quantite: l.quantite,
      unite: l.unite,
      prix_unitaire_ht: l.prixUnitaire,
      total_ht: l.quantite * l.prixUnitaire,
    })),
    tva_pct: data.tvaRate,
    total_ht: Math.round(totalHT * 100) / 100,
    total_tva: Math.round(totalTVA * 100) / 100,
    total_ttc: Math.round(totalTTC * 100) / 100,
    notes: data.notes,
    conditions: data.conditions,
    signature_data: signatureData || null,
  });

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/artisan/facture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) { setError(json?.error || "Erreur lors de la sauvegarde."); return; }
      setSuccess("Facture sauvegardée.");
      setTimeout(() => router.push("/artisan/factures"), 1200);
    } catch { setError("Erreur serveur."); }
    finally { setSaving(false); }
  };

  const handleSend = async () => {
    if (!data.clientEmail) { setError("Email client requis pour envoyer."); return; }
    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/artisan/facture/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...buildPayload(), statut: "envoyee" }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) { setError(json?.error || "Erreur lors de l'envoi."); return; }
      setSuccess(`Facture envoyée à ${data.clientEmail}`);
      setTimeout(() => router.push("/artisan/factures"), 1500);
    } catch { setError("Erreur serveur."); }
    finally { setSending(false); }
  };

  const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-[#be123c] focus:outline-none focus:ring-1 focus:ring-[#be123c]";
  const labelCls = "block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1";

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => router.back()}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              Retour
            </button>
            <span className="text-slate-300">|</span>
            <h1 className="text-base font-bold text-slate-900">Nouvelle facture</h1>
          </div>

          {/* Statut */}
          <div className="flex gap-1.5">
            {STATUTS.map(s => (
              <button key={s.value} type="button" onClick={() => set("statut", s.value)}
                className="rounded-full px-3 py-1 text-xs font-semibold transition"
                style={{
                  background: data.statut === s.value ? s.bg : "transparent",
                  color: data.statut === s.value ? s.color : "#94a3b8",
                  border: `1px solid ${data.statut === s.value ? s.color + "40" : "#e2e8f0"}`,
                }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button type="button" onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60">
              {saving ? (
                <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                </svg>
              )}
              {saving ? "Sauvegarde…" : "Sauvegarder"}
            </button>
            <button type="button" onClick={handleSend} disabled={sending}
              className="flex items-center gap-1.5 rounded-xl bg-[#be123c] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#9f1239] disabled:opacity-60">
              {sending ? (
                <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              )}
              {sending ? "Envoi…" : "Envoyer par email"}
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="mx-auto max-w-5xl px-4 pt-4 sm:px-6">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}
        {success && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
        )}
      </div>

      {/* Body */}
      <div className="mx-auto max-w-5xl space-y-6 px-4 pb-16 pt-2 sm:px-6">

        {/* Numéro + Dates */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-bold text-slate-900">Identification</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className={labelCls}>Numéro facture</label>
              <input type="text" value={data.numero} onChange={e => set("numero", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Date d'émission</label>
              <input type="date" value={data.dateEmission} onChange={e => set("dateEmission", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Date d'échéance</label>
              <input type="date" value={data.dateEcheance} onChange={e => set("dateEcheance", e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>

        {/* Artisan + Client */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Artisan */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-bold text-slate-900">Vos informations</h2>
            <div className="space-y-3">
              {([
                ["artisanNom",       "Nom / Raison sociale", "text"],
                ["artisanSiret",     "SIRET",                "text"],
                ["artisanAdresse",   "Adresse",              "text"],
                ["artisanTel",       "Téléphone",            "tel"],
                ["artisanEmail",     "Email",                "email"],
                ["artisanAssurance", "Assurance décennale",  "text"],
                ["artisanPolice",    "N° police",            "text"],
              ] as [keyof FactureData, string, string][]).map(([key, label, type]) => (
                <div key={key}>
                  <label className={labelCls}>{label}</label>
                  <input type={type} value={String(data[key])} onChange={e => set(key, e.target.value)} className={inputCls} />
                </div>
              ))}
            </div>
          </div>

          {/* Client */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-bold text-slate-900">Informations client</h2>
            <div className="space-y-3">
              {([
                ["clientNom",     "Nom / Société",  "text"],
                ["clientAdresse", "Adresse",         "text"],
                ["clientTel",     "Téléphone",       "tel"],
                ["clientEmail",   "Email",           "email"],
              ] as [keyof FactureData, string, string][]).map(([key, label, type]) => (
                <div key={key}>
                  <label className={labelCls}>{label}</label>
                  <input type={type} value={String(data[key])} onChange={e => set(key, e.target.value)} className={inputCls} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lignes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Lignes de travaux</h2>
            <button type="button" onClick={addLigne}
              className="flex items-center gap-1.5 rounded-lg border border-[#be123c] px-3 py-1.5 text-xs font-semibold text-[#be123c] transition hover:bg-[#fff1f2]">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Ajouter une ligne
            </button>
          </div>

          {/* En-têtes */}
          <div className="mb-2 hidden grid-cols-[2fr_80px_100px_120px_100px_32px] gap-2 sm:grid">
            {["Description", "Qté", "Unité", "Prix HT", "Total HT", ""].map(h => (
              <span key={h} className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{h}</span>
            ))}
          </div>

          <div className="space-y-2">
            {data.lignes.map((l, i) => (
              <div key={l.id} className="grid grid-cols-1 gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-[2fr_80px_100px_120px_100px_32px] sm:bg-transparent sm:p-0">
                <input type="text" placeholder="Description des travaux"
                  value={l.description} onChange={e => setLigne(i, "description", e.target.value)}
                  className={inputCls} />
                <input type="number" min={0} step={0.01} value={l.quantite}
                  onChange={e => setLigne(i, "quantite", parseFloat(e.target.value) || 0)}
                  className={inputCls + " text-center"} />
                <select value={l.unite} onChange={e => setLigne(i, "unite", e.target.value)} className={inputCls}>
                  {UNITES.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                <input type="number" min={0} step={0.01} value={l.prixUnitaire}
                  onChange={e => setLigne(i, "prixUnitaire", parseFloat(e.target.value) || 0)}
                  className={inputCls + " text-right"} />
                <div className="flex items-center justify-end rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                  {fmt(l.quantite * l.prixUnitaire)} €
                </div>
                <button type="button" onClick={() => removeLigne(i)} disabled={data.lignes.length === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-30">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Totaux */}
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-600">Total HT</span>
                <span className="font-semibold text-slate-900">{fmt(totalHT)} €</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">TVA</span>
                  <select value={data.tvaRate} onChange={e => set("tvaRate", Number(e.target.value))}
                    className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-700 focus:border-[#be123c] focus:outline-none">
                    {TVA_OPTIONS.map(t => <option key={t} value={t}>{t}%</option>)}
                  </select>
                </div>
                <span className="font-semibold text-slate-900">{fmt(totalTVA)} €</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border-t border-slate-200 pt-2">
                <span className="text-base font-bold text-slate-900">Total TTC</span>
                <span className="text-xl font-black text-[#be123c]">{fmt(totalTTC)} €</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes + Conditions */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <label className={labelCls}>Notes</label>
            <textarea rows={4} value={data.notes} onChange={e => set("notes", e.target.value)}
              placeholder="Informations complémentaires…"
              className={inputCls + " resize-none"} />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <label className={labelCls}>Conditions de paiement</label>
            <textarea rows={4} value={data.conditions} onChange={e => set("conditions", e.target.value)}
              className={inputCls + " resize-none"} />
          </div>
        </div>

        {/* Signature */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-3 text-sm font-bold text-slate-900">Signature</h2>
          <SignaturePad onSign={setSignatureData} />
        </div>

        {/* Actions bas */}
        <div className="flex justify-end gap-3 pb-4">
          <button type="button" onClick={() => router.back()}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
            Annuler
          </button>
          <button type="button" onClick={handleSave} disabled={saving}
            className="rounded-xl border border-slate-900 bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700 disabled:opacity-60">
            {saving ? "Sauvegarde…" : "Sauvegarder"}
          </button>
          <button type="button" onClick={handleSend} disabled={sending}
            className="rounded-xl bg-[#be123c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#9f1239] disabled:opacity-60">
            {sending ? "Envoi…" : "Envoyer par email"}
          </button>
        </div>
      </div>
    </div>
  );
}