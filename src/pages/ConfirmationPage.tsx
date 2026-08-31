import React from 'react';
import { useApp } from '../context/AppContext';
import { QaInspectionCertificate } from '../components/QaInspectionCertificate';
import {
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Truck,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag,
  Download,
  Building,
  QrCode,
  FileCheck,
  Sparkles,
  Home,
} from 'lucide-react';

export const ConfirmationPage: React.FC = () => {
  const { lastBooking, navigateTo, showToast } = useApp();

  if (!lastBooking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-slate-600">No active booking found.</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleDownloadReceipt = () => {
    showToast(
      'Receipt & Inspection Record Downloaded',
      `Booking voucher for ${lastBooking.id} saved to your device.`,
      'success'
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* 1. Success Hero Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 shadow-xs text-center relative overflow-hidden border border-slate-800">
        <div className="max-w-xl mx-auto space-y-3 relative">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 size={28} />
          </div>

          <div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60">
              Booking Confirmed • QA Passed
            </span>
            <h1 className="text-xl sm:text-2xl font-bold mt-2 tracking-tight">
              Your Rental is Ready for Handover!
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Booking ID: <span className="font-mono font-semibold text-slate-200 text-sm">{lastBooking.id}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Booking Details & Tracking Receipt */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">
              {lastBooking.brand} Fleet
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {lastBooking.productName}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Booked by {lastBooking.customerName} ({lastBooking.phone})
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-500 font-medium">Total Paid (with Deposit)</span>
            <div className="text-xl font-bold text-indigo-600 font-mono">
              ₹{lastBooking.totalPaid}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              ₹{lastBooking.deposit} Deposit Refundable
            </span>
          </div>
        </div>

        {/* Handover & Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
              <Calendar size={14} className="text-indigo-600" />
              <span>Rental Window</span>
            </div>
            <p className="text-slate-700 font-mono font-semibold text-xs">
              {lastBooking.startDate} to {lastBooking.endDate}
            </p>
            <p className="text-[11px] text-slate-500">{lastBooking.days} Days Total Duration</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
              <MapPin size={14} className="text-indigo-600" />
              <span>Handover Location</span>
            </div>
            <p className="text-slate-700 font-medium line-clamp-2 text-xs">
              {lastBooking.deliveryAddress}
            </p>
            <p className="text-[11px] text-slate-500 capitalize">
              {lastBooking.deliveryType === 'campus_pickup' ? 'Campus Hub (Free)' : 'Doorstep Handover'}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
              <Clock size={14} className="text-indigo-600" />
              <span>Time Slot & Method</span>
            </div>
            <p className="text-slate-700 font-medium capitalize text-xs">
              {lastBooking.deliverySlot} Slot
            </p>
            <p className="text-[11px] text-slate-500 uppercase font-mono">
              {lastBooking.paymentMethod} • {lastBooking.paymentIdentifier}
            </p>
          </div>
        </div>

        {/* 3. Verified Pre-Dispatch QA Certificate Embedded */}
        <QaInspectionCertificate
          serialNumber={lastBooking.qaCertificate.serialNumber}
          inspector={lastBooking.qaCertificate.inspector}
          lampHealth={lastBooking.qaCertificate.lampHealth}
        />

        {/* 4. Trust & Security Deposit Refund Guarantee */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-lg space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck size={15} />
            <span>ACCESS Trust Standard: Condition Photos & Test Logs Included</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            High-resolution pre-dispatch condition photos, test logs, and HDMI cable health have been registered to your booking record #{lastBooking.id}. Your ₹{lastBooking.deposit} security deposit will be automatically credited back to your payment account in under 120 minutes of post-event return inspection.
          </p>
        </div>

        {/* 5. Bottom Navigation Actions */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <button
            onClick={() => navigateTo('my-bookings')}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            id="confirmation-view-my-bookings-btn"
          >
            <ShoppingBag size={14} />
            <span>View in My Bookings</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownloadReceipt}
              className="w-full sm:w-auto px-3.5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download size={14} />
              <span>Download QA Voucher</span>
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              id="confirmation-back-to-home-btn"
            >
              <Home size={14} />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
