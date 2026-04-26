'use client'
// app/artisan/factures-electroniques/components/GlassCard.tsx

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  hover?: boolean
}

export default function GlassCard({
  children,
  className = '',
  style,
  delay = 0,
  hover = false,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
        delay,
      }}
      whileHover={
        hover
          ? {
              y: -2,
              boxShadow:
                '0 8px 32px rgba(107, 94, 82, 0.12), 0 2px 6px rgba(107, 94, 82, 0.08)',
            }
          : undefined
      }
      className={className}
      style={{
        background: 'rgba(255,255,255,0.85)',
        border: '1px solid rgba(230,223,214,0.7)',
        borderRadius: 16,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 2px 12px rgba(26,22,20,0.06)',
        padding: 20,
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}