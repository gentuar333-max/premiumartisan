'use client'
// app/artisan/factures-electroniques/[id]/ApercuFacture.tsx

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, Download, Send, Trash2, ArrowLeft, Clock, FileText, Loader2 } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabaseBrowser'
import BottomNav from '../components/BottomNav'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Statut = 'brouillon' | 'en-attente' | 'payee' | 'en-retard' | 'annulee'

interface Facture {
  id: string
  numero: string
  statut: Statut
  statut_efacture?: string | null
  client_nom: string
  client_siret: string
  client_email: string
  client_adresse: string
  date_emission: string
  date_echeance: string | null
  lignes: { description: string; quantity: number; unitPrice: number; tvaRate: number }[]
  notes: string
  total_ht: number
  total_tva: number
  total_ttc: number
}

const STATUT_CFG: Record<Statut, { label: string; bg: string; color: string; icon: typeof Clock }> = {
  brouillon:    { label: 'Brouillon',  bg: '#F2EEE8', color: '#8C7D6E', icon: FileText },
  'en-attente': { label: 'En attente', bg: 'linear-gradient(90deg,#FEF3C7,#FDEBD2)', color: '#92400E', icon: Clock },
  payee:        { label: 'Payee',      bg: 'linear-gradient(90deg,#DCFCE7,#F0FDF4)', color: '#166534', icon: CheckCircle2 },
  'en-retard':  { label: 'En retard',  bg: '#FEF2F2', color: '#DC2626', icon: Clock },
  annulee:      { label: 'Annulee',    bg: '#FEF2F2', color: '#991B1B', icon: FileText },
}

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n)
}
function fmtDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function ApercuFacture({ id }: { id: string }) {
  const router  = useRouter()
  const [facture, setFacture]   = useState<Facture | null>(null)
  const [artisan, setArtisan]   = useState<{ nom: string; prenom: string; siret: string; adresse: string; city: string } | null>(null)
  const [loading, setLoading]   = useState(true)
  const [marking, setMarking]   = useState(false)
  const [sending, setSending]   = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast]       = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const getToken = useCallback(async () => {
    const supabase = createSupabaseBrowserClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token ?? null
  }, [])

  const fetchFacture = useCallback(async () => {
    setLoading(true)
    try {
      const token = await getToken()
      const [resF, resP] = await Promise.all([
        fetch(`/api/artisan/factures-electroniques/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }),
        fetch('/api/artisan/parametres', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }),
      ])
      const [jsonF, jsonP] = await Promise.all([resF.json(), resP.json()])
      if (jsonF.ok) setFacture(jsonF.facture)
      if (jsonP.ok) setArtisan(jsonP.profile)
    } finally {
      setLoading(false)
    }
  }, [id, getToken])

  useEffect(() => { fetchFacture() }, [fetchFacture])

  const patchStatut = useCallback(async (statut: string) => {
    const token = await getToken()
    const res   = await fetch(`/api/artisan/factures-electroniques/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ statut }),
    })
    return res.json()
  }, [id, getToken])

  const markPaid = useCallback(async () => {
    if (!facture || marking) return
    setMarking(true)
    try {
      const json = await patchStatut('payee')
      if (json.ok) {
        setFacture(f => f ? { ...f, statut: 'payee' } : f)
        showToast('Facture marquee comme payee')
      }
    } finally {
      setMarking(false)
    }
  }, [facture, marking, patchStatut])

  const sendEmail = useCallback(async () => {
    if (!facture || sending) return
    setSending(true)
    try {
      const json = await patchStatut('en-attente')
      if (json.ok) {
        setFacture(f => f ? { ...f, statut: 'en-attente' } : f)
        showToast('Facture envoyee par email')
      }
    } finally {
      setSending(false)
    }
  }, [facture, sending, patchStatut])

  const deleteFacture = useCallback(async () => {
    if (!confirm('Supprimer cette facture ?')) return
    setDeleting(true)
    try {
      const token = await getToken()
      await fetch(`/api/artisan/factures-electroniques/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      router.push('/artisan/factures-electroniques')
    } finally {
      setDeleting(false)
    }
  }, [id, getToken, router])

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', backgroundColor: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={32} style={{ color: '#E87E1A', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (!facture) {
    return (
      <div style={{ minHeight: '100dvh', backgroundColor: '#FAF8F5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ color: '#8C7D6E', fontSize: 16 }}>Facture introuvable</p>
        <button onClick={() => router.push('/artisan/factures-electroniques')}
          style={{ padding: '10px 24px', borderRadius: 12, background: '#E87E1A', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          Retour
        </button>
      </div>
    )
  }

  const cfg  = STATUT_CFG[facture.statut] ?? STATUT_CFG.brouillon
  const Icon = cfg.icon

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#FAF8F5', paddingBottom: 80 }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 70, left: '50%', transform: 'translateX(-50%)', zIndex: 100, background: '#332B25', color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
          {toast}
        </div>
      )}

      {/* Navbar */}
      <motion.header initial={{ y: -56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: easeOutExpo }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{ height: 56, background: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(230,223,214,0.4)' }}>
        <button onClick={() => router.push('/artisan/factures-electroniques')}
          style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#4D433A' }}>
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        <h1 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 16, fontWeight: 600, color: '#4D433A' }}>
          {facture.numero}
        </h1>
        <button onClick={deleteFacture} disabled={deleting}
          style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626' }}>
          {deleting ? <Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Trash2 size={20} strokeWidth={2} />}
        </button>
      </motion.header>

      <div style={{ paddingTop: 56 }}>

        {/* Status banner */}
        <div style={{ background: cfg.bg, borderBottom: '1px solid rgba(230,223,214,0.5)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon size={20} style={{ color: cfg.color, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: cfg.color }}>{cfg.label}</p>
              {facture.date_echeance && facture.statut === 'en-attente' && (
                <p style={{ fontSize: 12, color: cfg.color, opacity: 0.8 }}>Echeance: {fmtDate(facture.date_echeance)}</p>
              )}
            </div>
          </div>
          {facture.statut === 'en-attente' && (
            <button onClick={markPaid} disabled={marking}
              style={{ padding: '8px 14px', borderRadius: 10, background: '#22C55E', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
              {marking ? <Loader2 size={14} style={{ animation: 'spin 0.8s linear infinite' }} /> : <CheckCircle2 size={14} />}
              {marking ? '...' : 'Payee'}
            </button>
          )}
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720, margin: '0 auto' }}>

          {/* Document */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOutExpo }}
            style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(230,223,214,0.7)', borderRadius: 16, overflow: 'hidden', backdropFilter: 'blur(12px)' }}>

            <div style={{ background: '#332B25', padding: '20px' }}>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>FACTURE ELECTRONIQUE</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{facture.numero}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Emise le {fmtDate(facture.date_emission)}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #F2EEE8' }}>
              <div style={{ padding: '14px 16px', borderRight: '1px solid #F2EEE8' }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#A89B8C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>De</p>
                {artisan ? (
                  <>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#332B25', marginBottom: 3 }}>{`${artisan.prenom ?? ''} ${artisan.nom ?? ''}`.trim() || 'Artisan'}</p>
                    {artisan.siret && <p style={{ fontSize: 12, color: '#8C7D6E' }}>SIRET: {artisan.siret}</p>}
                    {artisan.adresse && <p style={{ fontSize: 12, color: '#A89B8C' }}>{artisan.adresse}</p>}
                    {artisan.city && <p style={{ fontSize: 12, color: '#A89B8C' }}>{artisan.city}</p>}
                  </>
                ) : (
                  <p style={{ fontSize: 13, color: '#A89B8C' }}>—</p>
                )}
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#A89B8C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Pour</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#332B25', marginBottom: 3 }}>{facture.client_nom}</p>
                <p style={{ fontSize: 12, color: '#8C7D6E' }}>SIRET: {facture.client_siret}</p>
                {facture.client_email && <p style={{ fontSize: 12, color: '#8C7D6E' }}>{facture.client_email}</p>}
                {facture.client_adresse && <p style={{ fontSize: 12, color: '#A89B8C' }}>{facture.client_adresse}</p>}
              </div>
            </div>
            {/* Echeance row */}
            <div style={{ padding: '10px 16px', borderBottom: '1px solid #F2EEE8', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#A89B8C' }}>Echeance</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#332B25' }}>{fmtDate(facture.date_echeance)}</span>
            </div>

            {facture.lignes.map((l, i) => {
              const ht = (l.quantity || 1) * (l.unitPrice || 0)
              return (
                <div key={i} style={{ padding: '12px 16px', borderBottom: i < facture.lignes.length - 1 ? '1px solid #F2EEE8' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, color: '#332B25', fontWeight: 500 }}>{l.description}</p>
                    <p style={{ fontSize: 12, color: '#A89B8C', marginTop: 2 }}>{l.quantity} × {fmt(l.unitPrice)} HT · TVA {l.tvaRate}%</p>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#4D433A', flexShrink: 0 }}>{fmt(ht)} HT</p>
                </div>
              )
            })}

            <div style={{ background: '#FAF8F5', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: '#8C7D6E' }}>Total HT</span>
                <span style={{ fontSize: 13, color: '#6B5E52', fontWeight: 600 }}>{fmt(facture.total_ht)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: '#8C7D6E' }}>TVA</span>
                <span style={{ fontSize: 13, color: '#6B5E52', fontWeight: 600 }}>{fmt(facture.total_tva)}</span>
              </div>
              <div style={{ height: 1, background: '#E6DFD6', marginBottom: 10 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#4D433A' }}>Total TTC</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: '#A34C10' }}>{fmt(facture.total_ttc)}</span>
              </div>
            </div>

            {facture.notes && (
              <div style={{ padding: '12px 16px', borderTop: '1px solid #F2EEE8' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#A89B8C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Notes</p>
                <p style={{ fontSize: 13, color: '#6B5E52', lineHeight: 1.6 }}>{facture.notes}</p>
              </div>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.1 }}
            style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(230,223,214,0.7)', borderRadius: 16, padding: 16, backdropFilter: 'blur(12px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

              {/* Envoyer par email */}
              {(facture.statut === 'brouillon' || facture.statut === 'en-attente') && (
                <button onClick={sendEmail} disabled={sending}
                  style={{ width: '100%', padding: '13px', borderRadius: 12, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#fff', border: 'none', cursor: sending ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: sending ? 0.8 : 1 }}>
                  {sending ? <Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Send size={18} />}
                  {sending ? 'Envoi en cours...' : 'Envoyer par email'}
                </button>
              )}

              {/* Marquer payee */}
              {facture.statut !== 'payee' && (
                <button onClick={markPaid} disabled={marking}
                  style={{ width: '100%', padding: '13px', borderRadius: 12, background: 'linear-gradient(135deg,#22C55E 0%,#16A34A 100%)', color: '#fff', border: 'none', cursor: marking ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: marking ? 0.8 : 1 }}>
                  {marking ? <Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> : <CheckCircle2 size={18} />}
                  {marking ? 'Enregistrement...' : 'Marquer comme payee'}
                </button>
              )}

              {/* Super PDP — Plateforme Agréée */}
              <button
                onClick={async () => {
                  const token = await getToken()
                  const res = await fetch('/api/artisan/factures-electroniques/superpdp', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: JSON.stringify({ facture_id: id }),
                  })
                  const json = await res.json()
                  if (json.ok) showToast('Facture transmise a la Plateforme Agreee')
                  else showToast('Erreur: ' + json.error)
                }}
                style={{ width: '100%', padding: '13px', borderRadius: 12, background: 'linear-gradient(135deg,#6366F1 0%,#4F46E5 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                🏛 Transmettre a la Plateforme Agreee
              </button>

              {/* Telecharger PDF */}
              <button style={{ width: '100%', padding: '13px', borderRadius: 12, background: '#fff', color: '#4D433A', border: '1.5px solid #E6DFD6', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Download size={18} /> Telecharger PDF
              </button>

              {/* Supprimer */}
              <button onClick={deleteFacture} disabled={deleting}
                style={{ width: '100%', padding: '13px', borderRadius: 12, background: '#FEF2F2', color: '#DC2626', border: '1.5px solid #FECACA', cursor: deleting ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {deleting ? <Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Trash2 size={18} />}
                {deleting ? 'Suppression...' : 'Supprimer'}
              </button>

            </div>
          </motion.div>

        </div>
      </div>

      <BottomNav active="factures" />
    </div>
  )
}