import { useEffect, useState } from 'react';
import { Search, ShoppingCart, User, MessageCircle, ChevronDown, Menu, X, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // স্ক্রল স্টেট ম্যানেজ করার জন্য
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigate = useNavigate();
  const { 
    cartItems, isCartOpen, setIsCartOpen, 
    incrementQuantity, decrementQuantity, removeFromCart, toastMessage 
  } = useCart();

  const cartTotal = cartItems.reduce((total, item) => total + (Number(item.currentPrice) * item.quantity), 0);

  // Categories Fetch
  useEffect(() => {
    api.get('products/categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Navbar category fetch error:", err));
  }, []);

  // =====================================
  // Scroll Listener Logic
  // =====================================
  useEffect(() => {
    const handleScroll = () => {
      // যদি ইউজার 30px এর বেশি স্ক্রল করে, তবে স্টেট true হবে
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleCategories = categories.slice(0, 8);
  const moreCategories = categories.slice(8);

  const backendBaseUrl = 'http://127.0.0.1:8000'; 
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${backendBaseUrl}${path}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckoutNav = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 right-5 bg-white text-gray-800 border border-green-100 px-5 py-3 rounded-lg shadow-2xl z-[100] flex items-center gap-3 animate-bounce">
          <CheckCircle2 size={20} className="text-green-500" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* ========================================
        Main Header (Scroll-Aware) 
        ========================================
      */}
      <header 
        className={`sticky top-0 z-40 relative transition-all duration-300 ${
          isScrolled 
            ? 'bg-blue-50/80 backdrop-blur-md shadow-lg border-b border-blue-100/50' // স্ক্রল করলে গ্লাস ইফেক্ট ও হালকা ব্লু
            : 'bg-white shadow-sm border-b border-blue-50' // ডিফল্ট সাদা
        }`}
      >
        
        {/* Top Announcement Bar (Animated Hide on Scroll) */}
        <div 
          className={`bg-blue-600 text-white text-[11px] font-bold tracking-wider text-center uppercase transition-all duration-300 overflow-hidden ${
            isScrolled ? 'h-0 opacity-0' : 'h-8 py-1.5 opacity-100'
          }`}
        >
          Free Delivery on all orders over ৳5000!
        </div>

        {/* Main Nav Container */}
        <div className={`max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
          
          {/* 1. Left: Logo */}
          <div className="flex-1 flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className={`lg:hidden cursor-pointer transition ${isScrolled ? 'text-blue-600' : 'text-gray-500'}`}>
              <Menu size={28} />
            </button>
            <Link to="/" className="text-2xl md:text-3xl font-black tracking-tight cursor-pointer flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
                <span className="text-lg">S</span>
              </div>
              <span className="text-gray-800">SOKHER<span className="text-blue-600">GHOR</span></span>
            </Link>
          </div>

          {/* 2. Middle: Navigation Links */}
          <nav className={`hidden lg:flex flex-1 justify-center items-center gap-8 text-[15px] font-bold ${isScrolled ? 'text-gray-700' : 'text-gray-600'}`}>
            <Link to="/" className="relative py-2 group/nav hover:text-blue-600 transition-colors">
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-blue-600 transition-all duration-300 group-hover/nav:w-full rounded-full"></span>
            </Link>
            <button onClick={() => handleNavClick('categories-section')} className="relative py-2 group/nav hover:text-blue-600 transition-colors cursor-pointer">
              Categories
              <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-blue-600 transition-all duration-300 group-hover/nav:w-full rounded-full"></span>
            </button>
            <Link to="/products" className="relative py-2 group/nav hover:text-blue-600 transition-colors">
              Products
              <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-blue-600 transition-all duration-300 group-hover/nav:w-full rounded-full"></span>
            </Link>
            <button onClick={() => handleNavClick('blog-section')} className="relative py-2 group/nav hover:text-blue-600 transition-colors cursor-pointer">
              Blog
              <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-blue-600 transition-all duration-300 group-hover/nav:w-full rounded-full"></span>
            </button>
            <button onClick={() => handleNavClick('reviews-section')} className="relative py-2 group/nav hover:text-blue-600 transition-colors cursor-pointer">
              Reviews
              <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-blue-600 transition-all duration-300 group-hover/nav:w-full rounded-full"></span>
            </button>
          </nav>

          {/* 3. Right: Actions */}
          <div className="flex-1 flex justify-end items-center gap-5 md:gap-6 text-sm font-semibold text-gray-600">
            
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className={`cursor-pointer transition-colors p-2 rounded-full ${isSearchOpen ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-100 hover:text-blue-700'}`}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
              <User size={20} />
              <span>Login</span>
            </div>
            
            <a href="https://wa.me/8801740109551" target="_blank" rel="noreferrer" className="cursor-pointer hover:text-green-500 transition hidden sm:block">
              <MessageCircle size={22} />
            </a>
            
            {/* Cart Button with slightly darker background when scrolled */}
            <div onClick={() => setIsCartOpen(true)} className={`flex items-center gap-3 cursor-pointer hover:text-blue-600 transition px-3 py-1.5 rounded-full border border-blue-100 ${isScrolled ? 'bg-white/60' : 'bg-blue-50/50'}`}>
              <div className="relative">
                <ShoppingCart size={22} className="text-blue-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-[18px] w-[18px] flex items-center justify-center border-2 border-white">
                  {cartItems.length}
                </span>
              </div>
              <span className="hidden md:block font-bold text-sm text-gray-800">৳{cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Animated Search Bar Overlay */}
        <div className={`absolute left-0 w-full bg-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 ease-in-out z-30 ${isSearchOpen ? 'max-h-24 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto px-4 relative flex items-center">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for your favorite products..." 
              className="w-full bg-gray-50 text-gray-800 rounded-full py-3.5 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner border border-gray-100 text-base font-medium"
              autoFocus={isSearchOpen}
            />
            <button type="submit" className="absolute right-6 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors">
              <Search size={22} />
            </button>
          </form>
        </div>

        {/* Bottom Row Categories Mega Menu (Hides on Scroll for cleaner look) */}
        <div className={`bg-gradient-to-r from-blue-50 via-white to-blue-50 border-t border-b border-blue-100 relative transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 border-transparent' : 'max-h-20 opacity-100'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <ul className="hidden lg:flex items-center justify-center gap-8 text-[14px] font-bold text-gray-600">
              
              {visibleCategories.map(cat => (
                <li key={cat.id} className="group py-3.5 cursor-pointer">
                  <span className="flex items-center gap-1 hover:text-blue-600 transition tracking-wide">
                    {cat.name} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                  </span>

                  <div className="absolute left-0 top-full w-full bg-white text-gray-800 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 transform translate-y-2 group-hover:translate-y-0 z-50 border-t-2 border-blue-600">
                    <div className="max-w-7xl mx-auto p-8">
                      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
                        <h3 className="text-xl font-black text-gray-800 uppercase tracking-wider">{cat.name} Collection</h3>
                        <Link to={`/category/${cat.id}`} className="flex items-center gap-1 text-blue-600 font-bold hover:text-blue-800 transition">
                          View All <ArrowRight size={16} />
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-6">
                        {cat.top_products && cat.top_products.length > 0 ? (
                          cat.top_products.map((prod) => (
                            <Link to={`/product/${prod.id}`} key={prod.id} className="flex flex-col group/item cursor-pointer">
                              <div className="bg-gray-50 rounded-xl h-40 mb-3 overflow-hidden border border-gray-100 flex items-center justify-center p-4 group-hover/item:border-blue-200 transition-colors">
                                <img 
                                  src={getImageUrl(prod.thumbnail)} 
                                  alt={prod.name} 
                                  className="max-h-full max-w-full object-contain group-hover/item:scale-110 transition-transform duration-500" 
                                />
                              </div>
                              <span className="text-[13px] font-bold text-gray-700 group-hover/item:text-blue-600 transition-colors line-clamp-1">
                                {prod.name}
                              </span>
                              <span className="text-blue-600 font-black text-sm mt-1">৳ {Number(prod.discount_price || prod.price).toLocaleString()}</span>
                            </Link>
                          ))
                        ) : (
                          <div className="col-span-5 text-center text-gray-400 py-6 font-medium">No products found in this category.</div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}

              {/* More Categories Option */}
              {moreCategories.length > 0 && (
                <li className="group py-3.5 cursor-pointer relative">
                  <span className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition tracking-wide font-black">
                    More Categories <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                  </span>
                  
                  <div className="absolute right-0 top-full mt-0 w-64 bg-white text-gray-800 rounded-b-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border-t-2 border-blue-600">
                    <ul className="py-2">
                      {moreCategories.map(cat => (
                        <li key={cat.id} className="group/sub relative">
                          <Link to={`/category/${cat.id}`} className="px-5 py-3 hover:bg-blue-50 hover:text-blue-600 transition text-[13px] font-bold border-b border-gray-50 last:border-0 flex justify-between items-center text-gray-600">
                            {cat.name}
                            <ChevronDown size={14} className="-rotate-90 text-gray-400 group-hover/sub:text-blue-600 transition-colors" />
                          </Link>

                          {/* Nested Flyout Menu */}
                          <div className="absolute right-full top-0 w-[600px] bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-50 border-r-2 border-blue-600 p-6 rounded-l-xl cursor-default">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                              <h3 className="text-base font-black text-gray-800 uppercase tracking-wider">{cat.name}</h3>
                              <Link to={`/category/${cat.id}`} className="text-blue-600 font-bold hover:text-blue-800 transition text-[13px] flex items-center gap-1">
                                View All <ArrowRight size={14} />
                              </Link>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-4">
                              {cat.top_products && cat.top_products.length > 0 ? (
                                cat.top_products.slice(0, 4).map((prod) => (
                                  <Link to={`/product/${prod.id}`} key={prod.id} className="flex flex-col group/item cursor-pointer">
                                    <div className="bg-gray-50 rounded-lg h-24 mb-2 overflow-hidden border border-gray-100 flex items-center justify-center p-2 group-hover/item:border-blue-200">
                                      <img 
                                        src={getImageUrl(prod.thumbnail)} 
                                        alt={prod.name} 
                                        className="max-h-full max-w-full object-contain group-hover/item:scale-110 transition-transform duration-500" 
                                      />
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-700 group-hover/item:text-blue-600 transition-colors line-clamp-1">
                                      {prod.name}
                                    </span>
                                    <span className="text-blue-600 font-black text-[12px] mt-0.5">৳ {Number(prod.discount_price || prod.price).toLocaleString()}</span>
                                  </Link>
                                ))
                              ) : (
                                <div className="col-span-4 text-center text-gray-400 py-4 text-xs font-medium">No products found.</div>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Light Theme) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-blue-50/50">
          <Link to="/" className="text-xl font-black tracking-tight flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 text-white rounded flex items-center justify-center shadow-sm">
              <span className="text-sm">S</span>
            </div>
            <span className="text-gray-800">SOKHER<span className="text-blue-600">GHOR</span></span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-red-500 bg-white rounded-full p-1 shadow-sm"><X size={20} /></button>
        </div>
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          <ul className="space-y-4 font-bold text-gray-600 text-[15px]">
            <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-blue-600">Home</Link></li>
            <li><button onClick={() => handleNavClick('categories-section')} className="w-full text-left hover:text-blue-600">Categories</button></li>
            <li><Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-blue-600">Products</Link></li>
            <li><button onClick={() => handleNavClick('blog-section')} className="w-full text-left hover:text-blue-600">Blog</button></li>
            <li><button onClick={() => handleNavClick('reviews-section')} className="w-full text-left hover:text-blue-600">Reviews</button></li>
          </ul>
        </div>
      </div>

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-blue-50/50">
          <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
            <ShoppingCart size={20} className="text-blue-600" />
            Your Cart <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">{cartItems.length}</span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-red-500 bg-white rounded-full p-1 shadow-sm transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5 flex flex-col flex-1 overflow-y-auto custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart size={32} className="opacity-50" />
              </div>
              <p className="font-medium text-gray-500">Your cart is currently empty.</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-6 bg-blue-600 text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-colors shadow-md">
                Return to Shop
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center border-b border-gray-50 pb-5 group">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg p-2 border border-gray-100 group-hover:border-blue-200 transition-colors">
                    <img src={item.imageSrc} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-bold text-gray-700 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{item.name}</h4>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                        <button onClick={() => decrementQuantity(item.id)} className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 transition-colors font-bold">-</button>
                        <span className="px-3 text-[13px] font-bold text-gray-700 border-x border-gray-200">{item.quantity}</span>
                        <button onClick={() => incrementQuantity(item.id)} className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 transition-colors font-bold">+</button>
                      </div>
                      <p className="text-blue-600 font-black text-sm">৳{item.currentPrice}</p>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors self-start mt-1">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-5">
              <span className="font-bold text-gray-500 text-sm uppercase tracking-wider">Subtotal:</span>
              <span className="font-black text-2xl text-gray-800">৳{cartTotal.toLocaleString()}</span>
            </div>
            <button onClick={handleCheckoutNav} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] uppercase tracking-wide flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;