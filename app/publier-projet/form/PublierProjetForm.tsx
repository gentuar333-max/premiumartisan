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

type BudgetRange =
  | "lt_500"
  | "500_1500"
  | "1500_3000"
  | "3000_7000"
  | "7000_plus"
  | "";

const BUDGET_OPTIONS: Array<{ value: BudgetRange; label: string }> = [
  { value: "lt_500", label: "Moins de 500€" },
  { value: "500_1500", label: "500€ – 1500€" },
  { value: "1500_3000", label: "1500€ – 3000€" },
  { value: "3000_7000", label: "3000€ – 7000€" },
  { value: "7000_plus", label: "7000€+" },
];

function formatBudgetLabel(v: BudgetRange) {
  return BUDGET_OPTIONS.find((x) => x.value === v)?.label ?? "-";
}

function formatFrenchPhoneWithSpaces(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
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

type StepKey =
  | "categories"
  | "name"
  | "phone"
  | "localisation"
  | "budget"
  | "photos"
  | "description"
  | "review";

const STEPS: Array<{ key: StepKey; title: string; required?: boolean }> = [
  { key: "categories", title: "Catégorie", required: true },
  { key: "name", title: "Nom", required: true },
  { key: "phone", title: "Téléphone", required: true },
  { key: "localisation", title: "Localisation", required: true },
  { key: "budget", title: "Budget estimé", required: true },
  { key: "photos", title: "Photos", required: false },
  { key: "description", title: "Description", required: false },
  { key: "review", title: "Résumé", required: true },
];

export default function PublierProjetForm() {
  const router = useRouter();

  // --- Form data
  const [categories, setCategories] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [postal, setPostal] = useState("");
  const [cpQuery, setCpQuery] = useState("");
  const [location, setLocation] = useState("");
  const [surface, setSurface] = useState("");

  const [budget, setBudget] = useState<BudgetRange>("");

  const [description, setDescription] = useState("");

  // Photos (UI keeps names; you can later extend to upload)
  const [photoNames, setPhotoNames] = useState<string[]>([]);

  // UX / errors
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Steps
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];

  const nextStep = () => setStepIndex((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStepIndex((s) => Math.max(s - 1, 0));

  // Anti-bot
  const [honeypot, setHoneypot] = useState("");
  const formStartRef = useRef<number>(Date.now());
  const lastSubmitRef = useRef<number>(0);

  const phoneDigits = phone.replace(/\D/g, "");

  // Dropdown catégories
  const [catOpen, setCatOpen] = useState(false);
  const catWrapRef = useRef<HTMLDivElement | null>(null);

  // Dropzone photos
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Code postal + Autocomplete + GPS
  const [cpOpen, setCpOpen] = useState(false);
  const [cpLoading, setCpLoading] = useState(false);
  const [cpGpsLoading, setCpGpsLoading] = useState(false);
  const [cpResults, setCpResults] = useState<CpResult[]>([]);
  const [cpPill, setCpPill] = useState<string>("");
  const cpWrapRef = useRef<HTMLDivElement | null>(null);
  const cpDebounceRef = useRef<number | null>(null);

  const categoryDisplay = useMemo(() => {
    if (!categories.length) return "Sélectionnez une ou plusieurs catégories";
    return `Peinture : ${categories.join(", ")}`;
  }, [categories]);

  const canGoNext = useMemo(() => {
    switch (step.key) {
      case "categories":
        return categories.length > 0;
      case "name":
        return name.trim().length >= 2;
      case "phone":
        return phoneDigits.length === 10;
      case "localisation":
        return postal.length === 5 && location.trim().length > 0;
      case "budget":
        return budget !== "";
      case "photos":
        return true;
      case "description":
        return true;
      case "review":
        return true;
      default:
        return false;
    }
  }, [step.key, categories.length, name, phoneDigits.length, postal, location, budget]);

  // Close dropdowns on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (catOpen && catWrapRef.current && !catWrapRef.current.contains(target)) setCatOpen(false);
      if (cpOpen && cpWrapRef.current && !cpWrapRef.current.contains(target)) setCpOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [catOpen, cpOpen]);

  // Keyboard helpers: Enter to continue (except textarea), Escape to go back
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!loading) prevStep();
      }
      if (e.key === "Enter") {
        const el = e.target as HTMLElement | null;
        if (el?.tagName === "TEXTAREA") return;
        if (!loading && canGoNext) {
          e.preventDefault();
          nextStep();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [canGoNext, loading]);

  const toggleCategory = (value: string) => {
    setCategories((prev) => (prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]));
    setErrorMsg("");
  };

  // Photos
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 4)
      .map((f) => f.name);

    setPhotoNames((prev) => {
      const merged = [...prev, ...incoming];
      return merged.slice(0, 4);
    });
  };

  const removePhoto = (fileName: string) => setPhotoNames((prev) => prev.filter((n) => n !== fileName));
  const onDropzoneClick = () => fileInputRef.current?.click();

  const onDropzoneDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDropzoneDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDropzoneDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // Autocomplete (France Adresse)
  const fetchCpSuggestions = async (q: string) => {
    const query = q.trim();
    if (query.length < 2) {
      setCpResults([]);
      setCpOpen(false);
      return;
    }
    setCpLoading(true);
    setCpOpen(true);

    try {
      const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=6&autocomplete=1`;
      const res = await fetch(url);
      const data = await res.json();

      const features = Array.isArray(data?.features) ? data.features : [];
      const mapped: CpResult[] = features
        .map((f: any) => {
          const p = f?.properties || {};
          const city = p.city || p.municipality || "";
          const postcode = p.postcode || "";
          const label = p.label || [postcode, city].filter(Boolean).join(" ");
          const context = p.context || "";
          return { label, postcode, city, context };
        })
        .filter((x: CpResult) => (x.postcode && x.city) || x.label);

      setCpResults(mapped);
    } catch {
      setCpResults([]);
    } finally {
      setCpLoading(false);
    }
  };

  const onCpInputChange = (value: string) => {
    setCpQuery(value);
    setErrorMsg("");
    setCpPill("");

    if (cpDebounceRef.current) window.clearTimeout(cpDebounceRef.current);
    cpDebounceRef.current = window.setTimeout(() => fetchCpSuggestions(value), 220);
  };

  const applyCpSelection = (item: CpResult) => {
    if (item.postcode) setPostal(item.postcode);

    const prettyLocation =
      item.city && item.context ? `${item.city} — ${item.context}` : item.city || item.label;

    setLocation(prettyLocation);

    const q = `${item.postcode ? item.postcode + " " : ""}${item.city || ""}`.trim();
    setCpQuery(q);

    const pill = `${item.postcode || ""} — ${item.city || ""}${item.context ? ` (${item.context})` : ""}`
      .replace(/\s+/g, " ")
      .trim();

    setCpPill(pill);
    setCpOpen(false);
    setErrorMsg("");
  };

  // GPS -> reverse geocode
  const onUseGps = () => {
    setErrorMsg("");

    if (!("geolocation" in navigator)) {
      setErrorMsg("Localisation non disponible. Activez le GPS ou saisissez votre code postal.");
      return;
    }

    setCpGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const url = `https://api-adresse.data.gouv.fr/reverse/?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(
            longitude
          )}&limit=1`;

          const res = await fetch(url);
          const data = await res.json();
          const f = data?.features?.[0];
          const p = f?.properties || {};

          const postcode = p.postcode || "";
          const city = p.city || p.municipality || "";
          const context = p.context || "";

          if (postcode) setPostal(postcode);
          if (city) setLocation(context ? `${city} — ${context}` : city);

          const q = `${postcode ? postcode + " " : ""}${city || ""}`.trim();
          setCpQuery(q);

          if (postcode || city) {
            const pill = `${postcode || ""} — ${city || ""}${context ? ` (${context})` : ""}`
              .replace(/\s+/g, " ")
              .trim();
            setCpPill(pill);
          } else {
            setCpPill("");
            setErrorMsg("Localisation non disponible. Essayez la recherche manuelle.");
          }
        } catch {
          setCpPill("");
          setErrorMsg("Erreur GPS. Essayez la recherche manuelle.");
        } finally {
          setCpGpsLoading(false);
        }
      },
      () => {
        setCpGpsLoading(false);
        setCpPill("");
        setErrorMsg("Localisation non disponible. Activez le GPS ou saisissez votre code postal.");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  };// Auto-advance vetëm për Budget (zgjedhja është e thjeshtë)
  useEffect(() => {
    if (step.key !== "budget") return;
    if (!budget) return;
    const t = window.setTimeout(() => nextStep(), 220);
    return () => window.clearTimeout(t);
  }, [step.key, budget]);

  const goNextWithValidation = () => {
    setErrorMsg("");

    // Validime të qarta për step-in aktual
    if (!canGoNext) {
      switch (step.key) {
        case "categories":
          setErrorMsg("Veuillez choisir au moins une catégorie.");
          break;
        case "name":
          setErrorMsg("Veuillez saisir votre nom.");
          break;
        case "phone":
          setErrorMsg("Veuillez saisir un numéro de téléphone valide.");
          break;
        case "localisation":
          setErrorMsg("Veuillez choisir une localisation valide (code postal + ville).");
          break;
        case "budget":
          setErrorMsg("Veuillez sélectionner un budget estimé.");
          break;
        default:
          setErrorMsg("Veuillez compléter cette étape.");
      }
      return;
    }
    nextStep();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim() !== "") return;

    const timeSpent = Date.now() - formStartRef.current;
    if (timeSpent < 1500) {
      setErrorMsg("Veuillez patienter un instant avant d’envoyer le formulaire.");
      return;
    }

    const now = Date.now();
    if (now - lastSubmitRef.current < 5000) {
      setErrorMsg("Veuillez attendre quelques secondes avant un nouvel envoi.");
      return;
    }

    // Final validation (të domosdoshmet)
    if (!categories.length || !name.trim() || phoneDigits.length !== 10 || postal.length !== 5 || !budget) {
      setErrorMsg("Veuillez remplir les champs obligatoires.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const categoryValue = `Peinture : ${categories.join(", ")}`;
    const photoName = photoNames.join(" | ");

    try {
      const res = await fetch("/api/publier-projet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          honeypot,
          category: categoryValue,
          name: name.trim(),
          phone: phoneDigits,
          postal,
          surface,
          location,
          budget, // NEW
          description,
          photoName,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setErrorMsg(data?.error || "Erreur serveur. Réessayez.");
        return;
      }

      lastSubmitRef.current = now;
      router.push("/publier-projet");
    } catch {
      setErrorMsg("Erreur serveur. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  // UI helpers
  const progressLabel = `${stepIndex + 1} / ${STEPS.length}`;
  const showBack = stepIndex > 0;

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.title}>Publier votre projet</h1>
            <p style={styles.subtitle}>Formulaire rapide — réponse sans engagement</p>
          </div>

          <div style={styles.progressBox}>
            <div style={styles.progressText}>Étape {progressLabel}</div>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${((stepIndex + 1) / STEPS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: "none" }}
            autoComplete="off"
            tabIndex={-1}
          />

          {/* STEP: Categories */}
          {step.key === "categories" && (
            <div style={styles.stepBlock}>
              <div style={styles.field}>
                <label style={styles.label}>Catégorie (Peinture)</label>

                <div ref={catWrapRef} style={styles.dropdownWrap}>
                  <button
                    type="button"
                    style={styles.dropdownButton}
                    onClick={() => setCatOpen((v) => !v)}
                  >
                    <span>{categoryDisplay}</span>
                    <span style={styles.chev}>{catOpen ? "▴" : "▾"}</span>
                  </button>

                  {catOpen && (
                    <div style={styles.dropdownMenu}>
                      {PAINT_OPTIONS.map((opt) => {
                        const selected = categories.includes(opt);
                        return (
                          <button
                            type="button"
                            key={opt}
                            style={{
                              ...styles.dropdownItem,
                              background: selected ? "rgba(59,130,246,0.18)" : "transparent",
                            }}
                            onClick={() => toggleCategory(opt)}
                          >
                            <span>{opt}</span>
                            {selected && <span style={styles.selectedMark}>✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {!!categories.length && (
                  <div style={styles.helperInline}>
                    <span style={styles.helperDot} />
                    <span>Type : peinture</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP: Name */}
          {step.key === "name" && (
            <div style={styles.stepBlock}>
              <div style={styles.field}>
                <label style={styles.label}>Votre nom</label>
                <input
                  style={styles.input}
                  placeholder="Jean Dupont"
                  value={name}
                  onChange={(e) => setName(toNameCase(e.target.value))}
                />
              </div>
            </div>
          )}

          {/* STEP: Phone */}
          {step.key === "phone" && (
            <div style={styles.stepBlock}>
              <div style={styles.field}>
                <label style={styles.label}>Téléphone</label>
                <input
                  style={styles.input}
                  placeholder="06 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(formatFrenchPhoneWithSpaces(e.target.value))}
                />
                <div style={styles.phoneHint}>
                  Visible uniquement par <b>4 artisans maximum</b>
                </div>
              </div>
            </div>
          )}

          {/* STEP: Localisation */}
          {step.key === "localisation" && (
            <div style={styles.stepBlock}>
              <div style={styles.row}>
                <div style={styles.cpCol} ref={cpWrapRef}>
                  <label style={{ ...styles.label, marginBottom: 6 }}>Code postal</label>

                  <input
                    style={styles.input}
                    placeholder="Ex : 75015, Paris, Dijon..."
                    value={cpQuery}
                    onChange={(e) => onCpInputChange(e.target.value)}
                    onFocus={() => {
                      if (cpResults.length) setCpOpen(true);
                    }}
                  />

                  <div style={styles.cpActions}>
                    <button
                      type="button"
                      style={{
                        ...styles.cpCtaBtn,
                        cursor: cpGpsLoading ? "wait" : "pointer",
                        opacity: cpGpsLoading ? 0.85 : 1,
                      }}
                      onClick={onUseGps}
                      disabled={cpGpsLoading}
                    >
                      {cpGpsLoading ? "Localisation en cours…" : "Utiliser ma position (GPS)"}
                    </button>

                    <div style={styles.cpMicro}>Autorisation GPS au clic.</div>

                    {cpPill && (
                      <div style={styles.cpPill}>
                        <span style={styles.cpPillText}>{cpPill}</span>
                        <button
                          type="button"
                          style={styles.cpPillBtn}
                          onClick={() => {
                            setCpPill("");
                            setCpQuery("");
                            setPostal("");
                            setLocation("");
                          }}
                          aria-label="Changer la localisation"
                          title="Changer"
                        >
                          Changer
                        </button>
                      </div>
                    )}
                  </div>

                  {cpOpen && (
                    <div style={styles.cpMenu}>
                      {cpLoading ? (
                        <div style={styles.cpLoading}>Recherche…</div>
                      ) : cpResults.length ? (
                        cpResults.map((r, idx) => (
                          <button
                            type="button"
                            key={`${r.label}-${idx}`}
                            style={styles.cpItem}
                            onClick={() => applyCpSelection(r)}
                          >
                            <div style={styles.cpItemTop}>
                              <span style={styles.cpStrong}>{r.postcode || "—"}</span>
                              <span style={styles.cpCity}>{r.city || r.label}</span>
                            </div>
                            {!!r.context && <div style={styles.cpMeta}>{r.context}</div>}
                          </button>
                        ))
                      ) : (
                        <div style={styles.cpEmpty}>Aucun résultat</div>
                      )}
                    </div>
                  )}
                </div>

                <div style={styles.surfaceCol}>
                  <label style={{ ...styles.label, marginBottom: 6 }}>Surface</label>
                  <input
                    style={styles.input}
                    placeholder="Surface m²"
                    value={surface}
                    onChange={(e) => setSurface(onlyDigitsMax(e.target.value, 4))}
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Ville / Zone</label>
                <input
                  style={styles.input}
                  placeholder="Dijon, Paris 15..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Keep postal in sync if user typed directly a 5-digit CP */}
              <div style={styles.microLine}>
                <span>Code postal retenu : </span>
                <b>{postal || "-"}</b>
              </div>
            </div>
          )}

          {/* STEP: Budget (auto-advance) */}
          {step.key === "budget" && (
            <div style={styles.stepBlock}>
              <div style={styles.field}>
                <label style={styles.label}>Budget estimé</label>
                <div style={styles.budgetGrid}>
                  {BUDGET_OPTIONS.map((opt) => {
                    const selected = budget === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setBudget(opt.value);
                          setErrorMsg("");
                        }}
                        style={{
                          ...styles.budgetOption,
                          background: selected ? "rgba(59,130,246,0.18)" : "rgba(255,255,255,0.06)",
                          borderColor: selected ? "rgba(59,130,246,0.55)" : "rgba(255,255,255,0.12)",
                        }}
                        aria-pressed={selected}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <div style={styles.helperText}>
                  Cette estimation aide les artisans à proposer un devis plus précis.
                </div>
              </div>
            </div>
          )}{/* STEP: Photos */}
          {step.key === "photos" && (
            <div style={styles.stepBlock}>
              <div style={styles.field}>
                <label style={styles.label}>Photos (optionnel)</label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFiles(e.target.files)}
                  style={{ display: "none" }}
                />

                <div
                  style={{
                    ...styles.dropzone,
                    ...(isDragging ? styles.dropzoneActive : null),
                  }}
                  onClick={onDropzoneClick}
                  onDragOver={onDropzoneDragOver}
                  onDragLeave={onDropzoneDragLeave}
                  onDrop={onDropzoneDrop}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onDropzoneClick();
                  }}
                >
                  <div style={styles.dropzoneInner}>
                    <div style={styles.dropzoneText}>Glissez-déposez vos photos</div>
                    <div style={styles.dropzoneSub}>ou cliquez pour sélectionner (max. 4)</div>
                  </div>
                </div>

                {!!photoNames.length && (
                  <div style={styles.fileChips}>
                    {photoNames.map((n) => (
                      <div key={n} style={styles.chip}>
                        <span style={styles.chipName}>{n}</span>
                        <button
                          type="button"
                          style={styles.chipRemove}
                          onClick={() => removePhoto(n)}
                          aria-label="Supprimer la photo"
                          title="Supprimer"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div style={styles.helperText}>Jusqu’à 4 photos (optionnel)</div>
              </div>
            </div>
          )}

          {/* STEP: Description */}
          {step.key === "description" && (
            <div style={styles.stepBlock}>
              <div style={styles.field}>
                <label style={styles.label}>Description</label>
                <textarea
                  style={{ ...styles.input, minHeight: 110, resize: "vertical" }}
                  placeholder="Décrivez votre projet..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP: Review */}
          {step.key === "review" && (
            <div style={styles.stepBlock}>
              <div style={styles.previewBox}>
                <div style={styles.previewLine}>Peinture</div>
                <div style={styles.previewLine}>
                  {location ? `${location}${postal ? ` (${postal})` : ""}` : postal || "-"}
                </div>
                <div style={styles.previewLine}>Surface: {surface ? `${surface} m²` : "-"}</div>
                <div style={styles.previewLine}>Budget: {formatBudgetLabel(budget)}</div>
                <div style={styles.previewLine}>Diffusé à 4 artisans maximum</div>
              </div>

              <div style={styles.helperText}>
                Vérifiez les informations, puis publiez votre projet.
              </div>
            </div>
          )}

          {errorMsg && <p style={styles.error}>{errorMsg}</p>}

          {/* Footer navigation */}
          <div style={styles.footerNav}>
            {showBack ? (
              <button type="button" style={styles.secondaryBtn} onClick={prevStep} disabled={loading}>
                Retour
              </button>
            ) : (
              <span />
            )}

            {step.key !== "review" ? (
              <button
                type="button"
                style={{ ...styles.primaryBtn, opacity: canGoNext ? 1 : 0.6 }}
                onClick={goNextWithValidation}
                disabled={loading || !canGoNext}
              >
                Continuer
              </button>
            ) : (
              <button type="submit" style={styles.primaryBtn} disabled={loading}>
                {loading ? "ENVOI..." : "PUBLIER MAINTENANT"}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    background:
      "radial-gradient(900px 600px at 20% 15%, rgba(168,85,247,0.24), rgba(11,16,32,0) 60%), radial-gradient(900px 600px at 75% 20%, rgba(59,130,246,0.22), rgba(11,16,32,0) 55%), #0E1630",
  },

  card: {
    width: "100%",
    maxWidth: 760,
    background: "rgba(255,255,255,0.07)",
    borderRadius: 20,
    padding: 28,
    color: "#EAF0FF",
    border: "1px solid rgba(255,255,255,0.10)",
    boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
    backdropFilter: "blur(14px)",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
    marginBottom: 8,
  },

  title: { fontSize: 28, fontWeight: 900, margin: 0 },
  subtitle: { opacity: 0.85, marginTop: 6, marginBottom: 10 },

  progressBox: { minWidth: 200, maxWidth: 260, width: "40%" },
  progressText: { fontSize: 12, opacity: 0.85, marginBottom: 6, textAlign: "right" },
  progressBar: {
    height: 8,
    background: "rgba(255,255,255,0.10)",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    background: "rgba(59,130,246,0.85)",
    borderRadius: 999,
  },

  form: { display: "grid", gap: 16, marginTop: 6 },
  stepBlock: { display: "grid", gap: 14 },
  field: { display: "flex", flexDirection: "column", gap: 6 },

  label: { fontSize: 13, opacity: 0.9 },
  input: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#EAF0FF",
    outline: "none",
  },

  phoneHint: { fontSize: 12, opacity: 0.85, marginTop: 6 },

  row: {
    display: "grid",
    gridTemplateColumns: "1.4fr 0.6fr",
    gap: 12,
    alignItems: "start",
  },
  cpCol: { position: "relative" },
  surfaceCol: { position: "relative" },

  microLine: { fontSize: 12, opacity: 0.85, marginTop: 8 },

  // Dropdown (cat)
  dropdownWrap: { position: "relative" },
  dropdownButton: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#EAF0FF",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    textAlign: "left",
  },
  chev: { opacity: 0.9 },
  dropdownMenu: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    right: 0,
    zIndex: 20,
    background: "rgba(15, 23, 42, 0.98)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 25px 70px rgba(0,0,0,0.55)",
  },
  dropdownItem: {
    width: "100%",
    padding: "10px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#EAF0FF",
    cursor: "pointer",
    border: "none",
    background: "transparent",
  },
  selectedMark: { fontWeight: 800 },
  helperInline: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, opacity: 0.85 },
  helperDot: { width: 6, height: 6, borderRadius: 999, background: "rgba(59,130,246,0.9)" },

  // CP dropdown
  cpActions: { marginTop: 10, display: "grid", gap: 8 },
  cpCtaBtn: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#EAF0FF",
  },
  cpMicro: { fontSize: 12, opacity: 0.75 },
  cpPill: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
  },
  cpPillText: { fontSize: 12, opacity: 0.9 },
  cpPillBtn: {
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#EAF0FF",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: 12,
    whiteSpace: "nowrap",
  },
  cpMenu: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    right: 0,
    zIndex: 25,
    background: "rgba(15, 23, 42, 0.98)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 25px 70px rgba(0,0,0,0.55)",
  },
  cpLoading: { padding: 12, fontSize: 13, opacity: 0.85 },
  cpEmpty: { padding: 12, fontSize: 13, opacity: 0.85 },
  cpItem: {
    width: "100%",
    border: "none",
    background: "transparent",
    color: "#EAF0FF",
    cursor: "pointer",
    textAlign: "left",
    padding: 12,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  cpItemTop: { display: "flex", gap: 10, alignItems: "center" },
  cpStrong: { fontWeight: 800 },
  cpCity: { opacity: 0.92 },
  cpMeta: { fontSize: 12, opacity: 0.75, marginTop: 4 },

  // Budget
  budgetGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10, marginTop: 6 },
  budgetOption: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#EAF0FF",
    cursor: "pointer",
    textAlign: "left",
  },

  // Dropzone
  dropzone: {
    borderRadius: 14,
    border: "1px dashed rgba(255,255,255,0.22)",
    background: "rgba(255,255,255,0.05)",
    padding: 16,
    cursor: "pointer",
    userSelect: "none",
  },
  dropzoneActive: { background: "rgba(59,130,246,0.10)", borderColor: "rgba(59,130,246,0.55)" },
  dropzoneInner: { display: "grid", gap: 6, textAlign: "center" },
  dropzoneText: { fontWeight: 700 },
  dropzoneSub: { fontSize: 12, opacity: 0.8 },

  fileChips: { display: "grid", gap: 8, marginTop: 10 },
  chip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
  },
  chipName: { fontSize: 12, opacity: 0.92, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  chipRemove: {
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#EAF0FF",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: 12,
  },

  helperText: { fontSize: 12, opacity: 0.82, marginTop: 6 },

  // Preview
  previewBox: {
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    padding: 14,
    display: "grid",
    gap: 6,
  },
  previewLine: { fontSize: 13, opacity: 0.92 },

  // Footer
  footerNav: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 6 },
  secondaryBtn: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#EAF0FF",
    cursor: "pointer",
    minWidth: 130,
  },
  primaryBtn: {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(59,130,246,0.55)",
    background: "rgba(59,130,246,0.25)",
    color: "#EAF0FF",
    cursor: "pointer",
    minWidth: 170,
    fontWeight: 800,
    letterSpacing: 0.4,
  },

  error: { color: "#ffb4b4", background: "rgba(255,0,0,0.12)", padding: 12, borderRadius: 12 },
};