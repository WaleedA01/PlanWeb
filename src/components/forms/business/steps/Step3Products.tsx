'use client';

import { BusinessFormData } from '../types';
import { PRODUCTS } from '@/lib/products';

interface Step3Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
}

export default function Step3Products({ data, onUpdate }: Step3Props) {
  const toggleProduct = (productName: string) => {
    const newProducts = data.products.includes(productName)
      ? data.products.filter((p) => p !== productName)
      : [...data.products, productName];
    onUpdate({ products: newProducts });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Choose Products</h2>
        <p className="text-base md:text-lg text-primary">Select all insurance products you're interested in</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {PRODUCTS.map((product) => {
          const isSelected = data.products.includes(product.name);
          return (
            <div
              key={product.id}
              onClick={() => toggleProduct(product.name)}
              className={`
                relative cursor-pointer rounded-xl p-6 transition-all duration-200
                border-2 hover:shadow-lg
                ${isSelected 
                  ? 'border-primary bg-primary text-white shadow-md' 
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="flex flex-col items-center text-center space-y-3">
                <product.icon className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-primary'}`} />
                <div className="text-sm font-medium leading-tight">{product.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
