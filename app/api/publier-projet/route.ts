import { NextResponse } from "next/server";
import { createSupabaseServiceClient } from "@/lib/supabaseServer";
import crypto from "crypto";

export const runtime = "nodejs";

// ── Upload foto në Supabase Storage ──────────────────────────────────────────
async function uploadPhoto(
  supabase: ReturnType<typeof createSupabaseServiceClient>,
  file: File,
  projectId: string
): Promise<string | null> {
  try {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${projectId}/photo.${ext}`; // path i thjeshtë, pa subfolder "projects/"
    
    console.log("[upload] starting upload:", { name: file.name, size: file.size, type: file.type, path });

    // Dërgo File direkt — Supabase JS v2 e mbështet natyrshëm
    const { data: uploadData, error } = await supabase.storage
      .from("project-photos")
      .upload(path, file, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.error("[upload] storage error:", error.message, error);
      return null;
    }

    console.log("[upload] upload success:", uploadData);

    const { data: urlData } = supabase.storage
      .from("project-photos")
      .getPublicUrl(path);

    console.log("[upload] public url:", urlData?.publicUrl);
    return urlData?.publicUrl ?? null;
  } catch (e) {
    console.error("[upload] exception:", e);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    let b: Record<string, string | null> = {};
    let photoFile: File | null = null;

    // ── Provo formData() gjithmonë — Next.js App Router e mbështet natyrshëm ──
    let fd: FormData | null = null;
    try {
      fd = await req.formData();
    } catch {
      // Nëse dështon, është JSON
    }

    if (fd) {
      // FormData path (me ose pa foto)
      b = {
        honeypot:    String(fd.get("honeypot")    ?? ""),
        category:    String(fd.get("category")    ?? ""),
        name:        String(fd.get("name")        ?? ""),
        email:       String(fd.get("email")       ?? ""),
        phone:       String(fd.get("phone")       ?? ""),
        postal:      String(fd.get("postal")      ?? ""),
        location:    String(fd.get("location")    ?? ""),
        surface:     fd.get("surface")     ? String(fd.get("surface"))     : null,
        surface_m2:  fd.get("surface_m2")  ? String(fd.get("surface_m2"))  : null,
        piece_type:  fd.get("piece_type")  ? String(fd.get("piece_type"))  : null,
        budget:      fd.get("budget")      ? String(fd.get("budget"))      : null,
        description: String(fd.get("description") ?? ""),
        image_url:   null,
      };
      const photoEntry = fd.get("photo");
      if (photoEntry instanceof File && photoEntry.size > 0) {
        photoFile = photoEntry;
        console.log("[publier-projet] ✅ photo received:", { name: photoFile.name, size: photoFile.size, type: photoFile.type });
      } else {
        console.log("[publier-projet] ⚠️ no photo — photoEntry:", typeof photoEntry, photoEntry);
      }
    } else {
      // JSON path (compat)
      const json = await req.json().catch(() => null);
      if (!json) return NextResponse.json({ ok: false, error: "Payload invalide." }, { status: 400 });
      b = {
        honeypot:    json.honeypot ?? "",
        category:    (json.category ?? json.trade ?? "").toString(),
        name:        (json.name ?? json.first_name ?? "").toString(),
        email:       (json.email ?? "").toString(),
        phone:       (json.phone ?? "").toString(),
        postal:      (json.postal ?? json.postcode ?? json.cp ?? "").toString(),
        location:    (json.location ?? json.city ?? "").toString(),
        surface:     json.surface ?? null,
        surface_m2:  json.surface_m2 ? String(json.surface_m2) : null,
        piece_type:  json.piece_type ?? null,
        budget:      json.budget ?? json.budgetRange ?? null,
        description: (json.description ?? "").toString(),
        image_url:   json.image_url ?? null,
      };
    }

    // ── Honeypot ──────────────────────────────────────────────────────────
    if (b.honeypot?.trim()) {
      return NextResponse.json({ ok: false, error: "Spam détecté." }, { status: 400 });
    }

    // ── Validation ────────────────────────────────────────────────────────
    if (!b.name || b.name.length < 2)
      return NextResponse.json({ ok: false, error: "Nom invalide." }, { status: 400 });

    if (!b.phone || !/^\d{10}$/.test(b.phone))
      return NextResponse.json({ ok: false, error: "Téléphone invalide (10 chiffres requis)." }, { status: 400 });

    if (!b.postal || !/^\d{5}$/.test(b.postal))
      return NextResponse.json({ ok: false, error: "Code postal invalide (5 chiffres requis)." }, { status: 400 });

    if (!b.category)
      return NextResponse.json({ ok: false, error: "Catégorie requise." }, { status: 400 });

    // ── Cooldown 24h ──────────────────────────────────────────────────────
    const supabase = createSupabaseServiceClient();

    const { data: recentProject } = await supabase
      .from("publier_projets")
      .select("created_at")
      .eq("phone", b.phone)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (recentProject?.created_at) {
      const hoursSince = (Date.now() - new Date(recentProject.created_at).getTime()) / 3_600_000;
      if (hoursSince < 24) {
        const hoursRemaining = Math.ceil(24 - hoursSince);
        return NextResponse.json(
          { ok: false, error: `Veuillez patienter ${hoursRemaining}h avant de republier.` },
          { status: 429 }
        );
      }
    }

    // ── Génère token + prefix ─────────────────────────────────────────────
    const clientToken        = crypto.randomUUID();
    const projectId          = crypto.randomUUID();
    const confirmationToken  = crypto.randomUUID();
    const postalPrefix = b.postal!.slice(0, 2);

    // ── Upload foto nëse ekziston ─────────────────────────────────────────
    let imageUrl: string | null = b.image_url ?? null;
    if (photoFile && photoFile.size > 0) {
      imageUrl = await uploadPhoto(supabase, photoFile, projectId);
      console.log("[publier-projet] photo uploaded:", imageUrl);
    }

    // ── Insert ────────────────────────────────────────────────────────────
    const { data, error } = await supabase
      .from("publier_projets")
      .insert({
        id:               projectId,
        client_token:     clientToken,
        first_name:       b.name,
        phone:            b.phone,
        postal:           b.postal,
        postal_prefix:    postalPrefix,
        location:         b.location || null,
        surface:          b.surface   || null,
        surface_m2:       b.surface_m2 ? parseInt(b.surface_m2) : null,
        piece_type:       b.piece_type || null,
        budget:           b.budget    || null,
        category:         b.category,
        category_details: b.category,
        description:      b.description || null,
        image_url:        imageUrl,
        confirmed:        false,
        confirmation_token: confirmationToken,
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("[publier-projet] insert error:", error?.message);
      return NextResponse.json({ ok: false, error: "Impossible de publier le projet." }, { status: 500 });
    }

    console.log("[publier-projet] success", { id: data.id, hasPhoto: !!imageUrl });

    // ── Dërgo email konfirmimi me link ────────────────────────────────────
    if (b.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) {
      const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      const confirmUrl = `${origin}/api/confirm-project?token=${confirmationToken}`;
      fetch(`${origin}/api/send-confirmation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email:       b.email,
          name:        b.name,
          category:    b.category,
          budget:      b.budget,
          piece_type:  b.piece_type,
          surface_m2:  b.surface_m2,
          location:    b.location,
          description: b.description,
          confirm_url: confirmUrl,
        }),
      }).catch(err => console.error("[send-confirmation] fetch failed:", err));
    }

    return NextResponse.json({ ok: true, token: clientToken }, { status: 200 });

  } catch (e) {
    console.error("[publier-projet] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}