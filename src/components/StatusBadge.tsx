import React from 'react';
import { ProductStatus } from '../types';
import { CheckCircle2, Clock, Sparkles, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ProductStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium gap-1 whitespace-nowrap',
    md: 'text-xs px-2.5 py-1 font-medium gap-1.5 whitespace-nowrap',
    lg: 'text-xs px-3 py-1.5 font-semibold gap-1.5 whitespace-nowrap',
  };

  const iconSizes = {
    sm: 11,
    md: 13,
    lg: 14,
  };

  switch (status) {
    case 'bookable':
      return (
        <span
          className={`inline-flex items-center rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80 ${sizeClasses[size]} ${className}`}
        >
          {showIcon && <CheckCircle2 size={iconSizes[size]} className="text-emerald-600 shrink-0" />}
          <span>Live • Ready to Book</span>
        </span>
      );
    case 'waitlist':
      return (
        <span
          className={`inline-flex items-center rounded-md bg-amber-50 text-amber-900 border border-amber-200 ${sizeClasses[size]} ${className}`}
        >
          {showIcon && <Clock size={iconSizes[size]} className="text-amber-600 shrink-0" />}
          <span>Waitlist • Demand Voting</span>
        </span>
      );
    case 'coming_soon':
      return (
        <span
          className={`inline-flex items-center rounded-md bg-sky-50 text-sky-900 border border-sky-200 ${sizeClasses[size]} ${className}`}
        >
          {showIcon && <Sparkles size={iconSizes[size]} className="text-sky-600 shrink-0" />}
          <span>Roadmap • Coming Soon</span>
        </span>
      );
    case 'disabled':
      return (
        <span
          className={`inline-flex items-center rounded-md bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses[size]} ${className}`}
        >
          {showIcon && <AlertCircle size={iconSizes[size]} className="text-slate-400 shrink-0" />}
          <span>Infeasible • Purchase Only</span>
        </span>
      );
    default:
      return null;
  }
};
