export default function OurMissionSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Our Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Empowering Your <span className="text-primary">Future</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We're committed to educating and empowering our clients, providing tailored solutions that give you confidence in every decision.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your goals are our priority, and we're always here to help you navigate life's twists and turns.
            </p>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-primary mb-2">20+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Insurance Carriers</div>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 hidden lg:block">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-3xl p-12 flex items-center justify-center min-h-[400px]">
              <svg className="w-48 h-48 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
