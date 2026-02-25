'use client';

import { useEffect, useState, useRef } from 'react';
import { HomeFormData, initialHomeFormData } from './types';
import FormContainer from '../shared/FormContainer';
import FormStep from '../shared/FormStep';
import SuccessAnimation from '../shared/SuccessAnimation';
import AnimatedTransition from '../shared/AnimatedTransition';
import Step1PurchaseInfo from './steps/Step1PurchaseInfo';
import Step2AddressInfo from './steps/Step2AddressInfo';
import Step3NameInfo from './steps/Step3NameInfo';
import Step4PropertyFeatures from './steps/Step4PropertyFeatures';
import Step5FinalStep, { validateContactInfo } from './steps/Step5FinalStep';
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { Home } from 'lucide-react';
import PersonalMap from '../personal/PersonalMap';
import posthog from 'posthog-js';

export default function HomeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<HomeFormData>(initialHomeFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTransition1, setShowTransition1] = useState(false);
  const [showTransition2, setShowTransition2] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<any>(null);
  const [showValidation, setShowValidation] = useState(false);

  const [qrToken, setQrToken] = useState<string | null>(null);
  const [agentLocked, setAgentLocked] = useState(false);
  const [lockedAgentName, setLockedAgentName] = useState<string | null>(null);
  const formStartedRef = useRef(false);

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

    // Track form started event (only once per form session)
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      posthog.capture('home_form_started', {
        form_type: 'home',
        has_saved_progress: !!saved,
      });
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

  const getStepName = (step: number): string => {
    switch (step) {
      case 1: return 'purchase_info';
      case 2: return 'address_info';
      case 3: return 'name_info';
      case 4: return 'property_features';
      case 5: return 'contact_info';
      default: return 'unknown';
    }
  };

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!canProceed()) {
      setShowValidation(true);
      setSubmitError(getValidationError());
      return;
    }

    // Track step completion
    posthog.capture('home_form_step_completed', {
      form_type: 'home',
      step_number: currentStep,
      step_name: getStepName(currentStep),
    });

    setShowValidation(false);
    setSubmitError(null);
    if (currentStep === 1) {
      setShowTransition1(true);
    } else if (currentStep === 3) {
      setShowTransition2(true);
    } else if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const getValidationError = (): string => {
    switch (currentStep) {
      case 1:
        if (formData.isNewPurchase === null) return 'Please indicate if this is a new purchase';
        if (formData.isNewPurchase === true && !formData.closeDate) return 'Please enter expected closing date';
        if (formData.isNewPurchase === false && !formData.insuranceStatus) return 'Please select your insurance status';
        return 'Please complete all required fields';
      case 2:
        if (!formData.streetAddress) return 'Please enter your street address';
        if (!formData.city) return 'Please enter your city';
        if (!formData.state) return 'Please enter your state';
        if (!formData.postalCode) return 'Please enter your ZIP code';
        return 'Please complete all required fields';
      case 3:
        if (!formData.firstName) return 'Please enter your first name';
        if (!formData.lastName) return 'Please enter your last name';
        return 'Please complete all required fields';
      case 4:
        if (!formData.propertyUsage) return 'Please select a property usage';
        return 'Please complete all required fields';
      case 5:
        if (!turnstileToken) return 'Please complete the verification';
        return 'Please complete all required contact information';
      default:
        return 'Please complete all required fields';
    }
  };

  const handlePrevious = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleTransition1Complete = () => {
    setShowTransition1(false);
    setCurrentStep(2);
  };

  const handleTransition2Complete = () => {
    setShowTransition2(false);
    setCurrentStep(4);
  };

  const handleSubmit = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (!canProceed()) {
      setShowValidation(true);
      setSubmitError(getValidationError());
      return;
    }
    
    setShowValidation(false);
    setSubmitError(null);
    setSubmitResult(null);

    if (!turnstileToken) {
      setSubmitError('Please complete the verification before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // PRIORITY: Always send to Zapier first (AgencyZoom)
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
        posthog.capture('home_form_submission_error', {
          form_type: 'home',
          error: data?.error || `HTTP ${res.status}`,
        });
        return;
      }

      // SUCCESS: Show success immediately, send files in background
      posthog.capture('home_form_submitted', {
        form_type: 'home',
        city: formData.city,
        state: formData.state,
        property_usage: formData.propertyUsage,
        is_new_purchase: formData.isNewPurchase,
        has_qr_code: !!qrToken,
      });
      setIsSubmitted(true);
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
      localStorage.removeItem('homeFormProgress');

      // ALWAYS send via email endpoint to ensure files are included
      const fileFormData = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'policyFiles' && value !== null && value !== undefined) {
          fileFormData.append(key, String(value));
        }
      });

      formData.policyFiles?.forEach((file) => {
        fileFormData.append('policyFile', file);
      });

      // Fire and forget - don't await
      fetch('/api/submit-with-files', {
        method: 'POST',
        body: fileFormData,
      }).catch((err) => {
        console.error('Background file upload failed:', err);
      });

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
        if (formData.isNewPurchase === null) return false;
        if (formData.isNewPurchase === true) return !!formData.closeDate;
        if (formData.isNewPurchase === false) return !!formData.insuranceStatus;
        return true;
      case 2:
        return formData.streetAddress && formData.city && formData.state && formData.postalCode;
      case 3:
        return formData.firstName && formData.lastName;
      case 4:
        return !!formData.propertyUsage;
      case 5:
        return validateContactInfo(formData) && !!turnstileToken;
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
          totalSteps={5}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          isLastStep={currentStep === 5}
          canProceed={!!canProceed() && !isSubmitting}
          hideNavigation={showTransition1 || showTransition2}
          turnstileWidget={
            !turnstileToken ? (
              <TurnstileWidget
                key={turnstileKey}
                onToken={(token: string) => setTurnstileToken(token)}
              />
            ) : null
          }
        >
          <FormStep isActive={currentStep === 1 && !showTransition1}>
            <Step1PurchaseInfo data={formData} onUpdate={updateFormData} showValidation={showValidation} />
          </FormStep>

          <FormStep isActive={showTransition1}>
            <AnimatedTransition
              line1={formData.isNewPurchase ? "Congrats on the new home!" : "You're in the right place"}
              line2={formData.isNewPurchase ? "Let's get you covered!" : "Let's gather some more details."}
              line1ClassName="text-5xl md:text-6xl font-bold text-primary"
              line2ClassName="text-xl md:text-2xl font-medium text-muted-foreground"
              animationType="slideUp"
              duration={3500}
              onComplete={handleTransition1Complete}
            />
          </FormStep>

          <FormStep isActive={currentStep === 2 && !showTransition1}>
            <Step2AddressInfo data={formData} onUpdate={updateFormData} showValidation={showValidation} />
          </FormStep>

          <FormStep isActive={currentStep === 3 && !showTransition2}>
            <Step3NameInfo data={formData} onUpdate={updateFormData} showValidation={showValidation} />
          </FormStep>

          <FormStep isActive={showTransition2}>
            <AnimatedTransition
              line1={`Nice to meet you, ${formData.firstName}!`}
              line2="We're almost done."
              line1ClassName="text-5xl md:text-6xl font-bold text-primary"
              line2ClassName="text-xl md:text-2xl font-medium text-muted-foreground"
              animationType="slideUp"
              duration={3500}
              onComplete={handleTransition2Complete}
            />
          </FormStep>

          <FormStep isActive={currentStep === 4}>
            <Step4PropertyFeatures data={formData} onUpdate={updateFormData} showValidation={showValidation} />
          </FormStep>

          <FormStep isActive={currentStep === 5}>
            <Step5FinalStep 
              data={formData} 
              onUpdate={updateFormData}
              agentLocked={agentLocked}
              lockedAgentName={lockedAgentName}
              showValidation={showValidation}
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
