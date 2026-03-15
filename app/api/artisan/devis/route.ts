// app/api/artisan/devis/route.ts
// GET  /api/artisan/devis          — liste des devis de l'artisan
// POST /api/artisan/devis          — créer un nouveau devis
// PUT  /api/artisan/devis          — mettre à jour un devis existant

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function makeSupabase() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: () => {},
        remove: () => {},
      },
    }
  );
}

// ── GET — liste devis ─────────────────────────────────────────────────────────
export async function GET() {
  const supabase = makeSupabase();
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return NextResponse.json({ ok: false, error: "Non authentifié" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("devis")
    .select("id, numero, client_nom, client_email, statut, total_ttc, date_emission, date_validite, created_at")
    .eq("artisan_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, devis: data });
}

// ── POST — créer devis ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const supabase = makeSupabase();
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return NextResponse.json({ ok: false, error: "Non authentifié" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 }); }

  // Calcul totaux
  const lignes = (body.lignes as Array<{ quantite: number; prix_unitaire_ht: number }>) ?? [];
  const total_ht = lignes.reduce((sum, l) => sum + (Number(l.quantite) || 0) * (Number(l.prix_unitaire_ht) || 0), 0);
  const tva_pct = Number(body.tva_pct) || 20;
  const total_tva = total_ht * (tva_pct / 100);
  const total_ttc = total_ht + total_tva;
  const acompte_pct = Number(body.acompte_pct) || 0;
  const acompte_ttc = total_ttc * (acompte_pct / 100);

  // Génère numéro si pas fourni
  const numero = (body.numero as string)?.trim() || `DEV-${Date.now()}`;

  const insert = {
    artisan_id:         user.id,
    statut:             (body.statut as string) || "brouillon",
    artisan_nom:        body.artisan_nom,
    artisan_siret:      body.artisan_siret,
    artisan_adresse:    body.artisan_adresse,
    artisan_tel:        body.artisan_tel,
    artisan_email:      body.artisan_email,
    artisan_assurance:  body.artisan_assurance,
    artisan_police:     body.artisan_police,
    artisan_logo_url:   body.artisan_logo_url,
    client_nom:         body.client_nom,
    client_tel:         body.client_tel,
    client_adresse:     body.client_adresse,
    client_email:       body.client_email,
    numero,
    date_emission:      body.date_emission || null,
    date_validite:      body.date_validite || null,
    date_debut_travaux: body.date_debut_travaux || null,
    duree_estimee:      body.duree_estimee,
    lignes:             lignes,
    tva_pct,
    total_ht:           Math.round(total_ht * 100) / 100,
    total_tva:          Math.round(total_tva * 100) / 100,
    total_ttc:          Math.round(total_ttc * 100) / 100,
    acompte_pct,
    acompte_ttc:        Math.round(acompte_ttc * 100) / 100,
    notes:              body.notes,
    conditions:         body.conditions,
    signature_data:     body.signature_data,
    project_id:         body.project_id || null,
  };

  const { data, error } = await supabase.from("devis").insert(insert).select().single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, devis: data }, { status: 201 });
}

// ── PUT — mettre à jour devis ─────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
  const supabase = makeSupabase();
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return NextResponse.json({ ok: false, error: "Non authentifié" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 }); }

  const { id, ...rest } = body;
  if (!id) return NextResponse.json({ ok: false, error: "id requis" }, { status: 400 });

  // Recalcul totaux si lignes présentes
  const updates: Record<string, unknown> = { ...rest };
  if (rest.lignes) {
    const lignes = rest.lignes as Array<{ quantite: number; prix_unitaire_ht: number }>;
    const total_ht = lignes.reduce((sum, l) => sum + (Number(l.quantite) || 0) * (Number(l.prix_unitaire_ht) || 0), 0);
    const tva_pct = Number(rest.tva_pct) || 20;
    const total_tva = total_ht * (tva_pct / 100);
    const total_ttc = total_ht + total_tva;
    const acompte_pct = Number(rest.acompte_pct) || 0;
    updates.total_ht   = Math.round(total_ht * 100) / 100;
    updates.total_tva  = Math.round(total_tva * 100) / 100;
    updates.total_ttc  = Math.round(total_ttc * 100) / 100;
    updates.acompte_ttc = Math.round(total_ttc * (acompte_pct / 100) * 100) / 100;
  }

  // Sécurité: ne peut modifier que ses propres devis
  const { data, error } = await supabase
    .from("devis")
    .update(updates)
    .eq("id", id as string)
    .eq("artisan_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, devis: data });
}