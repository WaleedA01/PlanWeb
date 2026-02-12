'use client';

import { useState, useEffect } from 'react';
import { AutoFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AddressAutocomplete from '../../personal/AddressAutocomplete';

interface Step1Props {
  data: AutoFormData;
  onUpdate: (updates: Partial<AutoFormData>) => void;
}

export default function Step1PersonalInfo({ data, onUpdate }: Step1Props) {
  const [showForm, setShowForm] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState('');

  useEffect(() => {
    if (data.streetAddress && data.city && data.state) {
      setShowForm(true);
      setSelectedPlace(data.streetAddress);
    }
  }, [data.streetAddress, data.city, data.state]);

  const handlePlaceSelect = async (placeDetails: any) => {
    const updates = {
      streetAddress: placeDetails.streetAddress,
      city: placeDetails.city,
      state: placeDetails.state,
      postalCode: placeDetails.postalCode,
      latitude: placeDetails.latitude,
      longitude: placeDetails.longitude,
    };
    
    onUpdate(updates);
    setSelectedPlace(placeDetails.formattedAddress);
    setShowForm(true);
    setShowManualEntry(false);
  };

  const handleManualEntry = () => {
    setShowManualEntry(true);
    setShowForm(true);
  };

  const handleEdit = () => {
    setShowForm(false);
    setSelectedPlace('');
    setShowManualEntry(false);
  };

  if (!showForm) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Let's get to know you</h2>
          <p className="text-base md:text-lg text-primary">Tell us about yourself</p>
        </div>

        <div>
          <Label className="text-lg mb-2 block">Your Name</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="First Name"
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
            />
            <Input
              placeholder="Last Name"
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
            />
          </div>
        </div>

        <AddressAutocomplete
          value={selectedPlace}
          onPlaceSelect={handlePlaceSelect}
          onManualEntry={handleManualEntry}
          label="Enter your Home/Garaging Address"
          placeholder="Enter your address..."
          tooltip="Enter the address where your vehicle is parked overnight."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Personal Information</h2>
        <p className="text-base md:text-lg text-primary">Review and confirm your details</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-lg mb-2 block">Your Name</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              placeholder="First Name"
            />
            <Input
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
              placeholder="Last Name"
            />
          </div>
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

        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="text-sm text-muted-foreground">Not the right place?</span>
          <button type="button" onClick={handleEdit} className="text-sm text-primary hover:underline">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
