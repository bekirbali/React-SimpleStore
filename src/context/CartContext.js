import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { endpoints, getAuthHeaders } from "../api/config.js";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(endpoints.products);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(endpoints.cart, {
        headers: getAuthHeaders(),
      });
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to fetch cart items.");
    }
  };

  const addToCart = async (cartItem) => {
    try {
      setError(null);
      const { data } = await axios.post(
        endpoints.cart,
        {
          product_id: cartItem.product.id,
          quantity: cartItem.quantity || 1,
        },
        {
          headers: getAuthHeaders(),
        }
      );
      await fetchCart(); // Refresh cart after adding item
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Failed to add item to cart. Please try again.");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      setError(null);
      await axios.put(
        `${endpoints.cart}${productId}/`,
        {
          product_id: productId,
          quantity: quantity,
        },
        {
          headers: getAuthHeaders(),
        }
      );
      await fetchCart(); // Refresh cart after updating
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("Failed to update quantity. Please try again.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setError(null);
      await axios.delete(`${endpoints.cart}${productId}/`, {
        headers: getAuthHeaders(),
      });
      await fetchCart(); // Refresh cart after removing item
    } catch (error) {
      console.error(
        "Error removing from cart:",
        error?.response?.data || error.message
      );
      setError("Failed to remove item from cart. Please try again.");
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      await axios.delete(`${endpoints.cart}clear/`, {
        headers: getAuthHeaders(),
      });
      await fetchCart();
      await fetchOrders(); // Refresh orders after clearing cart
    } catch (error) {
      console.error("Error clearing cart:", error);
      setError("Failed to clear cart. Please try again.");
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(endpoints.orders, {
        headers: getAuthHeaders(),
      });
      setOrders(data.filter((order) => order.status !== "cart"));
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    try {
      setError(null);
      await axios.post(
        endpoints.orders,
        {},
        {
          headers: getAuthHeaders(),
        }
      );
      await fetchCart();
      await fetchOrders(); // Refresh orders after placing an order
      return true;
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place order. Please try again.");
      return false;
    }
  };

  const checkout = async (shippingInfo) => {
    try {
      setError(null);
      const { data } = await axios.post(
        `${endpoints.orders}checkout/`,
        shippingInfo,
        {
          headers: getAuthHeaders(),
        }
      );
      await fetchCart(); // Refresh cart after checkout
      return data;
    } catch (error) {
      console.error("Error during checkout:", error);
      setError("Failed to complete checkout. Please try again.");
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchOrders(); // Add initial orders fetch
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        products,
        orders,
        loading,
        error,
        fetchProducts,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchOrders,
        checkout,
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
