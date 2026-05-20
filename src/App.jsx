import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StoreLayout from './components/layout/StoreLayout';
import Home from './pages/Home';
import Sarees from './pages/Sarees';
import Suits from './pages/Suits';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import CatalogManager from './pages/admin/CatalogManager';
import InventoryManager from './pages/admin/InventoryManager';
import OrdersManager from './pages/admin/OrdersManager';
import ContactMessages from './pages/admin/ContactMessages';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import About from './pages/About';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StoreLayout />}>
              <Route index element={<Home />} />
              <Route path="sarees" element={<Sarees />} />
              <Route path="suits" element={<Suits />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="about" element={<About />} />
            </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="sarees" element={<CatalogManager title="Saree Catalog" />} />
          <Route path="suits" element={<CatalogManager title="Suits Catalog" />} />
          <Route path="inventory" element={<InventoryManager />} />
          <Route path="orders" element={<OrdersManager />} />
          <Route path="messages" element={<ContactMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
