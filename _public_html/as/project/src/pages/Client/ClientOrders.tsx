import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Eye, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import AnimatedBackground from '../../components/Layout/AnimatedBackground';

const mockOrders = [
  {
    id: '#ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 159.98,
    items: [
      { name: 'Wireless Bluetooth Headphones', quantity: 1, price: 89.99 },
      { name: 'Premium Coffee Beans', quantity: 2, price: 24.99 }
    ],
    tracking: 'TRK123456789',
    estimatedDelivery: '2024-01-18'
  },
  {
    id: '#ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 199.99,
    items: [
      { name: 'Smart Fitness Watch', quantity: 1, price: 199.99 }
    ],
    tracking: 'TRK987654321',
    estimatedDelivery: '2024-01-25'
  },
  {
    id: '#ORD-2024-003',
    date: '2024-01-22',
    status: 'processing',
    total: 79.99,
    items: [
      { name: 'Bluetooth Speaker', quantity: 1, price: 79.99 }
    ],
    estimatedDelivery: '2024-01-28'
  }
];

export default function ClientOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { t, isRTL } = useLanguage();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'shipped': return <Truck className="h-5 w-5 text-blue-400" />;
      case 'processing': return <Clock className="h-5 w-5 text-yellow-400" />;
      default: return <Package className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'shipped': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'processing': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return t('orders.delivered');
      case 'shipped': return t('orders.shipped');
      case 'processing': return t('orders.processing');
      default: return 'Unknown';
    }
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <AnimatedBackground />
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{t('orders.title')}</h1>
        <p className="text-slate-400">{t('orders.track')}</p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                {getStatusIcon(order.status)}
                <div>
                  <h3 className="text-lg font-semibold text-white">{order.id}</h3>
                  <p className="text-slate-400 text-sm">{t('orders.placedOn')} {new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-lg border text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </div>
                <span className="text-xl font-bold text-white">€{order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-4 bg-slate-800/30 rounded-xl">
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-slate-400 text-sm">{t('common.quantity')}: {item.quantity}</p>
                  </div>
                  <span className="text-white">€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-slate-700/30">
              <div className="mb-4 sm:mb-0">
                {order.tracking && (
                  <p className="text-slate-300 text-sm mb-1">
                    <span className="font-medium">{t('orders.tracking')}:</span> {order.tracking}
                  </p>
                )}
                <p className="text-slate-300 text-sm">
                  <span className="font-medium">{t('orders.estimatedDelivery')}:</span> {new Date(order.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 rounded-xl text-slate-300 hover:text-white transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>{t('orders.viewDetails')}</span>
                </button>
                
                {order.status === 'delivered' && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl text-blue-400 hover:text-blue-300 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>{t('orders.invoice')}</span>
                  </button>
                )}
                
                {order.status === 'shipped' && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-400 hover:text-green-300 transition-colors">
                    <Truck className="h-4 w-4" />
                    <span>{t('orders.trackOrder')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-16">
          <Package className="h-24 w-24 text-slate-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">{t('orders.noOrders')}</h2>
          <p className="text-slate-400 mb-8">{t('orders.noOrdersDesc')}</p>
          <a
            href="/shop"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <span>{t('orders.startShopping')}</span>
          </a>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-semibold text-white">{t('orders.orderDetails')}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{t('orders.orderInfo')}</h3>
                  <div className="bg-slate-800/30 rounded-xl p-4 space-y-2">
                    <p className="text-slate-300"><span className="font-medium">Order ID:</span> {selectedOrder.id}</p>
                    <p className="text-slate-300"><span className="font-medium">Date:</span> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                    <p className="text-slate-300"><span className="font-medium">Status:</span> {getStatusText(selectedOrder.status)}</p>
                    {selectedOrder.tracking && (
                      <p className="text-slate-300"><span className="font-medium">{t('orders.tracking')}:</span> {selectedOrder.tracking}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{t('orders.items')}</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="bg-slate-800/30 rounded-xl p-4 flex justify-between">
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-slate-400 text-sm">{t('common.quantity')}: {item.quantity}</p>
                        </div>
                        <span>{selectedOrder.total.toLocaleString()} DA</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{t('orders.orderSummary')}</h3>
                  <div className="bg-slate-800/30 rounded-xl p-4">
                    <div className="flex justify-between text-lg font-bold text-white">
                      <span>{t('cart.total')}</span>
                      <span>€{selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}