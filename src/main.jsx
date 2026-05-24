import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext.jsx'; // ఇది ইম্পোর্ট করুন

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* CartProvider দিয়ে মুড়ে দেওয়া হলো */}
      <App />
    </CartProvider>
  </React.StrictMode>,
);