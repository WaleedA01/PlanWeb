import BusinessForm from '@/components/forms/business/BusinessForm';

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Business Insurance Quote</h1>
          <p className="text-muted-foreground">Get the coverage your business needs in just a few steps</p>
        </div>
        <BusinessForm />
      </div>
    </div>
  );
}
