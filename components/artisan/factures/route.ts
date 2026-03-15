// Deploy: app/api/artisan/factures/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function makeSupabase() {
  const cookieStore = await cookies();
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

export async function GET() {
  const supabase = await makeSupabase();
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) return NextResponse.json({ ok: false, error: "Non authentifié" }, { status: 401 });
  const { data, error } = await supabase.from("factures").select("id, numero, client_nom, client_email, statut, total_ttc, date_emission, date_echeance, created_at").eq("artisan_id", user.id).order("created_at", { ascending: false });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, factures: data });
}

export async function POST(req: NextRequest) {
  const supabase = await makeSupabase();
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) return NextResponse.json({ ok: false, error: "Non authentifié" }, { status: 401 });
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 }); }
  const lignes = (body.lignes as Array<{ quantite: number; prix_unitaire_ht: number }>) ?? [];
  const total_ht  = lignes.reduce((sum, l) => sum + (Number(l.quantite)||0)*(Number(l.prix_unitaire_ht)||0), 0);
  const tva_pct   = Number(body.tva_pct)||20;
  const total_tva = total_ht*(tva_pct/100);
  const total_ttc = total_ht+total_tva;
  const numero    = (body.numero as string)?.trim()||`FAC-${Date.now()}`;
  const insert = {
    artisan_id: user.id, statut: (body.statut as string)||"brouillon",
    artisan_nom: body.artisan_nom, artisan_siret: body.artisan_siret,
    artisan_adresse: body.artisan_adresse, artisan_tel: body.artisan_tel,
    artisan_email: body.artisan_email, artisan_assurance: body.artisan_assurance,
    artisan_police: body.artisan_police, artisan_logo_url: body.artisan_logo_url,
    client_nom: body.client_nom, client_tel: body.client_tel,
    client_adresse: body.client_adresse, client_email: body.client_email,
    numero, date_emission: body.date_emission||null, date_echeance: body.date_echeance||null,
    lignes, tva_pct,
    total_ht: Math.round(total_ht*100)/100, total_tva: Math.round(total_tva*100)/100,
    total_ttc: Math.round(total_ttc*100)/100,
    notes: body.notes, conditions: body.conditions, signature_data: body.signature_data,
    project_id: body.project_id||null, devis_id: body.devis_id||null,
  };
  const { data, error } = await supabase.from("factures").insert(insert).select().single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, facture: data }, { status: 201 });
}