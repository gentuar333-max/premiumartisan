"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import VoiceDashboard from "@/components/voice/VoiceDashboard"
import { createBrowserClient } from "@supabase/ssr"

export default function ReceptionistPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [artisanId, setArtisanId] = useState<string | null>(null)
  const checked = useRef(false)

  useEffect(() => {
    if (checked.current) return
    checked.current = true

    const sb = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    fetch("/api/artisan/vapi/setup")
      .then(r => r.json())
      .then(async json => {
        if (json.error === "Non authentifié" || json.status === 401) {
          router.replace("/artisan/login?redirect=/artisan/receptionist")
          return
        }
        if (!json.settings) {
          router.replace("/artisan/receptionist/setup")
          return
        }
        // Recupere artisan ID
        const { data: { user } } = await sb.auth.getUser()
        if (user) setArtisanId(user.id)
        setReady(true)
      })
      .catch(async () => {
        const { data: { user } } = await sb.auth.getUser()
        if (user) setArtisanId(user.id)
        setReady(true)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready) return (
    <div style={{ fontFamily: "sans-serif", padding: 32, textAlign: "center", color: "#666" }}>
      Chargement...
    </div>
  )

  return <VoiceDashboard artisanId={artisanId} />
}