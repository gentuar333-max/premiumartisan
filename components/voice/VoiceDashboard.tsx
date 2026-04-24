"use client"

import { useState, useEffect, useCallback } from "react"

type CallStatus = "nouveau" | "vu" | "rappele" | "devis" | "termine"
type SectionTab = "client" | "employe" | "famille"
type ContactType = "famille" | "employe" | "client"

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

interface Contact {
  id: string
  name: string
  phone: string
  type: ContactType
  notes: string | null
  created_at: string
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
  } catch { return [] }
}

function mapDbCall(row: Record<string, unknown>): Call {
  const rawStatus = (row.status as string) ?? "nouveau"
  const status = rawStatus.replace("terminé", "termine").replace("rappelé", "rappele") as CallStatus
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

function fmtPhone(phone: string) {
  const p = phone.replace(/^\+33/, "0").replace(/\s/g, "")
  return p.replace(/(\d{2})(?=\d)/g, "$1 ").trim()
}

const BADGE: Record<string, { bg: string; color: string; label: string }> = {
  nouveau: { bg: "#DCFCE7", color: "#166534", label: "Nouveau" },
  vu:      { bg: "#F3F4F6", color: "#6B7280", label: "Vu" },
  rappele: { bg: "#FEF3C7", color: "#92400E", label: "Rappele" },
  devis:   { bg: "#DBEAFE", color: "#1E40AF", label: "Devis" },
  termine: { bg: "#F3F4F6", color: "#6B7280", label: "Termine" },
  urgent:  { bg: "#FEE2E2", color: "#DC2626", label: "Urgent" },
}

const CONTACT_CFG: Record<string, { label: string; bg: string; color: string }> = {
  employe: { label: "Employé", bg: "#DBEAFE", color: "#1E40AF" },
  famille: { label: "Famille", bg: "#FEF3C7", color: "#92400E" },
}

export default function VoiceDashboard() {
  const [calls, setCalls]       = useState<Call[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [tab, setTab]           = useState<SectionTab>("client")
  const [selected, setSelected] = useState<Call | null>(null)

  // Contact form
  const [showForm, setShowForm]     = useState(false)
  const [saving, setSaving]         = useState(false)
  const [cName, setCName]           = useState("")
  const [cPhone, setCPhone]         = useState("")
  const [cType, setCType]           = useState<ContactType>("employe")
  const [cNotes, setCNotes]         = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [menuOpen, setMenuOpen]           = useState(false)
  const [userEmail, setUserEmail]         = useState("")
  const [avatarOpen, setAvatarOpen]       = useState(false)
  const [subscription, setSubscription] = useState<{ plan: string; status: string; minutes_remaining: number; minutes_total: number } | null>(null)

  useEffect(() => {
    import("@/lib/supabaseBrowser").then(({ createSupabaseBrowserClient }) => {
      const s = createSupabaseBrowserClient()
      s.auth.getUser().then(({ data }) => {
        if (data.user?.email) setUserEmail(data.user.email)
      })
    })
  }, [])

  useEffect(() => {
    fetch('/api/marie/subscription')
      .then(r => r.json())
      .then(json => { if (json.subscription) setSubscription(json.subscription) })
      .catch(() => {})
  }, [])

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

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch("/api/artisan/contacts")
      const json = await res.json()
      if (json.ok) setContacts(json.contacts)
    } catch { /* silent */ }
  }, [])

  useEffect(() => {
    void fetchCalls()
    void fetchContacts()
    const interval = setInterval(() => void fetchCalls(), 30000)
    return () => clearInterval(interval)
  }, [fetchCalls, fetchContacts])

  const newCount    = calls.filter(c => c.isnew).length
  const urgentCount = calls.filter(c => c.urgent).length

  const oldCalls = calls.filter(c => !c.isnew)
  const newCalls = calls.filter(c => c.isnew)

  const employeList = contacts.filter(c => c.type === "employe")
  const familleList = contacts.filter(c => c.type === "famille")

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

  async function handleAddContact() {
    if (!cName.trim() || !cPhone.trim()) return
    setSaving(true)
    try {
      const res = await fetch("/api/artisan/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cName, phone: cPhone, type: cType, notes: cNotes }),
      })
      const json = await res.json()
      if (json.ok) {
        setContacts(prev => [...prev, json.contact])
        setCName(""); setCPhone(""); setCNotes("")
        setShowForm(false)
      }
    } finally { setSaving(false) }
  }

  async function handleDeleteContact(id: string) {
    setDeletingId(id)
    try {
      await fetch("/api/artisan/contacts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      setContacts(prev => prev.filter(c => c.id !== id))
    } finally { setDeletingId(null) }
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

  const ContactList = ({ list, type }: { list: Contact[]; type: "employe" | "famille" }) => {
    const cfg = CONTACT_CFG[type]
    return (
      <>
        {list.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, textAlign: "center" as const, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Aucun {cfg.label.toLowerCase()}</div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>
              Ajoutez un {cfg.label.toLowerCase()} pour que Marie le reconnaisse
            </div>
            <button
              onClick={() => { setCType(type); setShowForm(true) }}
              style={{ background: "#1A1A1A", color: "#fff", border: "none", borderRadius: 12, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              + Ajouter
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {list.map(c => (
              <div key={c.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: cfg.color, flexShrink: 0 }}>
                  {c.name.trim().split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: "#666" }}>{fmtPhone(c.phone)}</div>
                  {c.notes && <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.notes}</div>}
                </div>
                <button
                  onClick={() => handleDeleteContact(c.id)}
                  disabled={deletingId === c.id}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#D1D5DB", fontSize: 20, padding: 4, flexShrink: 0, lineHeight: 1 }}
                >
                  {deletingId === c.id ? "·" : "×"}
                </button>
              </div>
            ))}
            <button
              onClick={() => { setCType(type); setShowForm(true) }}
              style={{ background: "#fff", border: "1.5px dashed #D1D5DB", borderRadius: 14, padding: "14px 16px", fontSize: 14, fontWeight: 600, color: "#6B7280", cursor: "pointer", textAlign: "center" as const }}
            >
              + Ajouter un {cfg.label.toLowerCase()}
            </button>
          </div>
        )}
      </>
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

      <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#F8F9FA", minHeight: "100vh" }}>

        {/* Sticky Header */}
        <div style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 0 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>Receptionniste IA</h1>
            <p style={{ fontSize: 13, color: "#666", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <span style={{ width: 8, height: 8, background: "#22C55E", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
              En ligne 24/7
            </p>
          </div>
          {/* Avatar + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Avatar [G] */}
            {userEmail && (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setAvatarOpen(o => !o)}
                  style={{ width: 34, height: 34, borderRadius: "50%", background: "#3B82F6", border: "none", cursor: "pointer", color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {userEmail[0].toUpperCase()}
                </button>
                {avatarOpen && (
                  <>
                    <div onClick={() => setAvatarOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 300 }} />
                    <div style={{ position: "absolute", top: 42, right: 0, width: 240, background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", zIndex: 301, overflow: "hidden" }}>
                      {/* User info */}
                      <div style={{ padding: "12px 14px", borderBottom: "1px solid #F1F5F9" }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userEmail}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>Artisan</div>
                      </div>
                      {/* Mon profil */}
                      <a href="/artisan/receptionist/setup" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", fontSize: 13, fontWeight: 500, color: "#374151", textDecoration: "none", borderBottom: "1px solid #F1F5F9" }}>
                        Mon profil <span style={{ color: "#CBD5E1" }}>›</span>
                      </a>
                      {/* Mes minutes */}
                      <div style={{ padding: "11px 14px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>Mes minutes</span>
                        {subscription ? (
                          <span style={{ fontSize: 13, fontWeight: 700, color: subscription.minutes_remaining > 20 ? "#16A34A" : subscription.minutes_remaining > 5 ? "#D97706" : "#DC2626" }}>
                            {subscription.minutes_remaining} min
                          </span>
                        ) : (
                          <a href="/artisan/receptionist/pricing" style={{ fontSize: 12, color: "#3B82F6", textDecoration: "none" }}>Activer →</a>
                        )}
                      </div>
                      {/* Logout */}
                      <button
                        onClick={async () => {
                          const { createSupabaseBrowserClient } = await import("@/lib/supabaseBrowser")
                          const s = createSupabaseBrowserClient()
                          await s.auth.signOut()
                          window.location.href = "/artisan/login"
                        }}
                        style={{ width: "100%", padding: "11px 14px", fontSize: 13, fontWeight: 500, color: "#DC2626", background: "none", border: "none", cursor: "pointer", textAlign: "left" as const }}
                      >
                        Se déconnecter
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}
            >
              <span style={{ display: "block", width: 20, height: 2, background: "#1A1A1A", borderRadius: 2 }} />
              <span style={{ display: "block", width: 20, height: 2, background: "#1A1A1A", borderRadius: 2 }} />
              <span style={{ display: "block", width: 20, height: 2, background: "#1A1A1A", borderRadius: 2 }} />
            </button>
          </div>
        </div>

        {/* Side menu */}
        {menuOpen && (
          <>
            <div
              onClick={() => setMenuOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200 }}
            />
            <div style={{
              position: "fixed", top: 0, right: 0, height: "100%", width: 280,
              background: "#fff", zIndex: 201, padding: 24, boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
              display: "flex", flexDirection: "column",
            }}>
              {/* Close */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A" }}>Menu</span>
                <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#666" }}>×</button>
              </div>

              {/* Minutes / Upgrade */}
              {subscription && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#F8F9FA", borderRadius: 12 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A" }}>
                        {subscription.minutes_remaining} min restantes
                      </div>
                      <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                        Plan {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                      </div>
                    </div>
                    <a
                      href="/artisan/receptionist/pricing"
                      style={{
                        fontSize: 12, fontWeight: 600, color: "#fff",
                        background: "#1A1A1A", border: "none",
                        borderRadius: 8, padding: "6px 12px",
                        textDecoration: "none",
                      }}
                    >
                      Upgrade
                    </a>
                  </div>
                </div>
              )}

              {/* Spacer */}
              <div style={{ flex: 1 }} />

              {/* Logout */}
              <button
                onClick={async () => {
                  const { createSupabaseBrowserClient } = await import("@/lib/supabaseBrowser")
                  const s = createSupabaseBrowserClient()
                  await s.auth.signOut()
                  window.location.href = "/artisan/login"
                }}
                style={{
                  width: "100%", padding: "13px", borderRadius: 12,
                  border: "1px solid #E5E7EB", background: "#fff",
                  fontSize: 14, fontWeight: 600, color: "#374151",
                  cursor: "pointer", textAlign: "center" as const,
                }}
              >
                Se déconnecter
              </button>
            </div>
          </>
        )}

        {/* Balance minutash */}
        {subscription && (
          <div style={{
            background: subscription.minutes_remaining > 20 ? "#F0FDF4" : subscription.minutes_remaining > 5 ? "#FEF9C3" : "#FEF2F2",
            border: `1.5px solid ${subscription.minutes_remaining > 20 ? "#86EFAC" : subscription.minutes_remaining > 5 ? "#FDE047" : "#FCA5A5"}`,
            borderRadius: 14, padding: "12px 16px", marginBottom: 16,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>
                Plan {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: subscription.minutes_remaining > 20 ? "#166534" : subscription.minutes_remaining > 5 ? "#713F12" : "#DC2626" }}>
                {subscription.minutes_remaining} min restantes
              </div>
            </div>
            <div style={{ textAlign: "right" as const }}>
              <div style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>
                {subscription.minutes_total} min / mois
              </div>
              <a href="/artisan/receptionist/pricing" style={{
                fontSize: 11, fontWeight: 600, color: "#1A1A1A",
                background: "#fff", border: "1px solid #E5E7EB",
                borderRadius: 8, padding: "4px 10px", textDecoration: "none",
              }}>
                + Minutes
              </a>
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: "#FEE2E2", color: "#DC2626", padding: 12, borderRadius: 12, marginBottom: 16, fontSize: 13 }}>
            {error}
          </div>
        )}

        {/* Stats — identik me foton */}
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

        {/* Tabs: Client / Employé / Famille — zëvendësojnë Tous/Nouveaux/Urgents/Traités */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" as const, paddingBottom: 4 }}>
          {([
            { key: "client",  label: `Client (${calls.length})` },
            { key: "employe", label: `Employé (${employeList.length})` },
            { key: "famille", label: `Famille (${familleList.length})` },
          ] as { key: SectionTab; label: string }[]).map(t => (
            <button key={t.key} className={`tab-btn ${tab === t.key ? "active" : "inactive"}`} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* CLIENT — calls identike me foton */}
        {tab === "client" && (
          <>
            {oldCalls.length > 0 && (
              <>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase" as const, letterSpacing: 0.5, margin: "20px 0 12px" }}>
                  Appels anterieurs
                </div>
                {oldCalls.map(c => <CallCard key={c.id} call={c} />)}
              </>
            )}
            {newCalls.length > 0 && (
              <div style={{ fontSize: 12, fontWeight: 600, color: "#999", textTransform: "uppercase" as const, letterSpacing: 0.5, margin: "20px 0 12px" }}>
                Nouveaux appels
              </div>
            )}
            {newCalls.map(c => <CallCard key={c.id} call={c} />)}
            {calls.length === 0 && (
              <div style={{ textAlign: "center" as const, padding: 40, color: "#999", fontSize: 14 }}>
                Aucun appel pour le moment
              </div>
            )}
          </>
        )}

        {/* EMPLOYÉ */}
        {tab === "employe" && <ContactList list={employeList} type="employe" />}

        {/* FAMILLE */}
        {tab === "famille" && <ContactList list={familleList} type="famille" />}

      </div>

      {/* Detail modal — identik */}
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

      {/* Add contact modal */}
      {showForm && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "flex-end" }}
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false) }}
        >
          <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: 24, width: "100%", animation: "slideUp .25s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Nouveau {CONTACT_CFG[cType].label.toLowerCase()}</div>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#666" }}>×</button>
            </div>
            {[
              { label: "Prénom et nom *",  value: cName,  set: setCName,  placeholder: "Michel Dupont",    inputType: "text" },
              { label: "Téléphone *",      value: cPhone, set: setCPhone, placeholder: "06 12 34 56 78",   inputType: "tel"  },
              { label: "Note (optionnel)", value: cNotes, set: setCNotes, placeholder: "Ex: camion blanc", inputType: "text" },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{f.label}</label>
                <input
                  type={f.inputType}
                  value={f.value}
                  onChange={e => f.set(e.target.value)}
                  placeholder={f.placeholder}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #E5E7EB", fontSize: 15, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <button
              onClick={handleAddContact}
              disabled={saving || !cName.trim() || !cPhone.trim()}
              style={{
                width: "100%",
                background: saving || !cName.trim() || !cPhone.trim() ? "#E5E7EB" : "#1A1A1A",
                color:      saving || !cName.trim() || !cPhone.trim() ? "#9CA3AF" : "#fff",
                border: "none", borderRadius: 14, padding: "14px",
                fontSize: 16, fontWeight: 700, cursor: saving ? "wait" : "pointer", marginTop: 4,
              }}
            >
              {saving ? "Enregistrement..." : "Ajouter"}
            </button>
          </div>
        </div>
      )}
    </>
  )
}