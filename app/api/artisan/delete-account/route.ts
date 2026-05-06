import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export const runtime = "nodejs"

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 })

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Fshi subscription Twilio nëse ekziston
    try {
      const { data: sub } = await admin
        .from("marie_subscriptions")
        .select("twilio_number_sid, stripe_subscription_id")
        .eq("artisan_id", user.id)
        .single()

      if (sub?.twilio_number_sid) {
        const Twilio = (await import("twilio")).default
        const client = Twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
        await client.incomingPhoneNumbers(sub.twilio_number_sid).remove()
      }
    } catch (_) { /* ignore */ }

    // Fshi të dhënat nga Supabase
    await admin.from("marie_subscriptions").delete().eq("artisan_id", user.id)
    await admin.from("project_unlocks").delete().eq("artisan_id", user.id)
    await admin.from("contacts").delete().eq("artisan_id", user.id)

    // Fshi user-in
    await admin.auth.admin.deleteUser(user.id)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("delete-account error:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}