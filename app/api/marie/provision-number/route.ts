import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import Twilio from "twilio"

export const runtime = "nodejs"

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!
const TWILIO_AUTH_TOKEN  = process.env.TWILIO_AUTH_TOKEN!

// Bundle SID aprovuar per France Business
const FRANCE_BUNDLE_SID  = process.env.TWILIO_FRANCE_BUNDLE_SID ?? ""
const FRANCE_ADDRESS_SID = process.env.TWILIO_FRANCE_ADDRESS_SID ?? ""

// Vapi API per konfigurim numerit
const VAPI_API_KEY       = process.env.VAPI_PRIVATE_KEY!
const VAPI_ASSISTANT_ID  = process.env.VAPI_ASSISTANT_ID!

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: Request) {
  try {
    const { artisan_id } = await req.json()
    if (!artisan_id) {
      return NextResponse.json({ error: "artisan_id manque" }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    const client   = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    // 1. Kontrollo nëse artizani ka tashmë numër
    const { data: existing } = await supabase
      .from("marie_subscriptions")
      .select("twilio_number, twilio_number_sid")
      .eq("artisan_id", artisan_id)
      .single()

    if (existing?.twilio_number) {
      return NextResponse.json({ ok: true, number: existing.twilio_number, already: true })
    }

    // 2. Kërko numër francez disponibël
    const available = await client.availablePhoneNumbers("FR")
      .local
      .list({ voiceEnabled: true, smsEnabled: true, limit: 5 })

    if (!available.length) {
      return NextResponse.json({ error: "Aucun numéro FR disponible" }, { status: 503 })
    }

    const chosenNumber = available[0].phoneNumber

    // 3. Bëj blerjen e numrit
    const purchaseParams: any = {
      phoneNumber: chosenNumber,
      voiceUrl: "https://api.vapi.ai/twilio",
      voiceMethod: "POST",
      smsUrl: "https://api.vapi.ai/twilio",
      smsMethod: "POST",
      friendlyName: `Marie — Artisan ${artisan_id.slice(0, 8)}`,
    }

    // Shto Bundle dhe Address nëse ekzistojnë (France regulatory)
    if (FRANCE_BUNDLE_SID)  purchaseParams.bundleSid  = FRANCE_BUNDLE_SID
    if (FRANCE_ADDRESS_SID) purchaseParams.addressSid = FRANCE_ADDRESS_SID

    const purchased = await client.incomingPhoneNumbers.create(purchaseParams)

    console.log(`[provision] Numër blerë: ${purchased.phoneNumber} për ${artisan_id}`)

    // 4. Regjistro numrin në Vapi
    let vapiPhoneNumberId: string | null = null
    try {
      const vapiRes = await fetch("https://api.vapi.ai/phone-number", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${VAPI_API_KEY}`,
        },
        body: JSON.stringify({
          provider: "twilio",
          number: purchased.phoneNumber,
          twilioAccountSid: TWILIO_ACCOUNT_SID,
          twilioAuthToken: TWILIO_AUTH_TOKEN,
          assistantId: VAPI_ASSISTANT_ID,
          name: `Marie Artisan ${artisan_id.slice(0, 8)}`,
        }),
      })
      const vapiData = await vapiRes.json()
      vapiPhoneNumberId = vapiData.id ?? null
      console.log(`[provision] Vapi phone registered: ${vapiPhoneNumberId}`)
    } catch (vapiErr) {
      console.error("[provision] Vapi registration error:", vapiErr)
      // Non-bloquant — numri ekziston por Vapi do riprovohet
    }

    // 5. Ruaj në Supabase
    await supabase
      .from("marie_subscriptions")
      .update({
        twilio_number:      purchased.phoneNumber,
        twilio_number_sid:  purchased.sid,
        vapi_phone_number_id: vapiPhoneNumberId,
        updated_at: new Date().toISOString(),
      })
      .eq("artisan_id", artisan_id)

    // 6. Dërgo SMS konfirmim artizanit
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("phone")
        .eq("id", artisan_id)
        .single()

      if (profile?.phone) {
        await client.messages.create({
          from: purchased.phoneNumber,
          to: profile.phone,
          body: `Bonjour ! Votre réceptionniste IA Marie est activée. Votre numéro professionnel : ${purchased.phoneNumber}. Vos clients peuvent appeler ce numéro 24h/24.`,
        })
        console.log(`[provision] SMS envoyé à ${profile.phone}`)
      }
    } catch (smsErr) {
      console.error("[provision] SMS error:", smsErr)
    }

    return NextResponse.json({
      ok: true,
      number: purchased.phoneNumber,
      sid: purchased.sid,
      vapiPhoneNumberId,
    })

  } catch (err: any) {
    console.error("[provision] Error:", err?.message ?? err)
    return NextResponse.json({ error: err?.message ?? "Erreur serveur" }, { status: 500 })
  }
}