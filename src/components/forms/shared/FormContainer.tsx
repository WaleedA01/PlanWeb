'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import StepIndicator from './StepIndicator';
import DataPrivacy from './DataPrivacy';

interface FormContainerProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
  isLastStep?: boolean;
  canProceed?: boolean;
  hideNavigation?: boolean;
  turnstileWidget?: ReactNode;
  hasDocuments?: boolean;
}

export default function FormContainer({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  isLastStep = false,
  canProceed = true,
  hideNavigation = false,
  turnstileWidget,
  hasDocuments = false,
}: FormContainerProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Step Indicator */}
      {totalSteps > 1 && <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />}

      {/* Form Content */}
      <div className="min-h-[400px] mb-32">{children}</div>

      {/* Navigation Buttons */}
      {!hideNavigation && (
        <>
          <div className={`flex justify-between gap-4 ${!canProceed ? 'pointer-events-none' : ''}`}>
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              disabled={currentStep === 1}
              className="px-8"
            >
              Previous
            </Button>
            {isLastStep ? (
              <Button
                type="button"
                onClick={onSubmit}
                disabled={!canProceed}
                className="px-8 bg-primary hover:bg-primary/90"
              >
                Submit
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onNext}
                disabled={!canProceed}
                className={`bg-primary hover:bg-primary/90 ${
                  currentStep === 4 && !hasDocuments ? 'px-16 py-6 text-lg' : 'px-8'
                }`}
              >
                {currentStep === 4 && !hasDocuments ? 'Skip →' : 'Next'}
              </Button>
            )}
          </div>
          {isLastStep && turnstileWidget && (
            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">Verifying you're a human</p>
              {turnstileWidget}
            </div>
          )}
          <div className="mt-12">
            <DataPrivacy />
          </div>
        </>
      )}
    </div>
  );
}
