'use client';

import { useEffect, useState } from 'react';
import { HomeFormData, initialHomeFormData } from './types';
import FormContainer from '../shared/FormContainer';
import FormStep from '../shared/FormStep';
import SuccessAnimation from '../shared/SuccessAnimation';
import AnimatedTransition from '../shared/AnimatedTransition';
import Step1PersonalInfo from './steps/Step1PersonalInfo';
import Step2PurchaseInfo from './steps/Step2PurchaseInfo';
import Step3PropertyFeatures from './steps/Step3PropertyFeatures';
import Step4ContactInfo from './steps/Step4ContactInfo';
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { Home } from 'lucide-react';
import PersonalMap from '../personal/PersonalMap';

export default function HomeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<HomeFormData>(initialHomeFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<any>(null);

  const [qrToken, setQrToken] = useState<string | null>(null);
  const [agentLocked, setAgentLocked] = useState(false);
  const [lockedAgentName, setLockedAgentName] = useState<string | null>(null);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('homeFormProgress');
    if (saved) {
      try {
        const { formData: savedData, currentStep: savedStep } = JSON.parse(saved);
        setFormData(savedData);
        setCurrentStep(savedStep);
      } catch (e) {
        console.error('Failed to load saved progress:', e);
      }
    }
  }, []);

  // Resolve QR context (URL token if present, otherwise HttpOnly cookie via the API) and lock agent attribution
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

  // Save progress whenever formData or currentStep changes
  useEffect(() => {
    if (!isSubmitted) {
      localStorage.setItem('homeFormProgress', JSON.stringify({ formData, currentStep }));
    }
  }, [formData, currentStep, isSubmitted]);

  const updateFormData = (updates: Partial<HomeFormData>) => {
    if (agentLocked && 'selectedAgentId' in updates) {
      const next = { ...(updates as any) };
      delete (next as any).selectedAgentId;
      updates = next;
    }

    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStep === 1) {
      setShowTransition(true);
    } else if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setCurrentStep(2);
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
        leadSource: formData.leadSource || 'Home Questionnaire',
        tags: (formData as any).tags || 'online',
        agentId: formData.selectedAgentId,
      };

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'home',
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
      localStorage.removeItem('homeFormProgress');
    } catch (err: any) {
      setSubmitError(err?.message || 'Network error submitting lead.');
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.streetAddress && formData.city && formData.state && formData.postalCode;
      case 2:
        if (formData.isNewPurchase === null) return false;
        if (formData.isNewPurchase === true) return !!formData.closeDate;
        return !!formData.currentInsurer && !!formData.coverageDate;
      case 3:
        return true; // Property features are optional
      case 4:
        const emailRequired = formData.preferredContactMethod === 'email' || formData.preferredContactMethod === 'either';
        const phoneRequired = formData.preferredContactMethod === 'phone' || formData.preferredContactMethod === 'either';
        return (
          formData.preferredContactMethod &&
          !!turnstileToken &&
          (emailRequired ? !!formData.email : true) &&
          (phoneRequired ? !!formData.phoneNumber : true)
        );
      default:
        return false;
    }
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
      {/* Left Sidebar */}
      <div className="hidden lg:flex lg:flex-col bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white p-12 sticky top-0 h-screen overflow-y-auto relative">
        {/* Background Map */}
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
              show3DObject={true}
              objectType="house"
            />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center space-y-8 -mt-40 relative z-20">
          <div>
            <Home className="w-16 h-16 text-primary mb-6" />
            <h1 className={`font-medium mb-4 transition-all duration-1000 ${
              formData.firstName || formData.streetAddress
                ? 'text-5xl'
                : 'text-7xl'
            }`}>
              Home Insurance
              {formData.firstName && (
                <span className="block text-4xl text-white/90 mt-2 animate-in fade-in duration-700">
                  for {formData.firstName}
                </span>
              )}
            </h1>
            <p className="text-white/40 text-lg font-light">Protect your home with comprehensive coverage</p>
          </div>
        </div>
      </div>

      {/* Right Form Area */}
      <div className="bg-background py-12">
        <FormContainer
          currentStep={currentStep}
          totalSteps={4}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          isLastStep={currentStep === 4}
          canProceed={!!canProceed() && !isSubmitting}
          hideNavigation={showTransition}
          turnstileWidget={
            !turnstileToken ? (
              <TurnstileWidget
                key={turnstileKey}
                onToken={(token: string) => setTurnstileToken(token)}
              />
            ) : null
          }
        >
          <FormStep isActive={currentStep === 1 && !showTransition}>
            <Step1PersonalInfo data={formData} onUpdate={updateFormData} />
          </FormStep>

          <FormStep isActive={showTransition}>
            <AnimatedTransition
              line1="Nice to meet you!"
              line2="Tell us about your home!"
              line1ClassName="text-5xl md:text-6xl font-bold text-primary"
              line2ClassName="text-xl md:text-2xl font-medium text-muted-foreground"
              animationType="slideUp"
              duration={3500}
              onComplete={handleTransitionComplete}
            />
          </FormStep>

          <FormStep isActive={currentStep === 2 && !showTransition}>
            <Step2PurchaseInfo data={formData} onUpdate={updateFormData} />
          </FormStep>

          <FormStep isActive={currentStep === 3}>
            <Step3PropertyFeatures data={formData} onUpdate={updateFormData} />
          </FormStep>

          <FormStep isActive={currentStep === 4}>
            <Step4ContactInfo 
              data={formData} 
              onUpdate={updateFormData}
              agentLocked={agentLocked}
              lockedAgentName={lockedAgentName}
            />

            {submitError && (
              <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {submitError}
              </div>
            )}

            {submitResult && (
              <pre className="mt-6 max-h-64 overflow-auto rounded-md border bg-gray-50 p-3 text-xs">
{JSON.stringify(submitResult, null, 2)}
              </pre>
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
