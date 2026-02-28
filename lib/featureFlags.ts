// TODO: REMOVE THIS DEV BYPASS BEFORE PRODUCTION RELEASE.
// Dev bypass: set NEXT_PUBLIC_DEV_BYPASS_UNLOCK=true in .env.local for testing.
// When true: contact_unlocked=true, can_message=true, skip Stripe/payment checks.
export const DEV_BYPASS_UNLOCK =
  String(process.env.NEXT_PUBLIC_DEV_BYPASS_UNLOCK ?? "").toLowerCase() === "true";

export const ENFORCE_UNLOCK = !DEV_BYPASS_UNLOCK;
