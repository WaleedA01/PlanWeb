

/**
 * Small, dependency-free helpers used across submit routing, mapping, and validation.
 */

export function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function limit(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) : s;
}

export function arr<T = unknown>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

/**
 * Best-effort boolean parsing for common form representations.
 */
export function bool(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s === "true" || s === "1" || s === "yes" || s === "y";
  }
  return false;
}

/**
 * Returns the first non-empty string from the provided values.
 */
export function firstNonEmpty(...values: unknown[]): string {
  for (const v of values) {
    const s = str(v);
    if (s) return s;
  }
  return "";
}

/**
 * Shallow pick of allowed keys from an object.
 */
export function pick(obj: Record<string, unknown>, keys: string[]) {
  const out: Record<string, unknown> = {};
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      out[k] = obj[k];
    }
  }
  return out;
}

/**
 * Safe JSON parse that returns null on failure.
 */
export function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}