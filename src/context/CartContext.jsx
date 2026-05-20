import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('sanskriti_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('sanskriti_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, variant, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.variantId === variant.id);
      if (existing) {
        return prev.map(item => 
          item.variantId === variant.id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
        );
      }
      return [...prev, {
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        price: product.price,
        size: variant.size,
        imageUrl: product.images?.[0]?.imageUrl,
        quantity
      }];
    });
  };

  const removeFromCart = (variantId) => {
    setCartItems(prev => prev.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId, quantity) => {
    if (quantity < 1) return removeFromCart(variantId);
    setCartItems(prev => prev.map(item => 
      item.variantId === variantId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};
