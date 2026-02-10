'use client';

import { useState, useEffect } from 'react';
import { BusinessFormData } from '../business/types';
import { CheckCircle, Handshake } from 'lucide-react';
import { AGENTS } from '@/lib/agents';
import { CARRIERS } from '@/lib/carriers';
import RecapScreen from './RecapScreen';
import SplitText from '@/components/SplitText';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';

interface SuccessAnimationProps {
  data: BusinessFormData | any;
}

const CARRIER_LOGOS = CARRIERS.map(c => c.logoSrc);
const CARRIERS_INNER = CARRIER_LOGOS.slice(0, 5);
const CARRIERS_OUTER = CARRIER_LOGOS.slice(5);

export default function SuccessAnimation({ data }: SuccessAnimationProps) {
  const [stage, setStage] = useState(-1); // Start at -1 for preloading
  const [fadeOut, setFadeOut] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [checkAnimationComplete, setCheckAnimationComplete] = useState(false);
  const selectedAgent = AGENTS.find(a => a.id === data.selectedAgentId);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Preload all images
  useEffect(() => {
    const imagesToLoad = [
      ...CARRIER_LOGOS,
      selectedAgent?.fullImageSrc,
      selectedAgent?.headshotSrc,
    ].filter(Boolean) as string[];

    let loadedCount = 0;
    const totalImages = imagesToLoad.length;

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, [selectedAgent]);

  // Start animation sequence once images are loaded
  useEffect(() => {
    if (!imagesLoaded) return;

    // Start with stage 0 once images are ready
    setStage(0);

    const timers = [
      // Stage 0 -> 1
      setTimeout(() => setFadeOut(true), 5000),
      setTimeout(() => { setFadeOut(false); setStage(1); }, 5500),
      // Stage 1 -> 2
      setTimeout(() => setFadeOut(true), 11500),
      setTimeout(() => { setFadeOut(false); setStage(2); }, 12000),
      // Stage 2 -> 3
      setTimeout(() => setFadeOut(true), 17000),
      setTimeout(() => { setFadeOut(false); setStage(3); }, 17500),
      // Stage 3 -> 4
      setTimeout(() => setFadeOut(true), 25000),
      setTimeout(() => { setFadeOut(false); setStage(4); }, 25500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [imagesLoaded]);

  // Loading state
  if (stage === -1) {
    return (
      <div className="min-h-screen flex items-start justify-center bg-background pt-32">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Stage 0: Checkmark + "You're all set!"
  if (stage === 0) {
    return (
      <div className="min-h-screen flex items-start justify-center bg-background pt-32">
        <div className={`text-center space-y-6 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex justify-center">
            <svg className="w-32 h-32" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                className="opacity-20"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeDasharray="283"
                strokeDashoffset="283"
                className="animate-[drawCircle_0.6s_ease-out_forwards]"
                style={{ transformOrigin: 'center' }}
              />
              <path
                d="M30 50 L45 65 L70 35"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60"
                strokeDashoffset="60"
                className="animate-[drawCheck_0.4s_ease-out_0.6s_forwards]"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <div className="block">
              <SplitText
                text="You're all set!"
                tag="h1"
                className="text-5xl font-bold text-secondary"
                delay={30}
                duration={0.8}
                threshold={0}
              />
            </div>
            <div className="block">
              <SplitText
                text="We'll take it from here. Here's what happens next:"
                tag="p"
                className="text-xl text-muted-foreground"
                delay={20}
                duration={0.8}
                threshold={0}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Stage 1: Carrier connection animation
  if (stage === 1) {
    return (
      <div className="min-h-screen flex items-start justify-center bg-background pt-32">
        <div className={`text-center space-y-12 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="block">
            <SplitText
              text="We're contacting top carriers to find you the best coverage."
              tag="p"
              className="text-2xl font-semibold text-secondary max-w-2xl mx-auto"
              delay={20}
              duration={0.8}
              threshold={0}
            />
          </div>
          <div className="relative h-[600px] w-full max-w-4xl mx-auto flex items-center justify-center">
            {/* Center Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <img src="/logo-full.png" alt="Planlife" className="w-48 h-auto" />
            </div>
            
            {/* Inner orbit circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-black/10" />
            
            {/* Outer orbit circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-black/10" />
            
            {/* Inner orbit carriers */}
            {CARRIERS_INNER.map((carrier, index) => {
              const angle = (360 / CARRIERS_INNER.length) * index;
              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    animation: 'simpleOrbit 30s linear infinite',
                    animationDelay: `${-index * (30 / CARRIERS_INNER.length)}s`,
                    transformOrigin: '0 0',
                  }}
                >
                  <img 
                    src={carrier} 
                    alt="Carrier" 
                    className="w-20 h-20 object-cover bg-white rounded-xl shadow-lg -translate-x-10 -translate-y-10" 
                  />
                </div>
              );
            })}
            
            {/* Outer orbit carriers */}
            {CARRIERS_OUTER.map((carrier, index) => {
              const angle = (360 / CARRIERS_OUTER.length) * index;
              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    animation: 'simpleOrbitReverse 40s linear infinite',
                    animationDelay: `${-index * (40 / CARRIERS_OUTER.length)}s`,
                    transformOrigin: '0 0',
                  }}
                >
                  <img 
                    src={carrier} 
                    alt="Carrier" 
                    className="w-20 h-20 object-cover bg-white rounded-xl shadow-lg -translate-x-10 -translate-y-10" 
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Stage 2: Agent introduction
  if (stage === 2) {
    if (selectedAgent) {
      return (
        <div className="min-h-screen flex items-start justify-center bg-background pt-32">
          <div className={`text-center space-y-8 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="block max-w-2xl mx-auto px-4">
              <SplitText
                text={`${selectedAgent.firstName} will reach out to you within 1-2 business days with the best coverages tailored to you`}
                tag="p"
                className="text-2xl font-semibold text-secondary"
                delay={20}
                duration={0.8}
                threshold={0}
              />
            </div>
            <div className="flex justify-center px-4">
              <div className="bg-gradient-to-br from-primary via-[#3db8e8] to-[#7dd3f0] border border-border rounded-2xl overflow-visible shadow-2xl h-80 w-96 relative">
                <div className="absolute top-6 right-6 z-10 text-right">
                  <h3 className="text-white drop-shadow-lg leading-tight">
                    <span className="text-4xl font-bold">{selectedAgent.firstName}</span><br />
                    <span className="text-2xl font-thin">{selectedAgent.lastName}</span>
                  </h3>
                  <p className="text-white/90 text-sm mt-1 drop-shadow-md">{selectedAgent.title}</p>
                </div>
                <div className="absolute inset-0 -top-12 -left-32">
                  <img
                    src={selectedAgent.fullImageSrc}
                    alt={`${selectedAgent.firstName} ${selectedAgent.lastName}`}
                    className="w-full h-full object-contain object-top rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Show multiple agents when none selected
      return (
        <div className="min-h-screen flex items-start justify-center bg-background pt-32">
          <div className={`text-center space-y-8 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="block max-w-2xl mx-auto px-4">
              <SplitText
                text="The soonest available agent will reach out to you within 1-2 business days with the best coverages tailored to you"
                tag="p"
                className="text-2xl font-semibold text-secondary"
                delay={20}
                duration={0.8}
                threshold={0}
              />
            </div>
            <div className="flex justify-center px-4">
              <img
                src="/agents/group/gusjusora.png"
                alt="Our team of agents"
                className="w-full max-w-2xl h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      );
    }
  }

  // Stage 3: Coverage decision
  if (stage === 3) {
    return (
      <div className="min-h-screen flex items-start justify-center bg-background pt-32">
        <div className={`text-center space-y-6 max-w-3xl px-4 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex justify-center">
            <Handshake className="w-24 h-24 text-primary" strokeWidth={1.5} />
          </div>
          <div className="block">
            <SplitText
              text="You pick your preferred coverage"
              tag="h2"
              className="text-4xl font-bold text-secondary"
              delay={30}
              duration={0.8}
              threshold={0}
            />
          </div>
          <div className="block">
            <SplitText
              text="and we'll close the deal for you"
              tag="p"
              className="text-2xl text-primary font-semibold"
              delay={20}
              duration={0.8}
              threshold={0}
            />
          </div>
        </div>
      </div>
    );
  }

  // Stage 4: Final recap
  return (
    <div className={`transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <RecapScreen data={data} />
    </div>
  );
}


