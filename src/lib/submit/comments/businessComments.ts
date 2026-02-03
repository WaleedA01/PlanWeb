import { arr, limit, str } from "@/lib/submit/utils/strings";

/**
 * Builds the AgencyZoom-friendly notes/comments block for commercial leads.
 *
 * AgencyZoom doesn't have dedicated fields for many commercial questionnaire items
 * (e.g., products). We store those details here in a clean, readable format.
 */
export function buildBusinessComments(a: Record<string, unknown>): string {
  const parts: string[] = [];

  const businessType = str(a.businessType);
  if (businessType) {
    parts.push(
      "Client provided this business type to the best of their knowledge:\n" + businessType
    );
  }

  const products = arr(a.products)
    .map((p) => str(p))
    .filter(Boolean)
    .slice(0, 25);

  if (products.length) {
    parts.push(
      "Client is interested in the following products:\n" +
        products.map((p) => `- ${p}`).join("\n")
    );
  }

  // Operational / timeline details
  const isNewBusiness = str(a.isNewBusiness);
  const expectedCoverageDate = str(a.expectedCoverageDate);

  const ops: string[] = [];
  if (isNewBusiness) ops.push(`New business: ${isNewBusiness}`);
  if (expectedCoverageDate) ops.push(`Expected coverage date: ${expectedCoverageDate}`);
  if (ops.length) parts.push(ops.join("\n"));

  const additionalInfo = str(a.additionalInfo);
  if (additionalInfo) {
    parts.push("Client additional info:\n" + additionalInfo);
  }

  const preferredContactMethod = str(a.preferredContactMethod);
  if (preferredContactMethod) {
    parts.push("Preferred contact method: " + preferredContactMethod);
  }

  // Keep within a safe size for downstream systems.
  return limit(parts.filter(Boolean).join("\n\n"), 2000);
}