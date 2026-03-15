import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/confirmer-projet?error=invalid", req.url));
  }

  const supabase = createSupabaseServiceClient();

  // Gjej projektin me këtë token
  const { data: project, error } = await supabase
    .from("publier_projets")
    .select("id, confirmed, first_name")
    .eq("confirmation_token", token)
    .maybeSingle();

  if (error || !project) {
    return NextResponse.redirect(new URL("/confirmer-projet?error=invalid", req.url));
  }

  if (project.confirmed) {
    // Tashmë konfirmuar — dërgo direkt te sukses
    return NextResponse.redirect(new URL("/confirmer-projet?status=already", req.url));
  }

  // Aktivizo projektin
  const { error: updateError } = await supabase
    .from("publier_projets")
    .update({
      confirmed:    true,
      confirmed_at: new Date().toISOString(),
    })
    .eq("id", project.id);

  if (updateError) {
    console.error("[confirm-project] update error:", updateError.message);
    return NextResponse.redirect(new URL("/confirmer-projet?error=server", req.url));
  }

  console.log("[confirm-project] ✅ project confirmed:", project.id);
  return NextResponse.redirect(new URL("/confirmer-projet?status=success", req.url));
}