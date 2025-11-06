import { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();

const initialState = {
  cart: [],
};

function storeReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: (item.quantity || 1) + 1,
                  totalPrice: item.price * ((item.quantity || 1) + 1)
                }
              : item
          )
        };
      } else {
        // If new item, add with quantity 1
        return {
          ...state,
          cart: [...state.cart, { 
            ...action.payload, 
            quantity: 1, 
            totalPrice: action.payload.price 
          }]
        };
      }
      
    case 'REMOVE_FROM_CART':
      return { 
        ...state, 
        cart: state.cart.filter(item => item.id !== action.payload) 
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity,
                totalPrice: item.price * action.payload.quantity
              }
            : item
        )
      };
      
    case 'CLEAR_CART':
      return { ...state, cart: [] };
      
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  // Helper functions to make it easier to use
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalPrice = state.cart.reduce((acc, item) => acc + (item.totalPrice || item.price * (item.quantity || 1)), 0);
  const totalItems = state.cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const value = {
    cart: state.cart,
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
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}