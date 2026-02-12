'use client';

import { AutoFormData } from '../types';
import { Label } from '@/components/ui/label';
import { Shield, ShieldOff } from 'lucide-react';
import { getCarrierNames } from '@/lib/carriers';
import { Combobox } from '@/components/ui/combobox';

interface Step3Props {
  data: AutoFormData;
  onUpdate: (updates: Partial<AutoFormData>) => void;
  showValidation?: boolean;
}

const AUTO_INSURERS = getCarrierNames('auto');

export default function Step3VehicleDetails({ data, onUpdate, showValidation = false }: Step3Props) {
  const hasInsuredError = showValidation && data.isCurrentlyInsured === null;
  const hasInsurerError = showValidation && data.isCurrentlyInsured === true && !data.currentInsurer;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Insurance Details</h2>
        <p className="text-base md:text-lg text-primary">Tell us about your current coverage</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className={`mb-3 block text-lg ${hasInsuredError ? 'text-red-500' : ''}`}>
            Are you currently insured? {hasInsuredError && <span className="text-red-500">*</span>}
          </Label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: true, label: 'Yes', icon: Shield },
              { value: false, label: 'No', icon: ShieldOff },
            ].map((option) => {
              const isSelected = data.isCurrentlyInsured === option.value;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => onUpdate({ isCurrentlyInsured: option.value, currentInsurer: '' })}
                  className={`relative p-6 rounded-xl transition-all duration-200 border-2 hover:shadow-lg ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-md'
                      : hasInsuredError
                      ? 'border-red-500 hover:border-red-600'
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

        {data.isCurrentlyInsured === true && (
          <div className="animate-in fade-in duration-500">
            <Label htmlFor="currentInsurer" className={`text-lg ${hasInsurerError ? 'text-red-500' : ''}`}>
              Who are you insured with? {hasInsurerError && <span className="text-red-500">*</span>}
            </Label>
            <Combobox
              value={data.currentInsurer}
              onValueChange={(value: string) => onUpdate({ currentInsurer: value })}
              options={AUTO_INSURERS.map((name) => ({ value: name, label: name }))}
              placeholder="Select or type to search..."
              className={hasInsurerError ? 'border-red-500' : ''}
            />
          </div>
        )}
      </div>
    </div>
  );
}
