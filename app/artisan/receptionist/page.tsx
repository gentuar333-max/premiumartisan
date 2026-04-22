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
        // Ka setup nëse settings ekziston dhe nuk është null
        const hasSetup = json.settings !== null && json.settings !== undefined
        if (!hasSetup) {
          router.replace("/artisan/receptionist/setup")
        } else {
          setReady(true)
        }
      })
      .catch(() => {
        // Nëse ka error — lejo të hyjë
        setReady(true)
      })
  }, [router])

  if (!ready) return (
    <div style={{ fontFamily: "sans-serif", padding: 32, textAlign: "center", color: "#666" }}>
      Chargement...
    </div>
  )

  return <VoiceDashboard />
}