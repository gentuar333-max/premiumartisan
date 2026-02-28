// app/artisan/dashboard/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error("[artisan/dashboard] Page error:", error);

  return (
    <main className="mx-auto max-w-[900px] px-4 py-10">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="text-[16px] font-semibold text-red-900">
          Erreur de chargement
        </div>
        <div className="mt-2 text-[13px] text-red-800">
          {error?.message || "Une erreur inattendue s'est produite."}
        </div>
        <button
          className="mt-4 rounded-xl bg-red-900 px-4 py-2 text-[14px] font-medium text-white hover:bg-red-800"
          onClick={reset}
        >
          Réessayer
        </button>
      </div>
    </main>
  );
}
