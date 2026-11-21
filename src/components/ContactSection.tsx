import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, Mail, Globe } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';
import { SiteSettings } from '../types';
import { createQuotationInFirestore } from '../lib/storeService';
import { SocialLinksBar } from './SocialLinksBar';

interface ContactSectionProps {
  siteSettings?: Partial<SiteSettings>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ siteSettings }) => {
  const details = { ...COMPANY_DETAILS, ...siteSettings };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    province: 'Punjab',
    shopName: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    const orderNumber = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    createQuotationInFirestore({
      orderNumber,
      source: 'contact_form',
      fullName: formData.name,
      companyShopName: formData.shopName,
      phone: formData.phone,
      city: formData.city,
      province: formData.province,
      deliveryAddress: '',
      orderNotes: formData.message,
      items: [],
      totalAmount: 0,
    });

    const text = encodeURIComponent(
      `*${details.galleryName} - Inquiry*\n` +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Shop: ${formData.shopName || 'N/A'}\n` +
        `City: ${formData.city} (${formData.province})\n` +
        `Message: ${formData.message || 'Dealership & paint order inquiry'}`
    );
    window.open(`https://wa.me/${details.phone1Raw}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-10 sm:py-14 bg-white border-t border-slate-200 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-6">
          <div className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-rose-600 via-amber-500 to-blue-600 bg-clip-text text-transparent mb-1">
            Dealership &amp; Orders
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
            Contact {details.galleryName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Direct freight quotes and wholesale orders across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Direct Hotline Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-lg bg-gradient-to-br from-rose-50/70 to-amber-50/50 border border-rose-200/80">
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-0.5">
                Chief Executive Officer
              </span>
              <h3 className="text-lg font-black text-slate-900 mb-0.5">{details.ceo}</h3>
              <p className="text-xs text-slate-600 mb-3">{details.parentIndustry}</p>
              <a
                href={`https://wa.me/${details.phone1Raw}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-md bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {details.phone1}</span>
              </a>
            </div>

            <div className="p-5 rounded-lg bg-gradient-to-br from-sky-50/70 to-emerald-50/40 border border-sky-200/80">
              <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider block mb-0.5">
                Contact Person &amp; Supply
              </span>
              <h3 className="text-lg font-black text-slate-900 mb-0.5">{details.contactPerson}</h3>
              <p className="text-xs text-slate-600 mb-3">Ready-Mix Orders &amp; Freight</p>
              <a
                href={`tel:${details.phone2}`}
                className="px-3.5 py-2 rounded-md bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call: {details.phone2}</span>
              </a>

              <div className="mt-4 pt-3 border-t border-slate-200 space-y-1.5 text-xs">
                <a
                  href={`mailto:${details.email}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-rose-600 font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-rose-600" />
                  <span>{details.email}</span>
                </a>
                <a
                  href={details.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-700 hover:text-rose-600 font-medium"
                >
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                  <span>{details.domain}</span>
                </a>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200">
                <SocialLinksBar links={details.socialLinks} />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Pakistan Supply Coverage</span>
              </h4>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold text-slate-800">
                <div className="bg-white px-2.5 py-1.5 rounded border border-slate-200">Punjab</div>
                <div className="bg-white px-2.5 py-1.5 rounded border border-slate-200">Sindh</div>
                <div className="bg-white px-2.5 py-1.5 rounded border border-slate-200">KPK</div>
                <div className="bg-white px-2.5 py-1.5 rounded border border-slate-200">Balochistan</div>
                <div className="bg-white px-2.5 py-1.5 rounded border border-slate-200">Gilgit-Baltistan</div>
                <div className="bg-white px-2.5 py-1.5 rounded border border-slate-200">AJK &amp; ICT</div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Form */}
          <div className="lg:col-span-7 bg-white rounded-lg p-5 sm:p-7 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-amber-500 via-emerald-500 to-blue-600 absolute top-0 left-0" />
            <h3 className="text-lg font-black text-slate-900 mb-1 pt-1">
              Quick WhatsApp Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Fill out the details below for instant WhatsApp quotation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300-1234567"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Shop / Company</label>
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    placeholder="Paint & Hardware Store"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Lahore, Karachi, Peshawar"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Province</label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold cursor-pointer"
                >
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa (KPK)</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  <option value="AJK / Islamabad">Azad Kashmir / ICT</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Inquiry Message</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Product codes, quantities, or dealership questions..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-md font-bold text-xs text-white bg-gradient-to-r from-rose-600 via-orange-500 to-blue-600 hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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
