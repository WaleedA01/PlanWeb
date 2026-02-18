import { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import FadeInSection from '@/components/animations/FadeInSection';
import CareersHeroSection from '@/components/sections/careers/CareersHeroSection';
import JobListingsSection from '@/components/sections/careers/JobListingsSection';

export const metadata: Metadata = pageMetadata.careers;

export default function Careers() {
  return (
    <main>
      <CareersHeroSection />
      
      <FadeInSection>
        <JobListingsSection />
      </FadeInSection>
    </main>
  );
}
