'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  // Separate social icon animation variants
  const socialIconVariants = {
    initial: { 
      y: 0, 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)'
    },
    hover: { 
      y: -2, 
      boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.12), 0 0 0 1px rgba(79, 70, 229, 0.05)'
    },
    tap: {
      y: 0,
      boxShadow: '0 3px 6px -2px rgba(79, 70, 229, 0.15), 0 0 0 1px rgba(79, 70, 229, 0.1)'
    }
  };
  
  const socialLinks = [
    { 
      name: 'GitHub', 
      href: 'https://github.com/IamRakibAhmed', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/iamrakibahmed', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'Email', 
      href: 'mailto:rakibofficial@gmail.com', 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.3) 0%, transparent 50%), 
                            radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.2) 0%, transparent 60%)`,
          backgroundSize: '100% 100%',
          filter: 'blur(60px)'
        }}></div>
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)',
          backgroundSize: '5rem 5rem',
          opacity: 0.07
        }}></div>
      </div>
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-[15%] w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-[20%] w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-32 left-[30%] w-2 h-2 bg-gradient-to-r from-primary to-purple-500 rounded-full"
        animate={{
          y: [0, -10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      
      {/* Glowing orbs with improved animation */}
      <motion.div 
        className="absolute top-20 left-[10%] w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-full blur-[100px] dark:from-primary/15 dark:to-purple-500/10"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          opacity: [0.4, 0.7, 0.4] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-10 right-[10%] w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full blur-[120px] dark:from-accent/15 dark:to-primary/10"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Main footer content with improved layout - Navigation section removed */}
          <div className="grid grid-cols-12 gap-x-8 gap-y-12 mb-16">
            {/* Brand column */}
            <motion.div variants={fadeUp} className="col-span-12 md:col-span-5 lg:col-span-4 space-y-6">
              <Link href="/" className="inline-block">
                <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent font-title">Rakib Ahmed</h2>
              </Link>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed font-poppins">
                Creating exceptional digital experiences with modern technology and minimalist design principles.
              </p>
              
              {/* Social icons - enhanced style */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/80 text-gray-700 dark:text-gray-300 flex items-center justify-center rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 group relative overflow-hidden"
                    initial={{ y: 0, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.03)' }}
                    whileHover={{ y: -2, boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.12), 0 0 0 1px rgba(79, 70, 229, 0.05)' }}
                    whileTap={{ y: 0, boxShadow: '0 3px 6px -2px rgba(79, 70, 229, 0.15), 0 0 0 1px rgba(79, 70, 229, 0.1)' }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 0.8
                    }}
                    aria-label={link.name}
                  >
                    {/* Subtle gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/10 dark:group-hover:from-primary/10 dark:group-hover:to-accent/15 transition-colors ease-out duration-200 -z-10"></div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 rounded-full bg-primary/5 dark:bg-primary/10 blur-lg transform scale-150"></div>
                    </div>
                    
                    {/* Icon with subtle scale and color transition */}
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 15 
                      }}
                      className="relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-200"
                    >
                      {link.icon}
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Contact column with enhanced styling - This replaces the navigation column */}
            <motion.div variants={fadeUp} className="col-span-6 md:col-span-3 lg:col-span-4">
              <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-200 mb-6 font-title">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 group font-poppins">
                  <div className="p-2 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-800/50 group-hover:border-primary transition-colors duration-200">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href="mailto:rakibofficial@gmail.com" 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="hover:text-primary transition-colors duration-200 pt-1 text-xs sm:text-sm break-all sm:break-normal font-poppins">
                    rakibofficial@gmail.com
                  </a>
                </li>
                <li className="flex items-start space-x-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 group font-poppins">
                  <div className="p-2 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-800/50 group-hover:border-primary transition-colors duration-200">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="pt-1">Dhaka, Bangladesh</span>
                </li>
                <li className="flex items-start space-x-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 group font-poppins">
                  <div className="p-2 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-800/50 group-hover:border-primary transition-colors duration-200">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="pt-1">Available from {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </li>
              </ul>
            </motion.div>
            
            {/* Newsletter subscription */}
            <motion.div variants={fadeUp} className="col-span-12 md:col-span-4 lg:col-span-4">
              <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-200 mb-6 font-title">Stay Updated</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 font-poppins">Subscribe to receive latest updates and news.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 py-2 px-3 rounded-l-lg bg-white dark:bg-gray-800 text-xs sm:text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-poppins"
                />
                <motion.button 
                  type="submit"
                  className="bg-gradient-to-r from-primary to-accent text-white py-2 px-4 rounded-r-lg text-xs sm:text-sm font-medium font-poppins"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
          
          {/* Sophisticated minimal divider */}
          <motion.div 
            variants={fadeUp}
            className="relative h-px w-full mb-8 overflow-hidden"
          >
            {/* Base line with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 dark:via-primary/40 to-transparent" />
            
            {/* Animated spotlight effect */}
            <motion.div 
              className="absolute inset-y-0 w-[30%] bg-gradient-to-r from-transparent via-primary/60 dark:via-primary/70 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 2
              }}
            />
          </motion.div>
          
          {/* Copyright with improved layout */}
          <motion.div 
            variants={fadeUp} 
            className="flex flex-col md:flex-row justify-between items-center text-center md:text-left pt-6"
          >
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed font-poppins">
              &copy; {new Date().getFullYear()} Rakib Ahmed. All rights reserved.
            </p>
            
            <motion.button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center text-xs text-gray-500 hover:text-primary transition-colors duration-200 font-poppins mt-4 md:mt-0"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="mr-2">Back to top</span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 flex items-center justify-center group-hover:border-primary transition-colors duration-200">
                <svg className="w-3 h-3 group-hover:text-primary transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
} 