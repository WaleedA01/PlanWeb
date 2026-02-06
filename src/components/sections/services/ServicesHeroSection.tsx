import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ServicesHeroSection() {
  return (
    <section className="relative min-h-[700px] overflow-hidden bg-gradient-to-br from-[#0da9e4] via-[#3db8e8] to-[#7dd3f0]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Business Icons - Left Side */}
        <div className="absolute top-24 left-[5%] opacity-[0.12] animate-[float_6s_ease-in-out_infinite]">
          <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-[12%] opacity-[0.10] animate-[float_7s_ease-in-out_infinite_1s]">
          <svg className="w-28 h-28 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute top-[50%] left-[8%] opacity-[0.08] animate-[float_8s_ease-in-out_infinite_2s]">
          <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <div className="absolute top-[15%] left-[20%] opacity-[0.08] animate-[float_9s_ease-in-out_infinite_3s]">
          <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        {/* Personal Icons - Right Side */}
        <div className="absolute top-28 right-[8%] opacity-[0.12] animate-[float_6s_ease-in-out_infinite_0.5s]">
          <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </div>
        <div className="absolute bottom-24 right-[15%] opacity-[0.10] animate-[float_7s_ease-in-out_infinite_1.5s]">
          <svg className="w-28 h-28 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
          </svg>
        </div>
        <div className="absolute top-[15%] right-[5%] opacity-[0.08] animate-[float_8s_ease-in-out_infinite_2.5s]">
          <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute top-[55%] right-[10%] opacity-[0.08] animate-[float_9s_ease-in-out_infinite_3.5s]">
          <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        {/* Center Icons */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 opacity-[0.08] animate-[float_7s_ease-in-out_infinite_1s]">
          <svg className="w-28 h-28 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 opacity-[0.10] animate-[float_8s_ease-in-out_infinite_2s]">
          <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 min-h-[700px] flex items-center">
        <div className="w-full py-20">
          {/* Title */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
              Our <span className="text-white underline decoration-4 underline-offset-8">Services.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
              Comprehensive insurance solutions tailored for you
            </p>
          </div>

          {/* Side by Side Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
            {/* Business Card */}
            <Link href="/business" className="group">
              <div className="relative bg-secondary/95 backdrop-blur-sm rounded-3xl p-12 hover:bg-secondary transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full border-4 border-secondary">
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-5xl font-bold text-white mb-6 mt-4">Business Insurance</h2>
                <p className="text-white/90 mb-8 text-lg leading-relaxed">
                  Protect your company with comprehensive coverage including liability, property, workers compensation, and specialized business policies.
                </p>
                <div className="flex items-center text-primary font-semibold text-lg group-hover:gap-3 gap-2 transition-all">
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Personal Card */}
            <Link href="/personal" className="group">
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-12 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full border-4 border-white">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center shadow-xl -rotate-12 group-hover:rotate-0 transition-transform">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <h2 className="text-5xl font-bold text-secondary mb-6 mt-4">Personal Insurance</h2>
                <p className="text-secondary/80 mb-8 text-lg leading-relaxed">
                  Safeguard what matters most with personalized coverage for your home, auto, life, health, and everything in between.
                </p>
                <div className="flex items-center text-primary font-semibold text-lg group-hover:gap-3 gap-2 transition-all">
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
