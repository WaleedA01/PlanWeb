'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const steps = [
  {
    number: 1,
    title: 'Tell Us About Your Business',
    description: 'Share information about what you do and what coverage you need. It only takes a few minutes.',
  },
  {
    number: 2,
    title: 'We Shop the Best Policies',
    description: 'An expert agent compares policies from 20+ top carriers to find the best coverage for your needs.',
  },
  {
    number: 3,
    title: 'Choose & Get Covered',
    description: "Your agent helps you choose what's right for you and issues your policy. You're protected!",
  },
];

const SLIDE_DURATION = 6000;

export default function HowItWorksDialog() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / (SLIDE_DURATION / 50));
      });
    }, 50);

    const slideTimer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
      setProgress(0);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideTimer);
    };
  }, [isOpen, currentStep]);

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
          <div className="relative min-h-[250px] flex items-center justify-center">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === currentStep
                    ? 'opacity-100 translate-x-0'
                    : index < currentStep
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
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

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-50 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep ? 'bg-primary w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-8">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/business/form">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
