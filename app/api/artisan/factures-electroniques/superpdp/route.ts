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

// ── Build UBL XML (format accepté par Super PDP) ────────────────────────────
function buildUBL(
  facture: Record<string, unknown>,
  artisan: Record<string, unknown>
): string {
  const lignes = Array.isArray(facture.lignes) ? facture.lignes : [];
  const artisanNom = `${artisan.prenom ?? ""} ${artisan.nom ?? ""}`.trim() || "Artisan";
  const siret = String(artisan.siret ?? "").replace(/\s/g, "");
  const clientSiret = String(facture.client_siret ?? "").replace(/\s/g, "");
  const ht  = Number(facture.total_ht  || 0).toFixed(2);
  const tva = Number(facture.total_tva || 0).toFixed(2);
  const ttc = Number(facture.total_ttc || 0).toFixed(2);

  const lines = lignes.map((l: Record<string, unknown>, i: number) => {
    const qty   = Number(l.quantity  || 1);
    const price = Number(l.unitPrice || 0);
    const net   = (qty * price).toFixed(2);
    const vat   = Number(l.tvaRate || 0);
    return `
  <cac:InvoiceLine>
    <cbc:ID>${i + 1}</cbc:ID>
    <cbc:InvoicedQuantity unitCode="C62">${qty}</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">${net}</cbc:LineExtensionAmount>
    <cac:TaxTotal>
      <cbc:TaxAmount currencyID="EUR">${(qty * price * vat / 100).toFixed(2)}</cbc:TaxAmount>
    </cac:TaxTotal>
    <cac:Item>
      <cbc:Description>${String(l.description || `Prestation ${i+1}`).replace(/&/g,"&amp;").replace(/</g,"&lt;")}</cbc:Description>
      <cbc:Name>${String(l.description || `Prestation ${i+1}`).replace(/&/g,"&amp;").replace(/</g,"&lt;")}</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>${vat === 0 ? "Z" : "S"}</cbc:ID>
        <cbc:Percent>${vat}</cbc:Percent>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">${price.toFixed(2)}</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
  xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
  xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>${facture.numero}</cbc:ID>
  <cbc:IssueDate>${facture.date_emission}</cbc:IssueDate>
  ${facture.date_echeance ? `<cbc:DueDate>${facture.date_echeance}</cbc:DueDate>` : ""}
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyIdentification><cbc:ID schemeID="0009">${siret}</cbc:ID></cac:PartyIdentification>
      <cac:PartyName><cbc:Name>${artisanNom.replace(/&/g,"&amp;")}</cbc:Name></cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>${String(artisan.adresse || "").replace(/&/g,"&amp;")}</cbc:StreetName>
        <cbc:CityName>${String(artisan.city || "").replace(/&/g,"&amp;")}</cbc:CityName>
        <cbc:PostalZone>${String(artisan.postal_code || "")}</cbc:PostalZone>
        <cac:Country><cbc:IdentificationCode>FR</cbc:IdentificationCode></cac:Country>
      </cac:PostalAddress>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>${artisanNom.replace(/&/g,"&amp;")}</cbc:RegistrationName>
        <cbc:CompanyID>${siret}</cbc:CompanyID>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyIdentification><cbc:ID schemeID="0009">${clientSiret}</cbc:ID></cac:PartyIdentification>
      <cac:PartyName><cbc:Name>${String(facture.client_nom || "").replace(/&/g,"&amp;")}</cbc:Name></cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>${String(facture.client_adresse || "").replace(/&/g,"&amp;")}</cbc:StreetName>
        <cac:Country><cbc:IdentificationCode>FR</cbc:IdentificationCode></cac:Country>
      </cac:PostalAddress>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>${String(facture.client_nom || "").replace(/&/g,"&amp;")}</cbc:RegistrationName>
        <cbc:CompanyID>${clientSiret}</cbc:CompanyID>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">${tva}</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="EUR">${ht}</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="EUR">${tva}</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>20</cbc:Percent>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="EUR">${ht}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">${ht}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">${ttc}</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="EUR">${ttc}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>${lines}
</Invoice>`;
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
    const xmlBody = buildUBL(facture, artisan ?? {});
    console.log("[SuperPDP] sending invoice:", facture.numero);

    const pdpRes = await fetch(`${API_BASE}/invoices`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${pdpToken}`,
        "Content-Type":  "application/xml",
      },
      body: xmlBody,
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