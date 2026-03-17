"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabaseBrowser";
import { useRouter, useSearchParams } from "next/navigation";

const METIERS = ["Peinture", "Plomberie", "Électricien", "Maçonnerie", "Menuiserie", "Carrelage", "Autre"];
const DEV = process.env.NODE_ENV === "development";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_BYPASS_UNLOCK === "true";
const MIN_PASSWORD_DEV = 8;
const MIN_PASSWORD_PROD = 10;

function passwordStrength(pwd: string): { score: number; label: string } {
  if (!pwd) return { score: 0, label: "" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;
  const labels = ["", "Faible", "Moyen", "Bon", "Fort", "Très fort"];
  return { score, label: labels[score] };
}

function getMinPasswordLength() {
  return DEV_MODE ? MIN_PASSWORD_DEV : MIN_PASSWORD_PROD;
}

function isPasswordValid(pwd: string): boolean {
  const minLen = getMinPasswordLength();
  if (pwd.length < minLen) return false;
  if (DEV_MODE) return true;
  return passwordStrength(pwd).score >= 2;
}

function formatPhone(value: string) {
  let input = value.trim();
  if (input.startsWith("+33")) {
    const digits = input.slice(3).replace(/\D/g, "").slice(0, 9);
    if (digits.length === 0) return "+33 ";
    const parts: string[] = ["+33"];
    for (let i = 0; i < digits.length; i += 2) parts.push(digits.slice(i, i + 2));
    return parts.join(" ");
  }
  const digits = input.replace(/\D/g, "").slice(0, 10);
  const parts: string[] = [];
  for (let i = 0; i < digits.length; i += 2) parts.push(digits.slice(i, i + 2));
  return parts.join(" ");
}

function validateFrenchMobile(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, "");
  return /^(?:\+33[67]\d{8}|0[67]\d{8})$/.test(cleaned);
}

function normalizePhoneToInternational(phone: string): string {
  const cleaned = phone.replace(/\s/g, "");
  if (cleaned.startsWith("+33")) return cleaned;
  if (cleaned.startsWith("0")) return "+33" + cleaned.slice(1);
  return cleaned;
}

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

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? searchParams.get("redirectTo") ?? "/artisan/dashboard";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [metier, setMetier] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showForgotForm, setShowForgotForm] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const pwStrength = passwordStrength(password);
  const passwordValid = isPasswordValid(password);
  const minLen = getMinPasswordLength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createSupabaseBrowserClient();

    try {
      if (mode === "signup") {
        if (!passwordValid) {
          setError(
            DEV_MODE
              ? `Le mot de passe doit contenir au moins ${minLen} caractères.`
              : "Le mot de passe doit contenir au moins 10 caractères avec majuscules, minuscules, chiffres ou caractères spéciaux."
          );
          setLoading(false);
          return;
        }

        if (!validateFrenchMobile(phone)) {
          setError("Veuillez entrer un numéro français valide (06, 07 ou +33).");
          setLoading(false);
          return;
        }

        const normalizedPhone = normalizePhoneToInternational(phone);
        const artisanData = {
          first_name: firstName.trim() || null,
          last_name: lastName.trim() || null,
          phone: normalizedPhone || null,
          metier: metier || null,
          postal_code: postalCode.trim() || null,
          city: city.trim() || null,
        };

        const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
          email,
          password,
          options: { data: artisanData },
        });

        if (signUpErr) {
          setError(sanitizeAuthError(signUpErr.message));
          setLoading(false);
          return;
        }

        if (signUpData?.session && signUpData?.user) {
          const apiUrl = typeof window !== "undefined"
            ? `${window.location.origin}/api/auth/set-role`
            : "/api/auth/set-role";

          let res: Response;
          try {
            res = await fetch(apiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ role: "artisan", ...artisanData }),
            });
          } catch (fetchErr) {
            if (DEV) console.error("[artisan/signup] fetch failed:", fetchErr);
            setError("Erreur de connexion. Vérifiez votre réseau et réessayez.");
            setLoading(false);
            return;
          }

          if (!res.ok) {
            const json = await res.json().catch(() => ({}));
            if (DEV) console.error("[artisan/signup] set-role failed:", res.status, json);
            setError(json?.error || "Erreur lors de la configuration du profil.");
            setLoading(false);
            return;
          }
        } else if (signUpData?.user) {
          setSignupSuccess(true);
          setLoading(false);
          return;
        }
      } else {
        const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
        if (signInErr) {
          if (DEV) console.error("[artisan/login] signIn failed:", signInErr.message);
          setError(sanitizeAuthError(signInErr.message));
          setLoading(false);
          return;
        }
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      if (DEV) console.error("[artisan/auth] unexpected error:", err);
      setError(sanitizeAuthError(err instanceof Error ? err.message : "Erreur inattendue."));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setError(null);
    setForgotLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const { error: err } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
        redirectTo: `${origin}/reset-password`,
      });
      if (err) setError(sanitizeAuthError(err.message));
      else setForgotSent(true);
    } catch (err) {
      setError(sanitizeAuthError(err instanceof Error ? err.message : "Erreur inattendue."));
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">PA</div>
          <h1 className="text-xl font-semibold text-slate-900">Premium Artisan</h1>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          {mode === "signin" ? "Connectez-vous à votre compte" : "Créez votre compte artisan"}
        </p>

        {signupSuccess ? (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-emerald-600">Compte créé. Vérifiez votre email (Inbox/Spam) pour confirmer votre inscription.</p>
            <button type="button" disabled={resendLoading}
              onClick={async () => {
                setResendLoading(true); setError(null);
                try {
                  const supabase = createSupabaseBrowserClient();
                  const { error: err } = await supabase.auth.resend({ type: "signup", email });
                  if (err) setError(sanitizeAuthError(err.message));
                } catch { setError("Erreur lors du renvoi. Réessayez."); }
                finally { setResendLoading(false); }
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50">
              {resendLoading ? "Envoi..." : "Renvoyer l'email"}
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="button" onClick={() => { setSignupSuccess(false); setMode("signin"); setError(null); }}
              className="block text-sm text-blue-600 hover:underline">Retour à la connexion</button>
          </div>
        ) : !showForgotForm ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">Prénom</label>
                  <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required autoComplete="given-name"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">Nom</label>
                  <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required autoComplete="family-name"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            {mode === "signup" && (
              <>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Téléphone</label>
                  <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="06 12 34 56 78 ou +33 6 12 34 56 78" maxLength={17} required autoComplete="tel"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  {phone && !validateFrenchMobile(phone) && (
                    <p className="mt-1 text-xs text-red-600">Numéro français valide requis (06, 07 ou +33).</p>
                  )}
                </div>
                <div>
                  <label htmlFor="metier" className="block text-sm font-medium text-slate-700">Métier</label>
                  <select id="metier" value={metier} onChange={(e) => setMetier(e.target.value)} required
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Sélectionnez un métier</option>
                    {METIERS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-slate-700">Code postal</label>
                    <input id="postalCode" type="text" value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                      placeholder="75001" maxLength={5} required autoComplete="postal-code"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700">Ville</label>
                    <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)}
                      placeholder="Paris" required autoComplete="address-level2"
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
              </>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Mot de passe</label>
              <div className="relative mt-1">
                <input id="password" type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)} required
                  minLength={mode === "signup" ? minLen : 1}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                <button type="button" onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:bg-slate-100"
                  aria-label="Afficher le mot de passe">
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
              {mode === "signup" && password && !DEV_MODE && (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
                    <div className={`h-full rounded-full transition-all ${
                      pwStrength.score <= 1 ? "bg-red-500" : pwStrength.score <= 2 ? "bg-amber-500" : pwStrength.score <= 3 ? "bg-yellow-500" : "bg-emerald-500"
                    }`} style={{ width: `${(pwStrength.score / 5) * 100}%` }} />
                  </div>
                  <span className="text-xs text-slate-500">
                    {pwStrength.label}
                    {password.length < minLen && ` (${minLen} caractères min)`}
                    {password.length >= minLen && pwStrength.score < 2 && " — Recommandé : majuscule, chiffre ou caractère spécial"}
                  </span>
                </div>
              )}
            </div>
            {mode === "signin" && (
              <div className="text-right">
                <button type="button" onClick={() => setShowForgotForm(true)} className="text-sm text-blue-600 hover:underline">
                  Mot de passe oublié ?
                </button>
              </div>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-3">
              <button type="submit" disabled={loading || (mode === "signup" && !passwordValid)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50">
                {loading && (
                  <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {loading ? (mode === "signin" ? "Connexion..." : "Création du compte...") : mode === "signin" ? "Se connecter" : "Créer le compte"}
              </button>
              <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                {mode === "signin" ? "S'inscrire" : "Déjà inscrit"}
              </button>
            </div>
          </form>
        ) : forgotSent ? (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-emerald-600">Un lien de réinitialisation a été envoyé à {forgotEmail}.</p>
            <button type="button"
              onClick={() => { setShowForgotForm(false); setForgotSent(false); setForgotEmail(""); setError(null); }}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Retour à la connexion
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-slate-600">Entrez votre email pour recevoir un lien de réinitialisation.</p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="forgotEmail" className="block text-sm font-medium text-slate-700">Email</label>
                <input id="forgotEmail" type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                  required placeholder="votre@email.fr"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-2">
                <button type="submit" disabled={forgotLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50">
                  {forgotLoading ? "Envoi..." : "Envoyer le lien"}
                </button>
                <button type="button" onClick={() => { setShowForgotForm(false); setError(null); }}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/artisan/dashboard" className="text-blue-600 hover:underline">Retour au dashboard</Link>
        </p>
      </div>
    </main>
  );
}

export default function ArtisanLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" /></div>}>
      <LoginContent />
    </Suspense>
  );
}