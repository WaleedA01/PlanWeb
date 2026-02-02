'use client';

import { ReactNode } from 'react';

interface FormStepProps {
  children: ReactNode;
  isActive: boolean;
}

export default function FormStep({ children, isActive }: FormStepProps) {
  if (!isActive) return null;

  return (
    <div className="animate-[fadeInUp_0.5s_ease-out_forwards]">
      {children}
    </div>
  );
}
