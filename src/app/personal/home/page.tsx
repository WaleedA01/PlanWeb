import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'PlanLife | Business, Auto, Home Insurance in Florida' },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Home Insurance</h1>
    </main>
  );
}
