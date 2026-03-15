"use client";

import { useState, useRef } from "react";

// ── TYPES ──────────────────────────────────────────────
type StatutDevis = "draft" | "envoye" | "accepte" | "refuse" | "expire";

interface LigneDevis {
  id: string;
  description: string;
  quantite: number;
  unite: string;
  prixUnitaire: number;
}

interface DevisData {
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
  statut: StatutDevis;
  numero: string;
  dateEmission: string;
  dateValidite: string;
  dateDebutTravaux: string;
  dureeEstimee: string;
  lignes: LigneDevis[];
  tvaRate: number;
  acompte: number;
  notes: string;
  conditions: string;
}

const TVA_OPTIONS = [0, 5.5, 10, 20];
const UNITES = ["m²", "m", "unité", "forfait", "heure", "jour"];

const STATUTS: { value: StatutDevis; label: string; color: string; bg: string }[] = [
  { value: "draft",   label: "Brouillon", color: "#6a3a4a", bg: "#fdf2f5" },
  { value: "envoye",  label: "Envoyé",   color: "#6b7280", bg: "#f3f4f6" },
  { value: "accepte", label: "Accepté",  color: "#166534", bg: "#dcfce7" },
  { value: "refuse",  label: "Refusé",   color: "#be123c", bg: "#fff1f2" },
  { value: "expire",  label: "Expiré",   color: "#92400e", bg: "#fffbeb" },
];

const newLigne = (): LigneDevis => ({
  id: Math.random().toString(36).slice(2),
  description: "",
  quantite: 1,
  unite: "m²",
  prixUnitaire: 0,
});

const defaultData: DevisData = {
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
  statut: "draft",
  numero: `DEV-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
  dateEmission: new Date().toISOString().slice(0, 10),
  dateValidite: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
  dateDebutTravaux: "",
  dureeEstimee: "",
  lignes: [newLigne()],
  tvaRate: 10,
  acompte: 30,
  notes: "",
  conditions: "Paiement à 30 jours. Acompte requis avant démarrage des travaux.",
};

const fmt = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ── SIGNATURE PAD ─────────────────────────────────────
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
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    setSigned(true);
    onSign(canvasRef.current!.toDataURL());
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setSigned(false);
    onSign("");
  };

  return (
    <div>
      <div className="relative rounded-xl border-2 border-dashed border-[#e8d0d8] bg-white overflow-hidden" style={{ height: 90 }}>
        <canvas ref={canvasRef} width={600} height={90} className="w-full h-full touch-none cursor-crosshair"
          onMouseDown={start} onMouseMove={draw} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={draw} onTouchEnd={end} />
        {!signed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[12px] text-[#c0a0ac]">Signez ici avec la souris ou le doigt</span>
          </div>
        )}
      </div>
      {signed && <button onClick={clear} className="mt-1.5 text-[11px] text-[#be123c] hover:underline">Effacer</button>}
    </div>
  );
}

// ── STATUT BADGE ──────────────────────────────────────
function StatutBadge({ statut }: { statut: StatutDevis }) {
  const s = STATUTS.find((x) => x.value === statut)!;
  const icon = statut === "refuse" ? "❌ " : "";
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ color: s.color, background: s.bg }}>
      {icon}{s.label}
    </span>
  );
}

// ── PREVIEW ───────────────────────────────────────────
function PreviewDevis({ data, signature, logo }: { data: DevisData; signature: string; logo: string }) {
  const sousTotal = data.lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0);
  const tva = sousTotal * (data.tvaRate / 100);
  const total = sousTotal + tva;
  const acompteAmt = total * (data.acompte / 100);
  const statut = STATUTS.find((x) => x.value === data.statut)!;

  return (
    <div id="devis-preview" className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(42,10,20,0.12)] overflow-hidden" style={{ fontFamily: "Georgia, serif", color: "#1a0a10" }}>
      {/* Header */}
      <div className="px-7 pt-7 pb-5 border-b border-[#f0e0e8]" style={{ background: "linear-gradient(135deg, #2a0a14 0%, #4a0a24 100%)" }}>
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-start gap-3">
            {logo && <img src={logo} alt="Logo" className="h-14 w-14 object-contain rounded-xl bg-white/10 p-1" />}
            <div>
              <div className="text-[19px] font-bold text-white mb-1">{data.artisanNom || "Votre entreprise"}</div>
              <div className="text-[11px] text-white/60 leading-relaxed space-y-0.5">
                {data.artisanAdresse && <div>{data.artisanAdresse}</div>}
                {data.artisanSiret && <div>SIRET : {data.artisanSiret}</div>}
                {data.artisanTel && <div>{data.artisanTel}</div>}
                {data.artisanEmail && <div>{data.artisanEmail}</div>}
                {data.artisanAssurance && (
                  <div>Assurance décennale : {data.artisanAssurance}{data.artisanPolice ? ` · Police n° ${data.artisanPolice}` : ""}</div>
                )}
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[24px] font-black text-white/20 tracking-widest uppercase">Devis</div>
            <div className="text-[12px] font-bold text-[#fda4af]">{data.numero}</div>
            <div className="mt-2">
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ color: statut.color, background: "rgba(255,255,255,0.92)" }}>
                {statut.label}
              </span>
            </div>
            <div className="text-[10px] text-white/50 mt-1.5 space-y-0.5">
              <div>Émis le {data.dateEmission ? new Date(data.dateEmission).toLocaleDateString("fr-FR") : "—"}</div>
              <div>Valable jusqu'au {data.dateValidite ? new Date(data.dateValidite).toLocaleDateString("fr-FR") : "—"}</div>
              {data.dateDebutTravaux && <div>Début travaux : {new Date(data.dateDebutTravaux).toLocaleDateString("fr-FR")}</div>}
              {data.dureeEstimee && <div>Durée estimée : {data.dureeEstimee}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Client */}
      <div className="px-7 py-4 bg-[#fdf2f5] border-b border-[#f0e0e8]">
        <div className="text-[9px] font-bold uppercase tracking-widest text-[#be123c] mb-1.5">Client</div>
        <div className="text-[13px] font-bold">{data.clientNom || "—"}</div>
        <div className="text-[11px] text-[#6a3a4a] leading-relaxed">
          {data.clientAdresse && <div>{data.clientAdresse}</div>}
          {data.clientTel && <div>{data.clientTel}</div>}
          {data.clientEmail && <div>{data.clientEmail}</div>}
        </div>
      </div>

      {/* Lignes */}
      <div className="px-7 py-5">
        <table className="w-full text-[11px]">
          <thead>
            <tr style={{ background: "#2a0a14" }}>
              <th className="text-left px-3 py-2 text-white font-semibold rounded-tl-lg" style={{ width: "44%" }}>Description</th>
              <th className="text-center px-2 py-2 text-white font-semibold">Qté</th>
              <th className="text-center px-2 py-2 text-white font-semibold">Unité</th>
              <th className="text-right px-2 py-2 text-white font-semibold">P.U. HT</th>
              <th className="text-right px-3 py-2 text-white font-semibold rounded-tr-lg">Total HT</th>
            </tr>
          </thead>
          <tbody>
            {data.lignes.map((l, i) => (
              <tr key={l.id} style={{ background: i % 2 === 0 ? "#fff" : "#fdf2f5" }}>
                <td className="px-3 py-2 border-b border-[#f0e0e8]">{l.description || "—"}</td>
                <td className="px-2 py-2 border-b border-[#f0e0e8] text-center">{l.quantite}</td>
                <td className="px-2 py-2 border-b border-[#f0e0e8] text-center text-[#6a3a4a]">{l.unite}</td>
                <td className="px-2 py-2 border-b border-[#f0e0e8] text-right">{fmt(l.prixUnitaire)} €</td>
                <td className="px-3 py-2 border-b border-[#f0e0e8] text-right font-semibold">{fmt(l.quantite * l.prixUnitaire)} €</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <div className="w-52 space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#6a3a4a]">Sous-total HT</span>
              <span className="font-semibold">{fmt(sousTotal)} €</span>
            </div>
            <div className="flex justify-between text-[11px] border-b border-[#f0e0e8] pb-1.5">
              <span className="text-[#6a3a4a]">TVA ({data.tvaRate}%)</span>
              <span className="font-semibold">{fmt(tva)} €</span>
            </div>
            <div className="flex justify-between text-[14px] font-bold pt-1">
              <span>Total TTC</span>
              <span style={{ color: "#be123c" }}>{fmt(total)} €</span>
            </div>
            {data.acompte > 0 && (
              <div className="flex justify-between text-[11px] rounded-lg px-2 py-1.5 mt-1" style={{ background: "#fdf2f5" }}>
                <span className="text-[#6a3a4a]">Acompte ({data.acompte}%)</span>
                <span className="font-bold" style={{ color: "#be123c" }}>{fmt(acompteAmt)} €</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {(data.notes || data.conditions) && (
        <div className="px-7 pb-5 grid grid-cols-2 gap-5 border-t border-[#f0e0e8] pt-4">
          {data.notes && (
            <div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#be123c] mb-1.5">Notes</div>
              <div className="text-[10px] text-[#6a3a4a] leading-relaxed">{data.notes}</div>
            </div>
          )}
          {data.conditions && (
            <div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#be123c] mb-1.5">Conditions</div>
              <div className="text-[10px] text-[#6a3a4a] leading-relaxed">{data.conditions}</div>
            </div>
          )}
        </div>
      )}

      {signature && (
        <div className="px-7 pb-6 flex justify-end border-t border-[#f0e0e8] pt-4">
          <div className="text-right">
            <div className="text-[9px] font-bold uppercase tracking-widest text-[#be123c] mb-1.5">Signature artisan</div>
            <img src={signature} alt="Signature" className="h-10 border border-[#f0e0e8] rounded-lg p-1" />
          </div>
        </div>
      )}

      <div className="px-7 py-2.5 text-center text-[9px] text-white/40" style={{ background: "#2a0a14" }}>
        Document généré par PremiumArtisan · premiumartisan.fr
      </div>
    </div>
  );
}

// ── HELPERS UI ────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="text-[10px] font-bold uppercase tracking-widest text-[#be123c] mb-3">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#6a3a4a] mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-xl border-[1.5px] border-[#e8d0d8] bg-white px-3 py-2.5 text-[13px] text-[#2a0a14] placeholder-[#c0a0ac] focus:border-[#be123c] focus:outline-none transition";

// ── MAIN ──────────────────────────────────────────────
export default function DevisForm() {
  const [data, setData] = useState<DevisData>(defaultData);
  const [signature, setSignature] = useState("");
  const [logo, setLogo] = useState("");
  const [tab, setTab] = useState<"form" | "preview">("form");
  const [saved, setSaved] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof DevisData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData((d) => ({ ...d, [field]: e.target.value }));

  const updateLigne = (id: string, field: keyof LigneDevis, value: string | number) =>
    setData((d) => ({ ...d, lignes: d.lignes.map((l) => l.id === id ? { ...l, [field]: value } : l) }));

  const addLigne = () => setData((d) => ({ ...d, lignes: [...d.lignes, newLigne()] }));
  const removeLigne = (id: string) => setData((d) => ({ ...d, lignes: d.lignes.filter((l) => l.id !== id) }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePrint = () => { setTab("preview"); setTimeout(() => window.print(), 400); };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // TODO: POST /api/artisan/devis
  };

  const handleSendEmail = async () => {
    if (!data.clientEmail) return alert("Ajoutez l'email du client d'abord.");
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500)); // TODO: POST /api/artisan/devis/send
    setSending(false);
    setSentOk(true);
    setData((d) => ({ ...d, statut: "envoye" }));
    setTimeout(() => setSentOk(false), 3000);
  };

  const handleConvertirFacture = () => {
    alert("Conversion en facture — disponible prochainement.");
    // TODO: router.push(`/artisan/factures/new?from=devis&id=...`)
  };

  const sousTotal = data.lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0);
  const tva = sousTotal * (data.tvaRate / 100);
  const total = sousTotal + tva;

  return (
    <div className="min-h-screen" style={{ background: "#fdf2f5", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* HEADER */}
      <div className="sticky top-0 z-40 border-b border-[#e8d0d8] bg-white/95 backdrop-blur-sm px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-[16px] font-bold text-[#2a0a14]" style={{ fontFamily: "Georgia, serif" }}>
            Premium<span className="text-[#be123c]">Artisan</span>
          </div>
          <span className="text-[#e8d0d8]">·</span>
          <span className="text-[13px] font-semibold text-[#6a3a4a]">Nouveau devis</span>
          <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#fdf2f5] border border-[#e8d0d8] text-[#6a3a4a]">{data.numero}</span>
          <StatutBadge statut={data.statut} />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex rounded-xl border border-[#e8d0d8] overflow-hidden lg:hidden">
            <button onClick={() => setTab("form")} className={`px-3 py-1.5 text-[12px] font-semibold transition ${tab === "form" ? "bg-[#2a0a14] text-white" : "text-[#6a3a4a]"}`}>Formulaire</button>
            <button onClick={() => setTab("preview")} className={`px-3 py-1.5 text-[12px] font-semibold transition ${tab === "preview" ? "bg-[#2a0a14] text-white" : "text-[#6a3a4a]"}`}>Aperçu</button>
          </div>
          <button onClick={handleConvertirFacture} className="px-3 py-2 rounded-xl border border-[#e8d0d8] text-[12px] font-semibold text-[#6a3a4a] hover:border-[#be123c] hover:text-[#be123c] transition">🧾 → Facture</button>
          <button onClick={handleSendEmail} disabled={sending || sentOk} className={`px-3 py-2 rounded-xl text-[12px] font-semibold border transition ${sentOk ? "bg-green-50 border-green-300 text-green-700" : "border-[#e8d0d8] text-[#6a3a4a] hover:border-[#be123c]"}`}>
            {sentOk ? "✓ Envoyé !" : sending ? "Envoi…" : "Envoyer au client"}
          </button>
          <button onClick={handleSave} className="px-3 py-2 rounded-xl border border-[#e8d0d8] text-[12px] font-semibold text-[#6a3a4a] hover:border-[#be123c] transition">
            {saved ? "✓ Sauvegardé" : "Sauvegarder"}
          </button>
          <button onClick={handlePrint} className="px-4 py-2 rounded-xl bg-[#be123c] text-white text-[12px] font-bold hover:bg-[#e11d48] transition shadow-[0_4px_14px_rgba(190,18,60,0.3)]">📄 PDF</button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* FORMULAIRE */}
        <div className={`space-y-3 ${tab === "preview" ? "hidden lg:block" : ""}`}>

          {/* Statut */}
          <div className="rounded-2xl border border-[#e8d0d8] bg-white p-5">
            <Section title="Statut du devis">
              <div className="flex gap-2 flex-wrap">
                {STATUTS.map((s) => (
                  <button key={s.value} onClick={() => setData((d) => ({ ...d, statut: s.value }))}
                    className="px-3 py-1.5 rounded-full text-[12px] font-bold border-2 transition"
                    style={{ color: s.color, background: data.statut === s.value ? s.bg : "white", borderColor: data.statut === s.value ? s.color : "#e8d0d8" }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </Section>
          </div>

          {/* Artisan */}
          <div className="rounded-2xl border border-[#e8d0d8] bg-white p-5">
            <Section title="Vos informations (Artisan)">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-2">
                <div onClick={() => logoRef.current?.click()}
                  className="w-14 h-14 rounded-xl border-2 border-dashed border-[#e8d0d8] flex items-center justify-center cursor-pointer hover:border-[#be123c] transition overflow-hidden bg-[#fdf2f5]">
                  {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain" /> : null}
                </div>
                <div>
                  <button onClick={() => logoRef.current?.click()} className="text-[12px] font-semibold text-[#be123c] hover:underline block">
                    {logo ? "Changer le logo" : "Ajouter votre logo"}
                  </button>
                  <div className="text-[10px] text-[#c0a0ac]">PNG, JPG · apparaît sur le PDF</div>
                </div>
                <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Nom / Raison sociale *">
                  <input className={inputCls} placeholder="Pierre Martin Peinture" value={data.artisanNom} onChange={set("artisanNom")} />
                </Field>
                <Field label="SIRET *">
                  <input className={inputCls} placeholder="123 456 789 00012" value={data.artisanSiret} onChange={set("artisanSiret")} />
                </Field>
              </div>
              <Field label="Adresse">
                <input className={inputCls} placeholder="12 rue de la Paix, 21000 Dijon" value={data.artisanAdresse} onChange={set("artisanAdresse")} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Téléphone">
                  <input className={inputCls} placeholder="06 00 00 00 00" value={data.artisanTel} onChange={set("artisanTel")} />
                </Field>
                <Field label="Email">
                  <input className={inputCls} type="email" placeholder="contact@artisan.fr" value={data.artisanEmail} onChange={set("artisanEmail")} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Assurance décennale">
                  <input className={inputCls} placeholder="AXA, Allianz, MAAF…" value={data.artisanAssurance} onChange={set("artisanAssurance")} />
                </Field>
                <Field label="N° de police">
                  <input className={inputCls} placeholder="123456789" value={data.artisanPolice} onChange={set("artisanPolice")} />
                </Field>
              </div>
            </Section>
          </div>

          {/* Client */}
          <div className="rounded-2xl border border-[#e8d0d8] bg-white p-5">
            <Section title="Client">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Nom du client *">
                  <input className={inputCls} placeholder="Marie Dupont" value={data.clientNom} onChange={set("clientNom")} />
                </Field>
                <Field label="Téléphone">
                  <input className={inputCls} placeholder="06 00 00 00 00" value={data.clientTel} onChange={set("clientTel")} />
                </Field>
              </div>
              <Field label="Adresse du chantier">
                <input className={inputCls} placeholder="45 avenue de la République, 21000 Dijon" value={data.clientAdresse} onChange={set("clientAdresse")} />
              </Field>
              <Field label="Email client (pour envoi automatique)">
                <input className={inputCls} type="email" placeholder="client@email.fr" value={data.clientEmail} onChange={set("clientEmail")} />
              </Field>
            </Section>
          </div>

          {/* Devis info */}
          <div className="rounded-2xl border border-[#e8d0d8] bg-white p-5">
            <Section title="Informations du devis">
              <div className="grid grid-cols-3 gap-3">
                <Field label="Numéro">
                  <input className={inputCls} value={data.numero} onChange={set("numero")} />
                </Field>
                <Field label="Date d'émission">
                  <input className={inputCls} type="date" value={data.dateEmission} onChange={set("dateEmission")} />
                </Field>
                <Field label="Valable jusqu'au">
                  <input className={inputCls} type="date" value={data.dateValidite} onChange={set("dateValidite")} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date début travaux">
                  <input className={inputCls} type="date" value={data.dateDebutTravaux} onChange={set("dateDebutTravaux")} />
                </Field>
                <Field label="Durée estimée">
                  <input className={inputCls} placeholder="Ex: 3 jours, 1 semaine…" value={data.dureeEstimee} onChange={set("dureeEstimee")} />
                </Field>
              </div>
            </Section>
          </div>

          {/* Lignes */}
          <div className="rounded-2xl border border-[#e8d0d8] bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#be123c]">Prestations & matériaux</div>
              <button onClick={addLigne} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fdf2f5] border border-[#e8d0d8] text-[12px] font-semibold text-[#be123c] hover:bg-[#be123c] hover:text-white transition">
                + Ajouter une ligne
              </button>
            </div>
            <div className="grid gap-1.5 mb-2 text-[10px] font-bold uppercase tracking-wide text-[#c0a0ac]" style={{ gridTemplateColumns: "1fr 65px 75px 85px 85px 28px" }}>
              <span>Description</span><span className="text-center">Qté</span><span className="text-center">Unité</span><span className="text-right">P.U. HT €</span><span className="text-right">Total HT</span><span />
            </div>
            <div className="space-y-2">
              {data.lignes.map((l) => (
                <div key={l.id} className="grid gap-1.5 items-center" style={{ gridTemplateColumns: "1fr 65px 75px 85px 85px 28px" }}>
                  <input className={inputCls} placeholder="Peinture murs salon 2 couches" value={l.description} onChange={(e) => updateLigne(l.id, "description", e.target.value)} />
                  <input className={`${inputCls} text-center`} type="number" min={0} step={0.5} value={l.quantite} onChange={(e) => updateLigne(l.id, "quantite", parseFloat(e.target.value) || 0)} />
                  <select className={inputCls} value={l.unite} onChange={(e) => updateLigne(l.id, "unite", e.target.value)}>
                    {UNITES.map((u) => <option key={u}>{u}</option>)}
                  </select>
                  <input className={`${inputCls} text-right`} type="number" min={0} step={0.5} value={l.prixUnitaire} onChange={(e) => updateLigne(l.id, "prixUnitaire", parseFloat(e.target.value) || 0)} />
                  <div className="text-right text-[13px] font-bold text-[#2a0a14] pr-1">{fmt(l.quantite * l.prixUnitaire)} €</div>
                  <button onClick={() => removeLigne(l.id)} disabled={data.lignes.length === 1} className="flex items-center justify-center w-7 h-7 rounded-lg text-[#c0a0ac] hover:text-[#be123c] hover:bg-[#fdf2f5] transition disabled:opacity-30">✕</button>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-[#f0e0e8] flex justify-end">
              <div className="w-60 space-y-1.5">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[#6a3a4a]">Sous-total HT</span>
                  <span className="font-semibold">{fmt(sousTotal)} €</span>
                </div>
                <div className="flex justify-between text-[13px] items-center gap-2">
                  <span className="text-[#6a3a4a]">TVA</span>
                  <div className="flex items-center gap-2">
                    <select className="rounded-lg border border-[#e8d0d8] px-2 py-1 text-[12px] text-[#2a0a14]" value={data.tvaRate} onChange={(e) => setData((d) => ({ ...d, tvaRate: parseFloat(e.target.value) }))}>
                      {TVA_OPTIONS.map((t) => <option key={t} value={t}>{t}%</option>)}
                    </select>
                    <span className="font-semibold">{fmt(tva)} €</span>
                  </div>
                </div>
                <div className="flex justify-between text-[15px] font-bold pt-1.5 border-t border-[#f0e0e8]">
                  <span>Total TTC</span>
                  <span className="text-[#be123c]">{fmt(total)} €</span>
                </div>
                <div className="flex justify-between text-[13px] items-center gap-2 pt-1">
                  <span className="text-[#6a3a4a]">Acompte</span>
                  <div className="flex items-center gap-2">
                    <select className="rounded-lg border border-[#e8d0d8] px-2 py-1 text-[12px] text-[#2a0a14]" value={data.acompte} onChange={(e) => setData((d) => ({ ...d, acompte: parseFloat(e.target.value) }))}>
                      {[0, 10, 20, 30, 40, 50].map((a) => <option key={a} value={a}>{a}%</option>)}
                    </select>
                    <span className="font-bold text-[#be123c]">{fmt(total * data.acompte / 100)} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-2xl border border-[#e8d0d8] bg-white p-5">
            <Section title="Notes & Conditions">
              <Field label="Notes (visibles sur le devis)">
                <textarea className={`${inputCls} resize-none`} rows={2} placeholder="Délai d'exécution, remarques particulières…" value={data.notes} onChange={set("notes")} />
              </Field>
              <Field label="Conditions de paiement">
                <textarea className={`${inputCls} resize-none`} rows={2} value={data.conditions} onChange={set("conditions")} />
              </Field>
            </Section>
          </div>

          {/* Signature */}
          <div className="rounded-2xl border border-[#e8d0d8] bg-white p-5">
            <Section title="Signature artisan">
              <SignaturePad onSign={setSignature} />
            </Section>
          </div>

          {/* Actions bas */}
          <div className="grid grid-cols-3 gap-2 pb-10">
            <button onClick={handleConvertirFacture} className="py-3 rounded-xl border-2 border-[#e8d0d8] text-[13px] font-semibold text-[#6a3a4a] hover:border-[#be123c] hover:text-[#be123c] transition">🧾 → Facture</button>
            <button onClick={handleSave} className="py-3 rounded-xl border-2 border-[#e8d0d8] text-[13px] font-semibold text-[#6a3a4a] hover:border-[#be123c] transition">
              {saved ? "✓ Sauvegardé" : "Sauvegarder"}
            </button>
            <button onClick={handlePrint} className="py-3 rounded-xl bg-[#be123c] text-white text-[13px] font-bold hover:bg-[#e11d48] transition shadow-[0_6px_20px_rgba(190,18,60,0.3)]">📄 Générer PDF</button>
          </div>
        </div>

        {/* PREVIEW */}
        <div className={`lg:sticky lg:top-20 lg:h-fit ${tab === "form" ? "hidden lg:block" : ""}`}>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#c0a0ac] mb-3 flex items-center gap-2">
            <span>Aperçu en temps réel</span>
            <span className="flex-1 h-px bg-[#e8d0d8]" />
          </div>
          <div className="overflow-auto max-h-[calc(100vh-100px)] rounded-2xl">
            <PreviewDevis data={data} signature={signature} logo={logo} />
          </div>
        </div>

      </div>

      <style>{`
        @media print {
          body > * { display: none !important; }
          #devis-preview { display: block !important; position: fixed; inset: 0; z-index: 9999; }
        }
      `}</style>
    </div>
  );
}