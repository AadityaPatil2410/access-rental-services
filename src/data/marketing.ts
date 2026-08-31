export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const PRODUCT_DETAIL_FAQS: FAQItem[] = [
  {
    id: 'faq-deposit',
    question: 'How and when is my refundable security deposit returned?',
    answer: 'Your security deposit (e.g. ₹2,500 - ₹5,000) is held securely in an escrow ledger. As soon as the gear is returned and passes a quick 2-minute functional check by our campus delivery agent, your deposit refund is instantly initiated via UPI/original payment method — typically credited in under 120 minutes with zero deduction fees.',
  },
  {
    id: 'faq-malfunction',
    question: 'What happens if the projector malfunctions during my event?',
    answer: 'Every ACCESS unit undergoes our 6-point Pre-Dispatch QA Inspection (tested lamp, clear optical path, fresh HDMI cable, audio check). In the rare 0.4% chance of any unexpected technical glitch during your event, our Campus Hot-Swap Guarantee delivers a verified backup projector to your venue within 45 minutes, or grants a 100% rental fee refund.',
  },
  {
    id: 'faq-availability',
    question: 'Can I extend my rental period mid-booking if our event runs long?',
    answer: 'Yes! If the equipment is not reserved by another club immediately following your slot, you can extend your rental right from your "My Bookings" dashboard at standard prorated daily rates with no penalty charges.',
  },
  {
    id: 'faq-delivery',
    question: 'What is the difference between Campus Hub Pickup and Doorstep Delivery?',
    answer: 'Campus Hub Pickup is 100% Free: pick up and drop off your gear at our partner Student Center desk at your convenience. Doorstep Delivery (₹99) includes direct hand-delivery to your hostel room or event venue, plus complimentary test setup by our executive.',
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  content: string;
  rating: number;
  productRented: string;
  savedAmount: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Aarav Sharma',
    role: 'Convenor & Tech Head',
    organization: 'Apex College Annual Tech Fest',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    content: 'We needed 4 high-lumen projectors for our national coding hackathon stages. Buying would have blown ₹1.8 lakhs of our club budget, and local wedding vendors quoted unreliable, yellowing bulbs. ACCESS gave us mint-condition BenQ & Sony units with verified test certificates. Flawless experience!',
    rating: 5,
    productRented: 'BenQ TH585 1080p & Sony VPL-EX570',
    savedAmount: '₹1,62,000 saved vs purchasing',
  },
  {
    id: 'test-2',
    name: 'Pooja Iyer',
    role: 'General Secretary',
    organization: 'Hostel 4 Cultural Committee',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    content: 'Our weekend open-air rooftop movie night was a massive hit. Booked the Anker Nebula Capsule II at 11 AM, picked it up from the Campus Center by 2 PM, and received our full deposit back on Google Pay just 40 minutes after return. Clean, transparent, zero hidden charges!',
    rating: 5,
    productRented: 'Anker Nebula Capsule II Smart Pocket',
    savedAmount: '₹38,000 saved vs purchasing',
  },
  {
    id: 'test-3',
    name: 'Rohan Mehra',
    role: 'Lead Presenter',
    organization: 'E-Cell Venture Pitch Team',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    content: 'For our angel investor pitch, our department projector had washed out colors. Rented the Epson 3LCD on ACCESS for ₹380/day. The crisp text contrast and instant HDMI pass made our deck look top-tier. ACCESS is a game changer for students.',
    rating: 5,
    productRented: 'Epson EB-E01 3LCD XGA',
    savedAmount: '₹34,000 saved vs buying',
  },
];

export interface ComparisonRow {
  factor: string;
  buyNew: string;
  borrowFriends: string;
  localVendor: string;
  accessRental: string;
  isHighlight?: boolean;
}

export const COMPARISON_TABLE: ComparisonRow[] = [
  {
    factor: 'Upfront Capital Cost',
    buyNew: '₹35,000 - ₹80,000 (Huge barrier)',
    borrowFriends: '₹0 (If someone owns one)',
    localVendor: '₹1,500 - ₹3,000 / day (Inflated)',
    accessRental: '₹300 - ₹690 / day (Fair student pricing)',
    isHighlight: true,
  },
  {
    factor: 'Equipment Quality & Health',
    buyNew: 'Brand new, but depreciates fast',
    borrowFriends: 'Usually dusty, missing cables',
    localVendor: 'Aged lamps, yellow tint, untested',
    accessRental: '100% Pre-Dispatch 6-Point QA Verified',
    isHighlight: true,
  },
  {
    factor: 'Annual Utilization',
    buyNew: '< 5% (Sits idle in cupboard)',
    borrowFriends: 'Awkward to request repeatedly',
    localVendor: 'Ad-hoc availability',
    accessRental: '100% on-demand only when needed',
  },
  {
    factor: 'Deposit Return Speed',
    buyNew: 'N/A',
    borrowFriends: 'Risk of friendship friction',
    localVendor: 'Deduction disputes, 3-7 day delays',
    accessRental: '< 120 Minutes Instant Digital UPI Refund',
    isHighlight: true,
  },
  {
    factor: 'Replacement Guarantee',
    buyNew: 'Warranty service takes weeks',
    borrowFriends: 'None if it breaks',
    localVendor: 'None mid-event',
    accessRental: '45-Min Campus Hot-Swap Guarantee',
  },
  {
    factor: 'Included Accessories',
    buyNew: 'Basic box items only',
    borrowFriends: 'Frequently missing HDMI/adapters',
    localVendor: 'Charge extra for cords & stands',
    accessRental: 'Full Kit: HDMI, AUX, Power, Carry Case, Remote',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Search & Select',
    description: 'Browse 20+ tested projectors sorted by lumen brightness, resolution, and occasion.',
    icon: 'Search',
    highlight: 'Filter by budget & lumens',
  },
  {
    step: 2,
    title: 'Pick Event Dates',
    description: 'Choose your rental window with flexible single-day or multi-day pricing.',
    icon: 'Calendar',
    highlight: 'Transparent live breakdown',
  },
  {
    step: 3,
    title: 'Instant Booking',
    description: 'Confirm via Campus Hub Pickup (Free) or Doorstep Delivery (₹99) with zero paperwork.',
    icon: 'ShieldCheck',
    highlight: 'Escrow-secured deposit',
  },
  {
    step: 4,
    title: 'Receive & Inspect',
    description: 'Get your sanitized unit complete with our QA inspection report, cables, and remote.',
    icon: 'PackageCheck',
    highlight: 'Pre-tested before dispatch',
  },
  {
    step: 5,
    title: 'Use for Your Event',
    description: 'Power your movie night, club pitch, gaming battle, or cultural show with crisp visuals.',
    icon: 'Sparkles',
    highlight: '45-min hot swap backup guarantee',
  },
  {
    step: 6,
    title: 'Easy Return & Refund',
    description: 'Drop off at the campus hub or schedule a pickup. Security deposit refunded in < 2 hours.',
    icon: 'RotateCcw',
    highlight: 'Instant UPI deposit credit',
  },
];

export const TRUST_BADGES = [
  {
    title: 'Tested Before Dispatch',
    description: 'Every unit passes a 6-point hardware check: lamp health, HDMI, audio, optics, and cables.',
    icon: 'CheckCircle2',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    title: 'Transparent Pricing',
    description: 'Zero hidden fees. Exact rental fee + delivery + 100% refundable deposit shown upfront.',
    icon: 'BadgePercent',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    title: 'Verified Availability',
    description: 'Live inventory guarantee. No last-minute cancellations or unfulfilled student club bookings.',
    icon: 'CalendarCheck2',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  },
  {
    title: 'Easy & Fast Returns',
    description: 'Quick 2-minute check-in with your deposit credited back to your UPI within 120 minutes.',
    icon: 'Zap',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
];
