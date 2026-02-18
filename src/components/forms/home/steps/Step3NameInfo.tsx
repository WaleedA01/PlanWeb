'use client';

import { HomeFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step3Props {
  data: HomeFormData;
  onUpdate: (updates: Partial<HomeFormData>) => void;
  showValidation?: boolean;
}

export default function Step3NameInfo({ data, onUpdate, showValidation }: Step3Props) {
  const hasFirstNameError = showValidation && !data.firstName;
  const hasLastNameError = showValidation && !data.lastName;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">How should we greet you?</h2>
        <p className="text-base md:text-lg text-primary">Tell us your name</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className={`text-lg mb-2 block ${(hasFirstNameError || hasLastNameError) ? 'text-red-600' : ''}`}>
            Your Name {(hasFirstNameError || hasLastNameError) && '*'}
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="First Name"
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
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
    </div>
  );
}
