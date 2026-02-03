

/**
 * Simple allowlist-based Origin check.
 *
 * Configure one or more allowed origins with environment variables:
 * - APP_ORIGIN (e.g. http://localhost:3000 or https://planlife.com)
 * - APP_ORIGIN_WWW (optional, e.g. https://www.planlife.com)
 * - APP_ORIGIN_ALT (optional, e.g. https://staging.planlife.com)
 *
 * Notes:
 * - Modern browsers generally send the `Origin` header for POST/fetch.
 * - If Origin is missing, we allow only in non-production (dev ergonomics).
 */
export function isOriginAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");

  const allowed = new Set(
    [
      process.env.APP_ORIGIN,
      process.env.APP_ORIGIN_WWW,
      process.env.APP_ORIGIN_ALT,
    ].filter(Boolean) as string[]
  );

  // If no allowlist is configured, default allow in dev and allow in prod (until configured).
  // You can tighten this later by returning false when allowed.size === 0 in production.
  if (allowed.size === 0) {
    return true;
  }

  // Missing Origin is uncommon for modern browsers; be strict in prod.
  if (!origin) {
    return process.env.NODE_ENV !== "production";
  }

  return allowed.has(origin);
}