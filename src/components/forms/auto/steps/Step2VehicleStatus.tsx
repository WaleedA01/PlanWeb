'use client';

import { AutoFormData } from '../types';
import { Label } from '@/components/ui/label';
import { Clock, Calendar, Search } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface Step2Props {
  data: AutoFormData;
  onUpdate: (updates: Partial<AutoFormData>) => void;
  showValidation?: boolean;
}

const COVERAGE_URGENCY: Array<{ value: 'now' | 'week' | 'shopping'; label: string; icon: any }> = [
  { value: 'now', label: 'Need coverage now', icon: Clock },
  { value: 'week', label: 'Need coverage within the week', icon: Calendar },
  { value: 'shopping', label: "I'm shopping around", icon: Search },
];

const VEHICLE_COUNTS: Array<'1' | '2' | '3' | '4' | '5+'> = ['1', '2', '3', '4', '5+'];
const DRIVER_COUNTS: Array<'1' | '2' | '3' | '4' | '5+'> = ['1', '2', '3', '4', '5+'];

export default function Step2VehicleStatus({ data, onUpdate, showValidation = false }: Step2Props) {
  const hasCoverageError = showValidation && !data.coverageUrgency;
  const hasVehiclesError = showValidation && !data.numVehicles;
  const hasDriversError = showValidation && !data.numDrivers;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Let's Get Started</h2>
        <p className="text-base md:text-lg text-primary">Help us understand your needs</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className={`mb-3 block text-lg ${hasCoverageError ? 'text-red-500' : ''}`}>
            How soon do you need coverage? {hasCoverageError && <span className="text-red-500">*</span>}
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COVERAGE_URGENCY.map((option) => {
              const isSelected = data.coverageUrgency === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onUpdate({ coverageUrgency: option.value as 'now' | 'week' | 'shopping' })}
                  className={`relative p-6 rounded-xl transition-all duration-200 border-2 hover:shadow-lg ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-md'
                      : hasCoverageError
                      ? 'border-red-500 hover:border-red-600'
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

        <div>
          <Label className={`mb-3 block text-lg ${hasVehiclesError ? 'text-red-500' : ''}`}>
            Select number of vehicles {hasVehiclesError && <span className="text-red-500">*</span>}
          </Label>
          <div className="grid grid-cols-5 gap-3">
            {VEHICLE_COUNTS.map((count) => {
              const isSelected = data.numVehicles === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => onUpdate({ numVehicles: count as '1' | '2' | '3' | '4' | '5+' })}
                  className={`relative p-4 rounded-xl transition-all duration-200 border-2 hover:shadow-lg ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-md'
                      : hasVehiclesError
                      ? 'border-red-500 hover:border-red-600'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`text-2xl font-bold text-center ${isSelected ? 'text-white' : 'text-secondary'}`}>
                    {count}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Label className={`text-lg mb-0 ${hasDriversError ? 'text-red-500' : ''}`}>
              Select number of drivers {hasDriversError && <span className="text-red-500">*</span>}
            </Label>
            <Tooltip content="Including yourself">
              <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
            </Tooltip>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {DRIVER_COUNTS.map((count) => {
              const isSelected = data.numDrivers === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => onUpdate({ numDrivers: count as '1' | '2' | '3' | '4' | '5+' })}
                  className={`relative p-4 rounded-xl transition-all duration-200 border-2 hover:shadow-lg ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-md'
                      : hasDriversError
                      ? 'border-red-500 hover:border-red-600'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`text-2xl font-bold text-center ${isSelected ? 'text-white' : 'text-secondary'}`}>
                    {count}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
