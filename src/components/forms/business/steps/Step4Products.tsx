'use client';

import { useState, useEffect } from 'react';
import { BusinessFormData } from '../types';
import { PRODUCTS } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import Image from 'next/image';

interface Step3Props {
  data: BusinessFormData;
  onUpdate: (updates: Partial<BusinessFormData>) => void;
}

export default function Step3Products({ data, onUpdate }: Step3Props) {
  const [showAll, setShowAll] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [showProductGrid, setShowProductGrid] = useState(false);

  const productsWithoutOther = PRODUCTS.filter(p => p.id !== 'other');
  const otherProduct = PRODUCTS.find(p => p.id === 'other');
  const displayedProducts = showAll ? productsWithoutOther : productsWithoutOther.slice(0, 10);

  const isExpertSelected = data.products.includes('Expert Consultation');
  const hasSpecificProducts = data.products.some(p => p !== 'Expert Consultation');

  const handleExpertHelp = () => {
    if (isExpertSelected) {
      // Unselect if already selected
      onUpdate({ products: [] });
    } else {
      // Select expert consultation
      onUpdate({ products: ['Expert Consultation'] });
      setShowProductGrid(false);
    }
  };

  const toggleProduct = (productName: string) => {
    // Clear expert consultation if selecting specific products
    const currentProducts = data.products.filter(p => p !== 'Expert Consultation');
    const newProducts = currentProducts.includes(productName)
      ? currentProducts.filter((p) => p !== productName)
      : [...currentProducts, productName];
    onUpdate({ products: newProducts });
  };

  const handleExpandProducts = () => {
    setShowProductGrid(true);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-secondary mb-3">Coverages</h2>
      </div>

      <div className="space-y-2">
        {/* Expert Help Button - Always visible */}
        <button
          type="button"
          onClick={handleExpertHelp}
          className={`relative w-full p-6 rounded-xl transition-all duration-200 text-left group overflow-hidden ${
            isExpertSelected
              ? 'border-2 border-primary bg-primary text-white shadow-md'
              : hasSpecificProducts
              ? 'border border-border bg-gray-50 opacity-50 hover:opacity-100 hover:border-primary/50'
              : 'border-2 border-border hover:border-primary/50'
          }`}
        >
        {/* Recommended Banner */}
        <div className="absolute top-0 right-0 px-6 py-2 rounded-bl-lg flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-300 text-secondary">
          <Image 
            src="/logo-square.png" 
            alt="" 
            width={20}
            height={20}
            className="object-contain"
          />
          <span className="text-sm font-semibold">Recommended</span>
        </div>
        
        {isExpertSelected && (
          <div className="absolute bottom-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        <div className="space-y-1 pr-32">
          <h3 className={`text-xl md:text-2xl font-semibold ${
            isExpertSelected ? 'text-white' : 'text-secondary'
          }`}>Help me find the coverages I need</h3>
          <p className={`text-sm ${
            isExpertSelected ? 'text-white/90' : 'text-muted-foreground'
          }`}>Have a PlanLife agent recommend coverages tailored to your business.</p>
        </div>
        </button>
      </div>

      {/* Divider / Expand Button */}
      {!showProductGrid ? (
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-base text-muted-foreground font-medium">or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={handleExpandProducts}
              variant="outline"
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-white text-lg px-12 py-8"
            >
              Choose products myself
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 transition-opacity duration-500 opacity-0 animate-[fadeIn_0.5s_ease-in_forwards]">
          {/* Product Grid */}
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
            <div className="flex justify-center mt-6">
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

          {/* Other - Full Width (only shown when showAll is true) */}
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
      )}
    </div>
  );
}
