import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog }) => {
  const tickerItems = [
    '48+ Ready Mix Formulations',
    'Nationwide Delivery Across All Pakistan',
    '100% Pure Acrylic & Alkyd Resins',
    'Direct Factory Dealer Rates',
    'Lab Certified High Opacity & Washability',
    'Same Day Batch Dispatches'
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-slate-900 text-white w-full max-w-full">
      {/* Background Hero Image with light, soft scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_paint_luxury_interior_1794226083963.jpg"
          alt="Luxury living room with Arooj Star painted walls"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />
      </div>

      {/* Clean, Minimalist Content: 1 Heading, 1 Description, 1 Button */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] mb-4 text-balance font-heading">
            Superior Quality Paints for{' '}
            <span className="text-[#c1121f]">
              Beautiful Homes
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 mb-6 leading-relaxed font-normal">
            Certified architectural coatings, weather shields, washable emulsions, and timberlac finishes across Pakistan.
          </p>

          <div>
            <button
              onClick={onExploreCatalog}
              className="px-6 py-3.5 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-xl shadow-lg hover:shadow-red-900/40 transition-all inline-flex items-center gap-2.5 cursor-pointer active:scale-95"
            >
              <span>Explore 48+ Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-scrolling Marquee Ticker Strip below banner */}
      <div className="relative z-10 border-t border-white/15 bg-slate-950/85 backdrop-blur-md overflow-hidden py-4 select-none w-full max-w-full">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-200 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#c1121f]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
