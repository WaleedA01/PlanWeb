# Landing Page Sections

This document outlines the structure of the landing page sections.

## Structure

```
src/
├── components/
│   ├── animations/
│   │   └── FadeInSection.tsx          # Wrapper for scroll animations
│   └── sections/
│       └── landing/
│           ├── HeroSection.tsx         # Main hero with CTA
│           ├── GetStartedSection.tsx   # 3-step process
│           ├── PartnersSection.tsx     # Insurance carrier logos
│           ├── WhyPlanLifeSection.tsx  # 6 key benefits
│           ├── WeSpecializeSection.tsx # Insurance types grid
│           ├── TestimonialsSection.tsx # Customer reviews
│           └── NotSureSection.tsx      # FAQ + CTA
└── hooks/
    └── useIntersectionObserver.ts      # Detects when elements enter viewport
```

## How It Works

1. **FadeInSection** wraps each section (except Hero)
2. Uses **Intersection Observer API** to detect scroll position
3. Sections fade in with smooth animation when they enter viewport
4. All sections are **fully responsive** (mobile-first design)
5. Uses **Tailwind CSS** for styling with your custom theme colors

## Customization

### To Update Content:
- Edit the data arrays in each section component
- Replace placeholder text with your actual content
- Add real carrier logos to PartnersSection

### To Adjust Animations:
- Modify `delay` prop in page.tsx
- Change `duration` in FadeInSection component
- Adjust `threshold` in useIntersectionObserver hook

### To Change Colors:
- All colors use your theme variables from globals.css
- Primary: `text-primary`, `bg-primary`
- Secondary: `text-secondary`, `bg-secondary`
- Muted: `text-muted-foreground`

## Mobile Responsive

All sections use Tailwind responsive prefixes:
- Default: Mobile (< 640px)
- `md:`: Tablet (768px+)
- `lg:`: Desktop (1024px+)

Grids automatically stack on mobile and expand on larger screens.
