import React from 'react';
import { Phone, MessageSquare, ArrowUp, Mail, Globe, Lock } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { COMPANY_DETAILS } from '../data/products';
import { SiteSettings } from '../types';
import { SocialLinksBar } from './SocialLinksBar';

interface FooterProps {
  onOpenAdmin: () => void;
  siteSettings?: Partial<SiteSettings>;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, siteSettings }) => {
  const details = { ...COMPANY_DETAILS, ...siteSettings };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-white text-slate-800 border-t border-slate-200 pt-10 pb-6 w-full max-w-full overflow-hidden relative">
      <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 via-sky-500 to-violet-600 absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pb-8 border-b border-slate-200">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <BrandLogo light={false} />

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              {details.taglineEnglish}. Direct manufacturing under {details.parentIndustry}.
            </p>

            <div className="space-y-1 text-xs">
              <a
                href={`mailto:${details.email}`}
                className="flex items-center gap-2 text-slate-700 hover:text-rose-600 font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-rose-600" />
                <span>{details.email}</span>
              </a>
              <a
                href={details.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-700 hover:text-rose-600 font-medium transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                <span>{details.domain}</span>
              </a>
            </div>

            <div className="pt-1">
              <SocialLinksBar links={details.socialLinks} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#hero" className="hover:text-rose-600 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-rose-600 transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-rose-600 transition-colors">Paint Catalog</a></li>
              <li><a href="#color-studio" className="hover:text-rose-600 transition-colors">Color Studio</a></li>
              <li><a href="#calculator" className="hover:text-rose-600 transition-colors">Paint Calculator</a></li>
              <li><a href="#videos" className="hover:text-rose-600 transition-colors">Videos</a></li>
              <li><a href="#contact" className="hover:text-rose-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Direct Contacts
            </h4>
            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <span className="text-slate-900 font-bold block">CEO: {details.ceo}</span>
                <a
                  href={`https://wa.me/${details.phone1Raw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 hover:text-rose-600 font-heading tabular-nums flex items-center gap-1.5 mt-0.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{details.phone1}</span>
                </a>
              </div>

              <div>
                <span className="text-slate-900 font-bold block">Supply: {details.contactPerson}</span>
                <a
                  href={`tel:${details.phone2}`}
                  className="text-slate-600 hover:text-rose-600 font-heading tabular-nums flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-600" />
                  <span>{details.phone2}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Supply Network */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Pakistan Supply
            </h4>
            <div className="p-3 rounded-md bg-white border border-slate-200 text-xs text-slate-700 space-y-1 font-medium">
              <div>• Punjab &amp; Islamabad</div>
              <div>• Sindh &amp; Karachi</div>
              <div>• KPK &amp; Hazara</div>
              <div>• Balochistan</div>
              <div>• Gilgit-Baltistan &amp; AJK</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} {details.galleryName} ·{' '}
            <a href={details.website} target="_blank" rel="noreferrer" className="hover:text-rose-600 font-medium">
              {details.domain}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-300 hover:border-rose-500 text-slate-800 hover:text-rose-600 font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Lock className="w-3.5 h-3.5 text-rose-600" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-700 hover:text-rose-600 transition-colors cursor-pointer font-medium"
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
