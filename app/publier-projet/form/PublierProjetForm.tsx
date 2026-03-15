"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const PAINT_OPTIONS = [
  "intérieure",
  "rénovation",
  "décorative",
  "bois et menuiserie",
  "commerciale",
  "extérieure",
];

// ── BUDGET TIERS MIS À JOUR ────────────────────────────────────────────────────
type BudgetRange =
  | "lt_500"
  | "500_1500"
  | "1500_3000"
  | "3000_7000"
  | "7000_15000"
  | "15000_25000"
  | "25000_40000"
  | "40000_60000"
  | "60000_100000"
  | "100000_plus"
  | "";

const BUDGET_OPTIONS: Array<{ value: BudgetRange; label: string }> = [
  { value: "lt_500",        label: "Moins de 500€" },
  { value: "500_1500",      label: "500€ – 1 500€" },
  { value: "1500_3000",     label: "1 500€ – 3 000€" },
  { value: "3000_7000",     label: "3 000€ – 7 000€" },
  { value: "7000_15000",    label: "7 000€ – 15 000€" },
  { value: "15000_25000",   label: "15 000€ – 25 000€" },
  { value: "25000_40000",   label: "25 000€ – 40 000€" },
  { value: "40000_60000",   label: "40 000€ – 60 000€" },
  { value: "60000_100000",  label: "60 000€ – 100 000€" },
  { value: "100000_plus",   label: "100 000€+" },
];

function formatBudgetLabel(v: BudgetRange) {
  return BUDGET_OPTIONS.find((x) => x.value === v)?.label ?? "-";
}

const VALID_PREFIXES = ["01", "02", "03", "04", "05", "06", "07", "09"];

function formatFrenchPhoneWithSpaces(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0033")) digits = "0" + digits.slice(4);
  else if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length >= 2 && digits[0] === "0" && digits[1] === "8") digits = "0" + digits.slice(2);
  digits = digits.slice(0, 10);
  const parts: string[] = [];
  for (let i = 0; i < digits.length; i += 2) parts.push(digits.slice(i, i + 2));
  return parts.join(" ");
}

function onlyDigitsMax(raw: string, maxLen: number) {
  return raw.replace(/\D/g, "").slice(0, maxLen);
}

function toNameCase(value: string) {
  return value
    .replace(/\s+/g, " ")
    .trimStart()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

type CpResult = { label: string; postcode: string; city: string; context?: string };

const PIECE_OPTIONS = [
  { value: "salon",       label: "Salon / Séjour" },
  { value: "cuisine",     label: "Cuisine" },
  { value: "salle_bain",  label: "Salle de bain" },
  { value: "chambre",     label: "Chambre" },
  { value: "couloir",     label: "Couloir / Entrée" },
  { value: "bureau",      label: "Bureau" },
  { value: "exterieur",   label: "Extérieur / Façade" },
  { value: "autre",       label: "Autre / Plusieurs pièces" },
];

type StepKey =
  | "categories"
  | "piece_type"
  | "surface_m2"
  | "name"
  | "phone"
  | "email"
  | "localisation"
  | "budget"
  | "photos"
  | "description"
  | "review";

const STEPS: Array<{ key: StepKey; title: string; required?: boolean }> = [
  { key: "categories",  title: "Catégorie",    required: true },
  { key: "piece_type",  title: "Pièce",        required: true },
  { key: "surface_m2",  title: "Surface",      required: true },
  { key: "name",        title: "Nom",          required: true },
  { key: "phone",       title: "Téléphone",    required: true },
  { key: "email",       title: "Email",        required: true },
  { key: "localisation",title: "Localisation", required: true },
  { key: "budget",      title: "Budget estimé",required: true },
  { key: "photos",      title: "Photos",       required: false },
  { key: "description", title: "Description",  required: false },
  { key: "review",      title: "Résumé",       required: true },
];

export default function PublierProjetForm() {
  const router = useRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [pieceType, setPieceType] = useState<string[]>([]);
  const [surfaceM2, setSurfaceM2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postal, setPostal] = useState("");
  const [cpQuery, setCpQuery] = useState("");
  const [location, setLocation] = useState("");
  const [surface, setSurface] = useState("");
  const [budget, setBudget] = useState<BudgetRange>("");
  const [description, setDescription] = useState("");
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];
  const nextStep = () => setStepIndex((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStepIndex((s) => Math.max(s - 1, 0));
  const [honeypot, setHoneypot] = useState("");
  const phoneDigits = phone.replace(/\D/g, "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cpOpen, setCpOpen] = useState(false);
  const [cpLoading, setCpLoading] = useState(false);
  const [cpGpsLoading, setCpGpsLoading] = useState(false);
  const [cpResults, setCpResults] = useState<CpResult[]>([]);
  const [cpPill, setCpPill] = useState<string>("");
  const cpWrapRef = useRef<HTMLDivElement | null>(null);
  const cpDebounceRef = useRef<number | null>(null);

  const canGoNext = useMemo(() => {
    switch (step.key) {
      case "categories":   return categories.length > 0;
      case "piece_type":   return pieceType.length > 0;
      case "surface_m2":   return surfaceM2.trim() !== "" && parseInt(surfaceM2) > 0;
      case "name":         return name.trim().length >= 2;
      case "phone":
        if (phoneDigits.length !== 10 || phoneDigits[0] !== "0") return false;
        return VALID_PREFIXES.includes(phoneDigits.slice(0, 2));
      case "email":      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      case "localisation": return postal.length === 5 && location.trim().length > 0;
      case "budget":       return budget !== "";
      case "photos":       return true;
      case "description":  return true;
      case "review":       return true;
      default:             return false;
    }
  }, [step.key, categories.length, pieceType.length, surfaceM2, name, email, phoneDigits.length, postal, location, budget]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (cpOpen && cpWrapRef.current && !cpWrapRef.current.contains(target)) setCpOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [cpOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (!loading) prevStep(); }
      if (e.key === "Enter") {
        const el = e.target as HTMLElement | null;
        if (el?.tagName === "TEXTAREA") return;
        if (!loading && canGoNext) { e.preventDefault(); nextStep(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canGoNext, loading]);

  const toggleCategory = (value: string) => {
    setCategories((prev) => prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]);
    setErrorMsg("");
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, 4);
    setPhotoFiles((prev) => [...prev, ...incoming].slice(0, 4));
    setPhotoNames((prev) => [...prev, ...incoming.map(f => f.name)].slice(0, 4));
  };

  const removePhoto = (fileName: string) => {
    const idx = photoNames.indexOf(fileName);
    setPhotoNames((prev) => prev.filter((n) => n !== fileName));
    setPhotoFiles((prev) => prev.filter((_, i) => i !== idx));
  };
  const onDropzoneClick = () => fileInputRef.current?.click();
  const onDropzoneDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const onDropzoneDragLeave = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const onDropzoneDrop = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); handleFiles(e.dataTransfer.files); };

  const fetchCpSuggestions = async (q: string) => {
    const query = q.trim();
    if (query.length < 2) { setCpResults([]); setCpOpen(false); return; }
    setCpLoading(true); setCpOpen(true);
    try {
      const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=6&autocomplete=1`);
      const data = await res.json();
      const features = Array.isArray(data?.features) ? data.features : [];
      const mapped: CpResult[] = features.map((f: any) => {
        const p = f?.properties || {};
        const city = p.city || p.municipality || "";
        const postcode = p.postcode || "";
        return { label: p.label || [postcode, city].filter(Boolean).join(" "), postcode, city, context: p.context || "" };
      }).filter((x: CpResult) => (x.postcode && x.city) || x.label);
      setCpResults(mapped);
    } catch { setCpResults([]); } finally { setCpLoading(false); }
  };

  const onCpInputChange = (value: string) => {
    setCpQuery(value); setErrorMsg(""); setCpPill("");
    if (cpDebounceRef.current) window.clearTimeout(cpDebounceRef.current);
    cpDebounceRef.current = window.setTimeout(() => fetchCpSuggestions(value), 80);
  };

  const applyCpSelection = (item: CpResult) => {
    if (item.postcode) setPostal(item.postcode);
    setLocation(item.city && item.context ? `${item.city} — ${item.context}` : item.city || item.label);
    setCpQuery(`${item.postcode ? item.postcode + " " : ""}${item.city || ""}`.trim());
    setCpPill(`${item.postcode || ""} — ${item.city || ""}${item.context ? ` (${item.context})` : ""}`.replace(/\s+/g, " ").trim());
    setCpOpen(false); setErrorMsg("");
  };

  const onUseGps = () => {
    setErrorMsg("");
    if (!("geolocation" in navigator)) { setErrorMsg("Localisation non disponible."); return; }
    setCpGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lat=${latitude}&lon=${longitude}&limit=1`);
          const data = await res.json();
          const p = data?.features?.[0]?.properties || {};
          const postcode = p.postcode || ""; const city = p.city || p.municipality || ""; const context = p.context || "";
          if (postcode) setPostal(postcode);
          if (city) setLocation(context ? `${city} — ${context}` : city);
          setCpQuery(`${postcode ? postcode + " " : ""}${city}`.trim());
          if (postcode || city) setCpPill(`${postcode} — ${city}${context ? ` (${context})` : ""}`.trim());
          else setErrorMsg("Localisation non disponible. Essayez la recherche manuelle.");
        } catch { setErrorMsg("Erreur GPS."); } finally { setCpGpsLoading(false); }
      },
      () => { setCpGpsLoading(false); setErrorMsg("Localisation non disponible."); },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  };

  const goNextWithValidation = () => {
    setErrorMsg("");
    if (!canGoNext) {
      const msgs: Partial<Record<StepKey, string>> = {
        categories:  "Veuillez choisir au moins une catégorie.",
        piece_type:  "Veuillez choisir le type de pièce.",
        surface_m2:  "Veuillez indiquer la surface.",
        name:        "Veuillez saisir votre nom.",
        phone:       "Veuillez saisir un numéro de téléphone valide.",
        email:       "Veuillez saisir une adresse email valide.",
        localisation:"Veuillez choisir une localisation valide.",
        budget:      "Veuillez sélectionner un budget estimé.",
      };
      setErrorMsg(msgs[step.key] || "Veuillez compléter cette étape.");
      return;
    }
    nextStep();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || honeypot.trim() !== "") return;
    const validPhonePrefix = phoneDigits.length === 10 && phoneDigits[0] === "0" && VALID_PREFIXES.includes(phoneDigits.slice(0, 2));
    if (!categories.length || !name.trim() || phoneDigits.length !== 10 || !validPhonePrefix || postal.length !== 5 || !budget) {
      setErrorMsg("Veuillez remplir les champs obligatoires.");
      return;
    }
    setLoading(true); setErrorMsg("");
    try {
      // Dërgo si FormData për të mbështetur file upload
      const fd = new FormData();
      fd.append("honeypot", honeypot);
      fd.append("category", `Peinture : ${categories.join(", ")}`);
      fd.append("piece_type", pieceType.join(", "));
      fd.append("surface_m2", surfaceM2);
      fd.append("name", name.trim());
      fd.append("email", email.trim());
      fd.append("phone", phoneDigits);
      fd.append("postal", postal);
      fd.append("location", location);
      fd.append("budget", budget);
      fd.append("description", description);
      // Shto skedarin e parë (foto kryesore)
      if (photoFiles.length > 0) {
        fd.append("photo", photoFiles[0], photoFiles[0].name);
      }

      const res = await fetch("/api/publier-projet", {
        method: "POST",
        body: fd, // NUK vendos Content-Type — browser e vendos vetë me boundary
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) { setErrorMsg(data?.error || "Erreur serveur. Réessayez."); return; }
      const token = typeof data?.token === "string" ? data.token : null;
      if (!token) { setErrorMsg("Erreur serveur. Réessayez."); return; }
      router.push(`/confirmation?token=${encodeURIComponent(token)}`);
    } catch { setErrorMsg("Erreur serveur. Réessayez."); } finally { setLoading(false); }
  };

  const progressPct = ((stepIndex + 1) / STEPS.length) * 100;

  return (
    <>
      <style>{`
        .pa-form-input:focus { outline: none; border-color: rgba(99,179,237,0.6) !important; background: rgba(255,255,255,0.09) !important; }
        .pa-budget-btn:hover { background: rgba(255,255,255,0.09) !important; }
        .pa-gps-btn:hover:not(:disabled) { background: rgba(255,255,255,0.14) !important; }
        .pa-cp-item:hover { background: rgba(255,255,255,0.07) !important; }
        .pa-checkbox-label:hover { border-color: rgba(99,179,237,0.4) !important; }
        * { box-sizing: border-box; }
      `}</style>
      <main style={S.page}>
        <div style={S.card}>

          {/* Header */}
          <div style={S.headerRow}>
            <div>
              <h1 style={S.title}>Publier votre projet</h1>
              <p style={S.subtitle}>Formulaire rapide — réponse sans engagement</p>
            </div>
            <div style={S.progressBox}>
              <div style={S.progressText}>Étape {stepIndex + 1} / {STEPS.length}</div>
              <div style={S.progressBar}>
                <div style={{ ...S.progressFill, width: `${progressPct}%` }} />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={S.form}>
            <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }} autoComplete="off" tabIndex={-1} />

            {/* ── STEP: Catégories ── */}
            {step.key === "categories" && (
              <div style={S.stepBlock}>
                <label style={S.label}>Quel type de peinture ?</label>
                <div style={S.checkboxGrid}>
                  {PAINT_OPTIONS.map((opt) => {
                    const sel = categories.includes(opt);
                    return (
                      <label key={opt} className="pa-checkbox-label" style={{
                        ...S.checkboxLabel,
                        background: sel ? "rgba(99,179,237,0.15)" : "rgba(255,255,255,0.05)",
                        borderColor: sel ? "rgba(99,179,237,0.55)" : "rgba(255,255,255,0.11)",
                      }}>
                        <input type="checkbox" checked={sel} onChange={() => toggleCategory(opt)} style={{ display: "none" }} />
                        <span style={S.checkboxText}>{opt}</span>
                        {sel && <span style={S.checkboxMark}>✓</span>}
                      </label>
                    );
                  })}
                </div>
                {!!categories.length && (
                  <div style={S.helperInline}>
                    <span style={S.helperDot} />
                    <span>{categories.length} sélectionné{categories.length > 1 ? "s" : ""}</span>
                  </div>
                )}
              </div>
            )}

            {/* ── STEP: Pièce ── */}
            {step.key === "piece_type" && (
              <div style={S.stepBlock}>
                <label style={S.label}>Quelle pièce ? <span style={{ opacity: 0.6, fontWeight: 400 }}>(plusieurs possibles)</span></label>
                <div style={S.checkboxGrid}>
                  {PIECE_OPTIONS.map((opt) => {
                    const sel = pieceType.includes(opt.value);
                    return (
                      <div key={opt.value} className="pa-checkbox-label"
                        onClick={() => {
                          setPieceType(prev =>
                            prev.includes(opt.value) ? prev.filter(x => x !== opt.value) : [...prev, opt.value]
                          );
                          setErrorMsg("");
                        }}
                        style={{
                          ...S.checkboxLabel,
                          cursor: "pointer",
                          background: sel ? "rgba(99,179,237,0.15)" : "rgba(255,255,255,0.05)",
                          borderColor: sel ? "rgba(99,179,237,0.55)" : "rgba(255,255,255,0.11)",
                        }}>
                        <span style={S.checkboxText}>{opt.label}</span>
                        {sel && <span style={S.checkboxMark}>✓</span>}
                      </div>
                    );
                  })}
                </div>
                {!!pieceType.length && (
                  <div style={S.helperInline}>
                    <span style={S.helperDot} />
                    <span>{pieceType.length} sélectionné{pieceType.length > 1 ? "s" : ""}</span>
                  </div>
                )}
              </div>
            )}

            {/* ── STEP: Surface ── */}
            {step.key === "surface_m2" && (
              <div style={S.stepBlock}>
                <label style={S.label}>Quelle surface à peindre ?</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <input className="pa-form-input" style={{ ...S.input, maxWidth: 160, fontSize: 28, fontWeight: 700, textAlign: "center", padding: "14px 16px" }}
                    type="text" inputMode="numeric" placeholder="0"
                    value={surfaceM2}
                    onChange={(e) => setSurfaceM2(onlyDigitsMax(e.target.value, 4))} />
                  <span style={{ fontSize: 22, fontWeight: 700, opacity: 0.7 }}>m²</span>
                </div>
                <div style={S.helperText}>Surface approximative des murs à peindre.</div>
              </div>
            )}

            {/* ── STEP: Nom ── */}
            {step.key === "name" && (
              <div style={S.stepBlock}>
                <label style={S.label}>Votre nom</label>
                <input className="pa-form-input" style={S.input} placeholder="Jean Dupont"
                  value={name} onChange={(e) => setName(toNameCase(e.target.value))} />
              </div>
            )}

            {/* ── STEP: Téléphone ── */}
            {step.key === "phone" && (
              <div style={S.stepBlock}>
                <label style={S.label}>Téléphone</label>
                <input className="pa-form-input" style={S.input} type="tel" inputMode="tel"
                  placeholder="06 12 34 56 78" value={phone}
                  onChange={(e) => setPhone(formatFrenchPhoneWithSpaces(e.target.value))} />
                {phoneDigits.length > 0 && (phoneDigits.length !== 10 || phoneDigits[0] !== "0" || !VALID_PREFIXES.includes(phoneDigits.slice(0, 2))) && (
                  <div style={{ fontSize: 12, color: "#fca5a5", marginTop: 4 }}>
                    {phoneDigits.length !== 10 ? "10 chiffres requis (ex: 06 12 34 56 78)" : "Numéro invalide. Utilisez 01–07 ou 09."}
                  </div>
                )}
                <div style={S.phoneHint}>Visible uniquement par <b>3 artisans maximum</b></div>
              </div>
            )}

            {/* ── STEP: Email ── */}
            {step.key === "email" && (
              <div style={S.stepBlock}>
                <label style={S.label}>Votre adresse email</label>
                <input className="pa-form-input" style={S.input} type="email" inputMode="email"
                  placeholder="jean.dupont@email.fr" value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  autoComplete="email" />
                {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                  <div style={{ fontSize: 12, color: "#fca5a5", marginTop: 4 }}>
                    Adresse email invalide.
                  </div>
                )}
                <div style={S.phoneHint}>Pour recevoir la confirmation de votre projet.</div>
              </div>
            )}

            {/* ── STEP: Localisation ── */}
            {step.key === "localisation" && (
              <div style={S.stepBlock}>
                <div style={{ position: "relative" }} ref={cpWrapRef}>
                    <label style={{ ...S.label, marginBottom: 6 }}>Code postal</label>
                    <input className="pa-form-input" style={S.input} placeholder="75001"
                      inputMode="numeric" maxLength={5} value={postal}
                      onKeyDown={(e) => { if (["Backspace","Tab","ArrowLeft","ArrowRight","Delete"].includes(e.key)) return; if (!/^\d$/.test(e.key)) e.preventDefault(); }}
                      onPaste={(e) => { e.preventDefault(); const v = onlyDigitsMax(e.clipboardData?.getData("text") ?? "", 5); setPostal(v); if (!v) { setCpPill(""); setCpQuery(""); } }}
                      onChange={(e) => { const v = onlyDigitsMax(e.target.value, 5); setPostal(v); if (!v) { setCpPill(""); setCpQuery(""); } else if (v.length >= 2) { setCpQuery(v); if (cpDebounceRef.current) window.clearTimeout(cpDebounceRef.current); cpDebounceRef.current = window.setTimeout(() => fetchCpSuggestions(v), 150); } }}
                      onFocus={() => { if (postal.length >= 2 && cpResults.length) setCpOpen(true); }}
                    />
                    {postal.length > 0 && postal.length !== 5 && <div style={{ fontSize: 12, color: "#fca5a5", marginTop: 4 }}>5 chiffres requis</div>}
                    <input className="pa-form-input" type="text" style={{ ...S.input, marginTop: 8 }}
                      placeholder="Ou recherche : Paris, Lyon..." value={cpQuery}
                      onChange={(e) => onCpInputChange(e.target.value)}
                      onFocus={() => { if (cpResults.length) setCpOpen(true); }} />
                    <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                      <button type="button" className="pa-gps-btn" style={S.cpCtaBtn}
                        onClick={onUseGps} disabled={cpGpsLoading}>
                        {cpGpsLoading ? "Localisation en cours…" : "📍 Remplir automatiquement"}
                      </button>
                      <div style={S.cpMicro}>Autorisation GPS au clic.</div>
                      {cpPill && (
                        <div style={S.cpPill}>
                          <span style={{ fontSize: 12, opacity: 0.9 }}>{cpPill}</span>
                          <button type="button" style={S.cpPillBtn}
                            onClick={() => { setCpPill(""); setCpQuery(""); setPostal(""); setLocation(""); }}>
                            Changer
                          </button>
                        </div>
                      )}
                    </div>
                    {cpOpen && (
                      <div style={S.cpMenu}>
                        {cpLoading ? <div style={{ padding: 12, fontSize: 13, opacity: 0.85 }}>Recherche…</div>
                          : cpResults.length ? cpResults.map((r, idx) => (
                            <button type="button" key={`${r.label}-${idx}`} className="pa-cp-item"
                              style={S.cpItem} onClick={() => applyCpSelection(r)}>
                              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                <span style={{ fontWeight: 800 }}>{r.postcode || "—"}</span>
                                <span style={{ opacity: 0.92 }}>{r.city || r.label}</span>
                              </div>
                              {!!r.context && <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>{r.context}</div>}
                            </button>
                          )) : <div style={{ padding: 12, fontSize: 13, opacity: 0.85 }}>Aucun résultat</div>}
                      </div>
                    )}
                </div>
                <div>
                  <label style={S.label}>Ville / Zone</label>
                  <input className="pa-form-input" style={{ ...S.input, marginTop: 6 }} placeholder="Dijon, Paris 15..."
                    value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>
                  Code postal retenu : <b>{postal || "-"}</b>
                </div>
              </div>
            )}

            {/* ── STEP: Budget ── */}
            {step.key === "budget" && (
              <div style={S.stepBlock}>
                <label style={S.label}>Budget estimé</label>
                <div style={S.budgetGrid}>
                  {BUDGET_OPTIONS.map((opt) => {
                    const sel = budget === opt.value;
                    return (
                      <button key={opt.value} type="button" className="pa-budget-btn"
                        onClick={() => { setBudget(opt.value); setErrorMsg(""); }}
                        style={{
                          ...S.budgetOption,
                          background: sel ? "rgba(99,179,237,0.18)" : "rgba(255,255,255,0.05)",
                          borderColor: sel ? "rgba(99,179,237,0.6)" : "rgba(255,255,255,0.11)",
                          color: sel ? "#e0f2fe" : "#CBD5E1",
                          fontWeight: sel ? 700 : 400,
                        }}
                        aria-pressed={sel}>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <div style={S.helperText}>Cette estimation aide les artisans à proposer un devis plus précis.</div>
              </div>
            )}

            {/* ── STEP: Photos ── */}
            {step.key === "photos" && (
              <div style={S.stepBlock}>
                <label style={S.label}>Photos (optionnel)</label>
                <input ref={fileInputRef} type="file" accept="image/*" multiple
                  onChange={(e) => handleFiles(e.target.files)} style={{ display: "none" }} />
                <div style={{ ...S.dropzone, ...(isDragging ? S.dropzoneActive : {}) }}
                  onClick={onDropzoneClick} onDragOver={onDropzoneDragOver}
                  onDragLeave={onDropzoneDragLeave} onDrop={onDropzoneDrop}
                  role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onDropzoneClick(); }}>
                  <div style={{ display: "grid", gap: 6, textAlign: "center" }}>
                    <div style={{ fontWeight: 700 }}>📷 Glissez-déposez vos photos</div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>ou cliquez pour sélectionner (max. 4)</div>
                  </div>
                </div>
                {!!photoNames.length && (
                  <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
                    {photoNames.map((n) => (
                      <div key={n} style={S.chip}>
                        <span style={{ fontSize: 12, opacity: 0.92, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n}</span>
                        <button type="button" style={S.chipRemove} onClick={() => removePhoto(n)}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
                <div style={S.helperText}>Jusqu'à 4 photos (optionnel)</div>
              </div>
            )}

            {/* ── STEP: Description ── */}
            {step.key === "description" && (
              <div style={S.stepBlock}>
                <label style={S.label}>Description</label>
                <textarea className="pa-form-input" style={{ ...S.input, minHeight: 110, resize: "vertical" }}
                  placeholder="Décrivez votre projet..." value={description}
                  onChange={(e) => setDescription(e.target.value)} />
              </div>
            )}

            {/* ── STEP: Récapitulatif ── */}
            {step.key === "review" && (
              <div style={S.stepBlock}>
                <div style={S.previewBox}>
                  <div style={S.previewTitle}>Récapitulatif</div>
                  <div style={S.previewLine}><span style={S.previewKey}>Catégorie</span><span>Peinture — {categories.join(", ")}</span></div>
                  <div style={S.previewLine}><span style={S.previewKey}>Pièce</span><span>{pieceType.map(v => PIECE_OPTIONS.find(p => p.value === v)?.label).join(", ") || "-"}</span></div>
                  <div style={S.previewLine}><span style={S.previewKey}>Surface</span><span>{surfaceM2} m²</span></div>
                  <div style={S.previewLine}><span style={S.previewKey}>Localisation</span><span>{location ? `${location}${postal ? ` (${postal})` : ""}` : postal || "-"}</span></div>
                  <div style={S.previewLine}><span style={S.previewKey}>Email</span><span>{email || "-"}</span></div>
                  <div style={S.previewLine}><span style={S.previewKey}>Budget</span><span>{formatBudgetLabel(budget)}</span></div>
                  <div style={S.previewLine}><span style={S.previewKey}>Diffusion</span><span>3 artisans maximum</span></div>
                </div>
                <div style={S.helperText}>Vérifiez les informations, puis publiez votre projet.</div>
              </div>
            )}

            {errorMsg && <p style={S.error}>{errorMsg}</p>}

            {/* Footer */}
            <div style={S.footerNav}>
              {stepIndex > 0 ? (
                <button type="button" style={S.secondaryBtn} onClick={prevStep} disabled={loading}>Retour</button>
              ) : <span />}

              {step.key !== "review" ? (
                <button type="button" style={{ ...S.primaryBtn, opacity: canGoNext ? 1 : 0.55 }}
                  onClick={goNextWithValidation} disabled={loading || !canGoNext}>
                  Continuer
                </button>
              ) : (
                <button type="submit" style={{ ...S.primaryBtn, ...(loading ? { opacity: 0.8, cursor: "not-allowed" } : {}) }}
                  disabled={loading} aria-busy={loading}>
                  {loading ? (
                    <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                      <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="3">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
                      </path>
                    </svg><span>ENVOI...</span></>
                  ) : "PUBLIER MAINTENANT"}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    // Ngjyrë e re: blu e thellë + akuamarin
    background:
      "radial-gradient(ellipse 900px 600px at 15% 10%, rgba(6,182,212,0.18), transparent 60%)," +
      "radial-gradient(ellipse 800px 700px at 80% 80%, rgba(99,102,241,0.22), transparent 55%)," +
      "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(14,165,233,0.10), transparent 50%)," +
      "#050D1F",
  },
  card: {
    width: "100%",
    maxWidth: 760,
    background: "rgba(255,255,255,0.055)",
    borderRadius: 22,
    padding: "28px 32px",
    color: "#E2EBF6",
    border: "1px solid rgba(99,179,237,0.14)",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
    backdropFilter: "blur(18px)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  headerRow: { display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start", marginBottom: 10 },
  title: { fontSize: 27, fontWeight: 900, margin: 0, letterSpacing: -0.5, color: "#F0F7FF" },
  subtitle: { opacity: 0.7, marginTop: 5, marginBottom: 0, fontSize: 14 },
  progressBox: { minWidth: 200, maxWidth: 250, width: "40%" },
  progressText: { fontSize: 12, opacity: 0.75, marginBottom: 5, textAlign: "right" },
  progressBar: { height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" },
  progressFill: { height: 6, background: "linear-gradient(90deg, #06b6d4, #6366f1)", borderRadius: 999, transition: "width 0.35s ease" },
  form: { display: "grid", gap: 18, marginTop: 8 },
  stepBlock: { display: "grid", gap: 14 },
  label: { fontSize: 13, opacity: 0.85, fontWeight: 500, color: "#CBD5E1" },
  input: {
    width: "100%", padding: "11px 13px", borderRadius: 11,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.06)", color: "#E2EBF6",
    outline: "none", fontSize: 14, transition: "border-color 0.2s, background 0.2s",
  },
  phoneHint: { fontSize: 12, opacity: 0.75, marginTop: 6 },
  row: { display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: 12, alignItems: "start" },
  cpCtaBtn: {
    width: "100%", padding: "10px 12px", borderRadius: 11,
    border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.07)",
    color: "#CBD5E1", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", fontSize: 13,
  },
  cpMicro: { fontSize: 11, opacity: 0.65 },
  cpPill: {
    display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between",
    padding: "9px 12px", borderRadius: 10,
    border: "1px solid rgba(99,179,237,0.2)", background: "rgba(99,179,237,0.08)",
  },
  cpPillBtn: {
    border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.06)",
    color: "#CBD5E1", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 11,
  },
  cpMenu: {
    position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 25,
    background: "rgba(8, 18, 42, 0.98)", border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 13, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  },
  cpItem: {
    width: "100%", border: "none", background: "transparent", color: "#E2EBF6",
    cursor: "pointer", textAlign: "left", padding: 12,
    borderBottom: "1px solid rgba(255,255,255,0.06)", transition: "background 0.15s",
  },
  checkboxGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 9, marginTop: 4 },
  checkboxLabel: {
    display: "flex", alignItems: "center", gap: 10, padding: "11px 13px",
    borderRadius: 11, border: "1px solid", cursor: "pointer",
    transition: "all 0.18s", userSelect: "none",
  },
  checkboxText: { flex: 1, fontSize: 13, color: "#CBD5E1" },
  checkboxMark: { fontWeight: 800, color: "#67e8f9", fontSize: 14 },
  helperInline: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, opacity: 0.8 },
  helperDot: { width: 5, height: 5, borderRadius: 999, background: "#06b6d4", flexShrink: 0 },
  budgetGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 8, marginTop: 4 },
  budgetOption: {
    width: "100%", padding: "11px 13px", borderRadius: 10,
    border: "1px solid", cursor: "pointer", textAlign: "left",
    fontSize: 13, transition: "all 0.18s",
  },
  dropzone: {
    borderRadius: 13, border: "1px dashed rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.04)", padding: 18, cursor: "pointer", userSelect: "none",
  },
  dropzoneActive: { background: "rgba(99,179,237,0.10)", borderColor: "rgba(99,179,237,0.5)" },
  chip: {
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
    padding: "9px 12px", borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.05)",
  },
  chipRemove: {
    border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)",
    color: "#94a3b8", borderRadius: 8, padding: "4px 9px", cursor: "pointer", fontSize: 11,
  },
  helperText: { fontSize: 12, opacity: 0.7, marginTop: 4 },
  previewBox: {
    borderRadius: 13, border: "1px solid rgba(99,179,237,0.18)",
    background: "rgba(99,179,237,0.06)", padding: 16, display: "grid", gap: 10,
  },
  previewTitle: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, opacity: 0.6, marginBottom: 4 },
  previewLine: { display: "flex", gap: 12, fontSize: 13 },
  previewKey: { opacity: 0.6, minWidth: 90, flexShrink: 0 },
  footerNav: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 4 },
  secondaryBtn: {
    padding: "11px 16px", borderRadius: 11, border: "1px solid rgba(255,255,255,0.13)",
    background: "rgba(255,255,255,0.06)", color: "#94a3b8", cursor: "pointer", minWidth: 120, fontSize: 13,
  },
  primaryBtn: {
    padding: "12px 20px", borderRadius: 11,
    border: "none",
    background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    color: "#fff", cursor: "pointer", minWidth: 170, fontWeight: 800,
    letterSpacing: 0.3, display: "inline-flex", alignItems: "center",
    justifyContent: "center", gap: 8, fontSize: 14,
    boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
    transition: "opacity 0.2s",
  },
  error: { color: "#fca5a5", background: "rgba(239,68,68,0.12)", padding: "11px 14px", borderRadius: 11, fontSize: 13 },
};