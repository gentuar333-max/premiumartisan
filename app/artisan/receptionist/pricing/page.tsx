"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

const PLANS = [
  {
    id: "trial",
    name: "Trial",
    price: "0",
    period: "",
    note: "15 min — 14 jours",
    badge: "GRATUIT",
    badgeGold: false,
    isPopular: false,
    ctaLabel: "Commencer gratuitement",
  },
  {
    id: "starter",
    name: "Starter",
    price: "49",
    period: "/mois",
    note: "190 min / mois",
    badge: null,
    badgeGold: false,
    isPopular: false,
    ctaLabel: "Choisir Starter",
  },
  {
    id: "pro",
    name: "Pro",
    price: "79",
    period: "/mois",
    note: "310 min / mois",
    badge: "POPULAIRE",
    badgeGold: true,
    isPopular: true,
    ctaLabel: "Choisir Pro",
  },
  {
    id: "business",
    name: "Business",
    price: "139",
    period: "/mois",
    note: "560 min / mois",
    badge: null,
    badgeGold: false,
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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/marie/subscription")
      .then(r => r.json())
      .then(json => {
        if (json.subscription) setSubscription(json.subscription)
      })
      .catch(() => {})
  }, [])

  function isCurrentPlan(planId: string) {
    return subscription?.status === "active" && subscription?.plan === planId
  }

  function isTrialUsed() {
    return subscription !== null
  }

  function getCtaLabel(plan: typeof PLANS[0]) {
    if (isCurrentPlan(plan.id)) return "Plan actuel"
    if (plan.id === "trial" && isTrialUsed()) return "Trial utilisé"
    return plan.ctaLabel
  }

  function isDisabled(plan: typeof PLANS[0]) {
    if (loading !== null) return true
    if (isCurrentPlan(plan.id)) return true
    if (plan.id === "trial" && isTrialUsed()) return true
    return false
  }

  async function handlePlan(planId: string) {
    const plan = PLANS.find(p => p.id === planId)!
    if (isDisabled(plan)) return
    setError(null)
    setLoading(planId)
    try {
      const res = await fetch("/api/marie/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? "Erreur serveur"); return }
      if (json.redirect) router.push(json.redirect)
      else if (json.checkoutUrl) window.location.href = json.checkoutUrl
    } catch {
      setError("Erreur réseau — réessayez")
    } finally {
      setLoading(null)
    }
  }

  const GOLD = "#D4A853"
  const GOLD_DIM = "#8B7340"
  const BG = "#09090B"
  const CARD = "#111113"
  const BORDER = "#27273A"
  const TEXT = "#F0EDE6"
  const MUTED = "#9C9AAF"
  const CARD_POPULAR = "rgba(212,168,83,0.06)"

  return (
    <div style={{ minHeight: "100dvh", background: BG, color: TEXT, fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(9,9,11,0.9)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}`, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => router.back()}
          style={{ background: "none", border: "none", cursor: "pointer", color: MUTED, fontSize: 13, padding: "4px 8px", borderRadius: 6, display: "flex", alignItems: "center", gap: 6 }}
        >
          ← Retour
        </button>
        <span style={{ color: BORDER }}>|</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: TEXT, letterSpacing: "0.02em" }}>
          Forfaits Marie IA
        </span>
      </nav>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 16px 80px" }}>

        {/* Titre */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: `1px solid ${GOLD_DIM}`, background: "rgba(212,168,83,0.08)", marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD, display: "inline-block" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.12em", color: GOLD, textTransform: "uppercase" as const, fontWeight: 600 }}>
              Réceptionniste IA 24h/7j
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 700, color: TEXT, margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Choisissez votre forfait
          </h1>
          <p style={{ fontSize: 14, color: MUTED, margin: 0, lineHeight: 1.6 }}>
            Paiement mensuel automatique — résiliable à tout moment
          </p>
        </div>

        {/* Banner plan actuel */}
        {subscription?.status === "active" && (
          <div style={{
            background: "rgba(212,168,83,0.08)", border: `1px solid ${GOLD_DIM}`,
            borderRadius: 10, padding: "12px 16px", marginBottom: 20,
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
          }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>
                Plan actuel — {PLANS.find(p => p.id === subscription.plan)?.name ?? subscription.plan}
              </span>
              <span style={{ fontSize: 12, color: MUTED, marginLeft: 10 }}>
                {subscription.minutes_remaining} min restantes
              </span>
              {subscription.current_period_end && (
                <span style={{ fontSize: 11, color: MUTED, marginLeft: 10 }}>
                  · Renouvellement le {new Date(subscription.current_period_end).toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>
            <button
              onClick={() => router.push("/artisan/receptionist")}
              style={{ fontSize: 12, fontWeight: 600, color: GOLD, background: "none", border: `1px solid ${GOLD_DIM}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", whiteSpace: "nowrap" as const }}
            >
              Dashboard →
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#f87171" }}>
            {error}
          </div>
        )}

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {PLANS.map(plan => {
            const isCurrent = isCurrentPlan(plan.id)
            const disabled = isDisabled(plan)
            const isLoading = loading === plan.id
            const trialDisabled = plan.id === "trial" && isTrialUsed() && !isCurrent

            return (
              <div
                key={plan.id}
                style={{
                  background: plan.isPopular ? CARD_POPULAR : CARD,
                  border: isCurrent
                    ? `1.5px solid ${GOLD}`
                    : plan.isPopular
                    ? `1.5px solid ${GOLD_DIM}`
                    : `1px solid ${BORDER}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  opacity: trialDisabled ? 0.45 : 1,
                }}
              >
                <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    {/* Badge */}
                    <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" as const }}>
                      {isCurrent && (
                        <span style={{ background: GOLD, color: "#09090B", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 4, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                          Plan actuel
                        </span>
                      )}
                      {plan.badge && !isCurrent && (
                        <span style={{
                          background: plan.badgeGold ? "rgba(212,168,83,0.15)" : "rgba(255,255,255,0.07)",
                          color: plan.badgeGold ? GOLD : MUTED,
                          border: `1px solid ${plan.badgeGold ? GOLD_DIM : BORDER}`,
                          fontSize: 10, fontWeight: 700, padding: "2px 8px",
                          borderRadius: 4, letterSpacing: "0.08em", textTransform: "uppercase" as const,
                        }}>
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 700, color: TEXT, margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>{plan.note}</p>
                  </div>

                  {/* Prix */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 1, justifyContent: "flex-end" }}>
                      <span style={{ fontSize: 32, fontWeight: 800, color: plan.isPopular ? GOLD : TEXT, letterSpacing: "-0.03em", fontFamily: "monospace" }}>
                        {plan.price}€
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: MUTED }}>{plan.period || "gratuit"}</span>
                  </div>
                </div>

                <div style={{ padding: "16px 20px 20px" }}>
                  <div style={{ borderTop: `1px solid ${BORDER}`, marginBottom: 14 }} />

                  {/* Features */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px 10px", marginBottom: 18 }}>
                    {FEATURES.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                        <Check size={12} color={GOLD} style={{ marginTop: 2, flexShrink: 0 }} />
                        <span style={{ fontSize: 11, color: MUTED, lineHeight: 1.4 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePlan(plan.id)}
                    disabled={disabled}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: 13,
                      fontWeight: 700,
                      borderRadius: 8,
                      border: plan.isPopular && !isCurrent && !disabled ? "none" : `1px solid ${BORDER}`,
                      cursor: disabled ? "default" : "pointer",
                      fontFamily: "inherit",
                      letterSpacing: "0.02em",
                      background: isCurrent
                        ? "rgba(212,168,83,0.15)"
                        : plan.isPopular && !trialDisabled
                        ? `linear-gradient(135deg, ${GOLD}, #E8C878, #B87333)`
                        : plan.id === "trial" && !isTrialUsed()
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.04)",
                      color: plan.isPopular && !isCurrent && !trialDisabled ? "#09090B" : isCurrent ? GOLD : TEXT,
                      opacity: isLoading ? 0.6 : disabled && !isCurrent ? 0.35 : 1,
                    }}
                  >
                    {isLoading ? "Chargement..." : getCtaLabel(plan)}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Note */}
        <div style={{ marginTop: 24, padding: "14px 16px", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10 }}>
          <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.7 }}>
            <span style={{ color: TEXT, fontWeight: 600 }}>Renouvellement automatique.</span>{" "}
            Vos minutes sont remises à zéro chaque mois à la date de votre premier paiement.
            Résiliation possible à tout moment depuis votre tableau de bord.
          </p>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: MUTED, marginTop: 20, letterSpacing: "0.03em" }}>
          Sans engagement · Résiliable à tout moment · Paiement sécurisé par Stripe
        </p>
      </div>
    </div>
  )
}