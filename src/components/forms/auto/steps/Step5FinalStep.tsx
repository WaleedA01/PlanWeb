'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageSquare } from 'lucide-react';

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
  if (!data.preferredContactMethod) return false;
  
  const method = data.preferredContactMethod;
  
  // Email only: require valid email
  if (method === 'email') {
    if (!data.email || !isValidEmail(data.email)) return false;
    // If phone is provided, it must be valid
    if (data.phoneNumber && !isValidPhone(data.phoneNumber)) return false;
  }
  
  // Phone or Text: require valid phone
  if (method === 'phone' || method === 'text') {
    if (!data.phoneNumber || !isValidPhone(data.phoneNumber)) return false;
    // If email is provided, it must be valid
    if (data.email && !isValidEmail(data.email)) return false;
  }
  
  // Either: require both valid email and phone
  if (method === 'either') {
    if (!data.email || !isValidEmail(data.email)) return false;
    if (!data.phoneNumber || !isValidPhone(data.phoneNumber)) return false;
  }
  
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

  const hasMethodError = showValidation && !data.preferredContactMethod;
  const hasEmailError = showValidation && data.preferredContactMethod && 
    ((data.preferredContactMethod === 'email' || data.preferredContactMethod === 'either') && (!data.email || !isValidEmail(data.email)));
  const hasPhoneError = showValidation && data.preferredContactMethod && 
    ((data.preferredContactMethod === 'phone' || data.preferredContactMethod === 'text' || data.preferredContactMethod === 'either') && (!data.phoneNumber || !isValidPhone(data.phoneNumber)));

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

  const contactMethods = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone', icon: Phone },
    { value: 'text', label: 'Text (SMS)', icon: MessageSquare },
    { value: 'either', label: 'Any', icons: [Mail, Phone, MessageSquare] },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Contact Information</h2>
        <p className="text-base md:text-lg text-primary">How can we reach you?</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className={`mb-3 block text-lg ${hasMethodError ? 'text-red-600' : ''}`}>
            How would you like us to contact you? {hasMethodError && '*'}
          </Label>
          {hasMethodError && (
            <p className="text-sm text-red-600 mb-3">Please select a contact method</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contactMethods.map((method) => {
              const isSelected = data.preferredContactMethod === method.value;
              return (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => onUpdate({ preferredContactMethod: method.value } as Partial<T>)}
                  className={`relative p-6 rounded-xl transition-all duration-200 border-2 hover:shadow-lg ${
                    isSelected
                      ? 'border-primary bg-primary text-white shadow-md'
                      : hasMethodError
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
                    {'icons' in method && method.icons ? (
                      <div className="flex items-center gap-2">
                        {method.icons.map((Icon, i) => (
                          <Icon key={i} className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-primary'}`} />
                        ))}
                      </div>
                    ) : (
                      <method.icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-primary'}`} />
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

        {data.preferredContactMethod === 'email' && (
          <>
            <div className="animate-in fade-in duration-500">
              <Label htmlFor="email" className={`text-lg ${hasEmailError ? 'text-red-600' : ''}`}>
                Email {hasEmailError && '*'}
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="your@email.com"
                className={emailError || hasEmailError ? 'border-red-500' : ''}
              />
              {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
            </div>
            <div className="animate-in fade-in duration-500">
              <Label htmlFor="phoneNumber" className="text-lg">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={data.phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="(555) 123-4567"
                className={phoneError ? 'border-red-500' : ''}
              />
              {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
            </div>
          </>
        )}

        {(data.preferredContactMethod === 'phone' || data.preferredContactMethod === 'text') && (
          <>
            <div className="animate-in fade-in duration-500">
              <Label htmlFor="phoneNumber" className={`text-lg ${hasPhoneError ? 'text-red-600' : ''}`}>
                Phone Number {hasPhoneError && '*'}
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={data.phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="(555) 123-4567"
                className={phoneError || hasPhoneError ? 'border-red-500' : ''}
              />
              {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
            </div>
            <div className="animate-in fade-in duration-500">
              <Label htmlFor="email" className="text-lg">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="your@email.com"
                className={emailError ? 'border-red-500' : ''}
              />
              {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
            </div>
          </>
        )}

        {data.preferredContactMethod === 'either' && (
          <>
            <div className="animate-in fade-in duration-500">
              <Label htmlFor="email" className={`text-lg ${hasEmailError ? 'text-red-600' : ''}`}>
                Email {hasEmailError && '*'}
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="your@email.com"
                className={emailError || hasEmailError ? 'border-red-500' : ''}
              />
              {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
            </div>
            <div className="animate-in fade-in duration-500">
              <Label htmlFor="phoneNumber" className={`text-lg ${hasPhoneError ? 'text-red-600' : ''}`}>
                Phone Number {hasPhoneError && '*'}
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={data.phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="(555) 123-4567"
                className={phoneError || hasPhoneError ? 'border-red-500' : ''}
              />
              {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
            </div>
          </>
        )}

        <div className="animate-in fade-in duration-500">
          <Label htmlFor="additionalNotes" className="text-lg">Additional Notes</Label>
          <Textarea
            id="additionalNotes"
            value={data.additionalNotes}
            onChange={(e) => onUpdate({ additionalNotes: e.target.value } as Partial<T>)}
            placeholder="Tell us anything else we should know..."
            rows={4}
          />
        </div>

        <div className="rounded-xl border-2 border-primary bg-primary/5 p-6">
          <Label className="text-lg mb-3 block">{agentLocked && selectedAgent ? 'Your Agent' : 'One of Our Agents will be in contact Shortly'}</Label>
          {agentLocked && selectedAgent ? (
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
          ) : (
            <p className="text-sm text-muted-foreground">Your data is Protected and will only be shared with your Agent and their team</p>
          )}
        </div>
      </div>
    </div>
  );
}
