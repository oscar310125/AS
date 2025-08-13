import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import ClientHeader from './components/Client/ClientHeader';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ClientShop from './pages/Client/ClientShop';
import ClientCart from './pages/Client/ClientCart';
import ClientCheckout from './pages/Client/ClientCheckout';
import ClientOrders from './pages/Client/ClientOrders';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import { StoreProvider } from './contexts/StoreContext';
import { LanguageProvider } from './contexts/LanguageContext';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const isClientRoute = location.pathname.startsWith('/shop');

  if (!isAuthenticated) {
    return <Login />;
  }

  if (isClientRoute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <ClientHeader />
        <main className="pt-20">
          <Routes>
            <Route path="/shop" element={<ClientShop />} />
            <Route path="/shop/cart" element={<ClientCart />} />
            <Route path="/shop/checkout" element={<ClientCheckout />} />
            <Route path="/shop/orders" element={<ClientOrders />} />
          </Routes>
        </main>
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <Router>
                <AppContent />
              </Router>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </StoreProvider>
    </LanguageProvider>
  );
}

export default App;