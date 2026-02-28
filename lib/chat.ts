import type { SupabaseClient } from "@supabase/supabase-js";

export type UnlockStatus = {
  unlocked: boolean;
  status: string | null;
  conversationId: string | null;
};

export async function ensureConversationForUnlock(params: {
  supabase: SupabaseClient;
  projectId: string;
  artisanId: string;
  clientId: string;
}) {
  const { supabase, projectId, artisanId, clientId } = params;

  const { data, error } = await supabase
    .from("conversations")
    .upsert(
      {
        project_id: projectId,
        artisan_id: artisanId,
        client_id: clientId,
      },
      {
        onConflict: "project_id,artisan_id",
      }
    )
    .select("id")
    .single();

  if (error) throw error;
  return data?.id as string;
}

export async function getUnlockStatus(params: {
  supabase: SupabaseClient;
  projectId: string;
  artisanId: string;
}) {
  const { supabase, projectId, artisanId } = params;

  const { data, error } = await supabase
    .from("project_unlocks")
    .select("status")
    .eq("project_id", projectId)
    .eq("artisan_id", artisanId)
    .maybeSingle();

  if (error) throw error;

  const row = (data ?? null) as { status: string | null } | null;
  const status = row?.status ?? null;
  const unlocked = status === "paid";

  let conversationId: string | null = null;
  if (unlocked) {
    const { data: conv, error: convErr } = await supabase
      .from("conversations")
      .select("id")
      .eq("project_id", projectId)
      .eq("artisan_id", artisanId)
      .maybeSingle();
    if (!convErr) conversationId = (conv?.id as string | undefined) ?? null;
  }

  return {
    unlocked,
    status,
    conversationId,
  } as UnlockStatus;
}
