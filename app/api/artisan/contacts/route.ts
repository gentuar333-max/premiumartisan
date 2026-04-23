import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
  );
}

// GET — liste tous les contacts de l'artisan
export async function GET() {
  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const { data, error } = await supabase
      .from("contacts")
      .select("id, name, phone, type, notes, created_at")
      .eq("artisan_id", user.id)
      .order("type", { ascending: true })
      .order("name", { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, contacts: data ?? [] });
  } catch (err) {
    console.error("GET contacts error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST — ajoute un contact
export async function POST(req: Request) {
  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const { name, phone, type, notes } = await req.json();

    if (!name || !phone || !type) {
      return NextResponse.json({ error: "Nom, téléphone et type sont requis" }, { status: 400 });
    }

    if (!["famille", "employe", "client"].includes(type)) {
      return NextResponse.json({ error: "Type invalide" }, { status: 400 });
    }

    // Normalise le numéro
    const normalizedPhone = phone.replace(/\s/g, "").replace(/^0/, "+33");

    const { data, error } = await supabase
      .from("contacts")
      .insert({
        artisan_id: user.id,
        name: name.trim(),
        phone: normalizedPhone,
        type,
        notes: notes?.trim() ?? null,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, contact: data });
  } catch (err) {
    console.error("POST contacts error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE — supprime un contact
export async function DELETE(req: Request) {
  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", id)
      .eq("artisan_id", user.id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE contacts error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}