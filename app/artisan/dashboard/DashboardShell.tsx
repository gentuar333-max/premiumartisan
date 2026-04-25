"use client";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";
import { pickRandomProjectImage } from "@/lib/projectImages";
import { formatPhone, phoneToWhatsApp } from "@/lib/formatPhone";
import { createSupabaseBrowserClient } from "@/lib/supabaseBrowser";
import { MapPin, Ruler, Euro, Users, Eye, Star, Phone, Clock } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const PROJECT_FALLBACK_IMAGES = [
  "/images/projects/01.webp",
  "/images/projects/02.webp",
  "/images/projects/03.webp",
  "/images/projects/04.webp",
  "/images/projects/05.webp",
];

function pickProjectImageById(id: string): string {
  if (!id) return PROJECT_FALLBACK_IMAGES[0];
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return PROJECT_FALLBACK_IMAGES[hash % PROJECT_FALLBACK_IMAGES.length];
}

const PIECE_LABELS: Record<string, string> = {
  salon: "Salon / Séjour",
  cuisine: "Cuisine",
  salle_bain: "Salle de bain",
  chambre: "Chambre",
  couloir: "Couloir / Entrée",
  bureau: "Bureau",
  exterieur: "Extérieur / Façade",
  autre: "Autre / Plusieurs pièces",
};

function formatPieceType(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => {
      const key = s.trim().toLowerCase().replace(/[^a-z_]/g, "");
      return PIECE_LABELS[key] ?? s.trim();
    })
    .filter(Boolean);
}

const BRAND_BLUE = "#2563EB";

const REGION_TO_PREFIX: Record<string, string> = {
  lyon: "69",
  "côte-d'or": "21",
  "cote d'or": "21",
  paris: "75",
  rhone: "69",
  dijon: "21",
  beaune: "21",
  villeurbanne: "69",
};

const PREFIX_TO_REGION: Record<string, string> = {
  "21": "Côte-d'Or (ex: 21000)",
  "69": "rhone (ex: 69000)",
  "75": "Paris (ex: 75000)",
};

function parseSearchToPrefix(input: string): string | null {
  const s = input.trim().toLowerCase();
  if (!s) return null;
  const m5 = s.match(/(\d{5})/);
  if (m5) return m5[1].slice(0, 2);
  const m2 = s.match(/^\d{2}$/);
  if (m2) return m2[0];
  const normalized = s
    .replace(/[éèàª]/g, "e")
    .replace(/[à à¢]/g, "a")
    .replace(/ô/g, "o");
  for (const [key, prefix] of Object.entries(REGION_TO_PREFIX)) {
    if (normalized.includes(key) || key.includes(normalized)) return prefix;
  }
  return null;
}

type ProjectRow = {
  id: string;
  created_at?: string;
  first_name?: string | null;
  category?: string | null;
  category_details?: string | null;
  postal_prefix?: string | null;
  location?: string | null;
  budget?: number | string | null;
  image_url?: string | null;
  description?: string | null;
  phone?: string | null;
  client_phone?: string | null;
  piece_type?: string | null;
  surface_m2?: number | null;
};

type DashboardInsertPayload = { new: { id?: string } };

function formatBudget(b: ProjectRow["budget"]) {
  if (b === null || b === undefined || b === "") return "—”";
  if (typeof b === "number") return `${b.toLocaleString("fr-FR")}€`;
  const raw = String(b).trim();
  if (!raw) return "—”";
  if (raw.endsWith("_plus")) return `Budget: ${raw.replace("_plus", "")}€+`;
  if (raw.includes("_") || raw.includes("-")) {
    const sep = raw.includes("_") ? "_" : "-";
    const [min, max] = raw.split(sep);
    if (min && max) return `Budget: ${min}€ – ${max}€`;
  }
  if (/^\d+$/.test(raw)) return `Budget: ${raw}€`;
  return raw;
}

function getUnlockPrice(budget: ProjectRow["budget"]): {
  normal: number;
  exclusive: number;
} {
  const tiers: Array<{ max: number; normal: number; exclusive: number }> = [
    { max: 500, normal: 15, exclusive: 45 },
    { max: 1500, normal: 30, exclusive: 90 },
    { max: 3000, normal: 39, exclusive: 117 },
    { max: 7000, normal: 65, exclusive: 195 },
    { max: 15000, normal: 105, exclusive: 315 },
    { max: 25000, normal: 149, exclusive: 447 },
    { max: 40000, normal: 249, exclusive: 747 },
    { max: 60000, normal: 349, exclusive: 1047 },
    { max: 100000, normal: 499, exclusive: 1497 },
  ];
  const def = { normal: 699, exclusive: 2097 };
  if (budget === null || budget === undefined || budget === "") return def;
  let num: number | null = null;
  if (typeof budget === "number") {
    num = budget;
  } else {
    const raw = String(budget).trim();
    if (raw.includes("_")) {
      const parts = raw.split("_");
      if (parts[1] === "plus" || !parts[1]) {
        num = (parseInt(parts[0]) || 0) + 1;
      } else {
        num = parseInt(parts[1]) || null;
      }
    } else if (raw.includes("-")) {
      const parts = raw.split("-");
      num = parseInt(parts[1]) || parseInt(parts[0]) || null;
    } else if (/^\d+$/.test(raw)) {
      num = parseInt(raw);
    }
  }
  if (num === null) return def;
  for (const t of tiers) {
    if (num <= t.max) return { normal: t.normal, exclusive: t.exclusive };
  }
  return def;
}

function truncate(text: string, max: number) {
  const t = text.trim();
  return t.length <= max ? t : t.slice(0, max - 1) + "—¦";
}

function formatCategory(category?: string | null) {
  if (!category) return null;
  return category.replace(":", " ·").replace(" : ", " · ");
}

function FireBadge({ count, isLocked }: { count: number; isLocked: boolean }) {
  if (isLocked) {
    return (
      <div className="flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-1">
        <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span className="text-[11px] font-bold text-slate-300">Réservé</span>
      </div>
    );
  }
  if (count === 0) return null;
  const dots = [0, 1, 2].map((i) => (
    <span key={i} className={`h-1.5 w-1.5 rounded-full ${i < count ? "bg-orange-400" : "bg-slate-600"}`} />
  ));
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-slate-900/80 px-2.5 py-1 backdrop-blur-sm">
      <span className="text-[13px] leading-none">ðŸ”¥</span>
      <span className="text-[11px] font-bold text-white">{count} / 3</span>
      <div className="flex items-center gap-0.5">{dots}</div>
    </div>
  );
}

const WaIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.122 1.529 5.856L0 24l6.335-1.508A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.201-1.381l-.373-.221-3.861.919.976-3.768-.242-.387A9.959 9.959 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const ProjectCard = memo(function ProjectCard({
  p, categoryLabel, unlockState, contact,
  onUnlockClick, onUnlockExclusive, onPrefetch,
  unlocking, projectUnlockCount, isLockedForMe,
}: {
  p: ProjectRow;
  categoryLabel: string;
  unlockState?: { status: string | null };
  contact?: { phone: string | null };
  onUnlockClick: (id: string) => void;
  onUnlockExclusive: (id: string) => void;
  onPrefetch: (id: string) => void;
  unlocking: boolean;
  projectUnlockCount: number;
  isLockedForMe: boolean;
}) {
  const isHttpImage = !!(p.image_url?.startsWith("http"));
  const imageSrc = isHttpImage ? p.image_url! : pickProjectImageById(p.id ?? "");
  const showFallbackBadge = !p.image_url;
  const categoryRaw = (p.category_details || p.category || categoryLabel || "Peinture") as string;
  const categoryLine = formatCategory(categoryRaw);
  const rawName = p.first_name?.trim() || "Client";
  const nameParts = rawName.split(" ").filter(Boolean);
  const name = nameParts.length >= 2 ? `${nameParts[0]} ${nameParts[1][0]}.` : rawName;
  const zoneLabel = p.location?.trim() || `Département ${p.postal_prefix ?? ""}`;
  const descriptionLine = p.description?.trim() || "";
  const isUnlocked = unlockState?.status === "paid";
  const unlockedPhone = isUnlocked ? (contact?.phone ?? p.client_phone ?? p.phone ?? null) : null;
  const waE164 = unlockedPhone ? phoneToWhatsApp(unlockedPhone) : "";
  const isFull = projectUnlockCount >= 3;
  const isFirstSlot = projectUnlockCount === 0;
  const price = getUnlockPrice(p.budget);
  const placesLeft = 3 - projectUnlockCount;

  const timeAgo = p.created_at ? (() => {
    const diff = Date.now() - new Date(p.created_at).getTime();
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    return h < 1 ? "A l instant" : h < 24 ? `Il y a ${h}h` : `Il y a ${d}j`;
  })() : "";

  return (
    <div
      style={{ borderRadius: 16, overflow: "hidden", background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      onMouseEnter={() => p.id && p.id !== "undefined" && onPrefetch(p.id)}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 160, background: "#F3F4F6", overflow: "hidden" }}>
        <Image src={imageSrc} alt="Projet" fill
          style={{ objectFit: "cover", filter: isLockedForMe ? "grayscale(1)" : "none" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)" }} />

        {/* Top left badges */}
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {categoryLine && (
            <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: "#3B82F6", color: "#fff" }}>
              {categoryLine}
            </span>
          )}
          {isFirstSlot && !isUnlocked && !isLockedForMe && (
            <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: "#F59E0B", color: "#fff", display: "flex", alignItems: "center", gap: 4 }}>
              <Star size={10} style={{ flexShrink: 0 }} />
              Offre exclusive
            </span>
          )}
        </div>

        {/* Time badge top right */}
        {timeAgo && (
          <div style={{ position: "absolute", top: 10, right: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 20, background: "rgba(0,0,0,0.5)", color: "#fff", display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={10} />
              {timeAgo}
            </span>
          </div>
        )}

        {/* Locked overlay */}
        {isLockedForMe && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 700, padding: "6px 16px", borderRadius: 20, background: "#EF4444", color: "#fff" }}>
              Projet reserve
            </span>
          </div>
        )}

        {/* Fallback badge */}
        {showFallbackBadge && !isLockedForMe && (
          <span style={{ position: "absolute", bottom: 8, right: 8, fontSize: 11, padding: "3px 8px", borderRadius: 6, background: "rgba(0,0,0,0.55)", color: "#fff" }}>
            Photo illustrative
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 8 }}>{name}</h3>

        {/* Meta row */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 16px", marginBottom: 10, fontSize: 13, color: "#6B7280" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <MapPin size={14} style={{ color: "#3B82F6", flexShrink: 0 }} />
            {zoneLabel}
          </span>
          {p.surface_m2 && (
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Ruler size={14} style={{ color: "#3B82F6", flexShrink: 0 }} />
              {p.surface_m2} m2
            </span>
          )}
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Euro size={14} style={{ color: "#3B82F6", flexShrink: 0 }} />
            {formatBudget(p.budget)}
          </span>
        </div>

        {/* Description */}
        {descriptionLine && (
          <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
            {descriptionLine}
          </p>
        )}

        {/* Unlocked phone */}
        {isUnlocked && !isLockedForMe && (
          <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: "10px 12px", marginBottom: 10, fontSize: 13, color: "#166534" }}>
            <span style={{ fontWeight: 700 }}>Telephone: </span>
            {unlockedPhone ? formatPhone(unlockedPhone) : "Non disponible"}
          </div>
        )}

        {/* Artisans count */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 13 }}>
          <Users size={15} style={{ color: "#9CA3AF", flexShrink: 0 }} />
          <span style={{ fontWeight: 600, color: isFull ? "#EF4444" : "#111" }}>
            {projectUnlockCount}/3 artisans
          </span>
          {!isFull && !isLockedForMe && (
            <span style={{ color: "#9CA3AF" }}>
              {" "} {placesLeft} place{placesLeft > 1 ? "s" : ""} restante{placesLeft > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

          {/* Voir le projet */}
          {p.id && p.id !== "undefined" && (
            <Link prefetch href={`/artisan/project/${p.id}`}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 11, borderRadius: 12, border: "1px solid #E5E7EB", background: "#fff", fontSize: 14, fontWeight: 600, color: "#374151", textDecoration: "none" }}>
              <Eye size={16} />
              Voir le projet
            </Link>
          )}

          {/* Numero + Exclusif */}
          {!isLockedForMe && !isUnlocked && !isFull && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button type="button"
                onClick={() => p.id && p.id !== "undefined" && onUnlockClick(p.id)}
                disabled={!p.id || p.id === "undefined" || unlocking}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 11, borderRadius: 12, border: "1px solid #E5E7EB", background: "#F9FAFB", fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}>
                <Phone size={15} />
                Numero ({price.normal}e)
              </button>
              <button type="button"
                onClick={() => p.id && p.id !== "undefined" && onUnlockExclusive(p.id)}
                disabled={!p.id || p.id === "undefined" || unlocking || !isFirstSlot}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 11, borderRadius: 12, border: "none", background: isFirstSlot ? "#3B82F6" : "#E5E7EB", fontSize: 13, fontWeight: 600, color: isFirstSlot ? "#fff" : "#9CA3AF", cursor: isFirstSlot ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                <Star size={15} />
                Exclusif ({price.exclusive}e)
              </button>
            </div>
          )}

          {/* Debloque */}
          {!isLockedForMe && isUnlocked && (
            <div style={{ display: "flex", gap: 8 }}>
              {waE164 && (
                <a href={`https://wa.me/${waE164}?text=${encodeURIComponent("Bonjour, j ai vu votre projet sur PremiumArtisan")}`}
                  target="_blank" rel="noreferrer"
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 11, borderRadius: 12, border: "1px solid #BBF7D0", background: "#F0FDF4", fontSize: 13, fontWeight: 600, color: "#166534", textDecoration: "none" }}>
                  <WaIcon /> WhatsApp
                </a>
              )}
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 11, borderRadius: 12, border: "1px solid #BBF7D0", background: "#F0FDF4", fontSize: 13, fontWeight: 600, color: "#166534" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                Debloque
              </div>
            </div>
          )}

          {/* Complet */}
          {isFull && !isUnlocked && !isLockedForMe && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 11, borderRadius: 12, border: "1px solid #E5E7EB", background: "#F9FAFB", fontSize: 13, color: "#9CA3AF" }}>
              <Users size={15} />
              3/3 artisans complet
            </div>
          )}

          {/* Reserve */}
          {isLockedForMe && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 11, borderRadius: 12, border: "1px solid #E5E7EB", background: "#F9FAFB", fontSize: 13, color: "#9CA3AF" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Projet reserve non disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
});


function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange}
      className="flex w-full cursor-pointer items-center gap-4 rounded-sm py-3 text-left transition hover:bg-slate-50">
      <span className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 transition ${checked ? "border-slate-900 bg-slate-900" : "border-slate-300 bg-white"}`} style={{ borderRadius: 2 }}>
        {checked && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className={`text-[15px] ${checked ? "font-semibold text-slate-900" : "text-slate-700"}`}>{label}</span>
    </button>
  );
}

function FilterPanel({
  isOpen, onClose, initialCp, initialSort, initialCats,
  initialStatut, initialBudgetMin, initialBudgetMax, onApply, count,
}: {
  isOpen: boolean; onClose: () => void; initialCp: string; initialSort: string;
  initialCats: string[]; initialStatut: string; initialBudgetMin: string;
  initialBudgetMax: string; onApply: (p: URLSearchParams) => void; count: number;
}) {
  const [zone, setZone] = useState(initialCp);
  const [localSort, setLocalSort] = useState(initialSort);
  const [selectedCats, setSelectedCats] = useState<string[]>(initialCats);
  const [statut, setStatut] = useState(initialStatut);
  const [budgetMin, setBudgetMin] = useState(initialBudgetMin);
  const [budgetMax, setBudgetMax] = useState(initialBudgetMax);

  useEffect(() => {
    if (isOpen) {
      setZone(initialCp); setLocalSort(initialSort); setSelectedCats(initialCats);
      setStatut(initialStatut); setBudgetMin(initialBudgetMin); setBudgetMax(initialBudgetMax);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const CATEGORIES = [
    { key: "peinture-interieure", label: "Peinture intérieure" },
    { key: "peinture-exterieure", label: "Peinture extérieure" },
    { key: "renovation", label: "Rénovation" },
    { key: "papier-peint", label: "Pose papier peint" },
    { key: "salle-de-bain", label: "Salle de bain" },
    { key: "cuisine", label: "Cuisine" },
    { key: "electricite", label: "à‰lectricité" },
    { key: "plomberie", label: "Plomberie" },
  ];
  const STATUTS = [
    { key: "open", label: "Projet ouvert" },
    { key: "complet", label: "Projet complet (3/3)" },
  ];
  const SORTS = [
    { key: "recent", label: "Plus récents" },
    { key: "budget_desc", label: "Budget le plus élevé" },
    { key: "budget_asc", label: "Budget le plus bas" },
  ];
  const BUDGET_OPTIONS = [
    { value: "", label: "€ No Min" }, { value: "500", label: "€ 500" },
    { value: "1000", label: "€ 1 000" }, { value: "3000", label: "€ 3 000" },
    { value: "5000", label: "€ 5 000" }, { value: "10000", label: "€ 10 000" },
    { value: "20000", label: "€ 20 000" }, { value: "50000", label: "€ 50 000" },
    { value: "100000", label: "€ 100 000" },
  ];

  function handleApply() {
    const params = new URLSearchParams();
    const prefix = parseSearchToPrefix(zone);
    if (prefix) params.set("cp", prefix); else if (zone.trim()) params.set("cp", zone.trim());
    params.set("sort", localSort);
    if (selectedCats.length > 0) params.set("cat", selectedCats.join(","));
    if (statut) params.set("statut", statut);
    if (budgetMin) params.set("budgetMin", budgetMin);
    if (budgetMax) params.set("budgetMax", budgetMax);
    onApply(params); onClose();
  }

  const activeCount = selectedCats.length + (statut ? 1 : 0) + (budgetMin ? 1 : 0) + (budgetMax ? 1 : 0);

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} aria-hidden />
      <div className="fixed left-0 top-0 z-50 flex h-full w-[85vw] max-w-[340px] flex-col bg-white shadow-2xl"
        style={{ animation: "slideInLeft 0.2s ease-out" }}>
        <style>{`@keyframes slideInLeft{from{transform:translateX(-100%)}to{transform:translateX(0)}}`}</style>
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-[18px] font-bold text-slate-900">Filtres</h2>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex flex-col divide-y divide-slate-100">
            <div className="pb-5">
              <p className="mb-2 text-[12px] font-bold uppercase tracking-widest text-slate-500">Zone / Département</p>
              <div className="relative">
                <input type="text" value={zone} onChange={(e) => setZone(e.target.value)} placeholder="21, Lyon, Dijon—¦"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-600" />
                {zone && (
                  <button type="button" onClick={() => setZone("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </div>
            <div className="py-4">
              <p className="mb-1 text-[12px] font-bold uppercase tracking-widest text-slate-500">Catégorie</p>
              {CATEGORIES.map(({ key, label }) => (
                <CheckItem key={key} label={label} checked={selectedCats.includes(key)}
                  onChange={() => setSelectedCats((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key])} />
              ))}
            </div>
            <div className="py-4">
              <p className="mb-1 text-[12px] font-bold uppercase tracking-widest text-slate-500">Statut du projet</p>
              {STATUTS.map(({ key, label }) => (
                <CheckItem key={key} label={label} checked={statut === key} onChange={() => setStatut(statut === key ? "" : key)} />
              ))}
            </div>
            <div className="py-4">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-widest text-slate-500">Budget</p>
              <div className="flex gap-3">
                {[
                  { value: budgetMin, onChange: setBudgetMin, options: BUDGET_OPTIONS },
                  { value: budgetMax, onChange: setBudgetMax, options: BUDGET_OPTIONS.map((o, i) => i === 0 ? { ...o, label: "€ No Max" } : o) },
                ].map(({ value, onChange, options }, idx) => (
                  <div key={idx} className="relative flex-1">
                    <select value={value} onChange={(e) => onChange(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-3 pr-8 text-sm text-slate-700 outline-none focus:border-slate-600">
                      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <svg className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-4">
              <p className="mb-1 text-[12px] font-bold uppercase tracking-widest text-slate-500">Trier par</p>
              {SORTS.map(({ key, label }) => (
                <CheckItem key={key} label={label} checked={localSort === key} onChange={() => setLocalSort(key)} />
              ))}
            </div>
          </div>
        </div>
        <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <button type="button"
              onClick={() => { setZone(initialCp); setLocalSort("recent"); setSelectedCats([]); setStatut(""); setBudgetMin(""); setBudgetMax(""); }}
              className="shrink-0 text-sm font-semibold text-slate-700 underline underline-offset-2 hover:text-slate-900">
              Clear all
            </button>
            <button type="button" onClick={handleApply}
              className="flex-1 rounded-full bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-700 active:scale-[0.98]">
              Afficher {count} projet{count !== 1 ? "s" : ""}
              {activeCount > 0 && (
                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-slate-900">{activeCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function AvatarDropdown({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [open, setOpen] = useState(false)
  const [sub, setSub] = useState<{ plan: string; minutes_remaining: number } | null>(null)

  useEffect(() => {
    fetch("/api/marie/subscription")
      .then(r => r.json())
      .then(json => { if (json.subscription) setSub(json.subscription) })
      .catch(() => {})
  }, [])

  const initial = (email || "A")[0].toUpperCase()
  const planLabel = sub ? sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1) : null

  return (
    <div style={{ position: "relative", marginBottom: 16 }}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 12, border: "none", background: open ? "#F1F5F9" : "transparent", cursor: "pointer", textAlign: "left" as const }}
      >
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
          {initial}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</div>
          <div style={{ fontSize: 11, color: "#94a3b8" }}>Artisan</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }}>
          <path d="M3 5l4 4 4-4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden", marginTop: 4, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          {/* Mon profil */}
          <a href="/artisan/receptionist/setup"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", fontSize: 13, fontWeight: 500, color: "#374151", textDecoration: "none", borderBottom: "1px solid #F1F5F9" }}
          >
            Mon profil
            <span style={{ color: "#CBD5E1" }}>›</span>
          </a>

          {/* Mes minutes */}
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #F1F5F9" }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Mes minutes</div>
            {sub ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#64748B" }}>Plan {planLabel}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: sub.minutes_remaining > 20 ? "#16A34A" : sub.minutes_remaining > 5 ? "#D97706" : "#DC2626" }}>
                  {sub.minutes_remaining} min
                </span>
              </div>
            ) : (
              <a href="/artisan/receptionist/pricing" style={{ fontSize: 12, color: "#3B82F6", textDecoration: "none" }}>
                Activer un forfait →
              </a>
            )}
          </div>

          {/* Se déconnecter */}
          <button
            onClick={onSignOut}
            style={{ width: "100%", padding: "12px 14px", fontSize: 13, fontWeight: 500, color: "#DC2626", background: "none", border: "none", cursor: "pointer", textAlign: "left" as const }}
          >
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  )
}

export function DashboardShell({
  projects, count, cp, sort, error, categoryLabel, sortRecentUrl, sortBudgetUrl,
}: {
  projects: ProjectRow[]; count: number; cp: string; sort: string;
  error: string | null; categoryLabel: string; sortRecentUrl: string; sortBudgetUrl: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unlockToast = searchParams.get("unlock");

  const [searchValue, setSearchValue] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [newHit, setNewHit] = useState<null | { id: string }>(null);
  const [notifCount, setNotifCount] = useState(0);
  const [unlockStatuses, setUnlockStatuses] = useState<Record<string, { status: string | null; conversation_id: string | null }>>({});
  const [unlockedContacts, setUnlockedContacts] = useState<Record<string, { phone: string | null }>>({});
  const [projectUnlockCounts, setProjectUnlockCounts] = useState<Record<string, number>>({});
  const [projectIsLocked, setProjectIsLocked] = useState<Record<string, boolean>>({});
  const [unlockingProjectId, setUnlockingProjectId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }) => { setCurrentUser(data.user ?? null); });
  }, []);

  const currentCats = (searchParams.get("cat") ?? "").split(",").filter(Boolean);
  const currentStatut = searchParams.get("statut") ?? "";
  const currentBudgetMin = searchParams.get("budgetMin") ?? "";
  const currentBudgetMax = searchParams.get("budgetMax") ?? "";
  const activeFilterCount = currentCats.length + (currentStatut ? 1 : 0) + (currentBudgetMin ? 1 : 0) + (currentBudgetMax ? 1 : 0);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenuOpen(false); setFilterOpen(false); } };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) return;
    const supabase = createClient(url, anon);
    const ch = supabase.channel(`rt-publier-projets-${cp}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "publier_projets", filter: `postal_prefix=eq.${cp}` },
        (payload) => {
          setNewHit({ id: (payload as DashboardInsertPayload).new?.id ?? "" });
          setNotifCount((n) => n + 1);
          router.refresh();
        }).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [cp, router]);

  useEffect(() => {
    if (!projects.length) return;
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/artisan/project/dashboard-data", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectIds: projects.map((p) => p.id) }),
        });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.ok || cancelled) return;
        const sm: Record<string, { status: string | null; conversation_id: string | null }> = {};
        Object.entries(json.statuses ?? {}).forEach(([pid, v]) => {
          const s = v as { status?: string | null; conversation_id?: string | null };
          sm[pid] = { status: s?.status ?? null, conversation_id: s?.conversation_id ?? null };
        });
        setUnlockStatuses(sm);
        setUnlockedContacts((prev) => ({ ...prev, ...(json.contacts ?? {}) }));
        if (json.unlock_counts) setProjectUnlockCounts(json.unlock_counts as Record<string, number>);
        if (json.is_locked) setProjectIsLocked(json.is_locked as Record<string, boolean>);
      } catch { if (!cancelled) setUnlockStatuses({}); }
    };
    void load();
    return () => { cancelled = true; };
  }, [projects]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(t);
  }, [toast]);

  void newHit;

  const regionLabel = PREFIX_TO_REGION[cp] ?? `Département ${cp}`;
  const prefetchProject = useCallback((id: string) => { router.prefetch(`/artisan/project/${id}`); }, [router]);

  useEffect(() => {
    projects.slice(0, 9).filter((p) => p.id && p.id !== "undefined").forEach((p) => prefetchProject(p.id!));
  }, [projects, prefetchProject]);

  const handleFilterApply = useCallback((params: URLSearchParams) => {
    router.push(`/artisan/dashboard?${params.toString()}`);
  }, [router]);

  const handleFilterReset = useCallback(() => { router.push("/artisan/dashboard"); }, [router]);

  const onUnlockClick = useCallback(async (projectId: string) => {
    if (!currentUser) { router.push(`/artisan/login?redirect=/artisan/dashboard`); return; }
    try {
      setUnlockingProjectId(projectId);
      const res = await fetch("/api/artisan/project/contacts", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectIds: [projectId], cp }),
      });
      const json = await res.json().catch(() => null);
      if (json?.checkoutUrl) { window.location.href = json.checkoutUrl; return; }
      if (res.status === 401 || json?.error?.includes("authentifié")) { router.push(`/artisan/login?redirect=/artisan/dashboard`); return; }
      if (!res.ok || !json?.ok) { setToast({ msg: json?.error || "Impossible de récupérer le numéro.", type: "error" }); return; }
      setUnlockStatuses((prev) => ({ ...prev, [projectId]: { status: "paid", conversation_id: prev[projectId]?.conversation_id ?? null } }));
      setUnlockedContacts((prev) => ({ ...prev, [projectId]: { phone: json?.contacts?.[projectId]?.phone ?? null } }));
      setProjectUnlockCounts((prev) => ({ ...prev, [projectId]: (prev[projectId] ?? 0) + 1 }));
      setToast({ msg: "Numéro affiché.", type: "success" });
    } catch { setToast({ msg: "Erreur serveur.", type: "error" }); }
    finally { setUnlockingProjectId(null); }
  }, [currentUser, cp, router]);

  const onUnlockExclusive = useCallback(async (projectId: string) => {
    if (!currentUser) { router.push(`/artisan/login?redirect=/artisan/dashboard`); return; }
    try {
      setUnlockingProjectId(projectId);
      const res = await fetch("/api/artisan/project/contacts", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectIds: [projectId], exclusive: true, cp }),
      });
      const json = await res.json().catch(() => null);
      if (res.status === 401 || json?.error?.includes("authentifié")) { router.push(`/artisan/login?redirect=/artisan/dashboard`); return; }
      if (!res.ok || !json?.ok) {
        if (json?.checkoutUrl) { window.location.href = json.checkoutUrl; return; }
        setToast({ msg: json?.error || "Erreur lors de la réservation exclusive.", type: "error" });
        return;
      }
      setUnlockStatuses((prev) => ({ ...prev, [projectId]: { status: "paid", conversation_id: prev[projectId]?.conversation_id ?? null } }));
      setUnlockedContacts((prev) => ({ ...prev, [projectId]: { phone: json?.contacts?.[projectId]?.phone ?? null } }));
      setProjectUnlockCounts((prev) => ({ ...prev, [projectId]: 3 }));
      setProjectIsLocked((prev) => ({ ...prev, [projectId]: false }));
      setToast({ msg: " Projet réservé en exclusivité !", type: "info" });
    } catch { setToast({ msg: "Erreur serveur.", type: "error" }); }
    finally { setUnlockingProjectId(null); }
  }, [currentUser, cp, router]);

  useEffect(() => {
    if (unlockToast === "cancel") setToast({ msg: "Paiement annulé.", type: "error" });
    if (unlockToast === "success") {
      setToast({ msg: "Paiement confirmé ! Numéro débloqué.", type: "success" });
      const successProjectId = searchParams.get("project_id");
      if (successProjectId && projects.length > 0) {
        const refetch = async () => {
          try {
            const res = await fetch("/api/artisan/project/dashboard-data", {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ projectIds: projects.map((p) => p.id) }),
            });
            const json = await res.json().catch(() => null);
            if (!res.ok || !json?.ok) return;
            const sm: Record<string, { status: string | null; conversation_id: string | null }> = {};
            Object.entries(json.statuses ?? {}).forEach(([pid, v]) => {
              const s = v as { status?: string | null; conversation_id?: string | null };
              sm[pid] = { status: s?.status ?? null, conversation_id: s?.conversation_id ?? null };
            });
            setUnlockStatuses(sm);
            setUnlockedContacts((prev) => ({ ...prev, ...(json.contacts ?? {}) }));
            if (json.unlock_counts) setProjectUnlockCounts(json.unlock_counts as Record<string, number>);
            if (json.is_locked) setProjectIsLocked(json.is_locked as Record<string, boolean>);
          } catch { /* ignore */ }
        };
        setTimeout(() => void refetch(), 1500);
        setTimeout(() => void refetch(), 4000);
        setTimeout(() => void refetch(), 8000);
      }
    }
    if (unlockToast === "success" || unlockToast === "cancel") {
      const clean = new URLSearchParams(window.location.search);
      clean.delete("unlock"); clean.delete("project_id");
      const newUrl = window.location.pathname + (clean.toString() ? "?" + clean.toString() : "");
      window.history.replaceState(null, "", newUrl);
    }
  }, [unlockToast, projects, searchParams]);

  const toastColors = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
    error: "border-red-200 bg-red-50 text-red-800",
    info: "border-amber-200 bg-amber-50 text-amber-900",
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5]">

      {/* â”€â”€ HEADER â”€â”€ */}
      <header className="sticky top-0 z-30 bg-[#eaecef] border-b border-[#d5d8dc] shadow-sm">
        <div className="mx-auto flex h-[52px] max-w-7xl items-center gap-2 px-4 sm:px-6">

          {/* Logo */}
          <a href="/artisan/dashboard" className="flex shrink-0 items-center gap-1.5 no-underline mr-1">
            <div style={{ background: "#3B82F6", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "#000", transform: "rotate(45deg)", flexShrink: 0 }}>
              <span style={{ transform: "rotate(-45deg)", display: "block" }}>âš’</span>
            </div>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#1e293b", letterSpacing: 1, lineHeight: 1 }}>
              PremiumArtisan
            </span>
            {notifCount > 0 && (
              <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">{notifCount}</span>
            )}
          </a>

          <span className="h-4 w-px bg-slate-300 shrink-0" />

          {/* Filtres */}
          <button type="button" onClick={() => setFilterOpen(true)}
            className="flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 text-sm text-slate-600 transition hover:text-slate-900 hover:bg-slate-200 rounded-lg whitespace-nowrap">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
              <path d="M3 5h14M3 10h14M3 15h14"/>
              <circle cx="7" cy="5" r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="13" cy="10" r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="7" cy="15" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
            Filtres
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-500 text-[9px] font-bold text-white">{activeFilterCount}</span>
            )}
          </button>

          {/* IA Réceptionniste —” pa emoji, tekst i thjeshtà« */}
          <Link href="/artisan/receptionist"
            className="shrink-0 px-2.5 py-1.5 text-sm text-slate-600 transition hover:text-slate-900 hover:bg-slate-200 rounded-lg whitespace-nowrap">
            <span className="hidden sm:inline">IA Réceptionniste</span>
            <span className="sm:hidden">IA</span>
          </Link>

          {/* Search —” vetà«m desktop */}
          <div className="relative hidden sm:flex flex-1 min-w-[80px] max-w-sm mx-2">
            <svg className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const prefix = parseSearchToPrefix(searchValue);
                  if (prefix) {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("cp", prefix);
                    router.push(`/artisan/dashboard?${params.toString()}`);
                    setSearchValue("");
                  }
                }
              }}
              placeholder="Ville, code postal—¦"
              className="h-8 w-full rounded-full border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-300 focus:bg-white" />
          </div>

          {/* Spacer mobile */}
          <div className="flex-1 sm:hidden" />

          {/* Menu burger */}
          <button type="button" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu"
            className="shrink-0 flex h-8 w-8 flex-col items-center justify-center gap-[3.5px] rounded-lg border border-slate-200 bg-white transition hover:bg-slate-50">
            <span className="block h-[1.5px] w-3.5 rounded-full bg-slate-600" />
            <span className="block h-[1.5px] w-2.5 rounded-full bg-slate-600" />
            <span className="block h-[1.5px] w-3.5 rounded-full bg-slate-600" />
          </button>
        </div>
      </header>

      <FilterPanel isOpen={filterOpen} onClose={() => setFilterOpen(false)}
        initialCp={cp} initialSort={sort} initialCats={currentCats}
        initialStatut={currentStatut} initialBudgetMin={currentBudgetMin}
        initialBudgetMax={currentBudgetMax} onApply={handleFilterApply} count={count} />

      {/* â”€â”€ MENU LATERAL â”€â”€ */}
      {menuOpen && (
        <>
          <div role="button" tabIndex={0} onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 bg-black/40" />
          <aside className="fixed right-0 top-0 z-50 flex h-full w-[280px] max-w-[80vw] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <span className="text-sm font-bold text-slate-800">Menu</span>
              <button type="button" onClick={() => setMenuOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              {/* Sort */}
              <div className="flex gap-2">
                <Link href={sortRecentUrl} onClick={() => setMenuOpen(false)}
                  className={`flex-1 rounded-xl border px-4 py-3 text-center text-sm font-semibold transition ${sort !== "budget_desc" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>
                  Plus récents
                </Link>
                <Link href={sortBudgetUrl} onClick={() => setMenuOpen(false)}
                  className={`flex-1 rounded-xl border px-4 py-3 text-center text-sm font-semibold transition ${sort === "budget_desc" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>
                  Budget élevé
                </Link>
              </div>

              {/* + Créer un devis */}
              <Link href="/artisan/devis/new"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={() => setMenuOpen(false)}>
                + Créer un devis
              </Link>

              {/* + Créer une facture */}
              <Link href="/artisan/factures/new"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={() => setMenuOpen(false)}>
                + Créer une facture
              </Link>

              {/* IA Réceptionniste —” pa emoji */}
              <Link href="/artisan/receptionist"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={() => setMenuOpen(false)}>
                IA Réceptionniste
              </Link>

              {/* Effacer filtres */}
              {activeFilterCount > 0 && (
                <button type="button" onClick={() => { handleFilterReset(); setMenuOpen(false); }}
                  className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100">
                  Effacer les filtres ({activeFilterCount})
                </button>
              )}

              {/* Aide */}
              <div>
                <button type="button" disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-400">
                  Aide / Support
                </button>
                <span className="mt-1.5 block text-xs text-slate-400">Bientôt disponible</span>
              </div>
            </div>

            {/* Avatar + Se déconnecter */}
            <div className="border-t border-slate-100 p-5">
              {currentUser && (
                <AvatarDropdown email={currentUser.email ?? ""} onSignOut={async () => {
                  const s = createSupabaseBrowserClient()
                  await s.auth.signOut()
                  router.push("/artisan/login")
                  setMenuOpen(false)
                }} />
              )}
              <button type="button"
                onClick={async () => {
                  if (currentUser) {
                    try { const s = createSupabaseBrowserClient(); await s.auth.signOut(); router.push("/artisan/login"); }
                    catch (err) { console.error(err); }
                  } else { router.push("/artisan/login"); }
                  setMenuOpen(false);
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                {currentUser ? "Se déconnecter" : "Se connecter"}
              </button>
            </div>
          </aside>
        </>
      )}

      {/* â”€â”€ CONTENT â”€â”€ */}
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        {newHit && (
          <div className="mb-4 flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 p-4 text-[13px] text-blue-900">
            <div><b>Nouveau projet dans votre zone !</b> La liste a été mise à  jour.</div>
            <button onClick={() => setNewHit(null)} className="ml-4 rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm font-semibold text-blue-800 hover:bg-blue-100">OK</button>
          </div>
        )}
        {toast && <div className={`mb-4 rounded-xl border p-3 text-[13px] ${toastColors[toast.type]}`}>{toast.msg}</div>}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-[13px] text-red-800">
            <span className="font-semibold">Erreur</span> —” {error}
          </div>
        )}
        <p className="mb-5 text-sm text-slate-600">
          <strong className="text-slate-900">{count}</strong> projet{count > 1 ? "s" : ""} en{" "}
          <span className="font-medium">{regionLabel}</span>
        </p>
        {count > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} p={p} categoryLabel={categoryLabel}
                contact={unlockedContacts[p.id]}
                unlockState={unlockStatuses[p.id] ? { status: unlockStatuses[p.id]?.status ?? null } : undefined}
                onUnlockClick={onUnlockClick} onUnlockExclusive={onUnlockExclusive}
                onPrefetch={prefetchProject} unlocking={unlockingProjectId === p.id}
                projectUnlockCount={projectUnlockCounts[p.id] ?? 0}
                isLockedForMe={projectIsLocked[p.id] ?? false} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 shadow-sm">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="mb-1 text-base font-medium text-slate-900">Aucun projet dans votre zone pour le moment</p>
            <p className="mb-6 text-sm text-slate-500">Les nouveaux projets apparaîtront automatiquement</p>
            <button type="button" onClick={handleFilterReset}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_BLUE }}>
              Changer de zone
            </button>
          </div>
        )}
      </div>
    </div>
  );
}