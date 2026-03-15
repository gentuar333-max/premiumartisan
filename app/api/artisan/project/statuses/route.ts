import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";

type StatusRow = {
  project_id: string;
  status: string | null;
  conversation_id: string | null;
};

type UnlockStatusRow = {
  project_id: string;
  status: string | null;
};

type ConversationStatusRow = {
  project_id: string;
  id: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const projectIds = Array.isArray(body?.projectIds)
      ? body.projectIds
          .map((x: unknown) => String(x ?? "").trim())
          .filter((id: string) => id && id !== "undefined")
      : [];

    if (!projectIds.length) {
      return NextResponse.json({ ok: true, statuses: {} }, { status: 200 });
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

    const { data: unlockRows, error: unlockErr } = await serviceSupabase
      .from("project_unlocks")
      .select("project_id, status")
      .eq("artisan_id", user.id)
      .in("project_id", projectIds);

    if (unlockErr) {
      return NextResponse.json({ ok: false, error: unlockErr.message }, { status: 500 });
    }

    const { data: convRows, error: convErr } = await serviceSupabase
      .from("conversations")
      .select("project_id, id")
      .eq("artisan_id", user.id)
      .in("project_id", projectIds);

    if (convErr) {
      return NextResponse.json({ ok: false, error: convErr.message }, { status: 500 });
    }

    const map: Record<string, StatusRow> = {};
    projectIds.forEach((pid: string) => {
      map[pid] = { project_id: pid, status: null, conversation_id: null };
    });

    (unlockRows ?? []).forEach((u: UnlockStatusRow) => {
      map[u.project_id] = {
        ...(map[u.project_id] ?? { project_id: u.project_id, status: null, conversation_id: null }),
        status: u.status ?? null,
      };
    });

    (convRows ?? []).forEach((c: ConversationStatusRow) => {
      map[c.project_id] = {
        ...(map[c.project_id] ?? { project_id: c.project_id, status: null, conversation_id: null }),
        conversation_id: c.id ?? null,
      };
    });

    return NextResponse.json({ ok: true, statuses: map }, { status: 200 });
  } catch (e) {
    console.error("[api/artisan/project/statuses] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}