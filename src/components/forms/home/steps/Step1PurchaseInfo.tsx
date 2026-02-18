'use client';

import { HomeFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, FileSignature, Shield, Search } from 'lucide-react';

interface Step1Props {
  data: HomeFormData;
  onUpdate: (updates: Partial<HomeFormData>) => void;
  showValidation?: boolean;
}

export default function Step1PurchaseInfo({ data, onUpdate, showValidation }: Step1Props) {
  const hasNewPurchaseError = showValidation && data.isNewPurchase === null;
  const hasInsuranceStatusError = showValidation && data.isNewPurchase === false && !data.insuranceStatus;
  const hasCloseDateError = showValidation && data.isNewPurchase === true && !data.closeDate;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Let's get started</h2>
        <p className="text-base md:text-lg text-primary">Tell us about your home</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className={`mb-3 block text-lg ${hasNewPurchaseError ? 'text-red-600' : ''}`}>
            Is this a new purchase? {hasNewPurchaseError && '*'}
          </Label>
          {hasNewPurchaseError && (
            <p className="text-sm text-red-600 mb-3">Please select an option</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: true, label: 'Yes', icon: FileSignature },
              { value: false, label: 'No', icon: Home },
            ].map((option) => {
              const isSelected = data.isNewPurchase === option.value;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => onUpdate({ isNewPurchase: option.value, insuranceStatus: '' })}
                  className={`relative p-6 rounded-xl transition-all duration-200 border-2 hover:shadow-lg ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-md'
                      : hasNewPurchaseError
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

        {data.isNewPurchase === true && (
          <div className="animate-in fade-in duration-500">
            <Label htmlFor="closeDate" className={`text-lg ${hasCloseDateError ? 'text-red-600' : ''}`}>
              Close Date {hasCloseDateError && '*'}
            </Label>
            <Input
              id="closeDate"
              type="date"
              value={data.closeDate}
              onChange={(e) => onUpdate({ closeDate: e.target.value })}
              className={hasCloseDateError ? 'border-red-500' : ''}
            />
          </div>
        )}

        {data.isNewPurchase === false && (
          <div className="animate-in fade-in duration-500">
            <Label className={`mb-3 block text-lg ${hasInsuranceStatusError ? 'text-red-600' : ''}`}>
              Which one describes you best? {hasInsuranceStatusError && '*'}
            </Label>
            {hasInsuranceStatusError && (
              <p className="text-sm text-red-600 mb-3">Please select an option</p>
            )}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'currently-insured', label: 'Currently Insured', icon: Shield },
                { value: 'looking-to-insure', label: 'Looking to Insure My Property', icon: Search },
              ].map((option) => {
                const isSelected = data.insuranceStatus === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onUpdate({ insuranceStatus: option.value })}
                    className={`relative p-6 rounded-xl transition-all duration-200 border-2 hover:shadow-lg ${
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-md'
                        : hasInsuranceStatusError
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
        )}
      </div>
    </div>
  );
}
