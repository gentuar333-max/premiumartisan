import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

export async function GET(req: Request) { return POST(req) }

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)
    const toNumber = params.get("To") ?? params.get("Called") ?? ""

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: sub } = await admin
      .from("marie_subscriptions")
      .select("artisan_id, twilio_number, minutes_remaining")
      .eq("twilio_number", toNumber)
      .maybeSingle()

    console.log("[twilio/incoming] sub:", JSON.stringify(sub))

    // Stop nëse nuk gjejmë artizanin
    if (!sub) {
      console.error("[twilio/incoming] No artisan for number:", toNumber)
      return retellTwiml()
    }

    // Stop nëse zero minuta
    if ((sub.minutes_remaining ?? 0) <= 0) {
      const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Say language="fr-FR">Bonjour, notre service de réception est temporairement indisponible. Veuillez rappeler directement l'artisan. Au revoir.</Say></Response>`
      return new NextResponse(twiml, { headers: { "Content-Type": "text/xml" } })
    }

    // Gjej agent_id Retell
    const { data: settings } = await admin
      .from("artisan_settings")
      .select("vapi_assistant_id")
      .eq("artisan_id", sub.artisan_id)
      .maybeSingle()

    const agentId = settings?.vapi_assistant_id ?? process.env.RETELL_DEFAULT_AGENT_ID ?? ""
    console.log("[twilio/incoming] routing to Retell agent:", agentId)

    return retellTwiml(agentId)
  } catch (err) {
    console.error("[twilio/incoming] error:", err)
    return retellTwiml()
  }
}

function retellTwiml(agentId?: string) {
  // Retell Twilio SIP format
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Sip>sip:${agentId ?? ""}@5t4n6j0wnrl.sip.livekit.cloud</Sip>
  </Dial>
</Response>`
  return new NextResponse(twiml, { headers: { "Content-Type": "text/xml" } })
}