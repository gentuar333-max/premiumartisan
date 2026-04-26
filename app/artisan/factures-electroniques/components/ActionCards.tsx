'use client'
// app/artisan/factures-electroniques/components/ActionCards.tsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Send, Download, CreditCard, CheckCircle2,
  Loader2, Pencil, Trash2,
} from 'lucide-react'
import type { InvoiceStatus } from './StatusBanner'

interface ActionCardsProps {
  status: InvoiceStatus
  onSend?: () => void
  onMarkPaid?: () => void
  onDownloadPDF?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.35,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    },
  }),
}

function SendCard({ onSend, onDownloadPDF }: { onSend?: () => void; onDownloadPDF?: () => void }) {
  const [copying, setCopying] = useState(false)

  return (
    <motion.div
      custom={0} variants={cardVariants} initial="hidden" animate="visible"
      style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(230,223,214,0.7)', borderRadius: 16, padding: 20, backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Send size={20} style={{ color: '#E87E1A' }} />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#4D433A' }}>Envoyer au client</h3>
      </div>
      <p style={{ fontSize: 13, color: '#8C7D6E', marginBottom: 16 }}>
        Le client recevra un email avec la facture en piece jointe (PDF).
      </p>
      <motion.button
        whileTap={{ scale: 0.98 }} onClick={onSend}
        className="w-full flex items-center justify-center gap-2 rounded-xl text-white font-semibold"
        style={{ padding: '14px', fontSize: 15, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', boxShadow: '0 4px 14px rgba(232,126,26,0.3)' }}
      >
        <Send size={18} /> Envoyer par email
      </motion.button>
      <div className="flex gap-3 mt-3">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => { setCopying(true); setTimeout(() => setCopying(false), 1500) }}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl font-medium"
          style={{ padding: '10px', border: '1.5px solid #E6DFD6', color: copying ? '#16A34A' : '#6B5E52', background: copying ? '#F0FDF4' : 'transparent', fontSize: 13, transition: 'all 0.2s' }}
        >
          {copying ? <CheckCircle2 size={15} /> : null}
          {copying ? 'Copie' : 'Copier le lien'}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.98 }} onClick={onDownloadPDF}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl font-medium"
          style={{ padding: '10px', border: '1.5px solid #E6DFD6', color: '#6B5E52', fontSize: 13 }}
        >
          <Download size={15} /> Telecharger PDF
        </motion.button>
      </div>
    </motion.div>
  )
}

function PaymentCard({ onMarkPaid }: { onMarkPaid?: () => void }) {
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)

  const handleClick = () => {
    if (paid) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setPaid(true); onMarkPaid?.() }, 1000)
  }

  return (
    <motion.div
      custom={1} variants={cardVariants} initial="hidden" animate="visible"
      style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(230,223,214,0.7)', borderRadius: 16, padding: 20, backdropFilter: 'blur(12px)', marginTop: 12 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <CreditCard size={20} style={{ color: '#22C55E' }} />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#4D433A' }}>Paiement</h3>
      </div>
      <p style={{ fontSize: 13, color: '#8C7D6E', marginBottom: 16 }}>
        Marquer comme payee lorsque vous avez recu le paiement.
      </p>
      <motion.button
        whileTap={paid ? {} : { scale: 0.98 }} onClick={handleClick}
        className="w-full flex items-center justify-center gap-2 rounded-xl text-white font-semibold"
        style={{ padding: '14px', fontSize: 15, background: paid ? '#16A34A' : '#22C55E', boxShadow: '0 4px 14px rgba(34,197,94,0.25)', transition: 'background 0.3s' }}
      >
        {loading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={18} />}
        {loading ? 'Chargement...' : paid ? 'Payee' : 'Marquer comme payee'}
      </motion.button>
    </motion.div>
  )
}

function ActionButtons({ onEdit, onDelete }: { onEdit?: () => void; onDelete?: () => void }) {
  return (
    <motion.div
      custom={2} variants={cardVariants} initial="hidden" animate="visible"
      style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(230,223,214,0.7)', borderRadius: 16, padding: 16, backdropFilter: 'blur(12px)', marginTop: 12 }}
    >
      <div className="flex flex-col gap-1">
        <motion.button
          whileTap={{ scale: 0.98 }} onClick={onEdit}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-left font-medium"
          style={{ color: '#6B5E52', fontSize: 14 }}
        >
          <Pencil size={18} style={{ color: '#8C7D6E' }} /> Modifier
        </motion.button>
        <div style={{ height: 1, background: '#F2EEE8' }} />
        <motion.button
          whileTap={{ scale: 0.98 }} onClick={onDelete}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-left font-medium"
          style={{ color: '#DC2626', fontSize: 14 }}
        >
          <Trash2 size={18} style={{ color: '#EF4444' }} /> Supprimer
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function ActionCards({ status, onSend, onMarkPaid, onDownloadPDF, onEdit, onDelete }: ActionCardsProps) {
  const showSend    = status === 'Brouillon' || status === 'En attente'
  const showPayment = status === 'En attente'

  return (
    <div className="flex flex-col gap-0">
      {showSend    && <SendCard onSend={onSend} onDownloadPDF={onDownloadPDF} />}
      {showPayment && <PaymentCard onMarkPaid={onMarkPaid} />}
      <ActionButtons onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}