'use client'
// app/artisan/factures-electroniques/parametres/ParametresPage.tsx

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { UserCircle, Pencil, Building2, FileText, Bell, Loader2, Check } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabaseBrowser'
import BottomNav from '../components/BottomNav'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]
const sectionItem    = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOutExpo } } }
const sectionStagger = { visible: { transition: { staggerChildren: 0.08 } } }

function ToggleRow({ label, description, checked, onChange }: {
  label: string; description?: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: 14, color: '#4D433A', fontWeight: 500 }}>{label}</p>
        {description && <p style={{ fontSize: 12, color: '#A89B8C', marginTop: 2 }}>{description}</p>}
      </div>
      <div onClick={() => onChange(!checked)}
        style={{ width: 44, height: 24, borderRadius: 999, cursor: 'pointer', flexShrink: 0, marginTop: 2, position: 'relative', background: checked ? '#E87E1A' : '#D1C7BB', transition: 'background 0.2s' }}>
        <div style={{ position: 'absolute', top: 3, left: checked ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
      </div>
    </div>
  )
}

function StyledInput({ value, onChange, type = 'text', placeholder }: {
  value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full outline-none"
      style={{ height: 48, borderRadius: 14, border: '1.5px solid #E6DFD6', background: '#FFFFFF', fontSize: 15, color: '#332B25', padding: '0 16px', fontFamily: 'inherit', transition: 'all 0.15s' }}
      onFocus={e => { e.currentTarget.style.borderColor = '#E87E1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,126,26,0.15)' }}
      onBlur={e  => { e.currentTarget.style.borderColor = '#E6DFD6'; e.currentTarget.style.boxShadow = 'none' }} />
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#8C7D6E', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' as const }}>{children}</label>
}

function GlassSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={sectionItem}
      style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(230,223,214,0.7)', borderRadius: 16, padding: 20, backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(26,22,20,0.06)' }}>
      {children}
    </motion.div>
  )
}

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      {icon}
      <h2 style={{ fontSize: 16, fontWeight: 700, color: '#4D433A' }}>{label}</h2>
    </div>
  )
}

export default function ParametresPage() {
  const [loading, setLoading]   = useState(true)
  const [saving,  setSaving]    = useState(false)
  const [saved,   setSaved]     = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const [profile, setProfile] = useState({
    prenom: '', nom: '', phone: '', metier: '', email: '',
    postal_code: '', city: '', adresse: '', siret: '',
  })
  const [facturation, setFacturation] = useState({
    tva_defaut: '10', conditions_paiement: '30', pied_page: '',
  })
  const [notifs, setNotifs] = useState({
    notif_paiement: true, notif_consultee: false, notif_rappels: true,
  })

  const getToken = useCallback(async () => {
    const supabase = createSupabaseBrowserClient()
    const { data: { session } } = await supabase.auth.getSession()
    setUserEmail(session?.user?.email ?? '')
    return session?.access_token ?? null
  }, [])

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const token = await getToken()
        const res   = await fetch('/api/artisan/parametres', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        const json = await res.json()
        if (json.ok && json.profile) {
          const p = json.profile
          setProfile({
            prenom:      p.prenom      ?? '',
            nom:         p.nom         ?? '',
            phone:       p.phone       ?? '',
            metier:      p.metier      ?? '',
            email:       p.email       ?? '',
            postal_code: p.postal_code ?? '',
            city:        p.city        ?? '',
            adresse:     p.adresse     ?? '',
            siret:       p.siret       ?? '',
          })
          setFacturation({
            tva_defaut:           p.tva_defaut           ?? '10',
            conditions_paiement:  p.conditions_paiement  ?? '30',
            pied_page:            p.pied_page            ?? '',
          })
          setNotifs({
            notif_paiement:  p.notif_paiement  ?? true,
            notif_consultee: p.notif_consultee ?? false,
            notif_rappels:   p.notif_rappels   ?? true,
          })
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [getToken])

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      const token = await getToken()
      const res   = await fetch('/api/artisan/parametres', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ ...profile, ...facturation, ...notifs }),
      })
      const json = await res.json()
      if (json.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      }
    } finally {
      setSaving(false)
    }
  }, [profile, facturation, notifs, getToken])

  const initials = `${profile.prenom?.[0] ?? ''}${profile.nom?.[0] ?? ''}`.toUpperCase() || 'ME'

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', backgroundColor: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={32} style={{ color: '#E87E1A', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#FAF8F5', paddingBottom: 80 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

      {/* Toast */}
      {saved && (
        <div style={{ position: 'fixed', top: 70, left: '50%', transform: 'translateX(-50%)', zIndex: 100, background: '#22C55E', color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Check size={16} /> Enregistre avec succes
        </div>
      )}

      {/* Navbar */}
      <motion.header initial={{ y: -56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: easeOutExpo }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{ height: 56, background: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(230,223,214,0.4)' }}>
        <h1 style={{ fontSize: 16, fontWeight: 600, color: '#4D433A' }}>Parametres</h1>
        <button onClick={handleSave} disabled={saving}
          style={{ padding: '8px 18px', borderRadius: 10, background: saving ? '#D1C7BB' : 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#fff', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
          {saving ? <Loader2 size={14} style={{ animation: 'spin 0.8s linear infinite' }} /> : null}
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </motion.header>

      <div style={{ paddingTop: 70 }}>
        <div className="px-4 pb-6 max-w-3xl mx-auto">
          <motion.div variants={sectionStagger} initial="hidden" animate="visible" className="flex flex-col gap-5">

            {/* Profil */}
            <GlassSection>
              <SectionTitle icon={<UserCircle size={22} style={{ color: '#E87E1A' }} />} label="Mon profil" />
              <div className="flex items-center gap-4 mb-5">
                <div className="relative flex-shrink-0">
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#fff', border: '3px solid #FDEBD2' }}>
                    {initials}
                  </div>
                  <div style={{ position: 'absolute', bottom: -2, right: -2, width: 28, height: 28, borderRadius: '50%', background: '#FFFFFF', border: '2px solid #FDEBD2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Pencil size={14} style={{ color: '#E87E1A' }} />
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#4D433A' }}>{profile.prenom || profile.nom ? `${profile.prenom} ${profile.nom}`.trim() : 'Mon profil'}</p>
                  <p style={{ fontSize: 13, color: '#8C7D6E' }}>{profile.metier || 'Artisan'}</p>
                  <p style={{ fontSize: 12, color: '#A89B8C' }}>{userEmail}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Prenom</Label><StyledInput value={profile.prenom} onChange={v => setProfile(p => ({ ...p, prenom: v }))} placeholder="Jean" /></div>
                <div><Label>Nom</Label><StyledInput value={profile.nom} onChange={v => setProfile(p => ({ ...p, nom: v }))} placeholder="Dupont" /></div>
                <div><Label>Metier</Label><StyledInput value={profile.metier} onChange={v => setProfile(p => ({ ...p, metier: v }))} placeholder="Peintre" /></div>
                <div><Label>Telephone</Label><StyledInput type="tel" value={profile.phone} onChange={v => setProfile(p => ({ ...p, phone: v }))} placeholder="+33 6 12 34 56 78" /></div>
              </div>
            </GlassSection>

            {/* Entreprise */}
            <GlassSection>
              <SectionTitle icon={<Building2 size={22} style={{ color: '#E87E1A' }} />} label="Mon entreprise" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><Label>SIRET</Label><StyledInput value={profile.siret} onChange={v => setProfile(p => ({ ...p, siret: v }))} placeholder="41234567800012" /></div>
                <div className="sm:col-span-2"><Label>Adresse</Label><StyledInput value={profile.adresse} onChange={v => setProfile(p => ({ ...p, adresse: v }))} placeholder="12 rue des Artisans" /></div>
                <div><Label>Code postal</Label><StyledInput value={profile.postal_code} onChange={v => setProfile(p => ({ ...p, postal_code: v }))} placeholder="21000" /></div>
                <div><Label>Ville</Label><StyledInput value={profile.city} onChange={v => setProfile(p => ({ ...p, city: v }))} placeholder="Dijon" /></div>
              </div>
            </GlassSection>

            {/* Facturation */}
            <GlassSection>
              <SectionTitle icon={<FileText size={22} style={{ color: '#E87E1A' }} />} label="Facturation" />
              <div className="flex flex-col gap-4">
                <div>
                  <Label>TVA par defaut</Label>
                  <select value={facturation.tva_defaut} onChange={e => setFacturation(f => ({ ...f, tva_defaut: e.target.value }))}
                    style={{ width: '100%', height: 48, borderRadius: 14, border: '1.5px solid #E6DFD6', background: '#FFFFFF', fontSize: 15, color: '#332B25', padding: '0 16px', fontFamily: 'inherit', outline: 'none' }}>
                    <option value="20">20% — standard</option>
                    <option value="10">10% — travaux</option>
                    <option value="5.5">5,5% — renovation</option>
                    <option value="0">0% — export</option>
                  </select>
                </div>
                <div>
                  <Label>Conditions de paiement</Label>
                  <select value={facturation.conditions_paiement} onChange={e => setFacturation(f => ({ ...f, conditions_paiement: e.target.value }))}
                    style={{ width: '100%', height: 48, borderRadius: 14, border: '1.5px solid #E6DFD6', background: '#FFFFFF', fontSize: 15, color: '#332B25', padding: '0 16px', fontFamily: 'inherit', outline: 'none' }}>
                    <option value="0">A reception</option>
                    <option value="15">15 jours</option>
                    <option value="30">30 jours</option>
                    <option value="60">60 jours</option>
                  </select>
                </div>
                <div>
                  <Label>Pied de page</Label>
                  <textarea value={facturation.pied_page} onChange={e => setFacturation(f => ({ ...f, pied_page: e.target.value }))} rows={3}
                    placeholder="TVA applicable selon la legislation en vigueur..."
                    style={{ width: '100%', borderRadius: 14, border: '1.5px solid #E6DFD6', background: '#FFFFFF', fontSize: 15, color: '#332B25', padding: '12px 16px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', lineHeight: 1.55 }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#E87E1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,126,26,0.15)' }}
                    onBlur={e  => { e.currentTarget.style.borderColor = '#E6DFD6'; e.currentTarget.style.boxShadow = 'none' }} />
                </div>
              </div>
            </GlassSection>

            {/* Notifications */}
            <GlassSection>
              <SectionTitle icon={<Bell size={22} style={{ color: '#E87E1A' }} />} label="Notifications" />
              <div className="flex flex-col gap-0">
                <ToggleRow label="Facture payee" description="Email quand un client paie." checked={notifs.notif_paiement} onChange={v => setNotifs(n => ({ ...n, notif_paiement: v }))} />
                <div style={{ height: 1, background: '#E6DFD6', margin: '12px 0' }} />
                <ToggleRow label="Facture consultee" description="Quand le client ouvre la facture." checked={notifs.notif_consultee} onChange={v => setNotifs(n => ({ ...n, notif_consultee: v }))} />
                <div style={{ height: 1, background: '#E6DFD6', margin: '12px 0' }} />
                <ToggleRow label="Rappels retard" description="Paiements tardifs." checked={notifs.notif_rappels} onChange={v => setNotifs(n => ({ ...n, notif_rappels: v }))} />
              </div>
            </GlassSection>

            {/* Save bottom */}
            <button onClick={handleSave} disabled={saving}
              style={{ width: '100%', padding: '14px', borderRadius: 16, background: saving ? '#D1C7BB' : 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#fff', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 14px rgba(232,126,26,0.3)' }}>
              {saving ? <Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Check size={18} />}
              {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>

          </motion.div>
        </div>
      </div>

      <BottomNav active="parametres" />
    </div>
  )
}