import { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import ContactFormSection from '@/components/sections/contact/ContactFormSection';

export const metadata: Metadata = pageMetadata.contact;

export default function Contact() {
  return (
    <main>
      <ContactFormSection />
    </main>
  );
}
