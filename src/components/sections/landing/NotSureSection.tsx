import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
    <section className="py-16 md:py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Not Sure <span className="text-primary">Where to Start</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help. Check out these common questions or reach out to speak with an expert.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-semibold text-secondary mb-3 flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left Side */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground mb-6 md:mb-0">
                  Get your quote in just 2 minutes. No obligations, no hassle.
                </p>
              </div>

              {/* Right Side - Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <Link href="/personal">Begin Quote</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10"
                >
                  <Link href="/contact">Call us Now</Link>
                </Button>
              </div>
            </div>

            {/* Additional Help Link */}
            <div className="mt-6 pt-6 border-t border-primary/20 text-center">
              <Link 
                href="/faq" 
                className="text-primary hover:underline font-semibold inline-flex items-center gap-2"
              >
                Browse All FAQs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
