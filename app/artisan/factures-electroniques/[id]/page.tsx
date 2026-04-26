// app/artisan/factures-electroniques/[id]/page.tsx
import { createSupabaseServerClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import ApercuFacture from './ApercuFacture'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/artisan/login')
  const { id } = await params
  return <ApercuFacture id={id} />
}