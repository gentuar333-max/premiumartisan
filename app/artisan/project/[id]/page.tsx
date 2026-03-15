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
  surface_m2: number | null;
  piece_type: string | null;
  description: string | null;
  created_at: string | null;
};

const BUDGET_LABELS: Record<string, string> = {
  lt_500:         "Moins de 500€",
  "500_1500":     "500€ – 1 500€",
  "1500_3000":    "1 500€ – 3 000€",
  "3000_7000":    "3 000€ – 7 000€",
  "7000_15000":   "7 000€ – 15 000€",
  "15000_25000":  "15 000€ – 25 000€",
  "25000_40000":  "25 000€ – 40 000€",
  "40000_60000":  "40 000€ – 60 000€",
  "60000_100000": "60 000€ – 100 000€",
  "100000_plus":  "100 000€+",
  "15000_40000":  "15 000€ – 40 000€",
  "40000_plus":   "40 000€+",
};

function formatBudget(v: ProjectPublic["budget"]) {
  if (v === null || v === undefined || v === "") return "Budget non précisé";
  if (typeof v === "number") return `${v.toLocaleString("fr-FR")} €`;
  const str = String(v).trim();
  if (BUDGET_LABELS[str]) return BUDGET_LABELS[str];
  if (str.includes("_")) {
    const parts = str.split("_");
    if (parts[1] === "plus") return `${Number(parts[0]).toLocaleString("fr-FR")}€+`;
    const a = Number(parts[0]); const b = Number(parts[1]);
    if (!isNaN(a) && !isNaN(b)) return `${a.toLocaleString("fr-FR")}€ – ${b.toLocaleString("fr-FR")}€`;
  }
  return str;
}

// Convertit "salle_bain" → "Salle de bain", "salon" → "Salon" etc.
const PIECE_LABELS: Record<string, string> = {
  salon:      "Salon / Séjour",
  cuisine:    "Cuisine",
  salle_bain: "Salle de bain",
  chambre:    "Chambre",
  couloir:    "Couloir / Entrée",
  bureau:     "Bureau",
  exterieur:  "Extérieur / Façade",
  autre:      "Autre / Plusieurs pièces",
};

function formatPieceType(raw: string | null): string[] {
  if (!raw) return [];
  return raw.split(",").map(s => {
    const key = s.trim().toLowerCase().replace(/[^a-z_]/g, "");
    return PIECE_LABELS[key] ?? s.trim();
  }).filter(Boolean);
}

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string; projectId?: string }> | { id?: string; projectId?: string };
}) {
  const resolved = (await params) as { id?: string; projectId?: string };
  const raw = resolved?.id ?? resolved?.projectId ?? "";
  const projectId = String(raw ?? "").trim();

  if (!projectId || projectId === "undefined" || !UUID_REGEX.test(projectId)) notFound();

  const serverSupabase = await createSupabaseServerClient();
  const serviceSupabase = createSupabaseServiceClient();

  const { data: { user } } = await serverSupabase.auth.getUser();

  const unlockPromise = user
    ? serverSupabase.from("project_unlocks").select("status").eq("project_id", projectId).eq("artisan_id", user.id).maybeSingle()
    : Promise.resolve({ data: null, error: null });

  const selectCols =
    "id, category, category_details, location, postal_prefix, budget, surface, surface_m2, piece_type, description, created_at" +
    (!ENFORCE_UNLOCK ? ", phone" : "");

  const [projectRes, unlockRes] = await Promise.all([
    serviceSupabase.from("publier_projets").select(selectCols).eq("id", projectId).maybeSingle(),
    unlockPromise,
  ]);

  if (projectRes.error || !projectRes.data) notFound();

  const project = projectRes.data as ProjectPublic & { phone?: string | null };
  const unlocked = !ENFORCE_UNLOCK || unlockRes.data?.status === "paid";

  let phone: string | null = null;
  let conversationId: string | null = null;

  if (unlocked && user) {
    if (!ENFORCE_UNLOCK) {
      phone = project.phone ?? null;
    } else {
      const phoneRes = await serverSupabase.rpc("get_client_phone", { p_project_id: projectId });
      phone = (phoneRes.data as string | null) ?? null;
    }
    const convRes = await serverSupabase.from("conversations").select("id")
      .eq("project_id", projectId).eq("artisan_id", user.id).maybeSingle();
    conversationId = convRes.data?.id ?? null;
  }

  const title = project.category_details || project.category || "Projet";
  const locationLine = project.location?.trim()
    ? project.location
    : `Département ${project.postal_prefix ?? "-"}`;

  const createdDate = project.created_at
    ? new Date(project.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  const surfaceDisplay = project.surface_m2 ?? (project.surface ? parseInt(project.surface) : null);
  const pieces = formatPieceType(project.piece_type);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Back button */}
        <Link
          href="/artisan/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour au dashboard
        </Link>

        {/* Main card */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Header band */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">Détail du projet</p>
            <h1 className="mt-1 text-xl font-bold text-white">{title}</h1>
            <p className="mt-1 text-sm text-blue-100">{locationLine}</p>
          </div>

          <div className="p-6 md:p-8">
            {/* Budget + date row */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-800">
                💰 {formatBudget(project.budget)}
              </span>
              {createdDate && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm text-slate-500">
                  Publié le {createdDate}
                </span>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">

              {/* Infos projet */}
              <article className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Informations projet</h2>
                <dl className="mt-4 grid gap-5 text-sm">

                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <dt className="font-medium text-slate-400">Catégorie</dt>
                    <dd className="font-medium text-slate-900">{project.category_details || project.category || "—"}</dd>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <dt className="font-medium text-slate-400">Localisation</dt>
                    <dd className="text-slate-900">{locationLine}</dd>
                  </div>

                  {/* Pièces */}
                  {pieces.length > 0 && (
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <dt className="font-medium text-slate-400">Pièce{pieces.length > 1 ? "s" : ""}</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {pieces.map(p => (
                          <span key={p} className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs text-slate-700">
                            {p}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}

                  {/* Surface */}
                  {surfaceDisplay && (
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <dt className="font-medium text-slate-400">Surface</dt>
                      <dd className="text-slate-900">
                        <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                          {surfaceDisplay} m²
                        </span>
                      </dd>
                    </div>
                  )}

                  <div className="grid grid-cols-[120px_1fr] gap-2">
                    <dt className="font-medium text-slate-400">Budget estimé</dt>
                    <dd className="font-semibold text-emerald-700">{formatBudget(project.budget)}</dd>
                  </div>

                  {project.description ? (
                    <div>
                      <dt className="font-medium text-slate-400">Description</dt>
                      <dd className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-700">{project.description}</dd>
                    </div>
                  ) : (
                    <div className="grid grid-cols-[120px_1fr] gap-2">
                      <dt className="font-medium text-slate-400">Description</dt>
                      <dd className="italic text-slate-400">Aucune description fournie.</dd>
                    </div>
                  )}

                </dl>
              </article>

              {/* Contact card */}
              <ContactCardClient
                projectId={projectId}
                initialUnlocked={unlocked}
                initialPhone={phone}
                initialConversationId={conversationId}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}