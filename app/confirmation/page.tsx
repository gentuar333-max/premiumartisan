"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui", background: "#f8fafc" }}>
      <div style={{ maxWidth: 420, textAlign: "center", background: "#ffffff", borderRadius: 20, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px 0", color: "#0f172a" }}>Projet publié</h1>
        <p style={{ color: "#64748b", margin: "0 0 24px 0", fontSize: 15 }}>
          Votre projet a été envoyé avec succès. Les artisans de votre zone vont vous contacter.
        </p>
        {token && (
          <Link href={`/suivi-projet/${encodeURIComponent(token)}`}
            style={{ display: "inline-block", padding: "12px 24px", background: "#2563eb", color: "white", borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            Suivre mon projet
          </Link>
        )}
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" /></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}