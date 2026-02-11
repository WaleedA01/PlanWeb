'use client';

import { useEffect, useState } from 'react';
import { OtherFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AddressAutocomplete from '../../shared/AddressAutocomplete';
import { Mail, Phone, MessageSquare } from 'lucide-react';

type Agent = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  headshotSrc: string;
  status: 'available' | 'unavailable' | 'inactive';
};

interface Step1Props {
  data: OtherFormData;
  onUpdate: (updates: Partial<OtherFormData>) => void;
  agentLocked?: boolean;
  lockedAgentName?: string | null;
}

export default function Step1AllInfo({ data, onUpdate, agentLocked, lockedAgentName }: Step1Props) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    if (agentLocked && data.selectedAgentId) {
      fetch('/api/agents')
        .then(res => res.json())
        .then(json => {
          const agent = json.agents?.find((a: Agent) => a.id === data.selectedAgentId);
          if (agent) setSelectedAgent(agent);
        })
        .catch(console.error);
    }
  }, [agentLocked, data.selectedAgentId]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Tell Us About Yourself</h2>
        <p className="text-base md:text-lg text-primary">We'll help you find the right coverage</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName" className="text-lg">First Name</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              placeholder="John"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-lg">Last Name</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="dateOfBirth" className="text-lg">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onUpdate({ dateOfBirth: e.target.value })}
          />
        </div>

        <AddressAutocomplete
          value={data.streetAddress}
          onPlaceSelect={(placeDetails) => {
            onUpdate({
              streetAddress: placeDetails.streetAddress,
              city: placeDetails.city,
              state: placeDetails.state,
              postalCode: placeDetails.postalCode,
              latitude: placeDetails.latitude,
              longitude: placeDetails.longitude,
            });
          }}
          onManualEntry={() => {}}
          label="Address"
          placeholder="Enter your address..."
        />

        {data.streetAddress && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
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
                placeholder="State"
              />
            </div>
            <div>
              <Label htmlFor="postalCode" className="text-lg">ZIP Code</Label>
              <Input
                id="postalCode"
                value={data.postalCode}
                onChange={(e) => onUpdate({ postalCode: e.target.value })}
                placeholder="12345"
              />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="productInterest" className="text-lg">Which product are you interested in?</Label>
          <Select value={data.productInterest} onValueChange={(value) => onUpdate({ productInterest: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="life">Life Insurance</SelectItem>
              <SelectItem value="health">Health Insurance</SelectItem>
              <SelectItem value="disability">Disability Insurance</SelectItem>
              <SelectItem value="umbrella">Umbrella Insurance</SelectItem>
              <SelectItem value="renters">Renters Insurance</SelectItem>
              <SelectItem value="flood">Flood Insurance</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="additionalNotes" className="text-lg">What would you like your agent to know?</Label>
          <Textarea
            id="additionalNotes"
            value={data.additionalNotes}
            onChange={(e) => onUpdate({ additionalNotes: e.target.value })}
            placeholder="Tell us about your insurance needs..."
            rows={4}
          />
        </div>

        <div>
          <Label className="mb-3 block text-lg">How would you like us to contact you?</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 'email', label: 'Email', icon: Mail },
              { value: 'phone', label: 'Phone', icon: Phone },
              { value: 'text', label: 'Text (SMS)', icon: MessageSquare },
              { value: 'either', label: 'Any', icons: [Mail, Phone, MessageSquare] },
            ].map((method) => {
              const isSelected = data.preferredContactMethod === method.value;
              return (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => onUpdate({ preferredContactMethod: method.value })}
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
                  <div className="flex flex-col items-center text-center space-y-2">
                    {'icons' in method ? (
                      <div className="flex items-center gap-2">
                        {method.icons.map((Icon, i) => (
                          <Icon key={i} className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-primary'}`} />
                        ))}
                      </div>
                    ) : (
                      <method.icon className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-primary'}`} />
                    )}
                    <div className={`text-base font-medium ${isSelected ? 'text-white' : 'text-secondary'}`}>
                      {method.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {data.preferredContactMethod && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <Label htmlFor="email" className="text-lg">
                Email {(data.preferredContactMethod === 'email' || data.preferredContactMethod === 'either') && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-lg">
                Phone Number {(data.preferredContactMethod === 'phone' || data.preferredContactMethod === 'text' || data.preferredContactMethod === 'either') && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={data.phoneNumber}
                onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        )}

        {agentLocked && selectedAgent && (
          <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
            <Label className="text-lg mb-3 block">Your Agent</Label>
            <div className="flex items-center gap-4">
              <img
                src={selectedAgent.headshotSrc}
                alt={`${selectedAgent.firstName} ${selectedAgent.lastName}`}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <div className="font-semibold text-xl text-secondary">{selectedAgent.firstName} {selectedAgent.lastName}</div>
                <div className="text-sm text-muted-foreground">{selectedAgent.title}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
