'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import SplitText from '@/components/SplitText';

interface AnimatedTransitionProps {
  text?: string;
  line1?: string;
  line2?: string;
  line1ClassName?: string;
  line2ClassName?: string;
  animationType?: 'fadeIn' | 'typewriter' | 'slideUp';
  gifSrc?: string;
  duration?: number;
  onComplete?: () => void;
}

export default function AnimatedTransition({
  text,
  line1,
  line2,
  line1ClassName = "text-2xl md:text-3xl font-bold text-foreground",
  line2ClassName = "text-2xl md:text-3xl font-bold text-foreground",
  animationType = 'fadeIn',
  gifSrc,
  duration = 2000,
  onComplete,
}: AnimatedTransitionProps) {
  const [showLine2, setShowLine2] = useState(false);

  useEffect(() => {
    if (line1 && line2) {
      const timer = setTimeout(() => setShowLine2(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [line1, line2]);

  useEffect(() => {
    if (onComplete && duration) {
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [onComplete, duration]);

  const displayText = text || (line1 && line2 ? `${line1} ${line2}` : '');

  return (
    <div className="flex flex-col items-center justify-start min-h-[400px] text-center px-4 pt-16">
      {gifSrc && (
        <div className="mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
          <Image src={gifSrc} alt="Loading" width={200} height={200} />
        </div>
      )}
      {line1 && line2 ? (
        <div className="space-y-4">
          <SplitText
            text={line1}
            className={line1ClassName}
            delay={30}
            duration={0.8}
            splitType="chars"
            threshold={0}
            tag="h2"
          />
          {showLine2 && (
            <SplitText
              text={line2}
              className={line2ClassName}
              delay={30}
              duration={0.8}
              splitType="chars"
              threshold={0}
              tag="h2"
            />
          )}
        </div>
      ) : (
        <SplitText
          text={displayText}
          className="text-2xl md:text-3xl font-bold text-foreground"
          delay={30}
          duration={0.8}
          splitType="chars"
          threshold={0}
          tag="h2"
        />
      )}
    </div>
  );
}
