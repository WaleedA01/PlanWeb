'use client';

import { useEffect, useState } from 'react';
import { BusinessFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronDown } from 'lucide-react';

type Agent = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  headshotSrc: string;
  status: 'available' | 'unavailable' | 'inactive';
};

interface Step5Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
}

export default function Step5ContactInfo({ data, onUpdate }: Step5Props) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentsLoading, setAgentsLoading] = useState(false);
  const [agentsError, setAgentsError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadAgents() {
      setAgentsLoading(true);
      setAgentsError(null);

      try {
        const res = await fetch('/api/agents', { method: 'GET' });
        const json = (await res.json().catch(() => ({}))) as { agents?: Agent[]; error?: string };

        if (!res.ok) {
          throw new Error(json?.error ?? `Failed to load agents (${res.status})`);
        }

        const list = Array.isArray(json.agents) ? json.agents : [];

        if (!cancelled) {
          setAgents(list);

          // Default selection if none picked yet
          if (!data.selectedAgentId && list.length > 0) {
            onUpdate({ selectedAgentId: list[0].id } as Partial<BusinessFormData>);
          }
        }
      } catch (e: any) {
        if (!cancelled) {
          setAgents([]);
          setAgentsError(e?.message ?? 'Failed to load agents');
        }
      } finally {
        if (!cancelled) setAgentsLoading(false);
      }
    }

    loadAgents();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedAgent = agents.find(a => a.id === data.selectedAgentId);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Contact Information</h2>
        <p className="text-base md:text-lg text-primary">How can we reach you?</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
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
          <Label className="mb-3 block text-lg">How would you like us to contact you?</Label>
          <RadioGroup
            value={data.preferredContactMethod}
            onValueChange={(value) => onUpdate({ preferredContactMethod: value })}
          >
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="contact-email" />
                <Label htmlFor="contact-email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="contact-phone" />
                <Label htmlFor="contact-phone">Phone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="either" id="contact-either" />
                <Label htmlFor="contact-either">Either</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="email" className="text-lg">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <Label htmlFor="phoneNumber" className="text-lg">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="relative">
          <Label className="text-lg">Select Agent</Label>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={agentsLoading || agents.length === 0}
            className="w-full mt-1 px-4 py-3 rounded-md border border-input bg-background text-left flex items-center justify-between hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {agentsLoading ? (
              <span className="text-sm text-gray-500">Loading agents…</span>
            ) : selectedAgent ? (
              <div className="flex items-center gap-3">
                <img
                  src={selectedAgent.headshotSrc}
                  alt={`${selectedAgent.firstName} ${selectedAgent.lastName}`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <div className="font-semibold text-lg">{selectedAgent.firstName} {selectedAgent.lastName}</div>
                  <div className="text-sm text-gray-500">{selectedAgent.title}</div>
                </div>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Select an agent</span>
            )}
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && agents.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-80 overflow-auto">
              {agents
                .filter((a) => a.status !== 'inactive')
                .map((agent) => (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => {
                      onUpdate({ selectedAgentId: agent.id } as Partial<BusinessFormData>);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0 transition-colors flex items-center gap-3 ${
                      data.selectedAgentId === agent.id ? 'bg-primary/5' : ''
                    }`}
                  >
                    <img
                      src={agent.headshotSrc}
                      alt={`${agent.firstName} ${agent.lastName}`}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-semibold text-lg">{agent.firstName} {agent.lastName}</div>
                      <div className="text-sm text-gray-500">{agent.title}</div>
                    </div>
                  </button>
                ))}
            </div>
          )}

          {agentsError && (
            <p className="text-xs text-red-600 mt-1">{agentsError}</p>
          )}
        </div>

        <div>
          <Label htmlFor="additionalInfo" className="text-lg">Anything else you'd like the agent to know?</Label>
          <Textarea
            id="additionalInfo"
            value={data.additionalInfo}
            onChange={(e) => onUpdate({ additionalInfo: e.target.value })}
            placeholder="Additional information..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
