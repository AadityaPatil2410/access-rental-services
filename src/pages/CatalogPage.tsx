import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORY_METADATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryType, ProductStatus } from '../types';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Star,
  Check,
  X,
  Filter,
  Layers,
  ArrowUpDown,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Heart,
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    selectedStatuses,
    setSelectedStatuses,
    sortBy,
    setSortBy,
    showOnlyWishlist,
    setShowOnlyWishlist,
    wishlist,
    resetFilters,
  } = useApp();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract all unique brands dynamically
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    PRODUCTS.forEach((p) => brandsSet.add(p.brand));
    return Array.from(brandsSet).sort();
  }, []);

  // Filter and sort the 50 products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.categoryLabel.toLowerCase().includes(q);
        const matchesSpecs = product.specs.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesSpecs) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) {
          return false;
        }
      }

      // 3. Brand Filter
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(product.brand)) {
          return false;
        }
      }

      // 4. Price Range
      if (product.dailyPrice < priceRange[0] || product.dailyPrice > priceRange[1]) {
        return false;
      }

      // 5. Min Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // 6. Status Filter
      if (selectedStatuses.length > 0) {
        if (!selectedStatuses.includes(product.status)) {
          return false;
        }
      }

      // 7. Wishlist Filter
      if (showOnlyWishlist) {
        if (!wishlist.includes(product.id)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.dailyPrice - b.dailyPrice;
      if (sortBy === 'price_desc') return b.dailyPrice - a.dailyPrice;
      if (sortBy === 'rating_desc') return b.rating - a.rating;
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      if (sortBy === 'newest') return a.id.localeCompare(b.id);
      return 0;
    });
  }, [
    searchQuery,
    selectedCategories,
    selectedBrands,
    priceRange,
    minRating,
    selectedStatuses,
    showOnlyWishlist,
    wishlist,
    sortBy,
  ]);

  const toggleCategory = (cat: CategoryType) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleStatus = (status: ProductStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000 ||
    minRating > 0 ||
    selectedStatuses.length > 0 ||
    showOnlyWishlist;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 1. Header & Strategy Overview */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">
              <Layers size={13} />
              <span>Full Prototype Catalog • 50 Products Total</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Occasion Rental Gear
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Browse 20 live projector models plus roadmap categories in validation phase.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>20 Projectors Ready to Book</span>
            </span>
            <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md font-medium hidden sm:inline-flex">
              30 Future Items (Waitlist/Roadmap)
            </span>
          </div>
        </div>

        {/* Quick Category Switcher Tabs */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1.5 scrollbar-none">
          <button
            onClick={() => {
              setSelectedCategories([]);
              setShowOnlyWishlist(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              selectedCategories.length === 0 && !showOnlyWishlist
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Categories ({PRODUCTS.length})
          </button>

          {/* Wishlist / Saved Gear Quick Tab */}
          <button
            onClick={() => setShowOnlyWishlist((prev) => !prev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
              showOnlyWishlist
                ? 'bg-rose-600 text-white shadow-xs font-semibold'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
            id="catalog-wishlist-filter-tab"
            title="Filter to only your saved wishlist items"
          >
            <Heart
              size={13}
              className={showOnlyWishlist ? 'fill-white text-white' : 'text-rose-500 fill-rose-500'}
            />
            <span>Saved Wishlist</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                showOnlyWishlist ? 'bg-rose-700 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {wishlist.length}
            </span>
          </button>

          {Object.values(CATEGORY_METADATA).map((cat) => {
            const count = PRODUCTS.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategories.includes(cat.id as any);
            const isLive = cat.status === 'bookable';

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setShowOnlyWishlist(false);
                  toggleCategory(cat.id as any);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected && !showOnlyWishlist
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {isLive && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected && !showOnlyWishlist ? 'bg-white' : 'bg-emerald-500'
                    }`}
                  />
                )}
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isSelected && !showOnlyWishlist ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Search & Sort Top Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80 md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by brand, name, or resolution..."
            className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            id="catalog-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Right Sort & Mobile Filter Toggle */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5"
            id="mobile-filters-trigger-btn"
          >
            <SlidersHorizontal size={13} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium hidden md:inline">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 pr-7 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                id="catalog-sort-select"
              >
                <option value="popular">Most Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Highest Rated</option>
                <option value="newest">Catalog Order</option>
              </select>
              <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Body: Filter Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* ========================================== */}
        {/* DESKTOP FILTER SIDEBAR */}
        {/* ========================================== */}
        <div className="hidden lg:block bg-white rounded-xl border border-slate-200 p-4 shadow-xs sticky top-20 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs uppercase tracking-wider">
              <Filter size={14} className="text-indigo-600" />
              <span>Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                id="sidebar-clear-filters-btn"
              >
                <RotateCcw size={11} />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Filter 1: Status */}
          <div>
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
              Availability Status
            </h4>
            <div className="space-y-1 text-xs">
              {[
                { id: 'bookable', label: 'Ready to Book (Live)', color: 'text-emerald-700' },
                { id: 'waitlist', label: 'Waitlist / Validating', color: 'text-amber-800' },
                { id: 'coming_soon', label: 'Roadmap / Coming Soon', color: 'text-sky-800' },
                { id: 'disabled', label: 'Infeasible / Low Cost', color: 'text-slate-500' },
              ].map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-2 cursor-pointer py-1 px-1.5 rounded hover:bg-slate-50 text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(s.id as any)}
                    onChange={() => toggleStatus(s.id as any)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className={`font-medium ${s.color}`}>{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter 2: Categories */}
          <div>
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
              Category
            </h4>
            <div className="space-y-1 text-xs">
              {Object.values(CATEGORY_METADATA).map((cat) => {
                const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                return (
                  <label
                    key={cat.id}
                    className="flex items-center justify-between cursor-pointer py-1 px-1.5 rounded hover:bg-slate-50 text-slate-700"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id as any)}
                        onChange={() => toggleCategory(cat.id as any)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="font-medium text-slate-800">{cat.label}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{count}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Filter 3: Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Max Daily Rent
              </h4>
              <span className="text-xs font-mono font-semibold text-indigo-600">
                ₹{priceRange[1]}/day
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={1000}
              step={50}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>₹50/day</span>
              <span>₹1,000/day</span>
            </div>
          </div>

          {/* Filter 4: Minimum Rating */}
          <div>
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
              Minimum Rating
            </h4>
            <div className="grid grid-cols-4 gap-1 text-xs">
              {[
                { val: 0, label: 'All' },
                { val: 4.0, label: '4.0+' },
                { val: 4.5, label: '4.5+' },
                { val: 4.8, label: '4.8+' },
              ].map((r) => (
                <button
                  key={r.val}
                  onClick={() => setMinRating(r.val)}
                  className={`py-1 rounded font-medium text-center border transition-colors ${
                    minRating === r.val
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-semibold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 5: Brands Checkboxes */}
          <div>
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
              Brands ({allBrands.length})
            </h4>
            <div className="max-h-44 overflow-y-auto space-y-1 pr-1 text-xs scrollbar-thin">
              {allBrands.map((brand) => {
                const count = PRODUCTS.filter((p) => p.brand === brand).length;
                return (
                  <label
                    key={brand}
                    className="flex items-center justify-between cursor-pointer py-1 px-1.5 rounded hover:bg-slate-50 text-slate-700"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="font-medium text-slate-800">{brand}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">({count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* PRODUCT GRID & COUNTER */}
        {/* ========================================== */}
        <div className="lg:col-span-3 space-y-5">
          {/* Active Filter Tags Row & Counter */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <p className="text-slate-600 font-medium">
              Showing <span className="font-semibold text-slate-900">{filteredProducts.length}</span> of{' '}
              <span className="font-semibold text-slate-900">{PRODUCTS.length}</span> products
            </p>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedCategories.map((c) => (
                  <span
                    key={c}
                    className="bg-indigo-50 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded flex items-center gap-1 font-medium text-[11px]"
                  >
                    <span>{CATEGORY_METADATA[c].label}</span>
                    <button onClick={() => toggleCategory(c)}>
                      <X size={11} />
                    </button>
                  </span>
                ))}

                {selectedBrands.map((b) => (
                  <span
                    key={b}
                    className="bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded flex items-center gap-1 font-medium text-[11px]"
                  >
                    <span>{b}</span>
                    <button onClick={() => toggleBrand(b)}>
                      <X size={11} />
                    </button>
                  </span>
                ))}

                {showOnlyWishlist && (
                  <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded flex items-center gap-1 font-medium text-[11px]">
                    <Heart size={11} className="fill-rose-600 text-rose-600" />
                    <span>Saved Wishlist ({wishlist.length})</span>
                    <button onClick={() => setShowOnlyWishlist(false)}>
                      <X size={11} />
                    </button>
                  </span>
                )}

                {minRating > 0 && (
                  <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded flex items-center gap-1 font-medium text-[11px]">
                    <span>{minRating}+ Stars</span>
                    <button onClick={() => setMinRating(0)}>
                      <X size={11} />
                    </button>
                  </span>
                )}

                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold ml-1"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Grid Container */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" id="products-catalog-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-white rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                {showOnlyWishlist ? <Heart size={18} className="text-rose-500 fill-rose-100" /> : <Search size={18} />}
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">
                {showOnlyWishlist ? 'Your Wishlist is currently empty' : 'No matching rental equipment'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {showOnlyWishlist
                  ? 'Click the heart icon on any projector or gear card to save it for quick access anytime!'
                  : 'Try adjusting your search keywords, clearing brand filters, or resetting the price slider.'}
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow-xs hover:bg-indigo-700"
              >
                {showOnlyWishlist ? 'Browse All Equipment' : 'Reset All Filters'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* MOBILE FILTER MODAL / DRAWER */}
      {/* ========================================== */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="bg-white w-full max-w-md max-h-[85vh] rounded-t-2xl sm:rounded-xl p-6 overflow-y-auto space-y-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                <Filter size={16} className="text-indigo-600" />
                <span>Filter Equipment</span>
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Status Filter */}
            <div>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
                Availability
              </h4>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'bookable', label: 'Ready to Book (Live)' },
                  { id: 'waitlist', label: 'Waitlist / Validating' },
                  { id: 'coming_soon', label: 'Roadmap / Coming Soon' },
                  { id: 'disabled', label: 'Infeasible / Low Cost' },
                ].map((s) => (
                  <label key={s.id} className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(s.id as any)}
                      onChange={() => toggleStatus(s.id as any)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-800 font-medium">{s.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
                Category
              </h4>
              <div className="space-y-1.5 text-xs">
                {Object.values(CATEGORY_METADATA).map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id as any)}
                      onChange={() => toggleCategory(cat.id as any)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-slate-800 font-medium">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span className="font-semibold text-slate-800 uppercase tracking-wider">Max Rent</span>
                <span className="font-mono font-semibold text-indigo-600">₹{priceRange[1]}/day</span>
              </div>
              <input
                type="range"
                min={50}
                max={1000}
                step={50}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="pt-3 flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-1/2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
