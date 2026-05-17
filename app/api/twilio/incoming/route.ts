import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

// Twilio dërgon POST me form data
export async function GET(req: Request) {
  return POST(req)
}

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)
    const toNumber   = params.get("To")   ?? ""
    const fromNumber = params.get("From") ?? ""

    console.log("[twilio/incoming] To:", toNumber, "From:", fromNumber)

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Gjej artizanin nga numri Twilio
    const { data: sub } = await admin
      .from("marie_subscriptions")
      .select("artisan_id, twilio_number, minutes_remaining")
      .eq("twilio_number", toNumber)
      .maybeSingle()

    console.log("[twilio/incoming] sub found:", JSON.stringify(sub))
    if (!sub) {
      console.error("[twilio/incoming] No artisan found for number:", toNumber)
      return vapiTwiml()
    }

    // Stop nëse zero minuta
    if ((sub.minutes_remaining ?? 0) <= 0) {
      const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Say language="fr-FR">Bonjour, notre service de réception est temporairement indisponible. Veuillez rappeler directement l'artisan. Au revoir.</Say></Response>`
      return new Response(twiml, { headers: { "Content-Type": "text/xml" } })
    }

    // Gjej vapi_assistant_id per kete artisan
    const { data: settings } = await admin
      .from("artisan_settings")
      .select("vapi_assistant_id")
      .eq("artisan_id", sub.artisan_id)
      .maybeSingle()

    const vapiAssistantId = settings?.vapi_assistant_id ?? process.env.VAPI_ASSISTANT_ID ?? ""
    console.log("[twilio/incoming] routing to Vapi:", vapiAssistantId)

    return vapiTwiml(vapiAssistantId)

  } catch (err) {
    console.error("[twilio/incoming] error:", err)
    return vapiTwiml()
  }
}

function vapiTwiml(assistantId?: string) {
  const vapiAssistantId = assistantId ?? process.env.VAPI_ASSISTANT_ID ?? ""
  const vapiApiKey = process.env.VAPI_PRIVATE_KEY ?? ""
  
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="wss://api.vapi.ai/twilio">
      <Parameter name="assistantId" value="${vapiAssistantId}" />
      <Parameter name="authorization" value="${vapiApiKey}" />
    </Stream>
  </Connect>
</Response>`

  return new NextResponse(twiml, {
    headers: { "Content-Type": "text/xml" },
  })
}