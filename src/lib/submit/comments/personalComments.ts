import { firstNonEmpty, limit, str } from "@/lib/submit/utils/strings";

// A lightweight, tolerant comments builder for personal leads (Auto/Home/etc.).
// This is meant to capture context that isn't mapped into dedicated AZ/Zapier fields.

function yesNo(v: unknown): string {
  const s = String(v ?? "").trim().toLowerCase();
  if (!s) return "";
  if (s === "true" || s === "yes" || s === "y" || s === "1") return "Yes";
  if (s === "false" || s === "no" || s === "n" || s === "0") return "No";
  return "";
}

type VehicleLike = {
  year?: unknown;
  make?: unknown;
  model?: unknown;
  vin?: unknown;
  entryMethod?: unknown; // e.g. "vin" | "manual"
};

function coerceVehicles(answers: Record<string, unknown>): VehicleLike[] {
  const raw = (answers as any).vehicles;
  if (Array.isArray(raw)) return raw as VehicleLike[];

  // Fallback: single-vehicle fields (common in early forms)
  const year = firstNonEmpty((answers as any).vehicleYear, (answers as any).year);
  const make = firstNonEmpty((answers as any).vehicleMake, (answers as any).make);
  const model = firstNonEmpty((answers as any).vehicleModel, (answers as any).model);
  const vin = firstNonEmpty((answers as any).vin, (answers as any).vehicleVin);
  const entryMethod = firstNonEmpty((answers as any).vehicleEntryMethod, (answers as any).entryMethod);

  const hasAny = Boolean(str(year) || str(make) || str(model) || str(vin));
  if (!hasAny) return [];
  return [{ year, make, model, vin, entryMethod }];
}

function formatVehicle(v: VehicleLike, index: number, total: number): string {
  const year = str(v.year);
  const make = str(v.make);
  const model = str(v.model);
  const vin = str(v.vin);

  const lines: string[] = [];
  
  if (vin) lines.push(`         - VIN: ${vin}`);
  
  const ymm = [year, make, model].filter(Boolean).join(" ").trim();
  if (ymm) lines.push(`         - ${ymm}`);

  if (lines.length === 0) return "";

  const header = total === 1 ? "Vehicle:" : `Vehicle ${index + 1}:`;
  return `- ${header}\n${lines.join("\n")}`;
}

export function buildPersonalComments(answers: Record<string, unknown>): string {
  const parts: string[] = [];

  // Vehicle details (supports multiple vehicles)
  const vehicles = coerceVehicles(answers);
  if (vehicles.length > 0) {
    const lines = vehicles
      .map((v, idx) => formatVehicle(v, idx, vehicles.length))
      .filter((s) => s.trim().length > 0);

    if (lines.length > 0) {
      parts.push(["Vehicles:", ...lines].join("\n\n"));
    }
  }

  // New vehicle/purchase flow (auto and home)
  const isNewVehicle = firstNonEmpty(
    (answers as any).isNewVehicle,
    (answers as any).newVehicle,
    (answers as any).newPurchase
  );
  const isNewPurchase = firstNonEmpty(
    (answers as any).isNewPurchase,
    (answers as any).newHomePurchase
  );
  
  const vehicleYN = yesNo(isNewVehicle);
  const purchaseYN = yesNo(isNewPurchase);

  const currentInsurer = firstNonEmpty(
    (answers as any).currentInsurer,
    (answers as any).currentlyInsuredWith,
    (answers as any).currentCarrier
  );

  const coverageDate = firstNonEmpty(
    (answers as any).coverageDate,
    (answers as any).needCoverageBy,
    (answers as any).coverageNeededBy,
    (answers as any).effectiveDate
  );

  const closeDate = firstNonEmpty(
    (answers as any).closeDate,
    (answers as any).closingDate,
    (answers as any).purchaseDate
  );

  const purchaseLines: string[] = [];
  
  // Auto-specific
  if (vehicleYN) {
    purchaseLines.push(`- Is this a new vehicle?: ${vehicleYN}`);
    if (vehicleYN === "No" && currentInsurer) {
      purchaseLines.push(`- Currently insured with: ${limit(str(currentInsurer), 80)}`);
    }
    if (vehicleYN === "Yes" && coverageDate) {
      purchaseLines.push(`- Coverage needed by: ${limit(str(coverageDate), 40)}`);
    }
  }
  
  // Home-specific
  if (purchaseYN) {
    purchaseLines.push(`- Is this a new purchase?: ${purchaseYN}`);
    if (purchaseYN === "Yes" && closeDate) {
      purchaseLines.push(`- Close date: ${limit(str(closeDate), 40)}`);
    }
    if (purchaseYN === "No" && currentInsurer) {
      purchaseLines.push(`- Currently insured with: ${limit(str(currentInsurer), 80)}`);
    }
  }
  
  if (purchaseLines.length > 0) {
    parts.push(purchaseLines.join("\n"));
  }

  // Expected drivers
  const drivers = firstNonEmpty(
    (answers as any).numDrivers,
    (answers as any).driverCount,
    (answers as any).howManyDrivers,
    (answers as any).expectedDrivers
  );
  if (str(drivers)) {
    parts.push(`Expected drivers on policy: ${limit(str(drivers), 40)}`);
  }

  // Preferred contact method
  const contactPref = firstNonEmpty(
    (answers as any).preferredContactMethod,
    (answers as any).contactMethod,
    (answers as any).howWouldYouLikeToContact,
    (answers as any).contactPreference
  );
  if (str(contactPref)) {
    parts.push(`Preferred contact method: ${limit(str(contactPref), 80)}`);
  }

  // Additional notes from client
  const additionalNotes = firstNonEmpty(
    (answers as any).additionalNotes,
    (answers as any).additionalInfo,
    (answers as any).notes,
    (answers as any).comments
  );
  if (str(additionalNotes)) {
    parts.push(`Additional notes: ${limit(str(additionalNotes), 500)}`);
  }

  if (parts.length === 0) return "";

  const body = parts.join("\n\n");
  const fullComment = `Client provided the following information to the best of their ability:\n\n${body}`;
  return limit(fullComment, 2000);
}