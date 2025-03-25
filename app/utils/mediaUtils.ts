'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the device prefers reduced motion
 * This helps optimize performance by not playing animations for users who prefer reduced motion
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    // Create media query list
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Initial check
    setPrefersReducedMotion(mediaQuery.matches);

    // Add listener for changes
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add listener if supported
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(onChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', onChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(onChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Custom hook to check if the device is a mobile device
 * This helps optimize performance by reducing animations on mobile devices
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    // Initial check based on viewport width
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkMobile();

    // Add resize event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return isMobile;
}

/**
 * Utility to conditionally apply animations based on device capabilities
 */
export function getOptimizedAnimations(prefersReducedMotion: boolean, isMobile: boolean) {
  const shouldReduceAnimations = prefersReducedMotion || isMobile;

  return {
    // Simpler animations for devices with reduced motion preference or mobile devices
    fadeIn: shouldReduceAnimations 
      ? { opacity: 1 } 
      : { opacity: [0, 1] },
      
    fadeInUp: shouldReduceAnimations
      ? { opacity: 1, y: 0 }
      : { opacity: [0, 1], y: [20, 0] },
      
    transition: shouldReduceAnimations
      ? { duration: 0.3 }
      : { duration: 0.5, ease: "easeOut" },
  };
} 