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

  const updateFormData = (updates: Partial<BusinessFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setShowTransition(true);
    } else if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setCurrentStep(2);
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitResult(null);

    if (!turnstileToken) {
      setSubmitError('Please complete the verification before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Include any routing hints you want the backend/Zapier to receive.
      // (These can be overridden server-side later when you add attribution logic.)
      const answers = {
        ...formData,
        // keep these consistent with your existing pipeline tests
        leadSource: formData.leadSource || 'Business Questionnaire',
        tags: (formData as any).tags || 'online',

        // New: stable agent selection (server will resolve to display name / routing)
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
        // Turnstile tokens are single-use; force re-verify
        setTurnstileToken(null);
        setTurnstileKey((k) => k + 1);
        return;
      }

      // Success
      setIsSubmitted(true);

      // reset token/widget to prevent accidental re-submit with same token
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

  // Validation logic for each step
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

  if (showTransition) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <AnimatedTransition
          text="Great! Nice to meet you. Now let's find you the coverage that meets your needs."
          animationType="slideUp"
          gifSrc="/gifs/thumbup.gif"
          duration={4500}
          onComplete={handleTransitionComplete}
        />
      </div>
    );
  }

  return (
    <FormContainer
      currentStep={currentStep}
      totalSteps={5}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
      isLastStep={currentStep === 5}
      canProceed={!!canProceed() && !isSubmitting}
    >
      <FormStep isActive={currentStep === 1}>
        <Step1BusinessInfo data={formData} onUpdate={updateFormData} />
      </FormStep>

      <FormStep isActive={currentStep === 2}>
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
  );
}
