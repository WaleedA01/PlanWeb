export interface HomeFormData {
  // Step 1: Personal Info & Address
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;

  // Step 2: Purchase Info
  isNewPurchase: boolean | null;
  currentInsurer: string;
  closeDate: string;
  coverageDate: string;

  // Step 3: Property Features
  propertyFeatures: string[];
  propertyUsage: string;

  // Step 4: Contact Info
  email: string;
  phoneNumber: string;
  preferredContactMethod: string;
  additionalInfo: string;

  // Server routing / metadata
  selectedAgentId: string;
  leadSource?: string;
  tags?: string;
}

export const initialHomeFormData: HomeFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  streetAddress: '',
  city: '',
  state: '',
  postalCode: '',
  latitude: undefined,
  longitude: undefined,
  isNewPurchase: null,
  currentInsurer: '',
  closeDate: '',
  coverageDate: '',
  propertyFeatures: [],
  propertyUsage: '',
  email: '',
  phoneNumber: '',
  preferredContactMethod: '',
  additionalInfo: '',
  selectedAgentId: '',
  leadSource: '',
  tags: '',
};
