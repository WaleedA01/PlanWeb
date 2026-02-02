'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface AnimatedTransitionProps {
  text: string;
  animationType?: 'fadeIn' | 'typewriter' | 'slideUp';
  gifSrc?: string;
  duration?: number;
  onComplete?: () => void;
}

export default function AnimatedTransition({
  text,
  animationType = 'fadeIn',
  gifSrc,
  duration = 2000,
  onComplete,
}: AnimatedTransitionProps) {
  useEffect(() => {
    if (onComplete && duration) {
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [onComplete, duration]);

  const animationClass = {
    fadeIn: 'animate-[fadeInUp_0.8s_ease-out_forwards]',
    typewriter: 'animate-[fadeInUp_0.8s_ease-out_forwards]', // Can be enhanced later
    slideUp: 'animate-[fadeInUp_1s_ease-out_forwards]',
  }[animationType];

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      {gifSrc && (
        <div className="mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
          <Image src={gifSrc} alt="Loading" width={200} height={200} />
        </div>
      )}
      <h2 className={`text-2xl md:text-3xl font-bold text-foreground opacity-0 ${animationClass}`}>
        {text}
      </h2>
    </div>
  );
}
