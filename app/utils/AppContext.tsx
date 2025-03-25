'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback, useMemo } from 'react';
import { throttle } from './hooks'; // Import throttle from hooks to avoid recreation

// Define sections array once as a constant
const SECTIONS = ['home', 'about', 'skills', 'projects', 'contact'];

// Define the type for the context
interface AppContextType {
  sections: string[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  isScrolled: boolean;
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  sections: SECTIONS,
  activeSection: 'home',
  setActiveSection: () => {},
  isScrolled: false,
});

// Hook for easy context use in components
export const useAppContext = () => useContext(AppContext);

// Context provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Use the constant SECTIONS array
  const sections = SECTIONS;
  
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add a ref to track if a manual section change was made recently
  const manualSectionChangeRef = useRef(false);
  const sectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Ref for tracking the throttled scroll handler
  const scrollHandlerRef = useRef<Function | null>(null);

  // Clear timeout utility function
  const clearSectionTimeout = useCallback(() => {
    if (sectionTimeoutRef.current) {
      clearTimeout(sectionTimeoutRef.current);
      sectionTimeoutRef.current = null;
    }
  }, []);

  // Custom setter that also sets the manual change flag - memoized with useCallback
  const setActiveSectionWithFlag = useCallback((section: string) => {
    setActiveSection(section);
    
    // Set the manual change flag to prevent scroll detection from changing it
    manualSectionChangeRef.current = true;
    
    // Clear any existing timeout
    clearSectionTimeout();
    
    // Reset the flag after 1 second to allow scroll detection again
    sectionTimeoutRef.current = setTimeout(() => {
      manualSectionChangeRef.current = false;
    }, 1000);
  }, [clearSectionTimeout]);

  // Memoize the scroll handler to prevent recreating it on every render
  const createScrollHandler = useCallback(() => {
    return throttle(() => {
      // Update scroll state
      setIsScrolled(window.scrollY > 20);
      
      // Skip section detection if a manual change was made recently
      if (manualSectionChangeRef.current) {
        return;
      }
      
      // Get viewport height for calculations
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const documentHeight = document.body.scrollHeight;
      
      // Special case for top of page - always set to home when near the top
      if (scrollPosition < 100) {
        setActiveSection('home');
        return;
      }
      
      // Check if we're in the footer
      const footerElement = document.querySelector('footer');
      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        // If footer is taking a significant portion of the viewport
        if (footerRect.top < viewportHeight * 0.5) {
          // Clear active section when in footer
          setActiveSection('');
          return;
        }
      }
      
      // Determine active section based on scroll position
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section active when its top is above the middle of the viewport
          if (rect.top <= viewportHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    }, 200);
  }, []);

  // Handle scroll events with optimized performance
  useEffect(() => {
    // Create the scroll handler once
    const handleScroll = createScrollHandler();
    scrollHandlerRef.current = handleScroll;
    
    window.addEventListener('scroll', handleScroll);
    
    // Call once on mount to set initial active section
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearSectionTimeout();
      
      // Clear any pending throttled calls
      if (scrollHandlerRef.current && typeof scrollHandlerRef.current === 'function' && 
          'cancel' in scrollHandlerRef.current && typeof scrollHandlerRef.current.cancel === 'function') {
        scrollHandlerRef.current.cancel();
      }
    };
  }, [createScrollHandler, clearSectionTimeout]);

  // Create value object with useMemo to prevent unnecessary re-renders
  const value = useMemo(() => ({
    sections,
    activeSection,
    setActiveSection: setActiveSectionWithFlag,
    isScrolled,
  }), [activeSection, setActiveSectionWithFlag, isScrolled]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 