'use client';

import { BusinessFormData } from '../types';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Step2Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
}

const businessTypes = [
  'Retail Store',
  'Restaurant/Food Service',
  'Professional Services',
  'Construction',
  'Healthcare',
  'Technology',
  'Manufacturing',
  'Real Estate',
  'Other',
];

export default function Step2BusinessType({ data, onUpdate }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Business Type</h2>
        <p className="text-muted-foreground">Select the category that best describes your business</p>
      </div>

      <RadioGroup value={data.businessType} onValueChange={(value) => onUpdate({ businessType: value })}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {businessTypes.map((type) => (
            <div
              key={type}
              className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
            >
              <RadioGroupItem value={type} id={type} />
              <Label htmlFor={type} className="cursor-pointer flex-1">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
