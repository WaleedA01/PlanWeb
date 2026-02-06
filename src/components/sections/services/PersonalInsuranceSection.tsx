import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PersonalInsuranceSection() {
  const coverages = [
    { icon: '🚗', title: 'Auto Insurance', desc: 'Comprehensive coverage for your vehicles' },
    { icon: '🏠', title: 'Home Insurance', desc: 'Protect your home and belongings' },
    { icon: '❤️', title: 'Life Insurance', desc: 'Financial security for your loved ones' },
    { icon: '🏥', title: 'Health Insurance', desc: 'Medical coverage for you and your family' },
    { icon: '🏍️', title: 'Motorcycle Insurance', desc: 'Specialized coverage for your bike' },
    { icon: '🎓', title: 'Renters Insurance', desc: 'Protection for your rental property' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Personal Insurance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Safeguard what matters most with personalized coverage for your home, auto, health, and life
            </p>
          </div>

          {/* Coverage Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {coverages.map((coverage) => (
              <div
                key={coverage.title}
                className="bg-white border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{coverage.icon}</div>
                <h3 className="text-xl font-semibold text-secondary mb-2">{coverage.title}</h3>
                <p className="text-muted-foreground">{coverage.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-lg">
              <Link href="/personal">Get Personal Quote →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
