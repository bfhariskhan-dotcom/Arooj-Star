import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageSquare, Check, ArrowRight, Printer, Building2, MapPin, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, DealerOrderForm } from '../types';
import { PACK_SIZE_LABELS, COMPANY_DETAILS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [activeTab, setActiveTab] = useState<'cart' | 'dealerForm' | 'success'>('cart');
  const [formData, setFormData] = useState<DealerOrderForm>({
    fullName: '',
    companyShopName: '',
    phone: '',
    city: '',
    province: 'Punjab',
    deliveryAddress: '',
    orderNotes: '',
    preferredContact: 'whatsapp'
  });
  const [submittedOrderNumber, setSubmittedOrderNumber] = useState('');

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let orderList = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.product.name} (Code: ${it.product.code})\n` +
          `   Size: ${PACK_SIZE_LABELS[it.selectedSize] || it.selectedSize}\n` +
          `   Qty: ${it.quantity} x Rs. ${it.unitPrice.toLocaleString('en-PK', { minimumFractionDigits: 2 })}\n` +
          `   Subtotal: Rs. ${(it.unitPrice * it.quantity).toLocaleString('en-PK', { minimumFractionDigits: 2 })}`
      )
      .join('\n\n');

    const customerDetails = formData.fullName
      ? `\n\n*Dealer Information:*\nName: ${formData.fullName}\nShop: ${formData.companyShopName || 'N/A'}\nCity: ${formData.city} (${formData.province})\nAddress: ${formData.deliveryAddress || 'N/A'}`
      : '';

    const message = encodeURIComponent(
      `*Arooj Star Forever Paint - Official Order Inquiry*\n` +
      `*Data Arooj Paint Gallery*\n` +
      `--------------------------------------\n\n` +
      `${orderList}\n\n` +
      `--------------------------------------\n` +
      `*TOTAL ESTIMATED AMOUNT:* Rs. ${totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}\n` +
      `${customerDetails}\n\n` +
      `Please confirm stock, batch numbers, and delivery timeline.`
    );

    window.open(`https://wa.me/${COMPANY_DETAILS.phone1Raw}?text=${message}`, '_blank');
  };

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmitOrderForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.city.trim()) {
      setFormError('Please provide your name, phone number, and city.');
      return;
    }
    setFormError(null);

    const orderNum = `ASP-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedOrderNumber(orderNum);
    setActiveTab('success');

    try {
      confetti({
        particleCount: 70,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-[#c1121f] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Dealer Quotation & Cart
                </h3>
                <span className="text-xs text-red-100">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in order list
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs (Cart vs Dealer Form) */}
          {items.length > 0 && activeTab !== 'success' && (
            <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('cart')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'cart'
                    ? 'border-[#c1121f] text-[#c1121f] bg-white font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                1. Review Items
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('dealerForm')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'dealerForm'
                    ? 'border-[#c1121f] text-[#c1121f] bg-white font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                2. Dealer Dispatch Details
              </button>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-1">Your Quotation is Empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Select interior emulsions, weather shields, enamels, or wood coatings from the dealer catalog.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#c1121f] hover:bg-[#a50f1b] rounded-xl transition-colors cursor-pointer"
                >
                  Browse Products
                </button>
              </div>
            ) : activeTab === 'cart' ? (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col gap-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <span className="font-mono font-bold text-[#c1121f]">#{item.product.code}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.product.brand}</span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h5>
                        <div className="text-xs text-[#c1121f] font-semibold mt-0.5">
                          {PACK_SIZE_LABELS[item.selectedSize] || item.selectedSize}
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="px-2.5 py-1 text-slate-700 hover:bg-slate-200 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold font-mono tabular-nums bg-white min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2.5 py-1 text-slate-700 hover:bg-slate-200 font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Subtotal</span>
                        <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                          Rs. {(item.unitPrice * item.quantity).toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={onClearCart}
                  className="text-xs text-slate-400 hover:text-red-600 transition-colors block text-center w-full py-1"
                >
                  Clear All Items
                </button>
              </div>
            ) : activeTab === 'dealerForm' ? (
              <form onSubmit={handleSubmitOrderForm} className="space-y-4">
                <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-xs text-red-900 leading-relaxed">
                  Provide your dealer or shop details for formal quotation, factory stock verification, and direct freight routing.
                </div>

                {formError && (
                  <div className="bg-rose-100 text-[#c1121f] text-xs font-bold p-2.5 rounded-lg border border-red-200">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Haji Muhammad Aslam"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Shop / Company / Hardware Store Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyShopName}
                    onChange={(e) => setFormData({ ...formData, companyShopName: e.target.value })}
                    placeholder="e.g. Aslam Paint & Hardware Store"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      City / Station *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Peshawar, Lahore, Quetta"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Supply Region / Province
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="KPK">Khyber Pakhtunkhwa (KPK)</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                    <option value="Quetta & Chaman">Quetta & Chaman (Balochistan)</option>
                    <option value="Sindh & Federal">Islamabad / Federal / Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Delivery / Warehouse Address
                  </label>
                  <textarea
                    rows={2}
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    placeholder="Full street or godown location for transport goods"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Special Batch Instructions / Color Shades
                  </label>
                  <textarea
                    rows={2}
                    value={formData.orderNotes}
                    onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                    placeholder="Specific shades or urgency details"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c1121f]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-[#c1121f] hover:bg-[#a50f1b] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Submit Dealer Purchase Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Success View */
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-red-50 text-[#c1121f] flex items-center justify-center mx-auto mb-4 border border-red-200">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  Quotation Confirmed!
                </h4>
                <div className="text-xs font-mono font-bold text-[#c1121f] bg-red-50 py-1.5 px-3 rounded inline-block mb-3 border border-red-100">
                  Reference: #{submittedOrderNumber}
                </div>
                <p className="text-xs text-slate-600 max-w-xs mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-slate-800">{formData.fullName}</strong>. Your quotation request has been routed to Malik Kabeer Shahid and Shahid Malik Badshah for direct factory processing.
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destination:</span>
                    <span className="font-semibold text-slate-900">{formData.city}, {formData.province}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Items:</span>
                    <span className="font-semibold text-slate-900">{items.length} Product Lines</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-bold">
                    <span className="text-slate-700">Estimated Total:</span>
                    <span className="text-slate-900 font-mono">Rs. {totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-[#c1121f] hover:bg-[#a50f1b] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Order Summary via WhatsApp</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Quotation Sheet</span>
                  </button>

                  <button
                    onClick={() => {
                      onClearCart();
                      setActiveTab('cart');
                      onClose();
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 py-2 mt-2 cursor-pointer"
                  >
                    Close and Return to Catalog
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && activeTab !== 'success' && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Subtotal ({items.length} items):</span>
                <span className="font-mono font-semibold text-slate-900">
                  Rs. {totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Dealer Freight:</span>
                <span className="text-[#c1121f] font-semibold">All-Pakistan Dispatch</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Dealer Rate:</span>
                <span className="text-lg font-mono text-[#c1121f] tabular-nums font-black">
                  Rs. {totalAmount.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="py-3 px-3 rounded-xl font-bold text-xs text-white bg-[#c1121f] hover:bg-[#a50f1b] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  title="Send invoice directly to WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Order</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('dealerForm')}
                  className="py-3 px-3 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Dealer Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
