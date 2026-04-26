'use client'
// app/artisan/factures-electroniques/components/ServiceItemRow.tsx

import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { FloatingInput } from './FloatingInput'
import type { ServiceItem } from '../types'
import { TVA_OPTIONS, formatCurrency } from '../types'

interface ServiceItemRowProps {
  item: ServiceItem
  index: number
  onUpdate: (id: string, updates: Partial<ServiceItem>) => void
  onRemove: (id: string) => void
  canRemove: boolean
  error?: { description?: string }
}

export default function ServiceItemRow({
  item, index, onUpdate, onRemove, canRemove, error,
}: ServiceItemRowProps) {
  const lineTotal = item.quantity * item.unitPrice

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
      className="overflow-hidden"
    >
      <div className="relative rounded-2xl p-4 mb-4"
        style={{ background: '#FAF8F5', border: '1px solid #E6DFD6' }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span style={{ fontSize: 11, fontWeight: 700, color: '#A89B8C', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Prestation {index + 1}
          </span>
          {canRemove && (
            <motion.button
              whileTap={{ scale: 0.85 }}
              transition={{ duration: 0.15 }}
              onClick={() => onRemove(item.id)}
              className="flex items-center justify-center rounded-lg"
              style={{ width: 32, height: 32, color: '#A89B8C', background: 'none', border: 'none', cursor: 'pointer' }}
              type="button"
            >
              <Trash2 size={16} strokeWidth={2} />
            </motion.button>
          )}
        </div>

        {/* Description */}
        <FloatingInput
          label="Description *"
          value={item.description}
          onChange={(e) => onUpdate(item.id, { description: e.target.value })}
          error={error?.description}
          className="mb-3"
        />

        {/* Qty | Price | TVA */}
        <div className="grid grid-cols-3 gap-3">
          <div className="relative">
            <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 500, color: '#8C7D6E', letterSpacing: '0.04em' }}>
              Quantite
            </label>
            <input
              type="number" min={1} value={item.quantity}
              onChange={(e) => onUpdate(item.id, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-full rounded-xl border bg-white text-[15px] outline-none text-center"
              style={{ padding: '12px 8px', borderColor: '#E6DFD6', color: '#332B25', transition: 'all 0.2s' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#E87E1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,126,26,0.15)' }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = '#E6DFD6'; e.currentTarget.style.boxShadow = 'none' }}
            />
          </div>
          <div className="relative">
            <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 500, color: '#8C7D6E', letterSpacing: '0.04em' }}>
              Prix HT (€)
            </label>
            <input
              type="number" min={0} step={0.01} value={item.unitPrice || ''}
              onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
              className="w-full rounded-xl border bg-white text-[15px] outline-none text-right"
              style={{ padding: '12px', borderColor: '#E6DFD6', color: '#332B25', transition: 'all 0.2s' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#E87E1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,126,26,0.15)' }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = '#E6DFD6'; e.currentTarget.style.boxShadow = 'none' }}
            />
          </div>
          <div className="relative">
            <label style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 500, color: '#8C7D6E', letterSpacing: '0.04em' }}>
              TVA
            </label>
            <select
              value={String(item.tvaRate)}
              onChange={(e) => onUpdate(item.id, { tvaRate: Number(e.target.value) })}
              className="w-full rounded-xl border bg-white text-[14px] outline-none"
              style={{ padding: '12px 8px', borderColor: '#E6DFD6', color: '#332B25', transition: 'all 0.2s', fontFamily: 'inherit' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#E87E1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,126,26,0.15)' }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = '#E6DFD6'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {TVA_OPTIONS.map((opt) => (
                <option key={opt.value} value={String(opt.value)}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Line total */}
        <div className="flex justify-end mt-3">
          <span style={{ fontSize: 13, color: '#A34C10', fontWeight: 600 }}>
            Total ligne: {formatCurrency(lineTotal)} € HT
          </span>
        </div>
      </div>
    </motion.div>
  )
}