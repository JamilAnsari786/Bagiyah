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
                totalPrice: (cartItem.price * ((cartItem.quantity || 1) + 1))
              }
            : cartItem
        );
      } else {
        // If new item, add with quantity 1
        return [...prev, { ...item, quantity: 1, totalPrice: item.price }];
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

  const totalPrice = cart.reduce((acc, item) => acc + (item.totalPrice || item.price), 0);
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <StoreContext.Provider
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart, 
        totalPrice,
        totalItems
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => useContext(StoreContext);