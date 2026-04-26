'use client'
// app/artisan/factures-electroniques/components/TotalsCard.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { formatCurrency } from '../types'

interface TVABreakdown { rate: number; amount: number }
interface TotalsCardProps {
  totalHT: number
  totalTVA: number
  totalTTC: number
  tvaBreakdown: TVABreakdown[]
  delay?: number
}

export default function TotalsCard({ totalHT, totalTVA, totalTTC, tvaBreakdown, delay = 0 }: TotalsCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] as [number, number, number, number], delay }}
      className="rounded-2xl"
      style={{
        background: 'linear-gradient(135deg,#FEF8F0 0%,#FDEBD2 100%)',
        border: '1px solid rgba(232,126,26,0.15)',
        padding: 20,
        boxShadow: '0 4px 24px rgba(107,94,82,0.08)',
      }}
    >
      {/* Total HT */}
      <div className="flex items-center justify-between mb-3">
        <span style={{ fontSize: 13, color: '#8C7D6E' }}>Total HT</span>
        <motion.span key={totalHT} initial={{ opacity: 0.5, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          style={{ fontSize: 15, fontWeight: 600, color: '#4D433A' }}>
          {formatCurrency(totalHT)} €
        </motion.span>
      </div>

      {/* TVA with breakdown */}
      <div className="mb-3">
        <button type="button" onClick={() => setShowBreakdown(!showBreakdown)} className="flex items-center justify-between w-full">
          <span style={{ fontSize: 13, color: '#8C7D6E' }}>TVA</span>
          <div className="flex items-center gap-1">
            <motion.span key={totalTVA} initial={{ opacity: 0.5, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
              style={{ fontSize: 14, color: '#6B5E52', fontWeight: 600 }}>
              {formatCurrency(totalTVA)} €
            </motion.span>
            <motion.div animate={{ rotate: showBreakdown ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} style={{ color: '#A89B8C' }} />
            </motion.div>
          </div>
        </button>
        <AnimatePresence>
          {showBreakdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-1 pl-4 space-y-1">
                {tvaBreakdown.map((b) => (
                  <div key={b.rate} className="flex items-center justify-between">
                    <span style={{ fontSize: 13, color: '#A89B8C' }}>TVA {b.rate}%</span>
                    <span style={{ fontSize: 13, color: '#6B5E52' }}>{formatCurrency(b.amount)} €</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="w-full h-px my-4" style={{ background: 'rgba(232,126,26,0.2)' }} />

      {/* Total TTC */}
      <div className="flex items-center justify-between">
        <span style={{ fontSize: 15, fontWeight: 700, color: '#4D433A' }}>Total a payer</span>
        <motion.span key={totalTTC} initial={{ opacity: 0.5, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ fontSize: 24, fontWeight: 700, color: '#A34C10' }}>
          {formatCurrency(totalTTC)} €
        </motion.span>
      </div>
    </motion.div>
  )
}