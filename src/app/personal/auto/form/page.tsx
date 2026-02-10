'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AutoForm from '@/components/forms/auto/AutoForm';

function AutoFormContent() {
  return <AutoForm />;
}

export default function AutoFormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AutoFormContent />
    </Suspense>
  );
}
