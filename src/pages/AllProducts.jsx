import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, ChevronDown, X, Loader2, LayoutGrid, List as ListIcon, LayoutPanelLeft } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(200000); 
  const [sortOrder, setSortOrder] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // View Mode State: 'grid', 'list', or 'compact'
  const [viewMode, setViewMode] = useState('grid'); 

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('category')) setSelectedCategories([Number(searchParams.get('category'))]);
    if (searchParams.get('brand')) setSelectedBrands([Number(searchParams.get('brand'))]);
  }, [location.search]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      api.get('products/list/'), 
      api.get('products/categories/'),
      api.get('products/brands/')
    ])
    .then(([prodRes, catRes, brandRes]) => {
      const extractData = (data) => Array.isArray(data) ? data : (data?.results || []);
      setProducts(extractData(prodRes.data));
      setCategories(extractData(catRes.data));
      setBrands(extractData(brandRes.data));
    })
    .catch(err => console.error("API Fetch Error:", err))
    .finally(() => setIsLoading(false));
  }, []);

  const handleCategoryChange = (id) => setSelectedCategories(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  const handleBrandChange = (id) => setSelectedBrands(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);

  let filteredProducts = products.filter(product => {
    const catId = typeof product.category === 'object' ? product.category?.id : product.category;
    const brandId = typeof product.brand === 'object' ? product.brand?.id : product.brand;
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(catId);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brandId);
    
    const discount = parseFloat(product.discount_price);
    const regular = parseFloat(product.price);
    const productPrice = (!isNaN(discount) && discount > 0) ? discount : (!isNaN(regular) ? regular : 0);
    const matchesPrice = productPrice <= maxPrice;
    
    return matchesCategory && matchesBrand && matchesPrice;
  });

  if (sortOrder === 'low-to-high') filteredProducts.sort((a, b) => (parseFloat(a.discount_price) || parseFloat(a.price) || 0) - (parseFloat(b.discount_price) || parseFloat(b.price) || 0));
  else if (sortOrder === 'high-to-low') filteredProducts.sort((a, b) => (parseFloat(b.discount_price) || parseFloat(b.price) || 0) - (parseFloat(a.discount_price) || parseFloat(a.price) || 0));

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b-2 border-blue-100 pb-2 mb-5">Filter by Price</h3>
        <input type="range" min="0" max="200000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"/>
        <div className="flex justify-between text-sm font-bold text-gray-600 mt-3">
          <span>৳ 0</span>
          <span className="text-blue-700 bg-blue-50 px-2 py-1 rounded">Max: ৳{maxPrice.toLocaleString()}</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b-2 border-blue-100 pb-2 mb-4">Categories</h3>
        <div className="space-y-3 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-3 text-[15px] text-gray-700 font-medium cursor-pointer group select-none">
              <input type="checkbox" checked={selectedCategories.includes(cat.id)} onChange={() => handleCategoryChange(cat.id)} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition-all cursor-pointer"/>
              <span className="group-hover:text-blue-600 transition-colors">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b-2 border-blue-100 pb-2 mb-4">Brands</h3>
        <div className="space-y-3 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
          {brands.map(brand => (
            <label key={brand.id} className="flex items-center gap-3 text-[15px] text-gray-700 font-medium cursor-pointer group select-none">
              <input type="checkbox" checked={selectedBrands.includes(brand.id)} onChange={() => handleBrandChange(brand.id)} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition-all cursor-pointer"/>
              <span className="group-hover:text-blue-600 transition-colors">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans flex flex-col">
      <Navbar />
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">Our Collection</h1>
          <p className="text-gray-500 mt-1 text-sm">Discover the best premium products</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 w-full">
        
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button onClick={() => setIsMobileFilterOpen(true)} className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md font-semibold text-gray-700 shadow-sm">
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>

        <aside className="hidden lg:block bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-blue-50 h-fit sticky top-24">
          <FilterContent />
        </aside>

        {isMobileFilterOpen && <div className="fixed inset-0 bg-black/60 z-50 lg:hidden" onClick={() => setIsMobileFilterOpen(false)}></div>}
        <div className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white z-10">
            <h2 className="text-lg font-bold flex items-center gap-2"><SlidersHorizontal size={20}/> Filters</h2>
            <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={20} /></button>
          </div>
          <div className="p-6"><FilterContent /></div>
        </div>

        <div className="lg:col-span-3 flex flex-col">
          
          {/* Top Toolbar with View Toggle */}
          <div className="flex flex-col xl:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 gap-4">
            <p className="text-gray-600 font-medium">
              Showing <span className="font-bold text-blue-600">{filteredProducts.length}</span> products
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              
              {/* View Mode Toggle Buttons */}
              <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('list')} 
                  title="List View"
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <ListIcon size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('grid')} 
                  title="Grid View"
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('compact')} 
                  title="Compact Grid"
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'compact' ? 'bg-white shadow text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <LayoutPanelLeft size={18} />
                </button>
              </div>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-gray-500 hidden sm:block">Sort:</label>
                <div className="relative">
                  <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-9 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm font-medium">
                    <option value="default">Default</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 flex flex-col items-center justify-center flex-1">
              <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-800">Loading products...</h3>
            </div>
          ) : filteredProducts.length > 0 ? (
            
            // Dynamic Grid Layout based on View Mode
            <div className={`
              ${viewMode === 'list' ? 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6' : ''}
              ${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6' : ''}
              ${viewMode === 'compact' ? 'grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4' : ''}
            `}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 flex flex-col items-center justify-center flex-1">
              <SlidersHorizontal size={32} className="text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
              <button onClick={() => { setSelectedCategories([]); setSelectedBrands([]); setMaxPrice(200000); }} className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 cursor-pointer">
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllProducts;