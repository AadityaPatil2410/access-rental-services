import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Bell, Calendar, User, Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WaitlistModal: React.FC = () => {
  const { isWaitlistOpen, waitlistProduct, closeWaitlist, submitWaitlist } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isWaitlistOpen || !waitlistProduct) return null;

  const isTools = waitlistProduct.category === 'tools';
  const isFormal = waitlistProduct.category === 'formalwear';
  const isScales不易 = waitlistProduct.category === 'scales';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitWaitlist(name, email, phone, eventDate);
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setPhone('');
      setEventDate('');
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          className="relative bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200"
          id="waitlist-modal-container"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 relative border-b border-slate-800">
            <button
              onClick={closeWaitlist}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md p-1.5 transition-colors"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              <Sparkles size={13} />
              <span>Category Expansion • Demand Validation</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              Join the Priority Waitlist
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Be the first to rent <span className="font-semibold text-white">{waitlistProduct.name}</span> when this category unlocks.
            </p>
          </div>

          {/* Validation note banner */}
          <div className="bg-amber-50/80 border-b border-amber-200/60 px-6 py-3 text-xs text-amber-900 flex items-start gap-2.5">
            <Bell size={15} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Why is this on waitlist? </span>
              ACCESS follows a <span className="font-semibold">"Start Narrow, Validate, Then Expand"</span> strategy. 
              Our <strong>Projector rental network is 100% LIVE today</strong>, while {waitlistProduct.categoryLabel} is actively gathering campus demand metrics before fleet deployment.
            </div>
          </div>

          {/* Product Snippet */}
          <div className="p-6 pt-4">
            <div className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 mb-5">
              <img
                src={waitlistProduct.image}
                alt={waitlistProduct.name}
                className="w-12 h-12 rounded-md object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-400">{waitlistProduct.brand} • {waitlistProduct.categoryLabel}</p>
                <h4 className="text-sm font-semibold text-slate-900 truncate">{waitlistProduct.name}</h4>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">Estimated Daily Rent: ₹{waitlistProduct.dailyPrice}/day</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditya Patil"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="aditya@college.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Expected Need Date / Occasion (Optional)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeWaitlist}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition disabled:opacity-50"
                  id="submit-waitlist-btn"
                >
                  {isSubmitting ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>Join Early Access</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
