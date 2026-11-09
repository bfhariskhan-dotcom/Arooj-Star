import React from 'react';

export const TopMarquee: React.FC = () => {
  const marqueeMessages = [
    'Arooj Star Official Dealer Ready-Mix List (April 2026)',
    'Nationwide Supply & Dispatch Across All of Pakistan',
    'Direct Factory Orders: 0301-9736709 | 0346-4467194',
    'Asuzas Paint Chemical Industries - Certified Formulations',
    'Weather Defender · Durasilk Anti-Stain · Super Gloss · Sheesha Putty · Timberlac'
  ];

  return (
    <div className="bg-[#111827] text-white text-xs py-2.5 overflow-hidden border-b border-red-950/40 select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
        {[...marqueeMessages, ...marqueeMessages, ...marqueeMessages].map((msg, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c1121f] shrink-0" />
            <span className="font-semibold text-slate-100 tracking-wide">{msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
