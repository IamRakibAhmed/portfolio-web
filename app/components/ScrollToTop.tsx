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
  const { setActiveSection } = useAppContext();

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
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
    
    // Use a shorter timeout for reduced motion
    const timeoutDuration = prefersReducedMotion ? 50 : 1000;
    
    // Set the active section to 'home' after scrolling
    const timeoutId = setTimeout(() => {
      setActiveSection('home');
    }, timeoutDuration);
    
    // Cleanup happens automatically since this is an event handler, not an effect
  }, [prefersReducedMotion, setActiveSection]);

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
          className="fixed bottom-8 right-8 w-12 h-12 rounded-xl bg-white dark:bg-gray-900 text-primary shadow-lg flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-70 border border-gray-100 dark:border-gray-800 group hover:border-primary dark:hover:border-primary hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          aria-label="Scroll to top"
          whileHover={buttonHover}
          whileTap={buttonTap}
        >
          <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-primary to-accent rounded-lg blur-sm transition-opacity duration-300" />
            
            {/* Arrow icon with animation - only animate if motion is not reduced */}
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -2, 0] }}
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
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(ScrollToTop); 