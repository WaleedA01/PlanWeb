import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WeSpecializeSection() {
  const insuranceTypes = [
    {
      title: 'Auto Insurance',
      description: 'Comprehensive coverage for your vehicles with competitive rates and flexible options',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      link: '/personal/auto',
      color: 'from-blue-500/10 to-cyan-500/10',
    },
    {
      title: 'Home Insurance',
      description: 'Protect your home and belongings with customizable coverage that fits your needs',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      link: '/personal/home',
      color: 'from-green-500/10 to-emerald-500/10',
    },
    {
      title: 'Life Insurance',
      // Fixed syntax error: used double quotes to handle the apostrophe in "family's"
      description: "Secure your family's financial future with term, whole, and universal life policies",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      link: '/personal/other/form',
      color: 'from-red-500/10 to-pink-500/10',
    },
    {
      title: 'Business Insurance',
      description: 'Comprehensive commercial coverage to protect your business assets and operations',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      link: '/business',
      color: 'from-purple-500/10 to-indigo-500/10',
    },
    {
      title: 'Renters Insurance',
      description: 'Affordable protection for your personal property and liability as a renter',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      link: '/personal/other/form',
      color: 'from-orange-500/10 to-yellow-500/10',
    },
    {
      title: 'Other Coverage',
      description: 'Umbrella, boat, motorcycle, RV, and specialty insurance options available',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      link: '/personal/other/form',
      color: 'from-teal-500/10 to-cyan-500/10',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Coverage for Every <span className="text-primary">Stage of Life</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From personal to business, we've got you covered with comprehensive insurance solutions
          </p>
        </div>

        {/* Insurance Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {insuranceTypes.map((type, index) => (
            <Link
              key={index}
              href={type.link}
              className="group block h-full"
            >
              <div className={`relative bg-gradient-to-br ${type.color} border border-border rounded-lg p-6 md:p-8 hover:border-primary hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
                {/* Icon */}
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {type.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-3 group-hover:text-primary transition-colors">
                  {type.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                  {type.description}
                </p>

                {/* Learn More Link Visual */}
                <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all mt-auto">
                  <span>Learn More</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Not sure which coverage you need?
          </p>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary/10"
          >
            <Link href="/contact">Talk to an Expert</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}