import React from 'react';
import { Package, Star } from 'lucide-react';

const products = [
  { name: 'Wireless Headphones', sales: 127, revenue: '426,500 DA', rating: 4.8 },
  { name: 'Smart Watch', sales: 98, revenue: '329,000 DA', rating: 4.6 },
  { name: 'Laptop Stand', sales: 156, revenue: '251,500 DA', rating: 4.9 },
  { name: 'USB-C Cable', sales: 203, revenue: '109,100 DA', rating: 4.7 },
];

export default function TopProducts() {
  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Package className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Top Products</h3>
          <p className="text-sm text-slate-400">Best selling items</p>
        </div>
      </div>

      <div className="space-y-3">
        {products.map((product, index) => (
          <div key={product.name} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{product.name}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">{product.sales} sold</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-slate-400">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{product.revenue}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
        View all products →
      </button>
    </div>
  );
}