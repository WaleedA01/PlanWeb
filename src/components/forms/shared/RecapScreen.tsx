'use client';

import { useState, useEffect, useRef } from 'react';
import { BusinessFormData } from '../business/types';
import { AutoFormData } from '../auto/types';
import { HomeFormData } from '../home/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Building2, UtensilsCrossed, Store, Wrench, Briefcase, Home, Car, Heart, GraduationCap, Scissors, Dumbbell, Coffee, ShoppingBag, Hammer, Sparkles } from 'lucide-react';
import DualLocationMap from '../business/DualLocationMap';
import { PRODUCTS } from '@/lib/products';
import { AGENTS } from '@/lib/agents';

interface RecapScreenProps {
  data: BusinessFormData | AutoFormData | HomeFormData;
}

export default function RecapScreen({ data }: RecapScreenProps) {
  const [step, setStep] = useState(0);

  // Detect form type
  const isBusinessForm = 'businessName' in data || 'businessType' in data;
  const isAutoForm = 'numVehicles' in data || 'coverageUrgency' in data;
  const isHomeForm = 'isNewPurchase' in data || 'propertyFeatures' in data;
  
  // Determine coverage type and icon
  const getCoverageInfo = () => {
    if (isAutoForm) return { type: 'Auto', Icon: Car };
    if (isHomeForm) return { type: 'Home', Icon: Home };
    return { type: '', Icon: Building2 };
  };
  
  const { type: coverageType, Icon: CoverageIcon } = getCoverageInfo();

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),   // Subtitle
      setTimeout(() => setStep(2), 1000),  // "Let's recap"
      setTimeout(() => setStep(3), 1500),  // Business card
      setTimeout(() => setStep(4), 2000),  // Products
      setTimeout(() => setStep(5), 3000),  // Contact & Agent
      setTimeout(() => setStep(6), 3500),  // Map
      setTimeout(() => setStep(7), 4000),  // Privacy
      setTimeout(() => setStep(8), 4500),  // Buttons
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Get business icon
  const getBusinessIcon = () => {
    if (!isBusinessForm) return Building2;
    
    const businessData = data as BusinessFormData;
    const genericTypes = ['establishment', 'point_of_interest', 'premise', 'subpremise'];
    const specificType = businessData.googleTypes?.find((type: string) => !genericTypes.includes(type));
    
    const iconMap: Record<string, any> = {
      restaurant: UtensilsCrossed,
      food: UtensilsCrossed,
      cafe: Coffee,
      bar: Coffee,
      store: Store,
      shopping_mall: ShoppingBag,
      retail: Store,
      car_repair: Wrench,
      car_dealer: Car,
      auto: Car,
      health: Heart,
      hospital: Heart,
      doctor: Heart,
      gym: Dumbbell,
      fitness: Dumbbell,
      school: GraduationCap,
      university: GraduationCap,
      education: GraduationCap,
      hair_care: Scissors,
      beauty_salon: Scissors,
      spa: Scissors,
      real_estate: Home,
      lawyer: Briefcase,
      accounting: Briefcase,
      finance: Briefcase,
      contractor: Hammer,
      construction: Hammer,
      plumber: Wrench,
      electrician: Wrench,
    };
    
    if (specificType) {
      for (const [key, Icon] of Object.entries(iconMap)) {
        if (specificType.includes(key)) {
          return Icon;
        }
      }
    }
    
    return Building2;
  };

  const BusinessIcon = getBusinessIcon();
  const selectedAgent = AGENTS.find(a => a.id === data.selectedAgentId);

  // Planlife office location (Orlando, FL)
  const PLANLIFE_LAT = 28.4944597;
  const PLANLIFE_LNG = -81.4739792;

  // Calculate distance in miles using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  const distance = data.latitude && data.longitude 
    ? calculateDistance(data.latitude, data.longitude, PLANLIFE_LAT, PLANLIFE_LNG)
    : null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Thank You */}
        <div className="text-center mb-3 animate-[fadeInUp_0.6s_ease-out_forwards]">
          <h1 className="text-6xl font-bold mb-2 text-secondary">Thank You!</h1>
        </div>

        {/* Subtitle */}
        {step >= 1 && (
          <p className="text-center text-xl text-muted-foreground mb-12 animate-[fadeInUp_0.6s_ease-out_forwards]">
            We've received your information and will be in touch soon.
          </p>
        )}

        {/* Let's Recap */}
        {step >= 2 && (
          <div className="flex items-center justify-center gap-4 mb-8 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <div className="h-[0.5px] bg-border/50 flex-1 max-w-32"></div>
            <h2 className="text-xl font-normal text-muted-foreground whitespace-nowrap">
              Here's a little recap for you!
            </h2>
            <div className="h-[0.5px] bg-border/50 flex-1 max-w-32"></div>
          </div>
        )}

        {/* Business/Coverage Card */}
        {step >= 3 && (
          <div id="business-card" className="bg-card border rounded-xl shadow-sm p-8 mb-6 animate-[fadeInUp_0.6s_ease-out_forwards]">
            {isBusinessForm ? (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <BusinessIcon className="w-12 h-12 text-primary" />
                  <div>
                    <h3 className="text-3xl font-bold text-secondary">{data.businessName}</h3>
                    <p className="text-muted-foreground">{data.businessType}</p>
                  </div>
                </div>
                
                {data.isNewBusiness !== null && (
                  <p className="text-lg text-secondary/80 italic">
                    {data.isNewBusiness 
                      ? "Congrats on opening a new business!" 
                      : data.yearBusinessStarted 
                        ? `Congrats on ${new Date().getFullYear() - parseInt(data.yearBusinessStarted)} years of business!`
                        : data.businessName}
                  </p>
                )}
              </>
            ) : (
              <div className="flex items-center gap-4">
                <CoverageIcon className="w-12 h-12 text-primary" />
                <div>
                  <h3 className="text-3xl font-bold text-secondary">
                    {coverageType} Coverage for {data.firstName}
                  </h3>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Products - Only show for business forms */}
        {step >= 4 && isBusinessForm && data.products && data.products.length > 0 && (
          <div className="bg-card border rounded-xl shadow-sm p-8 mb-6 animate-[fadeInUp_0.6s_ease-out_forwards]">
            {data.products.includes('Expert Consultation') ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-secondary">Coverage Selection</h3>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center mt-1">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-secondary mb-2">
                        You selected <span className="font-bold text-primary">Help me choose</span>
                      </p>
                      <p className="text-muted-foreground">
                        An agent will help you choose products tailored to your needs, and make insurance simple and comprehensive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4 text-secondary">My Products</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {data.products.map((productName, index) => {
                    const product = PRODUCTS.find(p => p.name === productName);
                    if (!product) return null;
                    return (
                      <div
                        key={product.id}
                        className="border-2 border-primary bg-primary text-white rounded-xl p-4 animate-[fadeInUp_0.4s_ease-out_forwards]"
                        style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <product.icon className="w-8 h-8" />
                          <div className="text-xs font-medium leading-tight">{product.name}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Contact & Agent */}
        {step >= 5 && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card border rounded-xl shadow-sm p-6 animate-[fadeInUp_0.6s_ease-out_forwards]">
              <h3 className="text-lg font-semibold mb-4 text-secondary">Your Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Name</span>
                  <span className="font-medium text-secondary">{data.firstName} {data.lastName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Email</span>
                  <span className="font-medium text-secondary break-all">{data.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Phone</span>
                  <span className="font-medium text-secondary">{data.phoneNumber}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Preferred Contact</span>
                  <span className="font-medium text-secondary capitalize">{data.preferredContactMethod}</span>
                </div>
              </div>
            </div>

            {selectedAgent ? (
              <div className="bg-card border rounded-xl shadow-sm overflow-hidden animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
                <div className="p-6 pb-0">
                  <h3 className="text-lg font-semibold mb-2 text-secondary">Your Dedicated Agent</h3>
                  <p className="font-semibold text-lg text-secondary">{selectedAgent.firstName} {selectedAgent.lastName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{selectedAgent.title}</p>
                  <p className="text-sm text-primary font-medium mt-2 mb-4">Will reach out within 1-2 business days</p>
                </div>
                <div className="w-full h-48 bg-primary/10 relative overflow-hidden">
                  <img 
                    src={selectedAgent.headshotSrc} 
                    alt={`${selectedAgent.firstName} ${selectedAgent.lastName}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-card border rounded-xl shadow-sm overflow-hidden animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
                <div className="p-6 pb-2">
                  <h3 className="text-2xl font-semibold mb-1 text-secondary">Our agents are on it!</h3>
                  <p className="text-sm text-primary font-medium mb-3">We'll reach out to you shortly</p>
                </div>
                <div className="w-full">
                  <img
                    src="/agents/group/gusjusora.png"
                    alt="Our team of agents"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Map */}
        {step >= 6 && data.latitude && data.longitude && (
          <div className="bg-card border rounded-xl shadow-sm overflow-hidden mb-6 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <div className="h-64">
              <DualLocationMap 
                businessLat={data.latitude} 
                businessLng={data.longitude}
                planlifeLat={PLANLIFE_LAT}
                planlifeLng={PLANLIFE_LNG}
              />
            </div>
            <div className="p-4 space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Your Location</p>
                <p className="font-medium text-secondary">{data.streetAddress}, {data.city}, {data.state} {data.postalCode}</p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm font-medium text-primary">Proudly your local agency</p>
                {distance !== null && distance < 200 && (
                  <p className="text-sm text-muted-foreground">
                    We're only {distance} miles away, we're practically neighbors!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Privacy Message */}
        {step >= 7 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <p className="text-sm text-blue-900 text-center">
              <strong>Your privacy matters.</strong> <br/>Planlife will never sell your data. If any information is inaccurate, we can correct it later. This is simply an interest form to help us serve you better.
            </p>
          </div>
        )}

        {/* Buttons */}
        {step >= 8 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_0.6s_ease-out_forwards]">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/contact">Call Us Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
