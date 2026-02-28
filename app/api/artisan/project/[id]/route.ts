import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id?: string; projectId?: string }> | { id?: string; projectId?: string } }
) {
  const resolved = (await params) as { id?: string; projectId?: string };
  const raw = resolved?.id ?? resolved?.projectId ?? "";
  const projectId = String(raw ?? "").trim();

  if (!projectId || projectId === "undefined" || !UUID_REGEX.test(projectId)) {
    return NextResponse.json({ ok: false, error: "Invalid project id." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { ok: false, error: "Missing env (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("publier_projets")
    .select("id, category, category_details, location, postal_prefix, budget, surface, description, created_at")
    .eq("id", projectId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, project: data }, { status: 200 });
}
