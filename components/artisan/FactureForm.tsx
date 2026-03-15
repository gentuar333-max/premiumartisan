"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseBrowser";

// ── Types ──────────────────────────────────────────────────────────────────────
export type LigneFacture = {
  id: string;
  description: string;
  quantite: number;
  unite: string;
  prix_unitaire_ht: number;
  tva_pct: number;
};

export type FactureData = {
  id?: string;
  numero: string;
  statut: "brouillon" | "envoyée" | "payée" | "annulée";
  devis_id?: string | null;
  client_nom: string;
  client_email: string;
  client_adresse: string;
  client_telephone: string;
  artisan_nom: string;
  artisan_siret: string;
  artisan_adresse: string;
  artisan_telephone: string;
  artisan_email: string;
  artisan_logo_url: string;
  artisan_assurance: string;
  artisan_police: string;
  lignes: LigneFacture[];
  acompte_pct: number;
  methode_paiement: "virement" | "chèque" | "espèces" | "carte";
  iban: string;
  date_echeance: string;
  date_paiement: string;
  notes: string;
  conditions: string;
  date_emission: string;
};

type Props = {
  initial?: Partial<FactureData>;
  devisId?: string;
  onSaved?: (facture: FactureData) => void;
};

const UNITES = ["m²", "m", "u", "forfait", "heure", "jour"];
const TVA_OPTIONS = [0, 5.5, 10, 20];
const METHODES = [
  { value: "virement",  label: "Virement bancaire" },
  { value: "chèque",    label: "Chèque" },
  { value: "espèces",   label: "Espèces" },
  { value: "carte",     label: "Carte bancaire" },
];
const STATUTS = [
  { value: "brouillon", label: "Brouillon",  color: "bg-gray-100 text-gray-700" },
  { value: "envoyée",   label: "Envoyée",    color: "bg-blue-100 text-blue-700" },
  { value: "payée",     label: "Payée",      color: "bg-green-100 text-green-700" },
  { value: "annulée",   label: "Annulée",    color: "bg-red-100 text-red-700" },
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(date: string, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatEuro(n: number) {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

function calcTotaux(lignes: LigneFacture[], acomptePct: number) {
  let sousTotal = 0;
  let tvaMontant = 0;
  for (const l of lignes) {
    const ht = l.quantite * l.prix_unitaire_ht;
    sousTotal += ht;
    tvaMontant += ht * (l.tva_pct / 100);
  }
  const totalTtc = sousTotal + tvaMontant;
  const acompteMontant = totalTtc * (acomptePct / 100);
  return { sousTotal, tvaMontant, totalTtc, acompteMontant };
}

// ── Composant principal ────────────────────────────────────────────────────────
export default function FactureForm({ initial, devisId, onSaved }: Props) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const printRef = useRef<HTMLDivElement>(null);

  const defaultLigne = (): LigneFacture => ({
    id: uid(),
    description: "",
    quantite: 1,
    unite: "m²",
    prix_unitaire_ht: 0,
    tva_pct: 10,
  });

  const [facture, setFacture] = useState<FactureData>({
    numero: "FAC-2026-0001",
    statut: "brouillon",
    devis_id: devisId ?? null,
    client_nom: "",
    client_email: "",
    client_adresse: "",
    client_telephone: "",
    artisan_nom: "",
    artisan_siret: "",
    artisan_adresse: "",
    artisan_telephone: "",
    artisan_email: "",
    artisan_logo_url: "",
    artisan_assurance: "",
    artisan_police: "",
    lignes: [defaultLigne()],
    acompte_pct: 30,
    methode_paiement: "virement",
    iban: "",
    date_echeance: addDays(today(), 30),
    date_paiement: "",
    notes: "",
    conditions: "Paiement à 30 jours. Acompte requis avant démarrage des travaux.",
    date_emission: today(),
    ...initial,
  });

  const [saving, setSaving]     = useState(false);
  const [sending, setSending]   = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState(initial?.artisan_logo_url ?? "");
  const [toast, setToast]       = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  // Charger profil artisan au montage
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from("artisan_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (profile && !initial?.artisan_nom) {
        setFacture(f => ({
          ...f,
          artisan_nom:       profile.company_name ?? profile.full_name ?? "",
          artisan_siret:     profile.siret ?? "",
          artisan_adresse:   profile.address ?? "",
          artisan_telephone: profile.phone ?? "",
          artisan_email:     user.email ?? "",
          artisan_logo_url:  profile.logo_url ?? "",
          artisan_assurance: profile.assurance ?? "",
          artisan_police:    profile.police ?? "",
        }));
        if (profile.logo_url) setLogoPreview(profile.logo_url);
      }
      // Numéro auto
      const { data: num } = await supabase.rpc("next_facture_numero", { p_artisan_id: user.id });
      if (num && !initial?.numero) setFacture(f => ({ ...f, numero: num }));
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Charger devis si devisId fourni
  useEffect(() => {
    if (!devisId) return;
    (async () => {
      const { data: devis } = await supabase
        .from("devis")
        .select("*")
        .eq("id", devisId)
        .maybeSingle();
      if (!devis) return;
      setFacture(f => ({
        ...f,
        devis_id:         devisId,
        client_nom:       devis.client_nom ?? f.client_nom,
        client_email:     devis.client_email ?? f.client_email,
        client_adresse:   devis.client_adresse ?? f.client_adresse,
        client_telephone: devis.client_telephone ?? f.client_telephone,
        lignes:           devis.lignes ?? f.lignes,
        acompte_pct:      devis.acompte_pct ?? f.acompte_pct,
        notes:            devis.notes ?? f.notes,
        conditions:       devis.conditions ?? f.conditions,
      }));
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devisId]);

  const set = useCallback(<K extends keyof FactureData>(key: K, val: FactureData[K]) => {
    setFacture(f => ({ ...f, [key]: val }));
  }, []);

  function setLigne(id: string, key: keyof LigneFacture, val: string | number) {
    setFacture(f => ({
      ...f,
      lignes: f.lignes.map(l => l.id === id ? { ...l, [key]: val } : l),
    }));
  }

  function addLigne() {
    setFacture(f => ({ ...f, lignes: [...f.lignes, defaultLigne()] }));
  }

  function removeLigne(id: string) {
    setFacture(f => ({ ...f, lignes: f.lignes.filter(l => l.id !== id) }));
  }

  async function uploadLogo(file: File): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const path = `logos/${user.id}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("artisan-assets").upload(path, file, { upsert: true });
    if (error) return null;
    const { data } = supabase.storage.from("artisan-assets").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSave(sendEmail = false) {
    if (sendEmail) setSending(true);
    else setSaving(true);

    try {
      let logoUrl = facture.artisan_logo_url;
      if (logoFile) {
        const url = await uploadLogo(logoFile);
        if (url) { logoUrl = url; set("artisan_logo_url", url); }
      }

      const { sousTotal, tvaMontant, totalTtc, acompteMontant } = calcTotaux(facture.lignes, facture.acompte_pct);

      const payload = {
        ...facture,
        artisan_logo_url: logoUrl,
        sous_total_ht:   sousTotal,
        tva_montant:     tvaMontant,
        total_ttc:       totalTtc,
        acompte_montant: acompteMontant,
        statut: sendEmail ? "envoyée" : facture.statut,
      };

      const res = await fetch("/api/artisan/factures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facture: payload, sendEmail }),
      });

      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "Erreur serveur");

      setFacture(f => ({ ...f, id: json.id, statut: sendEmail ? "envoyée" : f.statut }));
      setToast({ msg: sendEmail ? "Facture envoyée au client ✓" : "Facture sauvegardée ✓", type: "ok" });
      onSaved?.({ ...facture, id: json.id });
    } catch (e: unknown) {
      setToast({ msg: (e as Error).message, type: "err" });
    } finally {
      setSaving(false);
      setSending(false);
      setTimeout(() => setToast(null), 4000);
    }
  }

  function handlePrint() {
    window.print();
  }

  const totaux = calcTotaux(facture.lignes, facture.acompte_pct);
  const statutInfo = STATUTS.find(s => s.value === facture.statut)!;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all
          ${toast.type === "ok" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {toast.msg}
        </div>
      )}

      {/* ── Topbar ── */}
      <div className="print:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-700 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-gray-400 text-sm">Factures</span>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-800 text-sm">{facture.numero}</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statutInfo.color}`}>
            {statutInfo.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden mr-2">
            <button
              onClick={() => setActiveTab("form")}
              className={`px-4 py-1.5 text-sm font-medium transition ${activeTab === "form" ? "bg-[#8B1A2B] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              Édition
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-1.5 text-sm font-medium transition ${activeTab === "preview" ? "bg-[#8B1A2B] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              Aperçu
            </button>
          </div>

          <button onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            PDF
          </button>

          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition disabled:opacity-50"
          >
            {saving ? "Sauvegarde…" : "Sauvegarder"}
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={sending || !facture.client_email}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#8B1A2B] text-white hover:bg-[#6d1422] transition disabled:opacity-50"
          >
            {sending ? "Envoi…" : "Envoyer au client"}
          </button>
        </div>
      </div>

      {/* ── Contenu ── */}
      {activeTab === "form" ? (
        <FormView
          facture={facture}
          set={set}
          setLigne={setLigne}
          addLigne={addLigne}
          removeLigne={removeLigne}
          logoPreview={logoPreview}
          setLogoPreview={setLogoPreview}
          setLogoFile={setLogoFile}
          totaux={totaux}
        />
      ) : (
        <PreviewView facture={facture} totaux={totaux} ref={printRef} />
      )}
    </div>
  );
}

// ── FormView ──────────────────────────────────────────────────────────────────
function FormView({
  facture, set, setLigne, addLigne, removeLigne,
  logoPreview, setLogoPreview, setLogoFile, totaux,
}: {
  facture: FactureData;
  set: <K extends keyof FactureData>(k: K, v: FactureData[K]) => void;
  setLigne: (id: string, key: keyof LigneFacture, val: string | number) => void;
  addLigne: () => void;
  removeLigne: (id: string) => void;
  logoPreview: string;
  setLogoPreview: (v: string) => void;
  setLogoFile: (f: File | null) => void;
  totaux: ReturnType<typeof calcTotaux>;
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 print:hidden">

      {/* Statut */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Statut de la facture</h2>
        <div className="flex flex-wrap gap-2">
          {STATUTS.map(s => (
            <button key={s.value}
              onClick={() => set("statut", s.value as FactureData["statut"])}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition
                ${facture.statut === s.value
                  ? "border-[#8B1A2B] bg-[#8B1A2B] text-white"
                  : "border-gray-200 text-gray-500 hover:border-[#8B1A2B]"}`}>
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* Infos facture */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Informations facture</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Field label="Numéro *" value={facture.numero} onChange={v => set("numero", v)} />
          <Field label="Date d'émission" type="date" value={facture.date_emission} onChange={v => set("date_emission", v)} />
          <Field label="Date d'échéance" type="date" value={facture.date_echeance} onChange={v => set("date_echeance", v)} />
          {facture.statut === "payée" && (
            <Field label="Date de paiement" type="date" value={facture.date_paiement} onChange={v => set("date_paiement", v)} />
          )}
        </div>
      </section>

      {/* Artisan */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Vos informations (artisan)</h2>

        {/* Logo */}
        <div className="flex items-start gap-4 mb-5">
          <label className="cursor-pointer group">
            <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50 group-hover:border-[#8B1A2B] transition">
              {logoPreview
                ? <img src={logoPreview} alt="logo" className="w-full h-full object-contain" />
                : <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
              }
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={e => {
              const f = e.target.files?.[0];
              if (!f) return;
              setLogoFile(f);
              setLogoPreview(URL.createObjectURL(f));
            }} />
          </label>
          <div>
            <p className="text-sm font-medium text-gray-700">Ajouter votre logo</p>
            <p className="text-xs text-gray-400">PNG, JPG · apparaît sur le PDF</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Nom / Raison sociale *" value={facture.artisan_nom} onChange={v => set("artisan_nom", v)} placeholder="Pierre Martin Peinture" />
          <Field label="SIRET *" value={facture.artisan_siret} onChange={v => set("artisan_siret", v)} placeholder="123 456 789 00012" />
          <Field label="Adresse" value={facture.artisan_adresse} onChange={v => set("artisan_adresse", v)} placeholder="12 rue de la Paix, 21000 Dijon" className="col-span-2" />
          <Field label="Téléphone" value={facture.artisan_telephone} onChange={v => set("artisan_telephone", v)} placeholder="06 00 00 00 00" />
          <Field label="Email" type="email" value={facture.artisan_email} onChange={v => set("artisan_email", v)} placeholder="contact@artisan.fr" />
          <Field label="Assurance décennale" value={facture.artisan_assurance} onChange={v => set("artisan_assurance", v)} placeholder="AXA, Allianz, MAAF…" />
          <Field label="N° de police" value={facture.artisan_police} onChange={v => set("artisan_police", v)} placeholder="123456789" />
        </div>
      </section>

      {/* Client */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Informations client</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nom / Société" value={facture.client_nom} onChange={v => set("client_nom", v)} placeholder="M. Dupont" />
          <Field label="Email *" type="email" value={facture.client_email} onChange={v => set("client_email", v)} placeholder="client@email.fr" />
          <Field label="Adresse" value={facture.client_adresse} onChange={v => set("client_adresse", v)} placeholder="45 avenue des Fleurs, 75001 Paris" className="col-span-2" />
          <Field label="Téléphone" value={facture.client_telephone} onChange={v => set("client_telephone", v)} placeholder="06 00 00 00 00" />
        </div>
      </section>

      {/* Lignes */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Prestations</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-3 text-gray-400 font-medium w-[40%]">Description</th>
                <th className="text-right py-2 px-2 text-gray-400 font-medium">Qté</th>
                <th className="text-right py-2 px-2 text-gray-400 font-medium">Unité</th>
                <th className="text-right py-2 px-2 text-gray-400 font-medium">P.U. HT</th>
                <th className="text-right py-2 px-2 text-gray-400 font-medium">TVA</th>
                <th className="text-right py-2 pl-2 text-gray-400 font-medium">Total HT</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {facture.lignes.map(ligne => (
                <tr key={ligne.id} className="border-b border-gray-50 group">
                  <td className="py-2 pr-3">
                    <input
                      value={ligne.description}
                      onChange={e => setLigne(ligne.id, "description", e.target.value)}
                      placeholder="Ex: Préparation surface, application 2 couches…"
                      className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#8B1A2B] focus:ring-1 focus:ring-[#8B1A2B]/20"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input type="number" min="0" step="0.01"
                      value={ligne.quantite}
                      onChange={e => setLigne(ligne.id, "quantite", parseFloat(e.target.value) || 0)}
                      className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 text-sm text-right focus:outline-none focus:border-[#8B1A2B]"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <select value={ligne.unite} onChange={e => setLigne(ligne.id, "unite", e.target.value)}
                      className="px-2 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#8B1A2B] bg-white">
                      {UNITES.map(u => <option key={u}>{u}</option>)}
                    </select>
                  </td>
                  <td className="py-2 px-2">
                    <input type="number" min="0" step="0.01"
                      value={ligne.prix_unitaire_ht}
                      onChange={e => setLigne(ligne.id, "prix_unitaire_ht", parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1.5 rounded-lg border border-gray-200 text-sm text-right focus:outline-none focus:border-[#8B1A2B]"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <select value={ligne.tva_pct} onChange={e => setLigne(ligne.id, "tva_pct", parseFloat(e.target.value))}
                      className="px-2 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#8B1A2B] bg-white">
                      {TVA_OPTIONS.map(t => <option key={t} value={t}>{t}%</option>)}
                    </select>
                  </td>
                  <td className="py-2 pl-2 text-right font-medium text-gray-700">
                    {formatEuro(ligne.quantite * ligne.prix_unitaire_ht)}
                  </td>
                  <td className="py-2 pl-1">
                    {facture.lignes.length > 1 && (
                      <button onClick={() => removeLigne(ligne.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition p-1 rounded">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={addLigne}
          className="mt-4 flex items-center gap-2 text-sm text-[#8B1A2B] hover:text-[#6d1422] font-medium transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Ajouter une ligne
        </button>

        {/* Totaux */}
        <div className="mt-6 border-t border-gray-100 pt-4 space-y-2 max-w-xs ml-auto text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Sous-total HT</span>
            <span className="font-medium">{formatEuro(totaux.sousTotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>TVA</span>
            <span className="font-medium">{formatEuro(totaux.tvaMontant)}</span>
          </div>
          <div className="flex justify-between text-gray-900 font-bold text-base border-t border-gray-200 pt-2 mt-2">
            <span>Total TTC</span>
            <span className="text-[#8B1A2B]">{formatEuro(totaux.totalTtc)}</span>
          </div>
          <div className="flex items-center justify-between text-gray-500 text-xs gap-3 pt-1">
            <span>Acompte</span>
            <div className="flex items-center gap-1">
              <input type="number" min="0" max="100" step="5"
                value={facture.acompte_pct}
                onChange={e => set("acompte_pct", parseInt(e.target.value) || 0)}
                className="w-14 text-right px-2 py-1 rounded border border-gray-200 text-xs focus:outline-none focus:border-[#8B1A2B]"
              />
              <span>%</span>
              <span className="ml-2 font-semibold text-[#8B1A2B]">{formatEuro(totaux.acompteMontant)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Paiement */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Modalités de paiement</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Méthode de paiement</label>
            <select value={facture.methode_paiement}
              onChange={e => set("methode_paiement", e.target.value as FactureData["methode_paiement"])}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#8B1A2B] bg-white">
              {METHODES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>
          {facture.methode_paiement === "virement" && (
            <Field label="IBAN" value={facture.iban} onChange={v => set("iban", v)} placeholder="FR76 3000 6000 0112 3456 7890 189" />
          )}
        </div>
      </section>

      {/* Notes & Conditions */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Notes & Conditions</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Notes (optionnel)</label>
            <textarea rows={3} value={facture.notes} onChange={e => set("notes", e.target.value)}
              placeholder="Informations complémentaires pour le client…"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:border-[#8B1A2B] focus:ring-1 focus:ring-[#8B1A2B]/20" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Conditions de paiement</label>
            <textarea rows={2} value={facture.conditions} onChange={e => set("conditions", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:border-[#8B1A2B]" />
          </div>
        </div>
      </section>
    </div>
  );
}

// ── PreviewView ───────────────────────────────────────────────────────────────
import { forwardRef } from "react";

const PreviewView = forwardRef<HTMLDivElement, { facture: FactureData; totaux: ReturnType<typeof calcTotaux> }>(
  function PreviewView({ facture, totaux }, ref) {
    const statutInfo = STATUTS.find(s => s.value === facture.statut)!;

    return (
      <div className="py-8 px-4 print:p-0">
        <div ref={ref}
          className="max-w-3xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none"
          style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

          {/* En-tête */}
          <div className="bg-[#1a0a0e] text-white px-10 py-8">
            <div className="flex justify-between items-start">
              <div>
                {facture.artisan_logo_url
                  ? <img src={facture.artisan_logo_url} alt="logo" className="h-14 mb-3 object-contain" />
                  : <div className="text-2xl font-bold text-[#e8a0b0] mb-1">{facture.artisan_nom || "—"}</div>
                }
                <p className="text-gray-300 text-xs">{facture.artisan_adresse}</p>
                <p className="text-gray-300 text-xs">{facture.artisan_telephone} · {facture.artisan_email}</p>
                {facture.artisan_siret && <p className="text-gray-400 text-xs mt-1">SIRET : {facture.artisan_siret}</p>}
                {facture.artisan_assurance && (
                  <p className="text-gray-400 text-xs">Assurance : {facture.artisan_assurance} — N° {facture.artisan_police}</p>
                )}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold tracking-tight text-white">{facture.numero}</div>
                <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${statutInfo.color}`}>
                  {statutInfo.label}
                </div>
                <p className="text-gray-400 text-xs mt-3">Émis le {new Date(facture.date_emission).toLocaleDateString("fr-FR")}</p>
                <p className="text-gray-400 text-xs">Échéance : {facture.date_echeance ? new Date(facture.date_echeance).toLocaleDateString("fr-FR") : "—"}</p>
                {facture.date_paiement && (
                  <p className="text-green-400 text-xs">Payé le {new Date(facture.date_paiement).toLocaleDateString("fr-FR")}</p>
                )}
              </div>
            </div>
          </div>

          {/* Client */}
          <div className="px-10 py-6 bg-gray-50 border-b border-gray-200">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Facturé à</p>
            <p className="font-bold text-gray-900 text-lg">{facture.client_nom || "—"}</p>
            {facture.client_adresse && <p className="text-gray-600 text-sm">{facture.client_adresse}</p>}
            {facture.client_telephone && <p className="text-gray-600 text-sm">{facture.client_telephone}</p>}
            {facture.client_email && <p className="text-gray-600 text-sm">{facture.client_email}</p>}
          </div>

          {/* Tableau lignes */}
          <div className="px-10 py-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a0a0e] text-white">
                  <th className="text-left py-3 px-4 font-medium rounded-l-lg">Description</th>
                  <th className="text-right py-3 px-3 font-medium">Qté</th>
                  <th className="text-right py-3 px-3 font-medium">Unité</th>
                  <th className="text-right py-3 px-3 font-medium">P.U. HT</th>
                  <th className="text-right py-3 px-3 font-medium">TVA</th>
                  <th className="text-right py-3 px-4 font-medium rounded-r-lg">Total HT</th>
                </tr>
              </thead>
              <tbody>
                {facture.lignes.map((l, i) => (
                  <tr key={l.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4 text-gray-800">{l.description || "—"}</td>
                    <td className="py-3 px-3 text-right text-gray-600">{l.quantite}</td>
                    <td className="py-3 px-3 text-right text-gray-600">{l.unite}</td>
                    <td className="py-3 px-3 text-right text-gray-600">{formatEuro(l.prix_unitaire_ht)}</td>
                    <td className="py-3 px-3 text-right text-gray-600">{l.tva_pct}%</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-800">{formatEuro(l.quantite * l.prix_unitaire_ht)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totaux */}
            <div className="mt-6 flex justify-end">
              <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total HT</span>
                  <span>{formatEuro(totaux.sousTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>TVA</span>
                  <span>{formatEuro(totaux.tvaMontant)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-200 pt-2">
                  <span>Total TTC</span>
                  <span className="text-[#8B1A2B]">{formatEuro(totaux.totalTtc)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-xs">
                  <span>Acompte ({facture.acompte_pct}%)</span>
                  <span className="font-semibold text-[#8B1A2B]">{formatEuro(totaux.acompteMontant)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Paiement */}
          <div className="px-10 py-5 bg-gray-50 border-t border-gray-200">
            <p className="text-xs font-semibold text-[#8B1A2B] uppercase tracking-wider mb-2">Règlement</p>
            <p className="text-sm text-gray-700">
              Méthode : <span className="font-medium">{METHODES.find(m => m.value === facture.methode_paiement)?.label}</span>
            </p>
            {facture.iban && <p className="text-sm text-gray-700 mt-1">IBAN : <span className="font-mono">{facture.iban}</span></p>}
            {facture.conditions && <p className="text-xs text-gray-500 mt-2">{facture.conditions}</p>}
          </div>

          {/* Notes */}
          {facture.notes && (
            <div className="px-10 py-5 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{facture.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="px-10 py-4 bg-[#1a0a0e] text-center">
            <p className="text-gray-400 text-xs">Document généré par <span className="text-[#e8a0b0] font-medium">PremiumArtisan</span> — premiumartisan.fr</p>
          </div>
        </div>
      </div>
    );
  }
);

// ── Field helper ──────────────────────────────────────────────────────────────
function Field({
  label, value, onChange, type = "text", placeholder, className = "",
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#8B1A2B] focus:ring-1 focus:ring-[#8B1A2B]/20 transition"
      />
    </div>
  );
}