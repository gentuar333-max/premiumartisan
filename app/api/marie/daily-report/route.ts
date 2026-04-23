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
  // Sécurité — vérifie le header Vercel Cron
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();

  // Récupère tous les artisans avec un numéro de téléphone
  const { data: artisans } = await supabase
    .from("artisan_settings")
    .select("artisan_id, artisan_name, phone")
    .not("phone", "is", null);

  if (!artisans?.length) return NextResponse.json({ ok: true, sent: 0 });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  let sent = 0;

  for (const artisan of artisans) {
    if (!artisan.phone || !artisan.artisan_id) continue;

    // Appels du jour — uniquement clients inconnus (pas famille/employé)
    const { data: calls } = await supabase
      .from("calls")
      .select("nom_client, probleme, urgent, caller_phone, contact_type, duration")
      .eq("artisan_id", artisan.artisan_id)
      .in("contact_type", ["inconnu", "client"])
      .gte("created_at", todayISO)
      .order("created_at", { ascending: false });

    if (!calls?.length) continue; // Pas d'appels aujourd'hui → pas de SMS

    const urgents = calls.filter(c => c.urgent)
    const normaux = calls.filter(c => !c.urgent)

    const lines: string[] = [
      `Résumé du jour — ${calls.length} appel${calls.length > 1 ? "s" : ""}`,
      "",
    ]

    // Urgents en premier
    if (urgents.length > 0) {
      urgents.slice(0, 3).forEach(c => {
        lines.push(`🔴 ${c.nom_client ?? "Client"} — ${c.probleme ?? "-"}`)
      })
    }

    // Normaux
    normaux.slice(0, 3).forEach(c => {
      lines.push(`• ${c.nom_client ?? "Client"} — ${c.probleme ?? "-"}`)
    })

    if (calls.length > 6) {
      lines.push(`+ ${calls.length - 6} autre${calls.length - 6 > 1 ? "s" : ""}`)
    }

    lines.push("")
    lines.push("premiumartisan.fr/artisan/receptionist")

    const message = lines.join("\n")

    try {
      await sendSMS(artisan.phone, message)
      sent++
      console.log(`Daily report sent to ${artisan.artisan_name} (${artisan.phone})`)
    } catch (err) {
      console.error(`Failed to send to ${artisan.artisan_name}:`, err)
    }
  }

  return NextResponse.json({ ok: true, sent })
}