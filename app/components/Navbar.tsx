'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { title: 'About', href: '#about' },
    { title: 'Skills', href: '#skills' },
    { title: 'Projects', href: '#projects' },
    { title: 'Contact', href: '#contact' }
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = navItems.map(item => item.title.toLowerCase());
      sections.unshift('home');
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 
        'py-3 backdrop-blur-md bg-white/70 dark:bg-dark/80 shadow-sm' : 
        'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="relative group">
              <span className="text-lg font-bold font-title"><span className="text-primary">rakib</span><span className="text-dark dark:text-light"> ahmed</span></span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="relative"
              >
                <Link 
                  href={item.href}
                  className={`py-2 px-3 text-sm rounded-full transition-all ${
                    activeSection === item.title.toLowerCase() 
                      ? 'text-primary font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  {item.title}
                  {activeSection === item.title.toLowerCase() && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
            >
              <Link 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-1.5 text-sm border border-primary text-primary hover:bg-primary hover:text-white rounded-full transition-colors"
              >
                Resume
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center focus:outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <motion.span
                className="absolute top-0 left-0 w-full h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full"
                animate={{ 
                  top: isMobileMenuOpen ? '50%' : '0%', 
                  rotate: isMobileMenuOpen ? 45 : 0,
                  translateY: isMobileMenuOpen ? '-50%' : '0%'
                }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
              <motion.span
                className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full"
                animate={{ 
                  opacity: isMobileMenuOpen ? 0 : 1,
                  translateY: '-50%'
                }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full"
                animate={{ 
                  bottom: isMobileMenuOpen ? '50%' : '0%', 
                  rotate: isMobileMenuOpen ? -45 : 0,
                  translateY: isMobileMenuOpen ? '50%' : '0%'
                }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
            </div>
          </motion.button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-dark border-t dark:border-gray-800 shadow-lg"
          >
            <div className="container mx-auto py-5 px-6">
              <div className="flex flex-col space-y-3">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <Link 
                      href={item.href}
                      className={`block py-2 px-3 rounded-md transition-colors ${
                        activeSection === item.title.toLowerCase() 
                          ? 'bg-primary/5 dark:bg-primary/10 text-primary font-medium' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: navItems.length * 0.05 }}
                  className="pt-2"
                >
                  <Link 
                    href="/resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 px-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Resume
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 