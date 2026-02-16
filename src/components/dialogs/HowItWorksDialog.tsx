'use client';

import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import posthog from 'posthog-js';

const steps = [
  {
    number: 1,
    title: 'Provide Your Business Details',
    description: 'Share information about what you do and what coverage you need. It only takes a few minutes.',
  },
  {
    number: 2,
    title: 'Pick Your Plan',
    description: 'An expert agent compares policies from 20+ top carriers to find the best coverage for your needs.',
  },
  {
    number: 3,
    title: 'Protect Your Business',
    description: "Your agent helps you choose what's right for you and issues your policy. You're protected!",
  },
];

const AUTO_ADVANCE_DURATION = 4000;

export default function HowItWorksDialog() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
  };

  const startTimer = () => {
    resetTimer();

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / (AUTO_ADVANCE_DURATION / 50));
      });
    }, 50);

    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
      setProgress(0);
    }, AUTO_ADVANCE_DURATION);
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
    startTimer();
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
    startTimer();
  };

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      resetTimer();
      return;
    }

    // Track dialog opened
    posthog.capture('how_it_works_dialog_opened');

    startTimer();

    return () => {
      resetTimer();
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-white/10">
          How does this work?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl rounded-2xl">
        <DialogTitle className="text-2xl font-bold text-center mb-4">How It Works</DialogTitle>
        <div className="py-4">
          {/* Step Content */}
          <div className="mb-4 overflow-hidden">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`transition-all duration-500 ${
                  index === currentStep 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4 h-0 overflow-hidden'
                }`}
              >
                <div className="flex flex-col items-center text-center px-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-primary font-bold text-3xl">{step.number}</span>
                  </div>
                  <h3 className="font-semibold text-2xl mb-4">{step.title}</h3>
                  <p className="text-muted-foreground text-lg max-w-md">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 shadow transition-all hover:scale-110"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 shadow transition-all hover:scale-110"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>

          {/* Dots Indicator with Progress */}
          <div className="flex justify-center gap-2 mt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all relative overflow-hidden ${
                  index === currentStep ? 'w-8 bg-gray-200' : 'w-2 bg-gray-300'
                }`}
              >
                {index === currentStep && (
                  <div
                    className="absolute inset-0 bg-primary transition-all duration-50 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-8">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              <Link href="/business/form">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
