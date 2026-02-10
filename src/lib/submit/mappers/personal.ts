import { firstNonEmpty, limit, str } from "@/lib/submit/utils/strings";
import { buildPersonalComments } from "@/lib/submit/comments/personalComments";

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
  const postalCode = firstNonEmpty(answers.postalCode, answers.zip, answers.zipCode);
  const streetAddress = firstNonEmpty(answers.streetAddress, answers.address, answers.address1);
  
  const nextExpirationDate = firstNonEmpty(
    answers.policyExpirationDate,
    answers.nextExpirationDate,
    answers.expirationDate,
    // Home form: coverageDate is expiration when isNewPurchase=false
    (answers as any).isNewPurchase === false ? answers.coverageDate : null
  );

  // Home property features
  const propertyFeatures = (answers as any).propertyFeatures || [];
  const hasPool = Array.isArray(propertyFeatures) && propertyFeatures.includes('pool');
  const hasSolar = Array.isArray(propertyFeatures) && propertyFeatures.includes('solar');
  const hasGated = Array.isArray(propertyFeatures) && propertyFeatures.includes('gated');
  const hasScreen = Array.isArray(propertyFeatures) && propertyFeatures.includes('screen');
  const hasBurglar = Array.isArray(propertyFeatures) && propertyFeatures.includes('burglar');
  const hasSmoke = Array.isArray(propertyFeatures) && propertyFeatures.includes('smoke');
  
  // Determine alarm type based on selections
  let alarmType = '';
  if (hasBurglar && hasSmoke) {
    alarmType = 'Central Fire and Burglar';
  } else if (hasSmoke) {
    alarmType = 'Central Fire Only';
  } else if (hasBurglar) {
    alarmType = 'Central Burglar Only';
  }

  const personalLine = firstNonEmpty(
    answers.personalLine,
    answers.lineOfBusiness,
    answers.product,
    answers.formType
  );

  const payload: Record<string, unknown> = {
    firstName,
    lastName,
    email,
    phone: limit(str(phone), 30),
    dateOfBirth: limit(str(answers.dateOfBirth), 10),
    streetAddress: limit(str(streetAddress), 160),
    city: limit(str(answers.city), 80),
    state: limit(str(answers.state), 2),
    postalCode: limit(str(postalCode), 16),
    leadSource: limit(str(answers.leadSource), 80),
    nextExpirationDate: limit(str(nextExpirationDate), 10),
    comments: buildPersonalComments(answers),

    tags: limit(str(answers.tags), 40),
    agent: limit(str(answers.agent), 80),

    // Home property features
    gatedCommunity: hasGated ? 'Yes' : 'No',
    solarPanels: hasSolar ? 'Yes' : 'No',
    pool: hasPool ? 'Yes' : 'No',
    screen: hasScreen ? 'Yes' : 'No',
    alarm: alarmType,
  };

  return { ok: true, payload };
}