// src/components/MovingText.jsx
import React from 'react';
import { motion } from 'framer-motion';

const MovingText = ({ text }) => {
  return (
    <div className="bg-white shadow-md py-3 overflow-hidden whitespace-nowrap mb-8 border-y border-gray-100">
      <motion.div 
        className="inline-block text-gray-400 font-bold text-md tracking-wide"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {text || " Offer of the day: Get 20% off on all products! 10% off on orders above Tk. 5000! Free shipping on select items!"}
      </motion.div>
    </div>
  );
};

export default MovingText;