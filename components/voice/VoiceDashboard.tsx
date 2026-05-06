"use client"

import { useState, useEffect, useCallback } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Phone, PhoneOutgoing, MapPin, Clock, Bell, AlertTriangle, X, User, Users, Heart, Home, Briefcase, Plus, Trash2, Zap, LogOut, Menu } from "lucide-react"

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
      const results = await Promise.allSettled([
        fetch("/api/artisan/calls").then(r => r.json()),
        fetch("/api/artisan/contacts").then(r => r.json()),
        (async () => {
          const sb = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
          const { data: { session } } = await sb.auth.getSession()
          const token = session?.access_token ?? ""
          return fetch("/api/marie/subscription", {
            headers: token ? { "Authorization": `Bearer ${token}` } : {}
          }).then(r => r.json())
        })(),
      ])
      const callsJson    = results[0].status === "fulfilled" ? results[0].value : {}
      const contactsJson = results[1].status === "fulfilled" ? results[1].value : {}
      const subJson      = results[2].status === "fulfilled" ? results[2].value : {}
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
            <button onClick={() => setMenuOpen(true)} style={{ background: "#F3F4F6", border: "none", cursor: "pointer", padding: 8, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Menu size={22} color="#374151" />
            </button>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111", lineHeight: 1.2 }}>Réceptionniste IA</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", display: "inline-block", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 12, color: "#16A34A" }}>IA en ligne</span>
              </div>
            </div>
          </div>

          <div style={{ width: 8 }} />
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

            {/* Info banner */}
            <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>
                {tab === "employes"
                  ? "Marie identifie vos employés depuis leur numéro. Leurs appels sont transmis sans formulaire — aucune information collectée."
                  : "Marie reconnaît votre famille et adapte son ton. Leurs messages vous sont transmis directement sans procédure formale."
                }
              </div>
            </div>

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

              {/* Avatar + email */}
              <div style={{ padding: "12px 16px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#1F2937", borderRadius: 12, marginBottom: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                    {userEmail ? userEmail[0].toUpperCase() : "A"}
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userEmail}</div>
                    <div style={{ fontSize: 11, color: "#6B7280", marginTop: 1 }}>Artisan</div>
                  </div>
                </div>
              </div>

              {/* Minutes card */}
              <div style={{ padding: "12px 16px" }}>
                <div style={{ background: "#1F2937", borderRadius: 14, padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Minutes restantes</div>
                      <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                        {subscription ? subscription.minutes_remaining : "—"}
                        <span style={{ fontSize: 13, fontWeight: 400, color: "#6B7280", marginLeft: 4 }}>min</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>Forfait</div>
                      <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: subscription?.status === "active" ? "#3B82F6" : "#374151", color: "#fff" }}>
                        {planLabel || "Inactif"}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 3, background: minPct > 20 ? "#3B82F6" : "#EF4444", width: `${minPct}%`, transition: "width .5s" }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#4B5563", marginTop: 6 }}>
                    {subscription ? `Sur ${subscription.minutes_total} min / mois` : "Aucun forfait actif"}
                  </div>
                </div>
              </div>

              {/* Navigation links */}
              <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 4 }}>
                <a href="/artisan/receptionist/pricing" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "#1F2937", textDecoration: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Zap size={16} color="#F59E0B" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#E5E7EB" }}>Mon forfait</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#6B7280" }}>→</span>
                </a>
                <a href="/artisan/receptionist/setup" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "#1F2937", textDecoration: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <User size={16} color="#9CA3AF" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#E5E7EB" }}>Profil & Configuration</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#6B7280" }}>→</span>
                </a>
                <a href="/artisan/dashboard" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "#1F2937", textDecoration: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Home size={16} color="#9CA3AF" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#E5E7EB" }}>Dashboard principal</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#6B7280" }}>→</span>
                </a>
              </div>

              <div style={{ flex: 1 }} />

              <button onClick={logout} style={{ margin: "16px 16px 4px", padding: "13px 16px", borderRadius: 12, border: "1px solid rgba(239,68,68,0.2)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontFamily: "inherit", width: "calc(100% - 32px)" }}>
                <LogOut size={16} color="#EF4444" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#EF4444" }}>Se déconnecter</span>
              </button>

              <button onClick={() => {
                if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
                  fetch("/api/artisan/delete-account", { method: "DELETE" })
                    .then(r => r.json())
                    .then(() => window.location.href = "/")
                    .catch(() => alert("Erreur lors de la suppression"))
                }
              }} style={{ margin: "0 16px 16px", padding: "13px 16px", borderRadius: 12, border: "1px solid rgba(239,68,68,0.1)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontFamily: "inherit", width: "calc(100% - 32px)" }}>
                <Trash2 size={16} color="#6B7280" />
                <span style={{ fontSize: 13, fontWeight: 500, color: "#6B7280" }}>Supprimer mon compte</span>
              </button>
            </div>
          </>
        )}

        {/* ── CALL DETAIL ── */}
        {detailOpen && selectedCall && (
          <div onClick={() => setDetailOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 500, maxHeight: "85vh", overflowY: "auto", animation: "slideUp .3s ease" }}>
              <div style={{ padding: "20px 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#fff", borderBottom: "1px solid #F3F4F6", zIndex: 1 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111" }}>Détail de l&apos;appel</h2>
                <button onClick={() => setDetailOpen(false)} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "#F3F4F6", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
              </div>

              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "grid", gap: 8, marginBottom: 20 }}>
                  {[
                    { label: "Client", val: selectedCall.name },
                    { label: "Téléphone", val: selectedCall.phone ? fmtPhone(selectedCall.phone) : "Non renseigné" },
                    { label: "Adresse", val: selectedCall.address || "Non renseignée" },
                    { label: "Problème", val: selectedCall.problem || "Non renseigné" },
                    { label: "Durée", val: fmtDur(selectedCall.dur) },
                  ].map(item => (
                    <div key={item.label} style={{ padding: "12px 14px", background: "#F8F9FA", borderRadius: 12 }}>
                      <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>{item.val}</div>
                    </div>
                  ))}
                </div>

                {selectedCall.transcript.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>
                      Transcription IA
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {selectedCall.transcript.map((msg, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, flexDirection: msg.role === "ai" ? "row-reverse" : "row" }}>
                          <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: msg.role === "ai" ? "#E8EFFD" : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: msg.role === "ai" ? "#3B82F6" : "#9CA3AF", letterSpacing: 0.3 }}>
                            {msg.role === "ai" ? "IA" : "C"}
                          </div>
                          <div style={{ maxWidth: "75%", background: msg.role === "ai" ? "#F0F4FF" : "#fff", border: msg.role === "ai" ? "1px solid #DBEAFE" : "1px solid #E5E7EB", borderRadius: msg.role === "ai" ? "16px 4px 16px 16px" : "4px 16px 16px 16px", padding: "10px 14px" }}>
                            <p style={{ fontSize: 13, color: "#111", lineHeight: 1.5, margin: 0 }}>{msg.text}</p>
                            <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 4, marginBottom: 0 }}>{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ position: "sticky", bottom: 0, background: "#fff", borderTop: "1px solid #F3F4F6", padding: "12px 20px 20px" }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <a href={selectedCall.phone ? "tel:" + selectedCall.phone.replace(/\s/g, "") : "#"}
                    style={{ flex: 1, padding: 14, borderRadius: 12, background: "#F3F4F6", color: "#374151", fontSize: 15, fontWeight: 600, textAlign: "center", textDecoration: "none", display: "block" }}>
                    Appeler
                  </a>
                  <button onClick={() => markDone(selectedCall.id)}
                    style={{ flex: 1, padding: 14, borderRadius: 12, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    Marquer traité
                  </button>
                  <button onClick={() => { if (confirm("Supprimer cet appel ?")) deleteCall(selectedCall.id) }}
                    style={{ width: 48, height: 48, borderRadius: 12, border: "1px solid #FEE2E2", background: "#FFF5F5", color: "#DC2626", fontSize: 20, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    ×
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