import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.message?.type !== "end-of-call-report") {
      return NextResponse.json({ ok: true });
    }

    const call = body.message;
    const analysis = call.analysis?.structuredData;
    const transcript = call.transcript ?? "";
    const duration = Math.round(call.durationSeconds ?? 0);
    const callerPhone = call.customer?.number ?? null;

    // 1. Ruan ne Supabase
    const { error } = await supabase.from("calls").insert({
      caller_phone: callerPhone,
      nom_client: analysis?.nom_client ?? null,
      adresse: analysis?.adresse ?? null,
      probleme: analysis?.probleme ?? null,
      urgent: analysis?.urgent ?? false,
      disponibilite: analysis?.disponibilite ?? null,
      type_travaux: analysis?.type_travaux ?? null,
      transcript: transcript,
      duration: duration,
      status: "nouveau",
      isnew: true,
    });

    if (error) console.error("Supabase error:", error);

    // 2. Email te artizani via Resend
    const urgentTag = analysis?.urgent ? "URGENT - " : "";
    const durMin = Math.floor(duration / 60);
    const durSec = String(duration % 60).padStart(2, "0");

    await resend.emails.send({
      from: "Marie IA <marie@premiumartisan.fr>",
      to: ["artisan@premiumartisan.fr"],
      subject: `${urgentTag}Nouveau appel - ${analysis?.nom_client ?? "Client inconnu"}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:20px">
          <h2 style="color:${analysis?.urgent ? "#dc2626" : "#1e293b"};margin-bottom:20px">
            ${analysis?.urgent ? "Nouveau appel URGENT" : "Nouveau appel recu"}
          </h2>
          <table style="width:100%;border-collapse:collapse">
            <tr style="border-bottom:1px solid #e2e8f0">
              <td style="padding:10px;color:#64748b;width:40%">Client</td>
              <td style="padding:10px;font-weight:600">${analysis?.nom_client ?? "-"}</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0">
              <td style="padding:10px;color:#64748b">Telephone</td>
              <td style="padding:10px;font-weight:600">${callerPhone ?? "-"}</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0">
              <td style="padding:10px;color:#64748b">Adresse</td>
              <td style="padding:10px">${analysis?.adresse ?? "-"}</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0">
              <td style="padding:10px;color:#64748b">Probleme</td>
              <td style="padding:10px">${analysis?.probleme ?? "-"}</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0">
              <td style="padding:10px;color:#64748b">Disponibilite</td>
              <td style="padding:10px">${analysis?.disponibilite ?? "-"}</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0">
              <td style="padding:10px;color:#64748b">Urgent</td>
              <td style="padding:10px;color:${analysis?.urgent ? "#dc2626" : "#16a34a"};font-weight:600">
                ${analysis?.urgent ? "OUI" : "NON"}
              </td>
            </tr>
            <tr>
              <td style="padding:10px;color:#64748b">Duree</td>
              <td style="padding:10px">${durMin}:${durSec}</td>
            </tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f8fafc;border-radius:8px">
            <a href="https://premiumartisan.fr/artisan/receptionist"
               style="display:inline-block;padding:12px 24px;background:#1e293b;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">
              Voir le dashboard
            </a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}