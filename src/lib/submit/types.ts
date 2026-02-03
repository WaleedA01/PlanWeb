// src/lib/submit/types.ts

export type LeadCategory = "business" | "personal";

/**
 * What the frontend will POST to /api/submit
 * - formType: chooses business vs personal pipeline (and Zapier webhook)
 * - answers: raw form answers captured by the questionnaire UI
 * - turnstileToken: Cloudflare token to be verified server-side
 */
export type SubmitRequest = {
  formType: LeadCategory;
  answers: Record<string, unknown>;
  turnstileToken: string;
};

/**
 * A standard shape for validation results (useful for validators/*)
 */
export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

/**
 * Useful for turnstile verification + routing errors
 */
export type SubmitErrorResponse = {
  error: string;
  codes?: string[];
  formType?: LeadCategory;
  webhookKey?: string;
};