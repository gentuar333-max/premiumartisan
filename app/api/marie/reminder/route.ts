import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function sendSMS(to: string, message: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SMS_SENDER ?? "PremiumArt";
  if (!apiKey || !to) return;

  let phone = to.replace(/\s/g, "").replace(/^0/, "+33");
  if (!phone.startsWith("+")) phone = `+33${phone}`;

  await fetch("https://api.brevo.com/v3/transactionalSMS/sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender,
      recipient: phone,
      content: message,
      type: "transactional",
    }),
  });
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();

  // Récupère tous les abonnements actifs (pas trial, pas payg)
  const { data: subs } = await supabase
    .from("marie_subscriptions")
    .select("artisan_id, plan, status, updated_at")
    .eq("status", "active")
    .not("plan", "in", '("trial","payg")');

  if (!subs?.length) return NextResponse.json({ ok: true, sent: 0 });

  const now = new Date();
  let sent = 0;

  for (const sub of subs) {
    // Date renouvellement = updated_at + 30 jours
    const renewDate = new Date(sub.updated_at);
    renewDate.setDate(renewDate.getDate() + 30);

    const daysLeft = Math.ceil((renewDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // Envoie SMS uniquement à J-5 et J-1
    if (daysLeft !== 5 && daysLeft !== 1) continue;

    // Téléphone de l'artisan
    const { data: settings } = await supabase
      .from("artisan_settings")
      .select("phone, artisan_name")
      .eq("artisan_id", sub.artisan_id)
      .single();

    if (!settings?.phone) continue;

    const planLabel = sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1);

    const message = daysLeft === 5
      ? `Marie — votre abonnement ${planLabel} expire dans 5 jours. Renouvelez pour continuer à recevoir vos appels.\npremiumartisan.fr/artisan/receptionist/pricing`
      : `⚠️ Marie s'arrête demain. Renouvelez maintenant pour ne pas manquer vos appels.\npremiumartisan.fr/artisan/receptionist/pricing`;

    try {
      await sendSMS(settings.phone, message);
      sent++;
      console.log(`Reminder J-${daysLeft} sent to ${settings.artisan_name}`);
    } catch (err) {
      console.error(`Failed reminder for ${settings.artisan_name}:`, err);
    }
  }

  return NextResponse.json({ ok: true, sent });
}