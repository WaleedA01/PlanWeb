'use client';

import { AutoFormData } from '../types';
import { Upload, FileText, X } from 'lucide-react';
import { useRef } from 'react';
import { Label } from '@/components/ui/label';

interface Step4Props {
  data: AutoFormData;
  onUpdate: (updates: Partial<AutoFormData>) => void;
}

export default function Step4Documents({ data, onUpdate }: Step4Props) {
  const policyFileInputRef = useRef<HTMLInputElement>(null);
  const licenseFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePolicyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onUpdate({ policyFiles: [...(data.policyFiles || []), ...newFiles] });
    }
  };

  const handleLicenseFileChange = (driverIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newLicenseFiles = [...(data.licenseFiles || [])];
      newLicenseFiles[driverIndex] = e.target.files[0];
      onUpdate({ licenseFiles: newLicenseFiles });
    }
  };

  const removePolicyFile = (index: number) => {
    const updatedFiles = (data.policyFiles || []).filter((_, i) => i !== index);
    onUpdate({ policyFiles: updatedFiles });
  };

  const removeLicenseFile = (driverIndex: number) => {
    const newLicenseFiles = [...(data.licenseFiles || [])];
    newLicenseFiles[driverIndex] = undefined as any;
    onUpdate({ licenseFiles: newLicenseFiles.filter(f => f) });
  };

  const numDrivers = parseInt(data.numDrivers) || 1;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Document Upload</h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          This is totally optional — we can always figure things out later. This will just help us serve you more efficiently and quicker.
        </p>
      </div>

      <div className="space-y-8">
        {data.isCurrentlyInsured && (
          <div className="space-y-4">
            <Label className="text-lg">Upload existing policy / dec page</Label>
            <input
              ref={policyFileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              capture="environment"
              onChange={handlePolicyFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => policyFileInputRef.current?.click()}
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
                      onClick={() => removePolicyFile(index)}
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

        <div className="space-y-4">
          <Label className="text-lg">Upload driver's licenses</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: numDrivers }).map((_, driverIndex) => (
              <div key={driverIndex} className="space-y-2">
                <p className="text-xs font-medium text-secondary text-center">Driver {driverIndex + 1}</p>
                <input
                  ref={(el) => { licenseFileInputRefs.current[driverIndex] = el; }}
                  type="file"
                  accept="image/*,.pdf"
                  capture="environment"
                  onChange={(e) => handleLicenseFileChange(driverIndex, e)}
                  className="hidden"
                />
                {data.licenseFiles?.[driverIndex] ? (
                  <div className="relative p-4 bg-secondary/5 rounded-lg border border-border">
                    <button
                      type="button"
                      onClick={() => removeLicenseFile(driverIndex)}
                      className="absolute -top-2 -right-2 p-1 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3 text-red-600" />
                    </button>
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="w-8 h-8 text-primary" />
                      <p className="text-xs text-center truncate w-full">{data.licenseFiles[driverIndex].name}</p>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => licenseFileInputRefs.current[driverIndex]?.click()}
                    className="w-full aspect-square p-4 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                  >
                    <Upload className="w-8 h-8" />
                    <p className="text-xs font-medium text-center">Upload</p>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
