export interface BusinessClassification {
  code: string;
  description: string;
}

export async function loadBusinessClassifications(): Promise<BusinessClassification[]> {
  const response = await fetch('/documents/business_calssification.csv');
  const text = await response.text();
  
  const lines = text.split('\n').slice(1); // Skip header
  return lines
    .filter(line => line.trim())
    .map(line => {
      const match = line.match(/^([^,]+),"?(.+?)"?\r?$/);
      if (match) {
        return {
          code: match[1].trim(),
          description: match[2].trim()
        };
      }
      return null;
    })
    .filter((item): item is BusinessClassification => item !== null);
}
