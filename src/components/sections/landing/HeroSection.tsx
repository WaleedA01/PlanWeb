import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-fit py-8 lg:py-0 flex items-center overflow-hidden bg-gradient-to-br from-[#0da9e4] via-[#3db8e8] to-[#7dd3f0] bg-[length:200%_200%] animate-[gradientShift_8s_ease_infinite]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Desktop: Agent Image anchored to bottom, can extend across full width with fade */}
      <div className="hidden lg:block absolute right-0 bottom-0 w-full min-h-[500px] h-full max-h-[800px] pt-8 z-0 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
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
        <div className="lg:hidden flex flex-col items-center text-center relative">
          {/* Text Content */}
          <div className="mb-2 relative z-0">
            <h1 className="text-6xl md:text-5xl font-bold text-secondary mb-4 leading-tight">
              Protect What Matters <span className="text-white underline">Most.</span>
            </h1>
          </div>

          {/* Agent Image - overlays bottom of text */}
          <div className="relative w-full max-w-md h-64 md:h-80 mb-0 -mt-4 z-10">
            <Image
              src="/agents/group/gusjusora.png"
              alt="Insurance Team"
              fill
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
          </div>

          {/* CTA Buttons in container - starts exactly from image */}
          <div className="w-full max-w-md bg-white rounded-lg p-4 sm:p-6 mb-4">
            <div className="flex flex-col gap-3">
              <Button 
                asChild 
                size="lg" 
                className="w-full text-2xl sm:text-2xl px-6 sm:px-10 py-6 sm:py-8 bg-secondary hover:bg-secondary/90 text-white shadow-lg font-bold"
              >
                <Link href="/business/form">Get Started</Link>
              </Button>
              <Button 
                asChild 
                size="sm" 
                variant="outline" 
                className="w-full text-base px-4 py-3 border border-secondary text-secondary hover:bg-primary hover:text-white transition-colors"
              >
                <Link href="/contact">Speak to an Agent</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block max-w-7xl mx-auto min-h-[600px]">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-left py-16 pt-24 relative">
              <div className="relative">
                <h1 className="text-5xl xl:text-7xl font-bold text-secondary mb-12 leading-tight opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
                  Protect What Matters <span className="text-white underline">Most.</span>
                </h1>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 max-w-fit opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
                  <Button 
                    asChild 
                    size="lg" 
                    className="text-3xl px-16 py-10 bg-secondary hover:bg-secondary/90 text-white shadow-[0_0_30px_rgba(40,47,87,0.6)] hover:shadow-[0_0_40px_rgba(40,47,87,0.8)] font-bold w-full transition-all"
                  >
                    <Link href="/business/form">Get Started</Link>
                  </Button>
                  <Button 
                    asChild 
                    size="sm" 
                    variant="outline" 
                    className="text-sm px-6 py-3 border border-secondary text-secondary hover:bg-primary hover:text-white w-full transition-colors"
                  >
                    <Link href="/contact">Speak to an Agent</Link>
                  </Button>
                </div>

              </div>
            </div>
            {/* Right side space for image */}
            <div></div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-20  -mb-0.5">
        <svg viewBox="0 0 1440 150" fill="none" className="w-full h-auto">
          <path d="M0 150L60 140C120 130 240 110 360 100C480 90 600 90 720 95C840 100 960 110 1080 115C1200 120 1320 120 1380 120L1440 120V150H1380C1320 150 1200 150 1080 150C960 150 840 150 720 150C600 150 480 150 360 150C240 150 120 150 60 150H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}
