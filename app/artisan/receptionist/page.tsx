"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import VoiceDashboard from "@/components/voice/VoiceDashboard"

export default function ReceptionistPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [artisanId, setArtisanId] = useState<string | null>(null)
  const checked = useRef(false)

  useEffect(() => {
    if (checked.current) return
    checked.current = true

    fetch("/api/artisan/vapi/setup")
      .then(r => r.json())
      .then(json => {
        if (json.error === "Non authentifié" || json.status === 401) {
          router.replace("/artisan/login?redirect=/artisan/receptionist")
          return
        }
        if (!json.settings) {
          router.replace("/artisan/receptionist/setup")
          return
        }
        if (json.artisan_id) setArtisanId(json.artisan_id)
        setReady(true)
      })
      .catch(() => {
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