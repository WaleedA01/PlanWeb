'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface FormContainerProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
  isLastStep?: boolean;
  canProceed?: boolean;
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
}: FormContainerProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="min-h-[400px] mb-8">{children}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
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
            className="px-8 bg-primary hover:bg-primary/90"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
