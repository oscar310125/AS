import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useStore } from '../../contexts/StoreContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AnimatedBackground from '../../components/Layout/AnimatedBackground';

export default function ClientCheckout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const { calculateDeliveryPrice, validateDiscountCode, settings } = useStore();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [deliveryType, setDeliveryType] = useState<'home' | 'stopDesk'>('home');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  const [selectedSizes, setSelectedSizes] = useState<{[key: number]: string}>({});
  const [selectedColors, setSelectedColors] = useState<{[key: number]: string}>({});

  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    state: '',
    
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const algerianStates = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
    'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
    'Constantine', 'Médéa', 'Mostaganem', 'MSila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
    'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
    'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
    'Ghardaïa', 'Relizane'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (e.target.name === 'state') {
      setSelectedState(e.target.value);
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      const discount = validateDiscountCode(discountCode.trim(), subtotal);
      if (discount) {
        setAppliedDiscount(discount);
      } else {
        alert('Invalid or expired discount code');
      }
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      navigate('/shop/orders');
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className={`max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Order Placed Successfully!</h2>
          <p className="text-slate-400 mb-6">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-sm text-slate-400 mt-4">Redirecting to your orders...</p>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const totalWeight = items.reduce((sum, item) => sum + ((item as any).weight || 0.5) * item.quantity, 0);
  const shipping = selectedState ? calculateDeliveryPrice(selectedState, deliveryType, totalWeight) : 500;
  const discountAmount = appliedDiscount ? 
    (appliedDiscount.type === 'percentage' ? subtotal * (appliedDiscount.value / 100) : appliedDiscount.value) : 0;
  const discountedSubtotal = subtotal - discountAmount;
  const tax = discountedSubtotal * (settings.taxRate / 100);
  const total = discountedSubtotal + shipping + tax;

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <AnimatedBackground />
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('checkout.title')}</h1>
          <p className="text-slate-400">{t('checkout.complete')}</p>
        </div>
        <Link
          to="/shop/cart"
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{t('checkout.backToCart')}</span>
        </Link>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-400' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
              1
            </div>
            <span className="hidden sm:block">{t('checkout.shipping')}</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-700"></div>
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-400' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
              2
            </div>
            <span className="hidden sm:block">{t('checkout.payment')}</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-700"></div>
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-blue-400' : 'text-slate-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
              3
            </div>
            <span className="hidden sm:block">{t('checkout.review')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Shipping Information */}
            {step >= 1 && (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Truck className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">{t('checkout.shippingInfo')}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">{t('checkout.firstName')}</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">{t('checkout.lastName')}</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">{t('checkout.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">{t('checkout.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">{t('checkout.city')}</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-slate-300 mb-2">{t('checkout.state')}</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      required
                    >
                      <option value="">{t('checkout.selectState')}</option>
                      {algerianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Delivery Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">{t('checkout.deliveryType')}</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-colors">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="home"
                        checked={deliveryType === 'home'}
                        onChange={(e) => setDeliveryType(e.target.value as 'home' | 'stopDesk')}
                        className="text-blue-500"
                      />
                      <div>
                        <p className="text-white font-medium">{t('checkout.homeDelivery')}</p>
                        <p className="text-slate-400 text-sm">
                          {selectedState ? `${calculateDeliveryPrice(selectedState, 'home', totalWeight)} DA` : t('checkout.selectState')}
                        </p>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-colors">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="stopDesk"
                        checked={deliveryType === 'stopDesk'}
                        onChange={(e) => setDeliveryType(e.target.value as 'home' | 'stopDesk')}
                        className="text-blue-500"
                      />
                      <div>
                        <p className="text-white font-medium">{t('checkout.stopDesk')}</p>
                        <p className="text-slate-400 text-sm">
                          {selectedState ? `${calculateDeliveryPrice(selectedState, 'stopDesk', totalWeight)} DA` : t('checkout.selectState')}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {step === 1 && (
                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      {t('checkout.continuePayment')}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Payment Information */}
            {step >= 2 && (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">{t('checkout.paymentInfo')}</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {step === 2 && (
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {t('checkout.backShipping')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      {t('checkout.reviewOrderBtn')}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Order Review */}
            {step >= 3 && (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">{t('checkout.reviewOrder')}</h3>
                </div>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-700/30">
                      <div className="flex items-center space-x-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-slate-400 text-sm">{t('common.quantity')}: {item.quantity}</p>
                          {settings.enableSizeSelection && (item as any).sizes && (
                            <p className="text-slate-400 text-xs">Taille: {selectedSizes[item.id] || 'M'}</p>
                          )}
                          {settings.enableColorSelection && (item as any).colors && (
                            <p className="text-slate-400 text-xs">Couleur: {selectedColors[item.id] || (item as any).colors[0]}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-white">{(item.price * item.quantity).toLocaleString()} DA</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {t('checkout.backPayment')}
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {t('checkout.placeOrder')}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sticky top-24">
            <h3 className="text-xl font-semibold text-white mb-6">{t('checkout.orderSummary')}</h3>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                    <span className="text-slate-300 text-sm">{item.name} x{item.quantity}</span>
                  </div>
                  <span className="text-white">{(item.price * item.quantity).toLocaleString()} DA</span>
                </div>
              ))}
            </div>

            {/* Discount Code */}
            {settings.enableDiscountCodes && (
              <div className="mb-6 p-4 bg-slate-800/30 rounded-xl">
                <h4 className="text-sm font-medium text-slate-300 mb-2">{t('checkout.discountCode')}</h4>
                {!appliedDiscount ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder={t('checkout.enterCode')}
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleApplyDiscount}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {t('checkout.apply')}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                    <div>
                      <p className="text-green-400 font-medium">{appliedDiscount.code}</p>
                      <p className="text-green-300 text-sm">
                        -{appliedDiscount.type === 'percentage' ? `${appliedDiscount.value}%` : `${appliedDiscount.value} DA`}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveDiscount}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      {t('checkout.remove')}
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2 mb-6 pt-4 border-t border-slate-700/50">
              <div className="flex justify-between text-slate-300">
                <span>{t('cart.subtotal')}</span>
                <span>{subtotal.toLocaleString()} DA</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({appliedDiscount.code})</span>
                  <span>-{discountAmount.toLocaleString()} DA</span>
                </div>
              )}
              <div className="flex justify-between text-slate-300">
                <span>{t('cart.shipping')}</span>
                <span>{shipping.toLocaleString()} DA</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{t('cart.tax')} ({settings.taxRate}%)</span>
                <span>{Math.round(tax).toLocaleString()} DA</span>
              </div>
              <div className="border-t border-slate-700/50 pt-2">
                <div className="flex justify-between text-lg font-bold text-white">
                  <span>{t('cart.total')}</span>
                  <span>{Math.round(total).toLocaleString()} DA</span>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-400">
              <Shield className="h-4 w-4 inline mr-1" />
              {t('checkout.secureCheckout')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}