'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PlaceResult {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

interface PlacesAutocompleteProps {
  value: string;
  onPlaceSelect: (placeDetails: any) => void;
  onManualEntry: () => void;
  label?: string;
  placeholder?: string;
}

export default function PlacesAutocomplete({
  value,
  onPlaceSelect,
  onManualEntry,
  label = "Business Name or Address",
  placeholder = "Search for business or address..."
}: PlacesAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [predictions, setPredictions] = useState<PlaceResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const fetchPredictions = async (input: string) => {
    if (!input || input.length < 2) {
      setPredictions([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(false);
    try {
      const response = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(input)}`);
      const data = await response.json();
      setPredictions(data.predictions || []);
      setShowDropdown(true);
      setHasSearched(true);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchPredictions(newValue);
    }, 300);
  };

  const handlePlaceSelect = async (placeId: string, description: string) => {
    console.log('🔍 Fetching place details for:', { placeId, description });
    setInputValue(description);
    setShowDropdown(false);
    setPredictions([]);

    try {
      const response = await fetch(`/api/places/details?placeId=${placeId}`);
      const data = await response.json();
      console.log('✅ Place details received:', data);
      console.log('📍 Coordinates from API:', { lat: data.latitude, lng: data.longitude });
      onPlaceSelect(data);
    } catch (error) {
      console.error('❌ Error fetching place details:', error);
    }
  };

  return (
    <div className="relative">
      <Label>{label}</Label>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => inputValue && predictions.length > 0 && setShowDropdown(true)}
        placeholder={placeholder}
        autoComplete="off"
      />
      
      {showDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {predictions.length > 0 ? (
            predictions.map((prediction) => (
              <button
                key={prediction.placeId}
                onClick={() => handlePlaceSelect(prediction.placeId, prediction.description)}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 border-b last:border-b-0 transition-colors"
              >
                <div className="font-medium text-sm">{prediction.mainText}</div>
                <div className="text-xs text-gray-500">{prediction.secondaryText}</div>
              </button>
            ))
          ) : hasSearched && !isLoading ? (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-3">We don't seem to find you</p>
              <Button
                type="button"
                onClick={() => {
                  setShowDropdown(false);
                  onManualEntry();
                }}
                variant="outline"
                size="sm"
              >
                Enter details manually
              </Button>
            </div>
          ) : null}
        </div>
      )}
      
      {isLoading && (
        <div className="absolute right-3 top-9 text-sm text-gray-400">
          Loading...
        </div>
      )}
    </div>
  );
}
