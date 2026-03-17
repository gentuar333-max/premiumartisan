export const dynamic = "force-dynamic";

// app/api/artisan/factures/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";

const FROM_EMAIL = process.env.RESEND_FROM ?? "noreply@premiumartisan.fr";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is missing");
  return new Resend(key);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const { facture, sendEmail = false } = body ?? {};

    if (!facture) {
      return NextResponse.json({ ok: false, error: "Données manquantes." }, { status: 400 });
    }

    const serverSupabase = await createSupabaseServerClient();
    const { data: { user }, error: authErr } = await serverSupabase.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const svc = createSupabaseServiceClient();

    let sousTotal = 0;
    let tvaMontant = 0;
    const lignes = Array.isArray(facture.lignes) ? facture.lignes : [];
    for (const l of lignes) {
      const ht = (parseFloat(l.quantite) || 0) * (parseFloat(l.prix_unitaire_ht) || 0);
      sousTotal += ht;
      tvaMontant += ht * ((parseFloat(l.tva_pct) || 0) / 100);
    }
    const totalTtc = sousTotal + tvaMontant;
    const acomptePct = parseInt(facture.acompte_pct) || 30;
    const acompteMontant = totalTtc * (acomptePct / 100);

    const payload = {
      artisan_id:        user.id,
      numero:            facture.numero,
      statut:            sendEmail ? "envoyée" : (facture.statut ?? "brouillon"),
      devis_id:          facture.devis_id ?? null,
      client_nom:        facture.client_nom ?? "",
      client_email:      facture.client_email ?? "",
      client_adresse:    facture.client_adresse ?? "",
      client_telephone:  facture.client_telephone ?? "",
      artisan_nom:       facture.artisan_nom ?? "",
      artisan_siret:     facture.artisan_siret ?? "",
      artisan_adresse:   facture.artisan_adresse ?? "",
      artisan_telephone: facture.artisan_telephone ?? "",
      artisan_email:     facture.artisan_email ?? "",
      artisan_logo_url:  facture.artisan_logo_url ?? "",
      artisan_assurance: facture.artisan_assurance ?? "",
      artisan_police:    facture.artisan_police ?? "",
      lignes:            lignes,
      sous_total_ht:     sousTotal,
      tva_montant:       tvaMontant,
      total_ttc:         totalTtc,
      acompte_pct:       acomptePct,
      acompte_montant:   acompteMontant,
      methode_paiement:  facture.methode_paiement ?? "virement",
      iban:              facture.iban ?? "",
      date_echeance:     facture.date_echeance || null,
      date_paiement:     facture.date_paiement || null,
      notes:             facture.notes ?? "",
      conditions:        facture.conditions ?? "",
      date_emission:     facture.date_emission || new Date().toISOString().slice(0, 10),
    };

    let factureId: string;

    if (facture.id) {
      const { data, error } = await svc.from("factures").update(payload).eq("id", facture.id).eq("artisan_id", user.id).select("id").single();
      if (error) throw new Error(error.message);
      factureId = data.id;
    } else {
      const { data, error } = await svc.from("factures").insert(payload).select("id").single();
      if (error) throw new Error(error.message);
      factureId = data.id;
    }

    if (sendEmail && facture.client_email) {
      const resend = getResend();
      const formatEuro = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

      const lignesHtml = lignes.map((l: { description: string; quantite: number; unite: string; prix_unitaire_ht: number; tva_pct: number; }) => `
        <tr style="border-bottom:1px solid #f0f0f0">
          <td style="padding:10px 12px;color:#333">${l.description || "—"}</td>
          <td style="padding:10px 8px;text-align:right;color:#666">${l.quantite}</td>
          <td style="padding:10px 8px;text-align:right;color:#666">${l.unite}</td>
          <td style="padding:10px 8px;text-align:right;color:#666">${formatEuro(l.prix_unitaire_ht)}</td>
          <td style="padding:10px 8px;text-align:right;color:#666">${l.tva_pct}%</td>
          <td style="padding:10px 12px;text-align:right;font-weight:600;color:#222">${formatEuro(l.quantite * l.prix_unitaire_ht)}</td>
        </tr>`).join("");

      const emailHtml = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',sans-serif">
<div style="max-width:640px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
  <div style="background:#1a0a0e;padding:36px 40px">
    <div style="font-size:20px;font-weight:700;color:#e8a0b0;margin-bottom:8px">${facture.artisan_nom || ""}</div>
    <p style="color:#aaa;font-size:12px;margin:2px 0">${facture.artisan_adresse || ""}</p>
    <div style="font-size:26px;font-weight:700;color:#fff;margin-top:12px">${facture.numero}</div>
    <p style="color:#999;font-size:11px;margin-top:8px">Émis le ${new Date(facture.date_emission).toLocaleDateString("fr-FR")}</p>
  </div>
  <div style="padding:24px 40px">
    <p style="font-size:18px;font-weight:700;color:#111">${facture.client_nom || "—"}</p>
    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:16px">
      <thead><tr style="background:#1a0a0e;color:#fff">
        <th style="text-align:left;padding:10px 12px">Description</th>
        <th style="text-align:right;padding:10px 8px">Qté</th>
        <th style="text-align:right;padding:10px 8px">Unité</th>
        <th style="text-align:right;padding:10px 8px">P.U. HT</th>
        <th style="text-align:right;padding:10px 8px">TVA</th>
        <th style="text-align:right;padding:10px 12px">Total HT</th>
      </tr></thead>
      <tbody>${lignesHtml}</tbody>
    </table>
    <div style="margin-top:20px;text-align:right">
      <p style="font-size:13px;color:#666;margin:4px 0">Sous-total HT : <strong>${formatEuro(sousTotal)}</strong></p>
      <p style="font-size:13px;color:#666;margin:4px 0">TVA : <strong>${formatEuro(tvaMontant)}</strong></p>
      <p style="font-size:18px;font-weight:700;color:#8B1A2B;margin:10px 0 4px">Total TTC : ${formatEuro(totalTtc)}</p>
      <p style="font-size:12px;color:#999">Acompte (${acomptePct}%) : <strong style="color:#8B1A2B">${formatEuro(acompteMontant)}</strong></p>
    </div>
  </div>
  <div style="background:#1a0a0e;padding:16px 40px;text-align:center">
    <p style="color:#666;font-size:11px;margin:0">Document généré par <a href="https://premiumartisan.fr" style="color:#e8a0b0;text-decoration:none">PremiumArtisan</a></p>
  </div>
</div>
</body></html>`;

      await resend.emails.send({
        from: FROM_EMAIL,
        to: facture.client_email,
        subject: `Facture ${facture.numero} — ${facture.artisan_nom || "Votre artisan"}`,
        html: emailHtml,
      });
    }

    return NextResponse.json({ ok: true, id: factureId });

  } catch (e) {
    console.error("[factures] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const serverSupabase = await createSupabaseServerClient();
    const { data: { user }, error: authErr } = await serverSupabase.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const statut = searchParams.get("statut");
    const svc = createSupabaseServiceClient();
    let query = svc.from("factures").select("id, numero, statut, client_nom, client_email, total_ttc, date_emission, date_echeance, devis_id").eq("artisan_id", user.id).order("created_at", { ascending: false });
    if (statut) query = query.eq("statut", statut);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true, factures: data });
  } catch (e) {
    console.error("[factures GET] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}