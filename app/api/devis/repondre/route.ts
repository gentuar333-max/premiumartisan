// app/api/devis/repondre/route.ts
// GET  /api/devis/repondre?token=xxx&rep=accepte|refuse
// → page de confirmation client (redirect vers /devis/repondre)
//
// POST /api/devis/repondre
// Body: { token, rep, message? }
// → met à jour statut devis

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Service role pour bypass RLS (client pas authentifié)
function makeServiceSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  let body: { token?: string; rep?: string; message?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 }); }

  const { token, rep, message } = body;

  if (!token || !rep) {
    return NextResponse.json({ ok: false, error: "token et rep requis" }, { status: 400 });
  }

  if (!["accepte", "refuse"].includes(rep)) {
    return NextResponse.json({ ok: false, error: "rep doit être accepte ou refuse" }, { status: 400 });
  }

  const supabase = makeServiceSupabase();

  // Cherche le devis par token
  const { data: devis, error: fetchErr } = await supabase
    .from("devis")
    .select("id, statut, client_nom, artisan_email, artisan_nom, numero")
    .eq("client_token", token)
    .single();

  if (fetchErr || !devis) {
    return NextResponse.json({ ok: false, error: "Devis introuvable ou lien invalide" }, { status: 404 });
  }

  // Déjà répondu ?
  if (devis.statut === "accepte" || devis.statut === "refuse") {
    return NextResponse.json({
      ok: false,
      error: `Ce devis a déjà été ${devis.statut === "accepte" ? "accepté" : "refusé"}`
    }, { status: 409 });
  }

  // Met à jour
  const { error: updateErr } = await supabase
    .from("devis")
    .update({
      statut: rep,
      client_repondu_at: new Date().toISOString(),
      client_message: message || null,
    })
    .eq("client_token", token);

  if (updateErr) {
    return NextResponse.json({ ok: false, error: updateErr.message }, { status: 500 });
  }

  // Notifie l'artisan par email
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.DEVIS_FROM_EMAIL || "devis@premiumartisan.fr";

  if (resendKey && devis.artisan_email) {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);
    const emoji = rep === "accepte" ? "✅" : "❌";
    const label = rep === "accepte" ? "accepté" : "refusé";

    await resend.emails.send({
      from: `PremiumArtisan <${fromEmail}>`,
      to: [devis.artisan_email],
      subject: `${emoji} Devis N° ${devis.numero} ${label} par ${devis.client_nom || "le client"}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
          <h2 style="color:${rep === "accepte" ? "#16a34a" : "#dc2626"}">
            ${emoji} Devis ${label}
          </h2>
          <p>Votre devis <strong>N° ${devis.numero}</strong> a été <strong>${label}</strong>
          par <strong>${devis.client_nom || "le client"}</strong>.</p>
          ${message ? `<p style="background:#f8fafc;padding:12px;border-radius:8px;color:#475569;">
            <em>Message : "${message}"</em>
          </p>` : ""}
          <p style="margin-top:24px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/artisan/devis"
              style="background:#2563eb;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;">
              Voir mes devis
            </a>
          </p>
        </div>
      `,
    }).catch(console.error);
  }

  return NextResponse.json({
    ok: true,
    statut: rep,
    message: rep === "accepte"
      ? "Devis accepté — l'artisan a été notifié."
      : "Devis refusé — l'artisan a été notifié."
  });
}