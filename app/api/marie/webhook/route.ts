import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

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
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Marie webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = getSupabase();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { artisan_id, plan } = session.metadata ?? {};

    if (!artisan_id || !plan) return NextResponse.json({ ok: true });

    await supabase.from("marie_subscriptions").upsert({
      artisan_id,
      plan,
      status: "active",
      stripe_subscription_id: session.subscription as string ?? null,
      stripe_customer_id: session.customer as string ?? null,
      updated_at: new Date().toISOString(),
    }, { onConflict: "artisan_id" });

    console.log(`Marie subscription activated: ${plan} for ${artisan_id}`);
  }

  if (event.type === "customer.subscription.deleted" || event.type === "customer.subscription.paused") {
    const subscription = event.data.object as Stripe.Subscription;

    await supabase.from("marie_subscriptions")
      .update({ status: "inactive", updated_at: new Date().toISOString() })
      .eq("stripe_subscription_id", subscription.id);

    console.log(`Marie subscription deactivated: ${subscription.id}`);
  }

  return NextResponse.json({ ok: true });
}