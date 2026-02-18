'use client';

import { HomeFormData } from '../types';
import { Label } from '@/components/ui/label';
import { HomeIcon, Key, Palmtree, DoorOpen, Upload, FileText, X } from 'lucide-react';

interface Step4Props {
  data: HomeFormData;
  onUpdate: (updates: Partial<HomeFormData>) => void;
  showValidation?: boolean;
}

const PROPERTY_USAGE = [
  { value: 'primary', label: 'Primary Residence', icon: HomeIcon },
  { value: 'rental-long', label: 'Rental (Long Term)', icon: Key },
  { value: 'rental-short', label: 'Rental (Short Term)', icon: Key },
  { value: 'vacation', label: 'Vacation Home', icon: Palmtree },
  { value: 'vacant', label: 'Vacant', icon: DoorOpen },
];

export default function Step4PropertyFeatures({ data, onUpdate, showValidation }: Step4Props) {
  const hasError = showValidation && !data.propertyUsage;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Property Details</h2>
        <p className="text-base md:text-lg text-primary">Tell us about your property</p>
      </div>

      <div>
        <Label className={`mb-3 block text-lg ${hasError ? 'text-red-600' : ''}`}>
          What is the property usage? {hasError && '*'}
        </Label>
        {hasError && (
          <p className="text-sm text-red-600 mb-3">Please select a property usage</p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          {PROPERTY_USAGE.map((usage) => {
            const isSelected = data.propertyUsage === usage.value;
            return (
              <button
                key={usage.value}
                type="button"
                onClick={() => onUpdate({ propertyUsage: usage.value })}
                className={`relative w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(20%-0.8rem)] p-6 rounded-xl transition-all duration-200 border-2 hover:shadow-lg ${
                  isSelected
                    ? 'border-primary bg-primary text-white shadow-md'
                    : hasError
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
                  <usage.icon className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-primary'}`} />
                  <div className={`text-base font-medium ${isSelected ? 'text-white' : 'text-secondary'}`}>
                    {usage.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {data.isNewPurchase === false && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div>
            <Label className="text-lg">Upload your dec page (Optional)</Label>
            <p className="text-sm text-muted-foreground mt-1">This is completely optional and would only supplement the process</p>
          </div>
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            capture="environment"
            onChange={(e) => {
              if (e.target.files) {
                const newFiles = Array.from(e.target.files);
                onUpdate({ policyFiles: [...(data.policyFiles || []), ...newFiles] });
              }
            }}
            className="hidden"
            id="policyUpload"
          />
          <button
            type="button"
            onClick={() => document.getElementById('policyUpload')?.click()}
            className="w-full p-8 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-primary"
          >
            <Upload className="w-10 h-10" />
            <div className="text-center">
              <p className="text-base font-medium">Click to upload dec page</p>
              <p className="text-sm">Declarations page or policy documents</p>
            </div>
          </button>

          {(data.policyFiles || []).length > 0 && (
            <div className="space-y-2">
              {(data.policyFiles || []).map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedFiles = (data.policyFiles || []).filter((_, i) => i !== index);
                      onUpdate({ policyFiles: updatedFiles });
                    }}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
