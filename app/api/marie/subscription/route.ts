import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(req: Request) {
  try {
    const admin = getAdmin()

    // Merr token nga Authorization header
    const authHeader = req.headers.get("authorization") ?? ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    let userId: string | null = null

    if (token) {
      const { data } = await admin.auth.getUser(token)
      userId = data.user?.id ?? null
    }

    if (!userId) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const { data: subscription } = await admin
      .from("marie_subscriptions")
      .select("plan, status, minutes_remaining, minutes_total, trial_ends_at, current_period_end, twilio_number")
      .eq("artisan_id", userId)
      .single()

    return NextResponse.json({ subscription: subscription ?? null })
  } catch (err) {
    console.error("marie/subscription GET error:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}