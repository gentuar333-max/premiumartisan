"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPhone } from "@/lib/formatPhone";

type Props = {
  projectId: string;
  initialUnlocked: boolean;
  initialPhone: string | null;
  initialConversationId: string | null;
};

export function ContactCardClient({
  projectId,
  initialUnlocked,
  initialPhone,
  initialConversationId,
}: Props) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(initialUnlocked);
  const [phone, setPhone] = useState<string | null>(initialPhone);
  const [conversationId, setConversationId] = useState<string | null>(initialConversationId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onUnlock = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/unlock/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        setError(json?.error || "Impossible de débloquer le contact.");
        return;
      }

      if (json?.alreadyPaid || json?.unlocked) {
        setUnlocked(true);
        setPhone(typeof json?.phone === "string" ? json.phone : null);
        setConversationId(typeof json?.conversationId === "string" ? json.conversationId : null);
        return;
      }

      if (typeof json?.checkoutUrl === "string" && json.checkoutUrl) {
        window.open(json.checkoutUrl, "_blank", "noopener,noreferrer");
        return;
      }

      setError("Session de paiement invalide.");
    } catch {
      setError("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  const onOpenChat = () => {
    if (conversationId) {
      router.push(`/artisan/messages/${encodeURIComponent(conversationId)}`);
      return;
    }
    router.push(`/artisan/messages?projectId=${encodeURIComponent(projectId)}`);
  };

  return (
    <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Contact client</h2>

      {!unlocked ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">
            Contact verrouillé
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="h-5 w-36 rounded bg-slate-200/90 blur-[1px]" />
          </div>
          <button
            type="button"
            onClick={onUnlock}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                Déblocage...
              </>
            ) : (
              "Débloquer le contact"
            )}
          </button>
          {error && <p className="text-xs text-rose-700">{error}</p>}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-900">
            Contact débloqué
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900">
            <span className="font-medium text-slate-600">Téléphone:</span> {phone ? formatPhone(phone) : "—"}
          </div>
          <button
            type="button"
            onClick={onOpenChat}
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ouvrir le chat
          </button>
        </div>
      )}
    </aside>
  );
}
