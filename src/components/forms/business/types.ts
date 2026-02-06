export interface BusinessFormData {
  // Step 1: Business Info
  businessName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  googleTypes?: string[]; // Business types from Google Places

  // Step 2: Business Type
  businessType: string;

  // Step 3: Products
  products: string[];

  // Step 4: Business Details
  isNewBusiness: boolean | null;
  yearBusinessStarted: string;
  numEmployees: string;
  annualSales: string;
  nextExpirationDate: string;
  expectedCoverageDate: string;

  // Step 5: Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  selectedAgentId: string;
  expectedDate: string;
  preferredContactMethod: string;
  additionalInfo: string;

  // Server routing / metadata (not user-entered fields)
  leadSource?: string;
  tags?: string;
  agent?: string;
}

export const initialBusinessFormData: BusinessFormData = {
  businessName: '',
  streetAddress: '',
  city: '',
  state: '',
  postalCode: '',
  latitude: undefined,
  longitude: undefined,
  businessType: '',
  products: [],
  isNewBusiness: null,
  yearBusinessStarted: '',
  numEmployees: '',
  annualSales: '',
  nextExpirationDate: '',
  expectedCoverageDate: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  selectedAgentId: '',
  expectedDate: '',
  preferredContactMethod: '',
  additionalInfo: '',
  leadSource: '',
  tags: '',
  agent: '',
};
