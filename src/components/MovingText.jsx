// src/components/MovingText.jsx
import React from 'react';
import { motion } from 'framer-motion';

const MovingText = ({ text }) => {
  return (
    <div className="bg-white shadow-md py-3 overflow-hidden whitespace-nowrap mb-8 border-y border-gray-100">
      <motion.div 
        className="inline-block text-red-500 font-bold text-lg tracking-wide"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      >
        {text || "🔥 ধামাকা অফার! শখের ঘরে এখন সব গ্যাজেটে আকর্ষণীয় ডিসকাউন্ট চলছে! আজই অর্ডার করুন। 🔥"}
      </motion.div>
    </div>
  );
};

export default MovingText;