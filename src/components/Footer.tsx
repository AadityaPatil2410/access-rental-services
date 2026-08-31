import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Sparkles, Award, Heart, CheckCircle2, ArrowUpRight, HelpCircle } from 'lucide-react';
import { CATEGORY_METADATA } from '../data/products';

export const Footer: React.FC = () => {
  const { navigateTo, filterCategoryQuick } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-12 pb-10 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                A
              </div>
              <span className="text-xl font-black text-white tracking-tight">ACCESS</span>
            </div>
            <p className="text-slate-300 font-medium text-xs tracking-wide uppercase">
              "Access More. Own Less."
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The premier occasion-based rental service. Solving low utilization and high capital costs for student clubs, campus fests, hackathons, and movie nights.
            </p>

            {/* Strategic validation badge */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1 max-w-sm">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 size={13} />
                <span>Validated Launch: 20 Live Projectors</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Demonstrating high-velocity fleet rotation, verified 6-point pre-dispatch inspections, and instant deposit refunds.
              </p>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5">
              Categories & Status
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => filterCategoryQuick('projectors')}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-200 font-medium">Projector Rentals (Live)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => filterCategoryQuick('tools')}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Drill & Tool Kits (Waitlist)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => filterCategoryQuick('formalwear')}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  <span>Formalwear & Blazers (Roadmap)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => filterCategoryQuick('scales')}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span>Weighing Scales (Roadmap)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => filterCategoryQuick('accessories')}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  <span className="text-slate-500">Mice / Peripherals (Archived)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantees */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5">
              Trust & Quality
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                <span>6-Point Pre-Dispatch QA</span>
              </li>
              <li className="flex items-center gap-2">
                <Award size={14} className="text-indigo-400 shrink-0" />
                <span>45-Min Hot-Swap Backup</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles size={14} className="text-amber-400 shrink-0" />
                <span>Zero Hidden Fees</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>&lt; 120 Min Deposit Refund</span>
              </li>
            </ul>
          </div>

          {/* Competition Prototype Note */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3.5">
              Demo Blueprint
            </h4>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg space-y-1.5 text-xs">
              <p className="text-slate-200 font-medium">
                Marketing Competition Demo
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Occasion-based rental economics simulation: 50 products across 5 categories showcasing demand-validated horizontal scaling.
              </p>
              <button
                onClick={() => navigateTo('catalog')}
                className="text-indigo-400 hover:text-indigo-300 font-medium text-xs flex items-center gap-1 mt-1"
              >
                <span>Launch Catalog</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 ACCESS Occasion-Based Rental Services. All prototype rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Validated for Student Communities & Campus Events</span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400 font-medium">100% Pre-Dispatch Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
