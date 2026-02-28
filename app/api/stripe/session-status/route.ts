import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";
import { ensureConversationForUnlock } from "@/lib/chat";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      return NextResponse.json({ ok: false, error: "Configuration Stripe manquante." }, { status: 500 });
    }

    const url = new URL(req.url);
    const sessionId = String(url.searchParams.get("session_id") ?? "").trim();
    if (!sessionId) {
      return NextResponse.json({ ok: false, error: "session_id manquant." }, { status: 400 });
    }

    const serverSupabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authErr,
    } = await serverSupabase.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const stripe = new Stripe(stripeSecret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ ok: false, error: "Paiement non confirmé." }, { status: 400 });
    }

    const projectId = String(session.metadata?.project_id ?? "").trim();
    const artisanId = String(session.metadata?.artisan_id ?? "").trim();
    const clientId = String(session.metadata?.client_id ?? "").trim();

    if (!projectId || !artisanId || !clientId || artisanId !== user.id) {
      return NextResponse.json({ ok: false, error: "Métadonnées de session invalides." }, { status: 400 });
    }

    const supabase = createSupabaseServiceClient();

    const { error: unlockErr } = await supabase.from("project_unlocks").upsert(
      {
        project_id: projectId,
        artisan_id: artisanId,
        client_id: clientId,
        status: "paid",
        stripe_session_id: session.id,
        stripe_payment_intent_id:
          typeof session.payment_intent === "string" ? session.payment_intent : null,
      },
      { onConflict: "project_id,artisan_id" }
    );

    if (unlockErr) {
      return NextResponse.json({ ok: false, error: unlockErr.message }, { status: 500 });
    }

    const conversationId = await ensureConversationForUnlock({
      supabase,
      projectId,
      artisanId,
      clientId,
    });

    return NextResponse.json({ ok: true, conversationId }, { status: 200 });
  } catch (e) {
    console.error("[api/stripe/session-status] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}
