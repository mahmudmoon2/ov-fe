// src/components/ProductSection.jsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductSection = ({ title, products = [] }) => {
  const [visibleCount, setVisibleCount] = useState(10); // শুরুতে ১০টি দেখাবে (৫+৫)

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  if (products.length === 0) return null;

  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-primary pl-3">{title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.slice(0, visibleCount).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {visibleCount < products.length && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleLoadMore}
            className="border-2 border-primary text-primary font-semibold px-8 py-2.5 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            Load More Products
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;