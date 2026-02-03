'use client';

import { BusinessFormData } from '../types';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Step3Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
}

const products = [
  'General Liability',
  'Property Insurance',
  'Workers Compensation',
  'Professional Liability',
  'Commercial Auto',
  'Cyber Liability',
  'Business Interruption',
  'Equipment Breakdown',
];

export default function Step3Products({ data, onUpdate }: Step3Props) {
  const toggleProduct = (product: string) => {
    const newProducts = data.products.includes(product)
      ? data.products.filter((p) => p !== product)
      : [...data.products, product];
    onUpdate({ products: newProducts });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Products</h2>
        <p className="text-muted-foreground">Select all insurance products you're interested in</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {products.map((product) => (
          <div
            key={product}
            className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
            onClick={() => toggleProduct(product)}
          >
            <Checkbox
              id={product}
              checked={data.products.includes(product)}
              onCheckedChange={() => toggleProduct(product)}
            />
            <Label htmlFor={product} className="cursor-pointer flex-1">
              {product}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
