import { Marquee } from '@/components/ui/marquee';
import { testimonials } from '@/data/testimonials';

export default function TestimonialsSection() {
  const firstRow = testimonials.slice(0, 7);
  const secondRow = testimonials.slice(7, 14);

  return (
    <section className="py-16 md:py-24 bg-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say.
          </p>
        </div>
      </div>

      {/* Testimonials Marquee - Full width outside container */}
      <div className="relative flex flex-col gap-4 mb-8 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:60s]">
          {firstRow.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:60s]">
          {secondRow.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Marquee>
      </div>

      <div className="container mx-auto px-4">
        {/* Bottom Stats */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a 
            href="https://www.google.com/search?sca_esv=9e7166714c898479&sxsrf=ANbL-n5cVUNPSebGzoHEXMM2_ccO5sWriw:1771260034618&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOdOiSjvSqwGwAP0ZEniJToZT3VlJGFkvxB9Dx6CWUcBIiAsLbB0oZ_-jvnq6DKfdpK2Cws4t6t2yZXCdPzbskkzCJjEaF72iDid5cneYQigwewhUig%3D%3D&q=PlanLife+Insurance+Reviews&sa=X&ved=2ahUKEwjS_avpud6SAxVGSDABHatUKMsQ0bkNegQIJhAH&biw=1920&bih=992&dpr=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center p-6 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer block"
          >
            <div className="text-5xl md:text-6xl font-bold text-primary mb-3">5.0</div>
            <div className="flex gap-1 justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </a>
          <div className="text-center p-6 bg-primary/5 rounded-lg flex flex-col justify-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-3">10,000+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-lg flex flex-col justify-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-3">$2.5M+</div>
            <div className="text-sm text-muted-foreground">Saved for Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  title,
  business,
  insuranceType,
  rating,
  quote,
  avatar,
  logo,
}: {
  name: string;
  title: string;
  business: string;
  insuranceType: string;
  rating: number;
  quote: string;
  avatar: string;
  logo?: string;
}) {
  return (
    <div className="w-[320px] md:w-[400px] h-[320px] md:h-[360px] bg-card border border-border rounded-lg p-5 md:p-7 hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Stars and Insurance Type */}
      <div className="flex justify-between items-start mb-2 md:mb-3">
        <div className="flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <svg
              key={i}
              className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-[10px] md:text-xs text-primary font-medium">{insuranceType}</span>
      </div>

      {/* Quote - flex-grow to push footer down */}
      <blockquote className="text-muted-foreground mb-3 md:mb-4 leading-relaxed text-xs md:text-sm italic flex-grow overflow-hidden">
        "{quote}"
      </blockquote>

      {/* Author Info - always at bottom */}
      <div className="flex items-center gap-2 md:gap-3 pt-3 md:pt-4 border-t border-border mt-auto">
        {logo ? (
          <img src={logo} alt={business} className="w-14 h-14 md:w-16 md:h-16 object-contain flex-shrink-0 rounded-md" />
        ) : (
          <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-md flex items-center justify-center text-primary font-semibold flex-shrink-0 text-base md:text-lg">
            {avatar}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-secondary text-xs md:text-sm">
            {name}
          </div>
          <div className="text-xs md:text-sm">
            <span className="text-primary font-medium">{business}</span>
            <span className="text-muted-foreground text-[10px] md:text-xs"> • {title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
