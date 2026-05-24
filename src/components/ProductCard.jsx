import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, CreditCard } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); 
  const navigate = useNavigate();

  const hasDiscount = product.discount_price && Number(product.discount_price) < Number(product.price);
  const currentPrice = hasDiscount ? product.discount_price : product.price;
  const oldPrice = hasDiscount ? product.price : null;

  const backendBaseUrl = 'http://127.0.0.1:8000'; 
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${backendBaseUrl}${path}`;
  };

  const imageSrc = getImageUrl(product.thumbnail);
  const brandLogoSrc = getImageUrl(product.brand_details?.logo);

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    addToCart({ ...product, currentPrice, imageSrc }); 
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart({ ...product, currentPrice, imageSrc });
    navigate('/checkout'); 
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-[0_10px_30px_-5px_rgba(37,99,235,0.15)] hover:-translate-y-1.5 transition-all duration-400 ease-out flex flex-col border border-gray-100 hover:border-blue-200 h-[420px] group relative overflow-hidden">
      
      {/* Decorative Blur Circle on Hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 -mr-10 -mt-10"></div>

      <Link to={`/product/${product.id}`} className="flex flex-col items-center flex-1 cursor-pointer z-10">
        
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md flex items-center justify-center p-2">
          {product.is_featured && (
            <span className="absolute top-2 left-2 bg-[#0A192F] text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded shadow-md z-10">
              FEATURED
            </span>
          )}
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={product.name} 
              className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out" 
            />
          ) : (
            <span className="text-gray-300 text-sm">No Image</span>
          )}
        </div>

        <div className="h-6 mb-2 flex items-center justify-center">
          {brandLogoSrc ? (
            <img src={brandLogoSrc} alt="brand" className="max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
          ) : (
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest group-hover:text-blue-500 transition-colors">
              {product.brand_details?.name}
            </span>
          )}
        </div>

        <h3 className="font-bold text-gray-800 text-[15px] text-center line-clamp-2 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2.5 mb-2 mt-auto">
          <span className="text-blue-700 font-black text-lg tracking-tight">৳ {Number(currentPrice).toLocaleString()}</span>
          {oldPrice && <span className="text-gray-400 line-through text-xs font-semibold">৳ {Number(oldPrice).toLocaleString()}</span>}
        </div>
      </Link>

      <div className="mt-4 flex items-center gap-2.5 w-full pt-4 border-t border-gray-100 group-hover:border-blue-100 transition-colors z-10">
        <button 
          onClick={handleBuyNow} 
          className="flex-1 bg-white border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white py-2 rounded-lg font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <CreditCard size={16} /> Buy
        </button>
        <button 
          onClick={handleAddToCart} 
          className="flex-1 bg-blue-600 border border-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/30 py-2 rounded-lg font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <ShoppingBag size={16} /> Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;