import { getAnimationCarriers } from '@/lib/carriers';

export default function ProductsCarriersSection() {
  const businessProducts = [
    'General Liability',
    'Workers Compensation',
    'Commercial Property',
    'Professional Liability',
    'Commercial Auto',
    'Cyber Liability',
    'Business Owners Policy',
    'Umbrella Insurance'
  ];

  const personalProducts = [
    'Auto Insurance',
    'Home Insurance',
    'Life Insurance',
    'Health Insurance',
    'Motorcycle Insurance',
    'Renters Insurance',
    'Umbrella Insurance',
    'Boat Insurance'
  ];

  const carriers = getAnimationCarriers();

  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Animated background elements - removed */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6">
              What We <span className="underline decoration-4 underline-offset-8">Offer.</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Trusted by restaurants, gas stations, professionals, and big-name businesses nationwide
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Business Products */}
            <div className="bg-secondary/95 backdrop-blur-sm rounded-3xl p-10 border-4 border-secondary">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                Business Products
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {businessProducts.map((product) => (
                  <div key={product} className="flex items-center gap-2 text-white/90">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{product}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Products */}
            <div className="bg-primary backdrop-blur-sm rounded-3xl p-10 border-4 border-primary">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Personal Products
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {personalProducts.map((product) => (
                  <div key={product} className="flex items-center gap-2 text-white">
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{product}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carriers Section */}
          <div className="bg-primary backdrop-blur-sm rounded-3xl p-10 border-4 border-primary">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Partnered with Top Carriers
              </h3>
              <p className="text-lg text-white/90">
                We work with the nation's leading insurance providers to get you the best rates
              </p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {carriers.map((carrier) => (
                <div
                  key={carrier.id}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-28 h-28 flex items-center justify-center bg-white rounded-xl overflow-hidden">
                    <img src={carrier.logoSrc} alt={carrier.alt} className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <span className="text-white font-medium text-center text-xs">{carrier.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
