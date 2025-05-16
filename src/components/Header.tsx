"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiSettings, FiMoon, FiSun, FiUser, FiX, FiZap } from 'react-icons/fi';
import { useChat } from '../context/ChatContext';
import { getUserName } from '../utils/userSettings';

interface HeaderProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isDarkMode, toggleDarkMode, sidebarOpen }) => {
  const { activeChat } = useChat();
  const userName = getUserName() || 'User';
  
  return (
    <motion.header 
      className="bg-background no-border py-4 px-4 sm:px-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => {
              console.log("Button clicked, calling toggleSidebar");
              toggleSidebar();
            }}
            className="p-2 rounded-full hover:bg-background-light text-foreground/70 hover:text-primary transition-all neo-button"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </motion.button>
          
          <motion.div 
            className="font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {activeChat ? (
              <span className="text-foreground">{activeChat.title || 'New Chat'}</span>
            ) : (
              <span className="gradient-text text-2xl font-bold">ManipuRuhi</span>
            )}
          </motion.div>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.div 
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-light/50 subtle-border"
            whileHover={{ scale: 1.05 }}
          >
            <FiUser size={14} className="text-primary" />
            <span className="text-sm text-foreground/90 font-medium">{userName}</span>
          </motion.div>
          
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-background-light text-foreground/70 hover:text-accent transition-all neo-button"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>
          
          <motion.button
            className="p-2 rounded-full hover:bg-background-light text-foreground/70 hover:text-purple transition-all neo-button"
            aria-label="Settings"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <FiSettings size={18} />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 