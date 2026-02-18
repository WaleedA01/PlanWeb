import { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { faqSchema } from '@/lib/structured-data';
import StructuredData from '@/components/StructuredData';
import FadeInSection from '@/components/animations/FadeInSection';
import FAQHeroSection from '@/components/sections/faq/FAQHeroSection';
import FAQAccordionSection from '@/components/sections/faq/FAQAccordionSection';
import FAQCTASection from '@/components/sections/faq/FAQCTASection';

export const metadata: Metadata = pageMetadata.faq;

const faqs = [
  { question: 'How do I get a quote?', answer: 'Getting a quote is simple! Just fill out our online form on the Business or Personal insurance page, and one of our licensed agents will contact you within 1-2 business days with personalized quotes from multiple carriers.' },
  { question: 'How long does it take to get coverage?', answer: 'Once you select your preferred coverage, most policies can be activated within 24-48 hours. Some specialized business policies may take 3-5 business days depending on the carrier and coverage type.' },
  { question: 'What types of insurance do you offer?', answer: 'We offer comprehensive coverage for both business and personal needs. Business insurance includes General Liability, Workers Compensation, Commercial Property, Professional Liability, Commercial Auto, and Cyber Liability. Personal insurance includes Auto, Home, Life, Health, Motorcycle, and Renters insurance.' },
  { question: 'Can I bundle multiple policies?', answer: 'Yes! Bundling multiple policies often results in significant savings. Our agents will help you identify the best bundling opportunities across our carrier network to maximize your savings while ensuring comprehensive coverage.' },
  { question: 'How do you determine my rates?', answer: 'Rates are determined by multiple factors including coverage type, coverage limits, your location, claims history, and risk factors. We work with multiple carriers to compare rates and find you the best price for your specific situation.' },
  { question: 'How do I file a claim?', answer: 'Contact your insurance carrier directly using the claims number on your policy documents, or reach out to your PlanLife agent who can guide you through the claims process and advocate on your behalf.' },
  { question: 'Which insurance carriers do you work with?', answer: 'We partner with leading carriers including Progressive, Geico, Hartford, Liberty Mutual, Safeco, Citizens, AmTrust, Berkshire, and Bristol West. This allows us to compare rates and find you the best coverage at the best price.' },
  { question: 'What makes PlanLife different?', answer: 'We combine personalized service with cutting-edge technology. Our licensed agents take the time to understand your unique needs, while our streamlined process makes getting coverage fast and easy. We shop multiple carriers for you, saving you time and money.' },
];

export default function FAQ() {
  return (
    <main>
      <StructuredData data={faqSchema(faqs)} />
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
