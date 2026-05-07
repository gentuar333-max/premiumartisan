 
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const artisanId = url.searchParams.get("id")

    if (!artisanId) {
      return NextResponse.json({ subscription: null })
    }

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: subscription } = await admin
      .from("marie_subscriptions")
      .select("plan, status, minutes_remaining, minutes_total, trial_ends_at, current_period_end, twilio_number")
      .eq("artisan_id", artisanId)
      .single()

    return NextResponse.json({ subscription: subscription ?? null })
  } catch (err) {
    console.error("subscription-public error:", err)
    return NextResponse.json({ subscription: null })
  }
}