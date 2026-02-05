'use client';

import { useState } from 'react';
import { BusinessFormData, initialBusinessFormData } from './types';
import FormContainer from '../shared/FormContainer';
import FormStep from '../shared/FormStep';
import RecapScreen from '../shared/RecapScreen';
import AnimatedTransition from '../shared/AnimatedTransition';
import Step1BusinessInfo from './steps/Step1BusinessInfo';
import Step2BusinessType from './steps/Step2BusinessType';
import Step3Products from './steps/Step3Products';
import Step4BusinessDetails from './steps/Step4BusinessDetails';
import Step5ContactInfo from './steps/Step5ContactInfo';
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { Shield, Building2, CheckCircle2, UtensilsCrossed, Store, Wrench, Briefcase, Home, Car, Heart, GraduationCap, Scissors, Dumbbell, Coffee, ShoppingBag, Hammer } from 'lucide-react';
import BusinessMap from './BusinessMap';

export default function BusinessForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BusinessFormData>(initialBusinessFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<any>(null);

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
    console.log('🔄 Form data update requested:', updates);
    setFormData((prev) => {
      const newData = { ...prev, ...updates };
      console.log('📊 New form data state:', newData);
      console.log('🗺 Map coordinates:', { lat: newData.latitude, lng: newData.longitude });
      return newData;
    });
  };

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStep === 1) {
      setShowTransition(true);
    } else if (currentStep < 5) {
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
        return formData.businessName && formData.streetAddress && formData.city && formData.state && formData.postalCode;
      case 2:
        return formData.businessType !== '';
      case 3:
        return formData.products.length > 0;
      case 4:
        return formData.isNewBusiness !== null && formData.numEmployees !== '';
      case 5:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phoneNumber &&
          formData.preferredContactMethod &&
          formData.selectedAgentId &&
          !!turnstileToken
        );
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return <RecapScreen data={formData} />;
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
          totalSteps={5}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          isLastStep={currentStep === 5}
          canProceed={!!canProceed() && !isSubmitting}
          hideNavigation={showTransition}
        >
          <FormStep isActive={currentStep === 1 && !showTransition}>
            <Step1BusinessInfo data={formData} onUpdate={updateFormData} />
          </FormStep>

          <FormStep isActive={showTransition}>
            <AnimatedTransition
              text="Great! Nice to meet you. Now let's find you the coverage that meets your needs."
              animationType="slideUp"
              gifSrc="/gifs/thumbup.gif"
              duration={4500}
              onComplete={handleTransitionComplete}
            />
          </FormStep>

          <FormStep isActive={currentStep === 2 && !showTransition}>
            <Step2BusinessType data={formData} onUpdate={updateFormData} />
          </FormStep>

          <FormStep isActive={currentStep === 3}>
            <Step3Products data={formData} onUpdate={updateFormData} />
          </FormStep>

          <FormStep isActive={currentStep === 4}>
            <Step4BusinessDetails data={formData} onUpdate={updateFormData} />
          </FormStep>

          <FormStep isActive={currentStep === 5}>
            <Step5ContactInfo data={formData} onUpdate={updateFormData} />

            <div className="mt-6 space-y-3">
              <TurnstileWidget
                key={turnstileKey}
                onToken={(token: string) => setTurnstileToken(token)}
              />

              {submitError && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              {submitResult && (
                <pre className="max-h-64 overflow-auto rounded-md border bg-gray-50 p-3 text-xs">
{JSON.stringify(submitResult, null, 2)}
                </pre>
              )}

              {isSubmitting && (
                <div className="text-sm text-gray-600">Submitting…</div>
              )}
            </div>
          </FormStep>
        </FormContainer>
      </div>
    </div>
  );
}
