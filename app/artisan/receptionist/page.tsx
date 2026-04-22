"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import VoiceDashboard from "@/components/voice/VoiceDashboard"

export default function ReceptionistPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetch("/api/artisan/vapi/setup")
      .then(r => r.json())
      .then(json => {
        if (!json.settings?.artisan_name) {
          // Nuk ka setup — redirect te setup
          router.replace("/artisan/receptionist/setup")
        } else {
          // Ka setup — shfaq dashboard direkt
          setReady(true)
        }
      })
      .catch(() => setReady(true))
  }, [router])

  if (!ready) return (
    <div style={{ fontFamily: "sans-serif", padding: 32, textAlign: "center", color: "#666" }}>
      Chargement...
    </div>
  )

  return <VoiceDashboard />
}