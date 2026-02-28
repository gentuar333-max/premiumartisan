import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";
import { ENFORCE_UNLOCK } from "@/lib/featureFlags";
import { ContactCardClient } from "./ContactCardClient";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type ProjectPublic = {
  id: string;
  category: string | null;
  category_details: string | null;
  location: string | null;
  postal_prefix: string | null;
  budget: string | number | null;
  surface: string | null;
  description: string | null;
  created_at: string | null;
};

function formatBudget(v: ProjectPublic["budget"]) {
  if (v === null || v === undefined || v === "") return "Budget non précisé";
  if (typeof v === "number") return `${v.toLocaleString("fr-FR")} €`;
  return String(v);
}

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string; projectId?: string }> | { id?: string; projectId?: string };
}) {
  const resolved = (await params) as { id?: string; projectId?: string };
  const raw = resolved?.id ?? resolved?.projectId ?? "";
  const projectId = String(raw ?? "").trim();

  if (!projectId || projectId === "undefined" || !UUID_REGEX.test(projectId)) {
    notFound();
  }

  const serverSupabase = await createSupabaseServerClient();
  const serviceSupabase = createSupabaseServiceClient();

  const {
    data: { user },
  } = await serverSupabase.auth.getUser();

  const unlockPromise = user
    ? serverSupabase
        .from("project_unlocks")
        .select("status")
        .eq("project_id", projectId)
        .eq("artisan_id", user.id)
        .maybeSingle()
    : Promise.resolve({ data: null, error: null });

  const selectCols =
    "id, category, category_details, location, postal_prefix, budget, surface, description, created_at" +
    (!ENFORCE_UNLOCK ? ", phone" : "");

  const [projectRes, unlockRes] = await Promise.all([
    serviceSupabase.from("publier_projets").select(selectCols).eq("id", projectId).maybeSingle(),
    unlockPromise,
  ]);

  if (projectRes.error || !projectRes.data) {
    notFound();
  }

  const project = projectRes.data as ProjectPublic & { phone?: string | null };
  const unlocked = !ENFORCE_UNLOCK || unlockRes.data?.status === "paid";

  let phone: string | null = null;
  let conversationId: string | null = null;

  if (unlocked && user) {
    // DEV BYPASS: use project.phone directly; else use get_client_phone RPC
    if (!ENFORCE_UNLOCK) {
      phone = project.phone ?? null;
    } else {
      const phoneRes = await serverSupabase.rpc("get_client_phone", { p_project_id: projectId });
      phone = (phoneRes.data as string | null) ?? null;
    }
    const convRes = await serverSupabase
      .from("conversations")
      .select("id")
      .eq("project_id", projectId)
      .eq("artisan_id", user.id)
      .maybeSingle();
    conversationId = convRes.data?.id ?? null;
  }

  const title = project.category_details || project.category || "Projet";
  const locationLine = project.location?.trim()
    ? project.location
    : `Département ${project.postal_prefix ?? "-"}`;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/artisan/dashboard"
          className="inline-flex rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          ← Retour au dashboard
        </Link>

        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Détail du projet</p>
              <h1 className="mt-1 text-2xl font-semibold text-slate-900">{title}</h1>
              <p className="mt-1 text-sm text-slate-600">{locationLine}</p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
              {formatBudget(project.budget)}
            </span>
          </header>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <article className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Informations projet</h2>
              <dl className="mt-4 grid gap-4 text-sm">
                <div>
                  <dt className="font-medium text-slate-500">Catégorie</dt>
                  <dd className="mt-1 text-slate-900">{project.category_details || project.category || "-"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Surface</dt>
                  <dd className="mt-1 text-slate-900">{project.surface ? `${project.surface} m²` : "-"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Description</dt>
                  <dd className="mt-1 whitespace-pre-wrap text-slate-900">{project.description || "Aucune description fournie."}</dd>
                </div>
              </dl>
            </article>

            <ContactCardClient
              projectId={projectId}
              initialUnlocked={unlocked}
              initialPhone={phone}
              initialConversationId={conversationId}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
