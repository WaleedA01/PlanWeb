'use client';

import { HomeFormData } from '../types';
import { Label } from '@/components/ui/label';
import { Waves, Sun, Shield, Home, Bell, Flame, HomeIcon, Key, Palmtree, DoorOpen } from 'lucide-react';

interface Step3Props {
  data: HomeFormData;
  onUpdate: (updates: Partial<HomeFormData>) => void;
}

const PROPERTY_FEATURES = [
  { id: 'pool', label: 'Pool on property', icon: Waves },
  { id: 'solar', label: 'Solar Panels', icon: Sun },
  { id: 'gated', label: 'Gated Community', icon: Shield },
  { id: 'screen', label: 'Screen Enclosure', icon: Home },
  { id: 'burglar', label: 'Burglar Alarm', icon: Bell },
  { id: 'smoke', label: 'Smoke Alarm', icon: Flame },
];

const PROPERTY_USAGE = [
  { value: 'primary', label: 'Primary Residence', icon: HomeIcon },
  { value: 'rental-long', label: 'Rental (Long Term)', icon: Key },
  { value: 'rental-short', label: 'Rental (Short Term)', icon: Key },
  { value: 'vacation', label: 'Vacation Home', icon: Palmtree },
  { value: 'vacant', label: 'Vacant', icon: DoorOpen },
];

export default function Step3PropertyFeatures({ data, onUpdate }: Step3Props) {
  const toggleFeature = (featureId: string) => {
    const currentFeatures = data.propertyFeatures || [];
    const newFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter((f) => f !== featureId)
      : [...currentFeatures, featureId];
    onUpdate({ propertyFeatures: newFeatures });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Property Details</h2>
        <p className="text-base md:text-lg text-primary">Tell us about your property</p>
      </div>

      <div>
        <Label className="mb-3 block text-lg">What is the property usage?</Label>
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

      <div>
        <Label className="mb-3 block text-lg">Property Features (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PROPERTY_FEATURES.map((feature) => {
            const isSelected = data.propertyFeatures?.includes(feature.id);
            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => toggleFeature(feature.id)}
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
                <div className="flex flex-col items-center text-center space-y-3">
                  <feature.icon className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-primary'}`} />
                  <div className={`text-sm font-medium leading-tight ${isSelected ? 'text-white' : 'text-secondary'}`}>
                    {feature.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
