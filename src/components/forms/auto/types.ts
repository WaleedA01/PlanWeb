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
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number | null;
  longitude: number | null;

  // Step 2
  isNewVehicle: boolean | null;
  currentInsurer: string;
  coverageDate: string;
  policyExpirationDate: string;

  // Step 3
  vehicles: Vehicle[];

  // Step 4
  uploadedFiles: File[];

  // Step 5
  preferredContactMethod: 'email' | 'phone' | 'text' | 'either' | '';
  email: string;
  phoneNumber: string;
  additionalNotes: string;
  numDrivers: '1' | '2-3' | '4+' | '';

  // Meta
  selectedAgentId: string;
  leadSource: string;
}
