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
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.variant === newItem.variant
      );

      // Safe number conversion to prevent NaN
      const price = Number(newItem.currentPrice) || 0;
      const qty = Number(newItem.quantity) || 1;

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += qty; 
        return updatedItems;
      } else {
        return [...prevItems, { ...newItem, currentPrice: price, quantity: qty }];
      }
    });
    showToast("Product added to cart!");
  };

  const incrementQuantity = (id) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Number(item.quantity) + 1 } : item));
  };

  const decrementQuantity = (id) => {
    setCartItems(prev => prev.map(item => item.id === id && Number(item.quantity) > 1 ? { ...item, quantity: Number(item.quantity) - 1 } : item));
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