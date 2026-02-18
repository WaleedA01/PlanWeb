import { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import ServicesHeroSection from '@/components/sections/services/ServicesHeroSection';
import ProductsCarriersSection from '@/components/sections/services/ProductsCarriersSection';

export const metadata: Metadata = pageMetadata.services;

export default function Services() {
  return (
    <main>
      <ServicesHeroSection />
      <ProductsCarriersSection />
    </main>
  );
}
