import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // ছোট পপআপ দেখানোর ফাংশন
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000); // ৩ সেকেন্ড পর পপআপ চলে যাবে
  };

  // কার্টে অ্যাড করার ফাংশন
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // ড্রয়ার ওপেন না করে শুধু পপআপ দেখাবো
    showToast("Product added to cart successfully!");
  };

  // কোয়ান্টিটি বাড়ানোর ফাংশন (+)
  const incrementQuantity = (id) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  // কোয়ান্টিটি কমানোর ফাংশন (-)
  const decrementQuantity = (id) => {
    setCartItems(prev => prev.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  // কার্ট থেকে মুছে ফেলার ফাংশন
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, isCartOpen, setIsCartOpen,
      incrementQuantity, decrementQuantity, removeFromCart, toastMessage 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);