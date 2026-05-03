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
    note: "15 min / 14 jours",
    isTrial: true,
    isPopular: false,
    ctaLabel: "Essai gratuit",
  },
  {
    id: "starter",
    name: "Starter",
    price: "49",
    unit: "€/mois",
    note: "190 min / mois",
    isTrial: false,
    isPopular: false,
    ctaLabel: "Choisir",
  },
  {
    id: "pro",
    name: "Pro",
    price: "79",
    unit: "€/mois",
    note: "310 min / mois",
    isTrial: false,
    isPopular: true,
    ctaLabel: "Choisir",
  },
  {
    id: "business",
    name: "Business",
    price: "139",
    unit: "€/mois",
    note: "560 min / mois",
    isTrial: false,
    isPopular: false,
    ctaLabel: "Choisir",
  },
  {
]

const FEATURES = [
  "Marie 24/7",
  "SMS",
  "Dashboard",
  "Contacts",
  "Transcript",
  "Support",
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
    fetch("/api/marie/subscription")
      .then(r => r.json())
      .then(json => { if (json.subscription) setSubscription(json.subscription) })
      .catch(() => {})
  }, [])

  function isCurrentPlan(planId: string) {
    return subscription?.status === "active" && subscription?.plan === planId
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
    <div className="min-h-[100dvh] bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-8 text-sm text-neutral-400 hover:text-neutral-700 transition-colors flex items-center gap-1"
        >
          ← Retour
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a1a] mb-3">
            Nos forfaits
          </h1>
          <p className="text-base text-neutral-500 max-w-lg mx-auto">
            Tous nos forfaits incluent l&apos;ensemble des fonctionnalités. Choisissez celui qui correspond à vos besoins.
          </p>
        </div>

        {/* Banner plan actuel */}
        {subscription?.status === "active" && (
          <div className="mb-8 border border-[#6B2737] bg-[#fdf8f8] p-4 flex items-center justify-between gap-4 max-w-2xl mx-auto">
            <div className="text-sm">
              <span className="font-semibold text-[#6B2737]">
                Plan actuel — {PLANS.find(p => p.id === subscription.plan)?.name ?? subscription.plan}
              </span>
              <span className="text-neutral-500 ml-2">
                {subscription.minutes_remaining} min restantes
              </span>
              {subscription.current_period_end && (
                <span className="text-neutral-400 text-xs ml-2">
                  · Renouvellement le {new Date(subscription.current_period_end).toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>
            <button
              onClick={() => router.push("/artisan/receptionist")}
              className="text-xs font-semibold text-[#6B2737] border border-[#6B2737] px-3 py-1 hover:bg-[#6B2737] hover:text-white transition-colors whitespace-nowrap"
            >
              Dashboard →
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 p-3 text-sm text-red-600 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {PLANS.map(plan => {
            const isCurrent = isCurrentPlan(plan.id)
            const disabled = isDisabled(plan.id)
            const isLoading = loading === plan.id

            return (
              <div
                key={plan.id}
                className={
                  isCurrent
                    ? "relative border-2 border-[#6B2737] bg-white p-5 md:p-6 flex flex-col"
                    : plan.isPopular
                    ? "relative border border-[#6B2737] bg-white p-5 md:p-6 flex flex-col"
                    : "relative border border-[#e5e5e5] bg-white p-5 md:p-6 flex flex-col"
                }
                style={{ opacity: plan.id === "trial" && subscription !== null && !isCurrent ? 0.45 : 1 }}
              >
                {/* Plan actuel badge */}
                {isCurrent && (
                  <div className="mb-3">
                    <span className="inline-block bg-[#6B2737] px-2 py-0.5 text-[11px] font-medium text-white uppercase tracking-wide">
                      Plan actuel
                    </span>
                  </div>
                )}

                {/* Popular badge */}
                {plan.isPopular && !isCurrent && (
                  <div className="mb-3">
                    <span className="inline-block bg-[#6B2737] px-2 py-0.5 text-[11px] font-medium text-white uppercase tracking-wide">
                      Le plus populaire
                    </span>
                  </div>
                )}

                {/* Trial subtitle */}
                {plan.isTrial && (
                  <p className="text-[11px] text-neutral-400 mb-1 uppercase tracking-wide">
                    14 jours d&apos;essai
                  </p>
                )}

                {/* Plan Name */}
                <h3 className="text-base font-semibold text-[#1a1a1a] mb-1">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-bold text-[#1a1a1a]">{plan.price}</span>
                  <span className="text-xs text-neutral-500">{plan.unit}</span>
                </div>

                {/* Note */}
                <p className="text-xs text-neutral-400 mb-4">{plan.note}</p>

                {/* Divider */}
                <div className="border-t border-[#e5e5e5] mb-4" />

                {/* Features */}
                <ul className="space-y-2.5 mb-5 flex-1">
                  {FEATURES.map(feature => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-neutral-400 shrink-0" strokeWidth={2.5} />
                      <span className="text-xs text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handlePlan(plan.id)}
                  disabled={disabled}
                  className={
                    isCurrent
                      ? "w-full border-2 border-[#6B2737] bg-white px-3 py-2 text-xs font-medium text-[#6B2737] cursor-default"
                      : plan.isPopular
                      ? "w-full bg-[#6B2737] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#5a2230] disabled:opacity-40 disabled:cursor-default"
                      : "w-full border border-[#d4d4d4] bg-white px-3 py-2 text-xs font-medium text-[#1a1a1a] transition-colors hover:border-[#1a1a1a] disabled:opacity-40 disabled:cursor-default"
                  }
                >
                  {isLoading ? "Chargement..." : getCtaLabel(plan)}
                </button>
              </div>
            )
          })}
        </div>

        {/* Note renouvellement */}
        <div className="mt-10 border border-[#e5e5e5] p-4 max-w-2xl mx-auto">
          <p className="text-xs text-neutral-500 leading-relaxed">
            <span className="font-semibold text-[#1a1a1a]">Renouvellement automatique.</span>{" "}
            Vos minutes sont remises à zéro chaque mois à la date de votre premier paiement.
            Résiliation possible à tout moment depuis votre tableau de bord.
          </p>
        </div>

        <p className="text-center text-[11px] text-neutral-400 mt-6 tracking-wide">
          Sans engagement · Résiliable à tout moment · Paiement sécurisé par Stripe
        </p>
      </div>
    </div>
  )
}