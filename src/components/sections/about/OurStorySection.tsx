export default function OurStorySection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative hidden lg:block">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-12 flex items-center justify-center min-h-[400px]">
              <svg className="w-48 h-48 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          <div>
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
              Where It All <span className="text-primary">Began</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              PlanLife began with a mission to make insurance simple, personal, and stress-free. We believe every person deserves to feel secure and understood.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our dedicated team brings a human touch to the insurance world, ensuring you get coverage that fits your unique journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
