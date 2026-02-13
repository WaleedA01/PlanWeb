'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

type Agent = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  headshotSrc: string;
  status: 'available' | 'unavailable' | 'inactive';
};

interface ContactFormData {
  email: string;
  phoneNumber: string;
  preferredContactMethod: string;
  smsOptIn: boolean;
  additionalNotes: string;
  selectedAgentId: string;
}

interface Step5FinalStepProps<T extends ContactFormData> {
  data: T;
  onUpdate: (updates: Partial<T>) => void;
  agentLocked?: boolean;
  lockedAgentName?: string | null;
  showValidation?: boolean;
}

const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return value;
  
  const [, area, prefix, line] = match;
  if (line) return `(${area}) ${prefix}-${line}`;
  if (prefix) return `(${area}) ${prefix}`;
  if (area) return `(${area}`;
  return '';
};

const isValidEmail = (email: string): boolean => {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhone = (phone: string): boolean => {
  if (!phone) return true;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
};

export const validateContactInfo = <T extends ContactFormData>(data: T): boolean => {
  if (!data.email || !isValidEmail(data.email)) return false;
  if (!data.phoneNumber || !isValidPhone(data.phoneNumber)) return false;
  return true;
};

export default function Step5FinalStep<T extends ContactFormData>({ 
  data, 
  onUpdate, 
  agentLocked, 
  lockedAgentName,
  showValidation
}: Step5FinalStepProps<T>) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  const hasEmailError = showValidation && (!data.email || !isValidEmail(data.email));
  const hasPhoneError = showValidation && (!data.phoneNumber || !isValidPhone(data.phoneNumber));

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

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    onUpdate({ phoneNumber: formatted } as Partial<T>);
    
    if (value && !isValidPhone(formatted)) {
      setPhoneError('Please enter a valid 10-digit phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleEmailChange = (value: string) => {
    onUpdate({ email: value } as Partial<T>);
    
    if (value && !isValidEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">How would you like us to reach you?</h2>
        <p className="text-base md:text-lg text-primary">Enter your contact info</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="email" className={`text-lg ${hasEmailError ? 'text-red-600' : ''}`}>
            Preferred Email Address {hasEmailError && '*'}
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="your@email.com"
            className={`max-w-sm ${emailError || hasEmailError ? 'border-red-500' : ''}`}
          />
          {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
        </div>

        <div>
          <Label htmlFor="phoneNumber" className={`text-lg ${hasPhoneError ? 'text-red-600' : ''}`}>
            Preferred Phone Number {hasPhoneError && '*'}
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="(555) 123-4567"
            className={`max-w-sm ${phoneError || hasPhoneError ? 'border-red-500' : ''}`}
          />
          {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
          <div className="flex items-center gap-2 mt-3">
            <Checkbox
              id="smsOptIn"
              checked={data.smsOptIn}
              onCheckedChange={(checked) => onUpdate({ smsOptIn: checked === true } as Partial<T>)}
            />
            <Label htmlFor="smsOptIn" className="text-sm font-normal cursor-pointer">
              Text me (SMS) for updates on my quote
            </Label>
          </div>
        </div>

        <div className="animate-in fade-in duration-500">
          <Label htmlFor="additionalNotes" className="text-lg">Anything else you'd like to share?</Label>
          <Textarea
            id="additionalNotes"
            value={data.additionalNotes}
            onChange={(e) => onUpdate({ additionalNotes: e.target.value } as Partial<T>)}
            placeholder="Tell us anything else we should know..."
            rows={4}
          />
        </div>

        <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
          {agentLocked && selectedAgent ? (
            <>
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
            </>
          ) : (
            <div className="flex items-center gap-4">
              <img
                src="/logo-square.png"
                alt="PlanLife Logo"
                className="w-16 h-16 rounded-lg object-contain"
              />
              <p className="text-lg">Your data is Protected and will only be shared with your Agent and their team</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
