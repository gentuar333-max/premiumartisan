// app/api/artisan/devis/send/route.ts
// POST /api/artisan/devis/send
// Body: { devisId: string }
// → génère HTML email, envoie via Resend, met statut = "envoye"

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Resend } from "resend";

function makeSupabase() {
  const cookieStore = cookies();
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

function fmt(n: number | null | undefined) {
  if (n === null || n === undefined) return "0,00 €";
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2 }) + " €";
}

function buildEmailHtml(d: Record<string, unknown>, siteUrl: string): string {
  const lignes = (d.lignes as Array<{
    description: string; quantite: number; unite: string;
    prix_unitaire_ht: number; total_ht: number;
  }>) ?? [];

  const lignesHtml = lignes.map(l => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;">${l.description || "—"}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:center;">${l.quantite} ${l.unite || ""}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:right;">${fmt(l.prix_unitaire_ht)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:600;">${fmt(l.total_ht)}</td>
    </tr>
  `).join("");

  const acceptUrl = `${siteUrl}/devis/repondre?token=${d.client_token}&rep=accepte`;
  const refuseUrl = `${siteUrl}/devis/repondre?token=${d.client_token}&rep=refuse`;

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06);">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#2a0a14,#be123c);padding:28px 32px;">
      <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;font-family:Georgia,serif;">
        ${d.artisan_logo_url ? `<img src="${d.artisan_logo_url}" height="40" style="vertical-align:middle;margin-right:12px;border-radius:6px;">` : ""}
        ${d.artisan_nom || "Artisan"}
      </p>
      <p style="margin:6px 0 0;font-size:13px;color:#fda4af;">Devis N° ${d.numero || "—"}</p>
    </td>
  </tr>

  <!-- Intro -->
  <tr>
    <td style="padding:28px 32px 0;">
      <p style="margin:0;font-size:15px;color:#334155;">
        Bonjour <strong>${d.client_nom || "Client"}</strong>,
      </p>
      <p style="margin:12px 0 0;font-size:14px;color:#64748b;line-height:1.6;">
        Veuillez trouver ci-dessous votre devis. Il est valable jusqu'au
        <strong>${d.date_validite ? new Date(d.date_validite as string).toLocaleDateString("fr-FR") : "—"}</strong>.
      </p>
    </td>
  </tr>

  <!-- Infos colonnes -->
  <tr>
    <td style="padding:24px 32px 0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="50%" style="vertical-align:top;">
            <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">De</p>
            <p style="margin:6px 0 0;font-size:13px;color:#1e293b;line-height:1.6;">
              <strong>${d.artisan_nom || "—"}</strong><br>
              ${d.artisan_siret ? `SIRET: ${d.artisan_siret}<br>` : ""}
              ${d.artisan_adresse || ""}<br>
              ${d.artisan_tel || ""}
            </p>
          </td>
          <td width="50%" style="vertical-align:top;padding-left:24px;">
            <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Pour</p>
            <p style="margin:6px 0 0;font-size:13px;color:#1e293b;line-height:1.6;">
              <strong>${d.client_nom || "—"}</strong><br>
              ${d.client_adresse || ""}<br>
              ${d.client_email || ""}<br>
              ${d.client_tel || ""}
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Tableau lignes -->
  <tr>
    <td style="padding:24px 32px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        <thead>
          <tr style="background:#f8fafc;">
            <th style="padding:10px 12px;text-align:left;font-size:12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Description</th>
            <th style="padding:10px 12px;text-align:center;font-size:12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Qté</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">P.U. HT</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;">Total HT</th>
          </tr>
        </thead>
        <tbody>${lignesHtml || '<tr><td colspan="4" style="padding:16px;text-align:center;color:#94a3b8;">Aucune ligne</td></tr>'}</tbody>
      </table>
    </td>
  </tr>

  <!-- Totaux -->
  <tr>
    <td style="padding:16px 32px 0;">
      <table width="260" cellpadding="0" cellspacing="0" style="margin-left:auto;">
        <tr>
          <td style="padding:4px 0;font-size:13px;color:#64748b;">Total HT</td>
          <td style="padding:4px 0;font-size:13px;color:#1e293b;text-align:right;font-weight:600;">${fmt(d.total_ht as number)}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;font-size:13px;color:#64748b;">TVA (${d.tva_pct}%)</td>
          <td style="padding:4px 0;font-size:13px;color:#1e293b;text-align:right;">${fmt(d.total_tva as number)}</td>
        </tr>
        <tr style="border-top:2px solid #e2e8f0;">
          <td style="padding:8px 0 4px;font-size:15px;font-weight:700;color:#0f172a;">Total TTC</td>
          <td style="padding:8px 0 4px;font-size:15px;font-weight:700;color:#be123c;text-align:right;">${fmt(d.total_ttc as number)}</td>
        </tr>
        ${(d.acompte_pct as number) > 0 ? `
        <tr>
          <td style="padding:2px 0;font-size:12px;color:#64748b;">Acompte (${d.acompte_pct}%)</td>
          <td style="padding:2px 0;font-size:12px;color:#1e293b;text-align:right;">${fmt(d.acompte_ttc as number)}</td>
        </tr>` : ""}
      </table>
    </td>
  </tr>

  ${d.notes ? `
  <!-- Notes -->
  <tr>
    <td style="padding:20px 32px 0;">
      <p style="margin:0;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Notes</p>
      <p style="margin:6px 0 0;font-size:13px;color:#475569;line-height:1.6;">${(d.notes as string).replace(/\n/g, "<br>")}</p>
    </td>
  </tr>` : ""}

  <!-- CTA Accepter / Refuser -->
  <tr>
    <td style="padding:28px 32px;">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:12px;">
            <a href="${acceptUrl}"
              style="display:inline-block;background:#16a34a;color:#ffffff;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:700;text-decoration:none;">
              Accepter le devis
            </a>
          </td>
          <td>
            <a href="${refuseUrl}"
              style="display:inline-block;background:#f1f5f9;color:#64748b;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">
              Refuser
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
      <p style="margin:0;font-size:11px;color:#94a3b8;">
        Ce devis a été créé via PremiumArtisan.fr. En cas de questions, contactez directement l'artisan.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const supabase = makeSupabase();

  // Auth
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return NextResponse.json({ ok: false, error: "Non authentifié" }, { status: 401 });
  }

  let body: { devisId?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: "JSON invalide" }, { status: 400 }); }

  if (!body.devisId) {
    return NextResponse.json({ ok: false, error: "devisId requis" }, { status: 400 });
  }

  // Récupère le devis
  const { data: devis, error: fetchErr } = await supabase
    .from("devis")
    .select("*")
    .eq("id", body.devisId)
    .eq("artisan_id", user.id)
    .single();

  if (fetchErr || !devis) {
    return NextResponse.json({ ok: false, error: "Devis introuvable" }, { status: 404 });
  }

  if (!devis.client_email) {
    return NextResponse.json({ ok: false, error: "Email client manquant" }, { status: 400 });
  }

  // Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ ok: false, error: "RESEND_API_KEY non configuré" }, { status: 500 });
  }

  const resend = new Resend(resendKey);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://premiumartisan.fr";
  const fromEmail = process.env.DEVIS_FROM_EMAIL || "devis@premiumartisan.fr";

  const html = buildEmailHtml(devis as Record<string, unknown>, siteUrl);

  const { error: sendErr } = await resend.emails.send({
    from: `${devis.artisan_nom || "PremiumArtisan"} <${fromEmail}>`,
    to: [devis.client_email],
    subject: `Votre devis N° ${devis.numero || "—"} — ${devis.artisan_nom || ""}`,
    html,
  });

  if (sendErr) {
    return NextResponse.json({ ok: false, error: (sendErr as { message?: string }).message || "Erreur envoi email" }, { status: 500 });
  }

  // Met à jour statut → envoye
  await supabase
    .from("devis")
    .update({ statut: "envoye" })
    .eq("id", body.devisId)
    .eq("artisan_id", user.id);

  return NextResponse.json({ ok: true, message: "Devis envoyé avec succès" });
}