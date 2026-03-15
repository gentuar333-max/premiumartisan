// app/api/artisan/project/dashboard-data/route.ts
import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";

/**
 * Returns per-project:
 *  - statuses       → { status, conversation_id } for THIS artisan
 *  - contacts       → phones for paid projects
 *  - unlock_counts  → total paid unlocks per project (max 3)
 *  - is_locked      → true if someone bought exclusive → others see "Projet réservé"
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const projectIds: string[] = Array.isArray(body?.projectIds)
      ? body.projectIds
          .map((x: unknown) => String(x ?? "").trim())
          .filter((id: string) => id && id !== "undefined")
      : [];

    if (!projectIds.length) {
      return NextResponse.json(
        { ok: true, statuses: {}, contacts: {}, unlock_counts: {}, is_locked: {} },
        { status: 200 }
      );
    }

    const serverSupabase = await createSupabaseServerClient();
    const { data: { user }, error: authErr } = await serverSupabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const svc = createSupabaseServiceClient();

    // ── 3 queries en parallèle ─────────────────────────────────────────────
    const [unlockRes, allUnlocksRes, exclusiveRes] = await Promise.all([

      // 1. Ce artisan's unlock status
      svc
        .from("project_unlocks")
        .select("project_id, status, exclusive")
        .eq("artisan_id", user.id)
        .in("project_id", projectIds),

      // 2. All paid unlocks → count per project (for 🔥 X/3 badge)
      svc
        .from("project_unlocks")
        .select("project_id")
        .eq("status", "paid")
        .in("project_id", projectIds),

      // 3. Exclusive paid unlocks → is_locked
      svc
        .from("project_unlocks")
        .select("project_id, artisan_id")
        .eq("status", "paid")
        .eq("exclusive", true)
        .in("project_id", projectIds),
    ]);

    if (unlockRes.error) {
      console.error("[dashboard-data] unlockRes error:", unlockRes.error);
      return NextResponse.json({ ok: false, error: unlockRes.error.message }, { status: 500 });
    }
    if (allUnlocksRes.error) {
      console.error("[dashboard-data] allUnlocksRes error:", allUnlocksRes.error);
      return NextResponse.json({ ok: false, error: allUnlocksRes.error.message }, { status: 500 });
    }
    if (exclusiveRes.error) {
      console.error("[dashboard-data] exclusiveRes error:", exclusiveRes.error);
      return NextResponse.json({ ok: false, error: exclusiveRes.error.message }, { status: 500 });
    }

    // ── statuses map ───────────────────────────────────────────────────────
    const statuses: Record<string, { status: string | null; conversation_id: string | null }> = {};
    projectIds.forEach(pid => { statuses[pid] = { status: null, conversation_id: null }; });

    (unlockRes.data ?? []).forEach((u: { project_id: string; status: string | null }) => {
      statuses[u.project_id] = { ...(statuses[u.project_id] ?? {}), status: u.status ?? null };
    });

    // ── unlock_counts map (🔥 X/3) ─────────────────────────────────────────
    const unlock_counts: Record<string, number> = {};
    projectIds.forEach(pid => { unlock_counts[pid] = 0; });
    (allUnlocksRes.data ?? []).forEach((row: { project_id: string }) => {
      if (unlock_counts[row.project_id] !== undefined) {
        unlock_counts[row.project_id] += 1;
      }
    });

    // ── override unlock_count → 3 si exclusive paid ekziston ────────────────
    (exclusiveRes.data ?? []).forEach((row: { project_id: string; artisan_id: string }) => {
      unlock_counts[row.project_id] = 3;
    });

    // ── is_locked map (exclusive buyer blocks others) ──────────────────────
    // If locked by THIS artisan → they still see their phone (they paid)
    // If locked by SOMEONE ELSE → "Projet réservé"
    const is_locked: Record<string, boolean> = {};
    const locked_by: Record<string, string> = {}; // artisan_id who locked
    projectIds.forEach(pid => { is_locked[pid] = false; });

    (exclusiveRes.data ?? []).forEach((row: { project_id: string; artisan_id: string }) => {
      is_locked[row.project_id] = true;
      locked_by[row.project_id] = row.artisan_id;
    });

    // Artisan who bought exclusive still has access → don't lock for them
    const is_locked_for_me: Record<string, boolean> = {};
    projectIds.forEach(pid => {
      is_locked_for_me[pid] =
        is_locked[pid] === true && locked_by[pid] !== user.id;
    });

    // ── contacts (phones for paid projects) ────────────────────────────────
    const paidProjectIds = projectIds.filter(id => statuses[id]?.status === "paid");
    const contacts: Record<string, { phone: string | null }> = {};

    if (paidProjectIds.length > 0) {
      const { data: phones } = await svc
        .from("publier_projets")
        .select("id, phone")
        .in("id", paidProjectIds);
      (phones ?? []).forEach((row: { id: string; phone: string | null }) => {
        contacts[row.id] = { phone: row.phone ?? null };
      });
    }

    return NextResponse.json(
      { ok: true, statuses, contacts, unlock_counts, is_locked: is_locked_for_me },
      { 
        status: 200,
        headers: { "Cache-Control": "private, no-store" } // user-specific, no cache
      }
    );

  } catch (e) {
    console.error("[dashboard-data] crash:", JSON.stringify(e), e instanceof Error ? e.stack : "");
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}