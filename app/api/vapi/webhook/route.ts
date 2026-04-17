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

    // Log complet pour debug
    console.log("VAPI WEBHOOK TYPE:", body.message?.type);
    console.log("VAPI BODY:", JSON.stringify(body, null, 2));

    // Accepte les deux types possibles
    const msgType = body.message?.type;
    if (msgType !== "end-of-call-report" && msgType !== "call-ended") {
      return NextResponse.json({ ok: true });
    }

    const call = body.message;

    // Vapi peut envoyer structuredData a differents endroits
    const analysis =
      call.analysis?.structuredData ??
      call.structuredData ??
      call.analysis?.summary ??
      null;

    console.log("ANALYSIS:", JSON.stringify(analysis, null, 2));

    // Transcript - plusieurs formats possibles
    const transcript =
      typeof call.transcript === "string"
        ? call.transcript
        : Array.isArray(call.transcript)
        ? call.transcript.map((t: { role: string; content?: string; message?: string }) =>
            `${t.role}: ${t.content ?? t.message ?? ""}`
          ).join("\n")
        : "";

    const duration = Math.round(
      call.durationSeconds ?? call.duration ?? 0
    );

    const callerPhone =
      call.customer?.number ??
      call.phoneNumber ??
      null;

    // 1. Ruan ne Supabase
    const insertData = {
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
    };

    console.log("INSERT DATA:", JSON.stringify(insertData, null, 2));

    const { error } = await supabase.from("calls").insert(insertData);
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
          <div style="margin-top:16px;padding:12px;background:#f1f5f9;border-radius:8px;font-size:12px;color:#64748b">
            <b>Transcript:</b><br/>
            <pre style="white-space:pre-wrap;font-size:11px">${transcript.slice(0, 500)}${transcript.length > 500 ? "..." : ""}</pre>
          </div>
          <div style="margin-top:16px">
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