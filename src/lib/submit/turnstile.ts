// src/lib/submit/turnstile.ts

import type { SubmitErrorResponse } from "./types";

export type TurnstileVerifyResult =
  | { ok: true }
  | { ok: false; status: number; error: string; codes?: string[] };

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return null;
}

/**
 * Verifies a Turnstile token with Cloudflare.
 * Must be called server-side ONLY (requires TURNSTILE_SECRET_KEY).
 */
export async function verifyTurnstile(
  req: Request,
  token: string
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return {
      ok: false,
      status: 500,
      error: "Server misconfigured: missing TURNSTILE_SECRET_KEY",
    };
  }

  const ip = getClientIp(req);

  const fd = new FormData();
  fd.append("secret", secret);
  fd.append("response", token);
  if (ip) fd.append("remoteip", ip);

  const verifyResp = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: fd }
  );

  const verify = await verifyResp.json().catch(() => null);

  if (!verify?.success) {
    return {
      ok: false,
      status: 403,
      error: "Verification failed",
      codes: verify?.["error-codes"] ?? [],
    };
  }

  return { ok: true };
}