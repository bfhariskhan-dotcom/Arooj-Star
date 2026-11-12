import React from 'react';
import { ShieldCheck, Award, Building2, MapPin, Phone, MessageSquare, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';

interface AboutSectionProps {
  onExploreProducts: () => void;
  onOpenQuotation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreProducts,
  onOpenQuotation
}) => {
  const handleWhatsAppCEO = () => {
    const text = encodeURIComponent(
      `Hello Malik Kabeer Shahid Sahab (CEO Data Arooj Paint Gallery), I am inquiring about Arooj Star dealership terms and bulk supply.`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.phone1Raw}?text=${text}`, '_blank');
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Hello Shahid Malik Badshah Sahab (Supply Head), I want to place a ready-mix paint order and confirm delivery schedule.`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.phone2Raw}?text=${text}`, '_blank');
  };

  return (
    <section id="about" className="py-12 sm:py-16 bg-white border-t border-slate-200 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Single Clean Eyebrow */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-2">
            About Arooj Star
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight font-heading">
            Direct Leadership & Industrial Chemical Manufacturing
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
            Formulated by <strong>Asuzas Paint Chemical Industries</strong> under Data Arooj Paint Gallery. Engineered for maximum opacity, weather defense, and lasting durability.
          </p>
        </div>

        {/* Main Showcase Grid: Official Poster Image + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Official Poster Image */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 group">
              <img
                src="https://i.postimg.cc/DwrXBmG0/Whats-App-Image-2026-11-09-at-9-15-38-AM.jpg"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/assets/aistudio/WhatsApp_Image_2026-11-09_at_9.15.38_AM_48a42b9e.jpeg') {
                    target.src = '/assets/aistudio/WhatsApp_Image_2026-11-09_at_9.15.38_AM_48a42b9e.jpeg';
                  }
                }}
                alt="Malik Kabeer Shahid (CEO) and Shahid Malik Badshah with Arooj Star Forever Paint Line"
                className="w-full h-auto object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                loading="eager"
              />
              <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-white">
                <div className="text-[10px] uppercase font-bold tracking-widest text-red-400">
                  Data Arooj Paint Gallery
                </div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  Malik Kabeer Shahid & Shahid Malik Badshah
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#c1121f]" />
              <span>Official Registered Brand & Licensed Formulations</span>
            </div>
          </div>

          {/* Right Column: Concise Story & Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading">
                Superior Quality Paints for Protected Homes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Directing formula synthesis, raw material testing, and wholesale regional pipelines. Every ready-mix formulation is verified for non-fading pigments, washability, and weather resistance across Pakistan.
              </p>
            </div>

            {/* 4 Pillars in Compact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-200 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Long Lasting Protection</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pure acrylic polymers prevent cracking, flaking, and dampness.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-200 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>Rich & Smooth Finish</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Micronized pigments create a silken, high-sheen tactile feel.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-200 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Weather Resistant</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Built to endure monsoon rain, UV radiation, and seasonal humidity.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-200 transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>All-Pakistan Supply</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Prompt daily freight across Punjab, Sindh, KPK, and Balochistan.
                </p>
              </div>
            </div>

            {/* Direct Leadership Hotline Bar */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
                  Direct Plant Orders & Inquiries
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">
                  Malik Kabeer Shahid ({COMPANY_DETAILS.phone1}) &middot; Shahid Malik Badshah ({COMPANY_DETAILS.phone2})
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleWhatsAppCEO}
                  className="px-3 py-1.5 text-xs font-bold bg-[#c1121f] hover:bg-[#a50f1b] text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={handleWhatsAppContact}
                  className="px-3 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={onExploreProducts}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Layers className="w-4 h-4" />
                <span>Explore 48+ Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuotation}
                className="px-4 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all cursor-pointer"
              >
                <span>Request Dealer Quotation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
