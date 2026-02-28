import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";
import { ensureConversationForUnlock } from "@/lib/chat";
import { ENFORCE_UNLOCK } from "@/lib/featureFlags";

export const runtime = "nodejs";

const DEFAULT_UNLOCK_PRICE_CENTS = 1900;

export async function POST(req: Request) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const priceEnv = process.env.STRIPE_UNLOCK_PRICE_CENTS;

    if (!stripeSecret || !siteUrl) {
      return NextResponse.json(
        { ok: false, error: "Configuration Stripe manquante (STRIPE_SECRET_KEY / NEXT_PUBLIC_SITE_URL)." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);
    const projectId = String(body?.projectId ?? body?.id ?? "").trim();

    if (!projectId || projectId === "undefined") {
      return NextResponse.json({ ok: false, error: "Projet invalide." }, { status: 400 });
    }

    const serverSupabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: userErr,
    } = await serverSupabase.auth.getUser();

    if (userErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const serviceSupabase = createSupabaseServiceClient();

    // DEV BYPASS: skip Stripe, return phone + conversationId directly
    if (!ENFORCE_UNLOCK) {
      const { data: project } = await serviceSupabase
        .from("publier_projets")
        .select("id, client_id, phone")
        .eq("id", projectId)
        .maybeSingle();
      if (!project?.client_id) {
        return NextResponse.json({ ok: false, error: "Projet introuvable." }, { status: 404 });
      }
      let convId: string | null = null;
      try {
        convId = await ensureConversationForUnlock({
          supabase: serviceSupabase,
          projectId,
          artisanId: user.id,
          clientId: project.client_id,
        });
      } catch {
        const { data: c } = await serviceSupabase
          .from("conversations")
          .select("id")
          .eq("project_id", projectId)
          .eq("artisan_id", user.id)
          .maybeSingle();
        convId = c?.id ?? null;
      }
      return NextResponse.json({
        ok: true,
        alreadyPaid: true,
        unlocked: true,
        conversationId: convId,
        phone: (project as { phone?: string | null })?.phone ?? null,
      });
    }

    const [projectResult, unlockResult] = await Promise.all([
      serviceSupabase
        .from("publier_projets")
        .select("id, client_id")
        .eq("id", projectId)
        .maybeSingle(),
      serviceSupabase
        .from("project_unlocks")
        .select("status")
        .eq("project_id", projectId)
        .eq("artisan_id", user.id)
        .maybeSingle(),
    ]);

    const { data: project, error: projectErr } = projectResult;
    const { data: unlockExisting, error: unlockErr } = unlockResult;

    if (projectErr || !project) {
      return NextResponse.json({ ok: false, error: "Projet introuvable." }, { status: 404 });
    }

    if (!project.client_id) {
      return NextResponse.json({ ok: false, error: "Client non identifié pour ce projet." }, { status: 400 });
    }

    if (unlockErr) {
      return NextResponse.json({ ok: false, error: unlockErr.message }, { status: 500 });
    }

    if (unlockExisting?.status === "paid") {
      let existingConversationId: string | null = null;
      try {
        existingConversationId = await ensureConversationForUnlock({
          supabase: serviceSupabase,
          projectId,
          artisanId: user.id,
          clientId: project.client_id,
        });
      } catch {
        const { data: existingConv } = await serviceSupabase
          .from("conversations")
          .select("id")
          .eq("project_id", projectId)
          .eq("artisan_id", user.id)
          .maybeSingle();
        existingConversationId = existingConv?.id ?? null;
      }

      const { data: phoneValue } = await serverSupabase.rpc("get_client_phone", {
        p_project_id: projectId,
      });

      return NextResponse.json({
        ok: true,
        alreadyPaid: true,
        unlocked: true,
        conversationId: existingConversationId,
        phone: (phoneValue as string | null) ?? null,
      }, { status: 200 });
    }

    const stripe = new Stripe(stripeSecret);
    const amount = Number.isFinite(Number(priceEnv)) ? Number(priceEnv) : DEFAULT_UNLOCK_PRICE_CENTS;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${siteUrl}/artisan/messages/unlock-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/artisan/dashboard?unlock=cancel`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: amount,
            product_data: {
              name: "Déblocage contact projet",
              description: `Projet ${projectId}`,
            },
          },
        },
      ],
      metadata: {
        project_id: projectId,
        artisan_id: user.id,
        client_id: project.client_id,
      },
    });

    const payload = {
      project_id: projectId,
      artisan_id: user.id,
      client_id: project.client_id,
      status: "pending",
      stripe_session_id: session.id,
      amount_cents: amount,
    };

    const { error: upsertErr } = await serviceSupabase.from("project_unlocks").upsert(payload, {
      onConflict: "project_id,artisan_id",
    });

    if (upsertErr) {
      return NextResponse.json({ ok: false, error: upsertErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, checkoutUrl: session.url }, { status: 200 });
  } catch (e) {
    console.error("[api/unlock/create-checkout] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}
