import { redirect } from "next/navigation";
// import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function MessagesIndex() {
  // const supabase = await createSupabaseServerClient();
  // const { data: convos } = await supabase
  //  .from("conversations")
  //  .select("project_id")
  //  .order("updated_at", { ascending: false })
  //  .limit(1);

  // if (convos?.[0]?.project_id) redirect(`/messages/${convos[0].project_id}`);

  return (
    <>
      <div className="hidden md:block rounded-2xl bg-white/60 backdrop-blur border shadow-sm" />
      <div className="rounded-2xl bg-white/60 backdrop-blur border shadow-sm flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-sm text-slate-500">MESSAGERIE PRIVEE</div>
          <div className="text-xl font-semibold">Selectionnez une conversation</div>
          <div className="text-slate-500 mt-2">Choisissez un client a gauche.</div>
        </div>
      </div>
    </>
  );
}