import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategorySlider = ({ categories = [] }) => {
  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const backendBaseUrl = 'http://127.0.0.1:8000'; 
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${backendBaseUrl}${path}`;
  };

  if (categories.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-3 mb-8">Shop By Categories</h2>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 pb-4">
        {categories.slice(0, visibleCount).map(category => (
          <Link 
            to={`/products?category=${category.id}`} 
            key={category.id} 
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-24 h-24 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center p-4 group-hover:shadow-md group-hover:border-blue-500 transition-all duration-300 group-hover:-translate-y-1">
              {category.icon ? (
                <img src={getImageUrl(category.icon)} alt={category.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-3xl font-bold text-gray-300">{category.name.charAt(0)}</span>
              )}
            </div>
            <span className="text-sm font-bold text-gray-700 mt-4 text-center group-hover:text-blue-600 transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>

      {visibleCount < categories.length && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleLoadMore}
            className="border-2 border-blue-600 text-blue-600 font-semibold px-8 py-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
          >
            Load More Categories
          </button>
        </div>
      )}
    </section>
  );
};

export default CategorySlider;