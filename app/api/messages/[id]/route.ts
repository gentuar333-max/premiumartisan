import { NextResponse } from "next/server";
import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
} from "@/lib/supabaseServer";

export const runtime = "nodejs";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(x: string) {
  return UUID_REGEX.test(x);
}

// Resolve rawId -> conversation row
async function resolveConversation(serviceSb: any, rawId: string, userId: string) {
  // 1) rawId is conversation.id
  const byConversationId = await serviceSb
    .from("conversations")
    .select("id, project_id, artisan_id, client_id, created_at")
    .eq("id", rawId)
    .maybeSingle();

  if (byConversationId.data) return byConversationId.data;

  // 2) rawId is project_id (pick the conversation for this user)
  const byProjectId = await serviceSb
    .from("conversations")
    .select("id, project_id, artisan_id, client_id, created_at")
    .eq("project_id", rawId)
    .or(`artisan_id.eq.${userId},client_id.eq.${userId}`)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return byProjectId.data ?? null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolved = (await params) as { id: string };
    const rawId = String(resolved?.id ?? "").trim();

    if (!rawId || rawId === "undefined" || !isUuid(rawId)) {
      return NextResponse.json({ ok: false, error: "ID invalide." }, { status: 400 });
    }

    const serverSb = await createSupabaseServerClient();
    const serviceSb = createSupabaseServiceClient();

    const {
      data: { user },
    } = await serverSb.auth.getUser();

    const devBypass = process.env.NEXT_PUBLIC_DEV_BYPASS_UNLOCK === "true";

    if (!user && !devBypass) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    // In dev bypass, we still need a userId for the project->conversation lookup.
    const userId = user?.id ?? "00000000-0000-0000-0000-000000000000";

    const conversation = await resolveConversation(serviceSb, rawId, userId);

    if (!conversation) {
      return NextResponse.json({ ok: false, error: "Conversation introuvable." }, { status: 404 });
    }

    // Access control (skip in dev bypass)
    if (!devBypass && user) {
      const isClient = conversation.client_id === user.id;
      const isArtisan = conversation.artisan_id === user.id;

      if (!isClient && !isArtisan) {
        return NextResponse.json({ ok: false, error: "Accès refusé." }, { status: 403 });
      }
    }

    const msgsRes = await serviceSb
      .from("messages")
      .select("id, conversation_id, sender_id, body, created_at")
      .eq("conversation_id", conversation.id)
      .order("created_at", { ascending: true });

    if (msgsRes.error) {
      return NextResponse.json({ ok: false, error: msgsRes.error.message }, { status: 500 });
    }

    return NextResponse.json(
      { ok: true, conversation, messages: msgsRes.data ?? [] },
      { status: 200 }
    );
  } catch (e) {
    console.error("[api/messages/:id] GET crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolved = (await params) as { id: string };
    const rawId = String(resolved?.id ?? "").trim();

    if (!rawId || rawId === "undefined" || !isUuid(rawId)) {
      return NextResponse.json({ ok: false, error: "ID invalide." }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    const text = String(body?.body ?? "").trim();
    if (!text) {
      return NextResponse.json({ ok: false, error: "Message vide." }, { status: 400 });
    }

    const serverSb = await createSupabaseServerClient();
    const serviceSb = createSupabaseServiceClient();

    const {
      data: { user },
    } = await serverSb.auth.getUser();

    const devBypass = process.env.NEXT_PUBLIC_DEV_BYPASS_UNLOCK === "true";

    if (!user && !devBypass) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const userId = user?.id ?? "00000000-0000-0000-0000-000000000000";

    const conversation = await resolveConversation(serviceSb, rawId, userId);

    if (!conversation) {
      return NextResponse.json({ ok: false, error: "Conversation introuvable." }, { status: 404 });
    }

    // In dev bypass allow sending even without user
    const senderId = user?.id ?? "dev-artisan";

    const insRes = await serviceSb.from("messages").insert({
      conversation_id: conversation.id,
      sender_id: senderId,
      body: text,
    });

    if (insRes.error) {
      return NextResponse.json({ ok: false, error: insRes.error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("[api/messages/:id] POST crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}