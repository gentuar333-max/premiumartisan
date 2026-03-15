// app/artisan/factures/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseBrowser";
import FactureForm, { type FactureData } from "@/components/artisan/FactureForm";

export default function EditFacturePage({ params }: { params: { id: string } }) {
  const [facture, setFacture] = useState<FactureData | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("factures")
        .select("*")
        .eq("id", params.id)
        .maybeSingle();
      if (data) setFacture(data as FactureData);
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Chargement…</div>
      </div>
    );
  }

  if (!facture) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-sm">Facture introuvable.</div>
      </div>
    );
  }

  return <FactureForm initial={facture} />;
}