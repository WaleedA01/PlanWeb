'use client';

import { useState, useEffect } from 'react';
import { BusinessFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PlacesAutocomplete from '../PlacesAutocomplete';

interface Step1Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
  showValidation?: boolean;
}

export default function Step1BusinessSearch({ data, onUpdate }: Step1Props) {
  const [selectedPlace, setSelectedPlace] = useState('');

  useEffect(() => {
    if (data.streetAddress) {
      setSelectedPlace(data.businessName || data.streetAddress);
    }
  }, [data.businessName, data.streetAddress]);

  const handlePlaceSelect = async (placeDetails: any) => {
    const updates = {
      businessName: placeDetails.businessName || '',
      streetAddress: placeDetails.streetAddress,
      city: placeDetails.city,
      state: placeDetails.state,
      postalCode: placeDetails.postalCode,
      latitude: placeDetails.latitude,
      longitude: placeDetails.longitude,
      googleTypes: placeDetails.types || [],
    };
    
    onUpdate(updates);
    setSelectedPlace(placeDetails.businessName || placeDetails.formattedAddress);
  };

  const handleManualEntry = () => {
    // Manual entry handled by PlacesAutocomplete
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Let's get to know you</h2>
        <p className="text-base md:text-lg text-primary">Enter your business name or location</p>
      </div>

      <PlacesAutocomplete
        value={selectedPlace}
        onPlaceSelect={handlePlaceSelect}
        onManualEntry={handleManualEntry}
        label="Business Name or Address"
        placeholder="Search John's Sandwiches or 567 Main St..."
      />

      {data.streetAddress && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div>
            <Label htmlFor="businessName" className="text-lg">Business Name</Label>
            <Input
              id="businessName"
              value={data.businessName}
              onChange={(e) => onUpdate({ businessName: e.target.value })}
              placeholder="Enter business name"
            />
          </div>

          <div>
            <Label htmlFor="streetAddress" className="text-lg">Street Address</Label>
            <Input
              id="streetAddress"
              value={data.streetAddress}
              onChange={(e) => onUpdate({ streetAddress: e.target.value })}
              placeholder="123 Main St"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city" className="text-lg">City</Label>
              <Input
                id="city"
                value={data.city}
                onChange={(e) => onUpdate({ city: e.target.value })}
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="state" className="text-lg">State</Label>
              <Input
                id="state"
                value={data.state}
                onChange={(e) => onUpdate({ state: e.target.value })}
                placeholder="FL"
              />
            </div>
            <div>
              <Label htmlFor="postalCode" className="text-lg">ZIP Code</Label>
              <Input
                id="postalCode"
                value={data.postalCode}
                onChange={(e) => onUpdate({ postalCode: e.target.value })}
                placeholder="33101"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
