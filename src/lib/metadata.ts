import { Metadata } from 'next';
import { COMPANY_INFO } from './company-info';

const baseUrl = 'https://planlifeusa.com';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { absolute: 'PlanLife | Business, Auto, Home Insurance in Florida' },
  alternates: {
    canonical: baseUrl,
  },
  description: "Get affordable auto, home, and business insurance in Florida. 50+ carriers, 20+ years experience, 5-star rated. Free quotes in minutes. Call (407) 557-3100",
  keywords: ['insurance Florida', 'auto insurance', 'home insurance', 'business insurance', 'insurance quotes', 'Florida insurance agency'],
  authors: [{ name: 'PlanLife Insurance' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'PlanLife Insurance',
    title: 'PlanLife Insurance | Auto, Home & Business Insurance in Florida',
    description: "Get affordable auto, home, and business insurance in Florida. 50+ carriers, 20+ years experience, 5-star rated.",
    images: [{ url: '/logo-full.png', width: 1200, height: 630, alt: 'PlanLife Insurance' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlanLife Insurance | Auto, Home & Business Insurance in Florida',
    description: "Get affordable auto, home, and business insurance in Florida. 50+ carriers, 20+ years experience.",
    images: ['/logo-full.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const pageMetadata = {
  home: {
    title: { absolute: 'PlanLife | Business, Auto, Home Insurance in Florida' },
    description: "Get affordable auto, home, and business insurance in Florida. 50+ carriers, 20+ years experience, 5-star rated. Free quotes in minutes. Call (407) 557-3100",
    alternates: { canonical: `${baseUrl}` },
  },
  aboutUs: {
    title: { absolute: "PlanLife | Florida's Most Trusted Insurance Agency Since 2020" },
    description: "Learn about PlanLife Insurance, Florida's premier insurance agency. 20+ years experience, 10,000+ happy customers, $2.5M+ saved. Meet our expert team.",
    alternates: { canonical: `${baseUrl}/about-us` },
  },
  services: {
    title: { absolute: 'PlanLife | Insurance Services in Florida - Auto, Home, Business & Life' },
    description: 'Comprehensive insurance services in Florida: auto, home, business, life, umbrella. 50+ top carriers including Progressive, Geico, Hartford. Get your free quote today.',
    alternates: { canonical: `${baseUrl}/services` },
  },
  personal: {
    title: { absolute: 'PlanLife | Personal Insurance in Florida - Auto, Home & Life Coverage' },
    description: 'Protect what matters with personal insurance from PlanLife. Auto, home, renters, life, boat, RV & umbrella coverage. Compare quotes from 50+ carriers.',
    alternates: { canonical: `${baseUrl}/personal` },
  },
  business: {
    title: { absolute: 'PlanLife | Business Insurance in Florida - Liability, Workers Comp & More' },
    description: 'Comprehensive business insurance in Florida: general liability, property, workers comp, cyber liability, commercial auto. Tailored coverage for your business.',
    alternates: { canonical: `${baseUrl}/business` },
  },
  team: {
    title: { absolute: 'PlanLife | Meet Our Licensed Insurance Agents - Expert Team in Florida' },
    description: "Meet PlanLife's licensed insurance professionals. 20+ years combined experience helping Florida families and businesses find perfect coverage.",
    alternates: { canonical: `${baseUrl}/team` },
  },
  careers: {
    title: { absolute: 'PlanLife | Insurance Careers in Florida - Join Our Team Today' },
    description: 'Join PlanLife Insurance in Florida. Exciting career opportunities in insurance sales and customer service. Competitive pay, benefits, and growth potential.',
    alternates: { canonical: `${baseUrl}/careers` },
  },
  contact: {
    title: { absolute: `PlanLife | Contact Us in Florida - Call ${COMPANY_INFO.contact.phone}` },
    description: `Contact PlanLife Insurance in Florida. Call ${COMPANY_INFO.contact.phone}, email ${COMPANY_INFO.contact.email}, or visit us at ${COMPANY_INFO.address.full}.`,
    alternates: { canonical: `${baseUrl}/contact` },
  },
  faq: {
    title: { absolute: 'PlanLife | Insurance FAQ - Common Questions Answered by Florida Experts' },
    description: "Get answers to common insurance questions. Learn about coverage types, claims process, pricing, and more from Florida's trusted insurance experts.",
    alternates: { canonical: `${baseUrl}/faq` },
  },
  blog: {
    title: { absolute: 'PlanLife | Insurance Blog - Tips, Guides & Expert Advice for Florida' },
    description: 'Expert insurance advice for Florida businesses and homeowners. Learn about coverage requirements, cost-saving tips, and industry insights from PlanLife.',
    alternates: { canonical: `${baseUrl}/blog` },
  },
};
