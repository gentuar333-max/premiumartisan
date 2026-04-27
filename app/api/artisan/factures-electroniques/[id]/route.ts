export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// app/api/artisan/factures-electroniques/[id]/route.ts

import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    const svc = createSupabaseServiceClient();
    let user: { id: string } | null = null;

    if (token) {
      const { data } = await svc.auth.getUser(token);
      user = data.user;
    } else {
      const serverSupabase = await createSupabaseServerClient();
      const { data } = await serverSupabase.auth.getUser();
      user = data.user;
    }

    if (!user) return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });

    const { data, error } = await svc
      .from("factures_electroniques")
      .select("*")
      .eq("id", id)
      .eq("artisan_id", user.id)
      .single();

    if (error || !data) return NextResponse.json({ ok: false, error: "Facture introuvable." }, { status: 404 });

    return NextResponse.json({ ok: true, facture: data });
  } catch (e) {
    console.error("[factures-electroniques/[id] GET]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => null);
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    const svc = createSupabaseServiceClient();
    let user: { id: string } | null = null;

    if (token) {
      const { data } = await svc.auth.getUser(token);
      user = data.user;
    } else {
      const serverSupabase = await createSupabaseServerClient();
      const { data } = await serverSupabase.auth.getUser();
      user = data.user;
    }

    if (!user) return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });

    const patch: Record<string, string | null> = { updated_at: new Date().toISOString() };
    if (body?.statut)          patch.statut          = body.statut;
    if (body?.statut_efacture !== undefined) patch.statut_efacture = body.statut_efacture;

    const { error } = await svc
      .from("factures_electroniques")
      .update(patch)
      .eq("id", id)
      .eq("artisan_id", user.id);

    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[factures-electroniques/[id] PATCH]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    const svc = createSupabaseServiceClient();
    let user: { id: string } | null = null;

    if (token) {
      const { data } = await svc.auth.getUser(token);
      user = data.user;
    } else {
      const serverSupabase = await createSupabaseServerClient();
      const { data } = await serverSupabase.auth.getUser();
      user = data.user;
    }

    if (!user) return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });

    const { error } = await svc
      .from("factures_electroniques")
      .delete()
      .eq("id", id)
      .eq("artisan_id", user.id);

    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[factures-electroniques/[id] DELETE]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}