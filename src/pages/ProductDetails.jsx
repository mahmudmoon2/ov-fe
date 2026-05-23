import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Truck, Plus, Minus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    api.get(`products/details/${id}/`)
      .then(res => {
        setProduct(res.data);
        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
      })
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'inc') setQuantity(prev => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const currentPrice = selectedVariant 
    ? Number(product.price) + Number(selectedVariant.price_adjustment) 
    : Number(product.price);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Product Area */}
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative border border-gray-100 rounded-xl p-4 bg-gray-50 flex justify-center items-center h-96">
              {product.is_featured && (
                <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">SALE</span>
              )}
              <img src={product.thumbnail || `https://picsum.photos/seed/${product.id}/400`} alt={product.name} className="max-h-full object-contain" />
            </div>
            {/* Thumbnails (Mockup) */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="w-20 h-20 border border-gray-200 rounded-md p-1 cursor-pointer hover:border-primary">
                  <img src={product.thumbnail || `https://picsum.photos/seed/${product.id}/100`} className="w-full h-full object-contain" alt="thumb" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            {/* Brand Logo/Name */}
            <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold text-lg">
               {product.brand_details?.logo ? (
                 <img src={product.brand_details.logo} alt="brand" className="h-6" />
               ) : (
                 <span>{product.brand_details?.name || 'Brand'}</span>
               )}
            </div>

            <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4 leading-snug">{product.name}</h1>
            <p className="text-2xl font-bold text-blue-600 mb-6">৳{currentPrice.toLocaleString()}</p>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mb-6 flex items-center gap-4">
                <span className="text-gray-600 font-medium text-sm">Variant:</span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-1.5 border text-sm rounded-md transition ${
                        selectedVariant?.id === v.id ? 'border-gray-800 text-gray-800 font-semibold' : 'border-gray-300 text-gray-500 hover:border-gray-400'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions: Quantity & Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button onClick={() => handleQuantity('dec')} className="px-3 py-2 text-gray-600 hover:bg-gray-100"><Minus size={16} /></button>
                <span className="px-4 py-2 text-gray-800 font-medium border-x border-gray-300">{quantity}</span>
                <button onClick={() => handleQuantity('inc')} className="px-3 py-2 text-gray-600 hover:bg-gray-100"><Plus size={16} /></button>
              </div>

              <button className="bg-[#f27a24] text-white px-8 py-3 rounded-md font-bold hover:bg-orange-600 transition shadow-md">
                ADD TO CART
              </button>
              <button className="bg-[#5cb85c] text-white px-8 py-3 rounded-md font-bold hover:bg-green-600 transition shadow-md">
                BUY NOW
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-6 mb-6">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={28} className="text-blue-500" />
                <span className="text-xs font-medium text-gray-600">Authentic Gadgets<br/>100% Authentic</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 border-x border-gray-100">
                <CheckCircle size={28} className="text-purple-500" />
                <span className="text-xs font-medium text-gray-600">Brand<br/>Since 2017</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={28} className="text-blue-400" />
                <span className="text-xs font-medium text-gray-600">Hassle Free<br/>Delivery</span>
              </div>
            </div>

            {/* EMI Banner Mockup */}
            <div className="w-full bg-indigo-50 border border-indigo-100 rounded-md p-3 flex items-center justify-center gap-4">
               <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">EMI</span>
               <span className="text-indigo-900 font-bold text-sm">AVAILABLE FOR CREDIT CARDS</span>
            </div>
          </div>
        </div>

        {/* Bottom Tabs Area */}
        <div className="mt-12 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200">
            {['description', 'additional information', 'reviews (0)'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-center font-bold uppercase text-sm tracking-wider transition ${
                  activeTab === tab ? 'bg-gray-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-8 text-gray-600 leading-relaxed min-h-[300px]">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Product Overview</h3>
                <p>{product.description}</p>
                {/* আরো স্পেসিফিকেশন অ্যাডমিন প্যানেল থেকে আসলে এখানে রেন্ডার করবেন */}
              </div>
            )}
            {activeTab === 'additional information' && <p>No additional information available.</p>}
            {activeTab === 'reviews (0)' && <p>There are no reviews yet.</p>}
          </div>
        </div>
        
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;