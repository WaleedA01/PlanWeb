import { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import PersonalPageClient from './PersonalPageClient';

export const metadata: Metadata = pageMetadata.personal;

export default function PersonalPage() {
  return <PersonalPageClient />;
}
