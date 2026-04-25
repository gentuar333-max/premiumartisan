"use client"

import { useState, useEffect, useCallback } from "react"
import { Phone, PhoneOutgoing, MapPin, Clock, Bell, AlertTriangle, Menu, X, Bot, User, Users, Heart, Home, Briefcase, Plus, Trash2, Zap, LogOut, ChevronDown } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────
type CallStatus = "nouveau" | "vu" | "rappele" | "devis" | "termine" | "urgent"
type TabKey = "clients" | "employes" | "famille"
type ContactType = "employe" | "famille"

interface Call {
  id: string
  dt: string
  name: string
  phone: string
  address: string
  problem: string
  urgent: boolean
  status: string
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
}

interface Subscription {
  plan: string
  status: string
  minutes_remaining: number
  minutes_total: number
}

// ─── Helpers ─────────────────────────────────────────────────────────
function fmtTimeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (m < 1) return "À l'instant"
  if (m < 60) return `Il y a ${m} min`
  if (h < 24) return `Il y a ${h}h`
  if (d === 1) return "Hier"
  return `Il y a ${d} jours`
}

function fmtDur(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}

function fmtPhone(phone: string) {
  const p = phone.replace(/^\+33/, "0").replace(/\s/g, "")
  return p.replace(/(\d{2})(?=\d)/g, "$1 ").trim()
}

function getInitials(name: string) {
  return name.trim().split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
}

function mapDbCall(row: Record<string, unknown>): Call {
  const rawStatus = (row.status as string) ?? "nouveau"
  const status = rawStatus.replace("terminé", "termine").replace("rappelé", "rappele")
  return {
    id: row.id as string,
    dt: row.created_at as string,
    name: (row.nom_client as string) ?? "Client inconnu",
    phone: (row.caller_phone as string) ?? "",
    address: (row.adresse as string) ?? "",
    problem: (row.probleme as string) ?? "",
    urgent: (row.urgent as boolean) ?? false,
    status: row.urgent ? "urgent" : status,
    dur: (row.duration as number) ?? 0,
    isnew: (row.isnew as boolean) ?? true,
    transcript: parseTranscript(row.transcript as string | null),
  }
}

function parseTranscript(raw: string | null): { role: "ai" | "client"; text: string; time: string }[] {
  if (!raw) return []
  try {
    return raw.split("\n").filter(Boolean).map((line, i) => {
      const isAI = /^(AI:|Marie:|assistant:)/i.test(line)
      const text = line.replace(/^(AI:|Marie:|assistant:|User:|Client:)\s*/i, "").trim()
      const mins = Math.floor(i * 30 / 60)
      const secs = String((i * 30) % 60).padStart(2, "0")
      return { role: isAI ? "ai" : "client", text, time: `${mins}:${secs}` }
    })
  } catch { return [] }
}

function getStatusConfig(call: Call) {
  if (call.urgent) return { label: "Urgent", bg: "#FEF2F2", color: "#DC2626", border: "#FCA5A5" }
  if (call.isnew) return { label: "Nouveau", bg: "#F0FDF4", color: "#16A34A", border: "#86EFAC" }
  if (call.status === "vu") return { label: "Vu", bg: "#FEFCE8", color: "#D97706", border: "#FDE047" }
  if (call.status === "termine") return { label: "Traité", bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0" }
  return { label: "Vu", bg: "#F9FAFB", color: "#6B7280", border: "#E5E7EB" }
}

// ─── Main Component ───────────────────────────────────────────────────
export default function VoiceDashboard() {
  const [calls, setCalls] = useState<Call[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<TabKey>("clients")
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedCall, setSelectedCall] = useState<Call | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState("")
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [addContactOpen, setAddContactOpen] = useState(false)
  const [addContactType, setAddContactType] = useState<ContactType>("employe")
  const [cName, setCName] = useState("")
  const [cPhone, setCPhone] = useState("")
  const [cNotes, setCNotes] = useState("")
  const [saving, setSaving] = useState(false)

  const fetchAll = useCallback(async () => {
    try {
      const [callsRes, contactsRes, subRes] = await Promise.all([
        fetch("/api/artisan/calls"),
        fetch("/api/artisan/contacts"),
        fetch("/api/marie/subscription"),
      ])
      const [callsJson, contactsJson, subJson] = await Promise.all([
        callsRes.json(),
        contactsRes.json(),
        subRes.json(),
      ])
      if (callsJson.calls) setCalls(callsJson.calls.map(mapDbCall))
      if (contactsJson.contacts) setContacts(contactsJson.contacts)
      if (subJson.subscription) setSubscription(subJson.subscription)
    } catch { /* silent */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    void fetchAll()
    const iv = setInterval(() => void fetchAll(), 30000)
    return () => clearInterval(iv)
  }, [fetchAll])

  useEffect(() => {
    import("@/lib/supabaseBrowser").then(({ createSupabaseBrowserClient }) => {
      createSupabaseBrowserClient().auth.getUser().then(({ data }) => {
        if (data.user?.email) setUserEmail(data.user.email)
      })
    })
  }, [])

  const newCount = calls.filter(c => c.isnew).length
  const urgentCount = calls.filter(c => c.urgent).length
  const employeList = contacts.filter(c => c.type === "employe")
  const familleList = contacts.filter(c => c.type === "famille")

  async function markDone(id: string) {
    setCalls(prev => prev.map(c => c.id === id ? { ...c, status: "termine", isnew: false } : c))
    setDetailOpen(false)
    await fetch("/api/artisan/calls", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: "termine" }) })
  }

  async function deleteCall(id: string) {
    setCalls(prev => prev.filter(c => c.id !== id))
    setDetailOpen(false)
    await fetch("/api/artisan/calls", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
  }

  async function deleteContact(id: string) {
    setDeletingId(id)
    await fetch("/api/artisan/contacts", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    setContacts(prev => prev.filter(c => c.id !== id))
    setDeletingId(null)
  }

  async function addContact() {
    if (!cName.trim() || !cPhone.trim()) return
    setSaving(true)
    const res = await fetch("/api/artisan/contacts", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: cName, phone: cPhone, type: addContactType, notes: cNotes }),
    })
    const json = await res.json()
    if (json.ok) {
      setContacts(prev => [...prev, json.contact])
      setCName(""); setCPhone(""); setCNotes("")
      setAddContactOpen(false)
    }
    setSaving(false)
  }

  async function logout() {
    const { createSupabaseBrowserClient } = await import("@/lib/supabaseBrowser")
    await createSupabaseBrowserClient().auth.signOut()
    window.location.href = "/artisan/login"
  }

  const minPct = subscription ? Math.min((subscription.minutes_remaining / (subscription.minutes_total || 1)) * 100, 100) : 0
  const planLabel = subscription ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) : ""

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "sans-serif", color: "#6B7280" }}>
      Chargement...
    </div>
  )

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #F5F5F7; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.4} }
        @keyframes slideUp { from{transform:translateY(100%)}to{transform:translateY(0)} }
        @keyframes slideLeft { from{transform:translateX(-100%)}to{transform:translateX(0)} }
        .tab-btn { flex:1; padding:10px 4px; font-size:13px; font-weight:500; border:none; background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; border-bottom:2px solid transparent; color:#6B7280; transition:all .15s; font-family:inherit; }
        .tab-btn.active { color:#111; border-bottom-color:#111; font-weight:700; }
        .call-card { background:#fff; border-radius:16px; padding:16px; box-shadow:0 1px 4px rgba(0,0,0,0.06); cursor:pointer; transition:all .15s; border:1px solid #F3F4F6; }
        .call-card:active { transform:scale(.98); }
        .contact-card { background:#fff; border-radius:14px; padding:14px 16px; display:flex; align-items:center; gap:12px; box-shadow:0 1px 3px rgba(0,0,0,0.05); border:1px solid #F3F4F6; }
        .btn-primary { background:#3B82F6; color:#fff; border:none; border-radius:10px; padding:9px 16px; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:6px; font-family:inherit; transition:all .15s; }
        .btn-primary:active { transform:scale(.97); }
        .btn-primary.urgent { background:#EF4444; }
        .btn-outline { background:#fff; color:#374151; border:1px solid #E5E7EB; border-radius:10px; padding:9px 16px; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:6px; font-family:inherit; transition:all .15s; }
        .btn-icon { background:#F3F4F6; border:none; border-radius:8px; width:34px; height:34px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#6B7280; transition:all .15s; flex-shrink:0; }
        .btn-icon:hover { background:#E5E7EB; }
        .btn-icon.danger { color:#EF4444; }
        .add-btn { width:100%; padding:14px; border:2px dashed #D1D5DB; border-radius:14px; background:#fff; font-size:13px; font-weight:600; color:#6B7280; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:all .15s; font-family:inherit; }
        .add-btn:hover { border-color:#3B82F6; color:#3B82F6; }
        .avatar-btn { width:40px; height:40px; border-radius:50%; background:#3B82F6; border:none; cursor:pointer; color:#fff; font-size:14px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
      `}</style>

      <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background: "#F5F5F7", minHeight: "100vh" }}>

        {/* ── HEADER ── */}
        <header style={{ position: "sticky", top: 0, zIndex: 40, background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 4.5 }}>
              <span style={{ display: "block", width: 20, height: 2, background: "#111", borderRadius: 2 }} />
              <span style={{ display: "block", width: 14, height: 2, background: "#111", borderRadius: 2 }} />
              <span style={{ display: "block", width: 20, height: 2, background: "#111", borderRadius: 2 }} />
            </button>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111", lineHeight: 1.2 }}>Réceptionniste IA</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", display: "inline-block", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 12, color: "#6B7280" }}>IA en ligne</span>
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div style={{ position: "relative" }}>
            <button className="avatar-btn" onClick={() => setAvatarOpen(o => !o)}>
              {userEmail ? userEmail[0].toUpperCase() : "A"}
            </button>
            {avatarOpen && (
              <>
                <div onClick={() => setAvatarOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 100 }} />
                <div style={{ position: "absolute", top: 48, right: 0, width: 240, background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 101, overflow: "hidden" }}>
                  <div style={{ padding: "12px 14px", borderBottom: "1px solid #F3F4F6" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userEmail}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>Artisan</div>
                  </div>
                  <a href="/artisan/receptionist/setup" style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", fontSize: 13, fontWeight: 500, color: "#374151", textDecoration: "none", borderBottom: "1px solid #F3F4F6" }}>
                    <User size={14} /> Mon profil
                  </a>
                  <div style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 500, color: "#374151" }}>
                      <Clock size={14} /> Mes minutes
                    </div>
                    {subscription ? (
                      <span style={{ fontSize: 13, fontWeight: 700, color: subscription.minutes_remaining > 20 ? "#16A34A" : "#DC2626" }}>
                        {subscription.minutes_remaining} min
                      </span>
                    ) : (
                      <a href="/artisan/receptionist/pricing" style={{ fontSize: 12, color: "#3B82F6", textDecoration: "none" }}>Activer →</a>
                    )}
                  </div>
                  <button onClick={logout} style={{ width: "100%", padding: "11px 14px", fontSize: 13, fontWeight: 500, color: "#EF4444", background: "none", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10, fontFamily: "inherit" }}>
                    <LogOut size={14} /> Déconnexion
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* ── STATS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, padding: "14px 16px" }}>
          {[
            { icon: <Phone size={20} color="#3B82F6" />, val: calls.length, label: "Total appels", bg: "#EFF6FF" },
            { icon: <Bell size={20} color="#22C55E" />, val: newCount, label: "Nouveaux", bg: "#F0FDF4" },
            { icon: <AlertTriangle size={20} color="#EF4444" />, val: urgentCount, label: "Urgents", bg: "#FEF2F2" },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: "14px 10px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                {s.icon}
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#111", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4, textTransform: "uppercase", letterSpacing: ".03em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── TABS ── */}
        <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", display: "flex", padding: "0 16px" }}>
          {([
            { key: "clients", label: "Clients", icon: <Home size={15} /> },
            { key: "employes", label: "Employés", icon: <Users size={15} /> },
            { key: "famille", label: "Famille", icon: <Heart size={15} /> },
          ] as { key: TabKey; label: string; icon: React.ReactNode }[]).map(t => (
            <button key={t.key} className={`tab-btn ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ── CLIENTS ── */}
        {tab === "clients" && (
          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {calls.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#9CA3AF", fontSize: 14 }}>Aucun appel pour le moment</div>
            ) : calls.map(call => {
              const sc = getStatusConfig(call)
              return (
                <div key={call.id} className="call-card" onClick={() => { setSelectedCall(call); setDetailOpen(true) }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                          {sc.label}
                        </span>
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>{fmtTimeAgo(call.dt)}</span>
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 4 }}>{call.name}</div>
                      {call.address && (
                        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#6B7280", marginBottom: 3 }}>
                          <MapPin size={13} style={{ flexShrink: 0 }} />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{call.address}</span>
                        </div>
                      )}
                      {call.dur > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#6B7280", marginBottom: 6 }}>
                          <Clock size={13} />
                          <span>{fmtDur(call.dur)}</span>
                        </div>
                      )}
                      {call.problem && (
                        <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{call.problem}</p>
                      )}
                    </div>
                    {(call.isnew || call.urgent) && call.phone && (
                      <button
                        className={`btn-primary ${call.urgent ? "urgent" : ""}`}
                        style={{ padding: "10px", borderRadius: 12, flexShrink: 0 }}
                        onClick={e => { e.stopPropagation(); window.location.href = `tel:${call.phone.replace(/\s/g, "")}` }}
                      >
                        {call.urgent ? <PhoneOutgoing size={18} /> : <Phone size={18} />}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── EMPLOYES / FAMILLE ── */}
        {(tab === "employes" || tab === "famille") && (
          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {(tab === "employes" ? employeList : familleList).map(c => (
              <div key={c.id} className="contact-card">
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: tab === "employes" ? "#EFF6FF" : "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: tab === "employes" ? "#1D4ED8" : "#C2410C", flexShrink: 0 }}>
                  {getInitials(c.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 6, background: tab === "employes" ? "#EFF6FF" : "#FFF7ED", color: tab === "employes" ? "#1D4ED8" : "#C2410C", flexShrink: 0, display: "flex", alignItems: "center", gap: 3 }}>
                      {tab === "employes" ? <><Briefcase size={10} /> Employé</> : <><Heart size={10} /> Famille</>}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{fmtPhone(c.phone)}</div>
                  {c.notes && <div style={{ fontSize: 11, color: "#D1D5DB", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.notes}</div>}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn-icon" onClick={() => window.location.href = `tel:${c.phone.replace(/\s/g, "")}`}><Phone size={15} /></button>
                  <button className="btn-icon danger" disabled={deletingId === c.id} onClick={() => deleteContact(c.id)}><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={() => { setAddContactType(tab === "employes" ? "employe" : "famille"); setAddContactOpen(true) }}>
              <Plus size={18} />
              Ajouter {tab === "employes" ? "un employé" : "un contact famille"}
            </button>
          </div>
        )}

        {/* ── SIDE MENU ── */}
        {menuOpen && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200 }} />
            <div style={{ position: "fixed", top: 0, left: 0, height: "100%", width: 300, background: "#111827", zIndex: 201, display: "flex", flexDirection: "column", animation: "slideLeft .25s ease" }}>
              {/* Menu Header */}
              <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Phone size={20} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Réceptionniste IA</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>PremiumArtisan</div>
                  </div>
                </div>
                <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4 }}>
                  <X size={20} />
                </button>
              </div>

              {/* Minutes */}
              <div style={{ padding: 16 }}>
                <div style={{ background: "#1F2937", borderRadius: 16, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Clock size={20} color="#3B82F6" />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "#9CA3AF" }}>Minutes restantes</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
                        {subscription ? subscription.minutes_remaining : "—"}
                      </div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", overflow: "hidden", marginBottom: 6 }}>
                    <div style={{ height: "100%", borderRadius: 3, background: "#3B82F6", width: `${minPct}%`, transition: "width .5s" }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>
                    {subscription ? `${subscription.minutes_total} minutes / mois` : "Aucun forfait actif"}
                  </div>
                </div>
              </div>

              {/* Upgrade */}
              <a href="/artisan/receptionist/pricing" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 16px", padding: "13px 16px", borderRadius: 12, background: "#1F2937", textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Zap size={18} color="#F59E0B" />
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Passer à {planLabel === "Business" ? "Pro" : "Pro"}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6, background: "#3B82F6", color: "#fff" }}>Upgrade</span>
              </a>

              {/* Spacer */}
              <div style={{ flex: 1 }} />

              {/* Logout */}
              <button onClick={logout} style={{ margin: "16px", padding: "13px 16px", borderRadius: 12, border: "none", background: "rgba(239,68,68,0.1)", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontFamily: "inherit" }}>
                <LogOut size={18} color="#EF4444" />
                <span style={{ fontSize: 14, fontWeight: 600, color: "#EF4444" }}>Déconnexion</span>
              </button>
            </div>
          </>
        )}

        {/* ── CALL DETAIL ── */}
        {detailOpen && selectedCall && (
          <div onClick={() => setDetailOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 500, maxHeight: "85vh", overflowY: "auto", animation: "slideUp .3s ease" }}>

              {/* Header */}
              <div style={{ padding: "20px 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#fff", borderBottom: "1px solid #F3F4F6", zIndex: 1 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111" }}>Détail de l&apos;appel</h2>
                <button onClick={() => setDetailOpen(false)} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "#F3F4F6", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
              </div>

              <div style={{ padding: "16px 20px" }}>
                {/* 5 info cards */}
                <div style={{ display: "grid", gap: 8, marginBottom: 20 }}>
                  {[
                    { label: "Client",    val: selectedCall.name },
                    { label: "Téléphone", val: selectedCall.phone ? fmtPhone(selectedCall.phone) : "Non renseigné" },
                    { label: "Adresse",   val: selectedCall.address || "Non renseignée" },
                    { label: "Problème",  val: selectedCall.problem || "Non renseigné" },
                    { label: "Durée",     val: fmtDur(selectedCall.dur) },
                  ].map(item => (
                    <div key={item.label} style={{ padding: "12px 14px", background: "#F8F9FA", borderRadius: 12 }}>
                      <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>{item.val}</div>
                    </div>
                  ))}
                </div>

                {/* Transcript */}
                {selectedCall.transcript.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>
                      Transcription IA
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {selectedCall.transcript.map((msg, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, flexDirection: msg.role === "ai" ? "row" : "row-reverse" }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: msg.role === "ai" ? "#3B82F6" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: msg.role === "ai" ? "#fff" : "#6B7280", letterSpacing: 0.3 }}>
                            {msg.role === "ai" ? "IA" : "C"}
                          </div>
                          <div style={{ maxWidth: "75%", background: msg.role === "ai" ? "#3B82F6" : "#F3F4F6", borderRadius: msg.role === "ai" ? "4px 16px 16px 16px" : "16px 4px 16px 16px", padding: "10px 14px" }}>
                            <p style={{ fontSize: 13, color: msg.role === "ai" ? "#fff" : "#111", lineHeight: 1.5, margin: 0 }}>{msg.text}</p>
                            <p style={{ fontSize: 10, color: msg.role === "ai" ? "rgba(255,255,255,0.6)" : "#9CA3AF", marginTop: 4, marginBottom: 0 }}>{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Sticky action buttons */}
              <div style={{ position: "sticky", bottom: 0, background: "#fff", borderTop: "1px solid #F3F4F6", padding: "12px 20px 20px" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <a href={selectedCall.phone ? "tel:" + selectedCall.phone.replace(/\s/g, "") : "#"}
                    style={{ flex: 1, padding: 14, borderRadius: 12, background: "#3B82F6", color: "#fff", fontSize: 15, fontWeight: 600, textAlign: "center", textDecoration: "none", display: "block" }}>
                    Appeler
                  </a>
                  <button onClick={() => markDone(selectedCall.id)}
                    style={{ flex: 1, padding: 14, borderRadius: 12, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    Marquer traité
                  </button>
                  <button onClick={() => { if (confirm("Supprimer cet appel ?")) deleteCall(selectedCall.id) }}
                    style={{ width: 48, height: 48, borderRadius: 12, border: "1px solid #FEE2E2", background: "#FFF5F5", color: "#DC2626", fontSize: 20, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ADD CONTACT MODAL ── */}
        {addContactOpen && (
          <div onClick={e => { if (e.target === e.currentTarget) setAddContactOpen(false) }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end" }}>
            <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: 24, width: "100%", animation: "slideUp .25s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 17, fontWeight: 700 }}>
                  Ajouter {addContactType === "employe" ? "un employé" : "un contact famille"}
                </span>
                <button onClick={() => setAddContactOpen(false)} className="btn-icon"><X size={18} /></button>
              </div>
              {[
                { label: "Prénom et nom *", value: cName, set: setCName, placeholder: "Michel Dupont", type: "text" },
                { label: "Téléphone *", value: cPhone, set: setCPhone, placeholder: "06 12 34 56 78", type: "tel" },
                { label: "Note (optionnel)", value: cNotes, set: setCNotes, placeholder: "Chef de chantier", type: "text" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #E5E7EB", fontSize: 15, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
              ))}
              <button className="btn-primary" disabled={saving || !cName.trim() || !cPhone.trim()}
                style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 15, borderRadius: 14, opacity: saving || !cName.trim() || !cPhone.trim() ? 0.5 : 1 }}
                onClick={addContact}>
                {saving ? "Enregistrement..." : "Ajouter"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}