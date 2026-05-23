// src/components/CategorySlider.jsx
import React from 'react';

const CategorySlider = ({ categories = [] }) => {
  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-primary pl-3 mb-6">Shop By Categories</h2>
      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
        {categories.map(category => (
          <div key={category.id} className="flex flex-col items-center min-w-[100px] cursor-pointer group">
            <div className="w-20 h-20 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center p-3 group-hover:shadow-md group-hover:border-primary transition-all">
              {category.icon ? (
                <img src={category.icon} alt={category.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-2xl font-bold text-gray-400">{category.name.charAt(0)}</span>
              )}
            </div>
            <span className="text-sm font-medium text-gray-700 mt-3 text-center group-hover:text-primary transition-colors">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySlider;