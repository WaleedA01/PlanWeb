'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AutoForm from '@/components/forms/auto/AutoForm';

function AutoFormContent() {
  const searchParams = useSearchParams();
  const qrToken = searchParams.get('qr') || undefined;

  return <AutoForm qrToken={qrToken} />;
}

export default function AutoFormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AutoFormContent />
    </Suspense>
  );
}
