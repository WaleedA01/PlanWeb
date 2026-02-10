'use client';

import { Shield } from 'lucide-react';
import { useState } from 'react';

export default function DataPrivacy() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mt-6 flex justify-center">
      <div 
        className="relative inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
      >
        <button 
          type="button"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <Shield className="w-4 h-4" />
          <span>Where is my data going?</span>
        </button>
        
        {isHovered && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 p-4 bg-popover border rounded-lg shadow-lg text-sm text-foreground z-50">
            <p>
              PlanLife will never sell your data. We are a local Florida agency, you will be working directly with your agent. Your info will always be protected and never shared with any third parties.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
