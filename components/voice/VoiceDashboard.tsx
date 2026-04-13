"use client"

import { useState } from "react"

type CallStatus = "nouveau" | "vu" | "rappelé" | "devis" | "terminé"

interface Call {
  id: string
  dt: string
  name: string
  phone: string
  postal: string
  type: string
  problem: string
  urgent: boolean
  avail: string
  status: CallStatus
  dur: number
  slot: "heures" | "hors_heures" | "weekend" | "ferie"
  isnew: boolean
}

const ST: Record<CallStatus, { l: string; cls: string }> = {
  nouveau:   { l: "Nouveau",  cls: "new" },
  vu:        { l: "Vu",       cls: "vu"  },
  "rappelé": { l: "Rappelé",  cls: "rap" },
  devis:     { l: "Devis",    cls: "dev" },
  "terminé": { l: "Terminé",  cls: "ter" },
}

const SLOT: Record<string, string> = {
  heures:      "Heures ouvrées",
  hors_heures: "Hors horaires",
  weekend:     "Week-end",
  ferie:       "Jour férié",
}

const MOCK: Call[] = [
  {
    id: "1", dt: "2026-04-13T08:42:00",
    name: "Marie Dupont", phone: "06 12 34 56 78", postal: "21000 Dijon",
    type: "Plomberie",
    problem: "Fuite sous l'évier de la cuisine, eau qui coule depuis ce matin. Appartement au 3ème étage, locataire. Propriétaire prévenu mais injoignable.",
    urgent: true, avail: "Ce matin si possible",
    status: "nouveau", dur: 142, slot: "heures", isnew: true,
  },
  {
    id: "2", dt: "2026-04-13T07:18:00",
    name: "Thomas Bernard", phone: "07 98 76 54 32", postal: "21300 Chenôve",
    type: "Peinture",
    problem: "Peinture salon et chambre principale, environ 45 m², intérieur. Délai souhaité 3 semaines. Logement vide pendant travaux.",
    urgent: false, avail: "Samedi matin pour visite",
    status: "nouveau", dur: 98, slot: "heures", isnew: true,
  },
  {
    id: "3", dt: "2026-04-12T23:05:00",
    name: "Inconnu", phone: "06 55 44 33 22", postal: "21000 Dijon",
    type: "Plomberie",
    problem: "Chauffe-eau en panne, plus d'eau chaude depuis hier soir. Appel hors horaires — message enregistré, rappel souhaité en urgence.",
    urgent: true, avail: "Dès que possible",
    status: "rappelé", dur: 87, slot: "hors_heures", isnew: true,
  },
  {
    id: "4", dt: "2026-04-11T14:30:00",
    name: "Sophie Martin", phone: "06 11 22 33 44", postal: "21000 Dijon",
    type: "Peinture",
    problem: "Ravalement façade maison individuelle, surface estimée 120 m². Souhaite devis détaillé avec planning.",
    urgent: false, avail: "Semaine prochaine",
    status: "devis", dur: 203, slot: "heures", isnew: false,
  },
  {
    id: "5", dt: "2026-04-10T16:45:00",
    name: "Pierre Leroy", phone: "07 66 55 44 33", postal: "21600 Longvic",
    type: "Plomberie",
    problem: "Robinet qui fuit salle de bain depuis quelques jours. Pas urgent, disponible en semaine.",
    urgent: false, avail: "Pas pressé",
    status: "terminé", dur: 75, slot: "heures", isnew: false,
  },
]

function fmtDt(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    weekday: "short", day: "2-digit", month: "short",
    hour: "2-digit", minute: "2-digit",
  })
}
function fmtDur(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}
function fmtDurLong(s: number) {
  return `${Math.floor(s / 60)} min ${s % 60} sec`
}

const BS: Record<string, React.CSSProperties> = {
  new: { color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0" },
  vu:  { color: "#5b50d6", background: "#f5f3ff", border: "1px solid #ddd6fe" },
  rap: { color: "#b45309", background: "#fffbeb", border: "1px solid #fde68a" },
  dev: { color: "#1d4ed8", background: "#eff6ff", border: "1px solid #bfdbfe" },
  ter: { color: "#6b7280", background: "#f9fafb", border: "1px solid #e5e7eb" },
  urg: { color: "#c00",    background: "#fff0f0", border: "1px solid #ffd0d0" },
}

function Badge({ type, label }: { type: string; label: string }) {
  return (
    <span style={{
      ...BS[type], display: "inline-block", fontSize: 8, fontWeight: 700,
      borderRadius: 2, padding: "2px 5px",
      textTransform: "uppercase", letterSpacing: ".03em", whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 8, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: ".1em", color: "#bbb",
      display: "flex", alignItems: "center", gap: 6, marginBottom: 7,
    }}>
      {children}
      <div style={{ flex: 1, height: 1, background: "#eee" }} />
    </div>
  )
}

function CallRow({ call, selected, onClick }: {
  call: Call; selected: boolean; onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: selected ? "9px 10px 9px 9px" : "9px 10px 9px 12px",
        borderBottom: "1px solid #f0ede6",
        borderLeft: selected ? "3px solid #111" : "3px solid transparent",
        background: selected ? "#fffef5" : "transparent",
        cursor: "pointer", position: "relative", transition: "background .1s",
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
        background: call.urgent ? "#c00" : call.isnew ? "#16a34a" : "transparent",
      }} />
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 3 }}>
        <Badge type={ST[call.status].cls} label={ST[call.status].l} />
        {call.urgent && <Badge type="urg" label="Urgent" />}
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#111", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {call.name}
      </div>
      <div style={{ fontSize: 10, color: "#bbb", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {call.type} · {call.postal}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4, gap: 4 }}>
        <span style={{ fontSize: 9, color: "#ccc", fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {fmtDt(call.dt)}
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#111", flexShrink: 0 }}>
          {fmtDur(call.dur)}
        </span>
      </div>
    </div>
  )
}

function CallDetail({ call, onStatusChange }: {
  call: Call; onStatusChange: (id: string, s: CallStatus) => void
}) {
  const [dropOpen, setDropOpen] = useState(false)
  const cost = (call.dur / 60 * 0.18).toFixed(2)

  return (
    <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
      <div style={{ borderBottom: "2px solid #111", paddingBottom: 11 }}>
        <div style={{
          fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 800,
          letterSpacing: "-.02em", color: "#111",
          display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 3,
        }}>
          {call.name}
          {call.urgent && <Badge type="urg" label="⚠ Urgent" />}
          <Badge type={ST[call.status].cls} label={ST[call.status].l} />
        </div>
        <div style={{ fontSize: 10, color: "#999", lineHeight: 1.8 }}>
          <strong>{fmtDt(call.dt)}</strong>{" · "}
          <strong>{SLOT[call.slot]}</strong>{" · "}
          {call.isnew
            ? <span style={{ color: "#16a34a", fontWeight: 700 }}>● Nouveau</span>
            : <span style={{ color: "#ccc" }}>Déjà vu</span>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #e8e4d8" }}>
        {[
          { label: "Durée appel IA", val: fmtDur(call.dur), sub: fmtDurLong(call.dur) },
          { label: "Coût IA estimé", val: `€${cost}`, sub: "@ €0.18/min" },
        ].map((b, i) => (
          <div key={i} style={{ padding: "9px 10px", borderRight: i === 0 ? "1px solid #e8e4d8" : "none", textAlign: "center" }}>
            <div style={{ fontSize: 8, color: "#bbb", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>{b.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#111", lineHeight: 1 }}>{b.val}</div>
            <div style={{ fontSize: 9, color: "#bbb", marginTop: 2 }}>{b.sub}</div>
          </div>
        ))}
      </div>

      <div>
        <SectionTitle>Informations client</SectionTitle>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #e8e4d8", fontSize: 11 }}>
          <tbody>
            {[
              { k: "Téléphone", v: <a href={`tel:${call.phone.replace(/\s/g, "")}`} style={{ color: "#111", fontWeight: 600, textDecoration: "none" }}>{call.phone}</a> },
              { k: "Localisation",  v: call.postal },
              { k: "Travaux",       v: call.type },
              { k: "Disponibilité", v: call.avail },
              { k: "Durée", v: <><strong>{fmtDur(call.dur)}</strong> — {fmtDurLong(call.dur)}</> },
            ].map((row) => (
              <tr key={row.k} style={{ borderBottom: "1px solid #ede9e0" }}>
                <td style={{ padding: "6px 10px", fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "#bbb", width: "36%", background: "#faf9f4", borderRight: "1px solid #ede9e0" }}>{row.k}</td>
                <td style={{ padding: "6px 10px" }}>{row.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <SectionTitle>Transcription IA</SectionTitle>
        <div style={{ background: "#fff", border: "1px solid #e8e4d8", padding: "11px 13px", fontSize: 12, color: "#444", lineHeight: 1.75 }}>
          {call.problem}
        </div>
      </div>

      <div>
        <SectionTitle>Statut</SectionTitle>
        <div style={{ position: "relative" }}>
          <button onClick={() => setDropOpen(!dropOpen)} style={{ width: "100%", padding: "7px 12px", background: "#fff", border: "1px solid #ddd", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "#888", cursor: "pointer", textAlign: "left", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{ST[call.status].l}</span><span>▾</span>
          </button>
          {dropOpen && (
            <div style={{ position: "absolute", bottom: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #ddd", zIndex: 99 }}>
              {(Object.keys(ST) as CallStatus[]).map((s) => (
                <div key={s} onClick={() => { onStatusChange(call.id, s); setDropOpen(false) }}
                  style={{ padding: "7px 12px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", cursor: "pointer", color: call.status === s ? "#111" : "#888", background: call.status === s ? "#faf9f4" : "#fff", display: "flex", justifyContent: "space-between" }}>
                  <span>{ST[s].l}</span>
                  {call.status === s && <span>✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <SectionTitle>Actions</SectionTitle>
        <div style={{ display: "flex", gap: 6 }}>
          <a href={`tel:${call.phone.replace(/\s/g, "")}`} style={{ flex: 1, padding: "9px 4px", textAlign: "center", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", textDecoration: "none", background: "#111", color: "#fff" }}>
            📞 Rappeler
          </a>
          <a href={`https://wa.me/33${call.phone.replace(/\s/g, "").replace(/^0/, "")}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: "9px 4px", textAlign: "center", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", textDecoration: "none", background: "#25d366", color: "#fff" }}>
            WhatsApp
          </a>
          <button style={{ flex: 1, padding: "9px 4px", textAlign: "center", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", background: "#fff", color: "#111", border: "2px solid #111", cursor: "pointer", fontFamily: "inherit" }}>
            Devis
          </button>
        </div>
      </div>
    </div>
  )
}

type FilterKey = "all" | "new" | "urg"

export default function VoiceDashboard() {
  const [calls, setCalls] = useState<Call[]>(MOCK)
  const [selId, setSelId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterKey>("all")

  const selected  = calls.find((c) => c.id === selId) ?? null
  const newCount  = calls.filter((c) => c.isnew).length
  const urgCount  = calls.filter((c) => c.urgent).length
  const list      = filter === "new" ? calls.filter((c) => c.isnew) : filter === "urg" ? calls.filter((c) => c.urgent) : calls
  const newOnes   = list.filter((c) => c.isnew)
  const oldOnes   = list.filter((c) => !c.isnew)
  const showDivider = filter === "all" && newOnes.length > 0 && oldOnes.length > 0

  function handleStatusChange(id: string, s: CallStatus) {
    setCalls((prev) => prev.map((c) => (c.id === id ? { ...c, status: s } : c)))
  }

  const stats: { key: FilterKey; label: string; value: number; color?: string }[] = [
    { key: "all", label: "Tous les appels", value: calls.length },
    { key: "new", label: "Nouveaux",        value: newCount, color: "#16a34a" },
    { key: "urg", label: "Urgents",         value: urgCount, color: "#c00" },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .vd-stat:hover { background: #f5f3ec !important; }
        .vd-row:hover  { background: #faf9f4 !important; }
      `}</style>

      <div style={{ fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "#fff", color: "#111" }}>

        <div style={{ borderBottom: "2.5px solid #111", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, background: "#fff" }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 800, letterSpacing: "-.02em" }}>Réceptionniste IA</span>
            <span style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: ".12em", fontWeight: 600, marginLeft: 8 }}>PremiumArtisan</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "#888" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span>Actif 24/7</span>
            <span style={{ color: "#e0e0e0", margin: "0 5px" }}>|</span>
            <span>Jean-Marc · Plomberie</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderBottom: "1px solid #e8e4d8", background: "#fffef9", flexShrink: 0 }}>
          {stats.map((s, i) => (
            <div key={s.key} className="vd-stat" onClick={() => setFilter(s.key)}
              style={{ padding: "10px 6px", textAlign: "center", cursor: "pointer", borderRight: i < 2 ? "1px solid #e8e4d8" : "none", background: filter === s.key ? "#111" : undefined, transition: "background .12s", userSelect: "none" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, lineHeight: 1, color: filter === s.key ? "#fff" : (s.color ?? "#111") }}>{s.value}</div>
              <div style={{ fontSize: 9, color: filter === s.key ? "#aaa" : "#bbb", textTransform: "uppercase", letterSpacing: ".07em", marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(140px,280px) 1fr", flex: 1, overflow: "hidden" }}>

          <div style={{ borderRight: "1px solid #e8e4d8", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "8px 12px", borderBottom: "2px solid #111", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, fontWeight: 700 }}>
                {{ all: "Tous", new: "Nouveaux", urg: "Urgents" }[filter]}
              </span>
              <span style={{ fontSize: 9, color: "#ccc" }}>{list.length}</span>
            </div>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {list.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "#ddd", fontSize: 11, fontStyle: "italic" }}>Aucun appel</div>}
              {showDivider ? (
                <>
                  {newOnes.map((c) => <CallRow key={c.id} call={c} selected={selId === c.id} onClick={() => setSelId(c.id)} />)}
                  <div style={{ display: "flex", alignItems: "center", padding: "0 12px", height: 20, position: "relative" }}>
                    <div style={{ position: "absolute", left: 12, right: 12, top: "50%", height: 1.5, background: "#111" }} />
                    <span style={{ position: "relative", background: "#fff", padding: "0 6px", fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".09em", color: "#bbb", marginLeft: "auto" }}>
                      Appels précédents
                    </span>
                  </div>
                  {oldOnes.map((c) => <CallRow key={c.id} call={c} selected={selId === c.id} onClick={() => setSelId(c.id)} />)}
                </>
              ) : (
                list.map((c) => <CallRow key={c.id} call={c} selected={selId === c.id} onClick={() => setSelId(c.id)} />)
              )}
            </div>
          </div>

          <div style={{ background: "#fffef9", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {selected ? (
              <CallDetail call={selected} onStatusChange={handleStatusChange} />
            ) : (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#ddd", gap: 8 }}>
                <div style={{ fontSize: 28, opacity: .2 }}>📋</div>
                <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#ccc" }}>Sélectionnez un appel</div>
                <div style={{ fontSize: 10, color: "#ddd" }}>{newCount} nouveaux depuis votre dernière visite</div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}