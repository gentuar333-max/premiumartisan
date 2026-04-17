"use client"

import { useState, useEffect, useCallback } from "react"

type CallStatus = "nouveau" | "vu" | "rappele" | "devis" | "termine"

interface Call {
  id: string
  dt: string
  name: string
  phone: string
  address: string
  type: string
  problem: string
  urgent: boolean
  status: CallStatus
  dur: number
  isnew: boolean
  transcript: { role: "ai" | "client"; text: string; time: string }[]
}

function parseTranscript(raw: string | null): { role: "ai" | "client"; text: string; time: string }[] {
  if (!raw) return []
  try {
    const lines = raw.split("\n").filter(Boolean)
    return lines.map((line, i) => {
      const isAI = line.startsWith("AI:") || line.startsWith("Marie:") || line.startsWith("assistant:")
      const text = line.replace(/^(AI:|Marie:|assistant:|User:|Client:)\s*/i, "").trim()
      const mins = Math.floor(i * 30 / 60)
      const secs = String((i * 30) % 60).padStart(2, "0")
      return { role: isAI ? "ai" : "client", text, time: `${mins}:${secs}` }
    })
  } catch {
    return []
  }
}

function mapDbCall(row: Record<string, unknown>): Call {
  const rawStatus = (row.status as string) ?? "nouveau"
  const status = rawStatus
    .replace("terminé", "termine")
    .replace("rappelé", "rappele") as CallStatus
  return {
    id: row.id as string,
    dt: row.created_at as string,
    name: (row.nom_client as string) ?? "Client inconnu",
    phone: (row.caller_phone as string) ?? "",
    address: (row.adresse as string) ?? "",
    type: (row.type_travaux as string) ?? "Divers",
    problem: (row.probleme as string) ?? "",
    urgent: (row.urgent as boolean) ?? false,
    status,
    dur: (row.duration as number) ?? 0,
    isnew: (row.isnew as boolean) ?? true,
    transcript: parseTranscript(row.transcript as string | null),
  }
}

function fmtTimeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (h < 1) return "a l'instant"
  if (h < 24) return `il y a ${h}h`
  return `il y a ${d}j`
}

function fmtDur(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}

type FilterKey = "all" | "new" | "urgent" | "done"

const BADGE: Record<string, { bg: string; color: string; label: string }> = {
  nouveau:  { bg: "#DCFCE7", color: "#166534", label: "Nouveau" },
  vu:       { bg: "#F3F4F6", color: "#6B7280", label: "Vu" },
  rappele:  { bg: "#FEF3C7", color: "#92400E", label: "Rappele" },
  devis:    { bg: "#DBEAFE", color: "#1E40AF", label: "Devis" },
  termine:  { bg: "#F3F4F6", color: "#6B7280", label: "Termine" },
  urgent:   { bg: "#FEE2E2", color: "#DC2626", label: "Urgent" },
}

export default function VoiceDashboard() {
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterKey>("all")
  const [selected, setSelected] = useState<Call | null>(null)

  const fetchCalls = useCallback(async () => {
    try {
      const res = await fetch("/api/artisan/calls")
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? "Erreur")
      setCalls((json.calls ?? []).map(mapDbCall))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de chargement")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchCalls()
    const interval = setInterval(() => void fetchCalls(), 30000)
    return () => clearInterval(interval)
  }, [fetchCalls])

  const newCount    = calls.filter(c => c.isnew).length
  const urgentCount = calls.filter(c => c.urgent).length
  const doneCount   = calls.filter(c => c.status === "termine").length

  const filtered =
    filter === "new"    ? calls.filter(c => c.isnew) :
    filter === "urgent" ? calls.filter(c => c.urgent) :
    filter === "done"   ? calls.filter(c => c.status === "termine") :
    calls

  const oldCalls = filtered.filter(c => !c.isnew)
  const newCalls = filtered.filter(c => c.isnew)

  async function markDone(id: string) {
    setCalls(prev => prev.map(c => c.id === id ? { ...c, status: "termine" as CallStatus, isnew: false } : c))
    setSelected(prev => prev?.id === id ? { ...prev, status: "termine" as CallStatus, isnew: false } : prev)
    await fetch("/api/artisan/calls", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "termine" }),
    })
  }

  async function deleteCall(id: string) {
    setCalls(prev => prev.filter(c => c.id !== id))
    setSelected(null)
    await fetch("/api/artisan/calls", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
  }

  function getBadge(call: Call) {
    if (call.urgent) return BADGE.urgent
    return BADGE[call.status] ?? BADGE.nouveau
  }

  function getBorderColor(call: Call) {
    if (call.urgent) return "#EF4444"
    if (call.isnew)  return "#22C55E"
    if (call.status === "termine") return "#D1D5DB"
    return "#9CA3AF"
  }

  const CallCard = ({ call }: { call: Call }) => {
    const badge = getBadge(call)
    return (
      <div
        onClick={() => setSelected(call)}
        style={{
          background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer",
          borderLeft: `4px solid ${getBorderColor(call)}`,
          opacity: call.status === "termine" ? 0.7 : 1,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, textTransform: "uppercase" as const, background: badge.bg, color: badge.color }}>
            {badge.label}
          </span>
          <span style={{ fontSize: 12, color: "#999" }}>{fmtTimeAgo(call.dt)}</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{call.name}</div>
        <div style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
          {call.address ? (call.address.split(",")[1]?.trim() ?? call.address) : "Adresse non renseignee"}
          {call.dur > 0 && ` · ${fmtDur(call.dur)}`}
        </div>
        <button
          onClick={e => { e.stopPropagation(); if (call.phone) window.location.href = `tel:${call.phone.replace(/\s/g, "")}` }}
          style={{ width: "100%", padding: 13, borderRadius: 12, border: "none", background: call.phone ? "#1A1A1A" : "#9CA3AF", color: "#fff", fontSize: 15, fontWeight: 600, cursor: call.phone ? "pointer" : "default" }}
        >
          {call.urgent ? "Appeler maintenant" : "Rappeler"}
        </button>
      </div>
    )
  }

  if (loading) return (
    <div style={{ fontFamily: "sans-serif", padding: 32, textAlign: "center" as const, color: "#666" }}>
      Chargement...
    </div>
  )

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .tab-btn { padding: 10px 20px; border-radius: 20px; font-size: 14px; font-weight: 500; white-space: nowrap; border: none; cursor: pointer; transition: all .15s; font-family: inherit; }
        .tab-btn.active { background: #1A1A1A; color: #fff; }
        .tab-btn.inactive { background: #fff; color: #666; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.5; } }
      `}</style>

      <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#F8F9FA", minHeight: "100vh", padding: "16px 16px 100px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>Receptionniste IA</h1>
            <p style={{ fontSize: 13, color: "#666", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <span style={{ width: 8, height: 8, background: "#22C55E", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
              En ligne 24/7
            </p>
          </div>
          <button onClick={() => void fetchCalls()} style={{ fontSize: 12, color: "#666", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>
            Actualiser
          </button>
        </div>

        {error && (
          <div style={{ background: "#FEE2E2", color: "#DC2626", padding: 12, borderRadius: 12, marginBottom: 16, fontSize: 13 }}>
            {error}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { val: calls.length, label: "Appels" },
            { val: newCount,     label: "Nouveaux" },
            { val: urgentCount,  label: "Urgents" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: 16, textAlign: "center" as const, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" as const, paddingBottom: 4 }}>
          {([
            { key: "all",    label: `Tous (${calls.length})` },
            { key: "new",    label: `Nouveaux (${newCount})` },
            { key: "urgent", label: `Urgents (${urgentCount})` },
            { key: "done",   label: `Traites (${doneCount})` },
          ] as { key: FilterKey; label: string }[]).map(t => (
            <button key={t.key} className={`tab-btn ${filter === t.key ? "active" : "inactive"}`} onClick={() => setFilter(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {filter === "all" && oldCalls.length > 0 && (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase" as const, letterSpacing: 0.5, margin: "20px 0 12px" }}>
              Appels anterieurs
            </div>
            {oldCalls.map(c => <CallCard key={c.id} call={c} />)}
          </>
        )}

        {filter === "all" && newCalls.length > 0 && (
          <div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase" as const, letterSpacing: 0.5, margin: "20px 0 12px" }}>
            Nouveaux appels
          </div>
        )}

        {filter === "all"
          ? newCalls.map(c => <CallCard key={c.id} call={c} />)
          : filtered.map(c => <CallCard key={c.id} call={c} />)
        }

        {filtered.length === 0 && !loading && (
          <div style={{ textAlign: "center" as const, padding: 40, color: "#999", fontSize: 14 }}>
            {calls.length === 0 ? "Aucun appel pour le moment" : "Aucun appel dans cette categorie"}
          </div>
        )}
      </div>

      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 500, maxHeight: "82vh", overflowY: "auto", padding: 24, animation: "slideUp .3s ease" }}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Details de l'appel</h2>
              <button onClick={() => setSelected(null)} style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "#F3F4F6", fontSize: 20, cursor: "pointer" }}>x</button>
            </div>

            <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
              {[
                { icon: "👤", label: "Client",    val: selected.name },
                { icon: "📱", label: "Telephone", val: selected.phone || "Non renseigne" },
                { icon: "📍", label: "Adresse",   val: selected.address || "Non renseignee" },
                { icon: "🔧", label: "Probleme",  val: selected.problem || "Non renseigne" },
                { icon: "⏱",  label: "Duree",     val: fmtDur(selected.dur) },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: "#F8F9FA", borderRadius: 12 }}>
                  <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {selected.transcript.length > 0 && (
              <div style={{ background: "#F8F9FA", borderRadius: 16, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 12 }}>
                  Conversation avec l'IA
                </div>
                {selected.transcript.map((msg, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: msg.role === "ai" ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
                      {msg.role === "ai" ? "🤖" : "👤"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{msg.role === "ai" ? "Marie (IA)" : selected.name}</div>
                      <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{msg.text}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <a href={selected.phone ? `tel:${selected.phone.replace(/\s/g, "")}` : "#"}
                style={{ flex: 1, padding: 15, borderRadius: 12, border: "none", background: "#1A1A1A", color: "#fff", fontSize: 15, fontWeight: 600, textAlign: "center" as const, textDecoration: "none", display: "block" }}>
                Appeler
              </a>
              <button onClick={() => markDone(selected.id)}
                style={{ flex: 1, padding: 15, borderRadius: 12, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                Marquer traite
              </button>
            </div>

            <button onClick={() => { if (confirm("Supprimer cet appel ?")) deleteCall(selected.id) }}
              style={{ width: "100%", padding: 13, borderRadius: 12, border: "1px solid #FEE2E2", background: "#FFF5F5", color: "#DC2626", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Supprimer
            </button>
          </div>
        </div>
      )}
    </>
  )
}