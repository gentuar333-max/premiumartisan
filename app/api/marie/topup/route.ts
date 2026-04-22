import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// Paketa minutash — one-time payment
export const TOPUP_PACKAGES: Record<string, { minutes: number; amount: number; label: string }> = {
  mini:     { minutes: 30,  amount: 1900, label: "Mini — 30 min"      }, // 19€
  standard: { minutes: 80,  amount: 4500, label: "Standard — 80 min"  }, // 45€
  maxi:     { minutes: 200, amount: 9900, label: "Maxi — 200 min"     }, // 99€
}

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

    const { package: pkg } = await req.json();
    const topup = TOPUP_PACKAGES[pkg];
    if (!topup) return NextResponse.json({ error: "Package invalide" }, { status: 400 });

    // Crée la ligne dans marie_topups
    const { data: topupRow } = await supabase
      .from("marie_topups")
      .insert({
        artisan_id: user.id,
        package: pkg,
        minutes: topup.minutes,
        amount_eur: topup.amount / 100,
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
          unit_amount: topup.amount,
          product_data: {
            name: topup.label,
            description: `${topup.minutes} minutes pour votre réceptionniste IA`,
          },
        },
        quantity: 1,
      }],
      metadata: {
        artisan_id: user.id,
        package: pkg,
        minutes: String(topup.minutes),
        topup_id: topupRow?.id ?? "",
      },
      success_url: `${APP_URL}/artisan/receptionist?topup=success&minutes=${topup.minutes}`,
      cancel_url:  `${APP_URL}/artisan/receptionist/pricing?topup=cancel`,
    });

    return NextResponse.json({ ok: true, checkoutUrl: session.url });
  } catch (err) {
    console.error("Topup checkout error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}