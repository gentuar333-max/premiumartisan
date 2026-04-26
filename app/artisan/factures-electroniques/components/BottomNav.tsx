'use client'
// app/artisan/factures-electroniques/components/BottomNav.tsx

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FileText, Plus, Users, Settings } from 'lucide-react'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

type ActiveTab = 'factures' | 'nouvelle' | 'clients' | 'parametres'

const TABS = [
  { key: 'factures'   as ActiveTab, label: 'Factures',   icon: FileText, path: '/artisan/factures-electroniques' },
  { key: 'nouvelle'   as ActiveTab, label: 'Nouvelle',   icon: Plus,     path: '/artisan/factures-electroniques/new' },
  { key: 'clients'    as ActiveTab, label: 'Clients',    icon: Users,    path: '/artisan/factures-electroniques/clients' },
  { key: 'parametres' as ActiveTab, label: 'Parametres', icon: Settings, path: '/artisan/factures-electroniques/parametres' },
]

export default function BottomNav({ active }: { active: ActiveTab }) {
  const router = useRouter()

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid rgba(230,223,214,0.5)', height: 64 }}
    >
      <div className="flex items-center justify-around h-full px-2">
        {TABS.map((tab) => {
          const isActive = active === tab.key
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.key}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={() => router.push(tab.path)}
              className="flex flex-col items-center justify-center gap-1"
              style={{ width: 64, height: 56, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {isActive && (
                <motion.div layoutId="nav-dot" className="rounded-full"
                  style={{ width: 4, height: 4, backgroundColor: '#E87E1A', marginBottom: 2 }} />
              )}
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} style={{ color: isActive ? '#E87E1A' : '#A89B8C' }} />
              <span style={{ fontSize: 11, fontWeight: isActive ? 600 : 500, color: isActive ? '#C9650F' : '#A89B8C' }}>
                {tab.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}