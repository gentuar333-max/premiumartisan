import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { event, call } = body

    console.log("[retell/webhook] event:", event, "call_id:", call?.call_id)
    console.log("[retell/webhook] full body:", JSON.stringify(body).slice(0, 500))

    if (event !== "call_analyzed") {
      return NextResponse.json({ ok: true })
    }

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const agentId = call?.agent_id ?? ""
    const { data: settings } = await admin
      .from("artisan_settings")
      .select("artisan_id, artisan_name, company_name")
      .eq("vapi_assistant_id", agentId)
      .maybeSingle()

    if (!settings) {
      console.error("[retell/webhook] No artisan for agent:", agentId)
      return NextResponse.json({ ok: true })
    }

    const artisanId = settings.artisan_id
    const durationSeconds = Math.round(call?.duration_ms ? call.duration_ms / 1000 : 0)
    const durationMinutes = Math.ceil(durationSeconds / 60)

    // Zbrit minutat
    if (durationMinutes > 0) {
      const { data: sub } = await admin
        .from("marie_subscriptions")
        .select("minutes_remaining")
        .eq("artisan_id", artisanId)
        .maybeSingle()

      const current = sub?.minutes_remaining ?? 0
      const newVal = Math.max(0, current - durationMinutes)

      await admin
        .from("marie_subscriptions")
        .update({ minutes_remaining: newVal, updated_at: new Date().toISOString() })
        .eq("artisan_id", artisanId)

      console.log("[retell/webhook] minutes:", current, "->", newVal)
    }

    // Structured data
    const analysis = call?.call_analysis?.custom_analysis_data ?? {}
    const transcript = call?.transcript ?? ""
    const callerPhone = call?.from_number ?? null

    await admin.from("marie_calls").insert({
      artisan_id:   artisanId,
      caller_phone: callerPhone,
      duration:     durationSeconds,
      transcript,
      nom_client:    analysis.nom_client    ?? null,
      adresse:       analysis.adresse       ?? null,
      probleme:      analysis.probleme      ?? null,
      urgent:        analysis.urgent        ?? false,
      disponibilite: analysis.disponibilite ?? null,
      call_id:       call?.call_id          ?? null,
      created_at:    new Date().toISOString(),
    })

    console.log("[retell/webhook] saved call:", call?.call_id, durationSeconds, "s")
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[retell/webhook] error:", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}