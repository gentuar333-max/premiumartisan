// app/artisan/factures-electroniques/page.tsx
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import FacturesElectroniquesShell from "./FacturesElectroniquesShell";

export default async function FacturesElectroniquesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/artisan/login");

  return <FacturesElectroniquesShell userEmail={user.email} />;
}