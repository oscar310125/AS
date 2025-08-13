import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

interface ChartProps {
  data: Array<{ name: string; value: number }>;
}

export default function Chart({ data }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <BarChart3 className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
            <p className="text-sm text-slate-400">Weekly performance</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-green-400">
          <TrendingUp className="h-4 w-4" />
          <span>+12.5%</span>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div key={item.name} className="flex-1 flex flex-col items-center">
              <div className="w-full relative mb-2 group">
                <div 
                  className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all duration-300 hover:from-blue-400 hover:to-cyan-300 cursor-pointer"
                  style={{ height: `${height}%`, minHeight: '4px' }}
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  €{item.value.toLocaleString()}
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}