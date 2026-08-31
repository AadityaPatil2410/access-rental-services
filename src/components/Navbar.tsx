import React, { useState, useRef, useEffect } from 'react';
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
  User,
  LogIn,
  LogOut,
  Key,
  ChevronDown,
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
    user,
    openAuthModal,
    handleSignOut,
    customRazorpayKey,
    setCustomRazorpayKey,
    showToast,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [keyModalOpen, setKeyModalOpen] = useState(false);
  const [keyInput, setKeyInput] = useState(customRazorpayKey);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleSaveRazorpayKey = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomRazorpayKey(keyInput.trim());
    setKeyModalOpen(false);
    showToast(
      'Razorpay Key Updated',
      keyInput.trim() ? 'Custom Razorpay Key ID will be used for checkouts.' : 'Default Test Sandbox key active.',
      'success'
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top micro-banner */}
      <div className="bg-slate-900 text-slate-200 text-[11px] font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2 overflow-x-auto whitespace-nowrap">
        <span className="bg-emerald-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded tracking-wide uppercase">
          Live Service
        </span>
        <span>
          <strong>Real Authentication & Razorpay Gateway Enabled</strong> • Projector Fleet is 100% Ready
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
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
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

          {/* Right Action Icons & Auth / User Profile */}
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

            {/* Authentication Button / User Profile Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors focus:outline-hidden"
                  id="user-profile-menu-btn"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-7 h-7 rounded-full border border-slate-300 object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-medium text-slate-800 max-w-[90px] truncate hidden sm:inline">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {/* Profile dropdown menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user.displayName || 'Signed in user'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        handleNav('my-bookings');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ShoppingBag size={14} className="text-indigo-600" />
                      <span>My Rentals & Invoices</span>
                    </button>

                    <button
                      onClick={() => {
                        setKeyModalOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Key size={14} className="text-amber-600" />
                      <span>Razorpay Gateway Key</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        handleSignOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={openAuthModal}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                id="open-auth-modal-btn"
              >
                <LogIn size={15} />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

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

      {/* Razorpay Key Customizer Modal */}
      {keyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6">
            <button
              onClick={() => setKeyModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-2 text-amber-700 font-semibold text-xs uppercase tracking-wider">
              <Key size={16} />
              <span>Razorpay Key Configuration</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Razorpay Key ID (Optional)</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
              We provide a built-in public test key so you can test UPI & Card checkouts immediately. If you have your own Razorpay Test/Live Key ID (e.g. <code>rzp_test_xxxxxx</code>), paste it below:
            </p>

            <form onSubmit={handleSaveRazorpayKey} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Razorpay Key ID
                </label>
                <input
                  type="text"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="rzp_test_1DP5mmOlF5G5ag (Default Sandbox)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setKeyInput('');
                    setCustomRazorpayKey('');
                    setKeyModalOpen(false);
                    showToast('Key Reset', 'Restored default Razorpay Sandbox test key.', 'info');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Reset Default
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                >
                  Save Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="p-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Navigation</div>
          
          {user ? (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{user.displayName || 'Signed In'}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="text-xs text-rose-600 font-semibold px-2 py-1 hover:bg-rose-50 rounded"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal();
              }}
              className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2"
            >
              <LogIn size={15} />
              <span>Sign In / Create Account</span>
            </button>
          )}

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
