'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Fuse, { type FuseResult, type FuseResultMatch } from 'fuse.js';
import { BusinessClassification } from '@/lib/businessClassifications';
import { getCategoryFromNAICS } from '@/lib/businessCategories';
import { Input } from '@/components/ui/input';

interface BusinessAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  classifications: BusinessClassification[];
}

export default function BusinessAutocomplete({ value, onChange, classifications }: BusinessAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<FuseResult<BusinessClassification>[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const justSelectedRef = useRef(false);

  const fuse = useMemo(() => {
    if (classifications.length === 0) return null;
    return new Fuse(classifications, {
      keys: ['description'],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
    });
  }, [classifications]);

  useEffect(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }
    if (inputValue.length >= 2 && fuse) {
      const searchResults = fuse.search(inputValue, { limit: 10 });
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [inputValue, fuse]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (classification: BusinessClassification) => {
    justSelectedRef.current = true;
    setInputValue(classification.description);
    onChange(classification.description);
    setIsOpen(false);
    setResults([]);
  };

  const highlightMatch = (text: string, matches?: readonly FuseResultMatch[]) => {
    if (!matches || matches.length === 0) return text;
    
    const match = matches[0];
    if (!match.indices || match.indices.length === 0) return text;
    
    const parts: React.ReactElement[] = [];
    let lastIndex = 0;
    
    match.indices.forEach(([start, end], i) => {
      if (start > lastIndex) {
        parts.push(<span key={`text-${i}`}>{text.slice(lastIndex, start)}</span>);
      }
      parts.push(<strong key={`match-${i}`}>{text.slice(start, end + 1)}</strong>);
      lastIndex = end + 1;
    });
    
    if (lastIndex < text.length) {
      parts.push(<span key="text-end">{text.slice(lastIndex)}</span>);
    }
    
    return <>{parts}</>;
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => inputValue.length >= 2 && setIsOpen(true)}
          placeholder="Type to search (e.g., restaurant, retail, construction)..."
          className="w-full pl-10"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-[100] w-full mt-2 bg-white border border-border rounded-lg shadow-xl max-h-72 overflow-hidden">
          <div className="overflow-auto max-h-72">
            {results.length > 0 ? (
              results.map((result, index) => {
                const category = getCategoryFromNAICS(result.item.code);
                return (
                  <div
                    key={`${result.item.code}-${index}`}
                    onClick={() => handleSelect(result.item)}
                    className="px-4 py-3 hover:bg-accent/50 cursor-pointer transition-colors border-b last:border-b-0 group"
                  >
                    <div className="flex items-start gap-3">
                      <category.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-base leading-relaxed">{highlightMatch(result.item.description, result.matches)}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center">
                <svg className="w-12 h-12 mx-auto text-muted-foreground/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-muted-foreground">No results found</p>
                <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
