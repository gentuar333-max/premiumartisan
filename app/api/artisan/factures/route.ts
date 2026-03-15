// app/api/artisan/factures/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_EMAIL = process.env.RESEND_FROM ?? "noreply@premiumartisan.fr";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ── POST: créer ou mettre à jour une facture ───────────────────────────────────
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

    // Calcul des totaux côté serveur (sécurité)
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
      // Mise à jour
      const { data, error } = await svc
        .from("factures")
        .update(payload)
        .eq("id", facture.id)
        .eq("artisan_id", user.id)
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      factureId = data.id;
    } else {
      // Création
      const { data, error } = await svc
        .from("factures")
        .insert(payload)
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      factureId = data.id;
    }

    // ── Envoi email avec Resend ────────────────────────────────────────────
    if (sendEmail && facture.client_email) {
      const formatEuro = (n: number) =>
        n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

      const lignesHtml = lignes.map((l: {
        description: string;
        quantite: number;
        unite: string;
        prix_unitaire_ht: number;
        tva_pct: number;
      }) => `
        <tr style="border-bottom:1px solid #f0f0f0">
          <td style="padding:10px 12px;color:#333">${l.description || "—"}</td>
          <td style="padding:10px 8px;text-align:right;color:#666">${l.quantite}</td>
          <td style="padding:10px 8px;text-align:right;color:#666">${l.unite}</td>
          <td style="padding:10px 8px;text-align:right;color:#666">${formatEuro(l.prix_unitaire_ht)}</td>
          <td style="padding:10px 8px;text-align:right;color:#666">${l.tva_pct}%</td>
          <td style="padding:10px 12px;text-align:right;font-weight:600;color:#222">${formatEuro(l.quantite * l.prix_unitaire_ht)}</td>
        </tr>
      `).join("");

      const emailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',sans-serif">
  <div style="max-width:640px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">

    <!-- Header -->
    <div style="background:#1a0a0e;padding:36px 40px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          ${facture.artisan_logo_url
            ? `<img src="${facture.artisan_logo_url}" height="48" style="margin-bottom:12px;object-fit:contain" alt="logo">`
            : `<div style="font-size:20px;font-weight:700;color:#e8a0b0;margin-bottom:8px">${facture.artisan_nom || ""}</div>`
          }
          <p style="color:#aaa;font-size:12px;margin:2px 0">${facture.artisan_adresse || ""}</p>
          <p style="color:#aaa;font-size:12px;margin:2px 0">${facture.artisan_telephone || ""} · ${facture.artisan_email || ""}</p>
          ${facture.artisan_siret ? `<p style="color:#888;font-size:11px;margin-top:6px">SIRET : ${facture.artisan_siret}</p>` : ""}
        </div>
        <div style="text-align:right">
          <div style="font-size:26px;font-weight:700;color:#fff">${facture.numero}</div>
          <div style="display:inline-block;margin-top:8px;padding:4px 12px;border-radius:20px;background:#2d1520;color:#e8a0b0;font-size:12px;font-weight:600">Facture</div>
          <p style="color:#999;font-size:11px;margin-top:8px">
            Émis le ${new Date(facture.date_emission).toLocaleDateString("fr-FR")}<br>
            Échéance : ${facture.date_echeance ? new Date(facture.date_echeance).toLocaleDateString("fr-FR") : "—"}
          </p>
        </div>
      </div>
    </div>

    <!-- Client -->
    <div style="background:#fafafa;padding:20px 40px;border-bottom:1px solid #eee">
      <p style="font-size:11px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px">Facturé à</p>
      <p style="font-size:18px;font-weight:700;color:#111;margin:0 0 4px">${facture.client_nom || "—"}</p>
      ${facture.client_adresse ? `<p style="font-size:13px;color:#666;margin:2px 0">${facture.client_adresse}</p>` : ""}
      ${facture.client_email ? `<p style="font-size:13px;color:#666;margin:2px 0">${facture.client_email}</p>` : ""}
    </div>

    <!-- Tableau -->
    <div style="padding:24px 40px">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr style="background:#1a0a0e;color:#fff">
            <th style="text-align:left;padding:10px 12px;border-radius:6px 0 0 6px">Description</th>
            <th style="text-align:right;padding:10px 8px">Qté</th>
            <th style="text-align:right;padding:10px 8px">Unité</th>
            <th style="text-align:right;padding:10px 8px">P.U. HT</th>
            <th style="text-align:right;padding:10px 8px">TVA</th>
            <th style="text-align:right;padding:10px 12px;border-radius:0 6px 6px 0">Total HT</th>
          </tr>
        </thead>
        <tbody>${lignesHtml}</tbody>
      </table>

      <!-- Totaux -->
      <div style="margin-top:20px;padding-top:16px;border-top:2px solid #eee;text-align:right">
        <p style="font-size:13px;color:#666;margin:4px 0">Sous-total HT : <strong>${formatEuro(sousTotal)}</strong></p>
        <p style="font-size:13px;color:#666;margin:4px 0">TVA : <strong>${formatEuro(tvaMontant)}</strong></p>
        <p style="font-size:18px;font-weight:700;color:#8B1A2B;margin:10px 0 4px">Total TTC : ${formatEuro(totalTtc)}</p>
        <p style="font-size:12px;color:#999">Acompte (${acomptePct}%) : <strong style="color:#8B1A2B">${formatEuro(acompteMontant)}</strong></p>
      </div>
    </div>

    <!-- Paiement -->
    <div style="background:#fafafa;padding:20px 40px;border-top:1px solid #eee">
      <p style="font-size:11px;font-weight:600;color:#8B1A2B;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px">Règlement</p>
      <p style="font-size:13px;color:#555;margin:4px 0">
        Méthode : <strong>${{ virement: "Virement bancaire", chèque: "Chèque", espèces: "Espèces", carte: "Carte bancaire" }[facture.methode_paiement as string] ?? facture.methode_paiement}</strong>
      </p>
      ${facture.iban ? `<p style="font-size:13px;color:#555;margin:4px 0">IBAN : <code style="font-family:monospace;background:#f0f0f0;padding:2px 6px;border-radius:4px">${facture.iban}</code></p>` : ""}
      ${facture.conditions ? `<p style="font-size:12px;color:#888;margin-top:8px">${facture.conditions}</p>` : ""}
    </div>

    ${facture.notes ? `
    <div style="padding:16px 40px;border-top:1px solid #eee">
      <p style="font-size:11px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px">Notes</p>
      <p style="font-size:13px;color:#555">${facture.notes}</p>
    </div>` : ""}

    <!-- Footer -->
    <div style="background:#1a0a0e;padding:16px 40px;text-align:center">
      <p style="color:#666;font-size:11px;margin:0">
        Document généré par <a href="https://premiumartisan.fr" style="color:#e8a0b0;text-decoration:none;font-weight:600">PremiumArtisan</a> — premiumartisan.fr
      </p>
    </div>
  </div>
</body>
</html>`;

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

// ── GET: liste des factures de l'artisan ──────────────────────────────────────
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
    let query = svc
      .from("factures")
      .select("id, numero, statut, client_nom, client_email, total_ttc, date_emission, date_echeance, devis_id")
      .eq("artisan_id", user.id)
      .order("created_at", { ascending: false });

    if (statut) query = query.eq("statut", statut);

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true, factures: data });

  } catch (e) {
    console.error("[factures GET] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}