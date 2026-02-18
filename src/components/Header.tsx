"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40 shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="hover:scale-105 transition-transform">
              <Image src="/logo-full.png" alt="PlanLife Insurance - Florida Insurance Agency" width={150} height={40} className="hidden md:block" priority />
              <Image src="/logo-square.png" alt="PlanLife Insurance Logo" width={40} height={40} className="md:hidden" priority />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/about-us" className="text-foreground hover:text-primary transition-colors relative group">
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/services" className="text-foreground hover:text-primary transition-colors relative group">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/personal" className="text-foreground hover:text-primary transition-colors relative group">
                Personal
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/business" className="text-foreground hover:text-primary transition-colors relative group">
                Business
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/team" className="text-foreground hover:text-primary transition-colors relative group">
                Team
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/careers" className="text-foreground hover:text-primary transition-colors relative group">
                Careers
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/faq" className="text-foreground hover:text-primary transition-colors relative group">
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/services">
                <Button className="bg-secondary hover:bg-secondary/90 text-white shadow-lg font-semibold transition-all">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground z-50 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Full Screen Overlay (Outside header) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-secondary/95 backdrop-blur-lg z-[60] md:hidden animate-in fade-in duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="fixed inset-0 z-[70] md:hidden flex flex-col items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white hover:text-primary transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-8 text-center animate-in slide-in-from-bottom duration-500">
              <Link 
                href="/about-us" 
                className="text-white text-2xl font-medium hover:text-primary transition-all hover:scale-110 animate-[slideInFade_0.5s_ease-out_0.1s_forwards] opacity-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/services" 
                className="text-white text-2xl font-medium hover:text-primary transition-all hover:scale-110 animate-[slideInFade_0.5s_ease-out_0.2s_forwards] opacity-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/personal" 
                className="text-white text-2xl font-medium hover:text-primary transition-all hover:scale-110 animate-[slideInFade_0.5s_ease-out_0.3s_forwards] opacity-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                Personal
              </Link>
              <Link 
                href="/business" 
                className="text-white text-2xl font-medium hover:text-primary transition-all hover:scale-110 animate-[slideInFade_0.5s_ease-out_0.4s_forwards] opacity-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                Business
              </Link>
              <Link 
                href="/team" 
                className="text-white text-2xl font-medium hover:text-primary transition-all hover:scale-110 animate-[slideInFade_0.5s_ease-out_0.5s_forwards] opacity-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </Link>
              <Link 
                href="/careers" 
                className="text-white text-2xl font-medium hover:text-primary transition-all hover:scale-110 animate-[slideInFade_0.5s_ease-out_0.6s_forwards] opacity-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link 
                href="/contact" 
                className="text-white text-2xl font-medium hover:text-primary transition-all hover:scale-110 animate-[slideInFade_0.5s_ease-out_0.7s_forwards] opacity-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/faq" 
                className="text-white text-2xl font-medium hover:text-primary transition-all hover:scale-110 animate-[slideInFade_0.5s_ease-out_0.8s_forwards] opacity-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/services" 
                className="animate-[slideInFade_0.5s_ease-out_0.9s_forwards] opacity-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="bg-secondary hover:bg-secondary/90 text-white shadow-lg font-semibold transition-all text-lg px-8 py-4">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
