import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";
import { getUnlockStatus } from "@/lib/chat";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const projectIds = Array.isArray(body?.projectIds)
      ? body.projectIds.map((x: unknown) => String(x ?? "").trim()).filter(Boolean)
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
    const statuses: Record<string, { unlocked: boolean; status: string | null; conversationId: string | null }> = {};

    await Promise.all(
      projectIds.map(async (projectId) => {
        try {
          const state = await getUnlockStatus({
            supabase: serviceSupabase,
            projectId,
            artisanId: user.id,
          });
          statuses[projectId] = state;
        } catch {
          statuses[projectId] = { unlocked: false, status: null, conversationId: null };
        }
      })
    );

    return NextResponse.json({ ok: true, statuses }, { status: 200 });
  } catch (e) {
    console.error("[api/unlock/status] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}
