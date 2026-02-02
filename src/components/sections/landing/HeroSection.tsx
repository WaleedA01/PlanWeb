import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-fit py-8 lg:py-0 flex items-center overflow-hidden bg-gradient-to-br from-[#2a3f52] via-[#1a5a6f] to-[#0da9e4] bg-[length:200%_200%] animate-[gradientShift_8s_ease_infinite]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Desktop: Agent Image anchored to bottom, can extend across full width with fade */}
      <div className="hidden lg:block absolute right-0 bottom-0 w-full min-h-[500px] h-full max-h-[800px] pt-8 z-0 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
        {/* Gradient fade on left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent pointer-events-none z-10"></div>
        <div className="relative w-full h-full flex justify-end">
          <div className="relative w-[70%] h-full">
            <Image
              src="/agents/group/gusjusora.png"
              alt="Insurance Team"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden flex flex-col items-center text-center py-8">
          {/* Text Content */}
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Protect What Matters <span className="text-primary">Most</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-0 max-w-xl mx-auto">
                  We find the best coverage that meets your needs.<br />
                  Don't PlanLife without us.
            </p>
          </div>

          {/* Agent Image - ends exactly at button container */}
          <div className="relative w-full max-w-md h-64 md:h-80 mb-0">
            <Image
              src="/agents/group/gusjusora.png"
              alt="Insurance Team"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
          </div>

          {/* CTA Buttons in container - starts exactly from image */}
          <div className="w-full max-w-md bg-secondary/50 backdrop-blur-sm rounded-lg p-4 sm:p-6">
            <div className="flex flex-col gap-3 mb-4">
              <Button 
                asChild 
                size="lg" 
                className="w-full text-base sm:text-lg px-4 sm:px-8 py-4 sm:py-6 bg-primary hover:bg-primary/90 text-white shadow-lg"
              >
                <Link href="/personal">Get Started</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="w-full text-base sm:text-lg px-4 sm:px-8 py-4 sm:py-6 border-2 border-primary text-primary hover:bg-primary/10"
              >
                <Link href="/contact">Speak to an Agent</Link>
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Local (Florida Based)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Top Carriers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Client Oriented</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block max-w-7xl mx-auto min-h-[600px]">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-left py-16 pt-24 relative">
              {/* Gradient shadow backdrop */}
              <div className="absolute inset-0 -inset-x-8 bg-gradient-to-l from-black/15 via-black/10 to-transparent blur-2xl"></div>
              
              <div className="relative">
                <h1 className="text-5xl xl:text-7xl font-bold text-white mb-6 leading-tight opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
                  Protect What Matters <span className="text-primary">Most</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-xl opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
                  We find the best coverage that meets your needs.<br />
                  Don't PlanLife without us.
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-4 mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
                  <Button 
                    asChild 
                    size="lg" 
                    className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-lg"
                  >
                    <Link href="/personal">Get Started</Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary/10"
                  >
                    <Link href="/contact">Speak to an Agent</Link>
                  </Button>
                </div>

                {/* Trust Badge */}
                <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Local (Florida Based)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Top Carriers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Client Oriented</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right side space for image */}
            <div></div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}
