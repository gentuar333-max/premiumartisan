export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// app/api/artisan/clients/route.ts

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

// GET — liste clients
export async function GET(req: Request) {
  try {
    const { user, svc } = await getUser(req);
    if (!user) return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });

    const { data, error } = await svc
      .from("clients")
      .select("*")
      .eq("artisan_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, clients: data ?? [] });
  } catch (e) {
    console.error("[clients GET]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

// POST — ajouter client
export async function POST(req: Request) {
  try {
    const { user, svc } = await getUser(req);
    if (!user) return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });

    const body = await req.json().catch(() => null);
    if (!body?.company_name) return NextResponse.json({ ok: false, error: "Nom requis." }, { status: 400 });

    const { data, error } = await svc
      .from("clients")
      .insert({
        artisan_id:   user.id,
        company_name: body.company_name,
        siret:        body.siret   ?? "",
        email:        body.email   ?? "",
        address:      body.address ?? "",
        phone:        body.phone   ?? "",
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, id: data.id });
  } catch (e) {
    console.error("[clients POST]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

// DELETE — supprimer client
export async function DELETE(req: Request) {
  try {
    const { user, svc } = await getUser(req);
    if (!user) return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ ok: false, error: "ID manquant." }, { status: 400 });

    const { error } = await svc
      .from("clients")
      .delete()
      .eq("id", id)
      .eq("artisan_id", user.id);

    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[clients DELETE]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}