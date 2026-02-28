import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { ENFORCE_UNLOCK } from "@/lib/featureFlags";

export const runtime = "nodejs";

type ConversationRow = {
  id: string;
  project_id: string;
  artisan_id: string;
  client_id: string;
  created_at: string;
  last_message_at: string | null;
};

type ProjectRow = {
  id: string;
  category: string | null;
  category_details: string | null;
  location: string | null;
  postal_prefix: string | null;
  first_name: string | null;
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const role = (url.searchParams.get("role") ?? "").trim();

    if (role !== "artisan" && role !== "client") {
      return NextResponse.json({ ok: false, error: "Role invalide." }, { status: 400 });
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
    let query = dbClient
      .from("conversations")
      .select("id, project_id, artisan_id, client_id, created_at")
      .order("created_at", { ascending: false });

    if (role === "artisan") query = query.eq("artisan_id", user.id);
    if (role === "client") query = query.eq("client_id", user.id);

    const { data: conversations, error } = await query;

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    let filtered = conversations ?? [];
    if (ENFORCE_UNLOCK && role === "artisan" && filtered.length > 0) {
      const unlockRes = await dbClient
        .from("project_unlocks")
        .select("project_id")
        .eq("artisan_id", user.id)
        .eq("status", "paid")
        .in("project_id", filtered.map((c) => c.project_id));

      const allowed = new Set((unlockRes.data ?? []).map((u: { project_id: string }) => u.project_id));
      filtered = filtered.filter((c) => allowed.has(c.project_id));
    }

    const projectIds = filtered.map((c) => c.project_id);
    if (!projectIds.length) {
      return NextResponse.json({ ok: true, conversations: [] }, { status: 200 });
    }

    const projectsRes = await dbClient
      .from("publier_projets")
      .select("id, category, category_details, location, postal_prefix, first_name")
      .in("id", projectIds);

    const conversationIds = filtered.map((c) => c.id);
    const messagesRes = await dbClient
      .from("messages")
      .select("conversation_id, body, created_at, sender_id")
      .in("conversation_id", conversationIds)
      .order("created_at", { ascending: false });

    const projectsById = new Map<string, ProjectRow>();
    (projectsRes.data ?? []).forEach((p: ProjectRow) => projectsById.set(p.id, p));

    const lastByConversation = new Map<string, { body: string; created_at: string }>();
    const unreadByConversation = new Map<string, number>();
    (messagesRes.data ?? []).forEach(
      (m: { conversation_id: string; body: string; created_at: string; sender_id: string }) => {
        if (!lastByConversation.has(m.conversation_id)) {
          lastByConversation.set(m.conversation_id, { body: m.body, created_at: m.created_at });
        }
        if (m.sender_id !== user.id) {
          unreadByConversation.set(m.conversation_id, (unreadByConversation.get(m.conversation_id) ?? 0) + 1);
        }
      }
    );

    const rows = filtered.map((c: ConversationRow) => {
      const project = projectsById.get(c.project_id);
      const last = lastByConversation.get(c.id);

      return {
        ...c,
        project: project ?? null,
        last_message_text: last?.body ?? null,
        last_message_at: last?.created_at ?? null,
        unread_count: unreadByConversation.get(c.id) ?? 0,
        counterpart_name: role === "artisan" ? project?.first_name ?? "Client" : "Artisan",
      };
    });

    return NextResponse.json({ ok: true, conversations: rows }, { status: 200 });
  } catch (e) {
    console.error("[api/messages/conversations] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}