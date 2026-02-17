'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8 md:mb-12 px-4 w-full">
      <div className="flex items-center justify-between max-w-full" style={{ width: 'min(100%, 600px)' }}>
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          
          return (
            <div key={step} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="relative flex items-center justify-center flex-shrink-0">
                <div
                  className={`
                    w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm
                    transition-all duration-500 ease-out
                    ${isCompleted 
                      ? 'bg-primary text-white scale-100' 
                      : isCurrent 
                      ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4 md:w-5 md:h-5 animate-in zoom-in duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={isCurrent ? 'animate-in zoom-in duration-300' : ''}>{step}</span>
                  )}
                </div>
                
                {/* Pulse animation for current step */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                )}
              </div>
              
              {/* Connecting Line */}
              {step < totalSteps && (
                <div className="relative flex-1 h-0.5 mx-1 md:mx-2 min-w-0">
                  <div className="absolute inset-0 bg-muted" />
                  <div
                    className={`
                      absolute inset-0 bg-primary transition-all duration-500 ease-out origin-left
                      ${isCompleted ? 'scale-x-100' : 'scale-x-0'}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
