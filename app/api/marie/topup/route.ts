import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const PRICE_PER_MIN = 0.65 // €

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

    const { minutes } = await req.json();
    const mins = Math.min(300, Math.max(10, parseInt(minutes) || 30));
    const amountEur = parseFloat((mins * PRICE_PER_MIN).toFixed(2));
    const amountCents = Math.round(amountEur * 100);

    // Enregistre le topup
    const { data: topupRow } = await supabase
      .from("marie_topups")
      .insert({
        artisan_id: user.id,
        package: `payg_${mins}min`,
        minutes: mins,
        amount_eur: amountEur,
        status: "pending",
      })
      .select()
      .single();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "eur",
          unit_amount: amountCents,
          product_data: {
            name: `Réceptionniste IA — ${mins} minutes`,
            description: `${mins} minutes à ${PRICE_PER_MIN}€/min — valables 6 mois`,
          },
        },
        quantity: 1,
      }],
      metadata: {
        artisan_id: user.id,
        package: `payg_${mins}min`,
        minutes: String(mins),
        topup_id: topupRow?.id ?? "",
      },
      success_url: `${APP_URL}/artisan/receptionist?topup=success&minutes=${mins}`,
      cancel_url:  `${APP_URL}/artisan/receptionist/pricing?topup=cancel`,
    });

    return NextResponse.json({ ok: true, checkoutUrl: session.url });
  } catch (err) {
    console.error("Topup error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}