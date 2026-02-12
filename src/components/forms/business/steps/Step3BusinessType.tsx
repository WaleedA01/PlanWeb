'use client';

import { BusinessFormData } from '../types';
import { BusinessClassification } from '@/lib/businessClassifications';
import BusinessAutocomplete from '../BusinessAutocomplete';

interface Step2Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
  classifications: BusinessClassification[];
}

export default function Step2BusinessType({ data, onUpdate, classifications }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Choose Your Business Type</h2>
        <p className="text-base md:text-lg text-primary">Search and select the category that best describes your business</p>
      </div>

      <BusinessAutocomplete
        value={data.businessType}
        onChange={(value) => onUpdate({ businessType: value })}
        classifications={classifications}
      />
    </div>
  );
}
