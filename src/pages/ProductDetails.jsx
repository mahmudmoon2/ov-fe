import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Truck, Plus, Minus, ShoppingBag, CreditCard, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);

  const backendBaseUrl = 'http://127.0.0.1:8000'; 
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${backendBaseUrl}${path}`;
  };

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0); 
    api.get(`products/details/${id}/`)
      .then(res => {
        setProduct(res.data);
        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
      })
      .catch(err => console.error("Error fetching product:", err))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'inc') setQuantity(prev => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Price Calculation Logic
  const baseDiscountPrice = Number(product.discount_price) || 0;
  const baseRegularPrice = Number(product.price);
  const hasDiscount = baseDiscountPrice > 0 && baseDiscountPrice < baseRegularPrice;
  const baseActivePrice = hasDiscount ? baseDiscountPrice : baseRegularPrice;
  
  const currentPrice = selectedVariant 
    ? baseActivePrice + Number(selectedVariant.price_adjustment) 
    : baseActivePrice;
    
  const oldPrice = hasDiscount 
    ? (selectedVariant ? baseRegularPrice + Number(selectedVariant.price_adjustment) : baseRegularPrice) 
    : null;

  // Total Price with Quantity
  const totalPrice = currentPrice * quantity;
  const totalOldPrice = oldPrice ? oldPrice * quantity : null;

  const imageSrc = getImageUrl(product.thumbnail);
  const brandLogoSrc = getImageUrl(product.brand_details?.logo);

  const handleAddToCart = () => {
    addToCart({ 
      id: product.id, 
      name: product.name, 
      currentPrice: currentPrice, 
      imageSrc,
      quantity: quantity,
      variant: selectedVariant?.name 
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart({ 
      id: product.id, 
      name: product.name, 
      currentPrice: currentPrice, 
      imageSrc,
      quantity: quantity,
      variant: selectedVariant?.name 
    });
    navigate('/checkout'); 
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans flex flex-col">
      <Navbar />
      
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-semibold text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition">Home</button>
          <ChevronRight size={14} />
          <button onClick={() => navigate('/products')} className="hover:text-blue-600 transition">Products</button>
          <ChevronRight size={14} />
          <span className="text-blue-600 truncate">{product.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex-1 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 md:p-10 rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] grid grid-cols-1 lg:grid-cols-2 gap-12 border border-blue-50"
        >
          <div className="space-y-4">
            <div className="relative border border-gray-100 rounded-2xl p-8 bg-[#F4F9FF] flex justify-center items-center h-[400px] md:h-[500px] group overflow-hidden">
              {product.is_featured && (
                <span className="absolute top-5 left-5 bg-blue-600 text-white text-[11px] font-black tracking-wider px-3 py-1.5 rounded-full shadow-md z-10">FEATURED</span>
              )}
              {imageSrc ? (
                <img src={imageSrc} alt={product.name} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out" />
              ) : (
                <div className="text-gray-400 font-medium">No Image Available</div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-sm tracking-wide uppercase">
               {brandLogoSrc ? <img src={brandLogoSrc} alt="brand" className="h-6 object-contain" /> : <span>{product.brand_details?.name || 'Premium Brand'}</span>}
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <p className="text-3xl font-black text-blue-600">৳{totalPrice.toLocaleString()}</p>
              {totalOldPrice && <p className="text-lg font-bold text-gray-400 line-through">৳{totalOldPrice.toLocaleString()}</p>}
            </div>

            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">In Stock ({product.stock} available)</span>
              ) : (
                <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200">Out of Stock</span>
              )}
            </div>

            {product.variants?.length > 0 && (
              <div className="mb-8 border-t border-gray-100 pt-6">
                <span className="block text-gray-800 font-bold mb-3">Available Options:</span>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => {
                    const extraPrice = Number(v.price_adjustment);
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-5 py-2 text-sm font-bold rounded-lg transition-all border-2 flex items-center gap-2 ${selectedVariant?.id === v.id ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50/50'}`}
                      >
                        {v.name}
                        {extraPrice > 0 && (
                          <span className={`text-[11px] px-1.5 py-0.5 rounded ${selectedVariant?.id === v.id ? 'bg-blue-200/50 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>+৳{extraPrice}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-10 mt-auto">
              <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white h-14">
                <button onClick={() => handleQuantity('dec')} className="px-4 text-gray-500 hover:text-blue-600 transition"><Minus size={18} strokeWidth={3} /></button>
                <span className="w-8 text-center text-gray-800 font-black text-lg">{quantity}</span>
                <button onClick={() => handleQuantity('inc')} className="px-4 text-gray-500 hover:text-blue-600 transition"><Plus size={18} strokeWidth={3} /></button>
              </div>

              <div className="flex flex-1 gap-3 min-w-[250px]">
                <button onClick={handleAddToCart} disabled={product.stock <= 0} className="flex-1 bg-blue-50 text-blue-700 border-2 border-blue-600 hover:bg-blue-100 h-14 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-50"><ShoppingBag size={20} /> <span className="hidden sm:block">Add to Cart</span></button>
                <button onClick={handleBuyNow} disabled={product.stock <= 0} className="flex-1 bg-blue-600 text-white h-14 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-lg transition disabled:opacity-50"><CreditCard size={20} /> Buy Now</button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;