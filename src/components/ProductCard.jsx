// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  const currentPrice = product.price; // ভ্যারিয়েন্ট থাকলে লজিক অ্যাড করতে পারেন

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col group border border-gray-100">
      <div className="relative h-40 w-full mb-4 overflow-hidden rounded-md bg-gray-50 flex items-center justify-center">
        {product.is_featured && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10">
            SALE
          </span>
        )}
        <img 
          src={product.thumbnail || `https://picsum.photos/seed/${product.id}/200`} 
          alt={product.name} 
          className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2 flex-1">{product.name}</h3>
      <div className="flex justify-between items-center mt-auto">
        <p className="text-primary font-bold text-lg">৳{currentPrice}</p>
        <button className="bg-gray-100 hover:bg-primary hover:text-white text-gray-800 p-2 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;