'use client';

import { AutoFormData } from '../types';
import { Upload, FileText, X } from 'lucide-react';
import { useRef } from 'react';

interface Step4Props {
  data: AutoFormData;
  onUpdate: (updates: Partial<AutoFormData>) => void;
}

export default function Step4Documents({ data, onUpdate }: Step4Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onUpdate({ uploadedFiles: [...data.uploadedFiles, ...newFiles] });
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = data.uploadedFiles.filter((_, i) => i !== index);
    onUpdate({ uploadedFiles: updatedFiles });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Help Us Out</h2>
        <p className="text-base md:text-lg text-primary mb-2">Upload your driver's license or declarations page</p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          This is totally optional — we can always figure things out later. This will just help us serve you more efficiently and quicker.
        </p>
      </div>

      <div className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-12 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-primary"
        >
          <Upload className="w-12 h-12" />
          <div className="text-center">
            <p className="text-lg font-medium">Click to upload files</p>
            <p className="text-sm">Driver's license, declarations page, or other documents</p>
          </div>
        </button>

        {data.uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-secondary">Uploaded Files:</p>
            {data.uploadedFiles.map((file, index) => (
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
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
