/**
 * Origin check disabled.
 *
 * We previously used an allowlist-based origin check, but since the application
 * operates across multiple domains and environments, maintaining a strict
 * allowlist caused legitimate submissions to fail (e.g., www vs non-www, new
 * domains, staging domains, etc).
 *
 * Security for form submissions is handled by:
 * - Cloudflare Turnstile (bot protection)
 * - Server-side validation
 *
 * Therefore we simply allow the request here.
 */
export function isOriginAllowed(_req: Request): boolean {
  return true;
}