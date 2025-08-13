import React from 'react';
import { ShoppingCart, Clock, CheckCircle, XCircle } from 'lucide-react';

const orders = [
  { id: '#12847', customer: 'Sarah Johnson', amount: '32,900 DA', status: 'delivered', time: '2 hours ago' },
  { id: '#12846', customer: 'Mike Chen', amount: '12,025 DA', status: 'processing', time: '4 hours ago' },
  { id: '#12845', customer: 'Emma Wilson', amount: '20,990 DA', status: 'cancelled', time: '6 hours ago' },
  { id: '#12844', customer: 'David Brown', amount: '43,600 DA', status: 'delivered', time: '8 hours ago' },
];

export default function RecentOrders() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'processing': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <Clock className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-400 bg-green-500/10';
      case 'processing': return 'text-yellow-400 bg-yellow-500/10';
      case 'cancelled': return 'text-red-400 bg-red-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <ShoppingCart className="h-5 w-5 text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
          <p className="text-sm text-slate-400">Latest customer orders</p>
        </div>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center space-x-3">
              {getStatusIcon(order.status)}
              <div>
                <p className="text-sm font-medium text-white">{order.id}</p>
                <p className="text-xs text-slate-400">{order.customer}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{order.amount}</p>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className="text-xs text-slate-400">{order.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
        View all orders →
      </button>
    </div>
  );
}