"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Msg = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

type ConversationInfo = {
  id: string; // REAL conversation UUID
  project_id: string;
  artisan_id: string;
  client_id: string;
};

export default function ArtisanConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }> | { conversationId: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ routeId = çka është në URL (mund të jetë conversationId OSE projectId)
  const [routeId, setRouteId] = useState<string>("");

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ConversationInfo | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const toastParam = searchParams.get("toast");

  useEffect(() => {
    Promise.resolve(params).then((p) => setRouteId(String(p.conversationId ?? "").trim()));
  }, [params]);

  const loadUser = useCallback(async () => {
    const res = await fetch("/api/auth/me", { cache: "no-store" });
    const json = await res.json().catch(() => null);
    setCurrentUserId(res.ok && json?.ok ? (json.user?.id ?? null) : null);
  }, []);

  const loadMessages = useCallback(async () => {
    if (!routeId) return;
    setLoading(true);

    try {
      // ✅ API duhet ta pranojë id si conversationId OSE projectId
      const res = await fetch(`/api/messages/${encodeURIComponent(routeId)}`, { cache: "no-store" });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        setToast(json?.error || "Conversation introuvable.");
        setConversation(null);
        setMessages([]);
        return;
      }

      setConversation((json.conversation ?? null) as ConversationInfo | null);
      setMessages((json.messages ?? []) as Msg[]);
    } catch {
      setToast("Erreur serveur.");
      setConversation(null);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [routeId]);

  useEffect(() => {
    if (!routeId) return;
    void loadUser();
    void loadMessages();
  }, [routeId, loadUser, loadMessages]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (toastParam === "unlock_success") setToast("Contact débloqué ✅");
  }, [toastParam]);

  // ✅ Realtime: abonohu me conversation.id (REAL), jo me routeId
  useEffect(() => {
    const realConversationId = conversation?.id;
    if (!realConversationId) return;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) return;

    const sb = createClient(url, anon);

    const channel = sb
      .channel(`messages-conversation-${realConversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${realConversationId}`,
        },
        (payload) => {
          const row = payload.new as Msg;
          setMessages((prev) => {
            if (prev.some((m) => m.id === row.id)) return prev;
            return [...prev, row];
          });
        }
      )
      .subscribe();

    return () => {
      sb.removeChannel(channel);
    };
  }, [conversation?.id]);

  // ✅ SEND (optimistic + refresh fast)
  const send = useCallback(async () => {
    if (!routeId || !draft.trim() || sending) return;

    const text = draft.trim();
    setSending(true);

    // optimistic UI
    const optimisticId = `optimistic-${Date.now()}`;
    const optimistic: Msg = {
      id: optimisticId,
      conversation_id: conversation?.id || routeId,
      sender_id: currentUserId || "me",
      body: text,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimistic]);
    setDraft("");

    try {
      const res = await fetch(`/api/messages/${encodeURIComponent(routeId)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text }),
      });

      const raw = await res.text();
      let json: any = null;
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch {
        json = null;
      }

      if (!res.ok || !json?.ok) {
        // rollback optimistic
        setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
        const msg = json?.error || (raw ? raw.slice(0, 240) : null) || `Erreur HTTP ${res.status}`;
        setToast(`Envoi impossible: ${msg}`);
        return;
      }

      // keep UI clean: remove optimistic + refresh
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      await loadMessages();
    } catch (e: any) {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticId));
      setToast(`Erreur réseau: ${e?.message || "inconnue"}`);
    } finally {
      setSending(false);
    }
  }, [routeId, draft, sending, currentUserId, conversation?.id, loadMessages]);

  const title = useMemo(() => {
    if (!conversation) return "Conversation";
    return `Conversation — Projet ${conversation.project_id}`;
  }, [conversation]);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">{title}</div>
            <div className="text-xs text-slate-500">Messagerie privée</div>
          </div>

          <button
            type="button"
            onClick={() => router.push("/artisan/messages")}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Toutes les conversations
          </button>
        </div>

        <div className="h-[60vh] space-y-3 overflow-y-auto px-4 py-4">
          {loading ? (
            <div className="text-sm text-slate-500">Chargement…</div>
          ) : !conversation ? (
            <div className="text-sm text-slate-500">Conversation introuvable.</div>
          ) : messages.length === 0 ? (
            <div className="text-sm text-slate-500">Aucun message pour le moment.</div>
          ) : (
            messages.map((m) => {
              const mine = !!currentUserId && m.sender_id === currentUserId;
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      mine ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    <div>{m.body}</div>
                    <div className={`mt-1 text-[11px] ${mine ? "text-blue-100" : "text-slate-500"}`}>
                      {new Date(m.created_at).toLocaleString("fr-FR")}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="border-t border-slate-200 px-4 py-3">
          <div className="flex items-end gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Écrire un message..."
              className="min-h-[44px] flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              disabled={sending || !conversation}
            />
            <button
              type="button"
              onClick={send}
              disabled={sending || !draft.trim() || !conversation}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-5 right-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900 shadow">
          {toast}
        </div>
      )}
    </main>
  );
}