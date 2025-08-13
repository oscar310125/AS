import React from 'react';
import { Edit, Trash2, Eye, Package, AlertTriangle } from 'lucide-react';

interface ProductCardProps {
  product: any;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const getStatusColor = (status: string, stock: number) => {
    if (stock === 0) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (stock < 10) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-green-500/20 text-green-400 border-green-500/30';
  };

  const getStatusText = (status: string, stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-200">
      {/* Product Image */}
      <div className="relative aspect-video">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Stock Alert */}
        {product.stock < 10 && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center space-x-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-2 py-1">
              <AlertTriangle className="h-3 w-3 text-yellow-400" />
              <span className="text-xs text-yellow-400 font-medium">
                {product.stock === 0 ? 'Out of Stock' : 'Low Stock'}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg text-slate-300 hover:text-blue-400 hover:bg-slate-800/80 transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button 
            onClick={onEdit}
            className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg text-slate-300 hover:text-green-400 hover:bg-slate-800/80 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button 
            onClick={onDelete}
            className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg text-slate-300 hover:text-red-400 hover:bg-slate-800/80 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
            <p className="text-sm text-slate-400">{product.category}</p>
          </div>
          <div className={`px-2 py-1 rounded-lg border text-xs font-medium ${getStatusColor(product.status, product.stock)}`}>
            {getStatusText(product.status, product.stock)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-2xl font-bold text-white">{product.price.toLocaleString()} DA</p>
            </div>
            <div className="flex items-center space-x-1 text-slate-400">
              <Package className="h-4 w-4" />
              <span className="text-sm">{product.stock} in stock</span>
            </div>
          </div>
        </div>

        {/* Stock Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Stock Level</span>
            <span>{product.stock}/100</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                product.stock === 0 ? 'bg-red-500' : 
                product.stock < 10 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}