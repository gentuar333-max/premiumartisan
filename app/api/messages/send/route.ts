import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";
import { ENFORCE_UNLOCK } from "@/lib/featureFlags";

export const runtime = "nodejs";

type ConversationRow = {
  id: string;
  project_id: string;
  artisan_id: string;
  client_id: string;
  created_at: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const projectId = String(body?.projectId ?? body?.id ?? "").trim();
    const text = String(body?.body ?? "").trim();

    if (!projectId || projectId === "undefined" || !text) {
      return NextResponse.json({ ok: false, error: "Payload invalide." }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const dbClient = supabase;
    const { data: project, error: projectErr } = await dbClient
      .from("publier_projets")
      .select("id, client_id")
      .eq("id", projectId)
      .maybeSingle();

    if (projectErr || !project) {
      return NextResponse.json({ ok: false, error: "Projet introuvable." }, { status: 404 });
    }

    if (!project.client_id) {
      return NextResponse.json({ ok: false, error: "Client du projet introuvable." }, { status: 400 });
    }

    const isClient = user.id === project.client_id;

    if (ENFORCE_UNLOCK && !isClient) {
      const { data: unlock } = await dbClient
        .from("project_unlocks")
        .select("id")
        .eq("project_id", projectId)
        .eq("artisan_id", user.id)
        .eq("status", "paid")
        .maybeSingle();

      if (!unlock) {
        return NextResponse.json({ ok: false, error: "Contact non debloque." }, { status: 403 });
      }
    }

    const serviceClient = createSupabaseServiceClient();
    let conversation: ConversationRow | null = null;

    if (isClient) {
      const { data: existingConv, error: convErr } = await serviceClient
        .from("conversations")
        .select("id, project_id, artisan_id, client_id, created_at")
        .eq("project_id", projectId)
        .eq("client_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (convErr) {
        return NextResponse.json({ ok: false, error: convErr.message }, { status: 500 });
      }
      conversation = existingConv ?? null;
    } else {
      const { data: upserted, error: convErr } = await serviceClient
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

      if (convErr || !upserted) {
        return NextResponse.json(
          { ok: false, error: convErr?.message ?? "Conversation inaccessible." },
          { status: 500 }
        );
      }
      conversation = upserted;
    }

    if (!conversation) {
      return NextResponse.json({ ok: false, error: "Conversation introuvable." }, { status: 404 });
    }

    if (conversation.client_id !== user.id && conversation.artisan_id !== user.id) {
      return NextResponse.json({ ok: false, error: "Acces refuse." }, { status: 403 });
    }

    const { data: inserted, error: msgErr } = await serviceClient
      .from("messages")
      .insert({
        conversation_id: conversation.id,
        project_id: projectId,
        sender_id: user.id,
        body: text,
      })
      .select("id, conversation_id, project_id, sender_id, body, created_at")
      .single();

    if (msgErr || !inserted) {
      return NextResponse.json({ ok: false, error: msgErr?.message ?? "Message non envoye." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, conversation, message: inserted }, { status: 200 });
  } catch (e) {
    console.error("[api/messages/send] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}
