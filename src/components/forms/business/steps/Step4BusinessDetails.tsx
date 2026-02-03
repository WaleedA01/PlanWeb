'use client';

import { BusinessFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Step4Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
}

export default function Step4BusinessDetails({ data, onUpdate }: Step4Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Business Details</h2>
        <p className="text-muted-foreground">Tell us more about your business</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="mb-3 block">Is this a new business?</Label>
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
            <Label htmlFor="expectedCoverageDate">Expected Opening Date</Label>
            <Input
              id="expectedCoverageDate"
              type="date"
              value={data.expectedCoverageDate}
              onChange={(e) => onUpdate({ expectedCoverageDate: e.target.value })}
            />
          </div>
        )}

        {data.isNewBusiness === false && (
          <>
            <div>
              <Label htmlFor="yearBusinessStarted">What year was your business founded?</Label>
              <Input
                id="yearBusinessStarted"
                type="number"
                value={data.yearBusinessStarted}
                onChange={(e) => onUpdate({ yearBusinessStarted: e.target.value })}
                placeholder="2020"
              />
            </div>
            <div>
              <Label htmlFor="nextExpirationDate">Next Expiration Date (if applicable)</Label>
              <Input
                id="nextExpirationDate"
                type="date"
                value={data.nextExpirationDate}
                onChange={(e) => onUpdate({ nextExpirationDate: e.target.value })}
              />
            </div>
          </>
        )}

        <div>
          <Label htmlFor="numEmployees">How many employees are involved in your business?</Label>
          <Input
            id="numEmployees"
            value={data.numEmployees}
            onChange={(e) => onUpdate({ numEmployees: e.target.value })}
            placeholder="e.g., 5-10"
          />
        </div>
      </div>
    </div>
  );
}
