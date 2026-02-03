

import { buildBusinessComments } from "@/lib/submit/comments/businessComments";
import { firstNonEmpty, limit, str } from "@/lib/submit/utils/strings";

export type BusinessMapResult =
  | { ok: true; payload: Record<string, unknown> }
  | { ok: false; error: string };

function buildContactName(answers: Record<string, unknown>): string {
  const explicit = str(answers.contactName);
  if (explicit) return limit(explicit, 120);

  const first = str(answers.firstName);
  const last = str(answers.lastName);
  const combined = `${first} ${last}`.trim();
  return limit(combined, 120);
}

/**
 * Maps commercial/business questionnaire answers to the payload expected by your
 * Zapier -> AgencyZoom pipeline.
 *
 * NOTE: AgencyZoom lacks dedicated fields for products and many questionnaire
 * items, so we store them in `comments`.
 */
export function mapBusiness(
  answers: Record<string, unknown>
): BusinessMapResult {
  const contactName = buildContactName(answers);
  const email = limit(str(answers.email), 120);

  if (!contactName) {
    return { ok: false, error: "Missing contactName (or firstName/lastName)" };
  }
  if (!email || !email.includes("@")) {
    return { ok: false, error: "Invalid email" };
  }

  // Support common aliases to avoid breaking if UI field names change slightly.
  const postalCode = firstNonEmpty(
    answers.postalCode,
    answers.zip,
    answers.zipCode
  );

  const streetAddress = firstNonEmpty(
    answers.streetAddress,
    answers.address,
    answers.address1
  );

  const phoneNumber = firstNonEmpty(answers.phoneNumber, answers.phone);

  const leadOwner = firstNonEmpty(answers.selectedAgent, answers.agent);

  const payload: Record<string, unknown> = {
    // Address / entity
    businessName: limit(str(answers.businessName), 160),
    streetAddress: limit(str(streetAddress), 160),
    city: limit(str(answers.city), 80),
    state: limit(str(answers.state), 2),
    postalCode: limit(str(postalCode), 16),

    // Contact
    contactName,
    email,
    phoneNumber: limit(str(phoneNumber), 30),

    // Assignment / routing (if you want to pass it to Zapier)
    leadOwner: limit(str(leadOwner), 120),

    // Optional AZ field
    yearBusinessStarted: limit(str(answers.yearBusinessStarted), 10),

    // Notes/comments: products + businessType + other details
    comments: buildBusinessComments(answers),

    // Optional metadata if your zap expects it
    leadSource: limit(str(answers.leadSource), 80),
    tags: limit(str(answers.tags), 40),
  };

  return { ok: true, payload };
}