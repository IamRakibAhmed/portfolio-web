'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down with improved threshold
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-xl bg-white dark:bg-gray-900 text-primary shadow-lg flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-70 border border-gray-100 dark:border-gray-800 group hover:border-primary dark:hover:border-primary hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          aria-label="Scroll to top"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)" 
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-primary to-accent rounded-lg blur-sm transition-opacity duration-300" />
            
            {/* Arrow icon with animation */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:text-primary transition-colors duration-300"
              >
                <polyline points="17 11 12 6 7 11"></polyline>
                <polyline points="17 18 12 13 7 18"></polyline>
              </svg>
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
} 