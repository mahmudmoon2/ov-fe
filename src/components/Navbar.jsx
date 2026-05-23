import { useEffect, useState } from 'react';
import { Search, ShoppingCart, User, MessageCircle, ChevronDown, Menu, X } from 'lucide-react';
import api from '../api/axios';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // আপাতত ডামি কার্ট স্টেট (পরবর্তীতে Redux বা Context API দিয়ে ম্যানেজ করবেন)
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    api.get('products/categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Navbar category fetch error:", err));
  }, []);

  // ক্যাটাগরিগুলোকে দুই ভাগে ভাগ করা (প্রথম ৬টি এবং বাকিগুলো)
  const visibleCategories = categories.slice(0, 6);
  const moreCategories = categories.slice(6);

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // পরবর্তীতে এখানে সার্চ পেজে রিডাইরেক্ট করবেন
    }
  };

  return (
    <>
      <header className="bg-[#0A192F] text-white shadow-md sticky top-0 z-40">
        {/* Top Row */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Menu className="lg:hidden cursor-pointer" size={28} />
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider cursor-pointer">
              শখের <span className="text-primary">ঘর</span>
            </h1>
          </div>

          {/* Functional Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative text-gray-800">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products" 
              className="w-full bg-white rounded-full py-2.5 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-500 hover:text-primary cursor-pointer">
              <Search size={22} />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6 text-sm font-medium">
            <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:text-gray-300 transition">
              <User size={20} />
              <span>Login / Register</span>
            </div>
            
            {/* WhatsApp Redirect */}
            <a href="https://wa.me/8801740109551" target="_blank" rel="noreferrer" className="cursor-pointer hover:text-green-400 transition">
              <MessageCircle size={24} />
            </a>
            
            {/* Cart Drawer Trigger */}
            <div onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition">
              <div className="relative">
                <ShoppingCart size={26} />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#0A192F]">
                  {cartItems.length}
                </span>
              </div>
              <span className="hidden md:block font-bold text-base">৳0.00</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Dynamic Categories */}
        <div className="border-t border-gray-700 bg-[#061122]">
          <div className="max-w-7xl mx-auto px-4 py-2.5">
            <ul className="hidden lg:flex items-center gap-6 text-sm font-semibold relative">
              
              {/* প্রথম ৬টি ক্যাটাগরি */}
              {visibleCategories.map(cat => (
                <li key={cat.id} className="flex items-center gap-1 cursor-pointer hover:text-primary transition">
                  {cat.name} <ChevronDown size={14} className="mt-0.5 text-gray-400" />
                </li>
              ))}
              
              {/* More Categories Dropdown */}
              {moreCategories.length > 0 && (
                <li className="group relative flex items-center gap-1 cursor-pointer hover:text-primary transition">
                  More Categories <ChevronDown size={14} className="mt-0.5 text-gray-400 group-hover:rotate-180 transition-transform" />
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <ul className="py-2">
                      {moreCategories.map(cat => (
                        <li key={cat.id} className="px-4 py-2 hover:bg-gray-100 hover:text-primary transition">
                          {cat.name}
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

      {/* ----------------- Side Drawer for Cart ----------------- */}
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-red-500">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 flex flex-col h-[calc(100vh-140px)] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart size={48} className="mb-4 opacity-20" />
              <p>Your cart is currently empty.</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-4 bg-primary text-white px-6 py-2 rounded-full text-sm">Return to Shop</button>
            </div>
          ) : (
            <div>
              {/* Map cart items here later */}
              <p>Items will appear here...</p>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gray-50">
            <button className="w-full bg-green-500 text-white py-3 rounded-md font-bold hover:bg-green-600 transition">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;