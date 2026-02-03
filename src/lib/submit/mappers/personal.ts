

import { firstNonEmpty, limit, str } from "@/lib/submit/utils/strings";

export type PersonalMapResult =
  | { ok: true; payload: Record<string, unknown> }
  | { ok: false; error: string };

/**
 * Maps personal questionnaire answers to the payload expected by your
 * Zapier -> AgencyZoom pipeline.
 *
 * Today, all personal LOBs (auto/home/etc.) route to the same personal Zap.
 * This mapper is intentionally tolerant and focused on the shared personal fields.
 */
export function mapPersonal(
  answers: Record<string, unknown>
): PersonalMapResult {
  const firstName = limit(str(answers.firstName), 60);
  const lastName = limit(str(answers.lastName), 60);
  const email = limit(str(answers.email), 120);

  if (!firstName) return { ok: false, error: "Missing firstName" };
  if (!lastName) return { ok: false, error: "Missing lastName" };
  if (!email || !email.includes("@")) return { ok: false, error: "Invalid email" };

  const phone = firstNonEmpty(answers.phone, answers.phoneNumber);

  const payload: Record<string, unknown> = {
    firstName,
    lastName,
    email,
    phone: limit(str(phone), 30),
    state: limit(str(answers.state), 2),
    leadSource: limit(str(answers.leadSource), 80),
    notes: limit(str(answers.notes), 2000),

    // Optional routing metadata if provided by server-side enrichment later
    tags: limit(str(answers.tags), 40),
    agent: limit(str(answers.agent), 80),
  };

  return { ok: true, payload };
}