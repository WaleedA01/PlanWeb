'use client';

import { useState } from 'react';
import SuccessAnimation from '@/components/forms/shared/SuccessAnimation';
import { Button } from '@/components/ui/button';
import { BusinessFormData } from '@/components/forms/business/types';

const mockData: BusinessFormData = {
  businessName: 'Acme Restaurant',
  streetAddress: '123 Main Street',
  city: 'Orlando',
  state: 'Florida',
  postalCode: '32801',
  latitude: 28.5383,
  longitude: -81.3792,
  businessType: 'Restaurant',
  products: ['General Liability', 'Commercial Property', 'Workers\' Compensation', 'Commercial Auto'],
  isNewBusiness: false,
  yearBusinessStarted: '2015',
  numEmployees: '10-25',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '(407) 555-1234',
  preferredContactMethod: 'email',
  selectedAgentId: 'gus-aref',
  additionalInfo: '',
  googleTypes: ['restaurant', 'food', 'establishment'],
  leadSource: 'Business Questionnaire',
  nextExpirationDate: '',
  expectedCoverageDate: '',
  expectedDate: '',
};

export default function TestSuccessPage() {
  const [key, setKey] = useState(0);

  const handleReplay = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleReplay}
          size="lg"
          className="bg-secondary hover:bg-secondary/90 shadow-lg"
        >
          🔄 Replay Animation
        </Button>
      </div>
      <div key={key}>
        <SuccessAnimation data={mockData} />
      </div>
    </div>
  );
}
