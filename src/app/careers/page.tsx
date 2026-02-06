import FadeInSection from '@/components/animations/FadeInSection';
import CareersHeroSection from '@/components/sections/careers/CareersHeroSection';
import JobListingsSection from '@/components/sections/careers/JobListingsSection';

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
