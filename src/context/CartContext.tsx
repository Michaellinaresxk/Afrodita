import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, TOGGLE_CART, UPDATE_QUANTITY } from '@/constants/actionTypes';
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  cartTotal: 0,
  cartCount: 0,
  isCartOpen: false,
};


// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { product } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );

      let updatedCartItems;

      if (existingItem) {
        updatedCartItems = state.cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCartItems = [...state.cartItems, { ...product, quantity: 1 }];
      }

      return {
        ...state,
        cartItems: updatedCartItems,
        isCartOpen: true,
      };
    }

    case REMOVE_FROM_CART: {
      const { id } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== id),
      };
    }

    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      if (quantity < 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        isCartOpen: action.payload ? action.payload : !state.isCartOpen,
      };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Calculate cart totals whenever cartItems changes
  useEffect(() => {
    const cartCount = state.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const cartTotal = state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

    dispatch({ type: 'UPDATE_CART_TOTALS', payload: { cartCount, cartTotal } });
  }, [state.cartItems]);

  // Actions
  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: { product } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { id } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const toggleCart = (value) => {
    dispatch({ type: TOGGLE_CART, payload: value });
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export default CartContext;
