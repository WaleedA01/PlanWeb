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
}

export default function Step1BusinessInfo({ data, onUpdate }: Step1Props) {
  const [showForm, setShowForm] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState('');

  useEffect(() => {
    if (data.businessName || data.streetAddress) {
      setShowForm(true);
      setSelectedPlace(data.businessName || data.streetAddress);
    }
  }, []);

  const handlePlaceSelect = async (placeDetails: any) => {
    console.log('🔍 Place selected - Full details:', placeDetails);
    console.log('📍 Coordinates:', { lat: placeDetails.latitude, lng: placeDetails.longitude });
    
    // Google Places API already provides lat/lng
    const updates = {
      businessName: placeDetails.businessName || data.businessName,
      streetAddress: placeDetails.streetAddress,
      city: placeDetails.city,
      state: placeDetails.state,
      postalCode: placeDetails.postalCode,
      latitude: placeDetails.latitude,
      longitude: placeDetails.longitude,
      googleTypes: placeDetails.types || [],
    };
    
    console.log('📝 Updating form data with:', updates);
    onUpdate(updates);
    
    setSelectedPlace(placeDetails.businessName || placeDetails.formattedAddress);
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
          <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Enter Your Business Name or Address</h2>
          <p className="text-base md:text-lg text-primary">Find your business and we'll set things up for you!</p>
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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Business Information</h2>
        <p className="text-base md:text-lg text-primary">Review and confirm your details</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={data.businessName}
            onChange={(e) => onUpdate({ businessName: e.target.value })}
            placeholder="Enter business name"
          />
        </div>

        <div>
          <Label htmlFor="streetAddress">Street Address</Label>
          <Input
            id="streetAddress"
            value={data.streetAddress}
            onChange={(e) => onUpdate({ streetAddress: e.target.value })}
            placeholder="123 Main St"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => onUpdate({ city: e.target.value })}
              placeholder="City"
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={data.state}
              onChange={(e) => onUpdate({ state: e.target.value })}
              placeholder="FL"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={data.postalCode}
            onChange={(e) => onUpdate({ postalCode: e.target.value })}
            placeholder="33101"
          />
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="text-sm text-muted-foreground">Not the right place?</span>
          <Button type="button" variant="link" size="sm" onClick={handleEdit} className="h-auto p-0">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
