import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DeliveryType, DeliverySlot, PaymentMethod } from '../types';
import { openRazorpayCheckout } from '../lib/razorpay';
import {
  ShieldCheck,
  Calendar,
  Truck,
  Building,
  CreditCard,
  QrCode,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Info,
  Phone,
  User,
  MapPin,
  Clock,
  Sparkles,
  Zap,
  LogIn,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    checkoutPayload,
    completeBooking,
    navigateTo,
    user,
    openAuthModal,
    showToast,
    customRazorpayKey,
  } = useApp();

  const { product, startDate, endDate, days, deliveryType: initialDeliveryType } = checkoutPayload;

  // Local Form State (Prefilled with user details if logged in)
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(initialDeliveryType || 'campus_pickup');
  const [customerName, setCustomerName] = useState(user?.displayName || 'Aditya Patil');
  const [phone, setPhone] = useState(user?.phoneNumber || '+91 98765 43210');
  const [deliveryAddress, setDeliveryAddress] = useState('Hostel 12, Room 304, Campus North Block');
  const [city, setCity] = useState('Mumbai (Campus Zone)');
  const [pincode, setPincode] = useState('400076');
  const [deliverySlot, setDeliverySlot] = useState<DeliverySlot>('morning');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');

  // Manual fallback inputs
  const [upiId, setUpiId] = useState('aditya@okaxis');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync with user auth if logs in mid-way
  useEffect(() => {
    if (user?.displayName && customerName === 'Aditya Patil') {
      setCustomerName(user.displayName);
    }
  }, [user]);

  // Financial calculations
  const rentalFee = product.dailyPrice * days;
  const deliveryFee = deliveryType === 'doorstep' ? 99 : 0;
  const deposit = product.deposit;
  const grandTotal = rentalFee + deliveryFee + deposit;

  const validateForm = () => {
    const err: { [key: string]: string } = {};
    if (!customerName.trim()) err.customerName = 'Please enter your full name';
    if (!phone.trim() || phone.length < 8) err.phone = 'Please provide a valid contact number';
    if (deliveryType === 'doorstep') {
      if (!deliveryAddress.trim()) err.deliveryAddress = 'Delivery address is required for doorstep courier';
      if (!city.trim()) err.city = 'City is required';
      if (!pincode.trim() || pincode.length < 5) err.pincode = 'Valid pincode required';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Razorpay Real Checkout Gateway Execution
    if (paymentMethod === 'razorpay') {
      setIsProcessing(true);
      try {
        const randNum = Math.floor(1000 + Math.random() * 9000);
        const tempBookingId = `ACC-2026-${randNum}`;

        await openRazorpayCheckout({
          amountRupees: grandTotal,
          productName: product.name,
          bookingId: tempBookingId,
          customerName,
          customerEmail: user?.email || 'customer@campus.edu',
          customerPhone: phone,
          customKey: customRazorpayKey,
          onSuccess: async (rzpRes) => {
            await completeBooking({
              customerName,
              phone,
              deliveryAddress:
                deliveryType === 'campus_pickup'
                  ? 'Campus Student Activity Center Hub (Desk #2)'
                  : deliveryAddress,
              city,
              pincode,
              deliverySlot,
              deliveryType,
              paymentMethod: 'razorpay',
              paymentIdentifier: rzpRes.razorpay_payment_id,
              razorpayPaymentId: rzpRes.razorpay_payment_id,
              razorpayOrderId: rzpRes.razorpay_order_id,
            });
            setIsProcessing(false);
          },
          onDismiss: () => {
            setIsProcessing(false);
            showToast('Payment Pending', 'Checkout was dismissed. You can retry whenever you are ready.', 'info');
          },
        });
      } catch (err: any) {
        setIsProcessing(false);
        showToast('Payment Gateway Notice', err.message || 'Razorpay standard modal popup could not be loaded.', 'warning');
      }
      return;
    }

    // Direct / Fallback Payment execution (UPI / POD)
    setIsProcessing(true);
    setTimeout(async () => {
      await completeBooking({
        customerName,
        phone,
        deliveryAddress:
          deliveryType === 'campus_pickup'
            ? 'Campus Student Activity Center Hub (Desk #2)'
            : deliveryAddress,
        city,
        pincode,
        deliverySlot,
        deliveryType,
        paymentMethod,
        paymentIdentifier:
          paymentMethod === 'upi' ? upiId : 'Pay on Delivery & QA Verification',
      });
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
      {/* Top Breadcrumb & Title */}
      <div className="mb-6">
        <button
          onClick={() => navigateTo('product-detail')}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 mb-2.5"
        >
          <ArrowLeft size={13} />
          <span>Back to Product Details</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Lock size={12} className="text-emerald-600" />
          <span>Verified Secure Checkout</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
          Finalize Your Booking
        </h1>
      </div>

      {/* User Login Banner if not signed in */}
      {!user && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              <User size={18} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-indigo-950">
                Sign in with Google to sync your booking history
              </p>
              <p className="text-[11px] sm:text-xs text-indigo-700">
                Save your rental invoice, QA certificates, and quick refund details to your account.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={openAuthModal}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
            id="checkout-signin-prompt-btn"
          >
            <LogIn size={14} />
            <span>Sign In / Sign Up</span>
          </button>
        </div>
      )}

      <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Delivery details & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Delivery vs Campus Pickup Selection */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <Truck size={16} className="text-indigo-600" />
              <span>1. Choose Delivery Method</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div
                onClick={() => setDeliveryType('campus_pickup')}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  deliveryType === 'campus_pickup'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
                id="select-campus-pickup-btn"
              >
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className="text-xs sm:text-sm">Campus Hub Pickup</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-bold">
                    FREE
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Pick up at Student Activity Center Desk. Return at your convenience.
                </p>
              </div>

              <div
                onClick={() => setDeliveryType('doorstep')}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  deliveryType === 'doorstep'
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
                id="select-doorstep-delivery-btn"
              >
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className="text-xs sm:text-sm">Doorstep Handover</span>
                  <span className="font-mono text-slate-900 font-bold">₹99</span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Direct delivery to your hostel room / club venue + free test check.
                </p>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="pt-3 border-t border-slate-100">
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Preferred Handover Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'morning', label: 'Morning', time: '8 AM - 11 AM' },
                  { id: 'afternoon', label: 'Afternoon', time: '12 PM - 4 PM' },
                  { id: 'evening', label: 'Evening', time: '5 PM - 8 PM' },
                ].map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setDeliverySlot(slot.id as DeliverySlot)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      deliverySlot === slot.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-semibold">{slot.label}</div>
                    <div className="text-[10px] text-slate-500">{slot.time}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Customer & Address Details Form */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <MapPin size={16} className="text-indigo-600" />
              <span>2. Contact & Handover Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Aditya Patil"
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    id="checkout-customer-name"
                  />
                </div>
                {errors.customerName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phone / WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    id="checkout-phone-input"
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {deliveryType === 'doorstep' ? (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Delivery Address / Hostel & Room No. <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Hostel Block B, Room 204, Campus West"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    id="checkout-address-input"
                  />
                  {errors.deliveryAddress && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.deliveryAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      City / Area
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai Campus"
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="400076"
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                <Building size={15} className="text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Campus Hub Pick-up Location: </span>
                  Student Activity Center Desk (SAC Ground Floor, near Main Auditorium). Bring your student ID.
                </div>
              </div>
            )}
          </div>

          {/* 3. Real Razorpay Payment Gateway & Alternative Options */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                <CreditCard size={16} className="text-indigo-600" />
                <span>3. Payment Gateway</span>
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-700" />
                <span>Razorpay Secured</span>
              </span>
            </div>

            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'razorpay', label: 'Razorpay (UPI / Cards)', icon: QrCode, badge: 'Instant' },
                { id: 'upi', label: 'Direct UPI ID', icon: Zap, badge: 'Manual' },
                { id: 'cod', label: 'Pay on Handover', icon: Truck, badge: 'QA Check' },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                    className={`p-2.5 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === m.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={16} className={paymentMethod === m.id ? 'text-indigo-600' : 'text-slate-500'} />
                    <span className="text-center">{m.label}</span>
                    <span className="text-[9px] text-slate-400 font-normal">{m.badge}</span>
                  </button>
                );
              })}
            </div>

            {/* Razorpay Banner / Details */}
            {paymentMethod === 'razorpay' && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center font-bold text-xs">
                      ₹
                    </div>
                    <div>
                      <p className="text-xs font-bold">Razorpay Standard Checkout</p>
                      <p className="text-[10px] text-indigo-200">Google Pay, PhonePe, Paytm, RuPay, Visa, NetBanking</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-indigo-500/40 text-indigo-100 font-mono px-2 py-0.5 rounded border border-indigo-400/30">
                    256-Bit SSL
                  </span>
                </div>

                <div className="text-[11px] text-indigo-100/90 leading-relaxed bg-indigo-800/30 p-2.5 rounded-lg border border-indigo-700/40 space-y-1">
                  <div className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Real-time transaction receipt & auto-generated QA invoice</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Security deposit (₹{deposit}) automatically tagged for fast refund</span>
                  </div>
                </div>

                {/* Key Status Indicator */}
                <div className="pt-2 border-t border-indigo-800/50 flex items-center justify-between text-[10px]">
                  <span className="text-indigo-300">
                    Active Key ID:{' '}
                    <span className="font-mono text-emerald-400 font-semibold">
                      {customRazorpayKey ? `${customRazorpayKey.substring(0, 10)}••••` : 'rzp_test_1DP5... (Sandbox default)'}
                    </span>
                  </span>
                  {customRazorpayKey && (
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded text-[9px]">
                      Custom Key Loaded
                    </span>
                  )}
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Enter UPI VPA / Handle
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okaxis"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Security deposit will be credited back directly to this UPI handle upon return.</span>
                </p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <p className="font-semibold text-slate-900">Pay on Handover & QA Inspection</p>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Verify the projector and power on test with the agent before transferring funds via UPI or Cash.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Confirm Button (5 cols) */}
        <div className="lg:col-span-5 space-y-5 sticky top-20">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm pb-2.5 border-b border-slate-100">
              Order Summary
            </h3>

            {/* Product Card Snippet */}
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">
                  {product.brand} Fleet
                </span>
                <h4 className="font-semibold text-slate-900 text-xs sm:text-sm truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  ₹{product.dailyPrice}/day • {days} Day{days > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Rental Window */}
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-medium">Rental Period:</span>
                <span className="font-semibold text-slate-900 font-mono">
                  {startDate} → {endDate}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-medium">Handover Slot:</span>
                <span className="font-semibold text-slate-900 capitalize">
                  {deliverySlot} ({deliverySlot === 'morning' ? '8-11 AM' : deliverySlot === 'afternoon' ? '12-4 PM' : '5-8 PM'})
                </span>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center justify-between text-slate-600">
                <span>Rental Fee (₹{product.dailyPrice} × {days} days)</span>
                <span className="font-mono font-semibold text-slate-900">₹{rentalFee}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Delivery / Logistics</span>
                <span className="font-mono font-semibold text-slate-900">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  <span>100% Refundable Deposit</span>
                  <span className="text-emerald-700 text-[10px] font-semibold">(Returned)</span>
                </span>
                <span className="font-mono font-semibold text-slate-900">₹{deposit}</span>
              </div>

              <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Grand Total</span>
                <span className="font-mono text-base text-indigo-600">₹{grandTotal}</span>
              </div>
            </div>

            {/* Guarantee reminder */}
            <div className="bg-emerald-50 rounded-lg p-2.5 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-950">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Pre-Dispatch QA Guaranteed</span>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-800">
                Every unit is stress-tested prior to dispatch. Deposit refunded within 120 minutes of return.
              </p>
            </div>

            {/* Confirm & Book CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-lg font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              id="confirm-booking-pay-btn"
            >
              {isProcessing ? (
                <span>Opening Payment Gateway...</span>
              ) : (
                <>
                  <span>
                    {paymentMethod === 'razorpay'
                      ? `Pay ₹${grandTotal} with Razorpay`
                      : `Confirm Booking (₹${grandTotal})`}
                  </span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
