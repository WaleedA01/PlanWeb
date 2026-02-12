'use client';

import { useState, useEffect } from 'react';
import { BusinessFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import PlacesAutocomplete from '../PlacesAutocomplete';

interface Step1Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
  substep: 'search' | 'owner' | 'review';
  onSubstepChange: (substep: 'search' | 'owner' | 'review') => void;
}

export default function Step1BusinessInfo({ data, onUpdate, substep, onSubstepChange }: Step1Props) {
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState('');

  // Initialize selected place based on existing data
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
    onSubstepChange('owner');
    setShowManualEntry(false);
  };

  const handleManualEntry = () => {
    setShowManualEntry(true);
    onSubstepChange('owner');
  };

  if (substep === 'search') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Let's get to know you</h2>
          <p className="text-base md:text-lg text-primary">Enter your business name or location and we'll set things up!</p>
        </div>

        <PlacesAutocomplete
          value={selectedPlace}
          onPlaceSelect={handlePlaceSelect}
          onManualEntry={handleManualEntry}
          label="Business Name or Address"
          placeholder="Search John's Sandwiches or 567 Main St..."
        />
      </div>
    );
  }

  if (substep === 'owner') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">How should we greet you?</h2>
          <p className="text-base md:text-lg text-primary">
            Enter the business owner for {data.businessName || 'your business'}
          </p>
        </div>

        <div>
          <Label className="text-lg mb-2 block">Business Owner</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="First Name"
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              autoFocus
            />
            <Input
              placeholder="Last Name"
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Business Information</h2>
        <p className="text-base md:text-lg text-primary">Review and confirm your details</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-lg mb-2 block">Business Owner</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                id="firstName"
                value={data.firstName}
                onChange={(e) => onUpdate({ firstName: e.target.value })}
                placeholder="First Name"
              />
            </div>
            <div>
              <Input
                id="lastName"
                value={data.lastName}
                onChange={(e) => onUpdate({ lastName: e.target.value })}
                placeholder="Last Name"
              />
            </div>
          </div>
        </div>

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

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div>
          <Label htmlFor="postalCode" className="text-lg">Postal Code</Label>
          <Input
            id="postalCode"
            value={data.postalCode}
            onChange={(e) => onUpdate({ postalCode: e.target.value })}
            placeholder="33101"
          />
        </div>
      </div>
    </div>
  );
}
