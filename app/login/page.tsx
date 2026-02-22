"use client";

import React, { useEffect, useRef, useState } from "react";

const CATEGORIES = ["Peinture", "Plomberie", "Électricien", "Maçonnerie"];

function formatFrenchPhoneWithSpaces(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  const parts: string[] = [];
  for (let i = 0; i < digits.length; i += 2) parts.push(digits.slice(i, i + 2));
  return parts.join(" ");
}

function onlyDigitsMax(raw: string, maxLen: number) {
  return raw.replace(/\D/g, "").slice(0, maxLen);
}

// Shkronja e parë e madhe, pjesa tjetër siç e shkruan user-i (por pa e bërë ALL CAPS)
function capitalizeFirstLetter(value: string) {
  if (!value) return value;
  const first = value.charAt(0).toUpperCase();
  return first + value.slice(1);
}

export default function PublierProjetPage() {
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [postal, setPostal] = useState("");
  const [surface, setSurface] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photoName, setPhotoName] = useState<string>("");

  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Anti-bot
  const [honeypot, setHoneypot] = useState("");
  const formStartRef = useRef<number>(Date.now());
  const lastSubmitRef = useRef<number>(0);

  // Cooldown countdown (nga serveri)
  const [cooldownLeft, setCooldownLeft] = useState<number>(0);
  const cooldownTimerRef = useRef<number | null>(null);

  // Dropdown
  const [catOpen, setCatOpen] = useState(false);
  const catWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!catWrapRef.current) return;
      if (!catWrapRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    if (!toastOpen) return;
    const t = window.setTimeout(() => setToastOpen(false), 4000);
    return () => window.clearTimeout(t);
  }, [toastOpen]);

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) window.clearInterval(cooldownTimerRef.current);
    };
  }, []);

  const phoneDigits = phone.replace(/\D/g, "");

  const startCooldown = (secs: number) => {
    setCooldownLeft(secs);
    if (cooldownTimerRef.current) window.clearInterval(cooldownTimerRef.current);

    cooldownTimerRef.current = window.setInterval(() => {
      setCooldownLeft((v) => {
        if (v <= 1) {
          if (cooldownTimerRef.current) window.clearInterval(cooldownTimerRef.current);
          cooldownTimerRef.current = null;
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cooldownLeft > 0) {
      setErrorMsg(`Veuillez patienter ${cooldownLeft} secondes avant de renvoyer votre demande.`);
      return;
    }

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

    const missing: string[] = [];
    if (!category) missing.push("category");
    if (!name.trim()) missing.push("name");
    if (phoneDigits.length !== 10) missing.push("phone");
    if (postal.length !== 5) missing.push("postal");

    if (missing.length > 0) {
      setErrors(missing);
      setErrorMsg("Veuillez remplir les champs obligatoires.");
      return;
    }

    setLoading(true);
    setErrors([]);
    setErrorMsg("");

    try {
      const res = await fetch("/api/publier-projet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          honeypot,
          category,
          name: name.trim(),
          phone: phoneDigits,
          postal,
          surface,
          location,
          description,
          photoName,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        if (res.status === 429) {
          const retry = typeof data?.retryAfter === "number" ? data.retryAfter : 15;
          startCooldown(retry);
          setErrorMsg(`Veuillez patienter ${retry} secondes avant de renvoyer votre demande.`);
          return;
        }

        if (typeof data?.error === "string" && data.error.trim() !== "") {
          setErrorMsg(data.error);
          return;
        }

        setErrorMsg("Erreur serveur. Réessayez.");
        return;
      }

      lastSubmitRef.current = now;
      setToastOpen(true);

      // opsionale: pastrim
      // setCategory(""); setName(""); setPhone(""); setPostal(""); setSurface(""); setLocation(""); setDescription(""); setPhotoName("");
      // formStartRef.current = Date.now();
    } catch {
      setErrorMsg("Erreur serveur. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  const getFrameStyle = (fieldName: string): React.CSSProperties => ({
    ...styles.inputFrame,
    borderColor: errors.includes(fieldName) ? "#dc2626" : "#E8E8E8",
    boxShadow: errors.includes(fieldName) ? "0 0 0 3px rgba(220,38,38,0.1)" : "none",
  });

  return (
    <main style={styles.page}>
      {toastOpen && (
        <div style={styles.toastWrap}>
          <div style={styles.toastCard}>
            <div style={styles.toastTitle}>Succès</div>
            <div style={styles.toastText}>✅ Projet envoyé avec succès !</div>
            <button onClick={() => setToastOpen(false)} style={styles.toastBtn}>
              OK
            </button>
          </div>
        </div>
      )}

      <div style={styles.shell}>
        <section style={styles.card}>
          <h1 style={styles.h1}>Trouvez un artisan fiable</h1>
          <p style={styles.cardSub}>Publiez gratuitement sans engagement</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }}
              autoComplete="off"
              tabIndex={-1}
            />

            {/* Catégorie */}
            <div style={styles.field} ref={catWrapRef}>
              <label style={styles.label}>Catégorie</label>
              <div style={getFrameStyle("category")}>
                <button
                  type="button"
                  onClick={() => setCatOpen((v) => !v)}
                  style={styles.selectHeader}
                >
                  <span style={{ color: category ? "#1E1E1E" : "#6B6B6B" }}>
                    {category || "Sélectionnez une catégorie"}
                  </span>
                  <span
                    style={{
                      ...styles.chev,
                      transform: catOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    ▾
                  </span>
                </button>

                {catOpen && (
                  <div style={styles.customSelectContainer}>
                    {CATEGORIES.map((c, index) => (
                      <div
                        key={c}
                        onClick={() => {
                          setCategory(c);
                          setCatOpen(false);
                        }}
                        style={{
                          ...styles.optionItem,
                          backgroundColor: category === c ? "#F0F0F0" : "transparent",
                          borderBottom:
                            index !== CATEGORIES.length - 1 ? "1px solid #E8E8E8" : "none",
                          color: category === c ? "#1A3A4A" : "#1E1E1E",
                        }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Nom */}
            <div style={styles.field}>
              <label style={styles.label}>Votre nom</label>
              <div style={getFrameStyle("name")}>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Jean Dupont"
                  value={name}
                  onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
                />
              </div>
            </div>

            {/* Téléphone */}
            <div style={styles.field}>
              <label style={styles.label}>Téléphone</label>
              <div style={getFrameStyle("phone")}>
                <input
                  type="tel"
                  style={styles.input}
                  placeholder="06 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(formatFrenchPhoneWithSpaces(e.target.value))}
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>
              <p style={styles.infoText}>
                Votre numéro reste privé. Visible uniquement par 5 artisans maximum.
              </p>
            </div>

            {/* CP + Surface */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
              <div style={styles.field}>
                <label style={styles.label}>Code postal</label>
                <div style={getFrameStyle("postal")}>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="21000"
                    value={postal}
                    onChange={(e) => setPostal(onlyDigitsMax(e.target.value, 5))}
                    inputMode="numeric"
                    maxLength={5}
                    autoComplete="postal-code"
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Surface m²</label>
                <div style={styles.inputFrame}>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="80"
                    value={surface}
                    onChange={(e) => setSurface(onlyDigitsMax(e.target.value, 4))}
                    inputMode="numeric"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>

            {/* Ville/Zone */}
            <div style={styles.field}>
              <label style={styles.label}>Ville / Zone</label>
              <div style={styles.inputFrame}>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Dijon, Paris 15..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Photos */}
            <div style={styles.field}>
              <label style={styles.label}>Photos</label>
              <div style={styles.inputFrame}>
                <label style={styles.fileLabel}>
                  {photoName ? `📎 ${photoName}` : "Ajouter une photo (optionnel)"}
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setPhotoName(file ? file.name : "");
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Description */}
            <div style={styles.field}>
              <label style={styles.label}>Description</label>
              <div style={styles.inputFrame}>
                <textarea
                  style={{ ...styles.input, minHeight: 90, resize: "none" }}
                  placeholder="Décrivez votre projet (surface, état actuel, délai...)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {errorMsg && <p style={styles.errorText}>{errorMsg}</p>}

            <button
              type="submit"
              disabled={loading || cooldownLeft > 0}
              style={{
                ...styles.button,
                opacity: loading || cooldownLeft > 0 ? 0.65 : 1,
                cursor: loading || cooldownLeft > 0 ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "ENVOI EN COURS..." : cooldownLeft > 0 ? `ATTENDEZ ${cooldownLeft}s` : "PUBLIER MAINTENANT"}
            </button>
          </form>
        </section>
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
    background: "#F8F6F2",
    padding: "40px 20px",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  shell: { width: "100%", maxWidth: "680px" },
  card: {
    background: "#FFFFFF",
    padding: "48px",
    borderRadius: "32px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    border: "1px solid #E8E8E8",
  },

  // ✅ Titull më i madh dhe më i zi
  h1: {
    color: "#000000",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 44,
    fontWeight: 900,
    letterSpacing: "-0.03em",
  },

  // ✅ Nën-titull siç kërkove
  cardSub: {
    textAlign: "center",
    color: "#444",
    marginBottom: 40,
    fontSize: 18,
    fontWeight: 500,
  },

  form: { display: "grid", gap: 24 },
  field: { display: "grid", gap: 8 },
  label: {
    color: "#111",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: "0.02em",
  },
  inputFrame: {
    border: "1px solid #E8E8E8",
    borderRadius: 14,
    background: "#FFFFFF",
    transition: "all 0.2s ease",
  },
  selectHeader: {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    border: "none",
    background: "#FFFFFF",
    color: "#1E1E1E",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 16,
  },
  chev: { transition: "transform 0.2s ease", color: "#6B6B6B" },
  customSelectContainer: {
    background: "#FFFFFF",
    borderRadius: "0 0 14px 14px",
    maxHeight: 220,
    overflowY: "auto",
    border: "1px solid #E8E8E8",
    borderTop: "none",
    marginTop: -1,
  },
  optionItem: {
    padding: "14px 20px",
    cursor: "pointer",
    fontSize: 16,
    transition: "background-color 0.1s ease",
  },
  input: {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    border: "none",
    background: "#FFFFFF",
    color: "#1E1E1E",
    outline: "none",
    fontSize: 16,
    fontFamily: "inherit",
  },
  fileLabel: {
    display: "block",
    padding: 16,
    borderRadius: 14,
    background: "#FFFFFF",
    color: "#6B6B6B",
    cursor: "pointer",
    textAlign: "center",
    userSelect: "none",
    border: "1px dashed #E8E8E8",
    fontSize: 15,
  },
  infoText: { fontSize: 13, color: "#6B6B6B", marginTop: 4 },
  errorText: {
    color: "#dc2626",
    textAlign: "center",
    background: "rgba(220,38,38,0.06)",
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
  },
  button: {
    width: "100%",
    fontSize: 16,
    fontWeight: 800,
    color: "#FFFFFF",
    background: "#1A3A4A",
    padding: 18,
    border: "none",
    borderRadius: 16,
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: 8,
    letterSpacing: "0.6px",
  },
  toastWrap: { position: "fixed", top: 24, right: 24, zIndex: 9999 },
  toastCard: {
    background: "#FFFFFF",
    border: "1px solid #E8E8E8",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
    minWidth: 280,
  },
  toastTitle: { color: "#111", fontWeight: 900, fontSize: 18, marginBottom: 6 },
  toastText: { color: "#444", margin: "0 0 16px 0", fontSize: 15 },
  toastBtn: {
    border: "none",
    cursor: "pointer",
    borderRadius: 12,
    padding: "10px 18px",
    fontWeight: 800,
    color: "#FFFFFF",
    background: "#1A3A4A",
    fontSize: 14,
  },
};