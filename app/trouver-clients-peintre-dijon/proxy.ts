import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            response.cookies.set(name, value);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Public routes - no auth required
  const isPublic =
    pathname === "/" ||
    pathname === "/reset-password" ||
    pathname.startsWith("/publier-projet") ||
    pathname.startsWith("/suivi-projet") ||
    pathname.startsWith("/confirmation") ||
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    // ── SEO pages clients ──
    pathname.startsWith("/devis-peinture") ||
    pathname.startsWith("/devis-renovation") ||
    pathname.startsWith("/devis-cuisine") ||
    pathname.startsWith("/devis-salle-de-bain") ||
    pathname.startsWith("/renovation") ||
    pathname.startsWith("/peintre-dijon") ||
    pathname.startsWith("/travaux") ||
    // ── SEO pages artisans ──
    pathname.startsWith("/devis-gratuit-peintre") ||
    pathname.startsWith("/logiciel-devis-peintre") ||
    pathname.startsWith("/devis-facture-gratuit-peintre") ||
    pathname.startsWith("/trouver-clients-peintre") ||
    pathname.startsWith("/application-devis-peintre") ||
    pathname.startsWith("/creer-devis-peintre") ||
    pathname.startsWith("/creer-facture-artisan") ||
    // ── Dashboard artisan public ──
    pathname.startsWith("/artisan/dashboard") ||
    // ── Pages confirmation/devis client ──
    pathname.startsWith("/confirmer-projet") ||
    pathname.startsWith("/devis/repondre");

  if (isPublic) {
    return response;
  }

  // /artisan/login - allow unauthenticated
  if (pathname.startsWith("/artisan/login")) {
    if (user) {
      const { data: loginProfile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      if (loginProfile?.role === "artisan") {
        return NextResponse.redirect(new URL("/artisan/dashboard", request.url));
      }
    }
    return response;
  }

  // /login (client form) - allow unauthenticated
  if (pathname === "/login" || pathname.startsWith("/login/")) {
    return response;
  }

  // DEV BYPASS
  const devBypass = process.env.NEXT_PUBLIC_DEV_BYPASS_UNLOCK === "true";
  if (devBypass && pathname.startsWith("/messages/")) {
    return response;
  }

  // Protected routes - require auth
  if (!user) {
    if (pathname.startsWith("/artisan/")) {
      return NextResponse.redirect(new URL("/artisan/login", request.url));
    }
    if (pathname.startsWith("/client/")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (pathname.startsWith("/messages/")) {
      return NextResponse.redirect(new URL("/artisan/login", request.url));
    }
    return response;
  }

  // Fetch profile for role check
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = (profile?.role ?? "client") as string;

  // /artisan/* requires role=artisan
  if (pathname.startsWith("/artisan/")) {
    if (role !== "artisan") {
      const loginUrl = new URL("/artisan/login", request.url);
      const redirectResponse = NextResponse.redirect(loginUrl);
      request.cookies.getAll().forEach((c) => {
        if (c.name.startsWith("sb-")) {
          redirectResponse.cookies.delete(c.name);
        }
      });
      return redirectResponse;
    }
    return response;
  }

  // /client/* requires role=client
  if (pathname.startsWith("/client/")) {
    if (role !== "client") {
      return NextResponse.redirect(new URL("/artisan/dashboard", request.url));
    }
    return response;
  }

  if (pathname.startsWith("/messages/")) {
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};