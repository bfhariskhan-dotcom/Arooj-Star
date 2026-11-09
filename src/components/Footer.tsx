import React from 'react';
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { COMPANY_DETAILS } from '../data/products';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 text-slate-800 border-t border-slate-200 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-200">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo light={false} />

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm pt-2">
              {COMPANY_DETAILS.taglineEnglish}. Direct manufacturing line under {COMPANY_DETAILS.parentIndustry}. Supplying certified exterior emulsions, washable interior coats, enamels, and wood finishes.
            </p>

            <div className="text-xs text-[#c1121f] font-bold pt-2">
              {COMPANY_DETAILS.priceListDate} - Official Ready-Mix Dealer Rates
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c1121f]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li><a href="#hero" className="hover:text-[#c1121f] transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-[#c1121f] transition-colors">Dealer Catalog (48+ Products)</a></li>
              <li><a href="#color-studio" className="hover:text-[#c1121f] transition-colors">Color Studio & Visualizer</a></li>
              <li><a href="#calculator" className="hover:text-[#c1121f] transition-colors">Paint Coverage Calculator</a></li>
              <li><a href="#videos" className="hover:text-[#c1121f] transition-colors">Factory & Durability Videos</a></li>
              <li><a href="#about" className="hover:text-[#c1121f] transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-[#c1121f] transition-colors">Dealer Testimonials</a></li>
              <li><a href="#contact" className="hover:text-[#c1121f] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Key Leadership Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c1121f]">
              Direct Contacts
            </h4>
            <div className="space-y-4 text-xs text-slate-700">
              <div>
                <span className="text-slate-900 font-bold block">CEO: {COMPANY_DETAILS.ceo}</span>
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.phone1Raw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 hover:text-[#c1121f] font-mono flex items-center gap-1.5 mt-1"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#c1121f]" />
                  <span>{COMPANY_DETAILS.phone1}</span>
                </a>
              </div>

              <div>
                <span className="text-slate-900 font-bold block">Contact Person: {COMPANY_DETAILS.contactPerson}</span>
                <a
                  href={`tel:${COMPANY_DETAILS.phone2}`}
                  className="text-slate-600 hover:text-[#c1121f] font-mono flex items-center gap-1.5 mt-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c1121f]" />
                  <span>{COMPANY_DETAILS.phone2}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Supply Network */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c1121f]">
              All Pakistan Supply
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nationwide freight and dealer dispatches covering:
            </p>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1 font-medium">
              <div>• Punjab (All Cities)</div>
              <div>• Sindh (Karachi, Hyderabad, Sukkur)</div>
              <div>• Khyber Pakhtunkhwa (Peshawar, Hazara)</div>
              <div>• Balochistan (Quetta, Chaman)</div>
              <div>• Gilgit-Baltistan & AJK</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_DETAILS.brandName} · {COMPANY_DETAILS.galleryName}.
          </div>

          <div className="flex items-center gap-6">
            <span>Powered by {COMPANY_DETAILS.parentIndustry}</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-700 hover:text-[#c1121f] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
