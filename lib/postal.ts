// lib/postal.ts
export function extractPostalPrefix(input: {
  postal_code?: string | null;
  location?: string | null;
}): string | null {
  const postal = (input.postal_code ?? "").toString().trim();
  const location = (input.location ?? "").toString().trim();

  // 1. Try full postal code (5 digits)
  const matchPostal = postal.match(/(\d{5})/);
  if (matchPostal) {
    return matchPostal[1].slice(0, 2);
  }

  // 2. Try extracting from location text
  const matchLocation = location.match(/(\d{5})/);
  if (matchLocation) {
    return matchLocation[1].slice(0, 2);
  }

  // 3. If only 2 digits provided
  const twoDigits = postal.match(/^\d{2}$/);
  if (twoDigits) {
    return twoDigits[0];
  }

  // 4. Fallback: search any 2 digits
  const fallback = (postal + " " + location).match(/\b(\d{2})\b/);
  if (fallback) {
    return fallback[1];
  }

  return null;
}
