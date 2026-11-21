import React from 'react';

const DOT_COLORS = [
  'bg-rose-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-sky-500',
  'bg-violet-500',
];

export const TopMarquee: React.FC = () => {
  const marqueeMessages = [
    'Data Arooj Paint Gallery — Official Dealer List (April 2026)',
    'Nationwide Supply Across All Pakistan',
    'Direct Orders: 0301-9736709 | 0346-4467194',
    'Weather Defender · Durasilk · Super Gloss · Sheesha Putty · Timberlac',
  ];

  return (
    <div className="bg-gradient-to-r from-rose-50 via-amber-50/70 via-emerald-50/70 to-sky-50 text-slate-800 text-xs py-2 overflow-hidden border-b border-slate-200 select-none w-full max-w-full relative">
      <div className="h-[2px] w-full bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 via-sky-500 to-violet-600 absolute top-0 left-0" />
      <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
        {[...marqueeMessages, ...marqueeMessages, ...marqueeMessages].map((msg, i) => (
          <div key={i} className="flex items-center gap-2.5 shrink-0">
            <span className={`w-1.5 h-1.5 rounded-sm shrink-0 ${DOT_COLORS[i % DOT_COLORS.length]}`} />
            <span className="font-semibold text-slate-800 tracking-wide">{msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
