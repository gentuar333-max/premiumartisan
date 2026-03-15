// app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServiceClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature") ?? "";
  console.log("[webhook] request received");
  console.log("[webhook] signature exists:", !!sig);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("[webhook] event type:", event.type);
  } catch (err) {
    console.error("[webhook] signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("[webhook] metadata:", session.metadata);
    const { project_id, artisan_id, exclusive } = session.metadata ?? {};

    if (!project_id || !artisan_id) {
      console.error("[webhook] missing metadata:", session.metadata);
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const isExclusive = exclusive === "true";
    const svc = createSupabaseServiceClient();

    if (isExclusive) {
      const { count } = await svc
        .from("project_unlocks")
        .select("id", { count: "exact", head: true })
        .eq("project_id", project_id)
        .eq("status", "paid")
        .neq("artisan_id", artisan_id);

      if ((count ?? 0) > 0) {
        console.warn(`[webhook] exclusive race condition on project ${project_id}`);
        if (session.payment_intent) {
          try {
            await stripe.refunds.create({
              payment_intent: String(session.payment_intent),
              reason: "duplicate",
            });
          } catch (refundErr) {
            console.error("[webhook] refund error:", refundErr);
          }
        }
        return NextResponse.json({ ok: true, warning: "race_condition_refunded" });
      }
    }

    const { error } = await svc
      .from("project_unlocks")
      .upsert({
        project_id,
        artisan_id,
        status: "paid",
        exclusive: isExclusive,
        locked_at: isExclusive ? new Date().toISOString() : null,
      }, { onConflict: "project_id,artisan_id" });

    if (error) {
      console.error("[webhook] DB error (trigger blocked?):", error.message);
      if (session.payment_intent) {
        try {
          await stripe.refunds.create({ payment_intent: String(session.payment_intent) });
        } catch (refundErr) {
          console.error("[webhook] refund error:", refundErr);
        }
      }
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    console.log(`[webhook] ✅ unlock confirmed: project=${project_id} artisan=${artisan_id} exclusive=${isExclusive}`);

    if (isExclusive) {
      await svc
        .from("project_unlocks")
        .update({ status: "cancelled" })
        .eq("project_id", project_id)
        .eq("status", "pending")
        .neq("artisan_id", artisan_id);
      console.log(`[webhook] ✅ cancelled pending unlocks for other artisans (exclusive lock)`);
    }
  }

  return NextResponse.json({ ok: true });
}