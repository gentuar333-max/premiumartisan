// app/artisan/dashboard/page.tsx
import { Suspense } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServiceClient } from "@/lib/supabaseServer";
import { DashboardShell } from "./DashboardShell";

export const revalidate = 60; // cache 60 sekonda — refresh automatik

const DEV_BYPASS_UNLOCK =
  String(process.env.NEXT_PUBLIC_DEV_BYPASS_UNLOCK ?? "").toLowerCase() === "true";

type SearchParams = {
  cp?: string;
  cat?: string;         // ex: "peinture-interieure,renovation"
  sort?: string;        // "recent" | "budget_desc" | "budget_asc"
  budgetMin?: string;   // ex: "5000"
  budgetMax?: string;   // ex: "20000"
  statut?: string;      // "open" | "complet"
};

type ProjectRow = {
  id: string;
  created_at?: string;
  first_name?: string | null;
  category?: string | null;
  category_details?: string | null;
  postal_prefix?: string | null;
  location?: string | null;
  budget?: number | string | null;
  image_url?: string | null;
  description?: string | null;
  phone?: string | null;
};

const DEFAULT_CATEGORY = "Peinture";

function categoryLabelFromRow(row?: ProjectRow, fallback?: string) {
  return (
    row?.category_details?.trim() ||
    row?.category?.trim() ||
    fallback?.trim() ||
    DEFAULT_CATEGORY
  );
}

// ── Map slug → valori reale në DB ─────────────────────────────
const CAT_SLUG_TO_DB: Record<string, string[]> = {
  "peinture-interieure":  ["peinture:intérieure", "peinture : intérieure", "peinture intérieure", "Peinture intérieure"],
  "peinture-exterieure":  ["peinture:extérieure", "peinture : extérieure", "peinture extérieure", "Peinture extérieure"],
  "renovation":           ["rénovation", "renovation", "Rénovation"],
  "papier-peint":         ["pose papier peint", "papier peint", "Pose papier peint"],
  "salle-de-bain":        ["salle de bain", "Salle de bain"],
  "cuisine":              ["cuisine", "Cuisine"],
  "electricite":          ["électricité", "electricite", "Électricité"],
  "plomberie":            ["plomberie", "Plomberie"],
};

async function fetchProjects(
  supabase: SupabaseClient,
  params: SearchParams,
  opts?: { includePhone?: boolean }
) {
  const cp    = (params?.cp ?? "").toString().trim() || "21";
  const sort  = (params.sort ?? "recent").trim();
  const cats  = (params.cat ?? "").split(",").map(s => s.trim()).filter(Boolean);
  const budgetMin = params.budgetMin ? parseInt(params.budgetMin) : null;
  const budgetMax = params.budgetMax ? parseInt(params.budgetMax) : null;

  const selectCols =
    "id, created_at, first_name, category, category_details, postal_prefix, location, budget, image_url, description, piece_type, surface_m2" +
    (opts?.includePhone ? ", phone" : "");

  let query = supabase
    .from("publier_projets")
    .select(selectCols, { count: "exact" })
    .ilike("postal_prefix", `${cp}`);

  // Shfaq vetëm projektet e konfirmuara nga klienti me email
  // Vendos SKIP_EMAIL_CONFIRMATION=true në .env.local për dev/test
  if (process.env.SKIP_EMAIL_CONFIRMATION !== "true") {
    query = query.eq("confirmed", true);
  }

  // ── Sort ───────────────────────────────────────────────────
  if (sort === "budget_desc") {
    query = query.order("budget", { ascending: false, nullsFirst: false });
  } else if (sort === "budget_asc") {
    query = query.order("budget", { ascending: true, nullsFirst: false });
  } else {
    // "recent" (default)
    query = query.order("created_at", { ascending: false });
  }

  // ── Filtra kategori — OR mbi sluget e zgjedhura ────────────
  if (cats.length > 0) {
    const dbValues: string[] = [];
    cats.forEach(slug => {
      const vals = CAT_SLUG_TO_DB[slug];
      if (vals) dbValues.push(...vals);
    });
    if (dbValues.length > 0) {
      // Supabase OR filter: category_details.ilike.val OR category.ilike.val
      const orParts = dbValues.map(v =>
        `category_details.ilike.%${v}%,category.ilike.%${v}%`
      ).join(",");
      query = query.or(orParts);
    }
  }

  // ── Budget range ───────────────────────────────────────────
  // Budget storehet si string (ex: "5000_10000", "40000_plus") ose number
  // Bëjmë filter mbi rreshtat numeric të budget
  if (budgetMin !== null) {
    query = query.gte("budget", budgetMin);
  }
  if (budgetMax !== null) {
    query = query.lte("budget", budgetMax);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("[artisan/dashboard] Supabase error:", error);
  }

  let projects = ((data ?? []) as unknown) as ProjectRow[];

  // ── Filter statut "complet" / "open" — post-fetch (kërkon unlock_counts) ──
  // Statut-i filtrohet në dashboard-data API, këtu e lëmë të gjitha
  // (filtri real do bëhet client-side bazuar në projectUnlockCounts)

  return {
    cp,
    sort,
    projects,
    count: count ?? 0,
    error: error ? error.message : null,
  };
}

function buildUrl(base: string, params: Record<string, string | undefined>) {
  const url = new URL("http://local.test" + base);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });
  return url.pathname + "?" + url.searchParams.toString();
}

export default async function ArtisanDashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let cp       = "21";
  let sort     = "recent";
  let projects: ProjectRow[] = [];
  let count    = 0;
  let error: string | null = null;

  const sp = (await searchParams) as SearchParams & {
    unlock?: string;
    project_id?: string;
  };

  // ── Fix Stripe redirect: ?cp=&unlock=success&project_id=UUID ──────────────
  // Quand Stripe redirige, cp peut être vide. On résout via project_id.
  const cpRaw = (sp.cp ?? "").toString().trim();
  const unlockProjectId = (sp.project_id ?? "").toString().trim();

  if (!cpRaw && unlockProjectId && supabaseUrl && anonKey) {
    try {
      const svc = createSupabaseServiceClient();
      const { data: proj } = await svc
        .from("publier_projets")
        .select("postal_prefix")
        .eq("id", unlockProjectId)
        .maybeSingle();

      if (proj?.postal_prefix) {
        const resolvedCp = String(proj.postal_prefix).trim();
        // Rebuild URL with correct cp, keep unlock=success for toast
        const { redirect } = await import("next/navigation");
        const params = new URLSearchParams();
        params.set("cp", resolvedCp);
        params.set("unlock", "success");
        params.set("project_id", unlockProjectId);
        redirect(`/artisan/dashboard?${params.toString()}`);
      }
    } catch {
      // Si redirect échoue (redirect throws), laisse continuer
    }
  }

  try {
    if (!supabaseUrl || !anonKey) {
      error = "Configuration serveur manquante.";
    } else {
      const supabase = DEV_BYPASS_UNLOCK
        ? createSupabaseServiceClient()
        : createClient(supabaseUrl, anonKey, { auth: { persistSession: false } });

      // sp.cp peut encore être vide si redirect n'a pas eu lieu
      const spResolved = { ...sp, cp: cpRaw || sp.cp || "21" };
      const result = await fetchProjects(supabase, spResolved, { includePhone: true });
      cp       = result.cp;
      sort     = result.sort;
      projects = result.projects;
      count    = result.count;
      error    = result.error;
    }
  } catch (e: unknown) {
    console.error("[artisan/dashboard] Page crash:", e);
    error = e instanceof Error ? e.message : String(e);
  }

  const catLabel = categoryLabelFromRow(projects[0], sp.cat ?? DEFAULT_CATEGORY);

  // ── Sort URLs — ruajnë GJITHË parametrat aktualë, ndryshojnë vetëm sort ──
  const baseParams: Record<string, string | undefined> = {
    cp,
    cat:       sp.cat,
    budgetMin: sp.budgetMin,
    budgetMax: sp.budgetMax,
    statut:    sp.statut,
  };
  const sortRecentUrl = buildUrl("/artisan/dashboard", { ...baseParams, sort: "recent" });
  const sortBudgetUrl = buildUrl("/artisan/dashboard", { ...baseParams, sort: "budget_desc" });

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        </div>
      }
    >
      <DashboardShell
        projects={projects}
        count={count}
        cp={cp}
        sort={sort}
        error={error}
        categoryLabel={catLabel}
        sortRecentUrl={sortRecentUrl}
        sortBudgetUrl={sortBudgetUrl}
      />
    </Suspense>
  );
}