import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CategoryType,
  ProductStatus,
  Booking,
  CheckoutPayload,
  DeliveryType,
  DeliverySlot,
  PaymentMethod,
  WaitlistEntry,
} from '../types';
import { PRODUCTS } from '../data/products';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation
  currentPage: 'home' | 'catalog' | 'product-detail' | 'checkout' | 'confirmation' | 'my-bookings';
  navigateTo: (page: 'home' | 'catalog' | 'product-detail' | 'checkout' | 'confirmation' | 'my-bookings', productId?: string) => void;
  
  // Selected Product for Detail
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  
  // Catalog Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: CategoryType[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  selectedStatuses: ProductStatus[];
  setSelectedStatuses: React.Dispatch<React.SetStateAction<ProductStatus[]>>;
  sortBy: 'price_asc' | 'price_desc' | 'rating_desc' | 'popular' | 'newest';
  setSortBy: (sort: 'price_asc' | 'price_desc' | 'rating_desc' | 'popular' | 'newest') => void;
  resetFilters: () => void;
  filterCategoryQuick: (cat: CategoryType) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string, productName?: string) => void;
  isInWishlist: (productId: string) => boolean;
  showOnlyWishlist: boolean;
  setShowOnlyWishlist: React.Dispatch<React.SetStateAction<boolean>>;

  // Checkout & Booking
  checkoutPayload: CheckoutPayload;
  setCheckoutPayload: React.Dispatch<React.SetStateAction<CheckoutPayload>>;
  initiateCheckout: (product: Product, startDate: string, endDate: string, days: number, deliveryType: DeliveryType) => void;
  lastBooking: Booking | null;
  bookings: Booking[];
  completeBooking: (details: {
    customerName: string;
    phone: string;
    deliveryAddress: string;
    city: string;
    pincode: string;
    deliverySlot: DeliverySlot;
    deliveryType: DeliveryType;
    paymentMethod: PaymentMethod;
    paymentIdentifier?: string;
  }) => Booking;

  // Waitlist
  waitlistProduct: Product | null;
  isWaitlistOpen: boolean;
  openWaitlist: (product: Product) => void;
  closeWaitlist: () => void;
  submitWaitlist: (name: string, email: string, phone: string, expectedDate?: string) => void;
  waitlistSubmissions: WaitlistEntry[];

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to get formatted default dates (tomorrow to day after tomorrow)
const getDefaultDates = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 3);
  
  return {
    start: tomorrow.toISOString().split('T')[0],
    end: dayAfter.toISOString().split('T')[0],
    days: 2,
  };
};

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'ACC-2026-8491',
    productId: 'proj-02',
    productName: 'BenQ TH585 Full HD Home & Gaming Projector',
    productImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=900&q=80',
    brand: 'BenQ',
    category: 'projectors',
    startDate: '2026-09-02',
    endDate: '2026-09-04',
    days: 2,
    dailyPrice: 520,
    rentalFee: 1040,
    deliveryFee: 0,
    deposit: 3500,
    totalPaid: 4540,
    deliveryType: 'campus_pickup',
    customerName: 'Aditya Patil',
    phone: '+91 98765 43210',
    deliveryAddress: 'Student Activity Center Desk (Campus Hub)',
    city: 'Campus Metro Hub',
    pincode: '400076',
    deliverySlot: 'afternoon',
    paymentMethod: 'upi',
    paymentIdentifier: 'aditya@okaxis',
    status: 'qa_passed',
    createdAt: '2026-08-31T06:30:00Z',
    qaCertificate: {
      inspector: 'Suresh Kumar (Lead QA Technician)',
      lampHealth: '98% (312 / 10,000 hrs used)',
      hdmiAudioPass: true,
      opticsClean: true,
      testedAt: '2026-08-31T05:45:00Z',
      serialNumber: 'BNQ-TH585-883492',
    },
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultDates = getDefaultDates();

  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'product-detail' | 'checkout' | 'confirmation' | 'my-bookings'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedStatuses, setSelectedStatuses] = useState<ProductStatus[]>([]);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating_desc' | 'popular' | 'newest'>('popular');
  const [showOnlyWishlist, setShowOnlyWishlist] = useState<boolean>(false);

  // Wishlist state (persisted to localStorage)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('access_wishlist_v1');
      return saved ? JSON.parse(saved) : ['proj-01', 'proj-03']; // sensible seed with 2 popular projectors
    } catch {
      return ['proj-01', 'proj-03'];
    }
  });

  // Checkout payload
  const [checkoutPayload, setCheckoutPayload] = useState<CheckoutPayload>({
    product: PRODUCTS[0],
    startDate: defaultDates.start,
    endDate: defaultDates.end,
    days: defaultDates.days,
    deliveryType: 'campus_pickup',
  });

  // Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('access_bookings_v1');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [lastBooking, setLastBooking] = useState<Booking | null>(() => {
    return bookings.length > 0 ? bookings[0] : null;
  });

  // Waitlist
  const [waitlistProduct, setWaitlistProduct] = useState<Product | null>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistSubmissions, setWaitlistSubmissions] = useState<WaitlistEntry[]>(() => {
    try {
      const saved = localStorage.getItem('access_waitlists_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('access_bookings_v1', JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('access_waitlists_v1', JSON.stringify(waitlistSubmissions));
    } catch {
      // ignore
    }
  }, [waitlistSubmissions]);

  useEffect(() => {
    try {
      localStorage.setItem('access_wishlist_v1', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = (productId: string, productName?: string) => {
    setWishlist((prev) => {
      const isSaved = prev.includes(productId);
      if (isSaved) {
        const updated = prev.filter((id) => id !== productId);
        showToast(
          'Removed from Wishlist',
          productName ? `${productName} was removed from your saved items.` : 'Item removed from saved list.',
          'info'
        );
        return updated;
      } else {
        const updated = [...prev, productId];
        showToast(
          'Saved to Wishlist',
          productName ? `${productName} was added to your saved gear!` : 'Item saved to wishlist!',
          'success'
        );
        return updated;
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 1000]);
    setMinRating(0);
    setSelectedStatuses([]);
    setSortBy('popular');
    setShowOnlyWishlist(false);
  };

  const filterCategoryQuick = (cat: CategoryType) => {
    resetFilters();
    setSelectedCategories([cat]);
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: 'home' | 'catalog' | 'product-detail' | 'checkout' | 'confirmation' | 'my-bookings', productId?: string) => {
    if (productId) {
      const found = PRODUCTS.find((p) => p.id === productId);
      if (found) {
        setSelectedProduct(found);
        setCheckoutPayload((prev) => ({
          ...prev,
          product: found,
        }));
      }
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const initiateCheckout = (product: Product, startDate: string, endDate: string, days: number, deliveryType: DeliveryType) => {
    setSelectedProduct(product);
    setCheckoutPayload({
      product,
      startDate,
      endDate,
      days,
      deliveryType,
    });
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWaitlist = (product: Product) => {
    setWaitlistProduct(product);
    setIsWaitlistOpen(true);
  };

  const closeWaitlist = () => {
    setIsWaitlistOpen(false);
    setWaitlistProduct(null);
  };

  const submitWaitlist = (name: string, email: string, phone: string, expectedDate?: string) => {
    if (!waitlistProduct) return;

    const newEntry: WaitlistEntry = {
      id: `WL-${Date.now()}`,
      productId: waitlistProduct.id,
      productName: waitlistProduct.name,
      category: waitlistProduct.category,
      name,
      email,
      phone,
      expectedDate,
      createdAt: new Date().toISOString(),
    };

    setWaitlistSubmissions((prev) => [newEntry, ...prev]);
    closeWaitlist();
    showToast(
      'You are on the Priority Waitlist!',
      `We\'ve registered your interest for ${waitlistProduct.name}. We will notify ${email} the moment this category opens on your campus!`,
      'success'
    );
  };

  const completeBooking = (details: {
    customerName: string;
    phone: string;
    deliveryAddress: string;
    city: string;
    pincode: string;
    deliverySlot: DeliverySlot;
    deliveryType: DeliveryType;
    paymentMethod: PaymentMethod;
    paymentIdentifier?: string;
  }) => {
    const { product, startDate, endDate, days } = checkoutPayload;
    const rentalFee = product.dailyPrice * days;
    const deliveryFee = details.deliveryType === 'doorstep' ? 99 : 0;
    const totalPaid = rentalFee + deliveryFee + product.deposit;

    const randNum = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `ACC-2026-${randNum}`;

    const newBooking: Booking = {
      id: bookingId,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      brand: product.brand,
      category: product.category,
      startDate,
      endDate,
      days,
      dailyPrice: product.dailyPrice,
      rentalFee,
      deliveryFee,
      deposit: product.deposit,
      totalPaid,
      deliveryType: details.deliveryType,
      customerName: details.customerName,
      phone: details.phone,
      deliveryAddress: details.deliveryAddress,
      city: details.city,
      pincode: details.pincode,
      deliverySlot: details.deliverySlot,
      paymentMethod: details.paymentMethod,
      paymentIdentifier: details.paymentIdentifier || 'Verified Mock Auth',
      status: 'qa_passed',
      createdAt: new Date().toISOString(),
      qaCertificate: {
        inspector: 'Amit Verma (Verified Senior Inspector)',
        lampHealth: '99% (Under 150 hrs logged)',
        hdmiAudioPass: true,
        opticsClean: true,
        testedAt: new Date().toISOString(),
        serialNumber: `${product.brand.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      },
    };

    setBookings((prev) => [newBooking, ...prev]);
    setLastBooking(newBooking);
    setCurrentPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Booking Confirmed!', `Booking ${bookingId} has been created with Pre-Dispatch QA guarantee.`, 'success');

    return newBooking;
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedProduct,
        setSelectedProduct,
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
        toggleWishlist,
        isInWishlist,
        resetFilters,
        filterCategoryQuick,
        checkoutPayload,
        setCheckoutPayload,
        initiateCheckout,
        lastBooking,
        bookings,
        completeBooking,
        waitlistProduct,
        isWaitlistOpen,
        openWaitlist,
        closeWaitlist,
        submitWaitlist,
        waitlistSubmissions,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
