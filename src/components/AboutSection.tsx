import React from 'react';
import { ShieldCheck, Award, Building2, MapPin, Phone, MessageSquare, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';
import { SiteSettings } from '../types';

interface AboutSectionProps {
  onExploreProducts: () => void;
  onOpenQuotation: () => void;
  siteSettings?: Partial<SiteSettings>;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreProducts,
  onOpenQuotation,
  siteSettings,
}) => {
  const details = { ...COMPANY_DETAILS, ...siteSettings };

  const handleWhatsAppCEO = () => {
    const text = encodeURIComponent(
      `Hello Malik Kabeer Shahid Sahab (CEO ${details.galleryName}), I am inquiring about dealership and bulk paint supply.`
    );
    window.open(`https://wa.me/${details.phone1Raw}?text=${text}`, '_blank');
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Hello Shahid Malik Badshah Sahab, I want to place a ready-mix paint order with ${details.galleryName}.`
    );
    window.open(`https://wa.me/${details.phone2Raw}?text=${text}`, '_blank');
  };

  return (
    <section id="about" className="py-10 sm:py-14 bg-white border-b border-slate-200 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <div className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-rose-600 via-amber-500 to-blue-600 bg-clip-text text-transparent mb-1">
            About {details.galleryName}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
            Quality Paint Manufacturing &amp; Direct Supply
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Formulated by <strong>{details.parentIndustry}</strong> for rich finish and lasting protection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Official Poster Image */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-100 group">
              <img
                src={details.aboutImage || 'https://i.postimg.cc/DwrXBmG0/Whats-App-Image-2026-11-09-at-9-15-38-AM.jpg'}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/assets/aistudio/WhatsApp_Image_2026-11-09_at_9.15.38_AM_48a42b9e.jpeg') {
                    target.src = '/assets/aistudio/WhatsApp_Image_2026-11-09_at_9.15.38_AM_48a42b9e.jpeg';
                  }
                }}
                alt="Leadership of Data Arooj Paint Gallery"
                className="w-full h-auto object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                loading="eager"
              />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent text-white">
                <div className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                  {details.galleryName}
                </div>
                <div className="text-xs font-bold text-white">
                  {details.ceo} &amp; {details.contactPerson}
                </div>
              </div>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Certified Ready-Mix Formulations</span>
            </div>
          </div>

          {/* Concise Story & Colorful Light Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-heading">
                Factory Direct Paints Across Pakistan
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Non-fading pigments, smooth coverage, and weather defense delivered nationwide.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-md bg-rose-50/70 border border-rose-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase tracking-wider mb-0.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Long Lasting</span>
                </div>
                <p className="text-xs text-slate-600">Resists peeling, dampness, and cracks.</p>
              </div>

              <div className="p-3 rounded-md bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-0.5">
                  <Award className="w-4 h-4" />
                  <span>Smooth Finish</span>
                </div>
                <p className="text-xs text-slate-600">High-opacity sheen &amp; washable coats.</p>
              </div>

              <div className="p-3 rounded-md bg-emerald-50/70 border border-emerald-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-0.5">
                  <Building2 className="w-4 h-4" />
                  <span>Weather Shield</span>
                </div>
                <p className="text-xs text-slate-600">Built for UV sun &amp; monsoon rain.</p>
              </div>

              <div className="p-3 rounded-md bg-sky-50/70 border border-sky-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-wider mb-0.5">
                  <MapPin className="w-4 h-4" />
                  <span>All-Pakistan Supply</span>
                </div>
                <p className="text-xs text-slate-600">Daily freight to every province.</p>
              </div>
            </div>

            {/* Light Colorful Direct Order Bar */}
            <div className="p-3.5 rounded-md bg-gradient-to-r from-rose-50 via-amber-50/70 to-sky-50 border border-slate-200 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                  Direct Plant Orders
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-0.5">
                  {details.ceo} ({details.phone1}) &middot; {details.contactPerson} ({details.phone2})
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleWhatsAppCEO}
                  className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-rose-600 to-orange-500 hover:opacity-95 text-white rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={handleWhatsAppContact}
                  className="px-3 py-1.5 text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-600" />
                  <span>Call</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={onExploreProducts}
                className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-orange-500 to-blue-600 hover:opacity-95 rounded-md shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Explore 48+ Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuotation}
                className="px-4 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-all cursor-pointer"
              >
                <span>Request Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
