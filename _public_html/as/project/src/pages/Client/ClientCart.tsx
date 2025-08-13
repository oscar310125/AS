import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AnimatedBackground from '../../components/Layout/AnimatedBackground';

export default function ClientCart() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { t, isRTL } = useLanguage();

  if (items.length === 0) {
    return (
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 text-slate-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">{t('cart.empty')}</h2>
          <p className="text-slate-400 mb-8">{t('cart.emptyDesc')}</p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t('cart.continueShopping')}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <AnimatedBackground />
      <AnimatedBackground />
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('cart.title')}</h1>
          <p className="text-slate-400">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>
        <Link
          to="/shop"
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{t('cart.continueShopping')}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-xl"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                  <p className="text-slate-400 mb-2">€{item.price.toFixed(2)} each</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-white">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Clear Cart */}
          <div className="flex justify-end">
            <button
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 text-sm transition-colors"
            >
              {t('cart.clearAll')}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sticky top-24">
            <h3 className="text-xl font-semibold text-white mb-6">{t('checkout.orderSummary')}</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-300">
                <span>{t('cart.subtotal')}</span>
                <span>{getTotalPrice().toLocaleString()} DA</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{t('cart.shipping')}</span>
                <span>800 DA</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{t('cart.tax')}</span>
                <span>{Math.round(getTotalPrice() * 0.19).toLocaleString()} DA</span>
              </div>
              <div className="border-t border-slate-700/50 pt-4">
                <div className="flex justify-between text-lg font-bold text-white">
                  <span>{t('cart.total')}</span>
                  <span>{(getTotalPrice() + 800 + Math.round(getTotalPrice() * 0.19)).toLocaleString()} DA</span>
                </div>
              </div>
            </div>

            <Link
              to="/shop/checkout"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <span>{t('cart.proceedCheckout')}</span>
            </Link>

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400">
                {t('checkout.secureCheckout')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}