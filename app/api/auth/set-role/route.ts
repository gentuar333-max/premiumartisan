import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";

const DEV = process.env.NODE_ENV === "development";

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      if (DEV) console.error("[api/auth/set-role] auth failed:", authErr?.message ?? "no user");
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    const role = String(body?.role ?? "").trim();

    if (role !== "artisan") {
      return NextResponse.json({ ok: false, error: "Rôle invalide." }, { status: 400 });
    }

    const first_name = typeof body?.first_name === "string" ? body.first_name.trim() : null;
    const last_name = typeof body?.last_name === "string" ? body.last_name.trim() : null;
    const phone = typeof body?.phone === "string" ? body.phone.replace(/\D/g, "").slice(0, 20) : null;
    const metier = typeof body?.metier === "string" ? body.metier.trim() : null;
    const postal_code = typeof body?.postal_code === "string" ? body.postal_code.trim().slice(0, 10) : null;
    const city = typeof body?.city === "string" ? body.city.trim().slice(0, 100) : null;

    const artisanProfile = {
      id: user.id,
      role: "artisan" as const,
      first_name: first_name || null,
      last_name: last_name || null,
      phone: phone || null,
      metier: metier || null,
      postal_code: postal_code || null,
      city: city || null,
      updated_at: new Date().toISOString(),
    };

    const serviceSupabase = createSupabaseServiceClient();

    const { data: profile } = await serviceSupabase
      .from("profiles")
      .select("role, created_at")
      .eq("id", user.id)
      .maybeSingle();

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const profileCreatedAt = profile?.created_at ? new Date(profile.created_at) : null;

    if (!profile) {
      const { error: insertErr } = await serviceSupabase
        .from("profiles")
        .insert(artisanProfile);
      if (insertErr) {
        if (DEV) console.error("[api/auth/set-role] insert failed:", insertErr);
        return NextResponse.json({ ok: false, error: insertErr.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (profile.role === "artisan") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (profile.role !== "client") {
      return NextResponse.json({ ok: false, error: "Impossible de changer le rôle." }, { status: 403 });
    }

    if (profileCreatedAt && profileCreatedAt < oneHourAgo) {
      return NextResponse.json(
        { ok: false, error: "La période d'inscription artisan est expirée." },
        { status: 403 }
      );
    }

    const { error: updateErr } = await serviceSupabase
      .from("profiles")
      .update({
        role: "artisan",
        first_name: artisanProfile.first_name,
        last_name: artisanProfile.last_name,
        phone: artisanProfile.phone,
        metier: artisanProfile.metier,
        postal_code: artisanProfile.postal_code,
        city: artisanProfile.city,
        updated_at: artisanProfile.updated_at,
      })
      .eq("id", user.id);

    if (updateErr) {
      if (DEV) console.error("[api/auth/set-role] update failed:", updateErr);
      return NextResponse.json({ ok: false, error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("[api/auth/set-role] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}
