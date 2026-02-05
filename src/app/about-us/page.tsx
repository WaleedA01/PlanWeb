import FadeInSection from '@/components/animations/FadeInSection';
import AboutHeroSection from '@/components/sections/about/AboutHeroSection';
import OurStorySection from '@/components/sections/about/OurStorySection';
import OurMissionSection from '@/components/sections/about/OurMissionSection';
import MeetTeamSection from '@/components/sections/about/MeetTeamSection';

export default function AboutUs() {
  return (
    <main>
      <AboutHeroSection />
      
      <FadeInSection>
        <OurStorySection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <OurMissionSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <MeetTeamSection />
      </FadeInSection>
    </main>
  );
}
