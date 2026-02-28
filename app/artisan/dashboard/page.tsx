// app/artisan/dashboard/page.tsx
import { Suspense } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServiceClient } from "@/lib/supabaseServer";
import { DashboardShell } from "./DashboardShell";

export const dynamic = "force-dynamic";

const DEV_BYPASS_UNLOCK =
  String(process.env.NEXT_PUBLIC_DEV_BYPASS_UNLOCK ?? "").toLowerCase() === "true";

type SearchParams = {
  cp?: string;
  cat?: string;
  sort?: string; // "recent" | "budget_desc"
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
  phone?: string | null; // Only included when DEV_BYPASS_UNLOCK
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

async function fetchProjects(
  supabase: SupabaseClient,
  params: SearchParams,
  opts?: { includePhone?: boolean }
) {
  const cp = (params?.cp ?? "21").toString();
  const cat = (params.cat ?? DEFAULT_CATEGORY).trim() || DEFAULT_CATEGORY;
  const sort = (params.sort ?? "recent").trim();

  const selectCols =
    "id, created_at, first_name, category, category_details, postal_prefix, location, budget, image_url, description" +
    (opts?.includePhone ? ", phone" : "");

  const { data, count, error } = await supabase
    .from("publier_projets")
    .select(selectCols, { count: "exact" })
    .ilike("postal_prefix", `${cp}`) // ← FIX kryesor
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[artisan/dashboard] Supabase error:", error);
  }

  return {
    cp,
    cat,
    sort,
    projects: ((data ?? []) as unknown) as ProjectRow[],
    count: count ?? 0,
    error: error ? error.message : null,
  };
}

function buildUrl(base: string, params: Record<string, string | undefined>) {
  const url = new URL("http://local.test" + base);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") url.searchParams.set(k, v);
  });
  return url.pathname + "?" + url.searchParams.toString();
}

export default async function ArtisanDashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let cp = "21";
  let cat = DEFAULT_CATEGORY;
  let sort = "recent";
  let projects: ProjectRow[] = [];
  let count = 0;
  let error: string | null = null;

  const sp = (await searchParams) as SearchParams;

  try {
    if (!supabaseUrl || !anonKey) {
      error = "Configuration serveur manquante (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY).";
    } else {
      // DEV BYPASS: use service client to fetch phone when bypass is on
      const supabase = DEV_BYPASS_UNLOCK
        ? createSupabaseServiceClient()
        : createClient(supabaseUrl, anonKey, { auth: { persistSession: false } });

      const result = await fetchProjects(supabase, sp, { includePhone: DEV_BYPASS_UNLOCK });
      cp = result.cp;
      cat = result.cat;
      sort = result.sort;
      projects = result.projects;
      count = result.count;
      error = result.error;
    }
  } catch (e: unknown) {
    console.error("[artisan/dashboard] Page crash:", e);
    error = e instanceof Error ? e.message : String(e);
  }

  const catLabel = categoryLabelFromRow(projects[0], cat);

  const baseParams = { cat, sort };
  const sortRecent = buildUrl("/artisan/dashboard", { ...baseParams, cp, sort: "recent" });
  const sortBudget = buildUrl("/artisan/dashboard", { ...baseParams, cp, sort: "budget_desc" });

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
        sortRecentUrl={sortRecent}
        sortBudgetUrl={sortBudget}
      />
    </Suspense>
  );
}