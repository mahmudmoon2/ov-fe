import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const subTotal = cartItems.reduce((total, item) => total + (Number(item.currentPrice) * item.quantity), 0);
  const shippingCost = 50; // Inside Dhaka [cite: 138]
  const totalAmount = subTotal + shippingCost;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Notifications */}
        <div className="space-y-3 mb-8">
          <div className="bg-blue-50 border-t-4 border-blue-500 p-4 text-sm text-gray-700 flex gap-2">
            <span className="font-bold">Returning customer? Click here to login</span> {/* [cite: 133] */}
          </div>
          <div className="bg-blue-50 border-t-4 border-blue-500 p-4 text-sm text-gray-700 flex gap-2">
            <span className="font-bold">Have a coupon? Click here to enter your code</span> {/* [cite: 134] */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: BILLING & SHIPPING */}
          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-6 uppercase">BILLING & SHIPPING</h2> {/* [cite: 135] */}
            
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Name *</label> {/* [cite: 137] */}
                <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-blue-500" required />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number *</label> {/* [cite: 139] */}
                <input type="tel" className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-blue-500" required />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Country/Region *</label> {/* [cite: 140] */}
                <select className="w-full border border-gray-300 rounded-md p-2.5 bg-gray-100 font-semibold text-gray-700" disabled>
                  <option>Bangladesh</option> {/* [cite: 141] */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">District *</label> {/* [cite: 142] */}
                <select className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-blue-500">
                  <option>Dhaka</option> {/* [cite: 143] */}
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Address *</label> {/* [cite: 144] */}
                <input type="text" placeholder="House number and street name" className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-blue-500" required /> {/* [cite: 145] */}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email (Optional)</label> {/* [cite: 146] */}
                <input type="email" placeholder="For invoice provide your email" className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-blue-500" /> {/* [cite: 147] */}
              </div>

              <div className="pt-4">
                <label className="block text-sm font-bold text-gray-700 mb-1">Order notes (optional)</label>
                <textarea rows="3" placeholder="প্রোডাক্টের কোন কালার মেনশন, ডেলিভারি নোট অথবা কিছু বলতে চাইলে এখানে লিখুন...." className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:border-blue-500"></textarea> {/* [cite: 161] */}
              </div>
            </form>
          </div>

          {/* Right Column: YOUR ORDER */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-gray-400 p-6 rounded-md">
              <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-6 uppercase">YOUR ORDER</h2> {/* [cite: 136] */}
              
              <table className="w-full text-left mb-6">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-sm font-bold text-gray-600 uppercase">PRODUCT</th> {/* [cite: 138] */}
                    <th className="py-2 text-sm font-bold text-gray-600 text-right uppercase">SUBTOTAL</th> {/* [cite: 138] */}
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 text-sm text-gray-800 pr-4">{item.name} <strong className="text-gray-500">× {item.quantity}</strong></td>
                      <td className="py-3 text-sm font-bold text-right text-gray-800">৳{(item.currentPrice * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-sm font-bold text-gray-800">Subtotal</td> {/* [cite: 138] */}
                    <td className="py-3 text-sm font-bold text-right text-primary">৳{subTotal.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-sm font-bold text-gray-800">Shipment</td> {/* [cite: 138] */}
                    <td className="py-3 text-sm text-right text-gray-600">Inside Dhaka: ৳{shippingCost}</td> {/* [cite: 138] */}
                  </tr>
                  <tr>
                    <td className="py-4 text-lg font-bold text-gray-800">Total</td> {/* [cite: 138] */}
                    <td className="py-4 text-lg font-bold text-right text-primary">৳{totalAmount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              {/* Payment Methods */}
              <div className="bg-gray-50 p-4 border border-gray-200 rounded-md space-y-4 mb-6">
                
                {/* Cash On Delivery */}
                <div>
                  <label className="flex items-center gap-2 font-bold cursor-pointer text-gray-800">
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-primary focus:ring-primary" />
                    Cash On Delivery {/* [cite: 148] */}
                  </label>
                  {paymentMethod === 'cod' && (
                    <div className="mt-2 bg-gray-200 p-3 text-sm text-gray-600 rounded">
                      <p>We will call you for order final confirmation (11 am-7 pm), Pick up the phone kindly... For online payment please verify product stock before ordering.</p> {/* [cite: 149, 151] */}
                    </div>
                  )}
                </div>

                {/* bKash */}
                <label className="flex items-center gap-2 font-bold cursor-pointer text-gray-800 border-t border-gray-200 pt-3">
                  <input type="radio" name="payment" value="bkash" checked={paymentMethod === 'bkash'} onChange={() => setPaymentMethod('bkash')} className="w-4 h-4 text-primary focus:ring-primary" />
                  bKash Payment Gateway {/* [cite: 154] */}
                </label>

                {/* Online Payment */}
                <label className="flex items-center gap-2 font-bold cursor-pointer text-gray-800 border-t border-gray-200 pt-3">
                  <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="w-4 h-4 text-primary focus:ring-primary" />
                  Pay Online (Credit/Debit Card/MobileBanking) {/* [cite: 158] */}
                </label>

              </div>

              {/* Terms & Place Order */}
              <div className="space-y-4">
                <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-primary rounded" />
                  Create an account? {/* [cite: 155] */}
                </label>
                <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-primary rounded" required />
                  <span>I have read and agree to the website <a href="#" className="text-primary hover:underline">terms and conditions</a>, privacy policy, return & refund, warranty policy *</span> {/* [cite: 163] */}
                </label>
                
                <button className="w-full bg-[#1e40af] text-white py-3.5 rounded font-bold text-lg hover:bg-blue-800 transition shadow-md mt-2 uppercase">
                  PLACE ORDER {/* [cite: 166] */}
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;