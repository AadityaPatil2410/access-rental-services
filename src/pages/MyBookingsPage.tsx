import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QaInspectionCertificate } from '../components/QaInspectionCertificate';
import { Booking } from '../types';
import {
  ShoppingBag,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Award,
  Download,
} from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { bookings, navigateTo, showToast } = useApp();
  const [selectedBookingForQa, setSelectedBookingForQa] = useState<string | null>(null);

  const toggleQaView = (id: string) => {
    setSelectedBookingForQa(selectedBookingForQa === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShoppingBag size={13} />
            <span>Rental Activity & Inspection Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Bookings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track active equipment rentals, pre-dispatch QA inspection passes, and instant deposit returns.
          </p>
        </div>

        <button
          onClick={() => navigateTo('catalog')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs self-start sm:self-auto transition-colors"
        >
          <span>Rent More Equipment</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const isQaExpanded = selectedBookingForQa === booking.id;

            return (
              <div
                key={booking.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                id={`booking-card-${booking.id}`}
              >
                {/* Booking Card Header */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                      <ShoppingBag size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-slate-900 text-xs sm:text-sm">
                          {booking.id}
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-semibold px-1.5 py-0.2 rounded flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          <span>Pre-Dispatch QA Passed</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Created on {new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-base font-bold text-slate-900 font-mono">
                      ₹{booking.totalPaid}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      ₹{booking.deposit} Deposit (Refundable)
                    </span>
                  </div>
                </div>

                {/* Booking Body */}
                <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product Snippet (5 cols) */}
                  <div className="md:col-span-5 flex items-center gap-3">
                    <img
                      src={booking.productImage}
                      alt={booking.productName}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">
                        {booking.brand} Fleet
                      </span>
                      <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-snug">
                        {booking.productName}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        ₹{booking.dailyPrice}/day • {booking.days} Day{booking.days > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Booking Details (5 cols) */}
                  <div className="md:col-span-5 grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 text-[11px] font-medium">Rental Dates:</span>
                      <p className="font-semibold text-slate-800 font-mono text-[11px]">
                        {booking.startDate} to {booking.endDate}
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-slate-400 text-[11px] font-medium">Delivery Slot:</span>
                      <p className="font-semibold text-slate-800 capitalize text-[11px]">
                        {booking.deliverySlot} Slot
                      </p>
                    </div>

                    <div className="col-span-2 space-y-0.5">
                      <span className="text-slate-400 text-[11px] font-medium">Location:</span>
                      <p className="font-medium text-slate-700 text-[11px] truncate">
                        {booking.deliveryAddress}
                      </p>
                    </div>
                  </div>

                  {/* Actions (2 cols) */}
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <button
                      onClick={() => toggleQaView(booking.id)}
                      className="w-full py-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <ShieldCheck size={13} className="text-emerald-700" />
                      <span>{isQaExpanded ? 'Hide QA' : 'QA Certificate'}</span>
                      {isQaExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </div>
                </div>

                {/* Expandable QA Inspection Certificate */}
                {isQaExpanded && (
                  <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200">
                    <QaInspectionCertificate
                      serialNumber={booking.qaCertificate.serialNumber}
                      inspector={booking.qaCertificate.inspector}
                      lampHealth={booking.qaCertificate.lampHealth}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-10 text-center bg-white rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingBag size={18} />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">No active rentals yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Choose a verified projector for your upcoming campus event or movie night.
          </p>
          <button
            onClick={() => navigateTo('catalog')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow-xs hover:bg-indigo-700 transition-colors"
          >
            Browse Projectors
          </button>
        </div>
      )}
    </div>
  );
};
