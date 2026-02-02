export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      location: 'Austin, TX',
      insurance: 'Auto & Home Insurance',
      rating: 5,
      quote: 'PlanLife saved me over $800 a year on my auto insurance! The process was incredibly easy and my agent was so helpful in explaining all my options.',
      avatar: 'SM',
    },
    {
      name: 'Michael Chen',
      location: 'Seattle, WA',
      insurance: 'Business Insurance',
      rating: 5,
      quote: 'As a small business owner, finding the right coverage was overwhelming. PlanLife made it simple and found me comprehensive coverage at a great price.',
      avatar: 'MC',
    },
    {
      name: 'Jennifer Rodriguez',
      location: 'Miami, FL',
      insurance: 'Home Insurance',
      rating: 5,
      quote: 'After a hurricane scare, I needed better home coverage fast. PlanLife got me protected within 24 hours. Their service is outstanding!',
      avatar: 'JR',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 md:p-8 hover:border-primary hover:shadow-xl transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold flex-shrink-0">
                  {testimonial.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-secondary truncate">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {testimonial.location}
                  </div>
                  <div className="text-xs text-primary truncate">
                    {testimonial.insurance}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$2.5M+</div>
            <div className="text-sm text-muted-foreground">Saved for Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}
