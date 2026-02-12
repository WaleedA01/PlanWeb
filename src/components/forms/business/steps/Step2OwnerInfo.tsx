'use client';

import { BusinessFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step2Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
  showValidation?: boolean;
}

export default function Step2OwnerInfo({ data, onUpdate, showValidation }: Step2Props) {
  const hasFirstNameError = showValidation && !data.firstName;
  const hasLastNameError = showValidation && !data.lastName;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">How should we greet you?</h2>
        <p className="text-base md:text-lg text-primary">
          Enter the business owner for {data.businessName || 'your business'}
        </p>
      </div>

      <div>
        <Label className={`text-lg mb-2 block ${(hasFirstNameError || hasLastNameError) ? 'text-red-600' : ''}`}>
          Business Owner {(hasFirstNameError || hasLastNameError) && '*'}
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="First Name"
            value={data.firstName}
            onChange={(e) => onUpdate({ firstName: e.target.value })}
            autoFocus
            className={hasFirstNameError ? 'border-red-500' : ''}
          />
          <Input
            placeholder="Last Name"
            value={data.lastName}
            onChange={(e) => onUpdate({ lastName: e.target.value })}
            className={hasLastNameError ? 'border-red-500' : ''}
          />
        </div>
      </div>
    </div>
  );
}
