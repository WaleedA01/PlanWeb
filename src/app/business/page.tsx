import { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import BusinessPageClient from './BusinessPageClient';

export const metadata: Metadata = pageMetadata.business;

export default function BusinessPage() {
  return <BusinessPageClient />;
}
