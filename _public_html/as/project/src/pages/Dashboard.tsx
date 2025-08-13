import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  AlertTriangle,
  Eye,
  Calendar,
  Activity
} from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import Chart from '../components/Dashboard/Chart';
import RecentOrders from '../components/Dashboard/RecentOrders';
import TopProducts from '../components/Dashboard/TopProducts';
import Alerts from '../components/Dashboard/Alerts';
import AnimatedBackground from '../components/Layout/AnimatedBackground';

export default function Dashboard() {
  const [stats, setStats] = useState({
    revenue: { value: '11,350,000 DA', change: 12.5, trend: 'up' },
    orders: { value: '1,247', change: -2.3, trend: 'down' },
    customers: { value: '8,492', change: 18.2, trend: 'up' },
    products: { value: '234', change: 0, trend: 'neutral' }
  });

  const [chartData, setChartData] = useState([
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 9800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 4300 }
  ]);

  return (
    <div className="space-y-6">
      <AnimatedBackground />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back! Here's what's happening in your store.</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Calendar className="h-4 w-4" />
            <span>Last 7 days</span>
          </div>
          <button className="p-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 rounded-lg transition-colors">
            <Eye className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={stats.revenue.value}
          change={stats.revenue.change}
          trend={stats.revenue.trend}
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Orders"
          value={stats.orders.value}
          change={stats.orders.change}
          trend={stats.orders.trend}
          icon={ShoppingCart}
          color="green"
        />
        <StatCard
          title="Customers"
          value={stats.customers.value}
          change={stats.customers.change}
          trend={stats.customers.trend}
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Products"
          value={stats.products.value}
          change={stats.products.change}
          trend={stats.products.trend}
          icon={Package}
          color="orange"
        />
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Chart data={chartData} />
        </div>
        
        {/* Alerts */}
        <div>
          <Alerts />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
}