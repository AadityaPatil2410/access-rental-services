export type CategoryType = 'projectors' | 'tools' | 'formalwear' | 'scales' | 'accessories';

export type ProductStatus = 'bookable' | 'waitlist' | 'coming_soon' | 'disabled';

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  categoryLabel: string;
  brand: string;
  dailyPrice: number;
  deposit: number;
  rating: number;
  reviewCount: number;
  image: string;
  status: ProductStatus;
  statusNote?: string;
  specs: string[];
  description: string;
  highlights: string[];
  idealFor: string;
  includedAccessories: string[];
  brightnessLumens?: number;
  resolution?: string;
}

export type DeliveryType = 'campus_pickup' | 'doorstep';

export type DeliverySlot = 'morning' | 'afternoon' | 'evening';

export type PaymentMethod = 'upi' | 'card' | 'cod';

export interface Booking {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  brand: string;
  category: CategoryType;
  startDate: string;
  endDate: string;
  days: number;
  dailyPrice: number;
  rentalFee: number;
  deliveryFee: number;
  deposit: number;
  totalPaid: number;
  deliveryType: DeliveryType;
  customerName: string;
  phone: string;
  deliveryAddress: string;
  city: string;
  pincode: string;
  deliverySlot: DeliverySlot;
  paymentMethod: PaymentMethod;
  paymentIdentifier?: string;
  status: 'confirmed' | 'qa_passed' | 'out_for_delivery' | 'active' | 'returned';
  createdAt: string;
  qaCertificate: {
    inspector: string;
    lampHealth: string;
    hdmiAudioPass: boolean;
    opticsClean: boolean;
    testedAt: string;
    serialNumber: string;
  };
}

export interface CheckoutPayload {
  product: Product;
  startDate: string;
  endDate: string;
  days: number;
  deliveryType: DeliveryType;
}

export interface WaitlistEntry {
  id: string;
  productId: string;
  productName: string;
  category: CategoryType;
  name: string;
  email: string;
  phone: string;
  expectedDate?: string;
  createdAt: string;
}

export interface FilterState {
  search: string;
  categories: CategoryType[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  statuses: ProductStatus[];
  sortBy: 'price_asc' | 'price_desc' | 'rating_desc' | 'popular' | 'newest';
}
