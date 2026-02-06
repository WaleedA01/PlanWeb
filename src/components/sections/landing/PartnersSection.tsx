'use client';

import { useState, useEffect } from 'react';
import LogoLoop, { LogoItem } from '@/components/LogoLoop';
import { CARRIERS } from '@/lib/carriers';

export default function PartnersSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const carriers = CARRIERS.map(carrier => ({
    src: carrier.logoSrc,
    alt: carrier.alt,
    title: carrier.name,
  }));

  const firstBelt = carriers.slice(0, 10);
  const secondBelt = carriers.slice(10);

  const renderItem = (item: LogoItem) => (
    <div className="relative group/logo">
      <img
        src={(item as any).src}
        alt={(item as any).alt}
        className="rounded-lg transition-transform"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap opacity-0 group-hover/logo:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
        {(item as any).title}
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Trusted <span className="text-primary">Insurance Partners</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We compare rates from leading carriers to find you the best coverage at the best price
          </p>
        </div>
      </div>

      {/* Logo Loops */}
      <div className="overflow-x-hidden py-6 space-y-4">
        {/* First Belt - Left to Right */}
        <LogoLoop
          logos={firstBelt}
          speed={30}
          logoHeight={isMobile ? 75 : 140}
          gap={isMobile ? 32 : 64}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#f4f5f7"
          renderItem={renderItem}
        />
        
        {/* Second Belt - Right to Left */}
        <LogoLoop
          logos={secondBelt}
          speed={30}
          direction="right"
          logoHeight={isMobile ? 60 : 120}
          gap={isMobile ? 32 : 64}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#f4f5f7"
          renderItem={renderItem}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            <span className="font-semibold text-primary">50+ carriers</span> and counting
          </p>
        </div>
      </div>
    </section>
  );
}
