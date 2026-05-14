 
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
    note: "15 min offertes",
    subnote: "Sans carte bancaire",
    isTrial: true,
    isPopular: false,
    ctaLabel: "Commencer gratuitement",
    ctaStyle: "secondary",
    features: [
      "Réponse IA aux appels",
      "Collecte des informations",
      "Rapport quotidien par SMS",
      "Tableau de bord",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: "49",
    period: "/mois",
    note: "190 min / mois",
    subnote: "Sans engagement",
    isTrial: false,
    isPopular: true,
    ctaLabel: "Choisir Starter",
    ctaStyle: "primary",
    features: [
      "Tout le plan Trial",
      "Numéro Marie dédié",
      "Assistant vocal personnalisé",
      "Gestion employés et famille",
      "Support email",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "99",
    period: "/mois",
    note: "310 min / mois",
    subnote: "Sans engagement",
    isTrial: false,
    isPopular: false,
    ctaLabel: "Choisir Pro",
    ctaStyle: "secondary",
    features: [
      "Tout le plan Starter",
      "Minutes supplémentaires",
      "Accès prioritaire nouveautés",
      "Support prioritaire",
    ],
  },
]

interface Subscription {
  plan: string
  status: string
  minutes_remaining: number
  current_period_end?: string
}

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    import("@/lib/supabaseBrowser").then(({ createSupabaseBrowserClient }) => {
      const sb = createSupabaseBrowserClient()
      sb.auth.getUser().then(({ data }) => {
        const uid = data.user?.id ?? ""
        if (!uid) return
        fetch("/api/marie/subscription?id=" + uid)
          .then(r => r.json())
          .then(json => { if (json.subscription) setSubscription(json.subscription) })
          .catch(() => {})
      })
    })
  }, [])

  function isCurrentPlan(planId: string) {
    return (subscription?.status === "active" || subscription?.status === "trial") && subscription?.plan === planId
  }

  function isDisabled(planId: string) {
    if (loading !== null) return true
    if (isCurrentPlan(planId)) return true
    if (planId === "trial" && subscription !== null) return true
    return false
  }

  function getCtaLabel(plan: typeof PLANS[0]) {
    if (isCurrentPlan(plan.id)) return "Plan actuel"
    if (plan.id === "trial" && subscription !== null) return "Trial utilisé"
    if (loading === plan.id) return "Chargement..."
    return plan.ctaLabel
  }

  async function handlePlan(planId: string) {
    if (isDisabled(planId)) return
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

  return (
    <div style={{
      minHeight: "100dvh",
      background: "#09090B",
      color: "#F0EDE6",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      WebkitFontSmoothing: "antialiased",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 28px 60px" }}>

        {/* Back */}
        <button
          onClick={() => router.back()}
          style={{ marginBottom: 48, fontSize: 13, color: "#5A5A6E", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}
        >
          ← Retour
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4A853", display: "block", marginBottom: 16 }}>
            Tarifs
          </span>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 20 }}>
            Un prix clair, sans engagement
          </h1>
          <p style={{ fontSize: 18, color: "#9C9AAF", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Commencez gratuitement avec 15 minutes offertes. Évoluez selon votre volume d&apos;appels.
          </p>
        </div>

        {/* Banner plan actuel */}
        {subscription && (subscription.status === "active" || subscription.status === "trial") && (
          <div style={{ marginBottom: 48, border: "1px solid rgba(212,168,83,0.25)", background: "rgba(212,168,83,0.04)", padding: "16px 20px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ fontSize: 14 }}>
              <span style={{ fontWeight: 700, color: "#D4A853" }}>
                Plan actuel — {PLANS.find(p => p.id === subscription.plan)?.name ?? subscription.plan}
              </span>
              <span style={{ color: "#5A5A6E", marginLeft: 12 }}>
                {subscription.minutes_remaining} min restantes
              </span>
              {subscription.current_period_end && (
                <span style={{ color: "#5A5A6E", fontSize: 12, marginLeft: 12 }}>
                  · Renouvellement le {new Date(subscription.current_period_end).toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>
            <button
              onClick={() => router.push("/artisan/receptionist")}
              style={{ fontSize: 12, fontWeight: 700, color: "#D4A853", border: "1px solid rgba(212,168,83,0.35)", padding: "6px 14px", borderRadius: 8, background: "transparent", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}
            >
              Dashboard →
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ marginBottom: 24, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)", padding: "12px 16px", borderRadius: 10, fontSize: 14, color: "#EF4444", maxWidth: 640, margin: "0 auto 24px" }}>
            {error}
          </div>
        )}

        {/* Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {PLANS.map(plan => {
            const isCurrent = isCurrentPlan(plan.id)
            const disabled = isDisabled(plan.id)

            return (
              <div
                key={plan.id}
                style={{
                  background: plan.isPopular ? "rgba(212,168,83,0.02)" : "#1A1A24",
                  border: plan.isPopular ? "1px solid rgba(212,168,83,0.35)" : isCurrent ? "1px solid rgba(212,168,83,0.5)" : "1px solid #27273A",
                  borderRadius: 20,
                  padding: 36,
                  display: "flex",
                  flexDirection: "column" as const,
                  position: "relative" as const,
                  opacity: plan.id === "trial" && subscription !== null && !isCurrent ? 0.45 : 1,
                  boxShadow: plan.isPopular ? "0 0 48px rgba(212,168,83,0.06)" : "none",
                }}
              >
                {/* Badge */}
                {plan.isPopular && !isCurrent && (
                  <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#D4A853,#E8C878,#B87333)", color: "#09090B", fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "5px 16px", borderRadius: 100, whiteSpace: "nowrap", textTransform: "uppercase" as const }}>
                    Le plus populaire
                  </div>
                )}
                {isCurrent && (
                  <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#D4A853,#E8C878,#B87333)", color: "#09090B", fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "5px 16px", borderRadius: 100, whiteSpace: "nowrap", textTransform: "uppercase" as const }}>
                    Plan actuel
                  </div>
                )}

                {/* Name */}
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#5A5A6E", marginBottom: 20 }}>
                  {plan.name}
                </div>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 2, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#D4A853", lineHeight: 1, marginTop: 12 }}>€</span>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 56, fontWeight: 800, color: "#F0EDE6", lineHeight: 1 }}>{plan.price}</span>
                  {plan.period && <span style={{ fontSize: 14, color: "#5A5A6E", alignSelf: "flex-end", marginBottom: 8 }}>{plan.period}</span>}
                </div>

                <div style={{ fontSize: 14, color: "#9C9AAF", marginBottom: 4 }}>{plan.note}</div>
                {plan.subnote && <div style={{ fontSize: 13, color: "#5A5A6E", marginBottom: 28 }}>{plan.subnote}</div>}

                {/* Divider */}
                <div style={{ height: 1, background: "#27273A", marginBottom: 28 }} />

                {/* Features */}
                <ul style={{ listStyle: "none", flex: 1, display: "flex", flexDirection: "column" as const, gap: 14, marginBottom: 32 }}>
                  {plan.features.map(feature => (
                    <li key={feature} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#9C9AAF" }}>
                      <Check size={15} color="#34D399" style={{ flexShrink: 0, marginTop: 2 }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handlePlan(plan.id)}
                  disabled={disabled}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 10,
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: disabled ? "default" : "pointer",
                    border: "none",
                    opacity: disabled && !isCurrent ? 0.4 : 1,
                    transition: "all .2s",
                    ...(plan.ctaStyle === "primary" ? {
                      background: "linear-gradient(135deg,#D4A853,#E8C878,#B87333)",
                      color: "#09090B",
                    } : {
                      background: "transparent",
                      color: "#F0EDE6",
                      border: "1px solid #27273A",
                    }),
                  }}
                >
                  {getCtaLabel(plan)}
                </button>
              </div>
            )
          })}
        </div>

        {/* Note renouvellement */}
        <div style={{ marginTop: 48, border: "1px solid #27273A", background: "#12121A", padding: "16px 20px", borderRadius: 12, maxWidth: 640, margin: "48px auto 0" }}>
          <p style={{ fontSize: 13, color: "#5A5A6E", lineHeight: 1.7 }}>
            <span style={{ fontWeight: 700, color: "#9C9AAF" }}>Renouvellement automatique.</span>{" "}
            Vos minutes sont remises à zéro chaque mois à la date de votre premier paiement.
            Résiliation possible à tout moment depuis votre tableau de bord.
          </p>
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#5A5A6E", marginTop: 24, letterSpacing: "0.06em" }}>
          Sans engagement · Résiliable à tout moment · Paiement sécurisé par Stripe
        </p>

      </div>
    </div>
  )
}