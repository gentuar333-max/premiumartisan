"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const METIERS = [
  "Peintre","Plombier","Electricien","Macon",
  "Carreleur","Menuisier","Couvreur","Chauffagiste","Autre",
]

export default function ReceptionistSetupPage() {
  const router = useRouter()
  const [nom, setNom] = useState("")
  const [entreprise, setEntreprise] = useState("")
  const [metier, setMetier] = useState("")
  const [autreMetier, setAutreMetier] = useState("")
  const [tel, setTel] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [metierOpen, setMetierOpen] = useState(false)

  useEffect(() => {
    fetch("/api/artisan/vapi/setup")
      .then(r => r.json())
      .then(json => {
        if (json.settings) {
          setNom(json.settings.artisan_name ?? "")
          setEntreprise(json.settings.company_name ?? "")
          const m = json.settings.metier?.[0] ?? ""
          if (METIERS.slice(0,-1).includes(m)) {
            setMetier(m)
          } else if (m) {
            setMetier("Autre")
            setAutreMetier(m)
          }
          setTel(json.settings.phone ?? "")
          setEmail(json.settings.email ?? "")
        }
      })
      .catch(() => {})
  }, [])

  async function handleSubmit() {
    setLoading(true)
    const finalMetier = metier === "Autre" ? autreMetier : metier
    const res = await fetch("/api/artisan/vapi/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        artisan_name: nom,
        company_name: entreprise,
        metier: finalMetier ? [finalMetier] : [],
        phone: tel,
        email,
      }),
    })
    setLoading(false)
    if (res.ok) router.push("/artisan/receptionist")
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

  const displayMetier = metier === "Autre"
    ? (autreMetier || "Autre")
    : metier || "Selectionnez votre metier"

  return (
    <>
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>

      <div style={{
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        background: "#f0f0f0",
        minHeight: "100vh",
        padding: "24px 16px 100px",
        display: "flex",
        justifyContent: "center",
      }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ background: "#fff8e7", border: `2px solid ${orange}`, borderRadius: 14, padding: 20 }}>

            <div style={{ fontSize: 20, fontWeight: 700, color: orange, marginBottom: 20 }}>
              Configurer votre assistant
            </div>

            {/* Nom complet */}
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: orangeLabel, marginBottom: 6, display: "block" }}>Nom complet</label>
              <input value={nom} onChange={e => setNom(e.target.value)} style={inp} />
            </div>

            {/* Nom entreprise */}
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: orangeLabel, marginBottom: 6, display: "block" }}>Nom de l'entreprise</label>
              <input value={entreprise} onChange={e => setEntreprise(e.target.value)} style={inp} />
            </div>

            {/* Metier — trigger */}
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: orangeLabel, marginBottom: 6, display: "block" }}>Metier</label>
              <div
                onClick={() => setMetierOpen(true)}
                style={{
                  ...inp,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  color: metier ? "#1e293b" : "#9ca3af",
                }}
              >
                <span>{displayMetier}</span>
                <span style={{ color: "#9ca3af", fontSize: 12 }}>▼</span>
              </div>
              {metier === "Autre" && (
                <input
                  value={autreMetier}
                  onChange={e => setAutreMetier(e.target.value)}
                  placeholder="Precisez votre metier..."
                  style={{ ...inp, marginTop: 8, border: `1.5px solid ${orange}` }}
                />
              )}
            </div>

            {/* Telephone */}
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: orangeLabel, marginBottom: 6, display: "block" }}>Numero de telephone</label>
              <input value={tel} onChange={e => setTel(e.target.value)} style={inp} />
            </div>

            {/* Email */}
            <div style={{ marginBottom: 13 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: orangeLabel, marginBottom: 6, display: "block" }}>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" style={inp} />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%", padding: 14, borderRadius: 10, border: "none",
                background: "#d45f08", color: "#fff", fontSize: 13, fontWeight: 700,
                letterSpacing: ".07em", cursor: "pointer", marginTop: 4,
              }}
            >
              {loading ? "Activation..." : "ACTIVER MON ASSISTANT"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal Metier */}
      {metierOpen && (
        <div
          onClick={() => setMetierOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 500, animation: "slideUp .25s ease", overflow: "hidden" }}
          >
            <div style={{ padding: "16px 16px 0", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#1e293b" }}>Selectionnez votre metier</span>
              <button onClick={() => setMetierOpen(false)} style={{ border: "none", background: "none", fontSize: 20, cursor: "pointer", color: "#999", padding: "0 0 12px" }}>x</button>
            </div>
            <div style={{ overflowY: "auto", maxHeight: "60vh" }}>
              {METIERS.map((m, i) => (
                <div key={m}>
                  <div
                    onClick={() => { setMetier(m); if (m !== "Autre") setMetierOpen(false) }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 20px",
                      cursor: "pointer",
                      background: "#fff",
                    }}
                  >
                    <span style={{ fontSize: 16, color: "#1e293b" }}>{m}</span>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      border: `2px solid ${metier === m ? "#0d9488" : "#d1d5db"}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      {metier === m && <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#0d9488" }} />}
                    </div>
                  </div>
                  {i < METIERS.length - 1 && <div style={{ height: 1, background: "#f5f5f5", marginLeft: 20 }} />}
                </div>
              ))}
            </div>
            <div style={{ padding: 16, borderTop: "1px solid #f0f0f0" }}>
              <button
                onClick={() => setMetierOpen(false)}
                style={{ width: "100%", padding: 14, borderRadius: 10, border: "none", background: "#1e293b", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}