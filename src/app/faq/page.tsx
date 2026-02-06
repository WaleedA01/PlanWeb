import FadeInSection from '@/components/animations/FadeInSection';
import FAQHeroSection from '@/components/sections/faq/FAQHeroSection';
import FAQAccordionSection from '@/components/sections/faq/FAQAccordionSection';
import FAQCTASection from '@/components/sections/faq/FAQCTASection';

export default function FAQ() {
  return (
    <main>
      <FAQHeroSection />
      
      <FadeInSection>
        <FAQAccordionSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <FAQCTASection />
      </FadeInSection>
    </main>
  );
}
