'use client';

import { useEffect, useState } from 'react';
import { AutoFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Users, MessageSquare } from 'lucide-react';

type Agent = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  headshotSrc: string;
  status: 'available' | 'unavailable' | 'inactive';
};

interface Step5Props {
  data: AutoFormData;
  onUpdate: (updates: Partial<AutoFormData>) => void;
  agentLocked?: boolean;
  lockedAgentName?: string;
}

export default function Step5ContactInfo({ data, onUpdate, agentLocked, lockedAgentName }: Step5Props) {
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
  const contactMethods = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone', icon: Phone },
    { value: 'text', label: 'Text (SMS)', icon: MessageSquare },
    { value: 'either', label: 'Any', icons: [Mail, Phone, MessageSquare] },
  ];

  const driverCounts = [
    { value: '1', label: 'Just myself' },
    { value: '2-3', label: '2-3' },
    { value: '4+', label: '4+' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Contact Information</h2>
        <p className="text-base md:text-lg text-primary">How can we reach you?</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="mb-3 block text-lg">How would you like us to contact you?</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contactMethods.map((method) => {
              const isSelected = data.preferredContactMethod === method.value;
              return (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => onUpdate({ preferredContactMethod: method.value as any })}
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
                    {'icons' in method && method.icons ? (
                      <div className="flex items-center gap-2">
                        {method.icons.map((Icon, i) => (
                          <Icon key={i} className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-primary'}`} />
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
              <Label htmlFor="email" className="text-lg">Email *</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            <div className="animate-in fade-in duration-500">
              <Label htmlFor="phoneNumber" className="text-lg">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={data.phoneNumber}
                onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
          </>
        )}

        {(data.preferredContactMethod === 'phone' || data.preferredContactMethod === 'text') && (
          <>
            <div className="animate-in fade-in duration-500">
              <Label htmlFor="phoneNumber" className="text-lg">Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={data.phoneNumber}
                onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="animate-in fade-in duration-500">
              <Label htmlFor="email" className="text-lg">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
          </>
        )}

        {data.preferredContactMethod === 'either' && (
          <>
            <div className="animate-in fade-in duration-500">
              <Label htmlFor="email" className="text-lg">Email *</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            <div className="animate-in fade-in duration-500">
              <Label htmlFor="phoneNumber" className="text-lg">Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={data.phoneNumber}
                onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
          </>
        )}

        <div>
          <Label className="mb-3 block text-lg">How many drivers do you expect to be in the policy?</Label>
          <div className="grid grid-cols-3 gap-4">
            {driverCounts.map((count) => {
              const isSelected = data.numDrivers === count.value;
              return (
                <button
                  key={count.value}
                  type="button"
                  onClick={() => onUpdate({ numDrivers: count.value as any })}
                  className={`relative p-4 rounded-xl transition-all duration-200 border-2 hover:shadow-lg ${
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
                  <div className={`text-center text-base font-medium ${isSelected ? 'text-white' : 'text-secondary'}`}>
                    {count.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

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

        <div>
          <Label htmlFor="additionalNotes" className="text-lg">
            {agentLocked && selectedAgent 
              ? `Anything else you'd like ${selectedAgent.firstName} to know?`
              : "Anything else you'd like the agent to know?"}
          </Label>
          <Textarea
            id="additionalNotes"
            value={data.additionalNotes}
            onChange={(e) => onUpdate({ additionalNotes: e.target.value })}
            placeholder="Any additional information..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
