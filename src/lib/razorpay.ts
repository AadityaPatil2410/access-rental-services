export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  config?: any;
  modal?: {
    ondismiss?: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: (response: any) => void) => void;
    };
  }
}

/**
 * Dynamically loads the Razorpay checkout.js SDK script
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Failed to load Razorpay checkout script.');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Opens Razorpay standard checkout popup with given options
 */
export const openRazorpayCheckout = async (options: {
  amountRupees: number;
  productName: string;
  bookingId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  customKey?: string;
  onSuccess: (response: RazorpaySuccessResponse) => void;
  onDismiss?: () => void;
  onError?: (error: any) => void;
}) => {
  const loaded = await loadRazorpayScript();
  if (!loaded || typeof window === 'undefined' || !window.Razorpay) {
    throw new Error('Razorpay checkout SDK could not be initialized. Please check network connectivity.');
  }

  // Retrieve key in order of precedence:
  // 1. Custom key provided in options / context
  // 2. localStorage saved key
  // 3. Vite env variable
  // 4. Default test sandbox key
  let razorpayKey = options.customKey?.trim();
  if (!razorpayKey && typeof window !== 'undefined') {
    try {
      razorpayKey = localStorage.getItem('access_razorpay_key')?.trim() || '';
    } catch {
      // ignore
    }
  }
  if (!razorpayKey) {
    razorpayKey = (import.meta.env.VITE_RAZORPAY_KEY_ID as string)?.trim() || 'rzp_test_1DP5mmOlF5G5ag';
  }

  // Clean phone string to digits for Razorpay prefill
  const cleanPhone = (options.customerPhone || '').replace(/[^0-9+]/g, '');

  const rzpOptions: RazorpayOptions = {
    key: razorpayKey,
    amount: Math.max(100, Math.round(options.amountRupees * 100)), // in Paise (min ₹1)
    currency: 'INR',
    name: 'ACCESS Rental Service',
    description: `Rental Booking & Deposit for ${options.productName}`,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=200&q=80',
    handler: (res: RazorpaySuccessResponse) => {
      options.onSuccess(res);
    },
    prefill: {
      name: options.customerName || 'Aditya Patil',
      email: options.customerEmail || 'aditya@example.com',
      contact: cleanPhone || '+919876543210',
    },
    notes: {
      booking_id: options.bookingId,
      product: options.productName,
      service: 'ACCESS Instant Occasion Equipment Rental',
    },
    theme: {
      color: '#4f46e5', // indigo-600
    },
    config: {
      display: {
        blocks: {
          upi: {
            name: 'Pay via UPI / QR',
            instruments: [
              {
                method: 'upi',
              },
            ],
          },
          other: {
            name: 'Cards & NetBanking',
            instruments: [
              {
                method: 'card',
              },
              {
                method: 'netbanking',
              },
              {
                method: 'wallet',
              },
            ],
          },
        },
        sequence: ['block.upi', 'block.other'],
        preferences: {
          show_default_blocks: true,
        },
      },
    },
    modal: {
      ondismiss: () => {
        if (options.onDismiss) {
          options.onDismiss();
        }
      },
    },
  };

  try {
    const razorpayInstance = new window.Razorpay(rzpOptions);
    
    // Register error handler if available
    if (typeof razorpayInstance.on === 'function') {
      razorpayInstance.on('payment.failed', (response: any) => {
        console.warn('Razorpay Payment Failed event:', response);
        if (options.onError) {
          options.onError(response?.error || response);
        }
      });
    }

    razorpayInstance.open();
  } catch (err: any) {
    console.error('Failed to open Razorpay modal:', err);
    throw new Error(err?.message || 'Failed to open Razorpay payment gateway');
  }
};
