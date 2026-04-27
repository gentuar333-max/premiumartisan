export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// app/api/artisan/factures-electroniques/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

const FROM_EMAIL = process.env.RESEND_FROM ?? "noreply@premiumartisan.fr";
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is missing");
  return new Resend(key);
}

async function generateNumero(svc: ReturnType<typeof createSupabaseServiceClient>): Promise<string> {
  const year = new Date().getFullYear();
  const { count } = await svc
    .from("factures_electroniques")
    .select("*", { count: "exact", head: true })
    .like("numero", `FE-${year}-%`);
  const next = String((count ?? 0) + 1).padStart(3, "0");
  return `FE-${year}-${next}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Données manquantes." }, { status: 400 });
    }

    const { client, dates, services, notes } = body;

    if (!client?.companyName || !client?.siret) {
      return NextResponse.json({ ok: false, error: "Nom et SIRET obligatoires." }, { status: 400 });
    }

    // ── Auth via Bearer token (client) ou cookies (server) ────────────────
    const authHeader = req.headers.get("authorization") ?? "";
    const token      = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    const svcAuth = createSupabaseServiceClient();
    let user: { id: string } | null = null;

    if (token) {
      const { data } = await svcAuth.auth.getUser(token);
      user = data.user;
    } else {
      const serverSupabase = await createSupabaseServerClient();
      const { data } = await serverSupabase.auth.getUser();
      user = data.user;
    }

    if (!user) {
      console.error("[factures-electroniques] Auth error: no user");
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const svc    = svcAuth;
    const numero = await generateNumero(svc);

    // Calculs
    const lignes = Array.isArray(services) ? services : [];
    let totalHT  = 0;
    let totalTVA = 0;
    for (const s of lignes) {
      const ht  = (Number(s.quantity) || 0) * (Number(s.unitPrice) || 0);
      const tva = ht * ((Number(s.tvaRate) || 0) / 100);
      totalHT  += ht;
      totalTVA += tva;
    }
    const totalTTC = totalHT + totalTVA;

    const payload = {
      artisan_id:      user.id,
      numero,
      statut:          "en-attente",
      statut_efacture: null,
      client_nom:      client.companyName,
      client_siret:    client.siret.replace(/\s/g, ""),
      client_email:    client.email    ?? "",
      client_adresse:  client.address  ?? "",
      date_emission:   dates?.invoiceDate ?? new Date().toISOString().split("T")[0],
      date_echeance:   dates?.dueDate    ?? null,
      lignes,
      notes:           notes ?? "",
      total_ht:        totalHT,
      total_tva:       totalTVA,
      total_ttc:       totalTTC,
    };

    // ── Merr profilin e artizanit ───────────────────────────────────────────
    const { data: artisanProfile } = await svc
      .from("profiles")
      .select("nom, prenom, siret, metier, phone, city, adresse, pied_page")
      .eq("id", user.id)
      .single();

    const artisanNom = artisanProfile
      ? `${artisanProfile.prenom ?? ""} ${artisanProfile.nom ?? ""}`.trim() || "Artisan"
      : "Artisan";

    console.log("[factures-electroniques] inserting for user:", user.id);

    const { data, error } = await svc
      .from("factures_electroniques")
      .insert(payload)
      .select("id, numero")
      .single();

    if (error) {
      console.error("[factures-electroniques] insert error:", error.message);
      throw new Error(error.message);
    }

    console.log("[factures-electroniques] created:", data.numero);

    // ── Email via Resend ────────────────────────────────────────────────────
    const artisanSiret = artisanProfile?.siret ?? ""
    const artisanVille = artisanProfile?.city ?? ""
    const piedPage     = artisanProfile?.pied_page ?? "TVA applicable selon la legislation en vigueur."

    if (client.email) {
      try {
        const resend   = getResend();
        const fmt      = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2 }) + " €";
        const lignesHtml = lignes.map((l: { description: string; quantity: number; unitPrice: number; tvaRate: number }) => `
          <tr style="border-bottom:1px solid #F2EEE8">
            <td style="padding:10px 12px;color:#332B25">${l.description || "—"}</td>
            <td style="padding:10px 8px;text-align:right;color:#6B5E52">${l.quantity}</td>
            <td style="padding:10px 8px;text-align:right;color:#6B5E52">${fmt(l.unitPrice)}</td>
            <td style="padding:10px 8px;text-align:right;color:#6B5E52">${l.tvaRate}%</td>
            <td style="padding:10px 12px;text-align:right;font-weight:700;color:#332B25">${fmt(l.quantity * l.unitPrice)}</td>
          </tr>`).join("");

        const emailHtml = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#FAF8F5;font-family:'Segoe UI',sans-serif">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08)">

  <!-- Badge 2026 -->
  <div style="background:linear-gradient(135deg,#E87E1A 0%,#C9650F 100%);padding:10px 24px;display:flex;align-items:center;justify-content:space-between">
    <div style="display:flex;align-items:center;gap:8px">
      <div style="width:8px;height:8px;border-radius:50%;background:#fff;opacity:0.9"></div>
      <span style="color:#fff;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase">Facture electronique conforme 2026</span>
    </div>
    <span style="color:rgba(255,255,255,0.8);font-size:11px;font-weight:600">PremiumArtisan</span>
  </div>

  <!-- Header artisan -->
  <div style="background:#332B25;padding:28px 36px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px">
      <div>
        <p style="color:rgba(255,255,255,0.9);font-size:15px;font-weight:700;margin:0 0 4px">${artisanNom}</p>
        ${artisanSiret ? `<p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0">SIRET: ${artisanSiret}</p>` : ""}
        ${artisanVille ? `<p style="color:rgba(255,255,255,0.4);font-size:11px;margin:2px 0 0">${artisanVille}</p>` : ""}
      </div>
      <div style="text-align:right">
        <p style="color:rgba(255,255,255,0.5);font-size:10px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px">Numero</p>
        <p style="color:#fff;font-size:20px;font-weight:700;margin:0">${data.numero}</p>
        <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:4px 0 0">Emise le ${new Date(payload.date_emission).toLocaleDateString("fr-FR")}</p>
      </div>
    </div>
  </div>
  <div style="padding:24px 36px">
    <p style="font-size:14px;color:#8C7D6E;margin:0 0 4px">Facture pour</p>
    <p style="font-size:18px;font-weight:700;color:#332B25;margin:0 0 20px">${client.companyName}</p>
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead><tr style="background:#FAF8F5">
        <th style="text-align:left;padding:10px 12px;color:#8C7D6E">Description</th>
        <th style="text-align:right;padding:10px 8px;color:#8C7D6E">Qte</th>
        <th style="text-align:right;padding:10px 8px;color:#8C7D6E">Prix HT</th>
        <th style="text-align:right;padding:10px 8px;color:#8C7D6E">TVA</th>
        <th style="text-align:right;padding:10px 12px;color:#8C7D6E">Total HT</th>
      </tr></thead>
      <tbody>${lignesHtml}</tbody>
    </table>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #E6DFD6;text-align:right">
      <p style="font-size:13px;color:#8C7D6E;margin:4px 0">Total HT : <strong>${fmt(totalHT)}</strong></p>
      <p style="font-size:13px;color:#8C7D6E;margin:4px 0">TVA : <strong>${fmt(totalTVA)}</strong></p>
      <p style="font-size:20px;font-weight:700;color:#A34C10;margin:12px 0 4px">Total TTC : ${fmt(totalTTC)}</p>
      ${payload.date_echeance ? `<p style="font-size:12px;color:#8C7D6E">Echeance : ${new Date(payload.date_echeance).toLocaleDateString("fr-FR")}</p>` : ""}
    </div>
  </div>
  <div style="background:#FAF8F5;padding:16px 36px;text-align:center">
    <p style="color:#6B5E52;font-size:11px;margin:0 0 6px">${piedPage}</p>
    <p style="color:#A89B8C;font-size:11px;margin:0">Document genere par <a href="https://premiumartisan.fr" style="color:#E87E1A;text-decoration:none">PremiumArtisan</a></p>
  </div>
</div>
</body></html>`;

        await resend.emails.send({
          from: FROM_EMAIL,
          to: client.email,
          subject: `Facture ${data.numero} — PremiumArtisan`,
          html: emailHtml,
        });
        console.log("[factures-electroniques] email sent to:", client.email);
      } catch (emailErr) {
        console.error("[factures-electroniques] email error:", emailErr);
        // Ne pas bloquer si email echoue
      }
    }

    return NextResponse.json({ ok: true, id: data.id, numero: data.numero });

  } catch (e) {
    console.error("[factures-electroniques POST] crash:", e);
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
    let query = svc
      .from("factures_electroniques")
      .select("id, numero, statut, statut_efacture, client_nom, client_siret, client_email, total_ht, total_tva, total_ttc, date_emission, date_echeance, created_at")
      .eq("artisan_id", user.id)
      .order("created_at", { ascending: false });

    if (statut) query = query.eq("statut", statut);

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true, factures: data ?? [] });

  } catch (e) {
    console.error("[factures-electroniques GET]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const { id, statut, statut_efacture } = body ?? {};

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID manquant." }, { status: 400 });
    }

    const serverSupabase = await createSupabaseServerClient();
    const { data: { user }, error: authErr } = await serverSupabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const svc   = createSupabaseServiceClient();
    const patch: Record<string, string> = { updated_at: new Date().toISOString() };
    if (statut)          patch.statut          = statut;
    if (statut_efacture) patch.statut_efacture = statut_efacture;

    const { error } = await svc
      .from("factures_electroniques")
      .update(patch)
      .eq("id", id)
      .eq("artisan_id", user.id);

    if (error) throw new Error(error.message);

    return NextResponse.json({ ok: true });

  } catch (e) {
    console.error("[factures-electroniques PATCH]", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}