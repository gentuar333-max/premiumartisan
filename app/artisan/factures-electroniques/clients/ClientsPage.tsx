'use client'
// app/artisan/factures-electroniques/clients/ClientsPage.tsx

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Plus, FileText, Mail, MapPin, Building2 } from 'lucide-react'
import BottomNav from '../components/BottomNav'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]
const easeSpring:  [number, number, number, number] = [0.34, 1.56, 0.64, 1]

const CLIENTS = [
  { id: '1', company: 'Batiment Martin SARL',    siret: '412 345 678 00012', email: 'contact@martin.fr',              address: '12 rue de la Paix, 21000 Dijon',             initials: 'BM', color: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)' },
  { id: '2', company: 'Dupont Plomberie',         siret: '398 765 432 10098', email: 'dupont@plomberie.fr',            address: '5 avenue de la Republique, 21000 Dijon',     initials: 'DP', color: 'linear-gradient(135deg,#22C55E 0%,#16A34A 100%)' },
  { id: '3', company: 'Constructions Bernard',    siret: '512 345 678 90123', email: 'info@bernard-construction.fr',  address: '8 rue du Bourg, 21100 Beaune',               initials: 'CB', color: 'linear-gradient(135deg,#F19D3A 0%,#A34C10 100%)' },
  { id: '4', company: 'Electricite Moreau',       siret: '487 654 321 09876', email: 'contact@moreau-elec.fr',        address: '15 rue de la Liberte, 21000 Dijon',          initials: 'EM', color: 'linear-gradient(135deg,#6B5E52 0%,#4D433A 100%)' },
]

function ClientCard({ client }: { client: typeof CLIENTS[0] }) {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: easeOutExpo }}
      whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(107,94,82,0.12)' }}
      whileTap={{ scale: 0.98 }}
      style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(230,223,214,0.7)', borderRadius: 16, padding: 16, backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(26,22,20,0.06)', cursor: 'pointer' }}
    >
      {/* Top row */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{ width: 48, height: 48, background: client.color }}>
          <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>{client.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#4D433A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.company}</h3>
          <div className="flex items-center gap-1 mt-0.5">
            <Building2 size={13} style={{ color: '#A89B8C', flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: '#A89B8C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.siret}</span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }} transition={{ duration: 0.15, ease: easeSpring }}
          onClick={() => router.push('/artisan/factures-electroniques/new')}
          className="flex items-center gap-1 px-3 py-2 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#FFFFFF', fontSize: 13, fontWeight: 600, borderRadius: 10, border: 'none', cursor: 'pointer' }}>
          <FileText size={14} strokeWidth={2} />
          <span className="hidden sm:inline">Facturer</span>
        </motion.button>
      </div>

      {/* Contact info */}
      <div className="mt-3 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Mail size={14} style={{ color: '#A89B8C', flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: '#6B5E52' }}>{client.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} style={{ color: '#A89B8C', flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: '#A89B8C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.address}</span>
        </div>
      </div>
    </motion.div>
  )
}

function EmptySearch({ onClear }: { onClear: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOutExpo }}
      className="flex flex-col items-center justify-center text-center" style={{ minHeight: '50vh', paddingTop: 40 }}>
      <div style={{ width: 120, height: 120, background: '#F2EEE8', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <Search size={48} style={{ color: '#D1C7BB' }} strokeWidth={1} />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#4D433A', marginBottom: 8 }}>Aucun client trouve</h2>
      <p style={{ fontSize: 14, color: '#8C7D6E', maxWidth: 280, marginBottom: 24, lineHeight: 1.6 }}>
        Essayez un autre terme de recherche ou ajoutez un nouveau client.
      </p>
      <button onClick={onClear}
        style={{ padding: '10px 20px', borderRadius: 14, border: '1.5px solid #E6DFD6', background: 'transparent', color: '#6B5E52', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
        Effacer la recherche
      </button>
    </motion.div>
  )
}

export default function ClientsPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return CLIENTS
    const q = query.toLowerCase()
    return CLIENTS.filter((c) =>
      c.company.toLowerCase().includes(q) ||
      c.siret.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#FAF8F5', paddingBottom: 80 }}>

      {/* Navbar */}
      <motion.header initial={{ y: -56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: easeOutExpo }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{ height: 56, background: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(230,223,214,0.4)' }}>
        <h1 style={{ fontSize: 16, fontWeight: 600, color: '#4D433A' }}>Mes Clients</h1>
        <motion.button whileTap={{ scale: 0.9 }}
          style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Plus size={20} strokeWidth={2.5} color="#fff" />
        </motion.button>
      </motion.header>

      <div style={{ paddingTop: 70 }}>
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.1 }}
          className="sticky z-30 px-4 py-3" style={{ top: 56, backgroundColor: '#FAF8F5' }}>
          <div className="flex items-center gap-3 px-4"
            style={{ height: 52, background: '#FFFFFF', border: '1.5px solid #E6DFD6', borderRadius: 14 }}>
            <Search size={20} style={{ color: '#A89B8C', flexShrink: 0 }} />
            <input type="text" placeholder="Rechercher un client..." value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              style={{ color: '#332B25', fontSize: 15, border: 'none', fontFamily: 'inherit' }} />
            <AnimatePresence>
              {query && (
                <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }} onClick={() => setQuery('')}
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 24, height: 24, background: '#E6DFD6', border: 'none', cursor: 'pointer' }}>
                  <X size={14} style={{ color: '#6B5E52' }} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* List */}
        <div className="px-4 mt-2">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4">
                {filtered.map((c) => <ClientCard key={c.id} client={c} />)}
              </motion.div>
            ) : (
              <EmptySearch key="empty" onClear={() => setQuery('')} />
            )}
          </AnimatePresence>
        </div>

        {/* FAB */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.4 }}
          className="fixed z-40 flex justify-center lg:static lg:mt-8" style={{ bottom: 80, left: 0, right: 0 }}>
          <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-4 shadow-lg"
            style={{ background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#FFFFFF', fontWeight: 600, fontSize: 15, borderRadius: 14, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(232,126,26,0.3)' }}>
            <Plus size={20} strokeWidth={2.5} /> Ajouter un client
          </motion.button>
        </motion.div>
      </div>

      <BottomNav active="clients" />
    </div>
  )
}