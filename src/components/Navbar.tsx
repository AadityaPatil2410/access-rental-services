import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Layers,
  ShoppingBag,
  Menu,
  X,
  ShieldCheck,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Heart,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    bookings,
    filterCategoryQuick,
    wishlist,
    setShowOnlyWishlist,
    showOnlyWishlist,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeBookingCount = bookings.filter((b) => b.status !== 'returned').length;

  const handleNav = (page: 'home' | 'catalog' | 'my-bookings') => {
    if (page === 'catalog') {
      setShowOnlyWishlist(false);
    }
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  const handleWishlistNav = () => {
    setShowOnlyWishlist(true);
    navigateTo('catalog');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top micro-banner for Strategy / Prototype context */}
      <div className="bg-slate-900 text-slate-200 text-[11px] font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2 overflow-x-auto whitespace-nowrap">
        <span className="bg-indigo-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded tracking-wide uppercase">
          Marketing Demo
        </span>
        <span>
          <strong>Validated Core Launch:</strong> Projector Rentals are <strong>100% Live</strong> • Other Categories under Roadmap Validation
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 group text-left focus:outline-hidden"
              id="brand-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg border border-slate-800 shadow-xs group-hover:bg-indigo-600 transition-colors">
                A
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 flex items-center gap-1">
                  ACCESS
                </span>
                <span className="block text-[10px] sm:text-[11px] font-semibold text-indigo-600 tracking-wide -mt-0.5 uppercase">
                  Access More. Own Less.
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
              id="nav-home-btn"
            >
              Home
            </button>

            <button
              onClick={() => handleNav('catalog')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentPage === 'catalog'
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
              id="nav-catalog-btn"
            >
              <span>Browse Catalog</span>
              <span className="bg-slate-200 text-slate-700 text-[10px] font-semibold px-1.5 py-0.2 rounded-full">
                50
              </span>
            </button>

            {/* Quick Live Category Pill */}
            <button
              onClick={() => {
                filterCategoryQuick('projectors');
              }}
              className="px-3 py-2 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              id="nav-projectors-live-pill"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Projectors (Live)</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('how-it-works-section');
                if (currentPage !== 'home') {
                  handleNav('home');
                  setTimeout(() => {
                    document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-3.5 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100/70 transition-colors"
            >
              How It Works
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('why-access-section');
                if (currentPage !== 'home') {
                  handleNav('home');
                  setTimeout(() => {
                    document.getElementById('why-access-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-3.5 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100/70 transition-colors"
            >
              Why ACCESS
            </button>
          </nav>

          {/* Right Action Icons & Book Now CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistNav}
              className={`px-2.5 py-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-all border ${
                currentPage === 'catalog' && showOnlyWishlist
                  ? 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              id="nav-wishlist-btn"
              title="View saved wishlist"
            >
              <Heart
                size={16}
                className={
                  wishlist.length > 0
                    ? 'text-rose-500 fill-rose-500'
                    : 'text-slate-400'
                }
              />
              <span className="hidden sm:inline">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="bg-rose-600 text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* My Bookings Trigger */}
            <button
              onClick={() => handleNav('my-bookings')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 transition-all border ${
                currentPage === 'my-bookings'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              id="nav-my-bookings-btn"
              title="View my active and past bookings"
            >
              <ShoppingBag size={16} className="text-indigo-600" />
              <span className="hidden sm:inline">My Bookings</span>
              {activeBookingCount > 0 && (
                <span className="bg-indigo-600 text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeBookingCount}
                </span>
              )}
            </button>

            {/* Primary "Book Now" CTA */}
            <button
              onClick={() => handleNav('catalog')}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
              id="nav-primary-book-now-btn"
            >
              <span>Book Gear</span>
              <ArrowRight size={15} />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="p-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Navigation</div>
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-slate-800 hover:bg-slate-100 text-sm flex items-center justify-between"
          >
            <span>Home</span>
            <span className="text-xs text-slate-400">Overview</span>
          </button>
          <button
            onClick={() => handleNav('catalog')}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-slate-800 hover:bg-slate-100 text-sm flex items-center justify-between"
          >
            <span>Browse All 50 Products</span>
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full font-semibold">5 Categories</span>
          </button>
          <button
            onClick={handleWishlistNav}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-rose-800 bg-rose-50 text-sm flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Heart size={16} className="text-rose-600 fill-rose-600" />
              <span>Saved Wishlist</span>
            </span>
            <span className="bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">{wishlist.length}</span>
          </button>
          <button
            onClick={() => {
              filterCategoryQuick('projectors');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-emerald-800 bg-emerald-50 text-sm flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Projector Rentals (100% Live)</span>
            </span>
            <span className="text-xs font-semibold text-emerald-700">20 Models</span>
          </button>
          <button
            onClick={() => handleNav('my-bookings')}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-slate-800 hover:bg-slate-100 text-sm flex items-center justify-between"
          >
            <span>My Bookings & QA Certificates</span>
            <span className="bg-slate-900 text-white text-xs px-2 py-0.5 rounded-full font-semibold">{bookings.length}</span>
          </button>

          <div className="pt-3 border-t border-slate-200">
            <button
              onClick={() => handleNav('catalog')}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold text-sm text-center shadow-xs flex items-center justify-center gap-2"
            >
              <span>Explore Projector Fleet</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
