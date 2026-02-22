import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  // ku do i çosh user-at pas login
  const redirectTo = url.searchParams.get("redirectTo") || "/";

  if (!code) {
    return NextResponse.redirect(new URL("/login", url.origin));
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
            // NextResponse cookies
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  await supabase.auth.exchangeCodeForSession(code);

  return res;
}