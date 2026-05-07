import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

export async function GET(req: Request) {
  try {
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Merr token nga Authorization header
    const authHeader = req.headers.get("authorization") ?? ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    console.log("[subscription] token exists:", !!token)

    if (!token) {
      return NextResponse.json({ error: "Non authentifie" }, { status: 401 })
    }

    const { data: { user }, error: authError } = await admin.auth.getUser(token)
    console.log("[subscription] user.id:", user?.id, "authError:", authError?.message)

    if (!user) {
      return NextResponse.json({ error: "Non authentifie" }, { status: 401 })
    }

    const { data: subscription, error: dbError } = await admin
      .from("marie_subscriptions")
      .select("plan, status, minutes_remaining, minutes_total, trial_ends_at, current_period_end, twilio_number")
      .eq("artisan_id", user.id)
      .maybeSingle()

    console.log("[subscription] result:", JSON.stringify(subscription), "dbError:", dbError?.message)

    return NextResponse.json({ subscription: subscription ?? null })
  } catch (err) {
    console.error("marie/subscription GET error:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}