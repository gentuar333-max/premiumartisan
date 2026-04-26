'use client'
// app/artisan/factures-electroniques/parametres/ParametresPage.tsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserCircle, Pencil, Building2, FileText, Bell } from 'lucide-react'
import BottomNav from '../components/BottomNav'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const sectionItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOutExpo } },
}
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

function StyledInput({ value, onChange, type = 'text' }: { value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full outline-none"
      style={{ height: 48, borderRadius: 14, border: '1.5px solid #E6DFD6', background: '#FFFFFF', fontSize: 15, color: '#332B25', padding: '0 16px', fontFamily: 'inherit', transition: 'all 0.15s' }}
      onFocus={(e) => { e.currentTarget.style.borderColor = '#E87E1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,126,26,0.15)' }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = '#E6DFD6'; e.currentTarget.style.boxShadow = 'none' }} />
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
  const [profile, setProfile]       = useState({ prenom: 'Jean', nom: 'Dupont', email: 'jean.dupont@artisan.fr', telephone: '+33 6 12 34 56 78' })
  const [entreprise, setEntreprise] = useState({ raisonSociale: 'Dupont Renovation SARL', siret: '123 456 789 00012', adresse: '12 rue des Artisans', codePostal: '21000', ville: 'Dijon' })
  const [facturation, setFacturation] = useState({ tva: '10', conditions: '30', piedPage: 'TVA applicable selon la legislation en vigueur. TVA intracommunautaire: FR12 123456789.' })
  const [notifs, setNotifs]         = useState({ paiement: true, consultee: false, rappels: true })

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#FAF8F5', paddingBottom: 80 }}>

      {/* Navbar */}
      <motion.header initial={{ y: -56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: easeOutExpo }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4"
        style={{ height: 56, background: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(230,223,214,0.4)' }}>
        <h1 style={{ fontSize: 16, fontWeight: 600, color: '#4D433A' }}>Parametres</h1>
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
                    {profile.prenom[0]}{profile.nom[0]}
                  </div>
                  <button style={{ position: 'absolute', bottom: -2, right: -2, width: 28, height: 28, borderRadius: '50%', background: '#FFFFFF', border: '2px solid #FDEBD2', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Pencil size={14} style={{ color: '#E87E1A' }} />
                  </button>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#4D433A' }}>{profile.prenom} {profile.nom}</p>
                  <p style={{ fontSize: 13, color: '#8C7D6E' }}>Peintre & Renovateur</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Prenom</Label><StyledInput value={profile.prenom} onChange={(v) => setProfile((p) => ({ ...p, prenom: v }))} /></div>
                <div><Label>Nom</Label><StyledInput value={profile.nom} onChange={(v) => setProfile((p) => ({ ...p, nom: v }))} /></div>
                <div><Label>Email</Label><StyledInput type="email" value={profile.email} onChange={(v) => setProfile((p) => ({ ...p, email: v }))} /></div>
                <div><Label>Telephone</Label><StyledInput type="tel" value={profile.telephone} onChange={(v) => setProfile((p) => ({ ...p, telephone: v }))} /></div>
              </div>
              <div className="mt-5 flex justify-end">
                <button style={{ padding: '10px 24px', borderRadius: 14, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#FFFFFF', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(232,126,26,0.3)' }}>
                  Enregistrer
                </button>
              </div>
            </GlassSection>

            {/* Entreprise */}
            <GlassSection>
              <SectionTitle icon={<Building2 size={22} style={{ color: '#E87E1A' }} />} label="Mon entreprise" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><Label>Raison sociale</Label><StyledInput value={entreprise.raisonSociale} onChange={(v) => setEntreprise((e) => ({ ...e, raisonSociale: v }))} /></div>
                <div><Label>SIRET</Label><StyledInput value={entreprise.siret} onChange={(v) => setEntreprise((e) => ({ ...e, siret: v }))} /></div>
                <div><Label>Adresse</Label><StyledInput value={entreprise.adresse} onChange={(v) => setEntreprise((e) => ({ ...e, adresse: v }))} /></div>
                <div><Label>Code postal</Label><StyledInput value={entreprise.codePostal} onChange={(v) => setEntreprise((e) => ({ ...e, codePostal: v }))} /></div>
                <div><Label>Ville</Label><StyledInput value={entreprise.ville} onChange={(v) => setEntreprise((e) => ({ ...e, ville: v }))} /></div>
              </div>
            </GlassSection>

            {/* Facturation */}
            <GlassSection>
              <SectionTitle icon={<FileText size={22} style={{ color: '#E87E1A' }} />} label="Parametres de facturation" />
              <div className="flex flex-col gap-4">
                <div>
                  <Label>TVA par defaut</Label>
                  <select value={facturation.tva} onChange={(e) => setFacturation((f) => ({ ...f, tva: e.target.value }))}
                    style={{ width: '100%', height: 48, borderRadius: 14, border: '1.5px solid #E6DFD6', background: '#FFFFFF', fontSize: 15, color: '#332B25', padding: '0 16px', fontFamily: 'inherit', outline: 'none' }}>
                    <option value="20">20% — standard</option>
                    <option value="10">10% — travaux</option>
                    <option value="5.5">5,5% — renovation energetique</option>
                    <option value="0">0% — export</option>
                  </select>
                </div>
                <div>
                  <Label>Conditions de paiement par defaut</Label>
                  <select value={facturation.conditions} onChange={(e) => setFacturation((f) => ({ ...f, conditions: e.target.value }))}
                    style={{ width: '100%', height: 48, borderRadius: 14, border: '1.5px solid #E6DFD6', background: '#FFFFFF', fontSize: 15, color: '#332B25', padding: '0 16px', fontFamily: 'inherit', outline: 'none' }}>
                    <option value="0">A reception</option>
                    <option value="15">15 jours</option>
                    <option value="30">30 jours</option>
                    <option value="60">60 jours</option>
                  </select>
                </div>
                <div>
                  <Label>Texte de pied de page</Label>
                  <textarea value={facturation.piedPage} onChange={(e) => setFacturation((f) => ({ ...f, piedPage: e.target.value }))} rows={3}
                    style={{ width: '100%', borderRadius: 14, border: '1.5px solid #E6DFD6', background: '#FFFFFF', fontSize: 15, color: '#332B25', padding: '12px 16px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', lineHeight: 1.55 }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#E87E1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,126,26,0.15)' }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = '#E6DFD6'; e.currentTarget.style.boxShadow = 'none' }} />
                </div>
              </div>
            </GlassSection>

            {/* Notifications */}
            <GlassSection>
              <SectionTitle icon={<Bell size={22} style={{ color: '#E87E1A' }} />} label="Notifications" />
              <div className="flex flex-col gap-0">
                <ToggleRow label="Recevoir un email quand une facture est payee" description="Soyez informe des le paiement de vos factures."
                  checked={notifs.paiement} onChange={(v) => setNotifs((n) => ({ ...n, paiement: v }))} />
                <div style={{ height: 1, background: '#E6DFD6', margin: '12px 0' }} />
                <ToggleRow label="Recevoir un email quand une facture est consultee" description="Sachez quand votre client ouvre la facture."
                  checked={notifs.consultee} onChange={(v) => setNotifs((n) => ({ ...n, consultee: v }))} />
                <div style={{ height: 1, background: '#E6DFD6', margin: '12px 0' }} />
                <ToggleRow label="Rappels de factures en retard" description="Recevez des rappels pour les paiements tardifs."
                  checked={notifs.rappels} onChange={(v) => setNotifs((n) => ({ ...n, rappels: v }))} />
              </div>
            </GlassSection>

          </motion.div>
        </div>
      </div>

      <BottomNav active="parametres" />
    </div>
  )
}