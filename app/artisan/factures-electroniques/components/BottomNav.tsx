'use client'
// app/artisan/factures-electroniques/components/BottomNav.tsx

import Link from 'next/link'
import { FileText, Plus, Users, Settings } from 'lucide-react'

type ActiveTab = 'factures' | 'nouvelle' | 'clients' | 'parametres'

const TABS = [
  { key: 'factures'   as ActiveTab, label: 'Factures',   icon: FileText, path: '/artisan/factures-electroniques' },
  { key: 'nouvelle'   as ActiveTab, label: 'Nouvelle',   icon: Plus,     path: '/artisan/factures-electroniques/new' },
  { key: 'clients'    as ActiveTab, label: 'Clients',    icon: Users,    path: '/artisan/factures-electroniques/clients' },
  { key: 'parametres' as ActiveTab, label: 'Parametres', icon: Settings, path: '/artisan/factures-electroniques/parametres' },
]

export default function BottomNav({ active }: { active: ActiveTab }) {
  return (
    <nav
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        height: 64,
        background: 'rgba(255,255,255,0.98)',
        borderTop: '1px solid rgba(230,223,214,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '0 8px',
        WebkitBackdropFilter: 'blur(20px)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.key
        const Icon = tab.icon
        return (
          <Link
            key={tab.key}
            href={tab.path}
            prefetch={true}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 2,
              width: 64, height: 56,
              textDecoration: 'none',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
            }}
          >
            {isActive && (
              <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#E87E1A', marginBottom: 2 }} />
            )}
            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 1.5}
              style={{ color: isActive ? '#E87E1A' : '#A89B8C' }}
            />
            <span style={{
              fontSize: 11,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#C9650F' : '#A89B8C',
              fontFamily: 'inherit',
            }}>
              {tab.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}