// app/api/artisan/project/contacts/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ── PRIX PAR BUDGET ────────────────────────────────────────────────────────────
// budget stocké dans publier_projets comme string (ex: "500_1500") ou number
type PriceTier = {
  label: string;
  normalPrice: number;   // en centimes
  exclusivePrice: number; // x3
};

function getPriceTier(budget: string | number | null | undefined): PriceTier {
  const tiers: Array<{ max: number; tier: PriceTier }> = [
    { max: 500,    tier: { label: "< 500€",              normalPrice: 1500,  exclusivePrice: 4500  } },
    { max: 1500,   tier: { label: "500€ – 1 500€",       normalPrice: 3000,  exclusivePrice: 9000  } },
    { max: 3000,   tier: { label: "1 500€ – 3 000€",     normalPrice: 3900,  exclusivePrice: 11700 } },
    { max: 7000,   tier: { label: "3 000€ – 7 000€",     normalPrice: 6500,  exclusivePrice: 19500 } },
    { max: 15000,  tier: { label: "7 000€ – 15 000€",    normalPrice: 10500, exclusivePrice: 31500 } },
    { max: 25000,  tier: { label: "15 000€ – 25 000€",   normalPrice: 14900, exclusivePrice: 44700 } },
    { max: 40000,  tier: { label: "25 000€ – 40 000€",   normalPrice: 24900, exclusivePrice: 74700 } },
    { max: 60000,  tier: { label: "40 000€ – 60 000€",   normalPrice: 34900, exclusivePrice: 104700 } },
    { max: 100000, tier: { label: "60 000€ – 100 000€",  normalPrice: 49900, exclusivePrice: 149700 } },
  ];
  // Default: 100 000€+
  const defaultTier: PriceTier = { label: "100 000€+", normalPrice: 69900, exclusivePrice: 209700 };

  if (budget === null || budget === undefined || budget === "") return defaultTier;

  let numericBudget: number | null = null;

  if (typeof budget === "number") {
    numericBudget = budget;
  } else {
    const raw = String(budget).trim();
    if (raw.includes("_")) {
      const parts = raw.split("_");
      if (parts[1] === "plus" || !parts[1]) {
        numericBudget = (parseInt(parts[0]) || 0) + 1;
      } else {
        numericBudget = parseInt(parts[1]) || null;
      }
    } else if (raw.includes("-")) {
      const parts = raw.split("-");
      numericBudget = parseInt(parts[1]) || parseInt(parts[0]) || null;
    } else if (/^\d+$/.test(raw)) {
      numericBudget = parseInt(raw);
    }
  }

  if (numericBudget === null) return defaultTier;
  for (const { max, tier } of tiers) {
    if (numericBudget <= max) return tier;
  }
  return defaultTier;
}

// ── HELPERS ────────────────────────────────────────────────────────────────────
async function getUnlockCount(
  svc: ReturnType<typeof createSupabaseServiceClient>,
  projectId: string
): Promise<number> {
  const { count } = await svc
    .from("project_unlocks")
    .select("id", { count: "exact", head: true })
    .eq("project_id", projectId)
    .eq("status", "paid");
  return count ?? 0;
}

async function isProjectExclusiveLocked(
  svc: ReturnType<typeof createSupabaseServiceClient>,
  projectId: string
): Promise<boolean> {
  const { data } = await svc
    .from("project_unlocks")
    .select("id")
    .eq("project_id", projectId)
    .eq("exclusive", true)
    .eq("status", "paid")
    .limit(1)
    .maybeSingle();
  return !!data;
}

// ── MAIN HANDLER ───────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const projectIds: string[] = Array.isArray(body?.projectIds)
      ? body.projectIds.map((x: unknown) => String(x ?? "").trim()).filter(Boolean)
      : [];
    const isExclusive: boolean = body?.exclusive === true;

    if (!projectIds.length) {
      return NextResponse.json({ ok: false, error: "Aucun projet fourni." }, { status: 400 });
    }

    // Support unique project par appel (standard flow)
    const projectId = projectIds[0];
    const cpHint: string = String(body?.cp ?? "").trim(); // passed from frontend

    const serverSupabase = await createSupabaseServerClient();
    const { data: { user }, error: authErr } = await serverSupabase.auth.getUser();
    if (authErr || !user) {
      return NextResponse.json({ ok: false, error: "Non authentifié." }, { status: 401 });
    }

    const svc = createSupabaseServiceClient();

    // ── Fetch project + existing unlock en parallèle ──────────────────────
    const [projectRes, existingRes] = await Promise.all([
      svc
        .from("publier_projets")
        .select("id, budget, phone, first_name, category, postal_prefix")
        .eq("id", projectId)
        .maybeSingle(),
      svc
        .from("project_unlocks")
        .select("id, status, exclusive")
        .eq("project_id", projectId)
        .eq("artisan_id", user.id)
        .maybeSingle(),
    ]);

    const project = projectRes.data;
    const existing = existingRes.data;

    if (projectRes.error || !project) {
      return NextResponse.json({ ok: false, error: "Projet introuvable." }, { status: 404 });
    }

    if (existing?.status === "paid") {
      // Déjà débloqué → retourne directement le numéro
      const phone = project.phone ?? null;
      return NextResponse.json({
        ok: true,
        contacts: { [projectId]: { phone: phone ?? null } },
      });
    }

    // ── GUARD: exclusive disponible uniquement si 0/3 ──────────────────────
    const unlockCount = await getUnlockCount(svc, projectId);

    if (isExclusive) {
      if (unlockCount > 0) {
        return NextResponse.json({
          ok: false,
          error: `EXCLUSIVE_NOT_ALLOWED: projet déjà débloqué par ${unlockCount} artisan(s).`,
          code: "EXCLUSIVE_NOT_ALLOWED",
        }, { status: 409 });
      }
    }

    // ── GUARD: locked exclusif par quelqu'un d'autre ──────────────────────
    const isLocked = await isProjectExclusiveLocked(svc, projectId);
    if (isLocked) {
      return NextResponse.json({
        ok: false,
        error: "PROJECT_LOCKED: ce projet est exclusivement réservé à un autre artisan.",
        code: "PROJECT_LOCKED",
      }, { status: 409 });
    }

    // ── GUARD: 3/3 complet ────────────────────────────────────────────────
    if (!isExclusive && unlockCount >= 3) {
      return NextResponse.json({
        ok: false,
        error: "PROJECT_FULL: ce projet a atteint le maximum de 3 artisans.",
        code: "PROJECT_FULL",
      }, { status: 409 });
    }

    // ── DEV BYPASS: skip Stripe ───────────────────────────────────────────
    if (String(process.env.NEXT_PUBLIC_DEV_BYPASS_UNLOCK ?? "").toLowerCase() === "true") {
      await svc.from("project_unlocks").upsert({
        project_id: projectId,
        artisan_id: user.id,
        status: "paid",
        exclusive: isExclusive,
        locked_at: isExclusive ? new Date().toISOString() : null,
      }, { onConflict: "project_id,artisan_id" });

      return NextResponse.json({
        ok: true,
        contacts: { [projectId]: { phone: project.phone ?? null } },
      });
    }

    // ── STRIPE CHECKOUT ───────────────────────────────────────────────────
    const tier = getPriceTier(project.budget);
    const unitAmount = isExclusive ? tier.exclusivePrice : tier.normalPrice;
    const label = isExclusive
      ? `Réservation exclusive — ${project.first_name ?? "Client"} (${tier.label})`
      : `Déblocage contact — ${project.first_name ?? "Client"} (${tier.label})`;

    // Upsert un enregistrement "pending" avant le paiement
    await svc.from("project_unlocks").upsert({
      project_id: projectId,
      artisan_id: user.id,
      status: "pending",
      exclusive: isExclusive,
    }, { onConflict: "project_id,artisan_id" });

    // cp pour redirect après paiement
    const cp = cpHint || String(project.postal_prefix ?? "21").slice(0, 2);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: unitAmount,
            product_data: {
              name: label,
              description: isExclusive
                ? "Accès exclusif — les autres artisans seront bloqués"
                : "Accès au numéro de téléphone du client",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        project_id: projectId,
        artisan_id: user.id,
        exclusive: String(isExclusive),
      },
      success_url: `${APP_URL}/artisan/dashboard?cp=${cp}&unlock=success&project_id=${projectId}`,
      cancel_url:  `${APP_URL}/artisan/dashboard?unlock=cancel`,
    });

    return NextResponse.json({ ok: false, checkoutUrl: session.url }, { status: 200 });

  } catch (e) {
    console.error("[contacts] crash:", e);
    return NextResponse.json({ ok: false, error: "Erreur serveur." }, { status: 500 });
  }
}