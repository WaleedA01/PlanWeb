'use client';

import { useEffect, useState } from 'react';
import { BusinessFormData } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Agent = {
  id: string;
  firstName: string;
  lastName: string;
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
        <p className="text-muted-foreground">How can we reach you?</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              placeholder="John"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <Label className="mb-3 block">How would you like us to contact you?</Label>
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <Label htmlFor="selectedAgentId">Select Agent</Label>
          <select
            id="selectedAgentId"
            value={(data.selectedAgentId as any) ?? ''}
            onChange={(e) => onUpdate({ selectedAgentId: e.target.value } as Partial<BusinessFormData>)}
            disabled={agentsLoading || agents.length === 0}
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
          >
            {agentsLoading ? (
              <option value="">Loading agents…</option>
            ) : agents.length === 0 ? (
              <option value="">No agents available</option>
            ) : (
              agents
                .filter((a) => a.status !== 'inactive')
                .map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.firstName} {a.lastName} — {a.status === 'available' ? 'Available' : 'Unavailable'}
                  </option>
                ))
            )}
          </select>
          {agentsError ? (
            <p className="text-xs text-red-600 mt-1">{agentsError}</p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="additionalInfo">Anything else you'd like the agent to know?</Label>
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
