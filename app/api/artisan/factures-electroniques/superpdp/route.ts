export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// app/api/artisan/factures-electroniques/superpdp/route.ts
// Super PDP — Plateforme Agréée certifiée DGFiP

import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

const SANDBOX    = process.env.SUPERPDP_SANDBOX === "true";
const API_BASE   = SANDBOX
  ? "https://sandbox.superpdp.tech/api"
  : "https://app.superpdp.tech/api";
const TOKEN_URL  = SANDBOX
  ? "https://sandbox.superpdp.tech/oauth/token"
  : "https://app.superpdp.tech/oauth/token";

// ── Get OAuth token ─────────────────────────────────────────────────────────
async function getToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type:    "client_credentials",
      client_id:     process.env.SUPERPDP_CLIENT_ID    ?? "",
      client_secret: process.env.SUPERPDP_CLIENT_SECRET ?? "",
    }),
  });
  if (!res.ok) throw new Error(`Token error: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

// ── Build Factur-X JSON (EN16931) ───────────────────────────────────────────
function buildFacturX(facture: Record<string, unknown>, artisan: Record<string, unknown>) {
  const lignes = Array.isArray(facture.lignes) ? facture.lignes : [];

  return {
    // Identifiant facture
    id:            facture.numero,
    issue_date:    facture.date_emission,
    due_date:      facture.date_echeance,
    currency_code: "EUR",
    type_code:     "380", // Facture commerciale standard

    // Vendeur (artisan)
    seller: {
      name:            `${artisan.prenom ?? ""} ${artisan.nom ?? ""}`.trim() || "Artisan",
      tax_number:      artisan.siret ?? "",
      address: {
        street:      artisan.adresse ?? "",
        city:        artisan.city    ?? "",
        postal_code: artisan.postal_code ?? "",
        country:     "FR",
      },
    },

    // Acheteur (client)
    buyer: {
      name:       facture.client_nom,
      tax_number: facture.client_siret,
      address: {
        street:  facture.client_adresse ?? "",
        country: "FR",
      },
    },

    // Lignes
    lines: lignes.map((l: Record<string, unknown>, i: number) => ({
      id:          String(i + 1),
      name:        l.description ?? `Prestation ${i + 1}`,
      quantity:    Number(l.quantity)  || 1,
      unit_price:  Number(l.unitPrice) || 0,
      tax_rate:    Number(l.tvaRate)   || 0,
      total_amount: (Number(l.quantity) || 1) * (Number(l.unitPrice) || 0),
    })),

    // Totaux
    tax_total:   Number(facture.total_tva) || 0,
    grand_total: Number(facture.total_ttc) || 0,

    // Notes
    note: facture.notes ?? "",
  };
}

// ── POST — Envoyer fature te Super PDP ─────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const { facture_id } = body ?? {};

    if (!facture_id) {
      return NextResponse.json({ ok: false, error: "facture_id manquant." }, { status: 400 });
    }

    // Auth
    const authHeader = req.headers.get("authorization") ?? "";
    const token      = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    const svc        = createSupabaseServiceClient();
    let user: { id: string } | null = null;

    if (token) {
      const { data } = await svc.auth.getUser(token);
      user = data.user;
    } else {
      const serverSupabase = await createSupabaseServerClient();
      const { data }       = await serverSupabase.auth.getUser();
      user = data.user;
    }

    if (!user) return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });

    // Récupérer facture
    const { data: facture, error: factureErr } = await svc
      .from("factures_electroniques")
      .select("*")
      .eq("id", facture_id)
      .eq("artisan_id", user.id)
      .single();

    if (factureErr || !facture) {
      return NextResponse.json({ ok: false, error: "Facture introuvable." }, { status: 404 });
    }

    // Récupérer profil artisan
    const { data: artisan } = await svc
      .from("profiles")
      .select("nom, prenom, siret, adresse, city, postal_code")
      .eq("id", user.id)
      .single();

    // Token Super PDP
    const pdpToken = await getToken();

    // Build facture JSON
    const factureJson = buildFacturX(facture, artisan ?? {});

    // Envoyer à Super PDP
    const pdpRes = await fetch(`${API_BASE}/invoices`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${pdpToken}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify(factureJson),
    });

    const pdpData = await pdpRes.json();

    if (!pdpRes.ok) {
      console.error("[SuperPDP] error:", pdpData);
      return NextResponse.json({ ok: false, error: pdpData?.message ?? "Erreur Super PDP." }, { status: 500 });
    }

    // Update statut en DB
    await svc
      .from("factures_electroniques")
      .update({
        statut:          "en-attente",
        statut_efacture: "transmise",
        pennylane_id:    pdpData.id ?? null,
        updated_at:      new Date().toISOString(),
      })
      .eq("id", facture_id);

    console.log("[SuperPDP] facture transmise:", pdpData.id);
    return NextResponse.json({ ok: true, pdp_id: pdpData.id });

  } catch (e) {
    console.error("[SuperPDP POST]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

// ── GET — Statut d'une facture ──────────────────────────────────────────────
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pdp_id = searchParams.get("pdp_id");
    if (!pdp_id) return NextResponse.json({ ok: false, error: "pdp_id manquant." }, { status: 400 });

    const pdpToken = await getToken();

    const res  = await fetch(`${API_BASE}/invoices/${pdp_id}`, {
      headers: { "Authorization": `Bearer ${pdpToken}` },
    });
    const data = await res.json();

    return NextResponse.json({ ok: true, statut: data.status ?? "inconnu", data });

  } catch (e) {
    console.error("[SuperPDP GET]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}