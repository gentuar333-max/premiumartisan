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
      .select("artisan_id, twilio_number")
      .eq("twilio_number", toNumber)
      .maybeSingle()

    if (!sub) {
      console.error("[twilio/incoming] No artisan found for number:", toNumber)
      // Dërgo direkt te Vapi nëse nuk gjejmë artizanin
      return vapiTwiml()
    }

    // Gjej numrin personal të artizanit
    const { data: settings } = await admin
      .from("artisan_settings")
      .select("phone, vapi_assistant_id, company_name")
      .eq("artisan_id", sub.artisan_id)
      .maybeSingle()

    // Normalize phone: remove spaces, ensure +33 format
    let artisanPhone = (settings?.phone ?? "").replace(/\s/g, "")
    if (artisanPhone.startsWith("0")) artisanPhone = "+33" + artisanPhone.slice(1)
    const vapiAssistantId = settings?.vapi_assistant_id ?? process.env.VAPI_ASSISTANT_ID ?? ""

    console.log("[twilio/incoming] artisan phone:", artisanPhone, "vapi:", vapiAssistantId)

    if (!artisanPhone) {
      return vapiTwiml()
    }

    // Thirr artizanin - nëse nuk përgjigjet → Vapi
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.premiumartisan.fr"
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial timeout="5" action="${baseUrl}/api/twilio/fallback" method="POST">
    <Number>${artisanPhone}</Number>
  </Dial>
</Response>`

    console.log("[twilio/incoming] calling artisan:", artisanPhone)

    return new NextResponse(twiml, {
      headers: { "Content-Type": "text/xml" },
    })

  } catch (err) {
    console.error("[twilio/incoming] error:", err)
    return vapiTwiml()
  }
}

function vapiTwiml() {
  const vapiAssistantId = process.env.VAPI_ASSISTANT_ID ?? ""
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