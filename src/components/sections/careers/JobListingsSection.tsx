'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO, getEmailLink } from '@/lib/company-info';

const jobListings = [
  {
    id: 'licensed-insurance-agent',
    title: 'Licensed Insurance Agent',
    subtitle: 'All Insurance Types',
    type: 'Full-Time',
    location: 'Orlando, FL 32835',
    workType: 'In-Person',
    salary: '$40,000 - $80,000 per year',
    description: 'PlanLife is seeking a motivated Licensed Insurance Agent to join our team. You\'ll work with clients across all insurance types including auto, home, life, health, and commercial coverage.',
    ideal: 'This role is perfect for a licensed professional who wants to grow their career in a supportive environment while helping clients protect what matters most.',
    responsibilities: [
      'Meeting with clients to assess insurance needs across all product lines',
      'Providing quotes and recommendations for auto, home, life, health, and commercial insurance',
      'Building and maintaining strong client relationships',
      'Processing applications and policy changes',
      'Conducting policy reviews and identifying coverage gaps',
      'Meeting sales goals and growing your book of business',
      'Staying current on insurance products and industry regulations',
    ],
    requirements: [
      'Active Florida insurance license (2-20, 2-15, or 2-40 required)',
      'Strong sales and customer service skills',
      'Excellent communication and interpersonal abilities',
      'Self-motivated with ability to work independently',
      'Detail-oriented and organized',
    ],
    benefits: [
      'Competitive base salary plus commission',
      'Health insurance',
      'Paid time off',
      'Professional development and training',
      'Supportive team environment',
      'Opportunity for career growth',
    ],
  },
  {
    id: 'commercial-account-manager',
    title: 'Commercial Account Manager',
    subtitle: 'Property & Casualty Insurance',
    type: 'Full-Time',
    location: 'Orlando, FL 32835',
    workType: 'In-Person',
    salary: '$52,000 - $72,000 per year',
    description: 'PlanLife is an independent insurance agency specializing in commercial property and casualty insurance for business clients in the Orlando area. We\'re looking for an experienced Commercial Account Manager who takes ownership of their accounts, communicates clearly with clients, and understands how to manage policies from quote through renewal.',
    ideal: 'This role is ideal for someone who enjoys client-facing work, understands commercial coverage, and wants to be part of a professional, relationship-driven agency.',
    responsibilities: [
      'Managing and servicing a portfolio of commercial insurance accounts',
      'Acting as the primary point of contact for clients and handling day-to-day service needs',
      'Reviewing policies, identifying coverage gaps, and making informed recommendations',
      'Processing applications, endorsements, renewals, and policy changes accurately and on time',
      'Working directly with underwriters and carriers to negotiate coverage and pricing',
      'Conducting regular account reviews to ensure policies align with clients\' business operations',
      'Building long-term relationships with clients, prospects, and carrier partners',
    ],
    requirements: [
      'Active Florida 4-40 or 2-20 license (required)',
      'Commercial insurance experience strongly preferred',
      'Comfortable managing multiple accounts and deadlines',
      'Strong communication skills (written and verbal)',
      'Detail-oriented with the ability to work independently',
    ],
    benefits: [
      'Health insurance',
      'Paid time off',
      'Stable, established independent agency',
      'Supportive team environment',
      'Opportunity to work with commercial clients and grow long-term relationships',
    ],
  },
  {
    id: 'personal-lines-account-manager',
    title: 'Personal Lines Account Manager',
    subtitle: 'Auto, Home & Life Insurance',
    type: 'Full-Time',
    location: 'Orlando, FL 32835',
    workType: 'In-Person',
    salary: '$45,000 - $65,000 per year',
    description: 'We\'re seeking a Personal Lines Account Manager to join our growing team. You\'ll work with individuals and families to provide comprehensive insurance solutions including auto, home, and life coverage.',
    ideal: 'Perfect for someone who enjoys helping people protect what matters most and building lasting client relationships.',
    responsibilities: [
      'Managing a book of personal lines insurance accounts',
      'Providing exceptional customer service and policy support',
      'Conducting policy reviews and identifying coverage needs',
      'Processing quotes, applications, and policy changes',
      'Handling renewals and maintaining client retention',
      'Cross-selling additional coverage when appropriate',
      'Building strong relationships with clients and carriers',
    ],
    requirements: [
      'Active Florida 2-20 license (required)',
      'Personal lines insurance experience preferred',
      'Strong customer service orientation',
      'Excellent communication and organizational skills',
      'Ability to work independently and as part of a team',
    ],
    benefits: [
      'Health insurance',
      'Paid time off',
      'Professional development opportunities',
      'Supportive team culture',
      'Opportunity for career advancement',
    ],
  },
];

export default function JobListingsSection() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Current <span className="text-primary">Openings</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore opportunities to grow your insurance career with PlanLife
            </p>
          </div>

          <div className="space-y-6">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="bg-white border-2 border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 shadow-lg"
              >
                {/* Job Header */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-secondary mb-2">{job.title}</h3>
                      <p className="text-primary font-semibold mb-3">{job.subtitle}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <button className="text-primary hover:text-primary/80 transition-transform">
                      <svg
                        className={`w-6 h-6 transition-transform ${expandedJob === job.id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedJob === job.id && (
                  <div className="px-6 pb-6 border-t border-border pt-6 space-y-6">
                    <div>
                      <p className="text-gray-700 mb-2">{job.description}</p>
                      <p className="text-gray-600 italic">{job.ideal}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        What You'll Be Responsible For
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        What We're Looking For
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        Why PlanLife
                      </h4>
                      <ul className="space-y-2">
                        {job.benefits.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
                      >
                        <a href={`/careers/${job.id}`}>
                          Apply Now
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center bg-secondary/5 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-secondary mb-4">
              Don't See the Right Fit?
            </h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented insurance professionals. Send us your resume and let's talk about future opportunities.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              <a href={getEmailLink()}>
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
