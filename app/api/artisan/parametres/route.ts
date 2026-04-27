export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// app/api/artisan/parametres/route.ts

import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

async function getUser(req: Request) {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const svc = createSupabaseServiceClient();

  if (token) {
    const { data } = await svc.auth.getUser(token);
    return { user: data.user, svc };
  }
  const serverSupabase = await createSupabaseServerClient();
  const { data } = await serverSupabase.auth.getUser();
  return { user: data.user, svc };
}

export async function GET(req: Request) {
  try {
    const { user, svc } = await getUser(req);
    if (!user) return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });

    const { data, error } = await svc
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true, profile: data });
  } catch (e) {
    console.error("[parametres GET]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { user, svc } = await getUser(req);
    if (!user) return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });

    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: false, error: "Données manquantes." }, { status: 400 });

    const allowed = [
      "nom", "prenom", "phone", "metier", "email",
      "postal_code", "city", "adresse", "siret",
      "tva_defaut", "conditions_paiement", "pied_page",
      "notif_paiement", "notif_consultee", "notif_rappels",
      "sms_notifications",
    ];

    const patch: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in body) patch[key] = body[key];
    }

    const { error } = await svc
      .from("profiles")
      .update(patch)
      .eq("id", user.id);

    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[parametres PATCH]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}