import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { StatusBadge } from './StatusBadge';
import { Star, ShieldCheck, ArrowRight, Bell, Sparkles, AlertCircle, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, openWaitlist, toggleWishlist, isInWishlist } = useApp();

  const isBookable = product.status === 'bookable';
  const isWaitlist = product.status === 'waitlist';
  const isComingSoon = product.status === 'coming_soon';
  const isDisabled = product.status === 'disabled';
  const isSaved = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product-detail', product.id);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBookable) {
      navigateTo('product-detail', product.id);
    } else if (isWaitlist || isComingSoon) {
      openWaitlist(product);
    } else {
      navigateTo('product-detail', product.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group bg-white rounded-xl border transition-all duration-200 flex flex-col overflow-hidden cursor-pointer relative ${
        isBookable
          ? 'border-slate-200 hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/5'
          : isDisabled
          ? 'border-slate-200/60 opacity-80 hover:opacity-100 bg-slate-50/50'
          : 'border-slate-200 hover:border-slate-400 hover:shadow-sm'
      }`}
      id={`product-card-${product.id}`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Overlay: Left Badges & Right Wishlist / Test Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-1.5 pointer-events-none z-10">
          <StatusBadge status={product.status} size="sm" />
          
          <div className="flex items-center gap-1.5">
            {isBookable && (
              <div className="bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                <ShieldCheck size={11} className="text-emerald-400" />
                <span>Tested</span>
              </div>
            )}

            {/* Heart / Wishlist Toggle Button */}
            <button
              type="button"
              onClick={handleWishlistToggle}
              aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
              title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
              id={`wishlist-heart-btn-${product.id}`}
              className={`pointer-events-auto w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-hidden ${
                isSaved
                  ? 'bg-white text-rose-500 shadow-sm ring-1 ring-rose-200 hover:bg-rose-50 scale-105'
                  : 'bg-slate-900/60 hover:bg-white text-white hover:text-rose-500 backdrop-blur-xs'
              }`}
            >
              <Heart
                size={14}
                className={`transition-all duration-200 ${
                  isSaved ? 'fill-rose-500 text-rose-500' : 'text-current'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Brand Chip on bottom-left of image */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs border border-slate-200/60">
          {product.brand}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="font-semibold text-slate-800 text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
            {product.name}
          </h3>

          {/* Specs Chips */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.specs.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="bg-slate-50 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200/70"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Feasibility / Roadmap note if not bookable */}
          {isDisabled && (
            <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded mb-3 line-clamp-2 leading-relaxed border border-slate-200/60">
              <AlertCircle size={12} className="inline mr-1 text-slate-400" />
              Low purchase cost makes rental non-viable.
            </p>
          )}

          {isWaitlist && (
            <p className="text-[11px] text-amber-900 bg-amber-50/70 p-1.5 rounded mb-3 border border-amber-200/60 flex items-center gap-1 font-medium">
              <Bell size={12} className="shrink-0 text-amber-600" />
              <span>Campus validation in progress</span>
            </p>
          )}

          {isComingSoon && (
            <p className="text-[11px] text-sky-900 bg-sky-50/70 p-1.5 rounded mb-3 border border-sky-200/60 flex items-center gap-1 font-medium">
              <Sparkles size={12} className="shrink-0 text-sky-600" />
              <span>Launching in upcoming cycle</span>
            </p>
          )}
        </div>

        {/* Pricing & CTA Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-slate-900">₹{product.dailyPrice}</span>
              <span className="text-xs text-slate-500 font-medium">/day</span>
            </div>
            <p className="text-[10px] text-slate-400">
              + ₹{product.deposit} refundable dep.
            </p>
          </div>

          {/* Action Button */}
          {isBookable ? (
            <button
              onClick={handleActionClick}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs"
              id={`book-now-btn-${product.id}`}
            >
              <span>Book Now</span>
              <ArrowRight size={13} />
            </button>
          ) : isWaitlist || isComingSoon ? (
            <button
              onClick={handleActionClick}
              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
              id={`waitlist-btn-${product.id}`}
            >
              <Bell size={12} />
              <span>Waitlist</span>
            </button>
          ) : (
            <button
              onClick={handleActionClick}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              <span>Info</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
