// src/components/BrandAutoSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const BrandAutoSlider = ({ brands = [] }) => {
  return (
    <section className="py-8 my-8 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-xl font-bold text-gray-500 mb-6 uppercase tracking-widest">Top Brands</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{ 640: { slidesPerView: 4 }, 1024: { slidesPerView: 7 } }}
          loop={true}
          autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
          speed={3000} // Smooth continuous scrolling
          className="brand-swiper"
        >
          {brands.map(brand => (
            <SwiperSlide key={brand.id}>
              <div className="h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-bold text-xl text-gray-400">{brand.name}</span>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BrandAutoSlider;