import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { ChevronDownCircle } from 'lucide-react';

const ProductSection = ({ title, products = [] }) => {
  // শুরুতে ৬টি প্রোডাক্ট দেখানোর স্টেট
  const [visibleCount, setVisibleCount] = useState(6);

  if (!products || products.length === 0) return null;

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };

  const displayedProducts = products.slice(0, visibleCount);

  return (
    <section className="py-6 md:py-8 w-full">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <h2 className="text-lg md:text-2xl font-black text-gray-800 uppercase tracking-wide border-l-4 border-blue-600 pl-3 leading-tight">
          {title}
        </h2>
      </div>
      
      {/* Responsive Products Grid: 
        - Default (Mobile): grid-cols-2 (২টি কার্ড) এবং gap-3 (গ্যাপ কম)
        - sm (Large Mobile/Tablet): grid-cols-3
        - md (Small Laptop): grid-cols-4
        - lg (Desktop): grid-cols-5
        - xl (Large Monitor): grid-cols-6
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 w-full">
        {displayedProducts.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-8 md:mt-10">
          <button 
            onClick={handleShowMore}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-blue-600 border-2 border-blue-100 px-8 py-3 rounded-full font-bold hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm hover:shadow-md group cursor-pointer text-sm md:text-base"
          >
            Show More Products 
            <ChevronDownCircle size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;