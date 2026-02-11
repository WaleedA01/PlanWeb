export interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: string;
}

export interface AutoFormData {
  // Step 1
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number | null;
  longitude: number | null;

  // Step 2
  coverageUrgency: 'now' | 'week' | 'shopping' | '';
  numVehicles: '1' | '2' | '3' | '4' | '5+' | '';
  numDrivers: '1' | '2' | '3' | '4' | '5+' | '';

  // Step 3
  isCurrentlyInsured: boolean | null;
  currentInsurer: string;

  // Step 4
  policyFiles: File[];
  licenseFiles: File[];
  uploadedFiles: File[];

  // Step 5
  preferredContactMethod: 'email' | 'phone' | 'text' | 'either' | '';
  email: string;
  phoneNumber: string;
  additionalNotes: string;

  // Meta
  selectedAgentId: string;
  leadSource: string;
}
