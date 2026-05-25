import { useEffect, useState } from 'react';
import api from '../api/axios';

// AOS Library Imports
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components Import
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MovingText from '../components/MovingText';
import ProductSection from '../components/ProductSection';
import CategorySlider from '../components/CategorySlider';
import BrandAutoSlider from '../components/BrandAutoSlider';
import { ReviewSection, BlogSection } from '../components/ReviewAndBlogSection';
import Footer from '../components/Footer';

// ========================================================
// Reusable Section Wrapper (With Minimal Scroll Animation)
// ========================================================
const SectionWrapper = ({ children, isBlue, id, aos = "fade-up", delay = "0" }) => {
  return (
    <section 
      id={id} 
      className={`${isBlue ? 'bg-[#F4F9FF]' : 'bg-white'} py-12 md:py-16 border-b border-gray-100/50 w-full overflow-hidden`}
    >
      <div 
        className="max-w-7xl mx-auto px-4" 
        data-aos={aos} 
        data-aos-delay={delay} // ডিলে অ্যাড করা হলো যাতে খুব স্মুথলি আসে
      >
        {children}
      </div>
    </section>
  );
};

const Home = () => {
  const [homepageData, setHomepageData] = useState({ limited_sale: [], exclusive_products: [] });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [banners, setBanners] = useState([]);
  const [dynamicSections, setDynamicSections] = useState([]); 

  // Initialize Minimal AOS Animation
  useEffect(() => {
    AOS.init({
      duration: 1000, // অ্যানিমেশন আরেকটু স্লো এবং স্মুথ (1s)
      offset: 50, // স্ক্রিনে অল্প একটু ঢুকলেই অ্যানিমেশন শুরু হবে
      once: true, // শুধু একবারই হবে
      easing: 'ease-in-out', // খুব সফট এবং ক্লিন ইজিং
    });
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [homeRes, catRes, brandRes, bannerRes] = await Promise.all([
          api.get('products/homepage-data/'),
          api.get('products/categories/'),
          api.get('products/brands/'),
          api.get('products/banners/')
        ]);
        
        const extractData = (data) => Array.isArray(data) ? data : (data?.results || []);
        
        setHomepageData(homeRes.data);
        setCategories(extractData(catRes.data));
        setBrands(extractData(brandRes.data));
        setBanners(extractData(bannerRes.data));
        
        if(homeRes.data.dynamic_sections) {
            setDynamicSections(homeRes.data.dynamic_sections);
        }
      } catch (err) {
        console.error("Error fetching dynamic data:", err);
      }
    };

    fetchAllData();
  }, []);

  // Banner Distribution Logic
  const heroBanners = banners.filter(b => b.position.includes('hero'));
  const categoryBanners = banners.filter(b => b.position === 'category_banner').slice(0, 2); 
  const brandBanner = banners.filter(b => b.position === 'brand_banner').slice(0, 1);
  const preReviewBanners = banners.filter(b => b.position === 'pre_review_banner').slice(0, 2);

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans flex flex-col">
      <Navbar />
      
      {/* 1. Hero Section */}
      <HeroSection banners={heroBanners} />

      {/* 2. Moving Text Bar */}
      <MovingText />

      <main className="w-full flex-1">
        
        {/* 3. Limited Sale */}
        <SectionWrapper isBlue={false} aos="fade-up">
          <ProductSection title="Limited Sale ⚡" products={homepageData.limited_sale} />
        </SectionWrapper>

        {/* 4. Shop by Categories */}
        <SectionWrapper isBlue={true} id="categories-section" aos="fade-up">
          <CategorySlider categories={categories} />
        </SectionWrapper>

        {/* Banner Layout 1: Category এর পরে (50% - 50%) */}
        {categoryBanners.length > 0 && (
          <SectionWrapper isBlue={false} aos="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
              {categoryBanners.map((banner, index) => (
                <a 
                  key={banner.id} 
                  href={banner.link || '#'} 
                  className="block h-56 md:h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </a>
              ))}
            </div>
          </SectionWrapper>
        )}

        {/* 5. Auto Moving Brands */}
        <SectionWrapper isBlue={true} aos="fade-in">
          <BrandAutoSlider brands={brands} />
        </SectionWrapper>

        {/* Banner Layout 2: Brands এর পরে (100% Width) */}
        {brandBanner.length > 0 && (
          <SectionWrapper isBlue={false} aos="fade-up">
            <a 
              href={brandBanner[0].link || '#'} 
              className="block h-80 md:h-[400px] lg:h-[450px] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <img src={brandBanner[0].image} alt={brandBanner[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </a>
          </SectionWrapper>
        )}

        {/* 6. Exclusive Products */}
        <SectionWrapper isBlue={true} aos="fade-up">
          <ProductSection title="Exclusive Products 🌟" products={homepageData.exclusive_products} />
        </SectionWrapper>

        {/* 7. Dynamic Sections from Admin Panel */}
        {dynamicSections.map((section, index) => (
          <SectionWrapper key={index} isBlue={index % 2 === 0} aos="fade-up">
            <ProductSection title={section.title} products={section.products} />
          </SectionWrapper>
        ))}

        {/* Banner Layout 3: Review Section এর আগে (60% - 40%) */}
        {preReviewBanners.length === 2 && (
          <SectionWrapper isBlue={false} aos="fade-up">
            <div className="flex flex-col md:flex-row gap-6 overflow-hidden">
              <a 
                href={preReviewBanners[0].link || '#'} 
                className="w-full md:w-[60%] block h-56 md:h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <img src={preReviewBanners[0].image} alt={preReviewBanners[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </a>
              <a 
                href={preReviewBanners[1].link || '#'} 
                className="w-full md:w-[40%] block h-56 md:h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <img src={preReviewBanners[1].image} alt={preReviewBanners[1].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </a>
            </div>
          </SectionWrapper>
        )}

        {/* 8. Customer Reviews */}
        <SectionWrapper isBlue={true} id="reviews-section" aos="fade-up">
         <ReviewSection reviews={homepageData.reviews} />
        </SectionWrapper>

        {/* 9. Blogs */}
        <SectionWrapper isBlue={false} id="blog-section" aos="fade-up">
          <BlogSection blogs={homepageData.blogs} />
        </SectionWrapper>

      </main>
      
      {/* 10. Footer */}
      <Footer />
    </div>
  );
};

export default Home;