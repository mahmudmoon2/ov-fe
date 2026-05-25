import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Mail, MapPin, Lock, ArrowRight, UserPlus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '', phone_number: '', email: '', address: '', password: '', confirmPassword: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registration Data:", formData);
    // API Request will go here
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12 w-full">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm w-full max-w-[500px] border border-blue-50">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4"><UserPlus size={28} className="text-blue-600" /></div>
            <h2 className="text-2xl font-black uppercase">Create Account</h2>
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Full Name *</label>
              <div className="relative"><User size={18} className="absolute left-3.5 top-3.5 text-gray-400" /><input type="text" name="full_name" onChange={handleChange} className="w-full bg-gray-50 border rounded-xl py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500" required /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Phone *</label><div className="relative"><Phone size={18} className="absolute left-3.5 top-3.5 text-gray-400" /><input type="tel" name="phone_number" onChange={handleChange} className="w-full bg-gray-50 border rounded-xl py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500" required /></div></div>
              <div><label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Email (Optional)</label><div className="relative"><Mail size={18} className="absolute left-3.5 top-3.5 text-gray-400" /><input type="email" name="email" onChange={handleChange} className="w-full bg-gray-50 border rounded-xl py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500" /></div></div>
            </div>
            <div>
              <label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Address *</label>
              <div className="relative"><MapPin size={18} className="absolute left-3.5 top-3.5 text-gray-400" /><input type="text" name="address" onChange={handleChange} className="w-full bg-gray-50 border rounded-xl py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500" required /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Password *</label><div className="relative"><Lock size={18} className="absolute left-3.5 top-3.5 text-gray-400" /><input type="password" name="password" onChange={handleChange} className="w-full bg-gray-50 border rounded-xl py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500" required /></div></div>
              <div><label className="block text-[13px] uppercase font-bold text-gray-500 mb-1.5">Confirm Password *</label><div className="relative"><Lock size={18} className="absolute left-3.5 top-3.5 text-gray-400" /><input type="password" name="confirmPassword" onChange={handleChange} className="w-full bg-gray-50 border rounded-xl py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500" required /></div></div>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2 mt-4">Create Account <ArrowRight size={18} /></button>
          </form>
          <p className="text-center text-sm mt-6 font-medium">Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link></p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;