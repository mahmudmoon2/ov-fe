import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Loader2, Search, ArrowLeft } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || ''; // URL থেকে সার্চ কুয়েরি নেওয়া হচ্ছে

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // স্ক্রলের একদম উপরে নিয়ে যাওয়ার জন্য
    window.scrollTo(0, 0);

    setIsLoading(true);
    // প্রোডাক্ট এবং ক্যাটাগরি দুটোই ফেচ করা হচ্ছে যাতে ক্যাটাগরির নাম দিয়েও সার্চ করা যায়
    Promise.all([
      api.get('products/list/'),
      api.get('products/categories/')
    ])
    .then(([prodRes, catRes]) => {
      const extractedProducts = Array.isArray(prodRes.data) ? prodRes.data : (prodRes.data?.results || []);
      const extractedCategories = Array.isArray(catRes.data) ? catRes.data : (catRes.data?.results || []);
      
      setProducts(extractedProducts);
      setCategories(extractedCategories);
    })
    .catch(err => console.error("Error fetching search data:", err))
    .finally(() => setIsLoading(false));
  }, []);

  // =====================================
  // Search Filter Logic
  // =====================================
  const lowerCaseQuery = query.toLowerCase();

  const searchResults = products.filter((product) => {
    if (!query) return false; // কুয়েরি ফাঁকা থাকলে কিছু দেখাবে না

    // Name Match
    const matchName = product.name?.toLowerCase().includes(lowerCaseQuery);
    
    // Brand Match
    const matchBrand = product.brand_details?.name?.toLowerCase().includes(lowerCaseQuery);
    
    // Category Match
    let categoryName = "";
    if (typeof product.category === 'object') {
      categoryName = product.category?.name || "";
    } else {
      const cat = categories.find(c => c.id === product.category);
      if (cat) categoryName = cat.name;
    }
    const matchCategory = categoryName.toLowerCase().includes(lowerCaseQuery);

    return matchName || matchBrand || matchCategory;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans flex flex-col">
      <Navbar />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-6 md:py-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-xl md:text-3xl font-black text-gray-800 flex items-center gap-3">
            Search Results for <span className="text-blue-600">"{query}"</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Found {searchResults.length} {searchResults.length === 1 ? 'item' : 'items'} matching your search
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex-1 w-full">
        {isLoading ? (
          // Loading State
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Searching for products...</h3>
          </div>
        ) : searchResults.length > 0 ? (
          // Results Grid
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {searchResults.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // No Results State
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 md:p-20 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
              <Search size={40} strokeWidth={1.5} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-500 font-medium max-w-md mb-8">
              We couldn't find any products matching "<span className="text-gray-800 font-bold">{query}</span>". Try checking your spelling or searching with more general terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/products')}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
              >
                Browse All Products
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} /> Go Back
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;