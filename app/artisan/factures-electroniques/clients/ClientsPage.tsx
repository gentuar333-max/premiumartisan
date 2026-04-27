'use client'
// app/artisan/factures-electroniques/clients/ClientsPage.tsx

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Plus, FileText, Mail, MapPin, Building2, Trash2, Loader2 } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabaseBrowser'
import BottomNav from '../components/BottomNav'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface Client {
  id: string
  company_name: string
  siret: string
  email: string
  address: string
  phone: string
}

const COLORS = [
  'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)',
  'linear-gradient(135deg,#22C55E 0%,#16A34A 100%)',
  'linear-gradient(135deg,#F19D3A 0%,#A34C10 100%)',
  'linear-gradient(135deg,#6B5E52 0%,#4D433A 100%)',
  'linear-gradient(135deg,#3B82F6 0%,#1D4ED8 100%)',
]

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function getColor(name: string) {
  const idx = name.charCodeAt(0) % COLORS.length
  return COLORS[idx]
}

// ── Modal ajouter client ──────────────────────────────────────────────────────
function AddClientModal({ onClose, onAdd }: { onClose: () => void; onAdd: (c: Omit<Client, 'id'>) => Promise<void> }) {
  const [form, setForm] = useState({ company_name: '', siret: '', email: '', address: '', phone: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  const handleSubmit = async () => {
    if (!form.company_name.trim()) { setError('Le nom est requis'); return }
    setSaving(true)
    try {
      await onAdd(form)
      onClose()
    } catch {
      setError('Erreur lors de l\'ajout')
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(26,22,20,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: '20px 20px 0 0', padding: '24px 20px 40px', width: '100%', maxWidth: 600 }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: '#E6DFD6', margin: '0 auto 20px' }} />
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#332B25', marginBottom: 20 }}>Ajouter un client</h2>

        {error && <p style={{ color: '#DC2626', fontSize: 13, marginBottom: 12 }}>{error}</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { key: 'company_name', label: 'Nom de l\'entreprise *', placeholder: 'Batiment Martin SARL' },
            { key: 'siret',        label: 'SIRET',                  placeholder: '41234567800012' },
            { key: 'email',        label: 'Email',                  placeholder: 'contact@client.fr' },
            { key: 'address',      label: 'Adresse',                placeholder: '12 rue de la Paix, 21000 Dijon' },
            { key: 'phone',        label: 'Telephone',              placeholder: '+33 6 12 34 56 78' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#8C7D6E', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</label>
              <input value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                style={{ width: '100%', height: 46, borderRadius: 12, border: '1.5px solid #E6DFD6', background: '#fff', fontSize: 15, color: '#332B25', padding: '0 14px', fontFamily: 'inherit', outline: 'none' }}
                onFocus={e => e.currentTarget.style.borderColor = '#E87E1A'}
                onBlur={e  => e.currentTarget.style.borderColor = '#E6DFD6'} />
            </div>
          ))}
        </div>

        <button onClick={handleSubmit} disabled={saving}
          style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#fff', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {saving ? <Loader2 size={18} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Plus size={18} />}
          {saving ? 'Ajout...' : 'Ajouter'}
        </button>
      </motion.div>
    </motion.div>
  )
}

// ── Client card ───────────────────────────────────────────────────────────────
function ClientCard({ client, onDelete, onFacture }: {
  client: Client; onDelete: (id: string) => void; onFacture: (client: Client) => void
}) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Supprimer ${client.company_name} ?`)) return
    setDeleting(true)
    onDelete(client.id)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: easeOutExpo }}
      style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(230,223,214,0.7)', borderRadius: 16, padding: 16, backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(26,22,20,0.06)' }}>

      <div className="flex items-center gap-3">
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: getColor(client.company_name), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{getInitials(client.company_name)}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#4D433A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.company_name}</h3>
          {client.siret && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <Building2 size={12} style={{ color: '#A89B8C', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#A89B8C' }}>{client.siret}</span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button onClick={() => onFacture(client)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '7px 12px', borderRadius: 10, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#fff', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            <FileText size={14} /> Facturer
          </button>
          <button onClick={handleDelete} disabled={deleting}
            style={{ width: 34, height: 34, borderRadius: 10, background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {deleting ? <Loader2 size={14} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Trash2 size={14} />}
          </button>
        </div>
      </div>

      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {client.email && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mail size={13} style={{ color: '#A89B8C', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#6B5E52' }}>{client.email}</span>
          </div>
        )}
        {client.address && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={13} style={{ color: '#A89B8C', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#A89B8C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{client.address}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ClientsPage() {
  const router = useRouter()
  const [clients,  setClients]  = useState<Client[]>([])
  const [loading,  setLoading]  = useState(true)
  const [query,    setQuery]    = useState('')
  const [showModal,setShowModal]= useState(false)

  const getToken = useCallback(async () => {
    const supabase = createSupabaseBrowserClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token ?? null
  }, [])

  const fetchClients = useCallback(async () => {
    setLoading(true)
    try {
      const token = await getToken()
      const res   = await fetch('/api/artisan/clients', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      const json = await res.json()
      if (json.ok) setClients(json.clients)
    } finally {
      setLoading(false)
    }
  }, [getToken])

  useEffect(() => { fetchClients() }, [fetchClients])

  const filtered = useMemo(() => {
    if (!query.trim()) return clients
    const q = query.toLowerCase()
    return clients.filter(c =>
      c.company_name.toLowerCase().includes(q) ||
      c.siret?.includes(q) ||
      c.email?.toLowerCase().includes(q)
    )
  }, [clients, query])

  const handleAdd = useCallback(async (form: Omit<Client, 'id'>) => {
    const token = await getToken()
    const res   = await fetch('/api/artisan/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(form),
    })
    const json = await res.json()
    if (json.ok) fetchClients()
    else throw new Error(json.error)
  }, [getToken, fetchClients])

  const handleDelete = useCallback(async (id: string) => {
    const token = await getToken()
    await fetch(`/api/artisan/clients?id=${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    setClients(cs => cs.filter(c => c.id !== id))
  }, [getToken])

  const handleFacture = useCallback((client: Client) => {
    router.push(`/artisan/factures-electroniques/new?client=${encodeURIComponent(JSON.stringify({
      companyName: client.company_name,
      siret: client.siret,
      email: client.email,
      address: client.address,
    }))}`)
  }, [router])

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#FAF8F5', paddingBottom: 80 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

      {/* Modal */}
      <AnimatePresence>
        {showModal && <AddClientModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
      </AnimatePresence>

      {/* Navbar */}
      <motion.header initial={{ y: -56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: easeOutExpo }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4"
        style={{ height: 56, background: 'rgba(250,248,245,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(230,223,214,0.4)' }}>
        <h1 style={{ fontSize: 16, fontWeight: 600, color: '#4D433A' }}>Mes Clients</h1>
        <button onClick={() => setShowModal(true)}
          style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Plus size={20} strokeWidth={2.5} color="#fff" />
        </button>
      </motion.header>

      <div style={{ paddingTop: 70 }}>
        {/* Search */}
        <div className="sticky z-30 px-4 py-3" style={{ top: 56, backgroundColor: '#FAF8F5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, background: '#fff', border: '1.5px solid #E6DFD6', borderRadius: 14, padding: '0 14px' }}>
            <Search size={18} style={{ color: '#A89B8C', flexShrink: 0 }} />
            <input type="text" placeholder="Rechercher un client..." value={query} onChange={e => setQuery(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: '#332B25', fontFamily: 'inherit' }} />
            <AnimatePresence>
              {query && (
                <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setQuery('')}
                  style={{ width: 22, height: 22, borderRadius: '50%', background: '#E6DFD6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={12} style={{ color: '#6B5E52' }} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* List */}
        <div style={{ padding: '4px 16px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
              <Loader2 size={32} style={{ color: '#E87E1A', animation: 'spin 0.8s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, background: '#F2EEE8', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Building2 size={48} style={{ color: '#D1C7BB' }} strokeWidth={1} />
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#4D433A', marginBottom: 8 }}>
                {query ? 'Aucun resultat' : 'Aucun client'}
              </h2>
              <p style={{ fontSize: 14, color: '#8C7D6E', maxWidth: 260, marginBottom: 24, lineHeight: 1.6 }}>
                {query ? 'Essayez un autre terme.' : 'Ajoutez votre premier client.'}
              </p>
              {!query && (
                <button onClick={() => setShowModal(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 14, background: 'linear-gradient(135deg,#E87E1A 0%,#C9650F 100%)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 600, fontFamily: 'inherit' }}>
                  <Plus size={18} /> Ajouter un client
                </button>
              )}
            </motion.div>
          ) : (
            <AnimatePresence>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filtered.map(c => (
                  <ClientCard key={c.id} client={c} onDelete={handleDelete} onFacture={handleFacture} />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <BottomNav active="clients" />
    </div>
  )
}