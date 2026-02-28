import MessagesShell from "@/components/messages/MessagesShell";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
} from "@/lib/supabaseServer";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function AccessDeniedUI({
  title,
  message,
  projectIdInvalid,
}: {
  title: string;
  message: string;
  projectIdInvalid?: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-white/55 p-8 backdrop-blur-xl">
      <div className="rounded-2xl border border-amber-200 bg-amber-50/90 px-6 py-8 shadow-lg">
        <h2 className="text-lg font-semibold text-amber-900">{title}</h2>
        <p className="mt-2 text-sm text-amber-800">{message}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {!projectIdInvalid && (
            <Link
              href="/messages"
              className="inline-flex rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-50"
            >
              Voir les conversations
            </Link>
          )}
          <Link
            href="/artisan/dashboard"
            className="inline-flex rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Retour au dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function ProjectMessagesPage({
  params,
}: {
  params:
    | Promise<{ projectId?: string; id?: string }>
    | { projectId?: string; id?: string };
}) {
  const resolved = (await params) as { projectId?: string; id?: string };
  const raw = resolved?.projectId ?? resolved?.id ?? "";
  const projectId = String(raw ?? "").trim();

  if (!projectId || projectId === "undefined" || !UUID_REGEX.test(projectId)) {
    notFound();
  }

  const serverSupabase = await createSupabaseServerClient();
  const serviceSupabase = createSupabaseServiceClient();

  const [{ data: { user } }, { data: { session } }, projectRes] =
    await Promise.all([
      serverSupabase.auth.getUser(),
      serverSupabase.auth.getSession(),
      serviceSupabase
        .from("publier_projets")
        .select("id, client_id")
        .eq("id", projectId)
        .maybeSingle(),
    ]);

  // ✅ DEBUG: nëse ka error nga DB/RLS/perm, mos e kthe "Projet introuvable"
  if (projectRes.error) {
    console.error("publier_projets select error:", projectRes.error);
    return (
      <AccessDeniedUI
        title="Erreur DB"
        message={projectRes.error.message}
      />
    );
  }

  const effectiveUser = user ?? session?.user ?? null;
  const project = projectRes.data;

  const devBypass = process.env.NEXT_PUBLIC_DEV_BYPASS_UNLOCK === "true";
  if (!devBypass && !effectiveUser) {
    redirect("/artisan/dashboard?toast=messages_auth");
  }

  if (!project) {
    return (
      <AccessDeniedUI
        title="Projet introuvable"
        message="Ce projet n'existe pas ou a été supprimé."
      />
    );
  }

  // Use project.id from DB to ensure we pass the canonical UUID
  const canonicalProjectId = String(project.id);

  const isClient = effectiveUser ? project.client_id === effectiveUser.id : false;

  let allowed: boolean;
  if (isClient) {
    allowed = true;
  } else if (effectiveUser) {
    const { data: unlock, error: unlockErr } = await serviceSupabase
      .from("project_unlocks")
      .select("id")
      .eq("project_id", canonicalProjectId)
      .eq("artisan_id", effectiveUser.id)
      .eq("status", "paid")
      .maybeSingle();

    // (opsionale) edhe këtu debug nëse ka error
    if (unlockErr) {
      console.error("project_unlocks select error:", unlockErr);
    }

    allowed = !!unlock;
  } else {
    allowed = false;
  }

  if (!allowed) {
    return (
      <AccessDeniedUI
        title="Accès refusé"
        message="Vous devez débloquer le contact pour accéder à cette conversation."
      />
    );
  }

  return <MessagesShell projectId={canonicalProjectId} />;
}