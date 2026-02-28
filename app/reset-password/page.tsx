"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_BYPASS_UNLOCK === "true";
const MIN_PASSWORD_DEV = 8;
const MIN_PASSWORD_PROD = 10;

function getMinPasswordLength() {
  return DEV_MODE ? MIN_PASSWORD_DEV : MIN_PASSWORD_PROD;
}

function isPasswordValid(pwd: string): boolean {
  const minLen = getMinPasswordLength();
  if (pwd.length < minLen) return false;
  if (DEV_MODE) return true;
  // prod: require complexity (uppercase+lowercase, digit, or special)
  return (
    /[a-z]/.test(pwd) &&
    (/[A-Z]/.test(pwd) || /\d/.test(pwd) || /[^a-zA-Z0-9]/.test(pwd))
  );
}

/** Replace Supabase rate-limit countdown messages with a generic message. */
function sanitizeAuthError(msg: string): string {
  const m = msg.toLowerCase();
  if (
    m.includes("only request") ||
    (m.includes("every") && m.includes("second")) ||
    /retry.*\d+.*second/i.test(msg) ||
    /wait.*\d+.*second/i.test(msg)
  ) {
    return "Trop de tentatives. Veuillez réessayer dans quelques instants.";
  }
  return msg;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setReady(!!session);
    });
  }, []);

  const minLen = getMinPasswordLength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isPasswordValid(password)) {
      setError(
        DEV_MODE
          ? `Le mot de passe doit contenir au moins ${minLen} caractères.`
          : "Le mot de passe doit contenir au moins 10 caractères avec majuscules, minuscules, chiffres ou caractères spéciaux."
      );
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) {
        setError(sanitizeAuthError(err.message));
        setLoading(false);
        return;
      }
      router.push("/artisan/login?toast=password_reset");
      router.refresh();
    } catch (err) {
      setError(sanitizeAuthError(err instanceof Error ? err.message : "Erreur inattendue."));
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg text-center">
          <p className="text-slate-600">Vérification du lien...</p>
          <p className="mt-2 text-sm text-slate-500">
            Si vous avez cliqué sur le lien de réinitialisation, cette page devrait se charger. Sinon,{" "}
            <Link href="/artisan/login" className="text-blue-600 hover:underline">
              demandez un nouveau lien
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="text-xl font-semibold text-slate-900">Nouveau mot de passe</h1>
        <p className="mt-1 text-sm text-slate-600">
          {DEV_MODE ? "Mot de passe (min. 8 caractères en mode test)" : "Choisissez un mot de passe sécurisé."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Mot de passe
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={minLen}
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                aria-label="Afficher le mot de passe"
                title="Afficher le mot de passe"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {DEV_MODE ? `Minimum ${minLen} caractères (mode test)` : `Minimum ${minLen} caractères avec complexité`}
            </p>
          </div>
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-slate-700">
              Confirmer le mot de passe
            </label>
            <input
              id="confirm"
              type={showPassword ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={minLen}
              autoComplete="new-password"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !isPasswordValid(password) || password !== confirm}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading && (
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {loading ? "Enregistrement..." : "Enregistrer le mot de passe"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/artisan/login" className="text-blue-600 hover:underline">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </main>
  );
}
