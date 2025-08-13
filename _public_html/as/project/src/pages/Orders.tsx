import React from 'react';
import { ShoppingCart, Plus, Search, Filter, Eye, Edit, Trash2, Package, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import AnimatedBackground from '../components/Layout/AnimatedBackground';

const mockOrders = [
  {
    id: '#12847',
    customer: 'Sarah Johnson',
    email: 'sarah@example.com',
    total: 32900,
    status: 'delivered',
    date: '2024-01-15',
    items: 3,
    paymentStatus: 'paid'
  },
  {
    id: '#12846',
    customer: 'Mike Chen',
    email: 'mike@example.com',
    total: 12025,
    status: 'processing',
    date: '2024-01-20',
    items: 1,
    paymentStatus: 'paid'
  },
  {
    id: '#12845',
    customer: 'Emma Wilson',
    email: 'emma@example.com',
    total: 20990,
    status: 'cancelled',
    date: '2024-01-18',
    items: 2,
    paymentStatus: 'refunded'
  },
  {
    id: '#12844',
    customer: 'David Brown',
    email: 'david@example.com',
    total: 43600,
    status: 'shipped',
    date: '2024-01-22',
    items: 4,
    paymentStatus: 'paid'
  },
  {
    id: '#12843',
    customer: 'Lisa Garcia',
    email: 'lisa@example.com',
    total: 9130,
    status: 'pending',
    date: '2024-01-23',
    items: 1,
    paymentStatus: 'pending'
  }
];

export default function Orders() {
  const [orders, setOrders] = React.useState(mockOrders);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'shipped': return <Package className="h-4 w-4 text-blue-400" />;
      case 'processing': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'pending': return <Clock className="h-4 w-4 text-orange-400" />;
      default: return <Clock className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'shipped': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'processing': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'cancelled': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'pending': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending' || order.status === 'processing').length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;

  return (
    <div className="space-y-6">
      <AnimatedBackground />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Orders Management</h1>
          <p className="text-slate-400">Track and manage all customer orders</p>
        </div>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-[1.02] mt-4 sm:mt-0">
          <Plus className="h-5 w-5" />
          <span>Create Order</span>
        </button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalOrders}</p>
              <p className="text-sm text-slate-400">Total Orders</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{deliveredOrders}</p>
              <p className="text-sm text-slate-400">Delivered</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{pendingOrders}</p>
              <p className="text-sm text-slate-400">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalRevenue.toLocaleString()} DA</p>
              <p className="text-sm text-slate-400">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Order ID</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Customer</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Date</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Items</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Total</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Status</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Payment</th>
                <th className="text-left p-4 text-sm font-medium text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-white">{order.id}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-white">{order.customer}</p>
                      <p className="text-sm text-slate-400">{order.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-slate-300">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-slate-300">{order.items}</td>
                  <td className="p-4 text-slate-300">€{order.total.toFixed(2)}</td>
                  <td className="p-4">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg border text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      order.paymentStatus === 'paid' ? 'bg-green-500/20 text-green-400' :
                      order.paymentStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-green-400 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-semibold text-white">Order Details - {selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-1">Customer</h3>
                    <p className="text-white">{selectedOrder.customer}</p>
                    <p className="text-slate-400 text-sm">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-1">Order Date</h3>
                    <p className="text-white">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-1">Status</h3>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg border text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="capitalize">{selectedOrder.status}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-1">Total Amount</h3>
                    <p className="text-white text-lg font-semibold">€{selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Order Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl text-blue-400 hover:text-blue-300 transition-colors">
                      Update Status
                    </button>
                    <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-400 hover:text-green-300 transition-colors">
                      Send Invoice
                    </button>
                    <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-400 hover:text-purple-300 transition-colors">
                      Contact Customer
                    </button>
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