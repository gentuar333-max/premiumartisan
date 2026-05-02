"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

const PLANS = [
  {
    id: "trial",
    name: "Trial",
    price: "0",
    unit: "€",
    period: "",
    note: "15 min — 14 jours",
    isTrial: true,
    isPopular: false,
    ctaLabel: "Commencer gratuitement",
  },
  {
    id: "starter",
    name: "Starter",
    price: "49",
    unit: "€",
    period: "/mois",
    note: "190 min / mois",
    isTrial: false,
    isPopular: false,
    ctaLabel: "Choisir Starter",
  },
  {
    id: "pro",
    name: "Pro",
    price: "79",
    unit: "€",
    period: "/mois",
    note: "310 min / mois",
    isTrial: false,
    isPopular: true,
    ctaLabel: "Choisir Pro",
  },
  {
    id: "business",
    name: "Business",
    price: "139",
    unit: "€",
    period: "/mois",
    note: "560 min / mois",
    isTrial: false,
    isPopular: false,
    ctaLabel: "Choisir Business",
  },
]

const FEATURES = [
  "Réceptionniste IA 24h/7j",
  "SMS après chaque appel",
  "Tableau de bord des appels",
  "Contacts famille / employés",
  "Transcription de chaque appel",
  "Support par email",
]

interface Subscription {
  plan: string
  status: string
  minutes_remaining: number
  minutes_total: number
  trial_ends_at?: string
  current_period_end?: string
}

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [subLoading, setSubLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/marie/subscription")
      .then(r => r.json())
      .then(json => {
        if (json.error === "Non authentifié") {
          router.replace("/artisan/login?redirect=/artisan/receptionist/pricing")
          return
        }
        if (json.subscription) setSubscription(json.subscription)
      })
      .catch(() => {})
      .finally(() => setSubLoading(false))
  }, [router])

  function isCurrentPlan(planId: string) {
    return subscription?.status === "active" && subscription?.plan === planId
  }

  function isTrialUsed() {
    return subscription?.plan === "trial" || (subscription?.plan !== undefined && subscription?.plan !== null)
  }

  function getCtaLabel(plan: typeof PLANS[0]) {
    if (isCurrentPlan(plan.id)) return "Plan actuel"
    if (plan.isTrial && isTrialUsed()) return "Trial utilisé"
    return plan.ctaLabel
  }

  function isDisabled(plan: typeof PLANS[0]) {
    if (loading !== null) return true
    if (isCurrentPlan(plan.id)) return true
    if (plan.isTrial && isTrialUsed()) return true
    return false
  }

  async function handlePlan(planId: string) {
    if (isDisabled(PLANS.find(p => p.id === planId)!)) return
    setError(null)
    setLoading(planId)
    try {
      const res = await fetch("/api/marie/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Erreur serveur")
        return
      }
      if (json.redirect) router.push(json.redirect)
      else if (json.checkoutUrl) window.location.href = json.checkoutUrl
    } catch {
      setError("Erreur réseau — réessayez")
    } finally {
      setLoading(null)
    }
  }

  // Couleurs PA
  const crimson = "#6B2737"
  const crimsonLight = "#8B3A4E"
  const bg = "#fafafa"
  const border = "#e5e5e5"
  const textPrimary = "#1a1a1a"
  const textSecondary = "#737373"
  const textMuted = "#a3a3a3"
  const green = "#16a34a"
  const greenBg = "#f0fdf4"
  const greenBorder = "#86efac"

  return (
    <div style={{ minHeight: "100dvh", background: bg, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${border}`, background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => router.back()}
          style={{ background: "none", border: "none", cursor: "pointer", color: textSecondary, fontSize: 14, padding: "4px 8px", borderRadius: 6, display: "flex", alignItems: "center", gap: 6 }}
        >
          ← Retour
        </button>
        <span style={{ color: border }}>|</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: textPrimary }}>Forfaits Réceptionniste IA</span>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px 80px" }}>

        {/* Titre */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: textPrimary, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            Choisissez votre forfait
          </h1>
          <p style={{ fontSize: 14, color: textSecondary, margin: 0, lineHeight: 1.5 }}>
            Tous les forfaits incluent l&apos;ensemble des fonctionnalités.
            <br />Paiement mensuel automatique — résiliable à tout moment.
          </p>
        </div>

        {/* Banner plan actuel */}
        {!subLoading && subscription?.status === "active" && (
          <div style={{
            background: greenBg, border: `1.5px solid ${greenBorder}`,
            borderRadius: 10, padding: "12px 16px", marginBottom: 20,
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
          }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#166534" }}>
                Plan actuel — {PLANS.find(p => p.id === subscription.plan)?.name ?? subscription.plan}
              </span>
              {subscription.minutes_remaining > 0 && (
                <span style={{ fontSize: 12, color: green, marginLeft: 10 }}>
                  {subscription.minutes_remaining} min restantes
                </span>
              )}
              {subscription.current_period_end && (
                <span style={{ fontSize: 11, color: textMuted, marginLeft: 10 }}>
                  Renouvellement le {new Date(subscription.current_period_end).toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>
            <button
              onClick={() => router.push("/artisan/receptionist")}
              style={{
                fontSize: 12, fontWeight: 600, color: "#166534",
                background: "none", border: `1px solid ${greenBorder}`,
                borderRadius: 6, padding: "4px 10px", cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              Dashboard →
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fca5a5",
            borderRadius: 8, padding: "10px 14px", marginBottom: 16,
            fontSize: 13, color: "#dc2626",
          }}>
            {error}
          </div>
        )}

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {PLANS.map(plan => {
            const isCurrent = isCurrentPlan(plan.id)
            const disabled = isDisabled(plan)
            const isLoading = loading === plan.id
            const trialDisabled = plan.isTrial && isTrialUsed() && !isCurrent

            return (
              <div
                key={plan.id}
                style={{
                  background: "#fff",
                  border: isCurrent
                    ? `2px solid ${green}`
                    : plan.isPopular
                    ? `2px solid ${crimson}`
                    : `1.5px solid ${border}`,
                  borderRadius: 12,
                  overflow: "hidden",
                  opacity: trialDisabled ? 0.5 : 1,
                }}
              >
                {/* Top row */}
                <div style={{ padding: "16px 16px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    {/* Badges */}
                    <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                      {isCurrent && (
                        <span style={{
                          background: green, color: "#fff",
                          fontSize: 10, fontWeight: 700, padding: "2px 8px",
                          borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em",
                        }}>
                          Plan actuel
                        </span>
                      )}
                      {plan.isPopular && !isCurrent && (
                        <span style={{
                          background: crimson, color: "#fff",
                          fontSize: 10, fontWeight: 700, padding: "2px 8px",
                          borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em",
                        }}>
                          Populaire
                        </span>
                      )}
                      {plan.isTrial && (
                        <span style={{
                          background: "#f5f5f5", color: textSecondary,
                          fontSize: 10, fontWeight: 600, padding: "2px 8px",
                          borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.05em",
                        }}>
                          14 jours d&apos;essai
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: 16, fontWeight: 700, color: textPrimary, margin: "0 0 4px" }}>
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: 12, color: textMuted, margin: 0 }}>{plan.note}</p>
                  </div>

                  {/* Prix */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 2, justifyContent: "flex-end" }}>
                      <span style={{ fontSize: 28, fontWeight: 800, color: textPrimary, letterSpacing: "-0.03em" }}>
                        {plan.price}€
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: textMuted }}>{plan.period || "gratuit"}</span>
                  </div>
                </div>

                {/* Features + CTA */}
                <div style={{ padding: "14px 16px 16px" }}>
                  <div style={{ borderTop: `1px solid ${border}`, marginBottom: 12 }} />

                  {/* Features — 2 colonne su mobile */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 8px", marginBottom: 16 }}>
                    {FEATURES.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                        <Check size={12} color={isCurrent ? green : crimson} style={{ marginTop: 2, flexShrink: 0 }} />
                        <span style={{ fontSize: 11, color: "#525252", lineHeight: 1.4 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePlan(plan.id)}
                    disabled={disabled}
                    style={{
                      width: "100%",
                      padding: "11px 16px",
                      fontSize: 13,
                      fontWeight: 700,
                      borderRadius: 8,
                      border: "none",
                      cursor: disabled ? "default" : "pointer",
                      fontFamily: "inherit",
                      transition: "opacity .15s, transform .1s",
                      background: isCurrent
                        ? green
                        : plan.isPopular
                        ? crimson
                        : plan.isTrial && !isTrialUsed()
                        ? "#1a1a1a"
                        : "#f5f5f5",
                      color: isCurrent || plan.isPopular || (plan.isTrial && !isTrialUsed())
                        ? "#fff"
                        : textSecondary,
                      opacity: isLoading ? 0.7 : disabled && !isCurrent ? 0.4 : 1,
                    }}
                  >
                    {isLoading ? "Chargement..." : getCtaLabel(plan)}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Note renouvellement */}
        <div style={{ marginTop: 24, padding: "14px 16px", background: "#fff", border: `1px solid ${border}`, borderRadius: 10 }}>
          <p style={{ fontSize: 12, color: textSecondary, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: textPrimary }}>Paiement automatique mensuel.</strong>{" "}
            Vos minutes sont renouvelées automatiquement chaque mois à la date de votre premier paiement.
            Si votre solde atteint 0, Marie reste active mais vous recevrez une notification pour recharger.
            Résiliation possible à tout moment depuis votre tableau de bord.
          </p>
        </div>

        {/* Pay as you go */}
        <div style={{ marginTop: 12, padding: "14px 16px", background: "#fff", border: `1px solid ${border}`, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: textPrimary, margin: "0 0 2px" }}>
              Besoin de minutes supplémentaires ?
            </p>
            <p style={{ fontSize: 12, color: textSecondary, margin: 0 }}>
              Rechargez à tout moment — 0.65€/min, valables 6 mois.
            </p>
          </div>
          <button
            onClick={() => router.push("/artisan/receptionist")}
            style={{
              fontSize: 12, fontWeight: 600, color: crimson,
              background: "none", border: `1.5px solid ${crimson}`,
              borderRadius: 8, padding: "8px 14px", cursor: "pointer",
              fontFamily: "inherit", whiteSpace: "nowrap",
            }}
          >
            Recharger →
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: textMuted, marginTop: 20 }}>
          Sans engagement · Résiliable à tout moment · Paiement sécurisé par Stripe
        </p>
      </div>
    </div>
  )
}