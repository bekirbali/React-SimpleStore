import React, { createContext, useContext, useState } from "react";
import { initialCartItems } from "../data/dummyData";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const addToCart = (cartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === cartItem.product.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === cartItem.product.id
            ? { ...item, quantity: item.quantity + (cartItem.quantity || 1) }
            : item
        );
      }
      return [...prevItems, { ...cartItem, id: prevItems.length + 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
