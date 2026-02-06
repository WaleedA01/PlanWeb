'use client';

import { BusinessFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Users, DollarSign } from 'lucide-react';

interface Step4Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
}

const EMPLOYEE_RANGES = [
  { value: '1-5', label: '1-5 Employees' },
  { value: '6-20', label: '6-20 Employees' },
  { value: '21-35', label: '21-35 Employees' },
  { value: '36-49', label: '36-49 Employees' },
  { value: '50+', label: '50+ Employees' },
];

const SALES_RANGES = [
  { value: '<500k', label: 'Less than $500k' },
  { value: '500k-1M', label: '$500k - $1M' },
  { value: '1-2M', label: '$1M - $2M' },
  { value: '2-3M', label: '$2M - $3M' },
  { value: '3M+', label: '$3M+' },
];

export default function Step4BusinessDetails({ data, onUpdate }: Step4Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Business Details</h2>
        <p className="text-base md:text-lg text-primary">Tell us more about your business</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="mb-3 block text-lg">Is this a new business?</Label>
          <RadioGroup
            value={data.isNewBusiness === null ? '' : data.isNewBusiness.toString()}
            onValueChange={(value) => onUpdate({ isNewBusiness: value === '' ? null : value === 'true' })}
          >
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="new-yes" />
                <Label htmlFor="new-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="new-no" />
                <Label htmlFor="new-no">No</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {data.isNewBusiness === true && (
          <div>
            <Label htmlFor="expectedCoverageDate" className="text-lg">Expected Opening Date</Label>
            <Input
              id="expectedCoverageDate"
              type="date"
              value={data.expectedCoverageDate}
              onChange={(e) => onUpdate({ expectedCoverageDate: e.target.value })}
            />
          </div>
        )}

        {data.isNewBusiness === false && (
          <div>
            <Label htmlFor="yearBusinessStarted" className="text-lg">What year was your business founded?</Label>
            <Input
              id="yearBusinessStarted"
              type="number"
              value={data.yearBusinessStarted}
              onChange={(e) => onUpdate({ yearBusinessStarted: e.target.value })}
              placeholder="2020"
            />
          </div>
        )}

        <div>
          <Label className="mb-3 block text-lg">How many employees are involved in your business?</Label>
          <div className="flex flex-wrap justify-center gap-4">
            {EMPLOYEE_RANGES.map((range) => {
              const isSelected = data.numEmployees === range.value;
              return (
                <button
                  key={range.value}
                  type="button"
                  onClick={() => onUpdate({ numEmployees: range.value })}
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
                    <Users className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-primary'}`} />
                    <div className={`text-base font-medium ${isSelected ? 'text-white' : 'text-secondary'}`}>
                      {range.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label className="mb-3 block text-lg">What are your annual sales?</Label>
          <div className="flex flex-wrap justify-center gap-4">
            {SALES_RANGES.map((range) => {
              const isSelected = data.annualSales === range.value;
              return (
                <button
                  key={range.value}
                  type="button"
                  onClick={() => onUpdate({ annualSales: range.value })}
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
                    <DollarSign className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-primary'}`} />
                    <div className={`text-base font-medium ${isSelected ? 'text-white' : 'text-secondary'}`}>
                      {range.label}
                    </div>
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
