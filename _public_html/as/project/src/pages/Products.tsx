import React, { useState } from 'react';
import { Plus, Search, Filter, Grid, List, Edit, Trash2, Eye, Package } from 'lucide-react';
import ProductCard from '../components/Products/ProductCard';
import ProductModal from '../components/Products/ProductModal';
import { useProducts } from '../contexts/ProductContext';
import AnimatedBackground from '../components/Layout/AnimatedBackground';

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AnimatedBackground />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-slate-400">Manage your product inventory</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-[1.02]"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">{products.length}</p>
              <p className="text-sm text-slate-400">Total Products</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{products.filter(p => p.status === 'active').length}</p>
              <p className="text-sm text-slate-400">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-red-400" />
            <div>
              <p className="text-2xl font-bold text-white">{products.filter(p => p.stock === 0).length}</p>
              <p className="text-sm text-slate-400">Out of Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-white">{products.filter(p => p.stock < 10 && p.stock > 0).length}</p>
              <p className="text-sm text-slate-400">Low Stock</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-slate-300 hover:bg-slate-700/50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2 bg-slate-800/50 border border-slate-600/30 rounded-xl p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => handleEditProduct(product)}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-700/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Product</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Category</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Price</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Stock</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-white">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">{product.category}</td>
                    <td className="p-4 text-slate-300">{product.price.toLocaleString()} DA</td>
                    <td className="p-4 text-slate-300">{product.stock}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {product.status === 'active' ? 'Active' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-slate-400 hover:text-blue-400 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="p-1 text-slate-400 hover:text-green-400 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                        >
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
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}