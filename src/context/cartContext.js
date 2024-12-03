import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./authContext"; // Assuming you have an AuthContext set up

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [userEmail, setUserEmail] = useState(user || "");
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem(`cart_${user}`);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    if (user) {
      setUserEmail(user);
      const storedCart = localStorage.getItem(`cart_${user}`);
      setCart(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [user]);

  const saveCartToStorage = (updatedCart) => {
    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCart));
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
    if (userEmail) {
      localStorage.removeItem(`cart_${userEmail}`);
    }
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cart,
    userEmail,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
