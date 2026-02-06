import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BusinessInsuranceSection() {
  const coverages = [
    { icon: '🏢', title: 'General Liability', desc: 'Protection against third-party claims and lawsuits' },
    { icon: '🏭', title: 'Property Insurance', desc: 'Coverage for your business assets and equipment' },
    { icon: '👷', title: 'Workers Compensation', desc: 'Required coverage for employee injuries' },
    { icon: '💼', title: 'Professional Liability', desc: 'Errors & omissions protection for your services' },
    { icon: '🚚', title: 'Commercial Auto', desc: 'Vehicle coverage for your business fleet' },
    { icon: '🔒', title: 'Cyber Liability', desc: 'Digital security and data breach protection' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Business Insurance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive coverage solutions designed to protect your business from unexpected risks and liabilities
            </p>
          </div>

          {/* Coverage Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {coverages.map((coverage) => (
              <div
                key={coverage.title}
                className="bg-white border border-border rounded-xl p-6 hover:shadow-lg hover:border-secondary/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{coverage.icon}</div>
                <h3 className="text-xl font-semibold text-secondary mb-2">{coverage.title}</h3>
                <p className="text-muted-foreground">{coverage.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-12 py-6 text-lg">
              <Link href="/business">Get Business Quote →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
