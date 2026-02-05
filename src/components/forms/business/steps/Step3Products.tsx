'use client';

import { useState } from 'react';
import { BusinessFormData } from '../types';
import { PRODUCTS } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

interface Step3Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
}

const RECOMMENDED_PRODUCTS = ['General Liability', 'Commercial Property', 'Workers\' Compensation', 'Commercial Auto', 'Professional Liability (E&O)'];

export default function Step3Products({ data, onUpdate }: Step3Props) {
  const [showAll, setShowAll] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const productsWithoutOther = PRODUCTS.filter(p => p.id !== 'other');
  const otherProduct = PRODUCTS.find(p => p.id === 'other');
  const displayedProducts = showAll ? productsWithoutOther : productsWithoutOther.slice(0, 10);

  const toggleProduct = (productName: string) => {
    const newProducts = data.products.includes(productName)
      ? data.products.filter((p) => p !== productName)
      : [...data.products, productName];
    onUpdate({ products: newProducts });
  };

  const handleRecommendation = () => {
    onUpdate({ products: RECOMMENDED_PRODUCTS });
    setShowRecommendation(true);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Choose Products</h2>
        <p className="text-base md:text-lg text-primary">Select all insurance products you're interested in</p>
      </div>

      <div className="flex justify-center">
        {!showRecommendation ? (
          <Button
            type="button"
            onClick={handleRecommendation}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            What do you recommend?
          </Button>
        ) : (
          <div className="max-w-2xl text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">We recommend</span> these essential coverages for {data.businessType || 'your business'}. 
              These are the basic products to protect you and your operations. This decision is not final — your expert agent will contact you with a more detailed breakdown tailored to your specific needs.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayedProducts.map((product) => {
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
              {/* Info Icon */}
              <div 
                className="absolute top-2 left-2 group z-10"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setHoveredProduct(product.id);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setHoveredProduct(null);
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <HelpCircle className={`w-5 h-5 ${isSelected ? 'text-white/70' : 'text-gray-400'} hover:${isSelected ? 'text-white' : 'text-gray-600'} transition-colors`} />
                {hoveredProduct === product.id && (
                  <div className="absolute left-0 bottom-7 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50 animate-in fade-in duration-200">
                    {product.description}
                    <div className="absolute -bottom-1 left-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                  </div>
                )}
              </div>

              {/* Checkmark */}
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

      {!showAll && productsWithoutOther.length > 10 && (
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={() => setShowAll(true)}
            variant="ghost"
            className="text-primary"
          >
            Show More Options
          </Button>
        </div>
      )}

      {/* Other / I'm not sure - Full Width (only shown when showAll is true) */}
      {showAll && otherProduct && (() => {
        const isSelected = data.products.includes(otherProduct.name);
        return (
          <div
            key={otherProduct.id}
            onClick={() => toggleProduct(otherProduct.name)}
            className={`
              relative cursor-pointer rounded-xl p-6 transition-all duration-200
              border-2 hover:shadow-lg w-full
              ${isSelected 
                ? 'border-primary bg-primary text-white shadow-md' 
                : 'border-border hover:border-primary/50'
              }
            `}
          >
            {/* Info Icon */}
            <div 
              className="absolute top-2 left-2 group z-10"
              onMouseEnter={(e) => {
                e.stopPropagation();
                setHoveredProduct(otherProduct.id);
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setHoveredProduct(null);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <HelpCircle className={`w-5 h-5 ${isSelected ? 'text-white/70' : 'text-gray-400'} hover:${isSelected ? 'text-white' : 'text-gray-600'} transition-colors`} />
              {hoveredProduct === otherProduct.id && (
                <div className="absolute left-0 bottom-7 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50 animate-in fade-in duration-200">
                  {otherProduct.description}
                  <div className="absolute -bottom-1 left-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                </div>
              )}
            </div>

            {/* Checkmark */}
            {isSelected && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            <div className="flex items-center justify-center text-center space-x-3">
              <otherProduct.icon className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-primary'}`} />
              <div className="text-base font-medium">{otherProduct.name}</div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
