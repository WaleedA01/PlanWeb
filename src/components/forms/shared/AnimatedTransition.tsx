'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import SplitText from '@/components/SplitText';

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

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      {gifSrc && (
        <div className="mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
          <Image src={gifSrc} alt="Loading" width={200} height={200} />
        </div>
      )}
      <SplitText
        text={text}
        className="text-2xl md:text-3xl font-bold text-foreground"
        delay={30}
        duration={0.8}
        splitType="chars"
        threshold={0}
        tag="h2"
      />
    </div>
  );
}
