"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type Conversation = {
  id: string;
  project_id: string;
  artisan_id: string;
  client_id: string;
  created_at: string;
  last_message_at: string | null;
  last_message_text: string | null;
  counterpart_name: string;
  project: {
    id: string;
    category?: string | null;
    category_details?: string | null;
    location?: string | null;
    postal_prefix?: string | null;
  } | null;
};

type Msg = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

function formatConversationTitle(c: Conversation) {
  return c.project?.category_details || c.project?.category || "Projet";
}

function MessagesContent() {
  const searchParams = useSearchParams();
  const initialConversationId = searchParams.get("conversationId");
  const initialProjectId = searchParams.get("projectId");
  const toastParam = searchParams.get("toast");

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(initialConversationId);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConversationId) ?? null,
    [conversations, activeConversationId]
  );

  const loadCurrentUser = useCallback(async () => {
    const res = await fetch("/api/auth/me", { cache: "no-store" });
    const json = await res.json().catch(() => null);
    if (res.ok && json?.ok && json?.user?.id) setCurrentUserId(String(json.user.id));
    else setCurrentUserId(null);
  }, []);

  const loadConversations = useCallback(async () => {
    setLoadingConversations(true);
    try {
      const res = await fetch("/api/messages/conversations?role=artisan", { cache: "no-store" });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) { setConversations([]); setToast(json?.error || "Impossible de charger les conversations."); return; }
      const rows = (json.conversations ?? []) as Conversation[];
      setConversations(rows);
      if (initialConversationId && rows.some((r) => r.id === initialConversationId)) { setActiveConversationId(initialConversationId); return; }
      if (initialProjectId) { const byProject = rows.find((r) => r.project_id === initialProjectId); if (byProject) { setActiveConversationId(byProject.id); return; } }
      if (!activeConversationId && rows.length > 0) setActiveConversationId(rows[0].id);
    } catch { setConversations([]); setToast("Erreur serveur."); }
    finally { setLoadingConversations(false); }
  }, [activeConversationId, initialConversationId, initialProjectId]);

  const loadMessages = useCallback(async (conversationId: string) => {
    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/messages/${encodeURIComponent(conversationId)}`, { cache: "no-store" });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) { setMessages([]); setToast(json?.error || "Impossible de charger les messages."); return; }
      setMessages((json.messages ?? []) as Msg[]);
    } catch { setMessages([]); setToast("Erreur serveur."); }
    finally { setLoadingMessages(false); }
  }, []);

  useEffect(() => { void loadCurrentUser(); void loadConversations(); }, [loadCurrentUser, loadConversations]);
  useEffect(() => { if (!activeConversationId) return; void loadMessages(activeConversationId); }, [activeConversationId, loadMessages]);
  useEffect(() => { if (!toast) return; const t = window.setTimeout(() => setToast(null), 3000); return () => window.clearTimeout(t); }, [toast]);
  useEffect(() => { if (toastParam === "unlock_success") setToast("Contact débloqué ✅"); }, [toastParam]);

  useEffect(() => {
    if (!activeConversationId) return;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) return;
    const sb = createClient(url, anon);
    const channel = sb.channel(`messages-artisan-${activeConversationId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${activeConversationId}` },
        (payload) => {
          const row = payload.new as Msg;
          setMessages((prev) => { if (prev.some((m) => m.id === row.id)) return prev; return [...prev, row]; });
        }).subscribe();
    return () => { sb.removeChannel(channel); };
  }, [activeConversationId]);

  const sendMessage = useCallback(async () => {
    if (!activeConversationId || !draft.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch(`/api/messages/${encodeURIComponent(activeConversationId)}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body: draft.trim() }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) { setToast(json?.error || "Envoi impossible."); return; }
      setDraft("");
      await loadConversations();
    } catch { setToast("Erreur serveur pendant l'envoi."); }
    finally { setSending(false); }
  }, [activeConversationId, draft, sending, loadConversations]);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <h1 className="mb-3 text-lg font-semibold text-slate-900">Messages artisan</h1>
          {loadingConversations ? (
            <div className="text-sm text-slate-500">Chargement des conversations...</div>
          ) : conversations.length === 0 ? (
            <div className="text-sm text-slate-500">Aucune conversation pour le moment.</div>
          ) : (
            <div className="space-y-2">
              {conversations.map((c) => (
                <button key={c.id} onClick={() => setActiveConversationId(c.id)}
                  className={`w-full rounded-xl border px-3 py-2 text-left transition ${c.id === activeConversationId ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                  <div className="text-sm font-semibold text-slate-900">{formatConversationTitle(c)}</div>
                  <div className="text-xs text-slate-500">{c.project?.location || `Département ${c.project?.postal_prefix || "-"}`}</div>
                  <div className="mt-1 line-clamp-1 text-xs text-slate-600">{c.last_message_text || "Aucun message"}</div>
                </button>
              ))}
            </div>
          )}
        </aside>

        <section className="flex min-h-[560px] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-3">
            <div className="text-sm font-semibold text-slate-900">{activeConversation ? formatConversationTitle(activeConversation) : "Sélectionnez une conversation"}</div>
            {activeConversation && <div className="text-xs text-slate-500">Client: {activeConversation.counterpart_name || "Client"}</div>}
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {loadingMessages ? <div className="text-sm text-slate-500">Chargement des messages...</div>
              : !activeConversation ? <div className="text-sm text-slate-500">Choisissez une conversation à gauche.</div>
              : messages.length === 0 ? <div className="text-sm text-slate-500">Démarrez la discussion.</div>
              : messages.map((m) => {
                const mine = !!currentUserId && m.sender_id === currentUserId;
                return (
                  <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${mine ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"}`}>
                      <div>{m.body}</div>
                      <div className={`mt-1 text-[11px] ${mine ? "text-blue-100" : "text-slate-500"}`}>{new Date(m.created_at).toLocaleString("fr-FR")}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="border-t border-slate-200 px-4 py-3">
            <div className="flex items-end gap-2">
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Écrire un message..."
                className="min-h-[44px] flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                disabled={!activeConversation || sending} />
              <button type="button" onClick={sendMessage} disabled={!activeConversation || sending || !draft.trim()}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
                {sending ? "Envoi..." : "Envoyer"}
              </button>
            </div>
          </div>
        </section>
      </div>
      {toast && <div className="fixed bottom-5 right-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-900 shadow">{toast}</div>}
    </main>
  );
}

export default function ArtisanMessagesPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" /></div>}>
      <MessagesContent />
    </Suspense>
  );
}