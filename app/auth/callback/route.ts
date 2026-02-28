import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createSupabaseServiceClient } from "@/lib/supabaseServer";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  const redirectTo = url.searchParams.get("redirectTo") || "/artisan/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL(redirectTo || "/", url.origin));
  }

  const res = NextResponse.redirect(new URL(redirectTo, url.origin));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.headers.get("cookie")
            ? req.headers
                .get("cookie")!
                .split(";")
                .map((c) => {
                  const [name, ...rest] = c.trim().split("=");
                  return { name, value: rest.join("=") };
                })
            : [];
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.exchangeCodeForSession(code);

  // If user has artisan metadata (from signup with options.data), upgrade profile to artisan
  if (user?.user_metadata?.metier) {
    const service = createSupabaseServiceClient();
    const m = user.user_metadata as Record<string, unknown>;
    const artisanProfile = {
      id: user.id,
      role: "artisan" as const,
      first_name: (typeof m?.first_name === "string" ? m.first_name.trim() : null) || null,
      last_name: (typeof m?.last_name === "string" ? m.last_name.trim() : null) || null,
      phone: (typeof m?.phone === "string" ? m.phone.replace(/\D/g, "").slice(0, 20) : null) || null,
      metier: (typeof m?.metier === "string" ? m.metier.trim() : null) || null,
      postal_code: (typeof m?.postal_code === "string" ? m.postal_code.trim().slice(0, 10) : null) || null,
      city: (typeof m?.city === "string" ? m.city.trim().slice(0, 100) : null) || null,
      updated_at: new Date().toISOString(),
    };
    const { data: existing } = await service.from("profiles").select("role").eq("id", user.id).maybeSingle();
    if (existing) {
      await service
        .from("profiles")
        .update({
          role: "artisan",
          first_name: artisanProfile.first_name,
          last_name: artisanProfile.last_name,
          phone: artisanProfile.phone,
          metier: artisanProfile.metier,
          postal_code: artisanProfile.postal_code,
          city: artisanProfile.city,
          updated_at: artisanProfile.updated_at,
        })
        .eq("id", user.id);
    } else {
      await service.from("profiles").insert(artisanProfile);
    }
  }

  return res;
}