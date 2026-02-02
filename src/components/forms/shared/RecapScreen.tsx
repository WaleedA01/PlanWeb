'use client';

import { BusinessFormData } from '../business/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface RecapScreenProps {
  data: BusinessFormData;
}

export default function RecapScreen({ data }: RecapScreenProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-[fadeInUp_0.6s_ease-out_forwards]">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-muted-foreground">We've received your information and will be in touch soon.</p>
      </div>

      <div className="bg-secondary/50 rounded-lg p-6 space-y-6 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards] opacity-0">
        <h2 className="text-xl font-semibold">Your Information</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Business Information</h3>
            <p className="font-medium">{data.businessName}</p>
            <p className="text-sm">
              {data.streetAddress}, {data.city}, {data.state} {data.postalCode}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Business Type</h3>
            <p>{data.businessType}</p>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Products of Interest</h3>
            <ul className="list-disc list-inside">
              {data.products.map((product) => (
                <li key={product}>{product}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Contact</h3>
            <p>
              {data.firstName} {data.lastName}
            </p>
            <p className="text-sm">{data.email}</p>
            <p className="text-sm">{data.phoneNumber}</p>
            <p className="text-sm">Preferred contact: {data.preferredContactMethod}</p>
          </div>

          {data.additionalInfo && (
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Additional Information</h3>
              <p className="text-sm">{data.additionalInfo}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
