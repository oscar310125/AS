import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Interface définissant la structure d'un produit
 * Exportée pour utilisation dans d'autres composants
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  image: string;
  images?: string[];
  status: string;
  rating?: number;
  reviews?: number;
  badge?: string;
  inStock?: boolean;
  description?: string;
  sizes?: string[];
  colors?: string[];
  weight?: number;
  isNew?: boolean;
  isOnSale?: boolean;
  isFeatured?: boolean;
}

/**
 * Interface du contexte des produits
 * Définit toutes les méthodes disponibles pour la gestion des produits
 */
interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
}

// 🧠 Création du contexte
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// 📦 Données initiales des produits
const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 12000,
    originalPrice: 17500,
    stock: 45,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=600&h=800'
    ],
    status: 'active',
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
    inStock: true,
    description: 'High-quality wireless headphones with noise cancellation',
    colors: ['Black', 'White', 'Blue'],
    weight: 0.3,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 26800,
    originalPrice: 33500,
    stock: 23,
    category: 'Wearables',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600&h=800'
    ],
    status: 'active',
    rating: 4.6,
    reviews: 89,
    badge: 'Sale',
    inStock: true,
    description: 'Advanced fitness tracking with heart rate monitor',
    colors: ['Black', 'Silver', 'Rose Gold'],
    weight: 0.2,
    isOnSale: true
  },
  {
    id: 3,
    name: 'Premium T-Shirt',
    price: 2500,
    originalPrice: 3200,
    stock: 67,
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600&h=800'
    ],
    status: 'active',
    rating: 4.9,
    reviews: 203,
    badge: 'New',
    inStock: true,
    description: 'Premium cotton t-shirt with modern fit',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['White', 'Black', 'Navy', 'Gray', 'Red'],
    weight: 0.2,
    isNew: true
  },
  {
    id: 4,
    name: 'Premium Coffee Beans',
    price: 3350,
    stock: 67,
    category: 'Food & Beverage',
    image: 'https://images.pexels.com/photos/2711959/pexels-photo-2711959.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2711959/pexels-photo-2711959.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600&h=800'
    ],
    status: 'active',
    rating: 4.9,
    reviews: 203,
    badge: 'New',
    inStock: true,
    description: 'Organic premium coffee beans from Colombia',
    weight: 0.5,
    isNew: true
  },
  {
    id: 5,
    name: 'Wireless Gaming Mouse',
    price: 8050,
    originalPrice: 10750,
    stock: 34,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600&h=800'
    ],
    status: 'active',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    description: 'High-precision gaming mouse with RGB lighting',
    colors: ['Black', 'White', 'RGB'],
    weight: 0.15,
    isFeatured: true
  },
  {
    id: 6,
    name: 'Organic Green Tea',
    price: 2550,
    stock: 89,
    category: 'Food & Beverage',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/2711959/pexels-photo-2711959.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600&h=800'
    ],
    status: 'active',
    rating: 4.5,
    reviews: 67,
    inStock: true,
    description: 'Premium organic green tea leaves',
    weight: 0.1
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    price: 10750,
    originalPrice: 13400,
    stock: 12,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=600&h=800'
    ],
    status: 'active',
    rating: 4.4,
    reviews: 92,
    badge: 'Popular',
    inStock: true,
    description: 'Portable Bluetooth speaker with deep bass',
    colors: ['Black', 'Blue', 'Red'],
    weight: 0.8,
    isOnSale: true
  },
  {
    id: 8,
    name: 'Winter Jacket',
    price: 8500,
    originalPrice: 12000,
    stock: 25,
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=600&h=800',
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600&h=800'
    ],
    status: 'active',
    rating: 4.6,
    reviews: 78,
    badge: 'Sale',
    inStock: true,
    description: 'Warm winter jacket with waterproof material',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
    colors: ['Black', 'Navy', 'Gray', 'Brown'],
    weight: 1.2,
    isOnSale: true
  }
];

/**
 * Provider du contexte des produits
 * Gère l'état global des produits et leur synchronisation avec localStorage
 */
export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  // 💾 État des produits avec initialisation depuis localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      return initialProducts;
    }
  });

  // 🔄 Synchronisation avec localStorage à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des produits:', error);
    }
  }, [products]);

  // ➕ Ajouter un nouveau produit
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(), // ID unique basé sur le timestamp
      status: 'active',
      inStock: productData.stock > 0,
      rating: productData.rating ?? 4.5,
      reviews: productData.reviews ?? 0
    };
    setProducts(prev => [...prev, newProduct]);
  };

  // ✏️ Mettre à jour un produit existant
  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { 
              ...product, 
              ...productData, 
              inStock: (productData.stock ?? product.stock) > 0 
            }
          : product
      )
    );
  };

  // 🗑️ Supprimer un produit
  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  // 🔍 Récupérer un produit par son ID
  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// 🧩 Hook personnalisé pour accéder au contexte
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

