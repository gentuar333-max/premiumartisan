"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

type ConversationApi = {
  id: string;
  project_id: string;
  created_at: string;
  last_message_text: string | null;
  last_message_at: string | null;
  unread_count?: number;
  counterpart_name?: string;
  project?: {
    category?: string | null;
    category_details?: string | null;
  } | null;
};

type ConversationItem = {
  conversationId: string;
  projectId: string;
  clientName: string;
  projectTitle: string;
  lastMessage?: string | null;
  updatedAt: string;
  unreadCount: number;
};

type Msg = {
  id: string;
  senderId: string;
  body: string;
  createdAt: string;
};

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(+date)) return "--:--";
  return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export default function MessagesShell({ projectId }: { projectId: string }) {
  const [convos, setConvos] = useState<ConversationItem[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [clientName, setClientName] = useState("Client");
  const [projectTitle, setProjectTitle] = useState("Projet");
  const [text, setText] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingThread, setLoadingThread] = useState(true);
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [myUserId, setMyUserId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)),
    [messages]
  );

  const loadConversations = useCallback(async () => {
    setLoadingConversations(true);
    try {
      const [meRes, convRes] = await Promise.all([
        fetch("/api/auth/me", { cache: "no-store" }),
        fetch("/api/messages/conversations?role=artisan", { cache: "no-store" }),
      ]);

      const meJson = await meRes.json().catch(() => null);
      const convJson = await convRes.json().catch(() => null);

      if (meRes.ok && meJson?.ok) {
        setMyUserId(String(meJson.user.id));
      } else {
        setMyUserId(null);
      }

      if (!convRes.ok || !convJson?.ok) {
        setConvos([]);
        return;
      }

      const rows = (convJson.conversations ?? []) as ConversationApi[];
      const mapped = rows.map((c) => ({
        conversationId: c.id,
        projectId: c.project_id,
        clientName: c.counterpart_name || "Client",
        projectTitle: c.project?.category_details || c.project?.category || "Projet",
        lastMessage: c.last_message_text,
        updatedAt: c.last_message_at || c.created_at,
        unreadCount: c.unread_count ?? 0,
      }));
      setConvos(mapped);
    } catch {
      setConvos([]);
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    let cancelled = false;

    async function loadThread() {
      setLoadingThread(true);

      try {
        const convRes = await fetch("/api/messages/project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId }),
        });
        const convJson = await convRes.json().catch(() => null);

        if (!convRes.ok || !convJson?.ok) {
          if (!cancelled) {
            setConversationId(null);
            setClientName("Client");
            setProjectTitle("Projet");
            setMessages([]);
            setToast(convJson?.error || "Impossible d'ouvrir la conversation.");
          }
          return;
        }

        const convId = String(convJson.conversation.id);
        const client = String(convJson?.project?.first_name ?? "Client");
        const title = String(convJson?.project?.title ?? "Projet");

        const msgRes = await fetch(`/api/messages/${encodeURIComponent(convId)}`, {
          cache: "no-store",
        });
        const msgJson = await msgRes.json().catch(() => null);

        if (cancelled) return;

        setConversationId(convId);
        setClientName(client);
        setProjectTitle(title);

        if (!msgRes.ok || !msgJson?.ok) {
          setMessages([]);
          setToast(msgJson?.error || "Impossible de charger les messages.");
        } else {
          const mapped = (msgJson.messages ?? []).map(
            (m: { id: string; sender_id: string; body: string; created_at: string }) => ({
              id: m.id,
              senderId: m.sender_id,
              body: m.body,
              createdAt: m.created_at,
            })
          );
          setMessages(mapped);
        }
      } catch {
        if (!cancelled) {
          setConversationId(null);
          setMessages([]);
          setToast("Erreur serveur.");
        }
      } finally {
        if (!cancelled) setLoadingThread(false);
      }
    }

    void loadThread();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  useEffect(() => {
    if (!conversationId) return;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) return;

    const supabase = createClient(url, anon);
    const channel = supabase
      .channel(`messages-shell-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const row = payload.new as {
            id: string;
            sender_id: string;
            body: string;
            created_at: string;
          };
          setMessages((prev) => {
            if (prev.some((m) => m.id === row.id)) return prev;
            const withoutOptimistic = prev.filter(
              (m) =>
                !(
                  m.id.startsWith("tmp_") &&
                  m.senderId === row.sender_id &&
                  m.body === row.body
                )
            );
            return [
              ...withoutOptimistic,
              {
                id: row.id,
                senderId: row.sender_id,
                body: row.body,
                createdAt: row.created_at,
              },
            ];
          });
          void loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, loadConversations]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2000);
    return () => window.clearTimeout(t);
  }, [toast]);

  async function onSend() {
    const body = text.trim();
    if (!body || sending || !myUserId) return;

    setSending(true);

    const optimistic: Msg = {
      id: `tmp_${Date.now()}`,
      senderId: myUserId,
      body,
      createdAt: new Date().toISOString(),
    };
    setMessages((m) => [...m, optimistic]);
    setText("");
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    try {
      const res = await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, body }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        setMessages((m) => m.filter((x) => x.id !== optimistic.id));
        setToast(json?.error || "Envoi impossible.");
      } else if (json?.message?.id) {
        if (json?.conversation?.id) {
          setConversationId(String(json.conversation.id));
        }
        setMessages((m) =>
          m.map((x) =>
            x.id === optimistic.id
              ? {
                  id: String(json.message.id),
                  senderId: String(json.message.sender_id),
                  body: String(json.message.body),
                  createdAt: String(json.message.created_at),
                }
              : x
          )
        );
        void loadConversations();
      }
    } catch {
      setMessages((m) => m.filter((x) => x.id !== optimistic.id));
      setToast("Erreur serveur pendant l'envoi.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <aside className="hidden overflow-hidden rounded-2xl bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] md:flex md:flex-col">
        <div className="border-b border-white/15 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/75 text-xs font-bold tracking-wide text-emerald-700 shadow-sm ring-1 ring-white/30">
              PF
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-[0.18em] text-emerald-600">
                MESSAGES
              </div>
              <div className="text-sm font-semibold text-slate-700">Conversations</div>
            </div>
          </div>
        </div>

        <div className="overflow-auto p-2">
          {loadingConversations ? (
            <div className="space-y-2 px-1 py-2">
              <div className="h-16 animate-pulse rounded-2xl bg-white/40" />
              <div className="h-16 animate-pulse rounded-2xl bg-white/40" />
              <div className="h-16 animate-pulse rounded-2xl bg-white/40" />
            </div>
          ) : convos.length === 0 ? (
            <div className="p-4 text-sm text-slate-500">Aucune conversation.</div>
          ) : (
            convos
            .filter((c) => c.projectId && c.projectId !== "undefined")
            .map((c) => {
              const active = c.projectId === projectId;
              return (
                <Link
                  prefetch
                  key={c.projectId}
                  href={`/messages/${c.projectId}`}
                  className={[
                    "mb-2 block rounded-2xl px-3 py-3 transition",
                    active
                      ? "bg-gradient-to-r from-emerald-500/15 via-white/65 to-white/45 shadow-sm ring-1 ring-emerald-200/70"
                      : "bg-white/35 hover:bg-white/50 ring-1 ring-transparent",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-2 border-b border-white/15 pb-2">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-800">{c.clientName}</div>
                      <div className="truncate text-xs text-slate-600">{c.projectTitle}</div>
                      <div className="mt-1 truncate text-xs text-slate-500">
                        {c.lastMessage ?? "Aucun message"}
                      </div>
                    </div>
                    <div className="whitespace-nowrap text-right text-[10px] text-slate-500">
                      <div>{formatTime(c.updatedAt)}</div>
                      {c.unreadCount > 0 && (
                        <span className="mt-1 inline-flex items-center rounded-full bg-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </aside>

      <section className="flex flex-col overflow-hidden rounded-2xl bg-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
        <div className="border-b border-white/15 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-[11px] font-semibold tracking-[0.2em] text-emerald-600">MESSAGES</div>
            <div className="truncate text-sm font-semibold text-emerald-600">
              {clientName} • {projectTitle}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gradient-to-b from-white/25 via-emerald-50/25 to-white/15 p-4">
          {loadingThread ? (
            <div className="space-y-3">
              <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-white/60" />
              <div className="ml-auto h-10 w-1/2 animate-pulse rounded-2xl bg-emerald-100/80" />
              <div className="h-10 w-3/5 animate-pulse rounded-2xl bg-white/60" />
            </div>
          ) : sortedMessages.length === 0 ? (
            <div className="rounded-2xl bg-white/45 px-4 py-3 text-sm text-slate-600">
              Aucun message. Commencez la discussion.
            </div>
          ) : (
            <div className="space-y-3.5">
              {sortedMessages.map((m) => {
                const isMine = m.senderId === myUserId;
                return (
                  <div key={m.id} className={isMine ? "flex justify-end" : "flex justify-start"}>
                    <div
                      className={[
                        "max-w-[80%] rounded-2xl px-4 py-2 shadow-md",
                        isMine
                          ? "bg-gradient-to-b from-emerald-500 to-emerald-600 text-white"
                          : "bg-white/90 text-slate-900 ring-1 ring-white/60",
                      ].join(" ")}
                    >
                      <div className="text-sm leading-relaxed">{m.body}</div>
                      <div className={["mt-1 text-[10px]", isMine ? "text-white/80" : "text-slate-500"].join(" ")}>
                        {formatTime(m.createdAt)}
                        {m.id.startsWith("tmp_") ? " · envoi..." : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <div className="border-t border-white/15 bg-white/35 p-3">
          <div className="flex items-end gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Écrire un message…"
              className="flex-1 resize-none rounded-xl bg-white/80 px-3 py-2 text-sm text-slate-800 outline-none ring-1 ring-white/60 focus:ring-2 focus:ring-emerald-300"
              rows={2}
            />
            <button
              onClick={onSend}
              disabled={sending || !text.trim()}
              className="inline-flex min-w-[102px] items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(16,185,129,0.25)] transition hover:from-emerald-400 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                  Envoi...
                </>
              ) : (
                "Envoyer"
              )}
            </button>
          </div>
        </div>
      </section>

      {toast && (
        <div className="fixed bottom-5 right-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900 shadow">
          {toast}
        </div>
      )}
    </>
  );
}
