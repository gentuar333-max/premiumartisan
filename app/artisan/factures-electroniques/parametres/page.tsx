// app/artisan/factures-electroniques/parametres/page.tsx
import { createSupabaseServerClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import ParametresPage from './ParametresPage'

export default async function Page() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/artisan/login')
  return <ParametresPage />
}