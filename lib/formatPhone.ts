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
