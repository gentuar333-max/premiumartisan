'use client'
// app/artisan/factures-electroniques/components/HistoryTimeline.tsx

import { motion } from 'framer-motion'
import { History } from 'lucide-react'

interface TimelineEvent {
  label: string
  date: string
  color?: string
}

interface HistoryTimelineProps {
  events: TimelineEvent[]
}

export default function HistoryTimeline({ events }: HistoryTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.35, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
      style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(230,223,214,0.7)', borderRadius: 16, padding: 20, backdropFilter: 'blur(12px)', marginTop: 12 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <History size={20} style={{ color: '#E87E1A' }} />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#4D433A' }}>Historique</h3>
      </div>
      <div className="relative pl-4" style={{ borderLeft: '2px solid #E6DFD6' }}>
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.3, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
            className="relative pb-3"
            style={{ paddingLeft: 16 }}
          >
            <div className="absolute rounded-full"
              style={{ width: 10, height: 10, background: event.color || '#E87E1A', left: -6, top: 6 }} />
            <span style={{ fontSize: 14, color: '#332B25' }}>
              {event.label}{' '}
              <span style={{ color: '#8C7D6E' }}>— {event.date}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}