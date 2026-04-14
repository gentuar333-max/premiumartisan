"use client"

import { useState } from "react"

type CallStatus = "nouveau" | "vu" | "rappelé" | "devis" | "terminé" | "urgent"

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

const MOCK: Call[] = [
  {
    id: "1",
    dt: "2026-04-13T12:32:00",
    name: "Marie Dupont",
    phone: "06 98 76 54 32",
    address: "15 rue de la Paix, Dijon 21000",
    type: "Plomberie",
    problem: "Fuite d'eau - Cuisine",
    urgent: true,
    status: "nouveau",
    dur: 142,
    isnew: true,
    transcript: [
      { role: "ai", text: "Bonjour, vous êtes chez Jean-Marc Plomberie. Je suis Marie, l'assistante virtuelle. Comment puis-je vous aider ?", time: "14:32" },
      { role: "client", text: "Bonjour, j'ai une fuite d'eau dans ma cuisine sous l'évier. C'est assez urgent.", time: "14:32" },
      { role: "ai", text: "Je comprends, c'est une urgence. Pourriez-vous me donner votre adresse s'il vous plaît ?", time: "14:33" },
      { role: "client", text: "15 rue de la Paix à Dijon. Je suis disponible demain matin.", time: "14:34" },
      { role: "ai", text: "Parfait ! J'ai noté : fuite d'eau cuisine, 15 rue de la Paix Dijon, disponible demain matin. Monsieur Jean-Marc vous rappellera sous 30 minutes.", time: "14:35" },
    ],
  },
  {
    id: "2",
    dt: "2026-04-13T09:18:00",
    name: "Thomas Bernard",
    phone: "06 12 45 78 90",
    address: "8 avenue de la République, Chenôve 21300",
    type: "Chauffage",
    problem: "Chauffage défectueux",
    urgent: false,
    status: "nouveau",
    dur: 98,
    isnew: true,
    transcript: [
      { role: "ai", text: "Bonjour, vous êtes chez Jean-Marc Plomberie & Chauffage. Comment puis-je vous aider ?", time: "09:18" },
      { role: "client", text: "Bonjour, mon chauffage ne fonctionne plus depuis ce matin.", time: "09:19" },
      { role: "ai", text: "Je comprends. Votre adresse s'il vous plaît ?", time: "09:19" },
      { role: "client", text: "8 avenue de la République à Chenôve. Disponible samedi matin.", time: "09:20" },
      { role: "ai", text: "Noté. Jean-Marc vous recontactera rapidement pour convenir d'un rendez-vous.", time: "09:21" },
    ],
  },
  {
    id: "3",
    dt: "2026-04-11T14:30:00",
    name: "Sophie Martin",
    phone: "06 78 90 12 34",
    address: "5 boulevard de la Liberté, Quetigny 21800",
    type: "Plomberie",
    problem: "Devis rénovation salle de bain",
    urgent: false,
    status: "vu",
    dur: 203,
    isnew: false,
    transcript: [
      { role: "ai", text: "Bonjour, Jean-Marc Plomberie. Que puis-je faire pour vous ?", time: "14:30" },
      { role: "client", text: "Je cherche un devis pour rénover ma salle de bain.", time: "14:31" },
      { role: "ai", text: "Parfait. Quelle surface approximativement et votre adresse ?", time: "14:31" },
      { role: "client", text: "5 boulevard de la Liberté à Quetigny, environ 8m².", time: "14:32" },
      { role: "ai", text: "Très bien, Jean-Marc vous contactera pour fixer une visite.", time: "14:33" },
    ],
  },
  {
    id: "4",
    dt: "2026-04-10T16:45:00",
    name: "Pierre Leroy",
    phone: "06 45 67 89 01",
    address: "22 rue des Lilas, Longvic 21600",
    type: "Plomberie",
    problem: "Robinet qui fuit - Salle de bain",
    urgent: false,
    status: "terminé",
    dur: 75,
    isnew: false,
    transcript: [
      { role: "ai", text: "Bonjour, Jean-Marc Plomberie. Comment puis-je vous aider ?", time: "16:45" },
      { role: "client", text: "J'ai un robinet qui fuit dans la salle de bain.", time: "16:46" },
      { role: "ai", text: "D'accord. Votre adresse ?", time: "16:46" },
      { role: "client", text: "22 rue des Lilas à Longvic.", time: "16:47" },
      { role: "ai", text: "Noté. Jean-Marc vous rappellera pour convenir d'un passage.", time: "16:47" },
    ],
  },
]

function fmtTimeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (h < 1) return "à l'instant"
  if (h < 24) return `il y a ${h}h`
  return `il y a ${d}j`
}

function fmtDur(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}

type FilterKey = "all" | "new" | "urgent" | "done"

export default function VoiceDashboard() {
  const [calls, setCalls] = useState<Call[]>(MOCK)
  const [filter, setFilter] = useState<FilterKey>("all")
  const [selected, setSelected] = useState<Call | null>(null)

  const newCount    = calls.filter(c => c.isnew).length
  const urgentCount = calls.filter(c => c.urgent).length
  const doneCount   = calls.filter(c => c.status === "terminé").length

  const filtered =
    filter === "new"    ? calls.filter(c => c.isnew) :
    filter === "urgent" ? calls.filter(c => c.urgent) :
    filter === "done"   ? calls.filter(c => c.status === "terminé") :
    calls

  const oldCalls = filtered.filter(c => !c.isnew)
  const newCalls = filtered.filter(c => c.isnew)

  function markDone(id: string) {
    setCalls(prev => prev.map(c => c.id === id ? { ...c, status: "terminé" as CallStatus, isnew: false } : c))
    setSelected(prev => prev?.id === id ? { ...prev, status: "terminé" as CallStatus, isnew: false } : prev)
  }

  const BADGE: Record<string, { bg: string; color: string; label: string }> = {
    nouveau:  { bg: "#DCFCE7", color: "#166534", label: "Nouveau" },
    vu:       { bg: "#F3F4F6", color: "#6B7280", label: "Vu" },
    "rappelé":{ bg: "#FEF3C7", color: "#92400E", label: "Rappelé" },
    devis:    { bg: "#DBEAFE", color: "#1E40AF", label: "Devis" },
    "terminé":{ bg: "#F3F4F6", color: "#6B7280", label: "Terminé" },
    urgent:   { bg: "#FEE2E2", color: "#DC2626", label: "Urgent" },
  }

  function getBadge(call: Call) {
    if (call.urgent) return BADGE.urgent
    return BADGE[call.status] ?? BADGE.nouveau
  }

  function getBorderColor(call: Call) {
    if (call.urgent) return "#EF4444"
    if (call.isnew)  return "#22C55E"
    if (call.status === "terminé") return "#D1D5DB"
    return "#9CA3AF"
  }

  const CallCard = ({ call }: { call: Call }) => {
    const badge = getBadge(call)
    return (
      <div
        onClick={() => setSelected(call)}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          cursor: "pointer",
          borderLeft: `4px solid ${getBorderColor(call)}`,
          opacity: call.status === "terminé" ? 0.7 : 1,
          transition: "box-shadow .2s",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, textTransform: "uppercase", background: badge.bg, color: badge.color }}>
            {badge.label}
          </span>
          <span style={{ fontSize: 12, color: "#999" }}>{fmtTimeAgo(call.dt)}</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{call.name}</div>
        <div style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
          📍 {call.address.split(",")[1]?.trim() ?? call.address} &nbsp;&nbsp; ⏱ {fmtDur(call.dur)}
        </div>
        <button
          onClick={e => { e.stopPropagation(); window.location.href = `tel:${call.phone.replace(/\s/g, "")}` }}
          style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: "#1A1A1A", color: "#fff", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}
        >
          📞 {call.urgent ? "Appeler maintenant" : "Rappeler"}
        </button>
      </div>
    )
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #F8F9FA; }
        .tab-btn { padding: 10px 20px; border-radius: 20px; font-size: 14px; font-weight: 500; white-space: nowrap; border: none; cursor: pointer; transition: all .15s; font-family: inherit; }
        .tab-btn.active { background: #1A1A1A; color: #fff; }
        .tab-btn.inactive { background: #fff; color: #666; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}</style>

      <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#F8F9FA", minHeight: "100vh", padding: "16px 16px 100px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>Réceptionniste IA</h1>
            <p style={{ fontSize: 13, color: "#666", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <span style={{ width: 8, height: 8, background: "#22C55E", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
              En ligne 24/7
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 600 }}>Jean-Marc</div>
            <div style={{ fontSize: 13, color: "#666" }}>Plomberie</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { val: calls.length, label: "Appels" },
            { val: newCount,     label: "Nouveaux" },
            { val: urgentCount,  label: "Urgents" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: 16, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {([
            { key: "all",    label: `Tous (${calls.length})` },
            { key: "new",    label: `Nouveaux (${newCount})` },
            { key: "urgent", label: `Urgents (${urgentCount})` },
            { key: "done",   label: `Traités (${doneCount})` },
          ] as { key: FilterKey; label: string }[]).map(t => (
            <button
              key={t.key}
              className={`tab-btn ${filter === t.key ? "active" : "inactive"}`}
              onClick={() => setFilter(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Appels précédents */}
        {filter === "all" && oldCalls.length > 0 && (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 0.5, margin: "20px 0 12px" }}>
              Appels antérieurs
            </div>
            {oldCalls.map(c => <CallCard key={c.id} call={c} />)}
          </>
        )}

        {/* Nouveaux appels */}
        {filter === "all" && newCalls.length > 0 && (
          <div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 0.5, margin: "20px 0 12px" }}>
            Nouveaux appels
          </div>
        )}
        {filter === "all"
          ? newCalls.map(c => <CallCard key={c.id} call={c} />)
          : filtered.map(c => <CallCard key={c.id} call={c} />)
        }

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#999", fontSize: 14 }}>Aucun appel</div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 500, maxHeight: "80vh", overflowY: "auto", padding: 24, animation: "slideUp .3s ease" }}
          >
            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Détails de l'appel</h2>
              <button
                onClick={() => setSelected(null)}
                style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "#F3F4F6", fontSize: 20, cursor: "pointer" }}
              >
                ×
              </button>
            </div>

            {/* Info grid */}
            <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
              {[
                { icon: "👤", label: "Client",    val: selected.name },
                { icon: "📱", label: "Téléphone", val: selected.phone },
                { icon: "📍", label: "Adresse",   val: selected.address },
                { icon: "🔧", label: "Problème",  val: selected.problem },
                { icon: "⏱",  label: "Durée",     val: fmtDur(selected.dur) },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: "#F8F9FA", borderRadius: 12 }}>
                  <div style={{ width: 40, height: 40, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>{item.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Transcript */}
            <div style={{ background: "#F8F9FA", borderRadius: 16, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase", marginBottom: 12 }}>
                🎙 Conversation avec l'IA
              </div>
              {selected.transcript.map((msg, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: msg.role === "ai" ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "#E5E7EB",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                  }}>
                    {msg.role === "ai" ? "🤖" : "👤"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                      {msg.role === "ai" ? "Marie (IA)" : selected.name}
                    </div>
                    <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{msg.text}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              <a
                href={`tel:${selected.phone.replace(/\s/g, "")}`}
                style={{ flex: 1, padding: 16, borderRadius: 12, border: "none", background: "#1A1A1A", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer", textAlign: "center", textDecoration: "none", display: "block" }}
              >
                📞 Appeler
              </a>
              <button
                onClick={() => markDone(selected.id)}
                style={{ flex: 1, padding: 16, borderRadius: 12, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 16, fontWeight: 600, cursor: "pointer" }}
              >
                ✅ Marquer traité
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}