import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServiceClient } from "@/lib/supabaseServer";
import { ensureConversationForUnlock } from "@/lib/chat";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json(
      { ok: false, error: "Configuration Stripe webhook manquante." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecret);
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ ok: false, error: "Signature Stripe manquante." }, { status: 400 });
  }

  try {
    const rawBody = await req.text();
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const projectId = String(session.metadata?.project_id ?? "").trim();
      const artisanId = String(session.metadata?.artisan_id ?? "").trim();
      const clientId = String(session.metadata?.client_id ?? "").trim();

      if (projectId && artisanId && clientId) {
        const supabase = createSupabaseServiceClient();

        const payload = {
          project_id: projectId,
          artisan_id: artisanId,
          client_id: clientId,
          status: "paid",
          stripe_session_id: session.id,
          stripe_payment_intent_id:
            typeof session.payment_intent === "string" ? session.payment_intent : null,
        };

        const { error: unlockErr } = await supabase.from("project_unlocks").upsert(payload, {
          onConflict: "project_id,artisan_id",
        });

        if (unlockErr) {
          console.error("[stripe/webhook] unlock upsert error:", unlockErr);
          return NextResponse.json({ ok: false, error: unlockErr.message }, { status: 500 });
        }

        try {
          await ensureConversationForUnlock({
            supabase,
            projectId,
            artisanId,
            clientId,
          });
        } catch (convErr) {
          console.error("[stripe/webhook] conversation upsert error:", convErr);
          return NextResponse.json({ ok: false, error: "Conversation creation failed." }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("[stripe/webhook] verification crash:", e);
    return NextResponse.json({ ok: false, error: "Webhook invalide." }, { status: 400 });
  }
}
