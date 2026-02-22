"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../publier-projet/supabaseClient";

type PublierProjetRow = {
  id: number;
  created_at: string;

  category: string | null;
  name: string | null;
  phone: string | null;
  postal: string | null;

  surface: string | null;
  location: string | null;
  description: string | null;
  photo_name: string | null;
};

export default function AdminPage() {
  const [projects, setProjects] = useState<PublierProjetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [onlyWithPhone, setOnlyWithPhone] = useState(false);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return projects.filter((p) => {
      if (onlyWithPhone && !(p.phone && p.phone.trim())) return false;

      if (!query) return true;
      const blob = [
        p.category,
        p.name,
        p.phone,
        p.postal,
        p.location,
        p.description,
        p.photo_name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return blob.includes(query);
    });
  }, [projects, q, onlyWithPhone]);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("publier_projets")
      .select(
        "id, created_at, category, name, phone, postal, surface, location, description, photo_name"
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.error("Supabase error:", error);
      setError(
        `${error.message}\n\nSi tu vois “permission denied” → RLS est activé, il faut une policy ou un accès admin.`
      );
      setProjects([]);
    } else {
      setProjects((data as PublierProjetRow[]) || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.h1}>Admin – Leads (publier_projets)</h1>
          <div style={styles.sub}>
            Total: <b>{projects.length}</b> • Affichés: <b>{filtered.length}</b>
          </div>
        </div>

        <button onClick={loadProjects} style={styles.refreshBtn}>
          Refresh
        </button>
      </div>

      <div style={styles.filters}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher (nom, téléphone, CP, ville, catégorie...)"
          style={styles.search}
        />

        <label style={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={onlyWithPhone}
            onChange={(e) => setOnlyWithPhone(e.target.checked)}
          />
          <span style={{ marginLeft: 8 }}>Seulement avec téléphone</span>
        </label>
      </div>

      {loading && <p style={styles.info}>Loading...</p>}

      {error && (
        <pre style={styles.error}>
          {error}
        </pre>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p style={styles.info}>Aucun lead pour le moment.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div style={styles.list}>
          {filtered.map((p) => (
            <div key={p.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div style={styles.badge}>
                  {p.category ?? "Sans catégorie"}
                </div>
                <div style={styles.date}>
                  {p.created_at
                    ? new Date(p.created_at).toLocaleString()
                    : "-"}
                </div>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Nom</span>
                <span style={styles.value}>{p.name ?? "-"}</span>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Téléphone</span>
                <span style={styles.value}>{p.phone ?? "-"}</span>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Code postal</span>
                <span style={styles.value}>{p.postal ?? "-"}</span>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Ville / Zone</span>
                <span style={styles.value}>{p.location ?? "-"}</span>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Surface</span>
                <span style={styles.value}>
                  {p.surface ? `${p.surface} m²` : "-"}
                </span>
              </div>

              {p.description && (
                <div style={styles.desc}>
                  <div style={styles.label}>Description</div>
                  <div style={styles.descText}>{p.description}</div>
                </div>
              )}

              {p.photo_name && (
                <div style={styles.row}>
                  <span style={styles.label}>Photo</span>
                  <span style={styles.value}>{p.photo_name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    padding: 24,
    maxWidth: 1050,
    margin: "0 auto",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  h1: { fontSize: 26, fontWeight: 800, margin: 0 },
  sub: { marginTop: 6, opacity: 0.7 },
  refreshBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#111827",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 18,
  },
  search: {
    flex: "1 1 320px",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    outline: "none",
  },
  checkboxRow: { display: "flex", alignItems: "center", cursor: "pointer" },

  info: { opacity: 0.75 },
  error: {
    whiteSpace: "pre-wrap",
    background: "#fff1f2",
    border: "1px solid #fecdd3",
    color: "#9f1239",
    padding: 12,
    borderRadius: 12,
    fontWeight: 600,
  },

  list: { display: "flex", flexDirection: "column", gap: 12 },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 16,
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  badge: {
    padding: "6px 10px",
    borderRadius: 999,
    background: "#eef2ff",
    border: "1px solid #e0e7ff",
    fontWeight: 800,
    color: "#1e1b4b",
    fontSize: 13,
  },
  date: { opacity: 0.65, fontSize: 13 },

  row: {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    gap: 10,
    padding: "6px 0",
    borderTop: "1px dashed #eef2f7",
  },
  label: { fontWeight: 800, opacity: 0.75 },
  value: { fontWeight: 650 },

  desc: {
    marginTop: 10,
    borderTop: "1px dashed #eef2f7",
    paddingTop: 10,
  },
  descText: { marginTop: 6, opacity: 0.9, lineHeight: 1.5 },
};