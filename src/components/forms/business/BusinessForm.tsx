'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { BusinessFormData, initialBusinessFormData } from './types';
import FormContainer from '../shared/FormContainer';
import FormStep from '../shared/FormStep';
import RecapScreen from '../shared/RecapScreen';
import SuccessAnimation from '../shared/SuccessAnimation';
import AnimatedTransition from '../shared/AnimatedTransition';
import Step1BusinessSearch from './steps/Step1BusinessSearch';
import Step2OwnerInfo from './steps/Step2OwnerInfo';
import Step3BusinessType from './steps/Step3BusinessType';
import Step4Products from './steps/Step4Products';
import Step5BusinessDetails from './steps/Step5BusinessDetails';
import Step6FinalStep, { validateContactInfo } from './steps/Step6FinalStep';
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { Shield, Building2, CheckCircle2, UtensilsCrossed, Store, Wrench, Briefcase, Home, Car, Heart, GraduationCap, Scissors, Dumbbell, Coffee, ShoppingBag, Hammer } from 'lucide-react';
import BusinessMap from './BusinessMap';
import { loadBusinessClassifications } from '@/lib/businessClassifications';
import posthog from 'posthog-js';

export default function BusinessForm() {
  const [isPreloading, setIsPreloading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BusinessFormData>(initialBusinessFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

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
  const lastStepViewedRef = useRef<number | null>(null);

  const [businessClassifications, setBusinessClassifications] = useState<any[]>([]);

  // Preload data before showing form
  useEffect(() => {
    const preloadData = async () => {
      try {
        const [classifications] = await Promise.all([
          loadBusinessClassifications(),
          fetch('/api/agents').then(res => res.json())
        ]);
        setBusinessClassifications(classifications);
      } catch (error) {
        console.error('Error preloading data:', error);
      } finally {
        setIsPreloading(false);
      }
    };
    preloadData();
  }, []);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('businessFormProgress');
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
      posthog.capture('business_form_started', {
        form_type: 'business',
        has_saved_progress: !!saved,
      });
    }
  }, []);

  // Track step viewed (impression) to measure true drop-off points
  useEffect(() => {
    // Avoid duplicate fires on re-render
    if (lastStepViewedRef.current === currentStep) return;
    lastStepViewedRef.current = currentStep;

    posthog.capture('business_form_step_viewed', {
      form_type: 'business',
      step_number: currentStep,
      step_name: getStepName(currentStep),
      has_qr_code: !!qrToken,
      has_agent: !!formData.selectedAgentId,
      agent_locked: agentLocked,
    });
  }, [currentStep, qrToken, agentLocked]);

  // Resolve QR context (URL token if present, otherwise HttpOnly cookie via the API) and lock agent attribution
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const qr = params.get('qr');

    // If token is present in URL, keep it for submission/debugging.
    // If not present, the resolver will fall back to the HttpOnly cookie (pl_qr).
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

          // Override any saved/local selection with the locked agent
          setFormData((prev) => ({
            ...prev,
            selectedAgentId: data.agentId,
          }));
        } else {
          // If not locked, ensure we don't keep stale lock state
          setAgentLocked(false);
          setLockedAgentName(null);
        }
      } catch (e) {
        // If resolve fails, we simply don't lock
        console.error('Failed to resolve QR context:', e);
      }
    })();
  }, []);

  // Save progress whenever formData or currentStep changes
  useEffect(() => {
    if (!isSubmitted) {
      localStorage.setItem('businessFormProgress', JSON.stringify({ formData, currentStep }));
    }
  }, [formData, currentStep, isSubmitted]);

  // Get dynamic icon based on business type
  const getBusinessIcon = () => {
    const genericTypes = ['establishment', 'point_of_interest', 'premise', 'subpremise'];
    const specificType = formData.googleTypes?.find(type => !genericTypes.includes(type));
    
    const iconMap: Record<string, any> = {
      restaurant: UtensilsCrossed,
      food: UtensilsCrossed,
      cafe: Coffee,
      bar: Coffee,
      store: Store,
      shopping_mall: ShoppingBag,
      retail: Store,
      car_repair: Wrench,
      car_dealer: Car,
      auto: Car,
      health: Heart,
      hospital: Heart,
      doctor: Heart,
      gym: Dumbbell,
      fitness: Dumbbell,
      school: GraduationCap,
      university: GraduationCap,
      education: GraduationCap,
      hair_care: Scissors,
      beauty_salon: Scissors,
      spa: Scissors,
      real_estate: Home,
      lawyer: Briefcase,
      accounting: Briefcase,
      finance: Briefcase,
      contractor: Hammer,
      construction: Hammer,
      plumber: Wrench,
      electrician: Wrench,
    };
    
    if (specificType) {
      for (const [key, Icon] of Object.entries(iconMap)) {
        if (specificType.includes(key)) {
          return Icon;
        }
      }
    }
    
    return Building2; // Default icon
  };

  const BusinessIcon = getBusinessIcon();

  const updateFormData = (updates: Partial<BusinessFormData>) => {
    if (agentLocked && 'selectedAgentId' in updates) {
      const next = { ...(updates as any) };
      delete (next as any).selectedAgentId;
      updates = next;
    }

    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const getStepName = (step: number): string => {
    switch (step) {
      case 1: return 'business_search';
      case 2: return 'owner_info';
      case 3: return 'business_type';
      case 4: return 'products';
      case 5: return 'business_details';
      case 6: return 'contact_info';
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
    posthog.capture('business_form_step_completed', {
      form_type: 'business',
      step_number: currentStep,
      step_name: getStepName(currentStep),
      has_qr_code: !!qrToken,
      has_agent: !!formData.selectedAgentId,
      agent_locked: agentLocked,
    });

    setShowValidation(false);
    setSubmitError(null);
    if (currentStep === 2) {
      setShowTransition(true);
    } else if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const getValidationError = (): string => {
    switch (currentStep) {
      case 1:
        if (!formData.streetAddress) return 'Please enter a business address';
        if (!formData.city) return 'Please enter a city';
        if (!formData.state) return 'Please enter a state';
        if (!formData.postalCode) return 'Please enter a ZIP code';
        return 'Please complete all required fields';
      case 2:
        if (!formData.firstName) return 'Please enter your first name';
        if (!formData.lastName) return 'Please enter your last name';
        return 'Please complete all required fields';
      case 3:
        return 'Please select a business type';
      case 4:
        return 'Please select at least one product';
      case 5:
        if (formData.isNewBusiness === null) return 'Please indicate if this is a new business';
        if (formData.isNewBusiness === true && !formData.expectedCoverageDate) return 'Please enter expected coverage date';
        if (formData.isNewBusiness === false && !formData.yearBusinessStarted) return 'Please enter year business started';
        if (!formData.numEmployees) return 'Please enter number of employees';
        if (!formData.annualSales) return 'Please enter annual sales';
        return 'Please complete all required fields';
      case 6:
        if (!formData.email) return 'Please enter your email address';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email address';
        if (formData.phoneNumber && formData.phoneNumber.replace(/\D/g, '').length !== 10) return 'Phone number must be 10 digits if provided';
        if (!turnstileToken) return 'Please complete the verification';
        return 'Please complete all required fields';
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

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setCurrentStep(3);
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
      const answers = {
        ...formData,
        leadSource: formData.leadSource || 'Business Questionnaire',
        tags: (formData as any).tags || 'online',
        agentId: formData.selectedAgentId,
      };

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'business',
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
        posthog.capture('business_form_submission_error', {
          form_type: 'business',
          error: data?.error || `HTTP ${res.status}`,
          step_number: currentStep,
          step_name: getStepName(currentStep),
          has_qr_code: !!qrToken,
          has_agent: !!formData.selectedAgentId,
          agent_locked: agentLocked,
        });
        return;
      }

      posthog.capture('business_form_submitted', {
        form_type: 'business',
        city: formData.city,
        state: formData.state,
        business_type: formData.businessType,
        products_count: formData.products.length,
        is_new_business: formData.isNewBusiness,
        num_employees: formData.numEmployees,
        has_qr_code: !!qrToken,
        step_number: currentStep,
        step_name: getStepName(currentStep),
        has_agent: !!formData.selectedAgentId,
        agent_locked: agentLocked,
      });
      setIsSubmitted(true);
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
      localStorage.removeItem('businessFormProgress'); // Clear saved progress after successful submit
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
        return !!(formData.streetAddress && formData.city && formData.state && formData.postalCode);
      case 2:
        return !!(formData.firstName && formData.lastName);
      case 3:
        return formData.businessType !== '';
      case 4:
        return formData.products.length > 0;
      case 5:
        if (formData.isNewBusiness === null) return false;
        if (formData.isNewBusiness === true && !formData.expectedCoverageDate) return false;
        if (formData.isNewBusiness === false && !formData.yearBusinessStarted) return false;
        return formData.numEmployees !== '' && formData.annualSales !== '';
      case 6:
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

  if (isPreloading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return <SuccessAnimation data={formData} />;
  }

  return (
    <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
      {/* Left Sidebar - Hidden on mobile */}
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
            <BusinessMap latitude={formData.latitude} longitude={formData.longitude} />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center space-y-8 -mt-40 relative z-20">
          <div>
            <BusinessIcon className="w-16 h-16 text-primary mb-6" />
            <h1 className={`font-medium mb-4 transition-all duration-1000 ${
              formData.businessName || formData.streetAddress || formData.businessType || formData.products.length > 0
                ? 'text-5xl'
                : 'text-7xl'
            }`}>
              Business Insurance
              {formData.businessName && (
                <span className="block text-4xl text-white/90 mt-2 animate-in fade-in duration-700">
                  for {formData.businessName}
                </span>
              )}
            </h1>
            <p className="text-white/40 text-lg font-light">Get comprehensive coverage tailored to your business needs</p>
          </div>
        </div>
      </div>

      {/* Right Form Area */}
      <div className="bg-background py-12">
        <FormContainer
          currentStep={currentStep}
          totalSteps={6}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          isLastStep={currentStep === 6}
          canProceed={!!canProceed()}
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
            <Step1BusinessSearch data={formData} onUpdate={updateFormData} showValidation={showValidation} />
          </FormStep>

          <FormStep isActive={currentStep === 2 && !showTransition}>
            <Step2OwnerInfo data={formData} onUpdate={updateFormData} showValidation={showValidation} />
          </FormStep>

          <FormStep isActive={showTransition}>
            <AnimatedTransition
              line1={`Nice to meet you, ${formData.firstName}!`}
              line2="Tell us more about your business!"
              line1ClassName="text-5xl md:text-6xl font-bold text-primary"
              line2ClassName="text-xl md:text-2xl font-medium text-muted-foreground"
              animationType="slideUp"
              duration={3500}
              onComplete={handleTransitionComplete}
            />
          </FormStep>

          <FormStep isActive={currentStep === 3 && !showTransition}>
            <Step3BusinessType data={formData} onUpdate={updateFormData} classifications={businessClassifications} showValidation={showValidation} />
          </FormStep>

          <FormStep isActive={currentStep === 4}>
            <Step4Products data={formData} onUpdate={updateFormData} showValidation={showValidation} />
          </FormStep>

          <FormStep isActive={currentStep === 5}>
            <Step5BusinessDetails data={formData} onUpdate={updateFormData} showValidation={showValidation} />
          </FormStep>

          <FormStep isActive={currentStep === 6}>
            <Step6FinalStep 
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
