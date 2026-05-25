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

  // Title কে দুই ভাগে ভাগ করার লজিক (প্রথম শব্দ এক কালার, পরেরগুলো আরেক কালার)
  const titleWords = title ? title.trim().split(' ') : [];
  const firstWord = titleWords[0] || '';
  const remainingWords = titleWords.slice(1).join(' ') || '';

  return (
    <section className="py-6 md:py-8 w-full">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        {/* সাইজ text-2xl থেকে text-4xl পর্যন্ত রেসপন্সিভ করা হয়েছে */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide border-l-[5px] border-blue-600 pl-4 leading-tight">
          <span className="text-gray-800">{firstWord}</span>{" "}
          {remainingWords && <span className="text-blue-600">{remainingWords}</span>}
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