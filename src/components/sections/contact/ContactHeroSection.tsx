export default function ContactHeroSection() {
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0da9e4] via-[#3db8e8] to-[#7dd3f0]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          Get in <span className="text-secondary underline decoration-4 underline-offset-8">Touch.</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          We're here to help with all your insurance needs
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 -mb-0.5">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
          <path d="M0 100L60 93C120 87 240 73 360 67C480 60 600 60 720 63C840 67 960 73 1080 77C1200 80 1320 80 1380 80L1440 80V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}
