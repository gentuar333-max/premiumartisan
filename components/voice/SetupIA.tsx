"use client"

import { useState, useEffect } from "react"

const METIERS = [
  "Peintre",
  "Plombier",
  "Électricien",
  "Maçon",
  "Carreleur",
  "Menuisier",
  "Couvreur",
  "Chauffagiste",
  "Autre",
]

export default function SetupIA() {
  const [nom, setNom] = useState("")
  const [entreprise, setEntreprise] = useState("")
  const [metier, setMetier] = useState("")
  const [tel, setTel] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/artisan/vapi/setup")
      .then(r => r.json())
      .then(json => {
        if (json.settings) {
          setNom(json.settings.artisan_name ?? "")
          setEntreprise(json.settings.company_name ?? "")
          setMetier(json.settings.metier?.[0] ?? "")
          setTel(json.settings.phone ?? "")
          setEmail(json.settings.email ?? "")
        }
      })
  }, [])

  async function handleSubmit() {
    setLoading(true)
    const res = await fetch("/api/artisan/vapi/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        artisan_name: nom,
        company_name: entreprise,
        metier: metier ? [metier] : [],
        phone: tel,
        email,
      }),
    })
    setLoading(false)
    if (res.ok) setSaved(true)
  }

  const orange = "#e8650a"
  const orangeLabel = "#c2540a"

  const inp: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 10,
    border: "none",
    background: "#fff",
    fontSize: 14,
    color: "#1e293b",
    outline: "none",
    fontFamily: "inherit",
  }

  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background: "#f0f0f0", minHeight: "100vh", padding: 16, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ background: "#fff8e7", border: `2px solid ${orange}`, borderRadius: 14, padding: 18 }}>

          <div style={{ fontSize: 20, fontWeight: 700, color: orange, marginBottom: 18, lineHeight: 1.2 }}>
            Configurer votre assistant
          </div>

          {[
            { label: "Nom complet", val: nom, set: setNom },
            { label: "Nom de l'entreprise", val: entreprise, set: setEntreprise },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: orangeLabel, marginBottom: 6, display: "block" }}>
                {f.label}
              </label>
              <input
                value={f.val}
                onChange={e => f.set(e.target.value)}
                style={inp}
              />
            </div>
          ))}

          <div style={{ marginBottom: 13 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: orangeLabel, marginBottom: 6, display: "block" }}>
              Métier
            </label>
            <select
              value={metier}
              onChange={e => setMetier(e.target.value)}
              style={{ ...inp, appearance: "none" as const, WebkitAppearance: "none", cursor: "pointer", color: metier ? "#1e293b" : "#9ca3af" }}
            >
              <option value="" disabled>Sélectionnez votre métier</option>
              {METIERS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 13 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: orangeLabel, marginBottom: 6, display: "block" }}>
              Numéro de téléphone
            </label>
            <input
              value={tel}
              onChange={e => setTel(e.target.value)}
              style={inp}
            />
          </div>

          <div style={{ marginBottom: 13 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: orangeLabel, marginBottom: 6, display: "block" }}>
              Email
            </label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              style={inp}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 10,
              border: "none",
              background: saved ? "#10b981" : "#d45f08",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: ".07em",
              cursor: "pointer",
              marginTop: 4,
            }}
          >
            {loading ? "Activation..." : saved ? "✓ Assistant activé" : "ACTIVER MON ASSISTANT"}
          </button>

        </div>
      </div>
    </div>
  )
}