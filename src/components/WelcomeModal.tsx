"use client";

import React, { useState } from 'react';
import { saveUserName } from '../utils/userSettings';
import { FiUser, FiZap } from 'react-icons/fi';

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
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-effect max-w-md w-full overflow-hidden rounded-xl shadow-glow">
        <div className="bg-gradient-to-r from-primary to-purple py-6 px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <FiZap className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">Manipulation Guide</h2>
          </div>
          <p className="text-white/80">
            A research tool for understanding manipulation techniques
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">
              What should we call you?
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/50">
                <FiUser size={16} />
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
                className="w-full pl-10 px-4 py-2 bg-background-light border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                autoFocus
              />
            </div>
            {error && <p className="mt-1 text-sm text-secondary">{error}</p>}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-purple hover:opacity-90 text-white py-2 px-6 rounded-lg transition-all shadow-glow"
            >
              Get Started
            </button>
          </div>
          
          <p className="mt-4 text-xs text-foreground/50">
            This app is for research purposes only. The information provided should not be used to harm, deceive, or exploit others.
          </p>
        </form>
      </div>
    </div>
  );
};

export default WelcomeModal; 