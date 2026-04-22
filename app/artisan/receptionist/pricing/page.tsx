"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const plans = [
  {
    id: "trial",
    name: "Trial",
    price: "0",
    unit: "€",
    note: "15 min / 14 jours",
    isTrial: true,
    isPopular: false,
    ctaLabel: "Essai gratuit",
  },
  {
    id: "starter",
    name: "Starter",
    price: "99",
    unit: "€/mois",
    note: "150 min",
    isTrial: false,
    isPopular: true,
    ctaLabel: "Choisir",
  },
  {
    id: "pro",
    name: "Pro",
    price: "199",
    unit: "€/mois",
    note: "400 min",
    isTrial: false,
    isPopular: false,
    ctaLabel: "Choisir",
  },
  {
    id: "business",
    name: "Business",
    price: "349",
    unit: "€/mois",
    note: "800 min",
    isTrial: false,
    isPopular: false,
    ctaLabel: "Choisir",
  },
  {
    id: "payg",
    name: "Pay as you go",
    price: "0.65",
    unit: "€/min",
    note: "par minute",
    isTrial: false,
    isPopular: false,
    ctaLabel: "Choisir",
  },
]

const features = [
  "Réceptionniste IA 24h/7j",
  "SMS après chaque appel",
  "Tableau de bord des appels",
  "Contacts famille / employés",
  "Transcription de chaque appel",
  "Support par email",
]

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  async function handleSelect(planId: string) {
    setLoading(planId)
    try {
      const res = await fetch("/api/marie/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      })
      const json = await res.json()
      if (json.ok && json.redirect) {
        router.push(json.redirect)
      } else if (json.checkoutUrl) {
        window.location.href = json.checkoutUrl
      }
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ minHeight: "100dvh", background: "#fff", padding: "48px 16px 80px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1a1a1a", marginBottom: 12, letterSpacing: "-0.02em" }}>
            Nos forfaits
          </h1>
          <p style={{ fontSize: 15, color: "#737373", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
            Tous nos forfaits incluent l&apos;ensemble des fonctionnalités. Choisissez celui qui correspond à vos besoins.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {plans.map(plan => (
            <div
              key={plan.id}
              style={{
                border: plan.isPopular ? "1.5px solid #6B2737" : "1.5px solid #e5e5e5",
                background: "#fff",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div style={{ marginBottom: 10 }}>
                  <span style={{ background: "#6B2737", color: "#fff", fontSize: 10, fontWeight: 600, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Le plus populaire
                  </span>
                </div>
              )}

              {/* Trial label */}
              {plan.isTrial && (
                <p style={{ fontSize: 10, color: "#a3a3a3", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  14 jours d&apos;essai
                </p>
              )}

              {/* Name */}
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 6 }}>
                {plan.name}
              </h3>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a" }}>{plan.price}</span>
                <span style={{ fontSize: 12, color: "#737373" }}>{plan.unit}</span>
              </div>

              {/* Note */}
              <p style={{ fontSize: 11, color: "#a3a3a3", marginBottom: 16 }}>{plan.note}</p>

              {/* Divider */}
              <div style={{ borderTop: "1px solid #e5e5e5", marginBottom: 16 }} />

              {/* Features */}
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

              {/* CTA */}
              <button
                onClick={() => handleSelect(plan.id)}
                disabled={loading === plan.id}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: loading === plan.id ? "wait" : "pointer",
                  border: plan.isPopular ? "none" : "1.5px solid #d4d4d4",
                  background: plan.isPopular ? "#6B2737" : "#fff",
                  color: plan.isPopular ? "#fff" : "#1a1a1a",
                  fontFamily: "inherit",
                  transition: "all .15s",
                  opacity: loading === plan.id ? 0.7 : 1,
                }}
              >
                {loading === plan.id ? "..." : plan.ctaLabel}
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", fontSize: 12, color: "#a3a3a3", marginTop: 32 }}>
          Sans engagement — résiliable à tout moment
        </p>
      </div>
    </div>
  )
}