import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("VAPI WEBHOOK TYPE:", body.message?.type);

    const msgType = body.message?.type;
    if (msgType !== "end-of-call-report" && msgType !== "call-ended") {
      return NextResponse.json({ ok: true });
    }

    const supabase = getSupabase();

    const call = body.message;

    const analysis =
      call.analysis?.structuredData ??
      call.structuredData ??
      null;

    const transcript =
      typeof call.transcript === "string"
        ? call.transcript
        : Array.isArray(call.transcript)
        ? call.transcript
            .map((t: { role: string; content?: string; message?: string }) =>
              `${t.role}: ${t.content ?? t.message ?? ""}`
            )
            .join("\n")
        : "";

    const duration = Math.round(call.durationSeconds ?? call.duration ?? 0);
    const callerPhone = call.customer?.number ?? call.phoneNumber ?? null;

    let artisanId: string | null = null;
    let artisanPhone: string | null = null;
    let artisanName: string | null = null;

    const { data: settings } = await supabase
      .from("artisan_settings")
      .select("artisan_id, artisan_name, phone")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();

    if (settings) {
      artisanId = settings.artisan_id ?? null;
      artisanPhone = settings.phone ?? null;
      artisanName = settings.artisan_name ?? null;
    }

    let contactType = "inconnu";
    let contactName: string | null = null;

    if (artisanId && callerPhone) {
      const { data: contact } = await supabase
        .from("contacts")
        .select("name, type")
        .eq("artisan_id", artisanId)
        .eq("phone", callerPhone)
        .single();

      if (contact) {
        contactType = contact.type ?? "client";
        contactName = contact.name ?? null;
      }
    }

    console.log("ARTISAN ID:", artisanId);
    console.log("CONTACT TYPE:", contactType);
    console.log("ANALYSIS:", JSON.stringify(analysis, null, 2));

    const insertData = {
      artisan_id: artisanId,
      caller_phone: callerPhone,
      nom_client: analysis?.nom_client ?? contactName ?? null,
      adresse: analysis?.adresse ?? null,
      probleme: analysis?.probleme ?? null,
      urgent: analysis?.urgent ?? false,
      disponibilite: analysis?.disponibilite ?? null,
      type_travaux: analysis?.type_travaux ?? null,
      transcript: transcript,
      duration: duration,
      status: "nouveau",
      isnew: true,
      contact_type: contactType,
      contact_name: contactName,
    };

    const { error } = await supabase.from("calls").insert(insertData);
    if (error) console.error("Supabase error:", error);

    if (artisanPhone) {
      const urgentTag = analysis?.urgent ? "URGENT - " : "";
      const nomClient = contactName ?? analysis?.nom_client ?? "Client inconnu";
      const probleme = analysis?.probleme ?? "-";
      const durMin = Math.floor(duration / 60);
      const durSec = String(duration % 60).padStart(2, "0");

      const smsMessage = [
        `${urgentTag}Nouveau appel - Marie`,
        ``,
        `Client: ${nomClient}`,
        `Tel: ${callerPhone ?? "-"}`,
        `Probleme: ${probleme}`,
        analysis?.disponibilite ? `Disponible: ${analysis.disponibilite}` : null,
        `Duree: ${durMin}:${durSec}`,
        ``,
        `premiumartisan.fr/artisan/receptionist`,
      ].filter(Boolean).join("\n");

      // SMS per thirrje individual eshte hequr - raporti vine ne fund te dites
      console.log("[webhook] SMS skipped - daily report active")
    }

    // Valido dhe korrigjo adresën me Nominatim (OpenStreetMap)
    if (structured?.adresse) {
      try {
        const query = encodeURIComponent(structured.adresse + ", France")
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=fr`, {
          headers: { "User-Agent": "PremiumArtisan/1.0 contact@premiumartisan.fr" }
        })
        const geoData = await geoRes.json()
        if (geoData?.[0]?.display_name) {
          structured.adresse = geoData[0].display_name.split(",").slice(0, 4).join(",").trim()
          console.log("[webhook] adresse corrigée:", structured.adresse)
        }
      } catch (_) { /* ignore si Nominatim fail */ }
    }

    // Zbrit minutat e harxhuara
    if (duration > 0 && artisanId) {
      const durMinutes = Math.ceil(duration / 60)
      const db = getSupabase()
      const { data: sub } = await db
        .from("marie_subscriptions")
        .select("minutes_remaining")
        .eq("artisan_id", artisanId)
        .maybeSingle()

      if (sub) {
        const newMinutes = Math.max(0, (sub.minutes_remaining ?? 0) - durMinutes)
        await db
          .from("marie_subscriptions")
          .update({ minutes_remaining: newMinutes, updated_at: new Date().toISOString() })
          .eq("artisan_id", artisanId)
        console.log(`[webhook] minutes: -${durMinutes} min, remaining: ${newMinutes}`)
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}