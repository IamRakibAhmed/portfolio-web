'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { throttle } from '../utils/hooks';
import { usePrefersReducedMotion } from '../utils/mediaUtils';
import { buttonHover, buttonTap } from '../utils/animations';
import { useAppContext } from '../utils/AppContext';

// Animation variants defined outside component to prevent recreation
const buttonVariants = {
  initial: { opacity: 0, scale: 0.5, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.5, y: 10 }
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollToSection } = useAppContext();

  // Memoized toggle visibility function
  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 300);
  }, []);

  // Throttled scroll handler - memoized with useCallback
  const throttledToggleVisibility = useCallback(
    throttle(toggleVisibility, 200),
    [toggleVisibility]
  );

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener('scroll', throttledToggleVisibility);
    
    // Initial check
    throttledToggleVisibility();
    
    return () => {
      window.removeEventListener('scroll', throttledToggleVisibility);
    };
  }, [throttledToggleVisibility]);

  // Scroll to top function - memoized with useCallback
  const scrollToTop = useCallback(() => {
    // Use the scrollToSection function from context
    scrollToSection('home');
  }, [scrollToSection]);

  // Get transition based on motion preferences
  const getTransition = useCallback(() => {
    return {
      type: prefersReducedMotion ? "tween" : "spring",
      stiffness: 300,
      damping: 30,
      duration: prefersReducedMotion ? 0.2 : undefined
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial="initial"
          animate="animate"
          exit="exit"
          variants={buttonVariants}
          transition={getTransition()}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/80 dark:to-gray-900/70 text-gray-600 dark:text-gray-300 shadow-lg flex items-center justify-center z-50 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/30 group hover:border-primary/25 dark:hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-primary/10 transform hover:-translate-y-1 transition-all duration-300 ease-out"
          aria-label="Scroll to top"
          whileHover={buttonHover}
          whileTap={buttonTap}
        >
          <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
            {/* Background subtle gradient on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-lg transition-opacity duration-300" />
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-xl bg-primary/5 dark:bg-primary/10 blur-md transform scale-90"></div>
            </div>
            
            {/* Arrow icon with animation - only animate if motion is not reduced */}
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="relative z-10"
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
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(ScrollToTop); 