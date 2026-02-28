"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

type Conversation = {
  id: string;
  project_id: string;
  artisan_id: string;
  client_id: string;
  created_at: string;
  last_message_text: string | null;
  last_message_at: string | null;
  unread_count: number;
  counterpart_name: string;
  project: {
    id: string;
    category?: string | null;
    category_details?: string | null;
    location?: string | null;
  } | null;
};

type Msg = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
  optimistic?: boolean;
};

type Me = { id: string };

export function MessagesWorkspace({
  selectedProjectId,
  autoRedirectFirst = false,
}: {
  selectedProjectId?: string | null;
  autoRedirectFirst?: boolean;
}) {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
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

  const loadMe = useCallback(async () => {
    const res = await fetch("/api/auth/me", { cache: "no-store" });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.ok) {
      setMe(null);
      return null;
    }
    const current = { id: String(json.user.id) };
    setMe(current);
    return current;
  }, []);

  const loadConversations = useCallback(async () => {
    setLoadingConversations(true);
    try {
      const res = await fetch("/api/messages/conversations?role=artisan", { cache: "no-store" });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setConversations([]);
        return;
      }
      setConversations((json.conversations ?? []) as Conversation[]);
    } catch {
      setConversations([]);
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  const bootstrapProjectConversation = useCallback(
    async (projectId: string) => {
      const res = await fetch("/api/messages/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setToast(json?.error || "Impossible d'ouvrir la conversation.");
        return null;
      }
      return json.conversation?.id ? String(json.conversation.id) : null;
    },
    []
  );

  const loadMessages = useCallback(async (conversationId: string) => {
    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/messages/${encodeURIComponent(conversationId)}`, { cache: "no-store" });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setMessages([]);
        setToast(json?.error || "Impossible de charger les messages.");
        return;
      }
      setMessages((json.messages ?? []) as Msg[]);
    } catch {
      setMessages([]);
      setToast("Erreur serveur.");
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    void loadMe();
    void loadConversations();
  }, [loadMe, loadConversations]);

  useEffect(() => {
    if (loadingConversations) return;

    const pickConversation = async () => {
      if (selectedProjectId) {
        const found = conversations.find((c) => c.project_id === selectedProjectId);
        if (found) {
          setActiveConversationId(found.id);
          return;
        }
        const createdId = await bootstrapProjectConversation(selectedProjectId);
        await loadConversations();
        if (createdId) {
          setActiveConversationId(createdId);
          return;
        }
      }

      if (!selectedProjectId && autoRedirectFirst) {
        if (conversations.length > 0) {
          const pid = conversations[0].project_id;
          if (pid && pid !== "undefined")
            router.replace(`/messages/${encodeURIComponent(pid)}`);
          return;
        }
      }

      if (!activeConversationId && conversations.length > 0) {
        setActiveConversationId(conversations[0].id);
      }
    };

    void pickConversation();
  }, [
    loadingConversations,
    selectedProjectId,
    conversations,
    activeConversationId,
    autoRedirectFirst,
    bootstrapProjectConversation,
    loadConversations,
    router,
  ]);

  useEffect(() => {
    if (!activeConversationId) return;
    void loadMessages(activeConversationId);
  }, [activeConversationId, loadMessages]);

  useEffect(() => {
    if (!activeConversationId) return;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) return;

    const sb = createClient(url, anon);
    const channel = sb
      .channel(`messages-sidebar-${activeConversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeConversationId}`,
        },
        (payload) => {
          const row = payload.new as Msg;
          setMessages((prev) => {
            const noDup = prev.filter((m) => !(m.optimistic && m.sender_id === row.sender_id && m.body === row.body));
            if (noDup.some((m) => m.id === row.id)) return noDup;
            return [...noDup, row];
          });
          void loadConversations();
        }
      )
      .subscribe();

    return () => {
      sb.removeChannel(channel);
    };
  }, [activeConversationId, loadConversations]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2000);
    return () => window.clearTimeout(t);
  }, [toast]);

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at)),
    [messages]
  );

  const sendMessage = useCallback(async () => {
    if (!activeConversationId || !me?.id || !draft.trim() || sending) return;

    const text = draft.trim();
    const optimisticId = `optimistic-${Date.now()}`;
    const optimistic: Msg = {
      id: optimisticId,
      conversation_id: activeConversationId,
      sender_id: me.id,
      body: text,
      created_at: new Date().toISOString(),
      optimistic: true,
    };

    setMessages((prev) => [...prev, optimistic]);
    setDraft("");
    setSending(true);

    try {
      const res = await fetch(`/api/messages/${encodeURIComponent(activeConversationId)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
        setToast(json?.error || "Envoi impossible.");
      } else {
        void loadConversations();
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      setToast("Erreur serveur pendant l'envoi.");
    } finally {
      setSending(false);
    }
  }, [activeConversationId, draft, me?.id, sending, loadConversations]);

  const title = activeConversation?.project?.category_details || activeConversation?.project?.category || "Projet";

  return (
    <>
      <aside className="h-full overflow-hidden rounded-3xl border border-white/70 bg-white/60 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <div className="border-b border-white/70 px-4 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Conversations</h2>
          <p className="text-xs text-slate-500">Clients et projets récents</p>
        </div>

        <div className="h-[calc(100%-74px)] space-y-2 overflow-y-auto p-3">
          {loadingConversations ? (
            <>
              <div className="h-16 animate-pulse rounded-2xl bg-slate-200/70" />
              <div className="h-16 animate-pulse rounded-2xl bg-slate-200/70" />
              <div className="h-16 animate-pulse rounded-2xl bg-slate-200/70" />
            </>
          ) : conversations.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-500">
              Aucune conversation pour le moment.
            </div>
          ) : (
            conversations.map((c) => {
              const selected = c.id === activeConversationId;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    if (!c.project_id || c.project_id === "undefined") return;
                    setActiveConversationId(c.id);
                    router.push(`/messages/${encodeURIComponent(c.project_id)}`);
                  }}
                  className={`w-full rounded-2xl border px-3 py-2 text-left transition ${
                    selected
                      ? "border-blue-200 bg-blue-50/80"
                      : "border-white/70 bg-white/70 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-sm font-semibold text-slate-900">
                      {c.counterpart_name || "Client"}
                    </div>
                    {c.unread_count > 0 && (
                      <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                        {c.unread_count}
                      </span>
                    )}
                  </div>
                  <div className="truncate text-xs text-slate-600">{c.project?.category_details || c.project?.category || "Projet"}</div>
                  <div className="mt-1 truncate text-xs text-slate-500">{c.last_message_text || "Aucun message"}</div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      <section className="h-full overflow-hidden rounded-3xl border border-white/70 bg-white/60 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <header className="border-b border-white/70 px-5 py-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Messagerie</div>
          <h1 className="mt-1 text-lg font-semibold text-slate-900">
            {activeConversation ? `${activeConversation.counterpart_name} · ${title}` : "Sélectionnez une conversation"}
          </h1>
        </header>

        <div className="h-[calc(100%-128px)] space-y-3 overflow-y-auto px-5 py-4">
          {loadingMessages ? (
            <>
              <div className="h-14 w-3/5 animate-pulse rounded-2xl bg-slate-200/70" />
              <div className="ml-auto h-14 w-1/2 animate-pulse rounded-2xl bg-blue-200/60" />
              <div className="h-14 w-2/3 animate-pulse rounded-2xl bg-slate-200/70" />
            </>
          ) : !activeConversation ? (
            <div className="text-sm text-slate-500">Choisissez une conversation à gauche.</div>
          ) : sortedMessages.length === 0 ? (
            <div className="text-sm text-slate-500">Aucun message. Démarrez la discussion.</div>
          ) : (
            sortedMessages.map((m) => {
              const mine = m.sender_id === me?.id;
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                      mine
                        ? "bg-gradient-to-b from-blue-500 to-blue-600 text-white"
                        : "border border-white/70 bg-white/85 text-slate-900"
                    }`}
                  >
                    <div>{m.body}</div>
                    <div className={`mt-1 text-[11px] ${mine ? "text-blue-100" : "text-slate-500"}`}>
                      {new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      {m.optimistic ? " · envoi..." : ""}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <footer className="border-t border-white/70 px-5 py-3">
          <div className="flex items-end gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Écrire un message…"
              className="min-h-[46px] flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!activeConversation || sending || !draft.trim()}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.28)] transition hover:from-emerald-400 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? (
                <>
                  <span className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                  Envoi...
                </>
              ) : (
                "Envoyer"
              )}
            </button>
          </div>
        </footer>
      </section>

      {toast && (
        <div className="fixed bottom-5 right-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900 shadow">
          {toast}
        </div>
      )}
    </>
  );
}
