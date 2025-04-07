'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
import { useAppContext } from '../utils/AppContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled, activeSection, scrollToSection } = useAppContext();
  
  const navItems = [
    { title: 'About', href: '#about', id: 'about' },
    { title: 'Skills', href: '#skills', id: 'skills' },
    { title: 'Projects', href: '#projects', id: 'projects' },
    { title: 'Contact', href: '#contact', id: 'contact' }
  ];

  // Handle navigation link click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 
        'py-3 backdrop-blur-md bg-white/70 dark:bg-dark/80 shadow-sm' : 
        'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center font-poppins">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-1"
          >
            <Link href="/" className="relative group inline-block" onClick={(e) => handleNavClick(e, 'home')}>
              <div className="flex items-center relative px-1 z-10">
                <div className="relative flex items-center justify-center h-7 w-7 rounded-md bg-gradient-to-br from-primary/10 via-purple-500/10 to-accent/10 border border-primary/20 z-10 overflow-hidden group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-sm">
                  <span className="flex items-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent group-hover:from-accent group-hover:via-purple-500 group-hover:to-primary transition-all duration-500">
                    <span className="text-sm font-semibold tracking-wide">R</span>
                    <span className="text-sm font-medium tracking-tight">A</span>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 opacity-70 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"
                    animate={{ 
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="ml-2 transition-all duration-300 group-hover:translate-x-0.5">
                  <span className="text-[10px] font-light tracking-widest text-dark/70 dark:text-light/70 group-hover:text-dark dark:group-hover:text-light transition-colors duration-300">rakib</span>
                  <div className="h-[1.5px] w-full bg-gradient-to-r from-primary/80 via-purple-500/50 to-accent/20 rounded-full mt-0 group-hover:from-primary group-hover:via-purple-500 group-hover:to-accent transition-all duration-500"></div>
                </div>
              </div>
              
              {/* Elegant hover animation */}
              <motion.div 
                className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 z-0"
                initial={{ background: "radial-gradient(circle at center, rgba(79, 70, 229, 0.1), transparent 70%)" }}
                animate={{ 
                  background: [
                    "radial-gradient(circle at center, rgba(79, 70, 229, 0.1), transparent 70%)",
                    "radial-gradient(circle at center, rgba(236, 72, 153, 0.1), transparent 70%)",
                    "radial-gradient(circle at center, rgba(79, 70, 229, 0.1), transparent 70%)"
                  ],
                  scale: [0.97, 1.03, 0.97]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div 
                className="absolute inset-0 scale-95 rounded-md opacity-0 group-hover:opacity-100 group-hover:scale-100 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 transition-all duration-500 z-0"
                whileHover={{ boxShadow: "0 0 15px rgba(79, 70, 229, 0.2)" }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="relative"
              >
                <Link 
                  href={item.href}
                  className={`py-2 px-3 text-sm rounded-full transition-all ${
                    activeSection === item.id 
                      ? 'text-primary font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                  }`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.title}
                  {activeSection === item.id && (
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
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
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
            className="md:hidden bg-white dark:bg-dark border-t dark:border-gray-800 shadow-lg font-poppins"
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
                        activeSection === item.id 
                          ? 'bg-primary/5 dark:bg-primary/10 text-primary font-medium' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={(e) => {
                        handleNavClick(e, item.id);
                        setIsMobileMenuOpen(false);
                      }}
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