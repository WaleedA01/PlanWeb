import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getPhoneLink } from '@/lib/company-info';
import { Phone, Rocket, HelpCircle } from 'lucide-react';

export default function NotSureSection() {
  const faqs = [
    {
      question: 'What types of insurance do I need?',
      answer: 'It depends on your situation. Most people need auto and home/renters insurance. Life and umbrella policies are also recommended.',
    },
    {
      question: 'How much does insurance cost?',
      answer: 'Rates vary based on coverage, location, and personal factors. We compare 50+ carriers to find you the best price.',
    },
    {
      question: 'Can I bundle policies to save money?',
      answer: 'Yes! Bundling auto and home insurance typically saves 15-25%. We will find the best bundle deals for you.',
    },
    {
      question: 'How long does it take to get covered?',
      answer: 'Most policies can be activated within 24 hours. Some even offer instant coverage after approval.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#0da9e4] via-[#3db8e8] to-[#7dd3f0]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Not Sure <span className="text-white">Where to Start</span>?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            We're here to help. Check out these common questions or reach out to speak with an expert.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border-2 border-white/50 rounded-lg p-6 hover:border-secondary hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-semibold text-secondary mb-3 flex items-start gap-2">
                  <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-secondary/80 text-sm leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              asChild 
              size="lg"
              className="bg-white hover:bg-secondary text-secondary hover:text-white text-lg py-6 rounded-full shadow-lg transition-all"
            >
              <a href={getPhoneLink()} className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </Button>
            <Button 
              asChild 
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white text-lg py-6 rounded-full shadow-lg"
            >
              <Link href="/services" className="flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                Get Started
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg"
              className="bg-white hover:bg-secondary text-secondary hover:text-white text-lg py-6 rounded-full shadow-lg transition-all"
            >
              <Link href="/faq" className="flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Browse All FAQs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
