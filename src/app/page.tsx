"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatContainer from "../components/ChatContainer";
import WelcomeModal from "../components/WelcomeModal";
import { hasUserName } from "../utils/userSettings";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [mounted, setMounted] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Handle dark mode and welcome modal
  useEffect(() => {
    setMounted(true);
    
    // Check for saved preference
    const darkModePreference = localStorage.getItem("darkMode");
    
    // Default to dark mode if no preference is set
    if (darkModePreference === "false") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    
    // Check if user name exists
    setShowWelcomeModal(!hasUserName());
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", String(newMode));
      
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      return newMode;
    });
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    console.log("Toggling sidebar:", newState);
    setSidebarOpen(newState);
  };

  // Hide sidebar on small screens by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Only run on initial mount, not on every resize
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle welcome modal completion
  const handleWelcomeComplete = () => {
    setShowWelcomeModal(false);
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcomeModal && <WelcomeModal onComplete={handleWelcomeComplete} />}
      </AnimatePresence>
      
      {/* Sidebar */}
      <div 
        className="fixed md:relative inset-y-0 left-0 z-30 h-full overflow-hidden transition-all duration-300"
        style={{
          width: sidebarOpen ? '16rem' : '0',
          opacity: sidebarOpen ? 1 : 0,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        <div className="w-64 h-full">
          <Sidebar />
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <motion.div 
        className="flex-1 flex flex-col h-full overflow-hidden bg-background text-foreground"
        animate={{ 
          marginLeft: sidebarOpen ? "0" : "0" 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Header
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          sidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-hidden">
          <ChatContainer />
        </main>
      </motion.div>
    </div>
  );
}
