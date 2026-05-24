import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';

const BrandAutoSlider = ({ brands = [] }) => {
  const actualBrands = Array.isArray(brands) ? brands : (brands?.results || []);

  const backendBaseUrl = 'http://127.0.0.1:8000'; 
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${backendBaseUrl}${path}`;
  };

  if (actualBrands.length === 0) return null;

  const displayBrands = actualBrands.length < 16 
    ? [...actualBrands, ...actualBrands, ...actualBrands, ...actualBrands, ...actualBrands] 
    : actualBrands;

  return (
    <section className="py-8 my-8 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-800 border-l-4 border-blue-600 pl-3 mb-8">Shop By Brands</h2>
        
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20} 
          breakpoints={{ 
            320: { slidesPerView: 3 },
            480: { slidesPerView: 4 },
            768: { slidesPerView: 5 }, 
            1024: { slidesPerView: 7 } 
          }}
          loop={true}
          autoplay={{ 
            delay: 1, 
            disableOnInteraction: false, 
            reverseDirection: true,
            pauseOnMouseEnter: true 
          }}
          speed={3000} 
          className="brand-swiper pb-4 pt-2" 
        >
          {displayBrands.map((brand, index) => (
            <SwiperSlide key={`${brand.id}-${index}`}>
              
              {/* Link ব্যবহার করে /products?brand=ID তে পাঠানো হচ্ছে */}
              <Link 
                to={`/products?brand=${brand.id}`} 
                className="mx-auto block max-w-[140px] bg-white border border-blue-100 rounded-xl shadow-sm hover:shadow-md hover:shadow-blue-200 hover:border-blue-400 hover:scale-105 transition-all duration-300 h-20 p-3 cursor-pointer group"
              >
                <div className="w-full h-full flex items-center justify-center">
                  {brand.logo ? (
                    <img 
                      src={getImageUrl(brand.logo)} 
                      alt={brand.name} 
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    />
                  ) : (
                    <span className="font-bold text-[11px] text-blue-900 uppercase tracking-wider group-hover:text-blue-600 transition-colors text-center line-clamp-2">
                      {brand.name}
                    </span>
                  )}
                </div>
              </Link>
              
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BrandAutoSlider;