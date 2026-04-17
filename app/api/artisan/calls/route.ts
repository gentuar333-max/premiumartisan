import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    const { data, error } = await supabase
      .from("calls").select("*")
      .eq("artisan_id", user.id)
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, calls: data ?? [] });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    const { id, status } = await req.json();
    const { error } = await supabase.from("calls")
      .update({ status, isnew: false })
      .eq("id", id).eq("artisan_id", user.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    const { id } = await req.json();
    const { error } = await supabase.from("calls")
      .delete().eq("id", id).eq("artisan_id", user.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}