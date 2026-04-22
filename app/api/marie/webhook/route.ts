import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const PLAN_MINUTES: Record<string, number> = {
  trial:    15,
  starter:  150,
  pro:      400,
  business: 800,
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET_MARIE!);
  } catch (err) {
    console.error("Marie webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = getSupabase();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { artisan_id, plan, package: pkg, minutes, topup_id } = session.metadata ?? {};
    if (!artisan_id) return NextResponse.json({ ok: true });

    // Abonnement
    if (plan && session.mode === "subscription") {
      const planMinutes = PLAN_MINUTES[plan] ?? 0;
      await supabase.from("marie_subscriptions").upsert({
        artisan_id,
        plan,
        status: "active",
        stripe_subscription_id: session.subscription as string ?? null,
        stripe_customer_id: session.customer as string ?? null,
        minutes_remaining: planMinutes,
        minutes_total: planMinutes,
        updated_at: new Date().toISOString(),
      }, { onConflict: "artisan_id" });
      console.log(`Abonnement ${plan} active — ${planMinutes} min pour ${artisan_id}`);
    }

    // Topup
    if (pkg && minutes && session.mode === "payment") {
      const minutesToAdd = parseInt(minutes);
      if (topup_id) {
        await supabase.from("marie_topups")
          .update({ status: "paid", stripe_payment_intent: session.payment_intent as string ?? null })
          .eq("id", topup_id);
      }
      const { data: existing } = await supabase
        .from("marie_subscriptions")
        .select("minutes_remaining, minutes_total")
        .eq("artisan_id", artisan_id)
        .single();
      if (existing) {
        await supabase.from("marie_subscriptions")
          .update({
            minutes_remaining: (existing.minutes_remaining ?? 0) + minutesToAdd,
            minutes_total: (existing.minutes_total ?? 0) + minutesToAdd,
            updated_at: new Date().toISOString(),
          })
          .eq("artisan_id", artisan_id);
      } else {
        await supabase.from("marie_subscriptions").upsert({
          artisan_id, plan: "payg", status: "active",
          minutes_remaining: minutesToAdd, minutes_total: minutesToAdd,
          updated_at: new Date().toISOString(),
        }, { onConflict: "artisan_id" });
      }
      console.log(`Topup ${pkg} — +${minutesToAdd} min pour ${artisan_id}`);
    }
  }

  if (event.type === "customer.subscription.deleted" || event.type === "customer.subscription.paused") {
    const subscription = event.data.object as Stripe.Subscription;
    await supabase.from("marie_subscriptions")
      .update({ status: "inactive", updated_at: new Date().toISOString() })
      .eq("stripe_subscription_id", subscription.id);
  }

  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;
    const { data: sub } = await supabase
      .from("marie_subscriptions")
      .select("plan, artisan_id")
      .eq("stripe_customer_id", customerId)
      .single();
    if (sub && sub.plan !== "payg") {
      const planMinutes = PLAN_MINUTES[sub.plan] ?? 0;
      await supabase.from("marie_subscriptions")
        .update({ minutes_remaining: planMinutes, minutes_total: planMinutes, status: "active", updated_at: new Date().toISOString() })
        .eq("artisan_id", sub.artisan_id);
      console.log(`Renouvellement ${sub.plan} — ${planMinutes} min pour ${sub.artisan_id}`);
    }
  }

  return NextResponse.json({ ok: true });
}