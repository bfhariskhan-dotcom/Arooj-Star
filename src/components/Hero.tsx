import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  heroImage?: string;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog, heroImage }) => {
  const tickerItems = [
    { label: '48+ Ready Mix Shades', dot: 'bg-rose-500' },
    { label: 'All Pakistan Delivery', dot: 'bg-amber-500' },
    { label: 'Pure Acrylic & Alkyd Resins', dot: 'bg-emerald-500' },
    { label: 'Direct Dealer Rates', dot: 'bg-sky-500' },
    { label: 'High Opacity & Washable', dot: 'bg-violet-500' },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white text-slate-900 w-full max-w-full border-b border-slate-200"
    >
      {/* Background Hero Image with very light scrim so photo is clearly visible */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage || '/src/assets/images/hero_paint_luxury_interior_1794226083963.jpg'}
          alt="Luxury living room painted with Data Arooj Paint Gallery finishes"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-85 sm:opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/45 via-transparent to-transparent" />
      </div>

      {/* Minimalist Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-22 w-full">
        <div className="max-w-lg bg-white/65 backdrop-blur-[2px] p-5 sm:p-6 rounded-lg border border-white/60 shadow-sm">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.1] mb-3 text-balance font-heading">
            Vibrant Colors for{' '}
            <span className="bg-gradient-to-r from-rose-600 via-amber-500 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Beautiful Homes
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-800 mb-5 leading-relaxed font-medium">
            Weather shields, washable emulsions, enamels, and wood finishes across Pakistan.
          </p>

          <div>
            <button
              onClick={onExploreCatalog}
              className="px-5 py-3 text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-orange-500 via-emerald-600 to-blue-600 hover:opacity-95 rounded-md shadow-md transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Explore 48+ Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Light Colorful Marquee Ticker Strip */}
      <div className="relative z-10 border-t border-slate-200 bg-white/90 backdrop-blur-md overflow-hidden py-3 select-none w-full max-w-full">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 shrink-0"
            >
              <span className={`w-2 h-2 rounded-sm ${item.dot}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
