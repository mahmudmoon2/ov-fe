import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, FileText, Info, Target, Heart } from 'lucide-react';
import api from '../api/axios';

const Footer = () => {
  const [blogs, setBlogs] = useState([]);

  // ব্যাকএন্ড থেকে ডায়নামিক ব্লগ ফেচ করা হচ্ছে
  useEffect(() => {
    api.get('products/homepage-data/')
      .then(res => {
        setBlogs(res.data.blogs || []);
      })
      .catch(err => console.error("Footer blog fetch error:", err));
  }, []);

  const backendBaseUrl = 'http://127.0.0.1:8000'; 
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${backendBaseUrl}${path}`;
  };

  return (
    // সম্পূর্ণ ফুটারটিকে হালকা নীল (Very Light Blue) ব্যাকগ্রাউন্ড দেওয়া হয়েছে
    <footer className="bg-[#F4F9FF] text-gray-700 pt-16 font-sans mt-12 border-t border-blue-100">
      
      {/* =======================================
          Top Section: 4 Columns
      ======================================= */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full border-2 border-blue-600 flex items-center justify-center bg-white shadow-sm">
                <Target size={20} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 tracking-wide">About Us</h3>
            </div>
            
            <ul className="space-y-5 mb-8 text-sm font-medium">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed text-gray-600">
                  House 12, Road 4, Dhanmondi,<br />
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-blue-600 flex-shrink-0" />
                <span className="text-blue-700 font-bold">+880 1740 109 551</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-blue-600 flex-shrink-0" />
                <span className="text-blue-700 font-bold">support@shokherghor.com</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Latest Blog (Dynamic) */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full border-2 border-blue-600 flex items-center justify-center bg-white shadow-sm">
                <FileText size={20} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 tracking-wide">Latest Blog</h3>
            </div>
            
            <div className="space-y-6">
              {blogs.length > 0 ? (
                blogs.slice(0, 2).map(blog => (
                  <Link to={`/blog/${blog.id}`} key={blog.id} className="flex gap-4 group cursor-pointer bg-white p-2 rounded-xl shadow-sm border border-transparent hover:border-blue-200 transition-all">
                    <img 
                      src={getImageUrl(blog.image) || `https://picsum.photos/seed/${blog.id}/80/80`} 
                      alt={blog.title} 
                      className="w-20 h-20 object-cover rounded-lg shadow-sm" 
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-[14px] font-bold text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1.5 font-medium">
                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-sm text-gray-500">No blogs available right now.</div>
              )}
            </div>
          </div>

          {/* Column 3: Information */}
          <div className="lg:pl-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full border-2 border-blue-600 flex items-center justify-center bg-white shadow-sm">
                <Info size={20} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 tracking-wide">Information</h3>
            </div>
            
            <ul className="space-y-4 font-bold text-[14px]">
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-300"></span> About Us</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-300"></span> All Products</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-300"></span> Our Blog</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-300"></span> Contact Us</Link></li>
              <li><Link to="/support" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-300"></span> Help & Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Instagram / Gallery */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full border-2 border-blue-600 flex items-center justify-center bg-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 tracking-wide">Instagram</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <a key={num} href="#" className="block overflow-hidden rounded-lg group shadow-sm border border-blue-100">
                  <img 
                    src={`https://picsum.photos/seed/gadget${num}/150/150`} 
                    alt={`Instagram ${num}`} 
                    className="w-full h-20 md:h-24 object-cover transform group-hover:scale-110 transition-transform duration-500" 
                  />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* =======================================
          Middle Stripe: Navy Blue Newsletter
      ======================================= */}
      <div className="bg-[#1e3a8a] py-10 relative overflow-hidden">
        {/* হালকা ডেকোরেশন ইফেক্ট */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-white mb-2">Subscribe to our Newsletter</h3>
            <p className="text-blue-200 text-sm font-medium">Get the latest updates and exclusive offers directly in your inbox.</p>
          </div>
          
          <form className="flex w-full md:w-auto flex-1 max-w-md shadow-xl rounded-lg overflow-hidden">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-white text-gray-800 text-sm px-5 py-3.5 w-full focus:outline-none font-medium"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-6 py-3.5 hover:bg-blue-400 transition-colors flex items-center justify-center font-bold">
              <Send size={18} className="mr-2" /> Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* =======================================
          Bottom Section: Copyright
      ======================================= */}
      <div className="bg-[#EBF3FF] py-6 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-gray-500">
          <p>Copyright © {new Date().getFullYear()} <span className="text-blue-700">Shokher Ghor</span>. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Mahmud Moon - Full Stack Developer.
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;