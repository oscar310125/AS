import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useProducts } from '../../contexts/ProductContext';
import { useStore } from '../../contexts/StoreContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AnimatedBackground from '../../components/Layout/AnimatedBackground';

export default function ClientShop() {
  const { products } = useProducts();
  const { settings } = useStore();
  const { t, isRTL } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [filterType, setFilterType] = useState('all'); // all, new, sale, featured
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  const categories = [
    { id: 'all', name: t('products.allCategories') },
    { id: 'Electronics', name: 'Electronics' },
    { id: 'Wearables', name: 'Wearables' },
    { id: 'Food & Beverage', name: 'Food & Beverage' },
    { id: 'Fashion', name: 'Fashion' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesFilter = filterType === 'all' || 
      (filterType === 'new' && product.isNew) ||
      (filterType === 'sale' && product.isOnSale) ||
      (filterType === 'featured' && product.isFeatured);
    return matchesSearch && matchesCategory && matchesFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
      <AnimatedBackground />
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl mb-6 overflow-x-auto">
        {[
          { id: 'all', name: t('products.allProducts') },
          { id: 'featured', name: t('products.popular') }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setFilterType(filter.id)}
            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              filterType === filter.id
                ? 'bg-blue-500 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400`} />
            <input
              type="text"
              placeholder={t('products.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full sm:w-64 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all`}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-600/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
          >
            <option value="featured">{t('common.featured')}</option>
            <option value="price-low">{t('common.priceLowHigh')}</option>
            <option value="price-high">{t('common.priceHighLow')}</option>
            <option value="rating">{t('common.rating')}</option>
            <option value="name">{t('common.nameAZ')}</option>
          </select>
        </div>

        {/* View Mode */}
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

      {/* Products Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onClick={() => openProductModal(product)}
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      product.badge === 'Sale' ? 'bg-red-500 text-white' :
                      product.badge === 'New' ? 'bg-green-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-slate-700 hover:bg-white transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-slate-700 hover:bg-white transition-colors">
                    onClick={() => openProductModal(product)}
                    <Eye className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Cart Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>{t('products.addToCart')}</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Colors */}
                {settings.enableColorSelection && product.colors && (
                  <div className="flex items-center space-x-1 mb-2">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-slate-600"
                        style={{ 
                          backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                         color.toLowerCase() === 'black' ? '#000000' :
                                         color.toLowerCase() === 'red' ? '#ef4444' :
                                         color.toLowerCase() === 'blue' ? '#3b82f6' :
                                         color.toLowerCase() === 'green' ? '#10b981' :
                                         color.toLowerCase() === 'gray' ? '#6b7280' :
                                         color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                         color.toLowerCase() === 'brown' ? '#92400e' :
                                         '#64748b'
                        }}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-slate-400">+{product.colors.length - 3}</span>
                    )}
                  </div>
                )}

                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-slate-400'}`}
                    />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">({product.reviews})</span>
                </div>

                <h3 className="font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-white">{product.price.toLocaleString()} {settings.currency}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">{product.originalPrice.toLocaleString()} {settings.currency}</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{product.category}</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      ) : (
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-200">
              <div className="flex items-center space-x-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-24 h-24 object-cover rounded-xl cursor-pointer"
                  onClick={() => openProductModal(product)}
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                      <p className="text-sm text-slate-400 mb-2">{product.category}</p>
                      
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-slate-400'}`}
                          />
                        ))}
                        <span className="text-xs text-slate-400 ml-1">({product.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xl font-bold text-white">{product.price.toLocaleString()} DA</span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">{product.originalPrice.toLocaleString()} DA</span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors flex items-center space-x-2"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>{t('products.addToCart')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <Search className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('products.noResults')}</h3>
            <p>{t('products.adjustFilters')}</p>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-semibold text-white">{selectedProduct.name}</h2>
              <button
                onClick={closeProductModal}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-xl bg-slate-800">
                  <img 
                    src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image Thumbnails */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {selectedProduct.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          currentImageIndex === index ? 'border-blue-500' : 'border-slate-600'
                        }`}
                      >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-slate-400'}`}
                      />
                    ))}
                    <span className="text-sm text-slate-400 ml-2">({selectedProduct.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl font-bold text-white">{selectedProduct.price.toLocaleString()} {settings.currency}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-lg text-slate-400 line-through">{selectedProduct.originalPrice.toLocaleString()} {settings.currency}</span>
                    )}
                  </div>
                  
                  <p className="text-slate-300 mb-4">{selectedProduct.description}</p>
                </div>
                
                {/* Colors */}
                {settings.enableColorSelection && selectedProduct.colors && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Colors</h4>
                    <div className="flex items-center space-x-2">
                      {selectedProduct.colors.map((color: string, index: number) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-slate-600 cursor-pointer hover:border-blue-500 transition-colors"
                          style={{ 
                            backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                           color.toLowerCase() === 'black' ? '#000000' :
                                           color.toLowerCase() === 'red' ? '#ef4444' :
                                           color.toLowerCase() === 'blue' ? '#3b82f6' :
                                           color.toLowerCase() === 'green' ? '#10b981' :
                                           color.toLowerCase() === 'gray' ? '#6b7280' :
                                           color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                           color.toLowerCase() === 'brown' ? '#92400e' :
                                           '#64748b'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Sizes */}
                {settings.enableSizeSelection && selectedProduct.sizes && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Sizes</h4>
                    <div className="flex items-center space-x-2 flex-wrap">
                      {selectedProduct.sizes.map((size: string, index: number) => (
                        <button
                          key={index}
                          className="px-3 py-1 border border-slate-600 rounded-lg text-slate-300 hover:border-blue-500 hover:text-blue-400 transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    closeProductModal();
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{t('products.addToCart')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}