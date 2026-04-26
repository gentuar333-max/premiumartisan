'use client'
// app/artisan/factures-electroniques/components/InvoiceDocument.tsx

import { motion } from 'framer-motion'

interface InvoiceDocumentProps {
  invoiceNumber: string
  issueDate: string
  dueDate: string
  paymentTerms: string
  artisan: { name: string; siret: string; address: string; email: string }
  client:  { name: string; siret: string; email: string;  address: string }
  services: { description: string; quantity: number; unitPrice: number; tvaRate: number; totalHT: number }[]
  totalHT: number
  tvaAmount: number
  totalTTC: number
  notes?: string
  tvaIntra?: string
}

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], staggerChildren: 0.1 },
  },
}
const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] } },
}

function fmt(amount: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
}

export default function InvoiceDocument({
  invoiceNumber, issueDate, dueDate, paymentTerms,
  artisan, client, services,
  totalHT, tvaAmount, totalTTC,
  notes, tvaIntra = 'FR12 123 456 789',
}: InvoiceDocumentProps) {
  return (
    <motion.div
      variants={containerVariants} initial="hidden" animate="visible"
      className="w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg,rgba(255,255,255,0.97) 0%,rgba(255,255,255,0.95) 100%)',
        border: '1px solid rgba(230,223,214,0.5)',
        borderRadius: 20,
        boxShadow: '0 2px 16px rgba(107,94,82,0.06)',
        padding: 24,
      }}
    >
      {/* Header */}
      <motion.div variants={sectionVariants}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <span style={{ fontSize: 11, color: '#A89B8C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>FACTURE</span>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#4D433A' }}>N° {invoiceNumber}</h2>
          </div>
          <span style={{ fontSize: 13, color: '#8C7D6E' }}>Emise le {issueDate}</span>
        </div>
        <div className="my-4" style={{ height: 1, background: '#E6DFD6' }} />
      </motion.div>

      {/* Parties */}
      <motion.div variants={sectionVariants} className="flex flex-col md:flex-row md:justify-between gap-6">
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8C7D6E', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 4 }}>Vos coordonnees</span>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#332B25' }}>{artisan.name}</p>
          <p style={{ fontSize: 13, color: '#6B5E52' }}>SIRET: {artisan.siret}</p>
          <p style={{ fontSize: 13, color: '#6B5E52' }}>{artisan.address}</p>
          <p style={{ fontSize: 13, color: '#6B5E52' }}>{artisan.email}</p>
        </div>
        <div className="md:text-right">
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8C7D6E', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 4 }}>Facture a</span>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#332B25' }}>{client.name}</p>
          <p style={{ fontSize: 13, color: '#6B5E52' }}>SIRET: {client.siret}</p>
          <p style={{ fontSize: 13, color: '#6B5E52' }}>{client.address}</p>
          <p style={{ fontSize: 13, color: '#6B5E52' }}>{client.email}</p>
        </div>
      </motion.div>

      {/* Dates */}
      <motion.div variants={sectionVariants} className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8C7D6E', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>Date d&apos;emission</span>
          <span style={{ fontSize: 14, color: '#332B25' }}>{issueDate}</span>
        </div>
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8C7D6E', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>Date d&apos;echeance</span>
          <span style={{ fontSize: 14, color: '#332B25' }}>{dueDate}</span>
        </div>
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8C7D6E', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>Delai</span>
          <span style={{ fontSize: 14, color: '#332B25' }}>{paymentTerms}</span>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={sectionVariants} className="mt-6 overflow-x-auto">
        <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3" style={{ background: '#FAF8F5', borderRadius: '12px 12px 0 0' }}>
          {['Description','Qte','Prix U. HT','TVA','Total HT'].map((h, i) => (
            <span key={h} className={`${i === 0 ? 'col-span-5' : i === 1 ? 'col-span-1 text-right' : 'col-span-2 text-right'}`}
              style={{ fontSize: 11, fontWeight: 700, color: '#8C7D6E', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
          ))}
        </div>
        {services.map((s, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 px-4 py-3"
            style={{ borderBottom: '1px solid #F2EEE8', background: i % 2 === 1 ? '#FAFAF8' : 'transparent' }}>
            <span className="col-span-1 sm:col-span-5" style={{ fontSize: 14, color: '#332B25' }}>{s.description}</span>
            <span className="col-span-1 sm:col-span-1 text-right" style={{ fontSize: 14, color: '#332B25' }}>{s.quantity}</span>
            <span className="col-span-1 sm:col-span-2 text-right" style={{ fontSize: 14, color: '#332B25' }}>{fmt(s.unitPrice)}</span>
            <span className="col-span-1 sm:col-span-2 text-right" style={{ fontSize: 14, color: '#332B25' }}>{s.tvaRate}%</span>
            <span className="col-span-1 sm:col-span-2 text-right" style={{ fontSize: 14, color: '#332B25' }}>{fmt(s.totalHT)}</span>
          </div>
        ))}
      </motion.div>

      {/* Totals */}
      <motion.div variants={sectionVariants} className="mt-5 flex flex-col items-end">
        <div className="w-full sm:w-auto sm:min-w-[280px]">
          <div className="flex justify-between py-2">
            <span style={{ fontSize: 14, color: '#6B5E52' }}>Total HT</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#4D433A' }}>{fmt(totalHT)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span style={{ fontSize: 14, color: '#8C7D6E' }}>TVA (20%)</span>
            <span style={{ fontSize: 14, color: '#6B5E52' }}>{fmt(tvaAmount)}</span>
          </div>
          <div className="my-2" style={{ height: 1, background: '#E6DFD6' }} />
          <div className="flex justify-between py-2">
            <span style={{ fontSize: 16, fontWeight: 700, color: '#4D433A' }}>Total TTC</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#A34C10' }}>{fmt(totalTTC)}</span>
          </div>
        </div>
      </motion.div>

      {/* Notes */}
      {notes && (
        <motion.div variants={sectionVariants} className="mt-5 pt-4" style={{ borderTop: '1px solid #E6DFD6' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8C7D6E', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 4 }}>Notes</span>
          <p style={{ fontSize: 13, color: '#6B5E52' }}>{notes}</p>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div variants={sectionVariants} className="mt-6 pt-4" style={{ borderTop: '1px solid #E6DFD6' }}>
        <p style={{ fontSize: 12, color: '#A89B8C' }}>TVA applicable selon la legislation en vigueur</p>
        <p style={{ fontSize: 12, color: '#A89B8C' }}>N° TVA intracommunautaire: {tvaIntra}</p>
      </motion.div>
    </motion.div>
  )
}