export interface OtherFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number | null;
  longitude: number | null;
  productInterest: string;
  additionalNotes: string;
  preferredContactMethod: string;
  email: string;
  phoneNumber: string;
  selectedAgentId: string;
  leadSource: string;
}

export const initialOtherFormData: OtherFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  streetAddress: '',
  city: '',
  state: '',
  postalCode: '',
  latitude: null,
  longitude: null,
  productInterest: '',
  additionalNotes: '',
  preferredContactMethod: '',
  email: '',
  phoneNumber: '',
  selectedAgentId: '',
  leadSource: 'Other Questionnaire',
};
