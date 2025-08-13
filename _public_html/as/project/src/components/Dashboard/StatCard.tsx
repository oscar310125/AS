import React from 'react';
import { TrendingUp, TrendingDown, Minus, DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export default function StatCard({ title, value, change, trend, icon: Icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    green: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    orange: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30'
  };

  const iconColorClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400'
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-slate-400';
  };

  return (
    <div className={`bg-gradient-to-r ${colorClasses[color]} backdrop-blur-xl border rounded-2xl p-6 hover:scale-[1.02] transition-all duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${iconColorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        {change !== 0 && (
          <div className={`flex items-center space-x-1 text-sm ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-slate-400 text-sm">{title}</p>
      </div>
      
      {change !== 0 && (
        <div className="mt-3 pt-3 border-t border-slate-700/30">
          <p className="text-xs text-slate-400">
            {trend === 'up' ? '+' : ''}{change}% from last period
          </p>
        </div>
      )}
    </div>
  );
}