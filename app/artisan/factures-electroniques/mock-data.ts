// app/artisan/factures-electroniques/mock-data.ts

export const MOCK_INVOICES = [
  {
    id: '1',
    client: 'Marie Laurent',
    number: 'FA-2026-001',
    date: '26 avr. 2026',
    dueDate: '10 mai 2026',
    amount: 2450.00,
    status: 'en-attente' as const,
  },
  {
    id: '2',
    client: 'Pierre Martin',
    number: 'FA-2026-002',
    date: '22 avr. 2026',
    dueDate: '6 mai 2026',
    amount: 875.50,
    status: 'payee' as const,
  },
  {
    id: '3',
    client: 'Sophie Bernard',
    number: 'FA-2026-003',
    date: '18 avr. 2026',
    dueDate: '2 mai 2026',
    amount: 3200.00,
    status: 'brouillon' as const,
  },
  {
    id: '4',
    client: 'Luc Fontaine',
    number: 'FA-2026-004',
    date: '10 avr. 2026',
    dueDate: '24 avr. 2026',
    amount: 580.00,
    status: 'en-retard' as const,
  },
]

export type InvoiceStatus = 'brouillon' | 'en-attente' | 'payee' | 'en-retard' | 'annulee'

export const STATUS_CONFIG: Record<InvoiceStatus, {
  label: string
  bg: string
  text: string
  border: string
}> = {
  brouillon:   { label: 'Brouillon',  bg: '#F2EEE8', text: '#8C7D6E', border: '#E6DFD6' },
  'en-attente':{ label: 'En attente', bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
  payee:       { label: 'Payee',      bg: '#DCFCE7', text: '#166534', border: '#BBF7D0' },
  'en-retard': { label: 'En retard',  bg: '#FEF2F2', text: '#DC2626', border: '#FECACA' },
  annulee:     { label: 'Annulee',    bg: '#FEF2F2', text: '#991B1B', border: '#FECACA' },
}

export const MOCK_ARTISAN = {
  name: 'Jean Dupont',
  siret: '123 456 789 00012',
  address: '12 Rue de la Republique, 75011 Paris',
  email: 'jean.dupont@peinture-pro.fr',
}

export const MOCK_CLIENT = {
  name: 'Marie Martin',
  siret: '987 654 321 00021',
  email: 'marie.martin@email.com',
  address: '45 Avenue des Champs-Elysees, 75008 Paris',
}

export const MOCK_SERVICES = [
  {
    description: 'Peinture salon 35m2 — Preparation, sous-couche, finition',
    quantity: 1,
    unitPrice: 850.0,
    tvaRate: 20,
    totalHT: 850.0,
  },
]

export const HISTORY_EVENTS = [
  { label: 'Creee',   date: '26/04/2026 a 14:32', color: '#E87E1A' },
  { label: 'Envoyee', date: '26/04/2026 a 14:35', color: '#F59E0B' },
  { label: 'Payee',   date: '05/05/2026 a 09:12', color: '#22C55E' },
]