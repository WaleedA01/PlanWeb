import type { LeadCategory } from "./types";
import { mapBusiness } from "./mappers/business";
import { mapPersonal } from "./mappers/personal";

export type RouteResult =
  | { ok: true; category: LeadCategory; payload: Record<string, unknown> }
  | { ok: false; error: string };

/**
 * Routes a submit request to the correct category mapper.
 *
 * Today we only support two categories:
 * - business (commercial)
 * - personal (all personal LOBs)
 */
export function routeAndMap(
  formType: LeadCategory,
  answers: Record<string, unknown>
): RouteResult {
  if (formType === "business") {
    const biz = mapBusiness(answers);
    if (!biz.ok) return { ok: false, error: biz.error };
    return { ok: true, category: "business", payload: biz.payload };
  }

  const per = mapPersonal(answers);
  if (!per.ok) return { ok: false, error: per.error };
  return { ok: true, category: "personal", payload: per.payload };
}
