'use client';

import { useState, useEffect } from 'react';
import { BusinessFormData } from '../types';
import { loadBusinessClassifications, BusinessClassification } from '@/lib/businessClassifications';
import BusinessAutocomplete from '../BusinessAutocomplete';

interface Step2Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
}

export default function Step2BusinessType({ data, onUpdate }: Step2Props) {
  const [classifications, setClassifications] = useState<BusinessClassification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBusinessClassifications()
      .then(data => {
        setClassifications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading classifications:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Business Type</h2>
        <p className="text-muted-foreground">Search and select the category that best describes your business</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading business types...</div>
      ) : (
        <BusinessAutocomplete
          value={data.businessType}
          onChange={(value) => onUpdate({ businessType: value })}
          classifications={classifications}
        />
      )}
    </div>
  );
}
