"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UnlockSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [error, setError] = useState<string | null>(
    sessionId ? null : "Session de paiement introuvable."
  );

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    let cancelled = false;

    const finalize = async () => {
      try {
        const res = await fetch(`/api/stripe/session-status?session_id=${encodeURIComponent(sessionId)}`, {
          cache: "no-store",
        });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.ok) {
          if (!cancelled) setError(json?.error || "Paiement non confirmé.");
          return;
        }
        const conversationId = String(json.conversationId ?? "").trim();
        if (!conversationId) {
          if (!cancelled) setError("Conversation introuvable après paiement.");
          return;
        }
        router.replace(`/artisan/messages/${encodeURIComponent(conversationId)}?toast=unlock_success`);
      } catch {
        if (!cancelled) setError("Erreur serveur pendant la validation du paiement.");
      }
    };

    void finalize();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {!error ? (
          <>
            <h1 className="text-lg font-semibold text-slate-900">Validation du paiement...</h1>
            <p className="mt-2 text-sm text-slate-600">Redirection vers la conversation sécurisée.</p>
          </>
        ) : (
          <>
            <h1 className="text-lg font-semibold text-rose-800">Erreur</h1>
            <p className="mt-2 text-sm text-rose-700">{error}</p>
            <button
              type="button"
              onClick={() => router.replace("/artisan/dashboard")}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Retour dashboard
            </button>
          </>
        )}
      </div>
    </main>
  );
}
