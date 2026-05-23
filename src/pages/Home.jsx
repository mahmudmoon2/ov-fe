import { useEffect, useState } from 'react';
import api from '../api/axios';

// Components Import
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MovingText from '../components/MovingText';
import ProductSection from '../components/ProductSection';
import CategorySlider from '../components/CategorySlider';
import BrandAutoSlider from '../components/BrandAutoSlider';
import { ReviewSection, BlogSection } from '../components/ReviewAndBlogSection';
import Footer from '../components/Footer';

const Home = () => {
  const [homepageData, setHomepageData] = useState({ limited_sale: [], exclusive_products: [] });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [banners, setBanners] = useState([]);
  const [dynamicSections, setDynamicSections] = useState([]); // অ্যাডমিন প্যানেলের ডায়নামিক সেকশনের জন্য

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [homeRes, catRes, brandRes, bannerRes] = await Promise.all([
          api.get('products/homepage-data/'),
          api.get('products/categories/'),
          api.get('products/brands/'),
          api.get('products/banners/')
        ]);
        
        setHomepageData(homeRes.data);
        setCategories(catRes.data);
        setBrands(brandRes.data);
        setBanners(bannerRes.data);
        
        // যদি ব্যাকএন্ডে dynamic_sections থাকে, তবে সেটা এখানে সেট করবেন
        if(homeRes.data.dynamic_sections) {
            setDynamicSections(homeRes.data.dynamic_sections);
        }
      } catch (err) {
        console.error("Error fetching dynamic data:", err);
      }
    };

    fetchAllData();
  }, []);

  const heroBanners = banners.filter(b => b.position === 'hero_carousel' || b.position.includes('hero_side'));
  const midBanners = banners.filter(b => b.position === 'mid_banner').slice(0, 2);

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans">
      <Navbar />
      
      {/* 1. Hero Section */}
      <HeroSection banners={heroBanners} />

      {/* 2. Moving Text Bar */}
      <MovingText />

      <main className="max-w-7xl mx-auto px-4">
        
        {/* 3. Limited Sale (5+5, Load More) */}
        <ProductSection title="Limited Sale ⚡" products={homepageData.limited_sale} />

        {/* 4. Shop by Categories (Round Icons) */}
        <CategorySlider categories={categories} />

        {/* 5. Mid Banners */}
        {midBanners.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
            {midBanners.map(banner => (
              <a key={banner.id} href={banner.link || '#'} className="block h-48 md:h-64 rounded-xl overflow-hidden shadow-sm hover:opacity-90 transition">
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </a>
            ))}
          </section>
        )}

        {/* 6. Auto Moving Brands */}
        <BrandAutoSlider brands={brands} />

        {/* 7. Exclusive Products (5+5, Load More) */}
        <ProductSection title="Exclusive Products 🌟" products={homepageData.exclusive_products} />

        {/* 8. Dynamic Sections from Admin Panel */}
        {dynamicSections.map((section, index) => (
          <ProductSection key={index} title={section.title} products={section.products} />
        ))}

        {/* 9. Customer Reviews */}
         <ReviewSection reviews={homepageData.reviews} />

         {/* 10. Blogs */}
        <BlogSection blogs={homepageData.blogs} />

      </main>
      
      {/* 11. Footer */}
      <Footer />
    </div>
  );
};

export default Home;