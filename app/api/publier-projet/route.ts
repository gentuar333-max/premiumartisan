import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Formatim: nëse zgjedhen disa "Peinture ...", ruaje si: "Peinture : intérieure, rénovation, extérieure"
// dhe mos e përsërit "Peinture" disa herë.
function formatCategory(category: unknown): string {
  const arr = Array.isArray(category)
    ? category
    : category
    ? [category]
    : [];

  const cleaned = arr
    .map((x) => String(x ?? "").trim())
    .filter(Boolean);

  if (cleaned.length === 0) return "";

  // --- GROUP ONLY "Peinture" subcategories ---
  const peintureSubs = cleaned
    .filter((c) => c === "Peinture" || c.startsWith("Peinture "))
    .map((c) => {
      if (c === "Peinture") return "";
      // "Peinture intérieure" -> "intérieure"
      // "Peinture de rénovation" -> "rénovation" (pa "de")
      let sub = c.replace(/^Peinture\s+/i, "");
      sub = sub.replace(/^de\s+/i, "");
      sub = sub.replace(/^d[’']\s*/i, "");
      return sub.trim();
    })
    .filter(Boolean);

  const others = cleaned.filter(
    (c) => c !== "Peinture" && !c.startsWith("Peinture ")
  );

  const uniq = (list: string[]) => Array.from(new Set(list));

  const uniqSubs = uniq(peintureSubs);
  const uniqOthers = uniq(others);

  const parts: string[] = [];

  if (uniqSubs.length > 0) {
    parts.push(`Peinture : ${uniqSubs.join(", ")}`);
  } else if (cleaned.includes("Peinture")) {
    parts.push("Peinture");
  }

  if (uniqOthers.length > 0) {
    parts.push(...uniqOthers);
  }

  return parts.join(", ");
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    const {
      honeypot,
      category,
      name,
      phone,
      postal,
      surface,
      location,
      description,
      photoName,
    } = body ?? {};

    // Honeypot (anti-bot)
    if (honeypot && String(honeypot).trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // Validime minimale
    if (!category || !name || !phone || !postal) {
      return NextResponse.json(
        { ok: false, error: "Veuillez remplir les champs obligatoires." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    // Merr key nga SUPABASE_ANON_KEY (server) ose fallback nga NEXT_PUBLIC_SUPABASE_ANON_KEY
    const anonKey =
      process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      return NextResponse.json(
        { ok: false, error: "Erreur configuration serveur." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false },
    });

    const categoryValue = formatCategory(category);

    if (!categoryValue) {
      return NextResponse.json(
        { ok: false, error: "Veuillez sélectionner une catégorie." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("publier_projets").insert([
      {
        category: categoryValue,
        name: String(name),
        phone: String(phone),
        postal: String(postal),
        surface: surface ? String(surface) : null,
        location: location ? String(location) : null,
        description: description ? String(description) : null,
        photo_name: photoName ? String(photoName) : null,
      },
    ]);

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return NextResponse.json(
        { ok: false, error: "Erreur serveur DB. Réessayez." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur. Réessayez." },
      { status: 500 }
    );
  }
}