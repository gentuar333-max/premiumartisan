'use client'
// app/artisan/factures-electroniques/components/StatusBanner.tsx

import { motion } from 'framer-motion'
import { Info, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

export type InvoiceStatus = 'Brouillon' | 'En attente' | 'Payee' | 'En retard' | 'Annulee'

interface StatusBannerProps {
  status: InvoiceStatus
}

const statusConfig: Record<InvoiceStatus, {
  bg: string
  borderBottom: string
  icon: typeof Info
  iconColor: string
  textColor: string
  message: string
  actionLabel?: string
  actionColor?: string
}> = {
  Brouillon: {
    bg: '#F2EEE8',
    borderBottom: '1px solid #E6DFD6',
    icon: Info,
    iconColor: '#8C7D6E',
    textColor: '#6B5E52',
    message: 'Cette facture est un brouillon.',
    actionLabel: 'Finaliser',
    actionColor: '#C9650F',
  },
  'En attente': {
    bg: 'linear-gradient(90deg,#FEF3C7 0%,#FDEBD2 100%)',
    borderBottom: '1px solid #FDE68A',
    icon: Clock,
    iconColor: '#92400E',
    textColor: '#92400E',
    message: 'En attente de paiement — Echeance: 26 mai 2026',
    actionLabel: 'Relancer',
    actionColor: '#A34C10',
  },
  Payee: {
    bg: 'linear-gradient(90deg,#DCFCE7 0%,#F0FDF4 100%)',
    borderBottom: '1px solid #BBF7D0',
    icon: CheckCircle2,
    iconColor: '#166534',
    textColor: '#166534',
    message: 'Payee le 5 mai 2026',
  },
  'En retard': {
    bg: '#FEF2F2',
    borderBottom: '1px solid #FECACA',
    icon: AlertCircle,
    iconColor: '#DC2626',
    textColor: '#DC2626',
    message: 'En retard — Echeance depassee',
    actionLabel: 'Relancer',
    actionColor: '#DC2626',
  },
  Annulee: {
    bg: '#FEF2F2',
    borderBottom: '1px solid #FECACA',
    icon: AlertCircle,
    iconColor: '#DC2626',
    textColor: '#991B1B',
    message: 'Cette facture a ete annulee.',
  },
}

export default function StatusBanner({ status }: StatusBannerProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="w-full"
      style={{ background: config.bg, borderBottom: config.borderBottom, padding: '12px 16px' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mx-auto flex max-w-7xl items-center gap-3"
      >
        <Icon size={18} style={{ color: config.iconColor, flexShrink: 0 }} />
        <span style={{ fontSize: 14, color: config.textColor }}>{config.message}</span>
        {config.actionLabel && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="ml-auto"
            style={{ fontSize: 14, fontWeight: 600, color: config.actionColor }}
          >
            {config.actionLabel}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}