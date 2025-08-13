import React from 'react';
import { Users } from 'lucide-react';

export default function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="h-8 w-8 text-purple-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Customers</h1>
          <p className="text-slate-400">Manage customer relationships</p>
        </div>
      </div>
      
      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
        <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Customer Management</h2>
        <p className="text-slate-400">This section will contain customer management functionality.</p>
      </div>
    </div>
  );
}