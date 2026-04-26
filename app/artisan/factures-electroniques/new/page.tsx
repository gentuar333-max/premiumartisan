// app/artisan/factures-electroniques/new/page.tsx
import { createSupabaseServerClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import NouvelleFacture from './NouvelleFacture'

export default async function Page() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/artisan/login')
  return <NouvelleFacture />
}