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

// ── Build UBL XML — format exact Super PDP ──────────────────────────────────
function buildUBL(
  facture: Record<string, unknown>,
  artisan: Record<string, unknown>,
  sellerEndpointId: string,    // ID interne Super PDP du vendeur (ex: 315143296_5682)
  buyerEndpointId: string      // ID interne Super PDP de l'acheteur (ex: 315143296_5681)
): string {
  const lignes = Array.isArray(facture.lignes) ? facture.lignes : [];
  const artisanNom    = `${artisan.prenom ?? ""} ${artisan.nom ?? ""}`.trim() || "Artisan";
  const siret         = String(artisan.siret ?? "").replace(/\s/g, "");
  const clientSiret   = String(facture.client_siret ?? "").replace(/\s/g, "");
  const ht  = Number(facture.total_ht  || 0).toFixed(2);
  const tva = Number(facture.total_tva || 0).toFixed(2);
  const ttc = Number(facture.total_ttc || 0).toFixed(2);

  const esc = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  // Group TVA by rate
  const vatGroups: Record<string, {taxable: number, tax: number}> = {};
  lignes.forEach((l: Record<string, unknown>) => {
    const rate = String(Number(l.tvaRate || 0));
    const taxable = (Number(l.quantity||1) * Number(l.unitPrice||0));
    const tax = taxable * Number(l.tvaRate||0) / 100;
    if (!vatGroups[rate]) vatGroups[rate] = { taxable: 0, tax: 0 };
    vatGroups[rate].taxable += taxable;
    vatGroups[rate].tax += tax;
  });

  const taxSubtotals = Object.entries(vatGroups).map(([rate, vals]) => `
  <TaxSubtotal xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
    <TaxableAmount xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" currencyID="EUR">${vals.taxable.toFixed(2)}</TaxableAmount>
    <TaxAmount xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" currencyID="EUR">${vals.tax.toFixed(2)}</TaxAmount>
    <TaxCategory xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
      <ID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">S</ID>
      <Percent xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">${rate}</Percent>
      <TaxScheme xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
        <ID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">VAT</ID>
      </TaxScheme>
    </TaxCategory>
  </TaxSubtotal>`).join("");

  const invoiceLines = lignes.map((l: Record<string, unknown>, i: number) => {
    const qty   = Number(l.quantity  || 1);
    const price = Number(l.unitPrice || 0);
    const net   = (qty * price).toFixed(2);
    const vat   = Number(l.tvaRate || 0);
    return `
  <InvoiceLine xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
    <ID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">${String(i+1).padStart(3,"0")}</ID>
    <InvoicedQuantity xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" unitCode="C62">${qty}</InvoicedQuantity>
    <LineExtensionAmount xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" currencyID="EUR">${net}</LineExtensionAmount>
    <Item xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
      <Name xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">${esc(String(l.description||`Prestation ${i+1}`))}</Name>
      <ClassifiedTaxCategory xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
        <ID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">S</ID>
        <Percent xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">${vat}</Percent>
        <TaxScheme xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
          <ID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">VAT</ID>
        </TaxScheme>
      </ClassifiedTaxCategory>
    </Item>
    <Price xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
      <PriceAmount xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" currencyID="EUR">${price.toFixed(2)}</PriceAmount>
    </Price>
  </InvoiceLine>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
  <CustomizationID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">urn:cen.eu:en16931:2017</CustomizationID>
  <ProfileID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">M1</ProfileID>
  <ID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">${facture.numero}</ID>
  <IssueDate xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">${facture.date_emission}</IssueDate>
  ${facture.date_echeance ? `<DueDate xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">${facture.date_echeance}</DueDate>` : ""}
  <InvoiceTypeCode xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">380</InvoiceTypeCode>
  <DocumentCurrencyCode xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">EUR</DocumentCurrencyCode>
  <AccountingSupplierParty xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
    <Party xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
      <EndpointID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" schemeID="0225">${sellerEndpointId}</EndpointID>
      <PartyIdentification xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
        <ID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" schemeID="0225">${siret || "000000000"}</ID>
      </PartyIdentification>
      <PostalAddress xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
        <Country xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
          <IdentificationCode xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">FR</IdentificationCode>
        </Country>
      </PostalAddress>
      <PartyTaxScheme xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
        <CompanyID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">FR00${siret.slice(0,9)}</CompanyID>
        <TaxScheme xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
          <ID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">VAT</ID>
        </TaxScheme>
      </PartyTaxScheme>
      <PartyLegalEntity xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
        <RegistrationName xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">${esc(artisanNom)}</RegistrationName>
        <CompanyID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" schemeID="0002">${siret || "000000000"}</CompanyID>
      </PartyLegalEntity>
    </Party>
  </AccountingSupplierParty>
  <AccountingCustomerParty xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
    <Party xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
      <EndpointID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" schemeID="0225">${buyerEndpointId}</EndpointID>
      <PartyIdentification xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
        <ID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" schemeID="0225">${clientSiret || "000000000"}</ID>
      </PartyIdentification>
      <PostalAddress xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
        <Country xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
          <IdentificationCode xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">FR</IdentificationCode>
        </Country>
      </PostalAddress>
      <PartyTaxScheme xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
        <CompanyID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">FR00${clientSiret.slice(0,9)}</CompanyID>
        <TaxScheme xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
          <ID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">VAT</ID>
        </TaxScheme>
      </PartyTaxScheme>
      <PartyLegalEntity xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
        <RegistrationName xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">${esc(String(facture.client_nom||""))}</RegistrationName>
        <CompanyID xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" schemeID="0002">${clientSiret || "000000000"}</CompanyID>
      </PartyLegalEntity>
    </Party>
  </AccountingCustomerParty>
  <TaxTotal xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
    <TaxAmount xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" currencyID="EUR">${tva}</TaxAmount>${taxSubtotals}
  </TaxTotal>
  <LegalMonetaryTotal xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
    <LineExtensionAmount xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" currencyID="EUR">${ht}</LineExtensionAmount>
    <TaxExclusiveAmount xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" currencyID="EUR">${ht}</TaxExclusiveAmount>
    <TaxInclusiveAmount xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" currencyID="EUR">${ttc}</TaxInclusiveAmount>
    <PayableAmount xmlns="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" currencyID="EUR">${ttc}</PayableAmount>
  </LegalMonetaryTotal>${invoiceLines}
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
    // Sandbox endpoint IDs from Super PDP (Burger Queen seller, Tricatel buyer)
    const sellerEndpointId = process.env.SUPERPDP_SELLER_ENDPOINT ?? "315143296_5682";
    const buyerEndpointId  = process.env.SUPERPDP_BUYER_ENDPOINT  ?? "315143296_5681";
    const xmlBody = buildUBL(facture, artisan ?? {}, sellerEndpointId, buyerEndpointId);
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