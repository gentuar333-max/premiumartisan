import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";
import { ENFORCE_UNLOCK } from "@/lib/featureFlags";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const projectId = String(body?.projectId ?? body?.id ?? "").trim();

    if (!projectId || projectId === "undefined") {
      return NextResponse.json({ ok: false, error: "Projet invalide." }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const dbClient = supabase;
    const { data: project, error: projectErr } = await dbClient
      .from("publier_projets")
      .select("id, client_id, first_name, category, category_details")
      .eq("id", projectId)
      .maybeSingle();

    if (projectErr || !project) {
      return NextResponse.json({ ok: false, error: "Projet introuvable." }, { status: 404 });
    }

    if (!project.client_id) {
      return NextResponse.json({ ok: false, error: "Client du projet introuvable." }, { status: 400 });
    }

    const isClient = user.id === project.client_id;
    let allowed = isClient || !ENFORCE_UNLOCK;

    if (!allowed && ENFORCE_UNLOCK) {
      const { data: unlock } = await dbClient
        .from("project_unlocks")
        .select("id")
        .eq("project_id", projectId)
        .eq("artisan_id", user.id)
        .eq("status", "paid")
        .maybeSingle();
      allowed = !!unlock;
    }

    if (!allowed) {
      return NextResponse.json({ ok: false, error: "Contact non débloqué." }, { status: 403 });
    }

    // Use service client to bypass RLS for conversation upsert
    const serviceClient = createSupabaseServiceClient();

    let convo:
      | { id: string; project_id: string; artisan_id: string; client_id: string; created_at: string }
      | null = null;
    let convoErr: { message?: string } | null = null;

    if (isClient) {
      const clientConv = await serviceClient
        .from("conversations")
        .select("id, project_id, artisan_id, client_id, created_at")
        .eq("project_id", projectId)
        .eq("client_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      convo = clientConv.data ?? null;
      convoErr = clientConv.error;
    } else {
      const artisanConv = await serviceClient
        .from("conversations")
        .upsert(
          {
            project_id: projectId,
            artisan_id: user.id,
            client_id: project.client_id,
          },
          { onConflict: "project_id,artisan_id" }
        )
        .select("id, project_id, artisan_id, client_id, created_at")
        .single();
      convo = artisanConv.data ?? null;
      convoErr = artisanConv.error;
    }

    if (convoErr || !convo) {
      console.error("[api/messages/project] conversation upsert failed:", convoErr);
      return NextResponse.json(
        { ok: false, error: convoErr?.message ?? "Conversation inaccessible." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        conversation: convo,
        project: {
          id: project.id,
          first_name: project.first_name ?? "Client",
          title: project.category_details ?? project.category ?? "Projet",
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("[api/messages/project] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}
