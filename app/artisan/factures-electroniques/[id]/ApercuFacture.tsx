'use client'
// app/artisan/factures-electroniques/[id]/ApercuFacture.tsx

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import StatusBanner, { type InvoiceStatus } from '../components/StatusBanner'
import InvoiceDocument from '../components/InvoiceDocument'
import ActionCards from '../components/ActionCards'
import HistoryTimeline from '../components/HistoryTimeline'
import { MOCK_ARTISAN, MOCK_CLIENT, MOCK_SERVICES, HISTORY_EVENTS } from '../mock-data'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const TOTAL_HT  = 850.0
const TVA_AMOUNT = 170.0
const TOTAL_TTC  = 1020.0

export default function ApercuFacture({ id }: { id: string }) {
  const router = useRouter()
  const [status, setStatus] = useState<InvoiceStatus>('En attente')
  const invoiceNumber = `FA-${id}`

  const handleMarkPaid     = useCallback(() => setStatus('Payee'), [])
  const handleSend         = useCallback(() => console.log('Envoyer', invoiceNumber), [invoiceNumber])
  const handleDownloadPDF  = useCallback(() => console.log('PDF', invoiceNumber), [invoiceNumber])
  const handleEdit         = useCallback(() => router.push('/artisan/factures-electroniques/new'), [router])
  const handleDelete       = useCallback(() => console.log('Supprimer', invoiceNumber), [invoiceNumber])

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#FAF8F5', paddingBottom: 80 }}>

      {/* Navbar */}
      <motion.header initial={{ y: -56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: easeOutExpo }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{ height: 56, background: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(230,223,214,0.4)' }}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => router.back()}
          style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4D433A', background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7-7 7 7 7"/></svg>
        </motion.button>
        <h1 style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 16, fontWeight: 600, color: '#4D433A' }}>
          Facture {invoiceNumber}
        </h1>
        <motion.button whileTap={{ scale: 0.9 }}
          style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4D433A', background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </motion.button>
      </motion.header>

      <div style={{ paddingTop: 56 }}>
        <StatusBanner status={status} />

        <div className="mx-auto w-full max-w-7xl px-4 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row lg:gap-6">
            {/* Invoice document */}
            <div className="flex-1 lg:max-w-[60%] xl:max-w-[720px]">
              <InvoiceDocument
                invoiceNumber={invoiceNumber}
                issueDate="26 avril 2026"
                dueDate="26 mai 2026"
                paymentTerms="30 jours"
                artisan={MOCK_ARTISAN}
                client={MOCK_CLIENT}
                services={MOCK_SERVICES}
                totalHT={TOTAL_HT}
                tvaAmount={TVA_AMOUNT}
                totalTTC={TOTAL_TTC}
                notes="Merci pour votre confiance. Paiement sous 30 jours."
                tvaIntra="FR12 123 456 789"
              />
            </div>

            {/* Actions */}
            <div className="mt-4 lg:mt-0 lg:w-[340px] xl:w-[380px] lg:sticky lg:top-[80px] lg:self-start">
              <ActionCards
                status={status}
                onSend={handleSend}
                onMarkPaid={handleMarkPaid}
                onDownloadPDF={handleDownloadPDF}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <HistoryTimeline events={HISTORY_EVENTS} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(230,223,214,0.5)', height: 64 }}>
        <div className="flex items-center justify-around h-full px-2">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => router.push('/artisan/factures-electroniques')}
            className="flex flex-col items-center justify-center gap-1"
            style={{ width: 64, height: 56, background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="22" height="22" fill="none" stroke="#A89B8C" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span style={{ fontSize: 11, fontWeight: 500, color: '#A89B8C' }}>Factures</span>
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => router.push('/artisan/dashboard')}
            className="flex flex-col items-center justify-center gap-1"
            style={{ width: 64, height: 56, background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="22" height="22" fill="none" stroke="#A89B8C" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            <span style={{ fontSize: 11, fontWeight: 500, color: '#A89B8C' }}>Dashboard</span>
          </motion.button>
        </div>
      </nav>
    </div>
  )
}