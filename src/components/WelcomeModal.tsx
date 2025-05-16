"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { saveUserName } from '../utils/userSettings';
import { FiUser, FiZap, FiArrowRight } from 'react-icons/fi';

interface WelcomeModalProps {
  onComplete: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    saveUserName(name.trim());
    onComplete();
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="max-w-md w-full overflow-hidden rounded-2xl shadow-2xl"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-primary via-purple to-secondary py-8 px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-10"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          
          <motion.div 
            className="flex items-center gap-4 mb-4 relative z-10"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow-glow"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiZap className="text-white" size={24} />
            </motion.div>
            <div>
              <motion.h2 
                className="text-2xl font-bold text-white"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Manipuruhi
              </motion.h2>
              <motion.p 
                className="text-white/80 text-sm"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Advanced manipulation techniques guide
              </motion.p>
            </div>
          </motion.div>
        </div>
        
        {/* Form with glass effect */}
        <motion.div 
          className="glass-effect p-8 backdrop-blur-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <motion.label 
                htmlFor="name" 
                className="block text-base font-medium mb-3 text-foreground gradient-text"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                What should we call you?
              </motion.label>
              <motion.div 
                className="relative"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
                  <FiUser size={18} />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your name"
                  className="w-full pl-12 px-4 py-3 neo-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground font-['Saira']"
                  autoFocus
                />
              </motion.div>
              {error && (
                <motion.p 
                  className="mt-2 text-sm text-secondary"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </div>
            
            <motion.div 
              className="flex justify-end"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-primary to-purple hover:opacity-90 text-white py-3 px-6 rounded-xl transition-all shadow-glow flex items-center gap-2 font-['Saira']"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Get Started</span>
                <FiArrowRight />
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeModal; 