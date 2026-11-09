import React from 'react';
import { Phone, MessageSquare, Award, ShieldCheck, Building2, UserCheck, Star } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';

export const LeadershipSection: React.FC = () => {
  const handleWhatsAppCEO = () => {
    const text = encodeURIComponent(
      `Hello Malik Kabeer Shahid Sahab (CEO Data Arooj Paint Gallery), I would like to inquire regarding dealership and supplies of Arooj Star.`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.phone1Raw}?text=${text}`, '_blank');
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Hello Shahid Malik Badshah Sahab, I want to connect regarding Arooj Star Paint orders and delivery schedule.`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.phone2Raw}?text=${text}`, '_blank');
  };

  return (
    <section id="about" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-2">
            About Arooj Star & Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Direct Leadership & Industrial Heritage
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Formulated under Asuzas Paint Chemical Industries, Arooj Star delivers architectural coatings with strict adherence to opacity, durability, and weather resilience.
          </p>
        </div>

        {/* Leadership Cards (Red and Slate Theme) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: CEO Malik Kabeer Shahid */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-[#c1121f] text-white flex items-center justify-center font-black text-xl shadow-md">
                    MKS
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-red-400 font-bold block">
                      Chief Executive Officer
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      {COMPANY_DETAILS.ceo}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-red-400 text-xs font-bold border border-red-500/40 px-2.5 py-0.5 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-[#c1121f]" />
                  <span>CEO</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                Directing formula development, automated manufacturing facilities, and wholesale regional pipelines. Dedicated to producing superior paints that protect buildings across Pakistan.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Direct Contact:</span>
                  <span className="font-mono font-bold text-white text-sm">{COMPANY_DETAILS.phone1}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Distribution:</span>
                  <span className="text-white font-semibold">Nationwide Across All Pakistan</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={handleWhatsAppCEO}
                className="flex-1 py-3 px-4 rounded-xl bg-[#c1121f] hover:bg-[#a50f1b] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer active:scale-98"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Malik Kabeer</span>
              </button>
              <a
                href={`tel:${COMPANY_DETAILS.phone1}`}
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
            </div>
          </div>

          {/* Card 2: Contact Person Shahid Malik Badshah */}
          <div className="bg-slate-50 text-slate-900 rounded-3xl p-8 sm:p-10 shadow-xs border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-md">
                    SMB
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#c1121f] font-bold block">
                      Supply & Dealer Head
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">
                      {COMPANY_DETAILS.contactPerson}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-700 text-xs font-bold border border-slate-300 px-2.5 py-0.5 rounded-lg">
                  <UserCheck className="w-3.5 h-3.5 text-[#c1121f]" />
                  <span>Verified</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Direct coordinator for retail paint stockists, hardware shop owners, and building contractors requiring fast ready-mix dispatch, customized tint batches, and bulk drummy rates.
              </p>

              <div className="space-y-2.5 text-xs text-slate-600 mb-6 bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Hotline Number:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{COMPANY_DETAILS.phone2}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Dispatch Logistics:</span>
                  <span className="text-slate-900 font-semibold">Prompt All-Pakistan Transport</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={handleWhatsAppContact}
                className="flex-1 py-3 px-4 rounded-xl bg-[#c1121f] hover:bg-[#a50f1b] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer active:scale-98"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Shahid Malik</span>
              </button>
              <a
                href={`tel:${COMPANY_DETAILS.phone2}`}
                className="py-3 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Brand Pillars in Clean Red Theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-200">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-red-50 text-[#c1121f] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Long Lasting Protection</div>
              <div className="text-xs text-slate-500 mt-1">Cross-linked acrylic polymers prevent cracking and flaking</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-red-50 text-[#c1121f] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Rich & Smooth Finish</div>
              <div className="text-xs text-slate-500 mt-1">Silken tactile feel with high light-reflection clarity</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-red-50 text-[#c1121f] shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Beautify Your Home</div>
              <div className="text-xs text-slate-500 mt-1">Deeply saturated pigments designed to hold true luster</div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-red-50 text-[#c1121f] shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Weather Resistant</div>
              <div className="text-xs text-slate-500 mt-1">Extreme resistance against UV, monsoon rain, and chalking</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
