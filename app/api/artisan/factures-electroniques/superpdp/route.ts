export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// app/api/artisan/factures-electroniques/superpdp/route.ts

import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

const API_BASE  = "https://api.superpdp.tech/v1.beta";
const TOKEN_URL = "https://api.superpdp.tech/oauth2/token";

// ── OAuth token ──────────────────────────────────────────────────────────────
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
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.access_token;
}

// ── Build EN16931 payload ────────────────────────────────────────────────────
function buildPayload(
  facture: Record<string, unknown>,
  artisan: Record<string, unknown>
) {
  const lignes = Array.isArray(facture.lignes) ? facture.lignes : [];
  const artisanNom = `${artisan.prenom ?? ""} ${artisan.nom ?? ""}`.trim() || "Artisan";
  const siret = String(artisan.siret ?? "").replace(/\s/g, "");
  const clientSiret = String(facture.client_siret ?? "").replace(/\s/g, "");

  return {
    en_invoice: {
      number:        facture.numero,
      issue_date:    facture.date_emission,
      payment_due_date: facture.date_echeance ?? undefined,
      currency_code: "EUR",
      type_code:     380,

      seller: {
        name: artisanNom,
        legal_registration_identifier: siret ? { scheme: "0009", value: siret } : undefined,
        postal_address: {
          address_line1: String(artisan.adresse ?? ""),
          city:          String(artisan.city    ?? ""),
          post_code:     String(artisan.postal_code ?? ""),
          country_code:  "FR",
        },
      },

      buyer: {
        name: facture.client_nom,
        legal_registration_identifier: clientSiret ? { scheme: "0009", value: clientSiret } : undefined,
        postal_address: {
          address_line1: String(facture.client_adresse ?? ""),
          country_code:  "FR",
        },
      },

      lines: lignes.map((l: Record<string, unknown>, i: number) => {
        const qty      = Number(l.quantity)  || 1;
        const price    = Number(l.unitPrice) || 0;
        const netAmt   = qty * price;
        const vatRate  = Number(l.tvaRate)   || 0;
        return {
          identifier:        String(i + 1),
          invoiced_quantity: String(qty),
          invoiced_quantity_code: "C62",
          net_amount: String(netAmt.toFixed(2)),
          item_information: {
            name: String(l.description ?? `Prestation ${i + 1}`),
          },
          price_details: {
            item_net_price: String(price.toFixed(2)),
          },
          vat_information: {
            invoiced_item_vat_category_code: vatRate === 0 ? "Z" : "S",
            invoiced_item_vat_rate: String(vatRate),
          },
        };
      }),

      totals: {
        sum_invoice_lines_amount: String(Number(facture.total_ht).toFixed(2)),
        total_without_vat:        String(Number(facture.total_ht).toFixed(2)),
        total_vat_amount: {
          currency_code: "EUR",
          value: String(Number(facture.total_tva).toFixed(2)),
        },
        total_with_vat:       String(Number(facture.total_ttc).toFixed(2)),
        amount_due_for_payment: String(Number(facture.total_ttc).toFixed(2)),
      },

      vat_break_down: [
        {
          vat_category_code:      "S",
          vat_category_rate:      "20",
          vat_category_taxable_amount: String(Number(facture.total_ht).toFixed(2)),
          vat_category_tax_amount:     String(Number(facture.total_tva).toFixed(2)),
        },
      ],

      notes: facture.notes ? [{ note: String(facture.notes) }] : undefined,
    },
  };
}

// ── Auth helper ──────────────────────────────────────────────────────────────
async function authUser(req: Request) {
  const authHeader = req.headers.get("authorization") ?? "";
  const token      = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const svc        = createSupabaseServiceClient();
  if (token) {
    const { data } = await svc.auth.getUser(token);
    return { user: data.user, svc };
  }
  const serverSupabase = await createSupabaseServerClient();
  const { data }       = await serverSupabase.auth.getUser();
  return { user: data.user, svc };
}

// ── POST ─────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const { facture_id } = body ?? {};
    if (!facture_id) {
      return NextResponse.json({ ok: false, error: "facture_id manquant." }, { status: 400 });
    }

    const { user, svc } = await authUser(req);
    if (!user) return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });

    // Fetch facture
    const { data: facture, error: fErr } = await svc
      .from("factures_electroniques")
      .select("*")
      .eq("id", facture_id)
      .eq("artisan_id", user.id)
      .single();
    if (fErr || !facture) {
      return NextResponse.json({ ok: false, error: "Facture introuvable." }, { status: 404 });
    }

    // Fetch artisan profile
    const { data: artisan } = await svc
      .from("profiles")
      .select("nom, prenom, siret, adresse, city, postal_code")
      .eq("id", user.id)
      .single();

    // Get Super PDP token
    const pdpToken = await getToken();

    // Build & send
    const payload = buildPayload(facture, artisan ?? {});
    console.log("[SuperPDP] sending invoice:", facture.numero);

    const pdpRes = await fetch(`${API_BASE}/invoices`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${pdpToken}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify(payload),
    });

    const pdpData = await pdpRes.json();

    if (!pdpRes.ok) {
      console.error("[SuperPDP] error:", JSON.stringify(pdpData));
      return NextResponse.json(
        { ok: false, error: pdpData?.message ?? "Erreur Super PDP.", detail: pdpData },
        { status: 500 }
      );
    }

    console.log("[SuperPDP] success, id:", pdpData.id);

    // Update DB
    await svc
      .from("factures_electroniques")
      .update({
        statut:          "en-attente",
        statut_efacture: "transmise",
        pennylane_id:    String(pdpData.id ?? ""),
        updated_at:      new Date().toISOString(),
      })
      .eq("id", facture_id);

    return NextResponse.json({ ok: true, pdp_id: pdpData.id });

  } catch (e) {
    console.error("[SuperPDP POST] crash:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

// ── GET statut ───────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pdp_id = searchParams.get("pdp_id");
    if (!pdp_id) return NextResponse.json({ ok: false, error: "pdp_id manquant." }, { status: 400 });

    const pdpToken = await getToken();
    const res      = await fetch(`${API_BASE}/invoices/${pdp_id}`, {
      headers: { "Authorization": `Bearer ${pdpToken}` },
    });
    const data = await res.json();
    return NextResponse.json({ ok: true, statut: data.events?.[0]?.status_code ?? "inconnu", data });

  } catch (e) {
    console.error("[SuperPDP GET]", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}