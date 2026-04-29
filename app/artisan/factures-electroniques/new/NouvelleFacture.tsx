'use client'
// app/artisan/factures-electroniques/new/NouvelleFacture.tsx

import { useState, useCallback, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Plus, User, CalendarDays, Check } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import { FloatingInput, FloatingTextarea } from '../components/FloatingInput'
import ServiceItemRow from '../components/ServiceItemRow'
import TotalsCard from '../components/TotalsCard'
import { type ServiceItem, type FormData, getTodayDate, getDefaultDueDate, createEmptyService } from '../types'
import { createSupabaseBrowserClient } from '@/lib/supabaseBrowser'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]
const easeSpring:  [number, number, number, number] = [0.34, 1.56, 0.64, 1]

function isValidEmail(email: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) }
function isValidSiret(siret: string) { return /^\d{14}$/.test(siret.replace(/\s/g, '')) }

function SuccessOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
      style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)' }}>
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: easeSpring }}
        className="flex items-center justify-center rounded-full mb-6"
        style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#22C55E 0%,#16A34A 100%)' }}>
        <Check size={40} strokeWidth={3} style={{ color: '#FFFFFF' }} />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.35 }}
        style={{ fontSize: 24, fontWeight: 700, color: '#4D433A', marginBottom: 8, textAlign: 'center' }}>
        Facture envoyee !
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.35 }}
        style={{ fontSize: 14, color: '#8C7D6E', textAlign: 'center', marginBottom: 32, padding: '0 24px' }}>
        Votre client a recu la facture par email.
      </motion.p>
      <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.35 }}
        whileTap={{ scale: 0.96 }} onClick={onClose}
        style={{ padding: '12px 32px', borderRadius: 14, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#FFFFFF', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(232,126,26,0.3)' }}>
        Retour aux factures
      </motion.button>
    </motion.div>
  )
}

export default function NouvelleFacture() {
  const router       = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const clientParam = searchParams.get('client')
    if (clientParam) {
      try {
        const c = JSON.parse(decodeURIComponent(clientParam))
        setFormData(prev => ({
          ...prev,
          client: {
            companyName: c.companyName ?? '',
            siret:       c.siret       ?? '',
            email:       c.email       ?? '',
            address:     c.address     ?? '',
          }
        }))
      } catch {}
    }
  }, [searchParams])
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    client: { companyName: '', siret: '', email: '', address: '' },
    dates:  { invoiceDate: getTodayDate(), dueDate: getDefaultDueDate() },
    services: [createEmptyService()],
    notes: '',
  })
  const [touched, setTouched]   = useState<Record<string, boolean>>({})
  const [errors,  setErrors]    = useState<Record<string, string>>({})

  const duePresets = [
    { label: '15 jours', days: 15 },
    { label: '30 jours', days: 30 },
    { label: '45 jours', days: 45 },
    { label: '60 jours', days: 60 },
  ]

  const applyDuePreset = (days: number) => {
    const d = new Date(formData.dates.invoiceDate)
    d.setDate(d.getDate() + days)
    setFormData((prev) => ({ ...prev, dates: { ...prev.dates, dueDate: d.toISOString().split('T')[0] } }))
  }

  const updateClient = useCallback((field: keyof FormData['client'], value: string) => {
    setFormData((prev) => ({ ...prev, client: { ...prev.client, [field]: value } }))
    setErrors((prev) => { const n = { ...prev }; delete n[`client.${field}`]; return n })
  }, [])

  const updateDate = useCallback((field: keyof FormData['dates'], value: string) => {
    setFormData((prev) => ({ ...prev, dates: { ...prev.dates, [field]: value } }))
  }, [])

  const addService    = useCallback(() => setFormData((prev) => ({ ...prev, services: [...prev.services, createEmptyService()] })), [])
  const updateService = useCallback((id: string, updates: Partial<ServiceItem>) =>
    setFormData((prev) => ({ ...prev, services: prev.services.map((s) => s.id === id ? { ...s, ...updates } : s) })), [])
  const removeService = useCallback((id: string) =>
    setFormData((prev) => ({ ...prev, services: prev.services.length <= 1 ? prev.services : prev.services.filter((s) => s.id !== id) })), [])

  const { totalHT, totalTVA, totalTTC, tvaBreakdown } = useMemo(() => {
    let ht = 0
    const tvaMap: Record<number, number> = {}
    for (const s of formData.services) {
      const lineHT = s.quantity * s.unitPrice
      ht += lineHT
      const lineTVA = lineHT * (s.tvaRate / 100)
      if (s.tvaRate > 0) tvaMap[s.tvaRate] = (tvaMap[s.tvaRate] || 0) + lineTVA
    }
    const tvaEntries = Object.entries(tvaMap).map(([rate, amount]) => ({ rate: Number(rate), amount }))
    const tvaTotal   = tvaEntries.reduce((sum, e) => sum + e.amount, 0)
    return { totalHT: ht, totalTVA: tvaTotal, totalTTC: ht + tvaTotal, tvaBreakdown: tvaEntries }
  }, [formData.services])

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.client.companyName.trim()) newErrors['client.companyName'] = "Le nom de l'entreprise est requis"
    if (!formData.client.siret.trim())       newErrors['client.siret']       = 'Le numero SIRET est requis'
    else if (!isValidSiret(formData.client.siret)) newErrors['client.siret'] = 'Le SIRET doit contenir 14 chiffres'
    if (!formData.client.email.trim())       newErrors['client.email']       = "L'email est requis"
    else if (!isValidEmail(formData.client.email)) newErrors['client.email'] = "Format d'email invalide"
    formData.services.forEach((s, i) => {
      if (!s.description.trim()) newErrors[`service.${i}.description`] = 'Decrivez la prestation'
      if (s.unitPrice <= 0)      newErrors[`service.${i}.price`]       = 'Le prix HT est obligatoire'
    })
    setErrors(newErrors)
    setTouched({
      'client.companyName': true, 'client.siret': true, 'client.email': true,
      ...Object.fromEntries(formData.services.map((_, i) => [`service.${i}.description`, true])),
    })
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async (mode: 'simple' | 'official' = 'simple') => {
    if (!validateForm()) return
    try {
      const supabase = createSupabaseBrowserClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { alert('Session expirée. Veuillez vous reconnecter.'); return }

      const res = await fetch('/api/artisan/factures-electroniques', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          client:   formData.client,
          dates:    formData.dates,
          services: formData.services,
          notes:    formData.notes,
        }),
      })
      const json = await res.json()
      if (json.ok) {
        // Si mode officiel → envoyer aussi à Super PDP
        if (mode === 'official' && json.id) {
          await fetch('/api/artisan/factures-electroniques/superpdp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ facture_id: json.id }),
          })
        }
        setShowSuccess(true)
      } else {
        alert(json.error ?? 'Erreur lors de la création.')
      }
    } catch (e) {
      console.error(e)
      alert('Erreur de connexion.')
    }
  }, [validateForm, formData])

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#FAF8F5' }}>
      <AnimatePresence>
        {showSuccess && <SuccessOverlay onClose={() => router.push('/artisan/factures-electroniques')} />}
      </AnimatePresence>

      {/* Navbar */}
      <motion.header initial={{ y: -56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: easeOutExpo }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{ height: 56, background: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(230,223,214,0.4)' }}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => router.back()}
          style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4D433A', background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7"/></svg>
        </motion.button>
        <h1 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 16, fontWeight: 600, color: '#4D433A' }}>Nouvelle facture</h1>
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit}
          className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-xl text-white font-semibold"
          style={{ fontSize: 14, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', boxShadow: '0 4px 14px rgba(232,126,26,0.3)', border: 'none', cursor: 'pointer' }}>
          <Send size={18} strokeWidth={2} /> Envoyer
        </motion.button>
        <div className="lg:hidden" style={{ width: 40 }} />
      </motion.header>

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOutExpo }}
        className="px-4 pt-3 pb-6 lg:px-6 lg:pt-6 lg:pb-12"
        style={{ maxWidth: 1200, margin: '0 auto', paddingTop: 70 }}>
        <div className="lg:grid lg:grid-cols-[55%_45%] lg:gap-6">

          {/* Left */}
          <div>
            {/* Client */}
            <GlassCard delay={0}>
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: 'rgba(232,126,26,0.12)' }}>
                  <User size={18} style={{ color: '#E87E1A' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#4D433A' }}>Votre client</h2>
                  <p style={{ fontSize: 12, color: '#8C7D6E' }}>L&apos;entreprise qui va recevoir cette facture</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <FloatingInput label="Nom de l'entreprise *" value={formData.client.companyName}
                  onChange={(e) => updateClient('companyName', e.target.value)}
                  error={touched['client.companyName'] ? errors['client.companyName'] : undefined} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput label="Numero SIRET *" value={formData.client.siret}
                    onChange={(e) => updateClient('siret', e.target.value)}
                    error={touched['client.siret'] ? errors['client.siret'] : undefined} />
                  <FloatingInput label="Email" type="email" value={formData.client.email}
                    onChange={(e) => updateClient('email', e.target.value)}
                    error={touched['client.email'] ? errors['client.email'] : undefined} />
                </div>
                <FloatingInput label="Adresse" value={formData.client.address}
                  onChange={(e) => updateClient('address', e.target.value)} />
              </div>
            </GlassCard>

            {/* Dates */}
            <div className="mt-5">
              <GlassCard delay={0.08}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: 'rgba(232,126,26,0.12)' }}>
                    <CalendarDays size={18} style={{ color: '#E87E1A' }} />
                  </div>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#4D433A' }}>Dates</h2>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Date de la facture', field: 'invoiceDate' as const },
                      { label: 'A payer avant le',   field: 'dueDate'     as const },
                    ].map(({ label, field }) => (
                      <div key={field}>
                        <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 500, color: '#8C7D6E', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</label>
                        <input type="date" value={formData.dates[field]} onChange={(e) => updateDate(field, e.target.value)}
                          className="w-full rounded-xl border bg-white text-[15px] outline-none"
                          style={{ padding: '12px 16px', borderColor: '#E6DFD6', color: '#332B25', transition: 'all 0.2s' }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = '#E87E1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,126,26,0.15)' }}
                          onBlur={(e)  => { e.currentTarget.style.borderColor = '#E6DFD6'; e.currentTarget.style.boxShadow = 'none' }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {duePresets.map((p) => (
                      <button key={p.days} type="button" onClick={() => applyDuePreset(p.days)}
                        className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
                        style={{ background: 'transparent', border: '1.5px solid #E6DFD6', color: '#8C7D6E', cursor: 'pointer', fontFamily: 'inherit' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E87E1A'; e.currentTarget.style.color = '#E87E1A'; e.currentTarget.style.background = '#FEF8F0' }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E6DFD6'; e.currentTarget.style.color = '#8C7D6E'; e.currentTarget.style.background = 'transparent' }}>
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Services */}
            <div className="mt-5">
              <GlassCard delay={0.12}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: 'rgba(232,126,26,0.12)' }}>
                    <svg width="18" height="18" fill="none" stroke="#E87E1A" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: '#4D433A' }}>Ce que vous avez fait</h2>
                    <p style={{ fontSize: 12, color: '#8C7D6E' }}>Detaillez vos prestations</p>
                  </div>
                </div>
                <div className="mt-4">
                  <AnimatePresence mode="popLayout">
                    {formData.services.map((service, index) => (
                      <ServiceItemRow key={service.id} item={service} index={index}
                        onUpdate={updateService} onRemove={removeService}
                        canRemove={formData.services.length > 1}
                        error={{ description: touched[`service.${index}.description`] ? errors[`service.${index}.description`] : undefined }} />
                    ))}
                  </AnimatePresence>
                </div>
                <motion.button whileTap={{ scale: 0.98 }} onClick={addService} type="button"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium mt-2"
                  style={{ border: '1.5px dashed #D1C7BB', color: '#8C7D6E', background: 'transparent', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E87E1A'; e.currentTarget.style.color = '#E87E1A'; e.currentTarget.style.background = '#FEF8F0' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#D1C7BB'; e.currentTarget.style.color = '#8C7D6E'; e.currentTarget.style.background = 'transparent' }}>
                  <Plus size={18} strokeWidth={2} /> Ajouter une prestation
                </motion.button>
              </GlassCard>
            </div>
          </div>

          {/* Right */}
          <div className="mt-5 lg:mt-0 space-y-5">
            <div className="lg:sticky lg:top-20 space-y-5">
              <TotalsCard totalHT={totalHT} totalTVA={totalTVA} totalTTC={totalTTC} tvaBreakdown={tvaBreakdown} delay={0.16} />

              {/* Notes */}
              <GlassCard delay={0.2}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#4D433A', marginBottom: 4 }}>Notes</h2>
                <p style={{ fontSize: 12, color: '#8C7D6E', marginBottom: 16 }}>Optionnel — conditions de paiement</p>
                <FloatingTextarea label="Ex: Paiement par virement sous 30 jours..." value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))} rows={3} />
              </GlassCard>

              {/* Desktop submit */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.35 }} className="hidden lg:block">
                <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} type="button"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold"
                  style={{ fontSize: 15, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#FFFFFF', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(232,126,26,0.3)' }}>
                  <Send size={20} strokeWidth={2} /> Envoyer la facture
                </motion.button>
                <p style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: '#A89B8C' }}>La facture sera envoyee par email a votre client</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile sticky bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <div className="px-4 py-3" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)', borderTop: '1px solid #E6DFD6', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleSubmit('simple')} type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold"
              style={{ fontSize: 15, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#FFFFFF', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(232,126,26,0.3)' }}>
              <Send size={20} strokeWidth={2} /> Envoyer la facture
            </motion.button>
            <motion.button whileTap={{ scale: 0.98 }} onClick={() => handleSubmit('official')} type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold"
              style={{ fontSize: 14, background: 'linear-gradient(135deg,#6366F1 0%,#4F46E5 100%)', color: '#FFFFFF', border: 'none', cursor: 'pointer' }}>
               Envoyer officiellement à l&apos;État
            </motion.button>
          </div>
          <div style={{ height: 64 }} />
        </div>
      </motion.div>
    </div>
  )
}