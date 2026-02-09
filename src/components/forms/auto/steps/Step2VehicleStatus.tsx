'use client';

import { AutoFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, ShoppingCart } from 'lucide-react';
import { CARRIERS } from '@/lib/carriers';
import { Combobox } from '@/components/ui/combobox';

interface Step2Props {
  data: AutoFormData;
  onUpdate: (updates: Partial<AutoFormData>) => void;
}

const INSURERS = [
  { id: 'none', name: 'Not Currently Insured' },
  ...CARRIERS.map(c => ({ id: c.id, name: c.name })),
];

export default function Step2VehicleStatus({ data, onUpdate }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Vehicle Information</h2>
        <p className="text-base md:text-lg text-primary">Tell us about your vehicle</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="mb-3 block text-lg">Is this a new vehicle?</Label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: true, label: 'Yes', icon: ShoppingCart },
              { value: false, label: 'No', icon: Car },
            ].map((option) => {
              const isSelected = data.isNewVehicle === option.value;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => onUpdate({ isNewVehicle: option.value })}
                  className={`relative p-6 rounded-xl transition-all duration-200 border-2 hover:shadow-lg ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-md'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  <div className="flex flex-col items-center text-center space-y-2">
                    <option.icon className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-primary'}`} />
                    <div className={`text-base font-medium ${isSelected ? 'text-white' : 'text-secondary'}`}>
                      {option.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {data.isNewVehicle === false && (
          <div className="animate-in fade-in duration-500">
            <Label htmlFor="currentInsurer" className="text-lg">Who are you currently insured with?</Label>
            <Combobox
              value={data.currentInsurer}
              onValueChange={(value: string) => onUpdate({ currentInsurer: value })}
              options={INSURERS.map((insurer) => ({ value: insurer.name, label: insurer.name }))}
              placeholder="Select or type to search..."
            />
          </div>
        )}

        {data.isNewVehicle === true && (
          <div className="animate-in fade-in duration-500">
            <Label htmlFor="coverageDate" className="text-lg">When do you need coverage by?</Label>
            <Input
              id="coverageDate"
              type="date"
              value={data.coverageDate}
              onChange={(e) => onUpdate({ coverageDate: e.target.value })}
            />
          </div>
        )}

        {data.isNewVehicle === false && (
          <div className="animate-in fade-in duration-500">
            <Label htmlFor="policyExpirationDate" className="text-lg">When is your policy expiring?</Label>
            <Input
              id="policyExpirationDate"
              type="date"
              value={data.policyExpirationDate}
              onChange={(e) => onUpdate({ policyExpirationDate: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
