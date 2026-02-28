import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";
import { ENFORCE_UNLOCK } from "@/lib/featureFlags";

export const runtime = "nodejs";

type UnlockProjectRow = {
  project_id: string;
};

type ProjectContactRow = {
  id: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const projectIds = Array.isArray(body?.projectIds)
      ? body.projectIds
          .map((x: unknown) => String(x ?? "").trim())
          .filter((id) => id && id !== "undefined")
      : [];

    if (!projectIds.length) {
      return NextResponse.json({ ok: true, contacts: {} }, { status: 200 });
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

    let allowedProjectIds = projectIds;

    if (ENFORCE_UNLOCK) {
      const { data: unlockRows, error: unlockErr } = await serviceSupabase
        .from("project_unlocks")
        .select("project_id")
        .eq("artisan_id", user.id)
        .eq("status", "paid")
        .in("project_id", projectIds);

      if (unlockErr) {
        return NextResponse.json({ ok: false, error: unlockErr.message }, { status: 500 });
      }

      allowedProjectIds = (unlockRows ?? [])
        .map((r: UnlockProjectRow) => r.project_id)
        .filter(Boolean);
    }

    if (!allowedProjectIds.length) {
      return NextResponse.json({ ok: true, contacts: {} }, { status: 200 });
    }

    const { data: projects, error: projectErr } = await serviceSupabase
      .from("publier_projets")
      .select("id")
      .in("id", allowedProjectIds);

    if (projectErr) {
      return NextResponse.json({ ok: false, error: projectErr.message }, { status: 500 });
    }

    const contacts: Record<string, { phone: string | null }> = {};

    // DEV BYPASS: when ENFORCE_UNLOCK is false, fetch phone directly (skip get_client_phone RPC)
    if (!ENFORCE_UNLOCK) {
      const { data: projectPhones } = await serviceSupabase
        .from("publier_projets")
        .select("id, phone")
        .in("id", allowedProjectIds);
      (projectPhones ?? []).forEach((row: { id: string; phone: string | null }) => {
        contacts[row.id] = { phone: row.phone ?? null };
      });
    } else {
      const phoneResults = await Promise.all(
        allowedProjectIds.map(async (projectId) => {
          const { data: phoneValue } = await serverSupabase.rpc("get_client_phone", {
            p_project_id: projectId,
          });
          return { projectId, phone: (phoneValue as string | null) ?? null };
        })
      );
      const phonesByProject = new Map<string, string | null>();
      phoneResults.forEach((r) => phonesByProject.set(r.projectId, r.phone));
      (projects ?? []).forEach((p: ProjectContactRow) => {
        contacts[p.id] = {
          phone: phonesByProject.get(p.id) ?? null,
        };
      });
    }

    return NextResponse.json({ ok: true, contacts }, { status: 200 });
  } catch (e) {
    console.error("[api/artisan/project/contacts] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}
