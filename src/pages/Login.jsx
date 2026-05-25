import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Lock, ArrowRight, LogIn } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ phone_number: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data (Phone):", formData);
    // API Request will go here
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12 w-full">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm w-full max-w-md border border-blue-50">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4"><LogIn size={28} className="text-blue-600" /></div>
            <h2 className="text-2xl font-black uppercase">Welcome Back</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="01XXXXXXXXX" className="w-full bg-gray-50 border rounded-xl py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>
            <div>
              <label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-gray-50 border rounded-xl py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2">Sign In <ArrowRight size={18} /></button>
          </form>
          <p className="text-center text-sm mt-6 font-medium">Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register Now</Link></p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;