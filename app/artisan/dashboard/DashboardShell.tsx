"use client";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";
import { pickRandomProjectImage } from "@/lib/projectImages";
import { formatPhone } from "@/lib/formatPhone";

const BRAND_BLUE = "#2563EB";
const BRAND_DARK = "#1E3A8A";

const REGION_TO_PREFIX: Record<string, string> = {
  lyon: "69",
  "côte-d'or": "21",
  "cote d'or": "21",
  paris: "75",
  rhône: "69",
  rhone: "69",
  dijon: "21",
  beaune: "21",
  villeurbanne: "69",
};

const PREFIX_TO_REGION: Record<string, string> = {
  "21": "Côte-d'Or (ex: 21000)",
  "69": "Rhône (ex: 69000)",
  "75": "Paris (ex: 75000)",
};

function parseSearchToPrefix(input: string): string | null {
  const s = input.trim().toLowerCase();
  if (!s) return null;
  const m5 = s.match(/(\d{5})/);
  if (m5) return m5[1].slice(0, 2);
  const m2 = s.match(/^\d{2}$/);
  if (m2) return m2[0];
  const normalized = s.replace(/[éèê]/g, "e").replace(/[àâ]/g, "a").replace(/ô/g, "o");
  for (const [key, prefix] of Object.entries(REGION_TO_PREFIX)) {
    if (normalized.includes(key) || key.includes(normalized)) return prefix;
  }
  return null;
}

// DEV BYPASS: set NEXT_PUBLIC_DEV_BYPASS_UNLOCK=true to skip payment, show phone directly
const DEV_BYPASS_UNLOCK =
  String(process.env.NEXT_PUBLIC_DEV_BYPASS_UNLOCK ?? "").toLowerCase() === "true";

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
  phone?: string | null; // Present when DEV_BYPASS_UNLOCK
};

type DashboardInsertPayload = {
  new: {
    id?: string;
  };
};

function formatBudget(budget: ProjectRow["budget"]) {
  if (budget === null || budget === undefined || budget === "") return "Budget: —";
  if (typeof budget === "number") return `Budget: ${budget.toLocaleString("fr-FR")}€`;

  const raw = String(budget).trim();
  if (!raw) return "Budget: —";

  if (raw.endsWith("_plus")) {
    const n = raw.replace("_plus", "");
    return `Budget: ${n}€+`;
  }

  if (raw.includes("_") || raw.includes("-")) {
    const sep = raw.includes("_") ? "_" : "-";
    const [min, max] = raw.split(sep);
    if (min && max) return `Budget: ${min}€ – ${max}€`;
  }

  if (/^\d+$/.test(raw)) return `Budget: ${raw}€`;

  return `Budget: ${raw}`;
}

function truncate(text: string, max: number) {
  const t = text.trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1) + "…";
}

function formatCategory(category?: string | null) {
  if (!category) return null;
  return category.replace(":", " ·").replace(" : ", " · ");
}

const ProjectCard = memo(function ProjectCard({
  p,
  categoryLabel,
  unlockState,
  contact,
  onUnlockClick,
  onPrefetch,
  unlocking,
}: {
  p: ProjectRow;
  categoryLabel: string;
  unlockState?: { status: string | null };
  contact?: { phone: string | null };
  onUnlockClick: (projectId: string) => void;
  onPrefetch: (projectId: string) => void;
  unlocking: boolean;
}) {
  const isHttpImage = !!(p.image_url && p.image_url.startsWith("http"));
  const imageSrc = isHttpImage ? p.image_url! : pickRandomProjectImage();
  const showFallbackBadge = !p.image_url;

  const categoryRaw = (p.category_details || p.category || categoryLabel || "Peinture") as string;
  const categoryLine = formatCategory(categoryRaw);
  const name = p.first_name?.trim() ? p.first_name.trim() : "Client";
  const zoneLabel = p.location?.trim()
    ? p.location
    : `Département ${p.postal_prefix ?? ""}`;
  const locLine = zoneLabel ? truncate(zoneLabel, 56) : "—";
  const descriptionLine = p.description?.trim() ? p.description.trim() : "";
  const isUnlocked = unlockState?.status === "paid";

  return (
    <div
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
      onMouseEnter={() => p.id && p.id !== "undefined" && onPrefetch(p.id)}
    >
      <div className="relative h-40 w-full overflow-hidden sm:h-44 lg:h-48">
        <Image
          src={imageSrc}
          alt="Projet"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/10" />

        {showFallbackBadge && (
          <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
            Photo illustrative
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight text-rose-600">
            {name}
          </h3>
          <div className="whitespace-nowrap text-sm font-semibold text-emerald-600">
            {formatBudget(p.budget)}
          </div>
        </div>

        {categoryLine && (
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              {categoryLine}
            </span>
          </div>
        )}

        <p className="mt-2 text-sm text-slate-500">{locLine}</p>

        {descriptionLine && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            {descriptionLine}
          </p>
        )}

        {isUnlocked && (
          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
            <span className="font-semibold">Téléphone:</span> {contact?.phone ? formatPhone(contact.phone) : "—"}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-3">
          {p.id && p.id !== "undefined" ? (
            <Link
              prefetch
              href={`/artisan/project/${p.id}`}
              className="text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900"
            >
              Voir le projet
            </Link>
          ) : (
            <span className="text-sm text-slate-400">Voir le projet</span>
          )}

          {p.id && p.id !== "undefined" ? (
            <Link
              prefetch
              href={`/messages/${p.id}`}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Messages
            </Link>
          ) : (
            <span className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-400">
              Messages
            </span>
          )}

          <button
            type="button"
            onClick={() => p.id && p.id !== "undefined" && onUnlockClick(p.id)}
            disabled={!p.id || p.id === "undefined" || (!DEV_BYPASS_UNLOCK && unlocking)}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.28)] transition hover:from-emerald-400 hover:to-emerald-600 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {unlocking ? (
              <>
                <span className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                Déblocage...
              </>
            ) : (
              "Voir le numéro"
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

export function DashboardShell({
  projects,
  count,
  cp,
  sort,
  error,
  categoryLabel,
  sortRecentUrl,
  sortBudgetUrl,
}: {
  projects: ProjectRow[];
  count: number;
  cp: string;
  sort: string;
  error: string | null;
  categoryLabel: string;
  sortRecentUrl: string;
  sortBudgetUrl: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unlockToast = searchParams.get("unlock");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [modalSort, setModalSort] = useState(sort);
  const [newHit, setNewHit] = useState<null | { id: string }>(null);
  const [notifCount, setNotifCount] = useState(0);
  const [unlockStatuses, setUnlockStatuses] = useState<Record<string, { status: string | null; conversation_id: string | null }>>({});
  const [unlockedContacts, setUnlockedContacts] = useState<Record<string, { phone: string | null }>>({});
  const [unlockingProjectId, setUnlockingProjectId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anon) return;

    const supabase = createClient(url, anon);

    // Listen vetëm për INSERT në zonën aktuale (cp)
    const channel = supabase
      .channel(`rt-publier-projets-${cp}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "publier_projets",
          filter: `postal_prefix=eq.${cp}`,
        },
        (payload) => {
          // payload.new ka rreshtin e ri (id, etj.)
          setNewHit({ id: (payload as DashboardInsertPayload).new?.id ?? "" });
          setNotifCount((n) => n + 1);
          // rifresko server data (page.tsx fetch)
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [cp, router]);

  useEffect(() => {
    if (!projects.length) return;
    let isCancelled = false;

    const loadDashboardData = async () => {
      try {
        const res = await fetch("/api/artisan/project/dashboard-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectIds: projects.map((p) => p.id) }),
        });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.ok || isCancelled) return;

        const rawStatuses = json.statuses ?? {};
        const statusMap: Record<string, { status: string | null; conversation_id: string | null }> =
          {};
        Object.entries(rawStatuses).forEach(([pid, v]) => {
          const s = v as { status?: string | null; conversation_id?: string | null };
          statusMap[pid] = {
            status: s?.status ?? null,
            conversation_id: s?.conversation_id ?? null,
          };
        });
        setUnlockStatuses(statusMap);
        setUnlockedContacts((prev) => ({ ...prev, ...(json.contacts ?? {}) }));
      } catch {
        if (!isCancelled) setUnlockStatuses({});
      }
    };

    void loadDashboardData();
    return () => {
      isCancelled = true;
    };
  }, [projects]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  void newHit;

  useEffect(() => {
    if (modalOpen) setModalSort(sort);
  }, [modalOpen, sort]);

  const regionLabel = PREFIX_TO_REGION[cp] ?? `Département ${cp}`;

  const prefetchProjectAndMessages = useCallback(
    (projectId: string) => {
      router.prefetch(`/artisan/project/${projectId}`);
      router.prefetch(`/messages/${projectId}`);
    },
    [router]
  );

  useEffect(() => {
    projects
      .slice(0, 9)
      .filter((p) => p.id && p.id !== "undefined")
      .forEach((p) => prefetchProjectAndMessages(p.id!));
  }, [projects, prefetchProjectAndMessages]);

  const applyFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    const prefix = parseSearchToPrefix(searchValue);
    if (prefix) {
      params.set("cp", prefix);
      setSearchValue("");
    }
    params.set("sort", modalSort);
    router.push(`/artisan/dashboard?${params.toString()}`);
    setModalOpen(false);
  }, [searchValue, modalSort, router, searchParams]);

  const resetFilter = useCallback(() => {
    setSearchValue("");
    setModalSort("recent");
    router.push("/artisan/dashboard");
    setModalOpen(false);
  }, [router]);

  const onUnlockClick = useCallback(
    async (projectId: string) => {
      // DEV BYPASS: purely client-side, onClick => setShowPhone, no API/Stripe/redirect
      if (DEV_BYPASS_UNLOCK) {
        const proj = projects.find((x) => x.id === projectId);
        const phone = proj?.phone ?? null;
        setUnlockStatuses((prev) => ({
          ...prev,
          [projectId]: { status: "paid", conversation_id: prev[projectId]?.conversation_id ?? null },
        }));
        setUnlockedContacts((prev) => ({ ...prev, [projectId]: { phone } }));
        return;
      }

      try {
        setUnlockingProjectId(projectId);
        const res = await fetch("/api/artisan/project/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectIds: [projectId] }),
        });
        const json = await res.json().catch(() => null);

        if (!res.ok || !json?.ok) {
          setToast(json?.error || "Impossible de récupérer le numéro.");
          return;
        }

        const phone = json?.contacts?.[projectId]?.phone ?? null;
        setUnlockStatuses((prev) => ({
          ...prev,
          [projectId]: {
            status: "paid",
            conversation_id: prev[projectId]?.conversation_id ?? null,
          },
        }));
        setUnlockedContacts((prev) => ({
          ...prev,
          [projectId]: { phone },
        }));
        setToast("Numéro affiché.");
      } catch (error) {
        setToast("Erreur serveur pendant la récupération du numéro.");
      } finally {
        setUnlockingProjectId(null);
      }
    },
    [projects]
  );

  useEffect(() => {
    if (unlockToast === "cancel") {
      setToast("Paiement annulé.");
    }
  }, [unlockToast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Premium header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold text-white"
              style={{ backgroundColor: BRAND_BLUE }}
            >
              PA
            </div>
            <span
              className="text-[18px] font-semibold tracking-tight"
              style={{ color: BRAND_DARK }}
            >
              PremiumArtisan
            </span>
            {notifCount > 0 && (
              <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                {notifCount}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-wrap items-center gap-3 sm:ml-8 sm:max-w-md">
            <input
              type="text"
              placeholder="Rechercher une région, ville ou code postal"
              className="flex-1 min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onClick={() => setModalOpen(true)}
              readOnly
            />
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_BLUE }}
            >
              Filtrer
            </button>
          </div>
        </header>

        {newHit && (
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-[13px] text-blue-900 flex items-center justify-between">
            <div>
              <b>Projekt i ri në zonën tënde!</b> U shtua një projekt i ri. Lista u rifreskua.
            </div>
            <button
              className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-blue-800 border border-blue-200 hover:bg-blue-100"
              onClick={() => setNewHit(null)}
            >
              OK
            </button>
          </div>
        )}

        {toast && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[13px] text-amber-900">
            {toast}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-[13px] text-red-800">
            <span className="font-semibold">Erreur</span> — {error}
          </div>
        )}

        {count > 0 ? (
          <section>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-neutral-600">
                <span className="font-semibold text-neutral-900">{count}</span> projet
                {count > 1 ? "s" : ""} en {regionLabel}
              </p>
              <div className="flex gap-2">
                <Link
                  href={sortRecentUrl}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    sort !== "budget_desc"
                      ? "bg-blue-100 text-blue-800"
                      : "text-neutral-600 hover:bg-gray-100"
                  }`}
                >
                  Plus récents
                </Link>
                <Link
                  href={sortBudgetUrl}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    sort === "budget_desc"
                      ? "bg-blue-100 text-blue-800"
                      : "text-neutral-600 hover:bg-gray-100"
                  }`}
                >
                  Budget élevé
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  p={p}
                  categoryLabel={categoryLabel}
                  contact={unlockedContacts[p.id]}
                  unlockState={unlockStatuses[p.id] ? {
                    status: unlockStatuses[p.id]?.status ?? null,
                  } : undefined}
                  onUnlockClick={onUnlockClick}
                  onPrefetch={prefetchProjectAndMessages}
                  unlocking={unlockingProjectId === p.id}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 shadow-sm">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <p className="mb-1 text-base font-medium text-neutral-900">
              Aucun projet dans votre zone pour le moment
            </p>
            <p className="mb-6 text-sm text-neutral-500">
              Les nouveaux projets apparaîtront automatiquement
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_BLUE }}
            >
              Changer de zone
            </button>
          </div>
        )}
      </div>

      {/* Filter modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden
            onClick={() => setModalOpen(false)}
          />
          <div
            className="relative w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-modal-title"
          >
            <h2 id="filter-modal-title" className="mb-4 text-lg font-semibold text-neutral-900">
              Filtrer par zone
            </h2>

            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-500">
              Région, ville ou code postal
            </label>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilter()}
              placeholder="Ex. Lyon, Paris, 21000, Côte-d'Or"
              className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              autoFocus
            />

            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-neutral-500">
              Tri
            </label>
            <div className="mb-6 flex gap-2">
              <button
                type="button"
                onClick={() => setModalSort("recent")}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  modalSort === "recent"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-neutral-600 hover:bg-gray-200"
                }`}
              >
                Plus récents
              </button>
              <button
                type="button"
                onClick={() => setModalSort("budget_desc")}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  modalSort === "budget_desc"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-neutral-600 hover:bg-gray-200"
                }`}
              >
                Budget élevé
              </button>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={applyFilter}
                className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: BRAND_BLUE }}
              >
                Appliquer
              </button>
              <button
                type="button"
                onClick={resetFilter}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-600 hover:bg-gray-100"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
