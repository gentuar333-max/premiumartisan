import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export const runtime = "nodejs"

function getAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(req: Request) {
  try {
    // Metoda 1: nga cookies (SSR)
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Metoda 2: nga Authorization header nëse cookies nuk funksionojnë
    let userId = user?.id
    if (!userId) {
      const authHeader = req.headers.get("authorization")
      if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.slice(7)
        const admin = getAdmin()
        const { data } = await admin.auth.getUser(token)
        userId = data.user?.id
      }
    }

    if (!userId) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    const admin = getAdmin()
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