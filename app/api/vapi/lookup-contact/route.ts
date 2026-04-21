import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Normalise le numéro pour la comparaison
function normalizePhone(phone: string): string[] {
  const clean = phone.replace(/\s/g, "").replace(/[^\d+]/g, "")
  const variants: string[] = [clean]
  if (clean.startsWith("+33")) {
    variants.push("0" + clean.slice(3))
  } else if (clean.startsWith("0")) {
    variants.push("+33" + clean.slice(1))
  }
  return variants
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Vapi envoie le numéro dans message.call.customer.number
    const callerPhone =
      body.message?.call?.customer?.number ??
      body.call?.customer?.number ??
      body.customer?.number ??
      body.phoneNumber ??
      null

    if (!callerPhone) {
      return NextResponse.json({ result: { type: "inconnu", name: null } })
    }

    const supabase = getSupabase()
    const phoneVariants = normalizePhone(callerPhone)

    // Trouve l'artisan via artisan_settings (le plus récent)
    const { data: settings } = await supabase
      .from("artisan_settings")
      .select("artisan_id, artisan_name")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()

    if (!settings?.artisan_id) {
      return NextResponse.json({ result: { type: "inconnu", name: null } })
    }

    // Cherche le contact par toutes les variantes du numéro
    const { data: contact } = await supabase
      .from("contacts")
      .select("name, type, notes")
      .eq("artisan_id", settings.artisan_id)
      .in("phone", phoneVariants)
      .single()

    if (!contact) {
      return NextResponse.json({
        result: { type: "inconnu", name: null }
      })
    }

    return NextResponse.json({
      result: {
        type: contact.type,   // "employe" | "famille" | "client"
        name: contact.name,
        notes: contact.notes ?? null,
      }
    })

  } catch (err) {
    console.error("lookup-contact error:", err)
    return NextResponse.json({ result: { type: "inconnu", name: null } })
  }
}