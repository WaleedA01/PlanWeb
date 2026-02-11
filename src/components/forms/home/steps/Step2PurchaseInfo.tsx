'use client';

import { HomeFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, FileSignature, Upload, FileText, X } from 'lucide-react';
import { getCarrierNames } from '@/lib/carriers';
import { Combobox } from '@/components/ui/combobox';

interface Step2Props {
  data: HomeFormData;
  onUpdate: (updates: Partial<HomeFormData>) => void;
}

const HOME_INSURERS = [
  'Not Currently Insured',
  ...getCarrierNames('home'),
];

export default function Step2PurchaseInfo({ data, onUpdate }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Purchase Information</h2>
        <p className="text-base md:text-lg text-primary">Tell us about your home purchase</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="mb-3 block text-lg">Is this a new purchase?</Label>
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
                  onClick={() => onUpdate({ isNewPurchase: option.value })}
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

        {data.isNewPurchase === true && (
          <div className="animate-in fade-in duration-500">
            <Label htmlFor="closeDate" className="text-lg">Close Date</Label>
            <Input
              id="closeDate"
              type="date"
              value={data.closeDate}
              onChange={(e) => onUpdate({ closeDate: e.target.value })}
            />
          </div>
        )}

        {data.isNewPurchase === false && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div>
              <Label className="text-lg">Upload existing policy / dec page</Label>
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
                <p className="text-base font-medium">Click to upload policy documents</p>
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
    </div>
  );
}
