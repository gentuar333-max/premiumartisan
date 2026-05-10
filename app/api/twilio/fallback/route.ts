import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

async function handler(req: Request) {
  try {
    const url = new URL(req.url)
    const params = url.searchParams
    
    const dialStatus = params.get("DialCallStatus") ?? ""
    const toNumber   = params.get("To") ?? params.get("Called") ?? ""

    console.log("[twilio/fallback] DialCallStatus:", dialStatus, "To:", toNumber)

    // Nëse artizani u përgjigj — mbylli
    if (dialStatus === "completed") {
      const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Hangup /></Response>`
      return new NextResponse(twiml, { headers: { "Content-Type": "text/xml" } })
    }

    // Artizani nuk u përgjigj — dërgo te Vapi
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: sub } = await admin
      .from("marie_subscriptions")
      .select("artisan_id")
      .eq("twilio_number", toNumber)
      .maybeSingle()

    let vapiAssistantId = process.env.VAPI_ASSISTANT_ID ?? ""

    if (sub?.artisan_id) {
      const { data: settings } = await admin
        .from("artisan_settings")
        .select("vapi_assistant_id")
        .eq("artisan_id", sub.artisan_id)
        .maybeSingle()
      if (settings?.vapi_assistant_id) vapiAssistantId = settings.vapi_assistant_id
    }

    const vapiApiKey = process.env.VAPI_PRIVATE_KEY ?? ""

    console.log("[twilio/fallback] routing to Vapi:", vapiAssistantId)

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Redirect method="POST">https://api.vapi.ai/twilio/inbound_call</Redirect>
</Response>`

    return new NextResponse(twiml, {
      headers: { "Content-Type": "text/xml" },
    })

  } catch (err) {
    console.error("[twilio/fallback] error:", err)
    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Hangup /></Response>`
    return new NextResponse(twiml, { headers: { "Content-Type": "text/xml" } })
  }
}

export async function GET(req: Request) { return handler(req) }
export async function POST(req: Request) { return handler(req) }