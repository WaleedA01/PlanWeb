'use client';

import { useEffect, useState } from 'react';
import { OtherFormData, initialOtherFormData } from './types';
import FormContainer from '../shared/FormContainer';
import FormStep from '../shared/FormStep';
import SuccessAnimation from '../shared/SuccessAnimation';
import Step1AllInfo from './steps/Step1AllInfo';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import { FileText } from 'lucide-react';
import PersonalMap from '../personal/PersonalMap';

export default function OtherForm() {
  const [formData, setFormData] = useState<OtherFormData>(initialOtherFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<any>(null);
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [agentLocked, setAgentLocked] = useState(false);
  const [lockedAgentName, setLockedAgentName] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('otherFormProgress');
    if (saved) {
      try {
        const { formData: savedData } = JSON.parse(saved);
        setFormData(savedData);
      } catch (e) {
        console.error('Failed to load saved progress:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const qr = params.get('qr');

    if (qr) setQrToken(qr);

    (async () => {
      try {
        const url = qr
          ? `/api/qr/resolve?qr=${encodeURIComponent(qr)}`
          : `/api/qr/resolve`;

        const res = await fetch(url);
        const data = await res.json().catch(() => null);

        if (data?.locked && data?.agentId) {
          setAgentLocked(true);
          setLockedAgentName(data?.agentName ?? null);
          setFormData((prev) => ({
            ...prev,
            selectedAgentId: data.agentId,
          }));
        } else {
          setAgentLocked(false);
          setLockedAgentName(null);
        }
      } catch (e) {
        console.error('Failed to resolve QR context:', e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isSubmitted) {
      localStorage.setItem('otherFormProgress', JSON.stringify({ formData }));
    }
  }, [formData, isSubmitted]);

  const updateFormData = (updates: Partial<OtherFormData>) => {
    if (agentLocked && 'selectedAgentId' in updates) {
      const next = { ...(updates as any) };
      delete (next as any).selectedAgentId;
      updates = next;
    }
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSubmitError(null);
    setSubmitResult(null);

    if (!turnstileToken) {
      setSubmitError('Please complete the verification before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const answers = {
        ...formData,
        agentId: formData.selectedAgentId,
      };

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'other',
          answers,
          turnstileToken,
          qr: qrToken,
        }),
      });

      const data = await res.json().catch(() => null);
      setSubmitResult(data);

      if (!res.ok) {
        setSubmitError(data?.error || `Submit failed (HTTP ${res.status})`);
        setTurnstileToken(null);
        setTurnstileKey((k) => k + 1);
        return;
      }

      setIsSubmitted(true);
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
      localStorage.removeItem('otherFormProgress');
    } catch (err: any) {
      setSubmitError(err?.message || 'Network error submitting lead.');
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    // Validate email if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return false;
    }
    
    // Validate phone if provided
    if (formData.phoneNumber) {
      const cleaned = formData.phoneNumber.replace(/\D/g, '');
      if (cleaned.length !== 10) return false;
    }
    
    return (
      formData.firstName &&
      formData.lastName &&
      formData.streetAddress &&
      formData.city &&
      formData.state &&
      formData.postalCode &&
      formData.productInterest &&
      formData.preferredContactMethod &&
      !!turnstileToken
    );
  };

  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isSubmitted]);

  if (isSubmitted) {
    return <SuccessAnimation data={formData} />;
  }

  return (
    <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
      <div className="hidden lg:flex lg:flex-col bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white p-12 sticky top-0 h-screen overflow-y-auto relative">
        {formData.latitude && formData.longitude && (
          <div 
            className="absolute top-0 right-0 w-3/4 h-1/2 opacity-80 animate-[mapFadeIn_0.8s_ease-out_0.3s_forwards] overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%), linear-gradient(to top, transparent 0%, black 80%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%), linear-gradient(to top, transparent 0%, black 80%, black 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }}
          >
            <PersonalMap 
              latitude={formData.latitude} 
              longitude={formData.longitude}
              show3DObject={false}
            />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center space-y-8 -mt-40 relative z-20">
          <div>
            <FileText className="w-16 h-16 text-primary mb-6" />
            <h1 className="text-7xl font-medium mb-4">Other Insurance</h1>
            <p className="text-white/40 text-lg font-light">Tell us what you need and we'll help you find the right coverage</p>
          </div>
        </div>
      </div>

      <div className="bg-background py-12">
        <FormContainer
          currentStep={1}
          totalSteps={1}
          onNext={() => {}}
          onPrevious={() => {}}
          onSubmit={handleSubmit}
          isLastStep={true}
          canProceed={!!canProceed() && !isSubmitting}
          turnstileWidget={
            !turnstileToken ? (
              <TurnstileWidget
                key={turnstileKey}
                onToken={(token: string) => setTurnstileToken(token)}
              />
            ) : null
          }
        >
          <FormStep isActive={true}>
            <Step1AllInfo 
              data={formData} 
              onUpdate={updateFormData}
              agentLocked={agentLocked}
              lockedAgentName={lockedAgentName}
            />

            {submitError && (
              <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p className="font-medium">Unable to proceed:</p>
                <p>{submitError}</p>
              </div>
            )}

            {isSubmitting && (
              <div className="mt-6 text-sm text-gray-600">Submitting…</div>
            )}
          </FormStep>
        </FormContainer>
      </div>
    </div>
  );
}
