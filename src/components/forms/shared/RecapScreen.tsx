'use client';

import { useState, useEffect, useRef } from 'react';
import { BusinessFormData } from '../business/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Building2, UtensilsCrossed, Store, Wrench, Briefcase, Home, Car, Heart, GraduationCap, Scissors, Dumbbell, Coffee, ShoppingBag, Hammer, Sparkles } from 'lucide-react';
import DualLocationMap from '../business/DualLocationMap';
import { PRODUCTS } from '@/lib/products';
import { AGENTS } from '@/lib/agents';

interface RecapScreenProps {
  data: BusinessFormData;
}

export default function RecapScreen({ data }: RecapScreenProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),   // Subtitle
      setTimeout(() => setStep(2), 1000),  // "Let's recap"
      setTimeout(() => setStep(3), 1500),  // Business card
      setTimeout(() => setStep(4), 2000),  // Map
      setTimeout(() => setStep(5), 2500),  // Products
      setTimeout(() => setStep(6), 3500),  // Contact
      setTimeout(() => setStep(7), 4000),  // Privacy
      setTimeout(() => setStep(8), 4500),  // Buttons
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Get business icon
  const getBusinessIcon = () => {
    const genericTypes = ['establishment', 'point_of_interest', 'premise', 'subpremise'];
    const specificType = data.googleTypes?.find(type => !genericTypes.includes(type));
    
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
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Thank You */}
        <div className="text-center mb-3 animate-[fadeInUp_0.6s_ease-out_forwards]">
          <h1 className="text-6xl font-bold mb-2 text-white">Thank You!</h1>
        </div>

        {/* Subtitle */}
        {step >= 1 && (
          <p className="text-center text-xl text-white/70 mb-12 animate-[fadeInUp_0.6s_ease-out_forwards]">
            We've received your information and will be in touch soon.
          </p>
        )}

        {/* Let's Recap */}
        {step >= 2 && (
          <div className="flex items-center justify-center gap-4 mb-8 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <div className="h-[0.5px] bg-white/30 flex-1 max-w-32"></div>
            <h2 className="text-xl font-normal text-white/70 whitespace-nowrap">
              Here's a little recap for you!
            </h2>
            <div className="h-[0.5px] bg-white/30 flex-1 max-w-32"></div>
          </div>
        )}

        {/* Business Card */}
        {step >= 3 && (
          <div id="business-card" className="bg-white rounded-xl shadow-lg p-8 mb-6 animate-[fadeInUp_0.6s_ease-out_forwards]">
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
                    : "Congrats on your business!"}
              </p>
            )}
          </div>
        )}

        {/* Map */}
        {step >= 4 && data.latitude && data.longitude && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 animate-[fadeInUp_0.6s_ease-out_forwards]">
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

        {/* Products */}
        {step >= 5 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <h3 className="text-xl font-semibold mb-4 text-secondary">Selected Products</h3>
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
          </div>
        )}

        {/* Contact & Agent */}
        {step >= 6 && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6 animate-[fadeInUp_0.6s_ease-out_forwards]">
              <h3 className="text-lg font-semibold mb-4 text-secondary">Your Contact Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Name:</span> <span className="font-medium text-secondary">{data.firstName} {data.lastName}</span></p>
                <p><span className="text-muted-foreground">Email:</span> <span className="font-medium text-secondary">{data.email}</span></p>
                <p><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-secondary">{data.phoneNumber}</span></p>
                <p><span className="text-muted-foreground">Preferred Contact:</span> <span className="font-medium text-secondary">{data.preferredContactMethod}</span></p>
              </div>
            </div>

            {selectedAgent && (
              <div className="bg-white rounded-xl shadow-lg p-6 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
                <h3 className="text-lg font-semibold mb-4 text-secondary">Your Dedicated Agent</h3>
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedAgent.headshotSrc} 
                    alt={`${selectedAgent.firstName} ${selectedAgent.lastName}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-lg text-secondary">{selectedAgent.firstName} {selectedAgent.lastName}</p>
                    <p className="text-sm text-muted-foreground">{selectedAgent.title}</p>
                    <p className="text-sm text-primary font-medium mt-1">Will reach out within 1-2 business days</p>
                  </div>
                </div>
              </div>
            )}
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
              <Link href="/contact">Speak to an Agent</Link>
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
