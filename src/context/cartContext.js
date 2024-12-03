import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./authContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user !== null) {
      const storedCart = localStorage.getItem(`cart_${user.email}`);
      setCart(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [user]);

  const saveCartToStorage = (updatedCart) => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.find((item) => item.id === product.id);
      let updatedCart;

      if (productExists) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      saveCartToStorage(updatedCart);

      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      saveCartToStorage(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      saveCartToStorage(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      localStorage.removeItem(`cart_${user.email}`);
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
