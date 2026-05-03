import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

const PLAN_MINUTES: Record<string, number> = {
  trial:    15,
  starter:  190,
  pro:      310,
  business: 800,
}

const PRICE_TO_PLAN: Record<string, string> = {
  "price_1TSgntRs97WeuZQfq3LKL1By": "starter",
  "price_1TSguARs97WeuZQfo4KBcdJF": "pro",
  "price_1TSgugRs97WeuZQfTnQdCRnK": "business",
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

async function upsertSub(
  supabase: ReturnType<typeof getSupabase>,
  artisanId: string,
  data: Record<string, unknown>
) {
  const { error } = await supabase
    .from("marie_subscriptions")
    .upsert(
      { artisan_id: artisanId, ...data, updated_at: new Date().toISOString() },
      { onConflict: "artisan_id" }
    )
  if (error) console.error("upsertSub error:", error.message)
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get("stripe-signature") ?? ""

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET_MARIE!)
  } catch (err) {
    console.error("Webhook signature error:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = getSupabase()

  // ── 1. Checkout complété ─────────────────────────────────────────────────
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const { artisan_id, plan, package: pkg, minutes, topup_id } = session.metadata ?? {}

    if (!artisan_id) return NextResponse.json({ ok: true })

    // Abonnement mensuel
    if (plan && session.mode === "subscription") {
      const planMinutes = PLAN_MINUTES[plan] ?? 0
      let currentPeriodEnd: string | null = null
      if (session.subscription) {
        try {
          const s = await stripe.subscriptions.retrieve(session.subscription as string)
          currentPeriodEnd = new Date((s as any).current_period_end * 1000).toISOString()
        } catch (_) { /* ignore */ }
      }
      await upsertSub(supabase, artisan_id, {
        plan,
        status: "active",
        stripe_subscription_id: session.subscription ?? null,
        stripe_customer_id: session.customer ?? null,
        minutes_remaining: planMinutes,
        minutes_total: planMinutes,
        current_period_end: currentPeriodEnd,
      })
      console.log(`[checkout.completed] ${plan} actif — ${planMinutes} min — ${artisan_id}`)
    }

    // Topup minutes à la carte
    if (pkg && minutes && session.mode === "payment") {
      const minutesToAdd = parseInt(minutes)
      if (topup_id) {
        await supabase
          .from("marie_topups")
          .update({ status: "paid", stripe_payment_intent: session.payment_intent ?? null })
          .eq("id", topup_id)
      }
      const { data: existing } = await supabase
        .from("marie_subscriptions")
        .select("minutes_remaining, minutes_total")
        .eq("artisan_id", artisan_id)
        .single()
      if (existing) {
        await supabase
          .from("marie_subscriptions")
          .update({
            minutes_remaining: (existing.minutes_remaining ?? 0) + minutesToAdd,
            minutes_total: (existing.minutes_total ?? 0) + minutesToAdd,
            updated_at: new Date().toISOString(),
          })
          .eq("artisan_id", artisan_id)
      } else {
        await upsertSub(supabase, artisan_id, {
          plan: "payg",
          status: "active",
          minutes_remaining: minutesToAdd,
          minutes_total: minutesToAdd,
        })
      }
      console.log(`[checkout.completed] topup +${minutesToAdd} min — ${artisan_id}`)
    }
  }

  // ── 2. Renouvellement mensuel automatique ────────────────────────────────
  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice
    // Vetëm renouvellements — jo pagesa e parë
    if (invoice.billing_reason !== "subscription_cycle") {
      return NextResponse.json({ ok: true })
    }
    const customerId = invoice.customer as string
    const stripeSubId = (invoice as any).subscription as string
    const { data: sub } = await supabase
      .from("marie_subscriptions")
      .select("plan, artisan_id")
      .eq("stripe_customer_id", customerId)
      .single()
    if (!sub || !sub.plan || sub.plan === "payg" || sub.plan === "trial") {
      return NextResponse.json({ ok: true })
    }
    const planMinutes = PLAN_MINUTES[sub.plan] ?? 0
    let currentPeriodEnd: string | null = null
    if (stripeSubId) {
      try {
        const s = await stripe.subscriptions.retrieve(stripeSubId)
        currentPeriodEnd = new Date((s as any).current_period_end * 1000).toISOString()
      } catch (_) { /* ignore */ }
    }
    await supabase
      .from("marie_subscriptions")
      .update({
        minutes_remaining: planMinutes,
        minutes_total: planMinutes,
        status: "active",
        current_period_end: currentPeriodEnd,
        updated_at: new Date().toISOString(),
      })
      .eq("artisan_id", sub.artisan_id)
    console.log(`[invoice.paid] renouvellement ${sub.plan} — ${planMinutes} min — ${sub.artisan_id}`)
  }

  // ── 3. Paiement échoué ───────────────────────────────────────────────────
  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice
    const customerId = invoice.customer as string
    await supabase
      .from("marie_subscriptions")
      .update({ status: "past_due", updated_at: new Date().toISOString() })
      .eq("stripe_customer_id", customerId)
    console.log(`[invoice.payment_failed] past_due — customer ${customerId}`)
  }

  // ── 4. Subscription annulée ou modifiée ──────────────────────────────────
  if (
    event.type === "customer.subscription.deleted" ||
    event.type === "customer.subscription.updated"
  ) {
    const stripeSub = event.data.object as Stripe.Subscription

    if (stripeSub.status === "canceled") {
      await supabase
        .from("marie_subscriptions")
        .update({ status: "canceled", updated_at: new Date().toISOString() })
        .eq("stripe_subscription_id", stripeSub.id)
      console.log(`[subscription.deleted] canceled: ${stripeSub.id}`)
    }

    if (stripeSub.status === "unpaid") {
      await supabase
        .from("marie_subscriptions")
        .update({ status: "past_due", updated_at: new Date().toISOString() })
        .eq("stripe_subscription_id", stripeSub.id)
      console.log(`[subscription.updated] unpaid: ${stripeSub.id}`)
    }

    // Upgrade/downgrade via Stripe Billing Portal
    if (stripeSub.status === "active") {
      const priceId = stripeSub.items.data[0]?.price?.id ?? ""
      const newPlan = PRICE_TO_PLAN[priceId]
      if (newPlan) {
        const planMinutes = PLAN_MINUTES[newPlan]
        await supabase
          .from("marie_subscriptions")
          .update({
            plan: newPlan,
            status: "active",
            minutes_remaining: planMinutes,
            minutes_total: planMinutes,
            current_period_end: new Date((stripeSub as any).current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", stripeSub.id)
        console.log(`[subscription.updated] changement plan -> ${newPlan}`)
      }
    }
  }

  return NextResponse.json({ ok: true })
}