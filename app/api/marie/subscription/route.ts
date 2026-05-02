import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export const runtime = "nodejs"

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )
}

export async function GET() {
  try {
    const supabase = await getSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 })

    const { data: subscription } = await supabase
      .from("marie_subscriptions")
      .select("plan, status, minutes_remaining, minutes_total, trial_ends_at, current_period_end")
      .eq("artisan_id", user.id)
      .single()

    return NextResponse.json({ subscription: subscription ?? null })
  } catch (err) {
    console.error("marie/subscription GET error:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}