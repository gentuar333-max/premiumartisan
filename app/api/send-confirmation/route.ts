export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Resend } from "resend";

const BUDGET_LABELS: Record<string, string> = {
  lt_500:         "Moins de 500€",
  "500_1500":     "500€ – 1 500€",
  "1500_3000":    "1 500€ – 3 000€",
  "3000_7000":    "3 000€ – 7 000€",
  "7000_15000":   "7 000€ – 15 000€",
  "15000_25000":  "15 000€ – 25 000€",
  "25000_40000":  "25 000€ – 40 000€",
  "40000_60000":  "40 000€ – 60 000€",
  "60000_100000": "60 000€ – 100 000€",
  "100000_plus":  "100 000€+",
};

const PIECE_LABELS: Record<string, string> = {
  salon:      "Salon / Séjour",
  cuisine:    "Cuisine",
  salle_bain: "Salle de bain",
  chambre:    "Chambre",
  couloir:    "Couloir / Entrée",
  bureau:     "Bureau",
  exterieur:  "Extérieur / Façade",
  autre:      "Autre / Plusieurs pièces",
};

function formatBudget(v: string | null) {
  if (!v) return "Non précisé";
  return BUDGET_LABELS[v] ?? v;
}

function formatPieces(raw: string | null): string {
  if (!raw) return "Non précisé";
  return raw.split(",").map(s => {
    const key = s.trim().toLowerCase();
    return PIECE_LABELS[key] ?? s.trim();
  }).join(", ");
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json().catch(() => null);
    if (!body?.email) {
      return NextResponse.json({ ok: false, error: "Email requis." }, { status: 400 });
    }

    const { email, name, category, budget, piece_type, surface_m2, location, description, confirm_url } = body as {
      email: string; name?: string; category?: string; budget?: string;
      piece_type?: string; surface_m2?: string; location?: string;
      description?: string; confirm_url?: string;
    };

    const clientName = name?.split(" ")[0] || "là";
    const pieceLabel = formatPieces(piece_type ?? null);
    const budgetLabel = formatBudget(budget ?? null);
    const surfaceLabel = surface_m2 ? `${surface_m2} m²` : "Non précisée";
    const locationLabel = location || "Non précisée";
    const categoryLabel = category?.replace("Peinture : ", "") || "Non précisée";

    const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
  <tr>
    <td style="background:linear-gradient(135deg,#2563eb,#4f46e5);padding:32px 32px 28px;">
      <div style="font-size:13px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.6);text-transform:uppercase;margin-bottom:8px;">Premium Artisan</div>
      <div style="font-size:22px;font-weight:800;color:#ffffff;line-height:1.3;">Votre projet a été publié ✅</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.8);margin-top:6px;">Les artisans de votre zone vont vous contacter sous peu.</div>
    </td>
  </tr>
  <tr>
    <td style="padding:28px 32px;">
      <p style="margin:0 0 20px;font-size:15px;color:#334155;">Bonjour <strong>${clientName}</strong>,<br/>Votre projet a bien été enregistré. Voici un récapitulatif :</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;margin-bottom:24px;">
        ${[
          ["🎨 Catégorie", categoryLabel],
          ["🏠 Pièce(s)", pieceLabel],
          ["📐 Surface", surfaceLabel],
          ["📍 Localisation", locationLabel],
          ["💰 Budget", budgetLabel],
          ...(description ? [["📝 Description", description]] : []),
        ].map(([label, value], i) => `
        <tr style="border-top:${i === 0 ? "none" : "1px solid #e2e8f0"};">
          <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#64748b;white-space:nowrap;width:140px;">${label}</td>
          <td style="padding:12px 16px;font-size:13px;color:#0f172a;">${value}</td>
        </tr>`).join("")}
      </table>
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 16px;margin-bottom:24px;">
        <p style="margin:0;font-size:13px;color:#1e40af;line-height:1.6;">⚡ <strong>Maximum 3 artisans</strong> auront accès à vos coordonnées.<br/>Vous pouvez recevoir des appels dans les prochaines heures.</p>
      </div>
      ${confirm_url ? `
      <div style="text-align:center;margin-bottom:24px;">
        <p style="margin:0 0 14px;font-size:14px;color:#334155;font-weight:600;">✅ Une dernière étape — confirmez votre email pour activer votre projet :</p>
        <a href="${confirm_url}" style="display:inline-block;background:linear-gradient(135deg,#2563eb,#4f46e5);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:800;font-size:15px;">Confirmer mon projet →</a>
        <p style="margin:10px 0 0;font-size:11px;color:#94a3b8;">Ce lien est à usage unique et personnel.</p>
      </div>` : ""}
      <p style="margin:0;font-size:13px;color:#94a3b8;text-align:center;">Merci d'avoir fait confiance à Premium Artisan.<br/><a href="https://premiumartisan.fr" style="color:#2563eb;text-decoration:none;">premiumartisan.fr</a></p>
    </td>
  </tr>
  <tr>
    <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 32px;text-align:center;">
      <p style="margin:0;font-size:11px;color:#94a3b8;">© 2026 Premium Artisan</p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: "Premium Artisan <onboarding@resend.dev>",
      to: email,
      subject: "✅ Confirmez votre projet — Premium Artisan",
      html,
    });

    if (error) {
      console.error("[send-confirmation] Resend error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[send-confirmation] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}