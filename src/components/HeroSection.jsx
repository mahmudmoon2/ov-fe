import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const HeroSection = ({ banners }) => {
  const carouselBanners = banners?.filter(b => b.position === 'hero_carousel') || [];
  const sideTop = banners?.find(b => b.position === 'hero_side_top');
  const sideBottom = banners?.find(b => b.position === 'hero_side_bottom');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Main Carousel */}
        <div className="lg:col-span-2 h-64 md:h-96 rounded-xl overflow-hidden shadow-sm bg-gray-200">
          {carouselBanners.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              className="h-full w-full"
            >
              {carouselBanners.map(banner => (
                <SwiperSlide key={banner.id}>
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">No Banners Found</div>
          )}
        </div>

        {/* Right Side Static Banners */}
        <div className="flex flex-col gap-4 h-64 md:h-96">
          <div className="h-1/2 rounded-xl overflow-hidden shadow-sm bg-gray-200 cursor-pointer hover:opacity-90 transition">
            {sideTop && <img src={sideTop.image} alt="Top Promo" className="w-full h-full object-cover" />}
          </div>
          <div className="h-1/2 rounded-xl overflow-hidden shadow-sm bg-gray-200 cursor-pointer hover:opacity-90 transition">
            {sideBottom && <img src={sideBottom.image} alt="Bottom Promo" className="w-full h-full object-cover" />}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;