// app/artisan/factures-electroniques/clients/page.tsx
import { createSupabaseServerClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import ClientsPage from './ClientsPage'

export default async function Page() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/artisan/login')
  return <ClientsPage />
}