import React from 'react';
import { useApp } from '../context/AppContext';
import {
  HOW_IT_WORKS_STEPS,
  TRUST_BADGES,
  TESTIMONIALS,
  COMPARISON_TABLE,
} from '../data/marketing';
import { CATEGORY_METADATA, PRODUCTS } from '../data/products';
import { StatusBadge } from '../components/StatusBadge';
import { ProductCard } from '../components/ProductCard';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Calendar,
  Layers,
  Star,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
  Tv,
  Wrench,
  Shirt,
  Scale,
  Mouse,
  Search,
  PackageCheck,
  RotateCcw,
  BadgePercent,
  CalendarCheck2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, filterCategoryQuick } = useApp();

  // Highlighted 4 top-rated projectors for instant preview
  const featuredProjectors = PRODUCTS.filter((p) => p.category === 'projectors').slice(0, 4);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'PackageCheck':
        return <PackageCheck className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'RotateCcw':
        return <RotateCcw className="w-5 h-5" />;
      default:
        return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  const getTrustIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6" />;
      case 'BadgePercent':
        return <BadgePercent className="w-6 h-6" />;
      case 'CalendarCheck2':
        return <CalendarCheck2 className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      default:
        return <ShieldCheck className="w-6 h-6" />;
    }
  };

  const getCategoryIcon = (categoryKey: string) => {
    switch (categoryKey) {
      case 'projectors':
        return <Tv className="w-6 h-6 text-emerald-600" />;
      case 'tools':
        return <Wrench className="w-6 h-6 text-amber-600" />;
      case 'formalwear':
        return <Shirt className="w-6 h-6 text-sky-600" />;
      case 'scales':
        return <Scale className="w-6 h-6 text-indigo-600" />;
      case 'accessories':
        return <Mouse className="w-6 h-6 text-slate-500" />;
      default:
        return <Layers className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-14 sm:space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            {/* Category validation tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>VALIDATED LAUNCH CATEGORY: PROJECTOR RENTALS</span>
            </div>

            {/* Main Catchphrase */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Access More. <br />
              <span className="text-indigo-600">
                Own Less.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              The smart occasion-based rental service. Rent <strong>100% pre-tested high-lumen projectors</strong> for movie nights, hackathons, and student fest events with zero ownership hassles and instant deposit returns.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => filterCategoryQuick('projectors')}
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-lg text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-2 group"
                id="hero-browse-projectors-btn"
              >
                <span>Browse Projectors</span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('catalog')}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                id="hero-view-all-categories-btn"
              >
                <span>Explore All 50 Products</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-left border-t border-slate-100">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <p className="text-2xl font-bold text-slate-900 font-mono">1,420+</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Campus Events Powered</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <p className="text-2xl font-bold text-emerald-600 font-mono">100%</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Pre-Dispatch Tested</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <p className="text-2xl font-bold text-indigo-600 font-mono">₹6.8L+</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Student Budgets Saved</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <p className="text-2xl font-bold text-slate-700 font-mono">&lt; 120m</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">UPI Deposit Return</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_BADGES.map((badge, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-3 ${badge.color}`}>
                  {getTrustIcon(badge.icon)}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{badge.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS (6-Step Visual) */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Seamless Occasion Flow</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How ACCESS Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            From search to instant deposit return in 6 transparent, friction-free steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.step}
              className="relative p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold text-sm">
                    {getStepIcon(step.icon)}
                  </div>
                  <span className="text-xl font-bold text-slate-300 font-mono group-hover:text-indigo-600 transition-colors">
                    0{step.step}
                  </span>
                </div>

                <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3.5">{step.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                <CheckCircle2 size={13} className="shrink-0 text-emerald-600" />
                <span>{step.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CATEGORY EXPANSION PREVIEW (All 5 Categories with Statuses) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm relative">
          <div className="max-w-3xl mb-7 space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-400/30">
              <TrendingUp size={12} />
              <span>Multi-Category Expansion Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              "Start Narrow, Validate, Then Expand"
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We focus operations on high-turnover occasion equipment. Projectors are verified and fully bookable today, while future categories are open for campus demand voting.
            </p>
          </div>

          {/* 5 Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(CATEGORY_METADATA).map((cat) => {
              const productCount = PRODUCTS.filter((p) => p.category === cat.id).length;
              const isLive = cat.status === 'bookable';

              return (
                <div
                  key={cat.id}
                  onClick={() => filterCategoryQuick(cat.id as any)}
                  className={`p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border transition-all cursor-pointer flex flex-col justify-between ${
                    isLive ? 'border-emerald-500/60 ring-1 ring-emerald-500/30' : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="p-2 rounded-lg bg-slate-700/80 text-white">
                        {getCategoryIcon(cat.id)}
                      </div>
                      <StatusBadge status={cat.status} size="sm" />
                    </div>

                    <h3 className="font-semibold text-white text-sm mb-1">{cat.label}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{cat.description}</p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-700/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">{productCount} Models</span>
                    <span className="text-indigo-300 font-medium flex items-center gap-1">
                      <span>{isLive ? 'Book Fleet' : 'View Roadmap'}</span>
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. VALIDATED FLEET SHOWCASE: FEATURED PROJECTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Available for Immediate Booking</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Popular Projector Models
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              2,000 to 5,000 ANSI Lumens • Full HD & 4K • Delivered with HDMI, audio cords, and carrying case.
            </p>
          </div>

          <button
            onClick={() => filterCategoryQuick('projectors')}
            className="text-indigo-600 hover:text-indigo-700 text-xs font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All 20 Projectors</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProjectors.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. WHY ACCESS & COMPARISON TABLE */}
      <section id="why-access-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">The Problem & The Fix</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why ACCESS Makes Better Sense
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            High upfront purchase costs and &lt; 5% utilization trap college budgets. See how ACCESS stacks up against traditional options.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6 font-semibold">Comparison Factor</th>
                  <th className="py-3.5 px-4 font-medium text-slate-300">Buy New</th>
                  <th className="py-3.5 px-4 font-medium text-slate-300">Borrow Friends</th>
                  <th className="py-3.5 px-4 font-medium text-slate-300">Local AV Shop</th>
                  <th className="py-3.5 px-4 sm:px-6 font-semibold bg-indigo-600 text-white">ACCESS Model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_TABLE.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50 transition-colors ${
                      row.isHighlight ? 'bg-indigo-50/20 font-medium' : ''
                    }`}
                  >
                    <td className="py-3 px-4 sm:px-6 font-semibold text-slate-900">{row.factor}</td>
                    <td className="py-3 px-4 text-slate-500">{row.buyNew}</td>
                    <td className="py-3 px-4 text-slate-500">{row.borrowFriends}</td>
                    <td className="py-3 px-4 text-slate-500">{row.localVendor}</td>
                    <td className="py-3 px-4 sm:px-6 font-semibold text-indigo-950 bg-indigo-50/40">
                      {row.accessRental}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. AUTHENTIC STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Validated on Campus</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Student & Club Stories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real feedback from tech convenors, cultural secretaries, and student organizers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-2.5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">
                  "{test.content}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">{test.name}</h4>
                    <p className="text-[11px] text-slate-500">{test.role} • {test.organization}</p>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                  <span>{test.productRented}</span>
                  <span className="font-semibold">{test.savedAmount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM HERO CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-10 text-center relative overflow-hidden border border-slate-800">
          <div className="max-w-2xl mx-auto space-y-4 relative">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready for your next event?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Book a verified projector in 60 seconds with free campus pickup and guaranteed deposit return.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => filterCategoryQuick('projectors')}
                className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                id="bottom-cta-browse-btn"
              >
                <span>Browse Projector Inventory</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigateTo('catalog')}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg text-sm border border-slate-700 transition-colors"
              >
                <span>Browse Full 50-Item Catalog</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
