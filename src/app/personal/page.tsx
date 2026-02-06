'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PersonalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#0da9e4] via-[#3db8e8] to-[#7dd3f0] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Personal Insurance
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Protect what matters most with coverage tailored to your needs
            </p>
          </div>

          {/* Main Cards - Auto & Home */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-6">
            <Link href="/personal/auto" className="group">
              <div className="bg-white rounded-3xl p-10 border-4 border-white hover:shadow-2xl transition-all hover:scale-105 h-full relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-5">
                  <svg className="w-40 h-40 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-secondary mb-6 flex items-center gap-3 relative z-10">
                  <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                  Auto Insurance
                </h2>
                <p className="text-muted-foreground mb-6 text-lg relative z-10">
                  Comprehensive coverage for your vehicles with competitive rates
                </p>
                <div className="flex items-center text-primary font-semibold text-lg group-hover:gap-3 gap-2 transition-all relative z-10">
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/personal/home" className="group">
              <div className="bg-secondary backdrop-blur-sm rounded-3xl p-10 border-4 border-secondary hover:shadow-2xl transition-all hover:scale-105 h-full relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-10">
                  <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                  <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Home Insurance
                </h2>
                <p className="text-white/90 mb-6 text-lg relative z-10">
                  Protect your home and belongings with reliable coverage
                </p>
                <div className="flex items-center text-white font-semibold text-lg group-hover:gap-3 gap-2 transition-all relative z-10">
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Cards */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <Link href="/contact" className="group">
              <div className="bg-primary backdrop-blur-sm rounded-3xl p-8 border-4 border-primary hover:shadow-2xl transition-all hover:scale-105 h-full relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-10">
                  <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Life Insurance
                </h3>
                <p className="text-white/90 mb-4 relative z-10">
                  Secure your family's financial future
                </p>
                <div className="flex items-center text-white font-semibold group-hover:gap-2 gap-1 transition-all relative z-10">
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/contact" className="group">
              <div className="bg-primary backdrop-blur-sm rounded-3xl p-8 border-4 border-primary hover:shadow-2xl transition-all hover:scale-105 h-full relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-10">
                  <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m6.364.636l-1.414 1.414M21 12h-2M18.364 17.364l-1.414-1.414M12 19v2m-6.364-3.636l1.414-1.414M3 12h2M5.636 6.636L7.05 5.222M12 8a4 4 0 100 8 4 4 0 000-8z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7.029 3 3 7.029 3 12s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m6.364.636l-1.414 1.414M21 12h-2M18.364 17.364l-1.414-1.414M12 19v2m-6.364-3.636l1.414-1.414M3 12h2M5.636 6.636L7.05 5.222M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                  Umbrella Insurance
                </h3>
                <p className="text-white/90 mb-4 relative z-10">
                  Extra liability protection beyond standard policies
                </p>
                <div className="flex items-center text-white font-semibold group-hover:gap-2 gap-1 transition-all relative z-10">
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/personal/other" className="group">
              <div className="bg-primary backdrop-blur-sm rounded-3xl p-8 border-4 border-primary hover:shadow-2xl transition-all hover:scale-105 h-full relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-10">
                  <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 relative z-10">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Other
                </h3>
                <p className="text-white/90 mb-4 relative z-10">
                  Boat, RV, renters, and specialty coverage
                </p>
                <div className="flex items-center text-white font-semibold group-hover:gap-2 gap-1 transition-all relative z-10">
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 -mb-0.5">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
            <path d="M0 100L60 93C120 87 240 73 360 67C480 60 600 60 720 63C840 67 960 73 1080 77C1200 80 1320 80 1380 80L1440 80V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-secondary mb-12">Why Choose PlanLife?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Tailored Coverage</h3>
                <p className="text-muted-foreground">Personalized policies that fit your unique needs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Top Carriers</h3>
                <p className="text-muted-foreground">Access to leading insurance providers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-2">Expert Support</h3>
                <p className="text-muted-foreground">Dedicated agents to guide you every step</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
