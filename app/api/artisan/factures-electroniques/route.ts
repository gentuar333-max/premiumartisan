export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// app/api/artisan/factures-electroniques/route.ts

import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

// ── Numero generator ────────────────────────────────────────────────────────
async function generateNumero(svc: ReturnType<typeof createSupabaseServiceClient>): Promise<string> {
  const year  = new Date().getFullYear();
  const { count } = await svc
    .from("factures_electroniques")
    .select("*", { count: "exact", head: true })
    .like("numero", `FE-${year}-%`);
  const next = String((count ?? 0) + 1).padStart(3, "0");
  return `FE-${year}-${next}`;
}

// ── POST — créer une facture ────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Données manquantes." }, { status: 400 });
    }

    const { client, dates, services, notes } = body;

    if (!client?.companyName || !client?.siret) {
      return NextResponse.json({ ok: false, error: "Nom et SIRET obligatoires." }, { status: 400 });
    }

    const serverSupabase = await createSupabaseServerClient();
    const { data: { user }, error: authErr } = await serverSupabase.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const svc = createSupabaseServiceClient();
    const numero = await generateNumero(svc);

    // Calculs totaux
    const lignes = Array.isArray(services) ? services : [];
    let totalHT  = 0;
    let totalTVA = 0;
    for (const s of lignes) {
      const ht  = (Number(s.quantity) || 0) * (Number(s.unitPrice) || 0);
      const tva = ht * ((Number(s.tvaRate) || 0) / 100);
      totalHT  += ht;
      totalTVA += tva;
    }
    const totalTTC = totalHT + totalTVA;

    const payload = {
      artisan_id:      user.id,
      numero,
      statut:          "brouillon",
      statut_efacture: null,
      client_nom:      client.companyName,
      client_siret:    client.siret.replace(/\s/g, ""),
      client_email:    client.email     ?? "",
      client_adresse:  client.address   ?? "",
      date_emission:   dates?.invoiceDate ?? new Date().toISOString().split("T")[0],
      date_echeance:   dates?.dueDate    ?? null,
      lignes:          lignes,
      notes:           notes ?? "",
      total_ht:        totalHT,
      total_tva:       totalTVA,
      total_ttc:       totalTTC,
    };

    const { data, error } = await svc
      .from("factures_electroniques")
      .insert(payload)
      .select("id, numero")
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true, id: data.id, numero: data.numero });

  } catch (e) {
    console.error("[factures-electroniques POST]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

// ── GET — liste des factures ────────────────────────────────────────────────
export async function GET(req: Request) {
  try {
    const serverSupabase = await createSupabaseServerClient();
    const { data: { user }, error: authErr } = await serverSupabase.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const statut = searchParams.get("statut");

    const svc = createSupabaseServiceClient();
    let query = svc
      .from("factures_electroniques")
      .select("id, numero, statut, statut_efacture, client_nom, client_siret, client_email, total_ht, total_tva, total_ttc, date_emission, date_echeance, created_at")
      .eq("artisan_id", user.id)
      .order("created_at", { ascending: false });

    if (statut) query = query.eq("statut", statut);

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true, factures: data ?? [] });

  } catch (e) {
    console.error("[factures-electroniques GET]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

// ── PATCH — update statut ───────────────────────────────────────────────────
export async function PATCH(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const { id, statut, statut_efacture } = body ?? {};

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID manquant." }, { status: 400 });
    }

    const serverSupabase = await createSupabaseServerClient();
    const { data: { user }, error: authErr } = await serverSupabase.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const svc   = createSupabaseServiceClient();
    const patch: Record<string, string> = { updated_at: new Date().toISOString() };
    if (statut)          patch.statut          = statut;
    if (statut_efacture) patch.statut_efacture = statut_efacture;

    const { error } = await svc
      .from("factures_electroniques")
      .update(patch)
      .eq("id", id)
      .eq("artisan_id", user.id);

    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true });

  } catch (e) {
    console.error("[factures-electroniques PATCH]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}