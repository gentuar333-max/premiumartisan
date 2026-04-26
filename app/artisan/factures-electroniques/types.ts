// app/artisan/factures-electroniques/types.ts

export interface ServiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  tvaRate: number
}

export interface ClientInfo {
  companyName: string
  siret: string
  email: string
  address: string
}

export interface InvoiceDates {
  invoiceDate: string
  dueDate: string
}

export interface FormData {
  client: ClientInfo
  dates: InvoiceDates
  services: ServiceItem[]
  notes: string
}

export const TVA_OPTIONS = [
  { value: 20, label: '20% — standard' },
  { value: 10, label: '10% — travaux' },
  { value: 5.5, label: '5,5% — renovation energetique' },
  { value: 0, label: '0% — export' },
] as const

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

export function getDefaultDueDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toISOString().split('T')[0]
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function createEmptyService(): ServiceItem {
  return {
    id: generateId(),
    description: '',
    quantity: 1,
    unitPrice: 0,
    tvaRate: 10,
  }
}