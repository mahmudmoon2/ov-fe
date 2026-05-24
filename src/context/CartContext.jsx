import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      // একই প্রোডাক্ট এবং ভ্যারিয়েন্ট চেক
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.variant === newItem.variant
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        // নতুন কোয়ান্টিটি যোগ করা হচ্ছে
        updatedItems[existingItemIndex].quantity += newItem.quantity; 
        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
    showToast("Product added to cart!");
  };

  const incrementQuantity = (id) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrementQuantity = (id) => {
    setCartItems(prev => prev.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

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