"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const plans = [
  { id: "trial",    name: "Trial",    price: "0",   unit: "€",      note: "15 min / 14 jours", isTrial: true,  isPopular: false, ctaLabel: "Essai gratuit" },
  { id: "starter",  name: "Starter",  price: "99",  unit: "€/mois", note: "150 min / mois",    isTrial: false, isPopular: true,  ctaLabel: "Choisir" },
  { id: "pro",      name: "Pro",      price: "199", unit: "€/mois", note: "400 min / mois",    isTrial: false, isPopular: false, ctaLabel: "Choisir" },
  { id: "business", name: "Business", price: "349", unit: "€/mois", note: "800 min / mois",    isTrial: false, isPopular: false, ctaLabel: "Choisir" },
]

const features = [
  "Réceptionniste IA 24h/7j",
  "SMS après chaque appel",
  "Tableau de bord des appels",
  "Contacts famille / employés",
  "Transcription de chaque appel",
  "Support par email",
]

const PRICE_PER_MIN = 0.65

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [minutes, setMinutes] = useState(30)

  const totalPrice = (minutes * PRICE_PER_MIN).toFixed(2)

  async function handlePlan(planId: string) {
    setLoading(planId)
    try {
      const res = await fetch("/api/marie/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      })
      const json = await res.json()
      if (json.ok && json.redirect) router.push(json.redirect)
      else if (json.checkoutUrl) window.location.href = json.checkoutUrl
    } finally { setLoading(null) }
  }

  async function handlePayg() {
    setLoading("payg")
    try {
      const res = await fetch("/api/marie/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minutes }),
      })
      const json = await res.json()
      if (json.checkoutUrl) window.location.href = json.checkoutUrl
    } finally { setLoading(null) }
  }

  return (
    <div style={{ minHeight: "100dvh", background: "#fff", padding: "48px 16px 80px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1a1a1a", marginBottom: 12, letterSpacing: "-0.02em" }}>
            Nos forfaits
          </h1>
          <p style={{ fontSize: 15, color: "#737373", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
            Tous les forfaits incluent l&apos;ensemble des fonctionnalités. Choisissez celui qui correspond à vos besoins.
          </p>
        </div>

        {/* Plans abonnement */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 64 }}>
          {plans.map(plan => (
            <div
              key={plan.id}
              style={{
                border: plan.isPopular ? "1.5px solid #6B2737" : "1.5px solid #e5e5e5",
                background: "#fff", padding: "20px",
                display: "flex", flexDirection: "column",
              }}
            >
              {plan.isPopular && (
                <div style={{ marginBottom: 10 }}>
                  <span style={{ background: "#6B2737", color: "#fff", fontSize: 10, fontWeight: 600, padding: "2px 8px", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
                    Le plus populaire
                  </span>
                </div>
              )}
              {plan.isTrial && (
                <p style={{ fontSize: 10, color: "#a3a3a3", marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
                  14 jours d&apos;essai
                </p>
              )}
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 6 }}>{plan.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a" }}>{plan.price}</span>
                <span style={{ fontSize: 12, color: "#737373" }}>{plan.unit}</span>
              </div>
              <p style={{ fontSize: 11, color: "#a3a3a3", marginBottom: 16 }}>{plan.note}</p>
              <div style={{ borderTop: "1px solid #e5e5e5", marginBottom: 16 }} />
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                {features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 6.5L5 9.5L11 3.5" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontSize: 12, color: "#525252" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlan(plan.id)}
                disabled={loading === plan.id}
                style={{
                  width: "100%", padding: "9px 12px", fontSize: 12, fontWeight: 600,
                  cursor: loading === plan.id ? "wait" : "pointer",
                  border: plan.isPopular ? "none" : "1.5px solid #d4d4d4",
                  background: plan.isPopular ? "#6B2737" : "#fff",
                  color: plan.isPopular ? "#fff" : "#1a1a1a",
                  fontFamily: "inherit", transition: "all .15s",
                  opacity: loading === plan.id ? 0.7 : 1,
                }}
              >
                {loading === plan.id ? "..." : plan.ctaLabel}
              </button>
            </div>
          ))}
        </div>

        {/* Pay as you go — interaktiv */}
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 60, height: 1, background: "#e5e5e5" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#737373", textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
                Pay as you go
              </span>
              <div style={{ width: 60, height: 1, background: "#e5e5e5" }} />
            </div>
            <p style={{ fontSize: 13, color: "#a3a3a3", marginTop: 8 }}>
              Sans abonnement · {PRICE_PER_MIN}€ / min · valable 6 mois
            </p>
          </div>

          <div style={{ border: "1.5px solid #e5e5e5", padding: 28 }}>

            {/* Slider */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>
                  Nombre de minutes
                </label>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a" }}>
                  {minutes} min
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={300}
                step={5}
                value={minutes}
                onChange={e => setMinutes(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#1a1a1a", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                <span style={{ fontSize: 11, color: "#a3a3a3" }}>10 min</span>
                <span style={{ fontSize: 11, color: "#a3a3a3" }}>300 min</span>
              </div>
            </div>

            {/* Prix calculé */}
            <div style={{ background: "#f9f9f9", padding: "16px 20px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, color: "#737373", marginBottom: 2 }}>Total à payer</div>
                <div style={{ fontSize: 11, color: "#a3a3a3" }}>{minutes} min × {PRICE_PER_MIN}€</div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a" }}>
                {totalPrice}€
              </div>
            </div>

            {/* Input manuel */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: "#737373", display: "block", marginBottom: 6 }}>
                Ou saisissez directement
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="number"
                  min={10}
                  max={300}
                  value={minutes}
                  onChange={e => {
                    const v = Math.min(300, Math.max(10, Number(e.target.value)))
                    setMinutes(v)
                  }}
                  style={{ width: 80, padding: "8px 12px", border: "1.5px solid #e5e5e5", fontSize: 14, fontWeight: 600, outline: "none", fontFamily: "inherit", textAlign: "center" as const }}
                />
                <span style={{ fontSize: 13, color: "#737373" }}>minutes</span>
              </div>
            </div>

            <button
              onClick={handlePayg}
              disabled={loading === "payg"}
              style={{
                width: "100%", padding: "12px", fontSize: 13, fontWeight: 600,
                cursor: loading === "payg" ? "wait" : "pointer",
                border: "1.5px solid #1a1a1a", background: "#1a1a1a", color: "#fff",
                fontFamily: "inherit", transition: "all .15s",
                opacity: loading === "payg" ? 0.7 : 1,
              }}
            >
              {loading === "payg" ? "..." : `Acheter ${minutes} min — ${totalPrice}€`}
            </button>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#a3a3a3", marginTop: 40 }}>
          Sans engagement — résiliable à tout moment
        </p>
      </div>
    </div>
  )
}