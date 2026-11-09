import React from 'react';

interface BrandLogoProps {
  className?: string;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  light = false 
}) => {
  return (
    <div className={`flex items-baseline gap-1.5 select-none leading-none ${className}`}>
      <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#c1121f]">
        Arooj
      </span>
      <span className={`text-2xl sm:text-3xl font-black tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
        Star
      </span>
    </div>
  );
};
