import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BarChart3 className="h-8 w-8 text-orange-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400">Business insights and reports</p>
        </div>
      </div>
      
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
        <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Analytics Dashboard</h2>
        <p className="text-slate-400">This section will contain analytics and reporting tools.</p>
      </div>
    </div>
  );
}