import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    province: 'Punjab',
    shopName: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    const text = encodeURIComponent(
      `*Arooj Star Paint Gallery - Official Inquiry*\n` +
      `-----------------------------------------\n` +
      `• Contact Person: ${formData.name}\n` +
      `• Phone/WhatsApp: ${formData.phone}\n` +
      `• Business/Shop: ${formData.shopName || 'N/A'}\n` +
      `• Station/City: ${formData.city} (${formData.province})\n` +
      `• Inquiry Details:\n${formData.message || 'I would like to inquire about dealership and supply terms across Pakistan.'}\n` +
      `-----------------------------------------\n` +
      `Please confirm stock availability and freight dispatch schedule.`
    );
    window.open(`https://wa.me/${COMPANY_DETAILS.phone1Raw}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-bold text-[#c1121f] uppercase tracking-wider mb-2">
            Nationwide Dealership & Orders
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Contact Us & Order Direct
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Supplying all of Pakistan. Reach Malik Kabeer Shahid (CEO) and Shahid Malik Badshah directly for immediate freight quotes and bulk orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Hotline Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* CEO Contact Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-[#c1121f] uppercase tracking-wider block mb-1">
                Chief Executive Officer
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {COMPANY_DETAILS.ceo}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Asuzas Paint Chemical Industries - Direct Plant Orders
              </p>
              <div>
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.phone1Raw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#c1121f] hover:bg-[#a50f1b] text-white font-bold text-xs inline-flex items-center gap-2 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: {COMPANY_DETAILS.phone1}</span>
                </a>
              </div>
            </div>

            {/* Supply Lead Contact Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-[#c1121f] uppercase tracking-wider block mb-1">
                Contact Person & Supply Head
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {COMPANY_DETAILS.contactPerson}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Dealer Freight Coordination & Ready-Mix Orders
              </p>
              <div>
                <a
                  href={`tel:${COMPANY_DETAILS.phone2}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-2 transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Direct: {COMPANY_DETAILS.phone2}</span>
                </a>
              </div>
            </div>

            {/* All Pakistan Coverage Card */}
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#c1121f] mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>All Pakistan Distribution Coverage</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                Factory transport dispatches operating daily across:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-900">
                <div className="bg-white px-3 py-2 rounded-lg border border-red-100">• Punjab (All Cities)</div>
                <div className="bg-white px-3 py-2 rounded-lg border border-red-100">• Sindh (Karachi & Interior)</div>
                <div className="bg-white px-3 py-2 rounded-lg border border-red-100">• Khyber Pakhtunkhwa</div>
                <div className="bg-white px-3 py-2 rounded-lg border border-red-100">• Balochistan (Quetta)</div>
                <div className="bg-white px-3 py-2 rounded-lg border border-red-100">• Gilgit-Baltistan</div>
                <div className="bg-white px-3 py-2 rounded-lg border border-red-100">• Azad Kashmir & ICT</div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-2">
              Send Inquiries Directly to WhatsApp
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Complete the form below. Your message will be formatted and opened directly in WhatsApp for instant response.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                    Shop / Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    placeholder="e.g. Aslam Paint & Hardware Store"
                    className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                    City / Station
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Lahore, Peshawar, Quetta, Karachi"
                    className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  Province / Territory
                </label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] text-slate-900 font-semibold cursor-pointer"
                >
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa (KPK)</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  <option value="AJK / Islamabad">Azad Kashmir / Federal ICT</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  Required Products / Inquiry Details
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify product codes, required drum/gallon quantities, or questions..."
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1121f] text-slate-900 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl font-bold text-xs text-white bg-[#c1121f] hover:bg-[#a50f1b] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Submit to WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
