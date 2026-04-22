import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const PLANS: Record<string, { priceId: string; label: string; trial: boolean }> = {
  starter:     { priceId: "price_1TOlQ0RvU0ykaxxi08GFjWa2", label: "Marie Starter — 99€/mois",    trial: false },
  pro:         { priceId: "price_1TOlXARvU0ykaxxi14hmLf7q", label: "Marie Pro — 199€/mois",        trial: false },
  business:    { priceId: "price_1TOlYFRvU0ykaxxiWUWbitGO", label: "Marie Business — 349€/mois",   trial: false },
  payasyougo:  { priceId: "price_1TOlgcRvU0ykaxxidcQKgGIi", label: "Marie Pay as you go — 0.75€/min", trial: false },
};

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
  );
}

export async function POST(req: Request) {
  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const { plan } = await req.json();

    // Trial — pas Stripe, active direkt
    if (plan === "trial") {
      await supabase.from("marie_subscriptions").upsert({
        artisan_id: user.id,
        plan: "trial",
        status: "active",
        trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: "artisan_id" });

      return NextResponse.json({ ok: true, redirect: "/artisan/receptionist" });
    }

    const planConfig = PLANS[plan];
    if (!planConfig) return NextResponse.json({ error: "Plan invalide" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      metadata: {
        artisan_id: user.id,
        plan,
      },
      success_url: `${APP_URL}/artisan/receptionist?subscription=success&plan=${plan}`,
      cancel_url:  `${APP_URL}/artisan/receptionist/setup?subscription=cancel`,
    });

    return NextResponse.json({ ok: true, checkoutUrl: session.url });
  } catch (err) {
    console.error("Marie checkout error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}