import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// ==========================================
// 1. Customer Review Section
// ==========================================
export const ReviewSection = ({ reviews = [] }) => {
  if (reviews.length === 0) return null;

  return (
    <section className="py-10 bg-gray-50 my-10 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative flex flex-col h-full">
            <div className="flex items-center gap-1 text-yellow-400 mb-3 text-lg">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <p className="text-gray-600 text-sm italic mb-4 flex-1">"{review.comment}"</p>
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold uppercase">
                {review.customer_name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">{review.customer_name}</h4>
                {review.is_verified && <p className="text-xs text-green-600 font-semibold">Verified Buyer</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


// ==========================================
// 2. Blog Section (New Design)
// ==========================================

// ব্লগের জন্য পেস্টেল কালারের একটি অ্যারে (আপনার স্ক্রিনশটের মতো)
const bgColors = [
  'bg-[#FFF5EE]', // Light Peach
  'bg-[#F4F6F9]', // Light Slate/Blue
  'bg-[#FFF0F5]', // Light Pink
  'bg-[#F0FFF0]', // Light Green
  'bg-[#FFF5EE]'  // Light Peach
];

// পুনর্ব্যবহারযোগ্য ব্লগ কার্ড কম্পোনেন্ট
const BlogCard = ({ blog, color }) => (
  <div className={`p-6 rounded-xl flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 ${color}`}>
    <h3 className="font-bold text-lg text-gray-800 mb-3 leading-snug">{blog.title}</h3>
    <p className="text-gray-600 text-sm mb-4 line-clamp-6 leading-relaxed">
      {blog.excerpt}
    </p>
    <Link 
      to={`/blog/${blog.id}`} 
      className="mt-auto font-bold text-gray-800 hover:text-primary transition-colors text-sm inline-flex items-center gap-1"
    >
      Read More
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </Link>
  </div>
);

export const BlogSection = ({ blogs = [] }) => {
  if (blogs.length === 0) return null;

  return (
    <section className="py-10 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-primary pl-3 mb-6">Latest Tech Blogs</h2>
      
      {/* 3 কলামের গ্রিড লেআউট (৬টি বক্সের জায়গা তৈরি করবে) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ১. প্রথম ব্লগ কার্ড (বাম পাশে) */}
        {blogs[0] && <BlogCard blog={blogs[0]} color={bgColors[0]} />}

        {/* ২. মাঝখানের অটো চেঞ্জিং ইমেজ ক্যারোসেল (স্লাইডার) */}
        <div className="rounded-xl overflow-hidden relative shadow-sm h-72 md:h-auto min-h-[320px]">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500 }}
            pagination={{ clickable: true }}
            className="h-full w-full"
          >
            {blogs.map(blog => (
              <SwiperSlide key={`img-${blog.id}`}>
                <div className="relative w-full h-full group">
                  <img 
                    src={blog.image || `https://picsum.photos/seed/${blog.id + 100}/600/600`} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {/* ছবির নিচে টাইটেল ও লিংঙ্ক */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-5 pt-12">
                    <Link to={`/blog/${blog.id}`} className="text-white font-bold hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ৩. বাকি ব্লগগুলো লুপ করে বসানো (সর্বোচ্চ ৪টি) */}
        {blogs.slice(1, 5).map((blog, idx) => (
          <BlogCard key={blog.id} blog={blog} color={bgColors[idx + 1]} />
        ))}
        
      </div>
    </section>
  );
};