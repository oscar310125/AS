import React from 'react';
import { AlertTriangle, Package, Users, TrendingDown } from 'lucide-react';

const alerts = [
  { type: 'warning', icon: Package, message: '5 products low in stock', time: '2 hours ago' },
  { type: 'error', icon: TrendingDown, message: 'Sales down 15% this week', time: '4 hours ago' },
  { type: 'info', icon: Users, message: '12 new customer registrations', time: '6 hours ago' },
];

export default function Alerts() {
  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'error': return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'info': return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      default: return 'bg-slate-500/10 border-slate-500/30 text-slate-400';
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-orange-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Alerts</h3>
          <p className="text-sm text-slate-400">Important notifications</p>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className={`flex items-start space-x-3 p-3 border rounded-xl ${getAlertStyles(alert.type)}`}>
            <alert.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs opacity-75 mt-1">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-orange-400 hover:text-orange-300 transition-colors">
        View all alerts →
      </button>
    </div>
  );
}