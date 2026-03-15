/**
 * Format French phone numbers with spaces (groups of 2 digits).
 * Example: 0787654567 -> 07 87 65 45 67
 */
export function formatPhone(phone: string): string {
  if (!phone || typeof phone !== "string") return "";
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

/**
 * Convert French phone to E.164 for WhatsApp links.
 * Example: 0787654567 -> 33787654567
 */
export function phoneToWhatsApp(phone: string): string {
  if (!phone || typeof phone !== "string") return "";
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("33")) return digits;
  if (digits.startsWith("0")) return "33" + digits.slice(1);
  return "33" + digits;
}