import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

const PLANS: Record<string, { priceId: string; minutes: number; label: string }> = {
  starter:  { priceId: "price_1TSgntRs97WeuZQfq3LKL1By", minutes: 190, label: "Marie Starter — 49€/mois" },
  pro:      { priceId: "price_1TSguARs97WeuZQfo4KBcdJF", minutes: 310, label: "Marie Pro — 79€/mois" },
  business: { priceId: "price_1TSgugRs97WeuZQfTnQdCRnK", minutes: 560, label: "Marie Business — 139€/mois" },
}

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )
}

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: Request) {
  try {
    const supabase = await getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 })

    const { plan } = await req.json()

    // Trial — aktivo direkt pa Stripe
    if (plan === "trial") {
      const admin = getSupabaseAdmin()
      const { data: existing } = await admin
        .from("marie_subscriptions")
        .select("plan, status")
        .eq("artisan_id", user.id)
        .single()

      // Nëse ka pasur trial aktiv ose plan tjetër, refuzo
      if (existing && existing.status === "active") {
        return NextResponse.json({ error: "Abonnement déjà actif" }, { status: 400 })
      }
      if (existing && existing.plan === "trial") {
        return NextResponse.json({ error: "Trial déjà utilisé" }, { status: 400 })
      }

      await admin.from("marie_subscriptions").upsert({
        artisan_id: user.id,
        plan: "trial",
        status: "active",
        minutes_remaining: 15,
        minutes_total: 15,
        trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: "artisan_id" })

      return NextResponse.json({ ok: true, redirect: "/artisan/receptionist/setup" })
    }

    const planConfig = PLANS[plan]
    if (!planConfig) return NextResponse.json({ error: "Plan invalide" }, { status: 400 })

    // Kontrollo nëse ekziston customer Stripe — evito duplicate
    const admin = getSupabaseAdmin()
    const { data: existingSub } = await admin
      .from("marie_subscriptions")
      .select("stripe_customer_id")
      .eq("artisan_id", user.id)
      .single()

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      metadata: { artisan_id: user.id, plan },
      success_url: `${APP_URL}/artisan/receptionist/setup?subscription=success&plan=${plan}`,
      cancel_url: `${APP_URL}/artisan/receptionist/pricing?subscription=cancel`,
      subscription_data: {
        metadata: { artisan_id: user.id, plan },
      },
    }

    // Reuse customer Stripe nëse ekziston
    if (existingSub?.stripe_customer_id) {
      sessionParams.customer = existingSub.stripe_customer_id
    } else {
      sessionParams.customer_email = user.email
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ ok: true, checkoutUrl: session.url })
  } catch (err) {
    console.error("Marie checkout error:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}