"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Phone, User, Building2, Wrench, Sparkles } from "lucide-react"

const METIERS = [
  { value: "Plombier",     label: "Plombier" },
  { value: "Electricien",  label: "Électricien" },
  { value: "Peintre",      label: "Peintre" },
  { value: "Menuisier",    label: "Menuisier" },
  { value: "Macon",        label: "Maçon" },
  { value: "Couvreur",     label: "Couvreur" },
  { value: "Chauffagiste", label: "Chauffagiste" },
  { value: "Carreleur",    label: "Carreleur" },
  { value: "Autre",        label: "Autre" },
]

export default function ReceptionistSetupPage() {
  const router = useRouter()
  const [nom, setNom]           = useState("")
  const [entreprise, setEntreprise] = useState("")
  const [metier, setMetier]     = useState("")
  const [tel, setTel]           = useState("")
  const [loading, setLoading]   = useState(false)
  const [step, setStep]         = useState<"form" | "operator">("form")
  const [twilio_number, setTwilioNumber] = useState("")
  const [operator, setOperator] = useState("")
  const [copied, setCopied] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  function copyNumber() {
    navigator.clipboard.writeText(twilio_number).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  useEffect(() => {
    fetch("/api/artisan/vapi/setup")
      .then(r => r.json())
      .then(json => {
        if (json.error === "Non authentifié") {
          router.replace("/artisan/login?redirect=/artisan/receptionist/setup")
          return
        }
        if (json.settings) {
          setNom(json.settings.artisan_name ?? "")
          setEntreprise(json.settings.company_name ?? "")
          const m = json.settings.metier?.[0] ?? ""
          setMetier(m)
          setTel(json.settings.phone ?? "")
        }
      })
      .catch(() => {
        router.replace("/artisan/login?redirect=/artisan/receptionist/setup")
      })
  }, [router])

  const isValid = nom.trim() && entreprise.trim() && metier && tel.trim()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setLoading(true)
    try {
      const res = await fetch("/api/artisan/vapi/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artisan_name: nom,
          company_name: entreprise,
          metier: [metier],
          phone: tel,
        }),
      })
      if (res.ok) {
        const setupJson = await res.json()
        const artisanId = setupJson.artisan_id
        if (artisanId) {
          await fetch("/api/marie/provision-number", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ artisan_id: artisanId }),
          }).catch(() => {})
        }
        // Prit max 10 sekonda per numrin Twilio
        let twilioNum = ""
        for (let i = 0; i < 10; i++) {
          await new Promise(r => setTimeout(r, 1000))
          const subRes = await fetch("/api/marie/subscription?id=" + (setupJson.artisan_id ?? ""))
          const subJson = await subRes.json()
          twilioNum = subJson.subscription?.twilio_number ?? ""
          if (twilioNum) break
        }
        setTwilioNumber(twilioNum)
        setStep("operator")
      }
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }

  const inp: React.CSSProperties = {
    width: "100%", height: 48, paddingLeft: 40, paddingRight: 14,
    borderRadius: 12, border: "1.5px solid #E5E7EB",
    background: "#F9FAFB", fontSize: 15, outline: "none",
    fontFamily: "inherit", color: "#111", boxSizing: "border-box",
    appearance: "none",
  }

  const iconStyle: React.CSSProperties = {
    position: "absolute", left: 12, top: "50%",
    transform: "translateY(-50%)", color: "#9CA3AF",
    pointerEvents: "none",
  }

  const OPERATORS = [
    { id: "orange",   label: "Orange",   code: "**61*" + twilio_number + "*11*15#", url: "https://login.orange.fr" },
    { id: "sfr",      label: "SFR",      code: "**61*" + twilio_number + "*11*15#", url: "https://www.sfr.fr/cas/login" },
    { id: "bouygues", label: "Bouygues", code: "**61*" + twilio_number + "*11*15#", url: "https://www.bouyguestelecom.fr/mon-compte" },
    { id: "free",     label: "Free",     code: null, url: "https://mobile.free.fr/moncompte/index.php?page=options&action=renvoi" },
    { id: "regle",    label: "Regle Mobile", code: null, url: "https://www.reglomobile.fr/connexion?p=ec&ref=https:%2F%2Fmonespace.reglomobile.fr%2F" },
    { id: "autre",    label: "Autre",    code: null, url: null },
  ]

  if (step === "operator") {
    const selected = OPERATORS.find(o => o.id === operator)
    return (
      <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", display: "flex", flexDirection: "column" }}>
        <header style={{ padding: "40px 24px 24px", textAlign: "center", position: "relative" }}>
          <button onClick={() => setHelpOpen(true)} style={{ position: "absolute", right: 24, top: 40, width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #E5E7EB", background: "#fff", fontSize: 15, fontWeight: 700, color: "#6B7280", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>?</button>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Phone size={28} color="#fff" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: 0 }}>Activez le renvoi d appel</h1>
          <p style={{ fontSize: 14, color: "#6B7280", marginTop: 8 }}>Marie repondra a votre place en cas d absence</p>
        </header>

        {helpOpen && (
          <div onClick={() => setHelpOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end" }}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: 24, width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>Comment ca fonctionne</span>
                <button onClick={() => setHelpOpen(false)} style={{ background: "#F3F4F6", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>x</button>
              </div>
              {[
                { n: "1", t: "Votre client appelle votre numero personnel" },
                { n: "2", t: "Si vous ne repondez pas, l operateur transfere automatiquement l appel" },
                { n: "3", t: "Marie repond, collecte les informations et vous transmet un resume" },
                { n: "4", t: "Vous rappelez votre client quand vous etes disponible" },
              ].map(s => (
                <div key={s.n} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#3B82F6", color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.n}</div>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.5, margin: 0, paddingTop: 4 }}>{s.t}</p>
                </div>
              ))}
              <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 8, lineHeight: 1.5 }}>
                Le renvoi s active une seule fois. Aucune modification n est necessaire par la suite.
              </p>
            </div>
          </div>
        )}
        <main style={{ flex: 1, padding: "0 16px 32px" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, maxWidth: 480, margin: "0 auto", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 4 }}>Quelle est votre operateur mobile ?</p>
            <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>Selectionnez la marque de votre abonnement telephone actuel.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {OPERATORS.map(o => (
                <button key={o.id} onClick={() => setOperator(o.id)} style={{ padding: "12px", borderRadius: 12, border: operator === o.id ? "2px solid #3B82F6" : "1.5px solid #E5E7EB", background: operator === o.id ? "#EFF6FF" : "#F9FAFB", fontSize: 14, fontWeight: 600, color: operator === o.id ? "#1D4ED8" : "#374151", cursor: "pointer", fontFamily: "inherit" }}>
                  {o.label}
                </button>
              ))}
            </div>

            {operator && selected?.code && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 13, color: "#374151", marginBottom: 12 }}>Appuyez sur ce bouton depuis votre telephone :</p>
                <a href={"tel:" + selected.code} style={{ display: "block", background: "#3B82F6", borderRadius: 12, padding: 16, fontSize: 15, fontWeight: 700, color: "#fff", textAlign: "center", textDecoration: "none" }}>
                  Activer Marie
                </a>
              </div>
            )}

            {operator && !selected?.code && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ padding: 14, background: "#F9FAFB", borderRadius: 12, border: "1px solid #E5E7EB", marginBottom: 10 }}>
                  <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: 0 }}>
                    {operator === "free" && "Connectez-vous, allez dans Options puis Renvoi d appel. Choisissez Si pas de reponse et collez le numero copie."}
                    {operator === "regle" && "Connectez-vous, allez dans Mon espace puis Renvoi d appel. Collez le numero copie dans le champ prevu."}
                    {operator === "orange" && "Connectez-vous, recherchez Renvoi d appel dans les options de votre ligne. Collez le numero copie."}
                    {operator === "sfr" && "Connectez-vous, allez dans Gerer ma ligne puis Renvoi d appel. Collez le numero copie."}
                    {operator === "bouygues" && "Connectez-vous, allez dans Mon telephone puis Options et Renvoi d appel. Collez le numero copie."}
                    {operator === "autre" && "Contactez votre operateur et demandez l activation du renvoi d appel si pas de reponse vers ce numero."}
                  </p>
                </div>
                {selected?.url && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <button onClick={copyNumber} style={{ width: "100%", padding: 14, borderRadius: 12, border: "1.5px solid #3B82F6", background: copied ? "#F0FDF4" : "#EFF6FF", fontSize: 14, fontWeight: 700, color: copied ? "#15803D" : "#1D4ED8", cursor: "pointer", fontFamily: "inherit" }}>
                      {copied ? "Numero copie !" : "Copier le numero : " + twilio_number}
                    </button>
                    <a href={selected.url} target="_blank" rel="noopener noreferrer" onClick={copyNumber} style={{ display: "block", background: "#3B82F6", borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 700, color: "#fff", textAlign: "center", textDecoration: "none" }}>
                      Ouvrir {selected.label}
                    </a>
                  </div>
                )}
              </div>
            )}

            <button onClick={() => router.push("/artisan/receptionist")} style={{ width: "100%", padding: 14, borderRadius: 12, border: "1px solid #E5E7EB", background: "#fff", fontSize: 14, fontWeight: 600, color: "#6B7280", cursor: "pointer", fontFamily: "inherit" }}>
              Continuer sans activer
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{ padding: "40px 24px 24px", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Sparkles size={28} color="#fff" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111", margin: 0 }}>Bienvenue sur Marie</h1>
        <p style={{ fontSize: 15, color: "#6B7280", marginTop: 8 }}>Votre assistante vocale IA pour artisans</p>
      </header>

      {/* Form */}
      <main style={{ flex: 1, padding: "0 16px 32px" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 24, maxWidth: 480, margin: "0 auto", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Nom complet */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Nom complet</label>
                <div style={{ position: "relative" }}>
                  <User size={16} style={iconStyle} />
                  <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Jean Dupont" style={inp} />
                </div>
              </div>

              {/* Entreprise */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>{"Nom de l'entreprise"}</label>
                <div style={{ position: "relative" }}>
                  <Building2 size={16} style={iconStyle} />
                  <input value={entreprise} onChange={e => setEntreprise(e.target.value)} placeholder="Plomberie Martin SARL" style={inp} />
                </div>
              </div>

              {/* Métier */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Métier</label>
                <div style={{ position: "relative" }}>
                  <Wrench size={16} style={iconStyle} />
                  <select value={metier} onChange={e => setMetier(e.target.value)} style={{ ...inp, color: metier ? "#111" : "#9CA3AF" }}>
                    <option value="" disabled>Sélectionnez votre métier</option>
                    {METIERS.map(m => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>{"Numéro de téléphone"}</label>
                <div style={{ position: "relative" }}>
                  <Phone size={16} style={iconStyle} />
                  <input type="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="06 12 34 56 78" style={inp} />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValid || loading}
                style={{
                  width: "100%", height: 56, borderRadius: 14, border: "none",
                  background: !isValid || loading ? "#BFDBFE" : "#3B82F6",
                  color: "#fff", fontSize: 16, fontWeight: 700,
                  cursor: !isValid || loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  fontFamily: "inherit", marginTop: 4, transition: "background .2s",
                }}
              >
                {loading ? (
                  <>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                    Activation en cours...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    ACTIVER MON ASSISTANT
                  </>
                )}
              </button>
            </div>
          </form>

          <p style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "#9CA3AF", lineHeight: 1.6 }}>
            En activant Marie, vous acceptez nos{" "}
            <a href="/terms" style={{ color: "#3B82F6", textDecoration: "none" }}>{"conditions d'utilisation"}</a>
            {" "}et notre{" "}
            <a href="/privacy" style={{ color: "#3B82F6", textDecoration: "none" }}>{"politique de confidentialité"}</a>.
          </p>
        </div>

        {/* Features preview */}
        <div style={{ maxWidth: 480, margin: "24px auto 0", padding: "0 2px" }}>
          <p style={{ textAlign: "center", fontSize: 13, color: "#9CA3AF", marginBottom: 14 }}>{"Marie va s'occuper de vos appels"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[
              { icon: <Phone size={20} color="#3B82F6" />, bg: "#EFF6FF", label: "Répond 24h/24" },
              { icon: <Sparkles size={20} color="#22C55E" />, bg: "#F0FDF4", label: "Prend les RDV" },
              { icon: <Building2 size={20} color="#F59E0B" />, bg: "#FFFBEB", label: "Note les urgences" },
            ].map(f => (
              <div key={f.label} style={{ background: "#fff", borderRadius: 14, padding: "16px 10px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                  {f.icon}
                </div>
                <p style={{ fontSize: 12, color: "#6B7280", margin: 0, lineHeight: 1.4 }}>{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}