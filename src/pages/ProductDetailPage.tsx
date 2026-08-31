import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCT_DETAIL_FAQS } from '../data/marketing';
import { StatusBadge } from '../components/StatusBadge';
import { QaInspectionCertificate } from '../components/QaInspectionCertificate';
import { DeliveryType } from '../types';
import {
  Star,
  ShieldCheck,
  Calendar,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Package,
  Layers,
  ArrowLeft,
  Bell,
  AlertTriangle,
  Award,
  Heart,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    navigateTo,
    initiateCheckout,
    openWaitlist,
    filterCategoryQuick,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  // Tomorrow as default start
  const getInitialDates = () => {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    const end = new Date();
    end.setDate(end.getDate() + 3);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    };
  };

  const initial = getInitialDates();
  const [startDate, setStartDate] = useState(initial.startDate);
  const [endDate, setEndDate] = useState(initial.endDate);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('campus_pickup');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-deposit');

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600 mb-4">No product selected.</p>
        <button
          onClick={() => navigateTo('catalog')}
          className="px-4 py-2 bg-blue-700 text-white rounded-xl font-bold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const isBookable = selectedProduct.status === 'bookable';
  const isWaitlist = selectedProduct.status === 'waitlist';
  const isComingSoon = selectedProduct.status === 'coming_soon';
  const isDisabled = selectedProduct.status === 'disabled';

  // Calculate rental duration in days
  const calculateDays = () => {
    try {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const diffTime = e.getTime() - s.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  };

  const days = calculateDays();
  const rentalFee = selectedProduct.dailyPrice * days;
  const deliveryFee = deliveryType === 'doorstep' ? 99 : 0;
  const deposit = selectedProduct.deposit;
  const grandTotal = rentalFee + deliveryFee + deposit;

  const handleProceedToCheckout = () => {
    initiateCheckout(selectedProduct, startDate, endDate, days, deliveryType);
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-8">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-slate-900 transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('catalog')}
          className="hover:text-slate-900 transition-colors"
        >
          Catalog
        </button>
        <span>/</span>
        <button
          onClick={() => filterCategoryQuick(selectedProduct.category)}
          className="hover:text-slate-900 transition-colors"
        >
          {selectedProduct.categoryLabel}
        </button>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs">{selectedProduct.name}</span>
      </nav>

      {/* 2. Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Imagery & QA Certificate (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Product Image Card */}
          <div className="relative aspect-16/11 bg-slate-900 rounded-xl overflow-hidden shadow-xs border border-slate-200 group">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />

            {/* Floating Top Badges */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none z-10">
              <StatusBadge status={selectedProduct.status} size="md" />

              <div className="flex items-center gap-2 pointer-events-auto">
                {isBookable && (
                  <div className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm border border-slate-700">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    <span>Tested Before Dispatch</span>
                  </div>
                )}

                {/* Wishlist Heart Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(selectedProduct.id, selectedProduct.name)}
                  aria-label={isInWishlist(selectedProduct.id) ? 'Remove from wishlist' : 'Save to wishlist'}
                  title={isInWishlist(selectedProduct.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  id={`detail-wishlist-toggle-${selectedProduct.id}`}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm focus:outline-hidden ${
                    isInWishlist(selectedProduct.id)
                      ? 'bg-white text-rose-500 ring-1 ring-rose-200 hover:bg-rose-50 scale-105'
                      : 'bg-slate-900/70 hover:bg-white text-white hover:text-rose-500 backdrop-blur-xs'
                  }`}
                >
                  <Heart
                    size={16}
                    className={`transition-colors ${
                      isInWishlist(selectedProduct.id) ? 'fill-rose-500 text-rose-500' : 'text-current'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Bottom brand pill */}
            <div className="absolute bottom-3.5 left-3.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-md text-xs font-bold text-slate-900 shadow-xs border border-slate-200">
              {selectedProduct.brand} Original Fleet
            </div>
          </div>

          {/* QA Certificate Display (if bookable) */}
          {isBookable && (
            <QaInspectionCertificate
              serialNumber={`QA-${selectedProduct.brand.toUpperCase()}-${selectedProduct.id.toUpperCase()}`}
              lampHealth={
                selectedProduct.brightnessLumens
                  ? `${selectedProduct.brightnessLumens} ANSI Lumens Output Certified`
                  : 'Certified Output 99.2%'
              }
            />
          )}

          {/* Highlights & Included Accessories */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <Package size={16} className="text-indigo-600" />
              <span>What's Included in the Complete Rental Kit</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              {selectedProduct.includedAccessories.map((acc, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">{acc}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                <span className="font-semibold text-slate-800">Ideal For: </span>
                {selectedProduct.idealFor}
              </p>
            </div>
          </div>

          {/* Detailed Product Specs Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <h3 className="font-semibold text-slate-900 text-sm">Key Technical Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {selectedProduct.specs.map((spec, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 font-medium text-slate-800">
                  {spec}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {selectedProduct.description}
            </p>
          </div>
        </div>

        {/* Right Column: Pricing, Dates, Booking State (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Header Card: Title, Brand, Rating */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                {selectedProduct.brand} • {selectedProduct.categoryLabel}
              </span>
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-xs font-semibold text-amber-900">
                <Star size={12} className="text-amber-500 fill-amber-500" />
                <span>{selectedProduct.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal text-[11px]">({selectedProduct.reviewCount})</span>
              </div>
            </div>

            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
              {selectedProduct.name}
            </h1>

            {/* Price Header */}
            <div className="pt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 font-mono">
                ₹{selectedProduct.dailyPrice}
              </span>
              <span className="text-xs font-medium text-slate-500">/ day</span>
              <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium">
                + ₹{selectedProduct.deposit} Refundable Deposit
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STATE A: IF BOOKABLE (Live Projector Booking Widget) */}
          {/* ========================================================================= */}
          {isBookable ? (
            <div className="bg-white rounded-xl border border-indigo-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-indigo-600" />
                  <h3 className="font-semibold text-slate-900 text-sm">Select Event Dates</h3>
                </div>
                <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono">
                  {days} Day{days > 1 ? 's' : ''} Rental
                </span>
              </div>

              {/* Date pickers */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    id="product-start-date-input"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Return Date</label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    id="product-end-date-input"
                  />
                </div>
              </div>

              {/* Delivery Option Selector */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Delivery / Pickup Method
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('campus_pickup')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      deliveryType === 'campus_pickup'
                        ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-semibold ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold flex items-center justify-between">
                      <span>Campus Hub</span>
                      <span className="text-emerald-700 text-[10px] bg-emerald-100 px-1.5 py-0.2 rounded font-bold">
                        FREE
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-normal">
                      Pick up at Student Center
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('doorstep')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      deliveryType === 'doorstep'
                        ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-semibold ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold flex items-center justify-between">
                      <span>Doorstep</span>
                      <span className="font-mono text-slate-700 text-[11px]">₹99</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-normal">
                      Delivered to Hostel / Venue
                    </p>
                  </button>
                </div>
              </div>

              {/* Live Price Breakdown */}
              <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>
                    Rental Fee (₹{selectedProduct.dailyPrice} × {days} day{days > 1 ? 's' : ''})
                  </span>
                  <span className="font-mono font-semibold text-slate-900">₹{rentalFee}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>Delivery / Handling</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <span>100% Refundable Deposit</span>
                    <span className="text-emerald-700 text-[10px] font-semibold">(Returned via UPI)</span>
                  </span>
                  <span className="font-mono font-semibold text-slate-900">₹{deposit}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
                  <span>Total Payable Now</span>
                  <span className="font-mono text-base text-indigo-600">₹{grandTotal}</span>
                </div>
              </div>

              {/* Deposit Return Policy Callout */}
              <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 leading-relaxed">
                <CheckCircle2 size={14} className="shrink-0 text-emerald-600" />
                <span>
                  <strong>Instant Return Guarantee:</strong> Your ₹{deposit} deposit is credited back to your UPI within 120 minutes of post-event return.
                </span>
              </p>

              {/* Primary Action Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-lg font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2"
                id="proceed-to-checkout-btn"
              >
                <span>Proceed to Checkout (₹{grandTotal})</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            /* ========================================================================= */
            /* STATE B: IF WAITLIST / COMING SOON / DISABLED */
            /* ========================================================================= */
            <div className="bg-white rounded-xl border border-amber-300 p-5 shadow-xs space-y-4">
              <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 space-y-1.5 text-xs text-amber-900">
                <div className="flex items-center gap-1.5 font-bold text-amber-950 text-xs uppercase tracking-wider">
                  <Sparkles size={14} className="text-amber-600" />
                  <span>Category Under Demand Validation</span>
                </div>
                <p className="leading-relaxed">
                  We're currently validating demand for <strong>{selectedProduct.categoryLabel}</strong> on your campus. 
                  Our <strong>Projector rental network is 100% LIVE now</strong> for immediate booking.
                </p>
                {selectedProduct.statusNote && (
                  <p className="pt-1.5 border-t border-amber-200/80 font-medium text-amber-800 text-[11px]">
                    <strong>Note: </strong> {selectedProduct.statusNote}
                  </p>
                )}
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-700">
                  <span>Projected Daily Rent</span>
                  <span className="font-mono font-bold text-slate-900">₹{selectedProduct.dailyPrice}/day</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Estimated Deposit</span>
                  <span className="font-mono font-bold text-slate-900">₹{selectedProduct.deposit}</span>
                </div>
              </div>

              {!isDisabled ? (
                <button
                  onClick={() => openWaitlist(selectedProduct)}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                  id="product-detail-join-waitlist-btn"
                >
                  <Bell size={14} />
                  <span>Join Priority Waitlist</span>
                </button>
              ) : (
                <div className="p-2.5 bg-slate-100 rounded-lg text-xs text-slate-500 text-center font-medium">
                  Analysis completed: Unit economics not viable for recurring rental.
                </div>
              )}

              <button
                onClick={() => filterCategoryQuick('projectors')}
                className="w-full py-2 border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Browse Live Projectors Instead</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}

          {/* 3. FAQ ACCORDION (3 Required FAQs + Policies) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
              <HelpCircle size={15} className="text-indigo-600" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-1.5 text-xs">
              {PRODUCT_DETAIL_FAQS.map((faq) => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-slate-200 rounded-lg overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-2.5 text-left font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-2"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp size={14} className="text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown size={14} className="text-slate-500 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-2.5 bg-white text-slate-600 leading-relaxed border-t border-slate-100 text-xs">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
