'use client'
// app/artisan/factures-electroniques/Shell.tsx

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Clock, CheckCircle2, Plus } from 'lucide-react'
import CountUp from 'react-countup'
import { MOCK_INVOICES, STATUS_CONFIG, type InvoiceStatus } from './mock-data'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]
const easeSpring:  [number, number, number, number] = [0.34, 1.56, 0.64, 1]
const easeOutQuart:[number, number, number, number] = [0.25, 1, 0.5, 1]

const pageVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOutExpo } } }
const cardStagger  = { visible: { transition: { staggerChildren: 0.05 } } }
const cardSlideUp  = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOutExpo } } }
const listStagger  = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const listItem     = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOutExpo } }, exit: { opacity: 0, transition: { duration: 0.2 } } }

type FilterStatus = 'toutes' | InvoiceStatus
const FILTERS: { label: string; value: FilterStatus }[] = [
  { label: 'Toutes',     value: 'toutes'      },
  { label: 'Brouillon',  value: 'brouillon'   },
  { label: 'En attente', value: 'en-attente'  },
  { label: 'Payee',      value: 'payee'       },
  { label: 'En retard',  value: 'en-retard'   },
  { label: 'Annulee',    value: 'annulee'     },
]

function StatsSection() {
  const stats = [
    { icon: FileText,     iconBg: '#FDEBD2', iconColor: '#A34C10', number: 12, label: 'TOTAL FACTURES', subNumber: null as number | null, trend: '+2 ce mois' },
    { icon: Clock,        iconBg: '#FEF3C7', iconColor: '#92400E', number: 4,  label: 'EN ATTENTE',    subNumber: 5840.5,  trend: null },
    { icon: CheckCircle2, iconBg: '#DCFCE7', iconColor: '#166534', number: 8,  label: 'ENCAISSE',      subNumber: 12450.75,trend: null },
  ]
  return (
    <motion.section variants={cardStagger} initial="hidden" animate="visible" className="relative px-4 pt-6 pb-8"
      style={{ background: 'linear-gradient(135deg,#FEF8F0 0%,#FDEBD2 50%,#FAD6A5 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D1C7BB 1px,transparent 1px)', backgroundSize: '16px 16px', opacity: 0.3 }} />
      <div className="relative flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible" style={{ scrollbarWidth: 'none' as const }}>
        {stats.map((s) => (
          <motion.div key={s.label} variants={cardSlideUp} className="flex-shrink-0" style={{ minWidth: 'calc(75% - 8px)', maxWidth: '100%' }}>
            <div style={{ background: 'rgba(255,255,255,0.82)', border: '1px solid rgba(230,223,214,0.6)', borderRadius: 16, backdropFilter: 'blur(10px)', padding: 20, minHeight: 120 }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: s.iconBg }}>
                  <s.icon size={18} style={{ color: s.iconColor }} strokeWidth={2} />
                </div>
                {s.trend && <span style={{ padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#FDEBD2', color: '#A34C10' }}>{s.trend}</span>}
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#4D433A', lineHeight: 1 }}>
                <CountUp end={s.number} duration={0.8} separator=" " />
              </div>
              {s.subNumber !== null && (
                <div style={{ fontSize: 13, color: '#8C7D6E', marginTop: 4 }}>
                  <CountUp end={s.subNumber} duration={0.8} separator=" " decimals={2} decimal="," suffix=" €" />
                </div>
              )}
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8C7D6E', marginTop: 8 }}>{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function FilterChips({ active, onChange }: { active: FilterStatus; onChange: (f: FilterStatus) => void }) {
  return (
    <div className="relative px-4 py-3">
      <div className="absolute right-0 top-0 bottom-0 pointer-events-none z-10" style={{ width: 96, background: 'linear-gradient(to right,transparent,#FAF8F5)' }} />
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' as const }}>
        {FILTERS.map((f) => {
          const isActive = active === f.value
          return (
            <motion.button key={f.value} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2, ease: easeOutQuart }}
              onClick={() => onChange(f.value)} className="flex-shrink-0 px-4 py-2 text-sm font-semibold transition-all duration-200"
              style={{ borderRadius: 999, background: isActive ? '#4D433A' : '#FFFFFF', color: isActive ? '#FFFFFF' : '#6B5E52', border: isActive ? '1.5px solid #4D433A' : '1.5px solid #E6DFD6' }}>
              {f.label}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

function InvoiceCard({ invoice }: { invoice: typeof MOCK_INVOICES[0] }) {
  const router = useRouter()
  const config = STATUS_CONFIG[invoice.status]
  const fmtAmt = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(invoice.amount)
  return (
    <motion.div layout variants={listItem} initial="hidden" animate="visible" exit="exit"
      whileTap={{ scale: 0.98 }} transition={{ duration: 0.15, ease: easeSpring }}
      onClick={() => router.push(`/artisan/factures-electroniques/${invoice.id}`)}
      style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(230,223,214,0.7)', borderRadius: 16, padding: 16, cursor: 'pointer', backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(26,22,20,0.06)' }}>
      <div className="flex items-center justify-between mb-2">
        <span style={{ fontSize: 15, fontWeight: 600, color: '#332B25' }}>{invoice.client}</span>
        <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: config.bg, color: config.text, border: `1px solid ${config.border}` }}>{config.label}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 12, color: '#A89B8C' }}>{invoice.number}</span>
          <span style={{ color: '#D1C7BB' }}>·</span>
          <span style={{ fontSize: 12, color: '#A89B8C' }}>{invoice.date}</span>
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#4D433A' }}>{fmtAmt}</span>
      </div>
      {invoice.status === 'en-attente' && (
        <div className="mt-3">
          <div style={{ fontSize: 12, color: '#8C7D6E' }}>Echeance: {invoice.dueDate}</div>
          <div style={{ height: 4, background: '#E6DFD6', borderRadius: 999, marginTop: 6 }}>
            <div style={{ height: 4, width: '60%', borderRadius: 999, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)' }} />
          </div>
        </div>
      )}
      {invoice.status === 'payee' && (
        <div className="mt-3 flex items-center gap-1" style={{ fontSize: 12, color: '#16A34A' }}>
          <CheckCircle2 size={14} strokeWidth={2} /> Payee le {invoice.dueDate}
        </div>
      )}
      {invoice.status === 'brouillon' && <div className="mt-3" style={{ fontSize: 12, color: '#8C7D6E' }}>Modifiee il y a 2h</div>}
    </motion.div>
  )
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOutExpo }}
      className="flex flex-col items-center justify-center px-4" style={{ minHeight: 400 }}>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}>
        <div style={{ width: 160, height: 160, background: '#F2EEE8', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FileText size={64} style={{ color: '#D1C7BB' }} strokeWidth={1} />
        </div>
      </motion.div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#4D433A', marginTop: 24, textAlign: 'center' }}>Aucune facture</h2>
      <p style={{ fontSize: 14, color: '#8C7D6E', maxWidth: 280, textAlign: 'center', marginTop: 8, marginBottom: 24, lineHeight: 1.6 }}>
        Pas encore de factures. Creez votre premiere facture en quelques secondes.
      </p>
      <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} onClick={onCreate}
        className="flex items-center justify-center gap-2 px-6 py-4"
        style={{ borderRadius: 14, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#FFFFFF', fontSize: 15, fontWeight: 600, boxShadow: '0 4px 14px rgba(232,126,26,0.3)', width: '100%', maxWidth: 320, border: 'none', cursor: 'pointer' }}>
        <Plus size={20} strokeWidth={2.5} /> Creer une facture
      </motion.button>
    </motion.div>
  )
}

export default function Shell() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('toutes')
  const [hasInvoices] = useState(true)
  const filtered = useMemo(() => activeFilter === 'toutes' ? MOCK_INVOICES : MOCK_INVOICES.filter((i) => i.status === activeFilter), [activeFilter])

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#FAF8F5', paddingBottom: 80 }}>
      <motion.header initial={{ y: -56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: easeOutExpo }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 lg:pl-[296px]"
        style={{ height: 56, background: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(230,223,214,0.4)' }}>
        <h1 style={{ fontSize: 16, fontWeight: 600, color: '#4D433A' }}>Mes Factures</h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => router.push('/artisan/factures-electroniques/new')}
          className="flex items-center justify-center rounded-full"
          style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', border: 'none', cursor: 'pointer' }}>
          <Plus size={20} strokeWidth={2.5} color="#fff" />
        </motion.button>
      </motion.header>

      <motion.div variants={pageVariants} initial="hidden" animate="visible" style={{ paddingTop: 56 }}>
        <StatsSection />
        <FilterChips active={activeFilter} onChange={setActiveFilter} />
        <div className="px-4 pb-6" style={{ minHeight: 400 }}>
          <AnimatePresence mode="wait">
            {!hasInvoices || filtered.length === 0 ? (
              <EmptyState key="empty" onCreate={() => router.push('/artisan/factures-electroniques/new')} />
            ) : (
              <motion.div key={`list-${activeFilter}`} variants={listStagger} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-3">
                {filtered.map((inv) => <InvoiceCard key={inv.id} invoice={inv} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.button initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.3 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}
        onClick={() => router.push('/artisan/factures-electroniques/new')}
        className="fixed z-40 flex items-center justify-center rounded-full lg:hidden"
        style={{ bottom: 80, right: 16, width: 56, height: 56, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', boxShadow: '0 4px 20px rgba(232,126,26,0.4)', border: 'none', cursor: 'pointer' }}>
        <Plus size={24} strokeWidth={2.5} color="#FFFFFF" />
      </motion.button>

      <motion.nav initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(230,223,214,0.5)', height: 64 }}>
        <div className="flex items-center justify-around h-full px-2">
          {[
            { label: 'Factures', path: '/artisan/factures-electroniques', active: true },
            { label: 'Nouvelle',  path: '/artisan/factures-electroniques/new', active: false },
            { label: 'Dashboard', path: '/artisan/dashboard', active: false },
          ].map((item) => (
            <motion.button key={item.path} whileTap={{ scale: 0.9 }} onClick={() => router.push(item.path)}
              className="flex flex-col items-center justify-center gap-1"
              style={{ width: 64, height: 56, background: 'none', border: 'none', cursor: 'pointer' }}>
              <FileText size={22} strokeWidth={item.active ? 2.5 : 1.5} style={{ color: item.active ? '#E87E1A' : '#A89B8C' }} />
              <span style={{ fontSize: 11, fontWeight: item.active ? 600 : 500, color: item.active ? '#C9650F' : '#A89B8C' }}>{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </div>
  )
}