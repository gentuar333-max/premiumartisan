import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";
import { ENFORCE_UNLOCK } from "@/lib/featureFlags";

export const runtime = "nodejs";

/** Single API to fetch statuses + contacts for dashboard. Avoids N+1 and waterfall. */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const projectIds = Array.isArray(body?.projectIds)
      ? body.projectIds
          .map((x: unknown) => String(x ?? "").trim())
          .filter((id) => id && id !== "undefined")
      : [];

    if (!projectIds.length) {
      return NextResponse.json(
        { ok: true, statuses: {}, contacts: {} },
        { status: 200 }
      );
    }

    const serverSupabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authErr,
    } = await serverSupabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const serviceSupabase = createSupabaseServiceClient();

    const [unlockRes, convRes] = await Promise.all([
      serviceSupabase
        .from("project_unlocks")
        .select("project_id, status")
        .eq("artisan_id", user.id)
        .in("project_id", projectIds),
      serviceSupabase
        .from("conversations")
        .select("project_id, id")
        .eq("artisan_id", user.id)
        .in("project_id", projectIds),
    ]);

    if (unlockRes.error) {
      return NextResponse.json({ ok: false, error: unlockRes.error.message }, { status: 500 });
    }
    if (convRes.error) {
      return NextResponse.json({ ok: false, error: convRes.error.message }, { status: 500 });
    }

    const statuses: Record<string, { status: string | null; conversation_id: string | null }> =
      {};
    projectIds.forEach((pid) => {
      statuses[pid] = { status: null, conversation_id: null };
    });
    (unlockRes.data ?? []).forEach((u: { project_id: string; status: string | null }) => {
      statuses[u.project_id] = {
        ...(statuses[u.project_id] ?? {}),
        status: u.status ?? null,
      };
    });
    (convRes.data ?? []).forEach((c: { project_id: string; id: string }) => {
      statuses[c.project_id] = {
        ...(statuses[c.project_id] ?? {}),
        conversation_id: c.id ?? null,
      };
    });

    const paidProjectIds = projectIds.filter((id) => statuses[id]?.status === "paid");
    const contacts: Record<string, { phone: string | null }> = {};

    if (paidProjectIds.length > 0) {
      if (!ENFORCE_UNLOCK) {
        const { data: projectPhones } = await serviceSupabase
          .from("publier_projets")
          .select("id, phone")
          .in("id", paidProjectIds);
        (projectPhones ?? []).forEach((row: { id: string; phone: string | null }) => {
          contacts[row.id] = { phone: row.phone ?? null };
        });
      } else {
        const phoneResults = await Promise.all(
          paidProjectIds.map(async (projectId) => {
            const { data } = await serverSupabase.rpc("get_client_phone", {
              p_project_id: projectId,
            });
            return { projectId, phone: (data as string | null) ?? null };
          })
        );
        phoneResults.forEach((r) => {
          contacts[r.projectId] = { phone: r.phone };
        });
      }
    }

    return NextResponse.json(
      { ok: true, statuses, contacts },
      { status: 200 }
    );
  } catch (e) {
    console.error("[api/artisan/project/dashboard-data] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}
