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
  scrollToSection: (sectionId: string) => void;
  isScrolled: boolean;
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  sections: SECTIONS,
  activeSection: 'home',
  setActiveSection: () => {},
  scrollToSection: () => {},
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
  // Ref for tracking animation frame
  const animationFrameRef = useRef<number | null>(null);
  // Last known scroll position for optimization
  const lastScrollYRef = useRef(0);
  // Ref to track if we're handling footer detection
  const inFooterRef = useRef(false);

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

  // Function to scroll to a section with smooth behavior
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Set active section first for immediate UI feedback
      setActiveSectionWithFlag(sectionId);
      
      // Then scroll to the element smoothly
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for the fixed header
        behavior: 'smooth'
      });
    }
  }, [setActiveSectionWithFlag]);

  // Check if we're in the footer area - more robust detection
  const checkFooterPosition = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const documentHeight = document.body.scrollHeight;
    const footerElement = document.querySelector('footer');
    
    // Method 1: Direct footer detection
    if (footerElement) {
      const footerRect = footerElement.getBoundingClientRect();
      if (footerRect.top < viewportHeight * 0.8) {
        return true;
      }
    }
    
    // Method 2: Near bottom of page detection
    // Check if we're close to the bottom of the page (within 100px)
    if (scrollY + viewportHeight > documentHeight - 150) {
      return true;
    }
    
    // Not in footer
    return false;
  }, []);

  // Handle scroll with requestAnimationFrame for better performance
  useEffect(() => {
    const handleScroll = () => {
      // Skip if no change in scroll position
      const currentScrollY = window.scrollY;
      if (currentScrollY === lastScrollYRef.current) {
        // Continue animation loop
        animationFrameRef.current = requestAnimationFrame(handleScroll);
        return;
      }
      
      // Update last known scroll position
      lastScrollYRef.current = currentScrollY;
      
      // Update scroll state
      setIsScrolled(currentScrollY > 20);
      
      // Skip section detection if a manual change was made recently
      if (manualSectionChangeRef.current) {
        animationFrameRef.current = requestAnimationFrame(handleScroll);
        return;
      }
      
      // Check for footer position first - most important check
      if (checkFooterPosition()) {
        if (!inFooterRef.current) {
          inFooterRef.current = true;
          setActiveSection('');
        }
        animationFrameRef.current = requestAnimationFrame(handleScroll);
        return;
      } else {
        inFooterRef.current = false;
      }
      
      // Special case for top of page - always set to home when near the top
      if (currentScrollY < 100) {
        setActiveSection('home');
        animationFrameRef.current = requestAnimationFrame(handleScroll);
        return;
      }
      
      // Determine active section based on scroll position
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section active when its top is above the middle of the viewport
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
      
      // Continue the animation frame loop
      animationFrameRef.current = requestAnimationFrame(handleScroll);
    };
    
    // Start the animation frame loop
    animationFrameRef.current = requestAnimationFrame(handleScroll);
    
    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearSectionTimeout();
    };
  }, [clearSectionTimeout, sections, checkFooterPosition]);

  // Create value object with useMemo to prevent unnecessary re-renders
  const value = useMemo(() => ({
    sections,
    activeSection,
    setActiveSection: setActiveSectionWithFlag,
    scrollToSection,
    isScrolled,
  }), [activeSection, setActiveSectionWithFlag, scrollToSection, isScrolled]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 