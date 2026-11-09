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
    <section id="hero" className="relative overflow-hidden bg-slate-900 text-white">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-36 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6 text-balance">
            Superior Quality Paints for{' '}
            <span className="text-[#c1121f]">
              Beautiful Homes
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 mb-10 leading-relaxed font-normal">
            Certified architectural paints, weather shields, washable emulsions, and timberlac finishes for builders, dealers, and homes across Pakistan.
          </p>

          <div>
            <button
              onClick={onExploreCatalog}
              className="px-8 py-4 text-sm font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-xl shadow-lg hover:shadow-red-900/40 transition-all inline-flex items-center gap-3 cursor-pointer active:scale-95"
            >
              <span>Explore 48+ Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-scrolling Marquee Ticker Strip below banner */}
      <div className="relative z-10 border-t border-white/15 bg-slate-950/85 backdrop-blur-md overflow-hidden py-4 select-none">
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
