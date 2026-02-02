import FadeInSection from '@/components/animations/FadeInSection';
import HeroSection from '@/components/sections/landing/HeroSection';
import GetStartedSection from '@/components/sections/landing/GetStartedSection';
import PartnersSection from '@/components/sections/landing/PartnersSection';
import WhyPlanLifeSection from '@/components/sections/landing/WhyPlanLifeSection';
import WeSpecializeSection from '@/components/sections/landing/WeSpecializeSection';
import TestimonialsSection from '@/components/sections/landing/TestimonialsSection';
import NotSureSection from '@/components/sections/landing/NotSureSection';

export default function Home() {
  return (
    <main>
      {/* Hero - No fade, immediately visible */}
      <HeroSection />

      {/* All other sections fade in on scroll */}
      <FadeInSection>
        <GetStartedSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <PartnersSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <WhyPlanLifeSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <WeSpecializeSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <TestimonialsSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <NotSureSection />
      </FadeInSection>
    </main>
  );
}
