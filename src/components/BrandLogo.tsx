import React from 'react';

interface BrandLogoProps {
  className?: string;
  light?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  light = false,
}) => {
  return (
    <div className={`inline-flex flex-col select-none leading-[1.02] font-heading ${className}`}>
      <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-rose-600 via-amber-500 via-emerald-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap">
        Data Arooj
      </span>
      <span
        className={`text-[11px] sm:text-xs font-extrabold tracking-wider whitespace-nowrap mt-0.5 ${
          light ? 'text-slate-100' : 'text-slate-800'
        }`}
      >
        Paint Gallery
      </span>
    </div>
  );
};
