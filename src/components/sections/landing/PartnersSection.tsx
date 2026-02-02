export default function PartnersSection() {
  // Placeholder partner data - replace with actual logos later
  const partners = [
    { name: 'State Farm', logo: 'SF' },
    { name: 'Allstate', logo: 'AS' },
    { name: 'Progressive', logo: 'PG' },
    { name: 'Geico', logo: 'GC' },
    { name: 'Nationwide', logo: 'NW' },
    { name: 'Liberty Mutual', logo: 'LM' },
    { name: 'Farmers', logo: 'FM' },
    { name: 'Travelers', logo: 'TV' },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Trusted <span className="text-primary">Insurance Partners</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We compare rates from leading carriers to find you the best coverage at the best price
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group bg-white border border-border rounded-lg p-6 md:p-8 flex items-center justify-center hover:border-primary hover:shadow-lg transition-all duration-300 aspect-square"
            >
              {/* Placeholder - Replace with actual logo images */}
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-muted-foreground/30 group-hover:text-primary/50 transition-colors">
                  {partner.logo}
                </div>
                <div className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            <span className="font-semibold text-primary">50+ carriers</span> and counting
          </p>
        </div>
      </div>
    </section>
  );
}
