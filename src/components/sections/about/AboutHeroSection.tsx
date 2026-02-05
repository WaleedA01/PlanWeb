export default function AboutHeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0da9e4] via-[#3db8e8] to-[#7dd3f0] bg-[length:200%_200%] animate-[gradientShift_8s_ease_infinite]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-secondary mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          About <span className="text-white">Us</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          The story behind making insurance<br/>
          simple, personal, and stress-free
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}
