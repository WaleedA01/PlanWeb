'use client';

import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg bottom-full left-1/2 -translate-x-1/2 mb-4 max-w-[480px] text-center">
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
        </div>
      )}
    </div>
  );
}
