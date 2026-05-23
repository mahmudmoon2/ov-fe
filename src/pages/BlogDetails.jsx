import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // ব্যাকএন্ড থেকে নির্দিষ্ট ব্লগের ডেটা আনা
    api.get(`products/blog/${id}/`)
      .then(res => setBlog(res.data))
      .catch(err => console.error("Error fetching blog details:", err));
  }, [id]);

  if (!blog) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="text-primary hover:underline mb-6 inline-block font-semibold">
          &larr; Back to Home
        </Link>
        
        <article className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <div className="mb-8 text-center">
            <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide">
              {blog.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mt-4 mb-4 leading-tight">
              {blog.title}
            </h1>
            <p className="text-gray-500 text-sm">Published on: {new Date(blog.created_at).toLocaleDateString()}</p>
          </div>

          {/* ব্লগের কভার ইমেজ */}
          <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-10">
            <img 
              src={blog.image || `https://picsum.photos/seed/${blog.id+100}/1000/600`} 
              alt={blog.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* ব্লগের বিস্তারিত লেখা */}
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            {/* যেহেতু আমাদের মডেলে description নেই, তাই excerpt দেখাচ্ছি। আপনি চাইলে মডেলে full_content ফিল্ড যোগ করতে পারেন */}
            <p className="text-xl mb-4 font-medium text-gray-700">{blog.excerpt}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
              {/* অ্যাডমিন প্যানেল থেকে বড় টেক্সট আসলে এখানে রেন্ডার হবে */}
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetails;