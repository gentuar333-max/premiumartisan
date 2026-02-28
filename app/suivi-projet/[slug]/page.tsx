export const dynamic = "force-dynamic";

import { createClient } from "@supabase/supabase-js";
import { SuiviToast } from "./SuiviToast";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ toast?: string }>;
}) {
  const toast = (await searchParams).toast;
  const resolved = await params;
  const slug = resolved?.slug ?? "";
  const token = typeof slug === "string" ? slug.trim() : "";

  if (!token || token === "undefined") {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 16, background: "#ffffff", padding: 24 }}>
          <h1 style={{ marginTop: 0 }}>Projet introuvable</h1>
          <p style={{ color: "#6b7280", marginBottom: 0 }}>Identifiant invalide.</p>
        </div>
      </main>
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  const { data, error } = await supabase
    .from("publier_projets")
    .select("id, category, first_name, phone, postal, postal_prefix, surface, location, description, budget, photo_name, created_at")
    .eq("client_token", token)
    .single();

  if (error || !data) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            background: "#ffffff",
            padding: 24,
          }}
        >
          <h1 style={{ marginTop: 0 }}>Projet introuvable</h1>
          <p style={{ color: "#6b7280", marginBottom: 0 }}>
            Aucun projet ne correspond à cet identifiant pour le moment.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 900, margin: "0 auto" }}>
      {toast === "published" && <SuiviToast message="Projet publié ✅" />}
      <h1 style={{ marginTop: 0 }}>Suivi de votre projet</h1>
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          background: "#ffffff",
          padding: 24,
          display: "grid",
          gap: 12,
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Nom:</strong> {data.first_name ?? "—"}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Catégorie:</strong> {data.category ?? "—"}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Description:</strong> {data.description ?? "—"}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Localisation:</strong> {data.location ?? "—"}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Département:</strong> {data.postal_prefix ?? "—"}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Budget:</strong> {data.budget ?? "—"}
        </p>
      </div>
    </main>
  );
}
