const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

export async function getMakes(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/GetMakesForVehicleType/car?format=json`);
    const data = await res.json();
    return data.Results.map((r: any) => r.MakeName).sort();
  } catch {
    return [];
  }
}

export async function getModels(make: string, year: string): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`);
    const data = await res.json();
    return data.Results.map((r: any) => r.Model_Name).sort();
  } catch {
    return [];
  }
}

export async function getVehicleType(make: string, model: string, year: string): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`);
    const data = await res.json();
    const vehicle = data.Results.find((r: any) => r.Model_Name === model);
    
    if (vehicle?.VehicleTypeName) {
      const type = vehicle.VehicleTypeName.toLowerCase();
      if (type.includes('truck') || type.includes('pickup')) return 'truck';
      if (type.includes('suv') || type.includes('sport utility')) return 'suv';
      if (type.includes('van') || type.includes('minivan')) return 'van';
      if (type.includes('hatchback')) return 'hatchback';
    }
    
    const modelLower = model.toLowerCase();
    if (modelLower.includes('truck') || modelLower.includes('f-150') || modelLower.includes('silverado') || modelLower.includes('ram')) return 'truck';
    if (modelLower.includes('suv') || modelLower.includes('explorer') || modelLower.includes('tahoe') || modelLower.includes('pilot')) return 'suv';
    if (modelLower.includes('van') || modelLower.includes('odyssey') || modelLower.includes('sienna')) return 'van';
    
    return 'sedan';
  } catch {
    return 'sedan';
  }
}

export function getYears(): string[] {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear + 1; year >= 1985; year--) {
    years.push(year.toString());
  }
  return years;
}

export async function decodeVin(vinNumber: string): Promise<{ make: string; model: string; year: string } | null> {
  try {
    const res = await fetch(`${BASE_URL}/DecodeVin/${vinNumber}?format=json`);
    const data = await res.json();
    
    const results = data.Results;
    const make = results.find((r: any) => r.Variable === 'Make')?.Value;
    const model = results.find((r: any) => r.Variable === 'Model')?.Value;
    const year = results.find((r: any) => r.Variable === 'Model Year')?.Value;
    
    if (make && model && year) {
      return { make, model, year };
    }
    return null;
  } catch {
    return null;
  }
}
