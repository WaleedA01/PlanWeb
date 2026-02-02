export interface BusinessFormData {
  // Step 1: Business Info
  businessName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;

  // Step 2: Business Type
  businessType: string;

  // Step 3: Products
  products: string[];

  // Step 4: Business Details
  isNewBusiness: boolean | null;
  yearBusinessStarted: string;
  numEmployees: string;
  nextExpirationDate: string;
  expectedCoverageDate: string;

  // Step 5: Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  selectedAgent: string;
  expectedDate: string;
  preferredContactMethod: string;
  additionalInfo: string;
}

export const initialBusinessFormData: BusinessFormData = {
  businessName: '',
  streetAddress: '',
  city: '',
  state: '',
  postalCode: '',
  businessType: '',
  products: [],
  isNewBusiness: null,
  yearBusinessStarted: '',
  numEmployees: '',
  nextExpirationDate: '',
  expectedCoverageDate: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  selectedAgent: '',
  expectedDate: '',
  preferredContactMethod: '',
  additionalInfo: '',
};
