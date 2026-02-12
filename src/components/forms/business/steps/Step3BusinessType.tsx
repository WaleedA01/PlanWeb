'use client';

import { BusinessFormData } from '../types';
import { BusinessClassification } from '@/lib/businessClassifications';
import BusinessAutocomplete from '../BusinessAutocomplete';

interface Step2Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
  classifications: BusinessClassification[];
  showValidation?: boolean;
}

export default function Step2BusinessType({ data, onUpdate, classifications, showValidation = false }: Step2Props) {
  const hasError = showValidation && !data.businessType;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Choose Your Business Type</h2>
        <p className="text-base md:text-lg text-primary">Search and select the category that best describes your business</p>
      </div>

      <div>
        {hasError && (
          <p className="text-red-500 text-sm mb-2 font-medium">* Please select a business type to continue</p>
        )}
        <BusinessAutocomplete
          value={data.businessType}
          onChange={(value) => onUpdate({ businessType: value })}
          classifications={classifications}
          hasError={hasError}
        />
      </div>
    </div>
  );
}
