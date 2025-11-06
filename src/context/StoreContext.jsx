// src/context/StoreContext.jsx
import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { 
                ...cartItem, 
                quantity: (cartItem.quantity || 1) + 1,
                totalPrice: cartItem.price * ((cartItem.quantity || 1) + 1)
              }
            : cartItem
        );
      } else {
        // If new item, add with quantity 1
        const newItem = {
          ...item,
          quantity: 1,
          totalPrice: item.price
        };
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { 
              ...item, 
              quantity: newQuantity,
              totalPrice: item.price * newQuantity
            }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // More robust calculations with fallbacks
  const totalPrice = cart.reduce((acc, item) => {
    const itemTotal = item.totalPrice || (item.price * (item.quantity || 1));
    return acc + itemTotal;
  }, 0);

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const value = {
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity,
    clearCart, 
    totalPrice,
    totalItems
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook with error handling
// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};