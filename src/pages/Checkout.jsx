import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import { Loader2, Tag } from 'lucide-react';

const Checkout = () => {
  const { cartItems } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingCost, setShippingCost] = useState(50);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });

  // Safe NaN Calculation
  const subTotal = cartItems.reduce((total, item) => {
    const price = Number(item.currentPrice) || 0;
    const qty = Number(item.quantity) || 0;
    return total + (price * qty);
  }, 0);

  const calculatedTotal = subTotal + shippingCost - discountAmount;
  const totalAmount = calculatedTotal > 0 ? calculatedTotal : 0; 

  const handleDistrictChange = (e) => {
    setShippingCost(e.target.value === 'Dhaka' ? 50 : 120);
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    setCouponMessage({ type: '', text: '' });

    try {
      const res = await api.post('/products/apply-coupon/', { code: couponCode, cart_total: subTotal });
      if (res.data && res.data.valid) {
        setDiscountAmount(Number(res.data.discount_amount) || 0);
        setCouponMessage({ type: 'success', text: `Coupon applied! Saved ৳${res.data.discount_amount}` });
      } else {
        setDiscountAmount(0);
        setCouponMessage({ type: 'error', text: res.data.message || 'Invalid coupon.' });
      }
    } catch (err) {
      setDiscountAmount(0);
      setCouponMessage({ type: 'error', text: err.response?.data?.message || 'Error applying coupon.' });
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex-1 w-full">
        <div className="space-y-4 mb-10">
          <div className="bg-white border-l-4 border-blue-500 p-4 shadow-sm rounded-r-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div><span className="text-gray-600 text-sm font-medium">Returning customer? </span><Link to="/login" className="text-blue-600 font-bold hover:underline text-sm">Click here to login</Link></div>
            <div className="md:border-l md:border-gray-200 md:pl-4"><span className="text-gray-600 text-sm font-medium">Don't have an account? </span><Link to="/register" className="text-blue-600 font-bold hover:underline text-sm">Register now</Link></div>
          </div>
          
          <div className="bg-white border-l-4 border-blue-500 p-4 shadow-sm rounded-r-lg">
            <div className="flex items-center gap-3">
              <Tag size={18} className="text-blue-500" />
              <span className="text-gray-600 text-sm">Have a coupon?</span>
              <button onClick={() => setShowCouponInput(!showCouponInput)} className="text-blue-600 font-bold hover:underline text-sm">Click here to enter code</button>
            </div>
            {showCouponInput && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col md:flex-row gap-3">
                <form onSubmit={handleApplyCoupon} className="flex gap-2 w-full md:w-96">
                  <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="Enter coupon code" className="flex-1 border rounded-lg p-2.5 outline-none focus:border-blue-500 uppercase font-bold" />
                  <button type="submit" disabled={isApplyingCoupon} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700">{isApplyingCoupon ? <Loader2 size={18} className="animate-spin" /> : 'Apply'}</button>
                </form>
                {couponMessage.text && <div className={`text-sm font-bold flex items-center ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{couponMessage.text}</div>}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-black uppercase border-b-2 border-blue-50 pb-4 mb-6">Billing Details</h2>
            <form className="space-y-5">
              <div><label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Full Name *</label><input type="text" className="w-full bg-gray-50 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" required /></div>
              <div><label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Mobile Number *</label><input type="tel" className="w-full bg-gray-50 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" required /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Country *</label><select className="w-full border rounded-lg p-3 bg-gray-100 font-bold cursor-not-allowed" disabled><option>Bangladesh</option></select></div>
                <div><label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">District *</label><select onChange={handleDistrictChange} className="w-full bg-gray-50 border rounded-lg p-3 outline-none cursor-pointer"><option value="Dhaka">Dhaka (Inside City)</option><option value="Others">Others (Outside Dhaka)</option></select></div>
              </div>
              <div><label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Detailed Address *</label><input type="text" className="w-full bg-gray-50 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" required /></div>
            </form>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="bg-white border-2 border-blue-600 p-6 rounded-2xl shadow-xl sticky top-24">
              <h2 className="text-lg font-black uppercase border-b border-gray-100 pb-4 mb-6">Your Order</h2>
              <div className="max-h-[300px] overflow-y-auto mb-6 border-b border-gray-100 pb-4">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center mb-4">
                    <div className="flex-1 pr-4"><h4 className="text-sm font-bold line-clamp-1">{item.name}</h4><p className="text-xs text-gray-400 font-bold">Qty: {item.quantity}</p></div>
                    <span className="font-black">৳{(Number(item.currentPrice || 0) * Number(item.quantity || 0)).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between font-bold text-gray-600"><span>Subtotal</span><span>৳{subTotal.toLocaleString()}</span></div>
                <div className="flex justify-between font-bold text-gray-600"><span>Shipping</span><span>৳{shippingCost}</span></div>
                {discountAmount > 0 && <div className="flex justify-between font-black text-green-600"><span>Discount</span><span>-৳{discountAmount.toLocaleString()}</span></div>}
              </div>
              <div className="flex justify-between items-center mb-8"><span className="text-xl font-black">Total</span><span className="text-2xl font-black text-blue-600">৳{totalAmount.toLocaleString()}</span></div>
              <div className="space-y-4 mb-6">
                <label className="flex items-center gap-3 font-bold cursor-pointer"><input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /> Cash On Delivery</label>
                <label className="flex items-center gap-3 font-bold cursor-pointer border-t pt-4"><input type="radio" name="payment" value="bkash" checked={paymentMethod === 'bkash'} onChange={() => setPaymentMethod('bkash')} /> bKash</label>
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition uppercase tracking-widest">Place Order</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;